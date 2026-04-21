import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Meal } from "@/data/mockData";
import { Flame, Check } from "lucide-react";

interface SubstitutionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  options: Meal[];
  currentTitle: string;
  onSelect: (meal: Meal) => void;
}

const SubstitutionModal = ({ open, onOpenChange, options, currentTitle, onSelect }: SubstitutionModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-extrabold">Escolha um substituto</DialogTitle>
          <DialogDescription>
            Trocando: <span className="font-bold text-foreground">{currentTitle}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2 mt-2 max-h-[60vh] overflow-y-auto">
          {options.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-6">
              Sem alternativas disponíveis para este nível.
            </p>
          )}
          {options.map((m) => (
            <button
              key={m.title}
              onClick={() => { onSelect(m); onOpenChange(false); }}
              className="flex w-full items-start gap-3 rounded-xl border bg-card p-3 text-left transition-all hover:border-primary hover:bg-nutri-green-light"
            >
              <span className="text-2xl">{m.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold leading-tight">{m.title}</p>
                <p className="text-[11px] text-muted-foreground leading-snug">{m.description}</p>
                <div className="mt-1 flex items-center gap-2 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-0.5"><Flame className="h-3 w-3" />{m.calories} kcal</span>
                  <span className="rounded-full bg-secondary px-2 py-0.5 font-bold">{m.skill}</span>
                </div>
              </div>
              <Check className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100" />
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubstitutionModal;
