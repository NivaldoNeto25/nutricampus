import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { weekPlan } from "@/data/mockData";

export interface UserProfile {
  name: string;
  goal: string;
  weeklyRoutine: string;
  trainingDays: string[];
  preferences: string[];
  restrictions: string[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  emoji: string;
  unlocked: boolean;
  unlockedAt?: string;
}

interface MealCompletion {
  [dayIndex: number]: boolean[];
}

interface UserState {
  profile: UserProfile | null;
  onboardingComplete: boolean;
  mealCompletions: MealCompletion;
  streak: number;
  badges: Badge[];
}

interface UserContextType extends UserState {
  completeOnboarding: (profile: UserProfile) => void;
  updateProfile: (profile: UserProfile) => void;
  toggleMealCompletion: (dayIndex: number, mealIndex: number) => void;
  getWeeklyProgress: () => number;
  getTodayProgress: () => number;
}

const defaultBadges: Badge[] = [
  { id: "b1", title: "Primeiro Passo", description: "Complete o onboarding", emoji: "🌱", unlocked: false },
  { id: "b2", title: "Dia Perfeito", description: "Complete todas as refeições de um dia", emoji: "⭐", unlocked: false },
  { id: "b3", title: "Mestre do Meal Prep", description: "Complete todo o guia de preparo", emoji: "👨‍🍳", unlocked: false },
  { id: "b4", title: "Sobrevivente da Semana", description: "Siga o plano por 5 dias seguidos", emoji: "🏆", unlocked: false },
  { id: "b5", title: "Sobrevivente de Provas", description: "Mantenha o streak durante a semana", emoji: "📚", unlocked: false },
  { id: "b6", title: "Streak de 7 dias", description: "7 dias seguidos no plano", emoji: "🔥", unlocked: false },
];

const STORAGE_KEY = "nutricampus_user";

function loadState(): UserState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return {
    profile: null,
    onboardingComplete: false,
    mealCompletions: {},
    streak: 3, // mock: user already has 3-day streak
    badges: defaultBadges,
  };
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<UserState>(loadState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const completeOnboarding = (profile: UserProfile) => {
    setState((prev) => {
      const badges = prev.badges.map((b) =>
        b.id === "b1" ? { ...b, unlocked: true, unlockedAt: new Date().toISOString() } : b
      );
      return { ...prev, profile, onboardingComplete: true, badges };
    });
  };

  const updateProfile = (profile: UserProfile) => {
    setState((prev) => ({ ...prev, profile }));
  };

  const toggleMealCompletion = (dayIndex: number, mealIndex: number) => {
    setState((prev) => {
      const dayMeals = prev.mealCompletions[dayIndex] || weekPlan[dayIndex].meals.map(() => false);
      const updated = [...dayMeals];
      updated[mealIndex] = !updated[mealIndex];

      const newCompletions = { ...prev.mealCompletions, [dayIndex]: updated };

      // Check badges
      let badges = [...prev.badges];
      const allDayDone = updated.every(Boolean);
      if (allDayDone) {
        badges = badges.map((b) =>
          b.id === "b2" && !b.unlocked ? { ...b, unlocked: true, unlockedAt: new Date().toISOString() } : b
        );
      }

      // Count streak
      let streak = prev.streak;
      if (allDayDone) streak = Math.min(streak + 1, 30);

      if (streak >= 5) {
        badges = badges.map((b) =>
          b.id === "b4" && !b.unlocked ? { ...b, unlocked: true, unlockedAt: new Date().toISOString() } : b
        );
      }
      if (streak >= 7) {
        badges = badges.map((b) =>
          b.id === "b6" && !b.unlocked ? { ...b, unlocked: true, unlockedAt: new Date().toISOString() } : b
        );
      }

      return { ...prev, mealCompletions: newCompletions, badges, streak };
    });
  };

  const getWeeklyProgress = () => {
    const totalMeals = weekPlan.reduce((sum, day) => sum + day.meals.length, 0);
    let completed = 0;
    Object.values(state.mealCompletions).forEach((dayMeals) => {
      completed += (dayMeals as boolean[]).filter(Boolean).length;
    });
    return totalMeals > 0 ? Math.round((completed / totalMeals) * 100) : 0;
  };

  const getTodayProgress = () => {
    const today = new Date().getDay();
    const dayIndex = today === 0 ? 6 : today - 1;
    const dayMeals = state.mealCompletions[dayIndex] || [];
    const total = weekPlan[dayIndex].meals.length;
    const done = (dayMeals as boolean[]).filter(Boolean).length;
    return total > 0 ? Math.round((done / total) * 100) : 0;
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        completeOnboarding,
        updateProfile,
        toggleMealCompletion,
        getWeeklyProgress,
        getTodayProgress,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}
