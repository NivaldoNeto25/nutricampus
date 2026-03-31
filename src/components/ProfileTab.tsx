import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { User, Flame, Zap, Target, Dumbbell, Heart, Ban, Scale, Ruler, Pencil, ArrowRight, TrendingUp, TrendingDown, Minus } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, PieChart, Pie, Cell } from "recharts";

const goals = ["Economizar tempo", "Mais energia", "Ganhar massa"];

const ProfileTab = () => {
  const { profile, initialData, currentData, streak, badges, getWeeklyProgress, mealCompletions, progress, currentMenu, updateCurrentData } = useUser();
  const weeklyProgress = getWeeklyProgress();
  const [editing, setEditing] = useState(false);
  const [editWeight, setEditWeight] = useState("");
  const [editGoal, setEditGoal] = useState("");
  const [editTraining, setEditTraining] = useState<string[]>([]);

  const trainingOptions = ["Push/Pull/Legs", "Upper/Lower", "Cardio", "Abdômen/Core", "Não treino"];

  const startEditing = () => {
    if (!currentData) return;
    setEditWeight(String(currentData.weight));
    setEditGoal(currentData.goal);
    setEditTraining([...currentData.trainingDays]);
    setEditing(true);
  };

  const saveEdits = () => {
    updateCurrentData({
      weight: parseFloat(editWeight) || currentData!.weight,
      goal: editGoal,
      trainingDays: editTraining,
    });
    setEditing(false);
  };

  const toggleTraining = (t: string) => {
    setEditTraining((prev) =>
      prev.includes(t) ? prev.filter((v) => v !== t) : [...prev, t]
    );
  };

  // Weekly bar data
  const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
  const barData = days.map((day, i) => {
    const dayMeals = (mealCompletions[i] as boolean[] | undefined) || [];
    const done = dayMeals.filter(Boolean).length;
    return { day, completed: done, total: currentMenu[i]?.meals.length || 5 };
  });

  const pieData = [
    { name: "Completo", value: weeklyProgress },
    { name: "Restante", value: 100 - weeklyProgress },
  ];

  const chartConfig = { completed: { label: "Refeições", color: "hsl(152 55% 38%)" } };
  const pieConfig = {
    Completo: { label: "Completo", color: "hsl(152 55% 38%)" },
    Restante: { label: "Restante", color: "hsl(90 15% 94%)" },
  };

  if (!profile) return null;

  const weightDiff = initialData && currentData ? currentData.weight - initialData.weight : 0;
  const goalChanged = initialData && currentData ? initialData.goal !== currentData.goal : false;

  return (
    <div className="space-y-5 pb-4">
      {/* Header */}
      <div className="rounded-2xl bg-primary p-5 text-primary-foreground">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground/20">
              <User className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold">{profile.name}</h1>
              <p className="text-sm opacity-80">{profile.goal}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <div className="flex items-center gap-1 rounded-full bg-accent px-3 py-1.5">
              <Flame className="h-4 w-4" />
              <span className="text-sm font-extrabold">{streak}</span>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-primary-foreground/20 px-2.5 py-1">
              <Zap className="h-3 w-3" />
              <span className="text-[10px] font-bold">{progress.xp} XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Evolution Report */}
      {initialData && currentData && (
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h2 className="text-sm font-extrabold mb-3">📈 Relatório de Evolução</h2>
          <div className="space-y-3">
            {/* Weight comparison */}
            <div className="flex items-center gap-3 rounded-lg bg-secondary p-3">
              <Scale className="h-5 w-5 text-primary shrink-0" />
              <div className="flex-1">
                <p className="text-[10px] font-bold text-muted-foreground">Peso</p>
                <div className="flex items-center gap-2 text-sm font-bold">
                  <span>{initialData.weight} kg</span>
                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                  <span className="text-primary">{currentData.weight} kg</span>
                  <span className={`flex items-center gap-0.5 text-[10px] font-extrabold rounded-full px-2 py-0.5 ${
                    weightDiff > 0 ? "bg-nutri-orange-light text-accent" :
                    weightDiff < 0 ? "bg-nutri-green-light text-primary" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {weightDiff > 0 ? <TrendingUp className="h-3 w-3" /> :
                     weightDiff < 0 ? <TrendingDown className="h-3 w-3" /> :
                     <Minus className="h-3 w-3" />}
                    {weightDiff > 0 ? "+" : ""}{weightDiff.toFixed(1)} kg
                  </span>
                </div>
              </div>
            </div>

            {/* Goal comparison */}
            <div className="flex items-center gap-3 rounded-lg bg-secondary p-3">
              <Target className="h-5 w-5 text-primary shrink-0" />
              <div className="flex-1">
                <p className="text-[10px] font-bold text-muted-foreground">Objetivo</p>
                <div className="flex items-center gap-2 text-sm font-bold">
                  <span>{initialData.goal}</span>
                  {goalChanged && (
                    <>
                      <ArrowRight className="h-3 w-3 text-muted-foreground" />
                      <span className="text-primary">{currentData.goal}</span>
                    </>
                  )}
                  {!goalChanged && (
                    <span className="text-[10px] font-bold text-muted-foreground">(mantido)</span>
                  )}
                </div>
              </div>
            </div>

            {/* XP and Streak summary */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 rounded-lg bg-nutri-green-light p-3">
                <Zap className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground">XP Total</p>
                  <p className="text-lg font-extrabold text-primary">{progress.xp}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-nutri-orange-light p-3">
                <Flame className="h-4 w-4 text-accent" />
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground">Streak</p>
                  <p className="text-lg font-extrabold text-accent">{streak} dias</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Weekly Progress Pie */}
      <div className="rounded-xl border bg-card p-5 shadow-sm">
        <h2 className="text-sm font-extrabold mb-3">📊 Progresso Semanal</h2>
        <div className="flex items-center gap-4">
          <ChartContainer config={pieConfig} className="h-28 w-28">
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={30} outerRadius={50} dataKey="value" strokeWidth={0}>
                <Cell fill="hsl(152 55% 38%)" />
                <Cell fill="hsl(90 15% 94%)" />
              </Pie>
            </PieChart>
          </ChartContainer>
          <div>
            <p className="text-3xl font-extrabold text-primary">{weeklyProgress}%</p>
            <p className="text-xs text-muted-foreground">do plano seguido</p>
            <p className="mt-1 text-xs font-semibold text-accent">
              {weeklyProgress >= 80 ? "Excelente! 🔥" : weeklyProgress >= 50 ? "Bom progresso! 💪" : "Vamos lá! 🚀"}
            </p>
          </div>
        </div>
      </div>

      {/* Daily Bar Chart */}
      <div className="rounded-xl border bg-card p-5 shadow-sm">
        <h2 className="text-sm font-extrabold mb-3">📅 Refeições por dia</h2>
        <ChartContainer config={chartConfig} className="h-40 w-full">
          <BarChart data={barData}>
            <XAxis dataKey="day" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="completed" fill="hsl(152 55% 38%)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </div>

      {/* Profile Info / Edit */}
      <div className="rounded-xl border bg-card p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-extrabold">👤 Seus Dados</h2>
          {!editing ? (
            <button
              onClick={startEditing}
              className="flex items-center gap-1 rounded-full border border-primary/30 px-3 py-1 text-[10px] font-bold text-primary hover:bg-nutri-green-light transition-colors"
            >
              <Pencil className="h-3 w-3" /> Editar
            </button>
          ) : (
            <button
              onClick={saveEdits}
              className="flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-[10px] font-bold text-primary-foreground"
            >
              Salvar
            </button>
          )}
        </div>

        {!editing ? (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-3 rounded-lg bg-secondary p-3">
                <Scale className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground">Peso</p>
                  <p className="text-sm font-bold">{profile.weight} kg</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-secondary p-3">
                <Ruler className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground">Altura</p>
                  <p className="text-sm font-bold">{profile.height} cm</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-secondary p-3">
              <Target className="h-4 w-4 text-primary" />
              <div>
                <p className="text-[10px] font-bold text-muted-foreground">Meta</p>
                <p className="text-sm font-bold">{profile.goal}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-secondary p-3">
              <Dumbbell className="h-4 w-4 text-primary" />
              <div>
                <p className="text-[10px] font-bold text-muted-foreground">Treinos</p>
                <p className="text-sm font-bold">{profile.trainingDays.join(", ")}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-secondary p-3">
              <Heart className="h-4 w-4 text-accent" />
              <div>
                <p className="text-[10px] font-bold text-muted-foreground">Preferências</p>
                <p className="text-sm font-bold">{profile.preferences.join(", ")}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-secondary p-3">
              <Ban className="h-4 w-4 text-destructive" />
              <div>
                <p className="text-[10px] font-bold text-muted-foreground">Restrições</p>
                <p className="text-sm font-bold">{profile.restrictions.join(", ")}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-muted-foreground">Peso (kg)</label>
              <input
                type="number"
                value={editWeight}
                onChange={(e) => setEditWeight(e.target.value)}
                className="mt-1 w-full rounded-xl border bg-background px-4 py-3 text-sm font-semibold outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground">Objetivo</label>
              <div className="mt-1 space-y-2">
                {goals.map((g) => (
                  <button
                    key={g}
                    onClick={() => setEditGoal(g)}
                    className={`flex w-full items-center rounded-xl border p-3 text-sm font-bold transition-all ${
                      editGoal === g ? "border-primary bg-nutri-green-light text-primary" : "bg-card"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground">Treinos</label>
              <div className="mt-1 flex flex-wrap gap-2">
                {trainingOptions.map((t) => (
                  <button
                    key={t}
                    onClick={() => toggleTraining(t)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-bold transition-all ${
                      editTraining.includes(t) ? "border-primary bg-nutri-green-light text-primary" : "bg-card text-muted-foreground"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Badges */}
      <div className="rounded-xl border bg-card p-5 shadow-sm">
        <h2 className="text-sm font-extrabold mb-3">🏅 Conquistas</h2>
        <div className="grid grid-cols-3 gap-3">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`flex flex-col items-center rounded-xl border p-3 text-center transition-all duration-200 ${
                badge.unlocked
                  ? "bg-nutri-green-light border-primary/30"
                  : "bg-muted/50 opacity-50 grayscale"
              }`}
            >
              <span className="text-2xl">{badge.emoji}</span>
              <p className="mt-1 text-[10px] font-extrabold leading-tight">{badge.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
