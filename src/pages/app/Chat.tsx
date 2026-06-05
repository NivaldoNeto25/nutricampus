import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const conversations = [
  { name: "Dra. Marina Alves", last: "Beleza! Mando o cardápio até sexta.", time: "09:42", unread: 2 },
  { name: "Suporte NutriSync", last: "Sua conta foi verificada com sucesso.", time: "Ontem", unread: 0 },
];

const messages = [
  { from: "her", text: "Oi! Como foi a alimentação no fim de semana?", time: "09:38" },
  { from: "me", text: "Consegui seguir bem, só escapei no domingo à noite 😅", time: "09:40" },
  { from: "her", text: "Beleza! Mando o cardápio até sexta.", time: "09:42" },
];

const Chat = () => (
  <div className="space-y-4">
    <h2 className="text-xl font-extrabold">Mensagens</h2>

    <div className="space-y-2">
      {conversations.map((c) => (
        <Card key={c.name} className="cursor-pointer transition-colors hover:bg-secondary/50">
          <CardContent className="flex items-center gap-3 p-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
              {c.name.split(" ").slice(-2).map((p) => p[0]).join("")}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <h3 className="truncate text-sm font-bold">{c.name}</h3>
                <span className="text-[10px] text-muted-foreground">{c.time}</span>
              </div>
              <p className="truncate text-xs text-muted-foreground">{c.last}</p>
            </div>
            {c.unread > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground">
                {c.unread}
              </span>
            )}
          </CardContent>
        </Card>
      ))}
    </div>

    <Card>
      <CardContent className="p-3">
        <p className="mb-2 text-xs font-semibold text-muted-foreground">Conversa com Dra. Marina</p>
        <div className="space-y-2">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[75%] rounded-2xl px-3 py-2 text-xs ${
                  m.from === "me"
                    ? "rounded-br-sm bg-primary text-primary-foreground"
                    : "rounded-bl-sm bg-secondary text-secondary-foreground"
                }`}
              >
                {m.text}
                <div className="mt-0.5 text-[9px] opacity-70">{m.time}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <Input placeholder="Escreva uma mensagem..." className="h-9 text-sm" />
          <Button size="sm" className="h-9 px-3"><Send className="h-4 w-4" /></Button>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default Chat;