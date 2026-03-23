// ============================================
// COMBAT.JS — VERSÃO CORRIGIDA E CONSOLIDADA
// ============================================

// ============================================
// SEÇÃO 1: ESTADO GLOBAL DE COMBATE
// ============================================

var monster = null;
var iaTurnoAtual = 0;
var statusJogador = [];
var statusMonstro = [];
var audioCombateAtual = null;
var audiosSFX = [];

var combatState = {
    fundoAtual: null,
    mostrandoInfoInicial: false,
    alternanciaFundos: {
        castelo: 0,
        planoAstral: 0,
        infernus: 0,
        tronoDeus: 0
    }
};

// ============================================
// SEÇÃO 2: UTILITÁRIOS
// ============================================

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice(arr) {
    if (!arr || arr.length === 0) return null;
    return arr[Math.floor(Math.random() * arr.length)];
}

// ============================================
// SEÇÃO 3: FUNDOS DE COMBATE
// ============================================

var fundosCombateAreas = {
    floresta: ["images/Fundo/floresta.jpeg"],
    pantano: ["images/Fundo/pantano.png"],
    colinas: ["images/Fundo/colinas.png"],
    ruinas: ["images/Fundo/ruinas.png"],
    deserto: ["images/Fundo/deserto.png"],
    cemiterio: ["images/Fundo/cemiterio.png"],
    caverna: ["images/Fundo/caverna.jpeg"],
    vulcao: ["images/Fundo/vulcao.png"],
    geleira: ["images/Fundo/geleira.png"],
    cidadeFant: ["images/Fundo/cidadeFantasma.png"],
    abismo: ["images/Fundo/abismo.png"],
    castelo: ["images/Fundos/castelo1.png", "images/Fundos/castelo.png"],
    planoAstral: ["images/Fundos/astral1.png", "images/Fundos/astral.png"],
    infernus: ["images/Fundos/infernus1.png", "images/Fundos/infernus.png"],
    tronoDeus: ["images/Fundos/tronoDeus1.png", "images/Fundos/tronoDeus.png"]
};

function getFundoCombateArea(areaKey) {
    if (!areaKey || !fundosCombateAreas[areaKey]) return null;
    var fundos = fundosCombateAreas[areaKey];
    if (!fundos || fundos.length === 0) return null;
    if (fundos.length === 1) return fundos[0];

    if (typeof combatState.alternanciaFundos[areaKey] === "undefined") {
        combatState.alternanciaFundos[areaKey] = 0;
    }

    var idx = combatState.alternanciaFundos[areaKey];
    var fundoEscolhido = fundos[idx];
    combatState.alternanciaFundos[areaKey] = (idx + 1) % fundos.length;
    return fundoEscolhido;
}

function aplicarFundoCombate(areaKey) {
    var bg = document.getElementById("combatBackground");
    if (!bg) return;

    var fundo = getFundoCombateArea(areaKey);
    combatState.fundoAtual = fundo;

    if (fundo) {
        bg.style.backgroundImage =
            "linear-gradient(180deg, rgba(0,0,0,0.12), rgba(0,0,0,0.18)), url('" + fundo + "')";
        bg.style.backgroundSize = "cover";
        bg.style.backgroundPosition = "center";
        bg.style.backgroundRepeat = "no-repeat";
    } else {
        bg.style.backgroundImage = "";
    }
}

// ============================================
// SEÇÃO 4: CÁLCULOS BÁSICOS
// ============================================

function calcularXpNecessario(level) {
    return Math.floor(50 * Math.pow(1.4, level - 1));
}

function calcularChanceCritico() {
    return 0.05 + (player.destreza * 0.007) + getBonusTalento("critico");
}

function calcularChanceEsquiva() {
    return Math.max(0, (player.destreza - 10) * 0.015);
}

function calcularChanceFuga(isBoss) {
    return Math.min(0.85, (isBoss ? 0.10 : 0.40) + player.destreza * 0.01);
}

function calcularMultiplicadorHabilidade() {
    return (1.0 + player.inteligencia * 0.03) * getBonusTalento("maestria");
}

function calcularBonusXp() {
    return player.inteligencia * 0.01;
}

function calcularMultiplicadorCura() {
    return 1.0 + player.sabedoria * 0.02;
}

function calcularBonusDrop() {
    return player.sabedoria * 0.005 + (getBonusTalento("sorte") - 1) + getBonusHardcore("drop");
}

function calcularChanceEnigma() {
    return Math.min(0.95, 0.50 + player.sabedoria * 0.02);
}

function calcularReducaoArmadilha() {
    return Math.max(0.30, 1.0 - player.vigor * 0.015);
}

function calcularBonusOuro() {
    var bonus = 1.0;
    if (player && typeof player.carisma !== "undefined") bonus += player.carisma * 0.01;
    if (typeof getBonusTalento === "function") bonus *= getBonusTalento("sorte");
    if (typeof getBonusGuilda === "function") bonus += getBonusGuilda("ouro");
    return bonus;
}

// ============================================
// SEÇÃO 5: DADOS VISUAIS DO MONSTRO
// ============================================

function calcularNivelVisualMonstro(monstroBase, isBoss) {
    if (isBoss) return Math.max(1, player.level + 2);
    if (!gameState.areaAtual || typeof areas === "undefined" || !areas[gameState.areaAtual]) return player.level;
    var area = areas[gameState.areaAtual];
    var nivelBase = area.min || 1;
    return Math.max(1, Math.min(area.max || player.level, nivelBase + Math.floor((player.level - nivelBase) * 0.5)));
}

function calcularDificuldadeVisualMonstro(monstroObj) {
    if (!monstroObj) return "Normal";
    if (monstroObj.isBoss) return "Lendário";
    if (monstroObj.isElite) return "Elite";

    var ratioAtk = monstroObj.atk / Math.max(1, player.atk);
    var ratioHp = monstroObj.maxHp / Math.max(1, player.maxHp);

    if (ratioAtk >= 1.4 || ratioHp >= 1.5) return "Difícil";
    if (ratioAtk >= 1.0 || ratioHp >= 1.0) return "Moderado";
    return "Normal";
}

function calcularPerigoVisualMonstro(monstroObj) {
    if (!monstroObj) return "Sem informações adicionais.";
    if (monstroObj.isBoss) return "⚠️ Chefe perigoso. Use tudo que aprendeu.";
    if (monstroObj.isElite) return "🔥 Monstro elite. Recompensa maior, risco maior.";

    var baseName = monstroObj.nomeBase || monstroObj.name || "";

    if (baseName.indexOf("Aranha") >= 0) return "⚠️ Pode causar veneno.";
    if (baseName.indexOf("Goblin") >= 0) return "⚠️ Pode enfraquecer ou surpreender.";
    if (baseName.indexOf("Fantasma") >= 0) return "⚠️ Ataques rápidos e imprevisíveis.";
    if (baseName.indexOf("Necromante") >= 0) return "⚠️ Pode usar efeitos sombrios.";
    if (baseName.indexOf("Diabo") >= 0 || baseName.indexOf("Demônio") >= 0) return "⚠️ Forte presença ofensiva.";
    if (baseName.indexOf("Dragão") >= 0) return "⚠️ Inimigo de alto risco. Prepare-se bem.";

    return "⚠️ Observe o padrão de ataques do inimigo.";
}

// ============================================
// SEÇÃO 6: ELITES
// ============================================

var modificadoresElite = [
    { sufixo: "Furioso", emoji: "🔥", bonusAtk: 1.5, bonusDef: 1.0, bonusHp: 1.2, bonusOuro: 1.5, bonusXp: 1.8 },
    { sufixo: "Blindado", emoji: "🛡️", bonusAtk: 1.0, bonusDef: 2.0, bonusHp: 1.5, bonusOuro: 1.3, bonusXp: 1.5 },
    { sufixo: "Gigante", emoji: "⬆️", bonusAtk: 1.3, bonusDef: 1.3, bonusHp: 2.0, bonusOuro: 1.8, bonusXp: 2.0 },
    { sufixo: "das Sombras", emoji: "🌑", bonusAtk: 1.4, bonusDef: 1.4, bonusHp: 1.4, bonusOuro: 2.0, bonusXp: 2.2 },
    { sufixo: "Ancião", emoji: "👑", bonusAtk: 1.6, bonusDef: 1.6, bonusHp: 1.8, bonusOuro: 2.5, bonusXp: 2.5 }
];

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
        drops: monstroBase.drops || [],
        isElite: true,
        eliteMod: mod
    };
}

// ============================================
// SEÇÃO 7: STATUS
// ============================================

var tiposStatus = {
    queimando:   { nome: "🔥 Queimando", duracao: 3, tipo: "dano", valorBase: 0.05 },
    envenenado:  { nome: "☠️ Envenenado", duracao: 4, tipo: "dano", valorBase: 0.03 },
    sangramento: { nome: "🩸 Sangramento", duracao: 3, tipo: "dano", valorBase: 0.04 },
    congelado:   { nome: "🧊 Congelado", duracao: 1, tipo: "pular", valorBase: 0 },
    atordoado:   { nome: "😵 Atordoado", duracao: 1, tipo: "pular", valorBase: 0 },
    medo:        { nome: "😨 Medo", duracao: 3, tipo: "debuff", valorBase: 0.25 },
    fortificado: { nome: "🛡️ Fortificado", duracao: 2, tipo: "buff", valorBase: 0.30 },
    regenerando: { nome: "💚 Regenerando", duracao: 3, tipo: "cura", valorBase: 0.05 },
    fraqueza:    { nome: "💔 Fraqueza", duracao: 3, tipo: "debuff", valorBase: 0.20 }
};

function limparTodosStatus() {
    statusJogador = [];
    statusMonstro = [];
}

function aplicarStatus(alvo, tipoStatus) {
    var lista = alvo === "jogador" ? statusJogador : statusMonstro;
    var info = tiposStatus[tipoStatus];
    if (!info) return;

    var existente = lista.find(function(s) { return s.tipo === tipoStatus; });
    if (existente) {
        existente.turnosRestantes = info.duracao;
        return;
    }

    lista.push({
        tipo: tipoStatus,
        nome: info.nome,
        turnosRestantes: info.duracao,
        tipoEfeito: info.tipo,
        valor: info.valorBase
    });

    addCombatLog(info.nome + " aplicado!", "info");
}

function processarStatus(alvo) {
    var lista = alvo === "jogador" ? statusJogador : statusMonstro;
    var entidade = alvo === "jogador" ? player : monster;
    if (!entidade || lista.length === 0) return false;

    var pulaTurno = false;

    for (var i = lista.length - 1; i >= 0; i--) {
        var s = lista[i];

        switch (s.tipoEfeito) {
            case "dano":
                var maxHp = alvo === "jogador" ? player.maxHp : monster.maxHp;
                var dano = Math.max(1, Math.floor(maxHp * s.valor));
                entidade.hp = Math.max(0, entidade.hp - dano);
                addCombatLog(s.nome + ": -" + dano + " HP!", alvo === "jogador" ? "enemy" : "player");
                break;

            case "cura":
                var maxHpC = alvo === "jogador" ? player.maxHp : monster.maxHp;
                var cura = Math.max(1, Math.floor(maxHpC * s.valor));
                entidade.hp = Math.min(maxHpC, entidade.hp + cura);
                addCombatLog(s.nome + ": +" + cura + " HP!", "heal");
                break;

            case "pular":
                pulaTurno = true;
                addCombatLog(s.nome + ": turno perdido!", "info");
                break;
        }

        s.turnosRestantes--;
        if (s.turnosRestantes <= 0) {
            lista.splice(i, 1);
        }
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

function renderizarStatusUI() {
    var monsterStatusTexto = "";
    var playerStatusTexto = "";

    statusMonstro.forEach(function(s) {
        monsterStatusTexto += s.nome + " (" + s.turnosRestantes + ")  ";
    });

    statusJogador.forEach(function(s) {
        playerStatusTexto += s.nome + " (" + s.turnosRestantes + ")  ";
    });

    var monsterStatusEl = document.getElementById("monsterStatusEffects");
    if (monsterStatusEl) monsterStatusEl.textContent = monsterStatusTexto.trim();

    var playerStatusEl = document.getElementById("playerStatusEffects");
    if (playerStatusEl) playerStatusEl.textContent = playerStatusTexto.trim();
}

// ============================================
// SEÇÃO 8: CÁLCULO DE DANO
// ============================================

function calcularDano(atk, def, permitirCritico) {
    var danoBase = Math.max(1, Math.floor(atk - def * 0.5 + randomInt(-2, 3)));
    var critico = false;

    if (permitirCritico && Math.random() < calcularChanceCritico()) {
        critico = true;
        danoBase = Math.floor(danoBase * 1.5);
        if (typeof estatisticas !== "undefined") estatisticas.criticos++;
    }

    return { dano: danoBase, critico: critico };
}

// ============================================
// SEÇÃO 9: HABILIDADES DE CLASSE
// ============================================

var habilidadesClasse = {
    "Guerreiro": {
        nome: "⚔️ Golpe Devastador",
        cd: 3,
        exec: function() {
            var r = calcularDano(Math.floor(player.atk * 2.1), Math.floor(monster.def * 0.4), true);
            monster.hp = Math.max(0, monster.hp - r.dano);
            addCombatLog("⚔️ GOLPE DEVASTADOR! " + r.dano + " de dano!", "critical");
        }
    },

    "Guerreira": {
        nome: "⚔️ Golpe Devastador",
        cd: 3,
        exec: function() { habilidadesClasse["Guerreiro"].exec(); }
    },

    "Paladino": {
        nome: "✝️ Julgamento Sagrado",
        cd: 3,
        exec: function() {
            var escala = 1 + (player.sabedoria || 0) * 0.02;
            var r = calcularDano(Math.floor(player.atk * 1.6 * escala), Math.floor(monster.def * 0.8), true);
            monster.hp = Math.max(0, monster.hp - r.dano);

            var cura = Math.floor(player.maxHp * 0.18 * calcularMultiplicadorCura());
            cura = Math.min(cura, player.maxHp - player.hp);
            player.hp = Math.min(player.maxHp, player.hp + cura);

            addCombatLog("✝️ JULGAMENTO SAGRADO! " + r.dano + " dano + " + cura + " HP!", "critical");
        }
    },

    "Paladina": {
        nome: "✝️ Julgamento Sagrado",
        cd: 3,
        exec: function() { habilidadesClasse["Paladino"].exec(); }
    },

    "Arqueiro": {
        nome: "🏹 Chuva de Flechas",
        cd: 3,
        exec: function() {
            var total = 0;
            var crits = 0;

            for (var i = 0; i < 3; i++) {
                var r = calcularDano(Math.floor(player.atk * 0.75 + player.destreza * 0.15), Math.floor(monster.def * 0.9), true);
                total += r.dano;
                if (r.critico) crits++;
                monster.hp = Math.max(0, monster.hp - r.dano);
            }

            addCombatLog("🏹 CHUVA DE FLECHAS! 3 acertos = " + total + " dano!" + (crits ? " (" + crits + " crítico(s))" : ""), "critical");
        }
    },

    "Arqueira": {
        nome: "🏹 Chuva de Flechas",
        cd: 3,
        exec: function() { habilidadesClasse["Arqueiro"].exec(); }
    },

    "Mago": {
        nome: "☄️ Meteoro Arcano",
        cd: 3,
        exec: function() {
            var dano = Math.max(1, Math.floor(player.inteligencia * 2.4 * calcularMultiplicadorHabilidade()) + randomInt(-4, 6));
            monster.hp = Math.max(0, monster.hp - dano);
            addCombatLog("☄️ METEORO ARCANO! " + dano + " de dano mágico!", "critical");
        }
    },

    "Maga": {
        nome: "☄️ Meteoro Arcano",
        cd: 3,
        exec: function() { habilidadesClasse["Mago"].exec(); }
    },

    "Clérigo": {
        nome: "🙏 Bênção Divina",
        cd: 3,
        exec: function() {
            var cura = Math.floor(player.maxHp * 0.35 * calcularMultiplicadorCura());
            cura = Math.min(cura, player.maxHp - player.hp);
            player.hp = Math.min(player.maxHp, player.hp + cura);

            player.defendendo = true;

            var dano = Math.max(1, Math.floor((player.sabedoria || 0) * 1.2));
            monster.hp = Math.max(0, monster.hp - dano);

            addCombatLog("🙏 BÊNÇÃO DIVINA! +" + cura + " HP, escudo ativo e " + dano + " dano sagrado!", "critical");
        }
    },

    "Clériga": {
        nome: "🙏 Bênção Divina",
        cd: 3,
        exec: function() { habilidadesClasse["Clérigo"].exec(); }
    },

    "Ladino": {
        nome: "🗡️ Golpe Furtivo",
        cd: 3,
        exec: function() {
            var base = Math.floor(player.atk * 2.2 + player.destreza * 0.5);
            var dano = Math.max(1, Math.floor(base - monster.def * 0.25));
            monster.hp = Math.max(0, monster.hp - dano);
            addCombatLog("🗡️ GOLPE FURTIVO! " + dano + " dano crítico!", "critical");
        }
    },

    "Ladina": {
        nome: "🗡️ Golpe Furtivo",
        cd: 3,
        exec: function() { habilidadesClasse["Ladino"].exec(); }
    },

    "Druida": {
        nome: "🌿 Fúria da Natureza",
        cd: 3,
        exec: function() {
            var dano = Math.max(1, Math.floor(player.sabedoria * 1.8 * calcularMultiplicadorHabilidade()) + randomInt(-2, 4));
            monster.hp = Math.max(0, monster.hp - dano);

            var cura = Math.floor(player.maxHp * 0.12 * calcularMultiplicadorCura());
            cura = Math.min(cura, player.maxHp - player.hp);
            player.hp = Math.min(player.maxHp, player.hp + cura);

            var veneno = Math.max(1, Math.floor(player.sabedoria * 0.25));
            monster.hp = Math.max(0, monster.hp - veneno);

            addCombatLog("🌿 FÚRIA DA NATUREZA! " + dano + " dano + " + cura + " HP + " + veneno + " veneno!", "critical");
        }
    },

    "Monge": {
        nome: "👊 Rajada de Golpes",
        cd: 3,
        exec: function() {
            var total = 0;
            var crits = 0;

            for (var i = 0; i < 4; i++) {
                var r = calcularDano(Math.floor(player.atk * 0.5 + player.destreza * 0.25), Math.floor(monster.def * 0.85), true);
                total += r.dano;
                if (r.critico) crits++;
                monster.hp = Math.max(0, monster.hp - r.dano);
            }

            var cura = Math.floor(player.maxHp * 0.08 * calcularMultiplicadorCura());
            cura = Math.min(cura, player.maxHp - player.hp);
            player.hp = Math.min(player.maxHp, player.hp + cura);

            addCombatLog("👊 RAJADA DE GOLPES! 4 hits = " + total + " dano + " + cura + " HP!" + (crits ? " (" + crits + " crítico(s))" : ""), "critical");
        }
    }
};

function atualizarBotaoHabilidade() {
    var btn = document.getElementById("btnSkill");
    if (!btn) return;

    var h = habilidadesClasse[player.class];
    if (!h) {
        btn.innerHTML = '<span class="combat-btn-icon">✨</span><span class="combat-btn-label">Sem Habilidade</span>';
        btn.disabled = true;
        return;
    }

    if (player.habilidadeCooldown > 0) {
        btn.innerHTML = '<span class="combat-btn-icon">⏳</span><span class="combat-btn-label">' + h.nome + ' (' + player.habilidadeCooldown + ')</span>';
        btn.disabled = true;
    } else {
        btn.innerHTML = '<span class="combat-btn-icon">✨</span><span class="combat-btn-label">' + h.nome + '</span>';
        btn.disabled = false;
    }
}

// ============================================
// SEÇÃO 10: HUD E UI DE COMBATE
// ============================================

function atualizarHUDJogadorCombate() {
    var nomeEl = document.getElementById("combatPlayerName");
    var lvEl = document.getElementById("combatPlayerLevelUI");
    var atkEl = document.getElementById("combatAtkUI");
    var defEl = document.getElementById("combatDefUI");
    var hpTextEl = document.getElementById("combatPlayerHpText");
    var portraitImg = document.getElementById("combatPlayerPortrait");
    var portraitFallback = document.getElementById("combatPlayerPortraitFallback");
    var spriteImg = document.getElementById("playerSpriteImg");
    var spriteEmoji = document.getElementById("playerSpriteEmoji");

    if (nomeEl) nomeEl.textContent = player.nome || "Herói";
    if (lvEl) lvEl.textContent = "Nv." + (player.level || 1);
    if (atkEl) atkEl.textContent = player.atk || 0;
    if (defEl) defEl.textContent = player.def || 0;
    if (hpTextEl) hpTextEl.textContent = (player.hp || 0) + "/" + (player.maxHp || 0);

    if (portraitImg && player.img) {
        portraitImg.src = player.img;
        portraitImg.style.display = "block";
        if (portraitFallback) portraitFallback.style.display = "none";
        portraitImg.onerror = function() {
            this.style.display = "none";
            if (portraitFallback) portraitFallback.style.display = "flex";
        };
    } else if (portraitImg) {
        portraitImg.style.display = "none";
        if (portraitFallback) portraitFallback.style.display = "flex";
    }

    if (spriteImg && player.img) {
        spriteImg.src = player.img;
        spriteImg.style.display = "block";
        if (spriteEmoji) spriteEmoji.style.display = "none";
        spriteImg.onerror = function() {
            this.style.display = "none";
            if (spriteEmoji) spriteEmoji.style.display = "block";
        };
    } else if (spriteImg) {
        spriteImg.style.display = "none";
        if (spriteEmoji) spriteEmoji.style.display = "block";
    }
}

function atualizarHUDMonstroCombate() {
    if (!monster) return;

    var nomeEl = document.getElementById("monsterName");
    var lvEl = document.getElementById("monsterLevelUI");
    var atkEl = document.getElementById("monsterAtkUI");
    var defEl = document.getElementById("monsterDefUI");
    var hpTextEl = document.getElementById("monsterHpText");
    var portraitImg = document.getElementById("combatEnemyPortrait");
    var portraitFallback = document.getElementById("combatEnemyPortraitFallback");
    var spriteImg = document.getElementById("monsterSpriteImg");
    var spriteEmoji = document.getElementById("monsterSpriteEmoji");

    if (nomeEl) {
        nomeEl.textContent = (monster.isBoss ? "👑 " : "") + (monster.isElite ? "🔥 " : "") + monster.name;
    }
    if (lvEl) lvEl.textContent = "Nv." + (monster.levelVisual || 1);
    if (atkEl) atkEl.textContent = monster.atk || 0;
    if (defEl) defEl.textContent = monster.def || 0;
    if (hpTextEl) hpTextEl.textContent = monster.hp + "/" + monster.maxHp;

    if (portraitImg && monster.img) {
        portraitImg.src = monster.img;
        portraitImg.style.display = "block";
        if (portraitFallback) portraitFallback.style.display = "none";
        portraitImg.onerror = function() {
            this.style.display = "none";
            if (portraitFallback) {
                portraitFallback.style.display = "flex";
                portraitFallback.textContent = monster.emoji || "👹";
            }
        };
    } else if (portraitImg) {
        portraitImg.style.display = "none";
        if (portraitFallback) {
            portraitFallback.style.display = "flex";
            portraitFallback.textContent = monster.emoji || "👹";
        }
    }

    if (spriteImg && monster.img) {
        spriteImg.src = monster.img;
        spriteImg.style.display = "block";
        if (spriteEmoji) spriteEmoji.style.display = "none";
        spriteImg.onerror = function() {
            this.style.display = "none";
            if (spriteEmoji) {
                spriteEmoji.style.display = "block";
                spriteEmoji.textContent = monster.emoji || "👹";
            }
        };
    } else if (spriteImg) {
        spriteImg.style.display = "none";
        if (spriteEmoji) {
            spriteEmoji.style.display = "block";
            spriteEmoji.textContent = monster.emoji || "👹";
        }
    }
}

function atualizarBarraMonstroVisual() {
    if (!monster) return;

    var percent = Math.max(0, (monster.hp / monster.maxHp) * 100);
    var bar = document.getElementById("monsterHpBar");
    var text = document.getElementById("monsterHpText");

    if (bar) {
        bar.style.width = percent + "%";
        bar.classList.remove("hp-critical");
        if (percent <= 20) bar.classList.add("hp-critical");
    }

    if (text) text.textContent = monster.hp + "/" + monster.maxHp;
}

function atualizarBarraPlayerVisual() {
    if (!player) return;

    var percent = Math.max(0, (player.hp / player.maxHp) * 100);
    var bar = document.getElementById("combatPlayerHpBar");
    var text = document.getElementById("combatPlayerHpText");

    if (bar) {
        bar.style.width = percent + "%";
        bar.classList.remove("hp-critical");
        if (percent <= 20) bar.classList.add("hp-critical");
    }

    if (text) text.textContent = player.hp + "/" + player.maxHp;
}

// ============================================
// SEÇÃO 11: SONS DE COMBATE
// ============================================

var sonsCombate = {
    combateInicio: "images/sons/combat/combat.ogg",
    eliteApareceu: "images/sons/combat/elite.m4a",
    bossApareceu: "images/sons/combat/boss.m4a",
    ataque: "images/sons/combat/Attack3.ogg",
    critico: "images/sons/combat/Damage2.m4a",
    danoRecebido: "images/sons/combat/Damage3.m4a",
    cura: "images/sons/combat/Heal3.ogg",
    habilidade: "images/sons/combat/Skill2.ogg",
    fuga: "images/sons/combat/Run.m4a",
    esquiva: "images/sons/combat/Miss.m4a",
    vitoria: "images/sons/combat/Victory2.m4a",
    derrota: "images/sons/combat/Defeat2.m4a"
};

function tocarSomCombate(nomeSom) {
    if (!sonsCombate[nomeSom]) return;

    try {
        var audio = new Audio(sonsCombate[nomeSom]);
        audio.volume = (typeof getVolumeJogo === "function") ? getVolumeJogo() : 0.8;

        if (nomeSom === "combateInicio" || nomeSom === "bossApareceu" || nomeSom === "eliteApareceu") {
            pararMusicaCombate();
            audio.loop = true;
            audioCombateAtual = audio;
        } else {
            audiosSFX.push(audio);
        }

        audio.play().catch(function(err) {
            console.warn("Som:", nomeSom, err);
        });
    } catch (e) {
        console.warn("Erro som:", nomeSom, e);
    }
}

function pararMusicaCombate() {
    if (audioCombateAtual) {
        try {
            audioCombateAtual.pause();
            audioCombateAtual.currentTime = 0;
        } catch (e) {}
        audioCombateAtual = null;
    }
}

function pararTodosSonsCombate() {
    pararMusicaCombate();

    audiosSFX.forEach(function(a) {
        try {
            a.pause();
            a.currentTime = 0;
        } catch (e) {}
    });

    audiosSFX = [];
}

// ============================================
// SEÇÃO 12: ANIMAÇÕES E LOG
// ============================================

function addCombatLog(texto, tipo) {
    var cl = document.getElementById("combatLog");
    if (!cl) return;

    var p = document.createElement("p");
    p.className = "combat-" + (tipo || "info");
    p.textContent = texto;
    cl.appendChild(p);
    cl.scrollTop = cl.scrollHeight;
}

function habilitarBotoesCombate(ativo) {
    ["btnAttack", "btnSkill", "btnPotion", "btnFlee"].forEach(function(id) {
        var b = document.getElementById(id);
        if (b) b.disabled = !ativo;
    });
}

function mostrarDanoFlutuante(targetId, value, type) {
    var elemId = targetId === "enemy" ? "enemyFloatingDmg" : "playerFloatingDmg";
    var elem = document.getElementById(elemId);
    if (!elem) return;

    elem.className = "floating-damage";
    elem.textContent = "";
    void elem.offsetWidth;

    switch (type) {
        case "crit":
            elem.textContent = "💥 -" + value;
            elem.classList.add("show-dmg", "crit-dmg");
            break;
        case "heal":
            elem.textContent = "+" + value;
            elem.classList.add("show-dmg", "heal-dmg");
            break;
        case "miss":
            elem.textContent = value || "MISS";
            elem.classList.add("show-dmg", "miss-dmg");
            break;
        case "defend":
            elem.textContent = value;
            elem.classList.add("show-dmg", "defend-dmg");
            break;
        default:
            elem.textContent = "-" + value;
            elem.classList.add("show-dmg");
            break;
    }

    setTimeout(function() {
        elem.className = "floating-damage";
    }, 1300);
}

function animarSprite(targetId, animClass, duration) {
    var boxId = targetId === "enemy" ? "enemySpriteBox" : "playerSpriteBox";
    var elem = document.getElementById(boxId);
    if (!elem) return;

    var idleClass = targetId === "enemy" ? "enemy-idle" : "player-idle";
    elem.classList.remove(idleClass);
    void elem.offsetWidth;
    elem.classList.add(animClass);

    setTimeout(function() {
        elem.classList.remove(animClass);
        if (animClass !== "anim-death") elem.classList.add(idleClass);
    }, duration || 500);
}

function criarParticulas(targetId, emoji, count) {
    var areaId = targetId === "enemy" ? "enemySpriteArea" : "playerSpriteArea";
    var area = document.getElementById(areaId);
    if (!area) return;

    for (var i = 0; i < (count || 5); i++) {
        var p = document.createElement("span");
        p.className = "battle-particle";
        p.textContent = emoji;
        p.style.fontSize = (Math.random() * 14 + 10) + "px";
        p.style.left = (Math.random() * 100 - 20) + "px";
        p.style.top = (Math.random() * 80 - 10) + "px";
        area.appendChild(p);

        (function(el) {
            setTimeout(function() {
                if (el.parentNode) el.remove();
            }, 900);
        })(p);
    }
}

function sacudirTela() {
    var container = document.getElementById("monsterArea");
    if (!container) return;

    container.classList.add("screen-shake");
    setTimeout(function() {
        container.classList.remove("screen-shake");
    }, 400);
}

function animarEntradaCombate(isBoss, isElite) {
    var enemyBox = document.getElementById("enemySpriteBox");
    var playerBox = document.getElementById("playerSpriteBox");
    var area = document.getElementById("monsterArea");

    if (playerBox) {
        playerBox.style.opacity = "0";
        playerBox.style.transform = "translateX(35px) translateY(10px)";
        setTimeout(function() {
            playerBox.style.transition = "all 0.35s ease";
            playerBox.style.opacity = "1";
            playerBox.style.transform = "translateX(0) translateY(0)";
        }, 50);
    }

    if (enemyBox) {
        enemyBox.style.opacity = "0";
        enemyBox.style.transform = "translateX(-35px) translateY(10px)";
        setTimeout(function() {
            enemyBox.style.transition = "all 0.35s ease";
            enemyBox.style.opacity = "1";
            enemyBox.style.transform = "translateX(0) translateY(0)";
        }, 140);
    }

    if (isBoss) setTimeout(function() { sacudirTela(); }, 220);

    if (area && (isBoss || isElite)) {
        area.classList.add("screen-shake");
        setTimeout(function() {
            area.classList.remove("screen-shake");
        }, 420);
    }
}

function getTextoEntradaCombate(monstroObj) {
    if (!monstroObj) return "⚔️ Um inimigo apareceu!";
    if (monstroObj.isBoss) return "👑 " + monstroObj.name + " surge como uma ameaça esmagadora!";
    if (monstroObj.isElite) return "🔥 " + monstroObj.name + " aparece com poder acima do normal!";
    return "⚔️ " + monstroObj.name + " apareceu!";
}

// ============================================
// SEÇÃO 13: LAYOUT E LIMPEZA
// ============================================

function ajustarLayoutSpritesCombate() {
    var arena = document.querySelector(".combat-arena");
    var enemyArea = document.getElementById("enemySpriteArea");
    var playerArea = document.getElementById("playerSpriteArea");
    var enemyBox = document.getElementById("enemySpriteBox");
    var playerBox = document.getElementById("playerSpriteBox");
    var monsterImg = document.getElementById("monsterSpriteImg");
    var playerImg = document.getElementById("playerSpriteImg");
    var monsterEmoji = document.getElementById("monsterSpriteEmoji");
    var playerEmoji = document.getElementById("playerSpriteEmoji");

    if (arena) {
        arena.style.height = "340px";
        arena.style.display = "flex";
        arena.style.alignItems = "flex-end";
        arena.style.justifyContent = "space-between";
        arena.style.padding = "20px 40px 10px 40px";
        arena.style.boxSizing = "border-box";
        arena.style.position = "relative";
        arena.style.zIndex = "1";
        arena.style.overflow = "hidden";
    }

    if (enemyArea) {
        enemyArea.style.display = "flex";
        enemyArea.style.alignItems = "flex-end";
        enemyArea.style.justifyContent = "center";
        enemyArea.style.width = "45%";
        enemyArea.style.height = "100%";
        enemyArea.style.position = "relative";
    }

    if (playerArea) {
        playerArea.style.display = "flex";
        playerArea.style.alignItems = "flex-end";
        playerArea.style.justifyContent = "center";
        playerArea.style.width = "45%";
        playerArea.style.height = "100%";
        playerArea.style.position = "relative";
    }

    if (enemyBox) {
        enemyBox.style.width = "220px";
        enemyBox.style.height = "220px";
        enemyBox.style.display = "flex";
        enemyBox.style.alignItems = "flex-end";
        enemyBox.style.justifyContent = "center";
        enemyBox.style.position = "relative";
        enemyBox.style.marginTop = "60px";
    }

    if (playerBox) {
        playerBox.style.width = "220px";
        playerBox.style.height = "220px";
        playerBox.style.display = "flex";
        playerBox.style.alignItems = "flex-end";
        playerBox.style.justifyContent = "center";
        playerBox.style.position = "relative";
        playerBox.style.marginTop = "60px";
    }

    if (monsterImg) {
        monsterImg.style.width = "170px";
        monsterImg.style.height = "170px";
        monsterImg.style.objectFit = "contain";
        monsterImg.style.objectPosition = "bottom";
    }

    if (playerImg) {
        playerImg.style.width = "170px";
        playerImg.style.height = "170px";
        playerImg.style.objectFit = "contain";
        playerImg.style.objectPosition = "bottom";
    }

    if (monsterEmoji) {
        monsterEmoji.style.fontSize = "110px";
        monsterEmoji.style.lineHeight = "1";
    }

    if (playerEmoji) {
        playerEmoji.style.fontSize = "110px";
        playerEmoji.style.lineHeight = "1";
    }
}



function encerrarLayoutCombateExpandido() {
    var actionPanel = document.getElementById("actionPanel");
    if (actionPanel) {
        actionPanel.classList.remove("combat-expanded");
        actionPanel.classList.remove("fullscreen-mode");
    }

    document.body.classList.remove("has-fullscreen-panel");

    pararMusicaCombate();

    var monsterArea = document.getElementById("monsterArea");
    if (monsterArea) {
        monsterArea.classList.remove("active-panel");
    }

    var combatPanel = document.getElementById("combatPanel");
    if (combatPanel) {
        combatPanel.classList.remove("active-panel");
    }

    var combatBg = document.getElementById("combatBackground");
    if (combatBg) {
        combatBg.style.backgroundImage = "";
    }
}

function sairCombateCompleto(destino) {
    var eraArena = !!gameState.emArena;
    var eraMasmorra = !!gameState.emMasmorra;

    encerrarLayoutCombateExpandido();

    gameState.emCombate = false;
    gameState.monstroIsBoss = false;
    gameState.emArena = false;

    pararMusicaCombate();

    if (destino && typeof mostrarPainel === "function") {
        mostrarPainel(destino);
        return;
    }

    if (eraArena && typeof mostrarPainel === "function") {
        mostrarPainel("arenaPanel");
        return;
    }

    if (eraMasmorra && typeof mostrarPainel === "function") {
        mostrarPainel("dungeonPanel");
        return;
    }

    if (gameState.areaAtual && typeof mostrarPainel === "function") {
        mostrarPainel("areaOptionsPanel");
        return;
    }

    if (typeof mostrarPainel === "function") {
        mostrarPainel("navigationContainer");
    }
}



// ============================================
// SEÇÃO 14: INICIAR COMBATE
// ============================================

function iniciarCaca() {
    if (player.hp <= 0) {
        mostrarNotificacao("❤️ Precisa de HP!");
        return;
    }

    if (!gameState.areaAtual || !bancoDeMonstros[gameState.areaAtual]) {
        mostrarNotificacao("⚠️ Área inválida.");
        return;
    }

    if (typeof tentarEventoAleatorio === "function" && tentarEventoAleatorio()) {
        return;
    }

    var monstroBase = randomChoice(bancoDeMonstros[gameState.areaAtual]);
    var elite = tentarGerarElite(monstroBase);
    if (elite) monstroBase = elite;

    gameState.combateOrigem = "caca";
    gameState.monstroIsBoss = false;

    iniciarCombate(monstroBase, false);
}

function iniciarCombate(monstroBase, isBoss) {
   

    gameState.emCombate = true;
    gameState.monstroIsBoss = isBoss;
    limparTodosStatus();
    iaTurnoAtual = 0;
    gameState.usouUltimoSuspiro = false;
    gameState.usouFenix = false;

    var escala = 1;
    if (!isBoss && gameState.areaAtual && areas[gameState.areaAtual]) {
        escala = Math.max(1, 1 + (player.level - areas[gameState.areaAtual].min) * 0.08);
    }

    monster = {
        name: monstroBase.name || "Monstro",
        nomeBase: monstroBase.nomeBase || monstroBase.name || "Monstro",
        emoji: monstroBase.emoji || "👹",
        img: monstroBase.img || "",
        hp: Math.floor((monstroBase.hp || 30) * escala),
        maxHp: Math.floor((monstroBase.hp || 30) * escala),
        atk: Math.floor((monstroBase.atk || 8) * escala),
        def: Math.floor((monstroBase.def || 3) * escala),
        gold: monstroBase.gold || [5, 15],
        xp: monstroBase.xp || 10,
        drops: monstroBase.drops || [],
        isBoss: !!isBoss,
        isElite: monstroBase.isElite || false,
        eliteMod: monstroBase.eliteMod || null
    };

    monster.levelVisual = calcularNivelVisualMonstro(monstroBase, isBoss);
    monster.dificuldadeVisual = calcularDificuldadeVisualMonstro(monster);
    monster.perigoVisual = calcularPerigoVisualMonstro(monster);

    player.defendendo = false;
    player.habilidadeCooldown = Math.max(0, player.habilidadeCooldown);

    mostrarPainelFullscreen("monsterArea");
    aplicarFundoCombate(gameState.areaAtual);

    var actionPanel = document.getElementById("actionPanel");
    if (actionPanel) actionPanel.classList.add("combat-expanded");

    atualizarHUDJogadorCombate();
    atualizarHUDMonstroCombate();
    ajustarLayoutSpritesCombate();

    setTimeout(function() {
        atualizarBarraMonstroVisual();
        atualizarBarraPlayerVisual();
    }, 50);

    var cl = document.getElementById("combatLog");
    if (cl) cl.innerHTML = "";

 setTimeout(function() {
    if (!monster) return;

    addCombatLog("Dificuldade: " + (monster.dificuldadeVisual || "Normal"), "info");
    if (monster.perigoVisual) addCombatLog(monster.perigoVisual, "info");
    addCombatLog(getTextoEntradaCombate(monster), "info");

    if (monster.isBoss) {
        addCombatLog("👑 É um CHEFE! Prepare-se!", "critical");
    } else if (monster.isElite) {
        addCombatLog("🔥 Monstro ELITE! Recompensa maior!", "critical");
    }
}, 300);

    if (monster.isBoss) tocarSomCombate("bossApareceu");
    else if (monster.isElite) tocarSomCombate("eliteApareceu");
    else tocarSomCombate("combateInicio");

    animarEntradaCombate(monster.isBoss, monster.isElite);
    atualizarBotaoHabilidade();
    habilitarBotoesCombate(true);
    renderizarStatusUI();

    if (typeof log === "function") log("Combate contra " + monster.name + "!");
}

// ============================================
// SEÇÃO 15: IA E AÇÃO DO MONSTRO
// ============================================

function getAcaoMonstro() {
    if (!monster) return "atacar";

    var padrao = iaMonstroPadroes[monster.nomeBase || monster.name];
    if (!padrao) return "atacar";

    var acao = padrao.padrao[iaTurnoAtual % padrao.padrao.length];
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
            var r = calcularDano(Math.floor(monster.atk * modAtk), Math.floor(player.def * modDef), false);
            var dano = r.dano;
            if (player.defendendo) {
                dano = Math.floor(dano * 0.4);
                player.defendendo = false;
                addCombatLog("🛡️ Defesa! " + r.dano + "→" + dano, "player");
            }
            player.hp = Math.max(0, player.hp - dano);
            tocarSomCombate("danoRecebido");
            addCombatLog("🔴 " + monster.name + " ataca: " + dano + " dano!", "enemy");
            break;

        case "atacar_forte":
            var rf = calcularDano(Math.floor(monster.atk * 1.8 * modAtk), Math.floor(player.def * modDef), false);
            var danoF = rf.dano;
            if (player.defendendo) {
                danoF = Math.floor(danoF * 0.4);
                player.defendendo = false;
            }
            player.hp = Math.max(0, player.hp - danoF);
            tocarSomCombate("danoRecebido");
            addCombatLog("💥 " + monster.name + " GOLPE FORTE: " + danoF + " dano!", "critical");
            break;

        case "defender":
            aplicarStatus("monstro", "fortificado");
            addCombatLog("🛡️ " + monster.name + " se defende!", "enemy");
            break;

        case "buff":
            monster.atk = Math.floor(monster.atk * 1.15);
            addCombatLog("⬆️ " + monster.name + " se fortalece!", "enemy");
            break;

        case "curar":
            var cura = Math.floor(monster.maxHp * randomInt(10, 20) / 100);
            monster.hp = Math.min(monster.maxHp, monster.hp + cura);
            addCombatLog("💚 " + monster.name + " se cura! +" + cura + " HP!", "enemy");
            break;

        case "status_atk":
        case "especial":
            var re = calcularDano(Math.floor(monster.atk * (acao === "especial" ? 1.5 : 1.0) * modAtk), Math.floor(player.def * modDef), false);
            var danoE = re.dano;
            if (player.defendendo) {
                danoE = Math.floor(danoE * 0.4);
                player.defendendo = false;
            }
            player.hp = Math.max(0, player.hp - danoE);
            tocarSomCombate("danoRecebido");
            addCombatLog("⚡ " + monster.name + " atinge: " + danoE + " dano!", acao === "especial" ? "critical" : "enemy");
            if (padrao.status && Math.random() < padrao.chanceStatus) aplicarStatus("jogador", padrao.status);
            break;
    }
}

// ============================================
// SEÇÃO 16: AÇÕES DO JOGADOR
// ============================================

function atacar() {
    if (!gameState.emCombate || !monster || monster.hp <= 0) return;

    var jogadorPula = processarStatus("jogador");
    renderizarStatusUI();

    if (jogadorPula) {
        addCombatLog("⏭️ Você está incapacitado!", "enemy");
        player.defendendo = false;
        setTimeout(turnoInimigo, 800);
        return;
    }

    if (player.hp <= 0) {
        updateUI();
        atualizarHUDJogadorCombate();
        setTimeout(derrotaCombate, 600);
        return;
    }

    habilitarBotoesCombate(false);
    tocarSomCombate("ataque");

    var modAtk = getModificadorStatus("jogador", "atk");
    var atkFinal = Math.floor(player.atk * modAtk);

    if (player.buffBardo && player.buffBardo > 0) {
        atkFinal += 3;
        player.buffBardo--;
        if (player.buffBardo <= 0 && typeof log === "function") {
            log("🎵 A inspiração do bardo se desvaneceu...");
        }
    }

    var r = calcularDano(atkFinal, monster.def, true);
    var dano = r.dano;

    animarSprite("player", "anim-attack-right", 400);

    setTimeout(function() {
        if (!monster) return;

        monster.hp = Math.max(0, monster.hp - dano);
        animarSprite("enemy", "anim-hit", 400);
        mostrarDanoFlutuante("enemy", dano, r.critico ? "crit" : "normal");
        criarParticulas("enemy", r.critico ? "💥" : "⚔️", r.critico ? 8 : 5);

        if (r.critico) {
            tocarSomCombate("critico");
            sacudirTela();
            addCombatLog("💥 CRÍTICO! " + dano + " dano!", "critical");
        } else {
            addCombatLog("⚔️ " + dano + " dano!", "player");
        }

        player.defendendo = false;

        updateUI();
        atualizarHUDJogadorCombate();
        atualizarHUDMonstroCombate();
        atualizarBarraMonstroVisual();
        atualizarBarraPlayerVisual();
        renderizarStatusUI();

        if (monster.hp <= 0) {
            animarSprite("enemy", "anim-death", 1000);
            criarParticulas("enemy", "⭐", 15);
            setTimeout(vitoriaCombate, 1000);
            return;
        }

        setTimeout(turnoInimigo, 900);
    }, 350);
}

function attack() {
    atacar();
}

function defender() {
    if (!gameState.emCombate || !monster) return;

    habilitarBotoesCombate(false);
    player.defendendo = true;
    animarSprite("player", "anim-defend", 500);
    criarParticulas("player", "🛡️", 6);
    mostrarDanoFlutuante("player", "DEF!", "defend");
    addCombatLog("🛡️ Defendendo!", "player");

    setTimeout(turnoInimigo, 900);
}

function fugir() {
    if (!gameState.emCombate || !monster) return;

    tocarSomCombate("fuga");
    var chance = calcularChanceFuga(gameState.monstroIsBoss);

    if (Math.random() < chance) {
        addCombatLog("🏃 Fugiu! (" + Math.floor(chance * 100) + "%)", "info");
        gameState.emCombate = false;
        pararMusicaCombate();

        setTimeout(function() {
            encerrarLayoutCombateExpandido();
           

            if (gameState.emMasmorra) {
                mostrarPainelFullscreen("dungeonPanel");
            } else {
                mostrarPainelFullscreen("areaOptionsPanel");
            }
        }, 400);
    } else {
        addCombatLog("❌ Falha ao fugir!", "enemy");
        habilitarBotoesCombate(false);
        player.defendendo = false;
        setTimeout(turnoInimigo, 700);
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
            mostrarNotificacao("🧪 +" + cr + " HP!");
            updateUI();
        } else {
            mostrarNotificacao("Sem poções!");
        }
        return;
    }

    if (player.potions <= 0) {
        mostrarNotificacao("Sem poções!");
        addCombatLog("❌ Sem poções!", "critical");
        return;
    }

    if (player.hp >= player.maxHp) {
        mostrarNotificacao("HP já está cheio!");
        return;
    }

    tocarSomCombate("cura");
    habilitarBotoesCombate(false);

    var c2 = Math.floor(30 * mult);
    var cr2 = Math.min(c2, player.maxHp - player.hp);
    player.hp = Math.min(player.maxHp, player.hp + c2);
    player.potions--;

    animarSprite("player", "anim-heal", 600);
    mostrarDanoFlutuante("player", cr2, "heal");
    criarParticulas("player", "✨", 10);
    addCombatLog("🧪 +" + cr2 + " HP! (Restam: " + player.potions + ")", "heal");

    updateUI();
    atualizarHUDJogadorCombate();
    atualizarBarraPlayerVisual();
    player.defendendo = false;

    setTimeout(turnoInimigo, 900);
}

function usarHabilidade() {
    if (!gameState.emCombate || !monster || monster.hp <= 0) return;

    var habilidade = habilidadesClasse[player.class];
    if (!habilidade) {
        mostrarNotificacao("⚠️ Classe sem habilidade!");
        return;
    }

    if (player.habilidadeCooldown > 0) {
        mostrarNotificacao("⏳ Recarga: " + player.habilidadeCooldown);
        return;
    }

    var jogadorPula = processarStatus("jogador");
    renderizarStatusUI();

    if (jogadorPula) {
        addCombatLog("⏭️ Incapacitado!", "enemy");
        player.defendendo = false;
        setTimeout(turnoInimigo, 800);
        return;
    }

    if (player.hp <= 0) {
        updateUI();
        setTimeout(derrotaCombate, 600);
        return;
    }

    habilitarBotoesCombate(false);
    tocarSomCombate("habilidade");
    animarSprite("player", "anim-skill", 700);
    criarParticulas("player", "✨", 10);

    setTimeout(function() {
        if (!monster) return;

        habilidade.exec();
        player.habilidadeCooldown = habilidade.cd || 3;
        player.defendendo = false;

        atualizarHUDJogadorCombate();
        atualizarHUDMonstroCombate();
        atualizarBarraMonstroVisual();
        atualizarBarraPlayerVisual();
        renderizarStatusUI();
        atualizarBotaoHabilidade();
        updateUI();

        if (monster.hp <= 0) {
            animarSprite("enemy", "anim-death", 1000);
            criarParticulas("enemy", "⭐", 15);
            setTimeout(vitoriaCombate, 1000);
            return;
        }

        setTimeout(turnoInimigo, 900);
    }, 350);
}

// ============================================
// SEÇÃO 17: TURNO DO INIMIGO
// ============================================

function turnoInimigo() {
    if (!gameState.emCombate || !monster || monster.hp <= 0) return;

    addCombatLog("── Turno de " + monster.name + " ──", "info");

    var enemyBox = document.getElementById("enemySpriteBox");
    if (enemyBox) {
        enemyBox.style.filter = "drop-shadow(0 0 14px rgba(255,80,80,0.7))";
        setTimeout(function() {
            enemyBox.style.filter = "";
        }, 500);
    }

    var monstroPula = processarStatus("monstro");
    renderizarStatusUI();

    if (monstroPula) {
        addCombatLog("⏭️ " + monster.name + " incapacitado!", "player");

        if (player.habilidadeCooldown > 0) player.habilidadeCooldown--;
        atualizarBotaoHabilidade();
        habilitarBotoesCombate(true);

        if (monster.hp <= 0) setTimeout(vitoriaCombate, 600);
        return;
    }

    if (Math.random() < calcularChanceEsquiva()) {
        addCombatLog("🏃 Desviou!", "player");
        if (typeof estatisticas !== "undefined") estatisticas.esquivas++;
        tocarSomCombate("esquiva");

        if (player.habilidadeCooldown > 0) player.habilidadeCooldown--;
        atualizarBotaoHabilidade();
        habilitarBotoesCombate(true);
        return;
    }

    animarSprite("enemy", "anim-attack-left", 500);

    setTimeout(function() {
        var acao = getAcaoMonstro();
        executarAcaoMonstro(acao);

        updateUI();
        atualizarHUDJogadorCombate();
        atualizarHUDMonstroCombate();
        atualizarBarraPlayerVisual();
        atualizarBarraMonstroVisual();
        renderizarStatusUI();

        if (player.habilidadeCooldown > 0) player.habilidadeCooldown--;
        atualizarBotaoHabilidade();

        if (player.hp <= 0) {
            animarSprite("player", "anim-death", 1000);
            criarParticulas("player", "💀", 10);
            updateUI();
            setTimeout(derrotaCombate, 1000);
            return;
        }

        habilitarBotoesCombate(true);
        addCombatLog("── Seu turno ──", "info");

        var playerBox = document.getElementById("playerSpriteBox");
        if (playerBox) {
            playerBox.style.filter = "drop-shadow(0 0 14px rgba(80,160,255,0.7))";
            setTimeout(function() {
                playerBox.style.filter = "";
            }, 500);
        }
    }, 400);
}

// ============================================
// SEÇÃO 18: VITÓRIA E DERROTA
// ============================================

function vitoriaCombate() {
    if (!monster) return;

    gameState.emCombate = false;
    pararMusicaCombate();
    tocarSomCombate("vitoria");

    addCombatLog("🎉 " + monster.name + " derrotado!", "critical");

    if (typeof estatisticas !== "undefined") {
        estatisticas.monstrosDerrotados++;
        if (monster.isElite) estatisticas.elitesDerrotados++;
        if (monster.isBoss) estatisticas.bossesDerrotados++;
    }

    if (gameState.combateOrigem === "arena") {
        mostrarNotificacao("🏟️ Onda " + arena.ondaAtual + " completa!");
        setTimeout(function() {
            encerrarLayoutCombateExpandido();
          
            proximaOndaArena();
        }, 700);
        return;
    }

    var gMin = monster.gold ? monster.gold[0] : 5;
    var gMax = monster.gold ? monster.gold[1] : 15;
    var ouro = Math.floor(randomInt(gMin, gMax) * calcularBonusOuro() * getBonusHardcore("ouro"));
    var xp = monster.xp || 10;
    var dropsTexto = "";

    if (monster.drops && monster.drops.length > 0) {
        var bonusDrop = calcularBonusDrop();
        monster.drops.forEach(function(d) {
            if (Math.random() < Math.min(0.95, d.chance + bonusDrop)) {
                var extras = { precoVenda: d.precoVenda || 5 };

                if (d.consumivel && d.efeito) {
                    extras.tipo = "consumivel";
                    extras.efeito = d.efeito;
                    extras.descricao = d.efeito.tipo === "cura"
                        ? "Restaura " + d.efeito.valor + " HP"
                        : "+" + d.efeito.valor;
                } else {
                    extras.tipo = "material";
                }

                if (typeof adicionarItemInventario === "function") {
                    adicionarItemInventario(d.item, d.icone, 1, extras);
                }

                dropsTexto += "\n" + d.icone + " " + d.item;
            }
        });
    }

    player.gold += ouro;
    if (typeof estatisticas !== "undefined") estatisticas.ouroTotal += ouro;

    if (typeof verificarProgressoMissao === "function") {
        verificarProgressoMissao("monstro_derrotado", { nome: monster.nomeBase || monster.name });
    }

    if (typeof verificarConquistas === "function") verificarConquistas();
    if (typeof ganharExp === "function") ganharExp(xp);

    if (typeof log === "function") {
        log("🎉 " + monster.name + " derrotado! +" + ouro + "💰 +" + xp + " XP.");
    }

if (gameState.combateOrigem === "masmorra") {
    setTimeout(function() {
        encerrarLayoutCombateExpandido();
        limparCombate();
        mostrarPainelFullscreen("dungeonPanel");

        var dungeonPanel = document.getElementById("dungeonPanel");
        if (dungeonPanel) {
            dungeonPanel.scrollTop = 0;
        }
    }, 700);
    return;
}

if (gameState.combateOrigem === "masmorraBoss") {
    var areaBoss = areas[gameState.areaAtual];
    var tierBoss = areaBoss ? areaBoss.tier : 1;
    var ouroBoss = randomInt(50, 150) * tierBoss;

    player.gold += ouroBoss;

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

    if (typeof log === "function") {
        log("🏰 Masmorra completa! +" + ouroBoss + " ouro!");
    }

    console.log("DEBUG: mostrando popup de masmorra boss");

    // NÃO limpar combate aqui
    // NÃO trocar painel aqui
    // NÃO encerrar layout aqui

    if (typeof mostrarResultado === "function") {
        mostrarResultado(
            "🏰 MASMORRA COMPLETA!",
            "🎊",
            "Você derrotou o chefe final da masmorra!",
            "🏆 +" + ouroBoss + " ouro!"
        );
    }

    setTimeout(function() {
        gameState.emCombate = false;
        gameState.monstroIsBoss = false;
        gameState.emMasmorra = false;

        if (typeof encerrarLayoutCombateExpandido === "function") {
            encerrarLayoutCombateExpandido();
        }

        if (typeof limparCombate === "function") {
            limparCombate();
        }

        mostrarPainelFullscreen("areaOptionsPanel");
    }, 3500);

    return;
}
    setTimeout(function() {
        encerrarLayoutCombateExpandido();
       

        if (typeof mostrarResultado === "function") {
            mostrarResultado(
                monster.isBoss ? "👑 CHEFE DERROTADO!" : (monster.isElite ? "🔥 ELITE DERROTADO!" : "⚔️ VITÓRIA!"),
                "🏆",
                "Derrotou " + monster.name + "!",
                "📊 XP: +" + xp + "\n💰 Ouro: +" + ouro + dropsTexto
            );
        }

        setTimeout(function() {
            if (typeof voltarAposCombate === "function") {
                voltarAposCombate();
            } else {
                mostrarPainelFullscreen("areaOptionsPanel");
            }
        }, 1200);
    }, 350);
}

function derrotaCombate() {
    gameState.emCombate = false;
    gameState.emMasmorra = false;

    encerrarLayoutCombateExpandido();
    pararMusicaCombate();
    tocarSomCombate("derrota");

    addCombatLog("💀 Você foi derrotado...", "critical");

    if (typeof log === "function") {
        log("💀 Derrotado por " + (monster ? monster.name : "???") + "...");
    }

    if (gameState.combateOrigem === "arena") {
        arena.emArena = false;
        finalizarArena("DERROTA");
        player.hp = Math.floor(player.maxHp * 0.3);
        updateUI();
        return;
    }

    player.hp = 0;
    updateUI();

    var goText = document.getElementById("gameOverText");
    if (goText) goText.textContent = "Derrotado por " + (monster ? monster.name : "um inimigo") + "...";

    var normalDiv = document.getElementById("gameOverNormal");
    var hardcoreDiv = document.getElementById("gameOverHardcore");

    if (typeof isHardcore === "function" && isHardcore()) {
        if (normalDiv) normalDiv.style.display = "none";
        if (hardcoreDiv) hardcoreDiv.style.display = "block";
    } else {
        if (normalDiv) normalDiv.style.display = "block";
        if (hardcoreDiv) hardcoreDiv.style.display = "none";
    }

    setTimeout(function() {
        
        if (typeof voltarAposCombate === "function") {
            voltarAposCombate();
        }
    }, 3500);

    var gs = document.getElementById("gameOverScreen");
    if (gs) {
        gs.style.display = "flex";
        gs.classList.add("show");
    }
}

// ============================================
// SEÇÃO 19: ARENA
// ============================================

var arena = {
    recordeOndas: 0,
    emArena: false,
    ondaAtual: 0,
    monstroAtual: null
};

var arenaEntradas = [
    { nome: "🥉 Bronze", custo: 50, multiplicadorMonstro: 1.0, multiplicadorRecompensa: 1.0 },
    { nome: "🥈 Prata", custo: 150, multiplicadorMonstro: 1.5, multiplicadorRecompensa: 1.8 },
    { nome: "🥇 Ouro", custo: 400, multiplicadorMonstro: 2.0, multiplicadorRecompensa: 3.0 },
    { nome: "💎 Diamante", custo: 1000, multiplicadorMonstro: 3.0, multiplicadorRecompensa: 5.0 }
];

var arenaDificuldade = null;

function abrirArena() {
    mostrarPainelFullscreen("arenaPanel");
    renderizarArena();
}

function renderizarArena() {
    var el = document.getElementById("arenaContent");
    if (!el) return;

    if (arena.emArena) {
        if (typeof renderizarArenaEmAndamento === "function") renderizarArenaEmAndamento();
        return;
    }

    var html = '<p class="gold-display">💰 Ouro: ' + player.gold + '</p>';
    html += '<p style="text-align:center;color:#fbbf24;font-size:0.9em;margin-bottom:10px;">🏆 Recorde: Onda ' + arena.recordeOndas + '</p>';
    html += '<p style="text-align:center;color:#94a3b8;font-size:0.8em;margin-bottom:15px;">Sobreviva ondas de monstros!</p>';

    arenaEntradas.forEach(function(entrada, i) {
        var podePagar = player.gold >= entrada.custo;
        html +=
            '<div style="display:flex;justify-content:space-between;align-items:center;padding:10px;margin-bottom:6px;background:rgba(30,41,59,0.6);border-radius:8px;border:1px solid #334155;">' +
                '<div><strong style="color:#e2e8f0;">' + entrada.nome + '</strong><br><small style="color:#64748b;">Monstros ×' + entrada.multiplicadorMonstro + ' | Recompensa ×' + entrada.multiplicadorRecompensa + '</small></div>' +
                '<div><span style="color:#fbbf24;">💰 ' + entrada.custo + '</span><br><button onclick="entrarArena(' + i + ')" ' + (!podePagar ? 'disabled' : '') + ' style="padding:5px 15px;font-size:0.85em;margin-top:3px;">Entrar</button></div>' +
            '</div>';
    });

    el.innerHTML = html;
}

function entrarArena(idx) {
    var entrada = arenaEntradas[idx];
    if (!entrada) return;

    if (player.gold < entrada.custo) {
        mostrarNotificacao("💰 Insuficiente!");
        return;
    }

    if (player.hp <= 0) {
        mostrarNotificacao("❤️ Precisa de HP!");
        return;
    }

    player.gold -= entrada.custo;
    arena.emArena = true;
    arena.ondaAtual = 0;
    arenaDificuldade = entrada;

    updateUI();

    if (typeof log === "function") log("🏟️ Entrou na Arena " + entrada.nome + "!");
    mostrarNotificacao("🏟️ Arena " + entrada.nome + " — Prepare-se!");

    proximaOndaArena();
}

function proximaOndaArena() {
    arena.ondaAtual++;

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

    gameState.combateOrigem = "arena";
    iniciarCombate(monstroArena, false);
    addCombatLog("🏟️ ARENA — Onda " + arena.ondaAtual, "critical");
}

function finalizarArena(motivo) {
    var ondas = arena.ondaAtual || 0;
    arena.emArena = false;
    pararMusicaCombate();

    if (ondas > arena.recordeOndas) {
        arena.recordeOndas = ondas;
        mostrarNotificacao("🏆 NOVO RECORDE: Onda " + ondas + "!", 4000);
    }

    var multRec = arenaDificuldade ? arenaDificuldade.multiplicadorRecompensa : 1;
    var ouroRecompensa = Math.floor(ondas * 20 * multRec);
    var xpRecompensa = Math.floor(ondas * 15 * multRec);

    player.gold += ouroRecompensa;
    if (typeof ganharExp === "function") ganharExp(xpRecompensa);
    arenaDificuldade = null;

    if (typeof mostrarResultado === "function") {
        mostrarResultado(
            "🏟️ ARENA — " + motivo,
            motivo === "DERROTA" ? "💀" : "🏆",
            "Sobreviveu " + ondas + " ondas!",
            "💰 +" + ouroRecompensa + " ouro\n📊 +" + xpRecompensa + " XP"
        );
    }

    if (typeof log === "function") {
        log("🏟️ Arena: " + ondas + " ondas. +" + ouroRecompensa + "💰 +" + xpRecompensa + " XP.");
    }

    updateUI();
}

function abandonarArena() {
    finalizarArena("ABANDONOU");
    
    if (typeof voltarMenuPrincipal === "function") voltarMenuPrincipal();
}

function voltarPosCombate() {
    encerrarLayoutCombateExpandido();

    if (gameState.combateOrigem === "masmorraBoss") {
        if (typeof completarMasmorra === "function") {
            completarMasmorra();
            return;
        }
        mostrarPainelFullscreen("areaOptionsPanel");
        return;
    }

    if (gameState.combateOrigem === "masmorra") {
        mostrarPainelFullscreen("dungeonPanel");
        return;
    }

    if (gameState.combateOrigem === "arena") {
        mostrarPainelFullscreen("arenaPanel");
        return;
    }

    mostrarPainelFullscreen("areaOptionsPanel");
}
function limparCombate() {
    var actionPanel = document.getElementById("actionPanel");
    if (actionPanel) {
        actionPanel.classList.remove("combat-expanded");
    }

    var monsterArea = document.getElementById("monsterArea");
    if (monsterArea) {
        monsterArea.classList.remove("active-panel");
    }

    var combatBg = document.getElementById("combatBackground");
    if (combatBg) {
        combatBg.style.backgroundImage = "";
        combatBg.classList.remove("screen-shake");
    }

    var combatLog = document.getElementById("combatLog");
    if (combatLog) {
        combatLog.innerHTML = "";
    }

    var enemyDmg = document.getElementById("enemyFloatingDmg");
    if (enemyDmg) {
        enemyDmg.className = "floating-damage";
        enemyDmg.textContent = "";
    }

    var playerDmg = document.getElementById("playerFloatingDmg");
    if (playerDmg) {
        playerDmg.className = "floating-damage";
        playerDmg.textContent = "";
    }

    pararMusicaCombate();
}