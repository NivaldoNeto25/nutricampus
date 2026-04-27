export type MealType = "Café da Manhã" | "Lanche da Manhã" | "Almoço" | "Lanche da Tarde" | "Jantar";
export type CookingSkill = "Mínimo" | "Básico" | "Tranquilo";
export type DietType = "Onívoro" | "Vegetariano" | "Vegano";

export interface Meal {
  type: MealType;
  title: string;
  description: string;
  emoji: string;
  calories: number;
  ingredients: string[];
  prepSteps: string[];
  skill: CookingSkill;
  // Quais dietas esta receita atende. Se omitido, assume-se "Onívoro".
  diets?: DietType[];
}

export interface DayPlan {
  day: string;
  shortDay: string;
  trainingNote?: string;
  meals: Meal[];
}

export interface Tip {
  id: string;
  title: string;
  summary: string;
  emoji: string;
  tag: string;
}

// ─── POOL COMPLETO DE RECEITAS POR TIPO + SKILL ───
const recipePool: Meal[] = [
  // ═══ CAFÉ DA MANHÃ ═══
  // Mínimo
  { type: "Café da Manhã", title: "Iogurte com granola e mel", description: "Zero preparo", emoji: "🥛", calories: 250, ingredients: ["Iogurte natural", "Granola", "Mel"], prepSteps: ["Coloque iogurte no copo", "Cubra com granola e mel"], skill: "Mínimo" },
  { type: "Café da Manhã", title: "Torrada com cottage e mel", description: "Monte em 2 min", emoji: "🍞", calories: 230, ingredients: ["Pão integral", "Cottage", "Mel"], prepSteps: ["Torre o pão", "Espalhe cottage", "Regue com mel"], skill: "Mínimo" },
  { type: "Café da Manhã", title: "Banana com pasta de amendoim", description: "Energia instantânea", emoji: "🍌", calories: 280, ingredients: ["Banana", "Pasta de amendoim"], prepSteps: ["Fatie a banana", "Sirva com pasta de amendoim"], skill: "Mínimo" },
  { type: "Café da Manhã", title: "Açaí pronto com granola", description: "Compre pronto e monte", emoji: "🫐", calories: 350, ingredients: ["Polpa de açaí", "Granola", "Banana"], prepSteps: ["Bata o açaí", "Cubra com granola e banana"], skill: "Mínimo" },
  // Básico
  { type: "Café da Manhã", title: "Ovos mexidos com torrada", description: "Clássico rápido", emoji: "🍳", calories: 300, ingredients: ["Ovos", "Pão integral", "Manteiga"], prepSteps: ["Mexa os ovos na frigideira", "Sirva sobre o pão torrado"], skill: "Básico" },
  { type: "Café da Manhã", title: "Overnight oats de banana", description: "Prepare na noite anterior", emoji: "🥣", calories: 280, ingredients: ["Aveia", "Leite", "Banana", "Mel"], prepSteps: ["Misture aveia, leite e mel no pote", "Cubra com fatias de banana", "Leve à geladeira por 8h"], skill: "Básico" },
  { type: "Café da Manhã", title: "Crepioca de queijo", description: "Sem glúten e rápida", emoji: "🫓", calories: 280, ingredients: ["Ovos", "Goma de tapioca", "Queijo branco"], prepSteps: ["Misture ovo com goma", "Faça na frigideira", "Recheie com queijo"], skill: "Básico" },
  { type: "Café da Manhã", title: "Vitamina de mamão", description: "Digestão e energia", emoji: "🥤", calories: 250, ingredients: ["Mamão", "Leite", "Aveia", "Mel"], prepSteps: ["Bata tudo no liquidificador"], skill: "Básico" },
  // Tranquilo
  { type: "Café da Manhã", title: "Panqueca de banana fit", description: "Sem farinha!", emoji: "🥞", calories: 300, ingredients: ["Banana", "Ovos", "Aveia", "Canela"], prepSteps: ["Amasse a banana", "Misture com ovos, aveia e canela", "Faça na frigideira antiaderente"], skill: "Tranquilo" },
  { type: "Café da Manhã", title: "Mingau de aveia com frutas vermelhas", description: "Carboidratos complexos", emoji: "🥣", calories: 320, ingredients: ["Aveia", "Leite", "Morango", "Mirtilo", "Mel"], prepSteps: ["Cozinhe aveia com leite por 5 min", "Cubra com frutas e mel"], skill: "Tranquilo" },
  { type: "Café da Manhã", title: "Torrada francesa integral", description: "Clássico reinventado", emoji: "🍞", calories: 320, ingredients: ["Pão integral", "Ovos", "Leite", "Canela"], prepSteps: ["Misture ovo com leite e canela", "Passe o pão na mistura", "Doure na frigideira"], skill: "Tranquilo" },
  { type: "Café da Manhã", title: "Omelete de claras com espinafre", description: "Muito proteína, pouca gordura", emoji: "🍳", calories: 200, ingredients: ["Claras de ovo", "Espinafre", "Tomate"], prepSteps: ["Bata as claras", "Adicione espinafre e tomate", "Cozinhe na frigideira"], skill: "Tranquilo" },

  // ═══ LANCHE DA MANHÃ ═══
  // Mínimo
  { type: "Lanche da Manhã", title: "Banana com canela", description: "1 minuto", emoji: "🍌", calories: 120, ingredients: ["Banana", "Canela"], prepSteps: ["Descasque a banana", "Polvilhe canela"], skill: "Mínimo" },
  { type: "Lanche da Manhã", title: "Mix de castanhas", description: "Energia de bolso", emoji: "🥜", calories: 180, ingredients: ["Castanha de caju", "Castanha-do-pará", "Amendoim"], prepSteps: ["Separe 30g do mix"], skill: "Mínimo" },
  { type: "Lanche da Manhã", title: "Biscoito de arroz com cottage", description: "Crocante e leve", emoji: "🍘", calories: 130, ingredients: ["Biscoito de arroz", "Cottage"], prepSteps: ["Espalhe cottage sobre os biscoitos"], skill: "Mínimo" },
  { type: "Lanche da Manhã", title: "Frutas picadas", description: "Vitaminas frescas", emoji: "🍇", calories: 100, ingredients: ["Morango", "Manga", "Uva"], prepSteps: ["Lave e pique as frutas"], skill: "Mínimo" },
  // Básico
  { type: "Lanche da Manhã", title: "Vitamina energética", description: "Boost natural", emoji: "🥤", calories: 250, ingredients: ["Banana", "Aveia", "Pasta de amendoim", "Leite"], prepSteps: ["Bata tudo no liquidificador"], skill: "Básico" },
  { type: "Lanche da Manhã", title: "Wrap de banana com pasta de amendoim", description: "Energia rápida", emoji: "🌯", calories: 220, ingredients: ["Tortilla integral", "Banana", "Pasta de amendoim"], prepSteps: ["Espalhe pasta de amendoim na tortilla", "Adicione banana e enrole"], skill: "Básico" },
  { type: "Lanche da Manhã", title: "Iogurte grego com granola e mel", description: "Proteína prática", emoji: "🥛", calories: 300, ingredients: ["Iogurte grego", "Granola", "Mel", "Castanhas"], prepSteps: ["Monte a tigela"], skill: "Básico" },
  // Tranquilo
  { type: "Lanche da Manhã", title: "Bolinho de banana com aveia", description: "Doce natural e saudável", emoji: "🍌", calories: 160, ingredients: ["Banana", "Aveia", "Canela"], prepSteps: ["Amasse a banana", "Misture com aveia e canela", "Asse por 15min"], skill: "Tranquilo" },
  { type: "Lanche da Manhã", title: "Chips de batata-doce", description: "Crocante e saudável", emoji: "🍠", calories: 150, ingredients: ["Batata-doce", "Azeite", "Sal"], prepSteps: ["Fatie finamente a batata-doce", "Tempere com azeite e sal", "Asse até crocante"], skill: "Tranquilo" },
  { type: "Lanche da Manhã", title: "Cottage com mel e nozes", description: "Proteína e gordura boa", emoji: "🧀", calories: 190, ingredients: ["Cottage", "Mel", "Nozes"], prepSteps: ["Sirva cottage com mel e nozes por cima"], skill: "Tranquilo" },

  // ═══ ALMOÇO ═══
  // Mínimo
  { type: "Almoço", title: "Wrap integral de frango e salada", description: "Monte em 5 min", emoji: "🌯", calories: 420, ingredients: ["Tortilla integral", "Peito de frango", "Alface", "Tomate", "Requeijão light"], prepSteps: ["Espalhe requeijão na tortilla", "Adicione frango desfiado pronto, alface e tomate", "Enrole e sirva"], skill: "Mínimo" },
  { type: "Almoço", title: "Sanduíche natural de atum", description: "Prático e proteico", emoji: "🥪", calories: 380, ingredients: ["Pão integral", "Atum", "Milho", "Maionese light"], prepSteps: ["Misture atum com milho e maionese", "Monte o sanduíche"], skill: "Mínimo" },
  { type: "Almoço", title: "Bowl de grão-de-bico pronto", description: "Proteína vegetal prática", emoji: "🥗", calories: 400, ingredients: ["Grão-de-bico", "Tomate", "Pepino", "Azeite", "Limão"], prepSteps: ["Abra o grão-de-bico em conserva", "Misture com vegetais picados", "Tempere com azeite e limão"], skill: "Mínimo" },
  { type: "Almoço", title: "Salada completa com ovo cozido", description: "Leve e nutritiva", emoji: "🥗", calories: 350, ingredients: ["Alface", "Tomate", "Ovo cozido", "Cenoura", "Azeite"], prepSteps: ["Monte a salada com os ingredientes", "Tempere com azeite"], skill: "Mínimo" },
  // Básico
  { type: "Almoço", title: "Arroz com feijão e frango grelhado", description: "Clássico do almoço", emoji: "🍛", calories: 520, ingredients: ["Arroz", "Feijão", "Peito de frango", "Salada"], prepSteps: ["Cozinhe arroz e feijão", "Grelhe o frango", "Monte o prato"], skill: "Básico" },
  { type: "Almoço", title: "Macarrão integral com carne moída", description: "Do freezer pro micro", emoji: "🍝", calories: 500, ingredients: ["Macarrão integral", "Carne moída", "Molho de tomate", "Cebola"], prepSteps: ["Cozinhe o macarrão", "Refogue a carne com molho de tomate"], skill: "Básico" },
  { type: "Almoço", title: "Omelete de legumes com arroz", description: "Rápido e completo", emoji: "🍳", calories: 440, ingredients: ["Ovos", "Tomate", "Cebola", "Espinafre", "Arroz"], prepSteps: ["Bata os ovos com legumes picados", "Cozinhe na frigideira", "Sirva com arroz"], skill: "Básico" },
  { type: "Almoço", title: "Frango grelhado com batata-doce", description: "Trio energético", emoji: "🍗", calories: 520, ingredients: ["Peito de frango", "Batata-doce", "Espinafre", "Azeite"], prepSteps: ["Grelhe o frango", "Cozinhe a batata-doce", "Refogue espinafre"], skill: "Básico" },
  // Tranquilo
  { type: "Almoço", title: "Frango ao curry com arroz integral", description: "Especiarias energizantes", emoji: "🍛", calories: 510, ingredients: ["Peito de frango", "Arroz integral", "Curry", "Leite de coco", "Cenoura"], prepSteps: ["Cozinhe o arroz", "Refogue frango com curry e leite de coco", "Adicione cenoura"], skill: "Tranquilo" },
  { type: "Almoço", title: "Escondidinho de frango", description: "Comfort food fitness", emoji: "🍗", calories: 520, ingredients: ["Peito de frango", "Batata-doce", "Requeijão light", "Cebola"], prepSteps: ["Desfie o frango refogado", "Faça o purê de batata-doce", "Monte camadas e gratine no forno"], skill: "Tranquilo" },
  { type: "Almoço", title: "Bowl de quinoa com legumes assados", description: "Nutritivo e colorido", emoji: "🥗", calories: 450, ingredients: ["Quinoa", "Abobrinha", "Cenoura", "Tomate", "Azeite"], prepSteps: ["Cozinhe a quinoa", "Asse os legumes no forno", "Monte o bowl"], skill: "Tranquilo" },
  { type: "Almoço", title: "Yakisoba de frango com legumes", description: "Inspiração oriental", emoji: "🍜", calories: 490, ingredients: ["Macarrão integral", "Peito de frango", "Cenoura", "Repolho", "Molho shoyu"], prepSteps: ["Cozinhe o macarrão", "Salteie frango e legumes", "Misture com molho shoyu"], skill: "Tranquilo" },
  { type: "Almoço", title: "Strogonoff de frango light", description: "Cremoso sem culpa", emoji: "🍚", calories: 470, ingredients: ["Peito de frango", "Creme de leite light", "Arroz integral", "Cogumelos"], prepSteps: ["Refogue frango com cogumelos", "Adicione creme de leite", "Sirva com arroz"], skill: "Tranquilo" },

  // ═══ LANCHE DA TARDE ═══
  // Mínimo
  { type: "Lanche da Tarde", title: "Maçã com pasta de amendoim", description: "Doce e proteico", emoji: "🍎", calories: 200, ingredients: ["Maçã", "Pasta de amendoim"], prepSteps: ["Fatie a maçã", "Sirva com pasta de amendoim"], skill: "Mínimo" },
  { type: "Lanche da Tarde", title: "Iogurte com mel", description: "Doce e proteico", emoji: "🍯", calories: 160, ingredients: ["Iogurte natural", "Mel"], prepSteps: ["Sirva iogurte com fio de mel"], skill: "Mínimo" },
  { type: "Lanche da Tarde", title: "Torrada com abacate", description: "Gordura boa", emoji: "🥑", calories: 230, ingredients: ["Pão integral", "Abacate", "Sal", "Limão"], prepSteps: ["Amasse o abacate com sal e limão", "Espalhe na torrada"], skill: "Mínimo" },
  { type: "Lanche da Tarde", title: "Banana com aveia", description: "Saciedade rápida", emoji: "🍌", calories: 170, ingredients: ["Banana", "Aveia"], prepSteps: ["Amasse banana e misture aveia"], skill: "Mínimo" },
  // Básico
  { type: "Lanche da Tarde", title: "Smoothie de morango", description: "Refrescante", emoji: "🍓", calories: 180, ingredients: ["Morango", "Iogurte natural", "Mel"], prepSteps: ["Bata tudo no liquidificador"], skill: "Básico" },
  { type: "Lanche da Tarde", title: "Sanduíche de pasta de amendoim e banana", description: "Calórico e prático", emoji: "🥜", calories: 350, ingredients: ["Pão integral", "Pasta de amendoim", "Banana", "Mel"], prepSteps: ["Espalhe pasta de amendoim", "Fatie banana por cima", "Regue com mel"], skill: "Básico" },
  { type: "Lanche da Tarde", title: "Palitos de cenoura com homus", description: "Crocante e nutritivo", emoji: "🥕", calories: 150, ingredients: ["Cenoura", "Grão-de-bico", "Tahine", "Limão"], prepSteps: ["Corte cenoura em palitos", "Sirva com homus pronto"], skill: "Básico" },
  // Tranquilo
  { type: "Lanche da Tarde", title: "Pão de queijo fit", description: "Sem glúten e proteico", emoji: "🧀", calories: 180, ingredients: ["Polvilho", "Ovo", "Queijo", "Azeite"], prepSteps: ["Misture todos os ingredientes", "Modele bolinhas", "Asse por 20min"], skill: "Tranquilo" },
  { type: "Lanche da Tarde", title: "Mousse de abacate com cacau", description: "Sobremesa saudável", emoji: "🥑", calories: 200, ingredients: ["Abacate", "Cacau em pó", "Mel", "Leite"], prepSteps: ["Bata tudo no processador", "Leve à geladeira por 30min"], skill: "Tranquilo" },
  { type: "Lanche da Tarde", title: "Bolo integral de cenoura", description: "Docinho do dia", emoji: "🍰", calories: 200, ingredients: ["Cenoura", "Ovos", "Farinha integral", "Cacau"], prepSteps: ["Bata no liquidificador", "Despeje na forma", "Asse por 35 min"], skill: "Tranquilo" },

  // ═══ JANTAR ═══
  // Mínimo
  { type: "Jantar", title: "Sanduíche natural de atum", description: "Prático para a noite", emoji: "🥪", calories: 380, ingredients: ["Pão integral", "Atum", "Milho", "Maionese light"], prepSteps: ["Misture atum com milho e maionese", "Monte o sanduíche"], skill: "Mínimo" },
  { type: "Jantar", title: "Wrap de frango pronto com salada", description: "Monte e coma", emoji: "🌯", calories: 370, ingredients: ["Tortilla integral", "Peito de frango", "Alface", "Tomate"], prepSteps: ["Monte o wrap com frango pronto e vegetais"], skill: "Mínimo" },
  { type: "Jantar", title: "Salada completa com proteína", description: "Leve e nutritiva", emoji: "🥗", calories: 350, ingredients: ["Alface", "Tomate", "Ovo cozido", "Atum", "Azeite"], prepSteps: ["Monte a salada", "Adicione a proteína", "Tempere com azeite"], skill: "Mínimo" },
  // Básico
  { type: "Jantar", title: "Omelete de legumes", description: "Pronto em 10 min", emoji: "🍳", calories: 350, ingredients: ["Ovos", "Tomate", "Cebola", "Espinafre", "Queijo branco"], prepSteps: ["Bata os ovos", "Pique os legumes", "Refogue e despeje os ovos", "Adicione queijo e dobre"], skill: "Básico" },
  { type: "Jantar", title: "Tapioca de frango", description: "Leve e rápida", emoji: "🫓", calories: 340, ingredients: ["Goma de tapioca", "Peito de frango", "Queijo branco", "Tomate"], prepSteps: ["Hidrate a goma", "Faça a tapioca na frigideira", "Recheie com frango e queijo"], skill: "Básico" },
  { type: "Jantar", title: "Sopa instantânea turbinada", description: "Adicione proteína", emoji: "🥣", calories: 320, ingredients: ["Sopa instantânea", "Ovos", "Espinafre", "Cenoura"], prepSteps: ["Ferva a água", "Cozinhe a sopa", "Adicione ovo batido e espinafre"], skill: "Básico" },
  // Tranquilo
  { type: "Jantar", title: "Sopa de lentilha com legumes", description: "Ferro e fibras", emoji: "🥣", calories: 320, ingredients: ["Lentilha", "Cenoura", "Batata", "Cebola", "Alho"], prepSteps: ["Refogue cebola e alho", "Adicione lentilha e legumes", "Cozinhe até amaciar"], skill: "Tranquilo" },
  { type: "Jantar", title: "Pizza integral de frango com rúcula", description: "Pizza sem culpa", emoji: "🍕", calories: 400, ingredients: ["Massa integral", "Peito de frango", "Rúcula", "Tomate", "Queijo branco"], prepSteps: ["Monte a pizza com os ingredientes", "Asse por 15min", "Adicione rúcula fresca"], skill: "Tranquilo" },
  { type: "Jantar", title: "Frango desfiado com purê de abóbora", description: "Comfort food light", emoji: "🎃", calories: 350, ingredients: ["Peito de frango", "Abóbora", "Cebola", "Alho", "Azeite"], prepSteps: ["Cozinhe e desfie o frango", "Cozinhe e amasse a abóbora", "Sirva juntos"], skill: "Tranquilo" },
  { type: "Jantar", title: "Risoto de frango com legumes", description: "Carboidrato de reposição", emoji: "🍚", calories: 500, ingredients: ["Arroz arbóreo", "Peito de frango", "Cenoura", "Ervilha", "Caldo de legumes"], prepSteps: ["Refogue o arroz", "Adicione caldo aos poucos", "Misture frango e legumes"], skill: "Tranquilo" },
];

// ─── RECEITAS EXTRAS PARA GANHAR MASSA (alta caloria) ───
const massaExtras: Meal[] = [
  { type: "Café da Manhã", title: "Shake de whey com banana e aveia", description: "Pré-treino calórico", emoji: "🥤", calories: 380, ingredients: ["Whey protein", "Banana", "Aveia", "Leite integral"], prepSteps: ["Bata tudo no liquidificador"], skill: "Mínimo" },
  { type: "Café da Manhã", title: "Ovos mexidos com aveia e banana", description: "Proteína + carb", emoji: "🍳", calories: 450, ingredients: ["Ovos", "Aveia", "Banana", "Manteiga"], prepSteps: ["Mexa 4 ovos na manteiga", "Prepare aveia com banana fatiada"], skill: "Básico" },
  { type: "Café da Manhã", title: "Panqueca proteica de aveia", description: "Alto em proteína", emoji: "🥞", calories: 420, ingredients: ["Ovos", "Aveia", "Banana", "Whey protein"], prepSteps: ["Bata tudo", "Faça panquecas na frigideira"], skill: "Tranquilo" },
  { type: "Lanche da Manhã", title: "Banana com whey e pasta de amendoim", description: "Tríade do ganho", emoji: "🍌", calories: 400, ingredients: ["Banana", "Whey protein", "Pasta de amendoim"], prepSteps: ["Amasse a banana", "Misture com whey e pasta de amendoim"], skill: "Mínimo" },
  { type: "Almoço", title: "Arroz, feijão, frango e batata-doce", description: "Prato clássico de massa", emoji: "🍛", calories: 720, ingredients: ["Arroz", "Feijão", "Peito de frango", "Batata-doce", "Azeite"], prepSteps: ["Cozinhe arroz e feijão", "Grelhe o frango", "Asse batata-doce"], skill: "Básico" },
  { type: "Almoço", title: "Carne vermelha com arroz e ovo", description: "Máximo ferro e proteína", emoji: "🥩", calories: 780, ingredients: ["Carne moída", "Arroz", "Feijão", "Ovos", "Salada"], prepSteps: ["Grelhe a carne", "Cozinhe arroz e feijão", "Frite o ovo"], skill: "Básico" },
  { type: "Lanche da Tarde", title: "Batata-doce com frango desfiado", description: "Refeição sólida", emoji: "🍠", calories: 400, ingredients: ["Batata-doce", "Peito de frango", "Azeite"], prepSteps: ["Cozinhe a batata-doce", "Use frango desfiado pronto", "Monte o prato"], skill: "Básico" },
  { type: "Lanche da Tarde", title: "Shake calórico de abacate", description: "Gordura boa + proteína", emoji: "🥑", calories: 450, ingredients: ["Abacate", "Whey protein", "Leite integral", "Mel"], prepSteps: ["Bata tudo no liquidificador"], skill: "Básico" },
  { type: "Jantar", title: "Macarrão com carne moída e queijo", description: "Carb de recuperação", emoji: "🍝", calories: 650, ingredients: ["Macarrão integral", "Carne moída", "Molho de tomate", "Queijo parmesão"], prepSteps: ["Cozinhe o macarrão", "Refogue a carne com molho", "Finalize com queijo"], skill: "Básico" },
  { type: "Jantar", title: "Frango ao forno com purê de batata", description: "Recuperação de legs day", emoji: "🍗", calories: 620, ingredients: ["Coxa de frango", "Batata", "Leite", "Manteiga"], prepSteps: ["Tempere e asse o frango", "Cozinhe e amasse as batatas com leite e manteiga"], skill: "Tranquilo" },
];

const allRecipes = [...recipePool, ...massaExtras];

// ─── CLASSIFICAÇÃO DE INGREDIENTES POR DIETA ───
const ANIMAL_PROTEIN = new Set([
  "Peito de frango", "Coxa de frango", "Carne moída", "Atum", "Salmão", "Filé de tilápia",
]);
const ANIMAL_DERIVED = new Set([
  "Ovos", "Ovo", "Ovo cozido", "Claras de ovo", "Whey protein",
  "Iogurte natural", "Iogurte grego", "Cottage", "Queijo branco", "Queijo",
  "Queijo parmesão", "Leite", "Leite integral", "Creme de leite light",
  "Requeijão light", "Mel", "Manteiga", "Maionese light",
]);

function recipeMatchesDiet(meal: Meal, diet: DietType): boolean {
  if (diet === "Onívoro") return true;
  const hasAnimalProtein = meal.ingredients.some((i) => ANIMAL_PROTEIN.has(i));
  if (hasAnimalProtein) return false;
  if (diet === "Vegetariano") return true;
  // Vegano: também sem derivados animais
  return !meal.ingredients.some((i) => ANIMAL_DERIVED.has(i));
}

// ─── RECEITAS VEG / VEGANAS COMPLEMENTARES ───
const vegRecipes: Meal[] = [
  { type: "Café da Manhã", title: "Tapioca com pasta de amendoim e banana", description: "Vegano e energético", emoji: "🫓", calories: 320, ingredients: ["Goma de tapioca", "Pasta de amendoim", "Banana"], prepSteps: ["Faça a tapioca na frigideira", "Recheie com pasta de amendoim e banana"], skill: "Básico", diets: ["Vegano", "Vegetariano"] },
  { type: "Café da Manhã", title: "Vitamina vegana de aveia", description: "Sem leite animal", emoji: "🥤", calories: 290, ingredients: ["Aveia", "Banana", "Pasta de amendoim", "Leite de coco"], prepSteps: ["Bata tudo no liquidificador"], skill: "Mínimo", diets: ["Vegano", "Vegetariano"] },
  { type: "Lanche da Manhã", title: "Hummus com cenoura", description: "Proteína vegetal", emoji: "🥕", calories: 180, ingredients: ["Grão-de-bico", "Tahine", "Limão", "Cenoura"], prepSteps: ["Bata grão-de-bico com tahine e limão", "Sirva com palitos de cenoura"], skill: "Básico", diets: ["Vegano", "Vegetariano"] },
  { type: "Almoço", title: "Bowl de lentilha com legumes", description: "Rico em ferro vegetal", emoji: "🥗", calories: 470, ingredients: ["Lentilha", "Arroz integral", "Cenoura", "Espinafre", "Azeite"], prepSteps: ["Cozinhe a lentilha", "Cozinhe o arroz", "Refogue os legumes", "Monte o bowl"], skill: "Básico", diets: ["Vegano", "Vegetariano"] },
  { type: "Almoço", title: "Curry de grão-de-bico", description: "Proteína vegetal cremosa", emoji: "🍛", calories: 510, ingredients: ["Grão-de-bico", "Arroz integral", "Leite de coco", "Curry", "Cebola", "Alho"], prepSteps: ["Refogue cebola e alho", "Adicione grão-de-bico, leite de coco e curry", "Sirva com arroz"], skill: "Tranquilo", diets: ["Vegano", "Vegetariano"] },
  { type: "Almoço", title: "Macarrão integral ao sugo com lentilha", description: "Bolonhesa vegetal", emoji: "🍝", calories: 490, ingredients: ["Macarrão integral", "Lentilha", "Molho de tomate", "Cebola", "Alho"], prepSteps: ["Cozinhe a lentilha", "Refogue cebola e alho com molho de tomate e lentilha", "Sirva sobre o macarrão"], skill: "Básico", diets: ["Vegano", "Vegetariano"] },
  { type: "Lanche da Tarde", title: "Mix de castanhas e frutas secas", description: "Energia 100% vegetal", emoji: "🥜", calories: 200, ingredients: ["Castanha de caju", "Castanha-do-pará", "Uva"], prepSteps: ["Combine 30g do mix"], skill: "Mínimo", diets: ["Vegano", "Vegetariano"] },
  { type: "Jantar", title: "Sopa de feijão com legumes", description: "Reconfortante e proteica", emoji: "🥣", calories: 380, ingredients: ["Feijão", "Cenoura", "Batata", "Cebola", "Alho", "Azeite"], prepSteps: ["Refogue cebola e alho", "Adicione feijão e legumes", "Cozinhe até amaciar"], skill: "Básico", diets: ["Vegano", "Vegetariano"] },
  { type: "Jantar", title: "Wrap de homus e vegetais", description: "Leve e vegano", emoji: "🌯", calories: 360, ingredients: ["Tortilla integral", "Grão-de-bico", "Tahine", "Alface", "Tomate", "Cenoura"], prepSteps: ["Faça homus rápido", "Espalhe na tortilla com vegetais e enrole"], skill: "Mínimo", diets: ["Vegano", "Vegetariano"] },
  { type: "Jantar", title: "Tofu grelhado com legumes", description: "Proteína vegetal completa", emoji: "🥗", calories: 410, ingredients: ["Tofu", "Arroz integral", "Brócolis", "Molho shoyu", "Azeite"], prepSteps: ["Tempere e grelhe o tofu", "Cozinhe arroz", "Refogue brócolis", "Monte o prato"], skill: "Tranquilo", diets: ["Vegano", "Vegetariano"] },
];
allRecipes.push(...vegRecipes);

const dayNames = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"];
const shortDayNames = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
const mealTypes: MealType[] = ["Café da Manhã", "Lanche da Manhã", "Almoço", "Lanche da Tarde", "Jantar"];

const massaTrainingNotes = [
  "🏋️ Push (Peito/Ombro/Tríceps)",
  "🏋️ Pull (Costas/Bíceps)",
  "🦵 Legs (Pernas/Glúteos)",
  "💪 Upper (Parte Superior)",
  "🦵 Lower (Parte Inferior)",
  "🏃 Cardio + Abdômen",
  "😴 Descanso ativo",
];

function getRecipesForSlot(type: MealType, goal: string, skill: CookingSkill, diet: DietType = "Onívoro"): Meal[] {
  const skillOrder: CookingSkill[] = ["Mínimo", "Básico", "Tranquilo"];
  const maxIndex = skillOrder.indexOf(skill);
  const allowedSkills = skillOrder.slice(0, maxIndex + 1);

  let pool = allRecipes.filter(
    (r) => r.type === type && allowedSkills.includes(r.skill) && recipeMatchesDiet(r, diet)
  );

  // For "Ganhar massa", prefer higher calorie options
  if (goal === "Ganhar massa") {
    const highCal = pool.filter((r) => r.calories >= 350);
    if (highCal.length >= 2) pool = highCal;
  }
  // For "Economizar tempo", prefer simpler recipes
  if (goal === "Economizar tempo") {
    const simple = pool.filter((r) => r.skill === "Mínimo" || r.skill === "Básico");
    if (simple.length >= 2) pool = simple;
  }

  return pool;
}

export function getMenuForProfile(goal: string, skill: CookingSkill, diet: DietType = "Onívoro"): DayPlan[] {
  const plans: DayPlan[] = [];

  for (let d = 0; d < 7; d++) {
    const meals: Meal[] = [];
    const usedTitles = new Set<string>();

    for (const type of mealTypes) {
      const candidates = getRecipesForSlot(type, goal, skill, diet);
      // Pick a recipe not yet used this day
      let pick = candidates.find((c) => !usedTitles.has(c.title));
      if (!pick) pick = candidates[d % candidates.length];
      if (!pick) {
        // fallback: any recipe of this type
        pick = allRecipes.find((r) => r.type === type && recipeMatchesDiet(r, diet)) ||
               allRecipes.find((r) => r.type === type) ||
               allRecipes[0];
      }
      usedTitles.add(pick.title);
      meals.push(pick);
    }

    plans.push({
      day: dayNames[d],
      shortDay: shortDayNames[d],
      trainingNote: goal === "Ganhar massa" ? massaTrainingNotes[d] : undefined,
      meals,
    });
  }

  // Vary meals across days by rotating candidates
  for (let d = 1; d < 7; d++) {
    for (let m = 0; m < mealTypes.length; m++) {
      const type = mealTypes[m];
      const candidates = getRecipesForSlot(type, goal, skill, diet);
      if (candidates.length > 1) {
        const idx = (d + m) % candidates.length;
        plans[d].meals[m] = candidates[idx];
      }
    }
  }

  return plans;
}

export function getSubstitution(type: MealType, currentTitle: string, skill: CookingSkill, diet: DietType = "Onívoro"): Meal | null {
  const skillOrder: CookingSkill[] = ["Mínimo", "Básico", "Tranquilo"];
  const maxIndex = skillOrder.indexOf(skill);
  const allowedSkills = skillOrder.slice(0, maxIndex + 1);

  const candidates = allRecipes.filter(
    (r) => r.type === type && allowedSkills.includes(r.skill) && r.title !== currentTitle && recipeMatchesDiet(r, diet)
  );
  if (candidates.length === 0) return null;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

export function getSubstitutionOptions(
  type: MealType,
  currentTitle: string,
  skill: CookingSkill,
  goal: string,
  count = 4,
  diet: DietType = "Onívoro"
): Meal[] {
  const skillOrder: CookingSkill[] = ["Mínimo", "Básico", "Tranquilo"];
  const maxIndex = skillOrder.indexOf(skill);
  const allowedSkills = skillOrder.slice(0, maxIndex + 1);

  let candidates = allRecipes.filter(
    (r) => r.type === type && allowedSkills.includes(r.skill) && r.title !== currentTitle && recipeMatchesDiet(r, diet)
  );
  if (goal === "Ganhar massa") {
    const high = candidates.filter((c) => c.calories >= 350);
    if (high.length >= count) candidates = high;
  }
  // Shuffle
  const shuffled = [...candidates].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// ─── MAPA DE QUANTIDADES PADRÃO POR INGREDIENTE (por porção) ───
// Usado pela Lista de Compras para somar quantidades reais.
export interface IngredientQuantity {
  amount: number;
  unit: string;
}

const defaultQuantities: Record<string, IngredientQuantity> = {
  // Proteínas
  "Ovos": { amount: 2, unit: "un" },
  "Claras de ovo": { amount: 3, unit: "un" },
  "Ovo cozido": { amount: 1, unit: "un" },
  "Ovo": { amount: 1, unit: "un" },
  "Peito de frango": { amount: 150, unit: "g" },
  "Coxa de frango": { amount: 200, unit: "g" },
  "Carne moída": { amount: 150, unit: "g" },
  "Atum": { amount: 1, unit: "lata" },
  "Whey protein": { amount: 30, unit: "g" },
  "Iogurte natural": { amount: 170, unit: "g" },
  "Iogurte grego": { amount: 150, unit: "g" },
  "Cottage": { amount: 50, unit: "g" },
  "Queijo branco": { amount: 30, unit: "g" },
  "Queijo parmesão": { amount: 20, unit: "g" },
  "Queijo": { amount: 30, unit: "g" },
  "Leite": { amount: 200, unit: "ml" },
  "Leite integral": { amount: 200, unit: "ml" },
  "Creme de leite light": { amount: 50, unit: "ml" },
  "Requeijão light": { amount: 20, unit: "g" },
  // Hortifruti
  "Banana": { amount: 1, unit: "un" },
  "Maçã": { amount: 1, unit: "un" },
  "Mamão": { amount: 100, unit: "g" },
  "Manga": { amount: 100, unit: "g" },
  "Morango": { amount: 80, unit: "g" },
  "Mirtilo": { amount: 50, unit: "g" },
  "Uva": { amount: 80, unit: "g" },
  "Limão": { amount: 1, unit: "un" },
  "Abacate": { amount: 0.5, unit: "un" },
  "Tomate": { amount: 1, unit: "un" },
  "Cebola": { amount: 0.5, unit: "un" },
  "Alho": { amount: 1, unit: "dente" },
  "Cenoura": { amount: 1, unit: "un" },
  "Batata-doce": { amount: 150, unit: "g" },
  "Batata": { amount: 150, unit: "g" },
  "Abóbora": { amount: 150, unit: "g" },
  "Abobrinha": { amount: 100, unit: "g" },
  "Espinafre": { amount: 50, unit: "g" },
  "Alface": { amount: 50, unit: "g" },
  "Rúcula": { amount: 30, unit: "g" },
  "Repolho": { amount: 80, unit: "g" },
  "Pepino": { amount: 0.5, unit: "un" },
  "Salada": { amount: 100, unit: "g" },
  "Cogumelos": { amount: 80, unit: "g" },
  "Ervilha": { amount: 50, unit: "g" },
  "Milho": { amount: 50, unit: "g" },
  // Grãos / Mercearia
  "Arroz": { amount: 80, unit: "g" },
  "Arroz integral": { amount: 80, unit: "g" },
  "Arroz arbóreo": { amount: 80, unit: "g" },
  "Feijão": { amount: 80, unit: "g" },
  "Lentilha": { amount: 80, unit: "g" },
  "Grão-de-bico": { amount: 80, unit: "g" },
  "Quinoa": { amount: 60, unit: "g" },
  "Aveia": { amount: 40, unit: "g" },
  "Granola": { amount: 30, unit: "g" },
  "Macarrão integral": { amount: 80, unit: "g" },
  "Massa integral": { amount: 80, unit: "g" },
  "Pão integral": { amount: 2, unit: "fatias" },
  "Tortilla integral": { amount: 1, unit: "un" },
  "Goma de tapioca": { amount: 40, unit: "g" },
  "Polvilho": { amount: 50, unit: "g" },
  "Farinha integral": { amount: 50, unit: "g" },
  "Biscoito de arroz": { amount: 3, unit: "un" },
  "Pasta de amendoim": { amount: 15, unit: "g" },
  "Tahine": { amount: 10, unit: "g" },
  "Mel": { amount: 10, unit: "g" },
  "Azeite": { amount: 10, unit: "ml" },
  "Manteiga": { amount: 10, unit: "g" },
  "Leite de coco": { amount: 50, unit: "ml" },
  "Castanha de caju": { amount: 15, unit: "g" },
  "Castanha-do-pará": { amount: 10, unit: "g" },
  "Nozes": { amount: 10, unit: "g" },
  "Amendoim": { amount: 15, unit: "g" },
  "Castanhas": { amount: 20, unit: "g" },
  "Polpa de açaí": { amount: 100, unit: "g" },
  "Cacau em pó": { amount: 5, unit: "g" },
  "Cacau": { amount: 5, unit: "g" },
  "Molho de tomate": { amount: 50, unit: "ml" },
  "Molho shoyu": { amount: 10, unit: "ml" },
  "Maionese light": { amount: 10, unit: "g" },
  "Caldo de legumes": { amount: 200, unit: "ml" },
  "Sopa instantânea": { amount: 1, unit: "un" },
  // Temperos
  "Curry": { amount: 1, unit: "pitada" },
  "Canela": { amount: 1, unit: "pitada" },
  "Sal": { amount: 1, unit: "pitada" },
};

export function getQuantityForIngredient(name: string): IngredientQuantity {
  return defaultQuantities[name] || { amount: 1, unit: "porção" };
}

export function formatQuantity(amount: number, unit: string): string {
  // round nice
  if (unit === "g" || unit === "ml") {
    if (amount >= 1000) return `${(amount / 1000).toFixed(amount % 1000 === 0 ? 0 : 1)} ${unit === "g" ? "kg" : "L"}`;
    return `${Math.round(amount)} ${unit}`;
  }
  const rounded = Math.round(amount * 10) / 10;
  return `${rounded % 1 === 0 ? rounded.toFixed(0) : rounded.toFixed(1)} ${unit}`;
}

// Legacy exports for compatibility
export const substitutionPool: Record<MealType, Meal[]> = {
  "Café da Manhã": allRecipes.filter((r) => r.type === "Café da Manhã"),
  "Lanche da Manhã": allRecipes.filter((r) => r.type === "Lanche da Manhã"),
  "Almoço": allRecipes.filter((r) => r.type === "Almoço"),
  "Lanche da Tarde": allRecipes.filter((r) => r.type === "Lanche da Tarde"),
  "Jantar": allRecipes.filter((r) => r.type === "Jantar"),
};

export const menusByGoal = {
  "Economizar tempo": getMenuForProfile("Economizar tempo", "Básico"),
  "Mais energia": getMenuForProfile("Mais energia", "Básico"),
  "Ganhar massa": getMenuForProfile("Ganhar massa", "Básico"),
};

export const weekPlan = menusByGoal["Mais energia"];

export const tips: Tip[] = [
  { id: "t1", title: "Snacks que não estragam na mochila", summary: "Castanhas, barrinhas de cereal, frutas secas e biscoitos integrais são opções práticas que sobrevivem horas na mochila sem refrigeração.", emoji: "🎒", tag: "Praticidade" },
  { id: "t2", title: "Opções baratas na cantina", summary: "Prefira o PF ao invés de lanches processados. Sopas, saladas e sucos naturais são mais baratos e nutritivos.", emoji: "🏫", tag: "Economia" },
  { id: "t3", title: "Como evitar sono nas aulas", summary: "Evite refeições pesadas antes da aula. Prefira lanches leves com proteína. Beba água constantemente. Café? Só até 14h!", emoji: "😴", tag: "Foco" },
  { id: "t4", title: "Esqueceu a marmita?", summary: "Compre um iogurte proteico + banana na cantina. Ou um PF simples com bastante salada. Evite salgados fritos!", emoji: "🆘", tag: "Plano B" },
  { id: "t5", title: "Hidratação salva o foco", summary: "Leve sempre uma garrafa de água. A desidratação reduz em até 25% sua capacidade cognitiva. Beba pelo menos 2L/dia.", emoji: "💧", tag: "Saúde" },
  { id: "t6", title: "Substituições rápidas de emergência", summary: "Sem frango? Use ovo. Sem arroz? Use batata ou macarrão. Sem salada? Coma uma fruta. O importante é manter a estrutura proteína + carb + fibra.", emoji: "🔄", tag: "Plano B" },
  { id: "t7", title: "Não pule o café da manhã!", summary: "Mesmo atrasado, leve um overnight oats ou barra de cereal. Pular o café reduz a concentração em até 30%.", emoji: "☀️", tag: "Foco" },
  { id: "t8", title: "Congelando marmitas certas", summary: "Arroz, feijão e frango grelhado congelam bem por até 3 meses. Evite congelar saladas e ovos cozidos inteiros.", emoji: "❄️", tag: "Praticidade" },
];
