function calcularXpNecessario(level) {
    return Math.floor(50 * Math.pow(1.4, level - 1));
}

function calcularBonusXp() {
    return (typeof player !== "undefined" && player.inteligencia)
        ? player.inteligencia * 0.01 : 0;
}

function mostrarPopupAutoFechavel(screenId, duracao, callbackAbrir) {
    duracao = duracao || 3500;
    if (typeof callbackAbrir === "function") callbackAbrir();
    else {
        var el = document.getElementById(screenId);
        if (el) el.style.display = "flex";
    }
    setTimeout(function() {
        var el = document.getElementById(screenId);
        if (el) el.style.display = "none";
    }, duracao);
}


// SEÇÃO 1: DADOS DO JOGADOR

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
    { id: "guerreiro", nome: "Valerius", raça: "Anão", gender: "Masculino", class: "Guerreiro", background: "Ex-capitão da guarda.", forca: 17, destreza: 10, vigor: 12, inteligencia: 8, sabedoria: 8, carisma: 5, img: "images/Personagens/guerreiro.png" },
    { id: "guerreira", nome: "Lyra", raça: "Anã", gender: "Feminino", class: "Guerreira", background: "Forjada nas minas.", forca: 17, destreza: 10, vigor: 12, inteligencia: 8, sabedoria: 8, carisma: 5, img: "images/Personagens/guerreira.png" },
    { id: "draconato", nome: "Ignis", raça: "Draconato", gender: "Masculino", class: "Paladino", background: "Cavaleiro do sol.", forca: 15, destreza: 8, vigor: 14, inteligencia: 10, sabedoria: 12, carisma: 10, img: "images/Personagens/draconato.png" },
    { id: "draconata", nome: "Aethel", raça: "Draconata", gender: "Feminino", class: "Paladina", background: "Guardiã dos templos.", forca: 15, destreza: 8, vigor: 14, inteligencia: 10, sabedoria: 12, carisma: 10, img: "images/Personagens/draconata.png" },
    { id: "arqueiro", nome: "Kael", raça: "Elfo", gender: "Masculino", class: "Arqueiro", background: "Rastreador.", forca: 12, destreza: 17, vigor: 10, inteligencia: 8, sabedoria: 10, carisma: 3, img: "images/Personagens/arqueiro.png" },
    { id: "arqueira", nome: "Selene", raça: "Elfa", gender: "Feminino", class: "Arqueira", background: "Protege fronteiras.", forca: 12, destreza: 17, vigor: 10, inteligencia: 8, sabedoria: 10, carisma: 3, img: "images/Personagens/arqueira.png" },
    { id: "mago", nome: "Thalric", raça: "Humano", gender: "Masculino", class: "Mago", background: "Estudioso.", forca: 8, destreza: 12, vigor: 8, inteligencia: 17, sabedoria: 8, carisma: 7, img: "images/Personagens/mago.png" },
    { id: "maga", nome: "Isolde", raça: "Humana", gender: "Feminino", class: "Maga", background: "Prodígio.", forca: 8, destreza: 12, vigor: 8, inteligencia: 17, sabedoria: 8, carisma: 7, img: "images/Personagens/maga.png" },
    { id: "leonide.m", nome: "Bram", raça: "Leonídeo", gender: "Masculino", class: "Clérigo", background: "Sacerdote.", forca: 12, destreza: 8, vigor: 12, inteligencia: 10, sabedoria: 17, carisma: 1, img: "images/Personagens/leonide.m.png" },
    { id: "leonide.f", nome: "Aria", raça: "Leonídea", gender: "Feminino", class: "Clériga", background: "Escolhida.", forca: 12, destreza: 8, vigor: 12, inteligencia: 10, sabedoria: 17, carisma: 1, img: "images/Personagens/leonide.f.png" },
    { id: "halfling.m", nome: "Finn", raça: "Halfling", gender: "Masculino", class: "Ladino", background: "Mestre das sombras.", forca: 10, destreza: 17, vigor: 8, inteligencia: 10, sabedoria: 8, carisma: 10, img: "images/Personagens/halfling.m.png" },
    { id: "halfling.f", nome: "Mila", raça: "Halfling", gender: "Feminino", class: "Ladina", background: "Ágil e furtiva.", forca: 10, destreza: 17, vigor: 8, inteligencia: 10, sabedoria: 8, carisma: 10, img: "images/Personagens/halfling.f.png" },
    { id: "druida.m", nome: "Samir", raça: "Fauno", gender: "Masculino", class: "Druida", background: "Guardião.", forca: 9, destreza: 12, vigor: 10, inteligencia: 12, sabedoria: 14, carisma: 8, img: "images/Personagens/druida.m.png" },
    { id: "druida.f", nome: "Flora", raça: "Fauna", gender: "Feminino", class: "Druida", background: "Sintonizada.", forca: 9, destreza: 12, vigor: 10, inteligencia: 12, sabedoria: 14, carisma: 8, img: "images/Personagens/druida.f.png" },
    { id: "monge.m", nome: "Korg", raça: "Meio-Orc", gender: "Masculino", class: "Monge", background: "Disciplina.", forca: 14, destreza: 14, vigor: 12, inteligencia: 8, sabedoria: 10, carisma: 5, img: "images/Personagens/monge.m.png" },
    { id: "monge.f", nome: "Zora", raça: "Meio-Orc", gender: "Feminino", class: "Monge", background: "Meditação.", forca: 14, destreza: 14, vigor: 12, inteligencia: 8, sabedoria: 10, carisma: 5, img: "images/Personagens/monge.f.png" }
];

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
    "Guerreiro": { forca: 2, destreza: 0, vigor: 1, inteligencia: 0, sabedoria: 0, carisma: 1 },
    "Guerreira": { forca: 2, destreza: 0, vigor: 1, inteligencia: 0, sabedoria: 0, carisma: 1 },
    "Paladino": { forca: 1, destreza: 0, vigor: 1, inteligencia: 0, sabedoria: 1, carisma: 1 },
    "Paladina": { forca: 1, destreza: 0, vigor: 1, inteligencia: 0, sabedoria: 1, carisma: 1 },
    "Arqueiro": { forca: 0, destreza: 2, vigor: 1, inteligencia: 0, sabedoria: 1, carisma: 1 },
    "Arqueira": { forca: 0, destreza: 2, vigor: 1, inteligencia: 0, sabedoria: 1, carisma: 1 },
    "Mago": { forca: 0, destreza: 0, vigor: 1, inteligencia: 2, sabedoria: 1, carisma: 1 },
    "Maga": { forca: 0, destreza: 0, vigor: 1, inteligencia: 2, sabedoria: 1, carisma: 1 },
    "Clérigo": { forca: 0, destreza: 0, vigor: 1, inteligencia: 1, sabedoria: 2, carisma: 1 },
    "Clériga": { forca: 0, destreza: 0, vigor: 1, inteligencia: 1, sabedoria: 2, carisma: 1 },
    "Ladino": { forca: 0, destreza: 2, vigor: 1, inteligencia: 0, sabedoria: 0, carisma: 1 },
    "Ladina": { forca: 0, destreza: 2, vigor: 1, inteligencia: 0, sabedoria: 0, carisma: 1 },
    "Druida": { forca: 0, destreza: 0, vigor: 1, inteligencia: 1, sabedoria: 1, carisma: 1 },
    "Monge": { forca: 1, destreza: 1, vigor: 1, inteligencia: 0, sabedoria: 0, carisma: 1 }
};

function getCrescimentoClasse() {
    return classesCrescimento[player.class] || { forca: 1, destreza: 1, vigor: 1, inteligencia: 0, sabedoria: 0, carisma: 0 };
}
function investirTalento(tipo) {
    if (talentos.pontosDisponiveis <= 0) { mostrarNotificacao("Sem pontos!"); return; }
    talentos.pontosDisponiveis--;
    talentos.investidos[tipo]++;
    if (tipo === "vida") aplicarBonusEquipamentos();
    mostrarNotificacao("⭐ +" + tipo + "!");
    renderizarTalentos(); updateUI();
}

function ganharExp(base) {
    var qtd = Math.floor(base * (1 + calcularBonusXp()));
    player.xp += qtd;
    while (player.xp >= player.xpParaProximoNivel) { player.xp -= player.xpParaProximoNivel; levelUp(); }
    updateUI();
}
function levelUp() {
    player.level++;
    talentos.pontosDisponiveis++;

    var c = getCrescimentoClasse();
    player.forca += c.forca;
    player.destreza += c.destreza;
    player.vigor += c.vigor;
    player.inteligencia += c.inteligencia;
    player.sabedoria += c.sabedoria;
    player.carisma += c.carisma;

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
    if (!player.pontosHabilidade) {
    player.pontosHabilidade = 0;
}

if (player.level % 2 === 0) {
    player.pontosHabilidade += 1;
}

    if (typeof adicionarPopup === "function") {
        adicionarPopup(
            "levelup",
            "⭐ LEVEL UP! ⭐",
            "🎉",
            "Nível <strong style='color:#ffd700;'>" + player.level + "</strong><br>" +
            txt +
            "<br>❤️ HP +" + hpG +
            "<br><span style='color:#fbbf24;'>⭐ +1 Ponto de Talento!</span>" +
            "<br><span style='color:#fbbf24;'>⭐ +1 Ponto de Habilidade!</span>" +
            "<br><span style='color:#66ff66;'>HP restaurado!</span>",
            null,
            4000
        );
    }

    if (typeof mostrarNotificacao === "function") {
        mostrarNotificacao("⭐ Level " + player.level + "! +1 Talento!");
    }

    if (typeof verificarConquistas === "function") {
        verificarConquistas();
    }

    if (typeof updateUI === "function") {
        updateUI();
    }

    if (typeof verificarNovasAreas === "function") {
        verificarNovasAreas(player.level);
    }
}
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

function abrirSelecaoPersonagem() {
    if (!modoJogo) {
        mostrarNotificacao("🎮 Escolha um modo de jogo primeiro!");
        return;
    }

    mudarTela('characterSelectionScreen');
    renderizarSelecaoPersonagens();
}
function renderizarSelecaoPersonagens() {
    const container = document.getElementById("cardsContainer");
    if (!container) return;

    container.innerHTML = "";

    personagensPredefinidos.forEach(function(personagem) {
        const card = document.createElement("div");
        card.className = "card";
        card.onclick = function() {
            selecionarPersonagem(personagem.id);
        };

        card.innerHTML = `
            <img src="${personagem.img}" alt="${personagem.nome}" draggable="false" onerror="this.style.display='none'">
        `;

        container.appendChild(card);
    });
}
var modoJogo = null 
function novoJogoHardcore() {
    var gs = document.getElementById("gameOverScreen");
    if (gs) gs.style.display = "none";
    
    // Resetar modo para poder escolher novamente
    modoJogo = "normal";
    
    // Voltar para tela de boas-vindas
    mudarTela('welcomeScreen');
    

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
function selecionarModo(modo) {
    modoJogo = modo;
    
    // Visual
    document.getElementById('btnModoNormal').classList.remove('modo-selecionado');
    document.getElementById('btnModoHardcore').classList.remove('modo-selecionado');
    
    if (modo === 'normal') {
        document.getElementById('btnModoNormal').classList.add('modo-selecionado');
        document.getElementById('modoDescricao').className = 'modo-descricao normal';
        document.getElementById('modoDescTexto').textContent = 'Modo clássico. Ao morrer, perde 50% do ouro e revive na cidade.';
    } else {
        document.getElementById('btnModoHardcore').classList.add('modo-selecionado');
        document.getElementById('modoDescricao').className = 'modo-descricao hardcore';
        document.getElementById('modoDescTexto').textContent = '☠️ Morte permanente! Sem segunda chance. Recompensas +50%.';
    }

    // Habilitar botão de jogar
    const btnJogar = document.querySelector('#welcomeScreen button[onclick*="mudarTela"]');
    if (btnJogar) {
        btnJogar.classList.remove('modo-nao-selecionado');
    }
    
    // Esconder erro
    const erroMsg = document.getElementById('modoErroMsg');
    if (erroMsg) erroMsg.classList.remove('show');
}

function calcularAtkInicial(classe, forca, destreza, inteligencia, sabedoria) {
    const mapa = {
        "Guerreiro": Math.floor(forca / 2),
        "Guerreira": Math.floor(forca / 2),
        "Paladino": Math.floor((forca + sabedoria) / 3),
        "Paladina": Math.floor((forca + sabedoria) / 3),
        "Arqueiro": Math.floor(destreza / 2),
        "Arqueira": Math.floor(destreza / 2),
        "Mago": Math.floor(inteligencia / 2),
        "Maga": Math.floor(inteligencia / 2),
        "Clérigo": Math.floor(sabedoria / 2),
        "Clériga": Math.floor(sabedoria / 2),
        "Ladino": Math.floor(destreza / 2),
        "Ladina": Math.floor(destreza / 2),
        "Druida": Math.floor((inteligencia + sabedoria) / 3),
        "Monge": Math.floor((forca + destreza) / 3)
    };

    return mapa[classe] || Math.floor(Math.max(forca, destreza, inteligencia, sabedoria) / 2);
}
function selecionarPersonagem(id) {
    const p = personagensPredefinidos.find(function(x) {
        return x.id === id;
    });

    if (!p) return;

    if (typeof tocarSom === "function") tocarSom("selecionarPersonagem");
    if (typeof inicializarAudio === "function") inicializarAudio();

    const b = racaBonus[p.raça] || {};

    const f = p.forca + (b.forca || 0);
    const d = p.destreza + (b.destreza || 0);
    const v = p.vigor + (b.vigor || 0);
    const i = p.inteligencia + (b.inteligencia || 0);
    const s = p.sabedoria + (b.sabedoria || 0);
    const c = p.carisma + (b.carisma || 0);

    const hp = v * 10;

    player = {
        name: p.nome,
        nome: p.nome,
        class: p.class,
        raça: p.raça,
        gender: p.gender,
        background: p.background,
        img: p.img,
   
        forca: f,
        destreza: d,
        vigor: v,
        inteligencia: i,
        sabedoria: s,
        carisma: c,

        baseMaxHp: hp,
        maxHp: hp,
        hp: hp,

        atk: calcularAtkInicial(p.class, f, d, i, s),
        def: Math.floor(v / 3),

        gold: 0,
        level: 1,
        xp: 0,
        xpParaProximoNivel: calcularXpNecessario(1),
        potions: 3,
        inventario: [],
        missoesConcluidas: [],
        equipamentos: {
            arma: null,
            armadura: null,
            elmo: null,
            botas: null,
            anel: null,
            amuleto: null
            
        },
        narrativa: criarEstadoNarrativoPadrao(),

        habilidadeCooldown: 0,
        defendendo: false,
        modoHardcore: (typeof modoJogo !== "undefined" && modoJogo === "hardcore"),
        guilda: {
            atual: null,
            rank: 0,
            xp: 0,
            xpProximo: 100,
            missaoAtiva: null,
            missaoProgresso: 0
        }
    };

    talentos = {
        pontosDisponiveis: 0,
        investidos: { dano: 0, defesa: 0, vida: 0, critico: 0, sorte: 0, maestria: 0 }
    };

    estatisticas = {
        monstrosDerrotados: 0,
        elitesDerrotados: 0,
        bossesDerrotados: 0,
        masmorrasCompletas: 0,
        vezesRevivido: 0,
        ourolTotal: 0,
        criticos: 0,
        esquivas: 0
    };

    sistemaMissoes = {
        missaoAtiva: null,
        missoesCompletas: 0,
        historico: []
    };

    player.pontosHabilidade = 0;
    arvoreHabilidades = { investidos: {} };

    if (typeof conquistas !== "undefined" && conquistas.lista) {
        conquistas.lista.forEach(function(c2) {
            c2.desbloqueada = false;
        });
        conquistas.totalDesbloqueadas = 0;
    }

    const img = document.getElementById("playerImage");
    if (img) img.src = player.img;

  mudarTela("game");

if (typeof esconderTodosPaineis === "function") {
    esconderTodosPaineis();
}

if (typeof mostrarPainel === "function") {
    mostrarPainel("navigationContainer");
}

const sub = document.getElementById("subMenu");
if (sub) sub.innerHTML = "";

if (typeof updateUI === "function") updateUI();
if (typeof atualizarUI === "function") atualizarUI();
}
player.pontosHabilidade

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
    if ((player.pontosHabilidade || 0) <= 0) {
        mostrarNotificacao("⚠️ Sem pontos!");
        return;
    }

    var classeAtual = player.class || player.classe;
    var chave = classeAtual + "_" + ramoId + "_" + habId;

    if (arvoreHabilidades.investidos[chave]) {
        mostrarNotificacao("⚠️ Já desbloqueada!");
        return;
    }

    // Verificar pré-requisito
    if (habId > 1) {
        var chaveAnterior = classeAtual + "_" + ramoId + "_" + (habId - 1);
        if (!arvoreHabilidades.investidos[chaveAnterior]) {
            mostrarNotificacao("⚠️ Desbloqueie a habilidade anterior primeiro!");
            return;
        }
    }

    var arvore = classesArvore[classeAtual];
    if (!arvore) {
        mostrarNotificacao("⚠️ Árvore de habilidades não encontrada.");
        return;
    }

    var hab = null;

    arvore.ramos.forEach(function(r) {
        if (r.id === ramoId) {
            r.habilidades.forEach(function(h) {
                if (h.id === habId) {
                    hab = h;
                }
            });
        }
    });

    if (!hab) {
        mostrarNotificacao("⚠️ Habilidade não encontrada.");
        return;
    }

    player.pontosHabilidade--;
    arvoreHabilidades.investidos[chave] = true;

    // Aplicar efeitos permanentes
    if (hab.efeito === "todos_atrib") {
        player.forca += hab.valor;
        player.destreza += hab.valor;
        player.vigor += hab.valor;
        player.inteligencia += hab.valor;
        player.sabedoria += hab.valor;
        player.carisma += hab.valor;
        player.baseMaxHp += hab.valor * 5;
    }

    if (hab.efeito === "int_bonus") {
        player.inteligencia += hab.valor;
    }

    if (hab.efeito === "transcendencia") {
        player.inteligencia += hab.valor;
        player.sabedoria += hab.valor;
        player.vigor += hab.valor;
        player.baseMaxHp += hab.valor * 5;
    }

    if (hab.efeito === "hp_bonus") {
        aplicarBonusEquipamentos();
    }

    aplicarBonusEquipamentos();

    mostrarNotificacao("🌟 " + hab.nome + " desbloqueada!");
    if (typeof log === "function") {
        log("🌟 Habilidade: " + hab.nome + " — " + hab.desc);
    }

    if (typeof tocarSom === "function") {
        tocarSom("conquista");
    }

    if (typeof updateUI === "function") {
        updateUI();
    }

    if (typeof renderizarArvoreHabilidades === "function") {
        renderizarArvoreHabilidades();
    }
}
var feroxData = {
    pedidoAtual: 0,
    pedidosConcluidos: []
};


// ============================================
// SEÇÃO 4: GARANTIA FINAL DO ESTADO NARRATIVO
// ============================================

if (typeof criarEstadoNarrativoPadrao !== "function") {
    function criarEstadoNarrativoPadrao() {
        return {
            rota: { heroi: 0, neutro: 0, sombrio: 0 },

            flagsNarrativas: {
                ajudouElian: false,
                traiuElian: false,
                libertouAlmasComSoraya: false,
                usouAlmasComSoraya: false,
                ajudouDraeven: false,
                dominouDraeven: false,
                confiouEmIris: false,
                roubouIris: false,
                restaurouGuardaTallen: false,
                corrompeuTallen: false,
                salvouMaela: false,
                explorouMaela: false,
                altarPurificado: false,
                altarEstudado: false,
                altarAbsorvido: false,
                confiouBruxa: false,
                ameacouBruxa: false,
                ajudouBruxa: false,
                aliouOrcs: false,
                matouBatedorOrc: false,
                libertouEspíritoRuinas: false,
                absorveuEspíritoRuinas: false,
                pactoDemoniacoParcial: false,
                pactoDemoniacoTotal: false,
                integrouSombra: false,
                destruiuSombra: false,
                fundiuSombra: false,
                pegouEspadaRei: false,
                pegouCoroaRei: false,
                absorveuRei: false
            },

            npcCampanha: {
                elian:   { confianca: 0, respeito: 0, medo: 0, ruptura: false, eventoConcluido: false },
                soraya:  { confianca: 0, respeito: 0, medo: 0, ruptura: false, eventoConcluido: false },
                draeven: { confianca: 0, respeito: 0, medo: 0, ruptura: false, eventoConcluido: false },
                iris:    { confianca: 0, respeito: 0, medo: 0, ruptura: false, eventoConcluido: false },
                tallen:  { confianca: 0, respeito: 0, medo: 0, ruptura: false, eventoConcluido: false },
                maela:   { confianca: 0, respeito: 0, medo: 0, ruptura: false, eventoConcluido: false }
            },

            capitulosVistos: [],
            cenasVistas: [],
            eventosNarrativosConcluidos: [],
            escolhasGrandes: [],

            marcasNarrativas: {
                contatoComCorrupcao: 0,
                misericordiaExercida: 0,
                ambicaoAssumida: 0
            },

            finalAlcancado: null
        };
    }
}

if (typeof garantirEstadoNarrativoPlayer !== "function") {
    function garantirEstadoNarrativoPlayer() {
        if (!player.narrativa) {
            player.narrativa = criarEstadoNarrativoPadrao();
            return;
        }

        if (!player.narrativa.rota) {
            player.narrativa.rota = { heroi: 0, neutro: 0, sombrio: 0 };
        }

        if (!player.narrativa.flagsNarrativas) {
            player.narrativa.flagsNarrativas = criarEstadoNarrativoPadrao().flagsNarrativas;
        }

        if (!player.narrativa.npcCampanha) {
            player.narrativa.npcCampanha = criarEstadoNarrativoPadrao().npcCampanha;
        }

        if (!player.narrativa.capitulosVistos) player.narrativa.capitulosVistos = [];
        if (!player.narrativa.cenasVistas) player.narrativa.cenasVistas = [];
        if (!player.narrativa.eventosNarrativosConcluidos) player.narrativa.eventosNarrativosConcluidos = [];
        if (!player.narrativa.escolhasGrandes) player.narrativa.escolhasGrandes = [];

        if (!player.narrativa.marcasNarrativas) {
            player.narrativa.marcasNarrativas = {
                contatoComCorrupcao: 0,
                misericordiaExercida: 0,
                ambicaoAssumida: 0
            };
        }

        if (typeof player.narrativa.finalAlcancado === "undefined") player.narrativa.finalAlcancado = null;
    }
}

if (typeof garantirEstadoNarrativoPlayer !== "function") {
   function garantirEstadoNarrativoPlayer() {
    if (!player.narrativa) {
        player.narrativa = criarEstadoNarrativoPadrao();
        return;
    }

    if (!player.narrativa.rota) {
        player.narrativa.rota = { heroi: 0, neutro: 0, sombrio: 0 };
    }

    if (!player.narrativa.flagsNarrativas) {
        player.narrativa.flagsNarrativas = criarEstadoNarrativoPadrao().flagsNarrativas;
    }

    if (!player.narrativa.npcCampanha) {
        player.narrativa.npcCampanha = criarEstadoNarrativoPadrao().npcCampanha;
    }

    if (!player.narrativa.capitulosVistos) player.narrativa.capitulosVistos = [];
    if (!player.narrativa.cenasVistas) player.narrativa.cenasVistas = [];
    if (!player.narrativa.eventosNarrativosConcluidos) player.narrativa.eventosNarrativosConcluidos = [];
    if (!player.narrativa.escolhasGrandes) player.narrativa.escolhasGrandes = [];

    if (!player.narrativa.marcasNarrativas) {
        player.narrativa.marcasNarrativas = {
            contatoComCorrupcao: 0,
            misericordiaExercida: 0,
            ambicaoAssumida: 0
        };
    }

    if (typeof player.narrativa.finalAlcancado === "undefined") {
        player.narrativa.finalAlcancado = null;
    }
} }

if (!player.comprasLojaLimitadas) {
    player.comprasLojaLimitadas = {};
}
function getQuantidadeCompradaLoja(nomeItem) {
    if (!player.comprasLojaLimitadas) {
        player.comprasLojaLimitadas = {};
    }
    return player.comprasLojaLimitadas[nomeItem] || 0;
}
function registrarCompraLoja(nomeItem) {
    if (!player.comprasLojaLimitadas) {
        player.comprasLojaLimitadas = {};
    }

    if (!player.comprasLojaLimitadas[nomeItem]) {
        player.comprasLojaLimitadas[nomeItem] = 0;
    }

    player.comprasLojaLimitadas[nomeItem]++;
}
function podeComprarItemLoja(item) {
    if (!item.limiteCompra) return true;

    var qtd = getQuantidadeCompradaLoja(item.nome);
    return qtd < item.limiteCompra;
}