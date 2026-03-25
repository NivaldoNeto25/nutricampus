import { useState } from "react";
import BottomNav, { TabId } from "@/components/BottomNav";
import MenuTab from "@/components/MenuTab";
import ShoppingTab from "@/components/ShoppingTab";
import MealPrepTab from "@/components/MealPrepTab";
import TipsTab from "@/components/TipsTab";

const tabs: Record<TabId, React.ComponentType> = {
  menu: MenuTab,
  shopping: ShoppingTab,
  prep: MealPrepTab,
  tips: TipsTab,
};

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabId>("menu");
  const ActiveComponent = tabs[activeTab];

  return (
    <div className="mx-auto min-h-screen max-w-md px-4 pt-6 pb-24">
      <ActiveComponent />
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
