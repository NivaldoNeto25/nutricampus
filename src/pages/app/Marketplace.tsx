import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, BadgeCheck, Check, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

type Nutri = {
  user_id: string;
  name: string | null;
  bio: string | null;
  price: number | null;
  specialties: string[];
};

const Marketplace = () => {
  const { user } = useAuth();
  const [list, setList] = useState<Nutri[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [linkedId, setLinkedId] = useState<string | null>(null);
  const [requesting, setRequesting] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const [{ data: nutris }, { data: me }] = await Promise.all([
        supabase
          .from("nutritionists_profiles")
          .select("user_id, name, bio, price, specialties")
          .eq("verification_status", "verified"),
        user
          ? supabase.from("profiles").select("nutritionist_id").eq("user_id", user.id).maybeSingle()
          : Promise.resolve({ data: null }),
      ]);
      setList((nutris as Nutri[]) ?? []);
      setLinkedId((me as any)?.nutritionist_id ?? null);
      setLoading(false);
    })();
  }, [user]);

  const requestLink = async (nutriId: string) => {
    if (!user) return;
    setRequesting(nutriId);
    const { error } = await supabase
      .from("profiles")
      .update({ nutritionist_id: nutriId })
      .eq("user_id", user.id);
    setRequesting(null);
    if (error) return toast.error(error.message);
    setLinkedId(nutriId);
    toast.success("Acompanhamento solicitado!");
  };

  const filtered = list.filter((n) => {
    const t = q.toLowerCase();
    return !t || (n.name ?? "").toLowerCase().includes(t) || n.specialties.some((s) => s.toLowerCase().includes(t));
  });

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-extrabold">Encontre seu Nutri</h2>
        <p className="text-sm text-muted-foreground">Profissionais verificados pelo CRN.</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Buscar por nome ou especialidade" className="pl-9" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>

      <div className="space-y-3">
        {loading && Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-28 w-full rounded-xl" />)}
        {!loading && filtered.length === 0 && (
          <p className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
            Nenhum nutricionista verificado encontrado.
          </p>
        )}
        {!loading && filtered.map((n) => {
          const isLinked = linkedId === n.user_id;
          return (
            <Card key={n.user_id} className="transition-shadow hover:shadow-md">
              <CardContent className="flex gap-3 p-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-lg font-bold text-primary-foreground">
                  {(n.name ?? "NS").split(" ").slice(-2).map((p) => p[0]).join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <h3 className="truncate text-sm font-bold">{n.name ?? "Nutricionista"}</h3>
                    <BadgeCheck className="h-4 w-4 shrink-0 text-primary" />
                  </div>
                  {n.specialties.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {n.specialties.slice(0, 3).map((s) => (
                        <Badge key={s} variant="secondary" className="text-[10px]">{s}</Badge>
                      ))}
                    </div>
                  )}
                  {n.bio && <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{n.bio}</p>}
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm font-extrabold text-primary">
                      {n.price ? `R$ ${Number(n.price).toFixed(0)}` : "A combinar"}
                      {n.price && <span className="text-xs font-normal text-muted-foreground">/consulta</span>}
                    </span>
                    <Button
                      size="sm"
                      variant={isLinked ? "secondary" : "default"}
                      className="h-7 text-xs"
                      disabled={isLinked || requesting === n.user_id}
                      onClick={() => requestLink(n.user_id)}
                    >
                      {requesting === n.user_id ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : isLinked ? (
                        <><Check className="mr-1 h-3 w-3" /> Vinculado</>
                      ) : (
                        "Solicitar acompanhamento"
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Marketplace;