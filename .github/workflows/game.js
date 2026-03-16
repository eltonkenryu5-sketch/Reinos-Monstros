// ============================================
//  REINOS & MONSTROS - GAME.JS v4.0 COMPLETO
//  Sistemas integrados: Missões, Elites,
//  Conquistas, Talentos, Rebalance
// ============================================


// ============================================
// SEÇÃO 1: DADOS DO JOGADOR
// ============================================

var player = {
    name: "", nome: "", class: "", raça: "", gender: "", background: "",
    forca: 8, destreza: 8, vigor: 8, inteligencia: 8, sabedoria: 8, carisma: 8,
    hp: 0, maxHp: 0, baseMaxHp: 0, atk: 0, def: 0, gold: 0,
    level: 1, xp: 0, xpParaProximoNivel: 50,
    potions: 3, img: "",
    missoesConcluidas: [], //
    inventario: [],
    equipamentos: { arma: null, armadura: null, elmo: null, botas: null, anel: null, amuleto: null },
    habilidadeCooldown: 0,
    defendendo: false
    
};
player.modoHardcore = (modoJogo === "hardcore");
// Garantir que player.guilda existe
function garantirGuildaPlayer() {
    if (!player.guilda) {
        player.guilda = {
            atual: null,
            rank: 0,
            xp: 0,
            xpProximo: 100,
            missaoAtiva: null,
            missaoProgresso: 0
        };
    }
}

// ============================================
// SEÇÃO 2: SISTEMAS NOVOS - DADOS GLOBAIS
// ============================================

var talentos = {
    pontosDisponiveis: 0,
    investidos: { dano: 0, defesa: 0, vida: 0, critico: 0, sorte: 0, maestria: 0 }
};

var estatisticas = {
    monstrosDerrotados: 0, elitesDerrotados: 0, bossesDerrotados: 0,
    masmorrasCompletas: 0, vezesRevivido: 0, ourolTotal: 0,
    criticos: 0, esquivas: 0
};

var sistemaMissoes = {
    missaoAtiva: null,
    missoesCompletas: 0,
    historico: []
};

var conquistas = {
    lista: [
        // ---- COMBATE ----
        { id: "primeiro_sangue", titulo: "🗡️ Primeiro Sangue", descricao: "Derrote 1 monstro",
          condicao: function() { return estatisticas.monstrosDerrotados >= 1; },
          recompensa: { ouro: 15, bonus: { tipo: "forca", valor: 1 } }, desbloqueada: false },

        { id: "cacador_10", titulo: "⚔️ Caçador", descricao: "Derrote 10 monstros",
          condicao: function() { return estatisticas.monstrosDerrotados >= 10; },
          recompensa: { ouro: 30, bonus: { tipo: "vigor", valor: 1 } }, desbloqueada: false },

        { id: "cacador_50", titulo: "🏆 Veterano", descricao: "Derrote 50 monstros",
          condicao: function() { return estatisticas.monstrosDerrotados >= 50; },
          recompensa: { ouro: 100, bonus: { tipo: "forca", valor: 2 } }, desbloqueada: false },

        { id: "cacador_100", titulo: "👑 Lendário", descricao: "Derrote 100 monstros",
          condicao: function() { return estatisticas.monstrosDerrotados >= 100; },
          recompensa: { ouro: 250, bonus: { tipo: "talento", valor: 3 } }, desbloqueada: false },

        // ---- NÍVEL ----
        { id: "nivel_5", titulo: "⭐ Aventureiro", descricao: "Nível 5",
          condicao: function() { return player.level >= 5; },
          recompensa: { ouro: 25, bonus: { tipo: "destreza", valor: 1 } }, desbloqueada: false },

        { id: "nivel_10", titulo: "⭐⭐ Herói", descricao: "Nível 10",
          condicao: function() { return player.level >= 10; },
          recompensa: { ouro: 80, bonus: { tipo: "talento", valor: 2 } }, desbloqueada: false },

        { id: "nivel_20", titulo: "⭐⭐⭐ Lenda", descricao: "Nível 20",
          condicao: function() { return player.level >= 20; },
          recompensa: { ouro: 200, bonus: { tipo: "todos", valor: 1 } }, desbloqueada: false },

        { id: "nivel_30", titulo: "👑 Mito Vivo", descricao: "Nível 30",
          condicao: function() { return player.level >= 30; },
          recompensa: { ouro: 500, bonus: { tipo: "todos", valor: 2 } }, desbloqueada: false },

        // ---- RIQUEZA ----
        { id: "rico", titulo: "💰 Rico", descricao: "500 de ouro acumulado",
          condicao: function() { return player.gold >= 500; },
          recompensa: { ouro: 50, bonus: { tipo: "carisma", valor: 1 } }, desbloqueada: false },

        { id: "magnata", titulo: "💎 Magnata", descricao: "3000 de ouro acumulado",
          condicao: function() { return player.gold >= 3000; },
          recompensa: { ouro: 200, bonus: { tipo: "carisma", valor: 2 } }, desbloqueada: false },

        // ---- ELITES E BOSSES ----
        { id: "mata_elite", titulo: "🔥 Caçador de Elites", descricao: "5 elites derrotados",
          condicao: function() { return estatisticas.elitesDerrotados >= 5; },
          recompensa: { ouro: 100, bonus: { tipo: "forca", valor: 1 } }, desbloqueada: false },

        { id: "mata_boss", titulo: "👑 Matador de Chefes", descricao: "3 chefes derrotados",
          condicao: function() { return estatisticas.bossesDerrotados >= 3; },
          recompensa: { ouro: 200, bonus: { tipo: "talento", valor: 2 } }, desbloqueada: false },

        // ---- MISSÕES ----
        { id: "missoes_5", titulo: "📜 Mercenário", descricao: "5 missões completas",
          condicao: function() { return sistemaMissoes.missoesCompletas >= 5; },
          recompensa: { ouro: 80, bonus: { tipo: "sabedoria", valor: 1 } }, desbloqueada: false },

        { id: "missoes_20", titulo: "📜 Herói do Povo", descricao: "20 missões completas",
          condicao: function() { return sistemaMissoes.missoesCompletas >= 20; },
          recompensa: { ouro: 300, bonus: { tipo: "talento", valor: 3 } }, desbloqueada: false },

        // ---- MASMORRAS ----
        { id: "masmorra_1", titulo: "🏰 Explorador", descricao: "1 masmorra completa",
          condicao: function() { return estatisticas.masmorrasCompletas >= 1; },
          recompensa: { ouro: 60, bonus: { tipo: "vigor", valor: 1 } }, desbloqueada: false },

        { id: "masmorra_10", titulo: "🏰 Veterano", descricao: "10 masmorras completas",
          condicao: function() { return estatisticas.masmorrasCompletas >= 10; },
          recompensa: { ouro: 300, bonus: { tipo: "inteligencia", valor: 2 } }, desbloqueada: false },

        // ---- ESPECIAIS ----
        { id: "sobrevivente", titulo: "💀 Sobrevivente", descricao: "Reviva após derrota",
          condicao: function() { return estatisticas.vezesRevivido >= 1; },
          recompensa: { ouro: 20, bonus: { tipo: "vigor", valor: 1 } }, desbloqueada: false }
    ],
    totalDesbloqueadas: 0
};

var monster = null;

var gameState = {
    areaAtual: null, emCombate: false, emMasmorra: false,
    dungeonFloor: 0, dungeonMaxFloor: 5,
    combateOrigem: "menu", monstroIsBoss: false, retornoResultado: "menu"
};


// ============================================
// SEÇÃO 3: DADOS ESTÁTICOS (Raças, Personagens, Áreas, Monstros)
// ============================================

var racaBonus = {
    "Anão": { vigor: 2, forca: 1 }, "Anã": { vigor: 2, forca: 1 },
    "Elfo": { destreza: 2, sabedoria: 1 }, "Elfa": { destreza: 2, sabedoria: 1 },
    "Humano": { forca: 1, destreza: 1, vigor: 1, inteligencia: 1, sabedoria: 1, carisma: 1 },
    "Humana": { forca: 1, destreza: 1, vigor: 1, inteligencia: 1, sabedoria: 1, carisma: 1 },
    "Draconato": { carisma: 2, forca: 1 }, "Draconata": { carisma: 2, forca: 1 },
    "Leonídeo": { forca: 1, vigor: 2 }, "Leonídea": { forca: 1, vigor: 2 },
    "Halfling": { destreza: 2, carisma: 1 },
    "Fauno": { sabedoria: 2, destreza: 1 }, "Fauna": { sabedoria: 2, destreza: 1 },
    "Meio-Orc": { forca: 2, vigor: 1 }
};

var personagensPredefinidos = [
    { id: "guerreiro", nome: "Valerius", raça: "Anão", gender: "Masculino", class: "Guerreiro", background: "Ex-capitão da guarda.", forca: 17, destreza: 10, vigor: 12, inteligencia: 8, sabedoria: 8, carisma: 5, img: "images/Personagens/guerreiro2.png" },
    { id: "guerreira", nome: "Lyra", raça: "Anã", gender: "Feminino", class: "Guerreira", background: "Forjada nas minas.", forca: 17, destreza: 10, vigor: 12, inteligencia: 8, sabedoria: 8, carisma: 5, img: "images/Personagens/guerreira2.png" },
    { id: "draconato", nome: "Ignis", raça: "Draconato", gender: "Masculino", class: "Paladino", background: "Cavaleiro do sol.", forca: 15, destreza: 8, vigor: 14, inteligencia: 10, sabedoria: 12, carisma: 10, img: "images/Personagens/draconato2.png" },
    { id: "draconata", nome: "Aethel", raça: "Draconata", gender: "Feminino", class: "Paladina", background: "Guardiã dos templos.", forca: 15, destreza: 8, vigor: 14, inteligencia: 10, sabedoria: 12, carisma: 10, img: "images/Personagens/draconata2.png" },
    { id: "arqueiro", nome: "Kael", raça: "Elfo", gender: "Masculino", class: "Arqueiro", background: "Rastreador.", forca: 12, destreza: 17, vigor: 10, inteligencia: 8, sabedoria: 10, carisma: 3, img: "images/Personagens/arqueiro2.png" },
    { id: "arqueira", nome: "Selene", raça: "Elfa", gender: "Feminino", class: "Arqueira", background: "Protege fronteiras.", forca: 12, destreza: 17, vigor: 10, inteligencia: 8, sabedoria: 10, carisma: 3, img: "images/Personagens/arqueira2.png" },
    { id: "mago", nome: "Thalric", raça: "Humano", gender: "Masculino", class: "Mago", background: "Estudioso.", forca: 8, destreza: 12, vigor: 8, inteligencia: 17, sabedoria: 8, carisma: 7, img: "images/Personagens/mago2.png" },
    { id: "maga", nome: "Isolde", raça: "Humana", gender: "Feminino", class: "Maga", background: "Prodígio.", forca: 8, destreza: 12, vigor: 8, inteligencia: 17, sabedoria: 8, carisma: 7, img: "images/Personagens/maga2.png" },
    { id: "leonide.m", nome: "Bram", raça: "Leonídeo", gender: "Masculino", class: "Clérigo", background: "Sacerdote.", forca: 12, destreza: 8, vigor: 12, inteligencia: 10, sabedoria: 17, carisma: 1, img: "images/Personagens/leonide.m2.png" },
    { id: "leonide.f", nome: "Aria", raça: "Leonídea", gender: "Feminino", class: "Clériga", background: "Escolhida.", forca: 12, destreza: 8, vigor: 12, inteligencia: 10, sabedoria: 17, carisma: 1, img: "images/Personagens/leonide.f2.png" },
    { id: "halfling.m", nome: "Finn", raça: "Halfling", gender: "Masculino", class: "Ladino", background: "Mestre das sombras.", forca: 10, destreza: 17, vigor: 8, inteligencia: 10, sabedoria: 8, carisma: 10, img: "images/Personagens/halfling.m2.png" },
    { id: "halfling.f", nome: "Mila", raça: "Halfling", gender: "Feminino", class: "Ladina", background: "Ágil e furtiva.", forca: 10, destreza: 17, vigor: 8, inteligencia: 10, sabedoria: 8, carisma: 10, img: "images/Personagens/halfling.f2.png" },
    { id: "druida.m", nome: "Samir", raça: "Fauno", gender: "Masculino", class: "Druida", background: "Guardião.", forca: 9, destreza: 12, vigor: 10, inteligencia: 12, sabedoria: 14, carisma: 8, img: "images/Personagens/druida.m2.png" },
    { id: "druida.f", nome: "Flora", raça: "Fauna", gender: "Feminino", class: "Druida", background: "Sintonizada.", forca: 9, destreza: 12, vigor: 10, inteligencia: 12, sabedoria: 14, carisma: 8, img: "images/Personagens/druida.f2.png" },
    { id: "monge.m", nome: "Korg", raça: "Meio-Orc", gender: "Masculino", class: "Monge", background: "Disciplina.", forca: 14, destreza: 14, vigor: 12, inteligencia: 8, sabedoria: 10, carisma: 5, img: "images/Personagens/monge.m2.png" },
    { id: "monge.f", nome: "Zora", raça: "Meio-Orc", gender: "Feminino", class: "Monge", background: "Meditação.", forca: 14, destreza: 14, vigor: 12, inteligencia: 8, sabedoria: 10, carisma: 5, img: "images/Personagens/monge.f2.png" }
];

// ============================================
// 15 ÁREAS — Desbloqueio a cada 3 níveis
// Nível máximo: 45
// ============================================

var areas = {
    // ── TIER 1: Nível 1-9 ──
    floresta:    { nome: "🌲 Floresta Sombria",     descricao: "Árvores sussurram segredos antigos. Criaturas selvagens espreitam nas sombras.",                  min: 1,  max: 3,  dungeonAndares: 4,  tier: 1, capitulo: 1 },
    pantano:     { nome: "🐸 Pântano Venenoso",     descricao: "Águas turvas borbulham com gases tóxicos. O chão treme sob seus pés.",                            min: 4,  max: 6,  dungeonAndares: 5,  tier: 1, capitulo: 2 },
    colinas:     { nome: "⛰️ Colinas Sangrentas",    descricao: "Campos de batalha antigos. O sangue dos caídos tingiu a terra para sempre.",                     min: 7,  max: 9,  dungeonAndares: 5,  tier: 1, capitulo: 3 },

    // ── TIER 2: Nível 10-18 ──
    ruinas:      { nome: "🏚️ Ruínas Esquecidas",    descricao: "Civilização perdida no tempo. Armadilhas mortais ainda funcionam.",                                min: 10, max: 12, dungeonAndares: 6,  tier: 2, capitulo: 4 },
    deserto:     { nome: "🏜️ Deserto Escaldante",   descricao: "Sol impiedoso e tempestades de areia. Apenas os mais fortes sobrevivem.",                         min: 13, max: 15, dungeonAndares: 6,  tier: 2, capitulo: 5 },
    cemiterio:   { nome: "⚰️ Cemitério Profano",    descricao: "Os mortos não descansam aqui. Lápides rachadas revelam segredos.",                                 min: 16, max: 18, dungeonAndares: 7,  tier: 2, capitulo: 6 },

    // ── TIER 3: Nível 19-27 ──
    caverna:     { nome: "🕳️ Caverna Profunda",     descricao: "Trevas absolutas. Sons estranhos ecoam das profundezas insondáveis.",                              min: 19, max: 21, dungeonAndares: 7,  tier: 3, capitulo: 7 },
    vulcao:      { nome: "🌋 Vulcão Infernal",      descricao: "Rios de lava cortam a paisagem. O ar queima os pulmões.",                                         min: 22, max: 24, dungeonAndares: 8,  tier: 3, capitulo: 8 },
    geleira:     { nome: "🏔️ Geleira Eterna",       descricao: "Frio que congela até a alma. Criaturas de gelo reinam supremas.",                                 min: 25, max: 27, dungeonAndares: 8,  tier: 3, capitulo: 9 },

    // ── TIER 4: Nível 28-36 ──
    cidadeFant:  { nome: "👻 Cidade Fantasma",      descricao: "Espíritos vagam pelas ruas desertas. O véu entre mundos é fino.",                                  min: 28, max: 30, dungeonAndares: 8,  tier: 4, capitulo: 10 },
    abismo:      { nome: "🌑 Abismo Sombrio",       descricao: "A escuridão é uma entidade viva. Coisas sem nome observam.",                                      min: 31, max: 33, dungeonAndares: 9,  tier: 4, capitulo: 11 },
    castelo:     { nome: "🏰 Castelo Amaldiçoado",  descricao: "Fortaleza de um rei caído. Cada sala é uma armadilha mortal.",                                    min: 34, max: 36, dungeonAndares: 9,  tier: 4, capitulo: 12 },

    // ── TIER 5: Nível 37-45 ──
    planoAstral: { nome: "🌌 Plano Astral",         descricao: "Além da realidade. As leis da física não se aplicam aqui.",                                        min: 37, max: 39, dungeonAndares: 10, tier: 5, capitulo: 13 },
    infernus:    { nome: "🔥 Infernus",             descricao: "O próprio inferno. Demônios reinam e almas gritam eternamente.",                                   min: 40, max: 42, dungeonAndares: 10, tier: 5, capitulo: 14 },
    tronoDeus:   { nome: "⚡ Trono dos Deuses",     descricao: "O destino final. Onde mortais desafiam divindades corrompidas.",                                    min: 43, max: 45, dungeonAndares: 12, tier: 5, capitulo: 15 }
};

// ============================================
// CONTROLE DOS DISPLAYS DAS AREAS BLOQUEADAS
// ============================================
function mostrarAreasDisponiveis() {
    var container = document.getElementById("menu-areas");
    container.innerHTML = ""; // limpa antes de renderizar

    areasDesbloqueadas.forEach(nomeArea => {
        var areas = Object.values(areas).find(a => a.nome === nomeAreas);
        var botao = document.createElement("button");
        botao.textContent = areas.nome;
        botao.classList.add("areas-botao");
        container.appendChild(botao);
    });
}

var areasDesbloqueadas = [];

function atualizarAreasDesbloqueadas() {
    Object.values(areas).forEach(area => {
        if (player.level >= areas.min && !areasDesbloqueadas.includes(areas.nome)) {
            areasDesbloqueadas.push(areas.nome);
            mostrarMensagemDesbloqueio(areas);
        }
    });
}


function mostrarMensagemDesbloqueio(areas) {
    var msg = document.createElement("div");
    msg.className = "popup-desbloqueio";
    msg.textContent = "✨ Nova área desbloqueada: " + areas.nome + " ✨";
    document.body.appendChild(msg);

    setTimeout(() => {
        msg.remove();
    }, 3000); // desaparece em 3 segundos
}

// ============================================
// MONSTROS POR ÁREA (15 áreas × ~4 monstros)
// ============================================

var bancoDeMonstros = {

    // ═══════════ TIER 1 ═══════════

    floresta: [
        { name: "Lobo Cinzento", emoji: "🐺", hp: 30, atk: 8, def: 3, img: "images/Monstros/wolf.png", gold: [8, 15], xp: 15, drops: [{ item: "Pele de Lobo", chance: 0.40, icone: "🐾", precoVenda: 6 }, { item: "Carne Crua", chance: 0.30, icone: "🥩", precoVenda: 3, consumivel: true, efeito: { tipo: "cura", valor: 15 } }] },
        { name: "Goblin Explorador", emoji: "👺", hp: 25, atk: 10, def: 2, img: "images/Monstros/goblin.png", gold: [10, 20], xp: 12, drops: [{ item: "Moeda Antiga", chance: 0.50, icone: "🪙", precoVenda: 8 }] },
        { name: "Aranha Gigante", emoji: "🕷️", hp: 20, atk: 12, def: 1, img: "images/Monstros/aranha.png", gold: [6, 12], xp: 14, drops: [{ item: "Seda de Aranha", chance: 0.45, icone: "🕸️", precoVenda: 7 }] },
        { name: "Javali Selvagem", emoji: "🐗", hp: 40, atk: 7, def: 5, img: "images/Monstros/javali.png", gold: [8, 16], xp: 18, drops: [{ item: "Couro Grosso", chance: 0.30, icone: "🟫", precoVenda: 8 }] }
    ],

    pantano: [
        { name: "Sapo Venenoso", emoji: "🐸", hp: 35, atk: 14, def: 3, img: "images/Monstros/sapo_venenoso.png", gold: [12, 22], xp: 20, drops: [{ item: "Glândula Tóxica", chance: 0.35, icone: "🧪", precoVenda: 10 }] },
        { name: "Cobra d'Água", emoji: "🐍", hp: 28, atk: 16, def: 2, img: "images/Monstros/cobra.png", gold: [10, 18], xp: 18, drops: [{ item: "Escama Pantanosa", chance: 0.40, icone: "🐍", precoVenda: 8 }] },
        { name: "Crocodilo Ancião", emoji: "🐊", hp: 55, atk: 12, def: 8, img: "images/Monstros/croco.png", gold: [14, 25], xp: 25, drops: [{ item: "Dente de Croco", chance: 0.30, icone: "🦷", precoVenda: 12 }] },
        { name: "Planta Carnívora", emoji: "🥀", hp: 45, atk: 10, def: 6, img: "images/Monstros/Plant.png", gold: [11, 20], xp: 22, drops: [{ item: "Seiva Ácida", chance: 0.35, icone: "🌿", precoVenda: 9, consumivel: true, efeito: { tipo: "cura", valor: 20 } }] }
    ],

    colinas: [
        { name: "Orc Batedor", emoji: "👹", hp: 50, atk: 18, def: 6, img: "images/Monstros/Orc.png", gold: [16, 30], xp: 28, drops: [{ item: "Lâmina Orcish", chance: 0.25, icone: "🗡️", precoVenda: 15 }] },
        { name: "Harpia", emoji: "🦅", hp: 38, atk: 22, def: 4, img: "images/Monstros/harpia.png", gold: [15, 28], xp: 30, drops: [{ item: "Pena de Harpia", chance: 0.40, icone: "🪶", precoVenda: 12 }] },
        { name: "Centauro Selvagem", emoji: "🐎", hp: 65, atk: 16, def: 8, img: "images/Monstros/centauro.png", gold: [18, 35], xp: 32, drops: [{ item: "Ferradura Antiga", chance: 0.30, icone: "🧲", precoVenda: 14 }] },
        { name: "Warg Sombrio", emoji: "🐺", hp: 48, atk: 20, def: 5, img: "images/Monstros/warg.png", gold: [14, 26], xp: 26, drops: [{ item: "Pele de Warg", chance: 0.35, icone: "🐾", precoVenda: 11 }] }
    ],

    // ═══════════ TIER 2 ═══════════

    ruinas: [
        { name: "Esqueleto Guerreiro", emoji: "💀", hp: 65, atk: 22, def: 10, img: "images/Monstros/esqueleto.png", gold: [22, 40], xp: 38, drops: [{ item: "Osso Encantado", chance: 0.40, icone: "🦴", precoVenda: 15 }] },
        { name: "Golem de Pedra", emoji: "🗿", hp: 100, atk: 18, def: 22, img: "images/Monstros/golem.png", gold: [28, 55], xp: 50, drops: [{ item: "Pedra Rúnica", chance: 0.30, icone: "🪨", precoVenda: 20 }] },
        { name: "Cavaleiro Caído", emoji: "🤺", hp: 85, atk: 25, def: 15, img: "images/Monstros/cavaleiro.png", gold: [30, 55], xp: 55, drops: [{ item: "Insígnia Antiga", chance: 0.25, icone: "🎖️", precoVenda: 22 }] },
        { name: "Múmia Guardiã", emoji: "🧟", hp: 75, atk: 20, def: 14, img: "", gold: [25, 45], xp: 42, drops: [{ item: "Bandagem Mágica", chance: 0.35, icone: "🩹", precoVenda: 12, consumivel: true, efeito: { tipo: "cura", valor: 50 } }] }
    ],

    deserto: [
        { name: "Escorpião Gigante", emoji: "🦂", hp: 70, atk: 28, def: 12, img: "", gold: [28, 50], xp: 45, drops: [{ item: "Ferrão Venenoso", chance: 0.35, icone: "🦂", precoVenda: 18 }] },
        { name: "Serpente de Areia", emoji: "🐍", hp: 60, atk: 32, def: 8, img: "", gold: [25, 45], xp: 42, drops: [{ item: "Escama Dourada", chance: 0.25, icone: "✨", precoVenda: 22 }] },
        { name: "Elemental de Areia", emoji: "🌪️", hp: 90, atk: 24, def: 18, img: "", gold: [30, 55], xp: 50, drops: [{ item: "Núcleo de Areia", chance: 0.20, icone: "💎", precoVenda: 30 }] },
        { name: "Nômade Corrompido", emoji: "🗡️", hp: 80, atk: 30, def: 14, img: "", gold: [32, 58], xp: 52, drops: [{ item: "Turbante Encantado", chance: 0.20, icone: "🧣", precoVenda: 25 }] }
    ],

    cemiterio: [
        { name: "Zumbi Putrefato", emoji: "🧟", hp: 75, atk: 25, def: 12, img: "", gold: [30, 52], xp: 48, drops: [{ item: "Carne Podre", chance: 0.45, icone: "🥩", precoVenda: 8 }] },
        { name: "Fantasma Uivante", emoji: "👻", hp: 55, atk: 35, def: 6, img: "", gold: [28, 50], xp: 50, drops: [{ item: "Ectoplasma", chance: 0.35, icone: "💧", precoVenda: 18 }] },
        { name: "Necromante Aprendiz", emoji: "💀", hp: 65, atk: 30, def: 10, img: "", gold: [35, 60], xp: 55, drops: [{ item: "Grimório Sombrio", chance: 0.20, icone: "📕", precoVenda: 28 }] },
        { name: "Carniçal", emoji: "😈", hp: 90, atk: 28, def: 16, img: "", gold: [32, 55], xp: 52, drops: [{ item: "Garra Pútrida", chance: 0.30, icone: "🦴", precoVenda: 15 }] }
    ],

    // ═══════════ TIER 3 ═══════════

    caverna: [
        { name: "Ogro das Cavernas", emoji: "👹", hp: 160, atk: 35, def: 20, img: "images/Monstros/ogre.png", gold: [50, 95], xp: 80, drops: [{ item: "Dente de Ogro", chance: 0.35, icone: "🦷", precoVenda: 30 }] },
        { name: "Elemental de Terra", emoji: "⛰️", hp: 190, atk: 30, def: 32, img: "", gold: [55, 105], xp: 90, drops: [{ item: "Cristal de Terra", chance: 0.30, icone: "💎", precoVenda: 40 }] },
        { name: "Aranha Rainha", emoji: "🕷️", hp: 130, atk: 38, def: 16, img: "", gold: [48, 90], xp: 85, drops: [{ item: "Seda Real", chance: 0.25, icone: "🕸️", precoVenda: 35 }] },
        { name: "Minhocão Abissal", emoji: "🪱", hp: 220, atk: 28, def: 26, img: "", gold: [60, 115], xp: 100, drops: [{ item: "Segmento Cristalizado", chance: 0.20, icone: "🔮", precoVenda: 45 }] }
    ],

    vulcao: [
        { name: "Salamandra de Fogo", emoji: "🔥", hp: 150, atk: 42, def: 18, img: "", gold: [55, 105], xp: 90, drops: [{ item: "Escama Ígnea", chance: 0.30, icone: "🔥", precoVenda: 35 }] },
        { name: "Golem de Lava", emoji: "🌋", hp: 250, atk: 35, def: 35, img: "", gold: [65, 125], xp: 110, drops: [{ item: "Coração de Magma", chance: 0.15, icone: "❤️‍🔥", precoVenda: 55 }] },
        { name: "Fênix Sombria", emoji: "🐦‍🔥", hp: 140, atk: 48, def: 14, img: "", gold: [58, 110], xp: 95, drops: [{ item: "Pena de Fênix", chance: 0.12, icone: "🪶", precoVenda: 60 }] },
        { name: "Diabo Menor", emoji: "😈", hp: 180, atk: 40, def: 22, img: "", gold: [60, 115], xp: 100, drops: [{ item: "Chifre Flamejante", chance: 0.25, icone: "🦴", precoVenda: 40 }] }
    ],

    geleira: [
        { name: "Yeti", emoji: "❄️", hp: 200, atk: 38, def: 28, img: "", gold: [60, 115], xp: 95, drops: [{ item: "Pelo de Yeti", chance: 0.35, icone: "🐾", precoVenda: 35 }] },
        { name: "Elemental de Gelo", emoji: "🧊", hp: 170, atk: 35, def: 30, img: "", gold: [58, 110], xp: 92, drops: [{ item: "Cristal de Gelo", chance: 0.25, icone: "💎", precoVenda: 42 }] },
        { name: "Lobo do Inverno", emoji: "🐺", hp: 145, atk: 44, def: 18, img: "", gold: [55, 105], xp: 88, drops: [{ item: "Presa Congelada", chance: 0.30, icone: "🦷", precoVenda: 32 }] },
        { name: "Gigante de Gelo", emoji: "⛰️", hp: 280, atk: 32, def: 35, img: "", gold: [70, 135], xp: 115, drops: [{ item: "Coração Glacial", chance: 0.12, icone: "💙", precoVenda: 60 }] }
    ],

    // ═══════════ TIER 4 ═══════════

    cidadeFant: [
        { name: "Espectro Vingativo", emoji: "👻", hp: 210, atk: 52, def: 22, img: "", gold: [80, 155], xp: 150, drops: [{ item: "Essência Espectral", chance: 0.30, icone: "👻", precoVenda: 50 }] },
        { name: "Vampiro Nobre", emoji: "🧛", hp: 260, atk: 55, def: 28, img: "", gold: [90, 175], xp: 170, drops: [{ item: "Sangue Nobre", chance: 0.25, icone: "🩸", precoVenda: 55 }] },
        { name: "Banshee", emoji: "😱", hp: 180, atk: 62, def: 16, img: "", gold: [75, 145], xp: 155, drops: [{ item: "Grito Cristalizado", chance: 0.18, icone: "💎", precoVenda: 60 }] },
        { name: "Ceifador", emoji: "💀", hp: 300, atk: 58, def: 30, img: "", gold: [100, 195], xp: 180, drops: [{ item: "Fragmento da Morte", chance: 0.15, icone: "💀", precoVenda: 70 }] }
    ],

    abismo: [
        { name: "Observador Abissal", emoji: "👁️", hp: 240, atk: 60, def: 25, img: "", gold: [95, 185], xp: 175, drops: [{ item: "Olho Abissal", chance: 0.22, icone: "👁️", precoVenda: 60 }] },
        { name: "Tentáculo do Vazio", emoji: "🐙", hp: 280, atk: 55, def: 30, img: "", gold: [100, 195], xp: 185, drops: [{ item: "Tinta do Vazio", chance: 0.25, icone: "🖤", precoVenda: 55 }] },
        { name: "Sombra Viva", emoji: "🌑", hp: 200, atk: 68, def: 18, img: "", gold: [90, 175], xp: 170, drops: [{ item: "Essência Sombria", chance: 0.20, icone: "🌑", precoVenda: 65 }] },
        { name: "Aberração Dimensional", emoji: "🔮", hp: 320, atk: 58, def: 32, img: "", gold: [110, 215], xp: 200, drops: [{ item: "Fenda Cristalizada", chance: 0.12, icone: "💎", precoVenda: 80 }] }
    ],

    castelo: [
        { name: "Cavaleiro Negro", emoji: "🖤", hp: 300, atk: 62, def: 35, img: "", gold: [105, 205], xp: 195, drops: [{ item: "Lâmina Negra", chance: 0.20, icone: "⚔️", precoVenda: 70 }] },
        { name: "Gárgula Guardiã", emoji: "🗿", hp: 350, atk: 50, def: 45, img: "", gold: [110, 215], xp: 200, drops: [{ item: "Pedra Animada", chance: 0.25, icone: "🪨", precoVenda: 60 }] },
        { name: "Quimera", emoji: "🐲", hp: 280, atk: 70, def: 28, img: "", gold: [115, 225], xp: 210, drops: [{ item: "Sangue de Quimera", chance: 0.15, icone: "🩸", precoVenda: 75 }] },
        { name: "Lich Ancião", emoji: "💀", hp: 260, atk: 75, def: 25, img: "", gold: [120, 235], xp: 220, drops: [{ item: "Filactério Rachado", chance: 0.10, icone: "💎", precoVenda: 90 }] }
    ],

    // ═══════════ TIER 5 ═══════════

    planoAstral: [
        { name: "Entidade Cósmica", emoji: "🌌", hp: 350, atk: 72, def: 35, img: "", gold: [130, 255], xp: 250, drops: [{ item: "Poeira Estelar", chance: 0.25, icone: "✨", precoVenda: 80 }] },
        { name: "Devorador de Mentes", emoji: "🧠", hp: 300, atk: 80, def: 28, img: "", gold: [125, 245], xp: 240, drops: [{ item: "Fragmento Psíquico", chance: 0.18, icone: "🧠", precoVenda: 85 }] },
        { name: "Anjo Corrompido", emoji: "😇", hp: 320, atk: 75, def: 32, img: "", gold: [135, 265], xp: 260, drops: [{ item: "Asa Quebrada", chance: 0.15, icone: "🪶", precoVenda: 90 }] },
        { name: "Guardião Astral", emoji: "⚡", hp: 400, atk: 68, def: 40, img: "", gold: [140, 275], xp: 270, drops: [{ item: "Núcleo Astral", chance: 0.10, icone: "🌟", precoVenda: 100 }] }
    ],

    infernus: [
        { name: "Demônio de Fogo", emoji: "😈", hp: 380, atk: 82, def: 35, img: "", gold: [145, 285], xp: 280, drops: [{ item: "Essência Infernal", chance: 0.22, icone: "🔥", precoVenda: 90 }] },
        { name: "Succubus", emoji: "😈", hp: 300, atk: 90, def: 25, img: "", gold: [140, 275], xp: 270, drops: [{ item: "Beijo Maldito", chance: 0.15, icone: "💋", precoVenda: 95 }] },
        { name: "Cão Infernal", emoji: "🐕‍🦺", hp: 340, atk: 85, def: 30, img: "", gold: [135, 265], xp: 265, drops: [{ item: "Corrente Infernal", chance: 0.20, icone: "⛓️", precoVenda: 85 }] },
        { name: "Archdemônio", emoji: "👹", hp: 450, atk: 78, def: 42, img: "", gold: [155, 305], xp: 300, drops: [{ item: "Chifre do Archdemônio", chance: 0.08, icone: "🦴", precoVenda: 120 }] }
    ],

    tronoDeus: [
        { name: "Serafim Caído", emoji: "😇", hp: 420, atk: 88, def: 38, img: "", gold: [160, 315], xp: 320, drops: [{ item: "Pena Divina", chance: 0.18, icone: "🪶", precoVenda: 100 }] },
        { name: "Titã Corrompido", emoji: "⚡", hp: 500, atk: 82, def: 48, img: "", gold: [170, 335], xp: 340, drops: [{ item: "Sangue de Titã", chance: 0.12, icone: "🩸", precoVenda: 120 }] },
        { name: "Arauto do Fim", emoji: "💀", hp: 450, atk: 95, def: 35, img: "", gold: [165, 325], xp: 330, drops: [{ item: "Trombeta do Apocalipse", chance: 0.08, icone: "📯", precoVenda: 140 }] },
        { name: "Avatar da Destruição", emoji: "🌟", hp: 550, atk: 85, def: 50, img: "", gold: [180, 355], xp: 360, drops: [{ item: "Fragmento Divino", chance: 0.05, icone: "💎", precoVenda: 200 }] }
    ]
};


// ============================================
// BOSSES POR ÁREA
// ============================================

var bossesMasmorra = {
    floresta:    { name: "Escorpião Rei",         emoji: "🦂👑", hp: 120,  atk: 22,  def: 10,  gold: [50, 80],   xp: 80,   drops: [{ item: "Ferrão Real", chance: 0.60, icone: "🦂", precoVenda: 30 }] },
    pantano:     { name: "Hydra do Pântano",      emoji: "🐍👑", hp: 180,  atk: 28,  def: 14,  gold: [65, 100],  xp: 120,  drops: [{ item: "Cabeça de Hydra", chance: 0.50, icone: "🐍", precoVenda: 40 }] },
    colinas:     { name: "Chefe Orc Brutamontes", emoji: "👹👑", hp: 220,  atk: 35,  def: 18,  gold: [80, 130],  xp: 160,  drops: [{ item: "Clava do Chefe", chance: 0.45, icone: "🏏", precoVenda: 50 }] },
    ruinas:      { name: "Rei Esqueleto",         emoji: "💀👑", hp: 280,  atk: 40,  def: 22,  gold: [100, 160], xp: 200,  drops: [{ item: "Coroa Amaldiçoada", chance: 0.40, icone: "👑", precoVenda: 60 }] },
    deserto:     { name: "Faraó Imortal",         emoji: "🏺👑", hp: 320,  atk: 45,  def: 25,  gold: [120, 190], xp: 240,  drops: [{ item: "Máscara Dourada", chance: 0.35, icone: "🎭", precoVenda: 70 }] },
    cemiterio:   { name: "Necromante Supremo",    emoji: "💀👑", hp: 300,  atk: 50,  def: 22,  gold: [115, 180], xp: 250,  drops: [{ item: "Cajado da Morte", chance: 0.30, icone: "🪄", precoVenda: 75 }] },
    caverna:     { name: "Dragão das Profundezas", emoji: "🐲👑", hp: 500,  atk: 55,  def: 35,  gold: [180, 300], xp: 350,  drops: [{ item: "Escama de Dragão", chance: 0.40, icone: "🐉", precoVenda: 90 }] },
    vulcao:      { name: "Senhor do Magma",       emoji: "🌋👑", hp: 550,  atk: 60,  def: 38,  gold: [200, 330], xp: 380,  drops: [{ item: "Coração de Magma", chance: 0.30, icone: "❤️‍🔥", precoVenda: 100 }] },
    geleira:     { name: "Rei do Inverno",        emoji: "❄️👑", hp: 520,  atk: 58,  def: 40,  gold: [190, 315], xp: 370,  drops: [{ item: "Coroa de Gelo", chance: 0.25, icone: "👑", precoVenda: 95 }] },
    cidadeFant:  { name: "Lorde Vampiro",         emoji: "🧛👑", hp: 600,  atk: 68,  def: 35,  gold: [220, 365], xp: 420,  drops: [{ item: "Medalhão Vampírico", chance: 0.25, icone: "📿", precoVenda: 110 }] },
    abismo:      { name: "Deus Antigo Cthar",     emoji: "🐙👑", hp: 700,  atk: 72,  def: 40,  gold: [250, 415], xp: 480,  drops: [{ item: "Tentáculo Divino", chance: 0.18, icone: "🐙", precoVenda: 130 }] },
    castelo:     { name: "Rei Lich Eterno",       emoji: "💀👑", hp: 750,  atk: 78,  def: 45,  gold: [280, 465], xp: 520,  drops: [{ item: "Filactério Eterno", chance: 0.15, icone: "💎", precoVenda: 150 }] },
    planoAstral: { name: "Observador Supremo",    emoji: "👁️👑", hp: 850,  atk: 85,  def: 42,  gold: [320, 530], xp: 580,  drops: [{ item: "Olho da Eternidade", chance: 0.12, icone: "👁️", precoVenda: 180 }] },
    infernus:    { name: "Príncipe Demônio",      emoji: "😈👑", hp: 1000, atk: 95,  def: 50,  gold: [380, 630], xp: 680,  drops: [{ item: "Coroa do Inferno", chance: 0.10, icone: "👑", precoVenda: 220 }] },
    tronoDeus:   { name: "Deus Corrompido Axiom", emoji: "⚡👑", hp: 1500, atk: 110, def: 60,  gold: [500, 830], xp: 1000, drops: [{ item: "Essência Divina", chance: 0.08, icone: "🌟", precoVenda: 500 }] }
};

// ============================================
// EVENTOS DE MASMORRA (simplificado — template por tier)
// ============================================

function gerarEventosMasmorra(areaKey) {
    var area = areas[areaKey];
    var tier = area.tier;

    // Escalar valores pelo tier
    var danoMin = 5 + tier * 8;
    var danoMax = 15 + tier * 15;
    var curaMin = 10 + tier * 8;
    var curaMax = 25 + tier * 15;
    var ouroMin = 10 + tier * 20;
    var ouroMax = 30 + tier * 40;
    var expMin = 10 + tier * 15;
    var expMax = 20 + tier * 25;

    return [
        { tipo: "combate", texto: "Monstros bloqueiam o caminho!", icone: "⚔️" },
        { tipo: "combate", texto: "Uma emboscada nas sombras!", icone: "💀" },
        { tipo: "tesouro", texto: "Baú escondido!", icone: "📦", ouro: [ouroMin, ouroMax], itemChance: 0.25, item: { nome: "Poção", icone: "🧪" } },
        { tipo: "tesouro", texto: "Tesouro de aventureiro caído!", icone: "💰", ouro: [ouroMin * 1.5, ouroMax * 1.5], itemChance: 0.15, item: { nome: "Gema Rara", icone: "💎" } },
        { tipo: "armadilha", texto: "Armadilha ativada!", icone: "⚠️", dano: [danoMin, danoMax] },
        { tipo: "armadilha", texto: "Veneno no ar!", icone: "☠️", dano: [danoMin * 0.8, danoMax * 0.8] },
        { tipo: "descanso", texto: "Sala segura com fonte curativa.", icone: "⛲", cura: [curaMin, curaMax] },
        { tipo: "enigma", texto: "Inscrição misteriosa na parede.", icone: "🧩", exp: [expMin, expMax], ouro: [ouroMin * 0.5, ouroMax * 0.5] },
        { tipo: "nada", texto: "Silêncio... nada acontece.", icone: "🌫️" }
    ];
}

// Substituir o acesso direto por função
var eventosMasmorra = {};
Object.keys(areas).forEach(function(key) {
    eventosMasmorra[key] = gerarEventosMasmorra(key);
});

var itensConsumiveis = {
    "Poção Pequena": { tipo: "cura", valor: 30, icone: "🧪" },
    "Poção Média": { tipo: "cura", valor: 75, icone: "🧪" },
    "Poção Grande": { tipo: "cura", valor: 150, icone: "🧪" },
    "Poção de Força": { tipo: "buff_atk", valor: 5, icone: "💪" },
    "Carne de Javali": { tipo: "cura", valor: 20, icone: "🥩" },
    "Seiva Mágica": { tipo: "cura", valor: 40, icone: "✨" }
};

var catalogoLoja = {
    comprar: [
        // ---- POÇÕES (escalam com o jogo) ----
        { nome: "Poção Menor", icone: "🧪", preco: 10, tipo: "consumivel", descricao: "Restaura 25 HP", efeito: { tipo: "cura", valor: 25 } },
        { nome: "Poção de Cura", icone: "🧪", preco: 30, tipo: "consumivel", descricao: "Restaura 60 HP", efeito: { tipo: "cura", valor: 60 } },
        { nome: "Poção Grande", icone: "🧪", preco: 80, tipo: "consumivel", descricao: "Restaura 150 HP", efeito: { tipo: "cura", valor: 150 } },
        { nome: "Poção Superior", icone: "💉", preco: 200, tipo: "consumivel", descricao: "Restaura 350 HP", efeito: { tipo: "cura", valor: 350 } },

        // ---- BUFF PERMANENTE ----
        { nome: "Tônico de Força", icone: "💪", preco: 60, tipo: "consumivel", descricao: "+2 Força permanente", efeito: { tipo: "buff_atk", valor: 2 } },
        { nome: "Tônico de Vigor", icone: "❤️", preco: 60, tipo: "consumivel", descricao: "+15 HP máx permanente", efeito: { tipo: "buff_hp", valor: 15 } },
        { nome: "Pergaminho de XP", icone: "📜", preco: 40, tipo: "consumivel", descricao: "+40 XP", efeito: { tipo: "exp", valor: 40 } },

        // ---- ESPECIAIS (caros) ----
        { nome: "Elixir de Poder", icone: "⚗️", preco: 250, tipo: "consumivel", descricao: "+5 Força permanente", efeito: { tipo: "buff_atk", valor: 5 } },
        { nome: "Elixir de Vitalidade", icone: "💖", preco: 250, tipo: "consumivel", descricao: "+40 HP máx permanente", efeito: { tipo: "buff_hp", valor: 40 } }
    ]
};

// ============================================
// EQUIPAMENTOS POR CLASSE (substitui catalogoFerreiro)
// ============================================

var equipamentosPorClasse = {

    // ╔══════════════════════════════════════════╗
    // ║  GUERREIRO / GUERREIRA                  ║
    // ║  Foco: ATK alto, DEF pesada             ║
    // ╚══════════════════════════════════════════╝
    guerreiro: [
        // ARMAS
        { nome: "Espada de Ferro", icone: "⚔️", preco: 30, slot: "arma", descricao: "Lâmina simples e confiável", stats: { atk: 6, def: 0, hp: 0 } },
        { nome: "Espada de Aço", icone: "⚔️", preco: 120, slot: "arma", descricao: "Aço temperado e afiado", stats: { atk: 14, def: 0, hp: 0 } },
        { nome: "Machado de Guerra", icone: "🪓", preco: 300, slot: "arma", descricao: "Pesado e devastador", stats: { atk: 24, def: 0, hp: 0 } },
        { nome: "Lâmina do Colosso", icone: "⚔️", preco: 800, slot: "arma", descricao: "Forjada para gigantes", stats: { atk: 40, def: 5, hp: 0 } },
        // ARMADURAS
        { nome: "Cota Leve", icone: "🛡️", preco: 35, slot: "armadura", descricao: "Proteção básica de metal", stats: { atk: 0, def: 4, hp: 10 } },
        { nome: "Cota de Malha", icone: "🛡️", preco: 130, slot: "armadura", descricao: "Anéis metálicos entrelaçados", stats: { atk: 0, def: 12, hp: 20 } },
        { nome: "Armadura de Placas", icone: "🛡️", preco: 350, slot: "armadura", descricao: "Placas de aço maciço", stats: { atk: 0, def: 22, hp: 40 } },
        { nome: "Armadura Titânica", icone: "🛡️", preco: 900, slot: "armadura", descricao: "Indestrutível como montanhas", stats: { atk: 0, def: 35, hp: 70 } }
    ],

    // ╔══════════════════════════════════════════╗
    // ║  PALADINO / PALADINA                    ║
    // ║  Foco: Balanced ATK/DEF/HP              ║
    // ╚══════════════════════════════════════════╝
    paladino: [
        { nome: "Maça de Ferro", icone: "🔨", preco: 30, slot: "arma", descricao: "Arma simples e sólida", stats: { atk: 4, def: 2, hp: 0 } },
        { nome: "Espada Abençoada", icone: "⚔️", preco: 130, slot: "arma", descricao: "Brilha com luz sagrada", stats: { atk: 10, def: 3, hp: 10 } },
        { nome: "Martelo Sagrado", icone: "🔨", preco: 320, slot: "arma", descricao: "Consagrado contra o mal", stats: { atk: 18, def: 5, hp: 20 } },
        { nome: "Lâmina Divina", icone: "✨", preco: 850, slot: "arma", descricao: "Forjada na luz celestial", stats: { atk: 30, def: 10, hp: 30 } },
        { nome: "Cota Sagrada", icone: "🛡️", preco: 40, slot: "armadura", descricao: "Benta por sacerdotes", stats: { atk: 0, def: 5, hp: 15 } },
        { nome: "Armadura do Templo", icone: "🛡️", preco: 140, slot: "armadura", descricao: "Forjada nos templos", stats: { atk: 0, def: 12, hp: 25 } },
        { nome: "Armadura Celestial", icone: "🛡️", preco: 380, slot: "armadura", descricao: "Brilha com proteção divina", stats: { atk: 0, def: 24, hp: 45 } },
        { nome: "Égide Divina", icone: "✨", preco: 950, slot: "armadura", descricao: "Escudo dos deuses", stats: { atk: 0, def: 36, hp: 80 } }
    ],

    // ╔══════════════════════════════════════════╗
    // ║  ARQUEIRO / ARQUEIRA                    ║
    // ║  Foco: ATK alto, DEF leve              ║
    // ╚══════════════════════════════════════════╝
    arqueiro: [
        { nome: "Arco Curto", icone: "🏹", preco: 28, slot: "arma", descricao: "Leve e preciso", stats: { atk: 5, def: 0, hp: 0 } },
        { nome: "Arco Composto", icone: "🏹", preco: 125, slot: "arma", descricao: "Madeira e metal combinados", stats: { atk: 13, def: 0, hp: 0 } },
        { nome: "Arco Longo Élfico", icone: "🏹", preco: 310, slot: "arma", descricao: "Artesanato élfico milenar", stats: { atk: 22, def: 0, hp: 5 } },
        { nome: "Arco da Tempestade", icone: "⚡", preco: 820, slot: "arma", descricao: "Flechas como relâmpagos", stats: { atk: 38, def: 3, hp: 0 } },
        { nome: "Veste de Couro", icone: "🦺", preco: 25, slot: "armadura", descricao: "Leve e flexível", stats: { atk: 0, def: 2, hp: 5 } },
        { nome: "Couro Reforçado", icone: "🦺", preco: 110, slot: "armadura", descricao: "Camadas de couro tratado", stats: { atk: 0, def: 7, hp: 12 } },
        { nome: "Armadura de Escamas", icone: "🦺", preco: 300, slot: "armadura", descricao: "Escamas metálicas leves", stats: { atk: 0, def: 14, hp: 25 } },
        { nome: "Manto do Vento", icone: "💨", preco: 800, slot: "armadura", descricao: "Move-se como o vento", stats: { atk: 5, def: 20, hp: 35 } }
    ],

    // ╔══════════════════════════════════════════╗
    // ║  MAGO / MAGA                            ║
    // ║  Foco: ATK médio, HP alto (frágil)      ║
    // ╚══════════════════════════════════════════╝
    mago: [
        { nome: "Cajado de Aprendiz", icone: "🪄", preco: 25, slot: "arma", descricao: "Madeira encantada", stats: { atk: 3, def: 0, hp: 5 } },
        { nome: "Cajado Arcano", icone: "🪄", preco: 120, slot: "arma", descricao: "Canaliza energia arcana", stats: { atk: 8, def: 0, hp: 15 } },
        { nome: "Cajado Elemental", icone: "🔮", preco: 310, slot: "arma", descricao: "Controla os elementos", stats: { atk: 16, def: 0, hp: 25 } },
        { nome: "Cajado do Archimago", icone: "🌟", preco: 850, slot: "arma", descricao: "Poder arcano supremo", stats: { atk: 28, def: 0, hp: 40 } },
        { nome: "Túnica de Aprendiz", icone: "👘", preco: 22, slot: "armadura", descricao: "Tecido encantado simples", stats: { atk: 0, def: 1, hp: 10 } },
        { nome: "Manto Arcano", icone: "👘", preco: 100, slot: "armadura", descricao: "Protege com magia", stats: { atk: 0, def: 5, hp: 20 } },
        { nome: "Vestes Elementais", icone: "🔮", preco: 280, slot: "armadura", descricao: "Resistente aos elementos", stats: { atk: 2, def: 10, hp: 35 } },
        { nome: "Vestes do Archimago", icone: "🌟", preco: 850, slot: "armadura", descricao: "O manto supremo", stats: { atk: 5, def: 18, hp: 60 } }
    ],

    // ╔══════════════════════════════════════════╗
    // ║  CLÉRIGO / CLÉRIGA                      ║
    // ║  Foco: DEF + HP alto, ATK médio         ║
    // ╚══════════════════════════════════════════╝
    clerigo: [
        { nome: "Maça de Madeira", icone: "🔨", preco: 22, slot: "arma", descricao: "Benta e simples", stats: { atk: 3, def: 0, hp: 8 } },
        { nome: "Maça Benta", icone: "🔨", preco: 115, slot: "arma", descricao: "Ungida com óleo sagrado", stats: { atk: 7, def: 3, hp: 15 } },
        { nome: "Cetro Sagrado", icone: "✝️", preco: 300, slot: "arma", descricao: "Símbolo de autoridade divina", stats: { atk: 14, def: 5, hp: 25 } },
        { nome: "Martelo da Fé", icone: "🔨", preco: 800, slot: "arma", descricao: "A fé feita arma", stats: { atk: 24, def: 8, hp: 40 } },
        { nome: "Hábito Sagrado", icone: "👘", preco: 30, slot: "armadura", descricao: "Veste clerical básica", stats: { atk: 0, def: 3, hp: 15 } },
        { nome: "Cota Clerical", icone: "🛡️", preco: 125, slot: "armadura", descricao: "Metal abençoado", stats: { atk: 0, def: 10, hp: 28 } },
        { nome: "Armadura da Fé", icone: "🛡️", preco: 340, slot: "armadura", descricao: "Protegida por orações", stats: { atk: 0, def: 20, hp: 45 } },
        { nome: "Vestimenta Divina", icone: "✨", preco: 880, slot: "armadura", descricao: "Tecida pela luz", stats: { atk: 0, def: 30, hp: 80 } }
    ],

    // ╔══════════════════════════════════════════╗
    // ║  LADINO / LADINA                        ║
    // ║  Foco: ATK alto, DEF baixa, ágil        ║
    // ╚══════════════════════════════════════════╝
    ladino: [
        { nome: "Adaga Afiada", icone: "🗡️", preco: 25, slot: "arma", descricao: "Rápida e letal", stats: { atk: 5, def: 0, hp: 0 } },
        { nome: "Lâmina Gêmea", icone: "🗡️", preco: 120, slot: "arma", descricao: "Uma lâmina em cada mão", stats: { atk: 12, def: 0, hp: 0 } },
        { nome: "Kris Envenenada", icone: "🗡️", preco: 300, slot: "arma", descricao: "Lâmina ondulada com veneno", stats: { atk: 22, def: 0, hp: 0 } },
        { nome: "Lâmina Fantasma", icone: "👻", preco: 800, slot: "arma", descricao: "Invisível até o golpe", stats: { atk: 36, def: 5, hp: 0 } },
        { nome: "Couro Leve", icone: "🦺", preco: 22, slot: "armadura", descricao: "Não atrapalha os movimentos", stats: { atk: 1, def: 2, hp: 5 } },
        { nome: "Veste das Sombras", icone: "🌑", preco: 105, slot: "armadura", descricao: "Escurece ao redor", stats: { atk: 2, def: 6, hp: 10 } },
        { nome: "Armadura Furtiva", icone: "🌑", preco: 290, slot: "armadura", descricao: "Silenciosa como a noite", stats: { atk: 3, def: 12, hp: 20 } },
        { nome: "Manto da Invisibilidade", icone: "👻", preco: 780, slot: "armadura", descricao: "Agora você me vê...", stats: { atk: 5, def: 18, hp: 30 } }
    ],

    // ╔══════════════════════════════════════════╗
    // ║  DRUIDA                                 ║
    // ║  Foco: Balanced, natureza               ║
    // ╚══════════════════════════════════════════╝
    druida: [
        { nome: "Cajado de Carvalho", icone: "🪵", preco: 25, slot: "arma", descricao: "Madeira viva", stats: { atk: 4, def: 0, hp: 5 } },
        { nome: "Cajado Verdejante", icone: "🌿", preco: 115, slot: "arma", descricao: "Brotos crescem na madeira", stats: { atk: 9, def: 0, hp: 15 } },
        { nome: "Cajado da Floresta Antiga", icone: "🌳", preco: 300, slot: "arma", descricao: "Espírito da floresta", stats: { atk: 18, def: 2, hp: 25 } },
        { nome: "Cajado Primordial", icone: "🌟", preco: 830, slot: "arma", descricao: "Poder da natureza pura", stats: { atk: 30, def: 5, hp: 35 } },
        { nome: "Veste Natural", icone: "🍃", preco: 28, slot: "armadura", descricao: "Folhas e fibras entrelaçadas", stats: { atk: 0, def: 3, hp: 10 } },
        { nome: "Couro Druídico", icone: "🍃", preco: 110, slot: "armadura", descricao: "Curtido com ervas", stats: { atk: 0, def: 8, hp: 20 } },
        { nome: "Armadura Silvestre", icone: "🌳", preco: 310, slot: "armadura", descricao: "A floresta te protege", stats: { atk: 0, def: 16, hp: 35 } },
        { nome: "Casca do Ancião", icone: "🌟", preco: 850, slot: "armadura", descricao: "Casca da árvore mãe", stats: { atk: 3, def: 28, hp: 60 } }
    ],

    // ╔══════════════════════════════════════════╗
    // ║  MONGE                                  ║
    // ║  Foco: ATK+DEF balanced, marcial         ║
    // ╚══════════════════════════════════════════╝
    monge: [
        { nome: "Ataduras de Combate", icone: "🥊", preco: 22, slot: "arma", descricao: "Faixas nos punhos", stats: { atk: 4, def: 1, hp: 0 } },
        { nome: "Luvas Reforçadas", icone: "🥊", preco: 110, slot: "arma", descricao: "Metal sob o tecido", stats: { atk: 10, def: 2, hp: 5 } },
        { nome: "Punhos de Jade", icone: "💚", preco: 290, slot: "arma", descricao: "Jade encantada nos dedos", stats: { atk: 20, def: 3, hp: 10 } },
        { nome: "Punhos do Dragão", icone: "🐲", preco: 790, slot: "arma", descricao: "Golpes como garras", stats: { atk: 34, def: 5, hp: 15 } },
        { nome: "Gi de Treinamento", icone: "🥋", preco: 24, slot: "armadura", descricao: "Uniforme básico", stats: { atk: 0, def: 2, hp: 8 } },
        { nome: "Vestes de Monge", icone: "🥋", preco: 100, slot: "armadura", descricao: "Tecido resistente", stats: { atk: 0, def: 6, hp: 15 } },
        { nome: "Traje do Mestre", icone: "🥋", preco: 300, slot: "armadura", descricao: "Dignidade e proteção", stats: { atk: 2, def: 14, hp: 30 } },
        { nome: "Vestes do Iluminado", icone: "🌟", preco: 800, slot: "armadura", descricao: "Transcendeu o corpo", stats: { atk: 5, def: 24, hp: 50 } }
    ]
};

// ACESSÓRIOS COMPARTILHADOS (todos usam)
var acessoriosComuns = [
    // ── ELMOS ──
    { nome: "Gorro de Couro", icone: "⛑️", preco: 20, slot: "elmo", descricao: "Proteção simples", stats: { atk: 0, def: 1, hp: 5 } },
    { nome: "Elmo de Ferro", icone: "⛑️", preco: 80, slot: "elmo", descricao: "Protege a cabeça", stats: { atk: 0, def: 5, hp: 8 } },
    { nome: "Elmo do Campeão", icone: "⛑️", preco: 250, slot: "elmo", descricao: "Marca dos veteranos", stats: { atk: 3, def: 10, hp: 15 } },
    { nome: "Coroa de Batalha", icone: "👑", preco: 700, slot: "elmo", descricao: "Digna de um rei", stats: { atk: 8, def: 15, hp: 30 } },

    // ── BOTAS ──
    { nome: "Sandálias Reforçadas", icone: "👢", preco: 20, slot: "botas", descricao: "Melhor que descalço", stats: { atk: 0, def: 1, hp: 3 } },
    { nome: "Botas de Caçador", icone: "👢", preco: 85, slot: "botas", descricao: "Leves e resistentes", stats: { atk: 1, def: 3, hp: 8 } },
    { nome: "Botas Céleres", icone: "👢", preco: 280, slot: "botas", descricao: "Encantadas com agilidade", stats: { atk: 3, def: 6, hp: 12 } },
    { nome: "Grevas Infernais", icone: "👢", preco: 650, slot: "botas", descricao: "Queimam o chão", stats: { atk: 6, def: 10, hp: 20 } },

    // ── ANÉIS ──
    { nome: "Anel de Lata", icone: "💍", preco: 15, slot: "anel", descricao: "Quase decorativo", stats: { atk: 1, def: 0, hp: 3 } },
    { nome: "Anel de Prata", icone: "💍", preco: 90, slot: "anel", descricao: "Brilho discreto", stats: { atk: 3, def: 2, hp: 10 } },
    { nome: "Anel de Ouro", icone: "💍", preco: 300, slot: "anel", descricao: "Gema encantada", stats: { atk: 6, def: 4, hp: 20 } },
    { nome: "Anel do Vazio", icone: "💍", preco: 750, slot: "anel", descricao: "Conecta ao nada", stats: { atk: 12, def: 8, hp: 30 } },

    // ── AMULETOS ──
    { nome: "Cordão de Osso", icone: "📿", preco: 20, slot: "amuleto", descricao: "Talismã primitivo", stats: { atk: 0, def: 1, hp: 5 } },
    { nome: "Amuleto de Jade", icone: "📿", preco: 100, slot: "amuleto", descricao: "Emana energia vital", stats: { atk: 2, def: 3, hp: 15 } },
    { nome: "Amuleto Arcano", icone: "📿", preco: 320, slot: "amuleto", descricao: "Poder antigo", stats: { atk: 5, def: 6, hp: 25 } },
    { nome: "Amuleto do Crepúsculo", icone: "📿", preco: 800, slot: "amuleto", descricao: "Entre luz e sombra", stats: { atk: 10, def: 10, hp: 40 } }
];

// ── MAPEAMENTO CLASSE → ARQUÉTIPO ──
function getArquetipoClasse() {
    var mapa = {
        "Guerreiro": "guerreiro", "Guerreira": "guerreiro",
        "Paladino": "paladino", "Paladina": "paladino",
        "Arqueiro": "arqueiro", "Arqueira": "arqueiro",
        "Mago": "mago", "Maga": "mago",
        "Clérigo": "clerigo", "Clériga": "clerigo",
        "Ladino": "ladino", "Ladina": "ladino",
        "Druida": "druida",
        "Monge": "monge"
    };
    return mapa[player.class] || "guerreiro";
}

// ── RETORNA EQUIPAMENTOS DISPONÍVEIS PARA A CLASSE ATUAL ──
function getEquipamentosFerreiro() {
    var arquetipo = getArquetipoClasse();
    var classeItems = equipamentosPorClasse[arquetipo] || [];

    // Combinar items de classe + acessórios universais
    var todos = [];

    classeItems.forEach(function(item) {
        todos.push({
            nome: item.nome, icone: item.icone, preco: item.preco,
            tipo: "equipamento", slot: item.slot,
            descricao: item.descricao, stats: item.stats
        });
    });

    acessoriosComuns.forEach(function(item) {
        todos.push({
            nome: item.nome, icone: item.icone, preco: item.preco,
            tipo: "equipamento", slot: item.slot,
            descricao: item.descricao, stats: item.stats
        });
    });

    // Ordenar por preço
    todos.sort(function(a, b) { return a.preco - b.preco; });

    return todos;
}

// MISSÕES POR ÁREA
var bancoDeMissoes = {
    floresta: [
        { id: "f1", titulo: "🐺 Caçada de Lobos", descricao: "Derrote 3 Lobos Cinzentos", tipo: "matar", alvo: "Lobo Cinzento", qtdNecessaria: 3, recompensas: { ouro: 50, xp: 40, item: null } },
        { id: "f2", titulo: "🕷️ Infestação", descricao: "Derrote 3 Aranhas Gigantes", tipo: "matar", alvo: "Aranha Gigante", qtdNecessaria: 3, recompensas: { ouro: 60, xp: 50, item: null } },
        { id: "f3", titulo: "🏰 Masmorra da Floresta", descricao: "Complete a masmorra", tipo: "masmorra", alvo: "floresta", qtdNecessaria: 1, recompensas: { ouro: 100, xp: 80, item: null } },
        { id: "f4", titulo: "💀 Caça Livre", descricao: "Derrote 5 monstros quaisquer", tipo: "matar_qualquer", alvo: null, qtdNecessaria: 5, recompensas: { ouro: 40, xp: 35, item: null } }
    ],
    ruinas: [
        { id: "r1", titulo: "💀 Purgar Mortos-Vivos", descricao: "Derrote 4 Esqueletos", tipo: "matar", alvo: "Esqueleto Guerreiro", qtdNecessaria: 4, recompensas: { ouro: 120, xp: 100, item: null } },
        { id: "r2", titulo: "🗿 Destruir o Golem", descricao: "Derrote 2 Golems", tipo: "matar", alvo: "Golem de Pedra", qtdNecessaria: 2, recompensas: { ouro: 150, xp: 120, item: null } },
        { id: "r3", titulo: "⚔️ Caçador das Ruínas", descricao: "Derrote 6 monstros quaisquer", tipo: "matar_qualquer", alvo: null, qtdNecessaria: 6, recompensas: { ouro: 100, xp: 90, item: null } }
    ],
    caverna: [
        { id: "c1", titulo: "👹 Caça ao Ogro", descricao: "Derrote 3 Ogros", tipo: "matar", alvo: "Ogro das Cavernas", qtdNecessaria: 3, recompensas: { ouro: 300, xp: 250, item: null } },
        { id: "c2", titulo: "⚔️ Veterano", descricao: "Derrote 8 monstros quaisquer", tipo: "matar_qualquer", alvo: null, qtdNecessaria: 8, recompensas: { ouro: 250, xp: 220, item: null } }
    ],
    cidade: [
        { id: "ci1", titulo: "👻 Exorcismo", descricao: "Derrote 4 Espectros", tipo: "matar", alvo: "Espectro Vingativo", qtdNecessaria: 4, recompensas: { ouro: 500, xp: 450, item: null } },
        { id: "ci2", titulo: "💀 Desafio Final", descricao: "Derrote 10 monstros quaisquer", tipo: "matar_qualquer", alvo: null, qtdNecessaria: 10, recompensas: { ouro: 400, xp: 350, item: null } }
    ]
};

// MONSTROS ELITE
var modificadoresElite = [
    { sufixo: "Furioso", emoji: "🔥", bonusAtk: 1.5, bonusDef: 1.0, bonusHp: 1.2, bonusOuro: 1.5, bonusXp: 1.8 },
    { sufixo: "Blindado", emoji: "🛡️", bonusAtk: 1.0, bonusDef: 2.0, bonusHp: 1.5, bonusOuro: 1.3, bonusXp: 1.5 },
    { sufixo: "Gigante", emoji: "⬆️", bonusAtk: 1.3, bonusDef: 1.3, bonusHp: 2.0, bonusOuro: 1.8, bonusXp: 2.0 },
    { sufixo: "das Sombras", emoji: "🌑", bonusAtk: 1.4, bonusDef: 1.4, bonusHp: 1.4, bonusOuro: 2.0, bonusXp: 2.2 },
    { sufixo: "Ancião", emoji: "👑", bonusAtk: 1.6, bonusDef: 1.6, bonusHp: 1.8, bonusOuro: 2.5, bonusXp: 2.5 }
];


// ============================================
// SEÇÃO 4: FUNÇÕES UTILITÁRIAS + ATRIBUTOS
// ============================================

function randomInt(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
function randomChoice(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function calcularXpNecessario(level) { return Math.floor(50 * Math.pow(1.4, level - 1)); }
function calcularChanceCritico() { return 0.05 + (player.destreza * 0.007) + getBonusTalento("critico"); }
function calcularChanceEsquiva() { return Math.max(0, (player.destreza - 10) * 0.015); }
function calcularChanceFuga(isBoss) { return Math.min(0.85, (isBoss ? 0.10 : 0.40) + player.destreza * 0.01); }
function calcularMultiplicadorHabilidade() { return (1.0 + player.inteligencia * 0.03) * getBonusTalento("maestria"); }
function calcularBonusXp() { return player.inteligencia * 0.01; }
function calcularMultiplicadorCura() { return 1.0 + player.sabedoria * 0.02; }
function calcularBonusDrop() { return player.sabedoria * 0.005 + (getBonusTalento("sorte") - 1) + getBonusHardcore("drop");
}
function calcularChanceEnigma() { return Math.min(0.95, 0.50 + player.sabedoria * 0.02); }
function calcularReducaoArmadilha() { return Math.max(0.30, 1.0 - player.vigor * 0.015); }
function calcularBonusOuro() {return (1.0 + player.carisma * 0.02) * getBonusTalento("sorte") * (1 + getBonusGuilda("ouro"));}
function calcularDescontoLoja() { return Math.min(0.20, player.carisma * 0.01); }

function getBonusTalento(tipo) {
    switch (tipo) {
        case "dano": return 1.0 + talentos.investidos.dano * 0.03;
        case "defesa": return 1.0 - Math.min(0.30, talentos.investidos.defesa * 0.03);
        case "vida": return 1.0 + talentos.investidos.vida * 0.05;
        case "critico": return talentos.investidos.critico * 0.02;
        case "sorte": return 1.0 + talentos.investidos.sorte * 0.03;
        case "maestria": return 1.0 + talentos.investidos.maestria * 0.05;
        default: return 1.0;
    }
}

var classesCrescimento = {
    "Guerreiro": { forca: 2, destreza: 0, vigor: 1, inteligencia: 0, sabedoria: 0, carisma: 0 },
    "Guerreira": { forca: 2, destreza: 0, vigor: 1, inteligencia: 0, sabedoria: 0, carisma: 0 },
    "Paladino": { forca: 1, destreza: 0, vigor: 1, inteligencia: 0, sabedoria: 1, carisma: 0 },
    "Paladina": { forca: 1, destreza: 0, vigor: 1, inteligencia: 0, sabedoria: 1, carisma: 0 },
    "Arqueiro": { forca: 0, destreza: 2, vigor: 0, inteligencia: 0, sabedoria: 1, carisma: 0 },
    "Arqueira": { forca: 0, destreza: 2, vigor: 0, inteligencia: 0, sabedoria: 1, carisma: 0 },
    "Mago": { forca: 0, destreza: 0, vigor: 0, inteligencia: 2, sabedoria: 1, carisma: 0 },
    "Maga": { forca: 0, destreza: 0, vigor: 0, inteligencia: 2, sabedoria: 1, carisma: 0 },
    "Clérigo": { forca: 0, destreza: 0, vigor: 1, inteligencia: 0, sabedoria: 2, carisma: 0 },
    "Clériga": { forca: 0, destreza: 0, vigor: 1, inteligencia: 0, sabedoria: 2, carisma: 0 },
    "Ladino": { forca: 0, destreza: 2, vigor: 0, inteligencia: 0, sabedoria: 0, carisma: 1 },
    "Ladina": { forca: 0, destreza: 2, vigor: 0, inteligencia: 0, sabedoria: 0, carisma: 1 },
    "Druida": { forca: 0, destreza: 0, vigor: 1, inteligencia: 1, sabedoria: 1, carisma: 0 },
    "Monge": { forca: 1, destreza: 1, vigor: 1, inteligencia: 0, sabedoria: 0, carisma: 0 }
};

function getCrescimentoClasse() {
    return classesCrescimento[player.class] || { forca: 1, destreza: 1, vigor: 1, inteligencia: 0, sabedoria: 0, carisma: 0 };
}


// ============================================
// SEÇÃO 5: NAVEGAÇÃO
// ============================================

function mudarTela(id) {
    document.querySelectorAll('.screen').forEach(function(s) { s.classList.remove('active'); });
    document.getElementById(id).classList.add('active');
    document.body.style.backgroundImage = id === 'welcomeScreen' ? "url('images/Fundo/rpg.png')" : "url('images/Fundo/tela.png')";
}

function esconderTodosPaineis() {
    [
        "navigationContainer",
        "areaSelectionPanel",
        "areaOptionsPanel",
        "monsterArea",
        "dungeonPanel",
        "inventoryPanel",
        "cidadePanel",
        "lojaPanel",
        "ferreiroPanel",
        "talentosPanel",
        "treinamentoPanel",
        "alquimiaPanel",
        "arenaPanel",
        "cemiterioPanel",
        "historiaPanel",
        "tavernaPanel",
        "guildaPanel",
        "eventoPanel",
        "mineracaoPanel"
    ].forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.style.display = "none";
    });
}
function mostrarPainel(id) {
    esconderTodosPaineis();
    var el = document.getElementById(id);
    if (el) el.style.display = "block";
}

function voltarMenuPrincipal() {
    esconderTodosPaineis();
    var nav = document.getElementById("navigationContainer");
    if (nav) nav.style.display = "block";
    var sub = document.getElementById("subMenu");
    if (sub) sub.innerHTML = "";
}

function voltarSelecaoArea() { mostrarPainel("areaSelectionPanel"); }

function showSubMenu(tipo) {
    document.getElementById("subMenu").innerHTML = "";
    if (tipo === 'explorar') { atualizarLockAreas(); mostrarPainel("areaSelectionPanel"); renderizarMapaVisual(); } 
    else if (tipo === 'cidade') { mostrarPainel("cidadePanel"); }
    else if (tipo === 'inventario') { renderizarInventario(); mostrarPainel("inventoryPanel"); }
    else if (tipo === 'talentos') {
        renderizarTalentos(); renderizarConquistas(); renderizarEstatisticas();
        var ce = document.getElementById("conquistasCount");
        var te = document.getElementById("conquistasTotal");
        if (ce) ce.textContent = conquistas.totalDesbloqueadas;
        if (te) te.textContent = conquistas.lista.length;
        mostrarPainel("talentosPanel");
    }
    
}


// ============================================
// SEÇÃO 6: ÁREAS
// ============================================


function selecionarArea(key) {
    if (player.level < areas[key].min) {
        mostrarNotificacao("🔒 Precisa de nível " + areas[key].min + "!");
        return;
    }
    gameState.areaAtual = key;
    document.getElementById("areaOptionsTitle").textContent = areas[key].nome;
    document.getElementById("areaOptionsDescription").textContent = areas[key].descricao;
    atualizarUIMissao();
    mostrarPainel("areaOptionsPanel");
    log("Chegou em " + areas[key].nome + ".");
}


// ============================================
// SEÇÃO 7: ELITE GENERATION
// ============================================

function tentarGerarElite(monstroBase) {
    var chance = Math.min(0.35, 0.05 + player.level * 0.02);
    if (Math.random() >= chance) return null;

    var mod = randomChoice(modificadoresElite);
    return {
        name: monstroBase.name + " " + mod.sufixo,
        nomeBase: monstroBase.name,
        emoji: mod.emoji + monstroBase.emoji,
        hp: Math.floor(monstroBase.hp * mod.bonusHp),
        atk: Math.floor(monstroBase.atk * mod.bonusAtk),
        def: Math.floor(monstroBase.def * mod.bonusDef),
        img: monstroBase.img,
        gold: [Math.floor(monstroBase.gold[0] * mod.bonusOuro), Math.floor(monstroBase.gold[1] * mod.bonusOuro)],
        xp: Math.floor(monstroBase.xp * mod.bonusXp),
        drops: monstroBase.drops,
        isElite: true, eliteMod: mod
    };
}


// ============================================
// SEÇÃO 8: CAÇA (com Elites integrados)
// ============================================

function iniciarCaca() {
    if (player.hp <= 0) { mostrarNotificacao("❤️ Precisa de HP!"); return; }

    var monstroBase = randomChoice(bancoDeMonstros[gameState.areaAtual]);
    gameState.combateOrigem = "caca";
    gameState.monstroIsBoss = false;

 if (tentarEventoAleatorio()) {
        return; // Evento apareceu em vez de combate
    }
    
    var elite = tentarGerarElite(monstroBase);
    if (elite) {
        log("🔥 Um monstro ELITE apareceu!");
        iniciarCombate(elite, false);
    } else {
        iniciarCombate(monstroBase, false);
    }
}


// ============================================
// SEÇÃO 9: COMBATE (INTEGRADO com todos os sistemas)
// ============================================

function iniciarCombate(monstroBase, isBoss) {
    gameState.emCombate = true;
    gameState.monstroIsBoss = isBoss;

    var escala = 1;
    if (!isBoss && gameState.areaAtual) {
        escala = Math.max(1, 1 + (player.level - areas[gameState.areaAtual].min) * 0.08);
    }

    monster = {
        name: monstroBase.name,
        nomeBase: monstroBase.nomeBase || monstroBase.name,
        emoji: monstroBase.emoji, img: monstroBase.img,
        hp: Math.floor(monstroBase.hp * escala),
        maxHp: Math.floor(monstroBase.hp * escala),
        atk: Math.floor(monstroBase.atk * escala),
        def: Math.floor((monstroBase.def || 0) * escala),
        gold: monstroBase.gold, xp: monstroBase.xp, drops: monstroBase.drops,
        isBoss: isBoss, isElite: monstroBase.isElite || false,
        eliteMod: monstroBase.eliteMod || null
    };

    player.defendendo = false;
    player.habilidadeCooldown = Math.max(0, player.habilidadeCooldown);
    mostrarPainel("monsterArea");

    var me = document.getElementById("monsterEmoji");
    var mi = document.getElementById("monsterImage");
    if (me) me.textContent = monster.emoji || "";
    document.getElementById("monsterName").textContent = (isBoss ? "👑 " : "") + (monster.isElite ? "🔥 " : "") + monster.name;

    if (mi && monster.img) { mi.src = monster.img; mi.style.display = "block"; mi.onerror = function() { this.style.display = "none"; }; }
    else if (mi) mi.style.display = "none";

    document.getElementById("monsterHpText").textContent = monster.hp + "/" + monster.maxHp;
    var ma = document.getElementById("monsterAtkUI"); if (ma) ma.textContent = monster.atk;
    var md = document.getElementById("monsterDefUI"); if (md) md.textContent = monster.def;
    atualizarBarraMonstro();

    var cl = document.getElementById("combatLog"); if (cl) cl.innerHTML = "";
    addCombatLog("⚔️ " + monster.name + " apareceu!", "info");
    if (isBoss) addCombatLog("👑 É um CHEFE!", "critical");
    if (monster.isElite) addCombatLog("🔥 Monstro ELITE! Cuidado!", "critical");

    log("Combate contra " + monster.name + "!");
    atualizarBotaoHabilidade();
    habilitarBotoesCombate(true);
}

function addCombatLog(t, tipo) {
    var cl = document.getElementById("combatLog"); if (!cl) return;
    var p = document.createElement("p"); p.className = "combat-" + (tipo || "info"); p.textContent = t;
    cl.appendChild(p); cl.scrollTop = cl.scrollHeight;
}

function atualizarBarraMonstro() {
    var b = document.getElementById("monsterHpBar");
    if (b && monster) b.style.width = Math.max(0, monster.hp / monster.maxHp * 100) + "%";
}

function habilitarBotoesCombate(a) {
    ["btnAttack","btnDefend","btnSkill","btnPotion","btnFlee"].forEach(function(id) {
        var b = document.getElementById(id); if (b) b.disabled = !a;
    });
}

function calcularDano(atk, def, usarCrit) {
    // Variação escala com ATK (10%)
    var variacao = Math.max(2, Math.floor(atk * 0.10));
    var base = Math.max(1, atk - def) + randomInt(-variacao, variacao);

    // Crítico
    var crit = Math.random() < (usarCrit ? calcularChanceCritico() : 0.10);
    if (crit) {
        base = Math.floor(base * 1.8);
        if (usarCrit) estatisticas.criticos++;
    }

    // Dano mínimo
    base = Math.max(1, base);

    // Bônus talento (só jogador)
    if (usarCrit) base = Math.floor(base * getBonusTalento("dano"));

    return { dano: base, critico: crit };
}

function atacar() {
    if (!gameState.emCombate || !monster || monster.hp <= 0) return;
    habilitarBotoesCombate(false);
    var r = calcularDano(player.atk, monster.def, true);
    monster.hp = Math.max(0, monster.hp - r.dano);

    addCombatLog((r.critico ? "💥 CRÍTICO! " : "⚔️ ") + r.dano + " dano!", r.critico ? "critical" : "player");
    document.getElementById("monsterHpText").textContent = monster.hp + "/" + monster.maxHp;
    atualizarBarraMonstro();
    player.defendendo = false;

    if (monster.hp <= 0) { setTimeout(vitoriaCombate, 600); return; }
    setTimeout(turnoInimigo, 800);
}
function attack() { atacar(); }

function defender() {
    if (!gameState.emCombate || !monster) return;
    habilitarBotoesCombate(false);
    player.defendendo = true;
    addCombatLog("🛡️ Defendendo!", "player");
    setTimeout(turnoInimigo, 800);
}

function fugir() {
    if (!gameState.emCombate || !monster) return;
    var chance = calcularChanceFuga(gameState.monstroIsBoss);
    if (Math.random() < chance) {
        addCombatLog("🏃 Fugiu! (" + Math.floor(chance * 100) + "%)", "info");
        gameState.emCombate = false;
        setTimeout(function() { mostrarPainel(gameState.emMasmorra ? "dungeonPanel" : "areaOptionsPanel"); }, 800);
    } else {
        addCombatLog("❌ Falha ao fugir!", "enemy");
        habilitarBotoesCombate(false);
        player.defendendo = false;
        setTimeout(turnoInimigo, 800);
    }
}

function usePotion() {
    var mult = calcularMultiplicadorCura();
    if (!gameState.emCombate) {
        if (player.potions > 0) {
            var c = Math.floor(30 * mult);
            var cr = Math.min(c, player.maxHp - player.hp);
            player.hp = Math.min(player.maxHp, player.hp + c);
            player.potions--;
            mostrarNotificacao("🧪 +" + cr + " HP!"); updateUI();
        } else { mostrarNotificacao("Sem poções!"); }
        return;
    }
    if (player.potions <= 0) { mostrarNotificacao("Sem poções!"); return; }
    habilitarBotoesCombate(false);
    var c2 = Math.floor(30 * mult);
    var cr2 = Math.min(c2, player.maxHp - player.hp);
    player.hp = Math.min(player.maxHp, player.hp + c2);
    player.potions--;
    addCombatLog("🧪 +" + cr2 + " HP!", "heal"); updateUI();
    player.defendendo = false;
    setTimeout(turnoInimigo, 800);
}

function turnoInimigo() {
    if (!gameState.emCombate || !monster || monster.hp <= 0) return;

    if (Math.random() < calcularChanceEsquiva()) {
        addCombatLog("🏃 Desviou! (DES " + player.destreza + ")", "player");
        estatisticas.esquivas++;
        if (player.habilidadeCooldown > 0) player.habilidadeCooldown--;
        habilitarBotoesCombate(true); return;
    }

    var r = calcularDano(monster.atk, player.def, false);
    var df = Math.floor(r.dano * getBonusTalento("defesa"));

    if (player.defendendo) {
        df = Math.floor(df * 0.4);
        addCombatLog("🛡️ Defesa! " + r.dano + "→" + df, "player");
        player.defendendo = false;
    }

    player.hp = Math.max(0, player.hp - df);
    addCombatLog((r.critico ? "💥 " : "🔴 ") + monster.name + " " + df + " dano!", r.critico ? "critical" : "enemy");

    if (player.habilidadeCooldown > 0) player.habilidadeCooldown--;
    updateUI();

    if (player.hp <= 0) { updateUI(); setTimeout(derrotaCombate, 600); return; }
    habilitarBotoesCombate(true);
}


// ============================================
// SEÇÃO 10: VITÓRIA (INTEGRADA com missões, conquistas, estatísticas)
// ============================================

function vitoriaCombate() {
    gameState.emCombate = false;
    addCombatLog("🎉 " + monster.name + " derrotado!", "critical");

    // ---- ESTATÍSTICAS ----
    estatisticas.monstrosDerrotados++;
    if (monster.isElite) estatisticas.elitesDerrotados++;
    if (monster.isBoss) estatisticas.bossesDerrotados++;

    // ---- RECOMPENSAS ----
    var gMin = monster.gold ? monster.gold[0] : 5;
    var gMax = monster.gold ? monster.gold[1] : 15;
    var ouro = Math.floor(randomInt(gMin, gMax) * calcularBonusOuro() * getBonusHardcore("ouro"));
    var xp = monster.xp || 10;

    var dropsTexto = "";
    if (monster.drops) {
        var bonusDrop = calcularBonusDrop();
        monster.drops.forEach(function(d) {
            if (Math.random() < Math.min(0.95, d.chance + bonusDrop)) {
                // Se o drop é consumível, salvar o efeito
                var extras = { precoVenda: d.precoVenda || 5 };
                if (d.consumivel && d.efeito) {
                    extras.tipo = "consumivel";
                    extras.efeito = d.efeito;
                    extras.descricao = d.efeito.tipo === "cura" ? "Restaura " + d.efeito.valor + " HP" :
                                      d.efeito.tipo === "buff_atk" ? "+" + d.efeito.valor + " Força" :
                                      d.efeito.tipo === "buff_hp" ? "+" + d.efeito.valor + " HP máx" :
                                      d.efeito.tipo === "exp" ? "+" + d.efeito.valor + " XP" : "";
                }
                adicionarItemInventario(d.item, d.icone, 1, extras);
                dropsTexto += "<br>" + d.icone + " " + d.item;
            }
        });
    }

    player.gold += ouro;
    estatisticas.ourolTotal += ouro;

    // ---- MISSÕES: VERIFICAR PROGRESSO ----
    var nomeParaMissao = monster.nomeBase || monster.name;
    verificarProgressoMissao("monstro_derrotado", { nome: nomeParaMissao });

    // ---- CONQUISTAS ----
    verificarConquistas();

    // ---- GANHAR XP ----
    ganharExp(xp);

    var eliteTag = monster.isElite ? " <span style='color:#fbbf24;'>(ELITE)</span>" : "";
    var rewardsHTML = "📊 XP: +" + xp + eliteTag + "<br>💰 Ouro: +" + ouro + dropsTexto;

    var retorno = "areaOptions";
    if (gameState.combateOrigem === "masmorra") retorno = "dungeon";
    else if (gameState.combateOrigem === "masmorraBoss") retorno = "dungeonComplete";

    setTimeout(function() {
        mostrarResultado(
            monster.isBoss ? "👑 CHEFE DERROTADO!" : (monster.isElite ? "🔥 ELITE DERROTADO!" : "⚔️ VITÓRIA!"),
            "🏆", "Derrotou " + monster.name + "!", rewardsHTML, retorno
        );
    }, 500);

    log("🎉 " + monster.name + " derrotado! +" + ouro + " ouro, +" + xp + " XP.");
}


// ============================================
// SEÇÃO 11: HABILIDADES POR CLASSE
// ============================================

var habilidadesClasse = {
    "Guerreiro": { nome: "⚔️ Golpe Devastador", cd: 4, exec: function() {
        var r = calcularDano(Math.floor(player.atk * 2.5), Math.floor(monster.def * 0.5), true);
        monster.hp = Math.max(0, monster.hp - r.dano);
        addCombatLog("⚔️ GOLPE DEVASTADOR! " + r.dano + " dano!", "critical");
    }},
    "Guerreira": { nome: "⚔️ Golpe Devastador", cd: 4, exec: function() {
        var r = calcularDano(Math.floor(player.atk * 2.5), Math.floor(monster.def * 0.5), true);
        monster.hp = Math.max(0, monster.hp - r.dano);
        addCombatLog("⚔️ GOLPE DEVASTADOR! " + r.dano + " dano!", "critical");
    }},
    "Paladino": { nome: "✝️ Julgamento Sagrado", cd: 4, exec: function() {
        var r = calcularDano(Math.floor(player.atk * 1.8 * (1 + player.sabedoria * 0.03)), monster.def, true);
        monster.hp = Math.max(0, monster.hp - r.dano);
        var cura = Math.min(Math.floor(player.maxHp * 0.25 * calcularMultiplicadorCura()), player.maxHp - player.hp);
        player.hp = Math.min(player.hp + cura + Math.floor(player.maxHp * 0.25 * calcularMultiplicadorCura()), player.maxHp);
        addCombatLog("✝️ JULGAMENTO! " + r.dano + " dano + " + cura + " HP!", "critical");
    }},
    "Paladina": { nome: "✝️ Julgamento Sagrado", cd: 4, exec: function() {
        habilidadesClasse["Paladino"].exec();
    }},
    "Arqueiro": { nome: "🏹 Chuva de Flechas", cd: 3, exec: function() {
        var total = 0, crits = 0;
        for (var i = 0; i < 3; i++) {
            var r = calcularDano(Math.floor(player.atk * 0.8), monster.def, true);
            total += r.dano; if (r.critico) crits++;
            monster.hp = Math.max(0, monster.hp - r.dano);
        }
        addCombatLog("🏹 CHUVA DE FLECHAS! 3 hits = " + total + " dano!" + (crits ? " (" + crits + " crits)" : ""), "critical");
    }},
    "Arqueira": { nome: "🏹 Chuva de Flechas", cd: 3, exec: function() { habilidadesClasse["Arqueiro"].exec(); }},
    "Mago": { nome: "☄️ Meteoro Arcano", cd: 5, exec: function() {
        var dano = Math.max(1, Math.floor(player.inteligencia * 3.0 * calcularMultiplicadorHabilidade()) + randomInt(-3, 5));
        monster.hp = Math.max(0, monster.hp - dano);
        addCombatLog("☄️ METEORO ARCANO! " + dano + " dano mágico puro!", "critical");
    }},
    "Maga": { nome: "☄️ Meteoro Arcano", cd: 5, exec: function() { habilidadesClasse["Mago"].exec(); }},
    "Clérigo": { nome: "🙏 Bênção Divina", cd: 4, exec: function() {
        var cura = Math.floor(player.maxHp * 0.50 * calcularMultiplicadorCura());
        var cr = Math.min(cura, player.maxHp - player.hp);
        player.hp = Math.min(player.hp + cura, player.maxHp);
        player.defendendo = true;
        addCombatLog("🙏 BÊNÇÃO DIVINA! +" + cr + " HP + Escudo!", "critical");
    }},
    "Clériga": { nome: "🙏 Bênção Divina", cd: 4, exec: function() { habilidadesClasse["Clérigo"].exec(); }},
    "Ladino": { nome: "🗡️ Golpe Furtivo", cd: 4, exec: function() {
        var dano = Math.floor(Math.max(1, player.atk * 3.0 - monster.def * 0.3) * 1.8) + randomInt(0, Math.floor(player.destreza * 0.5));
        monster.hp = Math.max(0, monster.hp - dano);
        addCombatLog("🗡️ GOLPE FURTIVO! " + dano + " dano crit garantido!", "critical");
    }},
    "Ladina": { nome: "🗡️ Golpe Furtivo", cd: 4, exec: function() { habilidadesClasse["Ladino"].exec(); }},
    "Druida": { nome: "🌿 Fúria da Natureza", cd: 4, exec: function() {
        var dano = Math.max(1, Math.floor(player.sabedoria * 2.0 * (1 + player.sabedoria * 0.03)) + randomInt(-2, 4));
        monster.hp = Math.max(0, monster.hp - dano);
        var cura = Math.min(Math.floor(player.maxHp * 0.20 * calcularMultiplicadorCura()), player.maxHp - player.hp);
        player.hp = Math.min(player.hp + cura + Math.floor(player.maxHp * 0.20 * calcularMultiplicadorCura()), player.maxHp);
        var veneno = Math.floor(player.sabedoria * 0.5);
        monster.hp = Math.max(0, monster.hp - veneno);
        addCombatLog("🌿 FÚRIA! " + dano + " dano + " + cura + " HP + " + veneno + " veneno!", "critical");
    }},
    "Monge": { nome: "👊 Rajada de Golpes", cd: 3, exec: function() {
        var total = 0, crits = 0;
        for (var i = 0; i < 4; i++) {
            var r = calcularDano(Math.floor(player.atk * 0.6 + player.destreza * 0.3), monster.def, true);
            total += r.dano; if (r.critico) crits++;
            monster.hp = Math.max(0, monster.hp - r.dano);
        }
        var cura = Math.min(Math.floor(player.maxHp * 0.10), player.maxHp - player.hp);
        player.hp = Math.min(player.hp + cura + Math.floor(player.maxHp * 0.10), player.maxHp);
        addCombatLog("👊 RAJADA! 4 hits = " + total + " dano + " + cura + " HP!", "critical");
    }}
};

function usarHabilidade() {
    if (!gameState.emCombate || !monster) return;
    var h = habilidadesClasse[player.class] || { nome: "✨ Poder", cd: 3, exec: function() {
        var r = calcularDano(Math.floor(player.atk * 1.5), monster.def, true);
        monster.hp = Math.max(0, monster.hp - r.dano);
        addCombatLog("✨ " + r.dano + " dano!", "critical");
    }};

    if (player.habilidadeCooldown > 0) {
        mostrarNotificacao("⏳ Cooldown! " + player.habilidadeCooldown + " turnos.");
        return;
    }

    habilitarBotoesCombate(false);
    player.habilidadeCooldown = h.cd;
    h.exec();
    addCombatLog("⏳ CD: " + h.cd + " turnos.", "info");

    document.getElementById("monsterHpText").textContent = monster.hp + "/" + monster.maxHp;
    atualizarBarraMonstro(); updateUI();

    if (monster.hp <= 0) { setTimeout(vitoriaCombate, 600); return; }
    setTimeout(turnoInimigo, 800);
}

function atualizarBotaoHabilidade() {
    var btn = document.getElementById("btnSkill");
    if (!btn) return;
    var h = habilidadesClasse[player.class];
    btn.textContent = h ? h.nome : "✨ Habilidade";
}


// ============================================
// SEÇÃO 12: MISSÕES (INTEGRADO)
// ============================================

function pegarMissao() {
    if (sistemaMissoes.missaoAtiva) { mostrarNotificacao("⚠️ Já tem missão ativa!"); return; }
    if (!gameState.areaAtual) { mostrarNotificacao("⚠️ Vá a uma área!"); return; }

    var lista = bancoDeMissoes[gameState.areaAtual];
    if (!lista || lista.length === 0) { mostrarNotificacao("Sem missões aqui."); return; }

    var m = randomChoice(lista);
    sistemaMissoes.missaoAtiva = {
        id: m.id, titulo: m.titulo, descricao: m.descricao,
        tipo: m.tipo, alvo: m.alvo,
        qtdNecessaria: m.qtdNecessaria, qtdAtual: 0,
        recompensas: m.recompensas, area: gameState.areaAtual
    };

    mostrarNotificacao("📜 Missão: " + m.titulo);
    log("📜 MISSÃO: " + m.titulo + " — " + m.descricao);
    atualizarUIMissao();
}

function verificarProgressoMissao(tipoEvento, dados) {
    if (!sistemaMissoes.missaoAtiva) return;
    var m = sistemaMissoes.missaoAtiva;

    if (m.tipo === "matar" && tipoEvento === "monstro_derrotado") {
        if (dados.nome === m.alvo) {
            m.qtdAtual++;
            log("📜 Progresso: " + m.qtdAtual + "/" + m.qtdNecessaria + " " + m.alvo);
        }
    } else if (m.tipo === "matar_qualquer" && tipoEvento === "monstro_derrotado") {
        m.qtdAtual++;
        log("📜 Progresso: " + m.qtdAtual + "/" + m.qtdNecessaria + " monstros");
    } else if (m.tipo === "masmorra" && tipoEvento === "masmorra_completa") {
        if (dados.area === m.alvo) m.qtdAtual = m.qtdNecessaria;
    }

    if (m.qtdAtual >= m.qtdNecessaria) completarMissaoAtiva();
    atualizarUIMissao();
}

function completarMissaoAtiva() {
    var m = sistemaMissoes.missaoAtiva;
    if (!m) return;

    player.gold += m.recompensas.ouro;
    ganharExp(m.recompensas.xp);

    if (m.recompensas.item) {
        adicionarItemInventario(m.recompensas.item.nome, m.recompensas.item.icone, 1, {
            tipo: m.recompensas.item.tipo || "material", efeito: m.recompensas.item.efeito || null
        });
    }

    sistemaMissoes.missoesCompletas++;
    sistemaMissoes.historico.push(m.id);

    var txt = "💰 +" + m.recompensas.ouro + " | 📊 +" + m.recompensas.xp + " XP";
    mostrarNotificacao("📜 MISSÃO COMPLETA! " + txt, 4000);
    log("📜 MISSÃO COMPLETA: " + m.titulo + "! " + txt);

    sistemaMissoes.missaoAtiva = null;
    verificarConquistas();
    updateUI();
}

function abandonarMissao() {
    if (!sistemaMissoes.missaoAtiva) return;
    log("❌ Missão abandonada: " + sistemaMissoes.missaoAtiva.titulo);
    sistemaMissoes.missaoAtiva = null;
    atualizarUIMissao();
}

function atualizarUIMissao() {
    var el = document.getElementById("missaoDisplay");
    if (!el) return;
    if (!sistemaMissoes.missaoAtiva) {
        el.innerHTML = '<p style="color:#64748b;text-align:center;font-style:italic;">Nenhuma missão ativa.</p>';
        return;
    }
    var m = sistemaMissoes.missaoAtiva;
    var pct = Math.floor(m.qtdAtual / m.qtdNecessaria * 100);
    el.innerHTML =
        '<div style="background:rgba(255,215,0,0.08);border:1px solid rgba(255,215,0,0.2);border-radius:8px;padding:10px;">' +
        '<strong style="color:#ffd700;">' + m.titulo + '</strong><br>' +
        '<small style="color:#94a3b8;">' + m.descricao + '</small><br>' +
        '<div class="hp-container" style="margin:6px 0;"><div style="width:' + pct + '%;height:100%;background:linear-gradient(90deg,#fbbf24,#f59e0b);border-radius:8px;"></div></div>' +
        '<span style="color:#fbbf24;">' + m.qtdAtual + '/' + m.qtdNecessaria + '</span>' +
        ' <button onclick="abandonarMissao()" style="font-size:0.7em;padding:3px 8px;background:rgba(127,29,29,0.5);border:1px solid #7f1d1d;color:#fca5a5;border-radius:4px;cursor:pointer;margin-left:8px;">✖ Abandonar</button></div>';
}


// ============================================
// SEÇÃO 13: CONQUISTAS + ESTATÍSTICAS + TALENTOS UI
// ============================================

function verificarConquistas() {
    conquistas.lista.forEach(function(c) {
        if (!c.desbloqueada && c.condicao()) {
            c.desbloqueada = true;
            conquistas.totalDesbloqueadas++;

            // Ouro
            if (c.recompensa.ouro) player.gold += c.recompensa.ouro;

            // BÔNUS PERMANENTE
            if (c.recompensa.bonus) {
                var b = c.recompensa.bonus;
                var bonusTexto = "";

                switch (b.tipo) {
                    case "forca":
                        player.forca += b.valor;
                        bonusTexto = "+" + b.valor + " Força";
                        break;
                    case "destreza":
                        player.destreza += b.valor;
                        bonusTexto = "+" + b.valor + " Destreza";
                        break;
                    case "vigor":
                        player.vigor += b.valor;
                        player.baseMaxHp += b.valor * 5;
                        bonusTexto = "+" + b.valor + " Vigor";
                        break;
                    case "inteligencia":
                        player.inteligencia += b.valor;
                        bonusTexto = "+" + b.valor + " Inteligência";
                        break;
                    case "sabedoria":
                        player.sabedoria += b.valor;
                        bonusTexto = "+" + b.valor + " Sabedoria";
                        break;
                    case "carisma":
                        player.carisma += b.valor;
                        bonusTexto = "+" + b.valor + " Carisma";
                        break;
                    case "talento":
                        talentos.pontosDisponiveis += b.valor;
                        bonusTexto = "+" + b.valor + " Pontos de Talento!";
                        break;
                    case "todos":
                        player.forca += b.valor;
                        player.destreza += b.valor;
                        player.vigor += b.valor;
                        player.inteligencia += b.valor;
                        player.sabedoria += b.valor;
                        player.carisma += b.valor;
                        player.baseMaxHp += b.valor * 5;
                        bonusTexto = "+" + b.valor + " em TODOS os atributos!";
                        break;
                }

                // Recalcular stats derivados
               aplicarBonusEquipamentos();

                mostrarNotificacao("🏆 " + c.titulo + "! " + bonusTexto + " (+" + c.recompensa.ouro + "💰)", 5000);
                log("🏆 CONQUISTA: " + c.titulo + " — " + bonusTexto + " | +" + c.recompensa.ouro + " ouro");
            } else {
                mostrarNotificacao("🏆 " + c.titulo + "! +" + c.recompensa.ouro + "💰", 4000);
                log("🏆 CONQUISTA: " + c.titulo + " | +" + c.recompensa.ouro + " ouro");
            }

            updateUI();
        }
    });
}

function renderizarConquistas() {
    var el = document.getElementById("conquistasLista"); if (!el) return;
    el.innerHTML = "";
    conquistas.lista.forEach(function(c) {
        var bonusTexto = "";
        if (c.recompensa.bonus) {
            switch (c.recompensa.bonus.tipo) {
                case "forca": bonusTexto = "⚔️+" + c.recompensa.bonus.valor + " FOR"; break;
                case "destreza": bonusTexto = "🏹+" + c.recompensa.bonus.valor + " DES"; break;
                case "vigor": bonusTexto = "❤️+" + c.recompensa.bonus.valor + " VIG"; break;
                case "inteligencia": bonusTexto = "🔮+" + c.recompensa.bonus.valor + " INT"; break;
                case "sabedoria": bonusTexto = "📖+" + c.recompensa.bonus.valor + " SAB"; break;
                case "carisma": bonusTexto = "🗣️+" + c.recompensa.bonus.valor + " CAR"; break;
                case "talento": bonusTexto = "⭐+" + c.recompensa.bonus.valor + " Talentos"; break;
                case "todos": bonusTexto = "🌟+" + c.recompensa.bonus.valor + " TODOS"; break;
            }
        }

        var d = document.createElement("div");
        d.style.cssText = "padding:8px;margin-bottom:4px;border-radius:6px;border:1px solid " +
            (c.desbloqueada ? "#22c55e" : "#334155") + ";background:" +
            (c.desbloqueada ? "rgba(34,197,94,0.1)" : "rgba(30,41,59,0.5)") + ";";
        d.innerHTML =
            '<div style="display:flex;justify-content:space-between;align-items:center;">' +
                '<div>' +
                    '<span style="color:' + (c.desbloqueada ? "#22c55e" : "#64748b") + ';font-weight:bold;font-size:0.85em;">' +
                    (c.desbloqueada ? "✅ " : "🔒 ") + c.titulo + '</span><br>' +
                    '<small style="color:#94a3b8;">' + c.descricao + '</small>' +
                '</div>' +
                '<div style="text-align:right;font-size:0.75em;">' +
                    '<span style="color:#fbbf24;">+' + c.recompensa.ouro + '💰</span>' +
                    (bonusTexto ? '<br><span style="color:' + (c.desbloqueada ? "#4ade80" : "#475569") + ';">' + bonusTexto + '</span>' : '') +
                '</div>' +
            '</div>';
        el.appendChild(d);
    });
}

function investirTalento(tipo) {
    if (talentos.pontosDisponiveis <= 0) { mostrarNotificacao("Sem pontos!"); return; }
    talentos.pontosDisponiveis--;
    talentos.investidos[tipo]++;
    if (tipo === "vida") aplicarBonusEquipamentos();
    mostrarNotificacao("⭐ +" + tipo + "!");
    renderizarTalentos(); updateUI();
}

function renderizarTalentos() {
    var el = document.getElementById("talentosDisplay"); if (!el) return;
    var desc = {
        dano: { n: "⚔️ Poder", d: "+3% dano/pt" },
        defesa: { n: "🛡️ Resiliência", d: "+3% redução/pt" },
        vida: { n: "❤️ Vitalidade", d: "+5% HP máx/pt" },
        critico: { n: "💥 Precisão", d: "+2% crit/pt" },
        sorte: { n: "🍀 Sorte", d: "+3% ouro e drops/pt" },
        maestria: { n: "✨ Maestria", d: "+5% skill dmg/pt" }
    };

    var html = '<div style="text-align:center;margin-bottom:10px;"><span style="color:#ffd700;font-weight:bold;">⭐ Pontos: ' + talentos.pontosDisponiveis + '</span></div>';

    Object.keys(desc).forEach(function(k) {
        var pts = talentos.investidos[k];
        html += '<div style="display:flex;justify-content:space-between;align-items:center;padding:6px;margin-bottom:4px;background:rgba(30,41,59,0.6);border-radius:6px;border:1px solid #334155;">' +
            '<div><span style="color:#e2e8f0;font-size:0.85em;font-weight:bold;">' + desc[k].n + '</span><br><small style="color:#64748b;">' + desc[k].d + '</small></div>' +
            '<div style="display:flex;align-items:center;gap:8px;"><span style="color:#fbbf24;font-size:0.85em;">' + pts + '</span>' +
            '<button onclick="investirTalento(\'' + k + '\')" ' + (talentos.pontosDisponiveis <= 0 ? 'disabled' : '') + ' style="padding:3px 10px;font-size:0.8em;border-radius:5px;">+</button></div></div>';
    });
    el.innerHTML = html;
}

function renderizarEstatisticas() {
    var el = document.getElementById("estatisticasDisplay"); if (!el) return;
    el.innerHTML = "🗡️ Monstros: <strong>" + estatisticas.monstrosDerrotados + "</strong><br>" +
        "🔥 Elites: <strong>" + estatisticas.elitesDerrotados + "</strong><br>" +
        "👑 Chefes: <strong>" + estatisticas.bossesDerrotados + "</strong><br>" +
        "🏰 Masmorras: <strong>" + estatisticas.masmorrasCompletas + "</strong><br>" +
        "📜 Missões: <strong>" + sistemaMissoes.missoesCompletas + "</strong><br>" +
        "💥 Críticos: <strong>" + estatisticas.criticos + "</strong><br>" +
        "🏃 Esquivas: <strong>" + estatisticas.esquivas + "</strong><br>" +
        "💰 Ouro total: <strong>" + estatisticas.ourolTotal + "</strong>";
}


// ============================================
// SEÇÃO 14: MASMORRA
// ============================================

function iniciarMasmorra() {
    if (player.hp <= 0) { mostrarNotificacao("❤️ Precisa de HP!"); return; }
    gameState.emMasmorra = true;
    gameState.dungeonFloor = 0;
    gameState.dungeonMaxFloor = areas[gameState.areaAtual].dungeonAndares || 5;
    var dt = document.getElementById("dungeonTitle"); if (dt) dt.textContent = "🏰 " + areas[gameState.areaAtual].nome;
    var mf = document.getElementById("dungeonMaxFloor"); if (mf) mf.textContent = gameState.dungeonMaxFloor;
    var df = document.getElementById("dungeonFloor"); if (df) df.textContent = "0";
    var pb = document.getElementById("dungeonProgressBar"); if (pb) pb.style.width = "0%";
    var ei = document.getElementById("dungeonEventIcon"); if (ei) ei.textContent = "🚪";
    var et = document.getElementById("dungeonEventText"); if (et) et.innerHTML = "Entrada da masmorra...";
    resetarBotaoAvancar();
    mostrarPainel("dungeonPanel");
}

function resetarBotaoAvancar() {
    var b = document.getElementById("btnDungeonAdvance");
    if (b) { b.textContent = "🚪 Avançar"; b.onclick = avancarMasmorra; }
}

function avancarMasmorra() {
    gameState.dungeonFloor++;
    var df = document.getElementById("dungeonFloor"); if (df) df.textContent = gameState.dungeonFloor;
    var pb = document.getElementById("dungeonProgressBar"); if (pb) pb.style.width = (gameState.dungeonFloor / gameState.dungeonMaxFloor * 100) + "%";
    if (gameState.dungeonFloor >= gameState.dungeonMaxFloor) { mostrarBossMasmorra(); return; }
    processarEventoMasmorra();
}

function mostrarBossMasmorra() {
    var boss = bossesMasmorra[gameState.areaAtual];
    var ei = document.getElementById("dungeonEventIcon"); if (ei) ei.textContent = boss.emoji;
    var et = document.getElementById("dungeonEventText"); if (et) et.innerHTML = '<strong style="color:#ff4444;">⚠️ CHEFE!</strong><br>' + boss.name + '!';
    var b = document.getElementById("btnDungeonAdvance");
    if (b) { b.textContent = "⚔️ ENFRENTAR"; b.onclick = function() { gameState.combateOrigem = "masmorraBoss"; iniciarCombate(boss, true); resetarBotaoAvancar(); }; }
}

function processarEventoMasmorra() {
    var ev = randomChoice(eventosMasmorra[gameState.areaAtual]);
    var ei = document.getElementById("dungeonEventIcon"); if (ei) ei.textContent = ev.icone;
    var et = document.getElementById("dungeonEventText");

    switch (ev.tipo) {
        case "combate":
            if (et) et.innerHTML = '<strong style="color:#ff6666;">⚔️ ENCONTRO!</strong><br>' + ev.texto;
            var m = randomChoice(bancoDeMonstros[gameState.areaAtual]);
            var b = document.getElementById("btnDungeonAdvance");
            if (b) { b.textContent = "⚔️ Combater!"; b.onclick = function() { gameState.combateOrigem = "masmorra"; iniciarCombate(m, false); resetarBotaoAvancar(); }; }
            break;
        case "tesouro":
            var o = Math.floor(randomInt(ev.ouro[0], ev.ouro[1]) * calcularBonusOuro());
            player.gold += o;
            var txt = ev.texto + "<br>💰 +" + o + " ouro!";
            if (ev.itemChance && ev.item && Math.random() < Math.min(0.95, ev.itemChance + calcularBonusDrop())) {
                adicionarItemInventario(ev.item.nome, ev.item.icone);
                txt += "<br>" + ev.item.icone + " " + ev.item.nome;
            }
            if (et) et.innerHTML = '<strong style="color:#ffd700;">📦 TESOURO!</strong><br>' + txt;
            updateUI(); break;
        case "armadilha":
            var dano = Math.floor(randomInt(ev.dano[0], ev.dano[1]) * calcularReducaoArmadilha());
            player.hp = Math.max(0, player.hp - dano);
            if (et) et.innerHTML = '<strong style="color:#ff4444;">⚠️ ARMADILHA!</strong><br>' + ev.texto + '<br>💔 -' + dano + ' HP!';
            updateUI();
            if (player.hp <= 0) setTimeout(function() { gameState.emMasmorra = false; var go = document.getElementById("gameOverText"); if (go) go.textContent = "Armadilha..."; var gs = document.getElementById("gameOverScreen"); if (gs) gs.style.display = "flex"; }, 1000);
            break;
        case "descanso":
            var cura = Math.floor(randomInt(ev.cura[0], ev.cura[1]) * calcularMultiplicadorCura());
            var cr = Math.min(cura, player.maxHp - player.hp);
            player.hp = Math.min(player.hp + cura, player.maxHp);
            if (et) et.innerHTML = '<strong style="color:#66ff66;">💚 DESCANSO!</strong><br>' + ev.texto + '<br>❤️ +' + cr + ' HP!';
            updateUI(); break;
        case "enigma":
            if (Math.random() < calcularChanceEnigma()) {
                var xp = randomInt(ev.exp[0], ev.exp[1]);
                var o2 = Math.floor(randomInt(ev.ouro[0], ev.ouro[1]) * calcularBonusOuro());
                player.gold += o2;
                if (et) et.innerHTML = '<strong style="color:#66aaff;">🧩 ENIGMA!</strong><br>' + ev.texto + '<br>✅ +' + xp + ' XP | +' + o2 + ' ouro';
                ganharExp(xp);
            } else {
                if (et) et.innerHTML = '<strong style="color:#ff8844;">🧩 ENIGMA!</strong><br>' + ev.texto + '<br>❌ Falhou...';
            }
            updateUI(); break;
        case "nada":
            if (et) et.innerHTML = '<strong style="color:#888;">🌫️ VAZIO</strong><br>' + ev.texto;
            break;
    }
}

function sairMasmorra() { gameState.emMasmorra = false; resetarBotaoAvancar(); mostrarPainel("areaOptionsPanel"); }

function completarMasmorra() {
    gameState.emMasmorra = false;
    var idx = ['floresta','ruinas','caverna','cidade'].indexOf(gameState.areaAtual) + 1;
    var ouro = randomInt(50, 150) * idx;
    player.gold += ouro;

    estatisticas.masmorrasCompletas++;
    verificarProgressoMissao("masmorra_completa", { area: gameState.areaAtual });
    verificarConquistas();

    mostrarResultado("🏰 MASMORRA COMPLETA!", "🎊", "Conquistou a masmorra!", "🏆 +" + ouro + " ouro!", "areaOptions");
    log("🏰 Masmorra completa! +" + ouro + " ouro!"); resetarBotaoAvancar(); updateUI();
}


// ============================================
// SEÇÃO 15: EXP E LEVEL UP (com talento integrado)
// ============================================

function ganharExp(base) {
    var qtd = Math.floor(base * (1 + calcularBonusXp()));
    player.xp += qtd;
    while (player.xp >= player.xpParaProximoNivel) { player.xp -= player.xpParaProximoNivel; levelUp(); }
    updateUI();
}

// ============================================
// MAPA DE ÁREAS (FORA de qualquer função)
// ============================================
const areasDesbloqueio = {
    4:  { nome: "Pântano Venenoso",    icone: "🐸",  id: "pantano" },
    7:  { nome: "Colinas Sangrentas",  icone: "⛰️",  id: "colinas" },
    10: { nome: "Ruínas Esquecidas",   icone: "🏚️",  id: "ruinas" },
    13: { nome: "Deserto Escaldante",  icone: "🏜️",  id: "deserto" },
    16: { nome: "Cemitério Profano",   icone: "⚰️",  id: "cemiterio" },
    19: { nome: "Caverna Profunda",    icone: "🕳️",  id: "caverna" },
    22: { nome: "Vulcão Infernal",     icone: "🌋",  id: "vulcao" },
    25: { nome: "Geleira Eterna",      icone: "🏔️",  id: "geleira" },
    28: { nome: "Cidade Fantasma",     icone: "👻",  id: "cidadeFant" },
    31: { nome: "Abismo Sombrio",      icone: "🌑",  id: "abismo" },
    34: { nome: "Castelo Amaldiçoado", icone: "🏰",  id: "castelo" },
    37: { nome: "Plano Astral",        icone: "🌌",  id: "planoAstral" },
    40: { nome: "Infernus",            icone: "🔥",  id: "infernus" },
    43: { nome: "Trono dos Deuses",    icone: "⚡",  id: "tronoDeus" }
};

// ============================================
// VERIFICAR NOVAS ÁREAS (FORA de qualquer função)
// ============================================
function verificarNovasAreas(novoNivel) {
    const area = areasDesbloqueio[novoNivel];
    if (area) {
        const card = document.getElementById('area-' + area.id);
        if (card) card.classList.remove('locked');

        const lock = document.getElementById('lock-' + area.id);
        if (lock) lock.style.display = 'none';

        setTimeout(() => {
            mostrarDesbloqueioArea(area.nome, area.icone, novoNivel);
        }, 500);
    }
}

// ============================================
// LEVEL UP (corrigida)
// ============================================
function levelUp() {
    player.level++;
    talentos.pontosDisponiveis++;

    var c = getCrescimentoClasse();
    player.forca += c.forca; player.destreza += c.destreza; player.vigor += c.vigor;
    player.inteligencia += c.inteligencia; player.sabedoria += c.sabedoria; player.carisma += c.carisma;

    var hpG = 5 + Math.floor(player.vigor * 0.5);
    player.baseMaxHp += hpG;
    aplicarBonusEquipamentos();
    player.hp = player.maxHp;
    player.xpParaProximoNivel = calcularXpNecessario(player.level);

    var txt = "";
    if (c.forca > 0) txt += "⚔️ FOR +" + c.forca + " ";
    if (c.destreza > 0) txt += "🏹 DES +" + c.destreza + " ";
    if (c.vigor > 0) txt += "❤️ VIG +" + c.vigor + " ";
    if (c.inteligencia > 0) txt += "🔮 INT +" + c.inteligencia + " ";
    if (c.sabedoria > 0) txt += "📖 SAB +" + c.sabedoria + " ";
    if (c.carisma > 0) txt += "🗣️ CAR +" + c.carisma + " ";

    var el = document.getElementById("levelUpText");
    if (el) el.innerHTML = "Nível <strong style='color:#ffd700;'>" + player.level + "</strong><br>" + txt + "<br>❤️ HP +" + hpG + "<br><span style='color:#fbbf24;'>⭐ +1 Ponto de Talento!</span><br><span style='color:#66ff66;'>HP restaurado!</span>";

    var ls = document.getElementById("levelUpScreen"); if (ls) ls.style.display = "flex";
    mostrarNotificacao("⭐ Level " + player.level + "! +1 Talento!");
    verificarConquistas(); 
    updateUI();

    // >>> VERIFICA NOVA ÁREA <<<
    verificarNovasAreas(player.level);
}

function fecharLevelUp() { var ls = document.getElementById("levelUpScreen"); if (ls) ls.style.display = "none"; }
// ============================================
// SEÇÃO 16: INVENTÁRIO + EQUIPAMENTOS
// ============================================

function adicionarItemInventario(nome, icone, qtd, extras) {
    qtd = qtd || 1; extras = extras || {};
    var existe = player.inventario.find(function(i) { return i.nome === nome; });
    if (existe) { existe.quantidade += qtd; } else {
        player.inventario.push({ nome: nome, icone: icone, quantidade: qtd, tipo: extras.tipo || "material", descricao: extras.descricao || "", efeito: extras.efeito || null, slot: extras.slot || null, stats: extras.stats || null, preco: extras.preco || 0, precoVenda: extras.precoVenda || Math.floor((extras.preco || 10) * 0.5) });
    }
}

function usarItemInventario(idx) {
    var item = player.inventario[idx]; if (!item) return;
    var mc = calcularMultiplicadorCura();
    if (item.efeito) {
        switch (item.efeito.tipo) {
            case "cura": var v = Math.floor(item.efeito.valor * mc); var cr = Math.min(v, player.maxHp - player.hp); player.hp = Math.min(player.hp + v, player.maxHp); mostrarNotificacao(item.icone + " +" + cr + " HP!"); break;
            case "buff_atk": player.forca += item.efeito.valor; player.atk = Math.floor(player.forca / 2); aplicarBonusEquipamentos(); mostrarNotificacao("💪 +" + item.efeito.valor + " Força!"); break;
            case "buff_hp": player.baseMaxHp += item.efeito.valor; aplicarBonusEquipamentos(); player.hp += item.efeito.valor; mostrarNotificacao("❤️ +" + item.efeito.valor + " HP máx!"); break;
            case "exp": ganharExp(item.efeito.valor); mostrarNotificacao("📊 +" + item.efeito.valor + " XP!"); break;
            default: mostrarNotificacao("Não pode usar."); return;
        }
    } else {
        var c = itensConsumiveis[item.nome];
        if (c && c.tipo === "cura") { var v2 = Math.floor(c.valor * mc); player.hp = Math.min(player.hp + v2, player.maxHp); mostrarNotificacao(c.icone + " +" + v2 + " HP!"); }
        else { mostrarNotificacao("Não pode usar."); return; }
    }
    item.quantidade--; if (item.quantidade <= 0) player.inventario.splice(idx, 1);
    updateUI(); renderizarInventario();
}

function renderizarInventario() {
    var lista = document.getElementById("inventoryList"); var vazio = document.getElementById("inventarioVazio");
    if (!lista) return; lista.innerHTML = "";
    atualizarSlotsEquipamento();

    if (player.inventario.length === 0 && player.potions <= 0) { if (vazio) vazio.style.display = "block"; return; }
    if (vazio) vazio.style.display = "none";

    if (player.potions > 0) {
        var mc = calcularMultiplicadorCura(); var ce = Math.floor(30 * mc);
        var d = document.createElement("div"); d.className = "inventory-item";
        d.innerHTML = '<div class="item-info"><span class="item-icon">🧪</span><div><span class="item-name">Poção de Cura</span><br><small style="color:#64748b">Restaura ' + ce + ' HP</small></div></div><div class="item-actions"><span class="item-qty">x' + player.potions + '</span><button class="item-use-btn" onclick="usePotion()">Usar</button></div>';
        lista.appendChild(d);
    }

    player.inventario.forEach(function(item, i) {
        var d = document.createElement("div");
        d.className = "inventory-item" + (item.tipo === "equipamento" ? " is-equipment" : "");
        var info = '<span class="item-icon">' + item.icone + '</span><div><span class="item-name">' + item.nome + '</span>';
        if (item.tipo === "equipamento" && item.stats) {
            var st = [];
            if (item.stats.atk > 0) st.push("⚔️+" + item.stats.atk);
            if (item.stats.def > 0) st.push("🛡️+" + item.stats.def);
            if (item.stats.hp > 0) st.push("❤️+" + item.stats.hp);
            info += '<br><small style="color:#38bdf8">[' + (item.slot || "equip") + '] ' + st.join(" ") + '</small>';
        } else if (item.descricao) { info += '<br><small style="color:#64748b">' + item.descricao + '</small>'; }
        info += '</div>';

        var btns = '<span class="item-qty">x' + item.quantidade + '</span>';
        if (item.tipo === "equipamento") btns += '<button class="item-equip-btn" onclick="equiparItem(' + i + ')">Equipar</button>';
        else if (item.efeito || itensConsumiveis[item.nome]) btns += '<button class="item-use-btn" onclick="usarItemInventario(' + i + ')">Usar</button>';

        d.innerHTML = '<div class="item-info">' + info + '</div><div class="item-actions">' + btns + '</div>';
        lista.appendChild(d);
    });
}

function equiparItem(idx) {
    var item = player.inventario[idx]; if (!item || item.tipo !== "equipamento") return;
    if (player.equipamentos[item.slot]) desequipar(item.slot, true);
    player.equipamentos[item.slot] = { nome: item.nome, icone: item.icone, stats: item.stats, slot: item.slot, preco: item.preco, precoVenda: item.precoVenda };
    item.quantidade--; if (item.quantidade <= 0) player.inventario.splice(idx, 1);
    aplicarBonusEquipamentos(); mostrarNotificacao(item.icone + " " + item.nome + " equipado!");
    renderizarInventario(); updateUI();
}

function desequipar(slot, silencioso) {
    var e = player.equipamentos[slot]; if (!e) return;
    adicionarItemInventario(e.nome, e.icone, 1, { tipo: "equipamento", slot: e.slot, stats: e.stats, preco: e.preco, precoVenda: e.precoVenda });
    player.equipamentos[slot] = null;
    aplicarBonusEquipamentos();
    if (!silencioso) mostrarNotificacao("Desequipou " + e.nome);
    renderizarInventario(); updateUI();
}

// ============================================
// ATK BASE POR CLASSE
// ============================================

var atkBaseClasse = {
    // Classes de 1 atributo: stat / 2
    guerreiro: function() { return Math.floor(player.forca / 2); },           // ⚔️ Força pura
    arqueiro:  function() { return Math.floor(player.destreza / 2); },        // 🏹 Destreza pura
    mago:      function() { return Math.floor(player.inteligencia / 2); },    // 🔮 Inteligência pura
    clerigo:   function() { return Math.floor(player.sabedoria / 2); },       // 📖 Sabedoria pura
    ladino:    function() { return Math.floor(player.destreza / 2); },        // 🗡️ Destreza pura

    // Classes híbridas: (stat1 + stat2) / 3
    paladino:  function() { return Math.floor((player.forca + player.sabedoria) / 3); },       // ⚔️+📖
    druida:    function() { return Math.floor((player.inteligencia + player.sabedoria) / 3); }, // 🔮+📖
    monge:     function() { return Math.floor((player.forca + player.destreza) / 3); }         // ⚔️+🏹
};

// Mapear nomes de classe (masculino/feminino) → arquétipo
var classeParaArquetipo = {
    "Guerreiro": "guerreiro", "Guerreira": "guerreiro",
    "Paladino": "paladino",   "Paladina": "paladino",
    "Arqueiro": "arqueiro",   "Arqueira": "arqueiro",
    "Mago": "mago",           "Maga": "mago",
    "Clérigo": "clerigo",     "Clériga": "clerigo",
    "Ladino": "ladino",       "Ladina": "ladino",
    "Druida": "druida",
    "Monge": "monge"
};

function calcularAtkBase() {
    var arquetipo = classeParaArquetipo[player.class];
    if (arquetipo && atkBaseClasse[arquetipo]) {
        return atkBaseClasse[arquetipo]();
    }
    // Fallback: usa o maior atributo ofensivo
    return Math.floor(Math.max(player.forca, player.destreza, player.inteligencia, player.sabedoria) / 2);
}

function aplicarBonusEquipamentos() {
    var ba = 0, bd = 0, bh = 0;
    ['arma','armadura','elmo','botas','anel','amuleto'].forEach(function(s) {
        var e = player.equipamentos[s];
        if (e && e.stats) {
            ba += e.stats.atk || 0;
            bd += e.stats.def || 0;
            bh += e.stats.hp || 0;
        }
    });

    var atkBase = calcularAtkBase();
    var defBase = Math.floor(player.vigor / 2);

    // Aplicar bônus de guilda
    player.atk = Math.floor((atkBase + ba) * (1 + getBonusGuilda("atk")));
    player.def = Math.floor((defBase + bd) * (1 + getBonusGuilda("def")));
    player.maxHp = Math.floor(((player.baseMaxHp || player.maxHp) * getBonusTalento("vida")) + bh) * (1 + getBonusGuilda("hp"));
    player.maxHp = Math.floor(player.maxHp);
    if (player.hp > player.maxHp) player.hp = player.maxHp;

    var ae = document.getElementById("bonusAtkTotal"); if (ae) ae.textContent = ba;
    var de2 = document.getElementById("bonusDefTotal"); if (de2) de2.textContent = bd;
    var he = document.getElementById("bonusHpTotal"); if (he) he.textContent = bh;
}
function atualizarSlotsEquipamento() {
    ['arma','armadura','elmo','botas','anel','amuleto'].forEach(function(s) {
        var sd = document.getElementById("slot-" + s);
        var si = document.getElementById("slot-" + s + "-item");
        var e = player.equipamentos[s];
        if (e) { if (sd) sd.classList.add("equipped"); if (si) si.textContent = e.icone + " " + e.nome; }
        else { if (sd) sd.classList.remove("equipped"); if (si) si.textContent = "Vazio"; }
    });
}


// ============================================
// SEÇÃO 17: RESULTADO / GAME OVER / NOTIFICAÇÃO / UI
// ============================================

function mostrarResultado(titulo, icone, texto, recompensas, retorno) {
    var rs = document.getElementById("resultScreen");
    var rt = document.getElementById("resultTitle"); if (rt) rt.textContent = titulo;
    var ri = document.getElementById("resultIcon"); if (ri) ri.textContent = icone;
    var rx = document.getElementById("resultText"); if (rx) rx.innerHTML = texto;
    var rr = document.getElementById("resultRewards"); if (rr) rr.innerHTML = recompensas || "";
    gameState.retornoResultado = retorno || "menu";
    if (rs) rs.style.display = "flex";
}

function fecharResultado() {
    var rs = document.getElementById("resultScreen"); if (rs) rs.style.display = "none";
    if (gameState.retornoResultado === "dungeon") { resetarBotaoAvancar(); mostrarPainel("dungeonPanel"); }
    else if (gameState.retornoResultado === "dungeonComplete") completarMasmorra();
    else if (gameState.retornoResultado === "areaOptions") mostrarPainel("areaOptionsPanel");
    else voltarMenuPrincipal();
}

function reviver() {
    estatisticas.vezesRevivido++;
    var lost = Math.floor(player.gold * 0.5);
    player.gold -= lost; player.hp = Math.floor(player.maxHp * 0.5);
    var gs = document.getElementById("gameOverScreen"); if (gs) gs.style.display = "none";
    mostrarNotificacao("Reviveu! -" + lost + " ouro.");
    verificarConquistas(); voltarMenuPrincipal(); updateUI();
}

function mostrarNotificacao(texto, duracao) {
    duracao = duracao || 2500;
    var n = document.getElementById("notification");
    var nt = document.getElementById("notificationText");
    if (!n || !nt) return;
    nt.textContent = texto; n.style.display = "block";
    setTimeout(function() { n.style.display = "none"; }, duracao);
}

function updateUI() {
    var set = function(id, v) { var e = document.getElementById(id); if (e) e.innerText = v; };
    var nomeDisplay = player.nome || player.name;
if (isHardcore()) nomeDisplay += ' <span class="hardcore-badge">☠️</span>';
var nomeEl = document.getElementById("playerNameUI");
if (nomeEl) nomeEl.innerHTML = nomeDisplay;
set("raceUI", player.raça); set("classUI", player.class);
    set("hpText", player.hp + "/" + player.maxHp); set("goldUI", player.gold); set("levelUI", player.level);
    set("potionsUI", player.potions);
    set("forcaUI", player.forca); set("destrezaUI", player.destreza); set("vigorUI", player.vigor);
    set("inteligenciaUI", player.inteligencia); set("sabedoriaUI", player.sabedoria); set("carismaUI", player.carisma);

// Ícone do tipo de ATK por classe
var iconeAtkClasse = {
    "Guerreiro": "⚔️", "Guerreira": "⚔️",
    "Paladino": "✨", "Paladina": "✨",
    "Arqueiro": "🏹", "Arqueira": "🏹",
    "Mago": "🔮", "Maga": "🔮",
    "Clérigo": "📖", "Clériga": "📖",
    "Ladino": "🗡️", "Ladina": "🗡️",
    "Druida": "🌿",
    "Monge": "🥊"
};
var atkIcon = document.getElementById("atkTypeIcon");
if (atkIcon) atkIcon.textContent = iconeAtkClasse[player.class] || "⚔️";

    // >>> LINHAS QUE FALTAVAM <<<
    set("atkUI", player.atk);
    set("defUI", player.def);

    var hb = document.getElementById("playerHpBar");
    if (hb) { var hp = player.hp / player.maxHp * 100; hb.style.width = hp + "%"; hb.style.background = hp > 60 ? "linear-gradient(90deg,#44ff44,#66ff66)" : hp > 30 ? "linear-gradient(90deg,#ffaa00,#ffcc44)" : "linear-gradient(90deg,#ff4444,#ff6666)"; }

    var xpMax = player.xpParaProximoNivel || 100;
    var xb = document.getElementById("playerXpBar"); if (xb) xb.style.width = Math.min(100, player.xp / xpMax * 100) + "%";
    set("xpText", player.xp + "/" + xpMax);

    var lg = document.getElementById("lojaGoldUI"); if (lg) lg.textContent = player.gold;
    var fg = document.getElementById("ferreiroGoldUI"); if (fg) fg.textContent = player.gold;
    var ag = document.getElementById("alquimiaGoldUI"); if (ag) ag.textContent = player.gold;
}
function log(msg) { var lc = document.getElementById("logContent"); if (lc) lc.innerHTML = "<p>" + msg + "</p>" + lc.innerHTML; }


// ============================================
// SEÇÃO 18: CIDADE / LOJA / FERREIRO
// ============================================

function descansar() {
    if (player.gold < 20) { mostrarNotificacao("💰 Precisa de 20 ouro!"); return; }
    if (player.hp >= player.maxHp) { mostrarNotificacao("HP já cheio!"); return; }
    player.gold -= 20; player.hp = player.maxHp;
    mostrarNotificacao("🏨 HP restaurado! -20 ouro"); updateUI();
}

function abrirLoja() { mostrarPainel("lojaPanel"); document.getElementById("lojaGoldUI").textContent = player.gold; trocarAbaLoja('comprar'); }
function fecharLoja() { mostrarPainel("cidadePanel"); }
function trocarAbaLoja(aba) {
    document.getElementById("tabLojaComprar").classList.toggle("active-tab", aba === 'comprar');
    document.getElementById("tabLojaVender").classList.toggle("active-tab", aba !== 'comprar');
    document.getElementById("lojaComprarPanel").style.display = aba === 'comprar' ? "block" : "none";
    document.getElementById("lojaVenderPanel").style.display = aba !== 'comprar' ? "block" : "none";
    if (aba === 'comprar') renderizarLojaComprar(); else renderizarLojaVender();
}

function renderizarLojaComprar() {
    var l = document.getElementById("lojaComprarLista"); l.innerHTML = "";
    var desc = calcularDescontoLoja();
    catalogoLoja.comprar.forEach(function(item, i) {
        var pf = Math.floor(item.preco * (1 - desc));
        var d = document.createElement("div"); d.className = "shop-item";
        d.innerHTML = '<div class="shop-item-info"><span class="shop-item-icon">' + item.icone + '</span><div class="shop-item-details"><span class="shop-item-name">' + item.nome + '</span><span class="shop-item-desc">' + item.descricao + '</span></div></div><div class="shop-item-price"><span class="shop-price-tag">💰 ' + (desc > 0 ? '<s style="color:#666">' + item.preco + '</s> ' + pf : pf) + '</span><button class="shop-buy-btn" ' + (player.gold < pf ? 'disabled' : '') + ' onclick="comprarItemLoja(' + i + ')">Comprar</button></div>';
        l.appendChild(d);
    });
}

function renderizarLojaVender() {
    var l = document.getElementById("lojaVenderLista"); l.innerHTML = "";
    var itens = player.inventario.filter(function(i) { return i.tipo !== "equipamento"; });
    if (itens.length === 0) { var v = document.getElementById("lojaVenderVazio"); if (v) v.style.display = "block"; return; }
    var v2 = document.getElementById("lojaVenderVazio"); if (v2) v2.style.display = "none";
    itens.forEach(function(item) {
        var pv = item.precoVenda || 5; var idx = player.inventario.indexOf(item);
        var d = document.createElement("div"); d.className = "shop-item";
        d.innerHTML = '<div class="shop-item-info"><span class="shop-item-icon">' + item.icone + '</span><div><span class="shop-item-name">' + item.nome + ' x' + item.quantidade + '</span></div></div><div class="shop-item-price"><span class="shop-price-tag">💰 ' + pv + '</span><button class="shop-sell-btn" onclick="venderItemLoja(' + idx + ')">Vender</button></div>';
        l.appendChild(d);
    });
}

function comprarItemLoja(i) {
    var item = catalogoLoja.comprar[i]; var pf = Math.floor(item.preco * (1 - calcularDescontoLoja()));
    if (player.gold < pf) { mostrarNotificacao("Sem ouro!"); return; }
    player.gold -= pf;
    adicionarItemInventario(item.nome, item.icone, 1, { tipo: item.tipo, descricao: item.descricao, efeito: item.efeito, preco: item.preco });
    mostrarNotificacao("🛍️ " + item.nome + "! -" + pf); document.getElementById("lojaGoldUI").textContent = player.gold; renderizarLojaComprar(); updateUI();
}

function venderItemLoja(i) {
    var item = player.inventario[i]; if (!item) return;
    var pv = item.precoVenda || 5; player.gold += pv; item.quantidade--;
    if (item.quantidade <= 0) player.inventario.splice(i, 1);
    mostrarNotificacao("💰 +" + pv + " ouro!"); document.getElementById("lojaGoldUI").textContent = player.gold; renderizarLojaVender(); updateUI();
}

function abrirFerreiro() {
    mostrarPainel("ferreiroPanel");
    document.getElementById("ferreiroGoldUI").textContent = player.gold;
    trocarAbaFerreiro('comprar');
}

function fecharFerreiro() { mostrarPainel("cidadePanel"); }

function trocarAbaFerreiro(aba) {
    document.getElementById("tabFerreiroComprar").classList.toggle("active-tab", aba === 'comprar');
    document.getElementById("tabFerreiroVender").classList.toggle("active-tab", aba !== 'comprar');
    document.getElementById("ferreiroComprarPanel").style.display = aba === 'comprar' ? "block" : "none";
    document.getElementById("ferreiroVenderPanel").style.display = aba !== 'comprar' ? "block" : "none";
    if (aba === 'comprar') renderizarFerreiroComprar();
    else renderizarFerreiroVender();
}

function renderizarFerreiroComprar() {
    var l = document.getElementById("ferreiroComprarLista");
    l.innerHTML = "";

    var equipamentos = getEquipamentosFerreiro();
    var desc = calcularDescontoLoja();

    // Cabeçalho com classe
    var header = document.createElement("div");
    header.style.cssText = "text-align:center;padding:8px;margin-bottom:10px;background:rgba(56,189,248,0.1);border:1px solid rgba(56,189,248,0.2);border-radius:8px;";
    header.innerHTML = '<span style="color:#38bdf8;font-size:0.85em;">⚔️ Equipamentos para <strong style="color:#ffd700;">' + player.class + '</strong></span>';
    l.appendChild(header);

    var slotAtual = "";

    equipamentos.forEach(function(item, i) {
        // Separador visual por tipo de slot
        var slotNome = item.slot === "arma" ? "⚔️ Armas" :
                       item.slot === "armadura" ? "🛡️ Armaduras" :
                       item.slot === "elmo" ? "⛑️ Elmos" :
                       item.slot === "botas" ? "👢 Botas" :
                       item.slot === "anel" ? "💍 Anéis" :
                       item.slot === "amuleto" ? "📿 Amuletos" : "";

        if (slotNome !== slotAtual) {
            slotAtual = slotNome;
            var sep = document.createElement("div");
            sep.style.cssText = "color:#64748b;font-size:0.8em;font-weight:bold;padding:6px 0 3px 0;border-bottom:1px solid #334155;margin-top:8px;";
            sep.textContent = slotNome;
            l.appendChild(sep);
        }

        var pf = Math.floor(item.preco * (1 - desc));
        var st = [];
        if (item.stats.atk > 0) st.push("⚔️+" + item.stats.atk);
        if (item.stats.def > 0) st.push("🛡️+" + item.stats.def);
        if (item.stats.hp > 0) st.push("❤️+" + item.stats.hp);

        // Verificar se já possui
        var jaPossui = player.inventario.find(function(inv) { return inv.nome === item.nome; });
        var equipado = false;
        ['arma','armadura','elmo','botas','anel','amuleto'].forEach(function(s) {
            if (player.equipamentos[s] && player.equipamentos[s].nome === item.nome) equipado = true;
        });

        var statusTag = equipado ? ' <span style="color:#22c55e;font-size:0.7em;">(EQUIPADO)</span>' :
                        jaPossui ? ' <span style="color:#fbbf24;font-size:0.7em;">(no inventário)</span>' : '';

        var d = document.createElement("div");
        d.className = "shop-item";
        d.innerHTML =
            '<div class="shop-item-info">' +
                '<span class="shop-item-icon">' + item.icone + '</span>' +
                '<div class="shop-item-details">' +
                    '<span class="shop-item-name">' + item.nome + statusTag + '</span>' +
                    '<span class="shop-item-desc">' + item.descricao + '</span>' +
                    '<span class="shop-item-stats">' + st.join(" | ") + '</span>' +
                '</div>' +
            '</div>' +
            '<div class="shop-item-price">' +
                '<span class="shop-price-tag">💰 ' + (desc > 0 ? '<s style="color:#666">' + item.preco + '</s> ' + pf : pf) + '</span>' +
                '<button class="shop-buy-btn" ' + (player.gold < pf ? 'disabled' : '') + ' onclick="comprarEquipamentoNovo(' + i + ')">Comprar</button>' +
            '</div>';
        l.appendChild(d);
    });
}

function renderizarFerreiroVender() {
    var l = document.getElementById("ferreiroVenderLista");
    l.innerHTML = "";

    var eqs = player.inventario.filter(function(i) { return i.tipo === "equipamento"; });
    if (eqs.length === 0) {
        var v = document.getElementById("ferreiroVenderVazio");
        if (v) v.style.display = "block";
        return;
    }
    var v2 = document.getElementById("ferreiroVenderVazio");
    if (v2) v2.style.display = "none";

    eqs.forEach(function(item) {
        var pv = item.precoVenda || Math.floor((item.preco || 20) * 0.4);
        var idx = player.inventario.indexOf(item);
        var st = [];
        if (item.stats && item.stats.atk > 0) st.push("⚔️+" + item.stats.atk);
        if (item.stats && item.stats.def > 0) st.push("🛡️+" + item.stats.def);
        if (item.stats && item.stats.hp > 0) st.push("❤️+" + item.stats.hp);

        var d = document.createElement("div");
        d.className = "shop-item";
        d.innerHTML =
            '<div class="shop-item-info">' +
                '<span class="shop-item-icon">' + item.icone + '</span>' +
                '<div class="shop-item-details">' +
                    '<span class="shop-item-name">' + item.nome + '</span>' +
                    '<span class="shop-item-stats">' + st.join(" | ") + '</span>' +
                '</div>' +
            '</div>' +
            '<div class="shop-item-price">' +
                '<span class="shop-price-tag">💰 ' + pv + '</span>' +
                '<button class="shop-sell-btn" onclick="venderEquipamento(' + idx + ')">Vender</button>' +
            '</div>';
        l.appendChild(d);
    });
}

function comprarEquipamentoNovo(i) {
    var equipamentos = getEquipamentosFerreiro();
    var item = equipamentos[i];
    if (!item) return;

    var desc = calcularDescontoLoja();
    var pf = Math.floor(item.preco * (1 - desc));

    if (player.gold < pf) { mostrarNotificacao("💰 Ouro insuficiente!"); return; }

    player.gold -= pf;
    adicionarItemInventario(item.nome, item.icone, 1, {
        tipo: "equipamento",
        slot: item.slot,
        descricao: item.descricao,
        stats: { atk: item.stats.atk, def: item.stats.def, hp: item.stats.hp },
        preco: item.preco,
        precoVenda: Math.floor(item.preco * 0.4)
    });

    mostrarNotificacao("⚒️ " + item.nome + "! -" + pf + " ouro");
    log("⚒️ Comprou " + item.nome + ". -" + pf + " ouro.");
    document.getElementById("ferreiroGoldUI").textContent = player.gold;
    renderizarFerreiroComprar();
    updateUI();
}

function venderEquipamento(i) {
    var item = player.inventario[i];
    if (!item) return;
    var pv = item.precoVenda || Math.floor((item.preco || 20) * 0.4);
    player.gold += pv;
    item.quantidade--;
    if (item.quantidade <= 0) player.inventario.splice(i, 1);
    mostrarNotificacao("💰 +" + pv + " ouro!");
    document.getElementById("ferreiroGoldUI").textContent = player.gold;
    renderizarFerreiroVender();
    updateUI();
}

function comprarEquipamento(i) {
    var item = catalogoFerreiro.comprar[i]; var pf = Math.floor(item.preco * (1 - calcularDescontoLoja()));
    if (player.gold < pf) { mostrarNotificacao("Sem ouro!"); return; }
    player.gold -= pf;
    adicionarItemInventario(item.nome, item.icone, 1, { tipo: "equipamento", slot: item.slot, descricao: item.descricao, stats: item.stats, preco: item.preco, precoVenda: Math.floor(item.preco * 0.4) });
    mostrarNotificacao("⚒️ " + item.nome + "! -" + pf); document.getElementById("ferreiroGoldUI").textContent = player.gold; renderizarFerreiroComprar(); updateUI();
}

function venderEquipamento(i) {
    var item = player.inventario[i]; if (!item) return;
    var pv = item.precoVenda || 10; player.gold += pv; item.quantidade--;
    if (item.quantidade <= 0) player.inventario.splice(i, 1);
    mostrarNotificacao("💰 +" + pv + " ouro!"); document.getElementById("ferreiroGoldUI").textContent = player.gold; renderizarFerreiroVender(); updateUI();
}


// ============================================
// SEÇÃO 19: SALVAR / CARREGAR
// ============================================

function salvarJogo() {

    try {

        const saveData = {
            player: player,
            gameState: gameState,
            talentos: talentos,
            estatisticas: estatisticas,
            historiaProgresso: historiaProgresso,
            conquistas: {
                total: conquistas.totalDesbloqueadas,
                ids: conquistas.lista
                    .filter(function(c){ return c.desbloqueada; })
                    .map(function(c){ return c.id; })
            },
            missoes: {
                completas: sistemaMissoes.missoesCompletas,
                ativa: sistemaMissoes.missaoAtiva
            },
            version: "4.0"
        };

        localStorage.setItem(
            "reinosMonstros_save",
            JSON.stringify(saveData)
        );

        mostrarNotificacao("💾 Salvo!");

    } catch (e) {

        mostrarNotificacao("❌ Erro ao salvar!");

    }
}

function carregarJogoSalvo() {

    var save = localStorage.getItem("reinosMonstros_save");

    if (!save) {
        mostrarNotificacao("Sem save.");
        return;
    }

    try {

        var d = JSON.parse(save);

        if (d.player) {

            player = Object.assign({
                equipamentos: {
                    arma:null,
                    armadura:null,
                    elmo:null,
                    botas:null,
                    anel:null,
                    amuleto:null
                },
                inventario: [],
                baseMaxHp: 0
            }, d.player);

            if (!player.baseMaxHp) player.baseMaxHp = player.maxHp;

            if (d.gameState)
                gameState = d.gameState;

            if (d.talentos)
                talentos = d.talentos;

            if (d.estatisticas)
                estatisticas = Object.assign(estatisticas, d.estatisticas);

            if (d.historiaProgresso)
                historiaProgresso = d.historiaProgresso;

            if (d.missoes) {
                sistemaMissoes.missoesCompletas = d.missoes.completas || 0;
                sistemaMissoes.missaoAtiva = d.missoes.ativa;
            }

            if (d.conquistas && d.conquistas.ids) {

                d.conquistas.ids.forEach(function(id){

                    var c = conquistas.lista.find(function(x){
                        return x.id === id;
                    });

                    if (c) c.desbloqueada = true;

                });

                conquistas.totalDesbloqueadas =
                    d.conquistas.total || 0;
            }

            if (!player.missoesConcluidas)
                player.missoesConcluidas = [];

            document.getElementById("playerImage").src = player.img;

            mudarTela('game');

            aplicarBonusEquipamentos();

            updateUI();

            mostrarNotificacao("💾 Carregado!");

        }

    } catch (e) {

        mostrarNotificacao("❌ Erro ao carregar!");

    }
}

function verificarSaveExistente() {

    var s = localStorage.getItem("reinosMonstros_save");

    var b = document.getElementById("btnLoadGame");

    if (s && b)
        b.style.display = "block";
}

// ============================================
// SEÇÃO 20: SELEÇÃO DE PERSONAGEM
// ============================================

function gerarSelecao() {
    var c = document.getElementById("cardsContainer"); if (!c) return; c.innerHTML = "";
    personagensPredefinidos.forEach(function(p) {
        c.innerHTML += '<div class="card" onclick="selecionarPersonagem(\'' + p.id + '\')"><img src="' + p.img + '" alt="' + p.nome + '" draggable="false"></div>';
    });
}

function selecionarPersonagem(id) {
    var p = personagensPredefinidos.find(function(x) { return x.id === id; });
    if (!p) return;
    var b = racaBonus[p.raça] || {};
    var f = p.forca + (b.forca || 0), d = p.destreza + (b.destreza || 0), v = p.vigor + (b.vigor || 0);
    var i = p.inteligencia + (b.inteligencia || 0), s = p.sabedoria + (b.sabedoria || 0), c = p.carisma + (b.carisma || 0);
    var hp = v * 10;

        player = { name: p.nome, nome: p.nome, class: p.class, raça: p.raça, gender: p.gender, background: p.background, img: p.img,
        forca: f, destreza: d, vigor: v, inteligencia: i, sabedoria: s, carisma: c,
        baseMaxHp: hp, maxHp: hp, hp: hp, atk: Math.floor(f / 2), def: Math.floor(v / 3),
        gold: 0, level: 1, xp: 0, xpParaProximoNivel: calcularXpNecessario(1),
        potions: 3, inventario: [],
        equipamentos: { arma:null, armadura:null, elmo:null, botas:null, anel:null, amuleto:null },
        habilidadeCooldown: 0, defendendo: false,
        modoHardcore: (modoJogo === "hardcore"),
        guilda: { atual: null, rank: 0, xp: 0, xpProximo: 100, missaoAtiva: null, missaoProgresso: 0 }
    };

    // Resetar sistemas
    talentos = { pontosDisponiveis: 0, investidos: { dano: 0, defesa: 0, vida: 0, critico: 0, sorte: 0, maestria: 0 } };
    estatisticas = { monstrosDerrotados: 0, elitesDerrotados: 0, bossesDerrotados: 0, masmorrasCompletas: 0, vezesRevivido: 0, ourolTotal: 0, criticos: 0, esquivas: 0 };
    sistemaMissoes = { missaoAtiva: null, missoesCompletas: 0, historico: [] };
    conquistas.lista.forEach(function(c2) { c2.desbloqueada = false; }); conquistas.totalDesbloqueadas = 0;

    document.getElementById("playerImage").src = player.img;
    mudarTela('game'); updateUI();
    log(player.nome + ", " + player.class + " " + player.raça + ", inicia sua aventura!");
    mostrarNotificacao("Bem-vindo, " + player.nome + "!");
}


// ============================================
// SEÇÃO 21: AUTO-SAVE + INIT
// ============================================

setInterval(function() {
    if (player.level > 0 && player.nome) {
        try { localStorage.setItem("reinosMonstros_save", JSON.stringify({ player: player, gameState: { areaAtual: gameState.areaAtual }, talentos: talentos, estatisticas: estatisticas, conquistas: { total: conquistas.totalDesbloqueadas, ids: conquistas.lista.filter(function(c) { return c.desbloqueada; }).map(function(c) { return c.id; }) }, missoes: { completas: sistemaMissoes.missoesCompletas, ativa: sistemaMissoes.missaoAtiva }, version: "4.0" })); } catch (e) {}
    }
}, 60000);

// ============================================
// NOVOS SISTEMAS — DADOS GLOBAIS
// ============================================

// ── TREINAMENTO ──
var treinamento = {
    investido: { forca: 0, destreza: 0, vigor: 0, inteligencia: 0, sabedoria: 0, carisma: 0 },
    maxPorAtributo: 5,
    custos: [50, 150, 350, 700, 1500] // custo da 1ª até 5ª compra
};

// ── ACAMPAMENTO ──
var acampamento = {
    fogueira: 0,   // +2% XP por nível (max 5)
    tenda: 0,      // +5% HP max por nível (max 5)
    arsenal: 0,    // +2% ATK por nível (max 5)
    muralha: 0,    // +2% DEF por nível (max 5)
    altar: 0       // +3% ouro por nível (max 5)
};

var acampamentoDados = {
    fogueira: { nome: "🔥 Fogueira", desc: "+2% XP por nível", max: 5, custoBase: 80, custoMult: 2.2 },
    tenda:    { nome: "⛺ Tenda", desc: "+5% HP máx por nível", max: 5, custoBase: 100, custoMult: 2.0 },
    arsenal:  { nome: "⚔️ Arsenal", desc: "+2% ATK por nível", max: 5, custoBase: 120, custoMult: 2.3 },
    muralha:  { nome: "🧱 Muralha", desc: "+2% DEF por nível", max: 5, custoBase: 120, custoMult: 2.3 },
    altar:    { nome: "⛪ Altar", desc: "+3% ouro por nível", max: 5, custoBase: 90, custoMult: 2.1 }
};

// ── CEMITÉRIO ──
var cemiterio = {
    equipamentoPerdido: null, // item perdido ao morrer
    custoResgate: 0
};

// ── REFORJA ──
var fragmentos = 0;

var equipamentosLendarios = [
    { nome: "Excalibur", icone: "🗡️✨", slot: "arma", descricao: "A lâmina lendária dos reis", stats: { atk: 55, def: 12, hp: 30 }, custoFragmentos: 50, custoOuro: 5000 },
    { nome: "Égide Primordial", icone: "🛡️✨", slot: "armadura", descricao: "Armadura dos deuses antigos", stats: { atk: 8, def: 50, hp: 100 }, custoFragmentos: 55, custoOuro: 5500 },
    { nome: "Coroa do Destino", icone: "👑✨", slot: "elmo", descricao: "Quem a usa controla o destino", stats: { atk: 15, def: 25, hp: 50 }, custoFragmentos: 40, custoOuro: 4000 },
    { nome: "Botas de Hermes", icone: "👢✨", slot: "botas", descricao: "Velocidade divina", stats: { atk: 12, def: 18, hp: 35 }, custoFragmentos: 35, custoOuro: 3500 },
    { nome: "Anel do Infinito", icone: "💍✨", slot: "anel", descricao: "Poder sem limites", stats: { atk: 18, def: 15, hp: 45 }, custoFragmentos: 40, custoOuro: 4500 },
    { nome: "Amuleto da Eternidade", icone: "📿✨", slot: "amuleto", descricao: "Imortalidade parcial", stats: { atk: 15, def: 18, hp: 60 }, custoFragmentos: 40, custoOuro: 4000 }
];

// ── ENCANTAMENTOS ──
var gemasInventario = { fogo: 0, gelo: 0, vida: 0, fortuna: 0 };

var tiposGema = {
    fogo:    { nome: "🔥 Gema de Fogo", desc: "+8% dano por nível", max: 3, custoOuro: 200, custoMult: 2.5 },
    gelo:    { nome: "❄️ Gema de Gelo", desc: "+5% redução dano por nível", max: 3, custoOuro: 200, custoMult: 2.5 },
    vida:    { nome: "💚 Gema de Vida", desc: "+8% HP máx por nível", max: 3, custoOuro: 200, custoMult: 2.5 },
    fortuna: { nome: "🍀 Gema da Fortuna", desc: "+6% ouro e drops por nível", max: 3, custoOuro: 200, custoMult: 2.5 }
};

var encantamentosEquip = { fogo: 0, gelo: 0, vida: 0, fortuna: 0 };

// ── UPGRADE DE EQUIPAMENTO ──
// Armazenado no próprio equipamento: player.equipamentos[slot].upgrade = 0-10

var upgradeCustos = [30, 60, 100, 180, 300, 500, 800, 1300, 2100, 3500];
var upgradeChance = [1.0, 1.0, 1.0, 1.0, 1.0, 0.75, 0.65, 0.50, 0.40, 0.30];
var upgradeDestroi = [false,false,false,false,false,false,false,true,true,true];

// ── ARENA ──
var arena = {
    recordeOndas: 0,
    emArena: false,
    ondaAtual: 0,
    monstroAtual: null
};

// ============================================
// SISTEMA DE TREINAMENTO
// ============================================

function abrirTreinamento() {
    mostrarPainel("treinamentoPanel");
    renderizarTreinamento();
}

function fecharTreinamento() { mostrarPainel("cidadePanel"); }

function getCustoTreinamento(atributo) {
    var nivel = treinamento.investido[atributo] || 0;
    if (nivel >= treinamento.maxPorAtributo) return -1;
    return treinamento.custos[nivel];
}

function treinar(atributo) {
    var nivel = treinamento.investido[atributo] || 0;
    if (nivel >= treinamento.maxPorAtributo) {
        mostrarNotificacao("⚠️ Máximo atingido para este atributo!");
        return;
    }
    var custo = treinamento.custos[nivel];
    if (player.gold < custo) {
        mostrarNotificacao("💰 Ouro insuficiente! Precisa de " + custo);
        return;
    }

    player.gold -= custo;
    treinamento.investido[atributo]++;
    player[atributo]++;

    if (atributo === "vigor") {
        player.baseMaxHp += 5;
    }

   aplicarBonusEquipamentos();

    mostrarNotificacao("🎓 +" + 1 + " " + atributo + "! (" + treinamento.investido[atributo] + "/" + treinamento.maxPorAtributo + ")");
    log("🎓 Treinou " + atributo + ". -" + custo + " ouro.");
    renderizarTreinamento();
    updateUI();
}

function renderizarTreinamento() {
    var el = document.getElementById("treinamentoContent");
    if (!el) return;

    var attrs = [
        { key: "forca", nome: "⚔️ Força", atual: player.forca },
        { key: "destreza", nome: "🏹 Destreza", atual: player.destreza },
        { key: "vigor", nome: "❤️ Vigor", atual: player.vigor },
        { key: "inteligencia", nome: "🔮 Inteligência", atual: player.inteligencia },
        { key: "sabedoria", nome: "📖 Sabedoria", atual: player.sabedoria },
        { key: "carisma", nome: "🗣️ Carisma", atual: player.carisma }
    ];

    var html = '<p class="gold-display">💰 Ouro: ' + player.gold + '</p>';

    attrs.forEach(function(a) {
        var nv = treinamento.investido[a.key] || 0;
        var max = treinamento.maxPorAtributo;
        var custo = nv < max ? treinamento.custos[nv] : -1;
        var esgotado = custo === -1;

        html += '<div style="display:flex;justify-content:space-between;align-items:center;padding:8px;margin-bottom:4px;background:rgba(30,41,59,0.6);border-radius:6px;border:1px solid #334155;">' +
            '<div><span style="color:#e2e8f0;font-weight:bold;font-size:0.9em;">' + a.nome + ' (' + a.atual + ')</span>' +
            '<br><small style="color:#64748b;">Treino: ' + nv + '/' + max + '</small></div>' +
            '<div style="text-align:right;">' +
            (esgotado ? '<span style="color:#22c55e;font-size:0.8em;">MÁXIMO</span>' :
            '<span style="color:#fbbf24;font-size:0.8em;">💰 ' + custo + '</span>' +
            '<br><button onclick="treinar(\'' + a.key + '\')" ' + (player.gold < custo ? 'disabled' : '') + ' style="padding:4px 12px;font-size:0.8em;margin-top:3px;">Treinar</button>') +
            '</div></div>';
    });

    el.innerHTML = html;
}

// ============================================
// SISTEMA DE ACAMPAMENTO
// ============================================

function abrirAcampamento() {
    mostrarPainel("acampamentoPanel");
    renderizarAcampamento();
}

function fecharAcampamento() { mostrarPainel("cidadePanel"); }

function getCustoAcampamento(tipo) {
    var nv = acampamento[tipo] || 0;
    var dados = acampamentoDados[tipo];
    if (nv >= dados.max) return -1;
    return Math.floor(dados.custoBase * Math.pow(dados.custoMult, nv));
}

function getBonusCamp(tipo) {
    var nv = acampamento[tipo] || 0;
    switch (tipo) {
        case "fogueira": return 1.0 + nv * 0.02;
        case "tenda": return 1.0 + nv * 0.05;
        case "arsenal": return 1.0 + nv * 0.02;
        case "muralha": return 1.0 + nv * 0.02;
        case "altar": return 1.0 + nv * 0.03;
        default: return 1.0;
    }
}

// ============================================
// SISTEMA DE CEMITÉRIO (Perda ao morrer)
// ============================================

function perderEquipamentoAoMorrer() {
    var slotsEquipados = [];
    ['arma','armadura','elmo','botas','anel','amuleto'].forEach(function(s) {
        if (player.equipamentos[s]) slotsEquipados.push(s);
    });

    if (slotsEquipados.length === 0) {
        cemiterio.equipamentoPerdido = null;
        return;
    }

    // Perde 1 aleatório
    var slotPerdido = randomChoice(slotsEquipados);
    var equip = player.equipamentos[slotPerdido];

    cemiterio.equipamentoPerdido = {
        nome: equip.nome, icone: equip.icone, slot: equip.slot,
        stats: { atk: equip.stats.atk, def: equip.stats.def, hp: equip.stats.hp },
        preco: equip.preco || 100, precoVenda: equip.precoVenda || 40,
        upgrade: equip.upgrade || 0
    };
    cemiterio.custoResgate = Math.floor((equip.preco || 100) * 0.5);

    // Remover do jogador
    player.equipamentos[slotPerdido] = null;
    aplicarBonusEquipamentos();

    return equip.nome;
}

function resgatarEquipamento() {
    if (!cemiterio.equipamentoPerdido) {
        mostrarNotificacao("Nada para resgatar.");
        return;
    }
    if (player.gold < cemiterio.custoResgate) {
        mostrarNotificacao("💰 Precisa de " + cemiterio.custoResgate + " ouro!");
        return;
    }

    player.gold -= cemiterio.custoResgate;
    var item = cemiterio.equipamentoPerdido;

    adicionarItemInventario(item.nome, item.icone, 1, {
        tipo: "equipamento", slot: item.slot, stats: item.stats,
        preco: item.preco, precoVenda: item.precoVenda
    });

    mostrarNotificacao("⚰️ " + item.nome + " resgatado! -" + cemiterio.custoResgate + " ouro");
    log("⚰️ Resgatou " + item.nome + " do cemitério. -" + cemiterio.custoResgate + " ouro.");
    cemiterio.equipamentoPerdido = null;
    cemiterio.custoResgate = 0;
    renderizarCemiterio();
    updateUI();
}

function renderizarCemiterio() {
    var el = document.getElementById("cemiterioContent");
    if (!el) return;

    if (!cemiterio.equipamentoPerdido) {
        el.innerHTML = '<p style="color:#64748b;text-align:center;padding:20px;font-style:italic;">⚰️ O cemitério está vazio.<br>Seus equipamentos estão seguros... por enquanto.</p>';
        return;
    }

    var item = cemiterio.equipamentoPerdido;
    var st = [];
    if (item.stats.atk > 0) st.push("⚔️+" + item.stats.atk);
    if (item.stats.def > 0) st.push("🛡️+" + item.stats.def);
    if (item.stats.hp > 0) st.push("❤️+" + item.stats.hp);

    el.innerHTML = '<p class="gold-display">💰 Ouro: ' + player.gold + '</p>' +
        '<div style="text-align:center;padding:15px;background:rgba(127,29,29,0.2);border:1px solid #7f1d1d;border-radius:10px;">' +
            '<p style="color:#ef4444;font-size:1.1em;font-weight:bold;">⚰️ Equipamento Perdido!</p>' +
            '<p style="font-size:1.5em;margin:8px 0;">' + item.icone + '</p>' +
            '<p style="color:#fca5a5;font-weight:bold;">' + item.nome + (item.upgrade > 0 ? ' +' + item.upgrade : '') + '</p>' +
            '<p style="color:#94a3b8;font-size:0.85em;">' + st.join(" | ") + '</p>' +
            '<p style="color:#fbbf24;margin-top:10px;">Custo de resgate: 💰 ' + cemiterio.custoResgate + '</p>' +
            '<button onclick="resgatarEquipamento()" ' + (player.gold < cemiterio.custoResgate ? 'disabled' : '') +
            ' style="margin-top:8px;padding:8px 20px;background:linear-gradient(180deg,#065f46,#064e3b);border:1px solid #047857;color:#6ee7b7;">Resgatar</button>' +
            '<p style="color:#ef4444;font-size:0.75em;margin-top:8px;">⚠️ Se morrer novamente, este item será perdido para sempre!</p>' +
        '</div>';
}

// ============================================
// SISTEMA DE ARENA
// ============================================

var arenaEntradas = [
    { nome: "🥉 Bronze", custo: 50, multiplicadorMonstro: 1.0, multiplicadorRecompensa: 1.0 },
    { nome: "🥈 Prata", custo: 150, multiplicadorMonstro: 1.5, multiplicadorRecompensa: 1.8 },
    { nome: "🥇 Ouro", custo: 400, multiplicadorMonstro: 2.0, multiplicadorRecompensa: 3.0 },
    { nome: "💎 Diamante", custo: 1000, multiplicadorMonstro: 3.0, multiplicadorRecompensa: 5.0 }
];

var arenaDificuldade = null;

function abrirArena() {
    mostrarPainel("arenaPanel");
    renderizarArena();
}

function fecharArena() {
    if (arena.emArena) {
        mostrarNotificacao("⚠️ Abandone a arena primeiro!");
        return;
    }
    mostrarPainel("cidadePanel");
}

function renderizarArena() {
    var el = document.getElementById("arenaContent");
    if (!el) return;

    if (arena.emArena) {
        renderizarArenaEmAndamento();
        return;
    }

    var html = '<p class="gold-display">💰 Ouro: ' + player.gold + '</p>';
    html += '<p style="text-align:center;color:#fbbf24;font-size:0.9em;margin-bottom:10px;">🏆 Recorde: Onda ' + arena.recordeOndas + '</p>';
    html += '<p style="text-align:center;color:#94a3b8;font-size:0.8em;margin-bottom:15px;">Sobreviva ondas de monstros!<br>Sem cura entre ondas. Quanto mais longe, melhor a recompensa!</p>';

    arenaEntradas.forEach(function(entrada, i) {
        var podePagar = player.gold >= entrada.custo;
        html += '<div style="display:flex;justify-content:space-between;align-items:center;padding:10px;margin-bottom:6px;background:rgba(30,41,59,0.6);border-radius:8px;border:1px solid #334155;">' +
            '<div><strong style="color:#e2e8f0;">' + entrada.nome + '</strong>' +
            '<br><small style="color:#64748b;">Monstros ×' + entrada.multiplicadorMonstro + ' | Recompensa ×' + entrada.multiplicadorRecompensa + '</small></div>' +
            '<div><span style="color:#fbbf24;">💰 ' + entrada.custo + '</span>' +
            '<br><button onclick="entrarArena(' + i + ')" ' + (!podePagar ? 'disabled' : '') + ' style="padding:5px 15px;font-size:0.85em;margin-top:3px;">Entrar</button></div></div>';
    });

    el.innerHTML = html;
}

function entrarArena(idx) {
    var entrada = arenaEntradas[idx];
    if (player.gold < entrada.custo) { mostrarNotificacao("💰 Insuficiente!"); return; }
    if (player.hp <= 0) { mostrarNotificacao("❤️ Precisa de HP!"); return; }

    player.gold -= entrada.custo;
    arena.emArena = true;
    arena.ondaAtual = 0;
    arenaDificuldade = entrada;

    log("🏟️ Entrou na Arena " + entrada.nome + "! -" + entrada.custo + " ouro.");
    mostrarNotificacao("🏟️ Arena " + entrada.nome + " — Prepare-se!");

    proximaOndaArena();
}

function proximaOndaArena() {
    arena.ondaAtual++;

    // Monstro aleatório de qualquer área desbloqueada
    var areasDisponiveis = [];
    ['floresta','ruinas','caverna','cidade'].forEach(function(k) {
 
    });
    var areaRandom = randomChoice(areasDisponiveis);
    var monstroBase = randomChoice(bancoDeMonstros[areaRandom]);

    // Escalar pelo nível da onda
    var escalaOnda = 1.0 + arena.ondaAtual * 0.15;
    var mult = arenaDificuldade.multiplicadorMonstro;

    var monstroArena = {
        name: monstroBase.name,
        nomeBase: monstroBase.name,
        emoji: monstroBase.emoji,
        img: monstroBase.img,
        hp: Math.floor(monstroBase.hp * escalaOnda * mult),
        atk: Math.floor(monstroBase.atk * escalaOnda * mult),
        def: Math.floor((monstroBase.def || 0) * escalaOnda * mult * 0.8),
        gold: [0, 0], // Arena não dá ouro por monstro
        xp: Math.floor((monstroBase.xp || 10) * 0.5),
        drops: [] // Sem drops individuais
    };

    gameState.combateOrigem = "arena";
    gameState.areaAtual = gameState.areaAtual || areaRandom;
    iniciarCombate(monstroArena, false);

    addCombatLog("🏟️ ARENA — Onda " + arena.ondaAtual, "critical");
}

function finalizarArena(motivo) {
    var ondas = arena.ondaAtual;
    arena.emArena = false;

    if (ondas > arena.recordeOndas) {
        arena.recordeOndas = ondas;
        mostrarNotificacao("🏆 NOVO RECORDE: Onda " + ondas + "!", 4000);
    }

    // Recompensa baseada em ondas sobrevividas
    var multRec = arenaDificuldade ? arenaDificuldade.multiplicadorRecompensa : 1;
    var ouroRecompensa = Math.floor(ondas * 20 * multRec);
    var xpRecompensa = Math.floor(ondas * 15 * multRec);
    player.gold += ouroRecompensa;
    ganharExp(xpRecompensa);

    // Chance de gema a cada 5 ondas
    var gemasGanhas = Math.floor(ondas / 5);
    var gemasTexto = "";
    for (var g = 0; g < gemasGanhas; g++) {
        var tipoGema = randomChoice(["fogo", "gelo", "vida", "fortuna"]);
        gemasInventario[tipoGema]++;
        gemasTexto += "<br>" + tiposGema[tipoGema].nome.split(" ")[0] + " " + tiposGema[tipoGema].nome.split(" ").slice(1).join(" ");
    }

    arenaDificuldade = null;

    mostrarResultado(
        "🏟️ ARENA — " + motivo,
        motivo === "DERROTA" ? "💀" : "🏆",
        "Sobreviveu " + ondas + " ondas!" + (ondas >= arena.recordeOndas ? " (RECORDE!)" : ""),
        "💰 +" + ouroRecompensa + " ouro<br>📊 +" + xpRecompensa + " XP" + gemasTexto,
        "menu"
    );

    log("🏟️ Arena encerrada: " + ondas + " ondas. +" + ouroRecompensa + " ouro, +" + xpRecompensa + " XP.");
}

function renderizarArenaEmAndamento() {
    var el = document.getElementById("arenaContent");
    if (!el) return;
    el.innerHTML = '<div style="text-align:center;padding:20px;">' +
        '<p style="color:#fbbf24;font-size:1.2em;font-weight:bold;">🏟️ Arena em andamento!</p>' +
        '<p style="color:#e2e8f0;">Onda atual: ' + arena.ondaAtual + '</p>' +
        '<p style="color:#94a3b8;font-size:0.85em;">Derrote o monstro para avançar.</p>' +
        '<button onclick="abandonarArena()" style="margin-top:10px;padding:8px 20px;background:rgba(127,29,29,0.5);border:1px solid #7f1d1d;color:#fca5a5;">🏃 Abandonar Arena</button></div>';
}

function abandonarArena() {
    finalizarArena("ABANDONOU");
    voltarMenuPrincipal();
}


// ── OVERRIDE: vitoriaCombate (arena + gemas de elite/boss) ──
var _vitoriaOld = vitoriaCombate;
vitoriaCombate = function() {
    gameState.emCombate = false;
    addCombatLog("🎉 " + monster.name + " derrotado!", "critical");

    estatisticas.monstrosDerrotados++;
    if (monster.isElite) estatisticas.elitesDerrotados++;
    if (monster.isBoss) estatisticas.bossesDerrotados++;

  
    // Se estiver na arena
    if (gameState.combateOrigem === "arena") {
        setTimeout(function() {
            mostrarNotificacao("🏟️ Onda " + arena.ondaAtual + " completa!");
            // Próxima onda
            setTimeout(proximaOndaArena, 1000);
        }, 500);
        return;
    }

    // Fluxo normal
    var gMin = monster.gold[0], gMax = monster.gold[1];
    var ouro = Math.floor(randomInt(gMin, gMax) * calcularBonusOuro());
    var xp = monster.xp;

    var dropsTexto = "";
    if (monster.drops) {
        var bonusDrop = calcularBonusDrop();
        monster.drops.forEach(function(d) {
            if (Math.random() < Math.min(0.95, d.chance + bonusDrop)) {
                var extras = { precoVenda: d.precoVenda || 5 };
                if (d.consumivel && d.efeito) {
                    extras.tipo = "consumivel"; extras.efeito = d.efeito;
                    extras.descricao = d.efeito.tipo === "cura" ? "Restaura " + d.efeito.valor + " HP" : "+" + d.efeito.valor;
                }
                adicionarItemInventario(d.item, d.icone, 1, extras);
                dropsTexto += "<br>" + d.icone + " " + d.item;
            }
        });
    }

    player.gold += ouro;
    estatisticas.ourolTotal += ouro;
    verificarProgressoMissao("monstro_derrotado", { nome: monster.nomeBase || monster.name });
    verificarConquistas();
    ganharExp(xp);

    var retorno = "areaOptions";
    if (gameState.combateOrigem === "masmorra") retorno = "dungeon";
    else if (gameState.combateOrigem === "masmorraBoss") retorno = "dungeonComplete";

    setTimeout(function() {
        mostrarResultado(
            monster.isBoss ? "👑 CHEFE!" : (monster.isElite ? "🔥 ELITE!" : "⚔️ VITÓRIA!"),
            "🏆", "Derrotou " + monster.name + "!",
            "📊 +" + xp + " XP<br>💰 +" + ouro + " ouro" + dropsTexto, retorno
        );
    }, 500);
};

showSubMenu = function(tipo) {
    document.getElementById("subMenu").innerHTML = "";

    if (tipo === 'explorar') {
        atualizarLockAreas();
        mostrarPainel("areaSelectionPanel");
    } else if (tipo === 'cidade') {
        mostrarPainel("cidadePanel");
    } else if (tipo === 'inventario') {
        renderizarInventario();
        mostrarPainel("inventoryPanel");
    } else if (tipo === 'talentos') {
        renderizarTalentos();
        renderizarConquistas();
        renderizarEstatisticas();
        var ce = document.getElementById("conquistasCount");
        var te = document.getElementById("conquistasTotal");
        if (ce) ce.textContent = conquistas.totalDesbloqueadas;
        if (te) te.textContent = conquistas.lista.length;
        mostrarPainel("talentosPanel");
    }
};

// Garantir que fechar funções usam mostrarPainel
fecharTreinamento = function() { mostrarPainel("cidadePanel"); };
fecharAcampamento = function() { mostrarPainel("cidadePanel"); };
fecharUpgrade = function() { mostrarPainel("cidadePanel"); };
fecharEncantador = function() { mostrarPainel("cidadePanel"); };
fecharReforja = function() { mostrarPainel("cidadePanel"); };
fecharLoja = function() { mostrarPainel("cidadePanel"); };
fecharFerreiro = function() { mostrarPainel("cidadePanel"); };

fecharArena = function() {
    if (arena.emArena) {
        mostrarNotificacao("⚠️ Abandone a arena primeiro!");
        return;
    }
    mostrarPainel("cidadePanel");
};

// ============================================
// SISTEMA DE ÁUDIO COMPLETO
// ============================================

var sistemaAudio = {
    habilitado: true,
    volume: 0.5,        // 0.0 a 1.0
    volumeMusica: 0.3,
    musicaAtual: null,
    ctx: null,           // AudioContext
    sons: {},            // Cache de sons carregados
    musicaTocando: false
};

// ── Inicializar AudioContext (precisa de interação do usuário) ──
function inicializarAudio() {
    if (sistemaAudio.ctx) return;
    try {
        sistemaAudio.ctx = new (window.AudioContext || window.webkitAudioContext)();
        console.log("🔊 Sistema de áudio inicializado.");
    } catch (e) {
        console.warn("⚠️ Web Audio API não suportada.");
        sistemaAudio.habilitado = false;
    }
}

// ── Garantir que o AudioContext está ativo ──
function garantirAudio() {
    if (!sistemaAudio.habilitado) return false;
    if (!sistemaAudio.ctx) inicializarAudio();
    if (sistemaAudio.ctx && sistemaAudio.ctx.state === 'suspended') {
        sistemaAudio.ctx.resume();
    }
    return !!sistemaAudio.ctx;
}

// ── Toggle Mudo ──
function toggleMudo() {
    sistemaAudio.habilitado = !sistemaAudio.habilitado;
    var btn = document.getElementById("btnMudo");
    if (btn) btn.textContent = sistemaAudio.habilitado ? "🔊" : "🔇";

    if (!sistemaAudio.habilitado && sistemaAudio.musicaAtual) {
        sistemaAudio.musicaAtual.pause();
    }
    mostrarNotificacao(sistemaAudio.habilitado ? "🔊 Som ativado" : "🔇 Som desativado");
}

// ── Ajustar Volume ──
function ajustarVolume(valor) {
    sistemaAudio.volume = Math.max(0, Math.min(1, valor));
    var slider = document.getElementById("volumeSlider");
    if (slider) slider.value = sistemaAudio.volume;
}


// ============================================
// SONS GERADOS (Web Audio API — sem arquivos)
// ============================================

function tocarTom(frequencia, duracao, tipo, volumeLocal) {
    if (!garantirAudio()) return;
    var vol = (volumeLocal || 1.0) * sistemaAudio.volume;
    if (vol <= 0) return;

    var ctx = sistemaAudio.ctx;
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();

    osc.type = tipo || "square";
    osc.frequency.value = frequencia;
    gain.gain.setValueAtTime(vol * 0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duracao);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duracao);
}

function tocarRuido(duracao, volumeLocal) {
    if (!garantirAudio()) return;
    var vol = (volumeLocal || 1.0) * sistemaAudio.volume;
    if (vol <= 0) return;

    var ctx = sistemaAudio.ctx;
    var bufferSize = ctx.sampleRate * duracao;
    var buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    var data = buffer.getChannelData(0);

    for (var i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.5;
    }

    var source = ctx.createBufferSource();
    var gain = ctx.createGain();
    source.buffer = buffer;
    gain.gain.setValueAtTime(vol * 0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duracao);
    source.connect(gain);
    gain.connect(ctx.destination);
    source.start();
}

// ── BIBLIOTECA DE EFEITOS SONOROS GERADOS ──

var sfx = {
    // Ataque do jogador
    atacar: function() {
        tocarTom(200, 0.08, "square");
        setTimeout(function() { tocarTom(350, 0.06, "sawtooth"); }, 30);
        setTimeout(function() { tocarRuido(0.05); }, 50);
    },

    // Crítico
    critico: function() {
        tocarTom(300, 0.05, "square");
        setTimeout(function() { tocarTom(500, 0.05, "square"); }, 40);
        setTimeout(function() { tocarTom(700, 0.08, "square"); }, 80);
        setTimeout(function() { tocarRuido(0.08); }, 60);
    },

    // Dano recebido
    danoRecebido: function() {
        tocarTom(150, 0.1, "sawtooth");
        setTimeout(function() { tocarTom(100, 0.15, "sawtooth"); }, 50);
    },

    // Defesa
    defender: function() {
        tocarTom(400, 0.05, "triangle");
        setTimeout(function() { tocarTom(600, 0.08, "triangle"); }, 30);
    },

    // Esquiva
    esquiva: function() {
        tocarTom(800, 0.04, "sine");
        setTimeout(function() { tocarTom(1000, 0.04, "sine"); }, 40);
        setTimeout(function() { tocarTom(1200, 0.03, "sine"); }, 80);
    },

    // Habilidade especial
    habilidade: function() {
        tocarTom(300, 0.06, "sine");
        setTimeout(function() { tocarTom(450, 0.06, "sine"); }, 60);
        setTimeout(function() { tocarTom(600, 0.08, "sine"); }, 120);
        setTimeout(function() { tocarTom(800, 0.1, "sine"); }, 180);
        setTimeout(function() { tocarTom(1000, 0.15, "triangle"); }, 240);
    },

    // Poção / Cura
    cura: function() {
        tocarTom(500, 0.08, "sine");
        setTimeout(function() { tocarTom(650, 0.08, "sine"); }, 80);
        setTimeout(function() { tocarTom(800, 0.12, "sine"); }, 160);
    },

    // Vitória
    vitoria: function() {
        tocarTom(523, 0.12, "square");
        setTimeout(function() { tocarTom(659, 0.12, "square"); }, 120);
        setTimeout(function() { tocarTom(784, 0.12, "square"); }, 240);
        setTimeout(function() { tocarTom(1047, 0.25, "square"); }, 360);
    },

    // Derrota
    derrota: function() {
        tocarTom(400, 0.2, "sawtooth");
        setTimeout(function() { tocarTom(300, 0.2, "sawtooth"); }, 200);
        setTimeout(function() { tocarTom(200, 0.3, "sawtooth"); }, 400);
        setTimeout(function() { tocarTom(100, 0.5, "sawtooth"); }, 600);
    },

    // Level Up
    levelUp: function() {
        tocarTom(400, 0.1, "square");
        setTimeout(function() { tocarTom(500, 0.1, "square"); }, 80);
        setTimeout(function() { tocarTom(600, 0.1, "square"); }, 160);
        setTimeout(function() { tocarTom(800, 0.1, "square"); }, 240);
        setTimeout(function() { tocarTom(1000, 0.15, "square"); }, 320);
        setTimeout(function() { tocarTom(1200, 0.2, "triangle"); }, 400);
    },

    // Conquista
    conquista: function() {
        tocarTom(600, 0.08, "triangle");
        setTimeout(function() { tocarTom(800, 0.08, "triangle"); }, 100);
        setTimeout(function() { tocarTom(1000, 0.08, "triangle"); }, 200);
        setTimeout(function() { tocarTom(1200, 0.15, "sine"); }, 300);
        setTimeout(function() { tocarTom(1400, 0.2, "sine"); }, 400);
    },

    // Comprar item
    comprar: function() {
        tocarTom(800, 0.05, "square");
        setTimeout(function() { tocarTom(1000, 0.06, "square"); }, 50);
    },

    // Vender item
    vender: function() {
        tocarTom(600, 0.04, "triangle");
        setTimeout(function() { tocarTom(400, 0.06, "triangle"); }, 60);
    },

    // Equipar
    equipar: function() {
        tocarTom(300, 0.04, "square");
        setTimeout(function() { tocarTom(500, 0.06, "square"); }, 50);
        setTimeout(function() { tocarTom(700, 0.08, "triangle"); }, 100);
    },

    // Click de botão / menu
    click: function() {
        tocarTom(800, 0.03, "square", 0.5);
    },

    // Erro / falha
    erro: function() {
        tocarTom(200, 0.1, "sawtooth", 0.6);
        setTimeout(function() { tocarTom(150, 0.15, "sawtooth", 0.5); }, 80);
    },

    // Tesouro encontrado
    tesouro: function() {
        tocarTom(600, 0.06, "triangle");
        setTimeout(function() { tocarTom(750, 0.06, "triangle"); }, 70);
        setTimeout(function() { tocarTom(900, 0.08, "triangle"); }, 140);
        setTimeout(function() { tocarTom(1100, 0.12, "sine"); }, 210);
    },

    // Armadilha
    armadilha: function() {
        tocarRuido(0.15);
        setTimeout(function() { tocarTom(100, 0.2, "sawtooth"); }, 50);
    },

    // Fuga
    fuga: function() {
        tocarTom(600, 0.05, "square");
        setTimeout(function() { tocarTom(500, 0.05, "square"); }, 50);
        setTimeout(function() { tocarTom(400, 0.05, "square"); }, 100);
        setTimeout(function() { tocarTom(300, 0.08, "square"); }, 150);
    },

    // Iniciar combate
    combateInicio: function() {
        tocarRuido(0.08);
        setTimeout(function() { tocarTom(200, 0.1, "sawtooth"); }, 50);
        setTimeout(function() { tocarTom(300, 0.1, "sawtooth"); }, 150);
        setTimeout(function() { tocarTom(400, 0.15, "square"); }, 250);
    },

    // Elite apareceu
    eliteApareceu: function() {
        tocarTom(200, 0.15, "sawtooth");
        setTimeout(function() { tocarTom(250, 0.15, "sawtooth"); }, 150);
        setTimeout(function() { tocarTom(300, 0.15, "sawtooth"); }, 300);
        setTimeout(function() { tocarRuido(0.1); }, 400);
    },

    // Boss apareceu
    bossApareceu: function() {
        tocarTom(100, 0.3, "sawtooth");
        setTimeout(function() { tocarTom(80, 0.3, "sawtooth"); }, 250);
        setTimeout(function() { tocarTom(60, 0.4, "sawtooth"); }, 500);
        setTimeout(function() { tocarRuido(0.2); }, 700);
    },

    // Upgrade sucesso
    upgradeSucesso: function() {
        tocarTom(400, 0.06, "triangle");
        setTimeout(function() { tocarTom(600, 0.06, "triangle"); }, 60);
        setTimeout(function() { tocarTom(800, 0.08, "triangle"); }, 120);
        setTimeout(function() { tocarTom(1200, 0.15, "sine"); }, 200);
    },

    // Upgrade falha
    upgradeFalha: function() {
        tocarTom(400, 0.1, "sawtooth");
        setTimeout(function() { tocarTom(200, 0.15, "sawtooth"); }, 100);
        setTimeout(function() { tocarRuido(0.1); }, 150);
    },

    // Equipamento destruído
    equipDestruido: function() {
        tocarRuido(0.2);
        setTimeout(function() { tocarTom(200, 0.2, "sawtooth"); }, 100);
        setTimeout(function() { tocarTom(100, 0.3, "sawtooth"); }, 250);
        setTimeout(function() { tocarRuido(0.15); }, 400);
    },

    // Missão completa
    missaoCompleta: function() {
        tocarTom(523, 0.08, "square");
        setTimeout(function() { tocarTom(659, 0.08, "square"); }, 100);
        setTimeout(function() { tocarTom(784, 0.08, "square"); }, 200);
        setTimeout(function() { tocarTom(1047, 0.2, "triangle"); }, 300);
    },

    // Descansar
    descansar: function() {
        tocarTom(400, 0.15, "sine", 0.4);
        setTimeout(function() { tocarTom(350, 0.15, "sine", 0.3); }, 150);
        setTimeout(function() { tocarTom(300, 0.2, "sine", 0.2); }, 300);
    },

    // Masmorra entrar
    masmorraEntrar: function() {
        tocarTom(200, 0.2, "sawtooth", 0.5);
        setTimeout(function() { tocarTom(150, 0.2, "sawtooth", 0.4); }, 200);
        setTimeout(function() { tocarTom(100, 0.3, "sawtooth", 0.3); }, 400);
    },

    // Masmorra avançar
    masmorraAvancar: function() {
        tocarTom(300, 0.05, "square", 0.4);
        setTimeout(function() { tocarTom(400, 0.06, "square", 0.4); }, 60);
    },

    // Seleção de personagem
    selecionarPersonagem: function() {
        tocarTom(400, 0.08, "triangle");
        setTimeout(function() { tocarTom(600, 0.08, "triangle"); }, 100);
        setTimeout(function() { tocarTom(800, 0.1, "triangle"); }, 200);
        setTimeout(function() { tocarTom(1000, 0.15, "sine"); }, 300);
    }
};
// ============================================
// SOM EXTERNO PARA VENDER
// ============================================

var somVender = new Audio("images/Sons/Shop2.m4a");
somVender.preload = "auto";

function tocarSomVender() {
    if (!sistemaAudio.habilitado) return;
    try {
        var clone = somVender.cloneNode();
        clone.volume = sistemaAudio.volume;
        clone.play().catch(function() {
            // Fallback: som gerado se o arquivo não existir
            sfx.vender();
        });
    } catch (e) {
        sfx.vender();
    }
}

// ── INTERCEPTAR VENDER NA LOJA ──
var _venderLojaComSom = venderItemLoja;
venderItemLoja = function(i) {
    var item = player.inventario[i];
    if (item) {
        tocarSomVender();
    }
    _venderLojaComSom(i);
};

// ── INTERCEPTAR VENDER NO FERREIRO ──
var _venderEquipComSom = venderEquipamento;
venderEquipamento = function(i) {
    var item = player.inventario[i];
    if (item) {
        tocarSomVender();
    }
    _venderEquipComSom(i);
};

// ── Sistema de fallback: arquivo > gerado ──
// Adicione isso DEPOIS do bloco sfx

var sonsArquivo = {};

function carregarSomArquivo(nome, caminho) {
    var audio = new Audio(caminho);
    audio.preload = "auto";
    audio.volume = sistemaAudio.volume;
    sonsArquivo[nome] = audio;
}

// Tentar carregar sons de arquivo (se existirem)
function carregarSonsArquivos() {
    var lista = {
        atacar: "images/Sons/Attack3.ogg",
        critico: "images/Sons/Battle3.ogg",
        danoRecebido: "images/Sons/Damage3.m4a",
        vitoria: "images/Sons/Victory2.m4a",
        derrota: "images/Sons/Defeat2.m4a",
        levelUp: "images/Sons/Applause2.m4a",
        comprar: "images/Sons/Coin.m4a",
        cura: "images/Sons/Heal3.ogg",
        equipar: "images/Sons/Equip2.m4a"
        
        
    };

    Object.keys(lista).forEach(function(nome) {
        try {
            carregarSomArquivo(nome, lista[nome]);
        } catch (e) { }
    });
}

// Atualizar tocarSom para usar arquivo se disponível
var _tocarSomOriginal = tocarSom;
tocarSom = function(nomeSom) {
    if (!sistemaAudio.habilitado) return;

    // Tentar arquivo primeiro
    if (sonsArquivo[nomeSom]) {
        try {
            var audio = sonsArquivo[nomeSom].cloneNode();
            audio.volume = sistemaAudio.volume;
            audio.play().catch(function() { });
            return;
        } catch (e) { }
    }

    // Fallback: som gerado
    if (sfx[nomeSom]) {
        try { sfx[nomeSom](); } catch (e) { }
    }
};

// Carregar ao iniciar (falha silenciosa se não existirem)
try { carregarSonsArquivos(); } catch (e) { }


// ============================================
// INTEGRAÇÃO DOS SONS NAS FUNÇÕES DO JOGO
// ============================================

// ── Wrapper: toca som se habilitado ──
function tocarSom(nomeSom) {
    if (!sistemaAudio.habilitado) return;
    if (sfx[nomeSom]) {
        try { sfx[nomeSom](); } catch (e) { }
    }
}

// ── Interceptar funções existentes para adicionar sons ──

// ATACAR
var _atacarComSom = atacar;
atacar = function() {
    tocarSom("atacar");
    _atacarComSom();
};

// DEFENDER
var _defenderComSom = defender;
defender = function() {
    tocarSom("defender");
    _defenderComSom();
};

// USAR HABILIDADE
var _habilidadeComSom = usarHabilidade;
usarHabilidade = function() {
    if (player.habilidadeCooldown > 0) {
        tocarSom("erro");
        _habilidadeComSom();
        return;
    }
    tocarSom("habilidade");
    _habilidadeComSom();
};

// FUGIR
var _fugirComSom = fugir;
fugir = function() {
    tocarSom("fuga");
    _fugirComSom();
};

// POÇÃO
var _potionComSom = usePotion;
usePotion = function() {
    if (player.potions > 0) {
        tocarSom("cura");
    } else {
        tocarSom("erro");
    }
    _potionComSom();
};

// INICIAR COMBATE
var _iniciarCombateComSom = iniciarCombate;
iniciarCombate = function(monstroBase, isBoss) {
    if (isBoss) {
        tocarSom("bossApareceu");
    } else if (monstroBase.isElite) {
        tocarSom("eliteApareceu");
    } else {
        tocarSom("combateInicio");
    }
    _iniciarCombateComSom(monstroBase, isBoss);
};

// VITÓRIA
var _vitoriaComSom = vitoriaCombate;
vitoriaCombate = function() {
    tocarSom("vitoria");
    _vitoriaComSom();
};


// LEVEL UP
var _levelUpComSom = levelUp;
levelUp = function() {
    tocarSom("levelUp");
    _levelUpComSom();
};

// SELECIONAR PERSONAGEM
var _selecComSom = selecionarPersonagem;
selecionarPersonagem = function(id) {
    tocarSom("selecionarPersonagem");
    inicializarAudio(); // Primeira interação do usuário
    _selecComSom(id);
};

// DESCANSAR
var _descansarComSom = descansar;
descansar = function() {
    if (player.gold >= 20 && player.hp < player.maxHp) {
        tocarSom("descansar");
    } else {
        tocarSom("erro");
    }
    _descansarComSom();
};

// COMPRAR
var _comprarLojaComSom = comprarItemLoja;
comprarItemLoja = function(i) {
    var item = catalogoLoja.comprar[i];
    if (item && player.gold >= Math.floor(item.preco * (1 - calcularDescontoLoja()))) {
        tocarSom("comprar");
    } else {
        tocarSom("erro");
    }
    _comprarLojaComSom(i);
};

// COMPRAR EQUIP
var _comprarEquipComSom = typeof comprarEquipamentoNovo === 'function' ? comprarEquipamentoNovo : null;
if (_comprarEquipComSom) {
    comprarEquipamentoNovo = function(i) {
        tocarSom("comprar");
        _comprarEquipComSom(i);
    };
}

// EQUIPAR
var _equiparComSom = equiparItem;
equiparItem = function(idx) {
    tocarSom("equipar");
    _equiparComSom(idx);
};



// CONQUISTA
var _conquistaComSom = verificarConquistas;
verificarConquistas = function() {
    var antes = conquistas.totalDesbloqueadas;
    _conquistaComSom();
    if (conquistas.totalDesbloqueadas > antes) {
        tocarSom("conquista");
    }
};

// MISSÃO COMPLETA
var _missaoComSom = completarMissaoAtiva;
completarMissaoAtiva = function() {
    tocarSom("missaoCompleta");
    _missaoComSom();
};

// MASMORRA ENTRAR
var _masmorraComSom = iniciarMasmorra;
iniciarMasmorra = function() {
    tocarSom("masmorraEntrar");
    _masmorraComSom();
};

// MASMORRA AVANÇAR
var _masmorraAvancarComSom = avancarMasmorra;
avancarMasmorra = function() {
    tocarSom("masmorraAvancar");
    _masmorraAvancarComSom();
};

// ── Sons dentro do turnoInimigo (esquiva e dano) ──
var _turnoInimigoComSom = turnoInimigo;
turnoInimigo = function() {
    if (!gameState.emCombate || !monster || monster.hp <= 0) return;

    // Checar esquiva antes
    var chanceEsq = calcularChanceEsquiva();
    // Não podemos saber antes, então adicionamos som via addCombatLog override

    _turnoInimigoComSom();
};

// ── Override addCombatLog para tocar sons baseado no texto ──
var _addCombatLogComSom = addCombatLog;
addCombatLog = function(texto, tipo) {
    _addCombatLogComSom(texto, tipo);

    // Sons baseados no tipo de log
    if (texto.indexOf("desviou") >= 0 || texto.indexOf("Desviou") >= 0) {
        tocarSom("esquiva");
    } else if (texto.indexOf("CRÍTICO") >= 0 && tipo === "critical" && texto.indexOf("dano") >= 0) {
        // Crítico do jogador já tocou em atacar
    } else if (tipo === "enemy" && texto.indexOf("dano") >= 0) {
        tocarSom("danoRecebido");
    }

    // Sons de masmorra
    if (texto.indexOf("TESOURO") >= 0) tocarSom("tesouro");
    if (texto.indexOf("ARMADILHA") >= 0) tocarSom("armadilha");
};


// ============================================
// SISTEMA DE DROP DE EQUIPAMENTOS POR CLASSE
// ============================================

// ── Equipamentos dropáveis por classe e tier ──
// Separados dos equipamentos do ferreiro (stats ligeiramente menores)
// Isso incentiva TAMBÉM comprar no ferreiro (melhor) ou usar drop + reforja

var dropsEquipClasse = {

    guerreiro: {
        T1: [
            { nome: "Espada Enferrujada", icone: "⚔️", slot: "arma", stats: { atk: 4, def: 0, hp: 0 }, preco: 20 },
            { nome: "Escudo de Madeira", icone: "🛡️", slot: "armadura", stats: { atk: 0, def: 3, hp: 8 }, preco: 22 }
        ],
        T2: [
            { nome: "Espada do Soldado", icone: "⚔️", slot: "arma", stats: { atk: 10, def: 0, hp: 0 }, preco: 80 },
            { nome: "Peitoral de Combate", icone: "🛡️", slot: "armadura", stats: { atk: 0, def: 9, hp: 15 }, preco: 90 },
            { nome: "Elmo do Soldado", icone: "⛑️", slot: "elmo", stats: { atk: 0, def: 4, hp: 6 }, preco: 55 }
        ],
        T3: [
            { nome: "Lâmina do Comandante", icone: "⚔️", slot: "arma", stats: { atk: 20, def: 2, hp: 0 }, preco: 220 },
            { nome: "Couraça do Veterano", icone: "🛡️", slot: "armadura", stats: { atk: 0, def: 18, hp: 30 }, preco: 250 },
            { nome: "Grevas de Aço", icone: "👢", slot: "botas", stats: { atk: 0, def: 5, hp: 10 }, preco: 180 }
        ],
        T4: [
            { nome: "Machado do Berserker", icone: "🪓", slot: "arma", stats: { atk: 32, def: 0, hp: 0 }, preco: 550 },
            { nome: "Armadura do General", icone: "🛡️", slot: "armadura", stats: { atk: 2, def: 28, hp: 50 }, preco: 600 },
            { nome: "Anel de Sangue", icone: "💍", slot: "anel", stats: { atk: 8, def: 3, hp: 15 }, preco: 400 }
        ]
    },

    paladino: {
        T1: [
            { nome: "Maça Velha", icone: "🔨", slot: "arma", stats: { atk: 3, def: 1, hp: 0 }, preco: 18 },
            { nome: "Cota Remendada", icone: "🛡️", slot: "armadura", stats: { atk: 0, def: 3, hp: 10 }, preco: 25 }
        ],
        T2: [
            { nome: "Maça da Guarda", icone: "🔨", slot: "arma", stats: { atk: 8, def: 2, hp: 8 }, preco: 85 },
            { nome: "Armadura do Templo", icone: "🛡️", slot: "armadura", stats: { atk: 0, def: 10, hp: 20 }, preco: 100 },
            { nome: "Amuleto de Proteção", icone: "📿", slot: "amuleto", stats: { atk: 0, def: 3, hp: 12 }, preco: 65 }
        ],
        T3: [
            { nome: "Martelo da Justiça", icone: "🔨", slot: "arma", stats: { atk: 15, def: 4, hp: 15 }, preco: 230 },
            { nome: "Armadura Sagrada", icone: "🛡️", slot: "armadura", stats: { atk: 0, def: 20, hp: 35 }, preco: 260 },
            { nome: "Elmo do Cruzado", icone: "⛑️", slot: "elmo", stats: { atk: 2, def: 8, hp: 12 }, preco: 180 }
        ],
        T4: [
            { nome: "Espada da Redenção", icone: "✨", slot: "arma", stats: { atk: 25, def: 8, hp: 25 }, preco: 580 },
            { nome: "Égide do Paladino", icone: "🛡️", slot: "armadura", stats: { atk: 0, def: 30, hp: 60 }, preco: 650 },
            { nome: "Anel da Fé", icone: "💍", slot: "anel", stats: { atk: 4, def: 5, hp: 20 }, preco: 420 }
        ]
    },

    arqueiro: {
        T1: [
            { nome: "Arco Rachado", icone: "🏹", slot: "arma", stats: { atk: 4, def: 0, hp: 0 }, preco: 18 },
            { nome: "Peitoral de Caçador", icone: "🦺", slot: "armadura", stats: { atk: 0, def: 2, hp: 5 }, preco: 16 }
        ],
        T2: [
            { nome: "Arco da Patrulha", icone: "🏹", slot: "arma", stats: { atk: 11, def: 0, hp: 0 }, preco: 85 },
            { nome: "Couro do Batedor", icone: "🦺", slot: "armadura", stats: { atk: 1, def: 6, hp: 10 }, preco: 75 },
            { nome: "Botas Silenciosas", icone: "👢", slot: "botas", stats: { atk: 1, def: 2, hp: 5 }, preco: 55 }
        ],
        T3: [
            { nome: "Arco da Floresta", icone: "🏹", slot: "arma", stats: { atk: 18, def: 0, hp: 5 }, preco: 220 },
            { nome: "Armadura de Escamas Leves", icone: "🦺", slot: "armadura", stats: { atk: 0, def: 12, hp: 20 }, preco: 200 },
            { nome: "Anel do Falcão", icone: "💍", slot: "anel", stats: { atk: 5, def: 2, hp: 8 }, preco: 190 }
        ],
        T4: [
            { nome: "Arco do Caçador Sombrio", icone: "🏹", slot: "arma", stats: { atk: 30, def: 2, hp: 0 }, preco: 520 },
            { nome: "Manto do Predador", icone: "🦺", slot: "armadura", stats: { atk: 3, def: 16, hp: 28 }, preco: 500 },
            { nome: "Amuleto do Vento", icone: "📿", slot: "amuleto", stats: { atk: 6, def: 4, hp: 20 }, preco: 400 }
        ]
    },

    mago: {
        T1: [
            { nome: "Varinha de Galho", icone: "🪄", slot: "arma", stats: { atk: 2, def: 0, hp: 4 }, preco: 15 },
            { nome: "Túnica Rasgada", icone: "👘", slot: "armadura", stats: { atk: 0, def: 1, hp: 8 }, preco: 14 }
        ],
        T2: [
            { nome: "Cajado de Cristal", icone: "🪄", slot: "arma", stats: { atk: 7, def: 0, hp: 12 }, preco: 80 },
            { nome: "Manto do Estudioso", icone: "👘", slot: "armadura", stats: { atk: 0, def: 4, hp: 18 }, preco: 70 },
            { nome: "Anel Arcano", icone: "💍", slot: "anel", stats: { atk: 3, def: 0, hp: 10 }, preco: 60 }
        ],
        T3: [
            { nome: "Orbe Elemental", icone: "🔮", slot: "arma", stats: { atk: 14, def: 0, hp: 20 }, preco: 210 },
            { nome: "Vestes do Sábio", icone: "👘", slot: "armadura", stats: { atk: 2, def: 8, hp: 30 }, preco: 200 },
            { nome: "Amuleto Rúnico", icone: "📿", slot: "amuleto", stats: { atk: 4, def: 2, hp: 18 }, preco: 180 }
        ],
        T4: [
            { nome: "Cajado do Vórtice", icone: "🌟", slot: "arma", stats: { atk: 24, def: 0, hp: 35 }, preco: 560 },
            { nome: "Manto Dimensional", icone: "👘", slot: "armadura", stats: { atk: 4, def: 15, hp: 50 }, preco: 580 },
            { nome: "Anel do Caos", icone: "💍", slot: "anel", stats: { atk: 10, def: 3, hp: 20 }, preco: 450 }
        ]
    },

    clerigo: {
        T1: [
            { nome: "Cajado de Novato", icone: "✝️", slot: "arma", stats: { atk: 2, def: 0, hp: 6 }, preco: 15 },
            { nome: "Hábito Velho", icone: "👘", slot: "armadura", stats: { atk: 0, def: 2, hp: 12 }, preco: 20 }
        ],
        T2: [
            { nome: "Cetro de Prata", icone: "✝️", slot: "arma", stats: { atk: 6, def: 2, hp: 12 }, preco: 80 },
            { nome: "Veste Clerical", icone: "🛡️", slot: "armadura", stats: { atk: 0, def: 8, hp: 22 }, preco: 90 },
            { nome: "Amuleto Sagrado", icone: "📿", slot: "amuleto", stats: { atk: 0, def: 3, hp: 15 }, preco: 65 }
        ],
        T3: [
            { nome: "Martelo da Luz", icone: "🔨", slot: "arma", stats: { atk: 12, def: 4, hp: 20 }, preco: 220 },
            { nome: "Cota Abençoada", icone: "🛡️", slot: "armadura", stats: { atk: 0, def: 18, hp: 40 }, preco: 250 },
            { nome: "Elmo da Graça", icone: "⛑️", slot: "elmo", stats: { atk: 0, def: 6, hp: 15 }, preco: 160 }
        ],
        T4: [
            { nome: "Cajado da Ressurreição", icone: "✨", slot: "arma", stats: { atk: 20, def: 6, hp: 35 }, preco: 550 },
            { nome: "Armadura da Divindade", icone: "✨", slot: "armadura", stats: { atk: 0, def: 26, hp: 70 }, preco: 620 },
            { nome: "Anel da Bênção", icone: "💍", slot: "anel", stats: { atk: 3, def: 5, hp: 25 }, preco: 400 }
        ]
    },

    ladino: {
        T1: [
            { nome: "Faca Cega", icone: "🗡️", slot: "arma", stats: { atk: 4, def: 0, hp: 0 }, preco: 16 },
            { nome: "Trapos Escuros", icone: "🌑", slot: "armadura", stats: { atk: 1, def: 1, hp: 4 }, preco: 14 }
        ],
        T2: [
            { nome: "Adaga Envenenada", icone: "🗡️", slot: "arma", stats: { atk: 10, def: 0, hp: 0 }, preco: 82 },
            { nome: "Couro da Sombra", icone: "🌑", slot: "armadura", stats: { atk: 2, def: 5, hp: 8 }, preco: 72 },
            { nome: "Botas Furtivas", icone: "👢", slot: "botas", stats: { atk: 2, def: 2, hp: 5 }, preco: 60 }
        ],
        T3: [
            { nome: "Lâmina do Assassino", icone: "🗡️", slot: "arma", stats: { atk: 18, def: 0, hp: 0 }, preco: 210 },
            { nome: "Veste Noturna", icone: "🌑", slot: "armadura", stats: { atk: 3, def: 10, hp: 15 }, preco: 200 },
            { nome: "Anel Venenoso", icone: "💍", slot: "anel", stats: { atk: 6, def: 0, hp: 8 }, preco: 170 }
        ],
        T4: [
            { nome: "Punhal do Vazio", icone: "👻", slot: "arma", stats: { atk: 30, def: 3, hp: 0 }, preco: 530 },
            { nome: "Capa da Invisibilidade", icone: "👻", slot: "armadura", stats: { atk: 4, def: 15, hp: 25 }, preco: 520 },
            { nome: "Amuleto das Sombras", icone: "📿", slot: "amuleto", stats: { atk: 8, def: 4, hp: 15 }, preco: 380 }
        ]
    },

    druida: {
        T1: [
            { nome: "Galho Encantado", icone: "🌿", slot: "arma", stats: { atk: 3, def: 0, hp: 4 }, preco: 16 },
            { nome: "Folhagem Protetora", icone: "🍃", slot: "armadura", stats: { atk: 0, def: 2, hp: 8 }, preco: 18 }
        ],
        T2: [
            { nome: "Cajado de Espinhos", icone: "🌿", slot: "arma", stats: { atk: 8, def: 0, hp: 10 }, preco: 78 },
            { nome: "Couro Druídico Antigo", icone: "🍃", slot: "armadura", stats: { atk: 0, def: 7, hp: 16 }, preco: 80 },
            { nome: "Anel Natural", icone: "💍", slot: "anel", stats: { atk: 2, def: 2, hp: 10 }, preco: 58 }
        ],
        T3: [
            { nome: "Cajado do Bosque", icone: "🌳", slot: "arma", stats: { atk: 15, def: 2, hp: 18 }, preco: 210 },
            { nome: "Casca Viva", icone: "🌳", slot: "armadura", stats: { atk: 0, def: 14, hp: 28 }, preco: 220 },
            { nome: "Amuleto da Seiva", icone: "📿", slot: "amuleto", stats: { atk: 3, def: 4, hp: 18 }, preco: 170 }
        ],
        T4: [
            { nome: "Cajado Ancestral", icone: "🌟", slot: "arma", stats: { atk: 25, def: 4, hp: 30 }, preco: 550 },
            { nome: "Armadura da Mãe Terra", icone: "🌳", slot: "armadura", stats: { atk: 3, def: 24, hp: 50 }, preco: 580 },
            { nome: "Anel das Raízes", icone: "💍", slot: "anel", stats: { atk: 5, def: 5, hp: 22 }, preco: 400 }
        ]
    },

    monge: {
        T1: [
            { nome: "Faixas Rasgadas", icone: "🥊", slot: "arma", stats: { atk: 3, def: 1, hp: 0 }, preco: 14 },
            { nome: "Gi Remendado", icone: "🥋", slot: "armadura", stats: { atk: 0, def: 2, hp: 6 }, preco: 16 }
        ],
        T2: [
            { nome: "Punhos de Bronze", icone: "🥊", slot: "arma", stats: { atk: 8, def: 2, hp: 4 }, preco: 75 },
            { nome: "Veste do Discípulo", icone: "🥋", slot: "armadura", stats: { atk: 0, def: 5, hp: 12 }, preco: 70 },
            { nome: "Sandálias do Monge", icone: "👢", slot: "botas", stats: { atk: 1, def: 2, hp: 6 }, preco: 50 }
        ],
        T3: [
            { nome: "Garras de Titânio", icone: "🥊", slot: "arma", stats: { atk: 16, def: 3, hp: 8 }, preco: 200 },
            { nome: "Traje do Sensei", icone: "🥋", slot: "armadura", stats: { atk: 2, def: 12, hp: 25 }, preco: 210 },
            { nome: "Amuleto do Chi", icone: "📿", slot: "amuleto", stats: { atk: 4, def: 3, hp: 15 }, preco: 170 }
        ],
        T4: [
            { nome: "Punhos do Tigre", icone: "🐲", slot: "arma", stats: { atk: 28, def: 5, hp: 12 }, preco: 520 },
            { nome: "Vestes do Grão-Mestre", icone: "🥋", slot: "armadura", stats: { atk: 4, def: 20, hp: 40 }, preco: 540 },
            { nome: "Anel do Equilíbrio", icone: "💍", slot: "anel", stats: { atk: 6, def: 6, hp: 18 }, preco: 380 }
        ]
    }
};

var chanceDropEquip = {
    // Tier 1
    floresta:   { chance: 0.08, tier: "T1" },
    pantano:    { chance: 0.08, tier: "T1" },
    colinas:    { chance: 0.07, tier: "T1" },
    // Tier 2
    ruinas:     { chance: 0.06, tier: "T2" },
    deserto:    { chance: 0.06, tier: "T2" },
    cemiterio:  { chance: 0.06, tier: "T2" },
    // Tier 3
    caverna:    { chance: 0.05, tier: "T3" },
    vulcao:     { chance: 0.05, tier: "T3" },
    geleira:    { chance: 0.05, tier: "T3" },
    // Tier 4
    cidadeFant: { chance: 0.04, tier: "T4" },
    abismo:     { chance: 0.04, tier: "T4" },
    castelo:    { chance: 0.04, tier: "T4" },
    planoAstral:{ chance: 0.04, tier: "T4" },
    infernus:   { chance: 0.03, tier: "T4" },
    tronoDeus:  { chance: 0.03, tier: "T4" }
};

// ── Função que tenta dropar equipamento ──
function tentarDropEquipamento(isElite, isBoss) {
    var areaKey = gameState.areaAtual;
    if (!areaKey || !chanceDropEquip[areaKey]) return null;

    var config = chanceDropEquip[areaKey];
    var chance = config.chance;

    // Elite e Boss têm chance maior
    if (isBoss) chance *= 3.0;
    else if (isElite) chance *= 2.0;

    // Sabedoria bônus de drop
    chance += calcularBonusDrop();

    // Sorte (talento)
    chance *= getBonusTalento("sorte");

    chance = Math.min(0.50, chance); // Cap 50%

    if (Math.random() >= chance) return null;

    // Pegar arquétipo da classe
    var arquetipo = getArquetipoClasse();
    var equipsPorTier = dropsEquipClasse[arquetipo];
    if (!equipsPorTier) return null;

    var tierEquips = equipsPorTier[config.tier];
    if (!tierEquips || tierEquips.length === 0) return null;

    // Escolher equipamento aleatório do tier
    var equip = randomChoice(tierEquips);

    return {
        nome: equip.nome,
        icone: equip.icone,
        slot: equip.slot,
        stats: { atk: equip.stats.atk, def: equip.stats.def, hp: equip.stats.hp },
        preco: equip.preco,
        precoVenda: Math.floor(equip.preco * 0.4)
    };
}


// ============================================
// INTEGRAÇÃO NA VITÓRIA DE COMBATE
// ============================================

var _vitoriaComEquipDrop = vitoriaCombate;
vitoriaCombate = function() {
    // Guardar referência ao monstro antes da vitória processar
    var monsterRef = monster;
    var isEliteRef = monster ? monster.isElite : false;
    var isBossRef = monster ? monster.isBoss : false;

    // Executar vitória original
    _vitoriaComEquipDrop();

    // DEPOIS: tentar dropar equipamento
    var equipDrop = tentarDropEquipamento(isEliteRef, isBossRef);
    if (equipDrop) {
        adicionarItemInventario(equipDrop.nome, equipDrop.icone, 1, {
            tipo: "equipamento",
            slot: equipDrop.slot,
            descricao: "Dropado de " + (monsterRef ? monsterRef.name : "monstro"),
            stats: equipDrop.stats,
            preco: equipDrop.preco,
            precoVenda: equipDrop.precoVenda
        });

        // Notificação especial
        var statsText = [];
        if (equipDrop.stats.atk > 0) statsText.push("⚔️+" + equipDrop.stats.atk);
        if (equipDrop.stats.def > 0) statsText.push("🛡️+" + equipDrop.stats.def);
        if (equipDrop.stats.hp > 0) statsText.push("❤️+" + equipDrop.stats.hp);

        mostrarNotificacao("🎁 DROP: " + equipDrop.icone + " " + equipDrop.nome + " [" + equipDrop.slot + "] " + statsText.join(" "), 5000);
        log("🎁 EQUIPAMENTO DROPADO: " + equipDrop.icone + " " + equipDrop.nome + " (" + statsText.join(", ") + ")!");

        tocarSom("tesouro");
    }
};

// ============================================
// SISTEMA DE HISTÓRIA / CAMPANHA
// ============================================

var historiaProgresso = {
    capituloAtual: 0,
    escolhasFeitas: {},
    caminhoAtual: "neutro" // "heroi", "sombrio", "neutro"
};

var capitulos = [
    // ── CAPÍTULO 1: Floresta ──
    {
        id: 1, area: "floresta", titulo: "O Chamado da Floresta",
        cenas: [
            { texto: "Um ancião desesperado te aborda na estrada.\n\n'Aventureiro! Os lobos da Floresta Sombria estão atacando nossa vila. Algo está perturbando-os... algo antigo despertou nas profundezas.'", icone: "👴" },
            { texto: "Você entra na floresta. As árvores parecem sussurrar avisos. Entre galhos retorcidos, você encontra um altar profanado com símbolos estranhos.", icone: "🌲",
              escolha: {
                  pergunta: "O que você faz com o altar?",
                  opcoes: [
                      { texto: "🙏 Purificar o altar", efeito: "heroi", resultado: "Você purifica o altar. Uma luz quente envolve a floresta. +20 HP", bonus: { tipo: "hp", valor: 20 } },
                      { texto: "🔮 Estudar os símbolos", efeito: "neutro", resultado: "Você memoriza os símbolos. Conhecimento é poder. +1 Inteligência", bonus: { tipo: "inteligencia", valor: 1 } },
                      { texto: "💀 Absorver a energia sombria", efeito: "sombrio", resultado: "A escuridão flui para dentro de você. Poder... +2 Força, -10 HP máx", bonus: { tipo: "forca_custo", valor: 2, custo: 10 } }
                  ]
              }
            },
            { texto: "No coração da floresta, você descobre a verdade: os lobos fogem de criaturas que emergem de um portal nas ruínas ao norte. A ameaça é maior do que parecia.", icone: "⚠️" }
        ]
    },

    // ── CAPÍTULO 2: Pântano ──
    {
        id: 2, area: "pantano", titulo: "Águas Turvas",
        cenas: [
            { texto: "O caminho para o norte passa pelo Pântano Venenoso. Uma bruxa vive aqui — dizem que ela sabe sobre os portais.", icone: "🐸" },
            { texto: "Você encontra a bruxa em sua cabana flutuante.\n\n'Ah, um aventureiro... Posso ajudá-lo, mas nada é de graça.'", icone: "🧙‍♀️",
              escolha: {
                  pergunta: "O que você oferece à bruxa?",
                  opcoes: [
                      { texto: "💰 Pagar 100 de ouro", efeito: "neutro", resultado: "A bruxa revela a localização de uma masmorra secreta. +100 XP", bonus: { tipo: "xp", valor: 100 }, custo: { tipo: "ouro", valor: 100 } },
                      { texto: "⚔️ Ameaçá-la", efeito: "sombrio", resultado: "A bruxa lança uma maldição! Mas foge, deixando poções para trás. +3 Poções, -1 Sabedoria", bonus: { tipo: "pocoes_custo", valor: 3, custo: 1 } },
                      { texto: "🤝 Ajudá-la com ingredientes", efeito: "heroi", resultado: "Você coleta ervas raras para ela. Em troca, ela te abençoa. +2 Sabedoria", bonus: { tipo: "sabedoria", valor: 2 } }
                  ]
              }
            },
            { texto: "A bruxa revela que os portais são obra de um culto antigo chamado 'Os Eternos'. Eles buscam ressuscitar um deus esquecido.", icone: "📖" }
        ]
    },

    // ── CAPÍTULO 3: Colinas ──
    {
        id: 3, area: "colinas", titulo: "A Batalha das Colinas",
        cenas: [
            { texto: "As Colinas Sangrentas bloqueiam o caminho às ruínas. Um exército de orcs acampou aqui, liderados por um chefe brutal.", icone: "⛰️" },
            { texto: "Um batedor orc te encontra. Surpreendentemente, ele quer negociar.\n\n'Humano... nosso chefe enlouqueceu desde que encontrou aquele artefato. Se você derrotá-lo, meu povo vai embora.'", icone: "👹",
              escolha: {
                  pergunta: "Como proceder?",
                  opcoes: [
                      { texto: "🤝 Aceitar a aliança", efeito: "heroi", resultado: "O batedor te mostra um caminho secreto até o chefe. +2 Destreza", bonus: { tipo: "destreza", valor: 2 } },
                      { texto: "⚔️ Recusar e lutar sozinho", efeito: "neutro", resultado: "Você se recusa. O caminho difícil torna você mais forte. +2 Força", bonus: { tipo: "forca", valor: 2 } },
                      { texto: "🗡️ Matar o batedor e usar a informação", efeito: "sombrio", resultado: "Eliminado. Agora você sabe o caminho E tomou o ouro dele. +150 ouro", bonus: { tipo: "ouro", valor: 150 } }
                  ]
              }
            },
            { texto: "Após derrotar o chefe orc, você encontra o artefato: um fragmento de cristal negro pulsante. É um pedaço do portal dos Eternos.", icone: "🔮" }
        ]
    },

    // ── CAPÍTULO 4: Ruínas ──
    {
        id: 4, area: "ruinas", titulo: "Ecos do Passado",
        cenas: [
            { texto: "As Ruínas Esquecidas revelam inscrições sobre 'Os Eternos'. Este era o seu templo principal. Os mortos-vivos são seus guardiões.", icone: "🏚️" },
            { texto: "No centro do templo, você encontra um espírito preso — um antigo sacerdote dos Eternos que se arrependeu.\n\n'Eu posso te mostrar como fechar os portais... mas preciso de algo em troca.'", icone: "👻",
              escolha: {
                  pergunta: "O que o espírito pede?",
                  opcoes: [
                      { texto: "🙏 Promete libertá-lo", efeito: "heroi", resultado: "O espírito te ensina o ritual de selamento. +2 Sabedoria, +1 Inteligência", bonus: { tipo: "sab_int", valor: 2 } },
                      { texto: "🔮 Absorver o espírito para poder", efeito: "sombrio", resultado: "Você absorve sua essência. Poder imenso! +3 Inteligência, caminho sombrio...", bonus: { tipo: "inteligencia_dark", valor: 3 } },
                      { texto: "📜 Negociar conhecimento mútuo", efeito: "neutro", resultado: "Troca justa. Ele te ensina, você conta do mundo atual. +200 XP", bonus: { tipo: "xp", valor: 200 } }
                  ]
              }
            },
            { texto: "Você aprende que os portais formam uma rede. Fechar um não basta — todos precisam ser selados, ou o deus desperta.", icone: "⚠️" }
        ]
    },

    // ── CAPÍTULO 5-15: Estrutura similar ──
    { id: 5, area: "deserto", titulo: "Areias do Tempo",
      cenas: [
        { texto: "O deserto guarda um templo subterrâneo dos Eternos. O calor é sufocante e miragens tentam desviá-lo.", icone: "🏜️" },
        { texto: "Um mercador misterioso oferece um mapa do templo.\n\n'Esse mapa custa... algo mais valioso que ouro.'", icone: "🧑‍💼",
          escolha: { pergunta: "O que entregar?",
            opcoes: [
              { texto: "💍 Seu melhor anel/amuleto", efeito: "neutro", resultado: "O mapa revela salas secretas. +3 Vigor", bonus: { tipo: "vigor", valor: 3 } },
              { texto: "🗡️ Roubar o mapa", efeito: "sombrio", resultado: "Fácil demais. O mapa é seu. +250 ouro do mercador", bonus: { tipo: "ouro", valor: 250 } },
              { texto: "🤝 Escoltar o mercador em segurança", efeito: "heroi", resultado: "Gratidão! Mapa + desconto permanente. +2 Carisma", bonus: { tipo: "carisma", valor: 2 } }
            ]
          }
        },
        { texto: "Dentro do templo, você sela mais um portal. Os Eternos sabem que você os caça agora.", icone: "⚡" }
      ]
    },

    { id: 6, area: "cemiterio", titulo: "O Preço dos Mortos",
      cenas: [
        { texto: "O Cemitério Profano é onde os Eternos conduziram seus rituais de ressurreição. Os mortos andam.", icone: "⚰️" },
        { texto: "Um necromante arrependido oferece ajuda.\n\n'Eu ajudei a criar esta abominação. Deixe-me corrigi-la.'", icone: "💀",
          escolha: { pergunta: "Confiar nele?",
            opcoes: [
              { texto: "🤝 Aceitar ajuda", efeito: "heroi", resultado: "Ele enfraquece os mortos-vivos. Combates mais fáceis nesta área. +2 Vigor", bonus: { tipo: "vigor", valor: 2 } },
              { texto: "🔮 Forçá-lo a revelar segredos", efeito: "sombrio", resultado: "Sob pressão, ele revela magias proibidas. +3 Inteligência", bonus: { tipo: "inteligencia", valor: 3 } },
              { texto: "⚔️ Eliminá-lo por segurança", efeito: "neutro", resultado: "Sem riscos. Você segue sozinho. +2 Força", bonus: { tipo: "forca", valor: 2 } }
            ]
          }
        },
        { texto: "O portal do cemitério é selado. Mas você sente que os Eternos estão observando cada passo seu.", icone: "👁️" }
      ]
    },

    { id: 7, area: "caverna", titulo: "Nas Profundezas", cenas: [
        { texto: "As cavernas se aprofundam além do que qualquer mapa registra. A escuridão é quase sólida.", icone: "🕳️" },
        { texto: "Uma civilização subterrânea de anões é descoberta. Eles lutam contra os monstros das profundezas.\n\n'Forasteiro, ajude-nos ou siga seu caminho.'", icone: "⛏️",
          escolha: { pergunta: "Ajudar os anões?",
            opcoes: [
              { texto: "⚔️ Lutar ao lado deles", efeito: "heroi", resultado: "Os anões forjam uma arma especial para você. +3 Força", bonus: { tipo: "forca", valor: 3 } },
              { texto: "💰 Pedir pagamento primeiro", efeito: "neutro", resultado: "Negócios são negócios. +500 ouro", bonus: { tipo: "ouro", valor: 500 } },
              { texto: "🗡️ Saquear enquanto lutam", efeito: "sombrio", resultado: "Enquanto se distraem, você rouba artefatos. +3 Destreza, -reputação", bonus: { tipo: "destreza", valor: 3 } }
            ]
          }
        },
        { texto: "O dragão que habita a caverna mais profunda guardava um portal. Mais um selado.", icone: "🐲" }
    ]},

    { id: 8, area: "vulcao", titulo: "Forja do Inferno", cenas: [
        { texto: "O vulcão é um portal natural entre mundos. O calor derrete até esperanças.", icone: "🌋" },
        { texto: "Uma fênix sombria bloqueia o caminho. Ela fala com a voz de mil mortos.\n\n'O que você busca custará tudo que é.'", icone: "🐦‍🔥",
          escolha: { pergunta: "Responder à fênix?",
            opcoes: [
              { texto: "🙏 'Busco proteger os vivos'", efeito: "heroi", resultado: "A fênix reconhece sua nobreza. +3 Sabedoria, +100 HP", bonus: { tipo: "sab_hp", valor: 3 } },
              { texto: "⚔️ 'Busco poder para vencer'", efeito: "neutro", resultado: "Honesto. A fênix respeita isso. +3 Vigor", bonus: { tipo: "vigor", valor: 3 } },
              { texto: "💀 'Busco dominar tudo'", efeito: "sombrio", resultado: "A fênix ri e te dá um fragmento de seu poder negro. +4 Força, -20 HP máx", bonus: { tipo: "forca_custo", valor: 4, custo: 20 } }
            ]
          }
        },
        { texto: "O portal do vulcão era o mais poderoso até agora. Selá-lo causa um tremor que ecoa por todo o mundo.", icone: "🌍" }
    ]},

    { id: 9, area: "geleira", titulo: "O Inverno Eterno", cenas: [
        { texto: "A geleira esconde o mais antigo templo dos Eternos. Aqui tudo começou, milênios atrás.", icone: "🏔️" },
        { texto: "Um gigante de gelo guarda a entrada. Ele é o último guardião original dos Eternos, mas está cansado.\n\n'Milênios guardando... para quê? O deus nunca veio.'", icone: "⛰️",
          escolha: { pergunta: "O que dizer ao gigante?",
            opcoes: [
              { texto: "🤝 'Descanse, eu termino isso'", efeito: "heroi", resultado: "O gigante se desfaz em paz. Sua sabedoria te é transferida. +3 Sabedoria, +3 Vigor", bonus: { tipo: "sab_vig", valor: 3 } },
              { texto: "⚔️ 'Saia do caminho ou morra'", efeito: "neutro", resultado: "Ele luta, mas sem vontade. Vitória fácil. +500 XP", bonus: { tipo: "xp", valor: 500 } },
              { texto: "🔮 'Dê-me seu poder'", efeito: "sombrio", resultado: "Você drena a essência do gigante. Poder glacial. +4 Inteligência", bonus: { tipo: "inteligencia", valor: 4 } }
            ]
          }
        },
        { texto: "Metade dos portais está selada. Mas os Eternos estão se reorganizando. A segunda metade será muito mais perigosa.", icone: "⚠️" }
    ]},

    { id: 10, area: "cidadeFant", titulo: "Cidade dos Mortos", cenas: [
        { texto: "A Cidade Fantasma foi o centro da civilização antes dos Eternos a destruírem. Espíritos revivem seus últimos momentos em loop.", icone: "👻" },
        { texto: "O espírito do antigo prefeito te aborda.\n\n'Você pode nos libertar... ou usar nossas almas como combustível para fechar os portais mais rápido.'", icone: "🏛️",
          escolha: { pergunta: "Como usar as almas?",
            opcoes: [
              { texto: "🙏 Libertá-las com respeito", efeito: "heroi", resultado: "As almas te abençoam. Proteção eterna. +4 Vigor, +50 HP", bonus: { tipo: "vig_hp", valor: 4 } },
              { texto: "🔮 Usar como combustível (eficiente)", efeito: "sombrio", resultado: "O portal se fecha instantaneamente. Mas os gritos ecoam em você. +5 Força, -2 Sabedoria", bonus: { tipo: "forca_custo_sab", valor: 5 } },
              { texto: "📜 Pedir que guiem seu caminho", efeito: "neutro", resultado: "Os espíritos revelam segredos da cidade. +800 ouro em tesouro", bonus: { tipo: "ouro", valor: 800 } }
            ]
          }
        },
        { texto: "Cada portal selado enfraquece o véu entre mundos. Paradoxalmente, fechar portais também acorda o deus mais rápido.", icone: "💀" }
    ]},

    { id: 11, area: "abismo", titulo: "Olhando para o Vazio", cenas: [
        { texto: "O Abismo Sombrio é onde a realidade se rompe. Aqui, pensamentos ganham forma física.", icone: "🌑" },
        { texto: "Suas próprias memórias se materializam como inimigos. Seu lado sombrio te confronta.\n\n'Eu sou tudo que você escondeu. Tudo que negou.'", icone: "🪞",
          escolha: { pergunta: "Como enfrentar sua sombra?",
            opcoes: [
              { texto: "🤝 Aceitar e integrar", efeito: "heroi", resultado: "Você abraça todas as partes de si. Equilíbrio perfeito. +2 em TODOS atributos", bonus: { tipo: "todos", valor: 2 } },
              { texto: "⚔️ Destruir a sombra", efeito: "neutro", resultado: "Você nega a escuridão. Determinação pura. +4 Força, +4 Vigor", bonus: { tipo: "forca_vigor", valor: 4 } },
              { texto: "💀 Fundir-se com a sombra", efeito: "sombrio", resultado: "O poder negro se multiplica. +6 Força, +4 Inteligência, -3 Sabedoria", bonus: { tipo: "dark_power", valor: 6 } }
            ]
          }
        },
        { texto: "O Abismo era o coração da rede de portais. Selá-lo causa um terremoto dimensional. Faltam poucos.", icone: "🌍" }
    ]},

    { id: 12, area: "castelo", titulo: "A Fortaleza do Rei Morto", cenas: [
        { texto: "O Castelo Amaldiçoado pertenceu ao último rei que tentou deter os Eternos. Ele falhou e sua alma foi aprisionada.", icone: "🏰" },
        { texto: "O fantasma do rei aparece, em correntes.\n\n'Eu tentei... e falhei. Você pode triunfar onde eu caí. Tome minha espada — ou minha coroa.'", icone: "👑",
          escolha: { pergunta: "O que aceitar do rei?",
            opcoes: [
              { texto: "⚔️ A Espada (poder ofensivo)", efeito: "neutro", resultado: "A espada do rei vibra com poder ancestral. +5 Força", bonus: { tipo: "forca", valor: 5 } },
              { texto: "👑 A Coroa (sabedoria e liderança)", efeito: "heroi", resultado: "A coroa te dá visão além do véu. +4 Sabedoria, +3 Carisma", bonus: { tipo: "sab_car", valor: 4 } },
              { texto: "💀 Ambos (drenando a alma do rei)", efeito: "sombrio", resultado: "Você absorve TUDO. O rei grita e desaparece. +4 Força, +4 Inteligência", bonus: { tipo: "forca_int", valor: 4 } }
            ]
          }
        },
        { texto: "Apenas 3 portais restam: no Plano Astral, no Infernus e no Trono dos Deuses. O deus já está semi-desperto.", icone: "⚡" }
    ]},

    { id: 13, area: "planoAstral", titulo: "Além da Realidade", cenas: [
        { texto: "O Plano Astral desafia toda lógica. O chão é o céu. Estrelas nascem e morrem em segundos.", icone: "🌌" },
        { texto: "Uma entidade cósmica — nem boa nem má — te observa.\n\n'Mortal curioso. Eu vi civilizações nascerem e morrerem. O que faz você diferente?'", icone: "🌟",
          escolha: { pergunta: "O que responder?",
            opcoes: [
              { texto: "🙏 'Eu luto por quem não pode lutar'", efeito: "heroi", resultado: "A entidade sorri. 'Raro.' Ela te abençoa. +3 em TODOS", bonus: { tipo: "todos", valor: 3 } },
              { texto: "⚔️ 'Eu luto porque é o que sei fazer'", efeito: "neutro", resultado: "'Honesto.' Ela te fortalece. +5 Força, +5 Vigor", bonus: { tipo: "forca_vigor", valor: 5 } },
              { texto: "💀 'Eu SEREI o próximo deus'", efeito: "sombrio", resultado: "Ela ri. 'Ambição... perigosa.' Poder imenso flui. +6 Inteligência, +4 Força", bonus: { tipo: "dark_final", valor: 6 } }
            ]
          }
        },
        { texto: "Penúltimo portal selado. O deus corrompido Axiom está quase livre. Apenas dois portais restam.", icone: "⚠️" }
    ]},

    { id: 14, area: "infernus", titulo: "Descida ao Inferno", cenas: [
        { texto: "O Infernus não é metafórico. É o inferno real. Almas queimam, demônios reinam.", icone: "🔥" },
        { texto: "O Príncipe Demônio te oferece um pacto.\n\n'Mortal idiota... ou talvez genial. Eu posso fechar o portal do Infernus para você. Em troca, quero sua ALMA quando morrer.'", icone: "😈",
          escolha: { pergunta: "Aceitar o pacto?",
            opcoes: [
              { texto: "❌ Recusar e lutar", efeito: "heroi", resultado: "O caminho mais difícil. Mas sua alma permanece sua. +5 Vigor, +5 Sabedoria", bonus: { tipo: "vig_sab", valor: 5 } },
              { texto: "🤝 Aceitar parcialmente", efeito: "neutro", resultado: "'Metade da alma, metade da ajuda.' O demônio enfraquece os guardas. +1000 XP", bonus: { tipo: "xp", valor: 1000 } },
              { texto: "💀 Aceitar completamente", efeito: "sombrio", resultado: "Poder demoníaco absoluto! Mas a que custo? +8 Força, +8 Inteligência. Alma vendida.", bonus: { tipo: "demon_pact", valor: 8 } }
            ]
          }
        },
        { texto: "O penúltimo portal é selado. Resta apenas um: no Trono dos Deuses. Axiom espera.", icone: "⚡" }
    ]},

    { id: 15, area: "tronoDeus", titulo: "O Confronto Final", cenas: [
        { texto: "O Trono dos Deuses. Onde divindades se sentaram para governar o mundo. Agora, apenas destruição resta.\n\nAxiom, o Deus Corrompido, te espera.", icone: "⚡" },
        { texto: "Axiom fala com voz que estilhaça montanhas.\n\n'Você selou meus portais. Destruiu meus servos. E agora está aqui, um INSETO diante de um DEUS.'\n\n'Mas devo admitir... você me impressionou.'", icone: "⚡",
          escolha: { pergunta: "Últimas palavras antes da batalha final?",
            opcoes: [
              { texto: "🙏 'Eu luto pelo mundo que você quer destruir'", efeito: "heroi", resultado: "Toda a energia dos portais selados flui para você. O mundo inteiro te dá forças. +5 TODOS atributos!", bonus: { tipo: "todos", valor: 5 } },
              { texto: "⚔️ 'Menos conversa, mais luta'", efeito: "neutro", resultado: "Sem discursos. Pura determinação. +8 Força, +8 Vigor", bonus: { tipo: "forca_vigor", valor: 8 } },
              { texto: "💀 'Eu não vim destruí-lo. Vim SUBSTITUÍ-LO.'", efeito: "sombrio", resultado: "Axiom hesita. Pela primeira vez, um deus sente MEDO. +10 Força, +10 Inteligência. Custo: humanidade.", bonus: { tipo: "god_power", valor: 10 } }
            ]
          }
        },
        { texto: "A batalha final se aproxima. O destino do mundo depende de você.\n\nDerrote Axiom na masmorra do Trono dos Deuses para completar sua jornada.", icone: "⚔️" }
    ]}
];


// ── FUNÇÕES DA HISTÓRIA ──

function verificarCapituloDisponivel() {
    var areaKey = gameState.areaAtual;
    if (!areaKey) return null;

    var area = areas[areaKey];
    if (!area || !area.capitulo) return null;

    var capId = area.capitulo;
    if (historiaProgresso.capituloAtual >= capId) return null; // Já visto
    if (capId > 1 && historiaProgresso.capituloAtual < capId - 1) return null; // Precisa ver o anterior

    return capitulos.find(function(c) { return c.id === capId; });
}

function iniciarCapitulo(capitulo) {
    gameState.cenaAtual = 0;
    gameState.capituloEmAndamento = capitulo;
    mostrarCena(0);
}

function mostrarCena(index) {
    var cap = gameState.capituloEmAndamento;
    if (!cap || index >= cap.cenas.length) {
        finalizarCapitulo();
        return;
    }

    var cena = cap.cenas[index];
    gameState.cenaAtual = index;

    var el = document.getElementById("historiaContent");
    if (!el) return;

    var html = '<div style="text-align:center;padding:15px;">';
    html += '<h3 style="color:#ffd700;margin-bottom:10px;">' + cap.titulo + '</h3>';
    html += '<p style="font-size:2em;margin-bottom:10px;">' + cena.icone + '</p>';
    html += '<p style="color:#e2e8f0;line-height:1.8;white-space:pre-line;margin-bottom:15px;">' + cena.texto + '</p>';

    if (cena.escolha) {
        html += '<div style="background:rgba(255,215,0,0.08);border:1px solid rgba(255,215,0,0.2);border-radius:8px;padding:12px;margin:10px 0;">';
        html += '<p style="color:#ffd700;font-weight:bold;margin-bottom:10px;">' + cena.escolha.pergunta + '</p>';

        cena.escolha.opcoes.forEach(function(opcao, i) {
            var corBorda = opcao.efeito === "heroi" ? "#22c55e" : opcao.efeito === "sombrio" ? "#ef4444" : "#38bdf8";
            html += '<button onclick="escolherOpcao(' + index + ',' + i + ')" style="display:block;width:100%;margin:6px 0;padding:10px 15px;text-align:left;' +
                'background:rgba(30,41,59,0.8);border:1px solid ' + corBorda + ';border-radius:8px;color:#e2e8f0;cursor:pointer;font-size:0.9em;">' +
                opcao.texto + '</button>';
        });

        html += '</div>';
    } else {
        html += '<button onclick="mostrarCena(' + (index + 1) + ')" style="padding:10px 25px;margin-top:10px;">Continuar ▶️</button>';
    }

    html += '</div>';
    el.innerHTML = html;
}

function escolherOpcao(cenaIndex, opcaoIndex) {
    var cap = gameState.capituloEmAndamento;
    var cena = cap.cenas[cenaIndex];
    var opcao = cena.escolha.opcoes[opcaoIndex];

    // Registrar escolha
    historiaProgresso.escolhasFeitas[cap.id] = opcao.efeito;

    // Atualizar caminho
    if (opcao.efeito === "heroi") historiaProgresso.caminhoAtual = contarCaminho("heroi") > contarCaminho("sombrio") ? "heroi" : historiaProgresso.caminhoAtual;
    if (opcao.efeito === "sombrio") historiaProgresso.caminhoAtual = contarCaminho("sombrio") > contarCaminho("heroi") ? "sombrio" : historiaProgresso.caminhoAtual;

    // Aplicar bônus
    aplicarBonusHistoria(opcao.bonus);

    // Aplicar custo
    if (opcao.custo) {
        if (opcao.custo.tipo === "ouro") player.gold -= opcao.custo.valor;
    }

    // Mostrar resultado
    var el = document.getElementById("historiaContent");
    el.innerHTML = '<div style="text-align:center;padding:20px;">' +
        '<p style="font-size:2em;">✨</p>' +
        '<p style="color:#e2e8f0;line-height:1.8;margin:15px 0;">' + opcao.resultado + '</p>' +
        '<button onclick="mostrarCena(' + (cenaIndex + 1) + ')" style="padding:10px 25px;margin-top:10px;">Continuar ▶️</button>' +
        '</div>';

    tocarSom("conquista");
    updateUI();
}

function contarCaminho(tipo) {
    var count = 0;
    Object.values(historiaProgresso.escolhasFeitas).forEach(function(e) {
        if (e === tipo) count++;
    });
    return count;
}

function aplicarBonusHistoria(bonus) {
    if (!bonus) return;
    switch (bonus.tipo) {
        case "hp": player.baseMaxHp += bonus.valor; break;
        case "forca": player.forca += bonus.valor; break;
        case "destreza": player.destreza += bonus.valor; break;
        case "vigor": player.vigor += bonus.valor; player.baseMaxHp += bonus.valor * 5; break;
        case "inteligencia": player.inteligencia += bonus.valor; break;
        case "sabedoria": player.sabedoria += bonus.valor; break;
        case "carisma": player.carisma += bonus.valor; break;
        case "xp": ganharExp(bonus.valor); break;
        case "ouro": player.gold += bonus.valor; break;
        case "todos": Object.keys({forca:1,destreza:1,vigor:1,inteligencia:1,sabedoria:1,carisma:1}).forEach(function(a) { player[a] += bonus.valor; }); player.baseMaxHp += bonus.valor * 5; break;
        case "forca_custo": player.forca += bonus.valor; player.baseMaxHp -= bonus.custo; break;
        case "sab_int": player.sabedoria += bonus.valor; player.inteligencia += 1; break;
        case "inteligencia_dark": player.inteligencia += bonus.valor; break;
        case "pocoes_custo": player.potions += bonus.valor; player.sabedoria -= bonus.custo; break;
        case "sab_hp": player.sabedoria += bonus.valor; player.baseMaxHp += 100; break;
        case "sab_vig": player.sabedoria += bonus.valor; player.vigor += bonus.valor; player.baseMaxHp += bonus.valor * 5; break;
        case "forca_vigor": player.forca += bonus.valor; player.vigor += bonus.valor; player.baseMaxHp += bonus.valor * 5; break;
        case "dark_power": player.forca += bonus.valor; player.inteligencia += 4; player.sabedoria -= 3; break;
        case "sab_car": player.sabedoria += bonus.valor; player.carisma += 3; break;
        case "forca_int": player.forca += bonus.valor; player.inteligencia += bonus.valor; break;
        case "vig_sab": player.vigor += bonus.valor; player.sabedoria += bonus.valor; player.baseMaxHp += bonus.valor * 5; break;
        case "demon_pact": player.forca += bonus.valor; player.inteligencia += bonus.valor; break;
        case "dark_final": player.inteligencia += bonus.valor; player.forca += 4; break;
        case "forca_custo_sab": player.forca += bonus.valor; player.sabedoria -= 2; break;
        case "vig_hp": player.vigor += bonus.valor; player.baseMaxHp += 50; break;
        case "god_power": player.forca += bonus.valor; player.inteligencia += bonus.valor; break;
    }
     aplicarBonusEquipamentos();
}

function finalizarCapitulo() {
    var cap = gameState.capituloEmAndamento;
    
    // 1. Registra o progresso internamente
    historiaProgresso.capituloAtual = cap.id;
    
    // 2. Garante que o ID vá para a lista de missões concluídas do player
    if (player.missoesConcluidas && !player.missoesConcluidas.includes(cap.id)) {
        player.missoesConcluidas.push(cap.id);
    }
    
    gameState.capituloEmAndamento = null;

    var caminhoTexto = historiaProgresso.caminhoAtual === "heroi" ? "🙏 Herói" : 
                       historiaProgresso.caminhoAtual === "sombrio" ? "💀 Sombrio" : "⚖️ Neutro";

    // 3. Mostra a mensagem visual para o jogador
    mostrarResultado(
        "📖 Capítulo " + cap.id + " Completo!",
        "📖",
        cap.titulo + "\n\nCaminho atual: " + caminhoTexto,
        "Capítulo " + cap.id + "/15 da história concluído!",
        "areaOptions" (saveData)
    );

    log("📖 Capítulo " + cap.id + " concluído e progresso salvo!");
    

    updateUI();
}


// ============================================
// INTEGRAÇÃO DA HISTÓRIA NAS ÁREAS
// ============================================

// Override selecionarArea para verificar capítulo
var _selecionarAreaComHistoria = selecionarArea;
selecionarArea = function(key) {
    _selecionarAreaComHistoria(key);

    // Verificar se há capítulo disponível
    var cap = verificarCapituloDisponivel();
    if (cap) {
        // Mostrar botão de história
        var missaoEl = document.getElementById("missaoDisplay");
        if (missaoEl) {
            var historiaHTML = '<div style="background:rgba(139,92,246,0.15);border:1px solid rgba(139,92,246,0.3);border-radius:8px;padding:10px;margin-bottom:8px;text-align:center;">' +
                '<strong style="color:#a78bfa;">📖 ' + cap.titulo + '</strong><br>' +
                '<small style="color:#94a3b8;">Novo capítulo da história disponível!</small><br>' +
                '<button onclick="abrirHistoria()" style="margin-top:6px;padding:6px 15px;font-size:0.85em;background:linear-gradient(180deg,#7c3aed,#5b21b6);border:1px solid #8b5cf6;color:#e9d5ff;border-radius:6px;cursor:pointer;">📖 Ver Capítulo</button>' +
                '</div>';

            // Preservar missão se existir
            var missaoAtual = missaoEl.innerHTML;
            missaoEl.innerHTML = historiaHTML + missaoAtual;
        }
    }
};

function abrirHistoria() {
    var cap = verificarCapituloDisponivel();
    if (!cap) {
        mostrarNotificacao("📖 Nenhum capítulo disponível nesta área.");
        return;
    }
    mostrarPainel("historiaPanel");
    iniciarCapitulo(cap);
}


// Atualizar atualizarLockAreas para 15 áreas
atualizarLockAreas = function() {
    Object.keys(areas).forEach(function(key) {
        var card = document.getElementById("area-" + key);
        var lock = document.getElementById("lock-" + key);
        if (!card) return;

        if (player.level >= areas[key].min) {
            card.classList.remove("locked");
            if (lock) lock.style.display = "none";
        } else {
            card.classList.add("locked");
            if (lock) lock.style.display = "flex";
        }
    });
};
reviver = function() {
    // Estatísticas
    if (typeof estatisticas !== 'undefined') {
        estatisticas.vezesRevivido++;
    }

    // Penalidade: perde 50% do ouro
    var ouroLost = Math.floor(player.gold * 0.5);
    player.gold -= ouroLost;

    // Revive com 50% HP
    player.hp = Math.floor(player.maxHp * 0.5);

    // Fechar tela de Game Over
    var goScreen = document.getElementById("gameOverScreen");
    if (goScreen) goScreen.style.display = "none";

    // Notificação
    var aviso = "Reviveu! Perdeu " + ouroLost + " ouro.";
    if (typeof cemiterio !== 'undefined' && cemiterio.equipamentoPerdido) {
        aviso += " ⚰️ Vá ao cemitério resgatar seu equipamento!";
    }
    mostrarNotificacao(aviso, 5000);
    log("💀 Reviveu. -" + ouroLost + " ouro.");

    // Verificar conquistas
    if (typeof verificarConquistas === 'function') verificarConquistas();

    // Voltar ao menu
    voltarMenuPrincipal();
    updateUI();
};

// ============================================
// CORREÇÕES v5.1 — Arena, Missões, Masmorra, História
// ============================================


// ══════════════════════════════════════
// FIX 1: ARENA (trava ao entrar)
// ══════════════════════════════════════

entrarArena = function(idx) {
    var entrada = arenaEntradas[idx];
    if (!entrada) { mostrarNotificacao("Erro: entrada inválida."); return; }
    if (player.gold < entrada.custo) { mostrarNotificacao("💰 Insuficiente!"); return; }
    if (player.hp <= 0) { mostrarNotificacao("❤️ Precisa de HP!"); return; }

    player.gold -= entrada.custo;
    arena.emArena = true;
    arena.ondaAtual = 0;
    arenaDificuldade = entrada;

    log("🏟️ Entrou na Arena " + entrada.nome + "! -" + entrada.custo + " ouro.");
    mostrarNotificacao("🏟️ Arena " + entrada.nome + " — Prepare-se!");
    updateUI();

    proximaOndaArena();
};

proximaOndaArena = function() {
    arena.ondaAtual++;

    // Pegar áreas desbloqueadas
    var areasDisponiveis = [];
    Object.keys(areas).forEach(function(k) {
        if (player.level >= areas[k].min && bancoDeMonstros[k] && bancoDeMonstros[k].length > 0) {
            areasDisponiveis.push(k);
        }
    });

    if (areasDisponiveis.length === 0) areasDisponiveis = ["floresta"];

    var areaRandom = randomChoice(areasDisponiveis);
    var monstroBase = randomChoice(bancoDeMonstros[areaRandom]);

    var escalaOnda = 1.0 + arena.ondaAtual * 0.15;
    var mult = arenaDificuldade ? arenaDificuldade.multiplicadorMonstro : 1.0;

    var monstroArena = {
        name: monstroBase.name,
        nomeBase: monstroBase.name,
        emoji: monstroBase.emoji,
        img: monstroBase.img || "",
        hp: Math.floor(monstroBase.hp * escalaOnda * mult),
        atk: Math.floor(monstroBase.atk * escalaOnda * mult),
        def: Math.floor((monstroBase.def || 0) * escalaOnda * mult * 0.8),
        gold: [0, 0],
        xp: Math.floor((monstroBase.xp || 10) * 0.5),
        drops: []
    };

    // Salvar área atual temporariamente para o combate funcionar
    var areaAnterior = gameState.areaAtual;
    gameState.areaAtual = areaRandom;
    gameState.combateOrigem = "arena";

    iniciarCombate(monstroArena, false);

    // Restaurar área
    gameState.areaAtual = areaAnterior || areaRandom;

    addCombatLog("🏟️ ARENA — Onda " + arena.ondaAtual, "critical");
};

finalizarArena = function(motivo) {
    var ondas = arena.ondaAtual || 0;
    arena.emArena = false;

    if (ondas > arena.recordeOndas) {
        arena.recordeOndas = ondas;
        mostrarNotificacao("🏆 NOVO RECORDE: Onda " + ondas + "!", 4000);
    }

    var multRec = arenaDificuldade ? arenaDificuldade.multiplicadorRecompensa : 1;
    var ouroRecompensa = Math.floor(ondas * 20 * multRec);
    var xpRecompensa = Math.floor(ondas * 15 * multRec);
    player.gold += ouroRecompensa;
    ganharExp(xpRecompensa);

    // Gemas a cada 5 ondas
    var gemasGanhas = Math.floor(ondas / 5);
    var gemasTexto = "";
    for (var g = 0; g < gemasGanhas; g++) {
        var tipoGema = randomChoice(["fogo", "gelo", "vida", "fortuna"]);
        if (typeof gemasInventario !== 'undefined') {
            gemasInventario[tipoGema] = (gemasInventario[tipoGema] || 0) + 1;
            gemasTexto += "<br>💎 " + tiposGema[tipoGema].nome;
        }
    }

    arenaDificuldade = null;

    mostrarResultado(
        "🏟️ ARENA — " + motivo,
        motivo === "DERROTA" ? "💀" : "🏆",
        "Sobreviveu " + ondas + " ondas!",
        "💰 +" + ouroRecompensa + " ouro<br>📊 +" + xpRecompensa + " XP" + gemasTexto,
        "menu"
    );

    log("🏟️ Arena: " + ondas + " ondas. +" + ouroRecompensa + "💰 +" + xpRecompensa + " XP.");
    updateUI();
};

fecharArena = function() {
    if (arena.emArena) {
        mostrarNotificacao("⚠️ Abandone a arena primeiro!");
        return;
    }
    mostrarPainel("cidadePanel");
};

abandonarArena = function() {
    finalizarArena("ABANDONOU");
    voltarMenuPrincipal();
};


// ══════════════════════════════════════
// FIX 2: MISSÕES PARA TODAS AS 15 ÁREAS
// ══════════════════════════════════════

bancoDeMissoes = {
    floresta: [
        { id: "f1", titulo: "🐺 Caçada de Lobos", descricao: "Derrote 3 Lobos Cinzentos", tipo: "matar", alvo: "Lobo Cinzento", qtdNecessaria: 3, recompensas: { ouro: 50, xp: 40, item: null } },
        { id: "f2", titulo: "🕷️ Infestação", descricao: "Derrote 3 Aranhas Gigantes", tipo: "matar", alvo: "Aranha Gigante", qtdNecessaria: 3, recompensas: { ouro: 60, xp: 50, item: null } },
        { id: "f3", titulo: "💀 Caça Livre", descricao: "Derrote 5 monstros quaisquer", tipo: "matar_qualquer", alvo: null, qtdNecessaria: 5, recompensas: { ouro: 40, xp: 35, item: null } }
    ],
    pantano: [
        { id: "p1", titulo: "🐸 Praga de Sapos", descricao: "Derrote 3 Sapos Venenosos", tipo: "matar", alvo: "Sapo Venenoso", qtdNecessaria: 3, recompensas: { ouro: 65, xp: 55, item: null } },
        { id: "p2", titulo: "🐊 Caçador do Pântano", descricao: "Derrote 2 Crocodilos Anciões", tipo: "matar", alvo: "Crocodilo Ancião", qtdNecessaria: 2, recompensas: { ouro: 75, xp: 60, item: null } },
        { id: "p3", titulo: "💀 Limpar o Pântano", descricao: "Derrote 5 monstros quaisquer", tipo: "matar_qualquer", alvo: null, qtdNecessaria: 5, recompensas: { ouro: 55, xp: 45, item: null } }
    ],
    colinas: [
        { id: "co1", titulo: "👹 Repelir os Orcs", descricao: "Derrote 3 Orcs Batedores", tipo: "matar", alvo: "Orc Batedor", qtdNecessaria: 3, recompensas: { ouro: 85, xp: 70, item: null } },
        { id: "co2", titulo: "🦅 Caça às Harpias", descricao: "Derrote 3 Harpias", tipo: "matar", alvo: "Harpia", qtdNecessaria: 3, recompensas: { ouro: 90, xp: 75, item: null } },
        { id: "co3", titulo: "💀 Dominar as Colinas", descricao: "Derrote 6 monstros quaisquer", tipo: "matar_qualquer", alvo: null, qtdNecessaria: 6, recompensas: { ouro: 70, xp: 60, item: null } }
    ],
    ruinas: [
        { id: "r1", titulo: "💀 Purgar Mortos-Vivos", descricao: "Derrote 4 Esqueletos Guerreiros", tipo: "matar", alvo: "Esqueleto Guerreiro", qtdNecessaria: 4, recompensas: { ouro: 120, xp: 100, item: null } },
        { id: "r2", titulo: "🗿 Destruir o Golem", descricao: "Derrote 2 Golems de Pedra", tipo: "matar", alvo: "Golem de Pedra", qtdNecessaria: 2, recompensas: { ouro: 150, xp: 120, item: null } },
        { id: "r3", titulo: "⚔️ Caçador das Ruínas", descricao: "Derrote 6 monstros quaisquer", tipo: "matar_qualquer", alvo: null, qtdNecessaria: 6, recompensas: { ouro: 100, xp: 90, item: null } }
    ],
    deserto: [
        { id: "d1", titulo: "🦂 Caça ao Escorpião", descricao: "Derrote 3 Escorpiões Gigantes", tipo: "matar", alvo: "Escorpião Gigante", qtdNecessaria: 3, recompensas: { ouro: 160, xp: 130, item: null } },
        { id: "d2", titulo: "🌪️ Tempestade de Areia", descricao: "Derrote 2 Elementais de Areia", tipo: "matar", alvo: "Elemental de Areia", qtdNecessaria: 2, recompensas: { ouro: 180, xp: 150, item: null } },
        { id: "d3", titulo: "💀 Sobreviver ao Deserto", descricao: "Derrote 7 monstros quaisquer", tipo: "matar_qualquer", alvo: null, qtdNecessaria: 7, recompensas: { ouro: 130, xp: 110, item: null } }
    ],
    cemiterio: [
        { id: "ce1", titulo: "🧟 Exterminar Zumbis", descricao: "Derrote 4 Zumbis Putrefatos", tipo: "matar", alvo: "Zumbi Putrefato", qtdNecessaria: 4, recompensas: { ouro: 170, xp: 140, item: null } },
        { id: "ce2", titulo: "👻 Caça aos Fantasmas", descricao: "Derrote 3 Fantasmas Uivantes", tipo: "matar", alvo: "Fantasma Uivante", qtdNecessaria: 3, recompensas: { ouro: 190, xp: 155, item: null } },
        { id: "ce3", titulo: "💀 Limpar o Cemitério", descricao: "Derrote 7 monstros quaisquer", tipo: "matar_qualquer", alvo: null, qtdNecessaria: 7, recompensas: { ouro: 140, xp: 120, item: null } }
    ],
    caverna: [
        { id: "ca1", titulo: "👹 Caça ao Ogro", descricao: "Derrote 3 Ogros das Cavernas", tipo: "matar", alvo: "Ogro das Cavernas", qtdNecessaria: 3, recompensas: { ouro: 250, xp: 200, item: null } },
        { id: "ca2", titulo: "🪱 Abismo Profundo", descricao: "Derrote 2 Minhocões Abissais", tipo: "matar", alvo: "Minhocão Abissal", qtdNecessaria: 2, recompensas: { ouro: 280, xp: 220, item: null } },
        { id: "ca3", titulo: "💀 Veterano da Caverna", descricao: "Derrote 8 monstros quaisquer", tipo: "matar_qualquer", alvo: null, qtdNecessaria: 8, recompensas: { ouro: 200, xp: 180, item: null } }
    ],
    vulcao: [
        { id: "v1", titulo: "🔥 Caça à Salamandra", descricao: "Derrote 3 Salamandras de Fogo", tipo: "matar", alvo: "Salamandra de Fogo", qtdNecessaria: 3, recompensas: { ouro: 300, xp: 250, item: null } },
        { id: "v2", titulo: "🌋 Conquistar o Vulcão", descricao: "Derrote 8 monstros quaisquer", tipo: "matar_qualquer", alvo: null, qtdNecessaria: 8, recompensas: { ouro: 250, xp: 200, item: null } }
    ],
    geleira: [
        { id: "g1", titulo: "❄️ Caça ao Yeti", descricao: "Derrote 3 Yetis", tipo: "matar", alvo: "Yeti", qtdNecessaria: 3, recompensas: { ouro: 320, xp: 260, item: null } },
        { id: "g2", titulo: "🏔️ Sobreviver ao Gelo", descricao: "Derrote 8 monstros quaisquer", tipo: "matar_qualquer", alvo: null, qtdNecessaria: 8, recompensas: { ouro: 260, xp: 220, item: null } }
    ],
    cidadeFant: [
        { id: "cf1", titulo: "👻 Exorcismo", descricao: "Derrote 4 Espectros Vingativos", tipo: "matar", alvo: "Espectro Vingativo", qtdNecessaria: 4, recompensas: { ouro: 400, xp: 350, item: null } },
        { id: "cf2", titulo: "💀 Limpar a Cidade", descricao: "Derrote 8 monstros quaisquer", tipo: "matar_qualquer", alvo: null, qtdNecessaria: 8, recompensas: { ouro: 320, xp: 280, item: null } }
    ],
    abismo: [
        { id: "ab1", titulo: "👁️ Caça ao Observador", descricao: "Derrote 3 Observadores Abissais", tipo: "matar", alvo: "Observador Abissal", qtdNecessaria: 3, recompensas: { ouro: 500, xp: 420, item: null } },
        { id: "ab2", titulo: "💀 Explorar o Abismo", descricao: "Derrote 9 monstros quaisquer", tipo: "matar_qualquer", alvo: null, qtdNecessaria: 9, recompensas: { ouro: 400, xp: 350, item: null } }
    ],
    castelo: [
        { id: "cs1", titulo: "🖤 Derrubar o Cavaleiro", descricao: "Derrote 3 Cavaleiros Negros", tipo: "matar", alvo: "Cavaleiro Negro", qtdNecessaria: 3, recompensas: { ouro: 550, xp: 460, item: null } },
        { id: "cs2", titulo: "💀 Conquistar o Castelo", descricao: "Derrote 9 monstros quaisquer", tipo: "matar_qualquer", alvo: null, qtdNecessaria: 9, recompensas: { ouro: 450, xp: 380, item: null } }
    ],
    planoAstral: [
        { id: "pa1", titulo: "🌌 Caça Cósmica", descricao: "Derrote 3 Entidades Cósmicas", tipo: "matar", alvo: "Entidade Cósmica", qtdNecessaria: 3, recompensas: { ouro: 650, xp: 550, item: null } },
        { id: "pa2", titulo: "💀 Dominar o Astral", descricao: "Derrote 10 monstros quaisquer", tipo: "matar_qualquer", alvo: null, qtdNecessaria: 10, recompensas: { ouro: 500, xp: 450, item: null } }
    ],
    infernus: [
        { id: "in1", titulo: "😈 Caça Demoníaca", descricao: "Derrote 3 Demônios de Fogo", tipo: "matar", alvo: "Demônio de Fogo", qtdNecessaria: 3, recompensas: { ouro: 750, xp: 620, item: null } },
        { id: "in2", titulo: "💀 Sobreviver ao Inferno", descricao: "Derrote 10 monstros quaisquer", tipo: "matar_qualquer", alvo: null, qtdNecessaria: 10, recompensas: { ouro: 600, xp: 500, item: null } }
    ],
    tronoDeus: [
        { id: "td1", titulo: "⚡ Desafio Divino", descricao: "Derrote 3 Serafins Caídos", tipo: "matar", alvo: "Serafim Caído", qtdNecessaria: 3, recompensas: { ouro: 900, xp: 750, item: null } },
        { id: "td2", titulo: "💀 Conquistar o Trono", descricao: "Derrote 10 monstros quaisquer", tipo: "matar_qualquer", alvo: null, qtdNecessaria: 10, recompensas: { ouro: 700, xp: 600, item: null } }
    ]
};


// ══════════════════════════════════════
// FIX 3: MASMORRA — completar dá ouro em TODAS as áreas
// ══════════════════════════════════════

completarMasmorra = function() {
    gameState.emMasmorra = false;

    var areaKey = gameState.areaAtual || "floresta";
    var area = areas[areaKey] || { nome: "Desconhecida", tier: 1 };

    // Ouro baseado no TIER da área (funciona para todas as 15)
    var tier = area.tier || 1;
    var ouroBase = 50 + (tier - 1) * 80;
    var ouro = randomInt(ouroBase, ouroBase * 2);
    player.gold += ouro;

    // XP bônus
    var xpBonus = 50 + (tier - 1) * 60;
    ganharExp(xpBonus);

    // Estatísticas
    if (typeof estatisticas !== 'undefined') {
        estatisticas.masmorrasCompletas++;
    }

    // Missões
    if (typeof verificarProgressoMissao === 'function') {
        verificarProgressoMissao("masmorra_completa", { area: areaKey });
    }

    // Conquistas
    if (typeof verificarConquistas === 'function') {
        verificarConquistas();
    }

    mostrarResultado(
        "🏰 MASMORRA COMPLETA!",
        "🎊",
        "Conquistou a masmorra de " + area.nome + "!",
        "🏆 +" + ouro + " ouro<br>📊 +" + xpBonus + " XP bônus!",
        "areaOptions"
    );

    log("🏰 Masmorra de " + area.nome + " completa! +" + ouro + "💰 +" + xpBonus + " XP!");
    resetarBotaoAvancar();
    updateUI();
};


// ══════════════════════════════════════
// FIX 4: HISTÓRIA — verificação correta para todas as áreas
// ══════════════════════════════════════

verificarCapituloDisponivel = function() {
    var areaKey = gameState.areaAtual;
    if (!areaKey) return null;

    var area = areas[areaKey];
    if (!area || !area.capitulo) return null;

    var capId = area.capitulo;

    // Já viu este capítulo
    if (historiaProgresso.capituloAtual >= capId) return null;

    // Precisa ter visto o capítulo anterior (exceto o primeiro)
    if (capId > 1 && historiaProgresso.capituloAtual < capId - 1) return null;

    // Buscar o capítulo no array
    var capitulo = null;
    for (var i = 0; i < capitulos.length; i++) {
        if (capitulos[i].id === capId) {
            capitulo = capitulos[i];
            break;
        }
    }

    return capitulo;
};

// Fix: selecionarArea mostra botão de história corretamente
selecionarArea = function(key) {
    var area = areas[key];
    if (!area) {
        mostrarNotificacao("⚠️ Área não encontrada!");
        return;
    }

    if (player.level < area.min) {
        mostrarNotificacao("🔒 Precisa de nível " + area.min + "!");
        return;
    }

    gameState.areaAtual = key;
    document.getElementById("areaOptionsTitle").textContent = area.nome;
    document.getElementById("areaOptionsDescription").textContent = area.descricao;

    // Atualizar missão display
    if (typeof atualizarUIMissao === 'function') atualizarUIMissao();

    // Verificar capítulo disponível
    var cap = verificarCapituloDisponivel();
    var missaoEl = document.getElementById("missaoDisplay");
    if (missaoEl && cap) {
        var historiaHTML = '<div style="background:rgba(139,92,246,0.15);border:1px solid rgba(139,92,246,0.3);border-radius:8px;padding:10px;margin-bottom:8px;text-align:center;">' +
            '<strong style="color:#a78bfa;">📖 ' + cap.titulo + '</strong><br>' +
            '<small style="color:#94a3b8;">Novo capítulo da história disponível!</small><br>' +
            '<button onclick="abrirHistoria()" style="margin-top:6px;padding:6px 15px;font-size:0.85em;background:linear-gradient(180deg,#7c3aed,#5b21b6);border:1px solid #8b5cf6;color:#e9d5ff;border-radius:6px;cursor:pointer;">📖 Ver Capítulo</button>' +
            '</div>';

        // Adicionar história ANTES do conteúdo de missão existente
        var missaoAtual = missaoEl.innerHTML;
        missaoEl.innerHTML = historiaHTML + missaoAtual;
    }

    mostrarPainel("areaOptionsPanel");
    log("Chegou em " + area.nome + ".");
};


// ══════════════════════════════════════
// FIX 5: VITÓRIA — arena funciona corretamente
// ══════════════════════════════════════

vitoriaCombate = function() {
    gameState.emCombate = false;

    // Som
    if (typeof tocarSom === 'function') tocarSom("vitoria");

    addCombatLog("🎉 " + monster.name + " derrotado!", "critical");

    // Estatísticas
    if (typeof estatisticas !== 'undefined') {
        estatisticas.monstrosDerrotados++;
        if (monster.isElite) estatisticas.elitesDerrotados++;
        if (monster.isBoss) estatisticas.bossesDerrotados++;
    }
// Progresso da guilda
    progressoMissaoGuilda("monstros", 1);
    if (monster.isElite) progressoMissaoGuilda("elites", 1);
    if (monster.isBoss) progressoMissaoGuilda("bosses", 1);
    progressoMissaoGuilda("ouro", ouro);

    // Drop de gemas em elites e bosses
    if ((monster.isElite || monster.isBoss) && typeof gemasInventario !== 'undefined') {
        var chanceGema = monster.isBoss ? 0.80 : 0.30;
        if (Math.random() < chanceGema) {
            var tipoGema = randomChoice(["fogo", "gelo", "vida", "fortuna"]);
            gemasInventario[tipoGema] = (gemasInventario[tipoGema] || 0) + 1;
            addCombatLog("💎 Obteve " + tiposGema[tipoGema].nome + "!", "critical");
        }
    }

    // ── ARENA: fluxo especial ──
    if (gameState.combateOrigem === "arena") {
        mostrarNotificacao("🏟️ Onda " + arena.ondaAtual + " completa!");
        setTimeout(function() {
            proximaOndaArena();
        }, 1000);
        return;
    }

    // ── FLUXO NORMAL ──
    var gMin = monster.gold ? monster.gold[0] : 5;
    var gMax = monster.gold ? monster.gold[1] : 15;
    var bonusOuro = typeof calcularBonusOuro === 'function' ? calcularBonusOuro() : 1;
    var ouro = Math.floor(randomInt(gMin, gMax) * bonusOuro);
    var xp = monster.xp || 10;

    // Drops
    var dropsTexto = "";
    if (monster.drops && monster.drops.length > 0) {
        var bonusDrop = typeof calcularBonusDrop === 'function' ? calcularBonusDrop() : 0;
        monster.drops.forEach(function(d) {
            if (Math.random() < Math.min(0.95, d.chance + bonusDrop)) {
                var extras = { precoVenda: d.precoVenda || 5 };
                if (d.consumivel && d.efeito) {
                    extras.tipo = "consumivel";
                    extras.efeito = d.efeito;
                    extras.descricao = d.efeito.tipo === "cura" ? "Restaura " + d.efeito.valor + " HP" : "+" + d.efeito.valor;
                } else {
                    // >>> MARCA COMO MATERIAL PARA A ALQUIMIA <<<
                    extras.tipo = "material";
                }
                adicionarItemInventario(d.item, d.icone, 1, extras);
                dropsTexto += "<br>" + d.icone + " " + d.item;
            }
        });
    }

    // Drop de equipamento por classe
    if (typeof tentarDropEquipamento === 'function') {
        var equipDrop = tentarDropEquipamento(monster.isElite, monster.isBoss);
        if (equipDrop) {
            adicionarItemInventario(equipDrop.nome, equipDrop.icone, 1, {
                tipo: "equipamento", slot: equipDrop.slot,
                descricao: "Dropado de " + monster.name,
                stats: equipDrop.stats, preco: equipDrop.preco, precoVenda: equipDrop.precoVenda
            });
            dropsTexto += "<br>🎁 " + equipDrop.icone + " " + equipDrop.nome;
            if (typeof tocarSom === 'function') tocarSom("tesouro");
        }
    }

    player.gold += ouro;
    if (typeof estatisticas !== 'undefined') estatisticas.ourolTotal += ouro;

    // Missões
    if (typeof verificarProgressoMissao === 'function') {
        var nomeParaMissao = monster.nomeBase || monster.name;
        verificarProgressoMissao("monstro_derrotado", { nome: nomeParaMissao });
    }

    // Conquistas
    if (typeof verificarConquistas === 'function') verificarConquistas();

    // XP
    ganharExp(xp);

    // Resultado
    var eliteTag = monster.isElite ? " <span style='color:#fbbf24;'>(ELITE)</span>" : "";
    var rewardsHTML = "📊 XP: +" + xp + eliteTag + "<br>💰 Ouro: +" + ouro + dropsTexto;

    var retorno = "areaOptions";
    if (gameState.combateOrigem === "masmorra") retorno = "dungeon";
    else if (gameState.combateOrigem === "masmorraBoss") retorno = "dungeonComplete";

    setTimeout(function() {
        mostrarResultado(
            monster.isBoss ? "👑 CHEFE DERROTADO!" : (monster.isElite ? "🔥 ELITE!" : "⚔️ VITÓRIA!"),
            "🏆",
            "Derrotou " + monster.name + "!",
            rewardsHTML,
            retorno
        );
    }, 500);

    log("🎉 " + monster.name + " derrotado! +" + ouro + "💰 +" + xp + " XP.");
};


// ══════════════════════════════════════
// FIX 6: PEGAR MISSÃO — funciona em todas as áreas
// ══════════════════════════════════════

pegarMissao = function() {
    if (sistemaMissoes.missaoAtiva) {
        mostrarNotificacao("⚠️ Já tem uma missão ativa!");
        return;
    }

    var areaKey = gameState.areaAtual;
    if (!areaKey) {
        mostrarNotificacao("⚠️ Vá a uma área primeiro!");
        return;
    }

    var lista = bancoDeMissoes[areaKey];
    if (!lista || lista.length === 0) {
        mostrarNotificacao("⚠️ Sem missões para esta área.");
        log("Sem missões disponíveis para " + (areas[areaKey] ? areas[areaKey].nome : areaKey));
        return;
    }

    var m = randomChoice(lista);
    sistemaMissoes.missaoAtiva = {
        id: m.id, titulo: m.titulo, descricao: m.descricao,
        tipo: m.tipo, alvo: m.alvo,
        qtdNecessaria: m.qtdNecessaria, qtdAtual: 0,
        recompensas: m.recompensas, area: areaKey
    };

    mostrarNotificacao("📜 Missão: " + m.titulo);
    log("📜 MISSÃO: " + m.titulo + " — " + m.descricao);
    atualizarUIMissao();
};


// ══════════════════════════════════════
// FIX 7: INICIAR COMBATE — garantir que gameState.areaAtual existe
// ══════════════════════════════════════

var _iniciarCombateFix = iniciarCombate;
iniciarCombate = function(monstroBase, isBoss) {
    // Garantir que temos uma área válida
    if (!gameState.areaAtual) {
        gameState.areaAtual = "floresta";
    }

    // Garantir que a área existe no objeto areas
    if (!areas[gameState.areaAtual]) {
        gameState.areaAtual = "floresta";
    }

    _iniciarCombateFix(monstroBase, isBoss);
};

// ============================================
// CORREÇÕES v5.2 — Escalonamento + História
// ============================================


// ══════════════════════════════════════
// FIX 1: ESCALONAMENTO DE MONSTROS (reforçado)
// ══════════════════════════════════════

calcularEscalamento = function(areaKey, isBoss) {
    var area = areas[areaKey];
    if (!area) return { hp: 1, atk: 1, def: 1, gold: 1, xp: 1 };

    var nv = player.level;
    var minArea = area.min;
    var niveisAcima = Math.max(0, nv - minArea);

    // Escala GLOBAL: +8% por nível do jogador
    var global = 1 + (nv - 1) * 0.08;

    // Escala por ÁREA: quanto mais acima do mínimo, mais forte
    var areaHP  = 1 + niveisAcima * 0.18;
    var areaATK = 1 + niveisAcima * 0.15;
    var areaDEF = 1 + niveisAcima * 0.10;

    // Combinar
    var escalaHP  = global * areaHP;
    var escalaATK = global * areaATK;
    var escalaDEF = global * areaDEF;

    // Gold e XP
    var escalaGold = 1 + niveisAcima * 0.10;
    var escalaXP = Math.max(0.5, 1 - niveisAcima * 0.02);

    // Boss: escala mais agressiva
    if (isBoss) {
        escalaHP  *= 1.5;
        escalaATK *= 1.3;
        escalaDEF *= 1.2;
        escalaGold *= 1.5;
        escalaXP = Math.max(0.8, escalaXP * 1.2);
    }

    // Garantir mínimo razoável
    escalaHP  = Math.max(1.0, escalaHP);
    escalaATK = Math.max(1.0, escalaATK);
    escalaDEF = Math.max(1.0, escalaDEF);

    return {
        hp: escalaHP,
        atk: escalaATK,
        def: escalaDEF,
        gold: escalaGold,
        xp: escalaXP
    };
};


// ══════════════════════════════════════
// FIX 2: INICIAR COMBATE com escalonamento GARANTIDO
// ══════════════════════════════════════

iniciarCombate = function(monstroBase, isBoss) {
    gameState.emCombate = true;
    gameState.monstroIsBoss = isBoss;

    // Garantir área válida
    if (!gameState.areaAtual || !areas[gameState.areaAtual]) {
        gameState.areaAtual = "floresta";
    }

    // ── CALCULAR ESCALA ──
    var escala = calcularEscalamento(gameState.areaAtual, isBoss);

    // ── CRIAR MONSTRO ESCALADO ──
    var hpBase = monstroBase.hp || 30;
    var atkBase = monstroBase.atk || 8;
    var defBase = monstroBase.def || 3;

    var hpFinal  = Math.max(10, Math.floor(hpBase * escala.hp));
    var atkFinal = Math.max(3, Math.floor(atkBase * escala.atk));
    var defFinal = Math.max(1, Math.floor(defBase * escala.def));

    // Gold escalado
    var goldArr = monstroBase.gold || [5, 15];
    var goldMin = Math.max(1, Math.floor(goldArr[0] * escala.gold));
    var goldMax = Math.max(goldMin + 1, Math.floor(goldArr[1] * escala.gold));

    // XP escalado
    var xpFinal = Math.max(5, Math.floor((monstroBase.xp || 10) * escala.xp));

    // Nível visual do monstro
    var nivelVisual = Math.max(1, areas[gameState.areaAtual].min + Math.floor((atkFinal + defFinal) / 8));

    monster = {
        name: monstroBase.name || "Monstro",
        nomeBase: monstroBase.nomeBase || monstroBase.name || "Monstro",
        emoji: monstroBase.emoji || "👹",
        img: monstroBase.img || "",
        hp: hpFinal,
        maxHp: hpFinal,
        atk: atkFinal,
        def: defFinal,
        gold: [goldMin, goldMax],
        xp: xpFinal,
        drops: monstroBase.drops || [],
        isBoss: isBoss,
        isElite: monstroBase.isElite || false,
        eliteMod: monstroBase.eliteMod || null,
        nivel: nivelVisual
    };

    player.defendendo = false;
    player.habilidadeCooldown = Math.max(0, player.habilidadeCooldown);
    mostrarPainel("monsterArea");

    // ── UI DO MONSTRO ──
    var me = document.getElementById("monsterEmoji");
    var mi = document.getElementById("monsterImage");
    if (me) me.textContent = monster.emoji;

    var nomeDisplay = (isBoss ? "👑 " : "") + (monster.isElite ? "🔥 " : "") + monster.name;
    document.getElementById("monsterName").textContent = nomeDisplay;

    if (mi && monster.img && monster.img !== "") {
        mi.src = monster.img;
        mi.style.display = "block";
        mi.onerror = function() { this.style.display = "none"; };
    } else if (mi) {
        mi.style.display = "none";
    }

    document.getElementById("monsterHpText").textContent = monster.hp + "/" + monster.maxHp;
    var ma = document.getElementById("monsterAtkUI"); if (ma) ma.textContent = monster.atk;
    var md = document.getElementById("monsterDefUI"); if (md) md.textContent = monster.def;
    atualizarBarraMonstro();

    var cl = document.getElementById("combatLog"); if (cl) cl.innerHTML = "";

    addCombatLog("⚔️ " + monster.name + " (Nv." + monster.nivel + ") apareceu!", "info");
    if (isBoss) addCombatLog("👑 É um CHEFE!", "critical");
    if (monster.isElite) addCombatLog("🔥 Monstro ELITE!", "critical");
    addCombatLog("❤️ " + monster.hp + " | ⚡ " + monster.atk + " | 🛡️ " + monster.def, "info");

    // Dificuldade relativa
    var razao = monster.atk / Math.max(1, player.def + player.atk * 0.5);
    var dif = razao > 2.0 ? "☠️ MORTAL" : razao > 1.2 ? "🔴 Difícil" : razao > 0.7 ? "🟡 Moderado" : "🟢 Fácil";
    addCombatLog("Dificuldade: " + dif, "info");

    log("Combate: " + monster.name + " (Nv." + monster.nivel + ") HP:" + monster.hp + " ATK:" + monster.atk + " DEF:" + monster.def);

    // Som
    if (typeof tocarSom === 'function') {
        if (isBoss) tocarSom("bossApareceu");
        else if (monster.isElite) tocarSom("eliteApareceu");
        else tocarSom("combateInicio");
    }

    if (typeof atualizarBotaoHabilidade === 'function') atualizarBotaoHabilidade();
    habilitarBotoesCombate(true);
};


// ══════════════════════════════════════
// FIX 3: HISTÓRIA — funciona para TODAS as 15 áreas
// ══════════════════════════════════════

verificarCapituloDisponivel = function() {
    var areaKey = gameState.areaAtual;
    if (!areaKey) return null;

    var area = areas[areaKey];
    if (!area || !area.capitulo) return null;

    var capId = area.capitulo;

    // Já viu este capítulo
    if (historiaProgresso.capituloAtual >= capId) return null;

    // O próximo capítulo disponível é capituloAtual + 1
    // Se esta área tem o capítulo correto, mostrar
    if (capId !== historiaProgresso.capituloAtual + 1) return null;

    // Buscar o capítulo no array
    for (var i = 0; i < capitulos.length; i++) {
        if (capitulos[i].id === capId) {
            return capitulos[i];
        }
    }

    return null;
};

// Garantir que finalizarCapitulo avança corretamente
finalizarCapitulo = function() {
    var cap = gameState.capituloEmAndamento;
    if (!cap) return;

    historiaProgresso.capituloAtual = cap.id;
    gameState.capituloEmAndamento = null;

    var caminhoTexto = historiaProgresso.caminhoAtual === "heroi" ? "🙏 Herói" :
                       historiaProgresso.caminhoAtual === "sombrio" ? "💀 Sombrio" : "⚖️ Neutro";

    mostrarResultado(
        "📖 Capítulo " + cap.id + " Completo!",
        "📖",
        cap.titulo + "\n\nCaminho: " + caminhoTexto,
        "Capítulo " + cap.id + "/15 concluído!",
        "areaOptions"
      
    );

    log("📖 Capítulo " + cap.id + " '" + cap.titulo + "' — " + caminhoTexto);

};

// Fix: selecionarArea com verificação de história robusta
selecionarArea = function(key) {
    var area = areas[key];
    if (!area) {
        mostrarNotificacao("⚠️ Área não encontrada!");
        return;
    }

    if (player.level < area.min) {
        mostrarNotificacao("🔒 Precisa de nível " + area.min + "!");
        return;
    }

    gameState.areaAtual = key;

    var tituloEl = document.getElementById("areaOptionsTitle");
    var descEl = document.getElementById("areaOptionsDescription");
    if (tituloEl) tituloEl.textContent = area.nome;
    if (descEl) descEl.textContent = area.descricao;

    // Limpar missão display primeiro
    var missaoEl = document.getElementById("missaoDisplay");
    if (missaoEl) missaoEl.innerHTML = "";

    // Verificar capítulo disponível
    var cap = verificarCapituloDisponivel();
    if (cap && missaoEl) {
        missaoEl.innerHTML = '<div style="background:rgba(139,92,246,0.15);border:1px solid rgba(139,92,246,0.3);border-radius:8px;padding:10px;margin-bottom:8px;text-align:center;">' +
            '<strong style="color:#a78bfa;">📖 ' + cap.titulo + '</strong><br>' +
            '<small style="color:#94a3b8;">Capítulo ' + cap.id + '/15 — Novo capítulo disponível!</small><br>' +
            '<button onclick="abrirHistoria()" style="margin-top:6px;padding:6px 15px;font-size:0.85em;background:linear-gradient(180deg,#7c3aed,#5b21b6);border:1px solid #8b5cf6;color:#e9d5ff;border-radius:6px;cursor:pointer;">📖 Ver Capítulo</button>' +
            '</div>';
    }

    // Atualizar missão ativa (adicionar DEPOIS da história)
    if (typeof atualizarUIMissao === 'function') {
        // Salvar HTML da história
        var historiaHTML = missaoEl ? missaoEl.innerHTML : "";
        atualizarUIMissao();
        // Prepend história antes da missão
        if (missaoEl && historiaHTML) {
            missaoEl.innerHTML = historiaHTML + missaoEl.innerHTML;
        }
    }

    mostrarPainel("areaOptionsPanel");
    log("Chegou em " + area.nome + ".");
};
function trocarAbaTalento(idAba) {
    // 1. Esconde todos os conteúdos
    const conteudos = document.querySelectorAll('.aba-talento');
    conteudos.forEach(div => div.style.display = 'none');

    // 2. Remove a classe 'active-tab' de todos os botões
    const botoes = document.querySelectorAll('.shop-tab');
    botoes.forEach(btn => btn.classList.remove('active-tab'));

    // 3. Mostra o conteúdo certo
    const abaAlvo = document.getElementById(idAba);
    if (abaAlvo) {
        abaAlvo.style.display = 'block';
    }

    // 4. Destaca o botão clicado (Opcional, mas fica bonito)
    // Procuramos o botão que tem o onclick com o nome da aba
    const botaoAtivo = Array.from(botoes).find(btn => btn.getAttribute('onclick').includes(idAba));
    if (botaoAtivo) botaoAtivo.classList.add('active-tab');
}
// ============================================
// SISTEMA DE STATUS / DEBUFFS
// ============================================

var statusJogador = [];
var statusMonstro = [];

var tiposStatus = {
    queimando:   { nome: "🔥 Queimando",    duracao: 3, tipo: "dano",  valorBase: 0.05, desc: "Perde 5% HP/turno" },
    envenenado:  { nome: "☠️ Envenenado",    duracao: 4, tipo: "dano",  valorBase: 0.03, desc: "Perde 3% HP/turno" },
    sangramento: { nome: "🩸 Sangramento",   duracao: 3, tipo: "dano",  valorBase: 0.04, desc: "Perde 4% HP/turno (ignora DEF)" },
    congelado:   { nome: "🧊 Congelado",     duracao: 1, tipo: "pular", valorBase: 0,    desc: "Perde 1 turno" },
    atordoado:   { nome: "😵 Atordoado",     duracao: 1, tipo: "pular", valorBase: 0,    desc: "Perde 1 turno" },
    medo:        { nome: "😨 Medo",          duracao: 3, tipo: "debuff",valorBase: 0.25,  desc: "-25% ATK" },
    fortificado: { nome: "🛡️ Fortificado",   duracao: 2, tipo: "buff",  valorBase: 0.30,  desc: "+30% DEF" },
    acelerado:   { nome: "⚡ Acelerado",     duracao: 2, tipo: "buff",  valorBase: 0,     desc: "Ataque duplo" },
    regenerando: { nome: "💚 Regenerando",   duracao: 3, tipo: "cura",  valorBase: 0.05, desc: "Recupera 5% HP/turno" },
    fraqueza:    { nome: "💔 Fraqueza",      duracao: 3, tipo: "debuff",valorBase: 0.20,  desc: "-20% ATK" }
};

function aplicarStatus(alvo, tipoStatus, origem) {
    var lista = alvo === "jogador" ? statusJogador : statusMonstro;
    var info = tiposStatus[tipoStatus];
    if (!info) return;

    // Verificar se já tem este status
    var existente = lista.find(function(s) { return s.tipo === tipoStatus; });
    if (existente) {
        existente.turnosRestantes = info.duracao; // Resetar duração
        return;
    }

    lista.push({
        tipo: tipoStatus,
        nome: info.nome,
        turnosRestantes: info.duracao,
        tipoEfeito: info.tipo,
        valor: info.valorBase
    });

    var alvoNome = alvo === "jogador" ? player.nome : monster.name;
    addCombatLog(info.nome + " aplicado em " + alvoNome + "! (" + info.duracao + " turnos)", "info");
}

function processarStatus(alvo) {
    var lista = alvo === "jogador" ? statusJogador : statusMonstro;
    var entidade = alvo === "jogador" ? player : monster;
    if (!entidade || lista.length === 0) return;

    var pulaTurno = false;

    // Processar cada status
    for (var i = lista.length - 1; i >= 0; i--) {
        var s = lista[i];
        var info = tiposStatus[s.tipo];

        switch (s.tipoEfeito) {
            case "dano":
                var maxHp = alvo === "jogador" ? player.maxHp : monster.maxHp;
                var dano = Math.max(1, Math.floor(maxHp * s.valor));
                if (alvo === "jogador") {
                    player.hp = Math.max(0, player.hp - dano);
                    addCombatLog(s.nome + ": -" + dano + " HP!", "enemy");
                } else {
                    monster.hp = Math.max(0, monster.hp - dano);
                    addCombatLog(s.nome + " em " + monster.name + ": -" + dano + " HP!", "player");
                }
                break;

            case "cura":
                var maxHpC = alvo === "jogador" ? player.maxHp : monster.maxHp;
                var cura = Math.max(1, Math.floor(maxHpC * s.valor));
                if (alvo === "jogador") {
                    player.hp = Math.min(player.maxHp, player.hp + cura);
                    addCombatLog(s.nome + ": +" + cura + " HP!", "heal");
                } else {
                    monster.hp = Math.min(monster.maxHp, monster.hp + cura);
                    addCombatLog(s.nome + " em " + monster.name + ": +" + cura + " HP!", "enemy");
                }
                break;

            case "pular":
                pulaTurno = true;
                addCombatLog(s.nome + ": turno perdido!", alvo === "jogador" ? "enemy" : "player");
                break;
        }

        // Reduzir duração
        s.turnosRestantes--;
        if (s.turnosRestantes <= 0) {
            addCombatLog(s.nome + " acabou.", "info");
            lista.splice(i, 1);
        }
    }

    if (alvo === "jogador") updateUI();
    if (alvo === "monstro" && monster) {
        document.getElementById("monsterHpText").textContent = monster.hp + "/" + monster.maxHp;
        atualizarBarraMonstro();
    }

    return pulaTurno;
}

function getModificadorStatus(alvo, stat) {
    var lista = alvo === "jogador" ? statusJogador : statusMonstro;
    var mod = 1.0;

    lista.forEach(function(s) {
        if (stat === "atk") {
            if (s.tipo === "medo") mod -= s.valor;
            if (s.tipo === "fraqueza") mod -= s.valor;
        }
        if (stat === "def") {
            if (s.tipo === "fortificado") mod += s.valor;
        }
    });

    return Math.max(0.1, mod);
}

function temStatus(alvo, tipoStatus) {
    var lista = alvo === "jogador" ? statusJogador : statusMonstro;
    return lista.some(function(s) { return s.tipo === tipoStatus; });
}

function limparTodosStatus() {
    statusJogador = [];
    statusMonstro = [];
}

function renderizarStatusUI() {
    // Status do jogador (mostrar no combate)
    var statusTexto = "";
    statusJogador.forEach(function(s) {
        statusTexto += '<span style="font-size:0.75em;padding:2px 5px;margin:1px;display:inline-block;background:rgba(0,0,0,0.3);border-radius:4px;">' + s.nome + '(' + s.turnosRestantes + ')</span> ';
    });

    // Status do monstro
    var statusMonstroTexto = "";
    statusMonstro.forEach(function(s) {
        statusMonstroTexto += '<span style="font-size:0.75em;padding:2px 5px;margin:1px;display:inline-block;background:rgba(0,0,0,0.3);border-radius:4px;">' + s.nome + '(' + s.turnosRestantes + ')</span> ';
    });

    // Atualizar UI (adicionar após barras de HP)
    var monsterInfo = document.getElementById("monsterInfo");
    var statusDiv = document.getElementById("monsterStatusDisplay");
    if (!statusDiv && monsterInfo) {
        statusDiv = document.createElement("div");
        statusDiv.id = "monsterStatusDisplay";
        statusDiv.style.cssText = "margin-top:5px;text-align:center;min-height:20px;";
        monsterInfo.appendChild(statusDiv);
    }
    if (statusDiv) statusDiv.innerHTML = statusMonstroTexto;

    var playerStatusDiv = document.getElementById("playerStatusDisplay");
    if (!playerStatusDiv) {
        var playerDiv = document.getElementById("player");
        if (playerDiv) {
            playerStatusDiv = document.createElement("div");
            playerStatusDiv.id = "playerStatusDisplay";
            playerStatusDiv.style.cssText = "margin-top:5px;min-height:20px;";
            playerDiv.appendChild(playerStatusDiv);
        }
    }
    if (playerStatusDiv) playerStatusDiv.innerHTML = statusTexto;
}

// ============================================
// IA DOS MONSTROS — Padrões de Comportamento
// ============================================

/*
  Tipos de ação:
  "atacar"        → Ataque normal
  "atacar_forte"  → Ataque ×1.8 dano
  "defender"      → Ganha 50% DEF neste turno
  "buff"          → Se fortalece (+ATK temporário)
  "curar"         → Recupera 10-20% HP
  "especial"      → Ataque com chance de status
  "status_atk"    → Ataque + aplica status no jogador
*/

var iaMonstroPadroes = {
    // ── TIER 1 ──
    "Lobo Cinzento":      { padrao: ["atacar", "atacar", "atacar_forte"], chanceStatus: 0, status: null },
    "Goblin Explorador":  { padrao: ["atacar", "atacar", "especial"], chanceStatus: 0.15, status: "fraqueza" },
    "Aranha Gigante":     { padrao: ["atacar", "status_atk", "atacar"], chanceStatus: 0.25, status: "envenenado" },
    "Javali Selvagem":    { padrao: ["atacar", "atacar", "atacar_forte", "defender"], chanceStatus: 0, status: null },
    "Sapo Venenoso":      { padrao: ["atacar", "status_atk", "atacar", "especial"], chanceStatus: 0.30, status: "envenenado" },
    "Cobra d'Água":       { padrao: ["atacar", "atacar", "status_atk"], chanceStatus: 0.25, status: "envenenado" },
    "Crocodilo Ancião":   { padrao: ["defender", "atacar_forte", "atacar", "atacar"], chanceStatus: 0.15, status: "sangramento" },
    "Planta Carnívora":   { padrao: ["atacar", "defender", "atacar", "status_atk"], chanceStatus: 0.20, status: "envenenado" },
    "Orc Batedor":        { padrao: ["atacar", "atacar", "buff", "atacar_forte"], chanceStatus: 0, status: null },
    "Harpia":             { padrao: ["atacar", "atacar_forte", "atacar", "especial"], chanceStatus: 0.15, status: "medo" },
    "Centauro Selvagem":  { padrao: ["atacar", "atacar", "defender", "atacar_forte"], chanceStatus: 0, status: null },
    "Warg Sombrio":       { padrao: ["atacar", "atacar", "atacar", "atacar_forte"], chanceStatus: 0.10, status: "sangramento" },

    // ── TIER 2 ──
    "Esqueleto Guerreiro":  { padrao: ["atacar", "defender", "atacar_forte", "atacar"], chanceStatus: 0, status: null },
    "Golem de Pedra":       { padrao: ["defender", "defender", "atacar_forte", "atacar_forte"], chanceStatus: 0, status: null },
    "Cavaleiro Caído":      { padrao: ["atacar", "defender", "atacar_forte", "buff", "atacar_forte"], chanceStatus: 0.10, status: "medo" },
    "Múmia Guardiã":        { padrao: ["atacar", "status_atk", "atacar", "curar"], chanceStatus: 0.25, status: "fraqueza" },
    "Escorpião Gigante":    { padrao: ["atacar", "atacar", "status_atk", "atacar_forte"], chanceStatus: 0.30, status: "envenenado" },
    "Serpente de Areia":    { padrao: ["atacar", "status_atk", "atacar_forte", "atacar"], chanceStatus: 0.30, status: "envenenado" },
    "Elemental de Areia":   { padrao: ["atacar", "defender", "atacar_forte", "especial"], chanceStatus: 0.15, status: "atordoado" },
    "Nômade Corrompido":    { padrao: ["atacar", "buff", "atacar_forte", "atacar", "atacar"], chanceStatus: 0.10, status: "sangramento" },
    "Zumbi Putrefato":      { padrao: ["atacar", "atacar", "status_atk", "atacar"], chanceStatus: 0.25, status: "envenenado" },
    "Fantasma Uivante":     { padrao: ["status_atk", "atacar", "atacar_forte", "especial"], chanceStatus: 0.20, status: "medo" },
    "Necromante Aprendiz":  { padrao: ["atacar", "buff", "atacar_forte", "curar", "atacar"], chanceStatus: 0.20, status: "fraqueza" },
    "Carniçal":             { padrao: ["atacar", "atacar", "atacar_forte", "status_atk"], chanceStatus: 0.20, status: "sangramento" },

    // ── TIER 3 ──
    "Ogro das Cavernas":    { padrao: ["atacar", "atacar", "atacar_forte", "atacar_forte", "defender"], chanceStatus: 0.10, status: "atordoado" },
    "Elemental de Terra":   { padrao: ["defender", "atacar", "defender", "atacar_forte", "atacar_forte"], chanceStatus: 0.10, status: "atordoado" },
    "Aranha Rainha":        { padrao: ["status_atk", "atacar", "atacar", "status_atk", "atacar_forte"], chanceStatus: 0.35, status: "envenenado" },
    "Minhocão Abissal":     { padrao: ["atacar", "defender", "atacar_forte", "atacar", "curar"], chanceStatus: 0.15, status: "envenenado" },
    "Salamandra de Fogo":   { padrao: ["atacar", "status_atk", "atacar_forte", "atacar"], chanceStatus: 0.30, status: "queimando" },
    "Golem de Lava":        { padrao: ["defender", "defender", "atacar_forte", "status_atk", "atacar_forte"], chanceStatus: 0.25, status: "queimando" },
    "Fênix Sombria":        { padrao: ["atacar", "status_atk", "atacar_forte", "curar", "atacar"], chanceStatus: 0.30, status: "queimando" },
    "Diabo Menor":          { padrao: ["atacar", "buff", "atacar_forte", "status_atk", "atacar"], chanceStatus: 0.25, status: "queimando" },
    "Yeti":                 { padrao: ["atacar", "atacar_forte", "defender", "atacar", "status_atk"], chanceStatus: 0.20, status: "congelado" },
    "Elemental de Gelo":    { padrao: ["atacar", "status_atk", "defender", "atacar_forte"], chanceStatus: 0.30, status: "congelado" },
    "Lobo do Inverno":      { padrao: ["atacar", "atacar", "atacar_forte", "status_atk"], chanceStatus: 0.20, status: "congelado" },
    "Gigante de Gelo":      { padrao: ["defender", "atacar_forte", "atacar_forte", "status_atk", "curar"], chanceStatus: 0.25, status: "congelado" },

    // ── TIER 4 ──
    "Espectro Vingativo":   { padrao: ["status_atk", "atacar", "atacar_forte", "especial", "atacar"], chanceStatus: 0.30, status: "medo" },
    "Vampiro Nobre":        { padrao: ["atacar", "atacar_forte", "curar", "atacar", "status_atk"], chanceStatus: 0.25, status: "sangramento" },
    "Banshee":              { padrao: ["status_atk", "status_atk", "atacar_forte", "atacar", "especial"], chanceStatus: 0.35, status: "medo" },
    "Ceifador":             { padrao: ["atacar", "atacar_forte", "buff", "atacar_forte", "status_atk", "atacar_forte"], chanceStatus: 0.20, status: "sangramento" },
    "Observador Abissal":   { padrao: ["status_atk", "atacar", "especial", "atacar_forte", "atacar"], chanceStatus: 0.30, status: "fraqueza" },
    "Tentáculo do Vazio":   { padrao: ["atacar", "atacar", "status_atk", "atacar_forte", "defender"], chanceStatus: 0.25, status: "atordoado" },
    "Sombra Viva":          { padrao: ["status_atk", "atacar_forte", "atacar", "especial"], chanceStatus: 0.35, status: "medo" },
    "Aberração Dimensional":{ padrao: ["defender", "buff", "atacar_forte", "atacar_forte", "status_atk", "curar"], chanceStatus: 0.25, status: "fraqueza" },
    "Cavaleiro Negro":      { padrao: ["atacar", "defender", "atacar_forte", "buff", "atacar_forte", "atacar"], chanceStatus: 0.15, status: "sangramento" },
    "Gárgula Guardiã":      { padrao: ["defender", "defender", "atacar_forte", "atacar_forte", "curar"], chanceStatus: 0.10, status: "atordoado" },
    "Quimera":              { padrao: ["atacar", "status_atk", "atacar_forte", "especial", "atacar", "curar"], chanceStatus: 0.30, status: "queimando" },
    "Lich Ancião":          { padrao: ["buff", "atacar_forte", "status_atk", "curar", "atacar_forte", "especial"], chanceStatus: 0.30, status: "fraqueza" },

    // ── TIER 5 ──
    "Entidade Cósmica":     { padrao: ["buff", "atacar_forte", "atacar_forte", "status_atk", "curar", "especial"], chanceStatus: 0.30, status: "atordoado" },
    "Devorador de Mentes":  { padrao: ["status_atk", "status_atk", "atacar_forte", "especial", "atacar_forte"], chanceStatus: 0.35, status: "medo" },
    "Anjo Corrompido":      { padrao: ["atacar", "atacar_forte", "buff", "atacar_forte", "curar", "status_atk"], chanceStatus: 0.25, status: "queimando" },
    "Guardião Astral":      { padrao: ["defender", "buff", "atacar_forte", "atacar_forte", "atacar_forte", "curar"], chanceStatus: 0.20, status: "atordoado" },
    "Demônio de Fogo":      { padrao: ["status_atk", "atacar_forte", "atacar", "status_atk", "atacar_forte", "buff"], chanceStatus: 0.35, status: "queimando" },
    "Succubus":             { padrao: ["status_atk", "atacar_forte", "curar", "atacar_forte", "especial"], chanceStatus: 0.30, status: "fraqueza" },
    "Cão Infernal":         { padrao: ["atacar", "atacar", "atacar_forte", "status_atk", "atacar_forte"], chanceStatus: 0.30, status: "queimando" },
    "Archdemônio":          { padrao: ["buff", "atacar_forte", "atacar_forte", "status_atk", "curar", "atacar_forte", "especial"], chanceStatus: 0.30, status: "queimando" },
    "Serafim Caído":        { padrao: ["buff", "atacar_forte", "status_atk", "atacar_forte", "curar", "especial"], chanceStatus: 0.25, status: "queimando" },
    "Titã Corrompido":      { padrao: ["defender", "atacar_forte", "atacar_forte", "buff", "atacar_forte", "atacar_forte", "curar"], chanceStatus: 0.20, status: "atordoado" },
    "Arauto do Fim":        { padrao: ["status_atk", "atacar_forte", "especial", "atacar_forte", "buff", "atacar_forte"], chanceStatus: 0.35, status: "medo" },
    "Avatar da Destruição": { padrao: ["buff", "buff", "atacar_forte", "atacar_forte", "atacar_forte", "curar", "especial"], chanceStatus: 0.30, status: "queimando" }
};

// Contador de turno do monstro para padrão de IA
var iaTurnoAtual = 0;

function getAcaoMonstro() {
    if (!monster) return "atacar";

    var padrao = iaMonstroPadroes[monster.nomeBase || monster.name];

    // Monstros sem padrão definido: atacam normalmente
    if (!padrao) return "atacar";

    var acoes = padrao.padrao;
    var acao = acoes[iaTurnoAtual % acoes.length];
    iaTurnoAtual++;

    return acao;
}

function executarAcaoMonstro(acao) {
    if (!monster || !gameState.emCombate) return;

    var padrao = iaMonstroPadroes[monster.nomeBase || monster.name] || { chanceStatus: 0, status: null };
    var modAtk = getModificadorStatus("monstro", "atk");
    var modDef = getModificadorStatus("jogador", "def");

    switch (acao) {
        case "atacar":
            // Ataque normal
            var atkMod = Math.floor(monster.atk * modAtk);
            var defMod = Math.floor(player.def * modDef);
            var r = calcularDano(atkMod, defMod, false);
            var df = r.dano;

            if (player.defendendo) {
                df = Math.floor(df * 0.4);
                addCombatLog("🛡️ Defesa! " + r.dano + "→" + df, "player");
                player.defendendo = false;
            }

            player.hp = Math.max(0, player.hp - df);
            addCombatLog((r.critico ? "💥 " : "🔴 ") + monster.name + " ataca: " + df + " dano!", r.critico ? "critical" : "enemy");
            break;

        case "atacar_forte":
            var atkF = Math.floor(monster.atk * 1.8 * modAtk);
            var rF = calcularDano(atkF, Math.floor(player.def * modDef), false);
            var dfF = rF.dano;

            if (player.defendendo) {
                dfF = Math.floor(dfF * 0.4);
                addCombatLog("🛡️ Defesa contra golpe forte! " + rF.dano + "→" + dfF, "player");
                player.defendendo = false;
            }

            player.hp = Math.max(0, player.hp - dfF);
            addCombatLog("💥 " + monster.name + " usa GOLPE FORTE: " + dfF + " dano!", "critical");
            break;

        case "defender":
            aplicarStatus("monstro", "fortificado");
            addCombatLog("🛡️ " + monster.name + " se defende! (+30% DEF)", "enemy");
            break;

        case "buff":
            // Aumenta ATK temporariamente
            monster.atk = Math.floor(monster.atk * 1.15);
            addCombatLog("⬆️ " + monster.name + " se fortalece! ATK aumentado!", "enemy");
            break;

        case "curar":
            var curaM = Math.floor(monster.maxHp * randomInt(10, 20) / 100);
            monster.hp = Math.min(monster.maxHp, monster.hp + curaM);
            addCombatLog("💚 " + monster.name + " se cura! +" + curaM + " HP!", "enemy");
            document.getElementById("monsterHpText").textContent = monster.hp + "/" + monster.maxHp;
            atualizarBarraMonstro();
            break;

        case "status_atk":
            // Ataque + aplica status
            var atkS = Math.floor(monster.atk * modAtk);
            var rS = calcularDano(atkS, Math.floor(player.def * modDef), false);
            var dfS = rS.dano;

            if (player.defendendo) {
                dfS = Math.floor(dfS * 0.4);
                player.defendendo = false;
            }

            player.hp = Math.max(0, player.hp - dfS);
            addCombatLog("🔴 " + monster.name + " ataca: " + dfS + " dano!", "enemy");

            // Tentar aplicar status
            if (padrao.status && Math.random() < padrao.chanceStatus) {
                aplicarStatus("jogador", padrao.status);
            }
            break;

        case "especial":
            // Ataque forte + sempre aplica status
            var atkE = Math.floor(monster.atk * 1.5 * modAtk);
            var rE = calcularDano(atkE, Math.floor(player.def * modDef), false);
            var dfE = rE.dano;

            if (player.defendendo) {
                dfE = Math.floor(dfE * 0.4);
                player.defendendo = false;
            }

            player.hp = Math.max(0, player.hp - dfE);
            addCombatLog("⚡ " + monster.name + " usa ESPECIAL: " + dfE + " dano!", "critical");

            if (padrao.status) {
                aplicarStatus("jogador", padrao.status);
            }
            break;
    }
}
// ============================================
// ÁRVORE DE HABILIDADES (3 ramos por classe)
// ============================================

var pontosHabilidade = 0;

var arvoreHabilidades = {
    investidos: {} // "guerreiro_ofensivo_1": true
};

var classesArvore = {
    "Guerreiro": {
        ramos: [
            { id: "ofensivo", nome: "⚔️ Ofensivo", habilidades: [
                { id: 1, nome: "Golpe Duplo", desc: "+10% chance ataque extra", efeito: "ataque_extra", valor: 0.10 },
                { id: 2, nome: "Fúria", desc: "+15% dano quando HP < 50%", efeito: "furia", valor: 0.15 },
                { id: 3, nome: "Sede de Sangue", desc: "Cura 5% do dano causado", efeito: "lifesteal", valor: 0.05 },
                { id: 4, nome: "Executar", desc: "Dano +50% se monstro < 20% HP", efeito: "executar", valor: 0.50 },
                { id: 5, nome: "Berserker", desc: "+25% ATK total permanente", efeito: "atk_bonus", valor: 0.25 }
            ]},
            { id: "defensivo", nome: "🛡️ Defensivo", habilidades: [
                { id: 1, nome: "Pele de Ferro", desc: "+10% DEF permanente", efeito: "def_bonus", valor: 0.10 },
                { id: 2, nome: "Retaliação", desc: "Reflete 15% do dano bloqueado", efeito: "retaliacao", valor: 0.15 },
                { id: 3, nome: "Resistência", desc: "Reduz dano de status em 50%", efeito: "resist_status", valor: 0.50 },
                { id: 4, nome: "Último Suspiro", desc: "1x por combate: sobrevive com 1 HP", efeito: "ultimo_suspiro", valor: 1 },
                { id: 5, nome: "Fortaleza", desc: "+20% HP máximo permanente", efeito: "hp_bonus", valor: 0.20 }
            ]},
            { id: "tatico", nome: "🎯 Tático", habilidades: [
                { id: 1, nome: "Precisão", desc: "+8% chance de crítico", efeito: "crit_bonus", valor: 0.08 },
                { id: 2, nome: "Intimidar", desc: "20% chance de aplicar Medo ao atacar", efeito: "intimidar", valor: 0.20 },
                { id: 3, nome: "Ouro de Guerra", desc: "+20% ouro ganho", efeito: "ouro_bonus", valor: 0.20 },
                { id: 4, nome: "Estrategista", desc: "Habilidade CD -1 turno", efeito: "cd_reducao", valor: 1 },
                { id: 5, nome: "Comandante", desc: "+15% XP ganho", efeito: "xp_bonus", valor: 0.15 }
            ]}
        ]
    }
};

// Clonar para classes similares
classesArvore["Guerreira"] = classesArvore["Guerreiro"];

classesArvore["Paladino"] = { ramos: [
    { id: "sagrado", nome: "✝️ Sagrado", habilidades: [
        { id: 1, nome: "Toque Divino", desc: "+15% eficácia de cura", efeito: "cura_bonus", valor: 0.15 },
        { id: 2, nome: "Aura Sagrada", desc: "Regenera 3% HP por turno", efeito: "regen", valor: 0.03 },
        { id: 3, nome: "Purificar", desc: "50% chance de remover debuff ao defender", efeito: "purificar", valor: 0.50 },
        { id: 4, nome: "Proteção Divina", desc: "1x por combate: imune a dano 1 turno", efeito: "imunidade", valor: 1 },
        { id: 5, nome: "Campeão da Luz", desc: "+20% dano contra mortos-vivos/demônios", efeito: "dano_undead", valor: 0.20 }
    ]},
    { id: "guardiao", nome: "🛡️ Guardião", habilidades: [
        { id: 1, nome: "Escudo de Fé", desc: "+12% DEF permanente", efeito: "def_bonus", valor: 0.12 },
        { id: 2, nome: "Devotamento", desc: "+25% HP máximo", efeito: "hp_bonus", valor: 0.25 },
        { id: 3, nome: "Contra-Ataque", desc: "20% chance de contra-atacar", efeito: "contra_ataque", valor: 0.20 },
        { id: 4, nome: "Muralha", desc: "Defender bloqueia 70% do dano", efeito: "defender_bonus", valor: 0.70 },
        { id: 5, nome: "Inabalável", desc: "Imune a atordoamento e congelamento", efeito: "imune_stun", valor: 1 }
    ]},
    { id: "justica", nome: "⚖️ Justiça", habilidades: [
        { id: 1, nome: "Julgamento", desc: "+10% dano com habilidade", efeito: "skill_bonus", valor: 0.10 },
        { id: 2, nome: "Inspirar", desc: "+10% XP ganho", efeito: "xp_bonus", valor: 0.10 },
        { id: 3, nome: "Clemência", desc: "+20% ouro ao vencer", efeito: "ouro_bonus", valor: 0.20 },
        { id: 4, nome: "Sentença", desc: "+30% dano crítico", efeito: "crit_dano", valor: 0.30 },
        { id: 5, nome: "Avathar", desc: "+2 em TODOS atributos", efeito: "todos_atrib", valor: 2 }
    ]}
]};
classesArvore["Paladina"] = classesArvore["Paladino"];

classesArvore["Arqueiro"] = { ramos: [
    { id: "precisao", nome: "🎯 Precisão", habilidades: [
        { id: 1, nome: "Mira Firme", desc: "+10% chance de crítico", efeito: "crit_bonus", valor: 0.10 },
        { id: 2, nome: "Ponto Fraco", desc: "Críticos causam +40% dano", efeito: "crit_dano", valor: 0.40 },
        { id: 3, nome: "Tiro Certeiro", desc: "Ignora 20% da DEF inimiga", efeito: "pen_def", valor: 0.20 },
        { id: 4, nome: "Olho de Águia", desc: "+15% dano com habilidade", efeito: "skill_bonus", valor: 0.15 },
        { id: 5, nome: "Atirador de Elite", desc: "+25% ATK total", efeito: "atk_bonus", valor: 0.25 }
    ]},
    { id: "sobrevivencia", nome: "🌿 Sobrevivência", habilidades: [
        { id: 1, nome: "Esquiva Natural", desc: "+8% chance de esquiva", efeito: "esquiva_bonus", valor: 0.08 },
        { id: 2, nome: "Regeneração", desc: "Regenera 2% HP por turno", efeito: "regen", valor: 0.02 },
        { id: 3, nome: "Resistência Natural", desc: "Dano de veneno/queimadura -50%", efeito: "resist_status", valor: 0.50 },
        { id: 4, nome: "Camuflagem", desc: "+30% chance de fuga", efeito: "fuga_bonus", valor: 0.30 },
        { id: 5, nome: "Instinto", desc: "1x por combate: esquiva automática", efeito: "auto_esquiva", valor: 1 }
    ]},
    { id: "cacador", nome: "🏹 Caçador", habilidades: [
        { id: 1, nome: "Rastreador", desc: "+15% chance de drop", efeito: "drop_bonus", valor: 0.15 },
        { id: 2, nome: "Veneno nas Flechas", desc: "25% chance de envenenar", efeito: "aplicar_veneno", valor: 0.25 },
        { id: 3, nome: "Caçador de Recompensas", desc: "+20% ouro", efeito: "ouro_bonus", valor: 0.20 },
        { id: 4, nome: "Tiro Múltiplo", desc: "+10% chance de ataque extra", efeito: "ataque_extra", valor: 0.10 },
        { id: 5, nome: "Mestre Caçador", desc: "+15% XP e +15% ouro", efeito: "xp_ouro_bonus", valor: 0.15 }
    ]}
]};
classesArvore["Arqueira"] = classesArvore["Arqueiro"];

classesArvore["Mago"] = { ramos: [
    { id: "fogo", nome: "🔥 Fogo", habilidades: [
        { id: 1, nome: "Toque Flamejante", desc: "20% chance de queimar ao atacar", efeito: "aplicar_queimando", valor: 0.20 },
        { id: 2, nome: "Chamas Intensas", desc: "+20% dano de habilidade", efeito: "skill_bonus", valor: 0.20 },
        { id: 3, nome: "Explosão", desc: "Queimaduras causam +50% dano", efeito: "queimadura_forte", valor: 0.50 },
        { id: 4, nome: "Imolação", desc: "Atacantes recebem dano de fogo", efeito: "espinhos_fogo", valor: 0.10 },
        { id: 5, nome: "Fênix", desc: "1x por combate: revive com 30% HP", efeito: "fenix", valor: 0.30 }
    ]},
    { id: "arcano", nome: "🔮 Arcano", habilidades: [
        { id: 1, nome: "Mente Aguçada", desc: "+12% dano mágico", efeito: "atk_bonus", valor: 0.12 },
        { id: 2, nome: "Mana Eficiente", desc: "Habilidade CD -1 turno", efeito: "cd_reducao", valor: 1 },
        { id: 3, nome: "Penetração Arcana", desc: "Habilidade ignora 30% DEF", efeito: "pen_def_skill", valor: 0.30 },
        { id: 4, nome: "Explosão Arcana", desc: "+30% dano crítico mágico", efeito: "crit_dano", valor: 0.30 },
        { id: 5, nome: "Archimago", desc: "+3 Inteligência permanente", efeito: "int_bonus", valor: 3 }
    ]},
    { id: "protecao", nome: "🛡️ Proteção", habilidades: [
        { id: 1, nome: "Barreira Mágica", desc: "+15% HP máximo", efeito: "hp_bonus", valor: 0.15 },
        { id: 2, nome: "Escudo Arcano", desc: "+10% DEF", efeito: "def_bonus", valor: 0.10 },
        { id: 3, nome: "Absorção", desc: "Cura 3% HP ao usar habilidade", efeito: "skill_cura", valor: 0.03 },
        { id: 4, nome: "Reflexo Mágico", desc: "15% chance refletir dano", efeito: "refletir", valor: 0.15 },
        { id: 5, nome: "Transcendência", desc: "+2 INT, +2 SAB, +2 VIG", efeito: "transcendencia", valor: 2 }
    ]}
]};
classesArvore["Maga"] = classesArvore["Mago"];

// Classes restantes (templates simplificados)
classesArvore["Clérigo"] = classesArvore["Paladino"];
classesArvore["Clériga"] = classesArvore["Paladino"];
classesArvore["Ladino"] = classesArvore["Arqueiro"];
classesArvore["Ladina"] = classesArvore["Arqueiro"];
classesArvore["Druida"] = classesArvore["Mago"];
classesArvore["Monge"] = classesArvore["Guerreiro"];

function temHabilidadeArvore(ramoId, habId) {
    var chave = player.class + "_" + ramoId + "_" + habId;
    return arvoreHabilidades.investidos[chave] === true;
}

function getValorHabilidade(efeito) {
    var total = 0;
    var arvore = classesArvore[player.class];
    if (!arvore) return 0;

    arvore.ramos.forEach(function(ramo) {
        ramo.habilidades.forEach(function(hab) {
            if (hab.efeito === efeito && temHabilidadeArvore(ramo.id, hab.id)) {
                total += hab.valor;
            }
        });
    });
    return total;
}

function investirHabilidadeArvore(ramoId, habId) {
    if (pontosHabilidade <= 0) { mostrarNotificacao("⚠️ Sem pontos!"); return; }

    var chave = player.class + "_" + ramoId + "_" + habId;
    if (arvoreHabilidades.investidos[chave]) { mostrarNotificacao("Já desbloqueada!"); return; }

    // Verificar pré-requisito (precisa do anterior)
    if (habId > 1) {
        var chaveAnterior = player.class + "_" + ramoId + "_" + (habId - 1);
        if (!arvoreHabilidades.investidos[chaveAnterior]) {
            mostrarNotificacao("⚠️ Desbloqueie a habilidade anterior primeiro!");
            return;
        }
    }

    pontosHabilidade--;
    arvoreHabilidades.investidos[chave] = true;

    // Aplicar efeitos permanentes
    var arvore = classesArvore[player.class];
    var hab = null;
    arvore.ramos.forEach(function(r) {
        if (r.id === ramoId) {
            r.habilidades.forEach(function(h) {
                if (h.id === habId) hab = h;
            });
        }
    });

    if (hab) {
        if (hab.efeito === "atk_bonus") { /* Aplicado via getValorHabilidade */ }
        if (hab.efeito === "def_bonus") { /* Aplicado via getValorHabilidade */ }
        if (hab.efeito === "hp_bonus") { aplicarBonusEquipamentos(); }
        if (hab.efeito === "todos_atrib") {
            player.forca += hab.valor; player.destreza += hab.valor; player.vigor += hab.valor;
            player.inteligencia += hab.valor; player.sabedoria += hab.valor; player.carisma += hab.valor;
            player.baseMaxHp += hab.valor * 5;
        }
        if (hab.efeito === "int_bonus") { player.inteligencia += hab.valor; }
        if (hab.efeito === "transcendencia") {
            player.inteligencia += hab.valor; player.sabedoria += hab.valor; player.vigor += hab.valor;
            player.baseMaxHp += hab.valor * 5;
        }

      aplicarBonusEquipamentos();

        mostrarNotificacao("🌟 " + hab.nome + " desbloqueada!");
        log("🌟 Habilidade: " + hab.nome + " — " + hab.desc);
        if (typeof tocarSom === 'function') tocarSom("conquista");
    }

    renderizarArvoreHabilidades();
    updateUI();
}

function renderizarArvoreHabilidades() {
    var el = document.getElementById("arvoreHabilidadesContent");
    if (!el) return;

    var arvore = classesArvore[player.class];
    if (!arvore) { el.innerHTML = '<p style="color:#64748b;">Árvore não disponível para esta classe.</p>'; return; }

    var html = '<div style="text-align:center;margin-bottom:10px;">' +
        '<span style="color:#ffd700;font-weight:bold;">🌟 Pontos de Habilidade: ' + pontosHabilidade + '</span></div>';

    arvore.ramos.forEach(function(ramo) {
        html += '<div style="margin-bottom:12px;background:rgba(30,41,59,0.5);border-radius:8px;padding:10px;border:1px solid #334155;">';
        html += '<h4 style="color:#38bdf8;text-align:center;margin-bottom:8px;font-size:0.9em;">' + ramo.nome + '</h4>';

        ramo.habilidades.forEach(function(hab) {
            var chave = player.class + "_" + ramo.id + "_" + hab.id;
            var desbloqueada = arvoreHabilidades.investidos[chave] === true;

            // Verificar se pode desbloquear
            var podeDesbloquear = pontosHabilidade > 0 && !desbloqueada;
            if (hab.id > 1) {
                var chaveAnt = player.class + "_" + ramo.id + "_" + (hab.id - 1);
                if (!arvoreHabilidades.investidos[chaveAnt]) podeDesbloquear = false;
            }

            var corBorda = desbloqueada ? "#22c55e" : podeDesbloquear ? "#fbbf24" : "#334155";
            var corTexto = desbloqueada ? "#22c55e" : "#94a3b8";

            html += '<div style="display:flex;justify-content:space-between;align-items:center;padding:6px;margin-bottom:3px;border-radius:6px;border:1px solid ' + corBorda + ';background:' + (desbloqueada ? 'rgba(34,197,94,0.1)' : 'rgba(30,41,59,0.3)') + ';">' +
                '<div>' +
                    '<span style="color:' + corTexto + ';font-size:0.85em;font-weight:bold;">' + (desbloqueada ? '✅ ' : '🔒 ') + hab.nome + '</span>' +
                    '<br><small style="color:#64748b;">' + hab.desc + '</small>' +
                '</div>' +
                (desbloqueada ? '' : podeDesbloquear ?
                    '<button onclick="investirHabilidadeArvore(\'' + ramo.id + '\',' + hab.id + ')" style="padding:3px 10px;font-size:0.75em;">Aprender</button>' :
                    '<span style="color:#475569;font-size:0.7em;">🔒</span>') +
            '</div>';
        });

        html += '</div>';
    });

    el.innerHTML = html;
}
// ============================================
// INTEGRAÇÃO NO COMBATE
// ============================================

// Override turnoInimigo com IA + Status
turnoInimigo = function() {
    if (!gameState.emCombate || !monster || monster.hp <= 0) return;

    // Processar status do monstro PRIMEIRO
    var monstroPula = processarStatus("monstro");
    renderizarStatusUI();

    if (monstroPula) {
        addCombatLog("⏭️ " + monster.name + " está incapacitado!", "player");
        if (player.habilidadeCooldown > 0) player.habilidadeCooldown--;
        habilitarBotoesCombate(true);

        // Verificar morte por status
        if (monster.hp <= 0) { setTimeout(vitoriaCombate, 600); return; }
        return;
    }

    // Esquiva do jogador
    var chanceEsq = calcularChanceEsquiva() + getValorHabilidade("esquiva_bonus");
    if (Math.random() < chanceEsq) {
        addCombatLog("🏃 Desviou!", "player");
        if (typeof estatisticas !== 'undefined') estatisticas.esquivas++;
        if (typeof tocarSom === 'function') tocarSom("esquiva");
        if (player.habilidadeCooldown > 0) player.habilidadeCooldown--;
        habilitarBotoesCombate(true);
        return;
    }

    // IA: escolher ação
    var acao = getAcaoMonstro();
    executarAcaoMonstro(acao);

    // Aplicar redução de dano de talentos/encantamentos
    // (já aplicado dentro de executarAcaoMonstro via calcularDano)

    if (player.habilidadeCooldown > 0) player.habilidadeCooldown--;
    updateUI();
    renderizarStatusUI();

    // Verificar morte do jogador
    if (player.hp <= 0) {
        // Verificar "Último Suspiro"
        if (getValorHabilidade("ultimo_suspiro") > 0 && !gameState.usouUltimoSuspiro) {
            gameState.usouUltimoSuspiro = true;
            player.hp = 1;
            addCombatLog("💀 ÚLTIMO SUSPIRO! Sobreviveu com 1 HP!", "critical");
            if (typeof tocarSom === 'function') tocarSom("cura");
            habilitarBotoesCombate(true);
            return;
        }

        // Verificar "Fênix"
        if (getValorHabilidade("fenix") > 0 && !gameState.usouFenix) {
            gameState.usouFenix = true;
            player.hp = Math.floor(player.maxHp * 0.30);
            addCombatLog("🐦‍🔥 FÊNIX! Renasceu com 30% HP!", "critical");
            if (typeof tocarSom === 'function') tocarSom("cura");
            updateUI();
            habilitarBotoesCombate(true);
            return;
        }

        player.hp = 0;
        updateUI();
        setTimeout(derrotaCombate, 600);
        return;
    }

    habilitarBotoesCombate(true);
};

// Override atacar com status/habilidades da árvore
atacar = function() {
    if (!gameState.emCombate || !monster || monster.hp <= 0) return;

    // Processar status do jogador
    var jogadorPula = processarStatus("jogador");
    renderizarStatusUI();

    if (jogadorPula) {
        addCombatLog("⏭️ Você está incapacitado!", "enemy");
        player.defendendo = false;
        setTimeout(turnoInimigo, 800);
        return;
    }

    // Verificar morte por status próprio
    if (player.hp <= 0) { updateUI(); setTimeout(derrotaCombate, 600); return; }

    habilitarBotoesCombate(false);
    if (typeof tocarSom === 'function') tocarSom("atacar");

    // Modificadores de status
    var modAtk = getModificadorStatus("jogador", "atk");

    // Bônus da árvore
    var atkBonus = 1.0 + getValorHabilidade("atk_bonus");

    // Fúria (mais dano quando HP baixo)
    var furiaBonus = 1.0;
    if (getValorHabilidade("furia") > 0 && player.hp < player.maxHp * 0.5) {
        furiaBonus = 1.0 + getValorHabilidade("furia");
    }

    // Executar (mais dano contra monstro com pouco HP)
    var executarBonus = 1.0;
    if (getValorHabilidade("executar") > 0 && monster.hp < monster.maxHp * 0.20) {
        executarBonus = 1.0 + getValorHabilidade("executar");
        addCombatLog("💀 EXECUÇÃO!", "critical");
    }

    var atkFinal = Math.floor(player.atk * modAtk * atkBonus * furiaBonus * executarBonus);

    // Penetração de DEF
    var penDef = getValorHabilidade("pen_def");
    var defMonstro = Math.floor(monster.def * (1 - penDef));

    var r = calcularDano(atkFinal, defMonstro, true);
    var dano = r.dano;

    // Lifesteal
    var lifesteal = getValorHabilidade("lifesteal");
    if (lifesteal > 0) {
        var curaLS = Math.floor(dano * lifesteal);
        player.hp = Math.min(player.maxHp, player.hp + curaLS);
        if (curaLS > 0) addCombatLog("🩸 Lifesteal: +" + curaLS + " HP!", "heal");
    }

    monster.hp = Math.max(0, monster.hp - dano);

    if (r.critico) {
        if (typeof tocarSom === 'function') tocarSom("critico");
        addCombatLog("💥 CRÍTICO! " + dano + " dano!", "critical");
    } else {
        addCombatLog("⚔️ " + dano + " dano!", "player");
    }

    // Chance de aplicar status (árvore de habilidades)
    if (getValorHabilidade("aplicar_veneno") > 0 && Math.random() < getValorHabilidade("aplicar_veneno")) {
        aplicarStatus("monstro", "envenenado");
    }
    if (getValorHabilidade("aplicar_queimando") > 0 && Math.random() < getValorHabilidade("aplicar_queimando")) {
        aplicarStatus("monstro", "queimando");
    }
    if (getValorHabilidade("intimidar") > 0 && Math.random() < getValorHabilidade("intimidar")) {
        aplicarStatus("monstro", "medo");
    }

    // Ataque extra
    var chanceExtra = getValorHabilidade("ataque_extra");
    if (chanceExtra > 0 && Math.random() < chanceExtra) {
        var r2 = calcularDano(Math.floor(player.atk * 0.6), monster.def, true);
        monster.hp = Math.max(0, monster.hp - r2.dano);
        addCombatLog("⚡ Ataque extra! +" + r2.dano + " dano!", "player");
    }

    document.getElementById("monsterHpText").textContent = monster.hp + "/" + monster.maxHp;
    atualizarBarraMonstro();
    player.defendendo = false;
    updateUI();
    renderizarStatusUI();

    if (monster.hp <= 0) { setTimeout(vitoriaCombate, 600); return; }
    setTimeout(turnoInimigo, 800);
};

// Override iniciarCombate para resetar status e IA
var _iniciarCombateComStatus = iniciarCombate;
iniciarCombate = function(monstroBase, isBoss) {
    // Limpar status de combate anterior
    limparTodosStatus();
    iaTurnoAtual = 0;
    gameState.usouUltimoSuspiro = false;
    gameState.usouFenix = false;

    _iniciarCombateComStatus(monstroBase, isBoss);

    // Mostrar padrão de IA no log
    var padrao = iaMonstroPadroes[monstroBase.nomeBase || monstroBase.name];
    if (padrao && padrao.status) {
        addCombatLog("⚠️ Cuidado: este monstro pode causar " + tiposStatus[padrao.status].nome + "!", "info");
    }

    // Regeneração da árvore
    if (getValorHabilidade("regen") > 0) {
        aplicarStatus("jogador", "regenerando");
    }

    renderizarStatusUI();
};

// Level up dá pontos de habilidade a cada 2 níveis
var _levelUpComArvore = levelUp;
levelUp = function() {
    var nivelAntes = player.level;
    _levelUpComArvore();

    // Ponto de habilidade a cada 2 níveis
    if (player.level % 2 === 1) {
        pontosHabilidade++;
        mostrarNotificacao("🌟 +1 Ponto de Habilidade! (Nv." + player.level + ")");
        log("🌟 +1 Ponto de Habilidade da árvore!");
    }
};



var _carregarComArvore = carregarJogoSalvo;
carregarJogoSalvo = function() {
    _carregarComArvore();
    try {
        var save = JSON.parse(localStorage.getItem("reinosMonstros_save") || "{}");
        if (save.arvoreHabilidades) arvoreHabilidades = save.arvoreHabilidades;
        if (save.pontosHabilidade !== undefined) pontosHabilidade = save.pontosHabilidade;
    } catch(e) {}
};

var _selecComArvore = selecionarPersonagem;
selecionarPersonagem = function(id) {
    arvoreHabilidades = { investidos: {} };
    pontosHabilidade = 0;
    _selecComArvore(id);
};

// Adicionar árvore ao menu de talentos
var _showSubComArvore = showSubMenu;
showSubMenu = function(tipo) {
    if (tipo === 'talentos') {
        renderizarTalentos();
        renderizarConquistas();
        renderizarEstatisticas();
        renderizarArvoreHabilidades();
        var ce = document.getElementById("conquistasCount");
        var te = document.getElementById("conquistasTotal");
        if (ce) ce.textContent = conquistas.totalDesbloqueadas;
        if (te) te.textContent = conquistas.lista.length;
        mostrarPainel("talentosPanel");
    } else {
        _showSubComArvore(tipo);
    }
};
function atualizarVisibilidadeAreas() {
      var areas = [
        { id: "area-floresta", min: 1 },
        { id: "area-pantano", min: 4 },
        { id: "area-colinas", min: 7 },
        { id: "area-ruinas", min: 10 },
        { id: "area-deserto", min: 13 },
        { id: "area-cemiterio", min: 16 },
        { id: "area-caverna", min: 19 },
        { id: "area-vulcao", min: 22 },
        { id: "area-geleira", min: 25 },
        { id: "area-cidadeFant", min: 28 },
        { id: "area-abismo", min: 31 },
        { id: "area-castelo", min: 34 },
        { id: "area-planoAstral", min: 37 },
        { id: "area-infernus", min: 40 },
        { id: "area-tronoDeus", min: 43 }
    ];

    areas.forEach(function(item) {
        var el = document.getElementById(item.id);
        if (el) {
            if (player.level >= item.min) {
                // Se atingiu o nível, mostra a área
                el.style.display = "block";
            } else {
                // Se não atingiu, esconde totalmente
                el.style.display = "none";
            }
        }
    });
}
function renderizarAreas() {
    var container = document.getElementById("areaOptions");
    container.innerHTML = ""; // Limpa a lista atual

    Object.keys(areas).forEach(function(key) {
        var area = areas[key];

        // Só cria o botão se o nível do jogador for maior ou igual ao minLevel
        if (player.level >= area.minLevel) {
            var btn = document.createElement("button");
            btn.className = "btn-area"; // Use a classe que você já tem
            btn.textContent = area.nome;
            btn.onclick = function() { selecionarArea(key); };
            container.appendChild(btn);
        }
    });
}

// ============================================
// FUNÇÃO: Mostrar popup de área desbloqueada
// ============================================
function mostrarDesbloqueioArea(nomeArea, icone, nivelMinimo) {
    // Atualiza o conteúdo do popup
    document.getElementById('unlockIcon').textContent = icone;
    document.getElementById('unlockName').textContent = nomeArea;
    document.getElementById('unlockLevel').textContent = `Nível mínimo: ${nivelMinimo}`;

    // Cria overlay de fundo escuro
    const overlay = document.createElement('div');
    overlay.id = 'areaUnlockOverlay';
    document.body.appendChild(overlay);

    // Mostra o popup
    const popup = document.getElementById('areaUnlockPopup');
    popup.classList.remove('show');
    popup.style.display = 'block';

    // Força reflow para reiniciar animação
    void popup.offsetWidth;
    popup.classList.add('show');

    // Remove tudo após 4 segundos
    setTimeout(() => {
        popup.classList.remove('show');
        popup.style.display = 'none';
        const ov = document.getElementById('areaUnlockOverlay');
        if (ov) ov.remove();
    }, 4000);
}

// ============================================
// SISTEMA DE ALQUIMIA — MATERIAIS (drops reais)
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

// ============================================
// RECEITAS DE ALQUIMIA (usando drops reais)
// ============================================

var receitasAlquimia = [

    // ══════════════════════════════════════
    //  POÇÕES (todas as classes)
    // ══════════════════════════════════════
    {
        nome: "Poção Menor", icone: "🧪", categoria: "pocao",
        descricao: "Restaura 40 HP",
        nivelMinimo: 1, custoOuro: 20,
        ingredientes: [
            { nome: "Pele de Lobo", quantidade: 2 },
            { nome: "Seda de Aranha", quantidade: 1 }
        ],
        resultado: { tipo: "consumivel", nome: "Poção Menor", icone: "🧪", efeito: { tipo: "cura", valor: 40 } }
    },
    {
        nome: "Antídoto Forte", icone: "🧪", categoria: "pocao",
        descricao: "Restaura 60 HP",
        nivelMinimo: 4, custoOuro: 50,
        ingredientes: [
            { nome: "Glândula Tóxica", quantidade: 2 },
            { nome: "Escama Pantanosa", quantidade: 1 }
        ],
        resultado: { tipo: "consumivel", nome: "Antídoto Forte", icone: "🧪", efeito: { tipo: "cura", valor: 60 } }
    },
    {
        nome: "Poção Média", icone: "🧪", categoria: "pocao",
        descricao: "Restaura 100 HP",
        nivelMinimo: 7, custoOuro: 100,
        ingredientes: [
            { nome: "Pena de Harpia", quantidade: 2 },
            { nome: "Couro Grosso", quantidade: 2 }
        ],
        resultado: { tipo: "consumivel", nome: "Poção Média", icone: "🧪", efeito: { tipo: "cura", valor: 100 } }
    },
    {
        nome: "Poção Grande", icone: "🧪", categoria: "pocao",
        descricao: "Restaura 180 HP",
        nivelMinimo: 10, custoOuro: 200,
        ingredientes: [
            { nome: "Osso Encantado", quantidade: 2 },
            { nome: "Pedra Rúnica", quantidade: 1 }
        ],
        resultado: { tipo: "consumivel", nome: "Poção Grande", icone: "🧪", efeito: { tipo: "cura", valor: 180 } }
    },
    {
        nome: "Poção Superior", icone: "🧪", categoria: "pocao",
        descricao: "Restaura 300 HP",
        nivelMinimo: 19, custoOuro: 400,
        ingredientes: [
            { nome: "Cristal de Terra", quantidade: 2 },
            { nome: "Seda Real", quantidade: 1 }
        ],
        resultado: { tipo: "consumivel", nome: "Poção Superior", icone: "🧪", efeito: { tipo: "cura", valor: 300 } }
    },
    {
        nome: "Poção Suprema", icone: "🧪", categoria: "pocao",
        descricao: "Restaura 500 HP",
        nivelMinimo: 28, custoOuro: 800,
        ingredientes: [
            { nome: "Essência Espectral", quantidade: 2 },
            { nome: "Sangue Nobre", quantidade: 1 }
        ],
        resultado: { tipo: "consumivel", nome: "Poção Suprema", icone: "🧪", efeito: { tipo: "cura", valor: 500 } }
    },
    {
        nome: "Poção Divina", icone: "🧪", categoria: "pocao",
        descricao: "Restaura 800 HP",
        nivelMinimo: 37, custoOuro: 1500,
        ingredientes: [
            { nome: "Poeira Estelar", quantidade: 2 },
            { nome: "Essência Infernal", quantidade: 2 }
        ],
        resultado: { tipo: "consumivel", nome: "Poção Divina", icone: "🧪", efeito: { tipo: "cura", valor: 800 } }
    },

     // ══════════════════════════════════════════════
    //  ARMAS — GUERREIRO ⚔️ (Minério + Drops + Ouro)
    // ══════════════════════════════════════════════
    {
        nome: "Espada de Bronze", icone: "⚔️", categoria: "equipamento",
        descricao: "Arma: +6 ATK",
        nivelMinimo: 3, custoOuro: 100, classePermitida: "guerreiro",
        ingredientes: [
            { nome: "Minério de Cobre", quantidade: 3 },
            { nome: "Minério de Estanho", quantidade: 2 },
            { nome: "Couro Grosso", quantidade: 1 }
        ],
        resultado: { tipo: "equipamento", nome: "Espada de Bronze", icone: "⚔️", slot: "arma", stats: { atk: 6, def: 0, hp: 0 }, precoVenda: 50 }
    },
    {
        nome: "Espada de Ferro", icone: "⚔️", categoria: "equipamento",
        descricao: "Arma: +12 ATK, +2 DEF",
        nivelMinimo: 10, custoOuro: 300, classePermitida: "guerreiro",
        ingredientes: [
            { nome: "Minério de Ferro", quantidade: 4 },
            { nome: "Pepita de Prata", quantidade: 1 },
            { nome: "Insígnia Antiga", quantidade: 1 }
        ],
        resultado: { tipo: "equipamento", nome: "Espada de Ferro", icone: "⚔️", slot: "arma", stats: { atk: 12, def: 2, hp: 0 }, precoVenda: 150 }
    },
    {
        nome: "Machado de Aço Vulcânico", icone: "🪓", categoria: "equipamento",
        descricao: "Arma: +22 ATK, +3 DEF",
        nivelMinimo: 22, custoOuro: 700, classePermitida: "guerreiro",
        ingredientes: [
            { nome: "Minério de Aço", quantidade: 4 },
            { nome: "Liga Vulcânica", quantidade: 2 },
            { nome: "Escama Ígnea", quantidade: 2 }
        ],
        resultado: { tipo: "equipamento", nome: "Machado de Aço Vulcânico", icone: "🪓", slot: "arma", stats: { atk: 22, def: 3, hp: 0 }, precoVenda: 350 }
    },
    {
        nome: "Lâmina de Mithril", icone: "⚔️", categoria: "equipamento",
        descricao: "Arma: +35 ATK, +5 DEF",
        nivelMinimo: 34, custoOuro: 1500, classePermitida: "guerreiro",
        ingredientes: [
            { nome: "Minério de Mithril", quantidade: 5 },
            { nome: "Cristal de Adamantina", quantidade: 2 },
            { nome: "Lâmina Negra", quantidade: 1 }
        ],
        resultado: { tipo: "equipamento", nome: "Lâmina de Mithril", icone: "⚔️", slot: "arma", stats: { atk: 35, def: 5, hp: 0 }, precoVenda: 750 }
    },
    // ══════════════════════════════════════════════
    //  ARMAS — PALADINO ✨
    // ══════════════════════════════════════════════
    {
        nome: "Maça Benta", icone: "🔨", categoria: "equipamento",
        descricao: "Arma: +4 ATK, +2 DEF, +8 HP",
        nivelMinimo: 3, custoOuro: 100, classePermitida: "paladino",
        ingredientes: [
            { nome: "Minério de Cobre", quantidade: 3 },
            { nome: "Minério de Estanho", quantidade: 2 },
            { nome: "Seda de Aranha", quantidade: 2 }
        ],
        resultado: { tipo: "equipamento", nome: "Maça Benta", icone: "🔨", slot: "arma", stats: { atk: 4, def: 2, hp: 8 }, precoVenda: 50 }
    },
    {
        nome: "Martelo da Guarda Sagrada", icone: "🔨", categoria: "equipamento",
        descricao: "Arma: +8 ATK, +5 DEF, +15 HP",
        nivelMinimo: 10, custoOuro: 300, classePermitida: "paladino",
        ingredientes: [
            { nome: "Minério de Ferro", quantidade: 3 },
            { nome: "Pepita de Prata", quantidade: 2 },
            { nome: "Pedra Rúnica", quantidade: 1 }
        ],
        resultado: { tipo: "equipamento", nome: "Martelo da Guarda Sagrada", icone: "🔨", slot: "arma", stats: { atk: 8, def: 5, hp: 15 }, precoVenda: 150 }
    },
    {
        nome: "Espada do Juramento", icone: "✨", categoria: "equipamento",
        descricao: "Arma: +16 ATK, +8 DEF, +25 HP",
        nivelMinimo: 22, custoOuro: 700, classePermitida: "paladino",
        ingredientes: [
            { nome: "Minério de Aço", quantidade: 3 },
            { nome: "Cristal de Adamantina", quantidade: 1 },
            { nome: "Cristal de Gelo", quantidade: 2 }
        ],
        resultado: { tipo: "equipamento", nome: "Espada do Juramento", icone: "✨", slot: "arma", stats: { atk: 16, def: 8, hp: 25 }, precoVenda: 350 }
    },
    {
        nome: "Martelo da Redenção", icone: "🔨", categoria: "equipamento",
        descricao: "Arma: +26 ATK, +12 DEF, +40 HP",
        nivelMinimo: 34, custoOuro: 1500, classePermitida: "paladino",
        ingredientes: [
            { nome: "Minério de Mithril", quantidade: 4 },
            { nome: "Fragmento de Oricalco", quantidade: 2 },
            { nome: "Sangue Nobre", quantidade: 2 }
        ],
        resultado: { tipo: "equipamento", nome: "Martelo da Redenção", icone: "🔨", slot: "arma", stats: { atk: 26, def: 12, hp: 40 }, precoVenda: 750 }
    },
 // ══════════════════════════════════════════════
    //  ARMAS — ARQUEIRO 🏹
    // ══════════════════════════════════════════════
    {
        nome: "Arco de Cobre", icone: "🏹", categoria: "equipamento",
        descricao: "Arma: +6 ATK",
        nivelMinimo: 3, custoOuro: 100, classePermitida: "arqueiro",
        ingredientes: [
            { nome: "Minério de Cobre", quantidade: 2 },
            { nome: "Minério de Estanho", quantidade: 1 },
            { nome: "Pele de Lobo", quantidade: 2 }
        ],
        resultado: { tipo: "equipamento", nome: "Arco de Cobre", icone: "🏹", slot: "arma", stats: { atk: 6, def: 0, hp: 0 }, precoVenda: 50 }
    },
    {
        nome: "Arco da Precisão", icone: "🏹", categoria: "equipamento",
        descricao: "Arma: +13 ATK",
        nivelMinimo: 10, custoOuro: 300, classePermitida: "arqueiro",
        ingredientes: [
            { nome: "Minério de Ferro", quantidade: 3 },
            { nome: "Pena de Harpia", quantidade: 3 },
            { nome: "Seda Real", quantidade: 1 }
        ],
        resultado: { tipo: "equipamento", nome: "Arco da Precisão", icone: "🏹", slot: "arma", stats: { atk: 13, def: 0, hp: 0 }, precoVenda: 150 }
    },
    {
        nome: "Arco do Caçador Glacial", icone: "🏹", categoria: "equipamento",
        descricao: "Arma: +24 ATK, +5 HP",
        nivelMinimo: 22, custoOuro: 700, classePermitida: "arqueiro",
        ingredientes: [
            { nome: "Minério de Aço", quantidade: 3 },
            { nome: "Metal Congelado", quantidade: 2 },
            { nome: "Presa Congelada", quantidade: 2 }
        ],
        resultado: { tipo: "equipamento", nome: "Arco do Caçador Glacial", icone: "🏹", slot: "arma", stats: { atk: 24, def: 0, hp: 5 }, precoVenda: 350 }
    },
    {
        nome: "Arco de Oricalco", icone: "🏹", categoria: "equipamento",
        descricao: "Arma: +38 ATK, +3 DEF",
        nivelMinimo: 34, custoOuro: 1500, classePermitida: "arqueiro",
        ingredientes: [
            { nome: "Fragmento de Oricalco", quantidade: 3 },
            { nome: "Minério de Mithril", quantidade: 3 },
            { nome: "Olho Abissal", quantidade: 2 }
        ],
        resultado: { tipo: "equipamento", nome: "Arco de Oricalco", icone: "🏹", slot: "arma", stats: { atk: 38, def: 3, hp: 0 }, precoVenda: 750 }
    },
// ══════════════════════════════════════════════
    //  ARMAS — MAGO 🔮
    // ══════════════════════════════════════════════
    {
        nome: "Cajado de Estanho", icone: "🪄", categoria: "equipamento",
        descricao: "Arma: +4 ATK, +10 HP",
        nivelMinimo: 3, custoOuro: 100, classePermitida: "mago",
        ingredientes: [
            { nome: "Minério de Estanho", quantidade: 3 },
            { nome: "Minério de Cobre", quantidade: 1 },
            { nome: "Glândula Tóxica", quantidade: 2 }
        ],
        resultado: { tipo: "equipamento", nome: "Cajado de Estanho", icone: "🪄", slot: "arma", stats: { atk: 4, def: 0, hp: 10 }, precoVenda: 50 }
    },
    {
        nome: "Cajado de Prata Rúnica", icone: "🪄", categoria: "equipamento",
        descricao: "Arma: +9 ATK, +20 HP",
        nivelMinimo: 10, custoOuro: 300, classePermitida: "mago",
        ingredientes: [
            { nome: "Pepita de Prata", quantidade: 3 },
            { nome: "Minério de Ferro", quantidade: 2 },
            { nome: "Grimório Sombrio", quantidade: 1 }
        ],
        resultado: { tipo: "equipamento", nome: "Cajado de Prata Rúnica", icone: "🪄", slot: "arma", stats: { atk: 9, def: 0, hp: 20 }, precoVenda: 150 }
    },
    {
        nome: "Orbe Vulcânico", icone: "🔮", categoria: "equipamento",
        descricao: "Arma: +18 ATK, +30 HP",
        nivelMinimo: 22, custoOuro: 700, classePermitida: "mago",
        ingredientes: [
            { nome: "Minério de Aço", quantidade: 2 },
            { nome: "Liga Vulcânica", quantidade: 3 },
            { nome: "Coração de Magma", quantidade: 1 }
        ],
        resultado: { tipo: "equipamento", nome: "Orbe Vulcânico", icone: "🔮", slot: "arma", stats: { atk: 18, def: 0, hp: 30 }, precoVenda: 350 }
    },
    {
        nome: "Cajado Estelar", icone: "🌟", categoria: "equipamento",
        descricao: "Arma: +28 ATK, +50 HP",
        nivelMinimo: 34, custoOuro: 1500, classePermitida: "mago",
        ingredientes: [
            { nome: "Minério de Mithril", quantidade: 3 },
            { nome: "Essência Estelar", quantidade: 1 },
            { nome: "Poeira Estelar", quantidade: 3 }
        ],
        resultado: { tipo: "equipamento", nome: "Cajado Estelar", icone: "🌟", slot: "arma", stats: { atk: 28, def: 0, hp: 50 }, precoVenda: 750 }
    },
// ══════════════════════════════════════════════
    //  ARMAS — CLÉRIGO 📖
    // ══════════════════════════════════════════════
    {
        nome: "Cetro de Cobre Sagrado", icone: "✝️", categoria: "equipamento",
        descricao: "Arma: +3 ATK, +2 DEF, +10 HP",
        nivelMinimo: 3, custoOuro: 100, classePermitida: "clerigo",
        ingredientes: [
            { nome: "Minério de Cobre", quantidade: 3 },
            { nome: "Minério de Estanho", quantidade: 1 },
            { nome: "Dente de Croco", quantidade: 2 }
        ],
        resultado: { tipo: "equipamento", nome: "Cetro de Cobre Sagrado", icone: "✝️", slot: "arma", stats: { atk: 3, def: 2, hp: 10 }, precoVenda: 50 }
    },
    {
        nome: "Cetro de Prata Abençoado", icone: "✝️", categoria: "equipamento",
        descricao: "Arma: +7 ATK, +5 DEF, +20 HP",
        nivelMinimo: 10, custoOuro: 300, classePermitida: "clerigo",
        ingredientes: [
            { nome: "Pepita de Prata", quantidade: 3 },
            { nome: "Minério de Ferro", quantidade: 2 },
            { nome: "Bandagem Mágica", quantidade: 2 }
        ],
        resultado: { tipo: "equipamento", nome: "Cetro de Prata Abençoado", icone: "✝️", slot: "arma", stats: { atk: 7, def: 5, hp: 20 }, precoVenda: 150 }
    },
    {
        nome: "Martelo da Luz Glacial", icone: "🔨", categoria: "equipamento",
        descricao: "Arma: +12 ATK, +10 DEF, +35 HP",
        nivelMinimo: 22, custoOuro: 700, classePermitida: "clerigo",
        ingredientes: [
            { nome: "Minério de Aço", quantidade: 3 },
            { nome: "Metal Congelado", quantidade: 2 },
            { nome: "Cristal de Gelo", quantidade: 2 }
        ],
        resultado: { tipo: "equipamento", nome: "Martelo da Luz Glacial", icone: "🔨", slot: "arma", stats: { atk: 12, def: 10, hp: 35 }, precoVenda: 350 }
    },
    {
        nome: "Cajado da Ressurreição Divina", icone: "✨", categoria: "equipamento",
        descricao: "Arma: +22 ATK, +14 DEF, +55 HP",
        nivelMinimo: 34, custoOuro: 1500, classePermitida: "clerigo",
        ingredientes: [
            { nome: "Minério de Mithril", quantidade: 4 },
            { nome: "Fragmento de Oricalco", quantidade: 1 },
            { nome: "Pena Divina", quantidade: 2 }
        ],
        resultado: { tipo: "equipamento", nome: "Cajado da Ressurreição Divina", icone: "✨", slot: "arma", stats: { atk: 22, def: 14, hp: 55 }, precoVenda: 750 }
    },
    // ══════════════════════════════════════════════
    //  ARMAS — LADINO 🗡️
    // ══════════════════════════════════════════════
    {
        nome: "Adaga de Bronze", icone: "🗡️", categoria: "equipamento",
        descricao: "Arma: +7 ATK",
        nivelMinimo: 3, custoOuro: 100, classePermitida: "ladino",
        ingredientes: [
            { nome: "Minério de Cobre", quantidade: 2 },
            { nome: "Minério de Estanho", quantidade: 2 },
            { nome: "Seda de Aranha", quantidade: 2 }
        ],
        resultado: { tipo: "equipamento", nome: "Adaga de Bronze", icone: "🗡️", slot: "arma", stats: { atk: 7, def: 0, hp: 0 }, precoVenda: 50 }
    },
    {
        nome: "Adaga de Ferro Envenenada", icone: "🗡️", categoria: "equipamento",
        descricao: "Arma: +14 ATK",
        nivelMinimo: 10, custoOuro: 300, classePermitida: "ladino",
        ingredientes: [
            { nome: "Minério de Ferro", quantidade: 3 },
            { nome: "Ferrão Venenoso", quantidade: 3 },
            { nome: "Garra Pútrida", quantidade: 1 }
        ],
        resultado: { tipo: "equipamento", nome: "Adaga de Ferro Envenenada", icone: "🗡️", slot: "arma", stats: { atk: 14, def: 0, hp: 0 }, precoVenda: 150 }
    },
    {
        nome: "Lâmina do Assassino Sombrio", icone: "🗡️", categoria: "equipamento",
        descricao: "Arma: +26 ATK, +2 DEF",
        nivelMinimo: 22, custoOuro: 700, classePermitida: "ladino",
        ingredientes: [
            { nome: "Minério de Aço", quantidade: 3 },
            { nome: "Cristal de Adamantina", quantidade: 1 },
            { nome: "Essência Sombria", quantidade: 2 }
        ],
        resultado: { tipo: "equipamento", nome: "Lâmina do Assassino Sombrio", icone: "🗡️", slot: "arma", stats: { atk: 26, def: 2, hp: 0 }, precoVenda: 350 }
    },
    {
        nome: "Punhal do Vazio Abissal", icone: "👻", categoria: "equipamento",
        descricao: "Arma: +40 ATK",
        nivelMinimo: 34, custoOuro: 1500, classePermitida: "ladino",
        ingredientes: [
            { nome: "Minério de Mithril", quantidade: 3 },
            { nome: "Fragmento de Oricalco", quantidade: 2 },
            { nome: "Tinta do Vazio", quantidade: 3 }
        ],
        resultado: { tipo: "equipamento", nome: "Punhal do Vazio Abissal", icone: "👻", slot: "arma", stats: { atk: 40, def: 0, hp: 0 }, precoVenda: 750 }
    },
    // ══════════════════════════════════════════════
    //  ARMAS — DRUIDA 🌿
    // ══════════════════════════════════════════════
    {
        nome: "Cajado de Espinhos", icone: "🌿", categoria: "equipamento",
        descricao: "Arma: +4 ATK, +1 DEF, +8 HP",
        nivelMinimo: 3, custoOuro: 100, classePermitida: "druida",
        ingredientes: [
            { nome: "Minério de Cobre", quantidade: 2 },
            { nome: "Pedra Pantanosa", quantidade: 2 },
            { nome: "Seiva Ácida", quantidade: 2 }
        ],
        resultado: { tipo: "equipamento", nome: "Cajado de Espinhos", icone: "🌿", slot: "arma", stats: { atk: 4, def: 1, hp: 8 }, precoVenda: 50 }
    },
    {
        nome: "Cajado da Terra Viva", icone: "🌳", categoria: "equipamento",
        descricao: "Arma: +8 ATK, +4 DEF, +18 HP",
        nivelMinimo: 10, custoOuro: 300, classePermitida: "druida",
        ingredientes: [
            { nome: "Minério de Ferro", quantidade: 2 },
            { nome: "Pepita de Prata", quantidade: 2 },
            { nome: "Cristal de Terra", quantidade: 1 }
        ],
        resultado: { tipo: "equipamento", nome: "Cajado da Terra Viva", icone: "🌳", slot: "arma", stats: { atk: 8, def: 4, hp: 18 }, precoVenda: 150 }
    },
    {
        nome: "Cajado do Bosque Ancestral", icone: "🌳", categoria: "equipamento",
        descricao: "Arma: +15 ATK, +8 DEF, +28 HP",
        nivelMinimo: 22, custoOuro: 700, classePermitida: "druida",
        ingredientes: [
            { nome: "Minério de Aço", quantidade: 2 },
            { nome: "Liga Vulcânica", quantidade: 1 },
            { nome: "Pelo de Yeti", quantidade: 3 }
        ],
        resultado: { tipo: "equipamento", nome: "Cajado do Bosque Ancestral", icone: "🌳", slot: "arma", stats: { atk: 15, def: 8, hp: 28 }, precoVenda: 350 }
    },
    {
        nome: "Cajado Mãe Natureza", icone: "🌟", categoria: "equipamento",
        descricao: "Arma: +25 ATK, +12 DEF, +45 HP",
        nivelMinimo: 34, custoOuro: 1500, classePermitida: "druida",
        ingredientes: [
            { nome: "Minério de Mithril", quantidade: 3 },
            { nome: "Essência Estelar", quantidade: 1 },
            { nome: "Asa Quebrada", quantidade: 2 }
        ],
        resultado: { tipo: "equipamento", nome: "Cajado Mãe Natureza", icone: "🌟", slot: "arma", stats: { atk: 25, def: 12, hp: 45 }, precoVenda: 750 }
    },

// ══════════════════════════════════════════════
    //  ARMAS — MONGE 🥊
    // ══════════════════════════════════════════════
    {
        nome: "Punhos de Bronze", icone: "🥊", categoria: "equipamento",
        descricao: "Arma: +5 ATK, +2 DEF",
        nivelMinimo: 3, custoOuro: 100, classePermitida: "monge",
        ingredientes: [
            { nome: "Minério de Cobre", quantidade: 3 },
            { nome: "Minério de Estanho", quantidade: 2 },
            { nome: "Pele de Warg", quantidade: 1 }
        ],
        resultado: { tipo: "equipamento", nome: "Punhos de Bronze", icone: "🥊", slot: "arma", stats: { atk: 5, def: 2, hp: 0 }, precoVenda: 50 }
    },
    {
        nome: "Garras de Ferro", icone: "🥊", categoria: "equipamento",
        descricao: "Arma: +10 ATK, +4 DEF, +8 HP",
        nivelMinimo: 10, custoOuro: 300, classePermitida: "monge",
        ingredientes: [
            { nome: "Minério de Ferro", quantidade: 3 },
            { nome: "Pepita de Prata", quantidade: 1 },
            { nome: "Dente de Ogro", quantidade: 2 }
        ],
        resultado: { tipo: "equipamento", nome: "Garras de Ferro", icone: "🥊", slot: "arma", stats: { atk: 10, def: 4, hp: 8 }, precoVenda: 150 }
    },
    {
        nome: "Garras de Adamantina", icone: "🥊", categoria: "equipamento",
        descricao: "Arma: +20 ATK, +6 DEF, +15 HP",
        nivelMinimo: 22, custoOuro: 700, classePermitida: "monge",
        ingredientes: [
            { nome: "Minério de Aço", quantidade: 3 },
            { nome: "Cristal de Adamantina", quantidade: 1 },
            { nome: "Chifre Flamejante", quantidade: 2 }
        ],
        resultado: { tipo: "equipamento", nome: "Garras de Adamantina", icone: "🥊", slot: "arma", stats: { atk: 20, def: 6, hp: 15 }, precoVenda: 350 }
    },
    {
        nome: "Punhos do Tigre Divino", icone: "🐲", categoria: "equipamento",
        descricao: "Arma: +32 ATK, +8 DEF, +20 HP",
        nivelMinimo: 34, custoOuro: 1500, classePermitida: "monge",
        ingredientes: [
            { nome: "Minério de Mithril", quantidade: 4 },
            { nome: "Fragmento de Oricalco", quantidade: 2 },
            { nome: "Sangue de Titã", quantidade: 1 }
        ],
        resultado: { tipo: "equipamento", nome: "Punhos do Tigre Divino", icone: "🐲", slot: "arma", stats: { atk: 32, def: 8, hp: 20 }, precoVenda: 750 }
    },

   
    // ══════════════════════════════════════
    //  ELIXIRES (todas as classes)
    // ══════════════════════════════════════
    {
        nome: "Elixir de Força", icone: "💪", categoria: "elixir",
        descricao: "+2 Força permanente",
        nivelMinimo: 7, custoOuro: 150,
        ingredientes: [
            { nome: "Lâmina Orcish", quantidade: 2 },
            { nome: "Couro Grosso", quantidade: 3 }
        ],
        resultado: { tipo: "elixir", stats: { forca: 2 } }
    },
    {
        nome: "Elixir de Vigor", icone: "❤️", categoria: "elixir",
        descricao: "+2 Vigor permanente",
        nivelMinimo: 7, custoOuro: 150,
        ingredientes: [
            { nome: "Pele de Lobo", quantidade: 3 },
            { nome: "Dente de Croco", quantidade: 2 }
        ],
        resultado: { tipo: "elixir", stats: { vigor: 2 } }
    },
    {
        nome: "Elixir de Destreza", icone: "🏹", categoria: "elixir",
        descricao: "+2 Destreza permanente",
        nivelMinimo: 10, custoOuro: 250,
        ingredientes: [
            { nome: "Pena de Harpia", quantidade: 3 },
            { nome: "Ferrão Venenoso", quantidade: 2 }
        ],
        resultado: { tipo: "elixir", stats: { destreza: 2 } }
    },
    {
        nome: "Elixir de Inteligência", icone: "🔮", categoria: "elixir",
        descricao: "+2 Inteligência permanente",
        nivelMinimo: 16, custoOuro: 350,
        ingredientes: [
            { nome: "Grimório Sombrio", quantidade: 2 },
            { nome: "Ectoplasma", quantidade: 3 }
        ],
        resultado: { tipo: "elixir", stats: { inteligencia: 2 } }
    },
    {
        nome: "Elixir de Sabedoria", icone: "📖", categoria: "elixir",
        descricao: "+2 Sabedoria permanente",
        nivelMinimo: 19, custoOuro: 400,
        ingredientes: [
            { nome: "Segmento Cristalizado", quantidade: 2 },
            { nome: "Pedra Rúnica", quantidade: 2 }
        ],
        resultado: { tipo: "elixir", stats: { sabedoria: 2 } }
    },
    {
        nome: "Elixir de Carisma", icone: "🗣️", categoria: "elixir",
        descricao: "+2 Carisma permanente",
        nivelMinimo: 22, custoOuro: 450,
        ingredientes: [
            { nome: "Escama Dourada", quantidade: 2 },
            { nome: "Turbante Encantado", quantidade: 2 }
        ],
        resultado: { tipo: "elixir", stats: { carisma: 2 } }
    },
    {
        nome: "Elixir Supremo", icone: "⭐", categoria: "elixir",
        descricao: "+2 em TODOS os atributos",
        nivelMinimo: 35, custoOuro: 3000,
        ingredientes: [
            { nome: "Poeira Estelar", quantidade: 5 },
            { nome: "Fragmento da Morte", quantidade: 3 },
            { nome: "Coração de Magma", quantidade: 2 }
        ],
        resultado: { tipo: "elixir", stats: { forca: 2, destreza: 2, vigor: 2, inteligencia: 2, sabedoria: 2, carisma: 2 } }
    },


    
    // ══════════════════════════════════════
    //  EQUIPAMENTOS — GUERREIRO ⚔️
    // ══════════════════════════════════════
    {
        nome: "Cinto de Combate", icone: "🎗️", categoria: "equipamento",
        descricao: "Amuleto: +4 ATK, +2 DEF",
        nivelMinimo: 3, custoOuro: 80, classePermitida: "guerreiro",
        ingredientes: [
            { nome: "Pele de Lobo", quantidade: 3 },
            { nome: "Couro Grosso", quantidade: 2 }
        ],
        resultado: { tipo: "equipamento", nome: "Cinto de Combate", icone: "🎗️", slot: "amuleto", stats: { atk: 4, def: 2, hp: 0 }, precoVenda: 40 }
    },
    {
        nome: "Grevas de Batalha", icone: "👢", categoria: "equipamento",
        descricao: "Botas: +6 ATK, +8 DEF",
        nivelMinimo: 10, custoOuro: 300, classePermitida: "guerreiro",
        ingredientes: [
            { nome: "Ferradura Antiga", quantidade: 3 },
            { nome: "Osso Encantado", quantidade: 2 }
        ],
        resultado: { tipo: "equipamento", nome: "Grevas de Batalha", icone: "👢", slot: "botas", stats: { atk: 6, def: 8, hp: 0 }, precoVenda: 150 }
    },
    {
        nome: "Anel do Berserker", icone: "💍", categoria: "equipamento",
        descricao: "Anel: +15 ATK, +5 DEF",
        nivelMinimo: 22, custoOuro: 700, classePermitida: "guerreiro",
        ingredientes: [
            { nome: "Escama Ígnea", quantidade: 3 },
            { nome: "Cristal de Terra", quantidade: 2 }
        ],
        resultado: { tipo: "equipamento", nome: "Anel do Berserker", icone: "💍", slot: "anel", stats: { atk: 15, def: 5, hp: 0 }, precoVenda: 350 }
    },

    // ══════════════════════════════════════
    //  EQUIPAMENTOS — PALADINO ✨
    // ══════════════════════════════════════
    {
        nome: "Amuleto da Fé", icone: "📿", categoria: "equipamento",
        descricao: "Amuleto: +2 ATK, +3 DEF, +10 HP",
        nivelMinimo: 3, custoOuro: 80, classePermitida: "paladino",
        ingredientes: [
            { nome: "Seda de Aranha", quantidade: 3 },
            { nome: "Pele de Lobo", quantidade: 2 }
        ],
        resultado: { tipo: "equipamento", nome: "Amuleto da Fé", icone: "📿", slot: "amuleto", stats: { atk: 2, def: 3, hp: 10 }, precoVenda: 40 }
    },
    {
        nome: "Botas Sagradas", icone: "👢", categoria: "equipamento",
        descricao: "Botas: +4 ATK, +8 DEF, +15 HP",
        nivelMinimo: 10, custoOuro: 300, classePermitida: "paladino",
        ingredientes: [
            { nome: "Pedra Rúnica", quantidade: 2 },
            { nome: "Bandagem Mágica", quantidade: 3 }
        ],
        resultado: { tipo: "equipamento", nome: "Botas Sagradas", icone: "👢", slot: "botas", stats: { atk: 4, def: 8, hp: 15 }, precoVenda: 150 }
    },
    {
        nome: "Anel da Luz Eterna", icone: "💍", categoria: "equipamento",
        descricao: "Anel: +8 ATK, +10 DEF, +25 HP",
        nivelMinimo: 22, custoOuro: 700, classePermitida: "paladino",
        ingredientes: [
            { nome: "Cristal de Gelo", quantidade: 3 },
            { nome: "Pena de Fênix", quantidade: 1 }
        ],
        resultado: { tipo: "equipamento", nome: "Anel da Luz Eterna", icone: "💍", slot: "anel", stats: { atk: 8, def: 10, hp: 25 }, precoVenda: 350 }
    },

    // ══════════════════════════════════════
    //  EQUIPAMENTOS — ARQUEIRO 🏹
    // ══════════════════════════════════════
    {
        nome: "Braceleira do Caçador", icone: "🎗️", categoria: "equipamento",
        descricao: "Amuleto: +5 ATK",
        nivelMinimo: 3, custoOuro: 80, classePermitida: "arqueiro",
        ingredientes: [
            { nome: "Pena de Harpia", quantidade: 2 },
            { nome: "Pele de Warg", quantidade: 2 }
        ],
        resultado: { tipo: "equipamento", nome: "Braceleira do Caçador", icone: "🎗️", slot: "amuleto", stats: { atk: 5, def: 0, hp: 0 }, precoVenda: 40 }
    },
    {
        nome: "Botas Ágeis", icone: "👢", categoria: "equipamento",
        descricao: "Botas: +8 ATK, +5 DEF",
        nivelMinimo: 10, custoOuro: 300, classePermitida: "arqueiro",
        ingredientes: [
            { nome: "Escama Dourada", quantidade: 2 },
            { nome: "Ferrão Venenoso", quantidade: 2 }
        ],
        resultado: { tipo: "equipamento", nome: "Botas Ágeis", icone: "👢", slot: "botas", stats: { atk: 8, def: 5, hp: 0 }, precoVenda: 150 }
    },
    {
        nome: "Anel do Falcão Supremo", icone: "💍", categoria: "equipamento",
        descricao: "Anel: +16 ATK, +10 HP",
        nivelMinimo: 22, custoOuro: 700, classePermitida: "arqueiro",
        ingredientes: [
            { nome: "Seda Real", quantidade: 3 },
            { nome: "Dente de Ogro", quantidade: 2 }
        ],
        resultado: { tipo: "equipamento", nome: "Anel do Falcão Supremo", icone: "💍", slot: "anel", stats: { atk: 16, def: 0, hp: 10 }, precoVenda: 350 }
    },

    // ══════════════════════════════════════
    //  EQUIPAMENTOS — MAGO 🔮
    // ══════════════════════════════════════
    {
        nome: "Amuleto Arcano", icone: "📿", categoria: "equipamento",
        descricao: "Amuleto: +4 ATK, +8 HP",
        nivelMinimo: 3, custoOuro: 80, classePermitida: "mago",
        ingredientes: [
            { nome: "Glândula Tóxica", quantidade: 2 },
            { nome: "Moeda Antiga", quantidade: 3 }
        ],
        resultado: { tipo: "equipamento", nome: "Amuleto Arcano", icone: "📿", slot: "amuleto", stats: { atk: 4, def: 0, hp: 8 }, precoVenda: 40 }
    },
    {
        nome: "Botas Etéreas", icone: "👢", categoria: "equipamento",
        descricao: "Botas: +5 ATK, +4 DEF, +15 HP",
        nivelMinimo: 10, custoOuro: 300, classePermitida: "mago",
        ingredientes: [
            { nome: "Grimório Sombrio", quantidade: 1 },
            { nome: "Ectoplasma", quantidade: 3 }
        ],
        resultado: { tipo: "equipamento", nome: "Botas Etéreas", icone: "👢", slot: "botas", stats: { atk: 5, def: 4, hp: 15 }, precoVenda: 150 }
    },
    {
        nome: "Anel do Vórtice", icone: "💍", categoria: "equipamento",
        descricao: "Anel: +14 ATK, +20 HP",
        nivelMinimo: 22, custoOuro: 700, classePermitida: "mago",
        ingredientes: [
            { nome: "Segmento Cristalizado", quantidade: 2 },
            { nome: "Coração de Magma", quantidade: 1 }
        ],
        resultado: { tipo: "equipamento", nome: "Anel do Vórtice", icone: "💍", slot: "anel", stats: { atk: 14, def: 0, hp: 20 }, precoVenda: 350 }
    },

    // ══════════════════════════════════════
    //  EQUIPAMENTOS — CLÉRIGO 📖
    // ══════════════════════════════════════
    {
        nome: "Símbolo Sagrado", icone: "📿", categoria: "equipamento",
        descricao: "Amuleto: +2 ATK, +3 DEF, +12 HP",
        nivelMinimo: 3, custoOuro: 80, classePermitida: "clerigo",
        ingredientes: [
            { nome: "Dente de Croco", quantidade: 2 },
            { nome: "Escama Pantanosa", quantidade: 2 }
        ],
        resultado: { tipo: "equipamento", nome: "Símbolo Sagrado", icone: "📿", slot: "amuleto", stats: { atk: 2, def: 3, hp: 12 }, precoVenda: 40 }
    },
    {
        nome: "Botas do Peregrino", icone: "👢", categoria: "equipamento",
        descricao: "Botas: +3 ATK, +8 DEF, +20 HP",
        nivelMinimo: 10, custoOuro: 300, classePermitida: "clerigo",
        ingredientes: [
            { nome: "Insígnia Antiga", quantidade: 2 },
            { nome: "Bandagem Mágica", quantidade: 2 }
        ],
        resultado: { tipo: "equipamento", nome: "Botas do Peregrino", icone: "👢", slot: "botas", stats: { atk: 3, def: 8, hp: 20 }, precoVenda: 150 }
    },
    {
        nome: "Anel da Cura Divina", icone: "💍", categoria: "equipamento",
        descricao: "Anel: +6 ATK, +12 DEF, +30 HP",
        nivelMinimo: 22, custoOuro: 700, classePermitida: "clerigo",
        ingredientes: [
            { nome: "Pelo de Yeti", quantidade: 3 },
            { nome: "Cristal de Gelo", quantidade: 2 }
        ],
        resultado: { tipo: "equipamento", nome: "Anel da Cura Divina", icone: "💍", slot: "anel", stats: { atk: 6, def: 12, hp: 30 }, precoVenda: 350 }
    },

    // ══════════════════════════════════════
    //  EQUIPAMENTOS — LADINO 🗡️
    // ══════════════════════════════════════
    {
        nome: "Capa das Sombras", icone: "🎗️", categoria: "equipamento",
        descricao: "Amuleto: +5 ATK, +1 DEF",
        nivelMinimo: 3, custoOuro: 80, classePermitida: "ladino",
        ingredientes: [
            { nome: "Seda de Aranha", quantidade: 3 },
            { nome: "Pele de Warg", quantidade: 2 }
        ],
        resultado: { tipo: "equipamento", nome: "Capa das Sombras", icone: "🎗️", slot: "amuleto", stats: { atk: 5, def: 1, hp: 0 }, precoVenda: 40 }
    },
    {
        nome: "Botas Furtivas +", icone: "👢", categoria: "equipamento",
        descricao: "Botas: +9 ATK, +4 DEF",
        nivelMinimo: 10, custoOuro: 300, classePermitida: "ladino",
        ingredientes: [
            { nome: "Garra Pútrida", quantidade: 3 },
            { nome: "Turbante Encantado", quantidade: 1 }
        ],
        resultado: { tipo: "equipamento", nome: "Botas Furtivas +", icone: "👢", slot: "botas", stats: { atk: 9, def: 4, hp: 0 }, precoVenda: 150 }
    },
    {
        nome: "Anel Envenenado", icone: "💍", categoria: "equipamento",
        descricao: "Anel: +18 ATK",
        nivelMinimo: 22, custoOuro: 700, classePermitida: "ladino",
        ingredientes: [
            { nome: "Chifre Flamejante", quantidade: 3 },
            { nome: "Presa Congelada", quantidade: 2 }
        ],
        resultado: { tipo: "equipamento", nome: "Anel Envenenado", icone: "💍", slot: "anel", stats: { atk: 18, def: 0, hp: 0 }, precoVenda: 350 }
    },

    // ══════════════════════════════════════
    //  EQUIPAMENTOS — DRUIDA 🌿
    // ══════════════════════════════════════
    {
        nome: "Amuleto da Natureza", icone: "📿", categoria: "equipamento",
        descricao: "Amuleto: +3 ATK, +2 DEF, +8 HP",
        nivelMinimo: 3, custoOuro: 80, classePermitida: "druida",
        ingredientes: [
            { nome: "Seiva Ácida", quantidade: 2 },
            { nome: "Couro Grosso", quantidade: 3 }
        ],
        resultado: { tipo: "equipamento", nome: "Amuleto da Natureza", icone: "📿", slot: "amuleto", stats: { atk: 3, def: 2, hp: 8 }, precoVenda: 40 }
    },
    {
        nome: "Botas do Bosque", icone: "👢", categoria: "equipamento",
        descricao: "Botas: +5 ATK, +6 DEF, +12 HP",
        nivelMinimo: 10, custoOuro: 300, classePermitida: "druida",
        ingredientes: [
            { nome: "Pedra Rúnica", quantidade: 2 },
            { nome: "Núcleo de Areia", quantidade: 1 }
        ],
        resultado: { tipo: "equipamento", nome: "Botas do Bosque", icone: "👢", slot: "botas", stats: { atk: 5, def: 6, hp: 12 }, precoVenda: 150 }
    },
    {
        nome: "Anel das Raízes Profundas", icone: "💍", categoria: "equipamento",
        descricao: "Anel: +10 ATK, +8 DEF, +18 HP",
        nivelMinimo: 22, custoOuro: 700, classePermitida: "druida",
        ingredientes: [
            { nome: "Cristal de Terra", quantidade: 2 },
            { nome: "Coração Glacial", quantidade: 1 }
        ],
        resultado: { tipo: "equipamento", nome: "Anel das Raízes Profundas", icone: "💍", slot: "anel", stats: { atk: 10, def: 8, hp: 18 }, precoVenda: 350 }
    },

    // ══════════════════════════════════════
    //  EQUIPAMENTOS — MONGE 🥊
    // ══════════════════════════════════════
    {
        nome: "Faixa de Treino", icone: "🎗️", categoria: "equipamento",
        descricao: "Amuleto: +3 ATK, +3 DEF",
        nivelMinimo: 3, custoOuro: 80, classePermitida: "monge",
        ingredientes: [
            { nome: "Lâmina Orcish", quantidade: 1 },
            { nome: "Couro Grosso", quantidade: 3 }
        ],
        resultado: { tipo: "equipamento", nome: "Faixa de Treino", icone: "🎗️", slot: "amuleto", stats: { atk: 3, def: 3, hp: 0 }, precoVenda: 40 }
    },
    {
        nome: "Sandálias do Mestre", icone: "👢", categoria: "equipamento",
        descricao: "Botas: +7 ATK, +6 DEF, +8 HP",
        nivelMinimo: 10, custoOuro: 300, classePermitida: "monge",
        ingredientes: [
            { nome: "Osso Encantado", quantidade: 2 },
            { nome: "Ferradura Antiga", quantidade: 2 }
        ],
        resultado: { tipo: "equipamento", nome: "Sandálias do Mestre", icone: "👢", slot: "botas", stats: { atk: 7, def: 6, hp: 8 }, precoVenda: 150 }
    },
    {
        nome: "Anel do Equilíbrio Perfeito", icone: "💍", categoria: "equipamento",
        descricao: "Anel: +12 ATK, +8 DEF, +12 HP",
        nivelMinimo: 22, custoOuro: 700, classePermitida: "monge",
        ingredientes: [
            { nome: "Escama Ígnea", quantidade: 2 },
            { nome: "Pelo de Yeti", quantidade: 2 }
        ],
        resultado: { tipo: "equipamento", nome: "Anel do Equilíbrio Perfeito", icone: "💍", slot: "anel", stats: { atk: 12, def: 8, hp: 12 }, precoVenda: 350 }
    }
];

// ============================================
// SISTEMA DE ALQUIMIA — FUNÇÕES
// ============================================

var abaAlquimiaAtual = "pocao";

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

// Abrir painel de alquimia
function abrirAlquimia() {
    mostrarPainel('alquimiaPanel');
    abaAlquimiaAtual = "pocao";
    trocarAbaAlquimia("pocao");
}

// Fechar alquimia
function fecharAlquimia() {
    mostrarPainel('cidadePanel');
}

// Trocar abas
function trocarAbaAlquimia(aba) {
    abaAlquimiaAtual = aba;

    // Atualizar visual das abas
    ["Pocao", "Elixir", "Equip", "Materiais"].forEach(function(t) {
        var btn = document.getElementById("tabAlq" + t);
        if (btn) btn.classList.remove("active-tab");
    });

    var tabMap = { "pocao": "Pocao", "elixir": "Elixir", "equipamento": "Equip", "materiais": "Materiais" };
    var btnAtivo = document.getElementById("tabAlq" + tabMap[aba]);
    if (btnAtivo) btnAtivo.classList.add("active-tab");

    // Atualizar ouro
    var goldEl = document.getElementById("alquimiaGoldUI");
    if (goldEl) goldEl.textContent = player.gold;

    renderizarAlquimia(aba);
}

// Renderizar receitas
function renderizarAlquimia(categoria) {
    var container = document.getElementById("alquimiaLista");
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
    for (var i = 0; i < receitasAlquimia.length; i++) {
        var r = receitasAlquimia[i];
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
    var receita = receitasAlquimia[idx];
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
    var goldEl = document.getElementById("alquimiaGoldUI");
    if (goldEl) goldEl.textContent = player.gold;
    renderizarAlquimia(abaAlquimiaAtual);
    updateUI();
}
// ============================================
// SISTEMA DE NPCs — TAVERNA
// ============================================

var npcsData = {
    estalajadeira: {
        nome: "Marta",
        emoji: "👩‍🍳",
        role: "Estalajadeira",
        dialogos: [
            // Baseado no nível do jogador
            { nivelMax: 5, falas: [
                "Bem-vindo, aventureiro! Você parece novo por aqui. A Floresta Sombria é perigosa, mas nada que uma boa noite de sono não resolva!",
                "Ouvi dizer que lobos estão mais agressivos na floresta. Cuidado por lá!",
                "Quer uma dica? Sempre tenha poções no inventário antes de sair para caçar."
            ]},
            { nivelMax: 15, falas: [
                "Você está ficando forte! Já ouviu falar das Ruínas Esquecidas? Dizem que há tesouros antigos por lá.",
                "Um viajante disse que viu um Golem de Pedra nas ruínas. Deve ser duro como uma rocha... literalmente!",
                "A Alquimia pode salvar sua vida. Junte materiais dos monstros e crie poções poderosas!"
            ]},
            { nivelMax: 30, falas: [
                "Os tempos estão sombrios... monstros mais fortes aparecem a cada dia.",
                "Dizem que no fundo da Caverna Profunda existe um dragão adormecido. Será verdade?",
                "Já tentou se juntar a uma Guilda? Eles oferecem bônus que fazem diferença em combate."
            ]},
            { nivelMax: 99, falas: [
                "Nunca pensei que veria alguém tão poderoso nesta taverna humilde...",
                "Lendas falam do Trono dos Deuses. Poucos mortais ousaram chegar lá.",
                "Você é a esperança deste reino. Que os deuses o protejam... ou temam."
            ]}
        ]
    },
    ferreiro: {
        nome: "Gundrik",
        emoji: "👨‍🔧",
        role: "Ferreiro",
        dialogos: [
            { nivelMax: 5, falas: [
                "Hã? Quer equipamentos? Dá uma olhada no que tenho. Nada de luxo, mas funciona!",
                "Cada arma tem uma história. Essa espada enferrujada? Pertenceu a um soldado caído na floresta.",
                "Mate alguns monstros e junte materiais. Na Alquimia você pode forjar coisas interessantes!"
            ]},
            { nivelMax: 15, falas: [
                "Você precisa de equipamento melhor. Os monstros do deserto não são brincadeira.",
                "Já ouviu falar de Minério de Ferro das ruínas? É o melhor material que conheço!",
                "Uma armadura boa vale mais que dez poções. Invista em defesa!"
            ]},
            { nivelMax: 30, falas: [
                "Escamas de Dragão... Se me trouxer, posso fazer maravilhas na forja!",
                "Equipamentos das áreas avançadas têm poder que eu nunca conseguiria forjar.",
                "Cristais de Gelo da Geleira Eterna... Dizem que nunca derretem. Fascinante!"
            ]},
            { nivelMax: 99, falas: [
                "Seu equipamento... nunca vi nada igual. Que material é esse?!",
                "Se você conseguir Fragmentos Divinos, eu daria tudo para estudá-los!",
                "Lendas dizem que os deuses forjaram suas armas com Poeira Estelar pura."
            ]}
        ]
    },
    misterioso: {
        nome: "Sombra",
        emoji: "🧙",
        role: "Figura Misteriosa",
        dialogos: [
            { nivelMax: 5, falas: [
                "Psst... você. Sim, você. Já explorou as masmorras? Há segredos que poucos conhecem...",
                "Nem tudo é o que parece na floresta. Às vezes, fugir é mais sábio que lutar.",
                "Ouvi rumores de eventos estranhos nas áreas de exploração. Fique atento..."
            ]},
            { nivelMax: 15, falas: [
                "O Cemitério Profano guarda mais que ossos... Necromantes escondem grimórios poderosos.",
                "Você sabia que monstros Elite dropam itens melhores? Vale a pena enfrentá-los.",
                "As Guildas desta cidade oferecem poder... mas a que preço? Escolha com sabedoria."
            ]},
            { nivelMax: 30, falas: [
                "O Abismo Sombrio não é apenas um lugar... é uma entidade. Ela observa quem entra.",
                "Elixires da Alquimia dão poder permanente. Não os subestime.",
                "Já viu o que acontece quando mistura Essência Sombria com Cristal Mágico? Experimente..."
            ]},
            { nivelMax: 99, falas: [
                "Você chegou mais longe que qualquer mortal. O Trono dos Deuses te aguarda.",
                "O Avatar da Destruição não é o fim... é apenas o começo de algo maior.",
                "Quando derrotar o Deus Corrompido Axiom... volte aqui. Terei algo para você."
            ]}
        ]
    },
    comerciante: {
        nome: "Lydia",
        emoji: "👩‍💼",
        role: "Comerciante Viajante",
        dialogos: [
            { nivelMax: 5, falas: [
                "Compre barato, venda caro — essa é a regra de ouro! Literalmente!",
                "Dica de negócios: drops de monstros podem valer mais do que você imagina.",
                "A loja tem poções, mas a Alquimia faz por metade do preço... se tiver os materiais!"
            ]},
            { nivelMax: 15, falas: [
                "Já visitei todas as áreas deste reino. O deserto tem os melhores tesouros!",
                "Materiais raros valem fortunas nas cidades maiores. Guarde os melhores!",
                "Ouvi que a Arena paga bem para quem sobrevive às ondas. Interessado?"
            ]},
            { nivelMax: 30, falas: [
                "Escamas de Dragão, Cristais de Gelo... Eu pagaria uma fortuna por eles!",
                "Os aventureiros mais ricos são os que sabem quando gastar e quando guardar.",
                "A Guilda das Sombras tem os melhores bônus de ouro. Só dizendo..."
            ]},
            { nivelMax: 99, falas: [
                "Fragmentos Divinos... Se eu tivesse um, me aposentaria na hora!",
                "Você deve ser o aventureiro mais rico do reino! Ou mais endividado...",
                "Diz a lenda que no Trono dos Deuses há ouro infinito. Traga um pouco pra mim!"
            ]}
        ]
    }
};

function abrirTaverna() {
    mostrarPainel('tavernaPanel');
    renderizarNPCs();
}

function fecharTaverna() {
    mostrarPainel('cidadePanel');
}

function renderizarNPCs() {
    var container = document.getElementById('npcListContainer');
    var dialogBox = document.getElementById('npcDialogueBox');
    if (!container) return;
    if (dialogBox) dialogBox.style.display = 'none';

    var html = '<div class="npc-list">';
    var npcKeys = Object.keys(npcsData);
    for (var i = 0; i < npcKeys.length; i++) {
        var key = npcKeys[i];
        var npc = npcsData[key];
        html += '<div class="npc-card" onclick="falarComNPC(\'' + key + '\')">'
            + '<span class="npc-emoji">' + npc.emoji + '</span>'
            + '<div class="npc-nome">' + npc.nome + '</div>'
            + '<div class="npc-role">' + npc.role + '</div>'
            + '</div>';
    }
    html += '</div>';
    container.innerHTML = html;
}

function falarComNPC(npcKey) {
    var npc = npcsData[npcKey];
    if (!npc) return;

    var dialogBox = document.getElementById('npcDialogueBox');
    var dialogContent = document.getElementById('npcDialogueContent');
    if (!dialogBox || !dialogContent) return;

    // Encontrar falas do nível atual
    var falasAtuais = npc.dialogos[0].falas;
    for (var i = 0; i < npc.dialogos.length; i++) {
        if (player.level <= npc.dialogos[i].nivelMax) {
            falasAtuais = npc.dialogos[i].falas;
            break;
        }
    }

    // Escolher fala aleatória
    var fala = falasAtuais[Math.floor(Math.random() * falasAtuais.length)];

    var html = '<div class="dialogue-box">'
        + '<div class="dialogue-header">'
        +   '<span class="dialogue-npc-icon">' + npc.emoji + '</span>'
        +   '<span class="dialogue-npc-name">' + npc.nome + ' — ' + npc.role + '</span>'
        + '</div>'
        + '<div class="dialogue-text">"' + fala + '"</div>'
        + '</div>';

    dialogContent.innerHTML = html;
    dialogBox.style.display = 'block';
}

function fecharDialogo() {
    var dialogBox = document.getElementById('npcDialogueBox');
    if (dialogBox) dialogBox.style.display = 'none';
}
// ============================================
// SISTEMA DE GUILDAS
// ============================================

var guildasData = {
    guerreiros: {
        nome: "Guilda dos Guerreiros",
        emoji: "⚔️",
        classe: "guilda-guerreiros",
        cor: "#ef4444",
        bonus: "+10% ATK",
        bonusDesc: "Aumente seu poder de ataque",
        descricao: "Força e honra acima de tudo",
        efeito: { tipo: "atk", valor: 0.10 },
        custoEntrar: 0,
        custoTrocar: 500
    },
    arcano: {
        nome: "Círculo Arcano",
        emoji: "🔮",
        classe: "guilda-arcano",
        cor: "#a78bfa",
        bonus: "+15% Dano de Habilidade",
        bonusDesc: "Habilidades causam mais dano",
        descricao: "O conhecimento é a arma suprema",
        efeito: { tipo: "habilidade", valor: 0.15 },
        custoEntrar: 0,
        custoTrocar: 500
    },
    sombras: {
        nome: "Irmandade das Sombras",
        emoji: "🗡️",
        classe: "guilda-sombras",
        cor: "#94a3b8",
        bonus: "+15% Ouro",
        bonusDesc: "Ganhe mais ouro dos monstros",
        descricao: "Lucro e sobrevivência",
        efeito: { tipo: "ouro", valor: 0.15 },
        custoEntrar: 0,
        custoTrocar: 500
    },
    protetores: {
        nome: "Ordem dos Protetores",
        emoji: "🛡️",
        classe: "guilda-protetores",
        cor: "#38bdf8",
        bonus: "+10% DEF e +10% HP",
        bonusDesc: "Sobreviva mais tempo em combate",
        descricao: "Defender os fracos é nosso dever",
        efeito: { tipo: "defhp", valor: 0.10 },
        custoEntrar: 0,
        custoTrocar: 500
    }
};

// Estado da guilda (adicionar ao save do player)
if (!player.guilda) {
    player.guilda = {
        atual: null,
        rank: 0,
        xp: 0,
        xpProximo: 100,
        missaoAtiva: null,
        missaoProgresso: 0
    };
}

var missoesPorGuilda = {
    guerreiros: [
        { desc: "Derrote 5 monstros", tipo: "monstros", meta: 5, recompensaOuro: 50, recompensaXp: 20 },
        { desc: "Derrote 10 monstros", tipo: "monstros", meta: 10, recompensaOuro: 120, recompensaXp: 50 },
        { desc: "Derrote 3 Elites", tipo: "elites", meta: 3, recompensaOuro: 200, recompensaXp: 80 },
        { desc: "Derrote 1 Boss", tipo: "bosses", meta: 1, recompensaOuro: 300, recompensaXp: 100 },
        { desc: "Derrote 20 monstros", tipo: "monstros", meta: 20, recompensaOuro: 250, recompensaXp: 100 }
    ],
    arcano: [
        { desc: "Use habilidade 3 vezes", tipo: "habilidades", meta: 3, recompensaOuro: 50, recompensaXp: 20 },
        { desc: "Complete 2 masmorras", tipo: "masmorras", meta: 2, recompensaOuro: 150, recompensaXp: 60 },
        { desc: "Colete 5 materiais", tipo: "materiais", meta: 5, recompensaOuro: 100, recompensaXp: 40 },
        { desc: "Use habilidade 10 vezes", tipo: "habilidades", meta: 10, recompensaOuro: 200, recompensaXp: 80 },
        { desc: "Complete 5 masmorras", tipo: "masmorras", meta: 5, recompensaOuro: 300, recompensaXp: 120 }
    ],
    sombras: [
        { desc: "Ganhe 100 de ouro", tipo: "ouro", meta: 100, recompensaOuro: 60, recompensaXp: 20 },
        { desc: "Fuja 2 vezes", tipo: "fugas", meta: 2, recompensaOuro: 80, recompensaXp: 30 },
        { desc: "Ganhe 300 de ouro", tipo: "ouro", meta: 300, recompensaOuro: 150, recompensaXp: 60 },
        { desc: "Venda 5 itens", tipo: "vendas", meta: 5, recompensaOuro: 200, recompensaXp: 70 },
        { desc: "Ganhe 1000 de ouro", tipo: "ouro", meta: 1000, recompensaOuro: 400, recompensaXp: 150 }
    ],
    protetores: [
        { desc: "Defenda 3 vezes em combate", tipo: "defesas", meta: 3, recompensaOuro: 50, recompensaXp: 20 },
        { desc: "Cure 200 HP total", tipo: "cura", meta: 200, recompensaOuro: 100, recompensaXp: 40 },
        { desc: "Sobreviva a 5 combates", tipo: "monstros", meta: 5, recompensaOuro: 120, recompensaXp: 50 },
        { desc: "Defenda 10 vezes", tipo: "defesas", meta: 10, recompensaOuro: 200, recompensaXp: 80 },
        { desc: "Sobreviva a 15 combates", tipo: "monstros", meta: 15, recompensaOuro: 300, recompensaXp: 120 }
    ]
};

function abrirGuilda() {
    // Garantir que player.guilda existe
    if (!player.guilda) {
        player.guilda = {
            atual: null,
            rank: 0,
            xp: 0,
            xpProximo: 100,
            missaoAtiva: null,
            missaoProgresso: 0
        };
    }
    mostrarPainel('guildaPanel');
    renderizarGuilda();
}

function fecharGuilda() {
    mostrarPainel('cidadePanel');
}

function renderizarGuilda() {
    var container = document.getElementById('guildaContent');
    if (!container) return;

    var html = '';

    // Se já tem guilda, mostrar status
    if (player.guilda.atual) {
        var g = guildasData[player.guilda.atual];
        var progresso = Math.min(100, (player.guilda.xp / player.guilda.xpProximo) * 100);

        html += '<div class="guilda-atual">'
            + '<span style="font-size:2em;">' + g.emoji + '</span>'
            + '<h4 style="color:' + g.cor + ';">' + g.nome + '</h4>'
            + '<p style="color:#94a3b8;font-size:0.85em;">Rank: <strong style="color:#ffd700;">' + player.guilda.rank + '</strong> | Bônus: <strong style="color:' + g.cor + ';">' + g.bonus + '</strong></p>'
            + '<div class="guilda-rank-bar">'
            +   '<div class="guilda-rank-fill" style="width:' + progresso + '%;background:' + g.cor + ';"></div>'
            + '</div>'
            + '<p style="color:#64748b;font-size:0.75em;">XP de Guilda: ' + player.guilda.xp + '/' + player.guilda.xpProximo + '</p>'
            + '</div>';

        // Missão ativa
        var missoes = missoesPorGuilda[player.guilda.atual];
        var missaoIdx = Math.min(player.guilda.rank, missoes.length - 1);
        var missao = missoes[missaoIdx];

        html += '<div class="guilda-missao">'
            + '<h4>📜 Missão da Guilda</h4>'
            + '<p class="guilda-missao-desc">' + missao.desc + '</p>'
            + '<p class="guilda-missao-progresso">Progresso: ' + (player.guilda.missaoProgresso || 0) + '/' + missao.meta + '</p>'
            + '<p style="color:#fbbf24;font-size:0.78em;margin-top:4px;">Recompensa: 💰' + missao.recompensaOuro + ' | 📊' + missao.recompensaXp + ' XP</p>'
            + '</div>';
    }

    // Grid de guildas
    html += '<h4 style="color:#94a3b8;text-align:center;margin:15px 0 10px;font-size:0.9em;">'
        + (player.guilda.atual ? '🔄 Trocar de Guilda (custa 500 ouro + perde rank)' : '📝 Escolha sua Guilda (gratuito)') + '</h4>';

    html += '<div class="guildas-grid">';
    var guildaKeys = Object.keys(guildasData);
    for (var i = 0; i < guildaKeys.length; i++) {
        var key = guildaKeys[i];
        var g = guildasData[key];
        var isAtual = player.guilda.atual === key;

        html += '<div class="guilda-card ' + g.classe + (isAtual ? ' guilda-atual-card' : '') + '" '
            + 'onclick="entrarGuilda(\'' + key + '\')">'
            + (isAtual ? '<span class="guilda-badge" style="background:' + g.cor + ';color:white;">ATUAL</span>' : '')
            + '<span class="guilda-icon">' + g.emoji + '</span>'
            + '<div class="guilda-nome">' + g.nome + '</div>'
            + '<div class="guilda-bonus">' + g.bonus + '</div>'
            + '<div class="guilda-desc">' + g.descricao + '</div>'
            + '</div>';
    }
    html += '</div>';

    container.innerHTML = html;
}

function entrarGuilda(guildaKey) {
    if (player.guilda.atual === guildaKey) {
        mostrarNotificacao("Você já pertence a esta guilda!");
        return;
    }

    if (player.guilda.atual) {
        // Trocar de guilda
        if (player.gold < 500) {
            mostrarNotificacao("❌ Precisa de 500 ouro para trocar de guilda!");
            return;
        }
        if (!confirm("Trocar de guilda custa 500 ouro e você perde seu rank. Continuar?")) return;
        player.gold -= 500;
        player.guilda.rank = 0;
        player.guilda.xp = 0;
        player.guilda.missaoProgresso = 0;
        mostrarNotificacao("🔄 Trocou para " + guildasData[guildaKey].nome + "!");
    } else {
        mostrarNotificacao("🏠 Entrou na " + guildasData[guildaKey].nome + "!");
    }

    player.guilda.atual = guildaKey;
    player.guilda.xpProximo = 100;
    aplicarBonusEquipamentos();
    updateUI();
    renderizarGuilda();
}

// Bônus passivo da guilda
function getBonusGuilda(tipo) {
    if (!player.guilda || !player.guilda.atual) return 0;
    var g = guildasData[player.guilda.atual];
    if (!g) return 0;

    var rankBonus = 1 + (player.guilda.rank * 0.02); // +2% por rank

    switch (tipo) {
        case "atk": return g.efeito.tipo === "atk" ? g.efeito.valor * rankBonus : 0;
        case "habilidade": return g.efeito.tipo === "habilidade" ? g.efeito.valor * rankBonus : 0;
        case "ouro": return g.efeito.tipo === "ouro" ? g.efeito.valor * rankBonus : 0;
        case "def": return g.efeito.tipo === "defhp" ? g.efeito.valor * rankBonus : 0;
        case "hp": return g.efeito.tipo === "defhp" ? g.efeito.valor * rankBonus : 0;
        default: return 0;
    }
}

// Progresso da missão de guilda
function progressoMissaoGuilda(tipo, valor) {
    if (!player.guilda || !player.guilda.atual) return;

    var missoes = missoesPorGuilda[player.guilda.atual];
    var missaoIdx = Math.min(player.guilda.rank, missoes.length - 1);
    var missao = missoes[missaoIdx];

    if (missao.tipo === tipo) {
        player.guilda.missaoProgresso = (player.guilda.missaoProgresso || 0) + (valor || 1);

        if (player.guilda.missaoProgresso >= missao.meta) {
            // Missão completa!
            player.gold += missao.recompensaOuro;
            player.guilda.xp += missao.recompensaXp;
            player.guilda.missaoProgresso = 0;

            mostrarNotificacao("🏠 Missão de Guilda completa! +💰" + missao.recompensaOuro + " +📊" + missao.recompensaXp);

            // Verificar rank up
            if (player.guilda.xp >= player.guilda.xpProximo) {
                player.guilda.rank++;
                player.guilda.xp = 0;
                player.guilda.xpProximo = Math.floor(100 * Math.pow(1.5, player.guilda.rank));
                mostrarNotificacao("⭐ Rank de Guilda: " + player.guilda.rank + "! Bônus aumentado!");
            }
            updateUI();
        }
    }
}
// ============================================
// SISTEMA DE EVENTOS ALEATÓRIOS
// ============================================

var eventosAleatorios = [
    {
        id: "mercador_ambulante",
        titulo: "🎒 Mercador Ambulante",
        icone: "🧙‍♂️",
        descricao: "Um mercador misterioso aparece no caminho. 'Tenho algo especial para você, por um preço justo...' Ele oferece uma poção rara por um bom preço.",
        nivelMin: 1,
        escolhas: [
            {
                texto: "Comprar Poção",
                hint: "Gasta 30 ouro, ganha Poção Média",
                classe: "evento-btn-aceitar",
                icone: "🧪",
                acao: function() {
                    if (player.gold < 30) return { sucesso: false, msg: "❌ Ouro insuficiente! Precisa de 30 ouro." };
                    player.gold -= 30;
                    adicionarItemInventario("Poção Média", "🧪", 1, { tipo: "consumivel", efeito: { tipo: "cura", valor: 100 } });
                    return { sucesso: true, msg: "🧪 Comprou uma Poção Média por 30 ouro! O mercador sorri e desaparece nas sombras..." };
                }
            },
            {
                texto: "Negociar agressivamente",
                hint: "Carisma decide: desconto ou expulsão",
                classe: "evento-btn-arriscar",
                icone: "🗣️",
                acao: function() {
                    if (Math.random() < 0.30 + player.carisma * 0.03) {
                        adicionarItemInventario("Poção Média", "🧪", 1, { tipo: "consumivel", efeito: { tipo: "cura", valor: 100 } });
                        return { sucesso: true, msg: "🗣️ Seu carisma impressionou! O mercador dá a poção DE GRAÇA!" };
                    }
                    return { sucesso: false, msg: "😤 O mercador se ofende e vai embora sem vender nada." };
                }
            },
            {
                texto: "Ignorar",
                hint: "Seguir caminho",
                classe: "evento-btn-ignorar",
                icone: "🚶",
                acao: function() { return { sucesso: true, msg: "Você ignora o mercador e segue em frente." }; }
            }
        ]
    },
    {
        id: "viajante_ferido",
        titulo: "🤕 Viajante Ferido",
        icone: "🩹",
        descricao: "Você encontra um viajante ferido na beira do caminho. 'Por favor... me ajude...' Ele parece desesperado, mas pode ser uma armadilha.",
        nivelMin: 1,
        escolhas: [
            {
                texto: "Ajudar o viajante",
                hint: "Gasta 1 poção, pode ganhar recompensa",
                classe: "evento-btn-aceitar",
                icone: "❤️",
                acao: function() {
                    if (player.potions <= 0) return { sucesso: false, msg: "❌ Você não tem poções para dar!" };
                    player.potions--;
                    var ouroGanho = randomInt(20, 50);
                    player.gold += ouroGanho;
                    return { sucesso: true, msg: "❤️ O viajante agradece profundamente e te dá " + ouroGanho + " ouro como recompensa! 'Que os deuses te abençoem!'" };
                }
            },
            {
                texto: "Revistar os pertences",
                hint: "Risco: pode ser emboscada!",
                classe: "evento-btn-arriscar",
                icone: "🔍",
                acao: function() {
                    if (Math.random() < 0.40) {
                        var dano = randomInt(10, 25);
                        player.hp = Math.max(1, player.hp - dano);
                        return { sucesso: false, msg: "⚠️ ERA UMA EMBOSCADA! Bandidos atacam! Você perde " + dano + " HP!" };
                    }
                    var ouroGanho = randomInt(30, 70);
                    player.gold += ouroGanho;
                    return { sucesso: true, msg: "🔍 O viajante já estava morto... Você encontra " + ouroGanho + " ouro nos pertences." };
                }
            },
            {
                texto: "Ignorar",
                hint: "Seguir caminho",
                classe: "evento-btn-ignorar",
                icone: "🚶",
                acao: function() { return { sucesso: true, msg: "Você passa adiante sem olhar para trás..." }; }
            }
        ]
    },
    {
        id: "altar_misterioso",
        titulo: "⛩️ Altar Misterioso",
        icone: "🕯️",
        descricao: "Um altar antigo brilha com uma luz sobrenatural. Uma voz ecoa: 'Faça uma oferenda e receba minha bênção...'",
        nivelMin: 3,
        escolhas: [
            {
                texto: "Oferenda pequena (30 ouro)",
                hint: "Cura HP completo",
                classe: "evento-btn-aceitar",
                icone: "💰",
                acao: function() {
                    if (player.gold < 30) return { sucesso: false, msg: "❌ Ouro insuficiente!" };
                    player.gold -= 30;
                    player.hp = player.maxHp;
                    return { sucesso: true, msg: "✨ Uma luz quente envolve você! HP totalmente restaurado!" };
                }
            },
            {
                texto: "Oferenda grande (100 ouro)",
                hint: "Bênção poderosa ou maldição!",
                classe: "evento-btn-arriscar",
                icone: "💎",
                acao: function() {
                    if (player.gold < 100) return { sucesso: false, msg: "❌ Ouro insuficiente!" };
                    player.gold -= 100;
                    if (Math.random() < 0.65) {
                        var bonus = randomInt(1, 3);
                        player.forca += bonus;
                        aplicarBonusEquipamentos();
                        return { sucesso: true, msg: "🌟 O altar brilha intensamente! Força +" + bonus + " permanente!" };
                    }
                    var dano = randomInt(20, 40);
                    player.hp = Math.max(1, player.hp - dano);
                    return { sucesso: false, msg: "💀 O altar escurece! Uma energia sombria te atinge! -" + dano + " HP!" };
                }
            },
            {
                texto: "Não tocar",
                hint: "Seguro",
                classe: "evento-btn-ignorar",
                icone: "🚶",
                acao: function() { return { sucesso: true, msg: "Você resiste à tentação e segue em frente." }; }
            }
        ]
    },
    {
        id: "bau_trancado",
        titulo: "🔒 Baú Trancado",
        icone: "📦",
        descricao: "Você encontra um baú trancado e coberto de runas. Parece conter algo valioso, mas abrir sem cuidado pode ser perigoso...",
        nivelMin: 5,
        escolhas: [
            {
                texto: "Forçar o baú",
                hint: "Força decide: tesouro ou armadilha",
                classe: "evento-btn-arriscar",
                icone: "💪",
                acao: function() {
                    if (Math.random() < 0.30 + player.forca * 0.02) {
                        var ouroGanho = randomInt(40, 100);
                        player.gold += ouroGanho;
                        return { sucesso: true, msg: "💪 Você quebra a fechadura! Encontra " + ouroGanho + " ouro dentro!" };
                    }
                    var dano = randomInt(15, 30);
                    player.hp = Math.max(1, player.hp - dano);
                    return { sucesso: false, msg: "💥 Uma armadilha explode! -" + dano + " HP!" };
                }
            },
            {
                texto: "Decifrar as runas",
                hint: "Sabedoria decide: desbloqueio seguro",
                classe: "evento-btn-aceitar",
                icone: "📖",
                acao: function() {
                    if (Math.random() < 0.30 + player.sabedoria * 0.03) {
                        var ouroGanho = randomInt(60, 120);
                        player.gold += ouroGanho;
                        return { sucesso: true, msg: "📖 Você decifra as runas e o baú se abre suavemente! " + ouroGanho + " ouro!" };
                    }
                    return { sucesso: false, msg: "📖 As runas são complexas demais. Você não consegue abrir." };
                }
            },
            {
                texto: "Deixar pra lá",
                hint: "Seguro",
                classe: "evento-btn-ignorar",
                icone: "🚶",
                acao: function() { return { sucesso: true, msg: "Melhor não arriscar. Você segue em frente." }; }
            }
        ]
    },
    {
        id: "duende_trapaceiro",
        titulo: "🃏 Duende Trapaceiro",
        icone: "🧝",
        descricao: "'Hehehe! Quer jogar, aventureiro? Aposte seu ouro! Se ganhar, eu dobro. Se perder... bom, foi divertido!' O duende ri maliciosamente.",
        nivelMin: 3,
        escolhas: [
            {
                texto: "Apostar 50 ouro",
                hint: "50% chance de dobrar!",
                classe: "evento-btn-arriscar",
                icone: "🎲",
                acao: function() {
                    if (player.gold < 50) return { sucesso: false, msg: "❌ Você nem tem 50 ouro! O duende ri da sua pobreza." };
                    if (Math.random() < 0.50) {
                        player.gold += 50;
                        return { sucesso: true, msg: "🎉 Você ganhou! O duende range os dentes e te paga 100 ouro total!" };
                    }
                    player.gold -= 50;
                    return { sucesso: false, msg: "😈 O duende trapaceia e foge com seus 50 ouro! 'Hehehe!'" };
                }
            },
            {
                texto: "Apostar 150 ouro",
                hint: "45% chance de dobrar! Alto risco!",
                classe: "evento-btn-arriscar",
                icone: "💰",
                acao: function() {
                    if (player.gold < 150) return { sucesso: false, msg: "❌ Ouro insuficiente!" };
                    if (Math.random() < 0.45) {
                        player.gold += 150;
                        return { sucesso: true, msg: "🤑 JACKPOT! O duende chora! Você ganha 300 ouro total!" };
                    }
                    player.gold -= 150;
                    return { sucesso: false, msg: "😈 O duende some com seus 150 ouro! 'Otário! Hehehe!'" };
                }
            },
            {
                texto: "Recusar",
                hint: "Seguro",
                classe: "evento-btn-ignorar",
                icone: "✋",
                acao: function() { return { sucesso: true, msg: "'Covarde!' grita o duende antes de desaparecer." }; }
            }
        ]
    },
    {
        id: "fonte_magica",
        titulo: "⛲ Fonte Mágica",
        icone: "💧",
        descricao: "Uma fonte de água cristalina brilha com energia mágica. A água parece ter propriedades especiais...",
        nivelMin: 8,
        escolhas: [
            {
                texto: "Beber a água",
                hint: "Efeito aleatório (bom ou ruim)",
                classe: "evento-btn-arriscar",
                icone: "💧",
                acao: function() {
                    var efeito = Math.random();
                    if (efeito < 0.40) {
                        player.hp = player.maxHp;
                        return { sucesso: true, msg: "💧 A água cura todas as suas feridas! HP restaurado!" };
                    } else if (efeito < 0.70) {
                        var bonus = randomInt(1, 2);
                        player.vigor += bonus;
                        aplicarBonusEquipamentos();
                        return { sucesso: true, msg: "💪 Você se sente mais forte! Vigor +" + bonus + " permanente!" };
                    } else {
                        var dano = randomInt(20, 40);
                        player.hp = Math.max(1, player.hp - dano);
                        return { sucesso: false, msg: "🤢 A água estava amaldiçoada! -" + dano + " HP!" };
                    }
                }
            },
            {
                texto: "Encher frasco",
                hint: "Ganha uma poção grátis",
                classe: "evento-btn-aceitar",
                icone: "🧪",
                acao: function() {
                    player.potions++;
                    return { sucesso: true, msg: "🧪 Você enche um frasco com a água mágica! +1 Poção!" };
                }
            },
            {
                texto: "Ignorar",
                hint: "Seguro",
                classe: "evento-btn-ignorar",
                icone: "🚶",
                acao: function() { return { sucesso: true, msg: "Você admira a fonte e segue em frente." }; }
            }
        ]
    }
];

var CHANCE_EVENTO = 0.18; // 18% de chance de evento ao caçar

function tentarEventoAleatorio() {
    if (Math.random() >= CHANCE_EVENTO) return false;

    // Filtrar eventos por nível
    var eventosDisponiveis = [];
    for (var i = 0; i < eventosAleatorios.length; i++) {
        if (player.level >= eventosAleatorios[i].nivelMin) {
            eventosDisponiveis.push(eventosAleatorios[i]);
        }
    }

    if (eventosDisponiveis.length === 0) return false;

    var evento = eventosDisponiveis[Math.floor(Math.random() * eventosDisponiveis.length)];
    mostrarEvento(evento);
    return true;
}

function mostrarEvento(evento) {
    mostrarPainel('eventoPanel');
    var container = document.getElementById('eventoContent');
    if (!container) return;

    var html = '<div class="evento-container">'
        + '<div class="evento-icone">' + evento.icone + '</div>'
        + '<div class="evento-titulo">' + evento.titulo + '</div>'
        + '<div class="evento-descricao">' + evento.descricao + '</div>'
        + '<div class="evento-escolhas" id="eventoEscolhas">';

    for (var i = 0; i < evento.escolhas.length; i++) {
        var esc = evento.escolhas[i];
        html += '<button class="evento-btn ' + esc.classe + '" onclick="executarEscolhaEvento(' + eventosAleatorios.indexOf(evento) + ',' + i + ')">'
            + '<span class="evento-btn-icon">' + esc.icone + '</span>'
            + '<span class="evento-btn-text">'
            +   '<span class="evento-btn-label">' + esc.texto + '</span>'
            +   '<span class="evento-btn-hint">' + esc.hint + '</span>'
            + '</span>'
            + '</button>';
    }

    html += '</div></div>';
    container.innerHTML = html;
}

function executarEscolhaEvento(eventoIdx, escolhaIdx) {
    var evento = eventosAleatorios[eventoIdx];
    if (!evento) return;

    var escolha = evento.escolhas[escolhaIdx];
    if (!escolha) return;

    var resultado = escolha.acao();

    // Desabilitar botões
    var escolhasDiv = document.getElementById('eventoEscolhas');
    if (escolhasDiv) escolhasDiv.style.display = 'none';

    // Mostrar resultado
    var container = document.getElementById('eventoContent');
    var classeResult = resultado.sucesso ? 'evento-resultado-bom' : 
                       (resultado.msg.indexOf('Seguro') >= 0 || resultado.msg.indexOf('ignora') >= 0) ? 'evento-resultado-neutro' : 'evento-resultado-ruim';

    container.innerHTML += '<div class="evento-resultado ' + classeResult + '">'
        + '<p>' + resultado.msg + '</p>'
        + '</div>'
        + '<button onclick="fecharEvento()" class="back-btn" style="margin-top:15px;">➡️ Continuar</button>';

    updateUI();
    log("🎲 Evento: " + evento.titulo + " — " + resultado.msg);
}

function fecharEvento() {
    // Volta para opções da área
    mostrarPainel('areaOptionsPanel');
    var el = document.getElementById('areaOptionsPanel');
    if (el) el.style.display = 'block';
}
// ============================================
// SISTEMA DE MINERAÇÃO
// ============================================

// Minérios por área
var mineriosPorArea = {

    // ═══════ TIER 1 ═══════
    floresta: {
        nome: "Mina da Floresta",
        custo: 10,
        minerios: [
            { nome: "Minério de Cobre",    icone: "🟤", chance: 0.55, raro: false },
            { nome: "Minério de Estanho",  icone: "⬜", chance: 0.30, raro: false },
            { nome: "Pepita de Prata",     icone: "🥈", chance: 0.10, raro: true }
        ]
    },
    pantano: {
        nome: "Mina do Pântano",
        custo: 10,
        minerios: [
            { nome: "Minério de Cobre",    icone: "🟤", chance: 0.50, raro: false },
            { nome: "Minério de Estanho",  icone: "⬜", chance: 0.30, raro: false },
            { nome: "Pedra Pantanosa",     icone: "🟢", chance: 0.15, raro: false },
            { nome: "Pepita de Prata",     icone: "🥈", chance: 0.08, raro: true }
        ]
    },
    colinas: {
        nome: "Mina das Colinas",
        custo: 15,
        minerios: [
            { nome: "Minério de Cobre",    icone: "🟤", chance: 0.40, raro: false },
            { nome: "Minério de Estanho",  icone: "⬜", chance: 0.35, raro: false },
            { nome: "Pepita de Prata",     icone: "🥈", chance: 0.12, raro: true },
            { nome: "Minério de Ferro",    icone: "⛏️", chance: 0.05, raro: true }
        ]
    },

    // ═══════ TIER 2 ═══════
    ruinas: {
        nome: "Mina das Ruínas",
        custo: 25,
        minerios: [
            { nome: "Minério de Ferro",    icone: "⛏️", chance: 0.50, raro: false },
            { nome: "Pepita de Prata",     icone: "🥈", chance: 0.25, raro: false },
            { nome: "Pepita de Ouro",      icone: "🥇", chance: 0.10, raro: true }
        ]
    },
    deserto: {
        nome: "Mina do Deserto",
        custo: 25,
        minerios: [
            { nome: "Minério de Ferro",    icone: "⛏️", chance: 0.45, raro: false },
            { nome: "Pepita de Ouro",      icone: "🥇", chance: 0.15, raro: true },
            { nome: "Areia Cristalizada",  icone: "✨", chance: 0.20, raro: false }
        ]
    },
    cemiterio: {
        nome: "Catacumbas",
        custo: 25,
        minerios: [
            { nome: "Minério de Ferro",    icone: "⛏️", chance: 0.45, raro: false },
            { nome: "Osso Mineralizado",   icone: "🦴", chance: 0.25, raro: false },
            { nome: "Pepita de Ouro",      icone: "🥇", chance: 0.12, raro: true }
        ]
    },

    // ═══════ TIER 3 ═══════
    caverna: {
        nome: "Mina Profunda",
        custo: 40,
        minerios: [
            { nome: "Minério de Aço",      icone: "🔩", chance: 0.45, raro: false },
            { nome: "Pepita de Ouro",      icone: "🥇", chance: 0.20, raro: false },
            { nome: "Cristal de Adamantina", icone: "💠", chance: 0.08, raro: true }
        ]
    },
    vulcao: {
        nome: "Forja Vulcânica",
        custo: 45,
        minerios: [
            { nome: "Minério de Aço",      icone: "🔩", chance: 0.40, raro: false },
            { nome: "Liga Vulcânica",      icone: "🔥", chance: 0.25, raro: false },
            { nome: "Cristal de Adamantina", icone: "💠", chance: 0.10, raro: true }
        ]
    },
    geleira: {
        nome: "Mina Glacial",
        custo: 45,
        minerios: [
            { nome: "Minério de Aço",      icone: "🔩", chance: 0.40, raro: false },
            { nome: "Metal Congelado",     icone: "❄️", chance: 0.25, raro: false },
            { nome: "Cristal de Adamantina", icone: "💠", chance: 0.10, raro: true }
        ]
    },

    // ═══════ TIER 4 ═══════
    cidadeFant: {
        nome: "Mina Fantasma",
        custo: 60,
        minerios: [
            { nome: "Minério de Mithril",  icone: "💎", chance: 0.40, raro: false },
            { nome: "Metal Espectral",     icone: "👻", chance: 0.25, raro: false },
            { nome: "Fragmento de Oricalco", icone: "🌟", chance: 0.06, raro: true }
        ]
    },
    abismo: {
        nome: "Veio Abissal",
        custo: 65,
        minerios: [
            { nome: "Minério de Mithril",  icone: "💎", chance: 0.40, raro: false },
            { nome: "Metal do Vazio",      icone: "🖤", chance: 0.22, raro: false },
            { nome: "Fragmento de Oricalco", icone: "🌟", chance: 0.08, raro: true }
        ]
    },
    castelo: {
        nome: "Forja Real",
        custo: 70,
        minerios: [
            { nome: "Minério de Mithril",  icone: "💎", chance: 0.38, raro: false },
            { nome: "Fragmento de Oricalco", icone: "🌟", chance: 0.10, raro: true },
            { nome: "Liga Imperial",       icone: "👑", chance: 0.20, raro: false }
        ]
    },

    // ═══════ TIER 5 ═══════
    planoAstral: {
        nome: "Cristais Astrais",
        custo: 90,
        minerios: [
            { nome: "Fragmento de Oricalco", icone: "🌟", chance: 0.30, raro: false },
            { nome: "Essência Estelar",    icone: "⭐", chance: 0.10, raro: true },
            { nome: "Metal Astral",        icone: "🌌", chance: 0.30, raro: false }
        ]
    },
    infernus: {
        nome: "Forja Infernal",
        custo: 100,
        minerios: [
            { nome: "Fragmento de Oricalco", icone: "🌟", chance: 0.28, raro: false },
            { nome: "Essência Estelar",    icone: "⭐", chance: 0.12, raro: true },
            { nome: "Metal Demoníaco",     icone: "😈", chance: 0.30, raro: false }
        ]
    },
    tronoDeus: {
        nome: "Veio Divino",
        custo: 120,
        minerios: [
            { nome: "Essência Estelar",    icone: "⭐", chance: 0.18, raro: true },
            { nome: "Metal Divino",        icone: "✨", chance: 0.35, raro: false },
            { nome: "Fragmento de Oricalco", icone: "🌟", chance: 0.30, raro: false }
        ]
    }
};

// Estado da mineração
var mineracaoState = {
    tentativas: 3,
    maxTentativas: 3,
    areaAtual: null
};

// Adicionar minérios ao materiaisInfo
var mineriosInfo = {
    "Minério de Cobre": "🟤", "Minério de Estanho": "⬜", "Pepita de Prata": "🥈",
    "Minério de Ferro": "⛏️", "Pepita de Ouro": "🥇", "Areia Cristalizada": "✨",
    "Pedra Pantanosa": "🟢", "Osso Mineralizado": "🦴",
    "Minério de Aço": "🔩", "Liga Vulcânica": "🔥", "Metal Congelado": "❄️",
    "Cristal de Adamantina": "💠",
    "Minério de Mithril": "💎", "Metal Espectral": "👻", "Metal do Vazio": "🖤",
    "Liga Imperial": "👑", "Fragmento de Oricalco": "🌟",
    "Essência Estelar": "⭐", "Metal Astral": "🌌", "Metal Demoníaco": "😈",
    "Metal Divino": "✨"
};

// Mesclar com materiaisInfo existente
for (var key in mineriosInfo) {
    materiaisInfo[key] = mineriosInfo[key];
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

function renderizarMineracao() {
    var area = mineracaoState.areaAtual;
    var dados = mineriosPorArea[area];
    if (!dados) return;

    // Nome da área
    var nomeEl = document.getElementById('mineracaoAreaNome');
    if (nomeEl) nomeEl.textContent = '📍 ' + dados.nome;

    // Tentativas
    var tentEl = document.getElementById('mineracaoTentativas');
    if (tentEl) tentEl.textContent = mineracaoState.tentativas;

    // Custo
    var custoEl = document.getElementById('mineracaoCusto');
    if (custoEl) custoEl.textContent = dados.custo;

    // Botão
    var btn = document.getElementById('btnMinerar');
    if (btn) btn.disabled = mineracaoState.tentativas <= 0 || player.gold < dados.custo;

    // Esconder animação e resultado
    var animEl = document.getElementById('mineracaoAnimacao');
    if (animEl) animEl.style.display = 'none';

    // Mostrar minérios possíveis
    var matEl = document.getElementById('mineracaoMateriais');
    if (matEl) {
        var html = '<p style="color:#94a3b8;font-size:0.82em;text-align:center;margin-bottom:6px;">Minérios encontrados nesta área:</p>';
        html += '<div class="minerio-lista">';
        for (var i = 0; i < dados.minerios.length; i++) {
            var m = dados.minerios[i];
            var chanceText = Math.floor(m.chance * 100) + '%';
            html += '<div class="minerio-preview' + (m.raro ? '" style="border-color:#fbbf24;"' : '"') + '>'
                + '<span class="minerio-preview-icon">' + m.icone + '</span>'
                + '<span class="minerio-preview-nome">' + m.nome + '</span>'
                + '<span class="minerio-preview-chance">' + (m.raro ? '⭐' : '') + chanceText + '</span>'
                + '</div>';
        }
        html += '</div>';
        matEl.innerHTML = html;
    }
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

// ============================================
// SISTEMA HARDCORE / IRONMAN
// ============================================

var modoJogo = "normal"; // "normal" ou "hardcore"

function selecionarModo(modo) {
    modoJogo = modo;

    // Visual dos botões
    var btnNormal = document.getElementById('btnModoNormal');
    var btnHardcore = document.getElementById('btnModoHardcore');
    var descEl = document.getElementById('modoDescricao');
    var descTexto = document.getElementById('modoDescTexto');

    if (btnNormal) btnNormal.classList.remove('modo-selecionado');
    if (btnHardcore) btnHardcore.classList.remove('modo-selecionado');

    if (modo === 'normal') {
        if (btnNormal) btnNormal.classList.add('modo-selecionado');
        if (descEl) { descEl.className = 'modo-descricao normal'; }
        if (descTexto) descTexto.innerHTML = '🎮 Modo clássico. Ao morrer, perde 50% do ouro e revive na cidade.';
    } else {
        if (btnHardcore) btnHardcore.classList.add('modo-selecionado');
        if (descEl) { descEl.className = 'modo-descricao hardcore'; }
        if (descTexto) descTexto.innerHTML = '☠️ <strong>MORTE PERMANENTE!</strong><br>'
            + '⚠️ Sem segunda chance. Morte = Você Perdeu.<br>'
            + '✅ +50% XP | +50% Ouro | Drops melhores<br>'
            + '🏆 Conquistas exclusivas!';
    }
}

// Verificar se é hardcore
function isHardcore() {
    return modoJogo === "hardcore" || (player && player.modoHardcore);
}

// Bônus do modo hardcore
function getBonusHardcore(tipo) {
    if (!isHardcore()) return 1.0;
    switch (tipo) {
        case "xp":   return 1.50;  // +50% XP
        case "ouro": return 1.50;  // +50% ouro
        case "drop": return 0.10;  // +10% chance drop
        default:     return 1.0;
    }
}

// ============================================
// DERROTA — VERSÃO FINAL COMPLETA
// (Arena + Cemitério + Hardcore + Som)
// ============================================

function derrotaCombate() {
    gameState.emCombate = false;
    gameState.emMasmorra = false;

    // Som de derrota
    if (typeof tocarSom === 'function') tocarSom("derrota");

    // Log
    addCombatLog("💀 Você foi derrotado...", "critical");
    log("💀 Derrotado por " + (monster ? monster.name : "???") + "...");

    // ── ARENA: derrota na arena não é game over real ──
    if (gameState.combateOrigem === "arena") {
        if (typeof arena !== 'undefined') arena.emArena = false;
        if (typeof finalizarArena === 'function') finalizarArena("DERROTA");
        player.hp = Math.floor(player.maxHp * 0.3);
        updateUI();
        return;
    }

    // ── CEMITÉRIO: perder equipamento ao morrer ──
    var nomePerdido = null;
    if (typeof perderEquipamentoAoMorrer === 'function') {
        nomePerdido = perderEquipamentoAoMorrer();
    }

    // Resetar
    player.hp = 0;
    updateUI();

    // Montar texto
    var textoGameOver = "Derrotado por " + (monster ? monster.name : "um inimigo") + "...";
    if (nomePerdido) {
        textoGameOver += "\n⚰️ Equipamento perdido: " + nomePerdido + "!";
        textoGameOver += "\nVá ao cemitério na cidade para resgatar.";
    }

    // Passar texto para a tela
    var goText = document.getElementById("gameOverText");
    if (goText) goText.textContent = textoGameOver;

    // ── HARDCORE ou NORMAL ──
    var normalDiv = document.getElementById("gameOverNormal");
    var hardcoreDiv = document.getElementById("gameOverHardcore");

    if (isHardcore()) {
        // HARDCORE: morte permanente
        if (normalDiv) normalDiv.style.display = "none";
        if (hardcoreDiv) {
            hardcoreDiv.style.display = "block";

            var statsEl = document.getElementById("hardcoreStats");
            if (statsEl) {
                statsEl.innerHTML = '<div class="hardcore-stats-box">'
                    + '<p style="color:#ef4444;font-size:1.1em;font-weight:bold;margin-bottom:8px;">☠️ RUN ENCERRADA ☠️</p>'
                    + '<p>🏆 Level alcançado: <strong>' + player.level + '</strong></p>'
                    + '<p>⚔️ Monstros derrotados: <strong>' + (estatisticas.monstrosDerrotados || 0) + '</strong></p>'
                    + '<p>💰 Ouro total ganho: <strong>' + (estatisticas.ourolTotal || 0) + '</strong></p>'
                    + '<p>🗺️ Maior área: <strong>' + (gameState.areaAtual || "Floresta") + '</strong></p>'
                    + '<p>⏱️ Sobreviveu até: <strong>Nível ' + player.level + '</strong></p>'
                    + '</div>';
            }
        }

        if (typeof salvarRankingHardcore === 'function') salvarRankingHardcore();
        localStorage.removeItem("reinosMonstrosSave");
    } else {
        // NORMAL: pode reviver
        if (normalDiv) normalDiv.style.display = "block";
        if (hardcoreDiv) hardcoreDiv.style.display = "none";
    }

    var gs = document.getElementById("gameOverScreen");
    if (gs) gs.style.display = "flex";
}
// ============================================
// DERROTA — VERSÃO ÚNICA E DEFINITIVA
// ============================================

// Salvar ranking hardcore
function salvarRankingHardcore() {
    var ranking = JSON.parse(localStorage.getItem("hardcoreRanking") || "[]");
    ranking.push({
        nome: player.nome || player.name,
        classe: player.class,
        level: player.level,
        monstros: estatisticas.monstrosDerrotados || 0,
        ouro: estatisticas.ourolTotal || 0,
        data: new Date().toLocaleDateString()
    });
    // Ordenar por level decrescente
    ranking.sort(function(a, b) { return b.level - a.level; });
    // Manter top 10
    ranking = ranking.slice(0, 10);
    localStorage.setItem("hardcoreRanking", JSON.stringify(ranking));
}

function novoJogoHardcore() {
    var gs = document.getElementById("gameOverScreen");
    if (gs) gs.style.display = "none";
    
    // Resetar modo para poder escolher novamente
    modoJogo = "normal";
    
    // Voltar para tela de boas-vindas
    mudarTela('welcomeScreen');
    
    // Resetar visual do seletor de modo
    selecionarModo('normal');
}

// ============================================
// MAPA VISUAL INTERATIVO
// ============================================

var mapaAreas = [
    // Tier 1
    { tier: 1, areas: [
        { id: "floresta", icon: "🌲", nome: "Floresta", nivel: "1-3", stars: "⭐" },
        { id: "pantano", icon: "🐸", nome: "Pântano", nivel: "4-6", stars: "⭐" },
        { id: "colinas", icon: "⛰️", nome: "Colinas", nivel: "7-9", stars: "⭐⭐" }
    ]},
    // Tier 2
    { tier: 2, areas: [
        { id: "ruinas", icon: "🏚️", nome: "Ruínas", nivel: "10-12", stars: "⭐⭐" },
        { id: "deserto", icon: "🏜️", nome: "Deserto", nivel: "13-15", stars: "⭐⭐⭐" },
        { id: "cemiterio", icon: "⚰️", nome: "Cemitério", nivel: "16-18", stars: "⭐⭐⭐" }
    ]},
    // Tier 3
    { tier: 3, areas: [
        { id: "caverna", icon: "🕳️", nome: "Caverna", nivel: "19-21", stars: "⭐⭐⭐" },
        { id: "vulcao", icon: "🌋", nome: "Vulcão", nivel: "22-24", stars: "⭐⭐⭐⭐" },
        { id: "geleira", icon: "🏔️", nome: "Geleira", nivel: "25-27", stars: "⭐⭐⭐⭐" }
    ]},
    // Tier 4
    { tier: 4, areas: [
        { id: "cidadeFant", icon: "👻", nome: "Cid. Fantasma", nivel: "28-30", stars: "⭐⭐⭐⭐" },
        { id: "abismo", icon: "🌑", nome: "Abismo", nivel: "31-33", stars: "⭐⭐⭐⭐⭐" },
        { id: "castelo", icon: "🏰", nome: "Castelo", nivel: "34-36", stars: "⭐⭐⭐⭐⭐" }
    ]},
    // Tier 5
    { tier: 5, areas: [
        { id: "planoAstral", icon: "🌌", nome: "Plano Astral", nivel: "37-39", stars: "⭐⭐⭐⭐⭐" },
        { id: "infernus", icon: "🔥", nome: "Infernus", nivel: "40-42", stars: "☠️☠️" },
        { id: "tronoDeus", icon: "⚡", nome: "Trono", nivel: "43-45", stars: "☠️☠️☠️" }
    ]}
];

function renderizarMapaVisual() {
    var container = document.getElementById('areasContainer');
    if (!container) return;

    container.className = 'mapa-visual';
    container.innerHTML = '';

    // Título do mapa
    container.innerHTML += '<div class="mapa-cidade">🏘️ CIDADE — sua base segura</div>';

    for (var t = 0; t < mapaAreas.length; t++) {
        var tierData = mapaAreas[t];
        var tierNum = tierData.tier;

        // Verificar se alguma área deste tier está desbloqueada
        var algumDesbloqueado = false;
        for (var a = 0; a < tierData.areas.length; a++) {
            var areaCard = document.getElementById('area-' + tierData.areas[a].id);
            if (areaCard && !areaCard.classList.contains('locked')) {
                algumDesbloqueado = true;
                break;
            }
        }

        if (!algumDesbloqueado) continue; // Não mostrar tier inteiro se tudo bloqueado

        // Conector entre tiers
        if (t > 0) {
            container.innerHTML += '<div class="mapa-conector' + (algumDesbloqueado ? ' ativo' : '') + '"></div>';
        }

        // Tier row
        var tierDiv = document.createElement('div');
        tierDiv.className = 'mapa-tier';

        for (var a = 0; a < tierData.areas.length; a++) {
            var area = tierData.areas[a];
            var areaCard = document.getElementById('area-' + area.id);
            var desbloqueado = areaCard && !areaCard.classList.contains('locked');

            if (!desbloqueado) continue; // Não mostrar áreas bloqueadas

            var isAtual = gameState.areaAtual === area.id;

            var node = document.createElement('div');
            node.className = 'mapa-node tier' + tierNum + (desbloqueado ? ' desbloqueado' : ' bloqueado') + (isAtual ? ' atual' : '');
            node.onclick = (function(areaId) {
                return function() { selecionarArea(areaId); };
            })(area.id);

            node.innerHTML = '<div class="mapa-node-icon">' + area.icon + '</div>'
                + '<div class="mapa-node-nome">' + area.nome + '</div>'
                + '<div class="mapa-node-nivel">Nv.' + area.nivel + '</div>'
                + '<div class="mapa-node-stars">' + area.stars + '</div>';

            tierDiv.appendChild(node);
        }

        container.appendChild(tierDiv);
    }
}

window.onload = function() {
    console.log("🎮 Reinos & Monstros v5.0");
    gerarSelecao();
    verificarSaveExistente();

    // Inicializar áudio na primeira interação
    document.addEventListener('click', function() {
        inicializarAudio();
    }, { once: true });

    console.log("✅ Carregado!");
};