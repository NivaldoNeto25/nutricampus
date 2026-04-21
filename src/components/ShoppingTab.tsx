import { useState, useMemo } from "react";
import { useUser } from "@/contexts/UserContext";
import { Check, ShoppingCart } from "lucide-react";
import { getQuantityForIngredient, formatQuantity } from "@/data/mockData";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type Category = "Hortifruti" | "Proteínas" | "Grãos/Mercearia";

const categoryEmojis: Record<Category, string> = {
  "Hortifruti": "🥬",
  "Proteínas": "🥩",
  "Grãos/Mercearia": "🌾",
};

const ingredientCategory: Record<string, Category> = {
  "Banana": "Hortifruti", "Morango": "Hortifruti", "Maçã": "Hortifruti", "Manga": "Hortifruti",
  "Mamão": "Hortifruti", "Laranja": "Hortifruti", "Limão": "Hortifruti", "Uva": "Hortifruti",
  "Pera": "Hortifruti", "Abacate": "Hortifruti", "Tomate": "Hortifruti", "Cebola": "Hortifruti",
  "Alho": "Hortifruti", "Cenoura": "Hortifruti", "Batata-doce": "Hortifruti", "Batata": "Hortifruti",
  "Brócolis": "Hortifruti", "Espinafre": "Hortifruti", "Abobrinha": "Hortifruti", "Abóbora": "Hortifruti",
  "Couve": "Hortifruti", "Alface": "Hortifruti", "Pepino": "Hortifruti", "Gengibre": "Hortifruti",
  "Mirtilo": "Hortifruti", "Rúcula": "Hortifruti", "Repolho": "Hortifruti",
  "Claras de ovo": "Proteínas", "Peito de frango": "Proteínas", "Carne moída": "Proteínas",
  "Ovos": "Proteínas", "Atum": "Proteínas", "Salmão": "Proteínas", "Filé de tilápia": "Proteínas",
  "Ovo cozido": "Proteínas", "Ovo": "Proteínas", "Iogurte natural": "Proteínas",
  "Iogurte grego": "Proteínas", "Cottage": "Proteínas", "Queijo branco": "Proteínas",
  "Queijo": "Proteínas", "Whey protein": "Proteínas", "Leite": "Proteínas",
  "Leite integral": "Proteínas", "Creme de leite light": "Proteínas", "Requeijão light": "Proteínas",
  "Coxa de frango": "Proteínas", "Queijo parmesão": "Proteínas", "Cogumelos": "Proteínas",
};

function categorize(name: string): Category {
  return ingredientCategory[name] || "Grãos/Mercearia";
}

interface AggItem {
  name: string;
  category: Category;
  amount: number;
  unit: string;
}

const ShoppingTab = () => {
  const { currentMenu, getEffectiveMeal } = useUser();

  const allIngredients = useMemo<AggItem[]>(() => {
    const map = new Map<string, AggItem>();
    currentMenu.forEach((day, di) =>
      day.meals.forEach((_, mi) => {
        const meal = getEffectiveMeal(di, mi);
        meal.ingredients.forEach((ing) => {
          const qty = getQuantityForIngredient(ing);
          const existing = map.get(ing);
          if (existing && existing.unit === qty.unit) {
            existing.amount += qty.amount;
          } else if (!existing) {
            map.set(ing, { name: ing, category: categorize(ing), amount: qty.amount, unit: qty.unit });
          }
        });
      })
    );
    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [currentMenu, getEffectiveMeal]);

  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggleItem = (name: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const categories: Category[] = ["Hortifruti", "Proteínas", "Grãos/Mercearia"];
  const checkedCount = checked.size;
  const progressVal = allIngredients.length > 0 ? Math.round((checkedCount / allIngredients.length) * 100) : 0;

  const renderItems = (cat: Category) => {
    const items = allIngredients.filter((i) => i.category === cat);
    if (items.length === 0) {
      return <p className="text-xs text-muted-foreground text-center py-6">Nenhum item nessa categoria.</p>;
    }
    return (
      <div className="grid grid-cols-2 gap-2">
        {items.map((item) => {
          const isChecked = checked.has(item.name);
          return (
            <button
              key={item.name}
              onClick={() => toggleItem(item.name)}
              className={`flex flex-col gap-1 rounded-xl border px-3 py-3 text-left transition-all duration-200 ${
                isChecked ? "border-nutri-success/30 bg-nutri-green-light" : "bg-card hover:shadow-sm"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className={`text-xs font-extrabold leading-tight transition-all ${isChecked ? "line-through opacity-50" : ""}`}>
                  {item.name}
                </span>
                <div className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-md border-2 transition-all ${
                  isChecked ? "border-nutri-success bg-nutri-success" : "border-muted-foreground/30"
                }`}>
                  {isChecked && <Check className="h-2.5 w-2.5 text-primary-foreground" />}
                </div>
              </div>
              <span className={`text-[11px] font-bold text-primary ${isChecked ? "line-through opacity-50" : ""}`}>
                {formatQuantity(item.amount, item.unit)}
              </span>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-5 pb-4">
      <div className="rounded-2xl bg-accent p-5 text-accent-foreground">
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          <h1 className="text-xl font-extrabold">Lista de Compras</h1>
        </div>
        <p className="mt-1 text-sm opacity-80">
          {checkedCount}/{allIngredients.length} itens • {progressVal}% concluído
        </p>
        <div className="mt-3 h-2 rounded-full bg-accent-foreground/20">
          <div className="h-2 rounded-full bg-accent-foreground transition-all duration-500" style={{ width: `${progressVal}%` }} />
        </div>
      </div>

      <Tabs defaultValue="Hortifruti" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          {categories.map((cat) => (
            <TabsTrigger key={cat} value={cat} className="text-[11px] font-bold">
              <span className="mr-1">{categoryEmojis[cat]}</span>
              <span className="truncate">{cat === "Grãos/Mercearia" ? "Mercearia" : cat}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map((cat) => (
          <TabsContent key={cat} value={cat} className="mt-4">
            {renderItems(cat)}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ShoppingTab;
