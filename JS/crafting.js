// ============================================
// SISTEMA DE FORJA — MATERIAIS (drops reais)
// ============================================

var materiaisInfo = {
    // Tier 1
    "Pele de Lobo": "🐾", "Moeda Antiga": "🪙", "Seda de Aranha": "🕸️", "Couro Grosso": "🟫",
    "Glândula Tóxica": "🧪", "Escama Pantanosa": "🐍", "Dente de Croco": "🦷", "Seiva Ácida": "🌿",
    "Lâmina Orcish": "🗡️", "Pena de Harpia": "🪶", "Ferradura Antiga": "🧲", "Pele de Warg": "🐾",
    // Tier 2
    "Osso Encantado": "🦴", "Pedra Rúnica": "🪨", "Insígnia Antiga": "🎖️", "Bandagem Mágica": "🩹",
    "Ferrão Venenoso": "🦂", "Escama Dourada": "✨", "Núcleo de Areia": "💎", "Turbante Encantado": "🧣",
    "Ectoplasma": "💧", "Grimório Sombrio": "📕", "Garra Pútrida": "🦴",
    // Tier 3
    "Dente de Ogro": "🦷", "Cristal de Terra": "💎", "Seda Real": "🕸️", "Segmento Cristalizado": "🔮",
    "Escama Ígnea": "🔥", "Coração de Magma": "❤️‍🔥", "Pena de Fênix": "🪶", "Chifre Flamejante": "🦴",
    "Pelo de Yeti": "🐾", "Cristal de Gelo": "💎", "Presa Congelada": "🦷", "Coração Glacial": "💙",
    // Tier 4
    "Essência Espectral": "👻", "Sangue Nobre": "🩸", "Grito Cristalizado": "💎", "Fragmento da Morte": "💀",
    "Olho Abissal": "👁️", "Tinta do Vazio": "🖤", "Essência Sombria": "🌑", "Fenda Cristalizada": "💎",
    "Lâmina Negra": "⚔️", "Pedra Animada": "🪨", "Sangue de Quimera": "🩸", "Filactério Rachado": "💎",
    // Tier 5
    "Poeira Estelar": "✨", "Fragmento Psíquico": "🧠", "Asa Quebrada": "🪶", "Núcleo Astral": "🌟",
    "Essência Infernal": "🔥", "Beijo Maldito": "💋", "Corrente Infernal": "⛓️", "Chifre do Archdemônio": "🦴",
    "Pena Divina": "🪶", "Sangue de Titã": "🩸", "Trombeta do Apocalipse": "📯", "Fragmento Divino": "💎",
    // Boss drops
    "Ferrão Real": "🦂", "Cabeça de Hydra": "🐍", "Clava do Chefe": "🏏", "Escama de Dragão": "🐉",
    "Coroa Amaldiçoada": "👑", "Máscara Dourada": "🎭", "Cajado da Morte": "🪄"
};

var receitasForja = [

/* ══════════════════════════════════════
   GUERREIRO — TIER 1
══════════════════════════════════════ */

{
  nome: "Espada de Bronze do Recruta",
  icone: "⚔️",
  categoria: "equipamento",
  descricao: "Arma: +6 ATK",
  nivelMinimo: 3,
  custoOuro: 100,
  classePermitida: "guerreiro",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 3 },
    { nome: "Minério de Estanho", quantidade: 2 },
    { nome: "Pele de Lobo", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Espada de Bronze do Recruta",
    icone: "⚔️",
    slot: "arma",
    stats: { atk: 6, def: 0, hp: 0 },
    precoVenda: 50
  }
},
{
  nome: "Armadura de Bronze Reforçada",
  icone: "🛡️",
  categoria: "equipamento",
  descricao: "Armadura: +2 ATK, +6 DEF, +15 HP",
  nivelMinimo: 3,
  custoOuro: 100,
  classePermitida: "guerreiro",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 4 },
    { nome: "Minério de Estanho", quantidade: 2 },
    { nome: "Couro Grosso", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Armadura de Bronze Reforçada",
    icone: "🛡️",
    slot: "armadura",
    stats: { atk: 2, def: 6, hp: 15 },
    precoVenda: 50
  }
},
{
  nome: "Elmo de Bronze do Javali",
  icone: "⛑️",
  categoria: "equipamento",
  descricao: "Elmo: +1 ATK, +4 DEF, +10 HP",
  nivelMinimo: 3,
  custoOuro: 80,
  classePermitida: "guerreiro",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 2 },
    { nome: "Minério de Estanho", quantidade: 1 },
    { nome: "Couro Grosso", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Elmo de Bronze do Javali",
    icone: "⛑️",
    slot: "elmo",
    stats: { atk: 1, def: 4, hp: 10 },
    precoVenda: 40
  }
},
{
  nome: "Botas de Bronze de Marcha",
  icone: "👢",
  categoria: "equipamento",
  descricao: "Botas: +2 ATK, +4 DEF, +6 HP",
  nivelMinimo: 3,
  custoOuro: 70,
  classePermitida: "guerreiro",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 2 },
    { nome: "Couro Grosso", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Botas de Bronze de Marcha",
    icone: "👢",
    slot: "botas",
    stats: { atk: 2, def: 4, hp: 6 },
    precoVenda: 35
  }
},
{
  nome: "Anel de Bronze do Combate",
  icone: "💍",
  categoria: "equipamento",
  descricao: "Anel: +4 ATK, +2 DEF",
  nivelMinimo: 3,
  custoOuro: 70,
  classePermitida: "guerreiro",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 1 },
    { nome: "Moeda Antiga", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Anel de Bronze do Combate",
    icone: "💍",
    slot: "anel",
    stats: { atk: 4, def: 2, hp: 0 },
    precoVenda: 35
  }
},
{
  nome: "Amuleto de Bronze do Soldado",
  icone: "📿",
  categoria: "equipamento",
  descricao: "Amuleto: +4 ATK, +2 DEF, +8 HP",
  nivelMinimo: 3,
  custoOuro: 75,
  classePermitida: "guerreiro",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 1 },
    { nome: "Pele de Lobo", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Amuleto de Bronze do Soldado",
    icone: "📿",
    slot: "amuleto",
    stats: { atk: 4, def: 2, hp: 8 },
    precoVenda: 37
  }
},

/* ══════════════════════════════════════
   ARQUEIRO — TIER 1
══════════════════════════════════════ */

{
  nome: "Arco de Bronze do Caçador",
  icone: "🏹",
  categoria: "equipamento",
  descricao: "Arma: +6 ATK",
  nivelMinimo: 3,
  custoOuro: 100,
  classePermitida: "arqueiro",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 2 },
    { nome: "Minério de Estanho", quantidade: 2 },
    { nome: "Pele de Lobo", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Arco de Bronze do Caçador",
    icone: "🏹",
    slot: "arma",
    stats: { atk: 6, def: 0, hp: 0 },
    precoVenda: 50
  }
},
{
  nome: "Armadura Leve de Bronze",
  icone: "🥋",
  categoria: "equipamento",
  descricao: "Armadura: +3 ATK, +4 DEF, +10 HP",
  nivelMinimo: 3,
  custoOuro: 100,
  classePermitida: "arqueiro",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 3 },
    { nome: "Minério de Estanho", quantidade: 1 },
    { nome: "Seda de Aranha", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Armadura Leve de Bronze",
    icone: "🥋",
    slot: "armadura",
    stats: { atk: 3, def: 4, hp: 10 },
    precoVenda: 50
  }
},
{
  nome: "Capuz de Bronze da Coruja",
  icone: "🪖",
  categoria: "equipamento",
  descricao: "Elmo: +2 ATK, +2 DEF, +6 HP",
  nivelMinimo: 3,
  custoOuro: 80,
  classePermitida: "arqueiro",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 2 },
    { nome: "Pena Noturna", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Capuz de Bronze da Coruja",
    icone: "🪖",
    slot: "elmo",
    stats: { atk: 2, def: 2, hp: 6 },
    precoVenda: 40
  }
},
{
  nome: "Botas de Bronze Ágeis",
  icone: "👢",
  categoria: "equipamento",
  descricao: "Botas: +3 ATK, +2 DEF",
  nivelMinimo: 3,
  custoOuro: 70,
  classePermitida: "arqueiro",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 2 },
    { nome: "Pele de Lobo", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Botas de Bronze Ágeis",
    icone: "👢",
    slot: "botas",
    stats: { atk: 3, def: 2, hp: 0 },
    precoVenda: 35
  }
},
{
  nome: "Anel de Bronze da Mira",
  icone: "💍",
  categoria: "equipamento",
  descricao: "Anel: +4 ATK",
  nivelMinimo: 3,
  custoOuro: 70,
  classePermitida: "arqueiro",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 1 },
    { nome: "Moeda Antiga", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Anel de Bronze da Mira",
    icone: "💍",
    slot: "anel",
    stats: { atk: 4, def: 0, hp: 0 },
    precoVenda: 35
  }
},
{
  nome: "Amuleto de Bronze do Batedor",
  icone: "📿",
  categoria: "equipamento",
  descricao: "Amuleto: +4 ATK, +1 DEF, +6 HP",
  nivelMinimo: 3,
  custoOuro: 75,
  classePermitida: "arqueiro",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 1 },
    { nome: "Pena Noturna", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Amuleto de Bronze do Batedor",
    icone: "📿",
    slot: "amuleto",
    stats: { atk: 4, def: 1, hp: 6 },
    precoVenda: 37
  }
},

/* ══════════════════════════════════════
   MAGO — TIER 1
══════════════════════════════════════ */

{
  nome: "Cajado de Bronze Silvestre",
  icone: "🪄",
  categoria: "equipamento",
  descricao: "Arma: +4 ATK, +10 HP",
  nivelMinimo: 3,
  custoOuro: 100,
  classePermitida: "mago",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 2 },
    { nome: "Minério de Estanho", quantidade: 2 },
    { nome: "Essência Silvestre", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Cajado de Bronze Silvestre",
    icone: "🪄",
    slot: "arma",
    stats: { atk: 4, def: 0, hp: 10 },
    precoVenda: 50
  }
},
{
  nome: "Manto de Bronze Arcano",
  icone: "🧥",
  categoria: "equipamento",
  descricao: "Armadura: +2 ATK, +3 DEF, +14 HP",
  nivelMinimo: 3,
  custoOuro: 100,
  classePermitida: "mago",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 3 },
    { nome: "Minério de Estanho", quantidade: 1 },
    { nome: "Seda de Aranha", quantidade: 3 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Manto de Bronze Arcano",
    icone: "🧥",
    slot: "armadura",
    stats: { atk: 2, def: 3, hp: 14 },
    precoVenda: 50
  }
},
{
  nome: "Chapéu de Bronze das Runas",
  icone: "🎩",
  categoria: "equipamento",
  descricao: "Elmo: +2 ATK, +2 DEF, +10 HP",
  nivelMinimo: 3,
  custoOuro: 80,
  classePermitida: "mago",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 2 },
    { nome: "Essência Silvestre", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Chapéu de Bronze das Runas",
    icone: "🎩",
    slot: "elmo",
    stats: { atk: 2, def: 2, hp: 10 },
    precoVenda: 40
  }
},
{
  nome: "Botas de Bronze da Névoa",
  icone: "👢",
  categoria: "equipamento",
  descricao: "Botas: +2 ATK, +2 DEF, +8 HP",
  nivelMinimo: 3,
  custoOuro: 70,
  classePermitida: "mago",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 2 },
    { nome: "Seda de Aranha", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Botas de Bronze da Névoa",
    icone: "👢",
    slot: "botas",
    stats: { atk: 2, def: 2, hp: 8 },
    precoVenda: 35
  }
},
{
  nome: "Anel de Bronze Arcano",
  icone: "💍",
  categoria: "equipamento",
  descricao: "Anel: +5 ATK, +8 HP",
  nivelMinimo: 3,
  custoOuro: 70,
  classePermitida: "mago",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 1 },
    { nome: "Moeda Antiga", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Anel de Bronze Arcano",
    icone: "💍",
    slot: "anel",
    stats: { atk: 5, def: 0, hp: 8 },
    precoVenda: 35
  }
},
{
  nome: "Amuleto de Bronze do Espírito",
  icone: "📿",
  categoria: "equipamento",
  descricao: "Amuleto: +4 ATK, +10 HP",
  nivelMinimo: 3,
  custoOuro: 75,
  classePermitida: "mago",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 1 },
    { nome: "Essência Silvestre", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Amuleto de Bronze do Espírito Arcano",
    icone: "📿",
    slot: "amuleto",
    stats: { atk: 4, def: 0, hp: 10 },
    precoVenda: 37
  }
},

/* ══════════════════════════════════════
   LADINO — TIER 1
══════════════════════════════════════ */

{
  nome: "Adaga de Bronze Sombria",
  icone: "🗡️",
  categoria: "equipamento",
  descricao: "Arma: +7 ATK",
  nivelMinimo: 3,
  custoOuro: 100,
  classePermitida: "ladino",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 2 },
    { nome: "Minério de Estanho", quantidade: 2 },
    { nome: "Seda de Aranha", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Adaga de Bronze Sombria",
    icone: "🗡️",
    slot: "arma",
    stats: { atk: 7, def: 0, hp: 0 },
    precoVenda: 50
  }
},
{
  nome: "Armadura Leve de Bronze Furtiva",
  icone: "🥋",
  categoria: "equipamento",
  descricao: "Armadura: +4 ATK, +3 DEF, +8 HP",
  nivelMinimo: 3,
  custoOuro: 100,
  classePermitida: "ladino",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 3 },
    { nome: "Minério de Estanho", quantidade: 1 },
    { nome: "Escama Pantanosa", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Armadura Leve de Bronze Furtiva",
    icone: "🥋",
    slot: "armadura",
    stats: { atk: 4, def: 3, hp: 8 },
    precoVenda: 50
  }
},
{
  nome: "Capuz de Bronze do Infiltrador",
  icone: "🪖",
  categoria: "equipamento",
  descricao: "Elmo: +2 ATK, +2 DEF",
  nivelMinimo: 3,
  custoOuro: 80,
  classePermitida: "ladino",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 2 },
    { nome: "Pena Noturna", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Capuz de Bronze do Infiltrador",
    icone: "🪖",
    slot: "elmo",
    stats: { atk: 2, def: 2, hp: 0 },
    precoVenda: 40
  }
},
{
  nome: "Botas de Bronze Furtivas",
  icone: "👢",
  categoria: "equipamento",
  descricao: "Botas: +3 ATK, +2 DEF",
  nivelMinimo: 3,
  custoOuro: 70,
  classePermitida: "ladino",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 2 },
    { nome: "Seda de Aranha", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Botas de Bronze Furtivas",
    icone: "👢",
    slot: "botas",
    stats: { atk: 3, def: 2, hp: 0 },
    precoVenda: 35
  }
},
{
  nome: "Anel de Bronze da Emboscada",
  icone: "💍",
  categoria: "equipamento",
  descricao: "Anel: +5 ATK, +1 DEF",
  nivelMinimo: 3,
  custoOuro: 70,
  classePermitida: "ladino",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 1 },
    { nome: "Moeda Antiga", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Anel de Bronze da Emboscada",
    icone: "💍",
    slot: "anel",
    stats: { atk: 5, def: 1, hp: 0 },
    precoVenda: 35
  }
},
{
  nome: "Amuleto de Bronze da Sombra",
  icone: "📿",
  categoria: "equipamento",
  descricao: "Amuleto: +4 ATK, +2 DEF, +4 HP",
  nivelMinimo: 3,
  custoOuro: 75,
  classePermitida: "ladino",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 1 },
    { nome: "Pena Noturna", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Amuleto de Bronze da Sombra",
    icone: "📿",
    slot: "amuleto",
    stats: { atk: 4, def: 2, hp: 4 },
    precoVenda: 37
  }
},

/* ══════════════════════════════════════
   MAGO — ARMAS
══════════════════════════════════════ */

{
  nome: "Cajado de Bronze Silvestre",
  icone: "🪄",
  categoria: "equipamento",
  descricao: "Arma: +4 ATK, +10 HP",
  nivelMinimo: 3,
  custoOuro: 100,
  classePermitida: "mago",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 2 },
    { nome: "Minério de Estanho", quantidade: 2 },
    { nome: "Essência Silvestre", quantidade: 2 },
    { nome: "Seda de Aranha", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Cajado de Bronze Silvestre",
    icone: "🪄",
    slot: "arma",
    stats: { atk: 4, def: 0, hp: 10 },
    precoVenda: 50
  }
},
{
  nome: "Cajado de Ferro Espectral",
  icone: "🪄",
  categoria: "equipamento",
  descricao: "Arma: +9 ATK, +16 HP",
  nivelMinimo: 10,
  custoOuro: 280,
  classePermitida: "mago",
  ingredientes: [
    { nome: "Minério de Ferro", quantidade: 3 },
    { nome: "Pepita de Prata", quantidade: 1 },
    { nome: "Ectoplasma", quantidade: 2 },
    { nome: "Amuleto Quebrado", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Cajado de Ferro Espectral",
    icone: "🪄",
    slot: "arma",
    stats: { atk: 9, def: 0, hp: 16 },
    precoVenda: 140
  }
},
{
  nome: "Orbe de Aço do Deserto",
  icone: "🔮",
  categoria: "equipamento",
  descricao: "Arma: +17 ATK, +28 HP",
  nivelMinimo: 19,
  custoOuro: 650,
  classePermitida: "mago",
  ingredientes: [
    { nome: "Minério de Aço", quantidade: 3 },
    { nome: "Areia Encantada", quantidade: 2 },
    { nome: "Vidro do Deserto", quantidade: 2 },
    { nome: "Presas de Cristal", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Orbe de Aço do Deserto",
    icone: "🔮",
    slot: "arma",
    stats: { atk: 17, def: 0, hp: 28 },
    precoVenda: 325
  }
},
{
  nome: "Cajado de Mithril Sombrio",
  icone: "🪄",
  categoria: "equipamento",
  descricao: "Arma: +26 ATK, +42 HP",
  nivelMinimo: 28,
  custoOuro: 1200,
  classePermitida: "mago",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 4 },
    { nome: "Fragmento de Oricalco", quantidade: 1 },
    { nome: "Orbe Sombrio", quantidade: 1 },
    { nome: "Essência da Escuridão", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Cajado de Mithril Sombrio",
    icone: "🪄",
    slot: "arma",
    stats: { atk: 26, def: 0, hp: 42 },
    precoVenda: 600
  }
},
{
  nome: "Cajado Astral do Observador",
  icone: "🌟",
  categoria: "equipamento",
  descricao: "Arma: +38 ATK, +65 HP",
  nivelMinimo: 37,
  custoOuro: 2200,
  classePermitida: "mago",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 5 },
    { nome: "Fragmento de Oricalco", quantidade: 3 },
    { nome: "Pupila Cósmica", quantidade: 2 },
    { nome: "Poeira Estelar", quantidade: 3 },
    { nome: "Cristal Cósmico", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Cajado Astral do Observador",
    icone: "🌟",
    slot: "arma",
    stats: { atk: 38, def: 0, hp: 65 },
    precoVenda: 1100
  }
},

/* ══════════════════════════════════════
   MAGO — ARMADURAS
══════════════════════════════════════ */

{
  nome: "Manto de Bronze Arcano",
  icone: "🧥",
  categoria: "equipamento",
  descricao: "Armadura: +2 ATK, +3 DEF, +14 HP",
  nivelMinimo: 3,
  custoOuro: 100,
  classePermitida: "mago",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 3 },
    { nome: "Minério de Estanho", quantidade: 1 },
    { nome: "Seda de Aranha", quantidade: 3 },
    { nome: "Essência Silvestre", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Manto de Bronze Arcano",
    icone: "🧥",
    slot: "armadura",
    stats: { atk: 2, def: 3, hp: 14 },
    precoVenda: 50
  }
},
{
  nome: "Manto de Ferro Rúnico",
  icone: "🧥",
  categoria: "equipamento",
  descricao: "Armadura: +4 ATK, +6 DEF, +24 HP",
  nivelMinimo: 10,
  custoOuro: 300,
  classePermitida: "mago",
  ingredientes: [
    { nome: "Minério de Ferro", quantidade: 4 },
    { nome: "Pepita de Prata", quantidade: 1 },
    { nome: "Ectoplasma", quantidade: 2 },
    { nome: "Núcleo de Pedra", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Manto de Ferro Rúnico",
    icone: "🧥",
    slot: "armadura",
    stats: { atk: 4, def: 6, hp: 24 },
    precoVenda: 150
  }
},
{
  nome: "Manto de Aço Cristalino",
  icone: "🧥",
  categoria: "equipamento",
  descricao: "Armadura: +6 ATK, +10 DEF, +38 HP",
  nivelMinimo: 19,
  custoOuro: 700,
  classePermitida: "mago",
  ingredientes: [
    { nome: "Minério de Aço", quantidade: 4 },
    { nome: "Fragmento de Cristal", quantidade: 2 },
    { nome: "Pó Luminoso", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Manto de Aço Cristalino",
    icone: "🧥",
    slot: "armadura",
    stats: { atk: 6, def: 10, hp: 38 },
    precoVenda: 350
  }
},
{
  nome: "Manto de Mithril do Vazio",
  icone: "🧥",
  categoria: "equipamento",
  descricao: "Armadura: +8 ATK, +14 DEF, +55 HP",
  nivelMinimo: 28,
  custoOuro: 1300,
  classePermitida: "mago",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 4 },
    { nome: "Fragmento de Oricalco", quantidade: 1 },
    { nome: "Fio Obscuro", quantidade: 2 },
    { nome: "Essência da Escuridão", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Manto de Mithril do Vazio",
    icone: "🧥",
    slot: "armadura",
    stats: { atk: 8, def: 14, hp: 55 },
    precoVenda: 650
  }
},
{
  nome: "Manto Celeste do Cosmos",
  icone: "🧥",
  categoria: "equipamento",
  descricao: "Armadura: +12 ATK, +18 DEF, +82 HP",
  nivelMinimo: 37,
  custoOuro: 2400,
  classePermitida: "mago",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 5 },
    { nome: "Fragmento de Oricalco", quantidade: 3 },
    { nome: "Essência Astral", quantidade: 2 },
    { nome: "Cristal Cósmico", quantidade: 1 },
    { nome: "Lágrima Estelar", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Manto Celeste do Cosmos",
    icone: "🧥",
    slot: "armadura",
    stats: { atk: 12, def: 18, hp: 82 },
    precoVenda: 1200
  }
},

/* ══════════════════════════════════════
   MAGO — ELMOS
══════════════════════════════════════ */

{
  nome: "Chapéu de Bronze das Runas",
  icone: "🎩",
  categoria: "equipamento",
  descricao: "Elmo: +2 ATK, +2 DEF, +10 HP",
  nivelMinimo: 3,
  custoOuro: 80,
  classePermitida: "mago",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 2 },
    { nome: "Essência Silvestre", quantidade: 2 },
    { nome: "Moeda Antiga", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Chapéu de Bronze das Runas",
    icone: "🎩",
    slot: "elmo",
    stats: { atk: 2, def: 2, hp: 10 },
    precoVenda: 40
  }
},
{
  nome: "Capuz de Ferro Espectral",
  icone: "🎩",
  categoria: "equipamento",
  descricao: "Elmo: +4 ATK, +4 DEF, +18 HP",
  nivelMinimo: 10,
  custoOuro: 220,
  classePermitida: "mago",
  ingredientes: [
    { nome: "Minério de Ferro", quantidade: 2 },
    { nome: "Ectoplasma", quantidade: 2 },
    { nome: "Amuleto Quebrado", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Capuz de Ferro Espectral",
    icone: "🎩",
    slot: "elmo",
    stats: { atk: 4, def: 4, hp: 18 },
    precoVenda: 110
  }
},
{
  nome: "Tiara de Aço do Deserto",
  icone: "🎩",
  categoria: "equipamento",
  descricao: "Elmo: +6 ATK, +6 DEF, +28 HP",
  nivelMinimo: 19,
  custoOuro: 480,
  classePermitida: "mago",
  ingredientes: [
    { nome: "Minério de Aço", quantidade: 2 },
    { nome: "Vidro do Deserto", quantidade: 2 },
    { nome: "Areia Encantada", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Tiara de Aço do Deserto",
    icone: "🎩",
    slot: "elmo",
    stats: { atk: 6, def: 6, hp: 28 },
    precoVenda: 240
  }
},
{
  nome: "Coroa de Mithril Profana",
  icone: "👑",
  categoria: "equipamento",
  descricao: "Elmo: +8 ATK, +9 DEF, +40 HP",
  nivelMinimo: 28,
  custoOuro: 900,
  classePermitida: "mago",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 2 },
    { nome: "Tombo Profano", quantidade: 1 },
    { nome: "Orbe Sombrio", quantidade: 1 },
    { nome: "Essência da Escuridão", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Coroa de Mithril Profana",
    icone: "👑",
    slot: "elmo",
    stats: { atk: 8, def: 9, hp: 40 },
    precoVenda: 450
  }
},
{
  nome: "Diadema Astral Supremo",
  icone: "👑",
  categoria: "equipamento",
  descricao: "Elmo: +11 ATK, +12 DEF, +58 HP",
  nivelMinimo: 37,
  custoOuro: 1700,
  classePermitida: "mago",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 3 },
    { nome: "Fragmento de Oricalco", quantidade: 2 },
    { nome: "Pupila Cósmica", quantidade: 1 },
    { nome: "Essência Astral", quantidade: 1 },
    { nome: "Auréola Quebrada", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Diadema Astral Supremo",
    icone: "👑",
    slot: "elmo",
    stats: { atk: 11, def: 12, hp: 58 },
    precoVenda: 850
  }
},

/* ══════════════════════════════════════
   MAGO — BOTAS
══════════════════════════════════════ */

{
  nome: "Botas de Bronze da Névoa",
  icone: "👢",
  categoria: "equipamento",
  descricao: "Botas: +2 ATK, +2 DEF, +8 HP",
  nivelMinimo: 3,
  custoOuro: 70,
  classePermitida: "mago",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 2 },
    { nome: "Seda de Aranha", quantidade: 2 },
    { nome: "Essência Silvestre", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Botas de Bronze da Névoa",
    icone: "👢",
    slot: "botas",
    stats: { atk: 2, def: 2, hp: 8 },
    precoVenda: 35
  }
},
{
  nome: "Botas de Ferro Etéreas",
  icone: "👢",
  categoria: "equipamento",
  descricao: "Botas: +4 ATK, +4 DEF, +14 HP",
  nivelMinimo: 10,
  custoOuro: 200,
  classePermitida: "mago",
  ingredientes: [
    { nome: "Minério de Ferro", quantidade: 2 },
    { nome: "Ectoplasma", quantidade: 2 },
    { nome: "Asa Ressecada", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Botas de Ferro Etéreas",
    icone: "👢",
    slot: "botas",
    stats: { atk: 4, def: 4, hp: 14 },
    precoVenda: 100
  }
},
{
  nome: "Botas de Aço de Cristal",
  icone: "👢",
  categoria: "equipamento",
  descricao: "Botas: +6 ATK, +6 DEF, +22 HP",
  nivelMinimo: 19,
  custoOuro: 450,
  classePermitida: "mago",
  ingredientes: [
    { nome: "Minério de Aço", quantidade: 2 },
    { nome: "Fragmento de Cristal", quantidade: 2 },
    { nome: "Pó Luminoso", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Botas de Aço de Cristal",
    icone: "👢",
    slot: "botas",
    stats: { atk: 6, def: 6, hp: 22 },
    precoVenda: 225
  }
},
{
  nome: "Botas de Mithril do Eclipse",
  icone: "👢",
  categoria: "equipamento",
  descricao: "Botas: +8 ATK, +8 DEF, +34 HP",
  nivelMinimo: 28,
  custoOuro: 850,
  classePermitida: "mago",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 2 },
    { nome: "Essência da Escuridão", quantidade: 2 },
    { nome: "Fio Obscuro", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Botas de Mithril do Eclipse",
    icone: "👢",
    slot: "botas",
    stats: { atk: 8, def: 8, hp: 34 },
    precoVenda: 425
  }
},
{
  nome: "Botas Astrais da Nebulosa",
  icone: "👢",
  categoria: "equipamento",
  descricao: "Botas: +11 ATK, +11 DEF, +50 HP",
  nivelMinimo: 37,
  custoOuro: 1600,
  classePermitida: "mago",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 3 },
    { nome: "Fragmento de Oricalco", quantidade: 2 },
    { nome: "Núcleo Nebular", quantidade: 1 },
    { nome: "Poeira Estelar", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Botas Astrais da Nebulosa",
    icone: "👢",
    slot: "botas",
    stats: { atk: 11, def: 11, hp: 50 },
    precoVenda: 800
  }
},

/* ══════════════════════════════════════
   MAGO — ANÉIS
══════════════════════════════════════ */

{
  nome: "Anel de Bronze Arcano",
  icone: "💍",
  categoria: "equipamento",
  descricao: "Anel: +5 ATK, +8 HP",
  nivelMinimo: 3,
  custoOuro: 70,
  classePermitida: "mago",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 1 },
    { nome: "Moeda Antiga", quantidade: 2 },
    { nome: "Essência Silvestre", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Anel de Bronze Arcano",
    icone: "💍",
    slot: "anel",
    stats: { atk: 5, def: 0, hp: 8 },
    precoVenda: 35
  }
},
{
  nome: "Anel de Ferro Rúnico",
  icone: "💍",
  categoria: "equipamento",
  descricao: "Anel: +10 ATK, +14 HP",
  nivelMinimo: 10,
  custoOuro: 180,
  classePermitida: "mago",
  ingredientes: [
    { nome: "Minério de Ferro", quantidade: 2 },
    { nome: "Pepita de Prata", quantidade: 1 },
    { nome: "Ectoplasma", quantidade: 1 },
    { nome: "Núcleo de Pedra", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Anel de Ferro Rúnico",
    icone: "💍",
    slot: "anel",
    stats: { atk: 10, def: 0, hp: 14 },
    precoVenda: 90
  }
},
{
  nome: "Anel de Aço do Vórtice",
  icone: "💍",
  categoria: "equipamento",
  descricao: "Anel: +16 ATK, +4 DEF, +22 HP",
  nivelMinimo: 19,
  custoOuro: 420,
  classePermitida: "mago",
  ingredientes: [
    { nome: "Minério de Aço", quantidade: 2 },
    { nome: "Vidro do Deserto", quantidade: 2 },
    { nome: "Areia Encantada", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Anel de Aço do Vórtice",
    icone: "💍",
    slot: "anel",
    stats: { atk: 16, def: 4, hp: 22 },
    precoVenda: 210
  }
},
{
  nome: "Anel de Mithril Obscuro",
  icone: "💍",
  categoria: "equipamento",
  descricao: "Anel: +22 ATK, +6 DEF, +34 HP",
  nivelMinimo: 28,
  custoOuro: 780,
  classePermitida: "mago",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 2 },
    { nome: "Orbe Sombrio", quantidade: 1 },
    { nome: "Essência da Escuridão", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Anel de Mithril Obscuro",
    icone: "💍",
    slot: "anel",
    stats: { atk: 22, def: 6, hp: 34 },
    precoVenda: 390
  }
},
{
  nome: "Anel Celeste da Constelação",
  icone: "💍",
  categoria: "equipamento",
  descricao: "Anel: +30 ATK, +8 DEF, +50 HP",
  nivelMinimo: 37,
  custoOuro: 1500,
  classePermitida: "mago",
  ingredientes: [
    { nome: "Fragmento de Oricalco", quantidade: 2 },
    { nome: "Pupila Cósmica", quantidade: 1 },
    { nome: "Poeira Estelar", quantidade: 2 },
    { nome: "Cristal Cósmico", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Anel Celeste da Constelação",
    icone: "💍",
    slot: "anel",
    stats: { atk: 30, def: 8, hp: 50 },
    precoVenda: 750
  }
},

/* ══════════════════════════════════════
   MAGO — AMULETOS
══════════════════════════════════════ */

{
  nome: "Amuleto de Bronze do Espírito",
  icone: "📿",
  categoria: "equipamento",
  descricao: "Amuleto: +4 ATK, +10 HP",
  nivelMinimo: 3,
  custoOuro: 75,
  classePermitida: "mago",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 1 },
    { nome: "Essência Silvestre", quantidade: 2 },
    { nome: "Pena Noturna", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Amuleto de Bronze do Espírito",
    icone: "📿",
    slot: "amuleto",
    stats: { atk: 4, def: 0, hp: 10 },
    precoVenda: 37
  }
},
{
  nome: "Amuleto de Ferro da Névoa",
  icone: "📿",
  categoria: "equipamento",
  descricao: "Amuleto: +9 ATK, +3 DEF, +18 HP",
  nivelMinimo: 10,
  custoOuro: 190,
  classePermitida: "mago",
  ingredientes: [
    { nome: "Minério de Ferro", quantidade: 2 },
    { nome: "Ectoplasma", quantidade: 2 },
    { nome: "Amuleto Quebrado", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Amuleto de Ferro da Névoa",
    icone: "📿",
    slot: "amuleto",
    stats: { atk: 9, def: 3, hp: 18 },
    precoVenda: 95
  }
},
{
  nome: "Amuleto de Aço do Deserto",
  icone: "📿",
  categoria: "equipamento",
  descricao: "Amuleto: +14 ATK, +5 DEF, +28 HP",
  nivelMinimo: 19,
  custoOuro: 430,
  classePermitida: "mago",
  ingredientes: [
    { nome: "Minério de Aço", quantidade: 2 },
    { nome: "Areia Encantada", quantidade: 2 },
    { nome: "Presas de Cristal", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Amuleto de Aço do Deserto",
    icone: "📿",
    slot: "amuleto",
    stats: { atk: 14, def: 5, hp: 28 },
    precoVenda: 215
  }
},
{
  nome: "Amuleto de Mithril do Eclipse",
  icone: "📿",
  categoria: "equipamento",
  descricao: "Amuleto: +20 ATK, +7 DEF, +40 HP",
  nivelMinimo: 28,
  custoOuro: 800,
  classePermitida: "mago",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 2 },
    { nome: "Orbe Sombrio", quantidade: 1 },
    { nome: "Essência da Escuridão", quantidade: 2 },
    { nome: "Fio Obscuro", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Amuleto de Mithril do Eclipse",
    icone: "📿",
    slot: "amuleto",
    stats: { atk: 20, def: 7, hp: 40 },
    precoVenda: 400
  }
},
{
  nome: "Amuleto Astral do Infinito",
  icone: "📿",
  categoria: "equipamento",
  descricao: "Amuleto: +28 ATK, +10 DEF, +58 HP",
  nivelMinimo: 37,
  custoOuro: 1550,
  classePermitida: "mago",
  ingredientes: [
    { nome: "Fragmento de Oricalco", quantidade: 2 },
    { nome: "Essência Astral", quantidade: 2 },
    { nome: "Pupila Cósmica", quantidade: 1 },
    { nome: "Lágrima Estelar", quantidade: 1 }
  ],
 resultado: {
    tipo: "equipamento",
    nome: "Amuleto Astral do Infinito",
    icone: "📿",
    slot: "amuleto",
    stats: { atk: 28, def: 10, hp: 58 },
    precoVenda: 775
  }
},

/* ══════════════════════════════════════
   LADINO — ARMAS
══════════════════════════════════════ */

{
  nome: "Adaga de Bronze Sombria",
  icone: "🗡️",
  categoria: "equipamento",
  descricao: "Arma: +7 ATK",
  nivelMinimo: 3,
  custoOuro: 100,
  classePermitida: "ladino",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 2 },
    { nome: "Minério de Estanho", quantidade: 2 },
    { nome: "Seda de Aranha", quantidade: 2 },
    { nome: "Pena Noturna", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Adaga de Bronze Sombria",
    icone: "🗡️",
    slot: "arma",
    stats: { atk: 7, def: 0, hp: 0 },
    precoVenda: 50
  }
},
{
  nome: "Adaga de Ferro Venenosa",
  icone: "🗡️",
  categoria: "equipamento",
  descricao: "Arma: +14 ATK",
  nivelMinimo: 10,
  custoOuro: 280,
  classePermitida: "ladino",
  ingredientes: [
    { nome: "Minério de Ferro", quantidade: 3 },
    { nome: "Pepita de Prata", quantidade: 1 },
    { nome: "Ferrão Venenoso", quantidade: 2 },
    { nome: "Glândula Tóxica", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Adaga de Ferro Venenosa",
    icone: "🗡️",
    slot: "arma",
    stats: { atk: 14, def: 0, hp: 0 },
    precoVenda: 140
  }
},
{
  nome: "Lâmina de Aço das Sombras",
  icone: "🗡️",
  categoria: "equipamento",
  descricao: "Arma: +23 ATK, +2 DEF",
  nivelMinimo: 19,
  custoOuro: 650,
  classePermitida: "ladino",
  ingredientes: [
    { nome: "Minério de Aço", quantidade: 3 },
    { nome: "Sangue Coagulado", quantidade: 2 },
    { nome: "Asa Membranosa", quantidade: 1 },
    { nome: "Mucosa Ácida", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Lâmina de Aço das Sombras",
    icone: "🗡️",
    slot: "arma",
    stats: { atk: 23, def: 2, hp: 0 },
    precoVenda: 325
  }
},
{
  nome: "Punhal de Mithril Vampírico",
  icone: "🗡️",
  categoria: "equipamento",
  descricao: "Arma: +31 ATK, roubo de vida 4%",
  nivelMinimo: 28,
  custoOuro: 1200,
  classePermitida: "ladino",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 4 },
    { nome: "Fragmento de Oricalco", quantidade: 1 },
    { nome: "Presa de Vampiro", quantidade: 2 },
    { nome: "Sangue Noturno", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Punhal de Mithril Vampírico",
    icone: "🗡️",
    slot: "arma",
    stats: { atk: 31, def: 0, hp: 0, rouboVida: 4 },
    precoVenda: 600
  }
},
{
  nome: "Lâmina Astral do Vazio",
  icone: "🗡️",
  categoria: "equipamento",
  descricao: "Arma: +43 ATK, +2 DEF, roubo de vida 6%",
  nivelMinimo: 37,
  custoOuro: 2200,
  classePermitida: "ladino",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 5 },
    { nome: "Fragmento de Oricalco", quantidade: 3 },
    { nome: "Essência da Escuridão", quantidade: 2 },
    { nome: "Fio Obscuro", quantidade: 2 },
    { nome: "Fragmento da Realidade", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Lâmina Astral do Vazio",
    icone: "🗡️",
    slot: "arma",
    stats: { atk: 43, def: 2, hp: 0, rouboVida: 6 },
    precoVenda: 1100
  }
},

/* ══════════════════════════════════════
   LADINO — ARMADURAS
══════════════════════════════════════ */

{
  nome: "Armadura Leve de Bronze",
  icone: "🥋",
  categoria: "equipamento",
  descricao: "Armadura: +4 ATK, +3 DEF, +8 HP",
  nivelMinimo: 3,
  custoOuro: 100,
  classePermitida: "ladino",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 3 },
    { nome: "Minério de Estanho", quantidade: 1 },
    { nome: "Seda de Aranha", quantidade: 2 },
    { nome: "Escama Pantanosa", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Armadura Leve de Bronze",
    icone: "🥋",
    slot: "armadura",
    stats: { atk: 4, def: 3, hp: 8 },
    precoVenda: 50
  }
},
{
  nome: "Armadura de Ferro do Veneno",
  icone: "🥋",
  categoria: "equipamento",
  descricao: "Armadura: +7 ATK, +6 DEF, +16 HP",
  nivelMinimo: 10,
  custoOuro: 300,
  classePermitida: "ladino",
  ingredientes: [
    { nome: "Minério de Ferro", quantidade: 4 },
    { nome: "Ferrão Venenoso", quantidade: 2 },
    { nome: "Glândula Tóxica", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Armadura de Ferro do Veneno",
    icone: "🥋",
    slot: "armadura",
    stats: { atk: 7, def: 6, hp: 16 },
    precoVenda: 150
  }
},
{
  nome: "Armadura de Aço Furtiva",
  icone: "🥋",
  categoria: "equipamento",
  descricao: "Armadura: +10 ATK, +9 DEF, +26 HP",
  nivelMinimo: 19,
  custoOuro: 700,
  classePermitida: "ladino",
  ingredientes: [
    { nome: "Minério de Aço", quantidade: 4 },
    { nome: "Asa Membranosa", quantidade: 2 },
    { nome: "Sangue Coagulado", quantidade: 1 },
    { nome: "Couro de Troll", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Armadura de Aço Furtiva",
    icone: "🥋",
    slot: "armadura",
    stats: { atk: 10, def: 9, hp: 26 },
    precoVenda: 350
  }
},
{
  nome: "Armadura de Mithril do Crepúsculo",
  icone: "🥋",
  categoria: "equipamento",
  descricao: "Armadura: +14 ATK, +12 DEF, +40 HP",
  nivelMinimo: 28,
  custoOuro: 1300,
  classePermitida: "ladino",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 4 },
    { nome: "Fragmento de Sombra", quantidade: 2 },
    { nome: "Véu da Morte", quantidade: 1 },
    { nome: "Presa de Vampiro", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Armadura de Mithril do Crepúsculo",
    icone: "🥋",
    slot: "armadura",
    stats: { atk: 14, def: 12, hp: 40 },
    precoVenda: 650
  }
},
{
  nome: "Armadura Astral da Ruptura",
  icone: "🥋",
  categoria: "equipamento",
  descricao: "Armadura: +19 ATK, +16 DEF, +62 HP",
  nivelMinimo: 37,
  custoOuro: 2400,
  classePermitida: "ladino",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 5 },
    { nome: "Fragmento de Oricalco", quantidade: 3 },
    { nome: "Essência da Escuridão", quantidade: 2 },
    { nome: "Fragmento da Realidade", quantidade: 1 },
    { nome: "Poeira Estelar", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Armadura Astral da Ruptura",
    icone: "🥋",
    slot: "armadura",
    stats: { atk: 19, def: 16, hp: 62 },
    precoVenda: 1200
  }
},

/* ══════════════════════════════════════
   LADINO — ELMOS
══════════════════════════════════════ */

{
  nome: "Capuz de Bronze do Infiltrador",
  icone: "🪖",
  categoria: "equipamento",
  descricao: "Elmo: +2 ATK, +2 DEF",
  nivelMinimo: 3,
  custoOuro: 80,
  classePermitida: "ladino",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 2 },
    { nome: "Pena Noturna", quantidade: 2 },
    { nome: "Escama Pantanosa", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Capuz de Bronze do Infiltrador",
    icone: "🪖",
    slot: "elmo",
    stats: { atk: 2, def: 2, hp: 0 },
    precoVenda: 40
  }
},
{
  nome: "Capuz de Ferro Tóxico",
  icone: "🪖",
  categoria: "equipamento",
  descricao: "Elmo: +4 ATK, +4 DEF, +10 HP",
  nivelMinimo: 10,
  custoOuro: 220,
  classePermitida: "ladino",
  ingredientes: [
    { nome: "Minério de Ferro", quantidade: 2 },
    { nome: "Ferrão Venenoso", quantidade: 2 },
    { nome: "Glândula Tóxica", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Capuz de Ferro Tóxico",
    icone: "🪖",
    slot: "elmo",
    stats: { atk: 4, def: 4, hp: 10 },
    precoVenda: 110
  }
},
{
  nome: "Capuz de Aço Escarlate",
  icone: "🪖",
  categoria: "equipamento",
  descricao: "Elmo: +6 ATK, +6 DEF, +18 HP",
  nivelMinimo: 19,
  custoOuro: 480,
  classePermitida: "ladino",
  ingredientes: [
    { nome: "Minério de Aço", quantidade: 2 },
    { nome: "Sangue Coagulado", quantidade: 2 },
    { nome: "Asa Membranosa", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Capuz de Aço Escarlate",
    icone: "🪖",
    slot: "elmo",
    stats: { atk: 6, def: 6, hp: 18 },
    precoVenda: 240
  }
},
{
  nome: "Capuz de Mithril da Noite",
  icone: "🪖",
  categoria: "equipamento",
  descricao: "Elmo: +8 ATK, +8 DEF, +28 HP",
  nivelMinimo: 28,
  custoOuro: 900,
  classePermitida: "ladino",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 2 },
    { nome: "Fragmento de Sombra", quantidade: 2 },
    { nome: "Presa de Vampiro", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Capuz de Mithril da Noite",
    icone: "🪖",
    slot: "elmo",
    stats: { atk: 8, def: 8, hp: 28 },
    precoVenda: 450
  }
},
{
  nome: "Capuz Astral do Vácuo",
  icone: "🪖",
  categoria: "equipamento",
  descricao: "Elmo: +11 ATK, +11 DEF, +42 HP",
  nivelMinimo: 37,
  custoOuro: 1700,
  classePermitida: "ladino",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 3 },
    { nome: "Fragmento de Oricalco", quantidade: 2 },
    { nome: "Fio Obscuro", quantidade: 2 },
    { nome: "Fragmento da Realidade", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Capuz Astral do Vácuo",
    icone: "🪖",
    slot: "elmo",
    stats: { atk: 11, def: 11, hp: 42 },
    precoVenda: 850
  }
},

/* ══════════════════════════════════════
   LADINO — BOTAS
══════════════════════════════════════ */

{
  nome: "Botas de Bronze Furtivas",
  icone: "👢",
  categoria: "equipamento",
  descricao: "Botas: +3 ATK, +2 DEF",
  nivelMinimo: 3,
  custoOuro: 70,
  classePermitida: "ladino",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 2 },
    { nome: "Seda de Aranha", quantidade: 2 },
    { nome: "Pele de Lobo", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Botas de Bronze Furtivas",
    icone: "👢",
    slot: "botas",
    stats: { atk: 3, def: 2, hp: 0 },
    precoVenda: 35
  }
},
{
  nome: "Botas de Ferro do Veneno",
  icone: "👢",
  categoria: "equipamento",
  descricao: "Botas: +6 ATK, +4 DEF, +8 HP",
  nivelMinimo: 10,
  custoOuro: 200,
  classePermitida: "ladino",
  ingredientes: [
    { nome: "Minério de Ferro", quantidade: 2 },
    { nome: "Ferrão Venenoso", quantidade: 2 },
    { nome: "Escama Pantanosa", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Botas de Ferro do Veneno",
    icone: "👢",
    slot: "botas",
    stats: { atk: 6, def: 4, hp: 8 },
    precoVenda: 100
  }
},
{
  nome: "Botas de Aço da Emboscada",
  icone: "👢",
  categoria: "equipamento",
  descricao: "Botas: +9 ATK, +6 DEF, +14 HP",
  nivelMinimo: 19,
  custoOuro: 450,
  classePermitida: "ladino",
  ingredientes: [
    { nome: "Minério de Aço", quantidade: 2 },
    { nome: "Asa Membranosa", quantidade: 2 },
    { nome: "Mucosa Ácida", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Botas de Aço da Emboscada",
    icone: "👢",
    slot: "botas",
    stats: { atk: 9, def: 6, hp: 14 },
    precoVenda: 225
  }
},
{
  nome: "Botas de Mithril da Penumbra",
  icone: "👢",
  categoria: "equipamento",
  descricao: "Botas: +12 ATK, +8 DEF, +22 HP",
  nivelMinimo: 28,
  custoOuro: 850,
  classePermitida: "ladino",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 2 },
    { nome: "Fragmento de Sombra", quantidade: 2 },
    { nome: "Sangue Noturno", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Botas de Mithril da Penumbra",
    icone: "👢",
    slot: "botas",
    stats: { atk: 12, def: 8, hp: 22 },
    precoVenda: 425
  }
},
{
  nome: "Botas Astrais da Fenda",
  icone: "👢",
  categoria: "equipamento",
  descricao: "Botas: +16 ATK, +10 DEF, +34 HP",
  nivelMinimo: 37,
  custoOuro: 1600,
  classePermitida: "ladino",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 3 },
    { nome: "Fragmento de Oricalco", quantidade: 2 },
    { nome: "Fio Obscuro", quantidade: 2 },
    { nome: "Essência da Escuridão", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Botas Astrais da Fenda",
    icone: "👢",
    slot: "botas",
    stats: { atk: 16, def: 10, hp: 34 },
    precoVenda: 800
  }
},

/* ══════════════════════════════════════
   LADINO — ANÉIS
══════════════════════════════════════ */

{
  nome: "Anel de Bronze da Emboscada",
  icone: "💍",
  categoria: "equipamento",
  descricao: "Anel: +5 ATK, +1 DEF",
  nivelMinimo: 3,
  custoOuro: 70,
  classePermitida: "ladino",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 1 },
    { nome: "Moeda Antiga", quantidade: 2 },
    { nome: "Pena Noturna", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Anel de Bronze da Emboscada",
    icone: "💍",
    slot: "anel",
    stats: { atk: 5, def: 1, hp: 0 },
    precoVenda: 35
  }
},
{
  nome: "Anel de Ferro Envenenado",
  icone: "💍",
  categoria: "equipamento",
  descricao: "Anel: +10 ATK, +2 DEF",
  nivelMinimo: 10,
  custoOuro: 180,
  classePermitida: "ladino",
  ingredientes: [
    { nome: "Minério de Ferro", quantidade: 2 },
    { nome: "Ferrão Venenoso", quantidade: 2 },
    { nome: "Glândula Tóxica", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Anel de Ferro Envenenado",
    icone: "💍",
    slot: "anel",
    stats: { atk: 10, def: 2, hp: 0 },
    precoVenda: 90
  }
},
{
  nome: "Anel de Aço da Sombra",
  icone: "💍",
  categoria: "equipamento",
  descricao: "Anel: +16 ATK, +4 DEF, +8 HP",
  nivelMinimo: 19,
  custoOuro: 420,
  classePermitida: "ladino",
  ingredientes: [
    { nome: "Minério de Aço", quantidade: 2 },
    { nome: "Sangue Coagulado", quantidade: 2 },
    { nome: "Asa Membranosa", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Anel de Aço da Sombra",
    icone: "💍",
    slot: "anel",
    stats: { atk: 16, def: 4, hp: 8 },
    precoVenda: 210
  }
},
{
  nome: "Anel de Mithril Vampírico",
  icone: "💍",
  categoria: "equipamento",
  descricao: "Anel: +22 ATK, +6 DEF, +14 HP",
  nivelMinimo: 28,
  custoOuro: 780,
  classePermitida: "ladino",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 2 },
    { nome: "Presa de Vampiro", quantidade: 2 },
    { nome: "Sangue Noturno", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Anel de Mithril Vampírico",
    icone: "💍",
    slot: "anel",
    stats: { atk: 22, def: 6, hp: 14 },
    precoVenda: 390
  }
},
{
  nome: "Anel Astral da Ruptura",
  icone: "💍",
  categoria: "equipamento",
  descricao: "Anel: +30 ATK, +8 DEF, +24 HP",
  nivelMinimo: 37,
  custoOuro: 1500,
  classePermitida: "ladino",
  ingredientes: [
    { nome: "Fragmento de Oricalco", quantidade: 2 },
    { nome: "Essência da Escuridão", quantidade: 2 },
    { nome: "Fragmento da Realidade", quantidade: 1 },
    { nome: "Poeira Estelar", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Anel Astral da Ruptura",
    icone: "💍",
    slot: "anel",
    stats: { atk: 30, def: 8, hp: 24 },
    precoVenda: 750
  }
},

/* ══════════════════════════════════════
   LADINO — AMULETOS
══════════════════════════════════════ */

{
  nome: "Amuleto de Bronze da Sombra",
  icone: "📿",
  categoria: "equipamento",
  descricao: "Amuleto: +4 ATK, +2 DEF, +4 HP",
  nivelMinimo: 3,
  custoOuro: 75,
  classePermitida: "ladino",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 1 },
    { nome: "Seda de Aranha", quantidade: 2 },
    { nome: "Pena Noturna", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Amuleto de Bronze da Sombra",
    icone: "📿",
    slot: "amuleto",
    stats: { atk: 4, def: 2, hp: 4 },
    precoVenda: 37
  }
},
{
  nome: "Amuleto de Ferro da Cobra",
  icone: "📿",
  categoria: "equipamento",
  descricao: "Amuleto: +9 ATK, +3 DEF, +10 HP",
  nivelMinimo: 10,
  custoOuro: 190,
  classePermitida: "ladino",
  ingredientes: [
    { nome: "Minério de Ferro", quantidade: 2 },
    { nome: "Escama Pantanosa", quantidade: 2 },
    { nome: "Glândula Tóxica", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Amuleto de Ferro da Cobra",
    icone: "📿",
    slot: "amuleto",
    stats: { atk: 9, def: 3, hp: 10 },
    precoVenda: 95
  }
},
{
  nome: "Amuleto de Aço do Predador",
  icone: "📿",
  categoria: "equipamento",
  descricao: "Amuleto: +14 ATK, +5 DEF, +18 HP",
  nivelMinimo: 19,
  custoOuro: 430,
  classePermitida: "ladino",
  ingredientes: [
    { nome: "Minério de Aço", quantidade: 2 },
    { nome: "Sangue Coagulado", quantidade: 1 },
    { nome: "Dente de Verme", quantidade: 1 },
    { nome: "Asa Membranosa", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Amuleto de Aço do Predador",
    icone: "📿",
    slot: "amuleto",
    stats: { atk: 14, def: 5, hp: 18 },
    precoVenda: 215
  }
},
{
  nome: "Amuleto de Mithril da Lua Negra",
  icone: "📿",
  categoria: "equipamento",
  descricao: "Amuleto: +20 ATK, +7 DEF, +28 HP",
  nivelMinimo: 28,
  custoOuro: 800,
  classePermitida: "ladino",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 2 },
    { nome: "Presa de Vampiro", quantidade: 1 },
    { nome: "Fragmento de Sombra", quantidade: 2 },
    { nome: "Véu da Morte", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Amuleto de Mithril da Lua Negra",
    icone: "📿",
    slot: "amuleto",
    stats: { atk: 20, def: 7, hp: 28 },
    precoVenda: 400
  }
},
{
  nome: "Amuleto Astral do Abismo",
  icone: "📿",
  categoria: "equipamento",
  descricao: "Amuleto: +28 ATK, +10 DEF, +42 HP",
  nivelMinimo: 37,
  custoOuro: 1550,
  classePermitida: "ladino",
  ingredientes: [
    { nome: "Fragmento de Oricalco", quantidade: 2 },
    { nome: "Essência da Escuridão", quantidade: 2 },
    { nome: "Fio Obscuro", quantidade: 2 },
    { nome: "Fragmento da Realidade", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Amuleto Astral do Abismo",
    icone: "📿",
    slot: "amuleto",
    stats: { atk: 28, def: 10, hp: 42 },
    precoVenda: 775
  }
}

/* ══════════════════════════════════════
   GUERREIRO — ARMAS
══════════════════════════════════════ */

,{
  nome: "Espada de Bronze",
  icone: "⚔️",
  categoria: "equipamento",
  descricao: "Arma: +6 ATK",
  nivelMinimo: 3,
  custoOuro: 100,
  classePermitida: "guerreiro",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 3 },
    { nome: "Minério de Estanho", quantidade: 2 },
    { nome: "Couro Grosso", quantidade: 1 },
    { nome: "Pele de Lobo", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Espada de Bronze",
    icone: "⚔️",
    slot: "arma",
    stats: { atk: 6, def: 0, hp: 0 },
    precoVenda: 50
  }
},
{
  nome: "Espada de Ferro",
  icone: "⚔️",
  categoria: "equipamento",
  descricao: "Arma: +13 ATK, +2 DEF",
  nivelMinimo: 10,
  custoOuro: 280,
  classePermitida: "guerreiro",
  ingredientes: [
    { nome: "Minério de Ferro", quantidade: 4 },
    { nome: "Pepita de Prata", quantidade: 1 },
    { nome: "Lâmina Orcish", quantidade: 2 },
    { nome: "Pele de Warg", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Espada de Ferro",
    icone: "⚔️",
    slot: "arma",
    stats: { atk: 13, def: 2, hp: 0 },
    precoVenda: 140
  }
},
{
  nome: "Machado de Aço",
  icone: "🪓",
  categoria: "equipamento",
  descricao: "Arma: +22 ATK, +3 DEF",
  nivelMinimo: 19,
  custoOuro: 650,
  classePermitida: "guerreiro",
  ingredientes: [
    { nome: "Minério de Aço", quantidade: 4 },
    { nome: "Pepita de Prata", quantidade: 2 },
    { nome: "Clava de Troll", quantidade: 1 },
    { nome: "Dente de Verme", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Machado de Aço",
    icone: "🪓",
    slot: "arma",
    stats: { atk: 22, def: 3, hp: 0 },
    precoVenda: 325
  }
},
{
  nome: "Lâmina Fantasma",
  icone: "⚔️",
  categoria: "equipamento",
  descricao: "Arma: +31 ATK, +4 DEF",
  nivelMinimo: 28,
  custoOuro: 1200,
  classePermitida: "guerreiro",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 4 },
    { nome: "Fragmento de Oricalco", quantidade: 1 },
    { nome: "Espada Espectral", quantidade: 1 },
    { nome: "Energia Fantasma", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Lâmina Fantasma",
    icone: "⚔️",
    slot: "arma",
    stats: { atk: 31, def: 4, hp: 0 },
    precoVenda: 600
  }
},
{
  nome: "Espada do Colosso",
  icone: "⚔️",
  categoria: "equipamento",
  descricao: "Arma: +42 ATK, +6 DEF, +18 HP",
  nivelMinimo: 37,
  custoOuro: 2200,
  classePermitida: "guerreiro",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 5 },
    { nome: "Fragmento de Oricalco", quantidade: 3 },
    { nome: "Punho Titânico", quantidade: 1 },
    { nome: "Rocha Primordial", quantidade: 2 },
    { nome: "Poeira Estelar", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Espada do Colosso",
    icone: "⚔️",
    slot: "arma",
    stats: { atk: 42, def: 6, hp: 18 },
    precoVenda: 1100
  }
},

/* ══════════════════════════════════════
   GUERREIRO — ARMADURAS
══════════════════════════════════════ */

{
  nome: "Armadura de Bronze Reforçada",
  icone: "🛡️",
  categoria: "equipamento",
  descricao: "Armadura: +2 ATK, +6 DEF, +15 HP",
  nivelMinimo: 3,
  custoOuro: 100,
  classePermitida: "guerreiro",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 4 },
    { nome: "Minério de Estanho", quantidade: 2 },
    { nome: "Couro Grosso", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Armadura de Bronze Reforçada",
    icone: "🛡️",
    slot: "armadura",
    stats: { atk: 2, def: 6, hp: 15 },
    precoVenda: 50
  }
},
{
  nome: "Cota de Ferro do Centauro",
  icone: "🛡️",
  categoria: "equipamento",
  descricao: "Armadura: +4 ATK, +12 DEF, +28 HP",
  nivelMinimo: 10,
  custoOuro: 300,
  classePermitida: "guerreiro",
  ingredientes: [
    { nome: "Minério de Ferro", quantidade: 5 },
    { nome: "Pepita de Prata", quantidade: 2 },
    { nome: "Ferradura Antiga", quantidade: 2 },
    { nome: "Pele de Warg", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Cota de Ferro do Centauro",
    icone: "🛡️",
    slot: "armadura",
    stats: { atk: 4, def: 12, hp: 28 },
    precoVenda: 150
  }
},
{
  nome: "Couraça de Aço das Profundezas",
  icone: "🛡️",
  categoria: "equipamento",
  descricao: "Armadura: +6 ATK, +18 DEF, +45 HP",
  nivelMinimo: 19,
  custoOuro: 700,
  classePermitida: "guerreiro",
  ingredientes: [
    { nome: "Minério de Aço", quantidade: 5 },
    { nome: "Pepita de Prata", quantidade: 2 },
    { nome: "Couro de Troll", quantidade: 2 },
    { nome: "Escama Rochosa", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Couraça de Aço das Profundezas",
    icone: "🛡️",
    slot: "armadura",
    stats: { atk: 6, def: 18, hp: 45 },
    precoVenda: 350
  }
},
{
  nome: "Armadura de Mithril Assombrada",
  icone: "🛡️",
  categoria: "equipamento",
  descricao: "Armadura: +8 ATK, +24 DEF, +65 HP",
  nivelMinimo: 28,
  custoOuro: 1300,
  classePermitida: "guerreiro",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 5 },
    { nome: "Fragmento de Oricalco", quantidade: 2 },
    { nome: "Armadura Fantasma", quantidade: 1 },
    { nome: "Objeto Amaldiçoado", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Armadura de Mithril Assombrada",
    icone: "🛡️",
    slot: "armadura",
    stats: { atk: 8, def: 24, hp: 65 },
    precoVenda: 650
  }
},
{
  nome: "Armadura Titânica do Trono",
  icone: "🛡️",
  categoria: "equipamento",
  descricao: "Armadura: +12 ATK, +32 DEF, +95 HP",
  nivelMinimo: 37,
  custoOuro: 2400,
  classePermitida: "guerreiro",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 6 },
    { nome: "Fragmento de Oricalco", quantidade: 3 },
    { nome: "Escudo Celestial", quantidade: 1 },
    { nome: "Rocha Primordial", quantidade: 2 },
    { nome: "Fragmento da Realidade", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Armadura Titânica do Trono",
    icone: "🛡️",
    slot: "armadura",
    stats: { atk: 12, def: 32, hp: 95 },
    precoVenda: 1200
  }
},

/* ══════════════════════════════════════
   GUERREIRO — ELMOS
══════════════════════════════════════ */

{
  nome: "Elmo de Bronze do Javali",
  icone: "⛑️",
  categoria: "equipamento",
  descricao: "Elmo: +1 ATK, +4 DEF, +10 HP",
  nivelMinimo: 3,
  custoOuro: 80,
  classePermitida: "guerreiro",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 2 },
    { nome: "Minério de Estanho", quantidade: 1 },
    { nome: "Couro Grosso", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Elmo de Bronze do Javali",
    icone: "⛑️",
    slot: "elmo",
    stats: { atk: 1, def: 4, hp: 10 },
    precoVenda: 40
  }
},
{
  nome: "Elmo de Ferro Orcish",
  icone: "⛑️",
  categoria: "equipamento",
  descricao: "Elmo: +2 ATK, +8 DEF, +18 HP",
  nivelMinimo: 10,
  custoOuro: 220,
  classePermitida: "guerreiro",
  ingredientes: [
    { nome: "Minério de Ferro", quantidade: 3 },
    { nome: "Pepita de Prata", quantidade: 1 },
    { nome: "Lâmina Orcish", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Elmo de Ferro Orcish",
    icone: "⛑️",
    slot: "elmo",
    stats: { atk: 2, def: 8, hp: 18 },
    precoVenda: 110
  }
},
{
  nome: "Elmo de Aço Rochoso",
  icone: "⛑️",
  categoria: "equipamento",
  descricao: "Elmo: +3 ATK, +12 DEF, +30 HP",
  nivelMinimo: 19,
  custoOuro: 480,
  classePermitida: "guerreiro",
  ingredientes: [
    { nome: "Minério de Aço", quantidade: 3 },
    { nome: "Escama Rochosa", quantidade: 2 },
    { nome: "Fragmento de Granito", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Elmo de Aço Rochoso",
    icone: "⛑️",
    slot: "elmo",
    stats: { atk: 3, def: 12, hp: 30 },
    precoVenda: 240
  }
},
{
  nome: "Elmo de Mithril Fúnebre",
  icone: "⛑️",
  categoria: "equipamento",
  descricao: "Elmo: +4 ATK, +16 DEF, +44 HP",
  nivelMinimo: 28,
  custoOuro: 900,
  classePermitida: "guerreiro",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 3 },
    { nome: "Fragmento de Oricalco", quantidade: 1 },
    { nome: "Insígnia Assombrada", quantidade: 2 },
    { nome: "Véu Rasgado", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Elmo de Mithril Fúnebre",
    icone: "⛑️",
    slot: "elmo",
    stats: { atk: 4, def: 16, hp: 44 },
    precoVenda: 450
  }
},
{
  nome: "Elmo do Titã Corrompido",
  icone: "👑",
  categoria: "equipamento",
  descricao: "Elmo: +6 ATK, +22 DEF, +60 HP",
  nivelMinimo: 37,
  custoOuro: 1700,
  classePermitida: "guerreiro",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 4 },
    { nome: "Fragmento de Oricalco", quantidade: 2 },
    { nome: "Fragmento de Halo", quantidade: 1 },
    { nome: "Punho Titânico", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Elmo do Titã Corrompido",
    icone: "👑",
    slot: "elmo",
    stats: { atk: 6, def: 22, hp: 60 },
    precoVenda: 850
  }
},

/* ══════════════════════════════════════
   GUERREIRO — BOTAS
══════════════════════════════════════ */

{
  nome: "Botas de Bronze de Marcha",
  icone: "👢",
  categoria: "equipamento",
  descricao: "Botas: +2 ATK, +4 DEF, +6 HP",
  nivelMinimo: 3,
  custoOuro: 70,
  classePermitida: "guerreiro",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 2 },
    { nome: "Couro Grosso", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Botas de Bronze de Marcha",
    icone: "👢",
    slot: "botas",
    stats: { atk: 2, def: 4, hp: 6 },
    precoVenda: 35
  }
},
{
  nome: "Grevas de Ferro do Warg",
  icone: "👢",
  categoria: "equipamento",
  descricao: "Botas: +4 ATK, +8 DEF, +12 HP",
  nivelMinimo: 10,
  custoOuro: 200,
  classePermitida: "guerreiro",
  ingredientes: [
    { nome: "Minério de Ferro", quantidade: 3 },
    { nome: "Pele de Warg", quantidade: 2 },
    { nome: "Ferradura Antiga", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Grevas de Ferro do Warg",
    icone: "👢",
    slot: "botas",
    stats: { atk: 4, def: 8, hp: 12 },
    precoVenda: 100
  }
},
{
  nome: "Grevas de Aço Profundo",
  icone: "👢",
  categoria: "equipamento",
  descricao: "Botas: +5 ATK, +12 DEF, +20 HP",
  nivelMinimo: 19,
  custoOuro: 450,
  classePermitida: "guerreiro",
  ingredientes: [
    { nome: "Minério de Aço", quantidade: 3 },
    { nome: "Couro de Troll", quantidade: 1 },
    { nome: "Escama Rochosa", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Grevas de Aço Profundo",
    icone: "👢",
    slot: "botas",
    stats: { atk: 5, def: 12, hp: 20 },
    precoVenda: 225
  }
},
{
  nome: "Botas de Mithril Espectral",
  icone: "👢",
  categoria: "equipamento",
  descricao: "Botas: +7 ATK, +16 DEF, +30 HP",
  nivelMinimo: 28,
  custoOuro: 850,
  classePermitida: "guerreiro",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 3 },
    { nome: "Energia Fantasma", quantidade: 2 },
    { nome: "Presa de Vampiro", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Botas de Mithril Espectral",
    icone: "👢",
    slot: "botas",
    stats: { atk: 7, def: 16, hp: 30 },
    precoVenda: 425
  }
},
{
  nome: "Grevas Celestiais do Juízo",
  icone: "👢",
  categoria: "equipamento",
  descricao: "Botas: +10 ATK, +22 DEF, +46 HP",
  nivelMinimo: 37,
  custoOuro: 1600,
  classePermitida: "guerreiro",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 4 },
    { nome: "Fragmento de Oricalco", quantidade: 2 },
    { nome: "Trombeta do Juízo", quantidade: 1 },
    { nome: "Selo Divino Partido", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Grevas Celestiais do Juízo",
    icone: "👢",
    slot: "botas",
    stats: { atk: 10, def: 22, hp: 46 },
    precoVenda: 800
  }
},

/* ══════════════════════════════════════
   GUERREIRO — ANÉIS
══════════════════════════════════════ */

{
  nome: "Anel de Bronze do Combate",
  icone: "💍",
  categoria: "equipamento",
  descricao: "Anel: +4 ATK, +2 DEF",
  nivelMinimo: 3,
  custoOuro: 70,
  classePermitida: "guerreiro",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 2 },
    { nome: "Moeda Antiga", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Anel de Bronze do Combate",
    icone: "💍",
    slot: "anel",
    stats: { atk: 4, def: 2, hp: 0 },
    precoVenda: 35
  }
},
{
  nome: "Anel de Ferro do Orc",
  icone: "💍",
  categoria: "equipamento",
  descricao: "Anel: +8 ATK, +4 DEF",
  nivelMinimo: 10,
  custoOuro: 180,
  classePermitida: "guerreiro",
  ingredientes: [
    { nome: "Minério de Ferro", quantidade: 2 },
    { nome: "Lâmina Orcish", quantidade: 1 },
    { nome: "Chifre Rachado", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Anel de Ferro do Orc",
    icone: "💍",
    slot: "anel",
    stats: { atk: 8, def: 4, hp: 0 },
    precoVenda: 90
  }
},
{
  nome: "Anel de Aço do Berserker",
  icone: "💍",
  categoria: "equipamento",
  descricao: "Anel: +14 ATK, +6 DEF, +10 HP",
  nivelMinimo: 19,
  custoOuro: 420,
  classePermitida: "guerreiro",
  ingredientes: [
    { nome: "Minério de Aço", quantidade: 2 },
    { nome: "Sangue Coagulado", quantidade: 2 },
    { nome: "Clava de Troll", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Anel de Aço do Berserker",
    icone: "💍",
    slot: "anel",
    stats: { atk: 14, def: 6, hp: 10 },
    precoVenda: 210
  }
},
{
  nome: "Anel de Mithril Sanguíneo",
  icone: "💍",
  categoria: "equipamento",
  descricao: "Anel: +20 ATK, +8 DEF, +18 HP",
  nivelMinimo: 28,
  custoOuro: 780,
  classePermitida: "guerreiro",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 2 },
    { nome: "Presa de Vampiro", quantidade: 2 },
    { nome: "Sangue Noturno", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Anel de Mithril Sanguíneo",
    icone: "💍",
    slot: "anel",
    stats: { atk: 20, def: 8, hp: 18 },
    precoVenda: 390
  }
},
{
  nome: "Anel do Caos Titânico",
  icone: "💍",
  categoria: "equipamento",
  descricao: "Anel: +28 ATK, +12 DEF, +30 HP",
  nivelMinimo: 37,
  custoOuro: 1500,
  classePermitida: "guerreiro",
  ingredientes: [
    { nome: "Fragmento de Oricalco", quantidade: 2 },
    { nome: "Orbe do Caos", quantidade: 1 },
    { nome: "Punho Titânico", quantidade: 1 },
    { nome: "Fragmento da Realidade", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Anel do Caos Titânico",
    icone: "💍",
    slot: "anel",
    stats: { atk: 28, def: 12, hp: 30 },
    precoVenda: 750
  }
},

/* ══════════════════════════════════════
   GUERREIRO — AMULETOS
══════════════════════════════════════ */

{
  nome: "Amuleto de Bronze do Soldado",
  icone: "📿",
  categoria: "equipamento",
  descricao: "Amuleto: +4 ATK, +2 DEF, +8 HP",
  nivelMinimo: 3,
  custoOuro: 75,
  classePermitida: "guerreiro",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 2 },
    { nome: "Pele de Lobo", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Amuleto de Bronze do Soldado",
    icone: "📿",
    slot: "amuleto",
    stats: { atk: 4, def: 2, hp: 8 },
    precoVenda: 37
  }
},
{
  nome: "Amuleto de Ferro do Predador",
  icone: "📿",
  categoria: "equipamento",
  descricao: "Amuleto: +8 ATK, +4 DEF, +16 HP",
  nivelMinimo: 10,
  custoOuro: 190,
  classePermitida: "guerreiro",
  ingredientes: [
    { nome: "Minério de Ferro", quantidade: 2 },
    { nome: "Pele de Warg", quantidade: 2 },
    { nome: "Pena de Harpia", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Amuleto de Ferro do Predador",
    icone: "📿",
    slot: "amuleto",
    stats: { atk: 8, def: 4, hp: 16 },
    precoVenda: 95
  }
},
{
  nome: "Amuleto de Aço das Cavernas",
  icone: "📿",
  categoria: "equipamento",
  descricao: "Amuleto: +13 ATK, +6 DEF, +25 HP",
  nivelMinimo: 19,
  custoOuro: 430,
  classePermitida: "guerreiro",
  ingredientes: [
    { nome: "Minério de Aço", quantidade: 2 },
    { nome: "Couro de Troll", quantidade: 2 },
    { nome: "Dente de Verme", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Amuleto de Aço das Cavernas",
    icone: "📿",
    slot: "amuleto",
    stats: { atk: 13, def: 6, hp: 25 },
    precoVenda: 215
  }
},
{
  nome: "Amuleto de Mithril do Condenado",
  icone: "📿",
  categoria: "equipamento",
  descricao: "Amuleto: +18 ATK, +8 DEF, +36 HP",
  nivelMinimo: 28,
  custoOuro: 800,
  classePermitida: "guerreiro",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 2 },
    { nome: "Grilhão Partido", quantidade: 2 },
    { nome: "Lágrima do Condenado", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Amuleto de Mithril do Condenado",
    icone: "📿",
    slot: "amuleto",
    stats: { atk: 18, def: 8, hp: 36 },
    precoVenda: 400
  }
},
{
  nome: "Amuleto do Arauto Final",
  icone: "📿",
  categoria: "equipamento",
  descricao: "Amuleto: +25 ATK, +12 DEF, +55 HP",
  nivelMinimo: 37,
  custoOuro: 1550,
  classePermitida: "guerreiro",
  ingredientes: [
    { nome: "Fragmento de Oricalco", quantidade: 2 },
    { nome: "Trombeta do Juízo", quantidade: 1 },
    { nome: "Luz Profana", quantidade: 1 },
    { nome: "Poeira Estelar", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Amuleto do Arauto Final",
    icone: "📿",
    slot: "amuleto",
    stats: { atk: 25, def: 12, hp: 55 },
    precoVenda: 775
  }
},

/* ══════════════════════════════════════
   ARQUEIRO — ARMAS
══════════════════════════════════════ */

{
  nome: "Arco de Bronze do Caçador",
  icone: "🏹",
  categoria: "equipamento",
  descricao: "Arma: +6 ATK",
  nivelMinimo: 3,
  custoOuro: 100,
  classePermitida: "arqueiro",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 2 },
    { nome: "Minério de Estanho", quantidade: 2 },
    { nome: "Pele de Lobo", quantidade: 2 },
    { nome: "Pena Noturna", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Arco de Bronze do Caçador",
    icone: "🏹",
    slot: "arma",
    stats: { atk: 6, def: 0, hp: 0 },
    precoVenda: 50
  }
},
{
  nome: "Arco de Ferro da Harpia",
  icone: "🏹",
  categoria: "equipamento",
  descricao: "Arma: +13 ATK, +1 DEF",
  nivelMinimo: 10,
  custoOuro: 280,
  classePermitida: "arqueiro",
  ingredientes: [
    { nome: "Minério de Ferro", quantidade: 3 },
    { nome: "Pepita de Prata", quantidade: 1 },
    { nome: "Pena de Harpia", quantidade: 3 },
    { nome: "Olho de Basilisco", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Arco de Ferro da Harpia",
    icone: "🏹",
    slot: "arma",
    stats: { atk: 13, def: 1, hp: 0 },
    precoVenda: 140
  }
},
{
  nome: "Arco de Aço Cristalino",
  icone: "🏹",
  categoria: "equipamento",
  descricao: "Arma: +22 ATK, +4 HP",
  nivelMinimo: 19,
  custoOuro: 650,
  classePermitida: "arqueiro",
  ingredientes: [
    { nome: "Minério de Aço", quantidade: 3 },
    { nome: "Fragmento de Cristal", quantidade: 2 },
    { nome: "Asa Membranosa", quantidade: 2 },
    { nome: "Pó Luminoso", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Arco de Aço Cristalino",
    icone: "🏹",
    slot: "arma",
    stats: { atk: 22, def: 0, hp: 4 },
    precoVenda: 325
  }
},
{
  nome: "Arco de Mithril da Lua Morta",
  icone: "🏹",
  categoria: "equipamento",
  descricao: "Arma: +31 ATK, +2 DEF, +8 HP",
  nivelMinimo: 28,
  custoOuro: 1200,
  classePermitida: "arqueiro",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 4 },
    { nome: "Fragmento de Oricalco", quantidade: 1 },
    { nome: "Presa de Vampiro", quantidade: 1 },
    { nome: "Eco do Grito", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Arco de Mithril da Lua Morta",
    icone: "🏹",
    slot: "arma",
    stats: { atk: 31, def: 2, hp: 8 },
    precoVenda: 600
  }
},
{
  nome: "Arco Celeste do Observador",
  icone: "🏹",
  categoria: "equipamento",
  descricao: "Arma: +42 ATK, +4 DEF, +18 HP",
  nivelMinimo: 37,
  custoOuro: 2200,
  classePermitida: "arqueiro",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 5 },
    { nome: "Fragmento de Oricalco", quantidade: 3 },
    { nome: "Pupila Cósmica", quantidade: 2 },
    { nome: "Lágrima Estelar", quantidade: 1 },
    { nome: "Asa Divina Corrompida", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Arco Celeste do Observador",
    icone: "🏹",
    slot: "arma",
    stats: { atk: 42, def: 4, hp: 18 },
    precoVenda: 1100
  }
},

/* ══════════════════════════════════════
   ARQUEIRO — ARMADURAS
══════════════════════════════════════ */

{
  nome: "Armadura Leve de Bronze",
  icone: "🥋",
  categoria: "equipamento",
  descricao: "Armadura: +3 ATK, +4 DEF, +10 HP",
  nivelMinimo: 3,
  custoOuro: 100,
  classePermitida: "arqueiro",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 3 },
    { nome: "Minério de Estanho", quantidade: 1 },
    { nome: "Pele de Lobo", quantidade: 2 },
    { nome: "Seda de Aranha", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Armadura Leve de Bronze",
    icone: "🥋",
    slot: "armadura",
    stats: { atk: 3, def: 4, hp: 10 },
    precoVenda: 50
  }
},
{
  nome: "Armadura de Ferro do Batedor",
  icone: "🥋",
  categoria: "equipamento",
  descricao: "Armadura: +6 ATK, +8 DEF, +18 HP",
  nivelMinimo: 10,
  custoOuro: 300,
  classePermitida: "arqueiro",
  ingredientes: [
    { nome: "Minério de Ferro", quantidade: 4 },
    { nome: "Pena de Harpia", quantidade: 2 },
    { nome: "Pele de Warg", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Armadura de Ferro do Batedor",
    icone: "🥋",
    slot: "armadura",
    stats: { atk: 6, def: 8, hp: 18 },
    precoVenda: 150
  }
},
{
  nome: "Armadura de Aço das Profundezas",
  icone: "🥋",
  categoria: "equipamento",
  descricao: "Armadura: +9 ATK, +12 DEF, +30 HP",
  nivelMinimo: 19,
  custoOuro: 700,
  classePermitida: "arqueiro",
  ingredientes: [
    { nome: "Minério de Aço", quantidade: 4 },
    { nome: "Asa Membranosa", quantidade: 2 },
    { nome: "Fragmento de Cristal", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Armadura de Aço das Profundezas",
    icone: "🥋",
    slot: "armadura",
    stats: { atk: 9, def: 12, hp: 30 },
    precoVenda: 350
  }
},
{
  nome: "Armadura de Mithril Fantasma",
  icone: "🥋",
  categoria: "equipamento",
  descricao: "Armadura: +13 ATK, +16 DEF, +45 HP",
  nivelMinimo: 28,
  custoOuro: 1300,
  classePermitida: "arqueiro",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 4 },
    { nome: "Energia Fantasma", quantidade: 2 },
    { nome: "Véu Rasgado", quantidade: 2 },
    { nome: "Fragmento de Sombra", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Armadura de Mithril Fantasma",
    icone: "🥋",
    slot: "armadura",
    stats: { atk: 13, def: 16, hp: 45 },
    precoVenda: 650
  }
},
{
  nome: "Armadura Astral do Falcão",
  icone: "🥋",
  categoria: "equipamento",
  descricao: "Armadura: +18 ATK, +22 DEF, +70 HP",
  nivelMinimo: 37,
  custoOuro: 2400,
  classePermitida: "arqueiro",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 5 },
    { nome: "Fragmento de Oricalco", quantidade: 3 },
    { nome: "Pupila Cósmica", quantidade: 1 },
    { nome: "Cristal Cósmico", quantidade: 1 },
    { nome: "Asa Divina Corrompida", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Armadura Astral do Falcão",
    icone: "🥋",
    slot: "armadura",
    stats: { atk: 18, def: 22, hp: 70 },
    precoVenda: 1200
  }
},

/* ══════════════════════════════════════
   ARQUEIRO — ELMOS
══════════════════════════════════════ */

{
  nome: "Capuz de Bronze da Coruja",
  icone: "🪖",
  categoria: "equipamento",
  descricao: "Elmo: +2 ATK, +2 DEF, +6 HP",
  nivelMinimo: 3,
  custoOuro: 80,
  classePermitida: "arqueiro",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 2 },
    { nome: "Pena Noturna", quantidade: 2 },
    { nome: "Seda de Aranha", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Capuz de Bronze da Coruja",
    icone: "🪖",
    slot: "elmo",
    stats: { atk: 2, def: 2, hp: 6 },
    precoVenda: 40
  }
},
{
  nome: "Capuz de Ferro da Harpia",
  icone: "🪖",
  categoria: "equipamento",
  descricao: "Elmo: +4 ATK, +4 DEF, +12 HP",
  nivelMinimo: 10,
  custoOuro: 220,
  classePermitida: "arqueiro",
  ingredientes: [
    { nome: "Minério de Ferro", quantidade: 2 },
    { nome: "Pena de Harpia", quantidade: 3 },
    { nome: "Olho de Basilisco", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Capuz de Ferro da Harpia",
    icone: "🪖",
    slot: "elmo",
    stats: { atk: 4, def: 4, hp: 12 },
    precoVenda: 110
  }
},
{
  nome: "Capuz de Aço Noturno",
  icone: "🪖",
  categoria: "equipamento",
  descricao: "Elmo: +6 ATK, +6 DEF, +20 HP",
  nivelMinimo: 19,
  custoOuro: 480,
  classePermitida: "arqueiro",
  ingredientes: [
    { nome: "Minério de Aço", quantidade: 2 },
    { nome: "Asa Membranosa", quantidade: 2 },
    { nome: "Sangue Coagulado", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Capuz de Aço Noturno",
    icone: "🪖",
    slot: "elmo",
    stats: { atk: 6, def: 6, hp: 20 },
    precoVenda: 240
  }
},
{
  nome: "Capuz de Mithril Sombrio",
  icone: "🪖",
  categoria: "equipamento",
  descricao: "Elmo: +8 ATK, +8 DEF, +32 HP",
  nivelMinimo: 28,
  custoOuro: 900,
  classePermitida: "arqueiro",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 2 },
    { nome: "Fragmento de Sombra", quantidade: 2 },
    { nome: "Presa de Vampiro", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Capuz de Mithril Sombrio",
    icone: "🪖",
    slot: "elmo",
    stats: { atk: 8, def: 8, hp: 32 },
    precoVenda: 450
  }
},
{
  nome: "Capuz Celestial do Vigia",
  icone: "🪖",
  categoria: "equipamento",
  descricao: "Elmo: +11 ATK, +11 DEF, +48 HP",
  nivelMinimo: 37,
  custoOuro: 1700,
  classePermitida: "arqueiro",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 3 },
    { nome: "Fragmento de Oricalco", quantidade: 2 },
    { nome: "Pupila Cósmica", quantidade: 1 },
    { nome: "Auréola Quebrada", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Capuz Celestial do Vigia",
    icone: "🪖",
    slot: "elmo",
    stats: { atk: 11, def: 11, hp: 48 },
    precoVenda: 850
  }
},

/* ══════════════════════════════════════
   ARQUEIRO — BOTAS
══════════════════════════════════════ */

{
  nome: "Botas de Bronze Ágeis",
  icone: "👢",
  categoria: "equipamento",
  descricao: "Botas: +3 ATK, +2 DEF",
  nivelMinimo: 3,
  custoOuro: 70,
  classePermitida: "arqueiro",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 2 },
    { nome: "Pele de Lobo", quantidade: 1 },
    { nome: "Pena Noturna", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Botas de Bronze Ágeis",
    icone: "👢",
    slot: "botas",
    stats: { atk: 3, def: 2, hp: 0 },
    precoVenda: 35
  }
},
{
  nome: "Botas de Ferro do Rastreador",
  icone: "👢",
  categoria: "equipamento",
  descricao: "Botas: +6 ATK, +4 DEF, +8 HP",
  nivelMinimo: 10,
  custoOuro: 200,
  classePermitida: "arqueiro",
  ingredientes: [
    { nome: "Minério de Ferro", quantidade: 2 },
    { nome: "Pele de Warg", quantidade: 2 },
    { nome: "Ferradura Antiga", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Botas de Ferro do Rastreador",
    icone: "👢",
    slot: "botas",
    stats: { atk: 6, def: 4, hp: 8 },
    precoVenda: 100
  }
},
{
  nome: "Botas de Aço do Caçador Profundo",
  icone: "👢",
  categoria: "equipamento",
  descricao: "Botas: +9 ATK, +6 DEF, +14 HP",
  nivelMinimo: 19,
  custoOuro: 450,
  classePermitida: "arqueiro",
  ingredientes: [
    { nome: "Minério de Aço", quantidade: 2 },
    { nome: "Asa Membranosa", quantidade: 2 },
    { nome: "Fragmento de Cristal", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Botas de Aço do Caçador Profundo",
    icone: "👢",
    slot: "botas",
    stats: { atk: 9, def: 6, hp: 14 },
    precoVenda: 225
  }
},
{
  nome: "Botas de Mithril da Névoa",
  icone: "👢",
  categoria: "equipamento",
  descricao: "Botas: +12 ATK, +8 DEF, +22 HP",
  nivelMinimo: 28,
  custoOuro: 850,
  classePermitida: "arqueiro",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 2 },
    { nome: "Energia Fantasma", quantidade: 2 },
    { nome: "Véu Rasgado", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Botas de Mithril da Névoa",
    icone: "👢",
    slot: "botas",
    stats: { atk: 12, def: 8, hp: 22 },
    precoVenda: 425
  }
},
{
  nome: "Botas Astrais da Constelação",
  icone: "👢",
  categoria: "equipamento",
  descricao: "Botas: +16 ATK, +10 DEF, +36 HP",
  nivelMinimo: 37,
  custoOuro: 1600,
  classePermitida: "arqueiro",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 3 },
    { nome: "Fragmento de Oricalco", quantidade: 2 },
    { nome: "Lágrima Estelar", quantidade: 1 },
    { nome: "Poeira Estelar", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Botas Astrais da Constelação",
    icone: "👢",
    slot: "botas",
    stats: { atk: 16, def: 10, hp: 36 },
    precoVenda: 800
  }
},

/* ══════════════════════════════════════
   ARQUEIRO — ANÉIS
══════════════════════════════════════ */

{
  nome: "Anel de Bronze da Mira",
  icone: "💍",
  categoria: "equipamento",
  descricao: "Anel: +4 ATK",
  nivelMinimo: 3,
  custoOuro: 70,
  classePermitida: "arqueiro",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 1 },
    { nome: "Moeda Antiga", quantidade: 2 },
    { nome: "Pena Noturna", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Anel de Bronze da Mira",
    icone: "💍",
    slot: "anel",
    stats: { atk: 4, def: 0, hp: 0 },
    precoVenda: 35
  }
},
{
  nome: "Anel de Ferro do Falcão",
  icone: "💍",
  categoria: "equipamento",
  descricao: "Anel: +8 ATK, +2 DEF",
  nivelMinimo: 10,
  custoOuro: 180,
  classePermitida: "arqueiro",
  ingredientes: [
    { nome: "Minério de Ferro", quantidade: 2 },
    { nome: "Pena de Harpia", quantidade: 2 },
    { nome: "Olho de Basilisco", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Anel de Ferro do Falcão",
    icone: "💍",
    slot: "anel",
    stats: { atk: 8, def: 2, hp: 0 },
    precoVenda: 90
  }
},
{
  nome: "Anel de Aço da Precisão",
  icone: "💍",
  categoria: "equipamento",
  descricao: "Anel: +14 ATK, +4 DEF, +8 HP",
  nivelMinimo: 19,
  custoOuro: 420,
  classePermitida: "arqueiro",
  ingredientes: [
    { nome: "Minério de Aço", quantidade: 2 },
    { nome: "Fragmento de Cristal", quantidade: 2 },
    { nome: "Pó Luminoso", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Anel de Aço da Precisão",
    icone: "💍",
    slot: "anel",
    stats: { atk: 14, def: 4, hp: 8 },
    precoVenda: 210
  }
},
{
  nome: "Anel de Mithril Sussurrante",
  icone: "💍",
  categoria: "equipamento",
  descricao: "Anel: +20 ATK, +6 DEF, +14 HP",
  nivelMinimo: 28,
  custoOuro: 780,
  classePermitida: "arqueiro",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 2 },
    { nome: "Fragmento de Sombra", quantidade: 1 },
    { nome: "Eco do Grito", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Anel de Mithril Sussurrante",
    icone: "💍",
    slot: "anel",
    stats: { atk: 20, def: 6, hp: 14 },
    precoVenda: 390
  }
},
{
  nome: "Anel Celeste do Observador",
  icone: "💍",
  categoria: "equipamento",
  descricao: "Anel: +28 ATK, +8 DEF, +24 HP",
  nivelMinimo: 37,
  custoOuro: 1500,
  classePermitida: "arqueiro",
  ingredientes: [
    { nome: "Fragmento de Oricalco", quantidade: 2 },
    { nome: "Pupila Cósmica", quantidade: 2 },
    { nome: "Cristal Cósmico", quantidade: 1 },
    { nome: "Auréola Quebrada", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Anel Celeste do Observador",
    icone: "💍",
    slot: "anel",
    stats: { atk: 28, def: 8, hp: 24 },
    precoVenda: 750
  }
},

/* ══════════════════════════════════════
   ARQUEIRO — AMULETOS
══════════════════════════════════════ */

{
  nome: "Amuleto de Bronze do Batedor",
  icone: "📿",
  categoria: "equipamento",
  descricao: "Amuleto: +4 ATK, +1 DEF, +6 HP",
  nivelMinimo: 3,
  custoOuro: 75,
  classePermitida: "arqueiro",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 1 },
    { nome: "Pele de Lobo", quantidade: 2 },
    { nome: "Pena Noturna", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Amuleto de Bronze do Batedor",
    icone: "📿",
    slot: "amuleto",
    stats: { atk: 4, def: 1, hp: 6 },
    precoVenda: 37
  }
},
{
  nome: "Amuleto de Ferro do Caçador",
  icone: "📿",
  categoria: "equipamento",
  descricao: "Amuleto: +8 ATK, +3 DEF, +12 HP",
  nivelMinimo: 10,
  custoOuro: 190,
  classePermitida: "arqueiro",
  ingredientes: [
    { nome: "Minério de Ferro", quantidade: 2 },
    { nome: "Pena de Harpia", quantidade: 2 },
    { nome: "Pele de Warg", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Amuleto de Ferro do Caçador",
    icone: "📿",
    slot: "amuleto",
    stats: { atk: 8, def: 3, hp: 12 },
    precoVenda: 95
  }
},
{
  nome: "Amuleto de Aço Glacial",
  icone: "📿",
  categoria: "equipamento",
  descricao: "Amuleto: +13 ATK, +5 DEF, +20 HP",
  nivelMinimo: 19,
  custoOuro: 430,
  classePermitida: "arqueiro",
  ingredientes: [
    { nome: "Minério de Aço", quantidade: 2 },
    { nome: "Pelo Congelado", quantidade: 2 },
    { nome: "Presa de Gelo", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Amuleto de Aço Glacial",
    icone: "📿",
    slot: "amuleto",
    stats: { atk: 13, def: 5, hp: 20 },
    precoVenda: 215
  }
},
{
  nome: "Amuleto de Mithril Espectral",
  icone: "📿",
  categoria: "equipamento",
  descricao: "Amuleto: +18 ATK, +7 DEF, +32 HP",
  nivelMinimo: 28,
  custoOuro: 800,
  classePermitida: "arqueiro",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 2 },
    { nome: "Energia Fantasma", quantidade: 2 },
    { nome: "Objeto Amaldiçoado", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Amuleto de Mithril Espectral",
    icone: "📿",
    slot: "amuleto",
    stats: { atk: 18, def: 7, hp: 32 },
    precoVenda: 400
  }
},
{
  nome: "Amuleto Astral das Estrelas",
  icone: "📿",
  categoria: "equipamento",
  descricao: "Amuleto: +25 ATK, +10 DEF, +48 HP",
  nivelMinimo: 37,
  custoOuro: 1550,
  classePermitida: "arqueiro",
  ingredientes: [
    { nome: "Fragmento de Oricalco", quantidade: 2 },
    { nome: "Poeira Estelar", quantidade: 3 },
    { nome: "Lágrima Estelar", quantidade: 1 },
    { nome: "Pupila Cósmica", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Amuleto Astral das Estrelas",
    icone: "📿",
    slot: "amuleto",
    stats: { atk: 25, def: 10, hp: 48 },
    precoVenda: 775
  }
}
/* ══════════════════════════════════════
   CLÉRIGO — TIER 1
══════════════════════════════════════ */

,{
  nome: "Cetro de Bronze Sagrado",
  icone: "✝️",
  categoria: "equipamento",
  descricao: "Arma: +3 ATK, +2 DEF, +10 HP",
  nivelMinimo: 3,
  custoOuro: 100,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 2 },
    { nome: "Minério de Estanho", quantidade: 2 },
    { nome: "Essência Silvestre", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Cetro de Bronze Sagrado",
    icone: "✝️",
    slot: "arma",
    stats: { atk: 3, def: 2, hp: 10 },
    precoVenda: 50
  }
},
{
  nome: "Veste de Bronze do Devoto",
  icone: "👘",
  categoria: "equipamento",
  descricao: "Armadura: +2 ATK, +5 DEF, +14 HP",
  nivelMinimo: 3,
  custoOuro: 100,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 3 },
    { nome: "Minério de Estanho", quantidade: 1 },
    { nome: "Seda de Aranha", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Veste de Bronze do Devoto",
    icone: "👘",
    slot: "armadura",
    stats: { atk: 2, def: 5, hp: 14 },
    precoVenda: 50
  }
},
{
  nome: "Mitra de Bronze da Benção",
  icone: "⛑️",
  categoria: "equipamento",
  descricao: "Elmo: +1 ATK, +3 DEF, +10 HP",
  nivelMinimo: 3,
  custoOuro: 80,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 2 },
    { nome: "Essência Silvestre", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Mitra de Bronze da Benção",
    icone: "⛑️",
    slot: "elmo",
    stats: { atk: 1, def: 3, hp: 10 },
    precoVenda: 40
  }
},
{
  nome: "Botas de Bronze do Peregrino",
  icone: "👢",
  categoria: "equipamento",
  descricao: "Botas: +1 ATK, +4 DEF, +8 HP",
  nivelMinimo: 3,
  custoOuro: 70,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 2 },
    { nome: "Escama Pantanosa", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Botas de Bronze do Peregrino",
    icone: "👢",
    slot: "botas",
    stats: { atk: 1, def: 4, hp: 8 },
    precoVenda: 35
  }
},
{
  nome: "Anel de Bronze da Oração",
  icone: "💍",
  categoria: "equipamento",
  descricao: "Anel: +2 ATK, +4 DEF, +12 HP",
  nivelMinimo: 3,
  custoOuro: 70,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 1 },
    { nome: "Moeda Antiga", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Anel de Bronze da Oração",
    icone: "💍",
    slot: "anel",
    stats: { atk: 2, def: 4, hp: 12 },
    precoVenda: 35
  }
},
{
  nome: "Amuleto de Bronze da Benção",
  icone: "📿",
  categoria: "equipamento",
  descricao: "Amuleto: +2 ATK, +3 DEF, +14 HP",
  nivelMinimo: 3,
  custoOuro: 75,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 1 },
    { nome: "Essência Silvestre", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Amuleto de Bronze da Benção",
    icone: "📿",
    slot: "amuleto",
    stats: { atk: 2, def: 3, hp: 14 },
    precoVenda: 37
  }
},

/* ══════════════════════════════════════
   PALADINO — TIER 1
══════════════════════════════════════ */

{
  nome: "Maça de Bronze da Vigília",
  icone: "🔨",
  categoria: "equipamento",
  descricao: "Arma: +4 ATK, +2 DEF, +8 HP",
  nivelMinimo: 3,
  custoOuro: 100,
  classePermitida: "paladino",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 2 },
    { nome: "Minério de Estanho", quantidade: 2 },
    { nome: "Couro Grosso", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Maça de Bronze da Vigília",
    icone: "🔨",
    slot: "arma",
    stats: { atk: 4, def: 2, hp: 8 },
    precoVenda: 50
  }
},
{
  nome: "Couraça de Bronze da Luz",
  icone: "🛡️",
  categoria: "equipamento",
  descricao: "Armadura: +2 ATK, +7 DEF, +16 HP",
  nivelMinimo: 3,
  custoOuro: 100,
  classePermitida: "paladino",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 4 },
    { nome: "Minério de Estanho", quantidade: 2 },
    { nome: "Couro Grosso", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Couraça de Bronze da Luz",
    icone: "🛡️",
    slot: "armadura",
    stats: { atk: 2, def: 7, hp: 16 },
    precoVenda: 50
  }
},
{
  nome: "Elmo de Bronze do Juramento",
  icone: "⛑️",
  categoria: "equipamento",
  descricao: "Elmo: +1 ATK, +4 DEF, +10 HP",
  nivelMinimo: 3,
  custoOuro: 80,
  classePermitida: "paladino",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 2 },
    { nome: "Couro Grosso", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Elmo de Bronze do Juramento",
    icone: "⛑️",
    slot: "elmo",
    stats: { atk: 1, def: 4, hp: 10 },
    precoVenda: 40
  }
},
{
  nome: "Botas de Bronze Consagradas",
  icone: "👢",
  categoria: "equipamento",
  descricao: "Botas: +2 ATK, +5 DEF, +8 HP",
  nivelMinimo: 3,
  custoOuro: 70,
  classePermitida: "paladino",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 2 },
    { nome: "Escama Pantanosa", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Botas de Bronze Consagradas",
    icone: "👢",
    slot: "botas",
    stats: { atk: 2, def: 5, hp: 8 },
    precoVenda: 35
  }
},
{
  nome: "Anel de Bronze da Guarda",
  icone: "💍",
  categoria: "equipamento",
  descricao: "Anel: +3 ATK, +5 DEF, +12 HP",
  nivelMinimo: 3,
  custoOuro: 70,
  classePermitida: "paladino",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 1 },
    { nome: "Moeda Antiga", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Anel de Bronze da Guarda",
    icone: "💍",
    slot: "anel",
    stats: { atk: 3, def: 5, hp: 12 },
    precoVenda: 35
  }
},
{
  nome: "Amuleto de Bronze da Esperança",
  icone: "📿",
  categoria: "equipamento",
  descricao: "Amuleto: +3 ATK, +4 DEF, +14 HP",
  nivelMinimo: 3,
  custoOuro: 75,
  classePermitida: "paladino",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 1 },
    { nome: "Essência Silvestre", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Amuleto de Bronze da Esperança",
    icone: "📿",
    slot: "amuleto",
    stats: { atk: 3, def: 4, hp: 14 },
    precoVenda: 37
  }
},

/* ══════════════════════════════════════
   MONGE — TIER 1
══════════════════════════════════════ */

{
  nome: "Manoplas de Bronze do Iniciado",
  icone: "🥊",
  categoria: "equipamento",
  descricao: "Arma: +5 ATK, +2 DEF",
  nivelMinimo: 3,
  custoOuro: 100,
  classePermitida: "monge",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 3 },
    { nome: "Minério de Estanho", quantidade: 2 },
    { nome: "Couro Grosso", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Manoplas de Bronze do Iniciado",
    icone: "🥊",
    slot: "arma",
    stats: { atk: 5, def: 2, hp: 0 },
    precoVenda: 50
  }
},
{
  nome: "Túnica de Bronze da Disciplina",
  icone: "🥋",
  categoria: "equipamento",
  descricao: "Armadura: +3 ATK, +4 DEF, +10 HP",
  nivelMinimo: 3,
  custoOuro: 100,
  classePermitida: "monge",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 3 },
    { nome: "Minério de Estanho", quantidade: 1 },
    { nome: "Couro Grosso", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Túnica de Bronze da Disciplina",
    icone: "🥋",
    slot: "armadura",
    stats: { atk: 3, def: 4, hp: 10 },
    precoVenda: 50
  }
},
{
  nome: "Faixa de Bronze do Iniciado",
  icone: "🎍",
  categoria: "equipamento",
  descricao: "Elmo: +2 ATK, +2 DEF, +6 HP",
  nivelMinimo: 3,
  custoOuro: 80,
  classePermitida: "monge",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 2 },
    { nome: "Couro Grosso", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Faixa de Bronze do Iniciado",
    icone: "🎍",
    slot: "elmo",
    stats: { atk: 2, def: 2, hp: 6 },
    precoVenda: 40
  }
},
{
  nome: "Sandálias de Bronze do Fluxo",
  icone: "👢",
  categoria: "equipamento",
  descricao: "Botas: +3 ATK, +3 DEF, +4 HP",
  nivelMinimo: 3,
  custoOuro: 70,
  classePermitida: "monge",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 2 },
    { nome: "Pele de Lobo", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Sandálias de Bronze do Fluxo",
    icone: "👢",
    slot: "botas",
    stats: { atk: 3, def: 3, hp: 4 },
    precoVenda: 35
  }
},
{
  nome: "Anel de Bronze do Equilíbrio",
  icone: "💍",
  categoria: "equipamento",
  descricao: "Anel: +4 ATK, +3 DEF, +6 HP",
  nivelMinimo: 3,
  custoOuro: 70,
  classePermitida: "monge",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 1 },
    { nome: "Moeda Antiga", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Anel de Bronze do Equilíbrio",
    icone: "💍",
    slot: "anel",
    stats: { atk: 4, def: 3, hp: 6 },
    precoVenda: 35
  }
},
{
  nome: "Amuleto de Bronze do Espírito",
  icone: "📿",
  categoria: "equipamento",
  descricao: "Amuleto: +3 ATK, +3 DEF, +10 HP",
  nivelMinimo: 3,
  custoOuro: 75,
  classePermitida: "monge",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 1 },
    { nome: "Essência Silvestre", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Amuleto de Bronze do Espírito Marcial",
    icone: "📿",
    slot: "amuleto",
    stats: { atk: 3, def: 3, hp: 10 },
    precoVenda: 37
  }
},

/* ══════════════════════════════════════
   DRUIDA — TIER 1
══════════════════════════════════════ */

{
  nome: "Cajado de Bronze das Vinhas",
  icone: "🌿",
  categoria: "equipamento",
  descricao: "Arma: +4 ATK, +1 DEF, +8 HP",
  nivelMinimo: 3,
  custoOuro: 100,
  classePermitida: "druida",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 2 },
    { nome: "Minério de Estanho", quantidade: 2 },
    { nome: "Essência Silvestre", quantidade: 2 },
    { nome: "Seiva Ácida", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Cajado de Bronze das Vinhas",
    icone: "🌿",
    slot: "arma",
    stats: { atk: 4, def: 1, hp: 8 },
    precoVenda: 50
  }
},
{
  nome: "Vestes de Bronze do Bosque",
  icone: "🍃",
  categoria: "equipamento",
  descricao: "Armadura: +2 ATK, +4 DEF, +12 HP",
  nivelMinimo: 3,
  custoOuro: 100,
  classePermitida: "druida",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 3 },
    { nome: "Minério de Estanho", quantidade: 1 },
    { nome: "Essência Silvestre", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Vestes de Bronze do Bosque",
    icone: "🍃",
    slot: "armadura",
    stats: { atk: 2, def: 4, hp: 12 },
    precoVenda: 50
  }
},
{
  nome: "Coroa de Bronze de Ramos",
  icone: "🌿",
  categoria: "equipamento",
  descricao: "Elmo: +1 ATK, +3 DEF, +10 HP",
  nivelMinimo: 3,
  custoOuro: 80,
  classePermitida: "druida",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 2 },
    { nome: "Essência Silvestre", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Coroa de Bronze de Ramos",
    icone: "🌿",
    slot: "elmo",
    stats: { atk: 1, def: 3, hp: 10 },
    precoVenda: 40
  }
},
{
  nome: "Botas de Bronze Musgosas",
  icone: "👢",
  categoria: "equipamento",
  descricao: "Botas: +2 ATK, +3 DEF, +8 HP",
  nivelMinimo: 3,
  custoOuro: 70,
  classePermitida: "druida",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 2 },
    { nome: "Seiva Ácida", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Botas de Bronze Musgosas",
    icone: "👢",
    slot: "botas",
    stats: { atk: 2, def: 3, hp: 8 },
    precoVenda: 35
  }
},
{
  nome: "Anel de Bronze das Raízes",
  icone: "💍",
  categoria: "equipamento",
  descricao: "Anel: +3 ATK, +3 DEF, +10 HP",
  nivelMinimo: 3,
  custoOuro: 70,
  classePermitida: "druida",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 1 },
    { nome: "Moeda Antiga", quantidade: 1 },
    { nome: "Essência Silvestre", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Anel de Bronze das Raízes",
    icone: "💍",
    slot: "anel",
    stats: { atk: 3, def: 3, hp: 10 },
    precoVenda: 35
  }
},
{
  nome: "Amuleto de Bronze da Vida Verde",
  icone: "📿",
  categoria: "equipamento",
  descricao: "Amuleto: +3 ATK, +2 DEF, +12 HP",
  nivelMinimo: 3,
  custoOuro: 75,
  classePermitida: "druida",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 1 },
    { nome: "Essência Silvestre", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Amuleto de Bronze da Vida Verde",
    icone: "📿",
    slot: "amuleto",
    stats: { atk: 3, def: 2, hp: 12 },
    precoVenda: 37
  }
},

/* ══════════════════════════════════════
   POÇÕES DE CURA
══════════════════════════════════════ */

{
  nome: "Poção Menor de Cura",
  icone: "🧪",
  categoria: "pocao",
  descricao: "Restaura 40 HP",
  nivelMinimo: 1,
  custoOuro: 20,
  ingredientes: [
    { nome: "Carne Crua", quantidade: 2 },
    { nome: "Essência Silvestre", quantidade: 1 }
  ],
  resultado: {
    tipo: "consumivel",
    nome: "Poção Menor de Cura",
    icone: "🧪",
    efeito: { tipo: "cura", valor: 40 }
  }
},
{
  nome: "Poção de Cura",
  icone: "🧪",
  categoria: "pocao",
  descricao: "Restaura 80 HP",
  nivelMinimo: 5,
  custoOuro: 60,
  ingredientes: [
    { nome: "Glândula Tóxica", quantidade: 2 },
    { nome: "Seiva Ácida", quantidade: 2 }
  ],
  resultado: {
    tipo: "consumivel",
    nome: "Poção de Cura",
    icone: "🧪",
    efeito: { tipo: "cura", valor: 80 }
  }
},
{
  nome: "Poção Maior de Cura",
  icone: "🧪",
  categoria: "pocao",
  descricao: "Restaura 140 HP",
  nivelMinimo: 10,
  custoOuro: 140,
  ingredientes: [
    { nome: "Ectoplasma", quantidade: 2 },
    { nome: "Osso Antigo", quantidade: 2 },
    { nome: "Núcleo de Pedra", quantidade: 1 }
  ],
  resultado: {
    tipo: "consumivel",
    nome: "Poção Maior de Cura",
    icone: "🧪",
    efeito: { tipo: "cura", valor: 140 }
  }
},
{
  nome: "Poção Superior de Cura",
  icone: "🧪",
  categoria: "pocao",
  descricao: "Restaura 220 HP",
  nivelMinimo: 19,
  custoOuro: 260,
  ingredientes: [
    { nome: "Sangue Coagulado", quantidade: 2 },
    { nome: "Fragmento de Cristal", quantidade: 2 },
    { nome: "Pó Luminoso", quantidade: 1 }
  ],
  resultado: {
    tipo: "consumivel",
    nome: "Poção Superior de Cura",
    icone: "🧪",
    efeito: { tipo: "cura", valor: 220 }
  }
},
{
  nome: "Poção Suprema de Cura",
  icone: "🧪",
  categoria: "pocao",
  descricao: "Restaura 360 HP",
  nivelMinimo: 28,
  custoOuro: 520,
  ingredientes: [
    { nome: "Energia Fantasma", quantidade: 2 },
    { nome: "Presa de Vampiro", quantidade: 1 },
    { nome: "Essência da Escuridão", quantidade: 1 }
  ],
  resultado: {
    tipo: "consumivel",
    nome: "Poção Suprema de Cura",
    icone: "🧪",
    efeito: { tipo: "cura", valor: 360 }
  }
},
{
  nome: "Poção Divina de Cura",
  icone: "🧪",
  categoria: "pocao",
  descricao: "Restaura 600 HP",
  nivelMinimo: 37,
  custoOuro: 1000,
  ingredientes: [
    { nome: "Poeira Estelar", quantidade: 3 },
    { nome: "Luz Profana", quantidade: 1 },
    { nome: "Bênção Corrupta", quantidade: 1 }
  ],
  resultado: {
    tipo: "consumivel",
    nome: "Poção Divina de Cura",
    icone: "🧪",
    efeito: { tipo: "cura", valor: 600 }
  }
},

/* ══════════════════════════════════════
   POÇÕES ESPECIAIS
══════════════════════════════════════ */

{
  nome: "Poção de Regeneração",
  icone: "🧪",
  categoria: "pocao",
  descricao: "Restaura 120 HP",
  nivelMinimo: 10,
  custoOuro: 120,
  ingredientes: [
    { nome: "Fruto da Floresta", quantidade: 2 },
    { nome: "Seiva Ácida", quantidade: 2 },
    { nome: "Essência Silvestre", quantidade: 1 }
  ],
  resultado: {
    tipo: "consumivel",
    nome: "Poção de Regeneração",
    icone: "🧪",
    efeito: { tipo: "cura", valor: 120 }
  }
},
{
  nome: "Poção Antissombria",
  icone: "🧪",
  categoria: "pocao",
  descricao: "Restaura 180 HP",
  nivelMinimo: 19,
  custoOuro: 220,
  ingredientes: [
    { nome: "Lágrima Espectral", quantidade: 2 },
    { nome: "Essência Sombria", quantidade: 2 },
    { nome: "Vela Eterna", quantidade: 1 }
  ],
  resultado: {
    tipo: "consumivel",
    nome: "Poção Antissombria",
    icone: "🧪",
    efeito: { tipo: "cura", valor: 180 }
  }
},
{
  nome: "Poção Glacial",
  icone: "🧪",
  categoria: "pocao",
  descricao: "Restaura 260 HP",
  nivelMinimo: 25,
  custoOuro: 360,
  ingredientes: [
    { nome: "Cristal de Gelo", quantidade: 2 },
    { nome: "Essência Gélida", quantidade: 2 },
    { nome: "Núcleo Glacial", quantidade: 1 }
  ],
  resultado: {
    tipo: "consumivel",
    nome: "Poção Glacial",
    icone: "🧪",
    efeito: { tipo: "cura", valor: 260 }
  }
},
{
  nome: "Poção do Abismo",
  icone: "🧪",
  categoria: "pocao",
  descricao: "Restaura 420 HP",
  nivelMinimo: 31,
  custoOuro: 700,
  ingredientes: [
    { nome: "Essência da Escuridão", quantidade: 2 },
    { nome: "Fio Obscuro", quantidade: 2 },
    { nome: "Orbe Sombrio", quantidade: 1 }
  ],
  resultado: {
    tipo: "consumivel",
    nome: "Poção do Abismo",
    icone: "🧪",
    efeito: { tipo: "cura", valor: 420 }
  }
},
{
  nome: "Néctar Celestial",
  icone: "🧪",
  categoria: "pocao",
  descricao: "Restaura 750 HP",
  nivelMinimo: 43,
  custoOuro: 1600,
  ingredientes: [
    { nome: "Luz Profana", quantidade: 1 },
    { nome: "Asa Divina Corrompida", quantidade: 1 },
    { nome: "Poeira Estelar", quantidade: 2 }
  ],
  resultado: {
    tipo: "consumivel",
    nome: "Néctar Celestial",
    icone: "🧪",
    efeito: { tipo: "cura", valor: 750 }
  }
},
/* ══════════════════════════════════════
   ELIXIRES DE ATRIBUTO
══════════════════════════════════════ */

{
  nome: "Elixir de Força",
  icone: "💪",
  categoria: "elixir",
  descricao: "+2 Força permanente",
  nivelMinimo: 7,
  custoOuro: 180,
  ingredientes: [
    { nome: "Lâmina Orcish", quantidade: 2 },
    { nome: "Chifre Rachado", quantidade: 2 }
  ],
  resultado: {
    tipo: "elixir",
    stats: { forca: 2 }
  }
},
{
  nome: "Elixir de Vigor",
  icone: "❤️",
  categoria: "elixir",
  descricao: "+2 Vigor permanente",
  nivelMinimo: 7,
  custoOuro: 180,
  ingredientes: [
    { nome: "Couro Grosso", quantidade: 3 },
    { nome: "Dente de Croco", quantidade: 2 }
  ],
  resultado: {
    tipo: "elixir",
    stats: { vigor: 2 }
  }
},
{
  nome: "Elixir de Destreza",
  icone: "🏹",
  categoria: "elixir",
  descricao: "+2 Destreza permanente",
  nivelMinimo: 10,
  custoOuro: 260,
  ingredientes: [
    { nome: "Pena de Harpia", quantidade: 3 },
    { nome: "Ferrão Venenoso", quantidade: 2 }
  ],
  resultado: {
    tipo: "elixir",
    stats: { destreza: 2 }
  }
},
{
  nome: "Elixir de Inteligência",
  icone: "🔮",
  categoria: "elixir",
  descricao: "+2 Inteligência permanente",
  nivelMinimo: 16,
  custoOuro: 340,
  ingredientes: [
    { nome: "Ectoplasma", quantidade: 2 },
    { nome: "Olho de Basilisco", quantidade: 1 },
    { nome: "Areia Encantada", quantidade: 2 }
  ],
  resultado: {
    tipo: "elixir",
    stats: { inteligencia: 2 }
  }
},
{
  nome: "Elixir de Sabedoria",
  icone: "📖",
  categoria: "elixir",
  descricao: "+2 Sabedoria permanente",
  nivelMinimo: 22,
  custoOuro: 420,
  ingredientes: [
    { nome: "Cristal de Gelo", quantidade: 2 },
    { nome: "Essência Gélida", quantidade: 2 },
    { nome: "Núcleo Glacial", quantidade: 1 }
  ],
  resultado: {
    tipo: "elixir",
    stats: { sabedoria: 2 }
  }
},
{
  nome: "Elixir de Carisma",
  icone: "✨",
  categoria: "elixir",
  descricao: "+2 Carisma permanente",
  nivelMinimo: 28,
  custoOuro: 500,
  ingredientes: [
    { nome: "Objeto Amaldiçoado", quantidade: 1 },
    { nome: "Véu da Morte", quantidade: 1 },
    { nome: "Presa de Vampiro", quantidade: 1 },
    { nome: "Eco do Grito", quantidade: 1 }
  ],
  resultado: {
    tipo: "elixir",
    stats: { carisma: 2 }
  }
},

/* ══════════════════════════════════════
   ELIXIRES AVANÇADOS
══════════════════════════════════════ */

{
  nome: "Elixir de Poder",
  icone: "🔥",
  categoria: "elixir",
  descricao: "+3 Força permanente",
  nivelMinimo: 28,
  custoOuro: 900,
  ingredientes: [
    { nome: "Núcleo Ígneo", quantidade: 2 },
    { nome: "Chama Eterna", quantidade: 1 },
    { nome: "Coração Negro", quantidade: 1 }
  ],
  resultado: {
    tipo: "elixir",
    stats: { forca: 3 }
  }
},
{
  nome: "Elixir da Mente Astral",
  icone: "🌌",
  categoria: "elixir",
  descricao: "+3 Inteligência permanente",
  nivelMinimo: 37,
  custoOuro: 1100,
  ingredientes: [
    { nome: "Pupila Cósmica", quantidade: 2 },
    { nome: "Essência Astral", quantidade: 2 },
    { nome: "Lágrima Estelar", quantidade: 1 }
  ],
  resultado: {
    tipo: "elixir",
    stats: { inteligencia: 3 }
  }
},
{
  nome: "Elixir do Guardião",
  icone: "🛡️",
  categoria: "elixir",
  descricao: "+3 Vigor permanente",
  nivelMinimo: 37,
  custoOuro: 1100,
  ingredientes: [
    { nome: "Escudo Celestial", quantidade: 1 },
    { nome: "Rocha Primordial", quantidade: 2 },
    { nome: "Bênção Corrupta", quantidade: 1 }
  ],
  resultado: {
    tipo: "elixir",
    stats: { vigor: 3 }
  }
},
{
  nome: "Elixir da Sombra Perfeita",
  icone: "🌑",
  categoria: "elixir",
  descricao: "+3 Destreza permanente",
  nivelMinimo: 31,
  custoOuro: 1000,
  ingredientes: [
    { nome: "Fio Obscuro", quantidade: 2 },
    { nome: "Essência da Escuridão", quantidade: 2 },
    { nome: "Fragmento de Sombra", quantidade: 2 }
  ],
  resultado: {
    tipo: "elixir",
    stats: { destreza: 3 }
  }
},

/* ══════════════════════════════════════
   ELIXIR SUPREMO
══════════════════════════════════════ */

{
  nome: "Elixir Supremo",
  icone: "⭐",
  categoria: "elixir",
  descricao: "+2 em TODOS os atributos",
  nivelMinimo: 40,
  custoOuro: 3000,
  ingredientes: [
    { nome: "Poeira Estelar", quantidade: 4 },
    { nome: "Fragmento da Realidade", quantidade: 1 },
    { nome: "Luz Profana", quantidade: 1 },
    { nome: "Chama Eterna", quantidade: 1 },
    { nome: "Coração Negro", quantidade: 1 }
  ],
  resultado: {
    tipo: "elixir",
    stats: {
      forca: 2,
      destreza: 2,
      vigor: 2,
      inteligencia: 2,
      sabedoria: 2,
      carisma: 2
    }
  }
},

/* ══════════════════════════════════════
   CLÉRIGO — ARMAS
══════════════════════════════════════ */

{
  nome: "Cetro de Bronze Sagrado Devocional",
  icone: "✝️",
  categoria: "equipamento",
  descricao: "Arma: +3 ATK, +2 DEF, +10 HP",
  nivelMinimo: 3,
  custoOuro: 100,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 2 },
    { nome: "Minério de Estanho", quantidade: 2 },
    { nome: "Essência Silvestre", quantidade: 2 },
    { nome: "Dente de Croco", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Cetro de Bronze Sagrado Devocional",
    icone: "✝️",
    slot: "arma",
    stats: { atk: 3, def: 2, hp: 10 },
    precoVenda: 50
  }
},
{
  nome: "Cetro de Ferro Abençoado",
  icone: "✝️",
  categoria: "equipamento",
  descricao: "Arma: +7 ATK, +5 DEF, +20 HP",
  nivelMinimo: 10,
  custoOuro: 280,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Ferro", quantidade: 3 },
    { nome: "Pepita de Prata", quantidade: 1 },
    { nome: "Lágrima Espectral", quantidade: 2 },
    { nome: "Vela Eterna", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Cetro de Ferro Abençoado",
    icone: "✝️",
    slot: "arma",
    stats: { atk: 7, def: 5, hp: 20 },
    precoVenda: 140
  }
},
{
  nome: "Martelo de Aço da Luz Gélida",
  icone: "🔨",
  categoria: "equipamento",
  descricao: "Arma: +13 ATK, +9 DEF, +34 HP",
  nivelMinimo: 19,
  custoOuro: 650,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Aço", quantidade: 3 },
    { nome: "Núcleo Glacial", quantidade: 1 },
    { nome: "Cristal de Gelo", quantidade: 2 },
    { nome: "Essência Gélida", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Martelo de Aço da Luz Gélida",
    icone: "🔨",
    slot: "arma",
    stats: { atk: 13, def: 9, hp: 34 },
    precoVenda: 325
  }
},
{
  nome: "Cajado de Mithril da Redenção",
  icone: "✨",
  categoria: "equipamento",
  descricao: "Arma: +21 ATK, +13 DEF, +52 HP",
  nivelMinimo: 28,
  custoOuro: 1200,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 4 },
    { nome: "Fragmento de Oricalco", quantidade: 1 },
    { nome: "Energia Fantasma", quantidade: 2 },
    { nome: "Objeto Amaldiçoado", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Cajado de Mithril da Redenção",
    icone: "✨",
    slot: "arma",
    stats: { atk: 21, def: 13, hp: 52 },
    precoVenda: 600
  }
},
{
  nome: "Cetro Celestial da Ressurreição",
  icone: "🌟",
  categoria: "equipamento",
  descricao: "Arma: +30 ATK, +18 DEF, +78 HP",
  nivelMinimo: 37,
  custoOuro: 2200,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 5 },
    { nome: "Fragmento de Oricalco", quantidade: 3 },
    { nome: "Asa Divina Corrompida", quantidade: 1 },
    { nome: "Bênção Corrupta", quantidade: 2 },
    { nome: "Luz Profana", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Cetro Celestial da Ressurreição",
    icone: "🌟",
    slot: "arma",
    stats: { atk: 30, def: 18, hp: 78 },
    precoVenda: 1100
  }
},

/* ══════════════════════════════════════
   CLÉRIGO — ARMADURAS
══════════════════════════════════════ */

{
  nome: "Veste de Bronze do Devoto Consagrado",
  icone: "👘",
  categoria: "equipamento",
  descricao: "Armadura: +2 ATK, +5 DEF, +14 HP",
  nivelMinimo: 3,
  custoOuro: 100,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 3 },
    { nome: "Minério de Estanho", quantidade: 1 },
    { nome: "Essência Silvestre", quantidade: 2 },
    { nome: "Seda de Aranha", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Veste de Bronze do Devoto Consagrado",
    icone: "👘",
    slot: "armadura",
    stats: { atk: 2, def: 5, hp: 14 },
    precoVenda: 50
  }
},
{
  nome: "Veste de Ferro do Peregrino",
  icone: "👘",
  categoria: "equipamento",
  descricao: "Armadura: +4 ATK, +9 DEF, +26 HP",
  nivelMinimo: 10,
  custoOuro: 300,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Ferro", quantidade: 4 },
    { nome: "Pepita de Prata", quantidade: 1 },
    { nome: "Lágrima Espectral", quantidade: 2 },
    { nome: "Terra do Cemitério", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Veste de Ferro do Peregrino",
    icone: "👘",
    slot: "armadura",
    stats: { atk: 4, def: 9, hp: 26 },
    precoVenda: 150
  }
},
{
  nome: "Veste de Aço da Aurora",
  icone: "👘",
  categoria: "equipamento",
  descricao: "Armadura: +6 ATK, +14 DEF, +40 HP",
  nivelMinimo: 19,
  custoOuro: 700,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Aço", quantidade: 4 },
    { nome: "Cristal de Gelo", quantidade: 2 },
    { nome: "Essência Gélida", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Veste de Aço da Aurora",
    icone: "👘",
    slot: "armadura",
    stats: { atk: 6, def: 14, hp: 40 },
    precoVenda: 350
  }
},
{
  nome: "Veste de Mithril da Graça",
  icone: "👘",
  categoria: "equipamento",
  descricao: "Armadura: +8 ATK, +19 DEF, +58 HP",
  nivelMinimo: 28,
  custoOuro: 1300,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 4 },
    { nome: "Fragmento de Oricalco", quantidade: 1 },
    { nome: "Energia Fantasma", quantidade: 2 },
    { nome: "Véu Rasgado", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Veste de Mithril da Graça",
    icone: "👘",
    slot: "armadura",
    stats: { atk: 8, def: 19, hp: 58 },
    precoVenda: 650
  }
},
{
  nome: "Veste Celestial do Julgamento",
  icone: "👘",
  categoria: "equipamento",
  descricao: "Armadura: +12 ATK, +26 DEF, +86 HP",
  nivelMinimo: 37,
  custoOuro: 2400,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 5 },
    { nome: "Fragmento de Oricalco", quantidade: 3 },
    { nome: "Escudo Celestial", quantidade: 1 },
    { nome: "Bênção Corrupta", quantidade: 1 },
    { nome: "Asa Divina Corrompida", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Veste Celestial do Julgamento",
    icone: "👘",
    slot: "armadura",
    stats: { atk: 12, def: 26, hp: 86 },
    precoVenda: 1200
  }
},
/* ══════════════════════════════════════
   CLÉRIGO — ELMOS
══════════════════════════════════════ */

{
  nome: "Mitra de Bronze da Benção Sagrada",
  icone: "⛑️",
  categoria: "equipamento",
  descricao: "Elmo: +1 ATK, +3 DEF, +10 HP",
  nivelMinimo: 3,
  custoOuro: 80,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 2 },
    { nome: "Essência Silvestre", quantidade: 2 },
    { nome: "Fruto da Floresta", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Mitra de Bronze da Benção Sagrada",
    icone: "⛑️",
    slot: "elmo",
    stats: { atk: 1, def: 3, hp: 10 },
    precoVenda: 40
  }
},
{
  nome: "Mitra de Ferro da Vigília",
  icone: "⛑️",
  categoria: "equipamento",
  descricao: "Elmo: +3 ATK, +6 DEF, +18 HP",
  nivelMinimo: 10,
  custoOuro: 220,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Ferro", quantidade: 2 },
    { nome: "Vela Eterna", quantidade: 1 },
    { nome: "Lágrima Espectral", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Mitra de Ferro da Vigília",
    icone: "⛑️",
    slot: "elmo",
    stats: { atk: 3, def: 6, hp: 18 },
    precoVenda: 110
  }
},
{
  nome: "Mitra de Aço Glacial",
  icone: "⛑️",
  categoria: "equipamento",
  descricao: "Elmo: +4 ATK, +10 DEF, +30 HP",
  nivelMinimo: 19,
  custoOuro: 480,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Aço", quantidade: 2 },
    { nome: "Cristal de Gelo", quantidade: 2 },
    { nome: "Essência Gélida", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Mitra de Aço Glacial",
    icone: "⛑️",
    slot: "elmo",
    stats: { atk: 4, def: 10, hp: 30 },
    precoVenda: 240
  }
},
{
  nome: "Mitra de Mithril Redentora",
  icone: "👑",
  categoria: "equipamento",
  descricao: "Elmo: +6 ATK, +14 DEF, +44 HP",
  nivelMinimo: 28,
  custoOuro: 900,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 2 },
    { nome: "Energia Fantasma", quantidade: 1 },
    { nome: "Objeto Amaldiçoado", quantidade: 1 },
    { nome: "Véu Rasgado", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Mitra de Mithril Redentora",
    icone: "👑",
    slot: "elmo",
    stats: { atk: 6, def: 14, hp: 44 },
    precoVenda: 450
  }
},
{
  nome: "Coroa Celestial da Fé",
  icone: "👑",
  categoria: "equipamento",
  descricao: "Elmo: +9 ATK, +18 DEF, +62 HP",
  nivelMinimo: 37,
  custoOuro: 1700,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 3 },
    { nome: "Fragmento de Oricalco", quantidade: 2 },
    { nome: "Asa Divina Corrompida", quantidade: 1 },
    { nome: "Selo Divino Partido", quantidade: 1 },
    { nome: "Luz Profana", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Coroa Celestial da Fé",
    icone: "👑",
    slot: "elmo",
    stats: { atk: 9, def: 18, hp: 62 },
    precoVenda: 850
  }
},

/* ══════════════════════════════════════
   CLÉRIGO — BOTAS
══════════════════════════════════════ */

{
  nome: "Botas de Bronze do Peregrino Sagrado",
  icone: "👢",
  categoria: "equipamento",
  descricao: "Botas: +1 ATK, +4 DEF, +8 HP",
  nivelMinimo: 3,
  custoOuro: 70,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 2 },
    { nome: "Escama Pantanosa", quantidade: 2 },
    { nome: "Dente de Croco", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Botas de Bronze do Peregrino Sagrado",
    icone: "👢",
    slot: "botas",
    stats: { atk: 1, def: 4, hp: 8 },
    precoVenda: 35
  }
},
{
  nome: "Botas de Ferro da Vigília",
  icone: "👢",
  categoria: "equipamento",
  descricao: "Botas: +3 ATK, +7 DEF, +14 HP",
  nivelMinimo: 10,
  custoOuro: 200,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Ferro", quantidade: 2 },
    { nome: "Lágrima Espectral", quantidade: 2 },
    { nome: "Vela Eterna", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Botas de Ferro da Vigília",
    icone: "👢",
    slot: "botas",
    stats: { atk: 3, def: 7, hp: 14 },
    precoVenda: 100
  }
},
{
  nome: "Botas de Aço Santificadas",
  icone: "👢",
  categoria: "equipamento",
  descricao: "Botas: +4 ATK, +11 DEF, +24 HP",
  nivelMinimo: 19,
  custoOuro: 450,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Aço", quantidade: 2 },
    { nome: "Cristal de Gelo", quantidade: 1 },
    { nome: "Essência Gélida", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Botas de Aço Santificadas",
    icone: "👢",
    slot: "botas",
    stats: { atk: 4, def: 11, hp: 24 },
    precoVenda: 225
  }
},
{
  nome: "Botas de Mithril da Misericórdia",
  icone: "👢",
  categoria: "equipamento",
  descricao: "Botas: +6 ATK, +15 DEF, +36 HP",
  nivelMinimo: 28,
  custoOuro: 850,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 2 },
    { nome: "Energia Fantasma", quantidade: 2 },
    { nome: "Objeto Amaldiçoado", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Botas de Mithril da Misericórdia",
    icone: "👢",
    slot: "botas",
    stats: { atk: 6, def: 15, hp: 36 },
    precoVenda: 425
  }
},
{
  nome: "Botas Celestiais da Salvação",
  icone: "👢",
  categoria: "equipamento",
  descricao: "Botas: +9 ATK, +20 DEF, +52 HP",
  nivelMinimo: 37,
  custoOuro: 1600,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 3 },
    { nome: "Fragmento de Oricalco", quantidade: 2 },
    { nome: "Bênção Corrupta", quantidade: 1 },
    { nome: "Asa Divina Corrompida", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Botas Celestiais da Salvação",
    icone: "👢",
    slot: "botas",
    stats: { atk: 9, def: 20, hp: 52 },
    precoVenda: 800
  }
},

/* ══════════════════════════════════════
   CLÉRIGO — ANÉIS
══════════════════════════════════════ */

{
  nome: "Anel de Bronze da Oração Sagrada",
  icone: "💍",
  categoria: "equipamento",
  descricao: "Anel: +2 ATK, +4 DEF, +12 HP",
  nivelMinimo: 3,
  custoOuro: 70,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 1 },
    { nome: "Moeda Antiga", quantidade: 2 },
    { nome: "Essência Silvestre", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Anel de Bronze da Oração Sagrada",
    icone: "💍",
    slot: "anel",
    stats: { atk: 2, def: 4, hp: 12 },
    precoVenda: 35
  }
},
{
  nome: "Anel de Ferro da Vigília",
  icone: "💍",
  categoria: "equipamento",
  descricao: "Anel: +5 ATK, +8 DEF, +20 HP",
  nivelMinimo: 10,
  custoOuro: 180,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Ferro", quantidade: 2 },
    { nome: "Lágrima Espectral", quantidade: 2 },
    { nome: "Vela Eterna", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Anel de Ferro da Vigília",
    icone: "💍",
    slot: "anel",
    stats: { atk: 5, def: 8, hp: 20 },
    precoVenda: 90
  }
},
{
  nome: "Anel de Aço da Cura",
  icone: "💍",
  categoria: "equipamento",
  descricao: "Anel: +7 ATK, +12 DEF, +30 HP",
  nivelMinimo: 19,
  custoOuro: 420,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Aço", quantidade: 2 },
    { nome: "Núcleo Glacial", quantidade: 1 },
    { nome: "Cristal de Gelo", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Anel de Aço da Cura",
    icone: "💍",
    slot: "anel",
    stats: { atk: 7, def: 12, hp: 30 },
    precoVenda: 210
  }
},
{
  nome: "Anel de Mithril Redentor",
  icone: "💍",
  categoria: "equipamento",
  descricao: "Anel: +10 ATK, +16 DEF, +44 HP",
  nivelMinimo: 28,
  custoOuro: 780,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 2 },
    { nome: "Energia Fantasma", quantidade: 1 },
    { nome: "Objeto Amaldiçoado", quantidade: 1 },
    { nome: "Véu Rasgado", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Anel de Mithril Redentor",
    icone: "💍",
    slot: "anel",
    stats: { atk: 10, def: 16, hp: 44 },
    precoVenda: 390
  }
},
{
  nome: "Anel Celestial da Graça",
  icone: "💍",
  categoria: "equipamento",
  descricao: "Anel: +14 ATK, +22 DEF, +64 HP",
  nivelMinimo: 37,
  custoOuro: 1500,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Fragmento de Oricalco", quantidade: 2 },
    { nome: "Bênção Corrupta", quantidade: 2 },
    { nome: "Luz Profana", quantidade: 1 },
    { nome: "Asa Divina Corrompida", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Anel Celestial da Graça",
    icone: "💍",
    slot: "anel",
    stats: { atk: 14, def: 22, hp: 64 },
    precoVenda: 750
  }
},

/* ══════════════════════════════════════
   CLÉRIGO — AMULETOS
══════════════════════════════════════ */

{
  nome: "Amuleto de Bronze da Benção Sagrada",
  icone: "📿",
  categoria: "equipamento",
  descricao: "Amuleto: +2 ATK, +3 DEF, +14 HP",
  nivelMinimo: 3,
  custoOuro: 75,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 1 },
    { nome: "Essência Silvestre", quantidade: 2 },
    { nome: "Fruto da Floresta", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Amuleto de Bronze da Benção Sagrada",
    icone: "📿",
    slot: "amuleto",
    stats: { atk: 2, def: 3, hp: 14 },
    precoVenda: 37
  }
},
{
  nome: "Amuleto de Ferro Sagrado",
  icone: "📿",
  categoria: "equipamento",
  descricao: "Amuleto: +6 ATK, +6 DEF, +22 HP",
  nivelMinimo: 10,
  custoOuro: 190,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Ferro", quantidade: 2 },
    { nome: "Lágrima Espectral", quantidade: 2 },
    { nome: "Vela Eterna", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Amuleto de Ferro Sagrado",
    icone: "📿",
    slot: "amuleto",
    stats: { atk: 6, def: 6, hp: 22 },
    precoVenda: 95
  }
},
{
  nome: "Amuleto de Aço da Aurora",
  icone: "📿",
  categoria: "equipamento",
  descricao: "Amuleto: +9 ATK, +10 DEF, +34 HP",
  nivelMinimo: 19,
  custoOuro: 430,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Aço", quantidade: 2 },
    { nome: "Cristal de Gelo", quantidade: 2 },
    { nome: "Essência Gélida", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Amuleto de Aço da Aurora",
    icone: "📿",
    slot: "amuleto",
    stats: { atk: 9, def: 10, hp: 34 },
    precoVenda: 215
  }
},
{
  nome: "Amuleto de Mithril da Misericórdia",
  icone: "📿",
  categoria: "equipamento",
  descricao: "Amuleto: +13 ATK, +14 DEF, +48 HP",
  nivelMinimo: 28,
  custoOuro: 800,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 2 },
    { nome: "Energia Fantasma", quantidade: 2 },
    { nome: "Objeto Amaldiçoado", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Amuleto de Mithril da Misericórdia",
    icone: "📿",
    slot: "amuleto",
    stats: { atk: 13, def: 14, hp: 48 },
    precoVenda: 400
  }
},
{
  nome: "Amuleto Celestial da Salvação",
  icone: "📿",
  categoria: "equipamento",
  descricao: "Amuleto: +18 ATK, +20 DEF, +70 HP",
  nivelMinimo: 37,
  custoOuro: 1550,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Fragmento de Oricalco", quantidade: 2 },
    { nome: "Luz Profana", quantidade: 1 },
    { nome: "Bênção Corrupta", quantidade: 1 },
    { nome: "Asa Divina Corrompida", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Amuleto Celestial da Salvação",
    icone: "📿",
    slot: "amuleto",
    stats: { atk: 18, def: 20, hp: 70 },
    precoVenda: 775
  }
},
/* ══════════════════════════════════════
   CLÉRIGO — ELMOS
══════════════════════════════════════ */

{
  nome: "Mitra de Bronze da Benção Sagrada",
  icone: "⛑️",
  categoria: "equipamento",
  descricao: "Elmo: +1 ATK, +3 DEF, +10 HP",
  nivelMinimo: 3,
  custoOuro: 80,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 2 },
    { nome: "Essência Silvestre", quantidade: 2 },
    { nome: "Fruto da Floresta", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Mitra de Bronze da Benção Sagrada",
    icone: "⛑️",
    slot: "elmo",
    stats: { atk: 1, def: 3, hp: 10 },
    precoVenda: 40
  }
},
{
  nome: "Mitra de Ferro da Vigília",
  icone: "⛑️",
  categoria: "equipamento",
  descricao: "Elmo: +3 ATK, +6 DEF, +18 HP",
  nivelMinimo: 10,
  custoOuro: 220,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Ferro", quantidade: 2 },
    { nome: "Vela Eterna", quantidade: 1 },
    { nome: "Lágrima Espectral", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Mitra de Ferro da Vigília",
    icone: "⛑️",
    slot: "elmo",
    stats: { atk: 3, def: 6, hp: 18 },
    precoVenda: 110
  }
},
{
  nome: "Mitra de Aço Glacial",
  icone: "⛑️",
  categoria: "equipamento",
  descricao: "Elmo: +4 ATK, +10 DEF, +30 HP",
  nivelMinimo: 19,
  custoOuro: 480,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Aço", quantidade: 2 },
    { nome: "Cristal de Gelo", quantidade: 2 },
    { nome: "Essência Gélida", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Mitra de Aço Glacial",
    icone: "⛑️",
    slot: "elmo",
    stats: { atk: 4, def: 10, hp: 30 },
    precoVenda: 240
  }
},
{
  nome: "Mitra de Mithril Redentora",
  icone: "👑",
  categoria: "equipamento",
  descricao: "Elmo: +6 ATK, +14 DEF, +44 HP",
  nivelMinimo: 28,
  custoOuro: 900,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 2 },
    { nome: "Energia Fantasma", quantidade: 1 },
    { nome: "Objeto Amaldiçoado", quantidade: 1 },
    { nome: "Véu Rasgado", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Mitra de Mithril Redentora",
    icone: "👑",
    slot: "elmo",
    stats: { atk: 6, def: 14, hp: 44 },
    precoVenda: 450
  }
},
{
  nome: "Coroa Celestial da Fé",
  icone: "👑",
  categoria: "equipamento",
  descricao: "Elmo: +9 ATK, +18 DEF, +62 HP",
  nivelMinimo: 37,
  custoOuro: 1700,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 3 },
    { nome: "Fragmento de Oricalco", quantidade: 2 },
    { nome: "Asa Divina Corrompida", quantidade: 1 },
    { nome: "Selo Divino Partido", quantidade: 1 },
    { nome: "Luz Profana", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Coroa Celestial da Fé",
    icone: "👑",
    slot: "elmo",
    stats: { atk: 9, def: 18, hp: 62 },
    precoVenda: 850
  }
},

/* ══════════════════════════════════════
   CLÉRIGO — BOTAS
══════════════════════════════════════ */

{
  nome: "Botas de Bronze do Peregrino Sagrado",
  icone: "👢",
  categoria: "equipamento",
  descricao: "Botas: +1 ATK, +4 DEF, +8 HP",
  nivelMinimo: 3,
  custoOuro: 70,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 2 },
    { nome: "Escama Pantanosa", quantidade: 2 },
    { nome: "Dente de Croco", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Botas de Bronze do Peregrino Sagrado",
    icone: "👢",
    slot: "botas",
    stats: { atk: 1, def: 4, hp: 8 },
    precoVenda: 35
  }
},
{
  nome: "Botas de Ferro da Vigília",
  icone: "👢",
  categoria: "equipamento",
  descricao: "Botas: +3 ATK, +7 DEF, +14 HP",
  nivelMinimo: 10,
  custoOuro: 200,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Ferro", quantidade: 2 },
    { nome: "Lágrima Espectral", quantidade: 2 },
    { nome: "Vela Eterna", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Botas de Ferro da Vigília",
    icone: "👢",
    slot: "botas",
    stats: { atk: 3, def: 7, hp: 14 },
    precoVenda: 100
  }
},
{
  nome: "Botas de Aço Santificadas",
  icone: "👢",
  categoria: "equipamento",
  descricao: "Botas: +4 ATK, +11 DEF, +24 HP",
  nivelMinimo: 19,
  custoOuro: 450,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Aço", quantidade: 2 },
    { nome: "Cristal de Gelo", quantidade: 1 },
    { nome: "Essência Gélida", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Botas de Aço Santificadas",
    icone: "👢",
    slot: "botas",
    stats: { atk: 4, def: 11, hp: 24 },
    precoVenda: 225
  }
},
{
  nome: "Botas de Mithril da Misericórdia",
  icone: "👢",
  categoria: "equipamento",
  descricao: "Botas: +6 ATK, +15 DEF, +36 HP",
  nivelMinimo: 28,
  custoOuro: 850,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 2 },
    { nome: "Energia Fantasma", quantidade: 2 },
    { nome: "Objeto Amaldiçoado", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Botas de Mithril da Misericórdia",
    icone: "👢",
    slot: "botas",
    stats: { atk: 6, def: 15, hp: 36 },
    precoVenda: 425
  }
},
{
  nome: "Botas Celestiais da Salvação",
  icone: "👢",
  categoria: "equipamento",
  descricao: "Botas: +9 ATK, +20 DEF, +52 HP",
  nivelMinimo: 37,
  custoOuro: 1600,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 3 },
    { nome: "Fragmento de Oricalco", quantidade: 2 },
    { nome: "Bênção Corrupta", quantidade: 1 },
    { nome: "Asa Divina Corrompida", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Botas Celestiais da Salvação",
    icone: "👢",
    slot: "botas",
    stats: { atk: 9, def: 20, hp: 52 },
    precoVenda: 800
  }
},

/* ══════════════════════════════════════
   CLÉRIGO — ANÉIS
══════════════════════════════════════ */

{
  nome: "Anel de Bronze da Oração Sagrada",
  icone: "💍",
  categoria: "equipamento",
  descricao: "Anel: +2 ATK, +4 DEF, +12 HP",
  nivelMinimo: 3,
  custoOuro: 70,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 1 },
    { nome: "Moeda Antiga", quantidade: 2 },
    { nome: "Essência Silvestre", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Anel de Bronze da Oração Sagrada",
    icone: "💍",
    slot: "anel",
    stats: { atk: 2, def: 4, hp: 12 },
    precoVenda: 35
  }
},
{
  nome: "Anel de Ferro da Vigília",
  icone: "💍",
  categoria: "equipamento",
  descricao: "Anel: +5 ATK, +8 DEF, +20 HP",
  nivelMinimo: 10,
  custoOuro: 180,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Ferro", quantidade: 2 },
    { nome: "Lágrima Espectral", quantidade: 2 },
    { nome: "Vela Eterna", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Anel de Ferro da Vigília",
    icone: "💍",
    slot: "anel",
    stats: { atk: 5, def: 8, hp: 20 },
    precoVenda: 90
  }
},
{
  nome: "Anel de Aço da Cura",
  icone: "💍",
  categoria: "equipamento",
  descricao: "Anel: +7 ATK, +12 DEF, +30 HP",
  nivelMinimo: 19,
  custoOuro: 420,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Aço", quantidade: 2 },
    { nome: "Núcleo Glacial", quantidade: 1 },
    { nome: "Cristal de Gelo", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Anel de Aço da Cura",
    icone: "💍",
    slot: "anel",
    stats: { atk: 7, def: 12, hp: 30 },
    precoVenda: 210
  }
},
{
  nome: "Anel de Mithril Redentor",
  icone: "💍",
  categoria: "equipamento",
  descricao: "Anel: +10 ATK, +16 DEF, +44 HP",
  nivelMinimo: 28,
  custoOuro: 780,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 2 },
    { nome: "Energia Fantasma", quantidade: 1 },
    { nome: "Objeto Amaldiçoado", quantidade: 1 },
    { nome: "Véu Rasgado", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Anel de Mithril Redentor",
    icone: "💍",
    slot: "anel",
    stats: { atk: 10, def: 16, hp: 44 },
    precoVenda: 390
  }
},
{
  nome: "Anel Celestial da Graça",
  icone: "💍",
  categoria: "equipamento",
  descricao: "Anel: +14 ATK, +22 DEF, +64 HP",
  nivelMinimo: 37,
  custoOuro: 1500,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Fragmento de Oricalco", quantidade: 2 },
    { nome: "Bênção Corrupta", quantidade: 2 },
    { nome: "Luz Profana", quantidade: 1 },
    { nome: "Asa Divina Corrompida", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Anel Celestial da Graça",
    icone: "💍",
    slot: "anel",
    stats: { atk: 14, def: 22, hp: 64 },
    precoVenda: 750
  }
},

/* ══════════════════════════════════════
   CLÉRIGO — AMULETOS
══════════════════════════════════════ */

{
  nome: "Amuleto de Bronze da Benção Sagrada",
  icone: "📿",
  categoria: "equipamento",
  descricao: "Amuleto: +2 ATK, +3 DEF, +14 HP",
  nivelMinimo: 3,
  custoOuro: 75,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 1 },
    { nome: "Essência Silvestre", quantidade: 2 },
    { nome: "Fruto da Floresta", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Amuleto de Bronze da Benção Sagrada",
    icone: "📿",
    slot: "amuleto",
    stats: { atk: 2, def: 3, hp: 14 },
    precoVenda: 37
  }
},
{
  nome: "Amuleto de Ferro Sagrado",
  icone: "📿",
  categoria: "equipamento",
  descricao: "Amuleto: +6 ATK, +6 DEF, +22 HP",
  nivelMinimo: 10,
  custoOuro: 190,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Ferro", quantidade: 2 },
    { nome: "Lágrima Espectral", quantidade: 2 },
    { nome: "Vela Eterna", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Amuleto de Ferro Sagrado",
    icone: "📿",
    slot: "amuleto",
    stats: { atk: 6, def: 6, hp: 22 },
    precoVenda: 95
  }
},
{
  nome: "Amuleto de Aço da Aurora",
  icone: "📿",
  categoria: "equipamento",
  descricao: "Amuleto: +9 ATK, +10 DEF, +34 HP",
  nivelMinimo: 19,
  custoOuro: 430,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Aço", quantidade: 2 },
    { nome: "Cristal de Gelo", quantidade: 2 },
    { nome: "Essência Gélida", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Amuleto de Aço da Aurora",
    icone: "📿",
    slot: "amuleto",
    stats: { atk: 9, def: 10, hp: 34 },
    precoVenda: 215
  }
},
{
  nome: "Amuleto de Mithril da Misericórdia",
  icone: "📿",
  categoria: "equipamento",
  descricao: "Amuleto: +13 ATK, +14 DEF, +48 HP",
  nivelMinimo: 28,
  custoOuro: 800,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 2 },
    { nome: "Energia Fantasma", quantidade: 2 },
    { nome: "Objeto Amaldiçoado", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Amuleto de Mithril da Misericórdia",
    icone: "📿",
    slot: "amuleto",
    stats: { atk: 13, def: 14, hp: 48 },
    precoVenda: 400
  }
},
{
  nome: "Amuleto Celestial da Salvação",
  icone: "📿",
  categoria: "equipamento",
  descricao: "Amuleto: +18 ATK, +20 DEF, +70 HP",
  nivelMinimo: 37,
  custoOuro: 1550,
  classePermitida: "clerigo",
  ingredientes: [
    { nome: "Fragmento de Oricalco", quantidade: 2 },
    { nome: "Luz Profana", quantidade: 1 },
    { nome: "Bênção Corrupta", quantidade: 1 },
    { nome: "Asa Divina Corrompida", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Amuleto Celestial da Salvação",
    icone: "📿",
    slot: "amuleto",
    stats: { atk: 18, def: 20, hp: 70 },
    precoVenda: 775
  }
},
/* ══════════════════════════════════════
   MONGE — ARMAS
══════════════════════════════════════ */

{
  nome: "Manoplas de Bronze do Iniciado Marcial",
  icone: "🥊",
  categoria: "equipamento",
  descricao: "Arma: +5 ATK, +2 DEF",
  nivelMinimo: 3,
  custoOuro: 100,
  classePermitida: "monge",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 3 },
    { nome: "Minério de Estanho", quantidade: 2 },
    { nome: "Couro Grosso", quantidade: 2 },
    { nome: "Pele de Lobo", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Manoplas de Bronze do Iniciado Marcial",
    icone: "🥊",
    slot: "arma",
    stats: { atk: 5, def: 2, hp: 0 },
    precoVenda: 50
  }
},
{
  nome: "Garras de Ferro do Mestre",
  icone: "🥊",
  categoria: "equipamento",
  descricao: "Arma: +11 ATK, +4 DEF, +8 HP",
  nivelMinimo: 10,
  custoOuro: 280,
  classePermitida: "monge",
  ingredientes: [
    { nome: "Minério de Ferro", quantidade: 3 },
    { nome: "Pepita de Prata", quantidade: 1 },
    { nome: "Pele de Warg", quantidade: 2 },
    { nome: "Ferradura Antiga", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Garras de Ferro do Mestre",
    icone: "🥊",
    slot: "arma",
    stats: { atk: 11, def: 4, hp: 8 },
    precoVenda: 140
  }
},
{
  nome: "Punhos de Aço do Cristal",
  icone: "🥊",
  categoria: "equipamento",
  descricao: "Arma: +20 ATK, +6 DEF, +14 HP",
  nivelMinimo: 19,
  custoOuro: 650,
  classePermitida: "monge",
  ingredientes: [
    { nome: "Minério de Aço", quantidade: 3 },
    { nome: "Fragmento de Cristal", quantidade: 2 },
    { nome: "Pó Luminoso", quantidade: 1 },
    { nome: "Dente de Verme", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Punhos de Aço do Cristal",
    icone: "🥊",
    slot: "arma",
    stats: { atk: 20, def: 6, hp: 14 },
    precoVenda: 325
  }
},
{
  nome: "Punhos de Mithril da Serenidade",
  icone: "🥊",
  categoria: "equipamento",
  descricao: "Arma: +29 ATK, +8 DEF, +24 HP",
  nivelMinimo: 28,
  custoOuro: 1200,
  classePermitida: "monge",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 4 },
    { nome: "Fragmento de Oricalco", quantidade: 1 },
    { nome: "Energia Fantasma", quantidade: 2 },
    { nome: "Fragmento de Sombra", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Punhos de Mithril da Serenidade",
    icone: "🥊",
    slot: "arma",
    stats: { atk: 29, def: 8, hp: 24 },
    precoVenda: 600
  }
},
{
  nome: "Punhos Astrais do Tigre Divino",
  icone: "🐲",
  categoria: "equipamento",
  descricao: "Arma: +40 ATK, +10 DEF, +36 HP, roubo de vida 4%",
  nivelMinimo: 37,
  custoOuro: 2200,
  classePermitida: "monge",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 5 },
    { nome: "Fragmento de Oricalco", quantidade: 3 },
    { nome: "Punho Titânico", quantidade: 1 },
    { nome: "Poeira Estelar", quantidade: 2 },
    { nome: "Bênção Corrupta", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Punhos Astrais do Tigre Divino",
    icone: "🐲",
    slot: "arma",
    stats: { atk: 40, def: 10, hp: 36, rouboVida: 4 },
    precoVenda: 1100
  }
},

/* ══════════════════════════════════════
   MONGE — ARMADURAS
══════════════════════════════════════ */

{
  nome: "Túnica de Bronze da Disciplina Marcial",
  icone: "🥋",
  categoria: "equipamento",
  descricao: "Armadura: +3 ATK, +4 DEF, +10 HP",
  nivelMinimo: 3,
  custoOuro: 100,
  classePermitida: "monge",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 3 },
    { nome: "Minério de Estanho", quantidade: 1 },
    { nome: "Couro Grosso", quantidade: 2 },
    { nome: "Seda de Aranha", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Túnica de Bronze da Disciplina Marcial",
    icone: "🥋",
    slot: "armadura",
    stats: { atk: 3, def: 4, hp: 10 },
    precoVenda: 50
  }
},
{
  nome: "Túnica de Ferro do Equilíbrio",
  icone: "🥋",
  categoria: "equipamento",
  descricao: "Armadura: +6 ATK, +7 DEF, +18 HP",
  nivelMinimo: 10,
  custoOuro: 300,
  classePermitida: "monge",
  ingredientes: [
    { nome: "Minério de Ferro", quantidade: 4 },
    { nome: "Pepita de Prata", quantidade: 1 },
    { nome: "Pele de Warg", quantidade: 2 },
    { nome: "Ferradura Antiga", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Túnica de Ferro do Equilíbrio",
    icone: "🥋",
    slot: "armadura",
    stats: { atk: 6, def: 7, hp: 18 },
    precoVenda: 150
  }
},
{
  nome: "Túnica de Aço da Montanha",
  icone: "🥋",
  categoria: "equipamento",
  descricao: "Armadura: +9 ATK, +11 DEF, +30 HP",
  nivelMinimo: 19,
  custoOuro: 700,
  classePermitida: "monge",
  ingredientes: [
    { nome: "Minério de Aço", quantidade: 4 },
    { nome: "Fragmento de Granito", quantidade: 2 },
    { nome: "Escama Rochosa", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Túnica de Aço da Montanha",
    icone: "🥋",
    slot: "armadura",
    stats: { atk: 9, def: 11, hp: 30 },
    precoVenda: 350
  }
},
{
  nome: "Túnica de Mithril da Quietude",
  icone: "🥋",
  categoria: "equipamento",
  descricao: "Armadura: +13 ATK, +15 DEF, +44 HP",
  nivelMinimo: 28,
  custoOuro: 1300,
  classePermitida: "monge",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 4 },
    { nome: "Fragmento de Oricalco", quantidade: 1 },
    { nome: "Energia Fantasma", quantidade: 1 },
    { nome: "Véu Rasgado", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Túnica de Mithril da Quietude",
    icone: "🥋",
    slot: "armadura",
    stats: { atk: 13, def: 15, hp: 44 },
    precoVenda: 650
  }
},
{
  nome: "Túnica Astral do Dragão Interior",
  icone: "🥋",
  categoria: "equipamento",
  descricao: "Armadura: +18 ATK, +20 DEF, +66 HP",
  nivelMinimo: 37,
  custoOuro: 2400,
  classePermitida: "monge",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 5 },
    { nome: "Fragmento de Oricalco", quantidade: 3 },
    { nome: "Punho Titânico", quantidade: 1 },
    { nome: "Poeira Estelar", quantidade: 2 },
    { nome: "Fragmento da Realidade", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Túnica Astral do Dragão Interior",
    icone: "🥋",
    slot: "armadura",
    stats: { atk: 18, def: 20, hp: 66 },
    precoVenda: 1200
  }
},

/* ══════════════════════════════════════
   MONGE — ELMOS
══════════════════════════════════════ */

{
  nome: "Faixa de Bronze do Iniciado Marcial",
  icone: "🎍",
  categoria: "equipamento",
  descricao: "Elmo: +2 ATK, +2 DEF, +6 HP",
  nivelMinimo: 3,
  custoOuro: 80,
  classePermitida: "monge",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 2 },
    { nome: "Couro Grosso", quantidade: 2 },
    { nome: "Pena Noturna", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Faixa de Bronze do Iniciado Marcial",
    icone: "🎍",
    slot: "elmo",
    stats: { atk: 2, def: 2, hp: 6 },
    precoVenda: 40
  }
},
{
  nome: "Faixa de Ferro do Mestre",
  icone: "🎍",
  categoria: "equipamento",
  descricao: "Elmo: +4 ATK, +4 DEF, +12 HP",
  nivelMinimo: 10,
  custoOuro: 220,
  classePermitida: "monge",
  ingredientes: [
    { nome: "Minério de Ferro", quantidade: 2 },
    { nome: "Pele de Warg", quantidade: 2 },
    { nome: "Ferradura Antiga", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Faixa de Ferro do Mestre",
    icone: "🎍",
    slot: "elmo",
    stats: { atk: 4, def: 4, hp: 12 },
    precoVenda: 110
  }
},
{
  nome: "Faixa de Aço da Rocha",
  icone: "🎍",
  categoria: "equipamento",
  descricao: "Elmo: +6 ATK, +7 DEF, +20 HP",
  nivelMinimo: 19,
  custoOuro: 480,
  classePermitida: "monge",
  ingredientes: [
    { nome: "Minério de Aço", quantidade: 2 },
    { nome: "Fragmento de Granito", quantidade: 2 },
    { nome: "Escama Rochosa", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Faixa de Aço da Rocha",
    icone: "🎍",
    slot: "elmo",
    stats: { atk: 6, def: 7, hp: 20 },
    precoVenda: 240
  }
},
{
  nome: "Faixa de Mithril do Espírito",
  icone: "🎍",
  categoria: "equipamento",
  descricao: "Elmo: +8 ATK, +10 DEF, +30 HP",
  nivelMinimo: 28,
  custoOuro: 900,
  classePermitida: "monge",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 2 },
    { nome: "Energia Fantasma", quantidade: 1 },
    { nome: "Fragmento de Sombra", quantidade: 1 },
    { nome: "Objeto Amaldiçoado", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Faixa de Mithril do Espírito",
    icone: "🎍",
    slot: "elmo",
    stats: { atk: 8, def: 10, hp: 30 },
    precoVenda: 450
  }
},
{
  nome: "Faixa Astral da Iluminação",
  icone: "👑",
  categoria: "equipamento",
  descricao: "Elmo: +11 ATK, +14 DEF, +46 HP",
  nivelMinimo: 37,
  custoOuro: 1700,
  classePermitida: "monge",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 3 },
    { nome: "Fragmento de Oricalco", quantidade: 2 },
    { nome: "Punho Titânico", quantidade: 1 },
    { nome: "Poeira Estelar", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Faixa Astral da Iluminação",
    icone: "👑",
    slot: "elmo",
    stats: { atk: 11, def: 14, hp: 46 },
    precoVenda: 850
  }
},

/* ══════════════════════════════════════
   MONGE — BOTAS
══════════════════════════════════════ */

{
  nome: "Sandálias de Bronze do Fluxo Marcial",
  icone: "👢",
  categoria: "equipamento",
  descricao: "Botas: +3 ATK, +3 DEF, +4 HP",
  nivelMinimo: 3,
  custoOuro: 70,
  classePermitida: "monge",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 2 },
    { nome: "Pele de Lobo", quantidade: 2 },
    { nome: "Ferradura Antiga", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Sandálias de Bronze do Fluxo Marcial",
    icone: "👢",
    slot: "botas",
    stats: { atk: 3, def: 3, hp: 4 },
    precoVenda: 35
  }
},
{
  nome: "Sandálias de Ferro do Vento",
  icone: "👢",
  categoria: "equipamento",
  descricao: "Botas: +6 ATK, +5 DEF, +10 HP",
  nivelMinimo: 10,
  custoOuro: 200,
  classePermitida: "monge",
  ingredientes: [
    { nome: "Minério de Ferro", quantidade: 2 },
    { nome: "Pele de Warg", quantidade: 2 },
    { nome: "Ferradura Antiga", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Sandálias de Ferro do Vento",
    icone: "👢",
    slot: "botas",
    stats: { atk: 6, def: 5, hp: 10 },
    precoVenda: 100
  }
},
{
  nome: "Sandálias de Aço da Rocha",
  icone: "👢",
  categoria: "equipamento",
  descricao: "Botas: +9 ATK, +7 DEF, +18 HP",
  nivelMinimo: 19,
  custoOuro: 450,
  classePermitida: "monge",
  ingredientes: [
    { nome: "Minério de Aço", quantidade: 2 },
    { nome: "Fragmento de Granito", quantidade: 2 },
    { nome: "Escama Rochosa", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Sandálias de Aço da Rocha",
    icone: "👢",
    slot: "botas",
    stats: { atk: 9, def: 7, hp: 18 },
    precoVenda: 225
  }
},
{
  nome: "Sandálias de Mithril Serenas",
  icone: "👢",
  categoria: "equipamento",
  descricao: "Botas: +12 ATK, +9 DEF, +28 HP",
  nivelMinimo: 28,
  custoOuro: 850,
  classePermitida: "monge",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 2 },
    { nome: "Energia Fantasma", quantidade: 1 },
    { nome: "Fragmento de Sombra", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Sandálias de Mithril Serenas",
    icone: "👢",
    slot: "botas",
    stats: { atk: 12, def: 9, hp: 28 },
    precoVenda: 425
  }
},
{
  nome: "Sandálias Astrais do Dragão",
  icone: "👢",
  categoria: "equipamento",
  descricao: "Botas: +16 ATK, +12 DEF, +42 HP",
  nivelMinimo: 37,
  custoOuro: 1600,
  classePermitida: "monge",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 3 },
    { nome: "Fragmento de Oricalco", quantidade: 2 },
    { nome: "Punho Titânico", quantidade: 1 },
    { nome: "Poeira Estelar", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Sandálias Astrais do Dragão",
    icone: "👢",
    slot: "botas",
    stats: { atk: 16, def: 12, hp: 42 },
    precoVenda: 800
  }
},

/* ══════════════════════════════════════
   MONGE — ANÉIS
══════════════════════════════════════ */

{
  nome: "Anel de Bronze do Equilíbrio Marcial",
  icone: "💍",
  categoria: "equipamento",
  descricao: "Anel: +4 ATK, +3 DEF, +6 HP",
  nivelMinimo: 3,
  custoOuro: 70,
  classePermitida: "monge",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 1 },
    { nome: "Moeda Antiga", quantidade: 2 },
    { nome: "Pena Noturna", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Anel de Bronze do Equilíbrio Marcial",
    icone: "💍",
    slot: "anel",
    stats: { atk: 4, def: 3, hp: 6 },
    precoVenda: 35
  }
},
{
  nome: "Anel de Ferro do Mestre",
  icone: "💍",
  categoria: "equipamento",
  descricao: "Anel: +8 ATK, +5 DEF, +12 HP",
  nivelMinimo: 10,
  custoOuro: 180,
  classePermitida: "monge",
  ingredientes: [
    { nome: "Minério de Ferro", quantidade: 2 },
    { nome: "Pele de Warg", quantidade: 2 },
    { nome: "Ferradura Antiga", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Anel de Ferro do Mestre",
    icone: "💍",
    slot: "anel",
    stats: { atk: 8, def: 5, hp: 12 },
    precoVenda: 90
  }
},
{
  nome: "Anel de Aço da Harmonia",
  icone: "💍",
  categoria: "equipamento",
  descricao: "Anel: +13 ATK, +7 DEF, +18 HP",
  nivelMinimo: 19,
  custoOuro: 420,
  classePermitida: "monge",
  ingredientes: [
    { nome: "Minério de Aço", quantidade: 2 },
    { nome: "Fragmento de Cristal", quantidade: 2 },
    { nome: "Pó Luminoso", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Anel de Aço da Harmonia",
    icone: "💍",
    slot: "anel",
    stats: { atk: 13, def: 7, hp: 18 },
    precoVenda: 210
  }
},
{
  nome: "Anel de Mithril da Serenidade",
  icone: "💍",
  categoria: "equipamento",
  descricao: "Anel: +18 ATK, +9 DEF, +28 HP",
  nivelMinimo: 28,
  custoOuro: 780,
  classePermitida: "monge",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 2 },
    { nome: "Energia Fantasma", quantidade: 1 },
    { nome: "Fragmento de Sombra", quantidade: 1 },
    { nome: "Objeto Amaldiçoado", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Anel de Mithril da Serenidade",
    icone: "💍",
    slot: "anel",
    stats: { atk: 18, def: 9, hp: 28 },
    precoVenda: 390
  }
},
{
  nome: "Anel Astral da Iluminação",
  icone: "💍",
  categoria: "equipamento",
  descricao: "Anel: +25 ATK, +12 DEF, +42 HP",
  nivelMinimo: 37,
  custoOuro: 1500,
  classePermitida: "monge",
  ingredientes: [
    { nome: "Fragmento de Oricalco", quantidade: 2 },
    { nome: "Punho Titânico", quantidade: 1 },
    { nome: "Poeira Estelar", quantidade: 2 },
    { nome: "Fragmento da Realidade", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Anel Astral da Iluminação",
    icone: "💍",
    slot: "anel",
    stats: { atk: 25, def: 12, hp: 42 },
    precoVenda: 750
  }
},
/* ══════════════════════════════════════
   MONGE — AMULETOS
══════════════════════════════════════ */

{
  nome: "Amuleto de Bronze do Espírito Interior",
  icone: "📿",
  categoria: "equipamento",
  descricao: "Amuleto: +3 ATK, +3 DEF, +10 HP",
  nivelMinimo: 3,
  custoOuro: 75,
  classePermitida: "monge",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 1 },
    { nome: "Essência Silvestre", quantidade: 2 },
    { nome: "Pele de Lobo", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Amuleto de Bronze do Espírito Interior",
    icone: "📿",
    slot: "amuleto",
    stats: { atk: 3, def: 3, hp: 10 },
    precoVenda: 37
  }
},
{
  nome: "Amuleto de Ferro da Disciplina",
  icone: "📿",
  categoria: "equipamento",
  descricao: "Amuleto: +7 ATK, +5 DEF, +18 HP",
  nivelMinimo: 10,
  custoOuro: 190,
  classePermitida: "monge",
  ingredientes: [
    { nome: "Minério de Ferro", quantidade: 2 },
    { nome: "Pele de Warg", quantidade: 2 },
    { nome: "Ferradura Antiga", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Amuleto de Ferro da Disciplina",
    icone: "📿",
    slot: "amuleto",
    stats: { atk: 7, def: 5, hp: 18 },
    precoVenda: 95
  }
},
{
  nome: "Amuleto de Aço da Montanha",
  icone: "📿",
  categoria: "equipamento",
  descricao: "Amuleto: +12 ATK, +7 DEF, +28 HP",
  nivelMinimo: 19,
  custoOuro: 430,
  classePermitida: "monge",
  ingredientes: [
    { nome: "Minério de Aço", quantidade: 2 },
    { nome: "Fragmento de Granito", quantidade: 2 },
    { nome: "Escama Rochosa", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Amuleto de Aço da Montanha",
    icone: "📿",
    slot: "amuleto",
    stats: { atk: 12, def: 7, hp: 28 },
    precoVenda: 215
  }
},
{
  nome: "Amuleto de Mithril da Paz",
  icone: "📿",
  categoria: "equipamento",
  descricao: "Amuleto: +17 ATK, +10 DEF, +40 HP",
  nivelMinimo: 28,
  custoOuro: 800,
  classePermitida: "monge",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 2 },
    { nome: "Energia Fantasma", quantidade: 2 },
    { nome: "Fragmento de Sombra", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Amuleto de Mithril da Paz",
    icone: "📿",
    slot: "amuleto",
    stats: { atk: 17, def: 10, hp: 40 },
    precoVenda: 400
  }
},
{
  nome: "Amuleto Astral do Dragão Interior",
  icone: "📿",
  categoria: "equipamento",
  descricao: "Amuleto: +24 ATK, +14 DEF, +58 HP",
  nivelMinimo: 37,
  custoOuro: 1550,
  classePermitida: "monge",
  ingredientes: [
    { nome: "Fragmento de Oricalco", quantidade: 2 },
    { nome: "Punho Titânico", quantidade: 1 },
    { nome: "Poeira Estelar", quantidade: 2 },
    { nome: "Fragmento da Realidade", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Amuleto Astral do Dragão Interior",
    icone: "📿",
    slot: "amuleto",
    stats: { atk: 24, def: 14, hp: 58 },
    precoVenda: 775
  }
},

/* ══════════════════════════════════════
   DRUIDA — ARMAS
══════════════════════════════════════ */

{
  nome: "Cajado de Bronze das Vinhas Ancestrais",
  icone: "🌿",
  categoria: "equipamento",
  descricao: "Arma: +4 ATK, +1 DEF, +8 HP",
  nivelMinimo: 3,
  custoOuro: 100,
  classePermitida: "druida",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 2 },
    { nome: "Minério de Estanho", quantidade: 2 },
    { nome: "Essência Silvestre", quantidade: 2 },
    { nome: "Seiva Ácida", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Cajado de Bronze das Vinhas Ancestrais",
    icone: "🌿",
    slot: "arma",
    stats: { atk: 4, def: 1, hp: 8 },
    precoVenda: 50
  }
},
{
  nome: "Cajado de Ferro da Terra Viva",
  icone: "🌳",
  categoria: "equipamento",
  descricao: "Arma: +9 ATK, +4 DEF, +18 HP",
  nivelMinimo: 10,
  custoOuro: 280,
  classePermitida: "druida",
  ingredientes: [
    { nome: "Minério de Ferro", quantidade: 3 },
    { nome: "Pepita de Prata", quantidade: 1 },
    { nome: "Núcleo de Pedra", quantidade: 1 },
    { nome: "Seiva Ácida", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Cajado de Ferro da Terra Viva",
    icone: "🌳",
    slot: "arma",
    stats: { atk: 9, def: 4, hp: 18 },
    precoVenda: 140
  }
},
{
  nome: "Cajado de Aço do Bosque Ancestral",
  icone: "🌳",
  categoria: "equipamento",
  descricao: "Arma: +16 ATK, +8 DEF, +28 HP",
  nivelMinimo: 19,
  custoOuro: 650,
  classePermitida: "druida",
  ingredientes: [
    { nome: "Minério de Aço", quantidade: 3 },
    { nome: "Pelo de Yeti", quantidade: 2 },
    { nome: "Essência Gélida", quantidade: 1 },
    { nome: "Cristal de Gelo", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Cajado de Aço do Bosque Ancestral",
    icone: "🌳",
    slot: "arma",
    stats: { atk: 16, def: 8, hp: 28 },
    precoVenda: 325
  }
},
{
  nome: "Cajado de Mithril da Lua Verde",
  icone: "🌟",
  categoria: "equipamento",
  descricao: "Arma: +24 ATK, +11 DEF, +42 HP",
  nivelMinimo: 28,
  custoOuro: 1200,
  classePermitida: "druida",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 4 },
    { nome: "Fragmento de Oricalco", quantidade: 1 },
    { nome: "Energia Fantasma", quantidade: 1 },
    { nome: "Essência da Escuridão", quantidade: 1 },
    { nome: "Véu Rasgado", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Cajado de Mithril da Lua Verde",
    icone: "🌟",
    slot: "arma",
    stats: { atk: 24, def: 11, hp: 42 },
    precoVenda: 600
  }
},
{
  nome: "Cajado Astral da Mãe Natureza",
  icone: "🌌",
  categoria: "equipamento",
  descricao: "Arma: +34 ATK, +15 DEF, +64 HP, roubo de vida 4%",
  nivelMinimo: 37,
  custoOuro: 2200,
  classePermitida: "druida",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 5 },
    { nome: "Fragmento de Oricalco", quantidade: 3 },
    { nome: "Essência Astral", quantidade: 2 },
    { nome: "Poeira Estelar", quantidade: 2 },
    { nome: "Cristal Cósmico", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Cajado Astral da Mãe Natureza",
    icone: "🌌",
    slot: "arma",
    stats: { atk: 34, def: 15, hp: 64, rouboVida: 4 },
    precoVenda: 1100
  }
},

/* ══════════════════════════════════════
   DRUIDA — ARMADURAS
══════════════════════════════════════ */

{
  nome: "Vestes de Bronze do Bosque Verdejante",
  icone: "🍃",
  categoria: "equipamento",
  descricao: "Armadura: +2 ATK, +4 DEF, +12 HP",
  nivelMinimo: 3,
  custoOuro: 100,
  classePermitida: "druida",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 3 },
    { nome: "Minério de Estanho", quantidade: 1 },
    { nome: "Essência Silvestre", quantidade: 2 },
    { nome: "Couro Grosso", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Vestes de Bronze do Bosque Verdejante",
    icone: "🍃",
    slot: "armadura",
    stats: { atk: 2, def: 4, hp: 12 },
    precoVenda: 50
  }
},
{
  nome: "Vestes de Ferro da Floresta Viva",
  icone: "🍃",
  categoria: "equipamento",
  descricao: "Armadura: +5 ATK, +7 DEF, +22 HP",
  nivelMinimo: 10,
  custoOuro: 300,
  classePermitida: "druida",
  ingredientes: [
    { nome: "Minério de Ferro", quantidade: 4 },
    { nome: "Pepita de Prata", quantidade: 1 },
    { nome: "Núcleo de Pedra", quantidade: 1 },
    { nome: "Seiva Ácida", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Vestes de Ferro da Floresta Viva",
    icone: "🍃",
    slot: "armadura",
    stats: { atk: 5, def: 7, hp: 22 },
    precoVenda: 150
  }
},
{
  nome: "Vestes de Aço do Inverno Verde",
  icone: "🍃",
  categoria: "equipamento",
  descricao: "Armadura: +8 ATK, +12 DEF, +36 HP",
  nivelMinimo: 19,
  custoOuro: 700,
  classePermitida: "druida",
  ingredientes: [
    { nome: "Minério de Aço", quantidade: 4 },
    { nome: "Pelo de Yeti", quantidade: 2 },
    { nome: "Cristal de Gelo", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Vestes de Aço do Inverno Verde",
    icone: "🍃",
    slot: "armadura",
    stats: { atk: 8, def: 12, hp: 36 },
    precoVenda: 350
  }
},
{
  nome: "Vestes de Mithril da Lua",
  icone: "🍃",
  categoria: "equipamento",
  descricao: "Armadura: +11 ATK, +16 DEF, +52 HP",
  nivelMinimo: 28,
  custoOuro: 1300,
  classePermitida: "druida",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 4 },
    { nome: "Fragmento de Oricalco", quantidade: 1 },
    { nome: "Energia Fantasma", quantidade: 1 },
    { nome: "Véu Rasgado", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Vestes de Mithril da Lua",
    icone: "🍃",
    slot: "armadura",
    stats: { atk: 11, def: 16, hp: 52 },
    precoVenda: 650
  }
},
{
  nome: "Vestes Astrais do Ciclo Eterno",
  icone: "🍃",
  categoria: "equipamento",
  descricao: "Armadura: +16 ATK, +22 DEF, +76 HP",
  nivelMinimo: 37,
  custoOuro: 2400,
  classePermitida: "druida",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 5 },
    { nome: "Fragmento de Oricalco", quantidade: 3 },
    { nome: "Essência Astral", quantidade: 2 },
    { nome: "Poeira Estelar", quantidade: 2 },
    { nome: "Cristal Cósmico", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Vestes Astrais do Ciclo Eterno",
    icone: "🍃",
    slot: "armadura",
    stats: { atk: 16, def: 22, hp: 76 },
    precoVenda: 1200
  }
},
/* ══════════════════════════════════════
   DRUIDA — ELMOS
══════════════════════════════════════ */

{
  nome: "Coroa de Bronze de Ramos Ancestrais",
  icone: "🌿",
  categoria: "equipamento",
  descricao: "Elmo: +1 ATK, +3 DEF, +10 HP",
  nivelMinimo: 3,
  custoOuro: 80,
  classePermitida: "druida",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 2 },
    { nome: "Essência Silvestre", quantidade: 2 },
    { nome: "Fruto da Floresta", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Coroa de Bronze de Ramos Ancestrais",
    icone: "🌿",
    slot: "elmo",
    stats: { atk: 1, def: 3, hp: 10 },
    precoVenda: 40
  }
},
{
  nome: "Coroa de Ferro da Seiva",
  icone: "🌿",
  categoria: "equipamento",
  descricao: "Elmo: +3 ATK, +5 DEF, +18 HP",
  nivelMinimo: 10,
  custoOuro: 220,
  classePermitida: "druida",
  ingredientes: [
    { nome: "Minério de Ferro", quantidade: 2 },
    { nome: "Seiva Ácida", quantidade: 2 },
    { nome: "Núcleo de Pedra", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Coroa de Ferro da Seiva",
    icone: "🌿",
    slot: "elmo",
    stats: { atk: 3, def: 5, hp: 18 },
    precoVenda: 110
  }
},
{
  nome: "Coroa de Aço Boreal",
  icone: "🌿",
  categoria: "equipamento",
  descricao: "Elmo: +5 ATK, +8 DEF, +28 HP",
  nivelMinimo: 19,
  custoOuro: 480,
  classePermitida: "druida",
  ingredientes: [
    { nome: "Minério de Aço", quantidade: 2 },
    { nome: "Pelo de Yeti", quantidade: 1 },
    { nome: "Cristal de Gelo", quantidade: 2 },
    { nome: "Pena Boreal", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Coroa de Aço Boreal",
    icone: "🌿",
    slot: "elmo",
    stats: { atk: 5, def: 8, hp: 28 },
    precoVenda: 240
  }
},
{
  nome: "Coroa de Mithril Lunar",
  icone: "👑",
  categoria: "equipamento",
  descricao: "Elmo: +7 ATK, +12 DEF, +40 HP",
  nivelMinimo: 28,
  custoOuro: 900,
  classePermitida: "druida",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 2 },
    { nome: "Energia Fantasma", quantidade: 1 },
    { nome: "Véu Rasgado", quantidade: 1 },
    { nome: "Essência da Escuridão", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Coroa de Mithril Lunar",
    icone: "👑",
    slot: "elmo",
    stats: { atk: 7, def: 12, hp: 40 },
    precoVenda: 450
  }
},
{
  nome: "Coroa Astral da Vida Eterna",
  icone: "👑",
  categoria: "equipamento",
  descricao: "Elmo: +10 ATK, +16 DEF, +58 HP",
  nivelMinimo: 37,
  custoOuro: 1700,
  classePermitida: "druida",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 3 },
    { nome: "Fragmento de Oricalco", quantidade: 2 },
    { nome: "Essência Astral", quantidade: 1 },
    { nome: "Poeira Estelar", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Coroa Astral da Vida Eterna",
    icone: "👑",
    slot: "elmo",
    stats: { atk: 10, def: 16, hp: 58 },
    precoVenda: 850
  }
},

/* ══════════════════════════════════════
   DRUIDA — BOTAS
══════════════════════════════════════ */

{
  nome: "Botas de Bronze Musgosas Ancestrais",
  icone: "👢",
  categoria: "equipamento",
  descricao: "Botas: +2 ATK, +3 DEF, +8 HP",
  nivelMinimo: 3,
  custoOuro: 70,
  classePermitida: "druida",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 2 },
    { nome: "Seiva Ácida", quantidade: 2 },
    { nome: "Couro Grosso", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Botas de Bronze Musgosas Ancestrais",
    icone: "👢",
    slot: "botas",
    stats: { atk: 2, def: 3, hp: 8 },
    precoVenda: 35
  }
},
{
  nome: "Botas de Ferro do Bosque",
  icone: "👢",
  categoria: "equipamento",
  descricao: "Botas: +5 ATK, +5 DEF, +14 HP",
  nivelMinimo: 10,
  custoOuro: 200,
  classePermitida: "druida",
  ingredientes: [
    { nome: "Minério de Ferro", quantidade: 2 },
    { nome: "Seiva Ácida", quantidade: 2 },
    { nome: "Núcleo de Pedra", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Botas de Ferro do Bosque",
    icone: "👢",
    slot: "botas",
    stats: { atk: 5, def: 5, hp: 14 },
    precoVenda: 100
  }
},
{
  nome: "Botas de Aço Gelado",
  icone: "👢",
  categoria: "equipamento",
  descricao: "Botas: +7 ATK, +8 DEF, +22 HP",
  nivelMinimo: 19,
  custoOuro: 450,
  classePermitida: "druida",
  ingredientes: [
    { nome: "Minério de Aço", quantidade: 2 },
    { nome: "Pelo de Yeti", quantidade: 1 },
    { nome: "Cristal de Gelo", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Botas de Aço Gelado",
    icone: "👢",
    slot: "botas",
    stats: { atk: 7, def: 8, hp: 22 },
    precoVenda: 225
  }
},
{
  nome: "Botas de Mithril da Lua",
  icone: "👢",
  categoria: "equipamento",
  descricao: "Botas: +10 ATK, +11 DEF, +34 HP",
  nivelMinimo: 28,
  custoOuro: 850,
  classePermitida: "druida",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 2 },
    { nome: "Energia Fantasma", quantidade: 1 },
    { nome: "Essência da Escuridão", quantidade: 1 },
    { nome: "Véu Rasgado", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Botas de Mithril da Lua",
    icone: "👢",
    slot: "botas",
    stats: { atk: 10, def: 11, hp: 34 },
    precoVenda: 425
  }
},
{
  nome: "Botas Astrais do Equinócio",
  icone: "👢",
  categoria: "equipamento",
  descricao: "Botas: +14 ATK, +15 DEF, +50 HP",
  nivelMinimo: 37,
  custoOuro: 1600,
  classePermitida: "druida",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 3 },
    { nome: "Fragmento de Oricalco", quantidade: 2 },
    { nome: "Essência Astral", quantidade: 1 },
    { nome: "Poeira Estelar", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Botas Astrais do Equinócio",
    icone: "👢",
    slot: "botas",
    stats: { atk: 14, def: 15, hp: 50 },
    precoVenda: 800
  }
},

/* ══════════════════════════════════════
   DRUIDA — ANÉIS
══════════════════════════════════════ */

{
  nome: "Anel de Bronze das Raízes Profundas",
  icone: "💍",
  categoria: "equipamento",
  descricao: "Anel: +3 ATK, +3 DEF, +10 HP",
  nivelMinimo: 3,
  custoOuro: 70,
  classePermitida: "druida",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 1 },
    { nome: "Moeda Antiga", quantidade: 1 },
    { nome: "Essência Silvestre", quantidade: 2 },
    { nome: "Seiva Ácida", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Anel de Bronze das Raízes Profundas",
    icone: "💍",
    slot: "anel",
    stats: { atk: 3, def: 3, hp: 10 },
    precoVenda: 35
  }
},
{
  nome: "Anel de Ferro da Terra Viva",
  icone: "💍",
  categoria: "equipamento",
  descricao: "Anel: +7 ATK, +5 DEF, +18 HP",
  nivelMinimo: 10,
  custoOuro: 180,
  classePermitida: "druida",
  ingredientes: [
    { nome: "Minério de Ferro", quantidade: 2 },
    { nome: "Núcleo de Pedra", quantidade: 1 },
    { nome: "Seiva Ácida", quantidade: 2 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Anel de Ferro da Terra Viva",
    icone: "💍",
    slot: "anel",
    stats: { atk: 7, def: 5, hp: 18 },
    precoVenda: 90
  }
},
{
  nome: "Anel de Aço do Inverno",
  icone: "💍",
  categoria: "equipamento",
  descricao: "Anel: +11 ATK, +8 DEF, +26 HP",
  nivelMinimo: 19,
  custoOuro: 420,
  classePermitida: "druida",
  ingredientes: [
    { nome: "Minério de Aço", quantidade: 2 },
    { nome: "Cristal de Gelo", quantidade: 2 },
    { nome: "Essência Gélida", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Anel de Aço do Inverno",
    icone: "💍",
    slot: "anel",
    stats: { atk: 11, def: 8, hp: 26 },
    precoVenda: 210
  }
},
{
  nome: "Anel de Mithril Lunar",
  icone: "💍",
  categoria: "equipamento",
  descricao: "Anel: +16 ATK, +11 DEF, +38 HP",
  nivelMinimo: 28,
  custoOuro: 780,
  classePermitida: "druida",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 2 },
    { nome: "Energia Fantasma", quantidade: 1 },
    { nome: "Véu Rasgado", quantidade: 1 },
    { nome: "Essência da Escuridão", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Anel de Mithril Lunar",
    icone: "💍",
    slot: "anel",
    stats: { atk: 16, def: 11, hp: 38 },
    precoVenda: 390
  }
},
{
  nome: "Anel Astral do Ciclo",
  icone: "💍",
  categoria: "equipamento",
  descricao: "Anel: +22 ATK, +15 DEF, +56 HP",
  nivelMinimo: 37,
  custoOuro: 1500,
  classePermitida: "druida",
  ingredientes: [
    { nome: "Fragmento de Oricalco", quantidade: 2 },
    { nome: "Essência Astral", quantidade: 2 },
    { nome: "Poeira Estelar", quantidade: 2 },
    { nome: "Cristal Cósmico", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Anel Astral do Ciclo",
    icone: "💍",
    slot: "anel",
    stats: { atk: 22, def: 15, hp: 56 },
    precoVenda: 750
  }
},

/* ══════════════════════════════════════
   DRUIDA — AMULETOS
══════════════════════════════════════ */

{
  nome: "Amuleto de Bronze da Vida Verde Ancestral",
  icone: "📿",
  categoria: "equipamento",
  descricao: "Amuleto: +3 ATK, +2 DEF, +12 HP",
  nivelMinimo: 3,
  custoOuro: 75,
  classePermitida: "druida",
  ingredientes: [
    { nome: "Minério de Cobre", quantidade: 1 },
    { nome: "Essência Silvestre", quantidade: 2 },
    { nome: "Fruto da Floresta", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Amuleto de Bronze da Vida Verde Ancestral",
    icone: "📿",
    slot: "amuleto",
    stats: { atk: 3, def: 2, hp: 12 },
    precoVenda: 37
  }
},
{
  nome: "Amuleto de Ferro do Bosque",
  icone: "📿",
  categoria: "equipamento",
  descricao: "Amuleto: +8 ATK, +4 DEF, +20 HP",
  nivelMinimo: 10,
  custoOuro: 190,
  classePermitida: "druida",
  ingredientes: [
    { nome: "Minério de Ferro", quantidade: 2 },
    { nome: "Seiva Ácida", quantidade: 2 },
    { nome: "Núcleo de Pedra", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Amuleto de Ferro do Bosque",
    icone: "📿",
    slot: "amuleto",
    stats: { atk: 8, def: 4, hp: 20 },
    precoVenda: 95
  }
},
{
  nome: "Amuleto de Aço das Raízes Profundas",
  icone: "📿",
  categoria: "equipamento",
  descricao: "Amuleto: +12 ATK, +7 DEF, +30 HP",
  nivelMinimo: 19,
  custoOuro: 430,
  classePermitida: "druida",
  ingredientes: [
    { nome: "Minério de Aço", quantidade: 2 },
    { nome: "Cristal de Gelo", quantidade: 1 },
    { nome: "Essência Gélida", quantidade: 1 },
    { nome: "Pelo de Yeti", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Amuleto de Aço das Raízes Profundas",
    icone: "📿",
    slot: "amuleto",
    stats: { atk: 12, def: 7, hp: 30 },
    precoVenda: 215
  }
},
{
  nome: "Amuleto de Mithril da Lua Verde",
  icone: "📿",
  categoria: "equipamento",
  descricao: "Amuleto: +17 ATK, +10 DEF, +44 HP",
  nivelMinimo: 28,
  custoOuro: 800,
  classePermitida: "druida",
  ingredientes: [
    { nome: "Minério de Mithril", quantidade: 2 },
    { nome: "Energia Fantasma", quantidade: 1 },
    { nome: "Véu Rasgado", quantidade: 1 },
    { nome: "Essência da Escuridão", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Amuleto de Mithril da Lua Verde",
    icone: "📿",
    slot: "amuleto",
    stats: { atk: 17, def: 10, hp: 44 },
    precoVenda: 400
  }
},
{
  nome: "Amuleto Astral da Mãe Natureza",
  icone: "📿",
  categoria: "equipamento",
  descricao: "Amuleto: +24 ATK, +14 DEF, +62 HP",
  nivelMinimo: 37,
  custoOuro: 1550,
  classePermitida: "druida",
  ingredientes: [
    { nome: "Fragmento de Oricalco", quantidade: 2 },
    { nome: "Essência Astral", quantidade: 2 },
    { nome: "Poeira Estelar", quantidade: 2 },
    { nome: "Cristal Cósmico", quantidade: 1 }
  ],
  resultado: {
    tipo: "equipamento",
    nome: "Amuleto Astral da Mãe Natureza",
    icone: "📿",
    slot: "amuleto",
    stats: { atk: 24, def: 14, hp: 62 },
    precoVenda: 775
  }
}]

// ============================================
// SISTEMA DE FORJA — FUNÇÕES
// ============================================

var abaForjaAtual = "pocao";

// Contar material no inventário
function contarMaterial(nome) {
    var total = 0;
    for (var i = 0; i < player.inventario.length; i++) {
        if (player.inventario[i].nome === nome) {
            total += player.inventario[i].quantidade || 1;
        }
    }
    return total;
}

// Remover material do inventário
function removerMaterial(nome, qtd) {
    var restante = qtd;
    for (var i = player.inventario.length - 1; i >= 0 && restante > 0; i--) {
        if (player.inventario[i].nome === nome) {
            var tirar = Math.min(player.inventario[i].quantidade, restante);
            player.inventario[i].quantidade -= tirar;
            restante -= tirar;
            if (player.inventario[i].quantidade <= 0) {
                player.inventario.splice(i, 1);
            }
        }
    }
}

// Abrir painel de forja
function abrirForja() {
    mostrarPainel('forjaPanel');
    abaForjaAtual = "pocao";
    trocarAbaForja("pocao");
    document.getElementById("forjaGoldUI").textContent = player.gold;
}

// Fechar forja
function fecharForja() {
    mostrarPainel('cidadePanel');
}

// Trocar abas
function trocarAbaForja(aba) {
    abaForjaAtual = aba;

    // Atualizar visual das abas
    ["Pocao", "Elixir", "Equip", "Materiais"].forEach(function(t) {
        var btn = document.getElementById("tabAlq" + t);
        if (btn) btn.classList.remove("active-tab");
    });

    var tabMap = { "pocao": "Pocao", "elixir": "Elixir", "equipamento": "Equip", "materiais": "Materiais" };
    var btnAtivo = document.getElementById("tabAlq" + tabMap[aba]);
    if (btnAtivo) btnAtivo.classList.add("active-tab");

    // Atualizar ouro
    var goldEl = document.getElementById("forjaGoldUI");
    if (goldEl) goldEl.textContent = player.gold;

    renderizarForja(aba);
}

// Renderizar receitas
function renderizarForja(categoria) {
    var container = document.getElementById("forjaLista");
    if (!container) return;
    container.innerHTML = "";

    // Aba de materiais
    if (categoria === "materiais") {
        renderizarMateriais(container);
        return;
    }

    // Pegar arquétipo da classe do jogador
    var arquetipo = getArquetipoClasse();

    var receitasFiltradas = [];
    for (var i = 0; i < receitasForja.length; i++) {
        var r = receitasForja[i];
        if (r.categoria !== categoria) continue;

        // Filtrar equipamentos por classe
        if (r.classePermitida && r.classePermitida !== arquetipo) continue;

        receitasFiltradas.push({ receita: r, idx: i });
    }

    if (receitasFiltradas.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:#64748b;padding:20px;font-style:italic;">Nenhuma receita disponível nesta categoria.</p>';
        return;
    }

    for (var r = 0; r < receitasFiltradas.length; r++) {
        var receita = receitasFiltradas[r].receita;
        var idx = receitasFiltradas[r].idx;
        var temNivel = player.level >= receita.nivelMinimo;
        var temOuro = player.gold >= receita.custoOuro;
        var podeCraftar = temNivel && temOuro;

        // Verificar ingredientes
        var ingHTML = "";
        for (var j = 0; j < receita.ingredientes.length; j++) {
            var ing = receita.ingredientes[j];
            var iconeIng = materiaisInfo[ing.nome] || "📦";
            var atual = contarMaterial(ing.nome);
            var temSuficiente = atual >= ing.quantidade;
            if (!temSuficiente) podeCraftar = false;

            ingHTML += '<span class="ingrediente ' + (temSuficiente ? 'tem' : 'falta') + '">'
                + iconeIng + ' ' + ing.nome + ': ' + atual + '/' + ing.quantidade
                + '</span>';
        }

        var bloqueadaClass = !temNivel ? ' receita-bloqueada' : '';
        var disponivelClass = podeCraftar ? ' receita-disponivel' : '';

        // Badge de classe para equipamentos
        var classeBadge = '';
        if (receita.classePermitida) {
            var nomeClasse = player.class || '';
            classeBadge = '<span style="font-size:0.7em;color:#fbbf24;background:rgba(251,191,36,0.15);padding:2px 6px;border-radius:4px;margin-left:6px;">' + nomeClasse + '</span>';
        }

        var html = '<div class="receita-card' + bloqueadaClass + disponivelClass + '">'
            + '<div class="receita-header">'
            +   '<span class="receita-icone">' + receita.icone + '</span>'
            +   '<div class="receita-info">'
            +     '<span class="receita-nome">' + receita.nome + classeBadge + '</span>'
            +     '<span class="receita-desc">' + receita.descricao + '</span>'
            +   '</div>'
            + '</div>'
            + '<div class="receita-ingredientes">' + ingHTML + '</div>'
            + '<div class="receita-footer">'
            +   '<span class="receita-custo">💰 ' + receita.custoOuro + '</span>'
            +   (!temNivel ? '<span class="receita-nivel">🔒 Nv.' + receita.nivelMinimo + '</span>' : '')
            +   '<button onclick="craftarItem(' + idx + ')" class="craft-btn"'
            +     (!podeCraftar ? ' disabled' : '') + '>🔨 Criar</button>'
            + '</div>'
            + '</div>';

        container.innerHTML += html;
    }
}

// Renderizar aba de materiais
function renderizarMateriais(container) {
    var materiais = [];
    for (var i = 0; i < player.inventario.length; i++) {
        var item = player.inventario[i];
        if (item.tipo === "material") {
            materiais.push(item);
        }
    }

    if (materiais.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:#64748b;padding:30px;font-style:italic;">'
            + '📦 Nenhum material coletado ainda.<br>'
            + '<span style="font-size:0.85em;color:#475569;">Derrote monstros para obter materiais!</span></p>';
        return;
    }

    for (var m = 0; m < materiais.length; m++) {
        var mat = materiais[m];
        container.innerHTML += '<div class="material-item">'
            + '<div class="mat-info">'
            +   '<span class="mat-icon">' + mat.icone + '</span>'
            +   '<span class="mat-nome">' + mat.nome + '</span>'
            + '</div>'
            + '<span class="mat-qtd">x' + mat.quantidade + '</span>'
            + '</div>';
    }
}

// Craftar item
function craftarItem(idx) {
    var receita = receitasForja[idx];
    if (!receita) return;

    // Verificar nível
    if (player.level < receita.nivelMinimo) {
        mostrarNotificacao("❌ Nível " + receita.nivelMinimo + " necessário!");
        return;
    }

    // Verificar ouro
    if (player.gold < receita.custoOuro) {
        mostrarNotificacao("❌ Ouro insuficiente! Precisa: " + receita.custoOuro);
        return;
    }

    // Verificar ingredientes
    for (var i = 0; i < receita.ingredientes.length; i++) {
        var ing = receita.ingredientes[i];
        if (contarMaterial(ing.nome) < ing.quantidade) {
            mostrarNotificacao("❌ Falta: " + ing.nome + "!");
            return;
        }
    }

    // === TUDO OK — CRAFTAR! ===

    // Remover ouro
    player.gold -= receita.custoOuro;

    // Remover ingredientes
    for (var j = 0; j < receita.ingredientes.length; j++) {
        removerMaterial(receita.ingredientes[j].nome, receita.ingredientes[j].quantidade);
    }

    // Aplicar resultado
    var res = receita.resultado;

    if (res.tipo === "consumivel") {
        // Adiciona poção ao inventário
        adicionarItemInventario(res.nome, res.icone, 1, {
            tipo: "consumivel",
            efeito: res.efeito
        });
        mostrarNotificacao("🧪 " + res.nome + " criada!");

    } else if (res.tipo === "elixir") {
        // Aplica stats permanentes IMEDIATAMENTE
        var statsMsg = "";
        if (res.stats.forca) { player.forca += res.stats.forca; statsMsg += " ⚔️FOR+" + res.stats.forca; }
        if (res.stats.destreza) { player.destreza += res.stats.destreza; statsMsg += " 🏹DES+" + res.stats.destreza; }
        if (res.stats.vigor) { player.vigor += res.stats.vigor; statsMsg += " ❤️VIG+" + res.stats.vigor; }
        if (res.stats.inteligencia) { player.inteligencia += res.stats.inteligencia; statsMsg += " 🔮INT+" + res.stats.inteligencia; }
        if (res.stats.sabedoria) { player.sabedoria += res.stats.sabedoria; statsMsg += " 📖SAB+" + res.stats.sabedoria; }
        if (res.stats.carisma) { player.carisma += res.stats.carisma; statsMsg += " 🗣️CAR+" + res.stats.carisma; }

       aplicarBonusEquipamentos();

        mostrarNotificacao("💊 " + receita.nome + " consumido!" + statsMsg);

    } else if (res.tipo === "equipamento") {
        // Adiciona equipamento ao inventário
        adicionarItemInventario(res.nome, res.icone, 1, {
            tipo: "equipamento",
            slot: res.slot,
            stats: { atk: res.stats.atk, def: res.stats.def, hp: res.stats.hp },
            preco: receita.custoOuro,
            precoVenda: res.precoVenda || Math.floor(receita.custoOuro / 2)
        });
        mostrarNotificacao("⚔️ " + res.nome + " forjado!");
    }

    // Atualizar tudo
    var goldEl = document.getElementById("forjaGoldUI");
    if (goldEl) goldEl.textContent = player.gold;
    renderizarForja(abaForjaAtual);
    updateUI();
}
function iniciarMineracao() {
    var area = gameState.areaAtual;
    if (!area || !mineriosPorArea[area]) {
        mostrarNotificacao("⛏️ Não há veios minerais nesta área!");
        return;
    }

    mineracaoState.areaAtual = area;
    mineracaoState.tentativas = mineracaoState.maxTentativas;
    mostrarPainel('mineracaoPanel');
    renderizarMineracao();
}

function minerar() {
    var area = mineracaoState.areaAtual;
    var dados = mineriosPorArea[area];
    if (!dados) return;

    if (mineracaoState.tentativas <= 0) {
        mostrarNotificacao("⛏️ Sem tentativas! Volte mais tarde.");
        return;
    }

    if (player.gold < dados.custo) {
        mostrarNotificacao("❌ Ouro insuficiente! Precisa: " + dados.custo);
        return;
    }

    // Cobrar ouro
    player.gold -= dados.custo;
    mineracaoState.tentativas--;

    // Desabilitar botão durante animação
    var btn = document.getElementById('btnMinerar');
    if (btn) btn.disabled = true;

    // Mostrar animação
    var animEl = document.getElementById('mineracaoAnimacao');
    if (animEl) animEl.style.display = 'block';

    var resultEl = document.getElementById('mineracaoResultado');
    if (resultEl) resultEl.style.display = 'none';

    // Após 1.5s, mostrar resultado
    setTimeout(function() {
        if (animEl) animEl.style.display = 'none';
        processarMineracao(dados);
    }, 1500);
}

function processarMineracao(dados) {
    var resultEl = document.getElementById('mineracaoResultado');
    if (!resultEl) return;

    // Bônus de Força na mineração
    var bonusForca = Math.min(0.15, player.forca * 0.005);

    // Tentar cada minério
    var encontrados = [];
    for (var i = 0; i < dados.minerios.length; i++) {
        var m = dados.minerios[i];
        var chanceReal = m.chance + bonusForca;
        if (Math.random() < chanceReal) {
            encontrados.push(m);
        }
    }

    var html = '';

    if (encontrados.length === 0) {
        // Falha
        html = '<div class="mineracao-resultado-card mineracao-falha">'
            + '<div class="mineracao-item-ganho">💨</div>'
            + '<div class="mineracao-item-nome" style="color:#f87171;">Nada encontrado!</div>'
            + '<div class="mineracao-item-desc">A picareta bate em pedra comum... Tente novamente!</div>'
            + '</div>';
    } else {
        // Sucesso
        for (var j = 0; j < encontrados.length; j++) {
            var minerio = encontrados[j];
            var classeCard = minerio.raro ? 'mineracao-raro' : 'mineracao-sucesso';
            var corNome = minerio.raro ? '#fbbf24' : '#4ade80';

            // Adicionar ao inventário como material
            adicionarItemInventario(minerio.nome, minerio.icone, 1, {
                tipo: "material",
                precoVenda: minerio.raro ? 25 : 8
            });

            html += '<div class="mineracao-resultado-card ' + classeCard + '">'
                + '<div class="mineracao-item-ganho">' + minerio.icone + '</div>'
                + '<div class="mineracao-item-nome" style="color:' + corNome + ';">'
                + (minerio.raro ? '⭐ RARO! ' : '') + minerio.nome + '</div>'
                + '<div class="mineracao-item-desc">Adicionado ao inventário!</div>'
                + '</div>';
        }
    }

    resultEl.innerHTML = html;
    resultEl.style.display = 'block';

    // Atualizar UI
    updateUI();

    // Reabilitar botão
    var btnEl = document.getElementById('btnMinerar');
    if (btnEl) btnEl.disabled = mineracaoState.tentativas <= 0 || player.gold < dados.custo;

    var tentEl = document.getElementById('mineracaoTentativas');
    if (tentEl) tentEl.textContent = mineracaoState.tentativas;

    // Log
    if (encontrados.length > 0) {
        var nomes = [];
        for (var k = 0; k < encontrados.length; k++) nomes.push(encontrados[k].icone + ' ' + encontrados[k].nome);
        log('⛏️ Minerou: ' + nomes.join(', '));
    } else {
        log('⛏️ Mineração falhou...');
    }

    // Progresso guilda (materiais)
    if (encontrados.length > 0 && typeof progressoMissaoGuilda === 'function') {
        progressoMissaoGuilda("materiais", encontrados.length);
    }
}

function voltarDaMineracao() {
    mostrarPainel('areaOptionsPanel');
    var el = document.getElementById('areaOptionsPanel');
    if (el) el.style.display = 'block';
}