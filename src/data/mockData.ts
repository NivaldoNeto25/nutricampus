export interface Meal {
  type: "Almoço" | "Lanche" | "Jantar";
  title: string;
  description: string;
  emoji: string;
  calories: number;
}

export interface DayPlan {
  day: string;
  shortDay: string;
  meals: Meal[];
}

export interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  category: "Hortifruti" | "Proteínas" | "Grãos/Mercearia";
  checked: boolean;
}

export interface PrepStep {
  id: string;
  order: number;
  title: string;
  duration: string;
  tip?: string;
  done: boolean;
}

export interface Tip {
  id: string;
  title: string;
  summary: string;
  emoji: string;
  tag: string;
}

export const weekPlan: DayPlan[] = [
  {
    day: "Segunda-feira",
    shortDay: "Seg",
    meals: [
      { type: "Almoço", title: "Frango grelhado com arroz integral e brócolis", description: "Proteína magra + carboidrato complexo + fibras", emoji: "🍗", calories: 480 },
      { type: "Lanche", title: "Banana com pasta de amendoim", description: "Energia rápida e saciedade", emoji: "🍌", calories: 220 },
      { type: "Jantar", title: "Wrap integral de atum com salada", description: "Leve e nutritivo para a noite", emoji: "🌯", calories: 380 },
    ],
  },
  {
    day: "Terça-feira",
    shortDay: "Ter",
    meals: [
      { type: "Almoço", title: "Carne moída com purê de batata-doce", description: "Ferro + energia de longa duração", emoji: "🥩", calories: 520 },
      { type: "Lanche", title: "Mix de castanhas e frutas secas", description: "Gorduras boas e praticidade", emoji: "🥜", calories: 180 },
      { type: "Jantar", title: "Omelete de legumes com pão integral", description: "Prático e cheio de nutrientes", emoji: "🍳", calories: 350 },
    ],
  },
  {
    day: "Quarta-feira",
    shortDay: "Qua",
    meals: [
      { type: "Almoço", title: "Macarrão integral com molho de frango", description: "Carboidrato saudável + proteína", emoji: "🍝", calories: 500 },
      { type: "Lanche", title: "Iogurte natural com granola", description: "Probióticos e fibras", emoji: "🥣", calories: 200 },
      { type: "Jantar", title: "Sopa de legumes com frango desfiado", description: "Conforto e nutrição", emoji: "🥣", calories: 320 },
    ],
  },
  {
    day: "Quinta-feira",
    shortDay: "Qui",
    meals: [
      { type: "Almoço", title: "Frango ao curry com arroz basmati", description: "Saboroso e energético", emoji: "🍛", calories: 490 },
      { type: "Lanche", title: "Torrada integral com cottage", description: "Proteína leve e rápida", emoji: "🍞", calories: 160 },
      { type: "Jantar", title: "Salada completa com grão-de-bico", description: "Fibras e saciedade", emoji: "🥗", calories: 380 },
    ],
  },
  {
    day: "Sexta-feira",
    shortDay: "Sex",
    meals: [
      { type: "Almoço", title: "Peixe assado com legumes no forno", description: "Ômega 3 e vitaminas", emoji: "🐟", calories: 420 },
      { type: "Lanche", title: "Smoothie de morango e aveia", description: "Refrescante e nutritivo", emoji: "🥤", calories: 230 },
      { type: "Jantar", title: "Tapioca com frango e queijo branco", description: "Leve e saborosa", emoji: "🫓", calories: 340 },
    ],
  },
  {
    day: "Sábado",
    shortDay: "Sáb",
    meals: [
      { type: "Almoço", title: "Strogonoff de frango com arroz", description: "Comfort food saudável", emoji: "🍚", calories: 530 },
      { type: "Lanche", title: "Frutas da estação", description: "Vitaminas e hidratação", emoji: "🍎", calories: 150 },
      { type: "Jantar", title: "Panqueca integral de carne", description: "Versátil e gostosa", emoji: "🥞", calories: 400 },
    ],
  },
  {
    day: "Domingo",
    shortDay: "Dom",
    meals: [
      { type: "Almoço", title: "Feijoada light", description: "Tradição com menos gordura", emoji: "🫘", calories: 480 },
      { type: "Lanche", title: "Bolo integral de cenoura", description: "Docinho saudável", emoji: "🍰", calories: 210 },
      { type: "Jantar", title: "Sanduíche natural de frango", description: "Prático para fechar a semana", emoji: "🥪", calories: 360 },
    ],
  },
];

export const shoppingList: ShoppingItem[] = [
  { id: "1", name: "Brócolis", quantity: "2 maços", category: "Hortifruti", checked: false },
  { id: "2", name: "Batata-doce", quantity: "1 kg", category: "Hortifruti", checked: false },
  { id: "3", name: "Banana", quantity: "1 cacho", category: "Hortifruti", checked: false },
  { id: "4", name: "Cenoura", quantity: "500g", category: "Hortifruti", checked: false },
  { id: "5", name: "Tomate", quantity: "6 unid.", category: "Hortifruti", checked: false },
  { id: "6", name: "Peito de frango", quantity: "1.5 kg", category: "Proteínas", checked: false },
  { id: "7", name: "Carne moída magra", quantity: "500g", category: "Proteínas", checked: false },
  { id: "8", name: "Ovos", quantity: "1 dúzia", category: "Proteínas", checked: false },
  { id: "9", name: "Atum em lata", quantity: "3 latas", category: "Proteínas", checked: false },
  { id: "10", name: "Filé de peixe", quantity: "400g", category: "Proteínas", checked: false },
  { id: "11", name: "Arroz integral", quantity: "1 kg", category: "Grãos/Mercearia", checked: false },
  { id: "12", name: "Macarrão integral", quantity: "500g", category: "Grãos/Mercearia", checked: false },
  { id: "13", name: "Aveia em flocos", quantity: "300g", category: "Grãos/Mercearia", checked: false },
  { id: "14", name: "Pasta de amendoim", quantity: "1 pote", category: "Grãos/Mercearia", checked: false },
  { id: "15", name: "Granola", quantity: "250g", category: "Grãos/Mercearia", checked: false },
];

export const prepSteps: PrepStep[] = [
  { id: "s1", order: 1, title: "Coloque o arroz integral e o feijão para cozinhar", duration: "5 min preparo · 40 min cozimento", tip: "Use a panela de pressão para agilizar!", done: false },
  { id: "s2", order: 2, title: "Lave e pique todos os legumes (brócolis, cenoura, batata-doce)", duration: "15 min", done: false },
  { id: "s3", order: 3, title: "Tempere e grelhe os peitos de frango", duration: "20 min", tip: "Divida em porções iguais antes de grelhar", done: false },
  { id: "s4", order: 4, title: "Asse a batata-doce e os legumes no forno", duration: "30 min no forno", done: false },
  { id: "s5", order: 5, title: "Refogue a carne moída com temperos", duration: "15 min", done: false },
  { id: "s6", order: 6, title: "Cozinhe o macarrão integral al dente", duration: "10 min", tip: "Reserve um pouco da água do cozimento para o molho", done: false },
  { id: "s7", order: 7, title: "Monte os potes: divida tudo em 5 porções iguais", duration: "15 min", done: false },
  { id: "s8", order: 8, title: "Etiquete os potes com o dia da semana e guarde na geladeira/freezer", duration: "5 min", tip: "Congele o que for usar após quarta-feira", done: false },
];

export const tips: Tip[] = [
  {
    id: "t1",
    title: "Snacks que não estragam na mochila",
    summary: "Castanhas, barrinhas de cereal, frutas secas e biscoitos integrais são opções práticas que sobrevivem horas na mochila sem refrigeração. Mantenha sempre um kit de emergência!",
    emoji: "🎒",
    tag: "Praticidade",
  },
  {
    id: "t2",
    title: "Opções baratas na cantina",
    summary: "Prefira o PF (prato feito) ao invés de lanches processados. Sopas, saladas e sucos naturais geralmente são mais baratos e nutritivos. Evite frituras e refrigerantes.",
    emoji: "🏫",
    tag: "Economia",
  },
  {
    id: "t3",
    title: "Como evitar sono nas aulas",
    summary: "Evite refeições muito pesadas antes da aula. Prefira lanches leves com proteína. Beba água constantemente e, se possível, caminhe 5 min antes de sentar. Café? Só até 14h!",
    emoji: "😴",
    tag: "Foco",
  },
];
