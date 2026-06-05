import { NavLink, Outlet } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export interface NavItem {
  to: string;
  label: string;
  icon: React.ElementType;
}

interface Props {
  title: string;
  items: NavItem[];
}

const DashboardLayout = ({ title, items }: Props) => {
  const { signOut, user } = useAuth();
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar collapsible="icon">
          <SidebarContent>
            <div className="px-3 py-4 text-sm font-extrabold text-primary">🥗 NutriSync</div>
            <SidebarGroup>
              <SidebarGroupLabel>{title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.to}>
                      <SidebarMenuButton asChild>
                        <NavLink to={item.to} end className={({ isActive }) => `flex items-center gap-2 ${isActive ? "bg-secondary text-foreground" : ""}`}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex flex-1 flex-col">
          <header className="flex h-14 items-center justify-between border-b px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <h1 className="text-base font-bold">{title}</h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden text-xs text-muted-foreground md:inline">{user?.email}</span>
              <ThemeToggle />
              <Button variant="ghost" size="sm" onClick={signOut}><LogOut className="h-4 w-4" /></Button>
            </div>
          </header>
          <main className="flex-1 p-6"><Outlet /></main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;