import { useState } from "react";
import { useUser, UserProfile } from "@/contexts/UserContext";
import { ChevronRight, ChevronLeft, Sparkles } from "lucide-react";

const goals = [
  { label: "Ter mais energia", emoji: "⚡" },
  { label: "Economizar tempo", emoji: "⏰" },
  { label: "Manter o peso", emoji: "⚖️" },
  { label: "Ganhar massa", emoji: "💪" },
];

const routines = [
  { label: "Trabalho + Faculdade (integral)", emoji: "🏢" },
  { label: "Só faculdade (meio período)", emoji: "🎓" },
  { label: "Home office + Faculdade", emoji: "🏠" },
];

const trainingOptions = [
  { label: "Push/Pull/Legs", emoji: "🏋️" },
  { label: "Upper/Lower", emoji: "💪" },
  { label: "Cardio", emoji: "🏃" },
  { label: "Abdômen/Core", emoji: "🧘" },
  { label: "Não treino", emoji: "😴" },
];

const preferenceOptions = [
  "Frango", "Carne", "Ovos", "Arroz", "Massas", "Saladas", "Frutas", "Doces fit",
];

const restrictionOptions = [
  "Frutos do mar", "Lactose", "Glúten", "Amendoim", "Carne vermelha", "Nenhuma",
];

const OnboardingWizard = () => {
  const { completeOnboarding } = useUser();
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState("");
  const [routine, setRoutine] = useState("");
  const [training, setTraining] = useState<string[]>([]);
  const [preferences, setPreferences] = useState<string[]>([]);
  const [restrictions, setRestrictions] = useState<string[]>([]);

  const toggleArray = (arr: string[], val: string, setter: (v: string[]) => void) => {
    setter(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  const canProceed = () => {
    if (step === 0) return !!goal;
    if (step === 1) return !!routine && training.length > 0;
    if (step === 2) return preferences.length > 0 && restrictions.length > 0;
    return true;
  };

  const handleFinish = () => {
    const profile: UserProfile = {
      name: "Estudante",
      goal,
      weeklyRoutine: routine,
      trainingDays: training,
      preferences,
      restrictions,
    };
    completeOnboarding(profile);
  };

  const steps = [
    // Step 0: Goal
    <div key="goal" className="space-y-4">
      <div className="text-center">
        <span className="text-4xl">🎯</span>
        <h2 className="mt-2 text-lg font-extrabold">Qual sua meta principal?</h2>
        <p className="text-sm text-muted-foreground">Isso nos ajuda a personalizar suas refeições</p>
      </div>
      <div className="space-y-2">
        {goals.map((g) => (
          <button
            key={g.label}
            onClick={() => setGoal(g.label)}
            className={`flex w-full items-center gap-3 rounded-xl border p-4 transition-all duration-200 ${
              goal === g.label ? "border-primary bg-nutri-green-light shadow-sm" : "bg-card hover:shadow-sm"
            }`}
          >
            <span className="text-2xl">{g.emoji}</span>
            <span className="font-bold text-sm">{g.label}</span>
          </button>
        ))}
      </div>
    </div>,

    // Step 1: Routine + Training
    <div key="routine" className="space-y-5">
      <div className="text-center">
        <span className="text-4xl">📅</span>
        <h2 className="mt-2 text-lg font-extrabold">Sua rotina semanal</h2>
      </div>
      <div>
        <p className="text-sm font-bold mb-2">Como é seu dia a dia?</p>
        <div className="space-y-2">
          {routines.map((r) => (
            <button
              key={r.label}
              onClick={() => setRoutine(r.label)}
              className={`flex w-full items-center gap-3 rounded-xl border p-3 transition-all duration-200 ${
                routine === r.label ? "border-primary bg-nutri-green-light" : "bg-card hover:shadow-sm"
              }`}
            >
              <span className="text-xl">{r.emoji}</span>
              <span className="font-semibold text-sm">{r.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm font-bold mb-2">Dias de treino (selecione todos)</p>
        <div className="flex flex-wrap gap-2">
          {trainingOptions.map((t) => (
            <button
              key={t.label}
              onClick={() => toggleArray(training, t.label, setTraining)}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition-all duration-200 ${
                training.includes(t.label)
                  ? "border-primary bg-nutri-green-light text-primary"
                  : "bg-card text-muted-foreground hover:border-primary/50"
              }`}
            >
              <span>{t.emoji}</span> {t.label}
            </button>
          ))}
        </div>
      </div>
    </div>,

    // Step 2: Preferences & Restrictions
    <div key="prefs" className="space-y-5">
      <div className="text-center">
        <span className="text-4xl">🍽️</span>
        <h2 className="mt-2 text-lg font-extrabold">Preferências alimentares</h2>
      </div>
      <div>
        <p className="text-sm font-bold mb-2">O que você ama comer? ❤️</p>
        <div className="flex flex-wrap gap-2">
          {preferenceOptions.map((p) => (
            <button
              key={p}
              onClick={() => toggleArray(preferences, p, setPreferences)}
              className={`rounded-full border px-3 py-1.5 text-xs font-bold transition-all duration-200 ${
                preferences.includes(p)
                  ? "border-primary bg-nutri-green-light text-primary"
                  : "bg-card text-muted-foreground"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm font-bold mb-2">Restrições ou alergias 🚫</p>
        <div className="flex flex-wrap gap-2">
          {restrictionOptions.map((r) => (
            <button
              key={r}
              onClick={() => toggleArray(restrictions, r, setRestrictions)}
              className={`rounded-full border px-3 py-1.5 text-xs font-bold transition-all duration-200 ${
                restrictions.includes(r)
                  ? "border-destructive bg-destructive/10 text-destructive"
                  : "bg-card text-muted-foreground"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
    </div>,
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-sm p-4">
      <div className="w-full max-w-md">
        {/* Progress */}
        <div className="mb-6 flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                i <= step ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>

        <div className="rounded-2xl border bg-card p-6 shadow-lg">{steps[step]}</div>

        {/* Navigation */}
        <div className="mt-4 flex gap-3">
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-1 rounded-xl border bg-card px-4 py-3 text-sm font-bold transition-colors hover:bg-secondary"
            >
              <ChevronLeft className="h-4 w-4" /> Voltar
            </button>
          )}
          <button
            onClick={() => (step < 2 ? setStep(step + 1) : handleFinish())}
            disabled={!canProceed()}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all duration-200 ${
              canProceed()
                ? "bg-primary text-primary-foreground shadow-md hover:opacity-90"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            {step < 2 ? (
              <>Próximo <ChevronRight className="h-4 w-4" /></>
            ) : (
              <>
                <Sparkles className="h-4 w-4" /> Começar!
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard;
