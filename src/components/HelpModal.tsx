import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ChefHat, Repeat, Trophy } from "lucide-react";

interface HelpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const sections = [
  {
    icon: ChefHat,
    title: "Nível de Cozinha",
    desc: "Mínimo = só montar; Básico = preparos rápidos; Tranquilo = receitas completas. O cardápio respeita seu nível.",
  },
  {
    icon: Repeat,
    title: "Botão Substituir",
    desc: "Não troca direto: abre uma lista com 3-4 receitas alternativas do mesmo nível e objetivo. Você escolhe a que prefere.",
  },
  {
    icon: Trophy,
    title: "Gamificação",
    desc: "Cada refeição marcada vale +15 XP. Completar todas do dia dá bônus e aumenta seu Streak (dias seguidos). Acumule XP e desbloqueie Badges!",
  },
];

const HelpModal = ({ open, onOpenChange }: HelpModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-extrabold">Como usar o NutriCampus</DialogTitle>
          <DialogDescription>Guia rápido das principais funcionalidades.</DialogDescription>
        </DialogHeader>
        <div className="space-y-3 mt-2">
          {sections.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3 rounded-xl border bg-card p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-nutri-green-light">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-extrabold">{title}</p>
                <p className="text-xs text-muted-foreground leading-snug mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HelpModal;
