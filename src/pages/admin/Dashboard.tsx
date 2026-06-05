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

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("nutritionists_profiles")
      .select("user_id, name, email, crn, crn_uf, verification_status")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setNutris((data as NutriRow[]) ?? []);
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

  // Mock fallback when DB is empty
  const mockNutris: NutriRow[] = [
    { user_id: "m1", name: "Dra. Marina Alves", email: "marina@nutri.com", crn: "12345", crn_uf: "SP", verification_status: "pending" },
    { user_id: "m2", name: "Dr. Pedro Henrique", email: "pedro@nutri.com", crn: "23456", crn_uf: "RJ", verification_status: "pending" },
    { user_id: "m3", name: "Dra. Sofia Ramos", email: "sofia@nutri.com", crn: "34567", crn_uf: "MG", verification_status: "verified" },
    { user_id: "m4", name: "Dr. Lucas Pereira", email: "lucas@nutri.com", crn: "45678", crn_uf: "RS", verification_status: "verified" },
    { user_id: "m5", name: "Dra. Júlia Faria", email: "julia@nutri.com", crn: "56789", crn_uf: "BA", verification_status: "rejected" },
  ];
  const rows = nutris.length > 0 ? nutris : mockNutris;

  const total = rows.length;
  const pending = rows.filter((n) => n.verification_status === "pending").length;
  const verified = rows.filter((n) => n.verification_status === "verified").length;

  const cards = [
    { title: "Nutricionistas Cadastrados", value: "42", icon: Stethoscope, trend: "+6 este mês" },
    { title: "Pacientes Totais", value: "350", icon: Users, trend: "+38 este mês" },
    { title: "Verificações Pendentes", value: String(pending), icon: Clock, trend: "Aguardando análise" },
    { title: "MRR Estimado", value: "R$ 2.100", icon: DollarSign, trend: "+12% vs mês anterior" },
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
                {rows.map((n) => {
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
                        {n.verification_status !== "verified" && (
                          <Button size="sm" onClick={() => updateStatus(n.user_id, "verified")}>Aprovar</Button>
                        )}
                        {n.verification_status !== "rejected" && (
                          <Button size="sm" variant="outline" onClick={() => updateStatus(n.user_id, "rejected")}>Rejeitar</Button>
                        )}
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