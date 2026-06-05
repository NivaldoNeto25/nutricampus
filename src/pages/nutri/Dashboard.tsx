import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, CalendarClock, Wallet, TrendingUp } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const metrics = [
  { title: "Pacientes Ativos", value: "15", trend: "+2 este mês", icon: Users },
  { title: "Consultas Pendentes", value: "2", trend: "Próximas 7 dias", icon: CalendarClock },
  { title: "Status da Assinatura", value: "Ativa", trend: "Plano Pro · R$ 89/mês", icon: Wallet },
];

const patients = [
  { name: "Ana Silva", goal: "Emagrecimento", next: "12/06/2026", status: "Em dia" },
  { name: "Bruno Costa", goal: "Hipertrofia", next: "15/06/2026", status: "Em dia" },
  { name: "Carla Mendes", goal: "Reeducação alimentar", next: "20/06/2026", status: "Pendente" },
  { name: "Diego Rocha", goal: "Performance esportiva", next: "22/06/2026", status: "Em dia" },
  { name: "Eduarda Lima", goal: "Vegetariana balanceada", next: "08/06/2026", status: "Atrasado" },
];

const statusVariant: Record<string, "default" | "secondary" | "destructive"> = {
  "Em dia": "default",
  Pendente: "secondary",
  Atrasado: "destructive",
};

const NutriDashboard = () => {
  const { user } = useAuth();
  const name = (user?.user_metadata as any)?.name?.split(" ")[0] ?? "Nutri";

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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Objetivo</TableHead>
                <TableHead>Próximo Retorno</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((p) => (
                <TableRow key={p.name}>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell className="text-muted-foreground">{p.goal}</TableCell>
                  <TableCell>{p.next}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[p.status]}>{p.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default NutriDashboard;