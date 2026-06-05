import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";

const patients = [
  { name: "Ana Silva", goal: "Emagrecimento", since: "Mar/2026", adherence: "92%", status: "Em dia" },
  { name: "Bruno Costa", goal: "Hipertrofia", since: "Jan/2026", adherence: "88%", status: "Em dia" },
  { name: "Carla Mendes", goal: "Reeducação alimentar", since: "Mai/2026", adherence: "74%", status: "Pendente" },
  { name: "Diego Rocha", goal: "Performance esportiva", since: "Fev/2026", adherence: "96%", status: "Em dia" },
  { name: "Eduarda Lima", goal: "Vegetariana balanceada", since: "Abr/2026", adherence: "61%", status: "Atrasado" },
];

const variant: Record<string, "default" | "secondary" | "destructive"> = {
  "Em dia": "default", Pendente: "secondary", Atrasado: "destructive",
};

const Patients = () => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between gap-3">
      <CardTitle>Meus Pacientes</CardTitle>
      <Button size="sm"><Plus className="mr-1 h-4 w-4" /> Convidar paciente</Button>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Buscar paciente..." className="pl-9" />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Objetivo</TableHead>
            <TableHead>Desde</TableHead>
            <TableHead>Adesão</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((p) => (
            <TableRow key={p.name}>
              <TableCell className="font-medium">{p.name}</TableCell>
              <TableCell className="text-muted-foreground">{p.goal}</TableCell>
              <TableCell>{p.since}</TableCell>
              <TableCell className="font-semibold">{p.adherence}</TableCell>
              <TableCell><Badge variant={variant[p.status]}>{p.status}</Badge></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

export default Patients;