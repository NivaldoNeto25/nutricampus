import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", weight: "", height: "", goal: "" });

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase.from("profiles").select("*").eq("user_id", user.id).maybeSingle();
      if (data) {
        setForm({
          name: data.name ?? "",
          weight: data.weight?.toString() ?? "",
          height: data.height?.toString() ?? "",
          goal: data.goal ?? "",
        });
      }
      setLoading(false);
    })();
  }, [user]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        name: form.name,
        weight: form.weight ? Number(form.weight) : null,
        height: form.height ? Number(form.height) : null,
        goal: form.goal || null,
        onboarding_complete: true,
      })
      .eq("user_id", user.id);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Perfil atualizado!");
  };

  const initials = (form.name || "Você").split(" ").map((p) => p[0]).slice(0, 2).join("");

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
        <div className="h-20 bg-gradient-to-br from-primary to-accent" />
        <CardContent className="-mt-10 space-y-2">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-card bg-primary text-2xl font-extrabold text-primary-foreground">
            {initials}
          </div>
          <h2 className="text-lg font-extrabold">{form.name || "Seu perfil"}</h2>
          <p className="text-xs text-muted-foreground">{user?.email}</p>
          <Badge variant="secondary" className="text-[10px]">Plano Gratuito</Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Dados pessoais</CardTitle></CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-6"><Loader2 className="h-5 w-5 animate-spin text-primary" /></div>
          ) : (
            <form onSubmit={save} className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="p-name">Nome</Label>
                <Input id="p-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1.5">
                  <Label htmlFor="p-weight">Peso (kg)</Label>
                  <Input id="p-weight" type="number" step="0.1" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="p-height">Altura (cm)</Label>
                  <Input id="p-height" type="number" value={form.height} onChange={(e) => setForm({ ...form, height: e.target.value })} />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="p-goal">Objetivo</Label>
                <Input id="p-goal" placeholder="Emagrecimento, hipertrofia..." value={form.goal} onChange={(e) => setForm({ ...form, goal: e.target.value })} />
              </div>
              <Button type="submit" disabled={saving} className="w-full">
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Salvar
              </Button>
            </form>
          )}
        </CardContent>
      </Card>

      <Button variant="outline" className="w-full" onClick={signOut}>Sair da conta</Button>
    </div>
  );
};

export default Profile;