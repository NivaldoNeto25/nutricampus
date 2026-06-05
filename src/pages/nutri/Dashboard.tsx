import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, ChefHat, Wallet, TrendingUp, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const NutriDashboard = () => {
  const { user } = useAuth();
  const name = (user?.user_metadata as any)?.name?.split(" ")[0] ?? "Nutri";
  const [patients, setPatients] = useState<any[]>([]);
  const [menusCount, setMenusCount] = useState(0);
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const [pats, menus, prof] = await Promise.all([
        supabase.from("profiles").select("user_id, name, goal, created_at").eq("nutritionist_id", user.id).order("created_at", { ascending: false }).limit(5),
        supabase.from("menus").select("id", { count: "exact", head: true }).eq("nutritionist_id", user.id),
        supabase.from("nutritionists_profiles").select("verification_status").eq("user_id", user.id).maybeSingle(),
      ]);
      setPatients(pats.data ?? []);
      setMenusCount(menus.count ?? 0);
      setStatus((prof.data as any)?.verification_status ?? "pending");
      setLoading(false);
    })();
  }, [user]);

  const metrics = [
    { title: "Pacientes Ativos", value: String(patients.length), trend: "Vinculados a você", icon: Users },
    { title: "Cardápios Criados", value: String(menusCount), trend: "Total", icon: ChefHat },
    { title: "Status da Conta", value: status === "verified" ? "Verificado" : status === "rejected" ? "Rejeitado" : "Pendente", trend: "Verificação CRN", icon: Wallet },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">Olá, {name} 👋</h2>
        <p className="text-sm text-muted-foreground">Aqui está um resumo do seu consultório hoje.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {metrics.map((m) => (
          <Card key={m.title} className="border-l-4 border-l-primary/60">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{m.title}</CardTitle>
              <m.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold">{m.value}</div>
              <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3" /> {m.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Pacientes Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8"><Loader2 className="h-5 w-5 animate-spin text-primary" /></div>
          ) : patients.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhum paciente vinculado ainda.</p>
          ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Objetivo</TableHead>
                <TableHead>Vinculado em</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((p) => (
                <TableRow key={p.user_id}>
                  <TableCell className="font-medium">{p.name ?? "—"}</TableCell>
                  <TableCell className="text-muted-foreground">{p.goal ?? "—"}</TableCell>
                  <TableCell>{new Date(p.created_at).toLocaleDateString("pt-BR")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NutriDashboard;