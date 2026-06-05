import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Row = {
  user_id: string;
  name: string | null;
  email: string | null;
  role: "Paciente" | "Nutricionista";
  joined: string;
};

const AdminUsers = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  useEffect(() => {
    (async () => {
      const [p, n] = await Promise.all([
        supabase.from("profiles").select("user_id, name, email, created_at"),
        supabase.from("nutritionists_profiles").select("user_id, name, email, created_at"),
      ]);
      const merged: Row[] = [
        ...((p.data ?? []).map((r: any) => ({ ...r, role: "Paciente" as const, joined: r.created_at }))),
        ...((n.data ?? []).map((r: any) => ({ ...r, role: "Nutricionista" as const, joined: r.created_at }))),
      ].sort((a, b) => (a.joined < b.joined ? 1 : -1));
      setRows(merged);
      setLoading(false);
    })();
  }, []);

  const filtered = rows.filter((r) =>
    !q || (r.name ?? "").toLowerCase().includes(q.toLowerCase()) || (r.email ?? "").toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <Card>
      <CardHeader><CardTitle>Gestão de Usuários ({rows.length})</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Buscar por nome ou e-mail..." className="pl-9" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        {loading ? (
          <div className="flex justify-center py-8"><Loader2 className="h-5 w-5 animate-spin text-primary" /></div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Cadastro</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((u) => (
                <TableRow key={`${u.role}-${u.user_id}`}>
                  <TableCell className="font-medium">{u.name ?? "—"}</TableCell>
                  <TableCell className="text-muted-foreground">{u.email ?? "—"}</TableCell>
                  <TableCell><Badge variant={u.role === "Nutricionista" ? "default" : "secondary"}>{u.role}</Badge></TableCell>
                  <TableCell>{new Date(u.joined).toLocaleDateString("pt-BR")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminUsers;