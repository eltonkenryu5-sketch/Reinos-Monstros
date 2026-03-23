// ============================================
// WORLD.JS LIMPO
// ============================================
if (typeof gameState === "undefined") {
    var gameState = {
        areaAtual: null,
        emCombate: false,
        emMasmorra: false,
        dungeonFloor: 0,
        dungeonMaxFloor: 5,
        combateOrigem: "menu",
        monstroIsBoss: false,
        retornoResultado: "menu",
        cenaAtual: 0,
        capituloEmAndamento: null
    };
}

// ============================================
// SEÇÃO 1: ÁREAS DO JOGO
// ============================================

var areas = {
    floresta:    { nome: "🌲 Floresta Sombria", descricao: "Árvores sussurram segredos antigos. Criaturas selvagens espreitam nas sombras.", min: 1,  max: 3,  dungeonAndares: 4,  tier: 1, capitulo: 1 },
    pantano:     { nome: "🐸 Pântano Venenoso", descricao: "Águas turvas borbulham com gases tóxicos. O chão treme sob seus pés.", min: 4,  max: 6,  dungeonAndares: 5,  tier: 1, capitulo: 2 },
    colinas:     { nome: "⛰️ Colinas Sangrentas", descricao: "Campos de batalha antigos. O sangue dos caídos tingiu a terra para sempre.", min: 7,  max: 9,  dungeonAndares: 5,  tier: 1, capitulo: 3 },

    ruinas:      { nome: "🏚️ Ruínas Esquecidas", descricao: "Civilização perdida no tempo. Armadilhas mortais ainda funcionam.", min: 10, max: 12, dungeonAndares: 6,  tier: 2, capitulo: 4 },
    deserto:     { nome: "🏜️ Deserto Escaldante", descricao: "Sol impiedoso e tempestades de areia. Apenas os mais fortes sobrevivem.", min: 13, max: 15, dungeonAndares: 6,  tier: 2, capitulo: 5 },
    cemiterio:   { nome: "⚰️ Cemitério Profano", descricao: "Os mortos não descansam aqui. Lápides rachadas revelam segredos.", min: 16, max: 18, dungeonAndares: 7,  tier: 2, capitulo: 6 },

    caverna:     { nome: "🕳️ Caverna Profunda", descricao: "Trevas absolutas. Sons estranhos ecoam das profundezas insondáveis.", min: 19, max: 21, dungeonAndares: 7,  tier: 3, capitulo: 7 },
    vulcao:      { nome: "🌋 Vulcão Infernal", descricao: "Rios de lava cortam a paisagem. O ar queima os pulmões.", min: 22, max: 24, dungeonAndares: 8,  tier: 3, capitulo: 8 },
    geleira:     { nome: "🏔️ Geleira Eterna", descricao: "Frio que congela até a alma. Criaturas de gelo reinam supremas.", min: 25, max: 27, dungeonAndares: 8,  tier: 3, capitulo: 9 },

    cidadeFant:  { nome: "👻 Cidade Fantasma", descricao: "Espíritos vagam pelas ruas desertas. O véu entre mundos é fino.", min: 28, max: 30, dungeonAndares: 8,  tier: 4, capitulo: 10 },
    abismo:      { nome: "🌑 Abismo Sombrio", descricao: "A escuridão é uma entidade viva. Coisas sem nome observam.", min: 31, max: 33, dungeonAndares: 9,  tier: 4, capitulo: 11 },
    castelo:     { nome: "🏰 Castelo Amaldiçoado", descricao: "Fortaleza de um rei caído. Cada sala é uma armadilha mortal.", min: 34, max: 36, dungeonAndares: 9,  tier: 4, capitulo: 12 },

    planoAstral: { nome: "🌌 Plano Astral", descricao: "Além da realidade. As leis da física não se aplicam aqui.", min: 37, max: 39, dungeonAndares: 10, tier: 5, capitulo: 13 },
    infernus:    { nome: "🔥 Infernus", descricao: "O próprio inferno. Demônios reinam e almas gritam eternamente.", min: 40, max: 42, dungeonAndares: 10, tier: 5, capitulo: 14 },
    tronoDeus:   { nome: "⚡ Trono dos Deuses", descricao: "O destino final. Onde mortais desafiam divindades corrompidas.", min: 43, max: 45, dungeonAndares: 12, tier: 5, capitulo: 15 }
};

// ============================================
// SEÇÃO 2: DESBLOQUEIO DE ÁREAS
// ============================================

var areasDesbloqueadas = [];

function atualizarAreasDesbloqueadas() {
    Object.keys(areas).forEach(function(key) {
        var area = areas[key];
        if (player.level >= area.min && !areasDesbloqueadas.includes(key)) {
            areasDesbloqueadas.push(key);
            if (typeof mostrarMensagemDesbloqueio === "function") {
                mostrarMensagemDesbloqueio(area);
            }
        }
    });
}

const areasDesbloqueio = {
    4:  { nome: "Pântano Venenoso", icone: "🐸", id: "pantano" },
    7:  { nome: "Colinas Sangrentas", icone: "⛰️", id: "colinas" },
    10: { nome: "Ruínas Esquecidas", icone: "🏚️", id: "ruinas" },
    13: { nome: "Deserto Escaldante", icone: "🏜️", id: "deserto" },
    16: { nome: "Cemitério Profano", icone: "⚰️", id: "cemiterio" },
    19: { nome: "Caverna Profunda", icone: "🕳️", id: "caverna" },
    22: { nome: "Vulcão Infernal", icone: "🌋", id: "vulcao" },
    25: { nome: "Geleira Eterna", icone: "🏔️", id: "geleira" },
    28: { nome: "Cidade Fantasma", icone: "👻", id: "cidadeFant" },
    31: { nome: "Abismo Sombrio", icone: "🌑", id: "abismo" },
    34: { nome: "Castelo Amaldiçoado", icone: "🏰", id: "castelo" },
    37: { nome: "Plano Astral", icone: "🌌", id: "planoAstral" },
    40: { nome: "Infernus", icone: "🔥", id: "infernus" },
    43: { nome: "Trono dos Deuses", icone: "⚡", id: "tronoDeus" }
};

function verificarNovasAreas(novoNivel) {
    const area = areasDesbloqueio[novoNivel];
    if (!area) return;

    const card = document.getElementById("area-" + area.id);
    if (card) card.classList.remove("locked");

    const lock = document.getElementById("lock-" + area.id);
    if (lock) lock.style.display = "none";

    if (typeof mostrarAreaDesbloqueada === "function") {
        setTimeout(function() {
            mostrarAreaDesbloqueada(area.icone, area.nome, novoNivel);
        }, 500);
    }
}

// ============================================
// SEÇÃO 3: SELEÇÃO DE ÁREA
// ============================================

function selecionarArea(key) {
    console.log("Tentando selecionar área:", key);

    var area = areas[key];
    if (!area) {
        console.error("Área não encontrada:", key);
        if (typeof mostrarNotificacao === "function") {
            mostrarNotificacao("⚠️ Área não encontrada!");
        }
        return;
    }

    if (player.level < area.min) {
        console.warn("Nível insuficiente para área:", key);
        if (typeof mostrarNotificacao === "function") {
            mostrarNotificacao("🔒 Precisa de nível " + area.min + "!");
        }
        return;
    }

    gameState.areaAtual = key;

    var tituloEl = document.getElementById("areaOptionsTitle");
    var descEl = document.getElementById("areaOptionsDescription");

    if (tituloEl) tituloEl.textContent = area.nome;
    if (descEl) descEl.textContent = area.descricao;

    if (typeof atualizarUIMissao === "function") {
        atualizarUIMissao();
    }

    if (typeof atualizarNpcCampanhaArea === "function") {
        atualizarNpcCampanhaArea();
    }

    if (typeof verificarCapituloDisponivel === "function") {
        try {
            var cap = verificarCapituloDisponivel();
            var missaoEl = document.getElementById("missaoDisplay");

            if (missaoEl) {
                // Remove aviso anterior para não duplicar
                var avisoAntigo = missaoEl.querySelector(".capitulo-disponivel-box");
                if (avisoAntigo) {
                    avisoAntigo.remove();
                }

                if (cap) {
                    var historiaHTML =
                        '<div class="capitulo-disponivel-box" data-capitulo-id="' + cap.id + '" ' +
                             'style="background:rgba(139,92,246,0.15);border:1px solid rgba(139,92,246,0.3);border-radius:8px;padding:10px;margin-bottom:8px;text-align:center;">' +
                            '<strong style="color:#a78bfa;">📖 ' + cap.titulo + '</strong><br>' +
                            '<small style="color:#94a3b8;">Novo capítulo da história disponível!</small><br>' +
                            '<button type="button" onclick="abrirHistoria()" style="margin-top:6px;padding:6px 15px;font-size:0.85em;background:linear-gradient(180deg,#7c3aed,#5b21b6);border:1px solid #8b5cf6;color:#e9d5ff;border-radius:6px;cursor:pointer;">📖 Ver Capítulo</button>' +
                        '</div>';

                    missaoEl.insertAdjacentHTML("afterbegin", historiaHTML);
                }
            }
        } catch (e) {
            console.error("Erro ao verificar capítulo:", e);
        }
    }

    if (typeof mostrarPainelFullscreen === "function") {
        mostrarPainelFullscreen("areaOptionsPanel");
    }

    if (typeof log === "function") {
        log("Chegou em " + area.nome + ".");
    }

    console.log("Área selecionada com sucesso:", key);
}
// ============================================
// SEÇÃO 4: BANCO DE MONSTROS
// ============================================

// ╔══════════════════════════════════════════════════════════════╗
// ║          SISTEMA DE IA DOS MONSTROS - V2.0                  ║
// ║  Comportamento dinâmico baseado em HP, personalidade e      ║
// ║  ações ponderadas por peso (weighted random)                ║
// ╚══════════════════════════════════════════════════════════════╝

/*
 * ═══════════════════════════════════════════
 * GUIA DE AÇÕES DISPONÍVEIS PARA MONSTROS
 * ═══════════════════════════════════════════
 * 
 * "atacar"        → Ataque básico (100% do ATK)
 * "atacar_forte"  → Ataque pesado (140% do ATK)
 * "defender"      → Reduz dano recebido no turno (+50% DEF temporário)
 * "status_atk"    → Ataque + chance de aplicar status (85% do ATK)
 * "especial"      → Habilidade única do monstro (definida por monstro)
 * "curar"         → Recupera 15-25% do HP máximo
 * "furia"         → Enrage: +35% ATK por 2 turnos, -20% DEF
 * "drenar"        → 75% do ATK como dano, cura 50% do dano causado
 * "investida"     → 160% do ATK, mas sofre 10% do próprio HP como recuo
 * "buff_def"      → +30% DEF por 3 turnos
 * "atk_duplo"     → Dois ataques de 60% do ATK cada
 * "provocar"      → Reduz DEF do jogador em 20% por 2 turnos
 * "invocar"       → Invoca ajuda (cura ou buff aleatório)
 *
 * ═══════════════════════════════════════════
 * STATUS APLICÁVEIS
 * ═══════════════════════════════════════════
 *
 * "envenenado"    → Dano por turno (8% do HP max), 3 turnos
 * "fraqueza"      → ATK do alvo -20%, 3 turnos
 * "queimando"     → Dano por turno (10% do HP max), 2 turnos
 * "congelado"     → 30% de perder o turno, 2 turnos
 * "amaldicoado"   → ATK e DEF -15%, 3 turnos
 * "cego"          → 25% de errar ataques, 2 turnos
 * "sangramento"   → Dano por turno (5% do HP max), 4 turnos
 * "atordoado"     → Perde o próximo turno, 1 turno
 * "corrompido"    → Recebe 25% mais dano, 3 turnos
 * "apavorado"     → ATK -30%, 2 turnos
 *
 * ═══════════════════════════════════════════
 * TIPOS DE PERSONALIDADE
 * ═══════════════════════════════════════════
 *
 * "agressivo"     → Prioriza ataques, raramente defende
 * "defensivo"     → Alterna entre ataque e defesa equilibradamente
 * "tatico"        → Usa debuffs/status estrategicamente
 * "berserk"       → Fica mais perigoso conforme perde HP
 * "magico"        → Foca em habilidades especiais e status
 * "predador"      → Ataca forte no início, recua quando fraco
 * "guardiao"      → Muito defensivo, contra-ataca com força
 * "necro"         → Drena vida e aplica debuffs constantemente
 * "caos"          → Ações imprevisíveis e variadas
 * "equilibrado"   → Distribuição balanceada de todas as ações
 */

// ──────────────────────────────────────────
// FUNÇÃO PRINCIPAL DE DECISÃO DA IA
// ──────────────────────────────────────────

function escolherAcaoMonstro(nomeMonstro, hpAtual, hpMax, turnoAtual) {
    var ia = iaMonstroPadroes[nomeMonstro];

    // Fallback: se não encontrar IA, usa padrão antigo (ciclo simples)
    if (!ia) {
        return { acao: "atacar", multiplicador: 1.0, mensagem: "ataca!" };
    }

    // ── Determinar fase de HP ──
    var percentHP = (hpAtual / hpMax) * 100;
    var fase;

    if (percentHP > 60) {
        fase = "hpAlto";
    } else if (percentHP > 30) {
        fase = "hpMedio";
    } else {
        fase = "hpBaixo";
    }

    // ── Verificar triggers especiais ──
    // Primeiro turno: alguns monstros têm ação garantida
    if (turnoAtual === 1 && ia.primeiroTurno) {
        return processarAcao(ia.primeiroTurno, ia);
    }

    // Enrage: ao entrar em HP baixo pela primeira vez
    if (fase === "hpBaixo" && ia.tipo === "berserk" && !ia._enraged) {
        ia._enraged = true;
        return processarAcao("furia", ia);
    }

    // ── Seleção ponderada de ação ──
    var comportamento = ia.comportamento[fase];
    if (!comportamento) {
        // Fallback para padrão cíclico antigo
        var idx = (turnoAtual - 1) % ia.padrao.length;
        return processarAcao(ia.padrao[idx], ia);
    }

    var acoes = comportamento.acoes;
    var pesos = comportamento.pesos;

    var acaoEscolhida = selecaoPonderada(acoes, pesos);
    return processarAcao(acaoEscolhida, ia);
}

// ── Seleção aleatória ponderada ──
function selecaoPonderada(acoes, pesos) {
    var totalPeso = 0;
    for (var i = 0; i < pesos.length; i++) {
        totalPeso += pesos[i];
    }

    var roll = Math.random() * totalPeso;
    var acumulado = 0;

    for (var i = 0; i < acoes.length; i++) {
        acumulado += pesos[i];
        if (roll <= acumulado) {
            return acoes[i];
        }
    }
    return acoes[0];
}

// ── Processar ação escolhida em objeto de resultado ──
function processarAcao(acao, ia) {
    var resultado = {
        acao: acao,
        multiplicador: 1.0,
        aplicarStatus: false,
        statusTipo: null,
        mensagem: "",
        curaPct: 0,
        buffAtk: 0,
        buffDef: 0,
        debuffAlvo: null,
        autoRecuo: 0
    };

    switch (acao) {
        case "atacar":
            resultado.multiplicador = 1.0;
            resultado.mensagem = "ataca!";
            break;

        case "atacar_forte":
            resultado.multiplicador = 1.4;
            resultado.mensagem = "desfere um golpe poderoso!";
            break;

        case "defender":
            resultado.multiplicador = 0;
            resultado.buffDef = 0.5;
            resultado.mensagem = "assume postura defensiva!";
            break;

        case "status_atk":
            resultado.multiplicador = 0.85;
            if (Math.random() < (ia.chanceStatus || 0.25)) {
                resultado.aplicarStatus = true;
                resultado.statusTipo = ia.status;
            }
            resultado.mensagem = "ataca com intenção maligna!";
            break;

        case "especial":
            resultado.multiplicador = ia.especialMult || 1.2;
            resultado.mensagem = ia.especialMsg || "usa uma habilidade especial!";
            if (ia.especialStatus && Math.random() < (ia.chanceStatus || 0.3)) {
                resultado.aplicarStatus = true;
                resultado.statusTipo = ia.especialStatus;
            }
            break;

        case "curar":
            resultado.multiplicador = 0;
            resultado.curaPct = ia.curaPct || 0.20;
            resultado.mensagem = "se regenera!";
            break;

        case "furia":
            resultado.multiplicador = 0;
            resultado.buffAtk = 0.35;
            resultado.buffDef = -0.20;
            resultado.mensagem = "entra em FÚRIA! Seus olhos brilham com ódio!";
            break;

        case "drenar":
            resultado.multiplicador = 0.75;
            resultado.curaPct = -1; // Flag especial: cura = 50% do dano causado
            resultado.mensagem = "drena sua energia vital!";
            break;

        case "investida":
            resultado.multiplicador = 1.6;
            resultado.autoRecuo = 0.10;
            resultado.mensagem = "faz uma investida brutal!";
            break;

        case "buff_def":
            resultado.multiplicador = 0;
            resultado.buffDef = 0.30;
            resultado.mensagem = "endurece seu corpo!";
            break;

        case "atk_duplo":
            resultado.multiplicador = 0.6;
            resultado.mensagem = "desfere dois golpes rápidos!";
            // O sistema de combate deve aplicar o dano 2x
            resultado.hits = 2;
            break;

        case "provocar":
            resultado.multiplicador = 0.3;
            resultado.debuffAlvo = { tipo: "def", valor: -0.20, turnos: 2 };
            resultado.mensagem = "provoca e encontra uma brecha na defesa!";
            break;

        case "invocar":
            resultado.multiplicador = 0;
            resultado.curaPct = 0.15;
            resultado.buffAtk = 0.15;
            resultado.mensagem = "invoca poder das sombras!";
            break;

        default:
            resultado.multiplicador = 1.0;
            resultado.mensagem = "ataca!";
    }

    // ── Chance de crítico ──
    if (resultado.multiplicador > 0 && Math.random() < (ia.chanceCritico || 0.05)) {
        resultado.multiplicador *= 1.5;
        resultado.mensagem = "desfere um GOLPE CRÍTICO! " + resultado.mensagem;
        resultado.critico = true;
    }

    return resultado;
}

// ──────────────────────────────────────────
// FUNÇÃO AUXILIAR: Reset de estado da IA
// (chamar no início de cada combate)
// ──────────────────────────────────────────
function resetarIAMonstro(nomeMonstro) {
    var ia = iaMonstroPadroes[nomeMonstro];
    if (ia) {
        ia._enraged = false;
    }
}


// ╔══════════════════════════════════════════════════════════════╗
// ║         PADRÕES DE IA PARA TODOS OS MONSTROS                ║
// ╚══════════════════════════════════════════════════════════════╝

var iaMonstroPadroes = {

    // ══════════════════════════════════════
    // ████ FLORESTA SOMBRIA (Tier 1) ████
    // ══════════════════════════════════════

    "Lobo Cinzento": {
        tipo: "predador",
        padrao: ["atacar", "atacar", "atacar_forte"],
        chanceStatus: 0,
        status: null,
        chanceCritico: 0.08,
        comportamento: {
            hpAlto:  { acoes: ["atacar", "atacar_forte", "investida"],  pesos: [45, 35, 20] },
            hpMedio: { acoes: ["atacar", "atacar_forte", "defender"],   pesos: [40, 35, 25] },
            hpBaixo: { acoes: ["atacar_forte", "investida", "atacar"], pesos: [40, 35, 25] }
        }
    },

    "Goblin Explorador": {
        tipo: "tatico",
        padrao: ["atacar", "atacar", "especial"],
        chanceStatus: 0.15,
        status: "fraqueza",
        chanceCritico: 0.10,
        especialMult: 1.1,
        especialMsg: "lança uma armadilha improvisada!",
        especialStatus: "fraqueza",
        comportamento: {
            hpAlto:  { acoes: ["atacar", "status_atk", "especial"],         pesos: [45, 30, 25] },
            hpMedio: { acoes: ["atacar", "atacar_forte", "status_atk"],     pesos: [35, 35, 30] },
            hpBaixo: { acoes: ["atacar_forte", "defender", "status_atk"],   pesos: [40, 30, 30] }
        }
    },

    "Aranha Gigante": {
        tipo: "tatico",
        padrao: ["atacar", "status_atk", "atacar"],
        chanceStatus: 0.25,
        status: "envenenado",
        chanceCritico: 0.06,
        comportamento: {
            hpAlto:  { acoes: ["status_atk", "atacar", "status_atk"],      pesos: [40, 35, 25] },
            hpMedio: { acoes: ["status_atk", "atacar_forte", "atacar"],    pesos: [35, 35, 30] },
            hpBaixo: { acoes: ["atacar_forte", "status_atk", "investida"], pesos: [40, 35, 25] }
        }
    },

    "Javali Selvagem": {
        tipo: "berserk",
        padrao: ["atacar", "atacar", "atacar_forte", "defender"],
        chanceStatus: 0,
        status: null,
        chanceCritico: 0.07,
        comportamento: {
            hpAlto:  { acoes: ["atacar", "atacar_forte", "defender"],        pesos: [40, 30, 30] },
            hpMedio: { acoes: ["atacar_forte", "investida", "atacar"],       pesos: [35, 35, 30] },
            hpBaixo: { acoes: ["investida", "furia", "atacar_forte"],       pesos: [40, 35, 25] }
        }
    },

    "Espírito da Floresta": {
        tipo: "magico",
        padrao: ["status_atk", "especial", "atacar"],
        chanceStatus: 0.30,
        status: "fraqueza",
        chanceCritico: 0.05,
        especialMult: 1.3,
        especialMsg: "invoca raízes que brotam do chão!",
        especialStatus: "atordoado",
        curaPct: 0.20,
        comportamento: {
            hpAlto:  { acoes: ["especial", "status_atk", "atacar"],          pesos: [35, 35, 30] },
            hpMedio: { acoes: ["curar", "especial", "status_atk"],           pesos: [30, 35, 35] },
            hpBaixo: { acoes: ["curar", "especial", "atacar_forte"],         pesos: [40, 35, 25] }
        }
    },

    // ══════════════════════════════════════
    // ████ PÂNTANO VENENOSO (Tier 1) ████
    // ══════════════════════════════════════

    "Sapo Venenoso": {
        tipo: "tatico",
        padrao: ["atacar", "status_atk", "atacar"],
        chanceStatus: 0.30,
        status: "envenenado",
        chanceCritico: 0.06,
        comportamento: {
            hpAlto:  { acoes: ["status_atk", "atacar", "status_atk"],      pesos: [40, 35, 25] },
            hpMedio: { acoes: ["status_atk", "atacar_forte", "defender"],   pesos: [40, 35, 25] },
            hpBaixo: { acoes: ["atacar_forte", "status_atk", "investida"], pesos: [35, 35, 30] }
        }
    },

    "Cobra d'Água": {
        tipo: "predador",
        padrao: ["atacar", "atacar_forte", "status_atk"],
        chanceStatus: 0.25,
        status: "envenenado",
        chanceCritico: 0.12,
        primeiroTurno: "status_atk",
        comportamento: {
            hpAlto:  { acoes: ["atacar_forte", "status_atk", "atacar"],     pesos: [40, 35, 25] },
            hpMedio: { acoes: ["atacar_forte", "atacar", "defender"],       pesos: [40, 30, 30] },
            hpBaixo: { acoes: ["investida", "atacar_forte", "atacar"],      pesos: [40, 35, 25] }
        }
    },

    "Crocodilo Ancião": {
        tipo: "guardiao",
        padrao: ["defender", "atacar_forte", "atacar"],
        chanceStatus: 0,
        status: null,
        chanceCritico: 0.08,
        comportamento: {
            hpAlto:  { acoes: ["defender", "atacar_forte", "atacar"],        pesos: [30, 40, 30] },
            hpMedio: { acoes: ["atacar_forte", "defender", "investida"],     pesos: [35, 35, 30] },
            hpBaixo: { acoes: ["investida", "atacar_forte", "defender"],     pesos: [40, 35, 25] }
        }
    },

    "Planta Carnívora": {
        tipo: "tatico",
        padrao: ["atacar", "status_atk", "especial"],
        chanceStatus: 0.25,
        status: "envenenado",
        chanceCritico: 0.05,
        especialMult: 1.2,
        especialMsg: "lança ácido corrosivo!",
        especialStatus: "fraqueza",
        curaPct: 0.15,
        comportamento: {
            hpAlto:  { acoes: ["status_atk", "especial", "atacar"],          pesos: [35, 35, 30] },
            hpMedio: { acoes: ["curar", "status_atk", "atacar_forte"],       pesos: [30, 35, 35] },
            hpBaixo: { acoes: ["curar", "atacar_forte", "especial"],         pesos: [40, 30, 30] }
        }
    },

    "Zumbi do Pântano": {
        tipo: "berserk",
        padrao: ["atacar", "atacar", "atacar_forte"],
        chanceStatus: 0.15,
        status: "envenenado",
        chanceCritico: 0.04,
        curaPct: 0.10,
        comportamento: {
            hpAlto:  { acoes: ["atacar", "atacar_forte", "status_atk"],     pesos: [40, 30, 30] },
            hpMedio: { acoes: ["atacar_forte", "curar", "atacar"],          pesos: [40, 30, 30] },
            hpBaixo: { acoes: ["furia", "atacar_forte", "curar"],           pesos: [35, 35, 30] }
        }
    },

    // ══════════════════════════════════════
    // ████ COLINAS SANGRENTAS (Tier 1) ████
    // ══════════════════════════════════════

    "Orc Batedor": {
        tipo: "agressivo",
        padrao: ["atacar", "atacar_forte", "atacar"],
        chanceStatus: 0,
        status: null,
        chanceCritico: 0.10,
        comportamento: {
            hpAlto:  { acoes: ["atacar", "atacar_forte", "investida"],      pesos: [40, 35, 25] },
            hpMedio: { acoes: ["atacar_forte", "investida", "defender"],    pesos: [40, 35, 25] },
            hpBaixo: { acoes: ["furia", "investida", "atacar_forte"],      pesos: [35, 35, 30] }
        }
    },

    "Harpia": {
        tipo: "predador",
        padrao: ["atacar_forte", "atacar", "especial"],
        chanceStatus: 0.15,
        status: "cego",
        chanceCritico: 0.12,
        especialMult: 1.3,
        especialMsg: "mergulha dos céus com garras afiadas!",
        comportamento: {
            hpAlto:  { acoes: ["atacar_forte", "especial", "atk_duplo"],    pesos: [35, 35, 30] },
            hpMedio: { acoes: ["atacar_forte", "defender", "especial"],     pesos: [40, 30, 30] },
            hpBaixo: { acoes: ["investida", "atacar_forte", "especial"],    pesos: [40, 30, 30] }
        }
    },

    "Centauro Selvagem": {
        tipo: "equilibrado",
        padrao: ["atacar", "defender", "atacar_forte"],
        chanceStatus: 0,
        status: null,
        chanceCritico: 0.08,
        comportamento: {
            hpAlto:  { acoes: ["atacar", "atacar_forte", "defender"],        pesos: [35, 35, 30] },
            hpMedio: { acoes: ["atacar_forte", "defender", "investida"],    pesos: [35, 35, 30] },
            hpBaixo: { acoes: ["investida", "atacar_forte", "defender"],    pesos: [40, 35, 25] }
        }
    },

    "Warg Sombrio": {
        tipo: "predador",
        padrao: ["atacar_forte", "atacar", "atacar_forte"],
        chanceStatus: 0.10,
        status: "sangramento",
        chanceCritico: 0.12,
        primeiroTurno: "investida",
        comportamento: {
            hpAlto:  { acoes: ["atacar_forte", "investida", "atk_duplo"],   pesos: [35, 35, 30] },
            hpMedio: { acoes: ["atacar_forte", "status_atk", "atacar"],    pesos: [40, 30, 30] },
            hpBaixo: { acoes: ["furia", "investida", "atacar_forte"],      pesos: [35, 35, 30] }
        }
    },

    "Basilisco Rochoso": {
        tipo: "magico",
        padrao: ["status_atk", "atacar", "especial"],
        chanceStatus: 0.25,
        status: "atordoado",
        chanceCritico: 0.06,
        especialMult: 1.4,
        especialMsg: "lança um olhar petrificante!",
        especialStatus: "atordoado",
        comportamento: {
            hpAlto:  { acoes: ["especial", "status_atk", "atacar"],         pesos: [35, 35, 30] },
            hpMedio: { acoes: ["status_atk", "atacar_forte", "defender"],   pesos: [35, 35, 30] },
            hpBaixo: { acoes: ["especial", "atacar_forte", "defender"],     pesos: [40, 35, 25] }
        }
    },

    // ══════════════════════════════════════
    // ████ RUÍNAS ESQUECIDAS (Tier 2) ████
    // ══════════════════════════════════════

    "Esqueleto Guerreiro": {
        tipo: "agressivo",
        padrao: ["atacar", "atacar_forte", "atacar"],
        chanceStatus: 0,
        status: null,
        chanceCritico: 0.10,
        comportamento: {
            hpAlto:  { acoes: ["atacar", "atacar_forte", "atk_duplo"],      pesos: [40, 35, 25] },
            hpMedio: { acoes: ["atacar_forte", "defender", "atk_duplo"],    pesos: [40, 30, 30] },
            hpBaixo: { acoes: ["furia", "atacar_forte", "investida"],      pesos: [35, 35, 30] }
        }
    },

    "Golem de Pedra": {
        tipo: "guardiao",
        padrao: ["defender", "atacar_forte", "atacar_forte"],
        chanceStatus: 0,
        status: null,
        chanceCritico: 0.05,
        primeiroTurno: "buff_def",
        comportamento: {
            hpAlto:  { acoes: ["defender", "atacar_forte", "buff_def"],      pesos: [30, 40, 30] },
            hpMedio: { acoes: ["atacar_forte", "defender", "investida"],    pesos: [40, 35, 25] },
            hpBaixo: { acoes: ["investida", "atacar_forte", "atacar_forte"], pesos: [35, 35, 30] }
        }
    },

    "Espectro Antigo": {
        tipo: "magico",
        padrao: ["status_atk", "especial", "drenar"],
        chanceStatus: 0.30,
        status: "amaldicoado",
        chanceCritico: 0.08,
        especialMult: 1.3,
        especialMsg: "emite um grito fantasmagórico!",
        especialStatus: "apavorado",
        comportamento: {
            hpAlto:  { acoes: ["especial", "status_atk", "drenar"],          pesos: [35, 35, 30] },
            hpMedio: { acoes: ["drenar", "especial", "status_atk"],          pesos: [35, 35, 30] },
            hpBaixo: { acoes: ["drenar", "especial", "curar"],               pesos: [40, 35, 25] }
        }
    },

    "Mimico": {
        tipo: "caos",
        padrao: ["especial", "atacar_forte", "status_atk"],
        chanceStatus: 0.20,
        status: "atordoado",
        chanceCritico: 0.15,
        especialMult: 1.5,
        especialMsg: "revela sua forma verdadeira e morde!",
        primeiroTurno: "especial",
        comportamento: {
            hpAlto:  { acoes: ["especial", "atacar_forte", "atk_duplo"],    pesos: [30, 35, 35] },
            hpMedio: { acoes: ["atacar_forte", "status_atk", "defender"],   pesos: [40, 30, 30] },
            hpBaixo: { acoes: ["investida", "atacar_forte", "drenar"],      pesos: [35, 35, 30] }
        }
    },

    "Sentinela de Ruínas": {
        tipo: "guardiao",
        padrao: ["defender", "atacar", "atacar_forte"],
        chanceStatus: 0.10,
        status: "fraqueza",
        chanceCritico: 0.06,
        comportamento: {
            hpAlto:  { acoes: ["defender", "atacar", "provocar"],            pesos: [35, 35, 30] },
            hpMedio: { acoes: ["atacar_forte", "defender", "status_atk"],   pesos: [35, 35, 30] },
            hpBaixo: { acoes: ["atacar_forte", "furia", "investida"],      pesos: [35, 35, 30] }
        }
    },

    // ══════════════════════════════════════
    // ████ DESERTO ESCALDANTE (Tier 2) ████
    // ══════════════════════════════════════

    "Escorpião do Deserto": {
        tipo: "tatico",
        padrao: ["atacar", "status_atk", "atacar_forte"],
        chanceStatus: 0.30,
        status: "envenenado",
        chanceCritico: 0.10,
        comportamento: {
            hpAlto:  { acoes: ["status_atk", "atacar", "atacar_forte"],     pesos: [40, 30, 30] },
            hpMedio: { acoes: ["atacar_forte", "status_atk", "defender"],   pesos: [35, 35, 30] },
            hpBaixo: { acoes: ["investida", "status_atk", "atacar_forte"], pesos: [35, 35, 30] }
        }
    },

    "Serpente das Dunas": {
        tipo: "predador",
        padrao: ["status_atk", "atacar_forte", "atacar"],
        chanceStatus: 0.25,
        status: "envenenado",
        chanceCritico: 0.12,
        primeiroTurno: "status_atk",
        comportamento: {
            hpAlto:  { acoes: ["atacar_forte", "status_atk", "atk_duplo"],  pesos: [35, 35, 30] },
            hpMedio: { acoes: ["status_atk", "atacar_forte", "defender"],   pesos: [35, 35, 30] },
            hpBaixo: { acoes: ["investida", "atacar_forte", "status_atk"], pesos: [40, 30, 30] }
        }
    },

    "Múmia Errante": {
        tipo: "necro",
        padrao: ["status_atk", "drenar", "atacar"],
        chanceStatus: 0.25,
        status: "amaldicoado",
        chanceCritico: 0.06,
        curaPct: 0.12,
        comportamento: {
            hpAlto:  { acoes: ["status_atk", "atacar", "drenar"],            pesos: [35, 35, 30] },
            hpMedio: { acoes: ["drenar", "status_atk", "curar"],             pesos: [35, 35, 30] },
            hpBaixo: { acoes: ["drenar", "curar", "atacar_forte"],           pesos: [40, 35, 25] }
        }
    },

    "Elemental de Areia": {
        tipo: "caos",
        padrao: ["especial", "atacar", "defender"],
        chanceStatus: 0.20,
        status: "cego",
        chanceCritico: 0.08,
        especialMult: 1.3,
        especialMsg: "lança uma tempestade de areia!",
        especialStatus: "cego",
        curaPct: 0.15,
        comportamento: {
            hpAlto:  { acoes: ["especial", "atacar_forte", "status_atk"],   pesos: [35, 30, 35] },
            hpMedio: { acoes: ["defender", "curar", "especial"],             pesos: [30, 35, 35] },
            hpBaixo: { acoes: ["curar", "especial", "atacar_forte"],         pesos: [35, 35, 30] }
        }
    },

    "Bandido do Deserto": {
        tipo: "tatico",
        padrao: ["atacar", "atacar_forte", "especial"],
        chanceStatus: 0.15,
        status: "fraqueza",
        chanceCritico: 0.15,
        especialMult: 1.2,
        especialMsg: "joga areia nos seus olhos e ataca!",
        especialStatus: "cego",
        comportamento: {
            hpAlto:  { acoes: ["atacar_forte", "especial", "atacar"],        pesos: [35, 30, 35] },
            hpMedio: { acoes: ["atacar_forte", "defender", "status_atk"],   pesos: [40, 30, 30] },
            hpBaixo: { acoes: ["investida", "atacar_forte", "defender"],    pesos: [40, 35, 25] }
        }
    },

    // ══════════════════════════════════════
    // ████ CEMITÉRIO PROFANO (Tier 2) ████
    // ══════════════════════════════════════

    "Zumbi Putrefato": {
        tipo: "berserk",
        padrao: ["atacar", "atacar", "atacar_forte"],
        chanceStatus: 0.20,
        status: "envenenado",
        chanceCritico: 0.04,
        comportamento: {
            hpAlto:  { acoes: ["atacar", "atacar_forte", "status_atk"],     pesos: [40, 30, 30] },
            hpMedio: { acoes: ["atacar_forte", "status_atk", "atacar"],    pesos: [35, 35, 30] },
            hpBaixo: { acoes: ["furia", "investida", "atacar_forte"],      pesos: [35, 35, 30] }
        }
    },

    "Esqueleto Arqueiro": {
        tipo: "predador",
        padrao: ["atacar", "atacar_forte", "atacar"],
        chanceStatus: 0,
        status: null,
        chanceCritico: 0.18,
        comportamento: {
            hpAlto:  { acoes: ["atacar_forte", "atk_duplo", "atacar"],      pesos: [35, 35, 30] },
            hpMedio: { acoes: ["atk_duplo", "atacar_forte", "defender"],   pesos: [35, 35, 30] },
            hpBaixo: { acoes: ["atacar_forte", "atk_duplo", "investida"],  pesos: [35, 35, 30] }
        }
    },

    "Fantasma Lamentoso": {
        tipo: "magico",
        padrao: ["especial", "status_atk", "drenar"],
        chanceStatus: 0.30,
        status: "apavorado",
        chanceCritico: 0.06,
        especialMult: 1.2,
        especialMsg: "emite um lamento que gela o sangue!",
        especialStatus: "apavorado",
        comportamento: {
            hpAlto:  { acoes: ["especial", "status_atk", "drenar"],          pesos: [35, 30, 35] },
            hpMedio: { acoes: ["drenar", "especial", "status_atk"],          pesos: [35, 35, 30] },
            hpBaixo: { acoes: ["drenar", "curar", "especial"],               pesos: [40, 30, 30] }
        }
    },

    "Carniçal Faminto": {
        tipo: "berserk",
        padrao: ["atacar_forte", "drenar", "atacar"],
        chanceStatus: 0.15,
        status: "sangramento",
        chanceCritico: 0.12,
        comportamento: {
            hpAlto:  { acoes: ["atacar_forte", "drenar", "atk_duplo"],      pesos: [35, 35, 30] },
            hpMedio: { acoes: ["drenar", "atacar_forte", "furia"],          pesos: [35, 35, 30] },
            hpBaixo: { acoes: ["furia", "drenar", "investida"],             pesos: [35, 35, 30] }
        }
    },

    "Coveiro Maldito": {
        tipo: "necro",
        padrao: ["atacar", "invocar", "status_atk"],
        chanceStatus: 0.20,
        status: "amaldicoado",
        chanceCritico: 0.08,
        curaPct: 0.15,
        comportamento: {
            hpAlto:  { acoes: ["atacar", "status_atk", "invocar"],           pesos: [35, 35, 30] },
            hpMedio: { acoes: ["invocar", "drenar", "status_atk"],           pesos: [35, 35, 30] },
            hpBaixo: { acoes: ["curar", "invocar", "drenar"],                pesos: [35, 35, 30] }
        }
    },

    // ══════════════════════════════════════
    // ████ CAVERNA PROFUNDA (Tier 3) ████
    // ══════════════════════════════════════

    "Troll das Cavernas": {
        tipo: "berserk",
        padrao: ["atacar_forte", "atacar", "atacar_forte"],
        chanceStatus: 0,
        status: null,
        chanceCritico: 0.08,
        curaPct: 0.15,
        comportamento: {
            hpAlto:  { acoes: ["atacar_forte", "atacar", "investida"],       pesos: [40, 30, 30] },
            hpMedio: { acoes: ["curar", "atacar_forte", "investida"],        pesos: [30, 35, 35] },
            hpBaixo: { acoes: ["furia", "curar", "investida"],               pesos: [35, 35, 30] }
        }
    },

    "Morcego Vampírico": {
        tipo: "necro",
        padrao: ["drenar", "atacar", "atk_duplo"],
        chanceStatus: 0.15,
        status: "sangramento",
        chanceCritico: 0.14,
        comportamento: {
            hpAlto:  { acoes: ["atk_duplo", "drenar", "atacar_forte"],      pesos: [35, 35, 30] },
            hpMedio: { acoes: ["drenar", "atk_duplo", "atacar_forte"],      pesos: [40, 30, 30] },
            hpBaixo: { acoes: ["drenar", "drenar", "atk_duplo"],            pesos: [45, 30, 25] }
        }
    },

    "Verme das Profundezas": {
        tipo: "agressivo",
        padrao: ["investida", "atacar", "atacar_forte"],
        chanceStatus: 0.20,
        status: "envenenado",
        chanceCritico: 0.06,
        primeiroTurno: "investida",
        comportamento: {
            hpAlto:  { acoes: ["investida", "atacar_forte", "status_atk"],  pesos: [35, 35, 30] },
            hpMedio: { acoes: ["atacar_forte", "status_atk", "defender"],   pesos: [35, 35, 30] },
            hpBaixo: { acoes: ["investida", "furia", "atacar_forte"],       pesos: [35, 35, 30] }
        }
    },

    "Golem de Cristal": {
        tipo: "guardiao",
        padrao: ["defender", "atacar_forte", "especial"],
        chanceStatus: 0.15,
        status: "cego",
        chanceCritico: 0.05,
        especialMult: 1.4,
        especialMsg: "reflete luz dos cristais em um raio cegante!",
        especialStatus: "cego",
        comportamento: {
            hpAlto:  { acoes: ["buff_def", "atacar_forte", "especial"],      pesos: [30, 35, 35] },
            hpMedio: { acoes: ["atacar_forte", "defender", "especial"],     pesos: [35, 30, 35] },
            hpBaixo: { acoes: ["atacar_forte", "especial", "investida"],    pesos: [35, 35, 30] }
        }
    },

    "Kobold Mineiro": {
        tipo: "tatico",
        padrao: ["atacar", "especial", "status_atk"],
        chanceStatus: 0.20,
        status: "atordoado",
        chanceCritico: 0.12,
        especialMult: 1.2,
        especialMsg: "lança uma bomba de pólvora!",
        especialStatus: "atordoado",
        comportamento: {
            hpAlto:  { acoes: ["atacar", "especial", "atk_duplo"],           pesos: [30, 35, 35] },
            hpMedio: { acoes: ["especial", "atacar_forte", "defender"],     pesos: [35, 35, 30] },
            hpBaixo: { acoes: ["especial", "investida", "atacar_forte"],    pesos: [35, 35, 30] }
        }
    },

    // ══════════════════════════════════════
    // ████ VULCÃO INFERNAL (Tier 3) ████
    // ══════════════════════════════════════

    "Elemental de Fogo": {
        tipo: "magico",
        padrao: ["especial", "status_atk", "atacar_forte"],
        chanceStatus: 0.30,
        status: "queimando",
        chanceCritico: 0.10,
        especialMult: 1.4,
        especialMsg: "libera uma explosão de chamas!",
        especialStatus: "queimando",
        comportamento: {
            hpAlto:  { acoes: ["especial", "status_atk", "atacar_forte"],   pesos: [35, 35, 30] },
            hpMedio: { acoes: ["atacar_forte", "especial", "status_atk"],  pesos: [35, 35, 30] },
            hpBaixo: { acoes: ["furia", "especial", "investida"],           pesos: [35, 35, 30] }
        }
    },

    "Salamandra Ígnea": {
        tipo: "agressivo",
        padrao: ["atacar_forte", "atacar", "status_atk"],
        chanceStatus: 0.25,
        status: "queimando",
        chanceCritico: 0.12,
        comportamento: {
            hpAlto:  { acoes: ["atacar_forte", "status_atk", "atk_duplo"],  pesos: [35, 35, 30] },
            hpMedio: { acoes: ["atacar_forte", "investida", "status_atk"], pesos: [35, 35, 30] },
            hpBaixo: { acoes: ["investida", "furia", "atacar_forte"],       pesos: [35, 35, 30] }
        }
    },

    "Imp Flamejante": {
        tipo: "caos",
        padrao: ["especial", "atacar", "status_atk"],
        chanceStatus: 0.25,
        status: "queimando",
        chanceCritico: 0.15,
        especialMult: 1.1,
        especialMsg: "lança bolas de fogo erraticamente!",
        especialStatus: "queimando",
        comportamento: {
            hpAlto:  { acoes: ["especial", "atk_duplo", "atacar_forte"],    pesos: [35, 30, 35] },
            hpMedio: { acoes: ["atk_duplo", "especial", "status_atk"],     pesos: [30, 35, 35] },
            hpBaixo: { acoes: ["investida", "especial", "atk_duplo"],       pesos: [35, 35, 30] }
        }
    },

    "Lagarto de Lava": {
        tipo: "predador",
        padrao: ["atacar_forte", "atacar", "atacar_forte"],
        chanceStatus: 0.20,
        status: "queimando",
        chanceCritico: 0.10,
        primeiroTurno: "investida",
        comportamento: {
            hpAlto:  { acoes: ["investida", "atacar_forte", "status_atk"],  pesos: [35, 35, 30] },
            hpMedio: { acoes: ["atacar_forte", "status_atk", "defender"],   pesos: [40, 30, 30] },
            hpBaixo: { acoes: ["investida", "furia", "atacar_forte"],       pesos: [35, 35, 30] }
        }
    },

    "Golem de Magma": {
        tipo: "guardiao",
        padrao: ["defender", "atacar_forte", "atacar_forte"],
        chanceStatus: 0.20,
        status: "queimando",
        chanceCritico: 0.05,
        comportamento: {
            hpAlto:  { acoes: ["buff_def", "atacar_forte", "status_atk"],   pesos: [30, 40, 30] },
            hpMedio: { acoes: ["atacar_forte", "defender", "investida"],    pesos: [35, 35, 30] },
            hpBaixo: { acoes: ["investida", "atacar_forte", "furia"],       pesos: [35, 35, 30] }
        }
    },

    // ══════════════════════════════════════
    // ████ GELEIRA ETERNA (Tier 3) ████
    // ══════════════════════════════════════

    "Elemental de Gelo": {
        tipo: "magico",
        padrao: ["especial", "status_atk", "atacar_forte"],
        chanceStatus: 0.30,
        status: "congelado",
        chanceCritico: 0.08,
        especialMult: 1.4,
        especialMsg: "lança uma rajada de gelo cortante!",
        especialStatus: "congelado",
        comportamento: {
            hpAlto:  { acoes: ["especial", "status_atk", "atacar_forte"],   pesos: [35, 35, 30] },
            hpMedio: { acoes: ["atacar_forte", "especial", "defender"],     pesos: [35, 35, 30] },
            hpBaixo: { acoes: ["especial", "investida", "curar"],           pesos: [40, 30, 30] }
        }
    },

    "Lobo do Gelo": {
        tipo: "predador",
        padrao: ["atacar_forte", "atacar", "atk_duplo"],
        chanceStatus: 0.15,
        status: "congelado",
        chanceCritico: 0.14,
        primeiroTurno: "investida",
        comportamento: {
            hpAlto:  { acoes: ["investida", "atk_duplo", "atacar_forte"],   pesos: [35, 30, 35] },
            hpMedio: { acoes: ["atk_duplo", "status_atk", "atacar_forte"], pesos: [35, 30, 35] },
            hpBaixo: { acoes: ["furia", "investida", "atk_duplo"],          pesos: [35, 35, 30] }
        }
    },

    "Yeti": {
        tipo: "berserk",
        padrao: ["atacar_forte", "atacar", "investida"],
        chanceStatus: 0.10,
        status: "atordoado",
        chanceCritico: 0.08,
        comportamento: {
            hpAlto:  { acoes: ["atacar_forte", "investida", "atacar"],       pesos: [35, 30, 35] },
            hpMedio: { acoes: ["investida", "atacar_forte", "defender"],    pesos: [35, 35, 30] },
            hpBaixo: { acoes: ["furia", "investida", "atacar_forte"],       pesos: [40, 30, 30] }
        }
    },

    "Espectro Congelante": {
        tipo: "magico",
        padrao: ["status_atk", "especial", "drenar"],
        chanceStatus: 0.30,
        status: "congelado",
        chanceCritico: 0.06,
        especialMult: 1.3,
        especialMsg: "emana uma aura de frio mortal!",
        especialStatus: "congelado",
        comportamento: {
            hpAlto:  { acoes: ["especial", "drenar", "status_atk"],          pesos: [35, 30, 35] },
            hpMedio: { acoes: ["drenar", "especial", "curar"],               pesos: [35, 35, 30] },
            hpBaixo: { acoes: ["drenar", "curar", "especial"],               pesos: [40, 30, 30] }
        }
    },

    "Serpente de Gelo": {
        tipo: "tatico",
        padrao: ["status_atk", "atacar_forte", "atacar"],
        chanceStatus: 0.25,
        status: "congelado",
        chanceCritico: 0.12,
        comportamento: {
            hpAlto:  { acoes: ["status_atk", "atacar_forte", "atk_duplo"],  pesos: [35, 35, 30] },
            hpMedio: { acoes: ["atacar_forte", "status_atk", "defender"],   pesos: [35, 35, 30] },
            hpBaixo: { acoes: ["investida", "status_atk", "atacar_forte"], pesos: [35, 35, 30] }
        }
    },

    // ══════════════════════════════════════
    // ████ CIDADE FANTASMA (Tier 4) ████
    // ══════════════════════════════════════

    "Poltergeist": {
        tipo: "caos",
        padrao: ["especial", "atacar", "status_atk"],
        chanceStatus: 0.25,
        status: "apavorado",
        chanceCritico: 0.12,
        especialMult: 1.3,
        especialMsg: "arremessa objetos com telecinese!",
        comportamento: {
            hpAlto:  { acoes: ["especial", "atk_duplo", "status_atk"],      pesos: [35, 30, 35] },
            hpMedio: { acoes: ["status_atk", "especial", "drenar"],          pesos: [30, 35, 35] },
            hpBaixo: { acoes: ["drenar", "especial", "investida"],           pesos: [35, 35, 30] }
        }
    },

    "Vampiro Menor": {
        tipo: "necro",
        padrao: ["drenar", "atacar_forte", "status_atk"],
        chanceStatus: 0.20,
        status: "sangramento",
        chanceCritico: 0.14,
        curaPct: 0.12,
        primeiroTurno: "drenar",
        comportamento: {
            hpAlto:  { acoes: ["drenar", "atacar_forte", "atk_duplo"],      pesos: [35, 35, 30] },
            hpMedio: { acoes: ["drenar", "status_atk", "atacar_forte"],    pesos: [40, 30, 30] },
            hpBaixo: { acoes: ["drenar", "curar", "drenar"],                pesos: [40, 35, 25] }
        }
    },

    "Cavaleiro Fantasma": {
        tipo: "guardiao",
        padrao: ["defender", "atacar_forte", "investida"],
        chanceStatus: 0.15,
        status: "amaldicoado",
        chanceCritico: 0.10,
        comportamento: {
            hpAlto:  { acoes: ["buff_def", "atacar_forte", "investida"],    pesos: [30, 35, 35] },
            hpMedio: { acoes: ["atacar_forte", "investida", "defender"],    pesos: [35, 35, 30] },
            hpBaixo: { acoes: ["furia", "investida", "atacar_forte"],       pesos: [35, 35, 30] }
        }
    },

    "Banshee": {
        tipo: "magico",
        padrao: ["especial", "status_atk", "especial"],
        chanceStatus: 0.35,
        status: "apavorado",
        chanceCritico: 0.08,
        especialMult: 1.5,
        especialMsg: "emite um GRITO ensurdecedor!",
        especialStatus: "atordoado",
        comportamento: {
            hpAlto:  { acoes: ["especial", "status_atk", "drenar"],          pesos: [40, 30, 30] },
            hpMedio: { acoes: ["especial", "drenar", "status_atk"],          pesos: [35, 35, 30] },
            hpBaixo: { acoes: ["especial", "drenar", "curar"],               pesos: [40, 35, 25] }
        }
    },

    "Sombra Errante": {
        tipo: "necro",
        padrao: ["drenar", "status_atk", "drenar"],
        chanceStatus: 0.25,
        status: "corrompido",
        chanceCritico: 0.10,
        curaPct: 0.10,
        comportamento: {
            hpAlto:  { acoes: ["drenar", "status_atk", "atacar_forte"],     pesos: [35, 35, 30] },
            hpMedio: { acoes: ["drenar", "drenar", "curar"],                pesos: [35, 35, 30] },
            hpBaixo: { acoes: ["drenar", "curar", "invocar"],               pesos: [40, 30, 30] }
        }
    },

    // ══════════════════════════════════════
    // ████ ABISMO SOMBRIO (Tier 4) ████
    // ══════════════════════════════════════

    "Demônio Menor": {
        tipo: "agressivo",
        padrao: ["atacar_forte", "investida", "atacar"],
        chanceStatus: 0.15,
        status: "queimando",
        chanceCritico: 0.12,
        comportamento: {
            hpAlto:  { acoes: ["atacar_forte", "investida", "atk_duplo"],   pesos: [35, 30, 35] },
            hpMedio: { acoes: ["investida", "atacar_forte", "furia"],       pesos: [35, 35, 30] },
            hpBaixo: { acoes: ["furia", "investida", "atacar_forte"],       pesos: [40, 30, 30] }
        }
    },

    "Olho Flutuante": {
        tipo: "magico",
        padrao: ["especial", "status_atk", "especial"],
        chanceStatus: 0.30,
        status: "corrompido",
        chanceCritico: 0.08,
        especialMult: 1.4,
        especialMsg: "emite um raio desintegrador!",
        especialStatus: "corrompido",
        comportamento: {
            hpAlto:  { acoes: ["especial", "status_atk", "atacar_forte"],   pesos: [40, 30, 30] },
            hpMedio: { acoes: ["especial", "drenar", "status_atk"],          pesos: [35, 35, 30] },
            hpBaixo: { acoes: ["especial", "curar", "drenar"],               pesos: [40, 30, 30] }
        }
    },

    "Tentáculo Abissal": {
        tipo: "berserk",
        padrao: ["atacar_forte", "atk_duplo", "investida"],
        chanceStatus: 0.20,
        status: "sangramento",
        chanceCritico: 0.06,
        comportamento: {
            hpAlto:  { acoes: ["atk_duplo", "atacar_forte", "investida"],   pesos: [35, 35, 30] },
            hpMedio: { acoes: ["investida", "atk_duplo", "atacar_forte"],   pesos: [35, 35, 30] },
            hpBaixo: { acoes: ["furia", "investida", "atk_duplo"],          pesos: [40, 30, 30] }
        }
    },

    "Sombra Profunda": {
        tipo: "necro",
        padrao: ["drenar", "status_atk", "especial"],
        chanceStatus: 0.30,
        status: "amaldicoado",
        chanceCritico: 0.10,
        especialMult: 1.3,
        especialMsg: "envolve tudo em escuridão absoluta!",
        especialStatus: "cego",
        curaPct: 0.12,
        comportamento: {
            hpAlto:  { acoes: ["especial", "drenar", "status_atk"],          pesos: [35, 30, 35] },
            hpMedio: { acoes: ["drenar", "especial", "curar"],               pesos: [35, 35, 30] },
            hpBaixo: { acoes: ["drenar", "curar", "invocar"],                pesos: [40, 30, 30] }
        }
    },

    "Aberração Caótica": {
        tipo: "caos",
        padrao: ["especial", "atk_duplo", "status_atk"],
        chanceStatus: 0.25,
        status: "corrompido",
        chanceCritico: 0.14,
        especialMult: 1.5,
        especialMsg: "distorce a realidade ao redor!",
        especialStatus: "amaldicoado",
        comportamento: {
            hpAlto:  { acoes: ["especial", "atk_duplo", "investida"],       pesos: [30, 35, 35] },
            hpMedio: { acoes: ["investida", "especial", "status_atk"],      pesos: [30, 35, 35] },
            hpBaixo: { acoes: ["furia", "especial", "investida"],            pesos: [35, 35, 30] }
        }
    },

    // ══════════════════════════════════════
    // ████ CASTELO AMALDIÇOADO (Tier 4) ████
    // ══════════════════════════════════════

    "Cavaleiro Maldito": {
        tipo: "guardiao",
        padrao: ["defender", "atacar_forte", "investida"],
        chanceStatus: 0.15,
        status: "amaldicoado",
        chanceCritico: 0.10,
        comportamento: {
            hpAlto:  { acoes: ["buff_def", "atacar_forte", "provocar"],      pesos: [30, 40, 30] },
            hpMedio: { acoes: ["atacar_forte", "investida", "defender"],    pesos: [35, 35, 30] },
            hpBaixo: { acoes: ["furia", "investida", "atacar_forte"],       pesos: [35, 35, 30] }
        }
    },

    "Gárgula": {
        tipo: "defensivo",
        padrao: ["defender", "atacar_forte", "atacar"],
        chanceStatus: 0,
        status: null,
        chanceCritico: 0.08,
        primeiroTurno: "buff_def",
        comportamento: {
            hpAlto:  { acoes: ["defender", "atacar_forte", "buff_def"],      pesos: [30, 40, 30] },
            hpMedio: { acoes: ["atacar_forte", "investida", "defender"],    pesos: [35, 35, 30] },
            hpBaixo: { acoes: ["investida", "atacar_forte", "furia"],       pesos: [35, 35, 30] }
        }
    },

    "Quimera": {
        tipo: "caos",
        padrao: ["especial", "atacar_forte", "status_atk"],
        chanceStatus: 0.25,
        status: "queimando",
        chanceCritico: 0.12,
        especialMult: 1.4,
        especialMsg: "ataca com três cabeças simultaneamente!",
        especialStatus: "envenenado",
        comportamento: {
            hpAlto:  { acoes: ["especial", "atacar_forte", "atk_duplo"],    pesos: [35, 30, 35] },
            hpMedio: { acoes: ["atacar_forte", "status_atk", "especial"],  pesos: [30, 35, 35] },
            hpBaixo: { acoes: ["furia", "especial", "investida"],           pesos: [35, 35, 30] }
        }
    },

    "Mago Corrompido": {
        tipo: "magico",
        padrao: ["especial", "status_atk", "drenar"],
        chanceStatus: 0.30,
        status: "corrompido",
        chanceCritico: 0.10,
        especialMult: 1.5,
        especialMsg: "canaliza magia sombria devastadora!",
        especialStatus: "amaldicoado",
        curaPct: 0.15,
        comportamento: {
            hpAlto:  { acoes: ["especial", "status_atk", "provocar"],       pesos: [40, 30, 30] },
            hpMedio: { acoes: ["drenar", "especial", "curar"],               pesos: [35, 35, 30] },
            hpBaixo: { acoes: ["curar", "drenar", "especial"],               pesos: [35, 35, 30] }
        }
    },

    "Guardião do Rei": {
        tipo: "guardiao",
        padrao: ["defender", "atacar_forte", "atacar_forte"],
        chanceStatus: 0.10,
        status: "fraqueza",
        chanceCritico: 0.08,
        primeiroTurno: "buff_def",
        comportamento: {
            hpAlto:  { acoes: ["buff_def", "atacar_forte", "defender"],      pesos: [35, 35, 30] },
            hpMedio: { acoes: ["atacar_forte", "investida", "buff_def"],    pesos: [35, 35, 30] },
            hpBaixo: { acoes: ["furia", "investida", "atacar_forte"],       pesos: [40, 30, 30] }
        }
    },

    // ══════════════════════════════════════
    // ████ PLANO ASTRAL (Tier 5) ████
    // ══════════════════════════════════════

    "Ser Etéreo": {
        tipo: "magico",
        padrao: ["especial", "drenar", "status_atk"],
        chanceStatus: 0.30,
        status: "corrompido",
        chanceCritico: 0.10,
        especialMult: 1.4,
        especialMsg: "distorce o tecido da realidade!",
        especialStatus: "amaldicoado",
        curaPct: 0.15,
        comportamento: {
            hpAlto:  { acoes: ["especial", "drenar", "status_atk"],          pesos: [35, 30, 35] },
            hpMedio: { acoes: ["drenar", "curar", "especial"],               pesos: [35, 30, 35] },
            hpBaixo: { acoes: ["curar", "drenar", "especial"],               pesos: [35, 35, 30] }
        }
    },

    "Anjo Caído": {
        tipo: "equilibrado",
        padrao: ["atacar_forte", "especial", "curar"],
        chanceStatus: 0.25,
        status: "amaldicoado",
        chanceCritico: 0.12,
        especialMult: 1.5,
        especialMsg: "desfere um golpe com asas corrompidas!",
        especialStatus: "corrompido",
        curaPct: 0.20,
        comportamento: {
            hpAlto:  { acoes: ["atacar_forte", "especial", "status_atk"],   pesos: [35, 35, 30] },
            hpMedio: { acoes: ["especial", "curar", "atacar_forte"],         pesos: [35, 35, 30] },
            hpBaixo: { acoes: ["curar", "especial", "furia"],                pesos: [35, 35, 30] }
        }
    },

    "Observador Menor": {
        tipo: "magico",
        padrao: ["especial", "status_atk", "drenar"],
        chanceStatus: 0.35,
        status: "corrompido",
        chanceCritico: 0.08,
        especialMult: 1.3,
        especialMsg: "fixa seu olhar penetrante em você!",
        especialStatus: "apavorado",
        comportamento: {
            hpAlto:  { acoes: ["especial", "status_atk", "drenar"],          pesos: [40, 30, 30] },
            hpMedio: { acoes: ["drenar", "especial", "status_atk"],          pesos: [35, 35, 30] },
            hpBaixo: { acoes: ["drenar", "curar", "especial"],               pesos: [40, 30, 30] }
        }
    },

    "Fragmento Estelar": {
        tipo: "caos",
        padrao: ["especial", "atacar_forte", "atk_duplo"],
        chanceStatus: 0.20,
        status: "cego",
        chanceCritico: 0.15,
        especialMult: 1.6,
        especialMsg: "explode em luz estelar devastadora!",
        especialStatus: "cego",
        comportamento: {
            hpAlto:  { acoes: ["atk_duplo", "especial", "atacar_forte"],    pesos: [30, 35, 35] },
            hpMedio: { acoes: ["especial", "investida", "atk_duplo"],       pesos: [35, 30, 35] },
            hpBaixo: { acoes: ["especial", "investida", "furia"],            pesos: [40, 30, 30] }
        }
    },

    "Devorador de Mentes": {
        tipo: "necro",
        padrao: ["drenar", "especial", "status_atk"],
        chanceStatus: 0.35,
        status: "amaldicoado",
        chanceCritico: 0.10,
        especialMult: 1.4,
        especialMsg: "invade sua mente e consome pensamentos!",
        especialStatus: "apavorado",
        curaPct: 0.15,
        comportamento: {
            hpAlto:  { acoes: ["especial", "drenar", "status_atk"],          pesos: [35, 35, 30] },
            hpMedio: { acoes: ["drenar", "especial", "curar"],               pesos: [35, 35, 30] },
            hpBaixo: { acoes: ["drenar", "curar", "invocar"],                pesos: [40, 30, 30] }
        }
    },

    // ══════════════════════════════════════
    // ████ INFERNUS (Tier 5) ████
    // ══════════════════════════════════════

    "Demônio de Guerra": {
        tipo: "berserk",
        padrao: ["atacar_forte", "investida", "furia"],
        chanceStatus: 0.15,
        status: "sangramento",
        chanceCritico: 0.14,
        primeiroTurno: "furia",
        comportamento: {
            hpAlto:  { acoes: ["atacar_forte", "investida", "atk_duplo"],   pesos: [35, 35, 30] },
            hpMedio: { acoes: ["investida", "atacar_forte", "furia"],       pesos: [35, 35, 30] },
            hpBaixo: { acoes: ["furia", "investida", "atacar_forte"],       pesos: [40, 35, 25] }
        }
    },

    "Súcubo Tentador": {
        tipo: "tatico",
        padrao: ["status_atk", "drenar", "especial"],
        chanceStatus: 0.30,
        status: "fraqueza",
        chanceCritico: 0.12,
        especialMult: 1.3,
        especialMsg: "lança um beijo mortífero!",
        especialStatus: "amaldicoado",
        curaPct: 0.15,
        comportamento: {
            hpAlto:  { acoes: ["status_atk", "especial", "drenar"],          pesos: [30, 35, 35] },
            hpMedio: { acoes: ["drenar", "especial", "curar"],               pesos: [35, 35, 30] },
            hpBaixo: { acoes: ["drenar", "curar", "especial"],               pesos: [40, 30, 30] }
        }
    },

    "Cão Infernal": {
        tipo: "predador",
        padrao: ["investida", "atacar_forte", "atk_duplo"],
        chanceStatus: 0.20,
        status: "queimando",
        chanceCritico: 0.14,
        primeiroTurno: "investida",
        comportamento: {
            hpAlto:  { acoes: ["investida", "atk_duplo", "atacar_forte"],   pesos: [35, 30, 35] },
            hpMedio: { acoes: ["atk_duplo", "status_atk", "atacar_forte"], pesos: [35, 30, 35] },
            hpBaixo: { acoes: ["furia", "investida", "atk_duplo"],          pesos: [35, 35, 30] }
        }
    },

    "Diabo Flamejante": {
        tipo: "magico",
        padrao: ["especial", "status_atk", "atacar_forte"],
        chanceStatus: 0.30,
        status: "queimando",
        chanceCritico: 0.10,
        especialMult: 1.5,
        especialMsg: "invoca pilares de fogo infernal!",
        especialStatus: "queimando",
        curaPct: 0.12,
        comportamento: {
            hpAlto:  { acoes: ["especial", "status_atk", "atacar_forte"],   pesos: [40, 30, 30] },
            hpMedio: { acoes: ["especial", "drenar", "curar"],               pesos: [35, 35, 30] },
            hpBaixo: { acoes: ["curar", "especial", "drenar"],               pesos: [35, 35, 30] }
        }
    },

    "Alma Condenada": {
        tipo: "necro",
        padrao: ["drenar", "status_atk", "drenar"],
        chanceStatus: 0.25,
        status: "amaldicoado",
        chanceCritico: 0.06,
        curaPct: 0.10,
        comportamento: {
            hpAlto:  { acoes: ["drenar", "status_atk", "atacar_forte"],     pesos: [40, 30, 30] },
            hpMedio: { acoes: ["drenar", "drenar", "curar"],                pesos: [35, 35, 30] },
            hpBaixo: { acoes: ["drenar", "curar", "invocar"],               pesos: [40, 30, 30] }
        }
    },

    // ══════════════════════════════════════
    // ████ TRONO DOS DEUSES (Tier 5) ████
    // ══════════════════════════════════════

    "Serafim Corrompido": {
        tipo: "equilibrado",
        padrao: ["especial", "atacar_forte", "curar"],
        chanceStatus: 0.25,
        status: "amaldicoado",
        chanceCritico: 0.12,
        especialMult: 1.6,
        especialMsg: "libera energia divina corrompida!",
        especialStatus: "corrompido",
        curaPct: 0.20,
        comportamento: {
            hpAlto:  { acoes: ["especial", "atacar_forte", "status_atk"],   pesos: [35, 35, 30] },
            hpMedio: { acoes: ["curar", "especial", "atacar_forte"],         pesos: [30, 40, 30] },
            hpBaixo: { acoes: ["curar", "especial", "furia"],                pesos: [35, 35, 30] }
        }
    },

    "Titã Menor": {
        tipo: "berserk",
        padrao: ["atacar_forte", "investida", "atacar_forte"],
        chanceStatus: 0.10,
        status: "atordoado",
        chanceCritico: 0.10,
        primeiroTurno: "furia",
        comportamento: {
            hpAlto:  { acoes: ["investida", "atacar_forte", "atk_duplo"],   pesos: [35, 35, 30] },
            hpMedio: { acoes: ["investida", "furia", "atacar_forte"],       pesos: [35, 35, 30] },
            hpBaixo: { acoes: ["furia", "investida", "investida"],           pesos: [40, 30, 30] }
        }
    },

    "Guardião Divino": {
        tipo: "guardiao",
        padrao: ["buff_def", "atacar_forte", "investida"],
        chanceStatus: 0.15,
        status: "fraqueza",
        chanceCritico: 0.08,
        curaPct: 0.20,
        primeiroTurno: "buff_def",
        comportamento: {
            hpAlto:  { acoes: ["buff_def", "atacar_forte", "provocar"],      pesos: [35, 35, 30] },
            hpMedio: { acoes: ["atacar_forte", "curar", "investida"],        pesos: [35, 30, 35] },
            hpBaixo: { acoes: ["curar", "furia", "investida"],               pesos: [35, 35, 30] }
        }
    },

    "Avatar do Caos": {
        tipo: "caos",
        padrao: ["especial", "atk_duplo", "drenar"],
        chanceStatus: 0.30,
        status: "corrompido",
        chanceCritico: 0.15,
        especialMult: 1.6,
        especialMsg: "desencadeia puro CAOS dimensional!",
        especialStatus: "amaldicoado",
        comportamento: {
            hpAlto:  { acoes: ["especial", "investida", "atk_duplo"],       pesos: [35, 30, 35] },
            hpMedio: { acoes: ["especial", "drenar", "investida"],           pesos: [35, 35, 30] },
            hpBaixo: { acoes: ["furia", "especial", "investida"],            pesos: [35, 40, 25] }
        }
    },

    "Arauto do Fim": {
        tipo: "magico",
        padrao: ["especial", "drenar", "status_atk"],
        chanceStatus: 0.35,
        status: "amaldicoado",
        chanceCritico: 0.12,
        especialMult: 1.7,
        especialMsg: "proclama o apocalipse com poder divino!",
        especialStatus: "corrompido",
        curaPct: 0.18,
        primeiroTurno: "especial",
        comportamento: {
            hpAlto:  { acoes: ["especial", "drenar", "status_atk"],          pesos: [40, 30, 30] },
            hpMedio: { acoes: ["drenar", "curar", "especial"],               pesos: [35, 30, 35] },
            hpBaixo: { acoes: ["curar", "drenar", "especial"],               pesos: [35, 35, 30] }
        }
    }
};


// ╔══════════════════════════════════════════════════════════════╗
// ║         BANCO DE MONSTROS COMPLETO (5 POR ÁREA)             ║
// ║                                                              ║
// ║  IMAGENS: Substitua os caminhos "images/Monstros/..."       ║
// ║  pelos arquivos reais das imagens dos monstros.              ║
// ║  Formato sugerido: PNG 256x256 com fundo transparente       ║
// ╚══════════════════════════════════════════════════════════════╝

var bancoDeMonstros = {

    // ══════════════════════════════════════════════════
    // ████ TIER 1 - CAPÍTULOS 1-3 ████
    // ══════════════════════════════════════════════════

    // ──────────────────────────────────────────────
    // 🌲 FLORESTA SOMBRIA (Lv 1-3)
    // ──────────────────────────────────────────────
    floresta: [
        { name: "Lobo Cinzento", emoji: "🐺", hp: 50, atk: 8, def: 4, img: "images/Monstros/wolf.png", gold: [10, 18], xp: 15, drops: [{ item: "Pele de Lobo", chance: 0.40, icone: "🐾", precoVenda: 6 }, { item: "Carne Crua", chance: 0.30, icone: "🥩", precoVenda: 3, consumivel: true, efeito: { tipo: "cura", valor: 15 } }] },
        { name: "Goblin Explorador", emoji: "👺", hp: 25, atk: 10, def: 4, img: "images/Monstros/goblin.png", gold: [12, 22], xp: 12, drops: [{ item: "Moeda Antiga", chance: 0.50, icone: "🪙", precoVenda: 8 }] },
        { name: "Aranha Gigante", emoji: "🕷️", hp: 60, atk: 12, def: 4, img: "images/Monstros/aranha.png", gold: [8, 16], xp: 14, drops: [{ item: "Seda de Aranha", chance: 0.45, icone: "🕸️", precoVenda: 7 }] },
        { name: "Javali Selvagem", emoji: "🐗", hp: 40, atk: 7, def: 5, img: "images/Monstros/javali.png", gold: [10, 20], xp: 18, drops: [{ item: "Couro Grosso", chance: 0.30, icone: "🟫", precoVenda: 8 }] },
        { name: "Espírito da Floresta", emoji: "🌿", hp: 70, atk: 10, def: 2, img: "images/Monstros/espirito_floresta.png", gold: [11, 20], xp: 16, drops: [{ item: "Essência Silvestre", chance: 0.35, icone: "✨", precoVenda: 9 }, { item: "Fruto da Floresta", chance: 0.25, icone: "🍇", precoVenda: 4, consumivel: true, efeito: { tipo: "cura", valor: 20 } }] },
        { name: "Lobo Albino", emoji: "🐺", hp: 30, atk: 8, def: 3, img: "images/Monstros/lobo2.png", gold: [10, 18], xp: 15, drops: [{ item: "Pele de Lobo", chance: 0.40, icone: "🐾", precoVenda: 6 }, { item: "Carne Crua", chance: 0.30, icone: "🥩", precoVenda: 3, consumivel: true, efeito: { tipo: "cura", valor: 15 } }] },
        { name: "Goblin Batedor", emoji: "👺", hp: 45, atk: 10, def: 3, img: "images/Monstros/goblin.png", gold: [12, 22], xp: 12, drops: [{ item: "Moeda Antiga", chance: 0.50, icone: "🪙", precoVenda: 8 }] },
        { name: "Aranha Venenosa", emoji: "🕷️", hp: 50, atk: 12, def: 4, img: "images/Monstros/aranha.png", gold: [8, 16], xp: 14, drops: [{ item: "Seda de Aranha", chance: 0.45, icone: "🕸️", precoVenda: 7 }] },
        { name: "Javali Furioso", emoji: "🐗", hp: 40, atk: 9, def: 5, img: "images/Monstros/javali.png", gold: [10, 20], xp: 18, drops: [{ item: "Couro Grosso", chance: 0.30, icone: "🟫", precoVenda: 8 }] },
        { name: "Coruja Sombria", emoji: "🦉", hp: 76, atk: 11, def: 3, img: "images/Monstros/coruja_sombria.png", gold: [11, 19], xp: 16, drops: [{ item: "Pena Noturna", chance: 0.40, icone: "🪶", precoVenda: 7 }] }
    ],

    // ──────────────────────────────────────────────
    // 🐸 PÂNTANO VENENOSO (Lv 4-6)
    // ──────────────────────────────────────────────
    pantano: [
        { name: "Sapo Venenoso", emoji: "🐸", hp: 55, atk: 14, def: 13, img: "images/Monstros/sapo_venenoso.png", gold: [14, 26], xp: 20, drops: [{ item: "Glândula Tóxica", chance: 0.35, icone: "🧪", precoVenda: 10 }] },
        { name: "Cobra d'Água", emoji: "🐍", hp: 65, atk: 16, def: 12, img: "images/Monstros/cobra.png", gold: [12, 22], xp: 18, drops: [{ item: "Escama Pantanosa", chance: 0.40, icone: "🐍", precoVenda: 8 }] },
        { name: "Crocodilo Ancião", emoji: "🐊", hp: 85, atk: 14, def: 13, img: "images/Monstros/croco.png", gold: [16, 30], xp: 25, drops: [{ item: "Dente de Croco", chance: 0.30, icone: "🦷", precoVenda: 12 }] },
        { name: "Planta Carnívora", emoji: "🥀", hp: 85, atk: 10, def: 15, img: "images/Monstros/Plant.png", gold: [13, 24], xp: 22, drops: [{ item: "Seiva Ácida", chance: 0.35, icone: "🌿", precoVenda: 9, consumivel: true, efeito: { tipo: "cura", valor: 20 } }] },
        { name: "Zumbi do Pântano", emoji: "🧟", hp: 90, atk: 15, def: 14, img: "images/Monstros/zumbi_pantano.png", gold: [14, 28], xp: 23, drops: [{ item: "Carne Putrefata", chance: 0.40, icone: "🦴", precoVenda: 7 }, { item: "Lodo Tóxico", chance: 0.25, icone: "🟢", precoVenda: 10 }] },
        { name: "Sapo Gigante", emoji: "🐸", hp: 55, atk: 14, def: 13, img: "images/Monstros/sapo_venenoso.png", gold: [14, 26], xp: 20, drops: [{ item: "Glândula Tóxica", chance: 0.35, icone: "🧪", precoVenda: 10 }] },
        { name: "Cobra do Pantano", emoji: "🐍", hp: 80, atk: 16, def: 12, img: "images/Monstros/cobra.png", gold: [12, 22], xp: 18, drops: [{ item: "Escama Pantanosa", chance: 0.40, icone: "🐍", precoVenda: 8 }] },
        { name: "Crocodilo Assasino", emoji: "🐊", hp: 55, atk: 16, def: 13, img: "images/Monstros/croco.png", gold: [16, 30], xp: 25, drops: [{ item: "Dente de Croco", chance: 0.30, icone: "🦷", precoVenda: 12 }] },
        { name: "Planta Canibal", emoji: "🥀", hp: 55, atk: 10, def: 15, img: "images/Monstros/Plant.png", gold: [13, 24], xp: 22, drops: [{ item: "Seiva Ácida", chance: 0.35, icone: "🌿", precoVenda: 9, consumivel: true, efeito: { tipo: "cura", valor: 20 } }] },
        { name: "Mosquito do Lodo", emoji: "🦟", hp: 65, atk: 15, def: 10, img: "images/Monstros/mosquito_lodo.png", gold: [12, 21], xp: 19, drops: [{ item: "Probóscide Tóxica", chance: 0.33, icone: "🪡", precoVenda: 9 }] }
    ],

    // ──────────────────────────────────────────────
    // ⛰️ COLINAS SANGRENTAS (Lv 7-9)
    // ──────────────────────────────────────────────
    colinas: [
        { name: "Orc Batedor", emoji: "👹", hp: 50, atk: 18, def: 5, img: "images/Monstros/Orc.png", gold: [18, 35], xp: 28, drops: [{ item: "Lâmina Orcish", chance: 0.25, icone: "🗡️", precoVenda: 15 }] },
        { name: "Harpia", emoji: "🦅", hp: 38, atk: 22, def: 3, img: "images/Monstros/harpia.png", gold: [18, 32], xp: 30, drops: [{ item: "Pena de Harpia", chance: 0.40, icone: "🪶", precoVenda: 12 }] },
        { name: "Centauro Corajoso", emoji: "🐎", hp: 65, atk: 16, def: 7, img: "images/Monstros/centauro.png", gold: [22, 40], xp: 32, drops: [{ item: "Ferradura Antiga", chance: 0.30, icone: "🧲", precoVenda: 14 }] },
        { name: "Warg Sombrio", emoji: "🐺", hp: 48, atk: 20, def: 4, img: "images/Monstros/warg.png", gold: [16, 30], xp: 26, drops: [{ item: "Pele de Warg", chance: 0.35, icone: "🐾", precoVenda: 11 }] },
        { name: "Basilisco Rochoso", emoji: "🦎", hp: 55, atk: 19, def: 6, img: "images/Monstros/basilisco.png", gold: [20, 36], xp: 30, drops: [{ item: "Olho de Basilisco", chance: 0.25, icone: "👁️", precoVenda: 16 }, { item: "Escama Petrificada", chance: 0.30, icone: "🪨", precoVenda: 12 }] },
        { name: "Orc Lutador", emoji: "👹", hp: 50, atk: 18, def: 5, img: "images/Monstros/Orc.png", gold: [18, 35], xp: 28, drops: [{ item: "Lâmina Orcish", chance: 0.25, icone: "🗡️", precoVenda: 15 }] },
        { name: "Harpia Batedora", emoji: "🦅", hp: 38, atk: 22, def: 3, img: "images/Monstros/harpia.png", gold: [18, 32], xp: 30, drops: [{ item: "Pena de Harpia", chance: 0.40, icone: "🪶", precoVenda: 12 }] },
        { name: "Centauro Selvagem", emoji: "🐎", hp: 65, atk: 16, def: 7, img: "images/Monstros/centauro.png", gold: [22, 40], xp: 32, drops: [{ item: "Ferradura Antiga", chance: 0.30, icone: "🧲", precoVenda: 14 }] },
        { name: "Warg Sanguinario", emoji: "🐺", hp: 48, atk: 20, def: 4, img: "images/Monstros/warg.png", gold: [16, 30], xp: 26, drops: [{ item: "Pele de Warg", chance: 0.35, icone: "🐾", precoVenda: 11 }] },
        { name: "Minotauro das Colinas", emoji: "🐂", hp: 70, atk: 15, def: 8, img: "images/Monstros/minotauro.png", gold: [20, 36], xp: 31, drops: [{ item: "Chifre Rachado", chance: 0.28, icone: "🦴", precoVenda: 13 }] }
    ],


    // ══════════════════════════════════════════════════
    // ████ TIER 2 - CAPÍTULOS 4-6 ████
    // ══════════════════════════════════════════════════

    // ──────────────────────────────────────────────
    // 🏚️ RUÍNAS ESQUECIDAS (Lv 10-12)
    // ──────────────────────────────────────────────
    ruinas: [
        { name: "Esqueleto Guerreiro", emoji: "💀", hp: 65, atk: 22, def: 7, img: "images/Monstros/esqueleto_guerreiro.png", gold: [25, 42], xp: 38, drops: [{ item: "Osso Antigo", chance: 0.40, icone: "🦴", precoVenda: 14 }, { item: "Espada Enferrujada", chance: 0.20, icone: "⚔️", precoVenda: 18 }] },
        { name: "Golem de Pedra", emoji: "🗿", hp: 90, atk: 18, def: 12, img: "images/Monstros/golem_pedra.png", gold: [28, 48], xp: 42, drops: [{ item: "Núcleo de Pedra", chance: 0.30, icone: "💎", precoVenda: 20 }, { item: "Pó Arcano", chance: 0.25, icone: "✨", precoVenda: 15 }] },
        { name: "Espectro Antigo", emoji: "👻", hp: 55, atk: 26, def: 5, img: "images/Monstros/espectro_antigo.png", gold: [26, 44], xp: 40, drops: [{ item: "Ectoplasma", chance: 0.35, icone: "🟣", precoVenda: 16 }, { item: "Amuleto Quebrado", chance: 0.20, icone: "📿", precoVenda: 22 }] },
        { name: "Mimico", emoji: "📦", hp: 60, atk: 24, def: 8, img: "images/Monstros/mimico.png", gold: [30, 55], xp: 45, drops: [{ item: "Dente de Mimico", chance: 0.30, icone: "🦷", precoVenda: 18 }, { item: "Moedas Falsas", chance: 0.45, icone: "🪙", precoVenda: 12 }] },
        { name: "Sentinela de Ruínas", emoji: "🛡️", hp: 80, atk: 20, def: 10, img: "images/Monstros/sentinela_ruinas.png", gold: [27, 46], xp: 40, drops: [{ item: "Engrenagem Antiga", chance: 0.35, icone: "⚙️", precoVenda: 17 }] },
        { name: "Esqueleto Arqueiro", emoji: "💀", hp: 72, atk: 20, def: 8, img: "images/Monstros/esqueleto_guerreiro.png", gold: [24, 42], xp: 38, drops: [{ item: "Osso Antigo", chance: 0.40, icone: "🦴", precoVenda: 14 }] },
        { name: "Mímico de Pedra", emoji: "🪨", hp: 68, atk: 24, def: 10, img: "images/Monstros/mimico_pedra.png", gold: [26, 46], xp: 40, drops: [{ item: "Lingueta de Ferro", chance: 0.25, icone: "🔩", precoVenda: 18 }] },
        { name: "Sentinela Arruinada", emoji: "🗿", hp: 80, atk: 18, def: 12, img: "images/Monstros/sentinela_arruinada.png", gold: [25, 44], xp: 42, drops: [{ item: "Núcleo de Runa", chance: 0.22, icone: "🔷", precoVenda: 20 }] },
        { name: "Morcego das Catacumbas", emoji: "🦇", hp: 50, atk: 23, def: 4, img: "images/Monstros/morcego_catacumbas.png", gold: [22, 39], xp: 36, drops: [{ item: "Asa Ressecada", chance: 0.35, icone: "🦇", precoVenda: 12 }] },
        { name: "Guardião de Bronze", emoji: "🤖", hp: 88, atk: 21, def: 13, img: "images/Monstros/guardiao_bronze.png", gold: [28, 50], xp: 45, drops: [{ item: "Placa de Bronze", chance: 0.30, icone: "🛡️", precoVenda: 19 }] }
    ],

    // ──────────────────────────────────────────────
    // 🏜️ DESERTO ESCALDANTE (Lv 13-15)
    // ──────────────────────────────────────────────
    deserto: [
        { name: "Escorpião do Deserto", emoji: "🦂", hp: 70, atk: 28, def: 8, img: "images/Monstros/escorpiao.png", gold: [30, 52], xp: 48, drops: [{ item: "Ferrão Venenoso", chance: 0.35, icone: "🦂", precoVenda: 20 }, { item: "Antídoto Natural", chance: 0.20, icone: "💊", precoVenda: 15, consumivel: true, efeito: { tipo: "cura", valor: 30 } }] },
        { name: "Serpente das Dunas", emoji: "🐍", hp: 60, atk: 32, def: 6, img: "images/Monstros/serpente_dunas.png", gold: [28, 50], xp: 46, drops: [{ item: "Presas de Cristal", chance: 0.30, icone: "💎", precoVenda: 22 }] },
        { name: "Múmia Errante", emoji: "🧟", hp: 85, atk: 24, def: 10, img: "images/Monstros/mumia_errante.png", gold: [32, 56], xp: 52, drops: [{ item: "Faixa Amaldiçoada", chance: 0.30, icone: "🩹", precoVenda: 24 }, { item: "Escaravelho Dourado", chance: 0.15, icone: "🪲", precoVenda: 30 }] },
        { name: "Elemental de Areia", emoji: "🌪️", hp: 75, atk: 26, def: 9, img: "images/Monstros/elemental_areia.png", gold: [30, 54], xp: 50, drops: [{ item: "Areia Encantada", chance: 0.35, icone: "⏳", precoVenda: 20 }, { item: "Vidro do Deserto", chance: 0.25, icone: "🔮", precoVenda: 18 }] },
        { name: "Bandido do Deserto", emoji: "🥷", hp: 65, atk: 30, def: 7, img: "images/Monstros/bandido_deserto.png", gold: [35, 60], xp: 48, drops: [{ item: "Adaga Curva", chance: 0.25, icone: "🗡️", precoVenda: 22 }, { item: "Mapa do Tesouro", chance: 0.10, icone: "🗺️", precoVenda: 35 }] },
        { name: "Escaravelho Dourado", emoji: "🪲", hp: 62, atk: 22, def: 9, img: "images/Monstros/escaravelho_dourado.png", gold: [28, 48], xp: 44, drops: [{ item: "Carapaça Reluzente", chance: 0.35, icone: "✨", precoVenda: 18 }] },
        { name: "Escorpião de Areia", emoji: "🦂", hp: 58, atk: 27, def: 6, img: "images/Monstros/escorpiao_areia.png", gold: [26, 47], xp: 43, drops: [{ item: "Ferrão de Areia", chance: 0.34, icone: "🦂", precoVenda: 16 }] },
        { name: "Chacal do Sol", emoji: "🐕", hp: 66, atk: 25, def: 7, img: "images/Monstros/chacal_sol.png", gold: [27, 49], xp: 45, drops: [{ item: "Presa Solar", chance: 0.29, icone: "🦷", precoVenda: 18 }] },
        { name: "Djinn Menor", emoji: "🌪️", hp: 70, atk: 26, def: 7, img: "images/Monstros/djinn_menor.png", gold: [32, 56], xp: 48, drops: [{ item: "Essência de Areia", chance: 0.24, icone: "🌬️", precoVenda: 22 }] }
    ],

    // ──────────────────────────────────────────────
    // ⚰️ CEMITÉRIO PROFANO (Lv 16-18)
    // ──────────────────────────────────────────────
    cemiterio: [
        { name: "Zumbi Putrefato", emoji: "🧟", hp: 95, atk: 28, def: 8, img: "images/Monstros/zumbi_putrefato.png", gold: [35, 60], xp: 58, drops: [{ item: "Carne Podre", chance: 0.45, icone: "🥩", precoVenda: 12 }, { item: "Osso Infectado", chance: 0.30, icone: "🦴", precoVenda: 18 }] },
        { name: "Esqueleto Arqueiro", emoji: "💀", hp: 70, atk: 34, def: 6, img: "images/Monstros/esqueleto_arqueiro.png", gold: [36, 62], xp: 60, drops: [{ item: "Flecha Maldita", chance: 0.35, icone: "🏹", precoVenda: 20 }, { item: "Arco Rachado", chance: 0.20, icone: "🎯", precoVenda: 26 }] },
        { name: "Fantasma Lamentoso", emoji: "👻", hp: 65, atk: 36, def: 5, img: "images/Monstros/fantasma_lamentoso.png", gold: [38, 65], xp: 62, drops: [{ item: "Lágrima Espectral", chance: 0.30, icone: "💧", precoVenda: 24 }, { item: "Vela Eterna", chance: 0.20, icone: "🕯️", precoVenda: 28 }] },
        { name: "Carniçal Faminto", emoji: "👹", hp: 80, atk: 32, def: 7, img: "images/Monstros/carnicai_faminto.png", gold: [37, 64], xp: 60, drops: [{ item: "Garra de Carniçal", chance: 0.35, icone: "🦷", precoVenda: 22 }] },
        { name: "Coveiro Maldito", emoji: "⚰️", hp: 90, atk: 30, def: 9, img: "images/Monstros/coveiro_maldito.png", gold: [40, 68], xp: 65, drops: [{ item: "Pá Encantada", chance: 0.25, icone: "⛏️", precoVenda: 28 }, { item: "Terra do Cemitério", chance: 0.35, icone: "🟤", precoVenda: 18, consumivel: true, efeito: { tipo: "cura", valor: 35 } }] },
        { name: "Espectro Lamentoso", emoji: "👻", hp: 64, atk: 30, def: 5, img: "images/Monstros/espectro_lamentoso.png", gold: [34, 58], xp: 52, drops: [{ item: "Essência Sombria", chance: 0.27, icone: "🌫️", precoVenda: 20 }] },
        { name: "Cão Cadavérico", emoji: "🐕", hp: 72, atk: 28, def: 6, img: "images/Monstros/cao_cadaverico.png", gold: [31, 54], xp: 49, drops: [{ item: "Osso Mordido", chance: 0.33, icone: "🦴", precoVenda: 14 }] },
        { name: "Corvo Necrótico", emoji: "🐦", hp: 60, atk: 29, def: 5, img: "images/Monstros/corvo_necrotico.png", gold: [30, 53], xp: 48, drops: [{ item: "Pena Fúnebre", chance: 0.36, icone: "🪶", precoVenda: 15 }] }
    ],


    // ══════════════════════════════════════════════════
    // ████ TIER 3 - CAPÍTULOS 7-9 ████
    // ══════════════════════════════════════════════════

    // ──────────────────────────────────────────────
    // 🕳️ CAVERNA PROFUNDA (Lv 19-21)
    // ──────────────────────────────────────────────
    caverna: [
        { name: "Troll das Cavernas", emoji: "🧌", hp: 155, atk: 34, def: 14, img: "images/Monstros/troll_cavernas.png", gold: [50, 88], xp: 78, drops: [{ item: "Clava de Troll", chance: 0.25, icone: "🏏", precoVenda: 30 }, { item: "Couro de Troll", chance: 0.35, icone: "🟫", precoVenda: 25 }] },
        { name: "Morcego Vampírico", emoji: "🦇", hp: 100, atk: 38, def: 10, img: "images/Monstros/morcego_vampirico.png", gold: [45, 82], xp: 72, drops: [{ item: "Asa Membranosa", chance: 0.40, icone: "🦇", precoVenda: 22 }, { item: "Sangue Coagulado", chance: 0.25, icone: "🩸", precoVenda: 28 }] },
        { name: "Verme das Profundezas", emoji: "🪱", hp: 130, atk: 36, def: 12, img: "images/Monstros/minhocao.png", gold: [48, 85], xp: 75, drops: [{ item: "Mucosa Ácida", chance: 0.35, icone: "🟢", precoVenda: 26 }, { item: "Dente de Verme", chance: 0.25, icone: "🦷", precoVenda: 30 }] },
        { name: "Golem de Cristal", emoji: "💎", hp: 140, atk: 30, def: 17, img: "images/Monstros/golem_cristal.png", gold: [52, 90], xp: 80, drops: [{ item: "Fragmento de Cristal", chance: 0.30, icone: "💎", precoVenda: 35 }, { item: "Pó Luminoso", chance: 0.35, icone: "✨", precoVenda: 28 }] },
        { name: "Kobold Mineiro", emoji: "⛏️", hp: 95, atk: 32, def: 11, img: "images/Monstros/kobold_mineiro.png", gold: [55, 92], xp: 70, drops: [{ item: "Pepita de Ouro", chance: 0.30, icone: "🪙", precoVenda: 35 }, { item: "Dinamite Caseira", chance: 0.20, icone: "🧨", precoVenda: 28, consumivel: true, efeito: { tipo: "cura", valor: 0 } }] },
        { name: "Morcego Abissal", emoji: "🦇", hp: 82, atk: 32, def: 7, img: "images/Monstros/morcego_abissal.png", gold: [40, 68], xp: 60, drops: [{ item: "Membrana Sombria", chance: 0.35, icone: "🦇", precoVenda: 21 }] },
        { name: "Troll das Rochas", emoji: "🧌", hp: 120, atk: 28, def: 14, img: "images/Monstros/troll_rochas.png", gold: [42, 72], xp: 65, drops: [{ item: "Fragmento de Granito", chance: 0.30, icone: "🪨", precoVenda: 23 }] },
        { name: "Verme de Cristal", emoji: "🪱", hp: 88, atk: 34, def: 8, img: "images/Monstros/verme_cristal.png", gold: [39, 67], xp: 61, drops: [{ item: "Cristal Bruto", chance: 0.32, icone: "💎", precoVenda: 24 }] },
        { name: "Aranha das Profundezas", emoji: "🕷️", hp: 76, atk: 36, def: 6, img: "images/Monstros/aranha_profundezas.png", gold: [38, 66], xp: 59, drops: [{ item: "Veneno Concentrado", chance: 0.28, icone: "🧪", precoVenda: 22 }] },
        { name: "Lagarto Troglodita", emoji: "🦎", hp: 98, atk: 31, def: 10, img: "images/Monstros/lagarto.png", gold: [41, 70], xp: 63, drops: [{ item: "Escama Rochosa", chance: 0.34, icone: "🛡️", precoVenda: 20 }] }
    ],

    // ──────────────────────────────────────────────
    // 🌋 VULCÃO INFERNAL (Lv 22-24)
    // ──────────────────────────────────────────────
    vulcao: [
        { name: "Elemental de Fogo", emoji: "🔥", hp: 140, atk: 42, def: 14, img: "images/Monstros/elemental_fogo.png", gold: [58, 100], xp: 92, drops: [{ item: "Núcleo Ígneo", chance: 0.30, icone: "🔥", precoVenda: 38 }, { item: "Cinza Elemental", chance: 0.35, icone: "⚫", precoVenda: 30 }] },
        { name: "Salamandra Ígnea", emoji: "🦎", hp: 125, atk: 44, def: 12, img: "images/Monstros/salamandra_ignea.png", gold: [56, 98], xp: 90, drops: [{ item: "Escama Flamejante", chance: 0.35, icone: "🔶", precoVenda: 35 }] },
        { name: "Imp Flamejante", emoji: "😈", hp: 110, atk: 40, def: 10, img: "images/Monstros/imp_flamejante.png", gold: [54, 95], xp: 85, drops: [{ item: "Chifre de Imp", chance: 0.40, icone: "🔺", precoVenda: 32 }, { item: "Carvão Infernal", chance: 0.30, icone: "⬛", precoVenda: 28 }] },
        { name: "Lagarto de Lava", emoji: "🐊", hp: 150, atk: 38, def: 16, img: "images/Monstros/lagarto_lava.png", gold: [60, 105], xp: 95, drops: [{ item: "Couro Vulcânico", chance: 0.30, icone: "🟥", precoVenda: 40 }, { item: "Gema de Lava", chance: 0.20, icone: "💎", precoVenda: 45 }] },
        { name: "Golem de Magma", emoji: "🗿", hp: 175, atk: 36, def: 19, img: "images/Monstros/golem_magma.png", gold: [62, 108], xp: 98, drops: [{ item: "Rocha Fundida", chance: 0.30, icone: "🪨", precoVenda: 42 }, { item: "Poção de Lava", chance: 0.15, icone: "🧪", precoVenda: 35, consumivel: true, efeito: { tipo: "cura", valor: 50 } }] },
        { name: "Salamandra Ardente", emoji: "🦎", hp: 92, atk: 38, def: 9, img: "images/Monstros/salamandra_ignea.png", gold: [46, 80], xp: 70, drops: [{ item: "Glândula Flamejante", chance: 0.30, icone: "🔥", precoVenda: 26 }] },
        { name: "Golem de Lava", emoji: "🪨", hp: 140, atk: 34, def: 16, img: "images/Monstros/golem_lava.png", gold: [50, 85], xp: 75, drops: [{ item: "Núcleo de Lava", chance: 0.22, icone: "🌋", precoVenda: 30 }] },
        { name: "Morcego de Brasas", emoji: "🦇", hp: 84, atk: 37, def: 8, img: "images/Monstros/morcego_brasas.png", gold: [44, 78], xp: 68, drops: [{ item: "Asa Carbonizada", chance: 0.34, icone: "🪶", precoVenda: 24 }] },
        { name: "Demônio de Cinzas", emoji: "😈", hp: 108, atk: 40, def: 10, img: "images/Monstros/demonio_cinzas.png", gold: [48, 83], xp: 74, drops: [{ item: "Cinza Infernal", chance: 0.29, icone: "🌫️", precoVenda: 27 }] },
        { name: "Escorpião Magmático", emoji: "🦂", hp: 96, atk: 39, def: 9, img: "images/Monstros/escorpiao_magmatico.png", gold: [45, 79], xp: 71, drops: [{ item: "Ferrão Incandescente", chance: 0.31, icone: "🦂", precoVenda: 25 }] }
    ],

    // ──────────────────────────────────────────────
    // 🏔️ GELEIRA ETERNA (Lv 25-27)
    // ──────────────────────────────────────────────
    geleira: [
        { name: "Elemental de Gelo", emoji: "❄️", hp: 160, atk: 44, def: 18, img: "images/Monstros/elemental_gelo.png", gold: [65, 115], xp: 105, drops: [{ item: "Núcleo Glacial", chance: 0.30, icone: "❄️", precoVenda: 42 }, { item: "Cristal de Gelo", chance: 0.35, icone: "💎", precoVenda: 38 }] },
        { name: "Lobo do Gelo", emoji: "🐺", hp: 135, atk: 48, def: 14, img: "images/Monstros/lobo_gelo.png", gold: [62, 112], xp: 100, drops: [{ item: "Pelo Congelado", chance: 0.40, icone: "🐾", precoVenda: 36 }, { item: "Presa de Gelo", chance: 0.25, icone: "🦷", precoVenda: 42 }] },
        { name: "Yeti", emoji: "🦍", hp: 190, atk: 42, def: 20, img: "images/Monstros/yeti.png", gold: [68, 120], xp: 110, drops: [{ item: "Pelo de Yeti", chance: 0.30, icone: "🦍", precoVenda: 45 }, { item: "Carne de Yeti", chance: 0.25, icone: "🥩", precoVenda: 35, consumivel: true, efeito: { tipo: "cura", valor: 55 } }] },
        { name: "Espectro Congelante", emoji: "👻", hp: 130, atk: 46, def: 15, img: "images/Monstros/espectro_congelante.png", gold: [64, 114], xp: 102, drops: [{ item: "Essência Gélida", chance: 0.35, icone: "🟦", precoVenda: 40 }] },
        { name: "Serpente de Gelo", emoji: "🐍", hp: 145, atk: 46, def: 16, img: "images/Monstros/serpente_gelo.png", gold: [66, 118], xp: 108, drops: [{ item: "Escama Gélida", chance: 0.35, icone: "🔷", precoVenda: 40 }, { item: "Veneno Congelante", chance: 0.20, icone: "🧪", precoVenda: 48 }] },
        { name: "Lobo Aórtico", emoji: "🐺", hp: 100, atk: 41, def: 10, img: "images/Monstros/lobo_gelo.png", gold: [52, 88], xp: 78, drops: [{ item: "Pele Congelada", chance: 0.35, icone: "❄️", precoVenda: 28 }] },
        { name: "Urso Polar Colossal", emoji: "🐻‍❄️", hp: 150, atk: 36, def: 16, img: "images/Monstros/urso_polar_colossal.png", gold: [55, 94], xp: 82, drops: [{ item: "Garra Congelante", chance: 0.27, icone: "🧤", precoVenda: 31 }] },
        { name: "Coruja Boreal", emoji: "🦉", hp: 88, atk: 40, def: 9, img: "images/Monstros/coruja_boreal.png", gold: [50, 86], xp: 76, drops: [{ item: "Pena Boreal", chance: 0.36, icone: "🪶", precoVenda: 26 }] },
        { name: "Yeti Jovem", emoji: "🦍", hp: 132, atk: 39, def: 13, img: "images/Monstros/yeti_jovem.png", gold: [53, 92], xp: 81, drops: [{ item: "Tufo de Pelagem Branca", chance: 0.33, icone: "🧶", precoVenda: 27 }] }
    ],


    // ══════════════════════════════════════════════════
    // ████ TIER 4 - CAPÍTULOS 10-12 ████
    // ══════════════════════════════════════════════════

    // ──────────────────────────────────────────────
    // 👻 CIDADE FANTASMA (Lv 28-30)
    // ──────────────────────────────────────────────
    cidadeFant: [
        { name: "Poltergeist", emoji: "👻", hp: 165, atk: 48, def: 18, img: "images/Monstros/poltergeist.png", gold: [82, 145], xp: 120, drops: [{ item: "Energia Fantasma", chance: 0.35, icone: "⚡", precoVenda: 45 }, { item: "Objeto Amaldiçoado", chance: 0.20, icone: "📿", precoVenda: 55 }] },
        { name: "Vampiro Menor", emoji: "🧛", hp: 180, atk: 52, def: 20, img: "images/Monstros/vampiro_menor.png", gold: [88, 155], xp: 130, drops: [{ item: "Presa de Vampiro", chance: 0.30, icone: "🦷", precoVenda: 50 }, { item: "Sangue Noturno", chance: 0.25, icone: "🩸", precoVenda: 48, consumivel: true, efeito: { tipo: "cura", valor: 65 } }] },
        { name: "Cavaleiro Fantasma", emoji: "⚔️", hp: 220, atk: 46, def: 22, img: "images/Monstros/cavaleiro_fantasma.png", gold: [85, 150], xp: 125, drops: [{ item: "Espada Espectral", chance: 0.25, icone: "⚔️", precoVenda: 55 }, { item: "Armadura Fantasma", chance: 0.15, icone: "🛡️", precoVenda: 65 }] },
        { name: "Banshee", emoji: "😱", hp: 155, atk: 56, def: 16, img: "images/Monstros/banshee.png", gold: [90, 158], xp: 135, drops: [{ item: "Eco do Grito", chance: 0.30, icone: "🔊", precoVenda: 52 }, { item: "Véu da Morte", chance: 0.18, icone: "🫥", precoVenda: 62 }] },
        { name: "Sombra Errante", emoji: "🌑", hp: 170, atk: 50, def: 19, img: "images/Monstros/sombra_errante.png", gold: [84, 148], xp: 122, drops: [{ item: "Fragmento de Sombra", chance: 0.35, icone: "⬛", precoVenda: 48 }] },
        { name: "Fantasma Errante", emoji: "👻", hp: 96, atk: 44, def: 10, img: "images/Monstros/fantasma_errante.png", gold: [58, 98], xp: 88, drops: [{ item: "Ectoplasma", chance: 0.35, icone: "🧪", precoVenda: 32 }] },
        { name: "Boneca Amaldiçoada", emoji: "🪆", hp: 90, atk: 46, def: 9, img: "images/Monstros/boneca_amaldicoada.png", gold: [56, 95], xp: 86, drops: [{ item: "Olho de Vidro", chance: 0.30, icone: "👁️", precoVenda: 30 }] },
        { name: "Cocheiro Sem Cabeça", emoji: "🏇", hp: 130, atk: 42, def: 14, img: "images/Monstros/cocheiro_sem_cabeca.png", gold: [60, 102], xp: 90, drops: [{ item: "Rédea Fantasma", chance: 0.24, icone: "🪢", precoVenda: 34 }] },
        { name: "Noiva Espectral", emoji: "👰", hp: 104, atk: 45, def: 11, img: "images/Monstros/noiva_espectral.png", gold: [59, 100], xp: 89, drops: [{ item: "Véu Rasgado", chance: 0.32, icone: "🕸️", precoVenda: 31 }] },
        { name: "Guarda Fantasma", emoji: "🛡️", hp: 122, atk: 41, def: 15, img: "images/Monstros/guarda_fantasma.png", gold: [61, 104], xp: 91, drops: [{ item: "Insígnia Assombrada", chance: 0.28, icone: "🎖️", precoVenda: 35 }] }
    ],

    // ──────────────────────────────────────────────
    // 🌑 ABISMO SOMBRIO (Lv 31-33)
    // ──────────────────────────────────────────────
    abismo: [
        { name: "Demônio Menor", emoji: "😈", hp: 210, atk: 54, def: 20, img: "images/Monstros/demonio_menor.png", gold: [98, 178], xp: 145, drops: [{ item: "Chifre Demoníaco", chance: 0.30, icone: "🔺", precoVenda: 55 }, { item: "Sangue de Demônio", chance: 0.20, icone: "🩸", precoVenda: 60 }] },
        { name: "Olho Flutuante", emoji: "👁️", hp: 175, atk: 60, def: 18, img: "images/Monstros/olho_flutuante.png", gold: [100, 182], xp: 150, drops: [{ item: "Lente Abissal", chance: 0.25, icone: "👁️", precoVenda: 62 }, { item: "Nervo Óptico", chance: 0.30, icone: "🟣", precoVenda: 52 }] },
        { name: "Tentáculo Abissal", emoji: "🐙", hp: 240, atk: 52, def: 22, img: "images/Monstros/tentaculo_abissal.png", gold: [105, 188], xp: 155, drops: [{ item: "Ventosa Abissal", chance: 0.35, icone: "🐙", precoVenda: 55 }, { item: "Tinta das Trevas", chance: 0.25, icone: "⬛", precoVenda: 50 }] },
        { name: "Sombra Profunda", emoji: "🌑", hp: 195, atk: 58, def: 20, img: "images/Monstros/sombra_profunda.png", gold: [102, 185], xp: 152, drops: [{ item: "Essência da Escuridão", chance: 0.30, icone: "⬛", precoVenda: 58 }, { item: "Elixir Sombrio", chance: 0.18, icone: "🧪", precoVenda: 55, consumivel: true, efeito: { tipo: "cura", valor: 75 } }] },
        { name: "Aberração Caótica", emoji: "🌀", hp: 225, atk: 56, def: 21, img: "images/Monstros/aberracao_caotica.png", gold: [108, 192], xp: 158, drops: [{ item: "Massa Caótica", chance: 0.25, icone: "🌀", precoVenda: 60 }, { item: "Olho de Aberração", chance: 0.20, icone: "👁️", precoVenda: 68 }] },
        { name: "Olho do Vazio", emoji: "👁️", hp: 112, atk: 50, def: 11, img: "images/Monstros/olho_vazio.png", gold: [66, 112], xp: 98, drops: [{ item: "Íris Abissal", chance: 0.28, icone: "👁️", precoVenda: 38 }] },
        { name: "Devorador Sombrio", emoji: "🌑", hp: 148, atk: 47, def: 16, img: "images/Monstros/devorador_sombrio.png", gold: [68, 116], xp: 102, drops: [{ item: "Massa Sombria", chance: 0.30, icone: "⚫", precoVenda: 40 }] },
        { name: "Aranha do Vácuo", emoji: "🕷️", hp: 106, atk: 52, def: 10, img: "images/Monstros/aranha_vacuo.png", gold: [65, 111], xp: 97, drops: [{ item: "Fio Obscuro", chance: 0.34, icone: "🕸️", precoVenda: 36 }] },
        { name: "Cultista Perdido", emoji: "🧙", hp: 118, atk: 49, def: 12, img: "images/Monstros/cultista_perdido.png", gold: [67, 114], xp: 100, drops: [{ item: "Tombo Profano", chance: 0.22, icone: "📕", precoVenda: 42 }] },
        { name: "Larva Ancestral", emoji: "🪱", hp: 160, atk: 45, def: 18, img: "images/Monstros/larva_ancestral.png", gold: [70, 118], xp: 104, drops: [{ item: "Casulo Antigo", chance: 0.27, icone: "🥚", precoVenda: 39 }] }
    ],

    // ──────────────────────────────────────────────
    // 🏰 CASTELO AMALDIÇOADO (Lv 34-36)
    // ──────────────────────────────────────────────
    castelo: [
        { name: "Cavaleiro Maldito", emoji: "⚔️", hp: 280, atk: 56, def: 24, img: "images/Monstros/cavaleiro_maldito.png", gold: [115, 205], xp: 165, drops: [{ item: "Lâmina Maldita", chance: 0.25, icone: "⚔️", precoVenda: 65 }, { item: "Escudo Corrompido", chance: 0.20, icone: "🛡️", precoVenda: 60 }] },
        { name: "Gárgula", emoji: "🗿", hp: 300, atk: 52, def: 28, img: "images/Monstros/gargula.png", gold: [112, 200], xp: 160, drops: [{ item: "Pedra Animada", chance: 0.30, icone: "🗿", precoVenda: 58 }, { item: "Gema Ocular", chance: 0.20, icone: "💎", precoVenda: 70 }] },
        { name: "Quimera", emoji: "🦁", hp: 260, atk: 62, def: 22, img: "images/Monstros/quimera.png", gold: [118, 210], xp: 172, drops: [{ item: "Crina de Quimera", chance: 0.30, icone: "🦁", precoVenda: 62 }, { item: "Veneno Triplo", chance: 0.20, icone: "🧪", precoVenda: 70 }] },
        { name: "Mago Corrompido", emoji: "🧙", hp: 230, atk: 66, def: 20, img: "images/Monstros/mago_corrompido.png", gold: [120, 215], xp: 178, drops: [{ item: "Grimório Negro", chance: 0.22, icone: "📕", precoVenda: 72 }, { item: "Orbe Sombrio", chance: 0.18, icone: "🔮", precoVenda: 78 }] },
        { name: "Guardião do Rei", emoji: "🛡️", hp: 310, atk: 54, def: 26, img: "images/Monstros/guardiao_rei.png", gold: [116, 208], xp: 168, drops: [{ item: "Insígnia Real", chance: 0.25, icone: "👑", precoVenda: 68 }, { item: "Elixir Real", chance: 0.15, icone: "🧪", precoVenda: 60, consumivel: true, efeito: { tipo: "cura", valor: 85 } }] },
        { name: "Cavaleiro Amaldiçoado", emoji: "🛡️", hp: 156, atk: 50, def: 18, img: "images/Monstros/cavaleiro_amaldicoado.png", gold: [74, 125], xp: 110, drops: [{ item: "Elmo Rachado", chance: 0.29, icone: "⛑️", precoVenda: 42 }] },
        { name: "Gárgula Sombria", emoji: "🗿", hp: 124, atk: 54, def: 13, img: "images/Monstros/gargula_sombria.png", gold: [72, 122], xp: 108, drops: [{ item: "Asa de Pedra", chance: 0.31, icone: "🪨", precoVenda: 40 }] },
        { name: "Servo do Lich", emoji: "💀", hp: 136, atk: 52, def: 14, img: "images/Monstros/servo_lich.png", gold: [73, 123], xp: 109, drops: [{ item: "Fragmento de Filactério", chance: 0.20, icone: "💎", precoVenda: 46 }] },
        { name: "Besta do Salão", emoji: "🐕", hp: 170, atk: 48, def: 19, img: "images/Monstros/besta_salao.png", gold: [76, 128], xp: 114, drops: [{ item: "Coleira Negra", chance: 0.27, icone: "🔗", precoVenda: 41 }] }
    ],


    // ══════════════════════════════════════════════════
    // ████ TIER 5 - CAPÍTULOS 13-15 ████
    // ══════════════════════════════════════════════════

    // ──────────────────────────────────────────────
    // 🌌 PLANO ASTRAL (Lv 37-39)
    // ──────────────────────────────────────────────
    planoAstral: [
        { name: "Ser Etéreo", emoji: "🌫️", hp: 280, atk: 62, def: 24, img: "images/Monstros/ser_etereo.png", gold: [132, 248], xp: 195, drops: [{ item: "Vapor Etéreo", chance: 0.30, icone: "🌫️", precoVenda: 75 }, { item: "Essência Astral", chance: 0.22, icone: "✨", precoVenda: 85 }] },
        { name: "Anjo Caído", emoji: "😇", hp: 320, atk: 68, def: 26, img: "images/Monstros/anjo_caido.png", gold: [140, 260], xp: 210, drops: [{ item: "Pena Corrompida", chance: 0.28, icone: "🪶", precoVenda: 80 }, { item: "Auréola Quebrada", chance: 0.15, icone: "💫", precoVenda: 100 }] },
        { name: "Observador Menor", emoji: "👁️", hp: 260, atk: 72, def: 22, img: "images/Monstros/observador_menor.png", gold: [135, 252], xp: 200, drops: [{ item: "Pupila Cósmica", chance: 0.25, icone: "👁️", precoVenda: 82 }, { item: "Lágrima Estelar", chance: 0.18, icone: "💧", precoVenda: 92 }] },
        { name: "Fragmento Estelar", emoji: "⭐", hp: 250, atk: 74, def: 23, img: "images/Monstros/fragmento_estelar.png", gold: [138, 258], xp: 205, drops: [{ item: "Poeira Estelar", chance: 0.35, icone: "⭐", precoVenda: 78 }, { item: "Cristal Cósmico", chance: 0.18, icone: "💎", precoVenda: 95 }] },
        { name: "Devorador de Mentes", emoji: "🧠", hp: 300, atk: 70, def: 25, img: "images/Monstros/devorador_mentes.png", gold: [142, 265], xp: 215, drops: [{ item: "Sinapse Arcana", chance: 0.25, icone: "🧠", precoVenda: 88 }, { item: "Elixir Mental", chance: 0.15, icone: "🧪", precoVenda: 80, consumivel: true, efeito: { tipo: "cura", valor: 100 } }] },
        { name: "Observador Galático", emoji: "👁️", hp: 140, atk: 62, def: 14, img: "images/Monstros/observador_menor.png", gold: [82, 138], xp: 125, drops: [{ item: "Pupila Astral", chance: 0.26, icone: "👁️", precoVenda: 48 }] },
        { name: "Fragmento Lunar", emoji: "🌟", hp: 132, atk: 60, def: 15, img: "images/Monstros/fragmento_estelar.png", gold: [80, 136], xp: 123, drops: [{ item: "Poeira Cósmica", chance: 0.34, icone: "✨", precoVenda: 47 }] },
        { name: "Serpente Cósmica", emoji: "🐍", hp: 150, atk: 64, def: 13, img: "images/Monstros/serpente_cosmica.png", gold: [84, 140], xp: 127, drops: [{ item: "Escama Celeste", chance: 0.28, icone: "🛡️", precoVenda: 49 }] },
        { name: "Eco Astral", emoji: "🌌", hp: 120, atk: 66, def: 12, img: "images/Monstros/eco_astral.png", gold: [81, 137], xp: 124, drops: [{ item: "Resíduo Dimensional", chance: 0.30, icone: "🌀", precoVenda: 50 }] },
        { name: "Guardião Nebuloso", emoji: "☄️", hp: 168, atk: 59, def: 18, img: "images/Monstros/guardiao_nebuloso.png", gold: [85, 144], xp: 129, drops: [{ item: "Núcleo Nebular", chance: 0.22, icone: "🌠", precoVenda: 53 }] }
    ],

    // ──────────────────────────────────────────────
    // 🔥 INFERNUS (Lv 40-42)
    // ──────────────────────────────────────────────
    infernus: [
        { name: "Demônio de Guerra", emoji: "👹", hp: 380, atk: 72, def: 28, img: "images/Monstros/demonio_guerra.png", gold: [158, 295], xp: 240, drops: [{ item: "Manopla Demoníaca", chance: 0.25, icone: "🥊", precoVenda: 100 }, { item: "Coração Negro", chance: 0.18, icone: "🖤", precoVenda: 110 }] },
        { name: "Súcubo Tentador", emoji: "😈", hp: 310, atk: 78, def: 24, img: "images/Monstros/sucubo_tentador.png", gold: [155, 290], xp: 235, drops: [{ item: "Beijo da Morte", chance: 0.22, icone: "💋", precoVenda: 95 }, { item: "Perfume Infernal", chance: 0.28, icone: "🌹", precoVenda: 88 }] },
        { name: "Cão Infernal", emoji: "🐕", hp: 340, atk: 76, def: 26, img: "images/Monstros/cao_infernal.png", gold: [152, 285], xp: 230, drops: [{ item: "Presa Infernal", chance: 0.30, icone: "🦷", precoVenda: 92 }, { item: "Pelo Ardente", chance: 0.35, icone: "🔥", precoVenda: 82 }] },
        { name: "Diabo Flamejante", emoji: "🔥", hp: 350, atk: 80, def: 27, img: "images/Monstros/diabo_flamejante.png", gold: [160, 300], xp: 245, drops: [{ item: "Tridente Ígneo", chance: 0.22, icone: "🔱", precoVenda: 105 }, { item: "Chama Eterna", chance: 0.18, icone: "🔥", precoVenda: 115 }] },
        { name: "Alma Condenada", emoji: "💀", hp: 300, atk: 68, def: 22, img: "images/Monstros/alma_condenada.png", gold: [148, 278], xp: 225, drops: [{ item: "Grilhão Partido", chance: 0.30, icone: "⛓️", precoVenda: 85 }, { item: "Lágrima do Condenado", chance: 0.20, icone: "💧", precoVenda: 95, consumivel: true, efeito: { tipo: "cura", valor: 110 } }] },
        { name: "Diabrete Flamejante", emoji: "😈", hp: 148, atk: 68, def: 15, img: "images/Monstros/diabrete_flamejante.png", gold: [90, 152], xp: 138, drops: [{ item: "Dente Demoníaco", chance: 0.30, icone: "🦷", precoVenda: 54 }] },
        { name: "Succubus Sombria", emoji: "👿", hp: 138, atk: 70, def: 14, img: "images/Monstros/succubus_sombria.png", gold: [94, 158], xp: 140, drops: [{ item: "Essência Pecaminosa", chance: 0.24, icone: "💋", precoVenda: 58 }] },
        { name: "Guerreiro Abissal", emoji: "⚔️", hp: 188, atk: 62, def: 20, img: "images/Monstros/guerreiro_abissal.png", gold: [95, 160], xp: 145, drops: [{ item: "Lâmina Infernal", chance: 0.21, icone: "🗡️", precoVenda: 60 }] },
        { name: "Arauto da Brasa", emoji: "🔥", hp: 160, atk: 69, def: 16, img: "images/Monstros/arauto_brasa.png", gold: [93, 157], xp: 141, drops: [{ item: "Brasa Viva", chance: 0.27, icone: "❤️‍🔥", precoVenda: 56 }] }
    ],

    // ──────────────────────────────────────────────
    // ⚡ TRONO DOS DEUSES (Lv 43-45)
    // ──────────────────────────────────────────────
    tronoDeus: [
        { name: "Serafim Corrompido", emoji: "👼", hp: 440, atk: 80, def: 32, img: "images/Monstros/serafim_corrompido.png", gold: [188, 350], xp: 285, drops: [{ item: "Asa Divina Corrompida", chance: 0.22, icone: "🪶", precoVenda: 120 }, { item: "Luz Profana", chance: 0.18, icone: "💡", precoVenda: 135 }] },
        { name: "Titã Menor", emoji: "🗿", hp: 520, atk: 78, def: 35, img: "images/Monstros/tita_menor.png", gold: [195, 365], xp: 300, drops: [{ item: "Punho Titânico", chance: 0.20, icone: "👊", precoVenda: 130 }, { item: "Rocha Primordial", chance: 0.25, icone: "🪨", precoVenda: 115 }] },
        { name: "Guardião Divino", emoji: "🛡️", hp: 500, atk: 74, def: 38, img: "images/Monstros/guardiao_divino.png", gold: [192, 358], xp: 295, drops: [{ item: "Escudo Celestial", chance: 0.18, icone: "🛡️", precoVenda: 140 }, { item: "Bênção Corrupta", chance: 0.22, icone: "✨", precoVenda: 125 }] },
        { name: "Avatar do Caos", emoji: "🌀", hp: 460, atk: 86, def: 30, img: "images/Monstros/avatar_caos.png", gold: [200, 375], xp: 310, drops: [{ item: "Orbe do Caos", chance: 0.18, icone: "🌀", precoVenda: 145 }, { item: "Fragmento da Realidade", chance: 0.15, icone: "💎", precoVenda: 155 }] },
        { name: "Arauto do Fim", emoji: "⚡", hp: 480, atk: 92, def: 33, img: "images/Monstros/arauto_fim.png", gold: [205, 380], xp: 320, drops: [{ item: "Trombeta do Juízo", chance: 0.15, icone: "📯", precoVenda: 150 }, { item: "Néctar Divino", chance: 0.12, icone: "🧪", precoVenda: 130, consumivel: true, efeito: { tipo: "cura", valor: 150 } }] },
        { name: "Anjo Corrompido", emoji: "😇", hp: 190, atk: 74, def: 20, img: "images/Monstros/anjo_caido.png", gold: [100, 170], xp: 155, drops: [{ item: "Pena Sagrada Queimada", chance: 0.24, icone: "🪶", precoVenda: 65 }] },
        { name: "Juiz Celestial Corrompido", emoji: "⚖️", hp: 210, atk: 72, def: 22, img: "images/Monstros/juiz_celestial_corrompido.png", gold: [102, 174], xp: 160, drops: [{ item: "Selo Divino Partido", chance: 0.20, icone: "📜", precoVenda: 68 }] },
        { name: "Serafim Partido", emoji: "👼", hp: 178, atk: 78, def: 18, img: "images/Monstros/serafim_partido.png", gold: [101, 172], xp: 158, drops: [{ item: "Fragmento de Halo", chance: 0.22, icone: "💫", precoVenda: 67 }] },
        { name: "Guardião do Trono", emoji: "🛡️", hp: 240, atk: 68, def: 26, img: "images/Monstros/guardiao_trono.png", gold: [105, 178], xp: 164, drops: [{ item: "Fragmento do Trono", chance: 0.18, icone: "🪑", precoVenda: 72 }] }
    ]
};

var bossesMasmorra = {
    floresta:  { name: "Escorpião Rei", emoji: "🦂👑", hp: 100, atk: 18, def: 8, img: "images/monstros/escorpiaorei.png",   gold: [55, 90], xp: 80, drops: [{ item: "Ferrão Real", chance: 0.60, icone: "🦂", precoVenda: 30 }] },
    pantano:   { name: "Hydra do Pântano", emoji: "🐍👑", hp: 240, atk: 28, def: 18, img: "images/monstros/boss.hidra.png", gold: [70, 115], xp: 120, drops: [{ item: "Cabeça de Hydra", chance: 0.50, icone: "🐍", precoVenda: 40 }] },
    colinas:   { name: "Chefe Orc Brutamontes", emoji: "👹👑", hp: 380, atk: 38, def: 25, img: "images/monstros/boss.orc.png", gold: [90, 145], xp: 160, drops: [{ item: "Clava do Chefe", chance: 0.45, icone: "🏏", precoVenda: 50 }] },

    ruinas:    { name: "Rei Esqueleto", emoji: "💀👑", hp: 440, atk: 35, def: 14, img: "images/monstros/boss_esqueleto.png", gold: [120, 195], xp: 200, drops: [{ item: "Coroa Amaldiçoada", chance: 0.40, icone: "👑", precoVenda: 60 }] },
    deserto:   { name: "Faraó Imortal", emoji: "🏺👑", hp: 580, atk: 40, def: 16, gold: [140, 230], xp: 240, drops: [{ item: "Máscara Dourada", chance: 0.35, icone: "🎭", precoVenda: 70 }] },
    cemiterio: { name: "Necromante Supremo", emoji: "💀👑", hp: 660, atk: 42, def: 14, gold: [135, 220], xp: 250, drops: [{ item: "Cajado da Morte", chance: 0.30, icone: "🪄", precoVenda: 75 }] },

    caverna:   { name: "Dragão das Profundezas", emoji: "🐲👑", hp: 420, atk: 48, def: 22, gold: [220, 380], xp: 350, drops: [{ item: "Escama de Dragão", chance: 0.40, icone: "🐉", precoVenda: 90 }] },
    vulcao:    { name: "Senhor do Magma", emoji: "🌋👑", hp: 460, atk: 52, def: 24, gold: [250, 420], xp: 380, drops: [{ item: "Coração de Magma", chance: 0.30, icone: "❤️‍🔥", precoVenda: 100 }] },
    geleira:   { name: "Rei do Inverno", emoji: "❄️👑", hp: 440, atk: 50, def: 26, gold: [235, 400], xp: 370, drops: [{ item: "Coroa de Gelo", chance: 0.25, icone: "👑", precoVenda: 95 }] },

    cidadeFant:{ name: "Lorde Vampiro", emoji: "🧛👑", hp: 550, atk: 62, def: 28, gold: [300, 500], xp: 420, drops: [{ item: "Medalhão Vampírico", chance: 0.25, icone: "📿", precoVenda: 110 }] },
    abismo:    { name: "Deus Antigo Cthar", emoji: "🐙👑", hp: 650, atk: 68, def: 30, gold: [350, 580], xp: 480, drops: [{ item: "Tentáculo Divino", chance: 0.18, icone: "🐙", precoVenda: 130 }] },
    castelo:   { name: "Rei Lich Eterno", emoji: "💀👑", hp: 700, atk: 72, def: 32, gold: [380, 630], xp: 520, drops: [{ item: "Filactério Eterno", chance: 0.15, icone: "💎", precoVenda: 150 }] },

    planoAstral:{ name: "Observador Supremo", emoji: "👁️👑", hp: 800, atk: 80, def: 35, gold: [450, 750], xp: 580, drops: [{ item: "Olho da Eternidade", chance: 0.12, icone: "👁️", precoVenda: 180 }] },
    infernus:  { name: "Príncipe Demônio", emoji: "😈👑", hp: 950, atk: 88, def: 38, gold: [520, 860], xp: 680, drops: [{ item: "Coroa do Inferno", chance: 0.10, icone: "👑", precoVenda: 220 }] },
    tronoDeus: { name: "Deus Corrompido Axiom", emoji: "⚡👑", hp: 1300, atk: 100, def: 42, gold: [650, 1080], xp: 1000, drops: [{ item: "Essência Divina", chance: 0.08, icone: "🌟", precoVenda: 500 }] }
};

// ============================================
// SEÇÃO 6: EVENTOS DE MASMORRA
// ============================================

function gerarEventosMasmorra(areaKey) {
    var area = areas[areaKey];
    var tier = area.tier;

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
        { tipo: "tesouro", texto: "Tesouro de aventureiro caído!", icone: "💰", ouro: [ouroMin * 1.5, ouroMax * 1.5] },
        { tipo: "armadilha", texto: "Armadilha ativada!", icone: "⚠️", dano: [danoMin, danoMax] },
        { tipo: "armadilha", texto: "Veneno no ar!", icone: "☠️", dano: [danoMin * 0.8, danoMax * 0.8] },
        { tipo: "descanso", texto: "Sala segura com fonte curativa.", icone: "⛲", cura: [curaMin, curaMax] },
        { tipo: "enigma", texto: "Inscrição misteriosa na parede.", icone: "🧩", exp: [expMin, expMax], ouro: [ouroMin * 0.5, ouroMax * 0.5] },
        { tipo: "nada", texto: "Silêncio... nada acontece.", icone: "🌫️" }
    ];
}

var eventosMasmorra = {};
Object.keys(areas).forEach(function(key) {
    eventosMasmorra[key] = gerarEventosMasmorra(key);
});

// ============================================
// SEÇÃO 7: BANCO DE MISSÕES
// ============================================

var bancoDeMissoes = {

    // ══════════════════════════════════════════════════════════
    // ████████████████ TIER 1 — CAPÍTULOS 1 a 3 ████████████████
    // ══════════════════════════════════════════════════════════

    // ──────────────────────────────────────────────
    // 🌲 FLORESTA SOMBRIA (Lv 1-3)
    // ──────────────────────────────────────────────
    floresta: [
        // === MISSÕES ORIGINAIS (Lista 1) ===
        {
            id: "f1",
            titulo: "🐺 Caçada de Lobos",
            descricao: "Derrote 3 Lobos Albinos",
            tipo: "matar",
            alvo: "Lobo Albino",
            qtdNecessaria: 3,
            recompensas: { ouro: 50, xp: 40, item: null }
        },
        {
            id: "f2",
            titulo: "🕷️ Infestação da Mata",
            descricao: "Derrote 3 Aranhas Gigantes",
            tipo: "matar",
            alvo: "Aranha Gigante",
            qtdNecessaria: 3,
            recompensas: { ouro: 60, xp: 50, item: null }
        },
        {
            id: "f3",
            titulo: "🦉 Vigília Noturna",
            descricao: "Derrote 2 Corujas Sombrias",
            tipo: "matar",
            alvo: "Coruja Sombria",
            qtdNecessaria: 2,
            recompensas: { ouro: 55, xp: 45, item: null }
        },
        {
            id: "f4",
            titulo: "⚔️ Caça Livre da Floresta",
            descricao: "Derrote 5 monstros quaisquer na Floresta",
            tipo: "matar_qualquer",
            alvo: "floresta",
            qtdNecessaria: 5,
            recompensas: { ouro: 45, xp: 35, item: null }
        },
        {
            id: "f5",
            titulo: "🏰 Masmorra da Floresta",
            descricao: "Complete a masmorra da Floresta Sombria",
            tipo: "masmorra",
            alvo: "floresta",
            qtdNecessaria: 1,
            recompensas: { ouro: 100, xp: 80, item: "Ferrão Real" }
        },

        // === MISSÕES EXPANDIDAS (Lista 2) ===
        {
            id: "fl01",
            titulo: "🐺 Caçada de Lobos Cinzentos",
            descricao: "Os lobos cinzentos estão atacando viajantes na estrada. Elimine a ameaça.",
            tipo: "matar",
            alvo: "Lobo Cinzento",
            qtdNecessaria: 3,
            recompensas: { ouro: 50, xp: 40, item: null }
        },
        {
            id: "fl02",
            titulo: "🕷️ Infestação Aracnídea",
            descricao: "Teias gigantes bloqueiam os caminhos. Destrua as aranhas que as tecem.",
            tipo: "matar",
            alvo: "Aranha Gigante",
            qtdNecessaria: 4, // DUPLICATA — era 3, alterado para 4
            recompensas: { ouro: 55, xp: 45, item: null }
        },
        {
            id: "fl03",
            titulo: "👺 Emboscada Goblin",
            descricao: "Goblins montaram acampamentos na floresta. Expulse os invasores.",
            tipo: "matar",
            alvo: "Goblin Explorador",
            qtdNecessaria: 4,
            recompensas: { ouro: 65, xp: 50, item: null }
        },
        {
            id: "fl04",
            titulo: "⚔️ Patrulha Florestal",
            descricao: "A floresta está mais perigosa que o normal. Patrulhe e elimine ameaças.",
            tipo: "matar_qualquer",
            alvo: null,
            qtdNecessaria: 6,
            recompensas: { ouro: 70, xp: 55, item: null }
        },
        {
            id: "fl05",
            titulo: "🏰 Covil do Escorpião Rei",
            descricao: "Uma masmorra foi descoberta nas raízes de uma árvore anciã. Explore-a por completo.",
            tipo: "masmorra",
            alvo: "floresta",
            qtdNecessaria: 1,
            recompensas: { ouro: 120, xp: 100, item: null }
        }
    ],

    // ──────────────────────────────────────────────
    // 🐸 PÂNTANO VENENOSO (Lv 4-6)
    // ──────────────────────────────────────────────
    pantano: [
        // === MISSÕES ORIGINAIS (Lista 1) ===
        {
            id: "p1",
            titulo: "🐸 Pele Tóxica",
            descricao: "Derrote 3 Sapos Venenosos",
            tipo: "matar",
            alvo: "Sapo Venenoso",
            qtdNecessaria: 3,
            recompensas: { ouro: 75, xp: 60, item: null }
        },
        {
            id: "p2",
            titulo: "🐍 Serpentes do Charco",
            descricao: "Derrote 3 Cobras d'Água",
            tipo: "matar",
            alvo: "Cobra d'Água",
            qtdNecessaria: 3,
            recompensas: { ouro: 80, xp: 65, item: null }
        },
        {
            id: "p3",
            titulo: "🦟 Praga do Lodo",
            descricao: "Derrote 4 Mosquitos do Lodo",
            tipo: "matar",
            alvo: "Mosquito do Lodo",
            qtdNecessaria: 4,
            recompensas: { ouro: 85, xp: 70, item: null }
        },
        {
            id: "p4",
            titulo: "⚔️ Limpeza do Pântano",
            descricao: "Derrote 6 monstros quaisquer no Pântano",
            tipo: "matar_qualquer",
            alvo: "pantano",
            qtdNecessaria: 6,
            recompensas: { ouro: 70, xp: 55, item: null }
        },
        {
            id: "p5",
            titulo: "🏰 Masmorra do Pântano",
            descricao: "Complete a masmorra do Pântano Venenoso",
            tipo: "masmorra",
            alvo: "pantano",
            qtdNecessaria: 1,
            recompensas: { ouro: 140, xp: 100, item: "Cabeça de Hydra" }
        },

        // === MISSÕES EXPANDIDAS (Lista 2) ===
        {
            id: "pt01",
            titulo: "🐸 Praga Venenosa",
            descricao: "Sapos venenosos contaminam a água. Elimine-os antes que envenenem o rio.",
            tipo: "matar",
            alvo: "Sapo Venenoso",
            qtdNecessaria: 4, // DUPLICATA — era 3, alterado para 4
            recompensas: { ouro: 65, xp: 55, item: null }
        },
        {
            id: "pt02",
            titulo: "🐊 Predador das Águas",
            descricao: "Um crocodilo ancião domina o pântano. Mostre quem é o verdadeiro predador.",
            tipo: "matar",
            alvo: "Crocodilo Ancião",
            qtdNecessaria: 2,
            recompensas: { ouro: 80, xp: 65, item: null }
        },
        {
            id: "pt03",
            titulo: "🧟 Mortos que Andam",
            descricao: "Zumbis emergiram das águas lamacentas. Devolva-os ao descanso eterno.",
            tipo: "matar",
            alvo: "Zumbi do Pântano",
            qtdNecessaria: 3,
            recompensas: { ouro: 75, xp: 60, item: null }
        },
        {
            id: "pt04",
            titulo: "🧪 Coleta Tóxica",
            descricao: "Um alquimista precisa de glândulas tóxicas para criar antídotos.",
            tipo: "coletar",
            alvo: "Glândula Tóxica",
            qtdNecessaria: 3,
            recompensas: { ouro: 90, xp: 70, item: null }
        },
        {
            id: "pt05",
            titulo: "🏰 Ninho da Hydra",
            descricao: "A masmorra do pântano esconde a terrível Hydra. Ouse entrar?",
            tipo: "masmorra",
            alvo: "pantano",
            qtdNecessaria: 1,
            recompensas: { ouro: 150, xp: 120, item: null }
        }
    ],

    // ──────────────────────────────────────────────
    // ⛰️ COLINAS SANGRENTAS (Lv 7-9)
    // ──────────────────────────────────────────────
    colinas: [
        // === MISSÕES ORIGINAIS (Lista 1) ===
        {
            id: "co1",
            titulo: "👹 Patrulha Orc",
            descricao: "Derrote 3 Orcs Batedores",
            tipo: "matar",
            alvo: "Orc Batedor",
            qtdNecessaria: 3,
            recompensas: { ouro: 95, xp: 80, item: null }
        },
        {
            id: "co2",
            titulo: "🦅 Asas Sangrentas",
            descricao: "Derrote 3 Harpias",
            tipo: "matar",
            alvo: "Harpia",
            qtdNecessaria: 3,
            recompensas: { ouro: 100, xp: 85, item: null }
        },
        {
            id: "co3",
            titulo: "🐂 Investida Selvagem",
            descricao: "Derrote 2 Touros das Colinas",
            tipo: "matar",
            alvo: "Touro das Colinas",
            qtdNecessaria: 2,
            recompensas: { ouro: 105, xp: 90, item: null }
        },
        {
            id: "co4",
            titulo: "⚔️ Caçador das Colinas",
            descricao: "Derrote 6 monstros quaisquer nas Colinas",
            tipo: "matar_qualquer",
            alvo: "colinas",
            qtdNecessaria: 6,
            recompensas: { ouro: 90, xp: 75, item: null }
        },
        {
            id: "co5",
            titulo: "🏰 Masmorra das Colinas",
            descricao: "Complete a masmorra das Colinas Sangrentas",
            tipo: "masmorra",
            alvo: "colinas",
            qtdNecessaria: 1,
            recompensas: { ouro: 170, xp: 130, item: "Clava do Chefe" }
        },

        // === MISSÕES EXPANDIDAS (Lista 2) ===
        {
            id: "cl01",
            titulo: "👹 Batedores Orcs",
            descricao: "Batedores orcs estão mapeando a região para uma invasão. Impeça-os.",
            tipo: "matar",
            alvo: "Orc Batedor",
            qtdNecessaria: 5, // DUPLICATA — era 4, alterado para 5
            recompensas: { ouro: 90, xp: 75, item: null }
        },
        {
            id: "cl02",
            titulo: "🦅 Terror dos Céus",
            descricao: "Harpias atacam qualquer um que cruze as colinas. Limpe os céus.",
            tipo: "matar",
            alvo: "Harpia",
            qtdNecessaria: 4, // DUPLICATA — era 3, alterado para 4
            recompensas: { ouro: 95, xp: 80, item: null }
        },
        {
            id: "cl03",
            titulo: "🦎 Olhar Petrificante",
            descricao: "Viajantes estão sendo petrificados. Caçe o basilisco responsável.",
            tipo: "matar",
            alvo: "Basilisco Rochoso",
            qtdNecessaria: 2,
            recompensas: { ouro: 100, xp: 85, item: null }
        },
        {
            id: "cl04",
            titulo: "⚔️ Domínio das Colinas",
            descricao: "Tome controle das colinas eliminando todos os inimigos que encontrar.",
            tipo: "matar_qualquer",
            alvo: null,
            qtdNecessaria: 8,
            recompensas: { ouro: 110, xp: 90, item: null }
        },
        {
            id: "cl05",
            titulo: "🏰 Fortaleza do Brutamontes",
            descricao: "O Chefe Orc se esconde na masmorra das colinas. É hora do acerto de contas.",
            tipo: "masmorra",
            alvo: "colinas",
            qtdNecessaria: 1,
            recompensas: { ouro: 180, xp: 150, item: null }
        }
    ],


    // ══════════════════════════════════════════════════════════
    // ████████████████ TIER 2 — CAPÍTULOS 4 a 6 ████████████████
    // ══════════════════════════════════════════════════════════

    // ──────────────────────────────────────────────
    // 🏚️ RUÍNAS ESQUECIDAS (Lv 10-12)
    // ──────────────────────────────────────────────
    ruinas: [
        // === MISSÕES ORIGINAIS (Lista 1) ===
        {
            id: "r1",
            titulo: "💀 Ossos em Marcha",
            descricao: "Derrote 4 Esqueletos Guerreiros",
            tipo: "matar",
            alvo: "Esqueleto Guerreiro",
            qtdNecessaria: 4,
            recompensas: { ouro: 120, xp: 100, item: null }
        },
        {
            id: "r2",
            titulo: "🗿 Sentinelas Caídas",
            descricao: "Derrote 3 Sentinelas Arruinadas",
            tipo: "matar",
            alvo: "Sentinela Arruinada",
            qtdNecessaria: 3,
            recompensas: { ouro: 130, xp: 110, item: null }
        },
        {
            id: "r3",
            titulo: "🤖 Bronze Antigo",
            descricao: "Derrote 2 Guardiões de Bronze",
            tipo: "matar",
            alvo: "Guardião de Bronze",
            qtdNecessaria: 2,
            recompensas: { ouro: 140, xp: 120, item: null }
        },
        {
            id: "r4",
            titulo: "⚔️ Caçador das Ruínas",
            descricao: "Derrote 7 monstros quaisquer nas Ruínas",
            tipo: "matar_qualquer",
            alvo: "ruinas",
            qtdNecessaria: 7,
            recompensas: { ouro: 110, xp: 95, item: null }
        },
        {
            id: "r5",
            titulo: "🏰 Trono em Poeira",
            descricao: "Complete a masmorra das Ruínas Esquecidas",
            tipo: "masmorra",
            alvo: "ruinas",
            qtdNecessaria: 1,
            recompensas: { ouro: 220, xp: 170, item: "Coroa Amaldiçoada" }
        },

        // === MISSÕES EXPANDIDAS (Lista 2) ===
        {
            id: "ru01",
            titulo: "💀 Purgar Mortos-Vivos",
            descricao: "Esqueletos guerreiros guardam as ruínas. Destrua suas fileiras.",
            tipo: "matar",
            alvo: "Esqueleto Guerreiro",
            qtdNecessaria: 5, // DUPLICATA — era 4, alterado para 5
            recompensas: { ouro: 130, xp: 100, item: null }
        },
        {
            id: "ru02",
            titulo: "🗿 Gigantes de Pedra",
            descricao: "Golems antigos acordaram. Reduza-os a escombros.",
            tipo: "matar",
            alvo: "Golem de Pedra",
            qtdNecessaria: 3,
            recompensas: { ouro: 160, xp: 125, item: null }
        },
        {
            id: "ru03",
            titulo: "📦 Armadilhas Vivas",
            descricao: "Baús falsos devoram aventureiros desavisados. Elimine os mímicos.",
            tipo: "matar",
            alvo: "Mimico",
            qtdNecessaria: 3,
            recompensas: { ouro: 175, xp: 130, item: null }
        },
        {
            id: "ru04",
            titulo: "👻 Ecos do Passado",
            descricao: "Espectros antigos assombram os corredores. Colete ectoplasma para o mago da vila.",
            tipo: "coletar",
            alvo: "Ectoplasma",
            qtdNecessaria: 3,
            recompensas: { ouro: 145, xp: 115, item: null }
        },
        {
            id: "ru05",
            titulo: "🏰 Trono do Rei Esqueleto",
            descricao: "O Rei Esqueleto aguarda no coração das ruínas. Reclame sua coroa.",
            tipo: "masmorra",
            alvo: "ruinas",
            qtdNecessaria: 1,
            recompensas: { ouro: 350, xp: 250, item: null }
        }
    ],

    // ──────────────────────────────────────────────
    // 🏜️ DESERTO ESCALDANTE (Lv 13-15)
    // ──────────────────────────────────────────────
    deserto: [
        // === MISSÕES ORIGINAIS (Lista 1) ===
        {
            id: "d1",
            titulo: "🦂 Ferrões da Tempestade",
            descricao: "Derrote 4 Escorpiões de Areia",
            tipo: "matar",
            alvo: "Escorpião de Areia",
            qtdNecessaria: 4,
            recompensas: { ouro: 150, xp: 125, item: null }
        },
        {
            id: "d2",
            titulo: "🧟 Tumbas Abertas",
            descricao: "Derrote 3 Múmias Errantes",
            tipo: "matar",
            alvo: "Múmia Errante",
            qtdNecessaria: 3,
            recompensas: { ouro: 155, xp: 130, item: null }
        },
        {
            id: "d3",
            titulo: "🌪️ Vento Aprisionado",
            descricao: "Derrote 2 Djinns Menores",
            tipo: "matar",
            alvo: "Djinn Menor",
            qtdNecessaria: 2,
            recompensas: { ouro: 165, xp: 140, item: null }
        },
        {
            id: "d4",
            titulo: "⚔️ Sobrevivente do Deserto",
            descricao: "Derrote 7 monstros quaisquer no Deserto",
            tipo: "matar_qualquer",
            alvo: "deserto",
            qtdNecessaria: 7,
            recompensas: { ouro: 135, xp: 115, item: null }
        },
        {
            id: "d5",
            titulo: "🏰 Câmara do Faraó",
            descricao: "Complete a masmorra do Deserto Escaldante",
            tipo: "masmorra",
            alvo: "deserto",
            qtdNecessaria: 1,
            recompensas: { ouro: 250, xp: 190, item: "Máscara Dourada" }
        },

        // === MISSÕES EXPANDIDAS (Lista 2) ===
        {
            id: "ds01",
            titulo: "🦂 Praga de Escorpiões",
            descricao: "Escorpiões venenosos infestam as rotas comerciais do deserto.",
            tipo: "matar",
            alvo: "Escorpião do Deserto",
            qtdNecessaria: 4,
            recompensas: { ouro: 155, xp: 120, item: null }
        },
        {
            id: "ds02",
            titulo: "🧟 Múmias Despertas",
            descricao: "Túmulos antigos se abriram. As múmias vagam em busca de vingança.",
            tipo: "matar",
            alvo: "Múmia Errante",
            qtdNecessaria: 4, // DUPLICATA — era 3, alterado para 4
            recompensas: { ouro: 170, xp: 135, item: null }
        },
        {
            id: "ds03",
            titulo: "🥷 Emboscada nas Dunas",
            descricao: "Bandidos atacam caravanas. Traga justiça ao deserto.",
            tipo: "matar",
            alvo: "Bandido do Deserto",
            qtdNecessaria: 4,
            recompensas: { ouro: 185, xp: 140, item: null }
        },
        {
            id: "ds04",
            titulo: "⏳ Areias Encantadas",
            descricao: "Um estudioso precisa de areia encantada dos elementais para suas pesquisas.",
            tipo: "coletar",
            alvo: "Areia Encantada",
            qtdNecessaria: 3,
            recompensas: { ouro: 165, xp: 130, item: null }
        },
        {
            id: "ds05",
            titulo: "🏰 Pirâmide do Faraó",
            descricao: "O Faraó Imortal reina na pirâmide selada há milênios. Quebre o selo.",
            tipo: "masmorra",
            alvo: "deserto",
            qtdNecessaria: 1,
            recompensas: { ouro: 380, xp: 280, item: null }
        }
    ],

    // ──────────────────────────────────────────────
    // ⚰️ CEMITÉRIO PROFANO (Lv 16-18)
    // ──────────────────────────────────────────────
    cemiterio: [
        // === MISSÕES ORIGINAIS (Lista 1) ===
        {
            id: "ce1",
            titulo: "🧟 Mortos Inquietos",
            descricao: "Derrote 4 Zumbis Putrefatos",
            tipo: "matar",
            alvo: "Zumbi Putrefato",
            qtdNecessaria: 4,
            recompensas: { ouro: 180, xp: 150, item: null }
        },
        {
            id: "ce2",
            titulo: "👻 Lamentos na Névoa",
            descricao: "Derrote 3 Espectros Lamentosos",
            tipo: "matar",
            alvo: "Espectro Lamentoso",
            qtdNecessaria: 3,
            recompensas: { ouro: 185, xp: 155, item: null }
        },
        {
            id: "ce3",
            titulo: "🐕 Caçada Macabra",
            descricao: "Derrote 3 Cães Cadavéricos",
            tipo: "matar",
            alvo: "Cão Cadavérico",
            qtdNecessaria: 3,
            recompensas: { ouro: 190, xp: 160, item: null }
        },
        {
            id: "ce4",
            titulo: "⚔️ Expurgo Profano",
            descricao: "Derrote 8 monstros quaisquer no Cemitério",
            tipo: "matar_qualquer",
            alvo: "cemiterio",
            qtdNecessaria: 8,
            recompensas: { ouro: 170, xp: 145, item: null }
        },
        {
            id: "ce5",
            titulo: "🏰 Ritual Interrompido",
            descricao: "Complete a masmorra do Cemitério Profano",
            tipo: "masmorra",
            alvo: "cemiterio",
            qtdNecessaria: 1,
            recompensas: { ouro: 280, xp: 210, item: "Cajado da Morte" }
        },

        // === MISSÕES EXPANDIDAS (Lista 2) ===
        {
            id: "cm01",
            titulo: "🧟 Horda Putrefata",
            descricao: "Zumbis em decomposição emergem dos túmulos toda noite. Acabe com eles.",
            tipo: "matar",
            alvo: "Zumbi Putrefato",
            qtdNecessaria: 6, // DUPLICATA — era 5, alterado para 6
            recompensas: { ouro: 185, xp: 150, item: null }
        },
        {
            id: "cm02",
            titulo: "💀 Flechas da Morte",
            descricao: "Esqueletos arqueiros disparam de cima dos mausoléus. Derrube-os.",
            tipo: "matar",
            alvo: "Esqueleto Arqueiro",
            qtdNecessaria: 4,
            recompensas: { ouro: 195, xp: 160, item: null }
        },
        {
            id: "cm03",
            titulo: "👻 Lamentos Eternos",
            descricao: "Fantasmas atormentam os vivos com seus gritos. Dê-lhes paz.",
            tipo: "matar",
            alvo: "Fantasma Lamentoso",
            qtdNecessaria: 3,
            recompensas: { ouro: 210, xp: 170, item: null }
        },
        {
            id: "cm04",
            titulo: "⚔️ Limpeza do Cemitério",
            descricao: "O cemitério precisa ser completamente limpo de abominações.",
            tipo: "matar_qualquer",
            alvo: null,
            qtdNecessaria: 10,
            recompensas: { ouro: 220, xp: 180, item: null }
        },
        {
            id: "cm05",
            titulo: "🏰 Cripta do Necromante",
            descricao: "O Necromante Supremo ergue mortos-vivos sem parar. Encontre e destrua-o.",
            tipo: "masmorra",
            alvo: "cemiterio",
            qtdNecessaria: 1,
            recompensas: { ouro: 420, xp: 320, item: null }
        }
    ],


    // ══════════════════════════════════════════════════════════
    // ████████████████ TIER 3 — CAPÍTULOS 7 a 9 ████████████████
    // ══════════════════════════════════════════════════════════

    // ──────────────────────────────────────────────
    // 🕳️ CAVERNA PROFUNDA (Lv 19-21)
    // ──────────────────────────────────────────────
    caverna: [
        // === MISSÕES ORIGINAIS (Lista 1) ===
        {
            id: "ca1",
            titulo: "🦇 Ecos Escuros",
            descricao: "Derrote 4 Morcegos Abissais",
            tipo: "matar",
            alvo: "Morcego Abissal",
            qtdNecessaria: 4,
            recompensas: { ouro: 230, xp: 190, item: null }
        },
        {
            id: "ca2",
            titulo: "🧌 Rocha contra Rocha",
            descricao: "Derrote 3 Trolls das Rochas",
            tipo: "matar",
            alvo: "Troll das Rochas",
            qtdNecessaria: 3,
            recompensas: { ouro: 240, xp: 200, item: null }
        },
        {
            id: "ca3",
            titulo: "🪱 Túneis Cristalinos",
            descricao: "Derrote 3 Vermes de Cristal",
            tipo: "matar",
            alvo: "Verme de Cristal",
            qtdNecessaria: 3,
            recompensas: { ouro: 245, xp: 205, item: null }
        },
        {
            id: "ca4",
            titulo: "⚔️ Veterano das Profundezas",
            descricao: "Derrote 8 monstros quaisquer na Caverna",
            tipo: "matar_qualquer",
            alvo: "caverna",
            qtdNecessaria: 8,
            recompensas: { ouro: 220, xp: 180, item: null }
        },
        {
            id: "ca5",
            titulo: "🏰 Coração das Profundezas",
            descricao: "Complete a masmorra da Caverna Profunda",
            tipo: "masmorra",
            alvo: "caverna",
            qtdNecessaria: 1,
            recompensas: { ouro: 360, xp: 280, item: "Escama de Dragão" }
        },

        // === MISSÕES EXPANDIDAS (Lista 2) ===
        {
            id: "cv01",
            titulo: "🧌 Caça ao Troll",
            descricao: "Trolls bloqueiam as passagens da caverna. Abra caminho com força.",
            tipo: "matar",
            alvo: "Troll das Cavernas",
            qtdNecessaria: 3,
            recompensas: { ouro: 280, xp: 220, item: null }
        },
        {
            id: "cv02",
            titulo: "🦇 Ninho de Morcegos",
            descricao: "Morcegos vampíricos drenam os mineiros. Extermine a colônia.",
            tipo: "matar",
            alvo: "Morcego Vampírico",
            qtdNecessaria: 4,
            recompensas: { ouro: 265, xp: 210, item: null }
        },
        {
            id: "cv03",
            titulo: "💎 Cristais Preciosos",
            descricao: "Os Golems de Cristal guardam fragmentos valiosos. Colete-os.",
            tipo: "coletar",
            alvo: "Fragmento de Cristal",
            qtdNecessaria: 3,
            recompensas: { ouro: 320, xp: 250, item: null }
        },
        {
            id: "cv04",
            titulo: "⛏️ Guerra dos Kobolds",
            descricao: "Kobolds mineiros saqueiam os veios de minério. Expulse os ladrões.",
            tipo: "matar",
            alvo: "Kobold Mineiro",
            qtdNecessaria: 5,
            recompensas: { ouro: 300, xp: 235, item: null }
        },
        {
            id: "cv05",
            titulo: "🏰 Covil do Dragão",
            descricao: "Nas profundezas da caverna, um dragão antigo dorme sobre um tesouro.",
            tipo: "masmorra",
            alvo: "caverna",
            qtdNecessaria: 1,
            recompensas: { ouro: 650, xp: 480, item: null }
        }
    ],

    // ──────────────────────────────────────────────
    // 🌋 VULCÃO INFERNAL (Lv 22-24)
    // ──────────────────────────────────────────────
    vulcao: [
        // === MISSÕES ORIGINAIS (Lista 1) ===
        {
            id: "v1",
            titulo: "🔥 Sangue de Lava",
            descricao: "Derrote 3 Salamandras Ígneas",
            tipo: "matar",
            alvo: "Salamandra Ígnea",
            qtdNecessaria: 3,
            recompensas: { ouro: 270, xp: 220, item: null }
        },
        {
            id: "v2",
            titulo: "🪨 Núcleo Ardente",
            descricao: "Derrote 2 Golems de Lava",
            tipo: "matar",
            alvo: "Golem de Lava",
            qtdNecessaria: 2,
            recompensas: { ouro: 280, xp: 230, item: null }
        },
        {
            id: "v3",
            titulo: "😈 Cinzas Vivas",
            descricao: "Derrote 3 Demônios de Cinzas",
            tipo: "matar",
            alvo: "Demônio de Cinzas",
            qtdNecessaria: 3,
            recompensas: { ouro: 290, xp: 240, item: null }
        },
        {
            id: "v4",
            titulo: "⚔️ Sobrevivente do Magma",
            descricao: "Derrote 9 monstros quaisquer no Vulcão",
            tipo: "matar_qualquer",
            alvo: "vulcao",
            qtdNecessaria: 9,
            recompensas: { ouro: 260, xp: 210, item: null }
        },
        {
            id: "v5",
            titulo: "🏰 Trono de Magma",
            descricao: "Complete a masmorra do Vulcão Infernal",
            tipo: "masmorra",
            alvo: "vulcao",
            qtdNecessaria: 1,
            recompensas: { ouro: 420, xp: 320, item: "Coração de Magma" }
        },

        // === MISSÕES EXPANDIDAS (Lista 2) ===
        {
            id: "vl01",
            titulo: "🔥 Chamas Vivas",
            descricao: "Elementais de fogo escaparam das fissuras vulcânicas. Contenha-os.",
            tipo: "matar",
            alvo: "Elemental de Fogo",
            qtdNecessaria: 3,
            recompensas: { ouro: 320, xp: 260, item: null }
        },
        {
            id: "vl02",
            titulo: "🦎 Caçada Ígnea",
            descricao: "Salamandras destroem tudo com suas chamas. Apague sua fúria.",
            tipo: "matar",
            alvo: "Salamandra Ígnea",
            qtdNecessaria: 5, // DUPLICATA — era 4, alterado para 5
            recompensas: { ouro: 310, xp: 250, item: null }
        },
        {
            id: "vl03",
            titulo: "😈 Travessuras Infernais",
            descricao: "Imps flamejantes causam destruição por diversão. Ensine-lhes uma lição.",
            tipo: "matar",
            alvo: "Imp Flamejante",
            qtdNecessaria: 5,
            recompensas: { ouro: 295, xp: 240, item: null }
        },
        {
            id: "vl04",
            titulo: "🪨 Coleta Vulcânica",
            descricao: "Um ferreiro lendário precisa de rocha fundida para forjar armas supremas.",
            tipo: "coletar",
            alvo: "Rocha Fundida",
            qtdNecessaria: 3,
            recompensas: { ouro: 350, xp: 275, item: null }
        },
        {
            id: "vl05",
            titulo: "🏰 Câmara do Magma",
            descricao: "O Senhor do Magma reina no coração do vulcão. Enfrente o calor supremo.",
            tipo: "masmorra",
            alvo: "vulcao",
            qtdNecessaria: 1,
            recompensas: { ouro: 700, xp: 520, item: null }
        }
    ],

    // ──────────────────────────────────────────────
    // 🏔️ GELEIRA ETERNA (Lv 25-27)
    // ──────────────────────────────────────────────
    geleira: [
        // === MISSÕES ORIGINAIS (Lista 1) ===
        {
            id: "g1",
            titulo: "🐺 Presas Congeladas",
            descricao: "Derrote 4 Lobos do Gelo",
            tipo: "matar",
            alvo: "Lobo do Gelo",
            qtdNecessaria: 4,
            recompensas: { ouro: 300, xp: 245, item: null }
        },
        {
            id: "g2",
            titulo: "🧊 Fragmentos Eternos",
            descricao: "Derrote 3 Elementais de Gelo",
            tipo: "matar",
            alvo: "Elemental de Gelo",
            qtdNecessaria: 3,
            recompensas: { ouro: 310, xp: 255, item: null }
        },
        {
            id: "g3",
            titulo: "🦍 Neve Selvagem",
            descricao: "Derrote 2 Yetis Jovens",
            tipo: "matar",
            alvo: "Yeti Jovem",
            qtdNecessaria: 2,
            recompensas: { ouro: 320, xp: 265, item: null }
        },
        {
            id: "g4",
            titulo: "⚔️ Caçador da Nevasca",
            descricao: "Derrote 9 monstros quaisquer na Geleira",
            tipo: "matar_qualquer",
            alvo: "geleira",
            qtdNecessaria: 9,
            recompensas: { ouro: 290, xp: 235, item: null }
        },
        {
            id: "g5",
            titulo: "🏰 Reino Congelado",
            descricao: "Complete a masmorra da Geleira Eterna",
            tipo: "masmorra",
            alvo: "geleira",
            qtdNecessaria: 1,
            recompensas: { ouro: 450, xp: 340, item: "Coroa de Gelo" }
        },

        // === MISSÕES EXPANDIDAS (Lista 2) ===
        {
            id: "gl01",
            titulo: "❄️ Tempestade Gélida",
            descricao: "Elementais de gelo congelam as passagens montanhosas. Derreta-os.",
            tipo: "matar",
            alvo: "Elemental de Gelo",
            qtdNecessaria: 4, // DUPLICATA — era 3, alterado para 4
            recompensas: { ouro: 350, xp: 280, item: null }
        },
        {
            id: "gl02",
            titulo: "🦍 Fúria do Yeti",
            descricao: "Yetis descem das montanhas atacando aldeias. Detenha a investida.",
            tipo: "matar",
            alvo: "Yeti",
            qtdNecessaria: 3,
            recompensas: { ouro: 375, xp: 300, item: null }
        },
        {
            id: "gl03",
            titulo: "🐺 Matilha Congelante",
            descricao: "Lobos do gelo caçam em matilha. Reduza seus números.",
            tipo: "matar",
            alvo: "Lobo do Gelo",
            qtdNecessaria: 5, // DUPLICATA — era 4, alterado para 5
            recompensas: { ouro: 340, xp: 275, item: null }
        },
        {
            id: "gl04",
            titulo: "⚔️ Sobrevivência Glacial",
            descricao: "O frio é mortal, mas as criaturas são piores. Sobreviva eliminando tudo.",
            tipo: "matar_qualquer",
            alvo: null,
            qtdNecessaria: 10,
            recompensas: { ouro: 380, xp: 310, item: null }
        },
        {
            id: "gl05",
            titulo: "🏰 Palácio de Gelo",
            descricao: "O Rei do Inverno congela tudo ao redor. Quebre seu reinado gelado.",
            tipo: "masmorra",
            alvo: "geleira",
            qtdNecessaria: 1,
            recompensas: { ouro: 720, xp: 540, item: null }
        }
    ],


    // ══════════════════════════════════════════════════════════
    // ████████████████ TIER 4 — CAPÍTULOS 10 a 12 ██████████████
    // ══════════════════════════════════════════════════════════

    // ──────────────────────────────────────────────
    // 👻 CIDADE FANTASMA (Lv 28-30)
    // ──────────────────────────────────────────────
    cidadeFant: [
        // === MISSÕES ORIGINAIS (Lista 1) ===
        {
            id: "cf1",
            titulo: "👻 Assombração nas Ruas",
            descricao: "Derrote 4 Fantasmas Errantes",
            tipo: "matar",
            alvo: "Fantasma Errante",
            qtdNecessaria: 4,
            recompensas: { ouro: 340, xp: 280, item: null }
        },
        {
            id: "cf2",
            titulo: "🪆 Brinquedos Malditos",
            descricao: "Derrote 3 Bonecas Amaldiçoadas",
            tipo: "matar",
            alvo: "Boneca Amaldiçoada",
            qtdNecessaria: 3,
            recompensas: { ouro: 350, xp: 290, item: null }
        },
        {
            id: "cf3",
            titulo: "👰 Último Casamento",
            descricao: "Derrote 3 Noivas Espectrais",
            tipo: "matar",
            alvo: "Noiva Espectral",
            qtdNecessaria: 3,
            recompensas: { ouro: 355, xp: 295, item: null }
        },
        {
            id: "cf4",
            titulo: "⚔️ Expurgo Assombrado",
            descricao: "Derrote 10 monstros quaisquer na Cidade Fantasma",
            tipo: "matar_qualquer",
            alvo: "cidadeFant",
            qtdNecessaria: 10,
            recompensas: { ouro: 320, xp: 270, item: null }
        },
        {
            id: "cf5",
            titulo: "🏰 Senhor da Noite",
            descricao: "Complete a masmorra da Cidade Fantasma",
            tipo: "masmorra",
            alvo: "cidadeFant",
            qtdNecessaria: 1,
            recompensas: { ouro: 500, xp: 380, item: "Medalhão Vampírico" }
        },

        // === MISSÕES EXPANDIDAS (Lista 2) ===
        {
            id: "cf01",
            titulo: "👻 Objetos Voadores",
            descricao: "Poltergeists arremessam destroços em qualquer vivo que entre na cidade.",
            tipo: "matar",
            alvo: "Poltergeist",
            qtdNecessaria: 4,
            recompensas: { ouro: 480, xp: 380, item: null }
        },
        {
            id: "cf02",
            titulo: "🧛 Noite dos Vampiros",
            descricao: "Vampiros menores se alimentam dos poucos sobreviventes. Proteja-os.",
            tipo: "matar",
            alvo: "Vampiro Menor",
            qtdNecessaria: 3,
            recompensas: { ouro: 520, xp: 410, item: null }
        },
        {
            id: "cf03",
            titulo: "😱 Silenciando os Gritos",
            descricao: "Banshees perturbam até os mortos com seus lamentos. Silencie-as.",
            tipo: "matar",
            alvo: "Banshee",
            qtdNecessaria: 3,
            recompensas: { ouro: 540, xp: 420, item: null }
        },
        {
            id: "cf04",
            titulo: "⬛ Caça às Sombras",
            descricao: "Sombras errantes drenam a energia vital de tudo ao redor. Colete seus fragmentos.",
            tipo: "coletar",
            alvo: "Fragmento de Sombra",
            qtdNecessaria: 4,
            recompensas: { ouro: 500, xp: 400, item: null }
        },
        {
            id: "cf05",
            titulo: "🏰 Mansão do Lorde Vampiro",
            descricao: "O Lorde Vampiro governa do alto de sua mansão sombria. Enfrente a escuridão.",
            tipo: "masmorra",
            alvo: "cidadeFant",
            qtdNecessaria: 1,
            recompensas: { ouro: 1100, xp: 750, item: null }
        }
    ],

    // ──────────────────────────────────────────────
    // 🌑 ABISMO SOMBRIO (Lv 31-33)
    // ──────────────────────────────────────────────
    abismo: [
        // === MISSÕES ORIGINAIS (Lista 1) ===
        {
            id: "a1",
            titulo: "👁️ Olhares no Escuro",
            descricao: "Derrote 4 Olhos do Vazio",
            tipo: "matar",
            alvo: "Olho do Vazio",
            qtdNecessaria: 4,
            recompensas: { ouro: 380, xp: 320, item: null }
        },
        {
            id: "a2",
            titulo: "🌑 Fome sem Nome",
            descricao: "Derrote 3 Devoradores Sombrios",
            tipo: "matar",
            alvo: "Devorador Sombrio",
            qtdNecessaria: 3,
            recompensas: { ouro: 390, xp: 330, item: null }
        },
        {
            id: "a3",
            titulo: "🧙 Culto Perdido",
            descricao: "Derrote 3 Cultistas Perdidos",
            tipo: "matar",
            alvo: "Cultista Perdido",
            qtdNecessaria: 3,
            recompensas: { ouro: 400, xp: 340, item: null }
        },
        {
            id: "a4",
            titulo: "⚔️ Profundezas do Abismo",
            descricao: "Derrote 10 monstros quaisquer no Abismo",
            tipo: "matar_qualquer",
            alvo: "abismo",
            qtdNecessaria: 10,
            recompensas: { ouro: 360, xp: 300, item: null }
        },
        {
            id: "a5",
            titulo: "🏰 Eco do Deus Antigo",
            descricao: "Complete a masmorra do Abismo Sombrio",
            tipo: "masmorra",
            alvo: "abismo",
            qtdNecessaria: 1,
            recompensas: { ouro: 560, xp: 420, item: "Tentáculo Divino" }
        },

        // === MISSÕES EXPANDIDAS (Lista 2) ===
        {
            id: "ab01",
            titulo: "😈 Demônios nas Trevas",
            descricao: "Demônios menores cruzaram o véu entre mundos. Empurre-os de volta.",
            tipo: "matar",
            alvo: "Demônio Menor",
            qtdNecessaria: 4,
            recompensas: { ouro: 560, xp: 440, item: null }
        },
        {
            id: "ab02",
            titulo: "👁️ Olhos na Escuridão",
            descricao: "Olhos flutuantes vigiam cada movimento. Cegue os observadores.",
            tipo: "matar",
            alvo: "Olho Flutuante",
            qtdNecessaria: 3,
            recompensas: { ouro: 580, xp: 460, item: null }
        },
        {
            id: "ab03",
            titulo: "🐙 Raízes do Horror",
            descricao: "Tentáculos abissais emergem das fendas. Corte cada um deles.",
            tipo: "matar",
            alvo: "Tentáculo Abissal",
            qtdNecessaria: 4,
            recompensas: { ouro: 600, xp: 475, item: null }
        },
        {
            id: "ab04",
            titulo: "🌀 Realidade Distorcida",
            descricao: "Aberrações caóticas desestabilizam a realidade. Restaure a ordem.",
            tipo: "matar",
            alvo: "Aberração Caótica",
            qtdNecessaria: 3,
            recompensas: { ouro: 620, xp: 490, item: null }
        },
        {
            id: "ab05",
            titulo: "🏰 Templo de Cthar",
            descricao: "O Deus Antigo desperta nas profundezas do abismo. Impeça o apocalipse.",
            tipo: "masmorra",
            alvo: "abismo",
            qtdNecessaria: 1,
            recompensas: { ouro: 1200, xp: 820, item: null }
        }
    ],

    // ──────────────────────────────────────────────
    // 🏰 CASTELO AMALDIÇOADO (Lv 34-36)
    // ──────────────────────────────────────────────
    castelo: [
        // === MISSÕES ORIGINAIS (Lista 1) ===
        {
            id: "ct1",
            titulo: "🛡️ Guarda Caída",
            descricao: "Derrote 3 Cavaleiros Amaldiçoados",
            tipo: "matar",
            alvo: "Cavaleiro Amaldiçoado",
            qtdNecessaria: 3,
            recompensas: { ouro: 420, xp: 350, item: null }
        },
        {
            id: "ct2",
            titulo: "🗿 Sombras no Alto",
            descricao: "Derrote 3 Gárgulas Sombrias",
            tipo: "matar",
            alvo: "Gárgula Sombria",
            qtdNecessaria: 3,
            recompensas: { ouro: 430, xp: 360, item: null }
        },
        {
            id: "ct3",
            titulo: "🧙 Magia Corrompida",
            descricao: "Derrote 2 Magos Corrompidos",
            tipo: "matar",
            alvo: "Mago Corrompido",
            qtdNecessaria: 2,
            recompensas: { ouro: 440, xp: 370, item: null }
        },
        {
            id: "ct4",
            titulo: "⚔️ Corredores do Castelo",
            descricao: "Derrote 10 monstros quaisquer no Castelo",
            tipo: "matar_qualquer",
            alvo: "castelo",
            qtdNecessaria: 10,
            recompensas: { ouro: 400, xp: 335, item: null }
        },
        {
            id: "ct5",
            titulo: "🏰 O Rei Lich",
            descricao: "Complete a masmorra do Castelo Amaldiçoado",
            tipo: "masmorra",
            alvo: "castelo",
            qtdNecessaria: 1,
            recompensas: { ouro: 620, xp: 460, item: "Filactério Eterno" }
        },

        // === MISSÕES EXPANDIDAS (Lista 2) ===
        {
            id: "cs01",
            titulo: "⚔️ Cavaleiros Caídos",
            descricao: "Cavaleiros que juraram proteger o rei agora servem à maldição. Liberte-os.",
            tipo: "matar",
            alvo: "Cavaleiro Maldito",
            qtdNecessaria: 4,
            recompensas: { ouro: 640, xp: 500, item: null }
        },
        {
            id: "cs02",
            titulo: "🗿 Guardiãs de Pedra",
            descricao: "Gárgulas protegem as torres. Destrua-as para avançar.",
            tipo: "matar",
            alvo: "Gárgula",
            qtdNecessaria: 3,
            recompensas: { ouro: 620, xp: 490, item: null }
        },
        {
            id: "cs03",
            titulo: "🦁 Bestas Quiméricas",
            descricao: "Quimeras patrulham os corredores do castelo. Prove seu valor.",
            tipo: "matar",
            alvo: "Quimera",
            qtdNecessaria: 3,
            recompensas: { ouro: 680, xp: 530, item: null }
        },
        {
            id: "cs04",
            titulo: "📕 Grimórios Proibidos",
            descricao: "Magos corrompidos guardam grimórios de poder sombrio. Tome-os.",
            tipo: "coletar",
            alvo: "Grimório Negro",
            qtdNecessaria: 2,
            recompensas: { ouro: 720, xp: 550, item: null }
        },
        {
            id: "cs05",
            titulo: "🏰 Sala do Trono Maldito",
            descricao: "O Rei Lich Eterno espera no trono. Quebre a maldição de uma vez por todas.",
            tipo: "masmorra",
            alvo: "castelo",
            qtdNecessaria: 1,
            recompensas: { ouro: 1350, xp: 900, item: null }
        }
    ],


    // ══════════════════════════════════════════════════════════
    // ████████████████ TIER 5 — CAPÍTULOS 13 a 15 ██████████████
    // ══════════════════════════════════════════════════════════

    // ──────────────────────────────────────────────
    // 🌌 PLANO ASTRAL (Lv 37-39)
    // ──────────────────────────────────────────────
    planoAstral: [
        // === MISSÕES ORIGINAIS (Lista 1) ===
        {
            id: "pa1",
            titulo: "👁️ Vigilantes Celestes",
            descricao: "Derrote 3 Observadores Menores",
            tipo: "matar",
            alvo: "Observador Menor",
            qtdNecessaria: 3,
            recompensas: { ouro: 470, xp: 390, item: null }
        },
        {
            id: "pa2",
            titulo: "🌟 Poeira das Estrelas",
            descricao: "Derrote 4 Fragmentos Estelares",
            tipo: "matar",
            alvo: "Fragmento Estelar",
            qtdNecessaria: 4,
            recompensas: { ouro: 480, xp: 400, item: null }
        },
        {
            id: "pa3",
            titulo: "🐍 Constelação Viva",
            descricao: "Derrote 3 Serpentes Cósmicas",
            tipo: "matar",
            alvo: "Serpente Cósmica",
            qtdNecessaria: 3,
            recompensas: { ouro: 490, xp: 410, item: null }
        },
        {
            id: "pa4",
            titulo: "⚔️ Rachadura Dimensional",
            descricao: "Derrote 11 monstros quaisquer no Plano Astral",
            tipo: "matar_qualquer",
            alvo: "planoAstral",
            qtdNecessaria: 11,
            recompensas: { ouro: 450, xp: 380, item: null }
        },
        {
            id: "pa5",
            titulo: "🏰 Além da Realidade",
            descricao: "Complete a masmorra do Plano Astral",
            tipo: "masmorra",
            alvo: "planoAstral",
            qtdNecessaria: 1,
            recompensas: { ouro: 700, xp: 520, item: "Olho da Eternidade" }
        },

        // === MISSÕES EXPANDIDAS (Lista 2) ===
        {
            id: "pa01",
            titulo: "🌫️ Névoa Etérea",
            descricao: "Seres etéreos distorcem o espaço-tempo ao redor. Purifique a área.",
            tipo: "matar",
            alvo: "Ser Etéreo",
            qtdNecessaria: 4,
            recompensas: { ouro: 820, xp: 620, item: null }
        },
        {
            id: "pa02",
            titulo: "😇 Graça Corrompida",
            descricao: "Anjos caídos que abandonaram a luz. Conceda-lhes o descanso final.",
            tipo: "matar",
            alvo: "Anjo Caído",
            qtdNecessaria: 4, // DUPLICATA (mesmo nome no tronoDeus Lista 1) — era 3, alterado para 4
            recompensas: { ouro: 880, xp: 660, item: null }
        },
        {
            id: "pa03",
            titulo: "🧠 Predadores Mentais",
            descricao: "Devoradores de mentes caçam consciências. Proteja sua sanidade.",
            tipo: "matar",
            alvo: "Devorador de Mentes",
            qtdNecessaria: 3,
            recompensas: { ouro: 850, xp: 640, item: null }
        },
        {
            id: "pa04",
            titulo: "⭐ Poeira das Estrelas",
            descricao: "Colete poeira estelar dos fragmentos destruídos para forjar armas cósmicas.",
            tipo: "coletar",
            alvo: "Poeira Estelar",
            qtdNecessaria: 4,
            recompensas: { ouro: 900, xp: 680, item: null }
        },
        {
            id: "pa05",
            titulo: "🏰 O Grande Observador",
            descricao: "O Observador Supremo viu sua chegada há eons. O destino cobra seu preço.",
            tipo: "masmorra",
            alvo: "planoAstral",
            qtdNecessaria: 1,
            recompensas: { ouro: 1800, xp: 1200, item: null }
        }
    ],

    // ──────────────────────────────────────────────
    // 🔥 INFERNUS (Lv 40-42)
    // ──────────────────────────────────────────────
    infernus: [
        // === MISSÕES ORIGINAIS (Lista 1) ===
        {
            id: "i1",
            titulo: "😈 Chamas Menores",
            descricao: "Derrote 4 Diabretes Flamejantes",
            tipo: "matar",
            alvo: "Diabrete Flamejante",
            qtdNecessaria: 4,
            recompensas: { ouro: 540, xp: 450, item: null }
        },
        {
            id: "i2",
            titulo: "🔥 Matilha Infernal",
            descricao: "Derrote 3 Cães Infernais",
            tipo: "matar",
            alvo: "Cão Infernal",
            qtdNecessaria: 3,
            recompensas: { ouro: 550, xp: 460, item: null }
        },
        {
            id: "i3",
            titulo: "⚔️ Legião Abissal",
            descricao: "Derrote 3 Guerreiros Abissais",
            tipo: "matar",
            alvo: "Guerreiro Abissal",
            qtdNecessaria: 3,
            recompensas: { ouro: 565, xp: 475, item: null }
        },
        {
            id: "i4",
            titulo: "⚔️ Sobrevivente de Infernus",
            descricao: "Derrote 12 monstros quaisquer em Infernus",
            tipo: "matar_qualquer",
            alvo: "infernus",
            qtdNecessaria: 12,
            recompensas: { ouro: 520, xp: 430, item: null }
        },
        {
            id: "i5",
            titulo: "🏰 Trono do Demônio",
            descricao: "Complete a masmorra de Infernus",
            tipo: "masmorra",
            alvo: "infernus",
            qtdNecessaria: 1,
            recompensas: { ouro: 800, xp: 600, item: "Coroa do Inferno" }
        },

        // === MISSÕES EXPANDIDAS (Lista 2) ===
        {
            id: "if01",
            titulo: "👹 Legião de Guerra",
            descricao: "Demônios de guerra marcham para o mundo mortal. Quebre sua formação.",
            tipo: "matar",
            alvo: "Demônio de Guerra",
            qtdNecessaria: 4,
            recompensas: { ouro: 1000, xp: 750, item: null }
        },
        {
            id: "if02",
            titulo: "😈 Sussurros Sedutores",
            descricao: "Súcubos corrompem almas com promessas vazias. Resista e destrua-os.",
            tipo: "matar",
            alvo: "Súcubo Tentador",
            qtdNecessaria: 3,
            recompensas: { ouro: 980, xp: 730, item: null }
        },
        {
            id: "if03",
            titulo: "🐕 Matilha Infernal Avançada",
            descricao: "Cães infernais farejam sua alma. Caçe antes de ser caçado.",
            tipo: "matar",
            alvo: "Cão Infernal",
            qtdNecessaria: 5, // DUPLICATA — era 4, alterado para 5
            recompensas: { ouro: 960, xp: 720, item: null }
        },
        {
            id: "if04",
            titulo: "⛓️ Almas Perdidas",
            descricao: "Almas condenadas vagam sem propósito. Colete seus grilhões partidos para liberá-las.",
            tipo: "coletar",
            alvo: "Grilhão Partido",
            qtdNecessaria: 4,
            recompensas: { ouro: 1050, xp: 780, item: null }
        },
        {
            id: "if05",
            titulo: "🏰 Trono do Príncipe",
            descricao: "O Príncipe Demônio espera no centro do Infernus. O confronto supremo.",
            tipo: "masmorra",
            alvo: "infernus",
            qtdNecessaria: 1,
            recompensas: { ouro: 2200, xp: 1400, item: null }
        }
    ],

    // ──────────────────────────────────────────────
    // ⚡ TRONO DOS DEUSES (Lv 43-45)
    // ──────────────────────────────────────────────
    tronoDeus: [
        // === MISSÕES ORIGINAIS (Lista 1) ===
        {
            id: "td1",
            titulo: "😇 Luz Corrompida",
            descricao: "Derrote 3 Anjos Caídos",
            tipo: "matar",
            alvo: "Anjo Caído",
            qtdNecessaria: 3,
            recompensas: { ouro: 620, xp: 520, item: null }
        },
        {
            id: "td2",
            titulo: "⚖️ Julgamento Quebrado",
            descricao: "Derrote 2 Juízes Celestiais Corrompidos",
            tipo: "matar",
            alvo: "Juiz Celestial Corrompido",
            qtdNecessaria: 2,
            recompensas: { ouro: 640, xp: 540, item: null }
        },
        {
            id: "td3",
            titulo: "⚡ Arautos do Fim",
            descricao: "Derrote 3 Arautos do Fim",
            tipo: "matar",
            alvo: "Arauto do Fim",
            qtdNecessaria: 3,
            recompensas: { ouro: 660, xp: 560, item: null }
        },
        {
            id: "td4",
            titulo: "⚔️ Último Desafio",
            descricao: "Derrote 12 monstros quaisquer no Trono dos Deuses",
            tipo: "matar_qualquer",
            alvo: "tronoDeus",
            qtdNecessaria: 12,
            recompensas: { ouro: 600, xp: 500, item: null }
        },
        {
            id: "td5",
            titulo: "🏰 Fim dos Deuses",
            descricao: "Complete a masmorra do Trono dos Deuses",
            tipo: "masmorra",
            alvo: "tronoDeus",
            qtdNecessaria: 1,
            recompensas: { ouro: 1000, xp: 800, item: "Essência Divina" }
        },

        // === MISSÕES EXPANDIDAS (Lista 2) ===
        {
            id: "td01",
            titulo: "👼 Serafins Decaídos",
            descricao: "Serafins corrompidos guardam os portões celestiais. Abra o caminho.",
            tipo: "matar",
            alvo: "Serafim Corrompido",
            qtdNecessaria: 4,
            recompensas: { ouro: 1200, xp: 900, item: null }
        },
        {
            id: "td02",
            titulo: "🗿 Titãs do Alvorecer",
            descricao: "Titãs menores despertaram de seu sono milenar. Derrube os colossos.",
            tipo: "matar",
            alvo: "Titã Menor",
            qtdNecessaria: 3,
            recompensas: { ouro: 1350, xp: 1000, item: null }
        },
        {
            id: "td03",
            titulo: "🌀 Avatares do Caos",
            descricao: "A realidade se despedaça ao redor dos Avatares. Restaure a ordem cósmica.",
            tipo: "matar",
            alvo: "Avatar do Caos",
            qtdNecessaria: 3,
            recompensas: { ouro: 1400, xp: 1050, item: null }
        },
        {
            id: "td04",
            titulo: "⚡ Destruição Divina",
            descricao: "O trono é protegido por guardiões e arautos. Elimine todos que se interpõem.",
            tipo: "matar_qualquer",
            alvo: null,
            qtdNecessaria: 12,
            recompensas: { ouro: 1500, xp: 1100, item: null }
        },
        {
            id: "td05",
            titulo: "🏰 O Confronto Final",
            descricao: "O Deus Corrompido Axiom distorce toda a criação. Esta é a batalha que definirá o destino do mundo.",
            tipo: "masmorra",
            alvo: "tronoDeus",
            qtdNecessaria: 1,
            recompensas: { ouro: 2500, xp: 1500, item: null }
        }
    ]
};
// ============================================
// SEÇÃO 8: MASMORRA
// ============================================

function iniciarMasmorra() {
    if (player.hp <= 0) {
        mostrarNotificacao("❤️ Precisa de HP!");
        return;
    }

    gameState.emMasmorra = true;
    gameState.dungeonFloor = 0;
    gameState.dungeonMaxFloor = areas[gameState.areaAtual].dungeonAndares || 5;

    var dt = document.getElementById("dungeonTitle");
    if (dt) dt.textContent = "🏰 " + areas[gameState.areaAtual].nome;

    var mf = document.getElementById("dungeonMaxFloor");
    if (mf) mf.textContent = gameState.dungeonMaxFloor;

    var df = document.getElementById("dungeonFloor");
    if (df) df.textContent = "0";

    var pb = document.getElementById("dungeonProgressBar");
    if (pb) pb.style.width = "0%";

    var ei = document.getElementById("dungeonEventIcon");
    if (ei) ei.textContent = "🚪";

    var et = document.getElementById("dungeonEventText");
    if (et) et.innerHTML = "Entrada da masmorra...";

    resetarBotaoAvancar();
    mostrarPainelFullscreen("dungeonPanel");
}

function resetarBotaoAvancar() {
    var b = document.getElementById("btnDungeonAdvance");
    if (b) {
        b.textContent = "🚪 Avançar";
        b.onclick = avancarMasmorra;
    }
}

function avancarMasmorra() {
    gameState.dungeonFloor++;

    var df = document.getElementById("dungeonFloor");
    if (df) df.textContent = gameState.dungeonFloor;

    var pb = document.getElementById("dungeonProgressBar");
    if (pb) pb.style.width = (gameState.dungeonFloor / gameState.dungeonMaxFloor * 100) + "%";

    if (gameState.dungeonFloor >= gameState.dungeonMaxFloor) {
        mostrarBossMasmorra();
        return;
    }

    processarEventoMasmorra();
}

function mostrarBossMasmorra() {
    var boss = bossesMasmorra[gameState.areaAtual];

    var ei = document.getElementById("dungeonEventIcon");
    if (ei) ei.textContent = boss.emoji;

    var et = document.getElementById("dungeonEventText");
    if (et) et.innerHTML = '<strong style="color:#ff4444;">⚠️ CHEFE!</strong><br>' + boss.name + '!';

    var b = document.getElementById("btnDungeonAdvance");
    if (b) {
        b.textContent = "⚔️ ENFRENTAR";
        b.onclick = function() {
            gameState.combateOrigem = "masmorraBoss";
            iniciarCombate(boss, true);
            resetarBotaoAvancar();
        };
    }
}

function processarEventoMasmorra() {
    var ev = randomChoice(eventosMasmorra[gameState.areaAtual]);
    var ei = document.getElementById("dungeonEventIcon");
    if (ei) ei.textContent = ev.icone;

    var et = document.getElementById("dungeonEventText");

    switch (ev.tipo) {
        case "combate":
            if (et) et.innerHTML = '<strong style="color:#ff6666;">⚔️ ENCONTRO!</strong><br>' + ev.texto;
            var m = randomChoice(bancoDeMonstros[gameState.areaAtual]);
            var b = document.getElementById("btnDungeonAdvance");
            if (b) {
                b.textContent = "⚔️ Combater!";
                b.onclick = function() {
                    gameState.combateOrigem = "masmorra";
                    iniciarCombate(m, false);
                    resetarBotaoAvancar();
                };
            }
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
            updateUI();
            break;

        case "armadilha":
            var dano = Math.floor(randomInt(ev.dano[0], ev.dano[1]) * calcularReducaoArmadilha());
            player.hp = Math.max(0, player.hp - dano);

            if (et) et.innerHTML = '<strong style="color:#ff4444;">⚠️ ARMADILHA!</strong><br>' + ev.texto + '<br>💔 -' + dano + ' HP!';
            updateUI();
            break;

        case "descanso":
            var cura = Math.floor(randomInt(ev.cura[0], ev.cura[1]) * calcularMultiplicadorCura());
            var cr = Math.min(cura, player.maxHp - player.hp);
            player.hp = Math.min(player.hp + cura, player.maxHp);

            if (et) et.innerHTML = '<strong style="color:#66ff66;">💚 DESCANSO!</strong><br>' + ev.texto + '<br>❤️ +' + cr + ' HP!';
            updateUI();
            break;

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
            updateUI();
            break;

        case "nada":
            if (et) et.innerHTML = '<strong style="color:#888;">🌫️ VAZIO</strong><br>' + ev.texto;
            break;
    }
}

function sairMasmorra() {
    gameState.emMasmorra = false;
    resetarBotaoAvancar();
    mostrarPainelFullscreen("areaOptionsPanel");
}

function completarMasmorra() {
    gameState.emMasmorra = false;

    var area = areas[gameState.areaAtual];
    var idx = area ? area.tier : 1;
    var ouro = randomInt(50, 150) * idx;

    player.gold += ouro;

    if (typeof estatisticas !== "undefined") {
        estatisticas.masmorrasCompletas++;
    }

    if (typeof verificarProgressoMissao === "function") {
        verificarProgressoMissao("masmorra_completa", { area: gameState.areaAtual });
    }

    if (typeof verificarConquistas === "function") {
        verificarConquistas();
    }

    resetarBotaoAvancar();
    updateUI();

      setTimeout(function() {
        if (typeof encerrarLayoutCombateExpandido === "function") {
            encerrarLayoutCombateExpandido();
        }

        if (typeof limparCombate === "function") {
            limparCombate();
        }

        mostrarPainelFullscreen("areaOptionsPanel");
    }, 3000);
}
// ============================================
// SEÇÃO 9: EVENTOS ALEATÓRIOS
// ============================================

var CHANCE_EVENTO = 0.18;

var eventosAleatorios = [
    {
        id: "mercador_ambulante",
        titulo: "🎒 Mercador Ambulante",
        icone: "🧙‍♂️",
        descricao: "Um mercador misterioso aparece no caminho...",
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
                    return { sucesso: true, msg: "🧪 Comprou uma Poção Média por 30 ouro!" };
                }
            }
        ]
    }
    // você pode continuar expandindo os outros eventos aqui
];


// ============================================
// SEÇÃO 10: MINERAÇÃO
// ============================================

var mineracaoState = {
    tentativas: 3,
    maxTentativas: 3,
    areaAtual: null
};

var mineriosPorArea = {
    floresta: {
        nome: "Mina da Floresta",
        custo: 10,
        minerios: [
            { nome: "Minério de Cobre", icone: "🟤", chance: 0.55, raro: false },
            { nome: "Minério de Estanho", icone: "⬜", chance: 0.30, raro: false },
            { nome: "Pepita de Prata", icone: "🥈", chance: 0.10, raro: true }
        ]
    },
    pantano: {
        nome: "Mina do Pântano",
        custo: 10,
        minerios: [
            { nome: "Minério de Cobre", icone: "🟤", chance: 0.50, raro: false },
            { nome: "Minério de Estanho", icone: "⬜", chance: 0.30, raro: false },
            { nome: "Pedra Pantanosa", icone: "🟢", chance: 0.15, raro: false },
            { nome: "Pepita de Prata", icone: "🥈", chance: 0.08, raro: true }
        ]
    }
    // continue com as outras áreas se quiser
};


function abrirExploracao() {
    if (typeof atualizarLockAreas === "function") atualizarLockAreas();
    if (typeof mostrarPainel === "function") mostrarPainelFullscreen("areaSelectionPanel");

    const container = document.getElementById("areasContainer");
    if (container) {
        // Se quiser usar o grid padrão em vez do mapa visual:
        container.classList.remove("mapa-visual");
    }

    if (typeof renderizarMapaVisual === "function") {
        renderizarMapaVisual();
    }
}

function voltarDaExploracao() {
    if (typeof voltarMenuPrincipal === "function") {
        voltarMenuPrincipal();
    }
}

// ============================================
// SEÇÃO 13: EVENTOS ALEATÓRIOS
// ============================================

var eventosAleatorios = [
    // 1
    {
        id: "mercador_ambulante",
        titulo: "🎒 Mercador Ambulante",
        icone: "🧙‍♂️",
        descricao: "Um mercador misterioso aparece no caminho. 'Tenho algo especial para você, por um preço justo...'",
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
                    adicionarItemInventario("Poção Média", "🧪", 1, {
                        tipo: "consumivel",
                        efeito: { tipo: "cura", valor: 100 }
                    });
                    return { sucesso: true, msg: "🧪 Comprou uma Poção Média por 30 ouro!" };
                }
            },
            {
                texto: "Negociar agressivamente",
                hint: "Carisma decide: desconto ou expulsão",
                classe: "evento-btn-arriscar",
                icone: "🗣️",
                acao: function() {
                    if (Math.random() < 0.30 + player.carisma * 0.03) {
                        adicionarItemInventario("Poção Média", "🧪", 1, {
                            tipo: "consumivel",
                            efeito: { tipo: "cura", valor: 100 }
                        });
                        return { sucesso: true, msg: "🗣️ Seu carisma impressionou! Ganhou a poção de graça!" };
                    }
                    return { sucesso: false, msg: "😤 O mercador se ofende e vai embora." };
                }
            },
            {
                texto: "Ignorar",
                hint: "Seguir caminho",
                classe: "evento-btn-ignorar",
                icone: "🚶",
                acao: function() {
                    return { sucesso: true, msg: "Você ignora o mercador e segue em frente." };
                }
            }
        ]
    },

    // 2
    {
        id: "viajante_ferido",
        titulo: "🤕 Viajante Ferido",
        icone: "🩹",
        descricao: "Você encontra um viajante ferido na beira do caminho. Ele parece desesperado, mas pode ser uma armadilha.",
        nivelMin: 1,
        escolhas: [
            {
                texto: "Ajudar o viajante",
                hint: "Gasta 1 poção, pode ganhar recompensa",
                classe: "evento-btn-aceitar",
                icone: "❤️",
                acao: function() {
                    if (player.potions <= 0) return { sucesso: false, msg: "❌ Você não tem poções!" };
                    player.potions--;
                    var ouro = randomInt(20, 50);
                    player.gold += ouro;
                    return { sucesso: true, msg: "❤️ O viajante agradece e te dá " + ouro + " ouro!" };
                }
            },
            {
                texto: "Revistar os pertences",
                hint: "Risco de emboscada",
                classe: "evento-btn-arriscar",
                icone: "🔍",
                acao: function() {
                    if (Math.random() < 0.40) {
                        var dano = randomInt(10, 25);
                        player.hp = Math.max(1, player.hp - dano);
                        return { sucesso: false, msg: "⚠️ ERA UMA EMBOSCADA! -" + dano + " HP!" };
                    }
                    var ouro = randomInt(30, 70);
                    player.gold += ouro;
                    return { sucesso: true, msg: "🔍 Você encontra " + ouro + " ouro nos pertences." };
                }
            },
            {
                texto: "Ignorar",
                hint: "Seguro",
                classe: "evento-btn-ignorar",
                icone: "🚶",
                acao: function() {
                    return { sucesso: true, msg: "Você segue sem olhar para trás." };
                }
            }
        ]
    },

    // 3
    {
        id: "altar_misterioso",
        titulo: "⛩️ Altar Misterioso",
        icone: "🕯️",
        descricao: "Um altar antigo brilha com uma luz sobrenatural.",
        nivelMin: 3,
        escolhas: [
            {
                texto: "Oferenda pequena",
                hint: "30 ouro para restaurar HP",
                classe: "evento-btn-aceitar",
                icone: "💰",
                acao: function() {
                    if (player.gold < 30) return { sucesso: false, msg: "❌ Ouro insuficiente!" };
                    player.gold -= 30;
                    player.hp = player.maxHp;
                    return { sucesso: true, msg: "✨ O altar restaura seu HP completamente!" };
                }
            },
            {
                texto: "Oferenda grande",
                hint: "100 ouro: bênção ou maldição",
                classe: "evento-btn-arriscar",
                icone: "💎",
                acao: function() {
                    if (player.gold < 100) return { sucesso: false, msg: "❌ Ouro insuficiente!" };
                    player.gold -= 100;
                    if (Math.random() < 0.65) {
                        var bonus = randomInt(1, 3);
                        player.forca += bonus;
                        if (typeof aplicarBonusEquipamentos === "function") aplicarBonusEquipamentos();
                        return { sucesso: true, msg: "🌟 Força +" + bonus + " permanente!" };
                    }
                    var dano = randomInt(20, 40);
                    player.hp = Math.max(1, player.hp - dano);
                    return { sucesso: false, msg: "💀 O altar te amaldiçoa! -" + dano + " HP!" };
                }
            },
            {
                texto: "Não tocar",
                hint: "Seguro",
                classe: "evento-btn-ignorar",
                icone: "🚶",
                acao: function() {
                    return { sucesso: true, msg: "Você resiste à tentação." };
                }
            }
        ]
    },

    // 4
    {
        id: "bau_trancado",
        titulo: "🔒 Baú Trancado",
        icone: "📦",
        descricao: "Um baú coberto de runas bloqueia o caminho.",
        nivelMin: 5,
        escolhas: [
            {
                texto: "Forçar o baú",
                hint: "Força decide",
                classe: "evento-btn-arriscar",
                icone: "💪",
                acao: function() {
                    if (Math.random() < 0.30 + player.forca * 0.02) {
                        var ouro = randomInt(40, 100);
                        player.gold += ouro;
                        return { sucesso: true, msg: "💪 Você quebra a fechadura! +" + ouro + " ouro!" };
                    }
                    var dano = randomInt(15, 30);
                    player.hp = Math.max(1, player.hp - dano);
                    return { sucesso: false, msg: "💥 Armadilha! -" + dano + " HP!" };
                }
            },
            {
                texto: "Decifrar as runas",
                hint: "Sabedoria decide",
                classe: "evento-btn-aceitar",
                icone: "📖",
                acao: function() {
                    if (Math.random() < 0.30 + player.sabedoria * 0.03) {
                        var ouro = randomInt(60, 120);
                        player.gold += ouro;
                        return { sucesso: true, msg: "📖 Você abre o baú sem ativar armadilhas! +" + ouro + " ouro!" };
                    }
                    return { sucesso: false, msg: "📖 As runas são complexas demais." };
                }
            },
            {
                texto: "Deixar pra lá",
                hint: "Seguro",
                classe: "evento-btn-ignorar",
                icone: "🚶",
                acao: function() {
                    return { sucesso: true, msg: "Melhor não arriscar." };
                }
            }
        ]
    },

    // 5
    {
        id: "duende_trapaceiro",
        titulo: "🃏 Duende Trapaceiro",
        icone: "🧝",
        descricao: "Um duende oferece uma aposta duvidosa.",
        nivelMin: 3,
        escolhas: [
            {
                texto: "Apostar 50 ouro",
                hint: "50% chance de dobrar",
                classe: "evento-btn-arriscar",
                icone: "🎲",
                acao: function() {
                    if (player.gold < 50) return { sucesso: false, msg: "❌ Você não tem ouro suficiente." };
                    if (Math.random() < 0.50) {
                        player.gold += 50;
                        return { sucesso: true, msg: "🎉 Você venceu! Ganhou 50 ouro!" };
                    }
                    player.gold -= 50;
                    return { sucesso: false, msg: "😈 O duende foge com seus 50 ouro!" };
                }
            },
            {
                texto: "Apostar 150 ouro",
                hint: "45% chance de dobrar",
                classe: "evento-btn-arriscar",
                icone: "💰",
                acao: function() {
                    if (player.gold < 150) return { sucesso: false, msg: "❌ Ouro insuficiente!" };
                    if (Math.random() < 0.45) {
                        player.gold += 150;
                        return { sucesso: true, msg: "🤑 JACKPOT! Você ganha 150 ouro!" };
                    }
                    player.gold -= 150;
                    return { sucesso: false, msg: "😈 O duende some com seu dinheiro." };
                }
            },
            {
                texto: "Recusar",
                hint: "Seguro",
                classe: "evento-btn-ignorar",
                icone: "✋",
                acao: function() {
                    return { sucesso: true, msg: "Você ignora o duende." };
                }
            }
        ]
    },

    // 6
    {
        id: "fonte_magica",
        titulo: "⛲ Fonte Mágica",
        icone: "💧",
        descricao: "Uma fonte cristalina pulsa com energia arcana.",
        nivelMin: 8,
        escolhas: [
            {
                texto: "Beber a água",
                hint: "Efeito aleatório",
                classe: "evento-btn-arriscar",
                icone: "💧",
                acao: function() {
                    var efeito = Math.random();
                    if (efeito < 0.40) {
                        player.hp = player.maxHp;
                        return { sucesso: true, msg: "💧 A fonte te curou completamente!" };
                    } else if (efeito < 0.70) {
                        var bonus = randomInt(1, 2);
                        player.vigor += bonus;
                        if (typeof aplicarBonusEquipamentos === "function") aplicarBonusEquipamentos();
                        return { sucesso: true, msg: "💪 Vigor +" + bonus + " permanente!" };
                    } else {
                        var dano = randomInt(20, 40);
                        player.hp = Math.max(1, player.hp - dano);
                        return { sucesso: false, msg: "🤢 A água estava amaldiçoada! -" + dano + " HP!" };
                    }
                }
            },
            {
                texto: "Encher frasco",
                hint: "Ganha 1 poção",
                classe: "evento-btn-aceitar",
                icone: "🧪",
                acao: function() {
                    player.potions++;
                    return { sucesso: true, msg: "🧪 Você ganhou +1 poção!" };
                }
            },
            {
                texto: "Ignorar",
                hint: "Seguro",
                classe: "evento-btn-ignorar",
                icone: "🚶",
                acao: function() {
                    return { sucesso: true, msg: "Você segue em frente." };
                }
            }
        ]
    },

    // 7 NOVO
    {
        id: "estatua_antiga",
        titulo: "🗿 Estátua Antiga",
        icone: "🗿",
        descricao: "Uma estátua coberta de musgo segura uma gema brilhante.",
        nivelMin: 2,
        escolhas: [
            {
                texto: "Retirar a gema",
                hint: "Pode ser valiosa... ou amaldiçoada",
                classe: "evento-btn-arriscar",
                icone: "💎",
                acao: function() {
                    if (Math.random() < 0.55) {
                        player.gold += 80;
                        return { sucesso: true, msg: "💎 A gema vale 80 ouro!" };
                    }
                    player.hp = Math.max(1, player.hp - 20);
                    return { sucesso: false, msg: "🗿 A estátua desaba! -20 HP!" };
                }
            },
            {
                texto: "Rezar diante da estátua",
                hint: "Pequena bênção",
                classe: "evento-btn-aceitar",
                icone: "🙏",
                acao: function() {
                    player.hp = Math.min(player.maxHp, player.hp + 20);
                    return { sucesso: true, msg: "🙏 Você sente paz. +20 HP." };
                }
            },
            {
                texto: "Seguir viagem",
                hint: "Seguro",
                classe: "evento-btn-ignorar",
                icone: "🚶",
                acao: function() { return { sucesso: true, msg: "Você ignora a estátua." }; }
            }
        ]
    },

    // 8 NOVO
    {
        id: "andarilho_sabio",
        titulo: "🧙 Andarilho Sábio",
        icone: "📜",
        descricao: "Um velho viajante oferece um ensinamento em troca de atenção.",
        nivelMin: 4,
        escolhas: [
            {
                texto: "Ouvir atentamente",
                hint: "Pode ganhar XP",
                classe: "evento-btn-aceitar",
                icone: "📖",
                acao: function() {
                    var xp = randomInt(25, 60);
                    ganharExp(xp);
                    return { sucesso: true, msg: "📖 Você aprende algo valioso. +" + xp + " XP!" };
                }
            },
            {
                texto: "Questionar o sábio",
                hint: "Carisma ou sabedoria podem render ouro",
                classe: "evento-btn-arriscar",
                icone: "🗣️",
                acao: function() {
                    if (Math.random() < 0.25 + player.sabedoria * 0.02) {
                        var ouro = randomInt(40, 90);
                        player.gold += ouro;
                        return { sucesso: true, msg: "🧙 O sábio te recompensa com " + ouro + " ouro." };
                    }
                    return { sucesso: false, msg: "😐 O sábio não gosta do seu tom e vai embora." };
                }
            },
            {
                texto: "Ignorar",
                hint: "Sem risco",
                classe: "evento-btn-ignorar",
                icone: "🚶",
                acao: function() { return { sucesso: true, msg: "Você não tem tempo para parábolas." }; }
            }
        ]
    },

    // 9 NOVO
    {
        id: "animal_ferido",
        titulo: "🦌 Animal Ferido",
        icone: "🦌",
        descricao: "Um animal ferido te observa com medo.",
        nivelMin: 2,
        escolhas: [
            {
                texto: "Ajudar o animal",
                hint: "Pequena bênção",
                classe: "evento-btn-aceitar",
                icone: "❤️",
                acao: function() {
                    player.carisma += 1;
                    return { sucesso: true, msg: "🦌 O animal se recupera e te inspira. +1 Carisma!" };
                }
            },
            {
                texto: "Caçar o animal",
                hint: "Pode render comida",
                classe: "evento-btn-arriscar",
                icone: "🏹",
                acao: function() {
                    adicionarItemInventario("Carne Crua", "🥩", 1, {
                        tipo: "consumivel",
                        efeito: { tipo: "cura", valor: 15 }
                    });
                    return { sucesso: true, msg: "🏹 Você obtém carne útil para a jornada." };
                }
            },
            {
                texto: "Deixar em paz",
                hint: "Neutro",
                classe: "evento-btn-ignorar",
                icone: "🍃",
                acao: function() { return { sucesso: true, msg: "Você segue sem interferir." }; }
            }
        ]
    },

    // 10 NOVO
    {
        id: "caravana_abandonada",
        titulo: "🚚 Caravana Abandonada",
        icone: "📦",
        descricao: "Uma caravana abandonada descansa à margem da estrada.",
        nivelMin: 5,
        escolhas: [
            {
                texto: "Revistar a carga",
                hint: "Pode encontrar ouro ou armadilha",
                classe: "evento-btn-arriscar",
                icone: "📦",
                acao: function() {
                    if (Math.random() < 0.60) {
                        var ouro = randomInt(50, 120);
                        player.gold += ouro;
                        return { sucesso: true, msg: "📦 Você encontra " + ouro + " ouro!" };
                    }
                    player.hp = Math.max(1, player.hp - 25);
                    return { sucesso: false, msg: "💥 Armadilha deixada por saqueadores! -25 HP!" };
                }
            },
            {
                texto: "Procurar suprimentos",
                hint: "Pode achar poção",
                classe: "evento-btn-aceitar",
                icone: "🧪",
                acao: function() {
                    player.potions++;
                    return { sucesso: true, msg: "🧪 Você encontrou uma poção intacta!" };
                }
            },
            {
                texto: "Seguir viagem",
                hint: "Seguro",
                classe: "evento-btn-ignorar",
                icone: "🚶",
                acao: function() { return { sucesso: true, msg: "Você deixa a caravana para trás." }; }
            }
        ]
    },

    // 11 NOVO
    {
        id: "mina_desmoronada",
        titulo: "⛏️ Mina Desmoronada",
        icone: "⛏️",
        descricao: "Restos de uma mina antiga ainda escondem recursos.",
        nivelMin: 6,
        escolhas: [
            {
                texto: "Escavar com cuidado",
                hint: "Pode achar minério",
                classe: "evento-btn-aceitar",
                icone: "⛏️",
                acao: function() {
                    adicionarItemInventario("Minério de Ferro", "⛏️", 1, { tipo: "material" });
                    return { sucesso: true, msg: "⛏️ Você encontra Minério de Ferro!" };
                }
            },
            {
                texto: "Entrar fundo",
                hint: "Mais recompensa, mais risco",
                classe: "evento-btn-arriscar",
                icone: "🕳️",
                acao: function() {
                    if (Math.random() < 0.50) {
                        adicionarItemInventario("Pepita de Prata", "🥈", 1, { tipo: "material" });
                        return { sucesso: true, msg: "🥈 Você encontrou uma Pepita de Prata!" };
                    }
                    player.hp = Math.max(1, player.hp - 30);
                    return { sucesso: false, msg: "🪨 Você é atingido por pedras! -30 HP!" };
                }
            },
            {
                texto: "Ir embora",
                hint: "Seguro",
                classe: "evento-btn-ignorar",
                icone: "🚶",
                acao: function() { return { sucesso: true, msg: "Você não arrisca entrar na mina." }; }
            }
        ]
    },

    // 12 NOVO
    {
        id: "espada_cravada",
        titulo: "⚔️ Espada Cravada",
        icone: "⚔️",
        descricao: "Uma espada antiga está cravada em uma pedra no caminho.",
        nivelMin: 7,
        escolhas: [
            {
                texto: "Tentar puxar",
                hint: "Força decide",
                classe: "evento-btn-arriscar",
                icone: "💪",
                acao: function() {
                    if (Math.random() < 0.30 + player.forca * 0.02) {
                        player.forca += 1;
                        return { sucesso: true, msg: "⚔️ Você arranca a espada e sente-se mais forte. +1 Força!" };
                    }
                    return { sucesso: false, msg: "😤 A espada não se move." };
                }
            },
            {
                texto: "Estudar inscrições",
                hint: "Sabedoria pode render XP",
                classe: "evento-btn-aceitar",
                icone: "📖",
                acao: function() {
                    var xp = randomInt(30, 80);
                    ganharExp(xp);
                    return { sucesso: true, msg: "📖 As inscrições revelam antigas táticas. +" + xp + " XP!" };
                }
            },
            {
                texto: "Ignorar",
                hint: "Sem risco",
                classe: "evento-btn-ignorar",
                icone: "🚶",
                acao: function() { return { sucesso: true, msg: "Você deixa a espada onde está." }; }
            }
        ]
    },

    // 13 NOVO
    {
        id: "espirito_benevolente",
        titulo: "✨ Espírito Benevolente",
        icone: "✨",
        descricao: "Um espírito luminoso paira diante de você.",
        nivelMin: 10,
        escolhas: [
            {
                texto: "Receber a bênção",
                hint: "Ganha cura ou XP",
                classe: "evento-btn-aceitar",
                icone: "🙏",
                acao: function() {
                    if (Math.random() < 0.5) {
                        player.hp = player.maxHp;
                        return { sucesso: true, msg: "✨ O espírito cura suas feridas por completo!" };
                    }
                    var xp = randomInt(80, 150);
                    ganharExp(xp);
                    return { sucesso: true, msg: "✨ O espírito ilumina sua mente. +" + xp + " XP!" };
                }
            },
            {
                texto: "Pedir riqueza",
                hint: "Pode dar ouro",
                classe: "evento-btn-arriscar",
                icone: "💰",
                acao: function() {
                    var ouro = randomInt(60, 140);
                    player.gold += ouro;
                    return { sucesso: true, msg: "✨ O espírito atende seu pedido. +" + ouro + " ouro!" };
                }
            },
            {
                texto: "Agradecer e partir",
                hint: "Neutro",
                classe: "evento-btn-ignorar",
                icone: "🍃",
                acao: function() { return { sucesso: true, msg: "Você parte em paz." }; }
            }
        ]
    },

    // 14 NOVO
    {
        id: "soldado_fantasma",
        titulo: "🪖 Soldado Fantasma",
        icone: "👻",
        descricao: "Um antigo soldado aparece, ainda patrulhando após a morte.",
        nivelMin: 12,
        escolhas: [
            {
                texto: "Ouvir sua história",
                hint: "Pode ganhar sabedoria",
                classe: "evento-btn-aceitar",
                icone: "📖",
                acao: function() {
                    player.sabedoria += 1;
                    return { sucesso: true, msg: "👻 As palavras do soldado ecoam em você. +1 Sabedoria!" };
                }
            },
            {
                texto: "Desafiá-lo",
                hint: "Pode ganhar ouro ou dano",
                classe: "evento-btn-arriscar",
                icone: "⚔️",
                acao: function() {
                    if (Math.random() < 0.55) {
                        var ouro = randomInt(70, 160);
                        player.gold += ouro;
                        return { sucesso: true, msg: "⚔️ Você vence o espectro e encontra " + ouro + " ouro!" };
                    }
                    var dano = randomInt(25, 50);
                    player.hp = Math.max(1, player.hp - dano);
                    return { sucesso: false, msg: "💀 O fantasma te atravessa com a lâmina! -" + dano + " HP!" };
                }
            },
            {
                texto: "Evitar confronto",
                hint: "Seguro",
                classe: "evento-btn-ignorar",
                icone: "🚶",
                acao: function() { return { sucesso: true, msg: "Você evita o espírito." }; }
            }
        ]
    },

    // 15 NOVO
    {
        id: "fungo_brilhante",
        titulo: "🍄 Fungo Brilhante",
        icone: "🍄",
        descricao: "Um fungo azul brilhante cresce entre pedras úmidas.",
        nivelMin: 6,
        escolhas: [
            {
                texto: "Coletar o fungo",
                hint: "Pode virar material",
                classe: "evento-btn-aceitar",
                icone: "🍄",
                acao: function() {
                    adicionarItemInventario("Fungo Luminoso", "🍄", 1, { tipo: "material" });
                    return { sucesso: true, msg: "🍄 Você coletou um Fungo Luminoso!" };
                }
            },
            {
                texto: "Comer o fungo",
                hint: "Pode curar ou fazer mal",
                classe: "evento-btn-arriscar",
                icone: "😋",
                acao: function() {
                    if (Math.random() < 0.5) {
                        player.hp = Math.min(player.maxHp, player.hp + 35);
                        return { sucesso: true, msg: "😋 O fungo restaura 35 HP!" };
                    }
                    player.hp = Math.max(1, player.hp - 20);
                    return { sucesso: false, msg: "🤢 O fungo era tóxico! -20 HP!" };
                }
            },
            {
                texto: "Ignorar",
                hint: "Seguro",
                classe: "evento-btn-ignorar",
                icone: "🚶",
                acao: function() { return { sucesso: true, msg: "Você não mexe no fungo." }; }
            }
        ]
    },

    // 16 NOVO
    {
        id: "altar_esquecido",
        titulo: "🕯️ Altar Esquecido",
        icone: "🕯️",
        descricao: "Um pequeno altar escondido parece ter sido abandonado há séculos.",
        nivelMin: 9,
        escolhas: [
            {
                texto: "Rezar",
                hint: "Chance de cura",
                classe: "evento-btn-aceitar",
                icone: "🙏",
                acao: function() {
                    player.hp = Math.min(player.maxHp, player.hp + 50);
                    return { sucesso: true, msg: "🙏 Uma energia calma flui por você. +50 HP!" };
                }
            },
            {
                texto: "Profanar o altar",
                hint: "Poder ou punição",
                classe: "evento-btn-arriscar",
                icone: "💀",
                acao: function() {
                    if (Math.random() < 0.45) {
                        player.forca += 2;
                        return { sucesso: true, msg: "💀 Poder roubado do altar! +2 Força!" };
                    }
                    player.hp = Math.max(1, player.hp - 35);
                    return { sucesso: false, msg: "⚡ O altar te pune! -35 HP!" };
                }
            },
            {
                texto: "Sair",
                hint: "Sem risco",
                classe: "evento-btn-ignorar",
                icone: "🚶",
                acao: function() { return { sucesso: true, msg: "Você decide não interferir." }; }
            }
        ]
    }
];


// ============================================
// SISTEMA DE MINERAÇÃO
// ============================================

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
if (typeof materiaisInfo === "undefined") {
    var materiaisInfo = {};
}

for (var key in mineriosInfo) {
    materiaisInfo[key] = mineriosInfo[key];
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
function voltarDaMineracao() {
    mostrarPainelAcao('areaOptionsPanel');
}
function renderizarMineracao() {
    var area = mineracaoState.areaAtual;
    var dados = mineriosPorArea[area];
    if (!dados) return;}
    // ============================================
// WORLD.JS — CONTINUAÇÃO
// ============================================

// ============================================
// SEÇÃO 13: EXPLORAÇÃO
// ============================================

function iniciarExploracaoArea() {
    if (!gameState.areaAtual || !areas[gameState.areaAtual]) {
        mostrarNotificacao("⚠️ Escolha uma área primeiro.");
        return;
    }

    mostrarPainelFullscreen("areaOptionsPanel");

    const area = areas[gameState.areaAtual];
    const tituloEl = document.getElementById("areaOptionsTitle");
    const descEl = document.getElementById("areaOptionsDescription");

    if (tituloEl) tituloEl.textContent = area.nome;
    if (descEl) descEl.textContent = area.descricao;

    if (typeof atualizarUIMissao === "function") {
        atualizarUIMissao();
    }

    if (typeof log === "function") {
        log("Explorando " + area.nome + ".");
    }
}
function abrirExploraracao() {
    if (typeof atualizarVisibilidadeAreasDesbloqueadas === "function") {
        atualizarVisibilidadeAreasDesbloqueadas();
    }

    mostrarPainelFullscreen("areaSelectionPanel");
}

function selecionarAreaExploracao(key) {
    selecionarArea(key);
}

function tentarEventoAleatorio() {
    if (Math.random() >= CHANCE_EVENTO) return false;

    var eventosDisponiveis = [];
    for (var i = 0; i < eventosAleatorios.length; i++) {
        if (player.level >= eventosAleatorios[i].nivelMin) {
            eventosDisponiveis.push(eventosAleatorios[i]);
        }
    }

    if (eventosDisponiveis.length === 0) return false;

    var evento = eventosDisponiveis[Math.floor(Math.random() * eventosDisponiveis.length)];
    if (typeof mostrarEvento === "function") {
        mostrarEvento(evento);
        return true;
    }

    return false;
}

function getEventosDisponiveis() {
    if (!eventosAleatorios || !eventosAleatorios.length) return [];

    return eventosAleatorios.filter(function(ev) {
        return !ev.nivelMin || player.level >= ev.nivelMin;
    });
}


// ============================================
// SEÇÃO 2: NPCs DE CAMPANHA POR ÁREA
// ============================================

if (typeof npcCampanhaPorArea === "undefined") {
    var npcCampanhaPorArea = {
        ruinas: ["elian", "iris"],
        deserto: ["elian"],
        pantano: ["soraya"],
        cemiterio: ["soraya"],
        colinas: ["draeven"],
        caverna: ["draeven"],
        vulcao: ["draeven"],
        castelo: ["elian", "tallen"],
        cidadeFant: ["tallen"],
        geleira: ["maela"],
        abismo: ["soraya", "maela"],
        planoAstral: ["iris"],
        infernus: ["maela"],
        tronoDeus: ["iris", "tallen"]
    };
}
function getNpcCampanhaDaArea(areaKey) {
    if (typeof npcCampanhaPorArea === "undefined" || !npcCampanhaPorArea) {
        return [];
    }

    return npcCampanhaPorArea[areaKey] || [];
}


// ============================================
// SEÇÃO 8: CONTROLE DE DESBLOQUEIO DE NPCs DE CAMPANHA
// ============================================

var npcCampanhaCapituloMinimo = {
    elian: 4,
    soraya: 2,
    draeven: 3,
    iris: 4,
    tallen: 10,
    maela: 9
};

function npcCampanhaEstaDisponivel(npcId) {
    if (!player || !player.level) return false;

    var capMin = npcCampanhaCapituloMinimo[npcId] || 1;

    // forma simples: usa nível aproximado por capítulo
    // depois podemos trocar por progresso real de capítulo visto
    var capituloAtualEstimado = 1;

    if (player.level >= 4) capituloAtualEstimado = 2;
    if (player.level >= 7) capituloAtualEstimado = 3;
    if (player.level >= 10) capituloAtualEstimado = 4;
    if (player.level >= 13) capituloAtualEstimado = 5;
    if (player.level >= 16) capituloAtualEstimado = 6;
    if (player.level >= 19) capituloAtualEstimado = 7;
    if (player.level >= 22) capituloAtualEstimado = 8;
    if (player.level >= 25) capituloAtualEstimado = 9;
    if (player.level >= 28) capituloAtualEstimado = 10;
    if (player.level >= 31) capituloAtualEstimado = 11;
    if (player.level >= 34) capituloAtualEstimado = 12;
    if (player.level >= 37) capituloAtualEstimado = 13;
    if (player.level >= 40) capituloAtualEstimado = 14;
    if (player.level >= 43) capituloAtualEstimado = 15;

    return capituloAtualEstimado >= capMin;
}

var conquistas = {
    lista: [
        {
            id: "primeiro_sangue",
            titulo: "Primeiro Sangue",
            descricao: "Derrote seu primeiro monstro.",
            desbloqueada: false,
            recompensa: { ouro: 50, bonus: { tipo: "atributo_classe", valor: 1 } }
        },
        {
            id: "cacador_10",
            titulo: "Caçador Iniciante",
            descricao: "Derrote 10 monstros.",
            desbloqueada: false,
            recompensa: { ouro: 80, bonus: { tipo: "atributo_classe", valor: 1 } }
        },
        {
            id: "cacador_25",
            titulo: "Caçador Veterano",
            descricao: "Derrote 25 monstros.",
            desbloqueada: false,
            recompensa: { ouro: 120, bonus: { tipo: "atributo_classe", valor: 1 } }
        },
        {
            id: "cacador_50",
            titulo: "Predador Sombrio",
            descricao: "Derrote 50 monstros.",
            desbloqueada: false,
            recompensa: { ouro: 180, bonus: { tipo: "atributo_classe", valor: 2 } }
        },
        {
            id: "cacador_100",
            titulo: "Flagelo das Criaturas",
            descricao: "Derrote 100 monstros.",
            desbloqueada: false,
            recompensa: { ouro: 300, bonus: { tipo: "atributo_classe", valor: 2 } }
        },
        {
            id: "cacador_250",
            titulo: "Lenda da Caçada",
            descricao: "Derrote 250 monstros.",
            desbloqueada: false,
            recompensa: { ouro: 700, bonus: { tipo: "atributo_classe", valor: 3 } }
        },

        {
            id: "boss_1",
            titulo: "Matador de Bosses",
            descricao: "Derrote seu primeiro boss.",
            desbloqueada: false,
            recompensa: { ouro: 150, bonus: { tipo: "talento", valor: 1 } }
        },
        {
            id: "boss_3",
            titulo: "Rompedor de Tiranos",
            descricao: "Derrote 3 bosses.",
            desbloqueada: false,
            recompensa: { ouro: 250, bonus: { tipo: "atributo_classe", valor: 1 } }
        },
        {
            id: "boss_5",
            titulo: "Condenação dos Chefes",
            descricao: "Derrote 5 bosses.",
            desbloqueada: false,
            recompensa: { ouro: 400, bonus: { tipo: "atributo_classe", valor: 2 } }
        },
        {
            id: "boss_10",
            titulo: "Quebra-Reis",
            descricao: "Derrote 10 bosses.",
            desbloqueada: false,
            recompensa: { ouro: 800, bonus: { tipo: "talento", valor: 1 } }
        },
        {
            id: "boss_15",
            titulo: "Conquistador Supremo",
            descricao: "Derrote os 15 bosses das masmorras.",
            desbloqueada: false,
            recompensa: { ouro: 1500, bonus: { tipo: "todos", valor: 2 } }
        },

        {
            id: "area_1",
            titulo: "Primeira Fronteira",
            descricao: "Desbloqueie 1 área.",
            desbloqueada: false,
            recompensa: { ouro: 70, bonus: { tipo: "atributo_classe", valor: 1 } }
        },
        {
            id: "area_3",
            titulo: "Explorador das Bordas",
            descricao: "Desbloqueie 3 áreas.",
            desbloqueada: false,
            recompensa: { ouro: 120, bonus: { tipo: "atributo_classe", valor: 1 } }
        },
        {
            id: "area_5",
            titulo: "Cartógrafo Profano",
            descricao: "Desbloqueie 5 áreas.",
            desbloqueada: false,
            recompensa: { ouro: 200, bonus: { tipo: "atributo_classe", valor: 1 } }
        },
        {
            id: "area_8",
            titulo: "Andarilho do Crepúsculo",
            descricao: "Desbloqueie 8 áreas.",
            desbloqueada: false,
            recompensa: { ouro: 300, bonus: { tipo: "atributo_classe", valor: 2 } }
        },
        {
            id: "area_10",
            titulo: "Desbravador dos Reinos",
            descricao: "Desbloqueie 10 áreas.",
            desbloqueada: false,
            recompensa: { ouro: 450, bonus: { tipo: "atributo_classe", valor: 2 } }
        },
        {
            id: "area_12",
            titulo: "Mestre da Travessia",
            descricao: "Desbloqueie 12 áreas.",
            desbloqueada: false,
            recompensa: { ouro: 650, bonus: { tipo: "talento", valor: 1 } }
        },
        {
            id: "area_15",
            titulo: "Senhor dos Reinos",
            descricao: "Desbloqueie as 15 áreas.",
            desbloqueada: false,
            recompensa: { ouro: 1200, bonus: { tipo: "todos", valor: 2 } }
        },

        {
            id: "masmorra_1",
            titulo: "Descida Inicial",
            descricao: "Complete sua primeira masmorra.",
            desbloqueada: false,
            recompensa: { ouro: 100, bonus: { tipo: "atributo_classe", valor: 1 } }
        },
        {
            id: "masmorra_3",
            titulo: "Corajoso das Profundezas",
            descricao: "Complete 3 masmorras.",
            desbloqueada: false,
            recompensa: { ouro: 180, bonus: { tipo: "atributo_classe", valor: 1 } }
        },
        {
            id: "masmorra_5",
            titulo: "Aventureiro das Trevas",
            descricao: "Complete 5 masmorras.",
            desbloqueada: false,
            recompensa: { ouro: 260, bonus: { tipo: "atributo_classe", valor: 2 } }
        },
        {
            id: "masmorra_8",
            titulo: "Desafiador do Abismo",
            descricao: "Complete 8 masmorras.",
            desbloqueada: false,
            recompensa: { ouro: 400, bonus: { tipo: "atributo_classe", valor: 2 } }
        },
        {
            id: "masmorra_10",
            titulo: "Mestre da Escuridão",
            descricao: "Complete 10 masmorras.",
            desbloqueada: false,
            recompensa: { ouro: 650, bonus: { tipo: "talento", valor: 1 } }
        },
        {
            id: "masmorra_15",
            titulo: "Senhor das Masmorras",
            descricao: "Complete as 15 masmorras.",
            desbloqueada: false,
            recompensa: { ouro: 1500, bonus: { tipo: "todos", valor: 3 } }
        },

        {
            id: "arena_1",
            titulo: "Gladiador",
            descricao: "Vença 1 batalha na Arena.",
            desbloqueada: false,
            recompensa: { ouro: 100, bonus: { tipo: "atributo_classe", valor: 1 } }
        },
        {
            id: "arena_3",
            titulo: "Desafiante de Ferro",
            descricao: "Vença 3 batalhas na Arena.",
            desbloqueada: false,
            recompensa: { ouro: 160, bonus: { tipo: "atributo_classe", valor: 1 } }
        },
        {
            id: "arena_5",
            titulo: "Campeão da Arena",
            descricao: "Vença 5 batalhas na Arena.",
            desbloqueada: false,
            recompensa: { ouro: 260, bonus: { tipo: "atributo_classe", valor: 2 } }
        },
        {
            id: "arena_10",
            titulo: "Ídolo da Multidão",
            descricao: "Vença 10 batalhas na Arena.",
            desbloqueada: false,
            recompensa: { ouro: 500, bonus: { tipo: "talento", valor: 1 } }
        },
        {
            id: "arena_20",
            titulo: "Lenda do Coliseu",
            descricao: "Vença 20 batalhas na Arena.",
            desbloqueada: false,
            recompensa: { ouro: 1000, bonus: { tipo: "todos", valor: 2 } }
        },

        {
            id: "capitulo_1",
            titulo: "O Chamado",
            descricao: "Conclua 1 capítulo da história.",
            desbloqueada: false,
            recompensa: { ouro: 100, bonus: { tipo: "atributo_classe", valor: 1 } }
        },
        {
            id: "capitulo_3",
            titulo: "Passos do Destino",
            descricao: "Conclua 3 capítulos da história.",
            desbloqueada: false,
            recompensa: { ouro: 180, bonus: { tipo: "atributo_classe", valor: 1 } }
        },
        {
            id: "capitulo_5",
            titulo: "Ecos do Profano",
            descricao: "Conclua 5 capítulos da história.",
            desbloqueada: false,
            recompensa: { ouro: 300, bonus: { tipo: "atributo_classe", valor: 2 } }
        },
        {
            id: "capitulo_8",
            titulo: "Marcha do Escolhido",
            descricao: "Conclua 8 capítulos da história.",
            desbloqueada: false,
            recompensa: { ouro: 500, bonus: { tipo: "atributo_classe", valor: 2 } }
        },
        {
            id: "capitulo_10",
            titulo: "Profecia em Ruínas",
            descricao: "Conclua 10 capítulos da história.",
            desbloqueada: false,
            recompensa: { ouro: 800, bonus: { tipo: "talento", valor: 1 } }
        },
        {
            id: "capitulo_15",
            titulo: "Fim do Ciclo",
            descricao: "Conclua os 15 capítulos da campanha.",
            desbloqueada: false,
            recompensa: { ouro: 2000, bonus: { tipo: "todos", valor: 3 } }
        },

        {
            id: "nivel_5",
            titulo: "Aventureiro Nascente",
            descricao: "Alcance o nível 5.",
            desbloqueada: false,
            recompensa: { ouro: 120, bonus: { tipo: "atributo_classe", valor: 1 } }
        },
        {
            id: "nivel_10",
            titulo: "Poder Crescente",
            descricao: "Alcance o nível 10.",
            desbloqueada: false,
            recompensa: { ouro: 200, bonus: { tipo: "atributo_classe", valor: 1 } }
        },
        {
            id: "nivel_15",
            titulo: "Veterano da Fronteira",
            descricao: "Alcance o nível 15.",
            desbloqueada: false,
            recompensa: { ouro: 320, bonus: { tipo: "atributo_classe", valor: 2 } }
        },
        {
            id: "nivel_20",
            titulo: "Força Consolidada",
            descricao: "Alcance o nível 20.",
            desbloqueada: false,
            recompensa: { ouro: 450, bonus: { tipo: "atributo_classe", valor: 2 } }
        },
        {
            id: "nivel_25",
            titulo: "Veterano das Ruínas",
            descricao: "Alcance o nível 25.",
            desbloqueada: false,
            recompensa: { ouro: 650, bonus: { tipo: "atributo_classe", valor: 2 } }
        },
        {
            id: "nivel_30",
            titulo: "Mestre de Guerra",
            descricao: "Alcance o nível 30.",
            desbloqueada: false,
            recompensa: { ouro: 850, bonus: { tipo: "talento", valor: 1 } }
        },
        {
            id: "nivel_35",
            titulo: "Ascensão Sombria",
            descricao: "Alcance o nível 35.",
            desbloqueada: false,
            recompensa: { ouro: 1100, bonus: { tipo: "atributo_classe", valor: 3 } }
        },
        {
            id: "nivel_40",
            titulo: "Arauto do Fim",
            descricao: "Alcance o nível 40.",
            desbloqueada: false,
            recompensa: { ouro: 1500, bonus: { tipo: "atributo_classe", valor: 3 } }
        },
        {
            id: "nivel_45",
            titulo: "Ascensão Final",
            descricao: "Alcance o nível 45.",
            desbloqueada: false,
            recompensa: { ouro: 2500, bonus: { tipo: "todos", valor: 3 } }
        },

        {
            id: "ouro_1000",
            titulo: "Bolso Cheio",
            descricao: "Acumule 1000 de ouro.",
            desbloqueada: false,
            recompensa: { ouro: 100, bonus: { tipo: "atributo_classe", valor: 1 } }
        },
        {
            id: "ouro_5000",
            titulo: "Mercador das Sombras",
            descricao: "Acumule 5000 de ouro.",
            desbloqueada: false,
            recompensa: { ouro: 300, bonus: { tipo: "atributo_classe", valor: 2 } }
        },
        {
            id: "ouro_10000",
            titulo: "Magnata de Axion",
            descricao: "Acumule 10000 de ouro.",
            desbloqueada: false,
            recompensa: { ouro: 800, bonus: { tipo: "talento", valor: 1 } }
        },

        {
            id: "mineracao_10",
            titulo: "Aprendiz de Mineiro",
            descricao: "Minere 10 vezes.",
            desbloqueada: false,
            recompensa: { ouro: 120, bonus: { tipo: "atributo_classe", valor: 1 } }
        },
        {
            id: "mineracao_25",
            titulo: "Escavador Profano",
            descricao: "Minere 25 vezes.",
            desbloqueada: false,
            recompensa: { ouro: 240, bonus: { tipo: "atributo_classe", valor: 1 } }
        },
        {
            id: "mineracao_50",
            titulo: "Senhor do Veio Perdido",
            descricao: "Minere 50 vezes.",
            desbloqueada: false,
            recompensa: { ouro: 500, bonus: { tipo: "atributo_classe", valor: 2 } }
        },

        {
            id: "guilda_entrar",
            titulo: "Juramento",
            descricao: "Entre para uma guilda.",
            desbloqueada: false,
            recompensa: { ouro: 100, bonus: { tipo: "atributo_classe", valor: 1 } }
        },
        {
            id: "guilda_rank_3",
            titulo: "Lealdade Reconhecida",
            descricao: "Alcance rank 3 em uma guilda.",
            desbloqueada: false,
            recompensa: { ouro: 300, bonus: { tipo: "atributo_classe", valor: 2 } }
        },
        {
            id: "guilda_rank_5",
            titulo: "Campeão da Facção",
            descricao: "Alcance rank 5 em uma guilda.",
            desbloqueada: false,
            recompensa: { ouro: 700, bonus: { tipo: "talento", valor: 1 } }
        },

        {
            id: "arvore_1",
            titulo: "Primeira Técnica",
            descricao: "Aprenda sua primeira habilidade da árvore.",
            desbloqueada: false,
            recompensa: { ouro: 120, bonus: { tipo: "atributo_classe", valor: 1 } }
        },
        {
            id: "arvore_5",
            titulo: "Discípulo do Poder",
            descricao: "Aprenda 5 habilidades da árvore.",
            desbloqueada: false,
            recompensa: { ouro: 300, bonus: { tipo: "atributo_classe", valor: 2 } }
        },
        {
            id: "arvore_10",
            titulo: "Transcendência Marcial",
            descricao: "Aprenda 10 habilidades da árvore.",
            desbloqueada: false,
            recompensa: { ouro: 800, bonus: { tipo: "todos", valor: 2 } }
        }
    ]
};