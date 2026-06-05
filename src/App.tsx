import { useEffect } from "react";
import ReactGA from "react-ga4";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Calendar, Store, MessageCircle, User as UserIcon, LayoutDashboard, Users, ChefHat, Stethoscope, Wallet } from "lucide-react";
import Landing from "./pages/Landing.tsx";
import Auth from "./pages/Auth.tsx";
import NotFound from "./pages/NotFound.tsx";
import ProtectedRoute from "@/components/ProtectedRoute";
import AppLayout from "@/components/layouts/AppLayout";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Routine from "./pages/app/Routine";
import Marketplace from "./pages/app/Marketplace";
import Chat from "./pages/app/Chat";
import Profile from "./pages/app/Profile";
import NutriDashboard from "./pages/nutri/Dashboard";
import Patients from "./pages/nutri/Patients";
import MenuBuilder from "./pages/nutri/MenuBuilder";
import PublicProfile from "./pages/nutri/PublicProfile";
import Messages from "./pages/nutri/Messages";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";

const MEASUREMENT_ID = "G-J6V3T9ET40";

ReactGA.initialize(MEASUREMENT_ID);

const GoogleAnalyticsTracker = () => {
  const location = useLocation();
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);
  return null;
};

const queryClient = new QueryClient();

const nutriNav = [
  { to: "/nutri", label: "Dashboard", icon: LayoutDashboard },
  { to: "/nutri/patients", label: "Pacientes", icon: Users },
  { to: "/nutri/menus", label: "Cardápios", icon: ChefHat },
  { to: "/nutri/profile", label: "Perfil Público", icon: Stethoscope },
  { to: "/nutri/messages", label: "Mensagens", icon: MessageCircle },
];

const adminNav = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/users", label: "Usuários", icon: Users },
];

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
            <GoogleAnalyticsTracker />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/auth" element={<Auth />} />

              <Route path="/app" element={<ProtectedRoute allow={["user"]}><AppLayout /></ProtectedRoute>}>
                <Route index element={<Navigate to="/app/routine" replace />} />
                <Route path="routine" element={<Routine />} />
                <Route path="marketplace" element={<Marketplace />} />
                <Route path="chat" element={<Chat />} />
                <Route path="profile" element={<Profile />} />
              </Route>

              <Route path="/nutri" element={<ProtectedRoute allow={["nutritionist"]}><DashboardLayout title="Nutricionista" items={nutriNav} /></ProtectedRoute>}>
                <Route index element={<NutriDashboard />} />
                <Route path="patients" element={<Patients />} />
                <Route path="menus" element={<MenuBuilder />} />
                <Route path="profile" element={<PublicProfile />} />
                <Route path="messages" element={<Messages />} />
              </Route>

              <Route path="/admin" element={<ProtectedRoute allow={["admin"]}><DashboardLayout title="Admin" items={adminNav} /></ProtectedRoute>}>
                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<AdminUsers />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
        </TooltipProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
