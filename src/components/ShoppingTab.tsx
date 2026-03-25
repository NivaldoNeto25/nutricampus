import { useState } from "react";
import { shoppingList, ShoppingItem } from "@/data/mockData";
import { Check, ShoppingCart } from "lucide-react";

const categoryEmojis: Record<string, string> = {
  "Hortifruti": "🥬",
  "Proteínas": "🥩",
  "Grãos/Mercearia": "🌾",
};

const ShoppingTab = () => {
  const [items, setItems] = useState<ShoppingItem[]>(shoppingList);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const categories = ["Hortifruti", "Proteínas", "Grãos/Mercearia"] as const;
  const checkedCount = items.filter((i) => i.checked).length;
  const progress = Math.round((checkedCount / items.length) * 100);

  return (
    <div className="space-y-5 pb-4">
      {/* Header */}
      <div className="rounded-2xl bg-accent p-5 text-accent-foreground">
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          <h1 className="text-xl font-extrabold">Lista de Compras</h1>
        </div>
        <p className="mt-1 text-sm opacity-80">
          {checkedCount}/{items.length} itens • {progress}% concluído
        </p>
        <div className="mt-3 h-2 rounded-full bg-accent-foreground/20">
          <div
            className="h-2 rounded-full bg-accent-foreground transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Categories */}
      {categories.map((cat) => {
        const catItems = items.filter((i) => i.category === cat);
        const allChecked = catItems.every((i) => i.checked);
        return (
          <div key={cat}>
            <h2 className="flex items-center gap-2 text-sm font-extrabold text-foreground mb-2">
              <span>{categoryEmojis[cat]}</span>
              {cat}
              {allChecked && <Check className="h-4 w-4 text-nutri-success" />}
            </h2>
            <div className="space-y-1.5">
              {catItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-200 ${
                    item.checked
                      ? "border-nutri-success/30 bg-nutri-green-light"
                      : "bg-card hover:shadow-sm"
                  }`}
                >
                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all duration-200 ${
                      item.checked
                        ? "border-nutri-success bg-nutri-success"
                        : "border-muted-foreground/30"
                    }`}
                  >
                    {item.checked && <Check className="h-3 w-3 text-primary-foreground" />}
                  </div>
                  <span
                    className={`flex-1 text-left text-sm font-semibold transition-all duration-200 ${
                      item.checked ? "line-through opacity-50" : ""
                    }`}
                  >
                    {item.name}
                  </span>
                  <span className={`text-xs text-muted-foreground ${item.checked ? "opacity-50" : ""}`}>
                    {item.quantity}
                  </span>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ShoppingTab;
