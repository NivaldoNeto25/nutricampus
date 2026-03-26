import { UtensilsCrossed, ShoppingCart, ChefHat, Lightbulb, User } from "lucide-react";

export type TabId = "menu" | "shopping" | "prep" | "tips" | "profile";

interface BottomNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "menu", label: "Cardápio", icon: UtensilsCrossed },
  { id: "shopping", label: "Compras", icon: ShoppingCart },
  { id: "prep", label: "Preparo", icon: ChefHat },
  { id: "tips", label: "Dicas", icon: Lightbulb },
  { id: "profile", label: "Perfil", icon: User },
];

const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-md items-center justify-around py-2">
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 transition-all duration-200 ${
                isActive
                  ? "text-primary scale-105"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className={`rounded-xl p-1.5 transition-colors duration-200 ${isActive ? "bg-nutri-green-light" : ""}`}>
                <Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className="text-[10px] font-semibold">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
