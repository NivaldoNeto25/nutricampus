import { useState } from "react";
import { useUser, CookingSkill } from "@/contexts/UserContext";
import { User, Flame, Zap, Target, Dumbbell, Heart, Ban, Scale, Ruler, Pencil, ArrowRight, TrendingUp, TrendingDown, Minus, ChefHat, Download } from "lucide-react";
import jsPDF from "jspdf";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, PieChart, Pie, Cell } from "recharts";

const goals = ["Economizar tempo", "Mais energia", "Ganhar massa"];
const skillOptions: CookingSkill[] = ["Mínimo", "Básico", "Tranquilo"];

const ProfileTab = () => {
  const { profile, initialData, currentData, streak, badges, getWeeklyProgress, mealCompletions, progress, currentMenu, updateCurrentData } = useUser();
  const weeklyProgress = getWeeklyProgress();
  const [editing, setEditing] = useState(false);
  const [editWeight, setEditWeight] = useState("");
  const [editGoal, setEditGoal] = useState("");
  const [editTraining, setEditTraining] = useState<string[]>([]);
  const [editSkill, setEditSkill] = useState<CookingSkill>("Básico");

  const trainingOptions = ["Push/Pull/Legs", "Upper/Lower", "Cardio", "Abdômen/Core", "Não treino"];

  const startEditing = () => {
    if (!currentData) return;
    setEditWeight(String(currentData.weight));
    setEditGoal(currentData.goal);
    setEditTraining([...currentData.trainingDays]);
    setEditSkill(currentData.cookingSkill);
    setEditing(true);
  };

  const saveEdits = () => {
    updateCurrentData({
      weight: parseFloat(editWeight) || currentData!.weight,
      goal: editGoal,
      trainingDays: editTraining,
      cookingSkill: editSkill,
    });
    setEditing(false);
  };

  const toggleTraining = (t: string) => {
    setEditTraining((prev) =>
      prev.includes(t) ? prev.filter((v) => v !== t) : [...prev, t]
    );
  };

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

  const chartConfig = { completed: { label: "Refeições", color: "hsl(var(--primary))" } };
  const pieConfig = {
    Completo: { label: "Completo", color: "hsl(var(--primary))" },
    Restante: { label: "Restante", color: "hsl(var(--muted))" },
  };

  if (!profile) return null;

  const weightDiff = initialData && currentData ? currentData.weight - initialData.weight : 0;
  const goalChanged = initialData && currentData ? initialData.goal !== currentData.goal : false;
  const skillChanged = initialData && currentData ? initialData.cookingSkill !== currentData.cookingSkill : false;

  const exportReport = () => {
    if (!initialData || !currentData) return;
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageW = doc.internal.pageSize.getWidth();
    const margin = 48;
    let y = margin;
    const date = new Date().toLocaleDateString("pt-BR");

    // Header band
    doc.setFillColor(34, 139, 79);
    doc.rect(0, 0, pageW, 70, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("NutriCampus", margin, 32);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Relatorio de Progresso", margin, 50);
    doc.text(`Gerado em ${date}`, pageW - margin, 50, { align: "right" });

    y = 100;
    doc.setTextColor(20, 20, 20);

    const section = (title: string) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(34, 139, 79);
      doc.text(title, margin, y);
      y += 8;
      doc.setDrawColor(220, 220, 220);
      doc.line(margin, y, pageW - margin, y);
      y += 16;
      doc.setTextColor(20, 20, 20);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
    };

    const row = (label: string, value: string) => {
      doc.setFont("helvetica", "bold");
      doc.text(label, margin, y);
      doc.setFont("helvetica", "normal");
      doc.text(value, margin + 180, y);
      y += 18;
    };

    section("Dados do Usuario");
    row("Nome:", currentData.name);
    row("Altura:", `${currentData.height} cm`);

    y += 8;
    section("Rotina");
    if (currentData.schedule) {
      row("Dias uteis:", `${currentData.schedule.weekdayLeave} - ${currentData.schedule.weekdayReturn}`);
      row("Fim de semana:", `${currentData.schedule.weekendLeave} - ${currentData.schedule.weekendReturn}`);
    } else {
      row("Rotina:", "Nao informada");
    }

    y += 8;
    section("Evolucao");
    row("Peso inicial:", `${initialData.weight} kg`);
    row("Peso atual:", `${currentData.weight} kg`);
    row("Variacao:", `${weightDiff >= 0 ? "+" : ""}${weightDiff.toFixed(1)} kg`);
    row("Objetivo inicial:", initialData.goal);
    row("Objetivo atual:", currentData.goal);
    row("Habilidade inicial:", initialData.cookingSkill);
    row("Habilidade atual:", currentData.cookingSkill);

    y += 8;
    section("Gamificacao");
    row("XP acumulado:", `${progress.xp}`);
    row("Streak:", `${streak} dias`);
    row("Progresso semanal:", `${weeklyProgress}%`);

    y += 8;
    section("Badges Desbloqueadas");
    const unlocked = badges.filter((b) => b.unlocked);
    if (unlocked.length === 0) {
      doc.text("(nenhuma ainda)", margin, y);
      y += 18;
    } else {
      unlocked.forEach((b) => {
        if (y > 780) { doc.addPage(); y = margin; }
        doc.setFont("helvetica", "bold");
        doc.text(`- ${b.title}`, margin, y);
        doc.setFont("helvetica", "normal");
        doc.text(b.description, margin + 180, y);
        y += 16;
      });
    }

    doc.save(`nutricampus-relatorio-${Date.now()}.pdf`);
  };

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
              <p className="text-sm opacity-80">{profile.goal} • {profile.cookingSkill}</p>
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
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-extrabold">📈 Relatório de Evolução</h2>
            <button
              onClick={exportReport}
              className="flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-[10px] font-extrabold text-primary-foreground hover:opacity-90 transition"
            >
              <Download className="h-3 w-3" /> Exportar
            </button>
          </div>
          <div className="space-y-3">
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

            <div className="flex items-center gap-3 rounded-lg bg-secondary p-3">
              <Target className="h-5 w-5 text-primary shrink-0" />
              <div className="flex-1">
                <p className="text-[10px] font-bold text-muted-foreground">Objetivo</p>
                <div className="flex items-center gap-2 text-sm font-bold">
                  <span>{initialData.goal}</span>
                  {goalChanged ? (
                    <>
                      <ArrowRight className="h-3 w-3 text-muted-foreground" />
                      <span className="text-primary">{currentData.goal}</span>
                    </>
                  ) : (
                    <span className="text-[10px] font-bold text-muted-foreground">(mantido)</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg bg-secondary p-3">
              <ChefHat className="h-5 w-5 text-primary shrink-0" />
              <div className="flex-1">
                <p className="text-[10px] font-bold text-muted-foreground">Habilidade Culinária</p>
                <div className="flex items-center gap-2 text-sm font-bold">
                  <span>{initialData.cookingSkill}</span>
                  {skillChanged ? (
                    <>
                      <ArrowRight className="h-3 w-3 text-muted-foreground" />
                      <span className="text-primary">{currentData.cookingSkill}</span>
                    </>
                  ) : (
                    <span className="text-[10px] font-bold text-muted-foreground">(mantido)</span>
                  )}
                </div>
              </div>
            </div>

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
                <Cell fill="hsl(var(--primary))" />
                <Cell fill="hsl(var(--muted))" />
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
            <Bar dataKey="completed" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
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
              <ChefHat className="h-4 w-4 text-primary" />
              <div>
                <p className="text-[10px] font-bold text-muted-foreground">Habilidade Culinária</p>
                <p className="text-sm font-bold">{profile.cookingSkill}</p>
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
              <label className="text-xs font-bold text-muted-foreground">Habilidade Culinária</label>
              <div className="mt-1 space-y-2">
                {skillOptions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setEditSkill(s)}
                    className={`flex w-full items-center rounded-xl border p-3 text-sm font-bold transition-all ${
                      editSkill === s ? "border-primary bg-nutri-green-light text-primary" : "bg-card"
                    }`}
                  >
                    {s}
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
