import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { ChevronRight, Flame, CalendarDays, Check, Repeat, Zap, CookingPot, Clock } from "lucide-react";
import SubstitutionModal from "@/components/SubstitutionModal";
import { Meal, MealType } from "@/data/mockData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const mealTypeColors: Record<string, string> = {
  "Café da Manhã": "bg-nutri-orange-light text-accent",
  "Lanche da Manhã": "bg-secondary text-secondary-foreground",
  "Almoço": "bg-nutri-green-light text-primary",
  "Lanche da Tarde": "bg-nutri-orange-light text-accent",
  "Jantar": "bg-secondary text-secondary-foreground",
};

const MenuTab = () => {
  const { mealCompletions, toggleMealCompletion, substituteMealWith, getSubstitutionChoices, streak, currentMenu, profile, progress, getEffectiveMeal } = useUser();
  const [showWeek, setShowWeek] = useState(false);
  const [subState, setSubState] = useState<{ open: boolean; dayIndex: number; mealIndex: number; options: Meal[]; currentTitle: string }>({
    open: false, dayIndex: 0, mealIndex: 0, options: [], currentTitle: "",
  });

  const today = new Date().getDay();
  const dayIndex = today === 0 ? 6 : today - 1;
  const currentDay = currentMenu[dayIndex];
  const dayMeals = (mealCompletions[dayIndex] as boolean[] | undefined) || currentDay.meals.map(() => false);

  const daysCompleted = Object.keys(mealCompletions).length;
  const progressPct = Math.round((daysCompleted / 7) * 100);

  // Compute meal times based on user's routine schedule
  const isWeekend = dayIndex >= 5;
  const sched = profile?.schedule;
  const leave = sched ? (isWeekend ? sched.weekendLeave : sched.weekdayLeave) : "07:30";
  const back = sched ? (isWeekend ? sched.weekendReturn : sched.weekdayReturn) : "19:00";

  const toMin = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return (h || 0) * 60 + (m || 0);
  };
  const fromMin = (m: number) => {
    const total = ((m % (24 * 60)) + 24 * 60) % (24 * 60);
    const h = Math.floor(total / 60), mm = total % 60;
    return `${String(h).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
  };
  const leaveMin = toMin(leave);
  const backMin = toMin(back);
  // Distribute 5 meals: breakfast 30min before leave, lunch midpoint, etc.
  const mealTimes: Record<MealType, string> = {
    "Café da Manhã": fromMin(leaveMin - 30),
    "Lanche da Manhã": fromMin(leaveMin + 180),
    "Almoço": fromMin(Math.round((leaveMin + backMin) / 2)),
    "Lanche da Tarde": fromMin(backMin - 60),
    "Jantar": fromMin(backMin + 90),
  };

  const openSubstitution = (di: number, mi: number) => {
    const m = getEffectiveMeal(di, mi);
    setSubState({
      open: true,
      dayIndex: di,
      mealIndex: mi,
      options: getSubstitutionChoices(di, mi),
      currentTitle: m.title,
    });
  };

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

      {/* Today's meals - Accordion */}
      <Accordion type="single" collapsible className="space-y-3">
        {currentDay.meals.map((_, i) => {
          const meal = getEffectiveMeal(dayIndex, i);
          const completed = dayMeals[i] || false;
          const time = mealTimes[meal.type as MealType];

          return (
            <AccordionItem
              key={i}
              value={`meal-${i}`}
              className={`rounded-xl border shadow-sm transition-all duration-200 overflow-hidden ${
                completed ? "border-nutri-success/30 bg-nutri-green-light" : "bg-card"
              }`}
            >
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{meal.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${mealTypeColors[meal.type] || "bg-muted text-muted-foreground"}`}>
                        {meal.type}
                      </span>
                      {time && (
                        <span className="flex items-center gap-0.5 text-[10px] font-bold text-primary">
                          <Clock className="h-3 w-3" />
                          {time}
                        </span>
                      )}
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
                        onClick={(e) => { e.stopPropagation(); toggleMealCompletion(dayIndex, i); }}
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
                        onClick={(e) => { e.stopPropagation(); openSubstitution(dayIndex, i); }}
                        className="flex items-center gap-1 rounded-full border border-accent/30 px-3 py-1 text-[10px] font-bold text-accent transition-all duration-200 hover:bg-nutri-orange-light"
                      >
                        <Repeat className="h-3 w-3" />
                        Substituir
                      </button>
                    </div>
                  </div>
                </div>

                {/* Accordion trigger */}
                <AccordionTrigger className="pt-2 pb-0 text-[10px] font-bold text-muted-foreground hover:no-underline">
                  Ver detalhes
                </AccordionTrigger>
              </div>

              <AccordionContent className="px-4 pb-4 pt-0">
                <div className="space-y-3 rounded-lg bg-secondary/50 p-3">
                  <div>
                    <p className="text-[10px] font-extrabold text-primary mb-1.5">🧾 Ingredientes:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {meal.ingredients.map((ing, ii) => (
                        <span key={ii} className="rounded-full bg-card px-2 py-0.5 text-[10px] font-semibold border">
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-extrabold text-primary mb-1.5">
                      <CookingPot className="h-3 w-3 inline mr-1" />
                      Modo de Preparo:
                    </p>
                    <ol className="space-y-1 pl-4 list-decimal">
                      {meal.prepSteps.map((step, si) => (
                        <li key={si} className="text-[11px] text-muted-foreground font-medium">{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

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
                {day.meals.map((_, mi) => {
                  const meal = getEffectiveMeal(di, mi);
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

      <SubstitutionModal
        open={subState.open}
        onOpenChange={(o) => setSubState((s) => ({ ...s, open: o }))}
        options={subState.options}
        currentTitle={subState.currentTitle}
        onSelect={(meal) => substituteMealWith(subState.dayIndex, subState.mealIndex, meal)}
      />
    </div>
  );
};

export default MenuTab;
