import { useState, useMemo } from "react";
import { useUser } from "@/contexts/UserContext";
import { ChefHat, Check, Sparkles, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MealType } from "@/data/mockData";

const MEAL_TYPES: MealType[] = [
  "Café da Manhã",
  "Lanche da Manhã",
  "Almoço",
  "Lanche da Tarde",
  "Jantar",
];
const TAB_LABELS: Record<MealType, string> = {
  "Café da Manhã": "Café",
  "Lanche da Manhã": "Lanche M.",
  "Almoço": "Almoço",
  "Lanche da Tarde": "Lanche T.",
  "Jantar": "Jantar",
};

const MealPrepTab = () => {
  const { currentMenu, getEffectiveMeal } = useUser();

  // Flatten all unique meals from the week (respecting overrides)
  const allMeals = useMemo(() => {
    const seen = new Set<string>();
    const meals: { title: string; emoji: string; type: MealType; ingredients: string[]; prepSteps: string[]; dayIndex: number; mealIndex: number }[] = [];
    currentMenu.forEach((day, di) =>
      day.meals.forEach((_, mi) => {
        const m = getEffectiveMeal(di, mi);
        if (!seen.has(m.title) && m.prepSteps.length > 0) {
          seen.add(m.title);
          meals.push({ title: m.title, emoji: m.emoji, type: m.type, ingredients: m.ingredients, prepSteps: m.prepSteps, dayIndex: di, mealIndex: mi });
        }
      })
    );
    return meals;
  }, [currentMenu, getEffectiveMeal]);

  const mealsByType = useMemo(() => {
    const map: Record<MealType, typeof allMeals> = {
      "Café da Manhã": [], "Lanche da Manhã": [], "Almoço": [], "Lanche da Tarde": [], "Jantar": [],
    };
    allMeals.forEach((m) => map[m.type]?.push(m));
    return map;
  }, [allMeals]);

  const defaultTab = useMemo<MealType>(() => {
    return (MEAL_TYPES.find((t) => mealsByType[t].length > 0) || "Almoço") as MealType;
  }, [mealsByType]);

  const [selectedMeals, setSelectedMeals] = useState<Set<string>>(new Set());
  const [generatedSteps, setGeneratedSteps] = useState<{ step: string; done: boolean }[] | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const toggleMeal = (title: string) => {
    setSelectedMeals((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
    setGeneratedSteps(null);
  };

  const generateSteps = () => {
    const steps: string[] = [];
    let stepNum = 1;
    const selected = allMeals.filter((m) => selectedMeals.has(m.title));

    // Consolidate steps from selected meals
    selected.forEach((meal) => {
      meal.prepSteps.forEach((s) => {
        steps.push(`${stepNum}. [${meal.emoji} ${meal.title}] ${s}`);
        stepNum++;
      });
    });

    steps.push(`${stepNum}. Monte os potes, etiquete com o dia da semana e guarde na geladeira/freezer 📦`);

    setGeneratedSteps(steps.map((s) => ({ step: s, done: false })));
    setCurrentStep(0);
  };

  const toggleStep = (index: number) => {
    setGeneratedSteps((prev) =>
      prev ? prev.map((s, i) => (i === index ? { ...s, done: !s.done } : s)) : null
    );
  };

  const doneCount = generatedSteps?.filter((s) => s.done).length || 0;
  const totalSteps = generatedSteps?.length || 0;
  const progressVal = totalSteps > 0 ? Math.round((doneCount / totalSteps) * 100) : 0;

  return (
    <div className="space-y-5 pb-4">
      <div className="rounded-2xl bg-primary p-5 text-primary-foreground">
        <div className="flex items-center gap-2">
          <ChefHat className="h-5 w-5" />
          <h1 className="text-xl font-extrabold">Guia Meal Prep</h1>
        </div>
        <p className="mt-1 text-sm opacity-80">Selecione o que vai cozinhar e gere o passo a passo! 🍳</p>
        {generatedSteps && (
          <div className="mt-3 flex items-center gap-3">
            <div className="flex-1">
              <div className="h-2 rounded-full bg-primary-foreground/20">
                <div className="h-2 rounded-full bg-accent transition-all duration-500" style={{ width: `${progressVal}%` }} />
              </div>
            </div>
            <span className="text-xs font-bold">{doneCount}/{totalSteps}</span>
          </div>
        )}
      </div>

      {!generatedSteps ? (
        <>
          <div className="pb-24">
            <h2 className="text-sm font-extrabold mb-3">🍽️ Selecione os pratos por refeição:</h2>
            <Tabs defaultValue={defaultTab}>
              <TabsList className="w-full justify-between overflow-x-auto h-auto p-1 bg-secondary">
                {MEAL_TYPES.map((t) => {
                  const count = mealsByType[t].length;
                  const selectedHere = mealsByType[t].filter((m) => selectedMeals.has(m.title)).length;
                  return (
                    <TabsTrigger
                      key={t}
                      value={t}
                      disabled={count === 0}
                      className="relative flex-1 text-[11px] font-bold px-2 py-2 data-[state=active]:bg-background"
                    >
                      {TAB_LABELS[t]}
                      {selectedHere > 0 && (
                        <span className="ml-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-extrabold text-primary-foreground">
                          {selectedHere}
                        </span>
                      )}
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {MEAL_TYPES.map((t) => (
                <TabsContent key={t} value={t} className="mt-4">
                  {mealsByType[t].length === 0 ? (
                    <p className="rounded-xl border bg-card p-4 text-center text-xs text-muted-foreground">
                      Sem pratos para preparar nesta categoria.
                    </p>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      {mealsByType[t].map((meal) => {
                        const isSelected = selectedMeals.has(meal.title);
                        return (
                          <button
                            key={meal.title}
                            onClick={() => toggleMeal(meal.title)}
                            className={`relative flex flex-col items-start gap-2 rounded-xl border-2 p-3 text-left transition-all duration-200 ${
                              isSelected
                                ? "border-primary bg-nutri-green-light shadow-md scale-[0.98]"
                                : "border-border bg-card hover:border-primary/40 hover:shadow-sm"
                            }`}
                          >
                            {isSelected && (
                              <div className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow">
                                <Check className="h-4 w-4" strokeWidth={3} />
                              </div>
                            )}
                            <span className="text-3xl">{meal.emoji}</span>
                            <p className="text-xs font-extrabold leading-tight line-clamp-2">{meal.title}</p>
                            <p className="text-[10px] text-muted-foreground line-clamp-2">
                              {meal.ingredients.slice(0, 3).join(", ")}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Floating action button */}
          {selectedMeals.size > 0 && (
            <div className="fixed inset-x-0 bottom-20 z-40 px-4 animate-in fade-in slide-in-from-bottom-4 duration-200">
              <div className="mx-auto max-w-md">
                <button
                  onClick={generateSteps}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-sm font-extrabold text-primary-foreground shadow-lg ring-4 ring-primary/15 hover:opacity-90 transition"
                >
                  <Sparkles className="h-4 w-4" />
                  Iniciar Preparo ({selectedMeals.size} {selectedMeals.size === 1 ? "item selecionado" : "itens selecionados"})
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {(() => {
            const step = generatedSteps[currentStep];
            const isLast = currentStep === totalSteps - 1;
            return (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-bold text-muted-foreground">
                  <span>Passo {currentStep + 1} de {totalSteps}</span>
                  <span>{doneCount} concluídos</span>
                </div>

                <div className={`rounded-2xl border p-6 min-h-[180px] flex flex-col justify-between transition-all ${
                  step.done ? "border-nutri-success/40 bg-nutri-green-light" : "bg-card shadow-sm"
                }`}>
                  <div className="flex items-start gap-3">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-base font-extrabold ${
                      step.done ? "border-nutri-success bg-nutri-success text-primary-foreground" : "border-primary text-primary"
                    }`}>
                      {step.done ? <Check className="h-5 w-5" /> : currentStep + 1}
                    </div>
                    <p className={`text-base font-semibold leading-snug ${step.done ? "line-through opacity-60" : ""}`}>
                      {step.step.replace(/^\d+\.\s*/, "")}
                    </p>
                  </div>

                  <button
                    onClick={() => toggleStep(currentStep)}
                    className={`mt-5 w-full rounded-xl py-2.5 text-sm font-bold transition-all ${
                      step.done
                        ? "bg-muted text-muted-foreground"
                        : "bg-primary text-primary-foreground hover:opacity-90"
                    }`}
                  >
                    {step.done ? "Desmarcar" : "Marcar como feito ✓"}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
                    disabled={currentStep === 0}
                    className="flex h-12 w-12 items-center justify-center rounded-xl border bg-card disabled:opacity-40 hover:bg-secondary transition"
                    aria-label="Passo anterior"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setCurrentStep((s) => Math.min(totalSteps - 1, s + 1))}
                    disabled={isLast}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground disabled:opacity-40 hover:opacity-90 transition"
                  >
                    Próximo passo <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Step dots */}
                <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                  {generatedSteps.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentStep(i)}
                      aria-label={`Ir para passo ${i + 1}`}
                      className={`h-2 rounded-full transition-all ${
                        i === currentStep ? "w-6 bg-primary" :
                        s.done ? "w-2 bg-nutri-success" : "w-2 bg-muted"
                      }`}
                    />
                  ))}
                </div>
              </div>
            );
          })()}

          <button
            onClick={() => { setGeneratedSteps(null); setSelectedMeals(new Set()); }}
            className="flex w-full items-center justify-center gap-2 rounded-xl border bg-card py-3 text-sm font-bold text-primary transition-colors hover:bg-secondary"
          >
            ← Selecionar outros pratos
          </button>

          {doneCount === totalSteps && (
            <div className="rounded-xl bg-nutri-green-light p-5 text-center animate-in fade-in zoom-in duration-300">
              <span className="text-3xl">🎉</span>
              <h3 className="mt-2 text-lg font-extrabold text-primary">Parabéns!</h3>
              <p className="text-sm text-muted-foreground">Sua semana de refeições está pronta!</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MealPrepTab;
