import { useState } from "react";
import { prepSteps, PrepStep } from "@/data/mockData";
import { ChefHat, Check, Clock, Lightbulb } from "lucide-react";

const MealPrepTab = () => {
  const [steps, setSteps] = useState<PrepStep[]>(prepSteps);

  const toggleStep = (id: string) => {
    setSteps((prev) =>
      prev.map((s) => (s.id === id ? { ...s, done: !s.done } : s))
    );
  };

  const doneCount = steps.filter((s) => s.done).length;
  const progress = Math.round((doneCount / steps.length) * 100);

  return (
    <div className="space-y-5 pb-4">
      {/* Header */}
      <div className="rounded-2xl bg-primary p-5 text-primary-foreground">
        <div className="flex items-center gap-2">
          <ChefHat className="h-5 w-5" />
          <h1 className="text-xl font-extrabold">Guia Meal Prep</h1>
        </div>
        <p className="mt-1 text-sm opacity-80">Domingo é dia de cozinhar! 🍳</p>
        <div className="mt-3 flex items-center gap-3">
          <div className="flex-1">
            <div className="h-2 rounded-full bg-primary-foreground/20">
              <div
                className="h-2 rounded-full bg-accent transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <span className="text-xs font-bold">{doneCount}/{steps.length}</span>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {steps.map((step) => (
          <button
            key={step.id}
            onClick={() => toggleStep(step.id)}
            className={`w-full rounded-xl border p-4 text-left transition-all duration-200 ${
              step.done
                ? "border-nutri-success/30 bg-nutri-green-light"
                : "bg-card hover:shadow-sm"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex flex-col items-center gap-1">
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-all duration-200 ${
                    step.done
                      ? "border-nutri-success bg-nutri-success text-primary-foreground"
                      : "border-primary text-primary"
                  }`}
                >
                  {step.done ? <Check className="h-4 w-4" /> : step.order}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3
                  className={`text-sm font-bold leading-tight transition-all duration-200 ${
                    step.done ? "line-through opacity-50" : ""
                  }`}
                >
                  {step.title}
                </h3>
                <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {step.duration}
                </div>
                {step.tip && !step.done && (
                  <div className="mt-2 flex items-start gap-1.5 rounded-lg bg-nutri-orange-light px-3 py-2 text-xs">
                    <Lightbulb className="h-3.5 w-3.5 mt-0.5 shrink-0 text-accent" />
                    <span className="text-foreground/80">{step.tip}</span>
                  </div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {doneCount === steps.length && (
        <div className="rounded-xl bg-nutri-green-light p-5 text-center animate-in fade-in zoom-in duration-300">
          <span className="text-3xl">🎉</span>
          <h3 className="mt-2 text-lg font-extrabold text-primary">Parabéns!</h3>
          <p className="text-sm text-muted-foreground">Sua semana de refeições está pronta!</p>
        </div>
      )}
    </div>
  );
};

export default MealPrepTab;
