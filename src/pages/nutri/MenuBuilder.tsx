import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Coffee, Utensils, Apple, Moon } from "lucide-react";

const slots = [
  { time: "08:00", title: "Café da Manhã", icon: Coffee, items: ["2 ovos mexidos", "1 fatia de pão integral", "1 fruta"] },
  { time: "12:30", title: "Almoço", icon: Utensils, items: ["150g frango grelhado", "4 col. arroz integral", "Brócolis + salada"] },
  { time: "15:30", title: "Lanche", icon: Apple, items: ["Iogurte natural", "1 col. de aveia"] },
  { time: "19:30", title: "Jantar", icon: Moon, items: ["Sopa de legumes", "100g proteína magra"] },
];

const MenuBuilder = () => (
  <div className="space-y-4">
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <CardTitle>Montador de Cardápios</CardTitle>
        <div className="flex gap-2">
          <Select defaultValue="ana">
            <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ana">Ana Silva</SelectItem>
              <SelectItem value="bruno">Bruno Costa</SelectItem>
              <SelectItem value="carla">Carla Mendes</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm"><Plus className="mr-1 h-4 w-4" /> Nova refeição</Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Editando cardápio de <span className="font-semibold text-foreground">Ana Silva</span> · Objetivo: Emagrecimento</p>
      </CardContent>
    </Card>

    <div className="grid gap-4 md:grid-cols-2">
      {slots.map((s) => (
        <Card key={s.time} className="transition-shadow hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-nutri-green-light text-primary">
                <s.icon className="h-4 w-4" />
              </div>
              <div>
                <CardTitle className="text-sm">{s.title}</CardTitle>
                <p className="text-xs text-muted-foreground">{s.time}</p>
              </div>
            </div>
            <Button size="sm" variant="ghost">Editar</Button>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1.5 text-sm">
              {s.items.map((i) => (
                <li key={i} className="flex items-start gap-2 text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" /> {i}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default MenuBuilder;