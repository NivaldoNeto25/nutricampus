import { useState, useMemo } from "react";
import { useUser } from "@/contexts/UserContext";
import { ChefHat, Check, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

const MealPrepTab = () => {
  const { currentMenu, getEffectiveMeal } = useUser();

  // Flatten all unique meals from the week (respecting overrides)
  const allMeals = useMemo(() => {
    const seen = new Set<string>();
    const meals: { title: string; emoji: string; ingredients: string[]; prepSteps: string[]; dayIndex: number; mealIndex: number }[] = [];
    currentMenu.forEach((day, di) =>
      day.meals.forEach((_, mi) => {
        const m = getEffectiveMeal(di, mi);
        if (!seen.has(m.title) && m.prepSteps.length > 0) {
          seen.add(m.title);
          meals.push({ title: m.title, emoji: m.emoji, ingredients: m.ingredients, prepSteps: m.prepSteps, dayIndex: di, mealIndex: mi });
        }
      })
    );
    return meals;
  }, [currentMenu, getEffectiveMeal]);

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
          <div>
            <h2 className="text-sm font-extrabold mb-3">🍽️ Selecione os pratos para preparar:</h2>
            <div className="space-y-2">
              {allMeals.map((meal) => {
                const isSelected = selectedMeals.has(meal.title);
                return (
                  <button
                    key={meal.title}
                    onClick={() => toggleMeal(meal.title)}
                    className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all duration-200 ${
                      isSelected ? "border-primary bg-nutri-green-light" : "bg-card hover:shadow-sm"
                    }`}
                  >
                    <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all duration-200 ${
                      isSelected ? "border-primary bg-primary" : "border-muted-foreground/30"
                    }`}>
                      {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                    </div>
                    <span className="text-xl">{meal.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate">{meal.title}</p>
                      <p className="text-[10px] text-muted-foreground">{meal.ingredients.slice(0, 3).join(", ")}...</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={generateSteps}
            disabled={selectedMeals.size === 0}
            className={`flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold transition-all duration-200 ${
              selectedMeals.size > 0
                ? "bg-primary text-primary-foreground shadow-md hover:opacity-90"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            <Sparkles className="h-4 w-4" />
            Gerar Passo a Passo ({selectedMeals.size} selecionados)
          </button>
        </>
      ) : (
        <>
          <div className="space-y-3">
            {generatedSteps.map((step, i) => (
              <button
                key={i}
                onClick={() => toggleStep(i)}
                className={`w-full rounded-xl border p-4 text-left transition-all duration-200 ${
                  step.done ? "border-nutri-success/30 bg-nutri-green-light" : "bg-card hover:shadow-sm"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-all duration-200 ${
                    step.done ? "border-nutri-success bg-nutri-success text-primary-foreground" : "border-primary text-primary"
                  }`}>
                    {step.done ? <Check className="h-4 w-4" /> : i + 1}
                  </div>
                  <p className={`text-sm font-semibold leading-tight transition-all duration-200 ${step.done ? "line-through opacity-50" : ""}`}>
                    {step.step.replace(/^\d+\.\s*/, "")}
                  </p>
                </div>
              </button>
            ))}
          </div>

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
