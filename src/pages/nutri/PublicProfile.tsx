import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const PublicProfile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", bio: "", price: "", specialties: "", methodology: "" });
  const [status, setStatus] = useState<string>("pending");

  useEffect(() => {
    if (!user) return;
    supabase
      .from("nutritionists_profiles")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setForm({
            name: data.name ?? "",
            bio: data.bio ?? "",
            price: data.price?.toString() ?? "",
            specialties: (data.specialties ?? []).join(", "),
            methodology: data.methodology ?? "",
          });
          setStatus(data.verification_status);
        }
        setLoading(false);
      });
  }, [user]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    const specialties = form.specialties.split(",").map((s) => s.trim()).filter(Boolean);
    const { error } = await supabase
      .from("nutritionists_profiles")
      .update({
        name: form.name,
        bio: form.bio,
        price: form.price ? Number(form.price) : null,
        specialties,
        methodology: form.methodology || null,
      })
      .eq("user_id", user.id);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Perfil atualizado!");
  };

  const specs = form.specialties.split(",").map((s) => s.trim()).filter(Boolean);
  const initials = (form.name || "NS").split(" ").slice(-2).map((p) => p[0]).join("");

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Perfil Público (Vitrine)</CardTitle>
          <Badge variant={status === "verified" ? "default" : status === "rejected" ? "destructive" : "secondary"}>
            {status === "verified" ? "Verificado" : status === "rejected" ? "Rejeitado" : "Pendente"}
          </Badge>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8"><Loader2 className="h-5 w-5 animate-spin text-primary" /></div>
          ) : (
            <form onSubmit={save} className="space-y-4">
              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-1.5"><Label>Nome de exibição</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
                <div className="space-y-1.5"><Label>Preço por consulta (R$)</Label><Input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} /></div>
              </div>
              <div className="space-y-1.5"><Label>Bio</Label><Textarea rows={4} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} /></div>
              <div className="space-y-1.5">
                <Label>Especialidades</Label>
                <Input placeholder="Esportiva, Hipertrofia, Emagrecimento" value={form.specialties} onChange={(e) => setForm({ ...form, specialties: e.target.value })} />
                <p className="text-xs text-muted-foreground">Separe por vírgula.</p>
              </div>
              <div className="space-y-1.5"><Label>Metodologia</Label><Textarea rows={2} value={form.methodology} onChange={(e) => setForm({ ...form, methodology: e.target.value })} /></div>
              <Button type="submit" disabled={saving}>
                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Salvar alterações
              </Button>
            </form>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-sm">Pré-visualização</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xl font-extrabold text-primary-foreground">{initials}</div>
          <div>
            <p className="font-bold">{form.name || "Seu nome"}</p>
            <p className="text-xs text-muted-foreground">{specs.slice(0, 2).join(" · ") || "—"}</p>
          </div>
          <div className="text-sm font-extrabold text-primary">{form.price ? `R$ ${form.price}/consulta` : "Preço a combinar"}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PublicProfile;