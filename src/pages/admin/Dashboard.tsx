import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Stethoscope, BadgeCheck, DollarSign } from "lucide-react";

const cards = [
  { title: "Total de usuários", value: "0", icon: Users },
  { title: "Total de nutricionistas", value: "0", icon: Stethoscope },
  { title: "Assinaturas ativas", value: "0", icon: BadgeCheck },
  { title: "MRR estimado", value: "R$ 0", icon: DollarSign },
];

const AdminDashboard = () => (
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
);

export default AdminDashboard;