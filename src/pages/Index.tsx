import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import BottomNav, { TabId } from "@/components/BottomNav";
import MenuTab from "@/components/MenuTab";
import ShoppingTab from "@/components/ShoppingTab";
import MealPrepTab from "@/components/MealPrepTab";
import TipsTab from "@/components/TipsTab";
import ProfileTab from "@/components/ProfileTab";
import OnboardingWizard from "@/components/OnboardingWizard";

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
  const ActiveComponent = tabs[activeTab];

  return (
    <div className="mx-auto min-h-screen max-w-md px-4 pt-6 pb-24">
      {!onboardingComplete && <OnboardingWizard />}
      <ActiveComponent />
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
