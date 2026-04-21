import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import BottomNav, { TabId } from "@/components/BottomNav";
import MenuTab from "@/components/MenuTab";
import ShoppingTab from "@/components/ShoppingTab";
import MealPrepTab from "@/components/MealPrepTab";
import TipsTab from "@/components/TipsTab";
import ProfileTab from "@/components/ProfileTab";
import OnboardingWizard from "@/components/OnboardingWizard";
import ThemeToggle from "@/components/ThemeToggle";
import WelcomeScreen from "@/components/WelcomeScreen";
import HelpModal from "@/components/HelpModal";
import { HelpCircle } from "lucide-react";

const tabs: Record<TabId, React.ComponentType> = {
  menu: MenuTab,
  shopping: ShoppingTab,
  prep: MealPrepTab,
  tips: TipsTab,
  profile: ProfileTab,
};

const Index = () => {
  const { onboardingComplete } = useUser();
  const [activeTab, setActiveTab] = useState<TabId>("menu");
  const [welcomeSeen, setWelcomeSeen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const ActiveComponent = tabs[activeTab];

  return (
    <div className="mx-auto min-h-screen max-w-md px-4 pt-4 pb-24">
      {/* Global Header with Theme Toggle */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-extrabold text-primary">🥗 NutriCampus</h1>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setHelpOpen(true)}
            aria-label="Central de ajuda"
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-secondary transition-colors"
          >
            <HelpCircle className="h-5 w-5 text-muted-foreground" />
          </button>
          <ThemeToggle />
        </div>
      </div>

      {!onboardingComplete && !welcomeSeen && <WelcomeScreen onStart={() => setWelcomeSeen(true)} />}
      {!onboardingComplete && welcomeSeen && <OnboardingWizard />}
      <ActiveComponent />
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      <HelpModal open={helpOpen} onOpenChange={setHelpOpen} />
    </div>
  );
};

export default Index;
