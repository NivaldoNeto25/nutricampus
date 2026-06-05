import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Star, BadgeCheck } from "lucide-react";

const nutris = [
  { name: "Dra. Marina Alves", specialty: "Esportiva", price: 180, rating: 4.9, reviews: 127, verified: true },
  { name: "Dr. Pedro Henrique", specialty: "Clínica & Diabetes", price: 150, rating: 4.8, reviews: 89, verified: true },
  { name: "Dra. Sofia Ramos", specialty: "Vegetariana / Vegana", price: 140, rating: 4.7, reviews: 64, verified: true },
  { name: "Dr. Lucas Pereira", specialty: "Materno-infantil", price: 200, rating: 5.0, reviews: 42, verified: true },
];

const Marketplace = () => (
  <div className="space-y-4">
    <div>
      <h2 className="text-xl font-extrabold">Encontre seu Nutri</h2>
      <p className="text-sm text-muted-foreground">Profissionais verificados pelo CRN.</p>
    </div>

    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input placeholder="Buscar por nome ou especialidade" className="pl-9" />
    </div>

    <div className="flex gap-2 overflow-x-auto pb-1">
      {["Todos", "Esportiva", "Clínica", "Vegana", "Materno-infantil"].map((t, i) => (
        <Badge key={t} variant={i === 0 ? "default" : "secondary"} className="cursor-pointer whitespace-nowrap px-3 py-1">
          {t}
        </Badge>
      ))}
    </div>

    <div className="space-y-3">
      {nutris.map((n) => (
        <Card key={n.name} className="transition-shadow hover:shadow-md">
          <CardContent className="flex gap-3 p-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-lg font-bold text-primary-foreground">
              {n.name.split(" ").slice(-2).map((p) => p[0]).join("")}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1">
                <h3 className="truncate text-sm font-bold">{n.name}</h3>
                {n.verified && <BadgeCheck className="h-4 w-4 shrink-0 text-primary" />}
              </div>
              <p className="text-xs text-muted-foreground">{n.specialty}</p>
              <div className="mt-1 flex items-center gap-1 text-xs">
                <Star className="h-3 w-3 fill-accent text-accent" />
                <span className="font-semibold">{n.rating}</span>
                <span className="text-muted-foreground">({n.reviews})</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm font-extrabold text-primary">R$ {n.price}<span className="text-xs font-normal text-muted-foreground">/consulta</span></span>
                <Button size="sm" className="h-7 text-xs">Ver perfil</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default Marketplace;