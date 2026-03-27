import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from "react";
import { menusByGoal, DayPlan } from "@/data/mockData";

export interface UserProfile {
  name: string;
  weight: number;
  height: number;
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

export interface UserProgress {
  xp: number;
  streak: number;
  badges: Badge[];
}

interface UserState {
  profile: UserProfile | null;
  onboardingComplete: boolean;
  mealCompletions: MealCompletion;
  progress: UserProgress;
}

interface UserContextType extends UserState {
  completeOnboarding: (profile: UserProfile) => void;
  updateProfile: (profile: UserProfile) => void;
  toggleMealCompletion: (dayIndex: number, mealIndex: number) => void;
  getWeeklyProgress: () => number;
  getTodayProgress: () => number;
  currentMenu: DayPlan[];
  // Expose flat for backward compat
  streak: number;
  badges: Badge[];
}

const XP_PER_MEAL = 15;
const XP_BONUS_ALL_DAY = 50;

const defaultBadges: Badge[] = [
  { id: "b1", title: "Primeiro Passo", description: "Complete o onboarding", emoji: "🌱", unlocked: false },
  { id: "b2", title: "Dia Perfeito", description: "Complete todas as refeições de um dia", emoji: "⭐", unlocked: false },
  { id: "b3", title: "Mestre do Meal Prep", description: "Complete todo o guia de preparo", emoji: "👨‍🍳", unlocked: false },
  { id: "b4", title: "Sobrevivente da Semana", description: "Siga o plano por 5 dias seguidos", emoji: "🏆", unlocked: false },
  { id: "b5", title: "Centurião", description: "Acumule 100 XP", emoji: "💯", unlocked: false },
  { id: "b6", title: "Streak de 7 dias", description: "7 dias seguidos no plano", emoji: "🔥", unlocked: false },
];

const STORAGE_KEY = "nutricampus_user";

function loadState(): UserState {
  const defaults: UserState = {
    profile: null,
    onboardingComplete: false,
    mealCompletions: {},
    progress: { xp: 0, streak: 3, badges: defaultBadges },
  };
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...defaults,
        ...parsed,
        progress: { ...defaults.progress, ...(parsed.progress || {}) },
      };
    }
  } catch {}
  return defaults;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<UserState>(loadState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const currentMenu = useMemo(() => {
    if (!state.profile?.goal) return menusByGoal["Mais energia"];
    return menusByGoal[state.profile.goal] || menusByGoal["Mais energia"];
  }, [state.profile?.goal]);

  const completeOnboarding = (profile: UserProfile) => {
    setState((prev) => {
      const badges = prev.progress.badges.map((b) =>
        b.id === "b1" ? { ...b, unlocked: true, unlockedAt: new Date().toISOString() } : b
      );
      return { ...prev, profile, onboardingComplete: true, progress: { ...prev.progress, badges } };
    });
  };

  const updateProfile = (profile: UserProfile) => {
    setState((prev) => ({ ...prev, profile }));
  };

  const toggleMealCompletion = (dayIndex: number, mealIndex: number) => {
    setState((prev) => {
      const dayMeals = prev.mealCompletions[dayIndex] || currentMenu[dayIndex].meals.map(() => false);
      const updated = [...dayMeals];
      const wasComplete = updated[mealIndex];
      updated[mealIndex] = !wasComplete;

      const newCompletions = { ...prev.mealCompletions, [dayIndex]: updated };

      let xp = prev.progress.xp + (wasComplete ? -XP_PER_MEAL : XP_PER_MEAL);
      let badges = [...prev.progress.badges];
      let streak = prev.progress.streak;

      const allDayDone = updated.every(Boolean);
      if (allDayDone && !wasComplete) {
        xp += XP_BONUS_ALL_DAY;
        streak = Math.min(streak + 1, 30);
        badges = badges.map((b) =>
          b.id === "b2" && !b.unlocked ? { ...b, unlocked: true, unlockedAt: new Date().toISOString() } : b
        );
      }

      if (xp >= 100) {
        badges = badges.map((b) =>
          b.id === "b5" && !b.unlocked ? { ...b, unlocked: true, unlockedAt: new Date().toISOString() } : b
        );
      }
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

      return {
        ...prev,
        mealCompletions: newCompletions,
        progress: { ...prev.progress, xp: Math.max(0, xp), badges, streak },
      };
    });
  };

  const getWeeklyProgress = () => {
    const totalMeals = currentMenu.reduce((sum, day) => sum + day.meals.length, 0);
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
    const total = currentMenu[dayIndex]?.meals.length || 0;
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
        currentMenu,
        streak: state.progress.streak,
        badges: state.progress.badges,
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
