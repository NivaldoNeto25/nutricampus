import { useState, useMemo } from "react";
import { useUser } from "@/contexts/UserContext";
import { Check, ShoppingCart } from "lucide-react";

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
  "Manjericão": "Hortifruti", "Salsinha": "Hortifruti", "Mirtilo": "Hortifruti", "Blueberry": "Hortifruti",
  "Beterraba": "Hortifruti", "Alface romana": "Hortifruti", "Maracujá": "Hortifruti",
  "Uva-passa": "Hortifruti", "Damasco": "Hortifruti", "Cranberry": "Hortifruti",
  "Tâmaras": "Hortifruti", "Rúcula": "Hortifruti", "Repolho": "Hortifruti", "Mandioquinha": "Hortifruti",
  "Claras de ovo": "Proteínas",
  "Peito de frango": "Proteínas", "Peito de frango (300g)": "Proteínas",
  "Peito de frango (250g)": "Proteínas", "Peito de frango (200g)": "Proteínas",
  "Carne moída": "Proteínas", "Carne moída (250g)": "Proteínas", "Carne moída (200g)": "Proteínas",
  "Ovos": "Proteínas", "Ovos (2)": "Proteínas", "Ovos (3)": "Proteínas", "Ovos (4)": "Proteínas",
  "Atum": "Proteínas", "Filé de tilápia": "Proteínas", "Salmão": "Proteínas",
  "Ovo cozido": "Proteínas", "Ovo frito": "Proteínas",
  "Iogurte natural": "Proteínas", "Iogurte grego": "Proteínas", "Cottage": "Proteínas",
  "Queijo branco": "Proteínas", "Queijo coalho": "Proteínas", "Queijo": "Proteínas",
  "Whey protein": "Proteínas", "Leite": "Proteínas", "Leite integral": "Proteínas",
  "Creme de leite light": "Proteínas", "Requeijão": "Proteínas", "Requeijão light": "Proteínas",
  "Presunto de peru": "Proteínas", "Bacon de peru": "Proteínas",
  "Patinho (250g)": "Proteínas", "Bife (200g)": "Proteínas",
  "Coxa de frango": "Proteínas", "Linguiça de frango": "Proteínas",
  "Parmesão": "Proteínas", "Cogumelos": "Proteínas",
  "Banana (2)": "Hortifruti",
  "Arroz": "Grãos/Mercearia", "Arroz integral": "Grãos/Mercearia", "Arroz arbóreo": "Grãos/Mercearia",
  "Feijão": "Grãos/Mercearia", "Feijão preto": "Grãos/Mercearia",
  "Macarrão integral": "Grãos/Mercearia", "Aveia": "Grãos/Mercearia",
  "Granola": "Grãos/Mercearia", "Quinoa": "Grãos/Mercearia", "Lentilha": "Grãos/Mercearia",
  "Grão-de-bico": "Grãos/Mercearia", "Goma de tapioca": "Grãos/Mercearia",
  "Pasta de amendoim": "Grãos/Mercearia", "Mel": "Grãos/Mercearia",
  "Azeite": "Grãos/Mercearia", "Manteiga": "Grãos/Mercearia",
  "Pão integral": "Grãos/Mercearia", "Pão integral (2 fatias)": "Grãos/Mercearia",
  "Tortilla integral": "Grãos/Mercearia", "Biscoito de arroz": "Grãos/Mercearia",
  "Castanha de caju": "Grãos/Mercearia", "Castanha-do-pará": "Grãos/Mercearia",
  "Nozes": "Grãos/Mercearia", "Amendoim": "Grãos/Mercearia", "Castanhas": "Grãos/Mercearia",
  "Canela": "Grãos/Mercearia", "Sal": "Grãos/Mercearia", "Pimenta": "Grãos/Mercearia",
  "Curry": "Grãos/Mercearia", "Cúrcuma": "Grãos/Mercearia", "Orégano": "Grãos/Mercearia",
  "Molho de tomate": "Grãos/Mercearia", "Molho Caesar light": "Grãos/Mercearia", "Molho shoyu": "Grãos/Mercearia",
  "Leite de coco": "Grãos/Mercearia", "Caldo de legumes": "Grãos/Mercearia",
  "Geleia de frutas": "Grãos/Mercearia", "Maionese light": "Grãos/Mercearia",
  "Chocolate 70%": "Grãos/Mercearia", "Cacau": "Grãos/Mercearia", "Cacau em pó": "Grãos/Mercearia",
  "Polpa de açaí": "Grãos/Mercearia", "Água de coco": "Grãos/Mercearia",
  "Chia": "Grãos/Mercearia", "Farinha integral": "Grãos/Mercearia",
  "Croutons integrais": "Grãos/Mercearia", "Massa de panqueca integral": "Grãos/Mercearia",
  "Massa integral": "Grãos/Mercearia", "Polvilho": "Grãos/Mercearia",
  "Sopa instantânea": "Grãos/Mercearia", "Milho": "Grãos/Mercearia", "Milho de pipoca": "Grãos/Mercearia",
  "Ervilha": "Grãos/Mercearia", "Salada": "Hortifruti", "Tahine": "Grãos/Mercearia", "Salsa": "Hortifruti",
  "Queijo parmesão": "Proteínas",
};

function categorize(name: string): Category {
  return ingredientCategory[name] || "Grãos/Mercearia";
}

const ShoppingTab = () => {
  const { currentMenu, getEffectiveMeal } = useUser();

  const allIngredients = useMemo(() => {
    const map = new Map<string, Category>();
    currentMenu.forEach((day, di) =>
      day.meals.forEach((_, mi) => {
        const meal = getEffectiveMeal(di, mi);
        meal.ingredients.forEach((ing) => {
          if (!map.has(ing)) map.set(ing, categorize(ing));
        });
      })
    );
    return Array.from(map.entries()).map(([name, cat], i) => ({
      id: `ing-${i}`,
      name,
      category: cat,
    }));
  }, [currentMenu, getEffectiveMeal]);

  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const categories: Category[] = ["Hortifruti", "Proteínas", "Grãos/Mercearia"];
  const checkedCount = checked.size;
  const progressVal = allIngredients.length > 0 ? Math.round((checkedCount / allIngredients.length) * 100) : 0;

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

      {categories.map((cat) => {
        const catItems = allIngredients.filter((i) => i.category === cat);
        if (catItems.length === 0) return null;
        const allChecked = catItems.every((i) => checked.has(i.id));
        return (
          <div key={cat}>
            <h2 className="flex items-center gap-2 text-sm font-extrabold text-foreground mb-2">
              <span>{categoryEmojis[cat]}</span>
              {cat}
              {allChecked && <Check className="h-4 w-4 text-nutri-success" />}
            </h2>
            <div className="space-y-1.5">
              {catItems.map((item) => {
                const isChecked = checked.has(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-200 ${
                      isChecked ? "border-nutri-success/30 bg-nutri-green-light" : "bg-card hover:shadow-sm"
                    }`}
                  >
                    <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all duration-200 ${
                      isChecked ? "border-nutri-success bg-nutri-success" : "border-muted-foreground/30"
                    }`}>
                      {isChecked && <Check className="h-3 w-3 text-primary-foreground" />}
                    </div>
                    <span className={`flex-1 text-left text-sm font-semibold transition-all duration-200 ${isChecked ? "line-through opacity-50" : ""}`}>
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ShoppingTab;
