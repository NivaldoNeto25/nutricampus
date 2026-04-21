import { Salad, ShoppingCart, Lightbulb, ArrowRight } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

const bullets = [
  { icon: Salad, title: "Cardápios baseados no seu tempo", desc: "Receitas que respeitam sua rotina e nível na cozinha." },
  { icon: ShoppingCart, title: "Lista de compras inteligente", desc: "Quantidades exatas, agrupadas por seções do mercado." },
  { icon: Lightbulb, title: "Dicas para o caos da rotina", desc: "Plano B para quando a vida real bagunçar tudo." },
];

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-2">
          <div className="text-6xl">🥗</div>
          <h1 className="text-3xl font-extrabold text-primary">NutriCampus</h1>
          <p className="text-base font-semibold text-muted-foreground leading-snug">
            Seu assistente de sobrevivência alimentar para quem estuda e trabalha.
          </p>
        </div>

        <div className="space-y-3 text-left">
          {bullets.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3 rounded-2xl border bg-card p-4 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-nutri-green-light">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-extrabold">{title}</p>
                <p className="text-xs text-muted-foreground leading-snug mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onStart}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-base font-extrabold text-primary-foreground shadow-md transition-all hover:opacity-90"
        >
          Começar minha triagem
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
