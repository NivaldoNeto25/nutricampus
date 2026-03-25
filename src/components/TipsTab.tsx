import { tips } from "@/data/mockData";
import { Lightbulb } from "lucide-react";

const tagColors: Record<string, string> = {
  "Praticidade": "bg-nutri-orange-light text-accent",
  "Economia": "bg-nutri-green-light text-primary",
  "Foco": "bg-secondary text-secondary-foreground",
};

const TipsTab = () => {
  return (
    <div className="space-y-5 pb-4">
      {/* Header */}
      <div className="rounded-2xl bg-accent p-5 text-accent-foreground">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          <h1 className="text-xl font-extrabold">Sobrevivência Universitária</h1>
        </div>
        <p className="mt-1 text-sm opacity-80">Dicas rápidas para o dia a dia 💡</p>
      </div>

      {/* Tips cards */}
      <div className="space-y-3">
        {tips.map((tip) => (
          <div
            key={tip.id}
            className="rounded-xl border bg-card p-5 shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl">{tip.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${tagColors[tip.tag] || "bg-muted text-muted-foreground"}`}>
                    {tip.tag}
                  </span>
                </div>
                <h3 className="mt-1.5 text-sm font-extrabold leading-tight">{tip.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{tip.summary}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TipsTab;
