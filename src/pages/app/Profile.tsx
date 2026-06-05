import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User as UserIcon } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("*").eq("user_id", user.id).maybeSingle().then(({ data }) => setProfile(data));
  }, [user]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl"><UserIcon className="h-5 w-5 text-primary" /> Perfil</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div><span className="text-muted-foreground">Nome:</span> {profile?.name ?? "—"}</div>
        <div><span className="text-muted-foreground">E-mail:</span> {user?.email}</div>
        <p className="pt-3 text-muted-foreground">Em breve: edição completa de dados biométricos e rotina semanal.</p>
      </CardContent>
    </Card>
  );
};

export default Profile;