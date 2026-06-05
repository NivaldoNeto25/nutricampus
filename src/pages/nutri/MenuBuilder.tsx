import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Loader2, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

type Meal = { time: string; title: string; desc: string };
type Patient = { user_id: string; name: string | null };

const emptyMeal = (): Meal => ({ time: "08:00", title: "", desc: "" });

const MenuBuilder = () => {
  const { user } = useAuth();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patientId, setPatientId] = useState<string>("");
  const [title, setTitle] = useState("Cardápio");
  const [meals, setMeals] = useState<Meal[]>([emptyMeal()]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("user_id, name")
      .eq("nutritionist_id", user.id)
      .then(({ data }) => {
        setPatients((data as Patient[]) ?? []);
        setLoading(false);
      });
  }, [user]);

  const updateMeal = (i: number, k: keyof Meal, v: string) => {
    setMeals((m) => m.map((x, idx) => (idx === i ? { ...x, [k]: v } : x)));
  };

  const save = async () => {
    if (!user || !patientId) return toast.error("Selecione um paciente.");
    setSaving(true);
    const { error } = await supabase.from("menus").insert({
      nutritionist_id: user.id,
      patient_id: patientId,
      title,
      meals_data: { meals } as any,
    });
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Cardápio salvo e enviado ao paciente!");
    setMeals([emptyMeal()]);
    setTitle("Cardápio");
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader><CardTitle>Montador de Cardápios</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {loading ? (
            <div className="flex justify-center py-6"><Loader2 className="h-5 w-5 animate-spin text-primary" /></div>
          ) : patients.length === 0 ? (
            <p className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
              Você ainda não tem pacientes vinculados.
            </p>
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Paciente</Label>
                <Select value={patientId} onValueChange={setPatientId}>
                  <SelectTrigger><SelectValue placeholder="Selecione o paciente" /></SelectTrigger>
                  <SelectContent>
                    {patients.map((p) => (
                      <SelectItem key={p.user_id} value={p.user_id}>{p.name ?? p.user_id}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Título</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {patients.length > 0 && (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            {meals.map((m, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm">Refeição {i + 1}</CardTitle>
                  {meals.length > 1 && (
                    <Button size="sm" variant="ghost" onClick={() => setMeals((ms) => ms.filter((_, idx) => idx !== i))}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="space-y-1.5">
                      <Label>Hora</Label>
                      <Input type="time" value={m.time} onChange={(e) => updateMeal(i, "time", e.target.value)} />
                    </div>
                    <div className="col-span-2 space-y-1.5">
                      <Label>Título</Label>
                      <Input placeholder="Café da Manhã" value={m.title} onChange={(e) => updateMeal(i, "title", e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Descrição</Label>
                    <Textarea rows={2} placeholder="Itens da refeição..." value={m.desc} onChange={(e) => updateMeal(i, "desc", e.target.value)} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setMeals((m) => [...m, emptyMeal()])}>
              <Plus className="mr-1 h-4 w-4" /> Adicionar refeição
            </Button>
            <Button onClick={save} disabled={saving || !patientId}>
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Salvar cardápio
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default MenuBuilder;