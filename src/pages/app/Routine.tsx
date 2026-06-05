import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coffee, Sun, Utensils, Apple, Moon, Stethoscope, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

const meals = [
  { time: "08:00", title: "Café da Manhã", desc: "Ovos mexidos, pão integral e fruta", icon: Coffee, prescribed: true },
  { time: "10:30", title: "Lanche da Manhã", desc: "Iogurte natural com aveia", icon: Apple, prescribed: false },
  { time: "12:30", title: "Almoço", desc: "Frango grelhado, arroz integral, brócolis e salada", icon: Utensils, prescribed: true },
  { time: "15:30", title: "Lanche da Tarde", desc: "Mix de castanhas e banana", icon: Sun, prescribed: false },
  { time: "19:30", title: "Jantar", desc: "Sopa de legumes com proteína magra", icon: Moon, prescribed: true },
];

const Routine = () => {
  const { user } = useAuth();
  const name = (user?.user_metadata as any)?.name?.split(" ")[0] ?? "amigo(a)";
  const today = new Date().getDay();
  const [active, setActive] = useState((today + 6) % 7);

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">Bom dia ☀️</p>
        <h2 className="text-2xl font-extrabold leading-tight">Olá, {name}!</h2>
        <p className="text-sm text-muted-foreground">Aqui está sua rotina de hoje.</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {days.map((d, i) => (
          <button
            key={d}
            onClick={() => setActive(i)}
            className={`flex h-14 w-12 shrink-0 flex-col items-center justify-center rounded-xl border text-xs font-bold transition-all ${
              i === active
                ? "border-primary bg-primary text-primary-foreground shadow-md"
                : "border-border bg-card text-muted-foreground hover:border-primary/40"
            }`}
          >
            <span className="text-[10px] opacity-80">{d}</span>
            <span className="text-base">{i + 3}</span>
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {meals.map((m) => (
          <Card key={m.time} className="overflow-hidden transition-shadow hover:shadow-md">
            <CardContent className="flex items-start gap-3 p-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-nutri-green-light text-primary">
                <m.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-bold">{m.title}</h3>
                  <span className="text-xs font-semibold text-muted-foreground">{m.time}</span>
                </div>
                <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{m.desc}</p>
                <div className="mt-2">
                  {m.prescribed ? (
                    <Badge variant="default" className="gap-1 text-[10px]">
                      <Stethoscope className="h-3 w-3" /> Prescrição profissional
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="gap-1 text-[10px]">
                      <Sparkles className="h-3 w-3" /> Sugestão genérica
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Routine;