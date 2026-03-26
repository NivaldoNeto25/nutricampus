import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { ChevronRight, Flame, CalendarDays, Check, Repeat, Zap } from "lucide-react";

const mealTypeColors: Record<string, string> = {
  "Café da Manhã": "bg-nutri-orange-light text-accent",
  "Lanche da Manhã": "bg-secondary text-secondary-foreground",
  "Almoço": "bg-nutri-green-light text-primary",
  "Lanche da Tarde": "bg-nutri-orange-light text-accent",
  "Jantar": "bg-secondary text-secondary-foreground",
};

const MenuTab = () => {
  const { mealCompletions, toggleMealCompletion, streak, currentMenu, profile, progress } = useUser();
  const [showWeek, setShowWeek] = useState(false);
  const [subOpen, setSubOpen] = useState<string | null>(null);

  const today = new Date().getDay();
  const dayIndex = today === 0 ? 6 : today - 1;
  const currentDay = currentMenu[dayIndex];
  const dayMeals = (mealCompletions[dayIndex] as boolean[] | undefined) || currentDay.meals.map(() => false);

  const daysCompleted = Object.keys(mealCompletions).length;
  const progressPct = Math.round((daysCompleted / 7) * 100);

  return (
    <div className="space-y-5 pb-4">
      {/* Header */}
      <div className="rounded-2xl bg-primary p-5 text-primary-foreground">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold opacity-80">Olá, {profile?.name || "estudante"}! 👋</p>
            <h1 className="mt-1 text-xl font-extrabold">Seu cardápio de hoje</h1>
            <p className="mt-0.5 text-sm opacity-80">{currentDay.day}</p>
            {currentDay.trainingNote && (
              <p className="mt-1 text-xs font-bold opacity-90">{currentDay.trainingNote}</p>
            )}
          </div>
          <div className="flex flex-col items-end gap-1.5">
            {streak > 0 && (
              <div className="flex items-center gap-1 rounded-full bg-accent px-3 py-1.5 text-accent-foreground">
                <Flame className="h-4 w-4" />
                <span className="text-sm font-extrabold">{streak}</span>
              </div>
            )}
            <div className="flex items-center gap-1 rounded-full bg-primary-foreground/20 px-2.5 py-1">
              <Zap className="h-3 w-3" />
              <span className="text-[10px] font-bold">{progress.xp} XP</span>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs font-semibold opacity-80">
            <span>Progresso da semana</span>
            <span>{daysCompleted}/7 dias ativos</span>
          </div>
          <div className="mt-1.5 h-2 rounded-full bg-primary-foreground/20">
            <div
              className="h-2 rounded-full bg-accent transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Today's 5 meals */}
      <div className="space-y-3">
        {currentDay.meals.map((meal, i) => {
          const completed = dayMeals[i] || false;
          const isSubOpen = subOpen === `${dayIndex}-${i}`;

          return (
            <div key={i} className="space-y-0">
              <div
                className={`flex items-start gap-3 rounded-xl border p-4 shadow-sm transition-all duration-200 ${
                  completed ? "border-nutri-success/30 bg-nutri-green-light" : "bg-card hover:shadow-md"
                }`}
              >
                <span className="text-3xl">{meal.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${mealTypeColors[meal.type] || "bg-muted text-muted-foreground"}`}>
                      {meal.type}
                    </span>
                    <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                      <Flame className="h-3 w-3" />
                      {meal.calories} kcal
                    </span>
                  </div>
                  <h3 className={`mt-1 text-sm font-bold leading-tight transition-all duration-200 ${completed ? "line-through opacity-60" : ""}`}>
                    {meal.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">{meal.description}</p>

                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => toggleMealCompletion(dayIndex, i)}
                      className={`flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-bold transition-all duration-200 ${
                        completed
                          ? "bg-nutri-success text-primary-foreground"
                          : "border border-primary/30 text-primary hover:bg-nutri-green-light"
                      }`}
                    >
                      <Check className="h-3 w-3" />
                      {completed ? "Feito! +15XP" : "Comi"}
                    </button>
                    <button
                      onClick={() => setSubOpen(isSubOpen ? null : `${dayIndex}-${i}`)}
                      className="flex items-center gap-1 rounded-full border border-accent/30 px-3 py-1 text-[10px] font-bold text-accent transition-all duration-200 hover:bg-nutri-orange-light"
                    >
                      <Repeat className="h-3 w-3" />
                      Substituir
                    </button>
                  </div>
                </div>
              </div>

              {isSubOpen && (
                <div className="ml-10 space-y-1 rounded-b-xl border border-t-0 bg-nutri-orange-light p-3 animate-in fade-in slide-in-from-top-1 duration-200">
                  <p className="text-[10px] font-bold text-accent mb-1.5">💡 Ingredientes desta refeição:</p>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {meal.ingredients.map((ing, ii) => (
                      <span key={ii} className="rounded-full bg-card px-2 py-0.5 text-[10px] font-semibold">{ing}</span>
                    ))}
                  </div>
                  <p className="text-[10px] font-bold text-accent">🔄 Troque por refeição similar do mesmo tipo</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Full week toggle */}
      <button
        onClick={() => setShowWeek(!showWeek)}
        className="flex w-full items-center justify-center gap-2 rounded-xl border bg-card py-3 text-sm font-bold text-primary transition-colors hover:bg-secondary"
      >
        <CalendarDays className="h-4 w-4" />
        {showWeek ? "Esconder semana" : "Ver semana completa"}
        <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${showWeek ? "rotate-90" : ""}`} />
      </button>

      {showWeek && (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          {currentMenu.map((day, di) => (
            <div key={di} className={`rounded-xl border p-4 ${di === dayIndex ? "border-primary bg-nutri-green-light" : "bg-card"}`}>
              <h3 className="text-sm font-extrabold">
                {day.day} {di === dayIndex && <span className="text-primary">(Hoje)</span>}
                {day.trainingNote && <span className="ml-2 text-xs font-bold opacity-70">{day.trainingNote}</span>}
              </h3>
              <div className="mt-2 space-y-1.5">
                {day.meals.map((meal, mi) => {
                  const done = (mealCompletions[di] as boolean[] | undefined)?.[mi] || false;
                  return (
                    <div key={mi} className="flex items-center gap-2 text-xs">
                      {done ? <Check className="h-3 w-3 text-nutri-success" /> : <span className="w-3" />}
                      <span>{meal.emoji}</span>
                      <span className="font-semibold text-muted-foreground w-24 shrink-0">{meal.type}</span>
                      <span className={`truncate ${done ? "line-through opacity-50" : ""}`}>{meal.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuTab;
