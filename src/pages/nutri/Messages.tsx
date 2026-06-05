import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useState } from "react";

const threads = [
  { name: "Ana Silva", last: "Doutora, posso trocar a fruta da tarde?", time: "10:14", unread: 1 },
  { name: "Bruno Costa", last: "Treino foi ótimo hoje 💪", time: "09:02", unread: 0 },
  { name: "Carla Mendes", last: "Obrigada pelo cardápio!", time: "Ontem", unread: 0 },
  { name: "Diego Rocha", last: "Mando o diário alimentar amanhã.", time: "Ontem", unread: 0 },
];

const messages = [
  { from: "them", text: "Doutora, posso trocar a fruta da tarde por uma banana?", time: "10:14" },
  { from: "me", text: "Pode sim, Ana! Banana é uma ótima opção pré-treino.", time: "10:16" },
];

const Messages = () => {
  const [active, setActive] = useState(0);
  return (
    <Card className="overflow-hidden">
      <div className="grid h-[70vh] grid-cols-1 md:grid-cols-[280px_1fr]">
        <div className="border-r">
          <div className="border-b p-3 font-bold">Conversas</div>
          <div className="divide-y">
            {threads.map((t, i) => (
              <button
                key={t.name}
                onClick={() => setActive(i)}
                className={`flex w-full items-center gap-3 p-3 text-left hover:bg-secondary/50 ${i === active ? "bg-secondary" : ""}`}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                  {t.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-semibold">{t.name}</p>
                    <span className="text-[10px] text-muted-foreground">{t.time}</span>
                  </div>
                  <p className="truncate text-xs text-muted-foreground">{t.last}</p>
                </div>
                {t.unread > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground">{t.unread}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="border-b p-3 font-bold">{threads[active].name}</div>
          <CardContent className="flex-1 space-y-3 overflow-auto p-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] rounded-2xl px-3 py-2 text-sm ${m.from === "me" ? "rounded-br-sm bg-primary text-primary-foreground" : "rounded-bl-sm bg-secondary"}`}>
                  {m.text}
                  <div className="mt-0.5 text-[10px] opacity-70">{m.time}</div>
                </div>
              </div>
            ))}
          </CardContent>
          <div className="flex gap-2 border-t p-3">
            <Input placeholder="Escreva uma mensagem..." />
            <Button><Send className="h-4 w-4" /></Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Messages;