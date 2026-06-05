import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, Flame, Trophy, Settings, ChevronRight } from "lucide-react";

const Profile = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("*").eq("user_id", user.id).maybeSingle().then(({ data }) => setProfile(data));
  }, [user]);

  const name = profile?.name ?? (user?.user_metadata as any)?.name ?? "Você";

  const stats = [
    { label: "Dias seguidos", value: "12", icon: Flame },
    { label: "Meta", value: "Emagrecer", icon: Target },
    { label: "XP", value: "1.240", icon: Trophy },
  ];

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
        <div className="h-20 bg-gradient-to-br from-primary to-accent" />
        <CardContent className="-mt-10 space-y-3">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-card bg-primary text-2xl font-extrabold text-primary-foreground">
            {name.split(" ").map((p: string) => p[0]).slice(0, 2).join("")}
          </div>
          <div>
            <h2 className="text-lg font-extrabold">{name}</h2>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
            <Badge variant="secondary" className="mt-2 text-[10px]">Plano Gratuito</Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-2">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="flex flex-col items-center gap-1 p-3 text-center">
              <s.icon className="h-4 w-4 text-primary" />
              <span className="text-sm font-extrabold">{s.value}</span>
              <span className="text-[10px] text-muted-foreground">{s.label}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="divide-y p-0">
          {["Dados pessoais", "Rotina semanal", "Notificações", "Privacidade"].map((item) => (
            <button key={item} className="flex w-full items-center justify-between p-4 text-left text-sm hover:bg-secondary/50">
              <span className="flex items-center gap-2"><Settings className="h-4 w-4 text-muted-foreground" /> {item}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
        </CardContent>
      </Card>

      <Button variant="outline" className="w-full" onClick={signOut}>Sair da conta</Button>
    </div>
  );
};

export default Profile;