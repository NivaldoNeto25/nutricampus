import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

type Patient = {
  user_id: string;
  name: string | null;
  email: string | null;
  goal: string | null;
  weight: number | null;
  height: number | null;
  created_at: string;
};

const Patients = () => {
  const { user } = useAuth();
  const [list, setList] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase
        .from("profiles")
        .select("user_id, name, email, goal, weight, height, created_at")
        .eq("nutritionist_id", user.id)
        .order("created_at", { ascending: false });
      setList((data as Patient[]) ?? []);
      setLoading(false);
    })();
  }, [user]);

  const filtered = list.filter((p) =>
    !q || (p.name ?? "").toLowerCase().includes(q.toLowerCase()) || (p.email ?? "").toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meus Pacientes ({list.length})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Buscar paciente..." className="pl-9" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        {loading ? (
          <div className="flex justify-center py-8"><Loader2 className="h-5 w-5 animate-spin text-primary" /></div>
        ) : filtered.length === 0 ? (
          <p className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
            Nenhum paciente vinculado ainda. Compartilhe seu perfil público no marketplace.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Objetivo</TableHead>
                <TableHead>Peso</TableHead>
                <TableHead>Altura</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => (
                <TableRow key={p.user_id}>
                  <TableCell className="font-medium">{p.name ?? "—"}</TableCell>
                  <TableCell className="text-muted-foreground">{p.email ?? "—"}</TableCell>
                  <TableCell>{p.goal ?? "—"}</TableCell>
                  <TableCell>{p.weight ? `${p.weight} kg` : "—"}</TableCell>
                  <TableCell>{p.height ? `${p.height} cm` : "—"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default Patients;