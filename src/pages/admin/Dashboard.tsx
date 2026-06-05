import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Stethoscope, BadgeCheck, DollarSign, CheckCircle2, Clock, XCircle } from "lucide-react";
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

  const total = nutris.length;
  const pending = nutris.filter((n) => n.verification_status === "pending").length;
  const verified = nutris.filter((n) => n.verification_status === "verified").length;

  const cards = [
    { title: "Nutricionistas", value: String(total), icon: Stethoscope },
    { title: "Pendentes", value: String(pending), icon: Clock },
    { title: "Verificados", value: String(verified), icon: BadgeCheck },
    { title: "MRR estimado", value: "R$ 0", icon: DollarSign },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((c) => (
          <Card key={c.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{c.title}</CardTitle>
              <c.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{c.value}</div></CardContent>
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
          ) : nutris.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhum nutricionista cadastrado ainda.</p>
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
                {nutris.map((n) => {
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