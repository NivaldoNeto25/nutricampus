import { NavLink, Outlet } from "react-router-dom";
import { Calendar, Store, MessageCircle, User as UserIcon, LogOut, HelpCircle } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";

const tabs = [
  { to: "/app/routine", label: "Rotina", icon: Calendar },
  { to: "/app/marketplace", label: "Marketplace", icon: Store },
  { to: "/app/chat", label: "Chat", icon: MessageCircle },
  { to: "/app/profile", label: "Perfil", icon: UserIcon },
];

const AppLayout = () => {
  const { signOut } = useAuth();
  return (
    <div className="mx-auto min-h-screen max-w-md px-4 pt-4 pb-24">
      <header className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-extrabold text-primary">🥗 NutriSync</h1>
        <div className="flex items-center gap-1">
          <button onClick={signOut} aria-label="Sair" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-secondary">
            <LogOut className="h-4 w-4 text-muted-foreground" />
          </button>
          <ThemeToggle />
        </div>
      </header>

      <main><Outlet /></main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-md items-center justify-around py-2">
          {tabs.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 transition-all ${
                  isActive ? "text-primary scale-105" : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`rounded-xl p-1.5 ${isActive ? "bg-nutri-green-light" : ""}`}>
                    <Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
                  </div>
                  <span className="text-[10px] font-semibold">{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default AppLayout;