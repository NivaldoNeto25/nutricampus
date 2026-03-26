import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { User, Flame, Trophy, Edit3, ChevronRight, Target, Dumbbell, Heart, Ban } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, PieChart, Pie, Cell } from "recharts";

const ProfileTab = () => {
  const { profile, streak, badges, getWeeklyProgress, mealCompletions } = useUser();
  const [editing, setEditing] = useState(false);
  const weeklyProgress = getWeeklyProgress();

  // Weekly bar data
  const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
  const barData = days.map((day, i) => {
    const dayMeals = (mealCompletions[i] as boolean[] | undefined) || [];
    const done = dayMeals.filter(Boolean).length;
    return { day, completed: done, total: 3 };
  });

  const pieData = [
    { name: "Completo", value: weeklyProgress },
    { name: "Restante", value: 100 - weeklyProgress },
  ];

  const chartConfig = {
    completed: { label: "Refeições", color: "hsl(152 55% 38%)" },
  };

  const pieConfig = {
    Completo: { label: "Completo", color: "hsl(152 55% 38%)" },
    Restante: { label: "Restante", color: "hsl(90 15% 94%)" },
  };

  if (!profile) return null;

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
              <h1 className="text-xl font-extrabold">Meu Perfil</h1>
              <p className="text-sm opacity-80">Olá, {profile.name}! 👋</p>
            </div>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-accent px-3 py-1.5">
            <Flame className="h-4 w-4" />
            <span className="text-sm font-extrabold">{streak}</span>
          </div>
        </div>
      </div>

      {/* Weekly Progress Pie */}
      <div className="rounded-xl border bg-card p-5 shadow-sm">
        <h2 className="text-sm font-extrabold mb-3">📊 Progresso Semanal</h2>
        <div className="flex items-center gap-4">
          <ChartContainer config={pieConfig} className="h-28 w-28">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={50}
                dataKey="value"
                strokeWidth={0}
              >
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

      {/* Profile Info */}
      <div className="rounded-xl border bg-card p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-extrabold">👤 Seus Dados</h2>
          <button
            onClick={() => setEditing(!editing)}
            className="flex items-center gap-1 text-xs font-bold text-primary"
          >
            <Edit3 className="h-3 w-3" /> Editar
          </button>
        </div>
        <div className="space-y-3">
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
