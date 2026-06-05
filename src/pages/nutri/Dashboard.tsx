import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ChefHat, Wallet } from "lucide-react";

const cards = [
  { title: "Pacientes ativos", value: "0", icon: Users },
  { title: "Cardápios criados", value: "0", icon: ChefHat },
  { title: "Assinatura", value: "Ativa", icon: Wallet },
];

const NutriDashboard = () => (
  <div className="grid gap-4 md:grid-cols-3">
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
);

export default NutriDashboard;