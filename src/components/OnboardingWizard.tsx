import { useState } from "react";
import { useUser, UserProfile, CookingSkill, RoutineSchedule, RoutineType } from "@/contexts/UserContext";
import { ChevronRight, ChevronLeft, UtensilsCrossed, GraduationCap, Briefcase, Sparkles } from "lucide-react";

const goals = [
  { label: "Mais energia", emoji: "⚡" },
  { label: "Economizar tempo", emoji: "⏰" },
  { label: "Ganhar massa", emoji: "💪" },
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

const cookingSkills: { label: CookingSkill; description: string; emoji: string }[] = [
  { label: "Mínimo", description: "Quase nada, só montar", emoji: "🍽️" },
  { label: "Básico", description: "Fritar ovo, cozinhar arroz", emoji: "🍳" },
  { label: "Tranquilo", description: "Consigo seguir receitas", emoji: "👨‍🍳" },
];

const OnboardingWizard = () => {
  const { completeOnboarding } = useUser();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [goal, setGoal] = useState("");
  const [training, setTraining] = useState<string[]>([]);
  const [preferences, setPreferences] = useState<string[]>([]);
  const [restrictions, setRestrictions] = useState<string[]>([]);
  const [cookingSkill, setCookingSkill] = useState<CookingSkill | "">("");
  const [routineType, setRoutineType] = useState<RoutineType | "">("");
  const [collegeStart, setCollegeStart] = useState("19:00");
  const [collegeEnd, setCollegeEnd] = useState("22:30");
  const [workStart, setWorkStart] = useState("08:00");
  const [workEnd, setWorkEnd] = useState("17:00");

  const toggleArray = (arr: string[], val: string, setter: (v: string[]) => void) => {
    setter(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  const canProceed = () => {
    if (step === 0) return name.trim().length >= 2 && weight.trim() !== "" && height.trim() !== "";
    if (step === 1) return !!goal;
    if (step === 2) return training.length > 0;
    if (step === 3) {
      if (!routineType) return false;
      if (routineType === "Só Estuda") return !!collegeStart && !!collegeEnd;
      if (routineType === "Trabalha e Estuda" || routineType === "Home Office e Estuda")
        return !!collegeStart && !!collegeEnd && !!workStart && !!workEnd;
      return true; // "Outro"
    }
    if (step === 4) return preferences.length > 0 && restrictions.length > 0;
    if (step === 5) return !!cookingSkill;
    return true;
  };

  const handleFinish = () => {
    const rt = (routineType || "Outro") as RoutineType;
    const schedule: RoutineSchedule = {
      routineType: rt,
      ...(rt === "Só Estuda" || rt === "Trabalha e Estuda" || rt === "Home Office e Estuda"
        ? { collegeStart, collegeEnd }
        : {}),
      ...(rt === "Trabalha e Estuda" || rt === "Home Office e Estuda"
        ? { workStart, workEnd }
        : {}),
    };
    const profile: UserProfile = {
      name: name.trim(),
      weight: parseFloat(weight) || 70,
      height: parseFloat(height) || 170,
      goal,
      weeklyRoutine: rt,
      trainingDays: training,
      preferences,
      restrictions,
      cookingSkill: cookingSkill as CookingSkill,
      schedule,
    };
    completeOnboarding(profile);
  };

  const totalSteps = 6;

  const steps = [
    // Step 0: Personal data
    <div key="personal" className="space-y-4">
      <div className="text-center">
        <span className="text-4xl">👤</span>
        <h2 className="mt-2 text-lg font-extrabold">Sobre você</h2>
        <p className="text-sm text-muted-foreground">Informações básicas para personalizar</p>
      </div>
      <div className="space-y-3">
        <div>
          <label className="text-xs font-bold text-muted-foreground">Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome"
            className="mt-1 w-full rounded-xl border bg-card px-4 py-3 text-sm font-semibold outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-muted-foreground">Peso (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="70"
              className="mt-1 w-full rounded-xl border bg-card px-4 py-3 text-sm font-semibold outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground">Altura (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="170"
              className="mt-1 w-full rounded-xl border bg-card px-4 py-3 text-sm font-semibold outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </div>
    </div>,

    // Step 1: Goal
    <div key="goal" className="space-y-4">
      <div className="text-center">
        <span className="text-4xl">🎯</span>
        <h2 className="mt-2 text-lg font-extrabold">Qual sua meta principal?</h2>
        <p className="text-sm text-muted-foreground">Isso define seu cardápio</p>
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

    // Step 2: Training
    <div key="training" className="space-y-5">
      <div className="text-center">
        <span className="text-4xl">🏋️</span>
        <h2 className="mt-2 text-lg font-extrabold">Atividade física</h2>
        <p className="text-sm text-muted-foreground">Selecione o que faz parte da sua semana</p>
      </div>
      <div>
        <p className="text-sm font-bold mb-2">Tipo de treino (selecione todos)</p>
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

    // Step 3: Routine schedule
    <div key="schedule" className="space-y-5">
      <div className="text-center">
        <span className="text-4xl">🕐</span>
        <h2 className="mt-2 text-lg font-extrabold">Como é a sua rotina?</h2>
        <p className="text-sm text-muted-foreground">Vamos sincronizar suas refeições com seus blocos fora de casa.</p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {([
          { label: "Só Estuda", icon: GraduationCap },
          { label: "Trabalha e Estuda", icon: Briefcase },
          { label: "Outro", icon: Sparkles },
        ] as { label: RoutineType; icon: typeof GraduationCap }[]).map(({ label, icon: Icon }) => {
          const active = routineType === label;
          return (
            <button
              key={label}
              onClick={() => setRoutineType(label)}
              className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center transition-all duration-200 ${
                active ? "border-primary bg-nutri-green-light shadow-sm" : "bg-card hover:shadow-sm"
              }`}
            >
              <Icon className={`h-5 w-5 ${active ? "text-primary" : "text-muted-foreground"}`} />
              <span className={`text-xs font-bold leading-tight ${active ? "text-primary" : ""}`}>{label}</span>
            </button>
          );
        })}
      </div>

      {(routineType === "Só Estuda" || routineType === "Trabalha e Estuda") && (
        <div className="rounded-xl border bg-card p-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <p className="text-sm font-extrabold mb-3 flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-primary" /> Faculdade
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-muted-foreground">Início</label>
              <input type="time" value={collegeStart} onChange={(e) => setCollegeStart(e.target.value)}
                className="mt-1 w-full rounded-xl border bg-background px-3 py-2.5 text-sm font-semibold outline-none focus:border-primary" />
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground">Fim</label>
              <input type="time" value={collegeEnd} onChange={(e) => setCollegeEnd(e.target.value)}
                className="mt-1 w-full rounded-xl border bg-background px-3 py-2.5 text-sm font-semibold outline-none focus:border-primary" />
            </div>
          </div>
        </div>
      )}

      {routineType === "Trabalha e Estuda" && (
        <div className="rounded-xl border bg-card p-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <p className="text-sm font-extrabold mb-3 flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-accent" /> Trabalho
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-muted-foreground">Início</label>
              <input type="time" value={workStart} onChange={(e) => setWorkStart(e.target.value)}
                className="mt-1 w-full rounded-xl border bg-background px-3 py-2.5 text-sm font-semibold outline-none focus:border-primary" />
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground">Fim</label>
              <input type="time" value={workEnd} onChange={(e) => setWorkEnd(e.target.value)}
                className="mt-1 w-full rounded-xl border bg-background px-3 py-2.5 text-sm font-semibold outline-none focus:border-primary" />
            </div>
          </div>
        </div>
      )}

      {routineType === "Outro" && (
        <p className="text-center text-xs text-muted-foreground">
          Sem horários fixos — vamos usar uma janela padrão para suas refeições.
        </p>
      )}
    </div>,

    // Step 4: Preferences & Restrictions
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

    // Step 4: Cooking Skill
    <div key="cooking" className="space-y-5">
      <div className="text-center">
        <span className="text-4xl">🧑‍🍳</span>
        <h2 className="mt-2 text-lg font-extrabold">Quanto você cozinha?</h2>
        <p className="text-sm text-muted-foreground">Sem julgamento, prometo.</p>
      </div>
      <div className="space-y-3">
        {cookingSkills.map((s) => (
          <button
            key={s.label}
            onClick={() => setCookingSkill(s.label)}
            className={`flex w-full items-center gap-4 rounded-xl border p-4 transition-all duration-200 ${
              cookingSkill === s.label ? "border-primary bg-nutri-green-light shadow-sm" : "bg-card hover:shadow-sm"
            }`}
          >
            <span className="text-3xl">{s.emoji}</span>
            <div className="text-left">
              <p className="text-sm font-extrabold">{s.label}</p>
              <p className="text-xs text-muted-foreground">{s.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>,
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-sm p-4">
      <div className="w-full max-w-md">
        {/* Progress */}
        <div className="mb-6 flex items-center gap-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                i <= step ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>

        <div className="rounded-2xl border bg-card p-6 shadow-lg max-h-[70vh] overflow-y-auto">{steps[step]}</div>

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
            onClick={() => (step < totalSteps - 1 ? setStep(step + 1) : handleFinish())}
            disabled={!canProceed()}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all duration-200 ${
              canProceed()
                ? "bg-primary text-primary-foreground shadow-md hover:opacity-90"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            {step < totalSteps - 1 ? (
              <>Próximo <ChevronRight className="h-4 w-4" /></>
            ) : (
              <>
                <UtensilsCrossed className="h-4 w-4" /> Pronto, me alimente! 🍴
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard;
