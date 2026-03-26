export type MealType = "Café da Manhã" | "Lanche da Manhã" | "Almoço" | "Lanche da Tarde" | "Jantar";

export interface Meal {
  type: MealType;
  title: string;
  description: string;
  emoji: string;
  calories: number;
  ingredients: string[];
  prepSteps: string[];
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

// ─── CARDÁPIO: ECONOMIZAR TEMPO ───
const menuEconomizarTempo: DayPlan[] = [
  {
    day: "Segunda-feira", shortDay: "Seg",
    meals: [
      { type: "Café da Manhã", title: "Overnight oats de banana", description: "Prepare na noite anterior", emoji: "🥣", calories: 280, ingredients: ["Aveia", "Leite", "Banana", "Mel"], prepSteps: ["Misture aveia, leite e mel no pote", "Cubra com fatias de banana", "Leve à geladeira por 8h"] },
      { type: "Lanche da Manhã", title: "Banana com canela", description: "Pronto em 1 minuto", emoji: "🍌", calories: 120, ingredients: ["Banana", "Canela"], prepSteps: ["Descasque a banana", "Polvilhe canela"] },
      { type: "Almoço", title: "Wrap integral de frango", description: "Monte em 5 min com sobras", emoji: "🌯", calories: 420, ingredients: ["Tortilla integral", "Peito de frango", "Alface", "Tomate", "Requeijão light"], prepSteps: ["Aqueça a tortilla", "Espalhe requeijão", "Adicione frango desfiado, alface e tomate", "Enrole e sirva"] },
      { type: "Lanche da Tarde", title: "Mix de castanhas", description: "Energia rápida", emoji: "🥜", calories: 180, ingredients: ["Castanha de caju", "Castanha-do-pará", "Amendoim"], prepSteps: ["Separe 30g do mix"] },
      { type: "Jantar", title: "Omelete de legumes", description: "Pronto em 10 minutos", emoji: "🍳", calories: 350, ingredients: ["Ovos", "Tomate", "Cebola", "Espinafre", "Queijo branco"], prepSteps: ["Bata os ovos", "Pique os legumes", "Refogue e despeje os ovos", "Adicione queijo e dobre"] },
    ],
  },
  {
    day: "Terça-feira", shortDay: "Ter",
    meals: [
      { type: "Café da Manhã", title: "Torrada com cottage e mel", description: "Simples e nutritivo", emoji: "🍞", calories: 250, ingredients: ["Pão integral", "Cottage", "Mel"], prepSteps: ["Torre o pão", "Espalhe cottage", "Regue com mel"] },
      { type: "Lanche da Manhã", title: "Iogurte com granola", description: "Probióticos e fibras", emoji: "🥛", calories: 200, ingredients: ["Iogurte natural", "Granola"], prepSteps: ["Coloque iogurte no copo", "Cubra com granola"] },
      { type: "Almoço", title: "Arroz integral com frango e brócolis", description: "Clássico do meal prep", emoji: "🍗", calories: 480, ingredients: ["Arroz integral", "Peito de frango", "Brócolis", "Azeite"], prepSteps: ["Aqueça a marmita do meal prep"] },
      { type: "Lanche da Tarde", title: "Maçã com pasta de amendoim", description: "Doce e proteico", emoji: "🍎", calories: 200, ingredients: ["Maçã", "Pasta de amendoim"], prepSteps: ["Fatie a maçã", "Sirva com pasta de amendoim"] },
      { type: "Jantar", title: "Sopa instantânea turbinada", description: "Adicione proteína e legumes", emoji: "🥣", calories: 320, ingredients: ["Sopa instantânea", "Ovos", "Espinafre", "Cenoura"], prepSteps: ["Ferva a água", "Cozinhe a sopa", "Adicione ovo batido e espinafre"] },
    ],
  },
  {
    day: "Quarta-feira", shortDay: "Qua",
    meals: [
      { type: "Café da Manhã", title: "Smoothie verde express", description: "Bata e leve na garrafa", emoji: "🥤", calories: 220, ingredients: ["Banana", "Espinafre", "Leite", "Aveia"], prepSteps: ["Bata tudo no liquidificador", "Sirva na garrafa térmica"] },
      { type: "Lanche da Manhã", title: "Barra de cereal caseira", description: "Feita no meal prep", emoji: "🍫", calories: 150, ingredients: ["Aveia", "Mel", "Castanhas", "Uva-passa"], prepSteps: ["Retire do pote do meal prep"] },
      { type: "Almoço", title: "Macarrão integral com molho de carne", description: "Do freezer para o micro-ondas", emoji: "🍝", calories: 500, ingredients: ["Macarrão integral", "Carne moída", "Molho de tomate", "Cebola", "Alho"], prepSteps: ["Aqueça a marmita do meal prep"] },
      { type: "Lanche da Tarde", title: "Torrada com abacate", description: "Gordura boa", emoji: "🥑", calories: 230, ingredients: ["Pão integral", "Abacate", "Sal", "Limão"], prepSteps: ["Torre o pão", "Amasse o abacate com sal e limão", "Espalhe na torrada"] },
      { type: "Jantar", title: "Tapioca de frango", description: "Leve e rápida", emoji: "🫓", calories: 340, ingredients: ["Goma de tapioca", "Peito de frango", "Queijo branco", "Tomate"], prepSteps: ["Hidrate a goma", "Faça a tapioca na frigideira", "Recheie com frango e queijo"] },
    ],
  },
  {
    day: "Quinta-feira", shortDay: "Qui",
    meals: [
      { type: "Café da Manhã", title: "Pão integral com ovo mexido", description: "Proteína logo cedo", emoji: "🍳", calories: 300, ingredients: ["Pão integral", "Ovos", "Manteiga"], prepSteps: ["Mexa os ovos na frigideira", "Sirva sobre o pão torrado"] },
      { type: "Lanche da Manhã", title: "Frutas picadas", description: "Vitaminas frescas", emoji: "🍇", calories: 100, ingredients: ["Morango", "Manga", "Uva"], prepSteps: ["Lave e pique as frutas"] },
      { type: "Almoço", title: "Bowl de grão-de-bico", description: "Proteína vegetal prática", emoji: "🥗", calories: 440, ingredients: ["Grão-de-bico", "Tomate", "Pepino", "Azeite", "Limão"], prepSteps: ["Misture grão-de-bico cozido com vegetais", "Tempere com azeite e limão"] },
      { type: "Lanche da Tarde", title: "Iogurte com mel", description: "Doce e proteico", emoji: "🍯", calories: 160, ingredients: ["Iogurte natural", "Mel"], prepSteps: ["Sirva iogurte com fio de mel"] },
      { type: "Jantar", title: "Sanduíche natural de atum", description: "Prático para a noite", emoji: "🥪", calories: 380, ingredients: ["Pão integral", "Atum", "Milho", "Maionese light"], prepSteps: ["Misture atum com milho e maionese", "Monte o sanduíche"] },
    ],
  },
  {
    day: "Sexta-feira", shortDay: "Sex",
    meals: [
      { type: "Café da Manhã", title: "Vitamina de mamão", description: "Digestão e energia", emoji: "🥤", calories: 250, ingredients: ["Mamão", "Leite", "Aveia", "Mel"], prepSteps: ["Bata tudo no liquidificador"] },
      { type: "Lanche da Manhã", title: "Biscoito de arroz com cottage", description: "Crocante e leve", emoji: "🍘", calories: 130, ingredients: ["Biscoito de arroz", "Cottage"], prepSteps: ["Espalhe cottage sobre os biscoitos"] },
      { type: "Almoço", title: "Strogonoff de frango light", description: "Do meal prep", emoji: "🍚", calories: 470, ingredients: ["Peito de frango", "Creme de leite light", "Arroz integral", "Milho"], prepSteps: ["Aqueça a marmita do meal prep"] },
      { type: "Lanche da Tarde", title: "Banana com aveia", description: "Saciedade rápida", emoji: "🍌", calories: 170, ingredients: ["Banana", "Aveia"], prepSteps: ["Amasse banana e misture aveia"] },
      { type: "Jantar", title: "Crepioca com queijo e tomate", description: "Leve e sem glúten", emoji: "🫓", calories: 300, ingredients: ["Ovos", "Goma de tapioca", "Queijo branco", "Tomate"], prepSteps: ["Misture ovo com goma", "Faça na frigideira", "Recheie"] },
    ],
  },
  {
    day: "Sábado", shortDay: "Sáb",
    meals: [
      { type: "Café da Manhã", title: "Panqueca de banana fit", description: "Sem farinha!", emoji: "🥞", calories: 280, ingredients: ["Banana", "Ovos", "Canela"], prepSteps: ["Amasse a banana", "Misture com ovos e canela", "Faça na frigideira"] },
      { type: "Lanche da Manhã", title: "Mix de frutas secas", description: "Energia concentrada", emoji: "🫐", calories: 150, ingredients: ["Uva-passa", "Damasco", "Cranberry"], prepSteps: ["Separe uma porção de 30g"] },
      { type: "Almoço", title: "Arroz com feijão e frango", description: "Básico bem feito", emoji: "🍛", calories: 520, ingredients: ["Arroz", "Feijão", "Peito de frango", "Salada"], prepSteps: ["Cozinhe arroz e feijão", "Grelhe o frango", "Monte o prato"] },
      { type: "Lanche da Tarde", title: "Smoothie de morango", description: "Refrescante", emoji: "🍓", calories: 180, ingredients: ["Morango", "Iogurte natural", "Mel"], prepSteps: ["Bata tudo no liquidificador"] },
      { type: "Jantar", title: "Salada completa com ovo", description: "Leve para o fim de semana", emoji: "🥗", calories: 350, ingredients: ["Alface", "Tomate", "Ovo cozido", "Cenoura", "Azeite"], prepSteps: ["Monte a salada", "Cozinhe o ovo", "Tempere com azeite"] },
    ],
  },
  {
    day: "Domingo", shortDay: "Dom",
    meals: [
      { type: "Café da Manhã", title: "Açaí com granola", description: "Energia do domingo", emoji: "🫐", calories: 350, ingredients: ["Polpa de açaí", "Granola", "Banana"], prepSteps: ["Bata o açaí", "Cubra com granola e banana"] },
      { type: "Lanche da Manhã", title: "Torrada com geleia", description: "Simples e gostoso", emoji: "🍞", calories: 160, ingredients: ["Pão integral", "Geleia de frutas"], prepSteps: ["Torre o pão", "Passe a geleia"] },
      { type: "Almoço", title: "Feijoada light", description: "Tradição com menos gordura", emoji: "🫘", calories: 480, ingredients: ["Feijão preto", "Linguiça de frango", "Couve", "Arroz", "Laranja"], prepSteps: ["Cozinhe o feijão com linguiça", "Refogue a couve", "Sirva com arroz e laranja"] },
      { type: "Lanche da Tarde", title: "Bolo integral de cenoura", description: "Docinho do dia", emoji: "🍰", calories: 200, ingredients: ["Cenoura", "Ovos", "Farinha integral", "Cacau"], prepSteps: ["Bata no liquidificador", "Asse por 35 min"] },
      { type: "Jantar", title: "Sopa de legumes", description: "Conforto para fechar a semana", emoji: "🥣", calories: 280, ingredients: ["Batata", "Cenoura", "Abobrinha", "Cebola", "Alho"], prepSteps: ["Pique todos os legumes", "Cozinhe na panela de pressão", "Bata se preferir creme"] },
    ],
  },
];

// ─── CARDÁPIO: MAIS ENERGIA ───
const menuMaisEnergia: DayPlan[] = [
  {
    day: "Segunda-feira", shortDay: "Seg",
    meals: [
      { type: "Café da Manhã", title: "Mingau de aveia com frutas vermelhas", description: "Carboidratos complexos para começar", emoji: "🥣", calories: 320, ingredients: ["Aveia", "Leite", "Morango", "Mirtilo", "Mel"], prepSteps: ["Cozinhe aveia com leite", "Cubra com frutas e mel"] },
      { type: "Lanche da Manhã", title: "Vitamina energética", description: "Boost de energia natural", emoji: "🥤", calories: 250, ingredients: ["Banana", "Aveia", "Pasta de amendoim", "Leite"], prepSteps: ["Bata tudo no liquidificador"] },
      { type: "Almoço", title: "Frango grelhado com batata-doce e espinafre", description: "Trio energético perfeito", emoji: "🍗", calories: 520, ingredients: ["Peito de frango", "Batata-doce", "Espinafre", "Azeite"], prepSteps: ["Grelhe o frango", "Asse a batata-doce", "Refogue o espinafre"] },
      { type: "Lanche da Tarde", title: "Tâmaras com castanhas", description: "Energia concentrada natural", emoji: "🌴", calories: 200, ingredients: ["Tâmaras", "Castanha de caju"], prepSteps: ["Combine 3 tâmaras com castanhas"] },
      { type: "Jantar", title: "Salmão com quinoa e brócolis", description: "Ômega 3 e ferro", emoji: "🐟", calories: 480, ingredients: ["Salmão", "Quinoa", "Brócolis", "Limão"], prepSteps: ["Cozinhe a quinoa", "Asse o salmão com limão", "Cozinhe o brócolis no vapor"] },
    ],
  },
  {
    day: "Terça-feira", shortDay: "Ter",
    meals: [
      { type: "Café da Manhã", title: "Ovos mexidos com abacate", description: "Gorduras boas e proteína", emoji: "🥑", calories: 350, ingredients: ["Ovos", "Abacate", "Pão integral", "Tomate"], prepSteps: ["Mexa os ovos", "Fatie o abacate", "Monte sobre o pão"] },
      { type: "Lanche da Manhã", title: "Banana com chocolate 70%", description: "Energia e antioxidantes", emoji: "🍌", calories: 180, ingredients: ["Banana", "Chocolate 70%"], prepSteps: ["Quebre o chocolate sobre a banana"] },
      { type: "Almoço", title: "Bowl de lentilha com arroz e legumes", description: "Ferro e energia duradoura", emoji: "🥗", calories: 490, ingredients: ["Lentilha", "Arroz integral", "Cenoura", "Abobrinha", "Cúrcuma"], prepSteps: ["Cozinhe lentilha e arroz", "Refogue legumes com cúrcuma", "Monte o bowl"] },
      { type: "Lanche da Tarde", title: "Smoothie de beterraba e maçã", description: "Vasodilatador natural", emoji: "🥤", calories: 170, ingredients: ["Beterraba", "Maçã", "Gengibre", "Limão"], prepSteps: ["Bata tudo com água"] },
      { type: "Jantar", title: "Omelete de espinafre com batata", description: "Ferro e carboidrato", emoji: "🍳", calories: 400, ingredients: ["Ovos", "Espinafre", "Batata", "Cebola"], prepSteps: ["Cozinhe a batata", "Faça o omelete com espinafre e batata"] },
    ],
  },
  {
    day: "Quarta-feira", shortDay: "Qua",
    meals: [
      { type: "Café da Manhã", title: "Granola caseira com iogurte e mel", description: "Fibras e probióticos", emoji: "🥣", calories: 300, ingredients: ["Granola", "Iogurte natural", "Mel", "Banana"], prepSteps: ["Monte a tigela com iogurte", "Adicione granola e mel"] },
      { type: "Lanche da Manhã", title: "Mix energético", description: "Castanhas e frutas secas", emoji: "🥜", calories: 200, ingredients: ["Castanha-do-pará", "Nozes", "Uva-passa", "Damasco"], prepSteps: ["Separe 40g do mix"] },
      { type: "Almoço", title: "Macarrão integral com frango ao pesto", description: "Carboidrato + proteína", emoji: "🍝", calories: 530, ingredients: ["Macarrão integral", "Peito de frango", "Manjericão", "Azeite", "Parmesão"], prepSteps: ["Cozinhe o macarrão", "Grelhe o frango", "Misture com pesto caseiro"] },
      { type: "Lanche da Tarde", title: "Maçã assada com canela", description: "Aquecimento e disposição", emoji: "🍎", calories: 130, ingredients: ["Maçã", "Canela", "Mel"], prepSteps: ["Asse a maçã no micro-ondas 3min", "Polvilhe canela e mel"] },
      { type: "Jantar", title: "Carne moída com purê de abóbora", description: "Reconfortante e nutritivo", emoji: "🥩", calories: 450, ingredients: ["Carne moída", "Abóbora", "Cebola", "Alho"], prepSteps: ["Refogue a carne", "Cozinhe e amasse a abóbora"] },
    ],
  },
  {
    day: "Quinta-feira", shortDay: "Qui",
    meals: [
      { type: "Café da Manhã", title: "Tapioca com ovo e queijo", description: "Energia rápida", emoji: "🫓", calories: 310, ingredients: ["Goma de tapioca", "Ovos", "Queijo branco"], prepSteps: ["Faça a tapioca", "Recheie com ovo mexido e queijo"] },
      { type: "Lanche da Manhã", title: "Suco verde energizante", description: "Detox e disposição", emoji: "🥬", calories: 120, ingredients: ["Couve", "Maçã", "Gengibre", "Limão"], prepSteps: ["Bata tudo com água de coco"] },
      { type: "Almoço", title: "Frango ao curry com arroz integral", description: "Especiarias energizantes", emoji: "🍛", calories: 510, ingredients: ["Peito de frango", "Arroz integral", "Curry", "Leite de coco", "Cenoura"], prepSteps: ["Cozinhe o arroz", "Refogue frango com curry e leite de coco"] },
      { type: "Lanche da Tarde", title: "Torrada com pasta de amendoim e banana", description: "Combo clássico", emoji: "🍞", calories: 250, ingredients: ["Pão integral", "Pasta de amendoim", "Banana"], prepSteps: ["Torre o pão", "Espalhe pasta de amendoim", "Fatie a banana por cima"] },
      { type: "Jantar", title: "Sopa de abóbora com gengibre", description: "Aquece e energiza", emoji: "🥣", calories: 300, ingredients: ["Abóbora", "Gengibre", "Cebola", "Creme de leite light"], prepSteps: ["Cozinhe a abóbora", "Bata com gengibre", "Finalize com creme de leite"] },
    ],
  },
  {
    day: "Sexta-feira", shortDay: "Sex",
    meals: [
      { type: "Café da Manhã", title: "Overnight oats com chia", description: "Prepare à noite, coma de manhã", emoji: "🥣", calories: 290, ingredients: ["Aveia", "Chia", "Leite", "Mel", "Morango"], prepSteps: ["Misture aveia, chia e leite", "Deixe na geladeira 8h", "Cubra com morango"] },
      { type: "Lanche da Manhã", title: "Iogurte com mel e nozes", description: "Omega 3 e probióticos", emoji: "🍯", calories: 210, ingredients: ["Iogurte natural", "Mel", "Nozes"], prepSteps: ["Monte a tigela"] },
      { type: "Almoço", title: "Peixe assado com legumes", description: "Leve e energético", emoji: "🐟", calories: 430, ingredients: ["Filé de tilápia", "Batata", "Cenoura", "Abobrinha", "Azeite"], prepSteps: ["Tempere o peixe", "Corte os legumes", "Asse tudo no forno 30min"] },
      { type: "Lanche da Tarde", title: "Açaí pequeno", description: "Energia amazônica", emoji: "🫐", calories: 280, ingredients: ["Polpa de açaí", "Granola", "Banana"], prepSteps: ["Bata o açaí", "Cubra com granola e banana"] },
      { type: "Jantar", title: "Wrap integral com atum", description: "Prático e nutritivo", emoji: "🌯", calories: 380, ingredients: ["Tortilla integral", "Atum", "Alface", "Tomate", "Milho"], prepSteps: ["Misture atum com milho", "Monte o wrap"] },
    ],
  },
  {
    day: "Sábado", shortDay: "Sáb",
    meals: [
      { type: "Café da Manhã", title: "Panqueca de aveia com frutas", description: "Fibras e vitaminas", emoji: "🥞", calories: 320, ingredients: ["Aveia", "Ovos", "Banana", "Morango"], prepSteps: ["Bata aveia, ovo e banana", "Faça na frigideira", "Cubra com morango"] },
      { type: "Lanche da Manhã", title: "Água de coco com limão", description: "Hidratação e eletrólitos", emoji: "🥥", calories: 80, ingredients: ["Água de coco", "Limão"], prepSteps: ["Esprema limão na água de coco"] },
      { type: "Almoço", title: "Strogonoff de frango com arroz", description: "Comfort food nutritivo", emoji: "🍚", calories: 530, ingredients: ["Peito de frango", "Creme de leite light", "Arroz integral", "Cogumelos"], prepSteps: ["Refogue frango com cogumelos", "Adicione creme de leite", "Sirva com arroz"] },
      { type: "Lanche da Tarde", title: "Frutas da estação", description: "Vitaminas naturais", emoji: "🍎", calories: 130, ingredients: ["Maçã", "Pera", "Uva"], prepSteps: ["Lave e sirva"] },
      { type: "Jantar", title: "Sopa de legumes com frango", description: "Reconfortante", emoji: "🥣", calories: 350, ingredients: ["Peito de frango", "Batata", "Cenoura", "Cebola", "Alho"], prepSteps: ["Cozinhe frango com legumes", "Tempere a gosto"] },
    ],
  },
  {
    day: "Domingo", shortDay: "Dom",
    meals: [
      { type: "Café da Manhã", title: "Brunch energético", description: "Café reforçado do domingo", emoji: "🍳", calories: 400, ingredients: ["Ovos", "Pão integral", "Abacate", "Tomate", "Queijo branco"], prepSteps: ["Prepare ovos mexidos", "Monte o prato com todos os ingredientes"] },
      { type: "Lanche da Manhã", title: "Smoothie tropical", description: "Manga, maracujá e gengibre", emoji: "🥤", calories: 200, ingredients: ["Manga", "Maracujá", "Gengibre", "Mel"], prepSteps: ["Bata tudo no liquidificador"] },
      { type: "Almoço", title: "Feijoada light", description: "Tradição sem culpa", emoji: "🫘", calories: 500, ingredients: ["Feijão preto", "Linguiça de frango", "Couve", "Arroz", "Laranja"], prepSteps: ["Cozinhe feijão com linguiça", "Refogue couve", "Sirva com arroz e laranja"] },
      { type: "Lanche da Tarde", title: "Bolo fit de banana", description: "Sem açúcar adicionado", emoji: "🍰", calories: 180, ingredients: ["Banana", "Aveia", "Ovos", "Canela"], prepSteps: ["Bata tudo", "Asse por 30min"] },
      { type: "Jantar", title: "Salada Caesar com frango", description: "Completa e leve", emoji: "🥗", calories: 380, ingredients: ["Alface romana", "Peito de frango", "Parmesão", "Croutons integrais", "Molho Caesar light"], prepSteps: ["Grelhe o frango", "Monte a salada", "Finalize com molho"] },
    ],
  },
];

// ─── CARDÁPIO: GANHAR MASSA (rotina Push/Pull/Legs + Upper/Lower) ───
const menuGanharMassa: DayPlan[] = [
  {
    day: "Segunda-feira", shortDay: "Seg", trainingNote: "🏋️ Push (Peito/Ombro/Tríceps)",
    meals: [
      { type: "Café da Manhã", title: "Ovos mexidos com aveia e banana", description: "Proteína + carb para o treino", emoji: "🍳", calories: 450, ingredients: ["Ovos (4)", "Aveia", "Banana", "Manteiga"], prepSteps: ["Mexa 4 ovos na manteiga", "Prepare aveia com banana fatiada"] },
      { type: "Lanche da Manhã", title: "Shake de whey com banana e aveia", description: "Pré-treino calórico", emoji: "🥤", calories: 380, ingredients: ["Whey protein", "Banana", "Aveia", "Leite integral"], prepSteps: ["Bata tudo no liquidificador"] },
      { type: "Almoço", title: "Arroz com feijão, frango grelhado e batata-doce", description: "Prato clássico do ganho de massa", emoji: "🍛", calories: 720, ingredients: ["Arroz", "Feijão", "Peito de frango (300g)", "Batata-doce", "Azeite"], prepSteps: ["Cozinhe arroz e feijão", "Grelhe 300g de frango", "Asse batata-doce"] },
      { type: "Lanche da Tarde", title: "Sanduíche de pasta de amendoim com banana", description: "Calórico e prático pós-treino", emoji: "🥜", calories: 420, ingredients: ["Pão integral (2 fatias)", "Pasta de amendoim", "Banana", "Mel"], prepSteps: ["Espalhe pasta de amendoim", "Fatie a banana", "Regue com mel"] },
      { type: "Jantar", title: "Macarrão integral com carne moída e queijo", description: "Carboidrato de recuperação", emoji: "🍝", calories: 650, ingredients: ["Macarrão integral", "Carne moída (250g)", "Molho de tomate", "Queijo parmesão"], prepSteps: ["Cozinhe o macarrão", "Refogue a carne com molho", "Finalize com queijo"] },
    ],
  },
  {
    day: "Terça-feira", shortDay: "Ter", trainingNote: "🏋️ Pull (Costas/Bíceps)",
    meals: [
      { type: "Café da Manhã", title: "Panqueca proteica de aveia", description: "Alto em proteína", emoji: "🥞", calories: 420, ingredients: ["Ovos (3)", "Aveia", "Banana", "Whey protein"], prepSteps: ["Bata tudo", "Faça panquecas na frigideira"] },
      { type: "Lanche da Manhã", title: "Iogurte grego com granola e mel", description: "Proteína e carboidrato", emoji: "🥛", calories: 300, ingredients: ["Iogurte grego", "Granola", "Mel", "Castanhas"], prepSteps: ["Monte a tigela"] },
      { type: "Almoço", title: "Filé de frango com arroz integral e ovos", description: "Dobro de proteína", emoji: "🍗", calories: 700, ingredients: ["Peito de frango (250g)", "Arroz integral", "Ovos (2)", "Brócolis"], prepSteps: ["Grelhe o frango", "Cozinhe arroz", "Faça ovos cozidos", "Cozinhe brócolis no vapor"] },
      { type: "Lanche da Tarde", title: "Batata-doce com frango desfiado", description: "Refeição sólida de tarde", emoji: "🍠", calories: 400, ingredients: ["Batata-doce", "Peito de frango", "Azeite"], prepSteps: ["Cozinhe a batata-doce", "Desfie o frango", "Monte o prato"] },
      { type: "Jantar", title: "Omelete gigante com pão integral", description: "Proteína para recuperação noturna", emoji: "🍳", calories: 550, ingredients: ["Ovos (4)", "Queijo", "Presunto de peru", "Espinafre", "Pão integral"], prepSteps: ["Bata os ovos", "Adicione recheio", "Sirva com pão"] },
    ],
  },
  {
    day: "Quarta-feira", shortDay: "Qua", trainingNote: "🦵 Legs (Pernas/Glúteos)",
    meals: [
      { type: "Café da Manhã", title: "Açaí proteico com granola", description: "Energia + proteína", emoji: "🫐", calories: 450, ingredients: ["Polpa de açaí", "Whey protein", "Granola", "Banana", "Mel"], prepSteps: ["Bata açaí com whey", "Cubra com granola e banana"] },
      { type: "Lanche da Manhã", title: "Wrap de frango com requeijão", description: "Proteína portátil", emoji: "🌯", calories: 350, ingredients: ["Tortilla integral", "Peito de frango", "Requeijão", "Alface"], prepSteps: ["Monte o wrap"] },
      { type: "Almoço", title: "Carne vermelha com arroz, feijão e ovo", description: "Máximo ferro e proteína", emoji: "🥩", calories: 780, ingredients: ["Patinho (250g)", "Arroz", "Feijão", "Ovo frito", "Salada"], prepSteps: ["Grelhe o bife", "Cozinhe arroz e feijão", "Frite o ovo"] },
      { type: "Lanche da Tarde", title: "Shake calórico de abacate", description: "Gordura boa + proteína", emoji: "🥑", calories: 450, ingredients: ["Abacate", "Whey protein", "Leite integral", "Mel"], prepSteps: ["Bata tudo no liquidificador"] },
      { type: "Jantar", title: "Frango ao forno com purê de batata", description: "Recuperação de legs day", emoji: "🍗", calories: 620, ingredients: ["Coxa de frango", "Batata", "Leite", "Manteiga"], prepSteps: ["Asse o frango", "Cozinhe e amasse as batatas com leite e manteiga"] },
    ],
  },
  {
    day: "Quinta-feira", shortDay: "Qui", trainingNote: "💪 Upper (Parte Superior)",
    meals: [
      { type: "Café da Manhã", title: "Tapioca recheada com ovo e queijo", description: "Energia rápida pré-treino", emoji: "🫓", calories: 400, ingredients: ["Goma de tapioca", "Ovos (2)", "Queijo coalho", "Presunto de peru"], prepSteps: ["Faça a tapioca", "Recheie com ovo e queijo"] },
      { type: "Lanche da Manhã", title: "Banana com whey e pasta de amendoim", description: "Tríade do ganho", emoji: "🍌", calories: 400, ingredients: ["Banana (2)", "Whey protein", "Pasta de amendoim"], prepSteps: ["Amasse as bananas", "Misture com whey e pasta de amendoim"] },
      { type: "Almoço", title: "Macarrão com frango e molho branco light", description: "Calórico e proteico", emoji: "🍝", calories: 700, ingredients: ["Macarrão integral", "Peito de frango (250g)", "Creme de leite light", "Brócolis"], prepSteps: ["Cozinhe o macarrão", "Prepare o frango com molho branco", "Adicione brócolis"] },
      { type: "Lanche da Tarde", title: "Pão integral com atum e ovo", description: "Combinação proteica", emoji: "🥪", calories: 380, ingredients: ["Pão integral", "Atum", "Ovo cozido", "Azeite"], prepSteps: ["Monte o sanduíche com atum e ovo fatiado"] },
      { type: "Jantar", title: "Bowl de carne com arroz e legumes", description: "Prato completo para recuperação", emoji: "🥩", calories: 650, ingredients: ["Carne moída (200g)", "Arroz integral", "Cenoura", "Abobrinha", "Cebola"], prepSteps: ["Refogue a carne", "Cozinhe o arroz", "Salteie legumes"] },
    ],
  },
  {
    day: "Sexta-feira", shortDay: "Sex", trainingNote: "🦵 Lower (Parte Inferior)",
    meals: [
      { type: "Café da Manhã", title: "Mingau proteico de aveia", description: "Aquecimento + energia", emoji: "🥣", calories: 400, ingredients: ["Aveia", "Leite integral", "Whey protein", "Banana", "Mel"], prepSteps: ["Cozinhe aveia com leite", "Misture whey", "Cubra com banana e mel"] },
      { type: "Lanche da Manhã", title: "Sanduíche natural de frango duplo", description: "Proteína portátil", emoji: "🥪", calories: 380, ingredients: ["Pão integral", "Peito de frango", "Alface", "Tomate", "Requeijão"], prepSteps: ["Monte o sanduíche duplo"] },
      { type: "Almoço", title: "Arroz com feijão, bife e batata-doce", description: "Tudo que o músculo precisa", emoji: "🍛", calories: 750, ingredients: ["Arroz", "Feijão", "Bife (200g)", "Batata-doce", "Salada"], prepSteps: ["Cozinhe arroz e feijão", "Grelhe o bife", "Asse batata-doce"] },
      { type: "Lanche da Tarde", title: "Shake de banana com pasta de amendoim", description: "Calórico pós-treino", emoji: "🥤", calories: 430, ingredients: ["Banana (2)", "Pasta de amendoim", "Leite integral", "Mel"], prepSteps: ["Bata tudo no liquidificador"] },
      { type: "Jantar", title: "Risoto de frango com legumes", description: "Carboidrato para reposição", emoji: "🍚", calories: 600, ingredients: ["Arroz arbóreo", "Peito de frango", "Cenoura", "Ervilha", "Caldo de legumes"], prepSteps: ["Refogue o arroz", "Adicione caldo aos poucos", "Misture frango e legumes"] },
    ],
  },
  {
    day: "Sábado", shortDay: "Sáb", trainingNote: "🏃 Cardio + Abdômen",
    meals: [
      { type: "Café da Manhã", title: "Ovos com pão e abacate", description: "Gorduras e proteínas", emoji: "🥑", calories: 430, ingredients: ["Ovos (3)", "Pão integral", "Abacate", "Sal", "Pimenta"], prepSteps: ["Mexa os ovos", "Fatie o abacate", "Sirva com pão torrado"] },
      { type: "Lanche da Manhã", title: "Iogurte grego com frutas", description: "Proteína e vitaminas", emoji: "🍇", calories: 250, ingredients: ["Iogurte grego", "Morango", "Blueberry", "Mel"], prepSteps: ["Monte a tigela"] },
      { type: "Almoço", title: "Frango grelhado com arroz e salada", description: "Dia leve mas proteico", emoji: "🥗", calories: 550, ingredients: ["Peito de frango (200g)", "Arroz integral", "Alface", "Tomate", "Pepino"], prepSteps: ["Grelhe o frango", "Cozinhe o arroz", "Monte a salada"] },
      { type: "Lanche da Tarde", title: "Crepioca proteica", description: "Lanche substancial", emoji: "🫓", calories: 300, ingredients: ["Ovos (2)", "Goma de tapioca", "Queijo branco"], prepSteps: ["Misture ovo com goma", "Faça na frigideira", "Recheie com queijo"] },
      { type: "Jantar", title: "Sopa de frango com legumes e macarrão", description: "Recuperação do cardio", emoji: "🥣", calories: 450, ingredients: ["Peito de frango", "Macarrão integral", "Cenoura", "Batata", "Salsinha"], prepSteps: ["Cozinhe frango com legumes", "Adicione macarrão", "Finalize com salsinha"] },
    ],
  },
  {
    day: "Domingo", shortDay: "Dom", trainingNote: "😴 Descanso ativo",
    meals: [
      { type: "Café da Manhã", title: "Brunch proteico completo", description: "Reposição do domingo", emoji: "🍳", calories: 500, ingredients: ["Ovos (3)", "Bacon de peru", "Pão integral", "Abacate", "Tomate"], prepSteps: ["Prepare ovos e bacon", "Monte o prato completo"] },
      { type: "Lanche da Manhã", title: "Smoothie calórico verde", description: "Nutrição concentrada", emoji: "🥤", calories: 320, ingredients: ["Banana", "Espinafre", "Pasta de amendoim", "Leite integral", "Aveia"], prepSteps: ["Bata tudo no liquidificador"] },
      { type: "Almoço", title: "Feijoada fitness", description: "Proteína e ferro em alta", emoji: "🫘", calories: 680, ingredients: ["Feijão preto", "Peito de frango", "Linguiça de frango", "Couve", "Arroz", "Laranja"], prepSteps: ["Cozinhe feijão com carnes", "Refogue couve", "Sirva com arroz e laranja"] },
      { type: "Lanche da Tarde", title: "Batata-doce com whey", description: "Carb + proteína de qualidade", emoji: "🍠", calories: 350, ingredients: ["Batata-doce", "Whey protein", "Canela"], prepSteps: ["Cozinhe batata-doce", "Amasse e misture com whey e canela"] },
      { type: "Jantar", title: "Panqueca de carne com purê", description: "Conforto para a noite de descanso", emoji: "🥞", calories: 580, ingredients: ["Massa de panqueca integral", "Carne moída (200g)", "Molho de tomate", "Batata"], prepSteps: ["Faça as panquecas", "Prepare recheio de carne", "Sirva com purê"] },
    ],
  },
];

export const menusByGoal: Record<string, DayPlan[]> = {
  "Economizar tempo": menuEconomizarTempo,
  "Mais energia": menuMaisEnergia,
  "Ganhar massa": menuGanharMassa,
};

// Default export for backward compat
export const weekPlan = menuMaisEnergia;

export const tips: Tip[] = [
  {
    id: "t1",
    title: "Snacks que não estragam na mochila",
    summary: "Castanhas, barrinhas de cereal, frutas secas e biscoitos integrais são opções práticas que sobrevivem horas na mochila sem refrigeração.",
    emoji: "🎒",
    tag: "Praticidade",
  },
  {
    id: "t2",
    title: "Opções baratas na cantina",
    summary: "Prefira o PF ao invés de lanches processados. Sopas, saladas e sucos naturais são mais baratos e nutritivos.",
    emoji: "🏫",
    tag: "Economia",
  },
  {
    id: "t3",
    title: "Como evitar sono nas aulas",
    summary: "Evite refeições pesadas antes da aula. Prefira lanches leves com proteína. Beba água constantemente. Café? Só até 14h!",
    emoji: "😴",
    tag: "Foco",
  },
  {
    id: "t4",
    title: "Esqueceu a marmita?",
    summary: "Compre um iogurte proteico + banana na cantina. Ou um PF simples com bastante salada. Evite salgados fritos!",
    emoji: "🆘",
    tag: "Plano B",
  },
  {
    id: "t5",
    title: "Hidratação salva o foco",
    summary: "Leve sempre uma garrafa de água. A desidratação reduz em até 25% sua capacidade cognitiva. Beba pelo menos 2L/dia.",
    emoji: "💧",
    tag: "Saúde",
  },
  {
    id: "t6",
    title: "Substituições rápidas de emergência",
    summary: "Sem frango? Use ovo. Sem arroz? Use batata ou macarrão. Sem salada? Coma uma fruta. O importante é manter a estrutura proteína + carb + fibra.",
    emoji: "🔄",
    tag: "Plano B",
  },
];
