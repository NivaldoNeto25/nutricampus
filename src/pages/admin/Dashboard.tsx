import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Stethoscope, BadgeCheck, DollarSign, CheckCircle2, Clock, XCircle, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type NutriRow = {
  user_id: string;
  name: string | null;
  email: string | null;
  crn: string | null;
  crn_uf: string | null;
  verification_status: "pending" | "verified" | "rejected";
};

const statusMeta = {
  pending: { label: "Pendente", icon: Clock, variant: "secondary" as const },
  verified: { label: "Verificado", icon: CheckCircle2, variant: "default" as const },
  rejected: { label: "Rejeitado", icon: XCircle, variant: "destructive" as const },
};

const AdminDashboard = () => {
  const [nutris, setNutris] = useState<NutriRow[]>([]);
  const [loading, setLoading] = useState(true);

  const [totals, setTotals] = useState({ nutris: 0, patients: 0 });

  const load = async () => {
    setLoading(true);
    const [{ data, error }, nutriCount, patientCount] = await Promise.all([
      supabase
        .from("nutritionists_profiles")
        .select("user_id, name, email, crn, crn_uf, verification_status")
        .order("created_at", { ascending: false }),
      supabase.from("nutritionists_profiles").select("user_id", { count: "exact", head: true }),
      supabase.from("profiles").select("user_id", { count: "exact", head: true }),
    ]);
    if (error) toast.error(error.message);
    setNutris((data as NutriRow[]) ?? []);
    setTotals({ nutris: nutriCount.count ?? 0, patients: patientCount.count ?? 0 });
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (user_id: string, status: NutriRow["verification_status"]) => {
    const { error } = await supabase
      .from("nutritionists_profiles")
      .update({ verification_status: status })
      .eq("user_id", user_id);
    if (error) return toast.error(error.message);
    toast.success("Status atualizado");
    setNutris((prev) => prev.map((n) => (n.user_id === user_id ? { ...n, verification_status: status } : n)));
  };

  const pending = nutris.filter((n) => n.verification_status === "pending");
  const verifiedCount = nutris.filter((n) => n.verification_status === "verified").length;
  const mrr = verifiedCount * 89;

  const cards = [
    { title: "Nutricionistas Cadastrados", value: String(totals.nutris), icon: Stethoscope, trend: `${verifiedCount} verificados` },
    { title: "Pacientes Totais", value: String(totals.patients), icon: Users, trend: "Contas ativas" },
    { title: "Verificações Pendentes", value: String(pending.length), icon: Clock, trend: "Aguardando análise" },
    { title: "MRR Estimado", value: `R$ ${mrr.toLocaleString("pt-BR")}`, icon: DollarSign, trend: "Plano Pro · R$ 89" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">Visão Geral</h2>
        <p className="text-sm text-muted-foreground">Métricas e validação de profissionais do NutriSync.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((c) => (
          <Card key={c.title} className="border-l-4 border-l-primary/60">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{c.title}</CardTitle>
              <c.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold">{c.value}</div>
              <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><TrendingUp className="h-3 w-3" /> {c.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-4 w-4" /> Verificação de Nutricionistas
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">Carregando...</p>
          ) : pending.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhum nutricionista pendente de verificação.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>CRN</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pending.map((n) => {
                  const meta = statusMeta[n.verification_status];
                  const Icon = meta.icon;
                  return (
                    <TableRow key={n.user_id}>
                      <TableCell className="font-medium">{n.name ?? "—"}</TableCell>
                      <TableCell className="text-muted-foreground">{n.email ?? "—"}</TableCell>
                      <TableCell>{n.crn ? `${n.crn} / ${n.crn_uf ?? "—"}` : "—"}</TableCell>
                      <TableCell>
                        <Badge variant={meta.variant} className="gap-1">
                          <Icon className="h-3 w-3" /> {meta.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button size="sm" onClick={() => updateStatus(n.user_id, "verified")}>Aprovar</Button>
                        <Button size="sm" variant="outline" onClick={() => updateStatus(n.user_id, "rejected")}>Recusar</Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;