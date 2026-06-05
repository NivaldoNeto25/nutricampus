import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const users = [
  { name: "Ana Silva", email: "ana@email.com", role: "Paciente", plan: "Free", joined: "Mar/2026" },
  { name: "Bruno Costa", email: "bruno@email.com", role: "Paciente", plan: "Free", joined: "Jan/2026" },
  { name: "Dra. Marina Alves", email: "marina@nutri.com", role: "Nutricionista", plan: "Pro", joined: "Dez/2025" },
  { name: "Dr. Pedro Henrique", email: "pedro@nutri.com", role: "Nutricionista", plan: "Pro", joined: "Fev/2026" },
  { name: "Carla Mendes", email: "carla@email.com", role: "Paciente", plan: "Free", joined: "Mai/2026" },
];

const AdminUsers = () => (
  <Card>
    <CardHeader><CardTitle>Gestão de Usuários</CardTitle></CardHeader>
    <CardContent className="space-y-4">
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Buscar por nome ou e-mail..." className="pl-9" />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Plano</TableHead>
            <TableHead>Cadastro</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((u) => (
            <TableRow key={u.email}>
              <TableCell className="font-medium">{u.name}</TableCell>
              <TableCell className="text-muted-foreground">{u.email}</TableCell>
              <TableCell><Badge variant={u.role === "Nutricionista" ? "default" : "secondary"}>{u.role}</Badge></TableCell>
              <TableCell>{u.plan}</TableCell>
              <TableCell>{u.joined}</TableCell>
              <TableCell className="text-right"><Button size="sm" variant="outline">Detalhes</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

export default AdminUsers;