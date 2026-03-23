// ============================================
// UI.JS — VERSÃO COMPLETA CORRIGIDA
// PARTE 1/2
// ============================================

// ============================================
// SEÇÃO 1: CONSTANTES E CONTROLE
// ============================================

const PAINEIS_ACTION = [
    "navigationContainer",
    "areaSelectionPanel",
    "areaOptionsPanel",
    "monsterArea",
    "dungeonPanel",
    "inventoryPanel",
    "cidadePanel",
    "lojaPanel",
    "armariaPanel",
    "talentosPanel",
    "treinamentoPanel",
    "forjaPanel",
    "arenaPanel",
    "cemiterioPanel",
    "historiaPanel",
    "estalagemPanel",
    "tavernaPanel",
    "guildaPanel",
    "eventoPanel",
    "mineracaoPanel"
];

var pilhaNavegacao = [];
var painelAtual = "navigationContainer";

// ============================================
// SEÇÃO 2: TELAS PRINCIPAIS
// ============================================

function mudarTela(id) {
    document.querySelectorAll(".screen").forEach(function(screen) {
        screen.classList.remove("active");
    });

    var tela = document.getElementById(id);
    if (tela) {
        tela.classList.add("active");
    }

    document.body.style.backgroundImage =
        id === "welcomeScreen"
            ? "url('images/Fundo/rpg.png')"
            : "url('images/Fundo/tela.png')";

    if (id === "game") {
        pilhaNavegacao = [];
        painelAtual = "navigationContainer";
    }
}

// ============================================
// SEÇÃO 3: CONTROLE DE PAINÉIS
// ============================================

function esconderTodosPaineis() {
    PAINEIS_ACTION.forEach(function(id) {
        var el = document.getElementById(id);
        if (el) {
            el.classList.remove("active-panel");
        }
    });
}

function mostrarPainelFullscreen(painelId) {
    esconderTodosPaineis();

    var painel = document.getElementById(painelId);
    if (painel) {
        void painel.offsetWidth;
        painel.classList.add("active-panel");
        painel.scrollTop = 0;
    }

    var actionPanel = document.getElementById("actionPanel");
    if (actionPanel) {
        actionPanel.classList.add("fullscreen-mode");
        actionPanel.scrollTop = 0;
    }

    document.body.classList.add("has-fullscreen-panel");
    painelAtual = painelId;
}

function mostrarPainelfullscreen(painelId) {
    mostrarPainelFullscreen(painelId);
}

function mostrarPainel(painelId) {
    if (painelId !== "navigationContainer") {
        mostrarPainelFullscreen(painelId);
        return;
    }

    esconderTodosPaineis();

    var painel = document.getElementById(painelId);
    if (painel) {
        void painel.offsetWidth;
        painel.classList.add("active-panel");
    }

    painelAtual = painelId;
    sairFullscreen();
}

function mostrarPainelAcao(painelId) {
    mostrarPainelFullscreen(painelId);
}

function sairFullscreen() {
    var actionPanel = document.getElementById("actionPanel");
    if (actionPanel) {
        actionPanel.classList.remove("fullscreen-mode");
    }

    document.body.classList.remove("has-fullscreen-panel");
}

function voltarMenuPrincipal() {
    
    if (typeof encerrarLayoutCombateExpandido === "function") encerrarLayoutCombateExpandido();

    sairFullscreen();
    esconderTodosPaineis();

    var nav = document.getElementById("navigationContainer");
    if (nav) {
        nav.classList.add("active-panel");
    }

    painelAtual = "navigationContainer";

    var subMenu = document.getElementById("subMenu");
    if (subMenu) subMenu.innerHTML = "";

    document.querySelectorAll(".nav-btn").forEach(function(btn) {
        btn.classList.remove("active");
    });

    var logEl = document.getElementById("log");
    if (logEl) logEl.style.display = "block";
}

function voltarSelecaoArea() {
   
    if (typeof encerrarLayoutCombateExpandido === "function") encerrarLayoutCombateExpandido();
    mostrarPainelFullscreen("areaSelectionPanel");
}

// ============================================
// SEÇÃO 4: CONTROLE PÓS-COMBATE E PÓS-MASMORRA
// ============================================

function voltarAposCombate() {
   
    if (typeof encerrarLayoutCombateExpandido === "function") encerrarLayoutCombateExpandido();
    mostrarPainelFullscreen("areaOptionsPanel");
}

function voltarAposMasmorra() {
   
    if (typeof encerrarLayoutCombateExpandido === "function") encerrarLayoutCombateExpandido();
    mostrarPainelFullscreen("areaOptionsPanel");
}

function voltarAposMorte() {
    voltarMenuPrincipal();
}

function fecharResultado() {
    
    if (typeof encerrarLayoutCombateExpandido === "function") encerrarLayoutCombateExpandido();

    var dungeonPanel = document.getElementById("dungeonPanel");

    if (dungeonPanel && dungeonPanel.classList.contains("active-panel")) {
        voltarAposMasmorra();
        return;
    }

    if (painelAtual && painelAtual !== "navigationContainer" && painelAtual !== "monsterArea") {
        mostrarPainelFullscreen(painelAtual);
        return;
    }

    mostrarPainelFullscreen("areaOptionsPanel");
}

// ============================================
// SEÇÃO 5: MENU PRINCIPAL E NAVEGAÇÃO
// ============================================

function showSubMenu(tipo) {
    var subMenu = document.getElementById("subMenu");
    if (subMenu) subMenu.innerHTML = "";

    if (tipo === "explorar") {
        if (typeof atualizarLockAreas === "function") atualizarLockAreas();
        mostrarPainelFullscreen("areaSelectionPanel");
        if (typeof renderizarMapaVisual === "function") renderizarMapaVisual();

    } else if (tipo === "cidade") {
        mostrarPainelFullscreen("cidadePanel");

    } else if (tipo === "inventario") {
        if (typeof renderizarInventario === "function") renderizarInventario();
        mostrarPainelFullscreen("inventoryPanel");

    } else if (tipo === "talentos") {
        if (typeof renderizarTalentos === "function") renderizarTalentos();
        if (typeof renderizarConquistas === "function") renderizarConquistas();
        if (typeof renderizarEstatisticas === "function") renderizarEstatisticas();
        if (typeof renderizarArvoreHabilidades === "function") renderizarArvoreHabilidades();
        mostrarPainelFullscreen("talentosPanel");
    }

    var logEl = document.getElementById("log");
    if (logEl) logEl.style.display = "block";
}

// ============================================
// SEÇÃO 6: NAVEGAÇÃO EXPLORAR
// ============================================

function abrirExplorar() {
    if (typeof atualizarLockAreas === "function") atualizarLockAreas();
    mostrarPainelFullscreen("areaSelectionPanel");
    if (typeof renderizarMapaVisual === "function") renderizarMapaVisual();
}

function voltarDaMineracao() {
    mostrarPainelFullscreen("areaOptionsPanel");
}

function sairMasmorra() {
   
    if (typeof encerrarLayoutCombateExpandido === "function") encerrarLayoutCombateExpandido();
    mostrarPainelFullscreen("areaOptionsPanel");
}

function entrarCombate() {
    mostrarPainelFullscreen("monsterArea");
}

function sairDoCombate() {
    
    if (typeof encerrarLayoutCombateExpandido === "function") encerrarLayoutCombateExpandido();
    mostrarPainelFullscreen("areaOptionsPanel");
}

function fecharEvento() {
    mostrarPainelFullscreen("areaOptionsPanel");
}

// ============================================
// SEÇÃO 7: NAVEGAÇÃO CIDADE
// ============================================

function abrirLoja() {
    mostrarPainelFullscreen("lojaPanel");
    var lojaGold = document.getElementById("lojaGoldUI");
    if (lojaGold) lojaGold.textContent = player.gold;
    trocarAbaLoja("comprar");
}

function fecharLoja() {
    mostrarPainelFullscreen("cidadePanel");
}

function abrirArmaria() {
    mostrarPainelFullscreen("armariaPanel");
    var armariaGold = document.getElementById("armariaGoldUI");
    if (armariaGold) armariaGold.textContent = player.gold;
    trocarAbaArmaria("comprar");
}

function fecharArmaria() {
    mostrarPainelFullscreen("cidadePanel");
}

function fecharTreinamento() {
    mostrarPainelFullscreen("cidadePanel");
}

function fecharTaverna() {
    mostrarPainelFullscreen("cidadePanel");
}

function fecharGuilda() {
    mostrarPainelFullscreen("cidadePanel");
}

function fecharArena() {
    if (typeof arena !== "undefined" && arena.emArena) {
        mostrarNotificacao("⚠️ Abandone a arena primeiro!");
        return;
    }
    mostrarPainelFullscreen("cidadePanel");
}

function fecharForja() {
    mostrarPainelFullscreen("cidadePanel");
}

function fecharEstalagem() {
    mostrarPainelFullscreen("cidadePanel");
}

// ============================================
// SEÇÃO 8: LOG E NOTIFICAÇÕES
// ============================================

function log(msg) {
    var lc = document.getElementById("logContent");
    if (!lc) return;
    lc.innerHTML = "<p>" + msg + "</p>" + lc.innerHTML;
}

function mostrarNotificacao(texto, duracao) {
    duracao = duracao || 2500;

    var n = document.getElementById("notification");
    var nt = document.getElementById("notificationText");
    if (!n || !nt) return;

    nt.textContent = texto;
    n.style.display = "block";

    setTimeout(function() {
        n.style.display = "none";
    }, duracao);
}

// ============================================
// SEÇÃO 9: UPDATE DA UI PRINCIPAL
// ============================================

function updateUI() {
    var set = function(id, valor) {
        var el = document.getElementById(id);
        if (el) el.innerText = valor;
    };

    var nomeDisplay = player.nome || player.name || "";
    if (typeof isHardcore === "function" && isHardcore()) {
        nomeDisplay += ' <span class="hardcore-badge">☠️</span>';
    }

    var nomeEl = document.getElementById("playerNameUI");
    if (nomeEl) nomeEl.innerHTML = nomeDisplay;

    set("raceUI", player.raça || "");
    set("classUI", player.class || "");
    set("hpText", (player.hp || 0) + "/" + (player.maxHp || 0));
    set("goldUI", player.gold || 0);
    set("levelUI", player.level || 1);
    set("potionsUI", player.potions || 0);

    set("forcaUI", player.forca || 0);
    set("destrezaUI", player.destreza || 0);
    set("vigorUI", player.vigor || 0);
    set("inteligenciaUI", player.inteligencia || 0);
    set("sabedoriaUI", player.sabedoria || 0);
    set("carismaUI", player.carisma || 0);

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

    set("mainAtkUI", player.atk || 0);
    set("mainDefUI", player.def || 0);

    var hpBar = document.getElementById("mainPlayerHpBar");
    if (hpBar) {
        var hpMax = player.maxHp || 1;
        var hpAtual = player.hp || 0;
        var hpPct = (hpAtual / hpMax) * 100;

        hpBar.style.width = hpPct + "%";
        hpBar.style.background =
            hpPct > 60
                ? "linear-gradient(90deg,#44ff44,#66ff66)"
                : hpPct > 30
                ? "linear-gradient(90deg,#ffaa00,#ffcc44)"
                : "linear-gradient(90deg,#ff4444,#ff6666)";
    }

    var xpMax = player.xpParaProximoNivel || 100;
    var xpBar = document.getElementById("playerXpBar");
    if (xpBar) xpBar.style.width = Math.min(100, (player.xp || 0) / xpMax * 100) + "%";

    set("xpText", (player.xp || 0) + "/" + xpMax);

    var lojaGold = document.getElementById("lojaGoldUI");
    if (lojaGold) lojaGold.textContent = player.gold || 0;

    var armariaGold = document.getElementById("armariaGoldUI");
    if (armariaGold) armariaGold.textContent = player.gold || 0;

    var forjaGold = document.getElementById("forjaGoldUI");
    if (forjaGold) forjaGold.textContent = player.gold || 0;

    var playerImg = document.getElementById("playerImage");
    if (playerImg && player.img) playerImg.src = player.img;
}

function atualizarUI() {
    updateUI();
}

// ============================================
// SEÇÃO 10: MISSÕES, TALENTOS, CONQUISTAS E STATS
// ============================================
function desbloquearConquista(id) {
    if (!conquistas || !conquistas.lista) return;

    var conquista = conquistas.lista.find(function(c) {
        return c.id === id;
    });

    if (!conquista || conquista.desbloqueada) return;

    conquista.desbloqueada = true;

    if (conquista.recompensa) {
        player.ouro = (player.ouro || 0) + (conquista.recompensa.ouro || 0);

        if (conquista.recompensa.bonus) {
            var bonus = conquista.recompensa.bonus;

            switch (bonus.tipo) {
                case "forca": player.forca = (player.forca || 0) + bonus.valor; break;
                case "destreza": player.destreza = (player.destreza || 0) + bonus.valor; break;
                case "vigor": player.vigor = (player.vigor || 0) + bonus.valor; break;
                case "inteligencia": player.inteligencia = (player.inteligencia || 0) + bonus.valor; break;
                case "sabedoria": player.sabedoria = (player.sabedoria || 0) + bonus.valor; break;
                case "carisma": player.carisma = (player.carisma || 0) + bonus.valor; break;
                case "talento": player.pontosHabilidade = (player.pontosHabilidade || 0) + bonus.valor; break;
                case "todos":
                    player.forca = (player.forca || 0) + bonus.valor;
                    player.destreza = (player.destreza || 0) + bonus.valor;
                    player.vigor = (player.vigor || 0) + bonus.valor;
                    player.inteligencia = (player.inteligencia || 0) + bonus.valor;
                    player.sabedoria = (player.sabedoria || 0) + bonus.valor;
                    player.carisma = (player.carisma || 0) + bonus.valor;
                    break;
            }
        }
    }

    mostrarNotificacao("🏆 Conquista desbloqueada: " + conquista.titulo);
    if (typeof log === "function") {
        log("🏆 Conquista: " + conquista.titulo);
    }

    if (typeof updateUI === "function") updateUI();
    renderizarConquistas();
}
function getAtributoPrincipalPorArquetipo() {
    var arquetipo = getArquetipoClasse();

    switch (arquetipo) {
        case "guerreiro": return "forca";
        case "paladino": return "vigor";
        case "arqueiro": return "destreza";
        case "mago": return "inteligencia";
        case "clerigo": return "sabedoria";
        case "ladino": return "destreza";
        case "druida": return "sabedoria";
        case "monge": return "vigor";
        default: return "forca";
    }
}

function renderizarConquistas() {
    var el = document.getElementById("conquistasLista");
    if (!el || !conquistas || !conquistas.lista) return;

    el.innerHTML = "";

    conquistas.lista.forEach(function(c) {
        var bonusTexto = "";

        if (c.recompensa && c.recompensa.bonus) {
            switch (c.recompensa.bonus.tipo) {
                case "forca": bonusTexto = "⚔️+" + c.recompensa.bonus.valor + " FOR"; break;
                case "destreza": bonusTexto = "🏹+" + c.recompensa.bonus.valor + " DES"; break;
                case "vigor": bonusTexto = "❤️+" + c.recompensa.bonus.valor + " VIG"; break;
                case "inteligencia": bonusTexto = "🔮+" + c.recompensa.bonus.valor + " INT"; break;
                case "sabedoria": bonusTexto = "📖+" + c.recompensa.bonus.valor + " SAB"; break;
                case "carisma": bonusTexto = "🗣️+" + c.recompensa.bonus.valor + " CAR"; break;
                case "talento": bonusTexto = "⭐+" + c.recompensa.bonus.valor + " Talentos"; break;
                case "todos": bonusTexto = "🌟+" + c.recompensa.bonus.valor + " TODOS"; break;
                case "atributo_classe": bonusTexto = "🎯+" + c.recompensa.bonus.valor + " Atributo da Classe"; break;
            }
        }
           
        var d = document.createElement("div");
        d.style.cssText =
            "padding:8px;margin-bottom:4px;border-radius:6px;border:1px solid " +
            (c.desbloqueada ? "#22c55e" : "#334155") +
            ";background:" + (c.desbloqueada ? "rgba(34,197,94,0.1)" : "rgba(30,41,59,0.5)") + ";";

        d.innerHTML =
            '<div style="display:flex;justify-content:space-between;align-items:center;">' +
                '<div>' +
                    '<span style="color:' + (c.desbloqueada ? "#22c55e" : "#64748b") + ';font-weight:bold;font-size:0.85em;">' +
                        (c.desbloqueada ? "✅ " : "🔒 ") + c.titulo +
                    '</span><br>' +
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

function renderizarTalentos() {
    var el = document.getElementById("talentosDisplay");
    if (!el || !talentos) return;

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
        html +=
            '<div style="display:flex;justify-content:space-between;align-items:center;padding:6px;margin-bottom:4px;background:rgba(30,41,59,0.6);border-radius:6px;border:1px solid #334155;">' +
                '<div><span style="color:#e2e8f0;font-size:0.85em;font-weight:bold;">' + desc[k].n + '</span><br><small style="color:#64748b;">' + desc[k].d + '</small></div>' +
                '<div style="display:flex;align-items:center;gap:8px;"><span style="color:#fbbf24;font-size:0.85em;">' + pts + '</span>' +
                '<button onclick="investirTalento(\'' + k + '\')" ' + (talentos.pontosDisponiveis <= 0 ? 'disabled' : '') + ' style="padding:3px 10px;font-size:0.8em;border-radius:5px;">+</button></div>' +
            '</div>';
    });

    el.innerHTML = html;
}

function renderizarEstatisticas() {
    var el = document.getElementById("estatisticasDisplay");
    if (!el || !estatisticas) return;

    el.innerHTML =
        "🗡️ Monstros: <strong>" + (estatisticas.monstrosDerrotados || 0) + "</strong><br>" +
        "🔥 Elites: <strong>" + (estatisticas.elitesDerrotados || 0) + "</strong><br>" +
        "👑 Chefes: <strong>" + (estatisticas.bossesDerrotados || 0) + "</strong><br>" +
        "🏰 Masmorras: <strong>" + (estatisticas.masmorrasCompletas || 0) + "</strong><br>" +
        "📜 Missões: <strong>" + (sistemaMissoes ? sistemaMissoes.missoesCompletas || 0 : 0) + "</strong><br>" +
        "💥 Críticos: <strong>" + (estatisticas.criticos || 0) + "</strong><br>" +
        "🏃 Esquivas: <strong>" + (estatisticas.esquivas || 0) + "</strong><br>" +
        "💰 Ouro total: <strong>" + (estatisticas.ouroTotal || 0) + "</strong>";
}
function renderizarArvoreHabilidades() {
    var el = document.getElementById("arvoreHabilidadesContent");
    if (!el || typeof classesArvore === "undefined") return;

    var arvore = classesArvore[player.class];
    if (!arvore) {
        el.innerHTML = '<p style="color:#64748b;">Árvore não disponível para esta classe.</p>';
        return;
    }

    var pontos = player.pontosHabilidade || 0;

    var html =
        '<div style="text-align:center;margin-bottom:10px;">' +
            '<span style="color:#ffd700;font-weight:bold;">🌟 Pontos de Habilidade: ' + pontos + '</span>' +
        '</div>';

    arvore.ramos.forEach(function(ramo) {
        html += '<div style="margin-bottom:12px;background:rgba(30,41,59,0.5);border-radius:8px;padding:10px;border:1px solid #334155;">';
        html += '<h4 style="color:#38bdf8;text-align:center;margin-bottom:8px;font-size:0.9em;">' + ramo.nome + '</h4>';

        ramo.habilidades.forEach(function(hab) {
            var chave = player.class + "_" + ramo.id + "_" + hab.id;
            var desbloqueada = arvoreHabilidades.investidos[chave] === true;

            var podeDesbloquear = pontos > 0 && !desbloqueada;
            if (hab.id > 1) {
                var chaveAnt = player.class + "_" + ramo.id + "_" + (hab.id - 1);
                if (!arvoreHabilidades.investidos[chaveAnt]) podeDesbloquear = false;
            }

            var corBorda = desbloqueada ? "#22c55e" : podeDesbloquear ? "#fbbf24" : "#334155";
            var corTexto = desbloqueada ? "#22c55e" : "#94a3b8";

            html +=
                '<div style="display:flex;justify-content:space-between;align-items:center;padding:6px;margin-bottom:3px;border-radius:6px;border:1px solid ' + corBorda + ';background:' + (desbloqueada ? 'rgba(34,197,94,0.1)' : 'rgba(30,41,59,0.3)') + ';">' +
                    '<div>' +
                        '<span style="color:' + corTexto + ';font-size:0.85em;font-weight:bold;">' + (desbloqueada ? '✅ ' : '🔒 ') + hab.nome + '</span>' +
                        '<br><small style="color:#64748b;">' + hab.desc + '</small>' +
                    '</div>' +
                    (desbloqueada
                        ? ''
                        : podeDesbloquear
                        ? '<button onclick="investirHabilidadeArvore(\'' + ramo.id + '\',' + hab.id + ')" style="padding:3px 10px;font-size:0.75em;">Aprender</button>'
                        : '<span style="color:#475569;font-size:0.7em;">🔒</span>') +
                '</div>';
        });

        html += '</div>';
    });

    el.innerHTML = html;
}
function trocarAbaTalento(idAba) {
    document.querySelectorAll(".aba-talento").forEach(function(div) {
        div.style.display = "none";
    });

    document.querySelectorAll(".shop-tab").forEach(function(btn) {
        btn.classList.remove("active-tab");
    });

    var abaAlvo = document.getElementById(idAba);
    if (abaAlvo) abaAlvo.style.display = "block";

    var botoes = document.querySelectorAll(".shop-tab");
    var botaoAtivo = Array.from(botoes).find(function(btn) {
        return (btn.getAttribute("onclick") || "").includes(idAba);
    });

    if (botaoAtivo) botaoAtivo.classList.add("active-tab");
}

// ============================================
// SEÇÃO 11: ÁREAS E MAPA
// ============================================

function mostrarAreasDisponiveis() {
    var container = document.getElementById("menu-areas");
    if (!container || typeof areas === "undefined") return;

    container.innerHTML = "";

    Object.keys(areas).forEach(function(idArea) {
        var dadosArea = areas[idArea];
        if (player.level >= dadosArea.min) {
            var botao = document.createElement("button");
            botao.textContent = dadosArea.nome;
            botao.classList.add("areas-botao");
            botao.onclick = function() {
                gameState.areaAtual = idArea;
                if (typeof selecionarArea === "function") selecionarArea(idArea);
            };
            container.appendChild(botao);
        }
    });
}

function mostrarMensagemDesbloqueio(area) {
    var msg = document.createElement("div");
    msg.className = "popup-desbloqueio";
    msg.textContent = "✨ Nova área desbloqueada: " + area.nome + " ✨";
    document.body.appendChild(msg);

    setTimeout(function() {
        msg.remove();
    }, 3000);
}

function atualizarLockAreas() {
    if (typeof areas === "undefined") return;

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
}

function renderizarMapaVisual() {
    var container = document.getElementById("areasContainer");
    if (!container || typeof mapaAreas === "undefined" || typeof areas === "undefined") return;

    container.className = "mapa-visual";
    container.innerHTML = "";
    container.innerHTML += '<div class="mapa-cidade">🏘️ CIDADE — sua base segura</div>';

    var algumaAreaMostrada = false;

    for (var t = 0; t < mapaAreas.length; t++) {
        var tierData = mapaAreas[t];
        var tierNum = tierData.tier;

        var areasDesbloqueadasNoTier = tierData.areas.filter(function(areaMapa) {
            var areaReal = areas[areaMapa.id];
            return areaReal && player.level >= areaReal.min;
        });

        if (areasDesbloqueadasNoTier.length === 0) continue;

        if (t > 0) {
            container.innerHTML += '<div class="mapa-conector ativo"></div>';
        }

        var tierDiv = document.createElement("div");
        tierDiv.className = "mapa-tier";

        for (var a = 0; a < areasDesbloqueadasNoTier.length; a++) {
            var area = areasDesbloqueadasNoTier[a];
            var isAtual = gameState.areaAtual === area.id;

            var node = document.createElement("div");
            node.className = "mapa-node tier" + tierNum + " desbloqueado" + (isAtual ? " atual" : "");
            node.onclick = (function(areaId) {
                return function() { selecionarArea(areaId); };
            })(area.id);

            node.innerHTML =
                '<div class="mapa-node-icon">' + area.icon + '</div>' +
                '<div class="mapa-node-nome">' + area.nome + '</div>' +
                '<div class="mapa-node-nivel">Nv.' + (area.nivel || area.min || "?") + '</div>' +
                '<div class="mapa-node-stars">' + (area.stars || "") + '</div>';

            tierDiv.appendChild(node);
            algumaAreaMostrada = true;
        }

        container.appendChild(tierDiv);
    }

    if (!algumaAreaMostrada) {
        container.className = "";
        container.innerHTML = '<p style="text-align:center;color:#94a3b8;padding:20px;">Nenhuma área disponível no momento.</p>';
    }
}

function atualizarVisibilidadeAreasDesbloqueadas() {
    if (typeof areas === "undefined") return;

    Object.keys(areas).forEach(function(key) {
        var card = document.getElementById("area-" + key);
        var lock = document.getElementById("lock-" + key);
        if (!card) return;

        if (player.level >= areas[key].min) {
            card.classList.remove("locked");
            card.classList.add("desbloqueada");
            card.style.display = "block";
            if (lock) lock.style.display = "none";
        } else {
            card.classList.remove("desbloqueada");
            card.classList.add("locked");
            card.style.display = "none";
            if (lock) lock.style.display = "none";
        }
    });
}

// ============================================
// SEÇÃO 12: HISTÓRIA
// ============================================

function abrirHistoria() {
    try {
        if (typeof verificarCapituloDisponivel !== "function") {
            console.warn("abrirHistoria: verificarCapituloDisponivel não existe.");
            if (typeof mostrarNotificacao === "function") {
                mostrarNotificacao("⚠️ Sistema de história indisponível.");
            }
            return;
        }

        var cap = verificarCapituloDisponivel();

        if (!cap) {
            if (typeof mostrarNotificacao === "function") {
                mostrarNotificacao("📖 Nenhum capítulo disponível nesta área.");
            }
            return;
        }

        if (typeof iniciarCapituloNarrativo === "function") {
            iniciarCapituloNarrativo(cap);
            return;
        }

        var historiaContent = document.getElementById("historiaContent");
        mostrarPainelFullscreen("historiaPanel");

        if (historiaContent) {
            historiaContent.innerHTML =
                '<div class="historia-card">' +
                    '<div class="historia-capitulo-titulo">📖 História</div>' +
                    '<div class="historia-texto">O capítulo foi encontrado, mas a narrativa não pôde ser iniciada.</div>' +
                '</div>';
        }

    } catch (erro) {
        console.error("Erro em abrirHistoria():", erro);

        mostrarPainelFullscreen("historiaPanel");

        var historiaContent = document.getElementById("historiaContent");
        if (historiaContent) {
            historiaContent.innerHTML =
                '<div class="historia-card">' +
                    '<div class="historia-capitulo-titulo">⚠️ Erro</div>' +
                    '<div class="historia-texto">Ocorreu um problema ao abrir a história.</div>' +
                '</div>';
        }

        if (typeof mostrarNotificacao === "function") {
            mostrarNotificacao("⚠️ Erro ao abrir a história.");
        }
    }
}

function mostrarCena(index) {
    var cap = gameState.capituloEmAndamento;
    if (!cap || index >= cap.cenas.length) {
        if (typeof finalizarCapitulo === "function") finalizarCapitulo();
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
            var corBorda =
                opcao.efeito === "heroi" ? "#22c55e" :
                opcao.efeito === "sombrio" ? "#ef4444" : "#38bdf8";

            html += '<button onclick="escolherOpcao(' + index + ',' + i + ')" style="display:block;width:100%;margin:6px 0;padding:10px 15px;text-align:left;background:rgba(30,41,59,0.8);border:1px solid ' + corBorda + ';border-radius:8px;color:#e2e8f0;cursor:pointer;font-size:0.9em;">' +
                opcao.texto + '</button>';
        });

        html += '</div>';
    } else {
        html += '<button onclick="mostrarCena(' + (index + 1) + ')" style="padding:10px 25px;margin-top:10px;">Continuar ▶️</button>';
    }

    html += '</div>';
    el.innerHTML = html;
}

// ============================================
// SEÇÃO 13: GUILDA
// ============================================

if (typeof guildasData === "undefined") {
    var guildasData = {
        guerreiros: {
            nome: "Guilda dos Guerreiros",
            emoji: "⚔️",
            classe: "guilda-guerreiros",
            cor: "#ef4444",
            bonus: "+10% ATK",
            descricao: "Força e honra acima de tudo"
        },
        arcano: {
            nome: "Círculo Arcano",
            emoji: "🔮",
            classe: "guilda-arcano",
            cor: "#a78bfa",
            bonus: "+15% Habilidade",
            descricao: "O conhecimento é a arma suprema"
        },
        sombras: {
            nome: "Irmandade das Sombras",
            emoji: "🗡️",
            classe: "guilda-sombras",
            cor: "#94a3b8",
            bonus: "+15% Ouro",
            descricao: "Lucro e sobrevivência"
        },
        protetores: {
            nome: "Ordem dos Protetores",
            emoji: "🛡️",
            classe: "guilda-protetores",
            cor: "#38bdf8",
            bonus: "+10% DEF / HP",
            descricao: "Defender os fracos é nosso dever"
        }
    };
}

if (typeof missoesPorGuilda === "undefined") {
    var missoesPorGuilda = {
        guerreiros: [{ desc: "Derrote 5 monstros", meta: 5, recompensaOuro: 50, recompensaXp: 20 }],
        arcano: [{ desc: "Use habilidade 3 vezes", meta: 3, recompensaOuro: 50, recompensaXp: 20 }],
        sombras: [{ desc: "Ganhe 100 ouro", meta: 100, recompensaOuro: 60, recompensaXp: 20 }],
        protetores: [{ desc: "Defenda 3 vezes", meta: 3, recompensaOuro: 50, recompensaXp: 20 }]
    };
}

function abrirGuilda() {
    if (typeof garantirGuildaPlayer === "function") {
        garantirGuildaPlayer();
    }
    renderizarGuilda();
    mostrarPainelFullscreen("guildaPanel");
}

function entrarGuilda(guildaKey) {
    if (player.guilda.atual === guildaKey) {
        mostrarNotificacao("Você já pertence a esta guilda!");
        return;
    }

    if (player.guilda.atual) {
        if (player.gold < 500) {
            mostrarNotificacao("❌ Precisa de 500 ouro para trocar de guilda!");
            return;
        }
        if (!confirm("Trocar de guilda custa 500 ouro e você perde seu rank. Continuar?")) return;

        player.gold -= 500;
        player.guilda.rank = 0;
        player.guilda.xp = 0;
        player.progressoMissaoGuilda = 0;
        mostrarNotificacao("🔄 Trocou para " + guildasData[guildaKey].nome + "!");
    } else {
        mostrarNotificacao("🏠 Entrou na " + guildasData[guildaKey].nome + "!");
    }

    player.guilda.atual = guildaKey;
    player.guilda.xpProximo = 100;

    if (typeof aplicarBonusEquipamentos === "function") aplicarBonusEquipamentos();
    updateUI();
    renderizarGuilda();
}


// ============================================
// SEÇÃO 14: LOJA E ARMARIA
// ============================================

function trocarAbaLoja(aba) {
    var btnComprar = document.getElementById("tabLojaComprar");
    var btnVender = document.getElementById("tabLojaVender");
    var panelComprar = document.getElementById("lojaComprarPanel");
    var panelVender = document.getElementById("lojaVenderPanel");

    if (btnComprar) btnComprar.classList.toggle("active-tab", aba === "comprar");
    if (btnVender) btnVender.classList.toggle("active-tab", aba !== "comprar");

    if (panelComprar) panelComprar.style.display = aba === "comprar" ? "block" : "none";
    if (panelVender) panelVender.style.display = aba !== "comprar" ? "block" : "none";

    if (aba === "comprar") renderizarLojaComprar();
    else renderizarLojaVender();
}

function renderizarLojaComprar() {
    var l = document.getElementById("lojaComprarLista");
    if (!l) return;

    l.innerHTML = "";

    var desc = typeof calcularDescontoLoja === "function" ? calcularDescontoLoja() : 0;

    catalogoLoja.comprar.forEach(function(item, i) {
        var pf = Math.floor(item.preco * (1 - desc));
        var podeComprar = podeComprarItemLoja(item);

        var qtdComprada = item.limiteCompra ? getQuantidadeCompradaLoja(item.nome) : 0;
        var limiteTxt = item.limiteCompra
            ? ' <span style="color:#94a3b8;font-size:0.75em;">(' + qtdComprada + '/' + item.limiteCompra + ')</span>'
            : '';

        var d = document.createElement("div");
        d.className = "shop-item";
        d.innerHTML =
            '<div class="shop-item-info">' +
                '<span class="shop-item-icon">' + item.icone + '</span>' +
                '<div class="shop-item-details">' +
                    '<span class="shop-item-name">' + item.nome + limiteTxt + '</span>' +
                    '<span class="shop-item-desc">' + item.descricao + '</span>' +
                '</div>' +
            '</div>' +
            '<div class="shop-item-price">' +
                '<span class="shop-price-tag">💰 ' +
                    (desc > 0
                        ? '<s style="color:#666">' + item.preco + '</s> ' + pf
                        : pf) +
                '</span>' +
                '<button class="shop-buy-btn" ' + ((!podeComprar || player.gold < pf) ? 'disabled' : '') + ' onclick="comprarItemLoja(' + i + ')">' +
                    (podeComprar ? 'Comprar' : 'Limite') +
                '</button>' +
            '</div>';

        l.appendChild(d);
    });
}

function renderizarLojaVender() {
    var l = document.getElementById("lojaVenderLista");
    if (!l) return;

    l.innerHTML = "";

    var itens = player.inventario.filter(function(i) {
        return i.tipo !== "equipamento";
    });

    var vazio = document.getElementById("lojaVenderVazio");
    if (itens.length === 0) {
        if (vazio) vazio.style.display = "block";
        return;
    }

    if (vazio) vazio.style.display = "none";

    itens.forEach(function(item) {
        var pv = item.precoVenda || 5;
        var idx = player.inventario.indexOf(item);

        var d = document.createElement("div");
        d.className = "shop-item";
        d.innerHTML =
            '<div class="shop-item-info">' +
                '<span class="shop-item-icon">' + item.icone + '</span>' +
                '<div><span class="shop-item-name">' + item.nome + ' x' + item.quantidade + '</span></div>' +
            '</div>' +
            '<div class="shop-item-price">' +
                '<span class="shop-price-tag">💰 ' + pv + '</span>' +
                '<button class="shop-sell-btn" onclick="venderItemLoja(' + idx + ')">Vender</button>' +
            '</div>';

        l.appendChild(d);
    });
}

function trocarAbaArmaria(aba) {
    var btnComprar = document.getElementById("tabArmariaComprar");
    var btnVender = document.getElementById("tabArmariaVender");
    var panelComprar = document.getElementById("armariaComprarPanel");
    var panelVender = document.getElementById("armariaVenderPanel");

    if (btnComprar) btnComprar.classList.toggle("active-tab", aba === "comprar");
    if (btnVender) btnVender.classList.toggle("active-tab", aba !== "comprar");

    if (panelComprar) panelComprar.style.display = aba === "comprar" ? "block" : "none";
    if (panelVender) panelVender.style.display = aba !== "comprar" ? "block" : "none";

    if (aba === "comprar") renderizarArmariaComprar();
    else renderizarArmariaVender();
}

function renderizarInventario() {
    var lista = document.getElementById("inventoryList");
    var vazio = document.getElementById("inventarioVazio");
    if (!lista) return;

    lista.innerHTML = "";
    if (typeof atualizarSlotsEquipamento === "function") atualizarSlotsEquipamento();

    if (player.inventario.length === 0 && player.potions <= 0) {
        if (vazio) vazio.style.display = "block";
        return;
    }

    if (vazio) vazio.style.display = "none";

    if (player.potions > 0) {
        var mc = calcularMultiplicadorCura();
        var ce = Math.floor(30 * mc);
        var d = document.createElement("div");
        d.className = "inventory-item";
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
        } else if (item.descricao) {
            info += '<br><small style="color:#64748b">' + item.descricao + '</small>';
        }
        info += '</div>';

        var btns = '<span class="item-qty">x' + item.quantidade + '</span>';
        if (item.tipo === "equipamento") {
            btns += '<button class="item-equip-btn" onclick="equiparItem(' + i + ')">Equipar</button>';
        } else if (item.efeito || (typeof itensConsumiveis !== "undefined" && itensConsumiveis[item.nome])) {
            btns += '<button class="item-use-btn" onclick="usarItemInventario(' + i + ')">Usar</button>';
        }

        d.innerHTML = '<div class="item-info">' + info + '</div><div class="item-actions">' + btns + '</div>';
        lista.appendChild(d);
    });
}

function renderizarArmariaComprar() {
    var l = document.getElementById("armariaComprarLista");
    if (!l || typeof getEquipamentosArmaria !== "function") return;

    l.innerHTML = "";
    var equipamentos = getEquipamentosArmaria();
    var desc = typeof calcularDescontoLoja === "function" ? calcularDescontoLoja() : 0;
    var classeAtual = getClassePlayer();

    var header = document.createElement("div");
    header.style.cssText = "text-align:center;padding:8px;margin-bottom:10px;background:rgba(56,189,248,0.1);border:1px solid rgba(56,189,248,0.2);border-radius:8px;";
    header.innerHTML = '<span style="color:#38bdf8;font-size:0.85em;">⚔️ Equipamentos para <strong style="color:#ffd700;">' + classeAtual + '</strong>' +
        (desc > 0 ? ' <span style="color:#22c55e;">(-' + Math.floor(desc * 100) + '% desconto)</span>' : '') +
        '</span>';
    l.appendChild(header);

    var slotAtual = "";

    equipamentos.forEach(function(item, i) {
        var slotNome =
            item.slot === "arma" ? "⚔️ Armas" :
            item.slot === "armadura" ? "🛡️ Armaduras" :
            item.slot === "elmo" ? "⛑️ Elmos" :
            item.slot === "botas" ? "👢 Botas" :
            item.slot === "anel" ? "💍 Anéis" :
            item.slot === "amuleto" ? "📿 Amuletos" : "Outros";

        if (slotNome !== slotAtual) {
            slotAtual = slotNome;
            var sep = document.createElement("div");
            sep.style.cssText = "color:#64748b;font-size:0.8em;font-weight:bold;padding:6px 0 3px 0;border-bottom:1px solid #334155;margin-top:8px;";
            sep.textContent = slotNome;
            l.appendChild(sep);
        }

        var pf = Math.floor(item.preco * (1 - desc));
        var st = [];
        var stats = item.stats || {};

        if ((stats.atk || 0) > 0) st.push("⚔️+" + stats.atk);
        if ((stats.def || 0) > 0) st.push("🛡️+" + stats.def);
        if ((stats.hp || 0) > 0) st.push("❤️+" + stats.hp);

        var jaPossui = player.inventario.find(function(inv) {
            return inv.nome === item.nome;
        });

        var equipado = false;
        ["arma", "armadura", "elmo", "botas", "anel", "amuleto"].forEach(function(s) {
            if (player.equipamentos[s] && player.equipamentos[s].nome === item.nome) {
                equipado = true;
            }
        });

        var statusTag = equipado
            ? ' <span style="color:#22c55e;font-size:0.7em;">(EQUIPADO)</span>'
            : jaPossui
            ? ' <span style="color:#fbbf24;font-size:0.7em;">(NO INVENTÁRIO)</span>'
            : '';

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
                '<span class="shop-price-tag">💰 ' +
                    (desc > 0
                        ? '<s style="color:#666">' + item.preco + '</s> ' + pf
                        : pf) +
                '</span>' +
                '<button class="shop-buy-btn" ' + ((player.gold < pf) ? 'disabled' : '') + ' onclick="comprarEquipamentoNovo(' + i + ')">Comprar</button>' +
            '</div>';

        l.appendChild(d);
    });
}

function renderizarArmariaVender() {
    var l = document.getElementById("armariaVenderLista");
    if (!l) return;

    l.innerHTML = "";

    var eqs = player.inventario.filter(function(i) {
        return i.tipo === "equipamento";
    });

    var vazio = document.getElementById("armariaVenderVazio");
    if (eqs.length === 0) {
        if (vazio) vazio.style.display = "block";
        return;
    }

    if (vazio) vazio.style.display = "none";

    eqs.forEach(function(item) {
        var pv = calcularPrecoVenda(item);
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

// ============================================
// SEÇÃO 15: TREINAMENTO, CEMITÉRIO, ARENA E MINERAÇÃO
// ============================================

var treinamento = {
    investido: {
        forca: 0,
        destreza: 0,
        vigor: 0,
        inteligencia: 0,
        sabedoria: 0,
        carisma: 0
    },
    maxPorAtributo: 5,
    custos: [50, 150, 350, 700, 1500]
};

function renderizarTreinamento() {
    var el = document.getElementById("treinamentoContent");
    if (!el || typeof treinamento === "undefined") return;

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

        html +=
            '<div style="display:flex;justify-content:space-between;align-items:center;padding:8px;margin-bottom:4px;background:rgba(30,41,59,0.6);border-radius:6px;border:1px solid #334155;">' +
                '<div><span style="color:#e2e8f0;font-weight:bold;font-size:0.9em;">' + a.nome + ' (' + a.atual + ')</span>' +
                '<br><small style="color:#64748b;">Treino: ' + nv + '/' + max + '</small></div>' +
                '<div style="text-align:right;">' +
                    (esgotado
                        ? '<span style="color:#22c55e;font-size:0.8em;">MÁXIMO</span>'
                        : '<span style="color:#fbbf24;font-size:0.8em;">💰 ' + custo + '</span>' +
                          '<br><button onclick="treinar(\'' + a.key + '\')" ' + (player.gold < custo ? 'disabled' : '') + ' style="padding:4px 12px;font-size:0.8em;margin-top:3px;">Treinar</button>') +
                '</div></div>';
    });

    el.innerHTML = html;
}

function abrirTreinamento() {
    var painel = document.getElementById("treinamentoPanel");
    if (!painel) return;

    var npc = npcsData.aldric;

    var h = '';
    h += '<h3 style="color:#ffd700;text-align:center;margin-bottom:12px;"><img src="images/emoji/treinamento.png" class="emoji"> Treinamento</h3>';
    h += gerarNpcHeader(npc);
    h += '<p style="text-align:center;color:#94a3b8;font-size:0.82em;margin-bottom:10px;">Pague para treinar atributos. Máximo +5 por atributo.</p>';
    h += '<div id="treinamentoContent"></div>';
    h += '<button onclick="fecharTreinamento()" class="back-btn">⬅️ Voltar</button>';

    painel.innerHTML = h;
    renderizarTreinamento();
    mostrarPainelFullscreen("treinamentoPanel");
}

if (typeof cemiterio === "undefined") {
    var cemiterio = {
        equipamentoPerdido: null,
        custoResgate: 0
    };
}

function perderEquipamentoAoMorrer() {
    var slots = ["arma", "armadura", "elmo", "botas", "anel", "amuleto"];

    for (var i = 0; i < slots.length; i++) {
        var slot = slots[i];
        if (player.equipamentos[slot]) {
            cemiterio.equipamentoPerdido = player.equipamentos[slot];
            cemiterio.custoResgate = Math.floor((player.equipamentos[slot].preco || 100) * 0.5);
            player.equipamentos[slot] = null;
            return cemiterio.equipamentoPerdido.nome;
        }
    }
    return null;
}

function renderizarCemiterio() {
    var el = document.getElementById("cemiterioContent");
    if (!el || typeof cemiterio === "undefined") return;

    if (!cemiterio.equipamentoPerdido) {
        el.innerHTML = '<p style="color:#64748b;text-align:center;padding:20px;font-style:italic;">⚰️ O cemitério está vazio.<br>Seus equipamentos estão seguros... por enquanto.</p>';
        return;
    }

    var item = cemiterio.equipamentoPerdido;
    var st = [];
    if (item.stats.atk > 0) st.push("⚔️+" + item.stats.atk);
    if (item.stats.def > 0) st.push("🛡️+" + item.stats.def);
    if (item.stats.hp > 0) st.push("❤️+" + item.stats.hp);

    el.innerHTML =
        '<p class="gold-display">💰 Ouro: ' + player.gold + '</p>' +
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

function renderizarArenaEmAndamento() {
    var el = document.getElementById("arenaContent");
    if (!el || typeof arena === "undefined") return;

    el.innerHTML =
        '<div style="text-align:center;padding:20px;">' +
            '<p style="color:#fbbf24;font-size:1.2em;font-weight:bold;">🏟️ Arena em andamento!</p>' +
            '<p style="color:#e2e8f0;">Onda atual: ' + arena.ondaAtual + '</p>' +
            '<p style="color:#94a3b8;font-size:0.85em;">Derrote o monstro para avançar.</p>' +
            '<button onclick="abandonarArena()" style="margin-top:10px;padding:8px 20px;background:rgba(127,29,29,0.5);border:1px solid #7f1d1d;color:#fca5a5;">🏃 Abandonar Arena</button>' +
        '</div>';
}

function renderizarMineracao() {
    if (typeof mineracaoState === "undefined" || typeof mineriosPorArea === "undefined") return;

    var area = mineracaoState.areaAtual;
    var dados = mineriosPorArea[area];
    if (!dados) return;

    var nomeEl = document.getElementById("mineracaoAreaNome");
    if (nomeEl) nomeEl.textContent = "📍 " + dados.nome;

    var tentEl = document.getElementById("mineracaoTentativas");
    if (tentEl) tentEl.textContent = mineracaoState.tentativas;

    var custoEl = document.getElementById("mineracaoCusto");
    if (custoEl) custoEl.textContent = dados.custo;

    var btn = document.getElementById("btnMinerar");
    if (btn) btn.disabled = mineracaoState.tentativas <= 0 || player.gold < dados.custo;

    var animEl = document.getElementById("mineracaoAnimacao");
    if (animEl) animEl.style.display = "none";

    var matEl = document.getElementById("mineracaoMateriais");
    if (matEl) {
        var html = '<p style="color:#94a3b8;font-size:0.82em;text-align:center;margin-bottom:6px;">Minérios encontrados nesta área:</p>';
        html += '<div class="minerio-lista">';

        for (var i = 0; i < dados.minerios.length; i++) {
            var m = dados.minerios[i];
            var chanceText = Math.floor(m.chance * 100) + "%";
            html += '<div class="minerio-preview' + (m.raro ? '" style="border-color:#fbbf24;"' : '"') + '>' +
                '<span class="minerio-preview-icon">' + m.icone + '</span>' +
                '<span class="minerio-preview-nome">' + m.nome + '</span>' +
                '<span class="minerio-preview-chance">' + (m.raro ? '⭐' : '') + chanceText + '</span>' +
                '</div>';
        }

        html += "</div>";
        matEl.innerHTML = html;
    }
}

// ============================================
// SEÇÃO 16: POPUPS
// ============================================

function getPopupStack() {
    var stack = document.getElementById("popupStack");
    if (!stack) {
        stack = document.createElement("div");
        stack.id = "popupStack";
        stack.style.cssText =
            "position:fixed;top:0;left:0;width:100%;height:100%;" +
            "display:none;flex-direction:column;align-items:center;" +
            "justify-content:center;gap:10px;z-index:100;" +
            "background:rgba(0,0,0,0.85);backdrop-filter:blur(4px);" +
            "padding:20px;overflow-y:auto;";
        document.body.appendChild(stack);
    }
    return stack;
}

function adicionarPopup(tipo, titulo, icone, texto, recompensas, duracao) {
    duracao = duracao || 3000;

    var stack = getPopupStack();
    stack.style.display = "flex";

    var borderColor = tipo === 'levelup' ? '#ffd700' : tipo === 'victory' ? '#4ade80' : '#a78bfa';
    var shadowColor = tipo === 'levelup' ? 'rgba(255,215,0,0.3)' : tipo === 'victory' ? 'rgba(74,222,128,0.3)' : 'rgba(167,139,250,0.3)';
    var timerColor = tipo === "levelup" ? "#ffd700" : tipo === "victory" ? "#4ade80" : "#a78bfa";

    var card = document.createElement("div");
    card.className = "popup-card popup-" + tipo;
    card.style.cssText =
        "background:linear-gradient(135deg,#1e293b,#334155);" +
        "border:2px solid " + borderColor + ";" +
        "border-radius:12px;padding:16px 20px;text-align:center;" +
        "max-width:320px;width:90%;flex-shrink:0;" +
        "animation:popupSlideIn 0.3s ease;" +
        "box-shadow:0 0 20px " + shadowColor + ";";

    if (tipo === "levelup") {
        card.style.background = "linear-gradient(135deg,#422006,#1c1917)";
    }

    var html = "";
    if (icone) html += '<div style="font-size:2em;margin:4px 0;">' + icone + '</div>';
    if (titulo) html += '<h3 style="font-size:1em;margin-bottom:4px;color:' + (tipo === 'levelup' ? '#ffd700' : '#fff') + '">' + titulo + '</h3>';
    if (texto) html += '<div style="font-size:0.82em;color:#cbd5e1;line-height:1.5;margin:4px 0;">' + texto + '</div>';
    if (recompensas) html += '<div style="background:rgba(0,0,0,0.3);border-radius:6px;padding:6px;margin:4px 0;color:#4ade80;font-size:0.8em;line-height:1.5;">' + recompensas + '</div>';

    html +=
        '<div style="width:100%;height:3px;background:rgba(255,255,255,0.1);border-radius:2px;margin-top:8px;overflow:hidden;">' +
            '<div style="height:100%;background:' + timerColor + ';border-radius:2px;animation:timerShrink ' + duracao + 'ms linear forwards;"></div>' +
        '</div>';

    card.innerHTML = html;
    stack.appendChild(card);

    setTimeout(function() {
        card.style.transition = "all 0.3s ease";
        card.style.opacity = "0";
        card.style.transform = "translateY(-20px) scale(0.9)";
        setTimeout(function() {
            card.remove();
            if (stack.children.length === 0) stack.style.display = "none";
        }, 300);
    }, duracao);
}

if (!document.getElementById("popupKeyframes")) {
    var popStyle = document.createElement("style");
    popStyle.id = "popupKeyframes";
    popStyle.textContent =
        "@keyframes popupSlideIn { 0% { opacity:0; transform:translateY(-20px) scale(0.9); } 100% { opacity:1; transform:translateY(0) scale(1); } }" +
        "@keyframes timerShrink { 0% { width:100%; } 100% { width:0%; } }";
    document.head.appendChild(popStyle);
}

function mostrarResultado(titulo, icone, texto, recompensas) {
    var old = document.getElementById("resultScreen");
    if (old) old.style.display = "none";
    adicionarPopup("victory", titulo, icone, texto, recompensas, 3500);
}

function mostrarLevelUp(texto) {
    var old = document.getElementById("levelUpScreen");
    if (old) old.style.display = "none";
    adicionarPopup("levelup", "⭐ LEVEL UP! ⭐", "🎉", texto, null, 3500);
}

function mostrarAreaDesbloqueada(icone, nome, nivel) {
    var old = document.getElementById("areaUnlockPopup");
    if (old) old.style.display = "none";
    adicionarPopup("area", "🔓 NOVA ÁREA!", icone, "<strong>" + nome + "</strong><br>Nível mínimo: " + nivel, null, 3000);
}

// ============================================
// SEÇÃO 17: ESTALAGEM
// ============================================

function abrirEstalagem() {
    var painel = document.getElementById("estalagemPanel");

    if (!painel) {
        var actionPanel = document.getElementById("actionPanel");
        if (!actionPanel) return;

        painel = document.createElement("div");
        painel.id = "estalagemPanel";
        painel.style.display = "none";
        actionPanel.appendChild(painel);
    }

    var npc = npcsData.marta;

    var h = '';
    h += '<h3 style="color:#ffd700; text-align:center; margin-bottom:12px;"><img src="images/emoji/estalagem.png" class="emoji"> Estalagem da Marta</h3>';
    h += '<div style="padding:8px; background:rgba(30,41,59,0.5); border:1px solid rgba(56,189,248,0.15); border-radius:10px; margin-bottom:10px; text-align:center;">';
    h += '<div style="color:#94a3b8; font-size:0.82em; font-style:italic;">Camas macias, cobertores quentes e cheiro de lavanda.</div>';
    h += '</div>';
    h += gerarNpcHeader(npc);
    h += '<div id="estalagemHpDisplay" style="text-align:center; margin:10px 0; padding:10px; background:rgba(0,0,0,0.2); border-radius:8px;"></div>';
    h += '<div style="text-align:center; margin-top:10px; display:flex; gap:8px; justify-content:center; flex-wrap:wrap;">';
    h += '<button onclick="fazerDescansoEstalagem()" style="padding:10px 20px;">🛏️ Descansar</button>';
    h += '<button onclick="abrirEstalagem()" style="padding:10px 20px; background:rgba(51,65,85,0.7); border-color:#475569;">💬 Conversar</button>';
    h += '</div>';
    h += '<button class="back-btn" onclick="fecharEstalagem()">← Voltar à Cidade</button>';

    painel.innerHTML = h;
    atualizarHpEstalagem();
    mostrarPainelFullscreen("estalagemPanel");
}

function atualizarHpEstalagem() {
    var el = document.getElementById("estalagemHpDisplay");
    if (!el) return;

    var pct = Math.floor((player.hp / player.maxHp) * 100);
    var cor = pct > 50 ? "#4ade80" : pct > 25 ? "#fbbf24" : "#ef4444";

    var h = '<span style="color:' + cor + '; font-weight:bold; font-size:1.1em;">❤️ ' + player.hp + '/' + player.maxHp + ' HP</span>';

    if (player.hp < player.maxHp) {
        h += '<br><span style="color:#f87171; font-size:0.82em;">Você precisa descansar!</span>';
    } else {
        h += '<br><span style="color:#4ade80; font-size:0.82em;">HP cheio!</span>';
    }

    el.innerHTML = h;
}

function fazerDescansoEstalagem() {
    var resto = player.maxHp - player.hp;

    if (resto <= 0) {
        mostrarNotificacao("❤️ HP já está cheio!");
        return;
    }

    var hpAntes = player.hp;
    player.hp = player.maxHp;

    if (typeof aplicarBonusEquipamentos === "function") {
        aplicarBonusEquipamentos();
        player.hp = player.maxHp;
    }

    updateUI();
    atualizarHpEstalagem();

    var npc = npcsData.marta;
    var fala = getDialogoNpc(npc, "descanso");

    var ov = document.createElement("div");
    ov.className = "sleep-overlay";
    ov.innerHTML =
        '<div class="sleep-content">' +
            '<div class="sleep-moon">🌙</div>' +
            '<div class="sleep-zzz">' +
                '<span class="sleep-z">Z</span>' +
                '<span class="sleep-z">Z</span>' +
                '<span class="sleep-z">Z</span>' +
            '</div>' +
            '<div class="sleep-text">"' + fala + '"</div>' +
            '<div class="sleep-hp-restored">❤️ ' + hpAntes + ' → ' + player.maxHp + ' HP (+' + resto + ')</div>' +
        '</div>';

    document.body.appendChild(ov);

    setTimeout(function() {
        if (ov.parentNode) ov.parentNode.removeChild(ov);
        log("🛏️ Marta cuidou de você! +" + resto + " HP!");
        mostrarNotificacao("❤️ +" + resto + " HP!");
        updateUI();
        atualizarHpEstalagem();
    }, 4200);
}

// ============================================
// SEÇÃO 18: TAVERNA
// ============================================

function abrirTaverna() {
    var painel = document.getElementById("tavernaPanel");
    if (!painel) return;

    var npc = npcsData.corvinus;
    var buff = player.buffBardo && player.buffBardo > 0;

    var h = '<h3 style="color:#ffd700; text-align:center;"><img src="images/emoji/taverna.png" class="emoji"> Taverna do Dragão Dourado</h3>';
    h += '<div style="padding:8px; background:rgba(120,53,15,0.15); border:1px solid rgba(251,191,36,0.2); border-radius:10px; margin-bottom:10px; text-align:center;">';
    h += '<div style="color:#d4a574; font-size:0.82em; font-style:italic;">O calor da lareira e o cheiro de hidromel preenchem o ar.</div>';
    h += '</div>';

    h += gerarNpcHeader(npc);

    if (buff) {
        h += '<div class="buff-ativo">🎵 Inspiração ativa! +3 ATK por ' + player.buffBardo + ' combates</div>';
    }

    h += '<div style="text-align:center; margin-top:12px; display:flex; gap:8px; justify-content:center; flex-wrap:wrap;">';
    h += '<button onclick="usarBardoBuff()" style="padding:10px 20px;">🎵 Canção de Guerra</button>';
    h += '<button onclick="abrirTaverna()" style="padding:10px 20px; background:rgba(51,65,85,0.7); border-color:#475569;">💬 Conversar</button>';
    h += '</div>';

    h += '<button class="back-btn" onclick="fecharTaverna()">← Voltar à Cidade</button>';

    painel.innerHTML = h;
    mostrarPainelFullscreen("tavernaPanel");
}

function usarBardoBuff() {
    if (!player.buffBardo) player.buffBardo = 0;

    if (player.buffBardo > 0) {
        mostrarNotificacao("🎵 Já inspirado! +3 ATK por " + player.buffBardo + " combates!");
        return;
    }

    player.buffBardo = 5;
    log("🎵 Corvinus canta! +3 ATK por 5 combates!");
    mostrarNotificacao("🎵 +3 ATK por 5 combates!");
    updateUI();
    abrirTaverna();
}

// ============================================
// SEÇÃO 19: CEMITÉRIO E SOMBRA
// ============================================

function mostrarNpcCemiterio() {
    var npc = npcsData.sombra;
    var h = '<div style="text-align:center; margin-top:15px;">';
    h += '<div class="npc-card npc-cemiterio" onclick="abrirSombra()" style="display:inline-block; padding:15px 20px; cursor:pointer;">';
    h += renderNpcAvatar(npc);
    h += '<div style="color:#c084fc; font-weight:bold; margin-top:5px;">???</div>';
    h += '<div style="color:#94a3b8; font-size:0.75em;">Figura Misteriosa</div>';
    h += '</div></div>';
    h += '<div id="npcDialogoArea"></div>';
    return h;
}

function abrirSombra() {
    var npc = npcsData.sombra;
    var h = '<div class="dialogue-box" style="border-color:#6b21a8;">';
    h += '<div style="display:flex; align-items:center; gap:10px; margin-bottom:10px; padding-bottom:8px; border-bottom:1px solid #334155;">';
    h += renderNpcAvatar(npc, "small");
    h += '<div><div style="color:#c084fc; font-weight:bold;">???</div>';
    h += '<div style="color:#64748b; font-size:0.75em;">Figura Misteriosa</div></div></div>';
    h += '<div class="dialogue-text" style="border-left-color:#6b21a8;">' + getDialogoNpc(npc) + '</div>';
    var dica = getDicaNpc(npc);
    if (dica) h += '<div class="dialogue-dica">' + dica + '</div>';
    h += '<div style="display:flex; gap:8px; margin-top:10px; justify-content:center; flex-wrap:wrap;">';
    h += '<button onclick="sombraSecreto()" style="padding:8px 16px;">🌑 Pedir segredo</button>';
    h += '<button onclick="abrirSombra()" style="padding:8px 16px; background:rgba(51,65,85,0.7); border-color:#475569;">💬 Falar mais</button>';
    h += '</div></div>';

    var el = document.getElementById("npcDialogoArea");
    if (el) el.innerHTML = h;
}

function sombraSecreto() {
    var npc = npcsData.sombra;
    var dialogo = getDialogoNpc(npc, "secreto");
    var sorte = Math.random();
    var recomp = "";

    if (sorte < 0.3) {
        var xpG = 15 + Math.floor(player.level * 5);
        player.xp += xpG;
        recomp = '<div style="color:#c084fc; margin-top:8px;">🌑 +' + xpG + ' XP</div>';
        log("🌑 Sombra: +" + xpG + " XP");
    } else if (sorte < 0.5) {
        var oG = 10 + Math.floor(player.level * 8);
        player.gold += oG;
        recomp = '<div style="color:#fbbf24; margin-top:8px;">💰 +' + oG + ' ouro</div>';
        log("🌑 Sombra: +" + oG + " ouro");
    } else {
        recomp = '<div style="color:#94a3b8; margin-top:8px; font-style:italic;">"Nem todos os segredos são para os vivos."</div>';
    }

    var h = '<div class="dialogue-box" style="border-color:#6b21a8;">';
    h += '<div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">';
    h += renderNpcAvatar(npc, "small");
    h += '<div><div style="color:#c084fc; font-weight:bold;">???</div></div></div>';
    h += '<div class="dialogue-text" style="border-left-color:#6b21a8;">' + dialogo + '</div>';
    h += recomp;
    h += '<div style="text-align:center; margin-top:10px;">';
    h += '<button onclick="abrirSombra()" style="padding:8px 16px; background:rgba(51,65,85,0.7); border-color:#475569;">🌑 Falar mais</button>';
    h += '</div></div>';

    var el = document.getElementById("npcDialogoArea");
    if (el) el.innerHTML = h;
    updateUI();
}

// ============================================
// SEÇÃO 20: EVENTOS
// ============================================
function fecharEventoAleatorio() {
    gameState.eventoAtual = null;

    if (gameState.areaAtual && typeof mostrarPainel === "function") {
        mostrarPainel("areaOptionsPanel");
        return;
    }

    if (typeof mostrarPainel === "function") {
        mostrarPainel("navigationContainer");
    }
}
function mostrarEventoAleatorio(evento) {
    if (!evento) return;

    var panel = document.getElementById("eventoPanel");
    if (!panel) return;

    gameState.eventoAtual = evento;

    var html = '';
    html += '<div class="evento-container">';
    html += '<div class="evento-icone">' + (evento.icone || "❓") + '</div>';
    html += '<div class="evento-titulo">' + evento.titulo + '</div>';
    html += '<div class="evento-descricao">' + evento.descricao + '</div>';

    if (evento.escolhas && evento.escolhas.length) {
        html += '<div class="evento-escolhas">';
        evento.escolhas.forEach(function(escolha, i) {
            html += '<button class="evento-btn ' + (escolha.classe || "evento-btn-ignorar") + '" onclick="escolherEventoAleatorio(' + i + ')">';
            html += '<span class="evento-btn-icon">' + (escolha.icone || "➡️") + '</span>';
            html += '<span class="evento-btn-text">';
            html += '<span class="evento-btn-label">' + escolha.texto + '</span>';
            html += '<span class="evento-btn-hint">' + (escolha.hint || "") + '</span>';
            html += '</span>';
            html += '</button>';
        });
        html += '</div>';
    }

    html += '<button class="back-btn" onclick="fecharEventoAleatorio()">Voltar</button>';
    html += '</div>';

    panel.innerHTML = html;

    if (typeof mostrarPainel === "function") {
        mostrarPainel("eventoPanel");
    }
}
function escolherEventoAleatorio(index) {
    var evento = gameState.eventoAtual;
    if (!evento || !evento.escolhas || !evento.escolhas[index]) return;

    var escolha = evento.escolhas[index];
    var resultado = null;

    try {
        resultado = escolha.acao();
    } catch (e) {
        console.error("Erro ao executar escolha do evento:", e);
        mostrarNotificacao("⚠️ Erro ao resolver evento.");
        return;
    }

    var panel = document.getElementById("eventoPanel");
    if (!panel) return;

    var html = '';
    html += '<div class="evento-container">';
    html += '<div class="evento-icone">' + (evento.icone || "❓") + '</div>';
    html += '<div class="evento-titulo">' + evento.titulo + '</div>';
    html += '<div class="evento-resultado ' + (resultado && resultado.sucesso ? 'evento-resultado-bom' : 'evento-resultado-ruim') + '">';
    html += (resultado && resultado.msg ? resultado.msg : "Nada aconteceu.");
    html += '</div>';
    html += '<button class="main-btn" onclick="fecharEventoAleatorio()">Continuar</button>';
    html += '</div>';

    panel.innerHTML = html;

    if (typeof updateUI === "function") updateUI();
}
function entrarArea(areaId) {
    gameState.areaAtual = areaId;

    if (tentarEventoAleatorio(0.35)) {
        return;
    }

    mostrarPainel("areaOptionsPanel");
}
function cacar() {
    if (tentarEventoAleatorio(0.20)) return;

    iniciarCombate();
}
function voltarParaAreaComEvento() {
    if (tentarEventoAleatorio(1)) return; // 100% só para teste
    mostrarPainel("areaOptionsPanel");
}
function tentarEventoAleatorio(chance) {
    console.log("Tentando gerar evento aleatório...");
    chance = chance || 0.25;

    var disponiveis = getEventosDisponiveis();
    console.log("Eventos disponíveis:", disponiveis);

    if (!disponiveis.length) return false;

    if (Math.random() > chance) {
        console.log("Nenhum evento sorteado.");
        return false;
    }

    var evento = disponiveis[Math.floor(Math.random() * disponiveis.length)];
    console.log("Evento sorteado:", evento.id);
    mostrarEventoAleatorio(evento);
    return true;
}
// ============================================
// SEÇÃO 21: DADOS DOS NPCs
// ============================================

var npcsData = {
    corvinus: {
        nome: "Corvinus",
        titulo: "O Bardo Errante",
        emoji: "🎭",
        img: "images/emoji/corvinus.png",
        dialogos: [
            "Ah! *levanta a caneca* Sente-se, {nome}... sua história merece ser cantada!",
            "*dedilha o alaúde* Uma boa canção faz a espada mais afiada. Deixe-me provar.",
            "*olhos brilhando* Eu vi coisas, {nome}. Ruínas que sussurram nomes de reis mortos.",
            "Sabe por que viajo de taverna em taverna? Porque as histórias me encontram.",
            "*canta* '...E nas colinas o herói marchou, com ferro e fé, jamais recuou...'",
            "Os outros bardos cantam o passado. Eu canto o que ainda vai acontecer."
        ],
        dialogosBuff: [
            "*alaúde em mãos* OUÇAM TODOS! Este aventureiro merece uma canção épica!",
            "*melodia antiga* Sinta o poder das palavras ancestrais, {nome}!",
            "'COM FERRO E HONRA! QUE CADA GOLPE ESCREVA A HISTÓRIA!' ...Vá e seja lendário."
        ],
        dicas: [
            "O Rei Esqueleto guarda uma coroa que concede poder sobre os mortos...",
            "A Geleira... poucos voltam. Falam de um cristal que pulsa como um coração.",
            "Marta curou soldados na Grande Guerra. Seus remédios são ouro.",
            "Gundrik transformou sucata em uma lâmina que cortava sombras.",
            "Há uma Sombra nos cemitérios. Os mortos falam com ela.",
            "O Abismo não é um lugar. É uma ferida no mundo."
        ]
    },

    ferrox: {
        nome: "Ferrox",
        titulo: "Ferreiro Arcano",
        emoji: "🔥",
        img: "images/emoji/ferrox.png",
        dialogos: [
            "*martela o metal incandescente* O aço fala com quem sabe ouvir.",
            "Se quer poder verdadeiro, traga materiais dignos de uma forja lendária.",
            "Armas comuns qualquer um faz. Eu forjo destino.",
            "*olhar severo* Cada liga tem memória. Cada lâmina, um propósito.",
            "A diferença entre sucata e relíquia? Minhas mãos."
        ],
        dialogoForja: [
            "*faíscas voam* Segure firme. Isso aqui não perdoa erro.",
            "Boa matéria-prima, boa chance de grandeza.",
            "Você trouxe os ingredientes. Eu trarei a glória."
        ],
        dicas: [
            "Materiais raros das masmorras rendem melhores criações.",
            "Mineração é o caminho mais seguro para abastecer a forja.",
            "Nem toda receita vale o custo. Escolha com sabedoria."
        ]
    },

    marta: {
        nome: "Marta",
        titulo: "A Estalajadeira",
        emoji: "👩‍🍳",
        img: "images/emoji/marta.png",
        dialogos: [
            "Oh, {nome}! *limpa as mãos* Olha só pra você! Todo machucado... Senta aqui.",
            "*mãos na cintura* Eu criei cinco filhos e curei duzentos soldados. Sei quando precisa descansar!",
            "*sorriso caloroso* A diferença entre herói morto e vivo? Saber quando parar e dormir.",
            "A cama tá arrumada, o ensopado tá quente. Nem deus entra aqui sem licença.",
            "*olhar distante* Meu marido era aventureiro. Voltava com sorriso e cicatriz nova... até o dia que só a cicatriz voltou.",
            "Você me lembra ele. *firma* Mas chega! Come esse ensopado antes que esfrie!"
        ],
        dialogoDescanso: [
            "*ajusta os travesseiros* Quando acordar, vai se sentir como novo.",
            "*apaga a vela* Durma tranquilo(a), {nome}. Eu velo por você.",
            "*cobre com cobertor quente* Shh... Descanse. Amanhã será mais forte."
        ],
        dicas: [
            "Descanso restaura todo seu HP. De graça!",
            "Descanse aqui em vez de comprar poções.",
            "Corvinus fala demais, mas as dicas dele são de ouro."
        ]
    },

    gundrik: {
        nome: "Gundrik",
        titulo: "Mestre Ferreiro",
        emoji: "⚒️",
        img: "images/emoji/gundrik.png",
        dialogos: [
            "*som de martelo* Hmph. Mais um aventureiro. *olha sua arma* O que fizeram com essa lâmina?!",
            "Não forjo pra todo mundo. *cruza os braços* Mas você precisa sobreviver. Tá bom.",
            "*limpa o suor* Meu avô forjava pro exército real. Eu forjo pro destino.",
            "A diferença entre boa e EXCELENTE? Mil graus, trezentas marteladas, e orgulho.",
            "*examina equipamento* Não é o pior. *meio sorriso* Mas posso melhorar.",
            "Muita gente pede a arma mais forte. Bobagem. Esta adaga salvou mais vidas. O dono sabia USAR."
        ],
        dialogoForja: [
            "*coloca luvas* Fique parado e não toque em NADA.",
            "*CLANG CLANG* Perfeito. Como eu. *quase sorri*",
            "*entrega a peça* O melhor metal e o melhor ferreiro. Não me faça passar vergonha."
        ],
        dicas: [
            "Equipamentos fazem TODA a diferença entre vida e morte.",
            "Traga materiais raros das masmorras. Posso fazer coisas especiais.",
            "Invista em equipamento. Poção acaba. Armadura boa, não."
        ]
    },

    lydia: {
        nome: "Lydia",
        titulo: "Comerciante Viajante",
        emoji: "🧝‍♀️",
        img: "images/emoji/lydia.png",
        dialogos: [
            "*sorriso comercial* {nome}! Meu cliente favorito! *sussurra* Com você é verdade.",
            "Voltei das Terras do Norte. *abre baú* Poções raras e histórias...",
            "*conta moedas* Os preços são justos. Viajei doze reinos. Sei o preço de TUDO.",
            "Herói sem suprimentos é só cadáver com boa história. Não seja esse herói.",
            "As Cavernas do Cristal... Quase morri. *ri* Mas voltei com fortuna.",
            "*examina poção* Essa veio do Vulcão. O alquimista morreu fazendo a segunda. É única."
        ],
        dialogoCompra: [
            "*embrulha item* Boa escolha! Quando voltar, traga mais ouro!",
            "*guarda ouro* Prazer fazer negócio! Traga relíquias, pago bem.",
            "Vendido! Não vai achar esse preço em outro lugar."
        ],
        dicas: [
            "A partir do Tier 2, invista em Poções de Cura.",
            "Itens sobrando? Venda! Ouro parado não te protege.",
            "Tônicos são buffs PERMANENTES. Melhor investimento."
        ]
    },

    sombra: {
        nome: "???",
        titulo: "Figura Misteriosa",
        emoji: "🌑",
        img: "images/NPCs/sombra.png",
        dialogos: [
            "*emerge das sombras* Você me vê. Interessante. Os vivos raramente olham para as sombras.",
            "*voz como vento* {nome}... Eu sei seu nome. Os mortos sussurram... eu escuto.",
            "A linha entre vida e morte é fina como fio de aranha. Eu caminho sobre ela.",
            "*ri baixinho* Os vivos temem a morte. Os mortos temem o esquecimento. E eu? Nenhum me quer.",
            "Há um rei nestas lápides que jurou nunca morrer. Cumpriu. Mas não como esperava.",
            "*desaparece e reaparece* Se eu quisesse mal, você já estaria do outro lado."
        ],
        dialogosSecreto: [
            "*sussurra* Há um tesouro na masmorra do cemitério. Os mortos guardam por ciúme.",
            "Posso sentir algo em você... Um poder que ainda não despertou.",
            "Os mortos pediram para dizer: não confie no silêncio."
        ],
        dicas: [
            "O Cemitério guarda drops raros mas valiosos.",
            "O Necromante Supremo é resistente a ataques físicos. Use habilidades.",
            "Fantasmas Uivantes: HP fraco, ATK devastador. Mate rápido."
        ]
    },

    aldric: {
        nome: "Capitão Aldric",
        titulo: "Veterano da Guarda Real",
        emoji: "⚔️",
        img: "images/emoji/aldric.png",
        dialogos: [
            "*postura rígida* POSTURA, {nome}! Guerreiro que se curva já está derrotado!",
            "Vi seu nível. Sua postura. *pausa* Potencial desperdiçado é tragédia.",
            "Servi ao rei por 23 anos. *mostra cicatriz* Nunca dê as costas a inimigo caído.",
            "Força sem técnica é desperdício. *bate no peito* Mas disciplina ainda vence.",
            "Recrutas achavam que sabiam lutar. Uma hora no campo e saíam humildes.",
            "Não treino guerreiros. Treino SOBREVIVENTES. Esteja SEMPRE pronto."
        ],
        dialogoTreino: [
            "*posição de combate* Vamos ver do que é feito! GUARDA ALTA! GOLPE!",
            "*ofegante* Nada mal. Aguenta mais do que eu esperava.",
            "*cruza os braços* Treino acabou. Mais forte. Mas nunca forte o suficiente."
        ],
        dicas: [
            "Defender reduz dano. Pode salvar contra boss.",
            "Habilidades consomem energia mas causam dano extra.",
            "DEF alta? Use habilidades. ATK alto? Defenda e cure."
        ]
    }
};

// ============================================
// SEÇÃO 22: FUNÇÕES AUXILIARES DE NPC
// ============================================

function renderNpcAvatar(npc, tamanho) {
    var cl = (tamanho === "small") ? "dialogue-avatar" : "npc-avatar";
    var ph = (tamanho === "small") ? "dialogue-avatar-placeholder" : "npc-avatar-placeholder";

    if (npc.img && npc.img !== "") {
        return '<img src="' + npc.img + '" class="' + cl + '" alt="' + npc.nome + '" ' +
            'onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\';">' +
            '<div class="' + ph + '" style="display:none;">' + npc.emoji + '</div>';
    }

    return '<div class="' + ph + '">' + npc.emoji + '</div>';
}

function getDialogoNpc(npc, tipo) {
    var lista = npc.dialogos || [];

    if (tipo === "buff" && npc.dialogosBuff) lista = npc.dialogosBuff;
    if (tipo === "descanso" && npc.dialogoDescanso) lista = npc.dialogoDescanso;
    if (tipo === "forja" && npc.dialogoForja) lista = npc.dialogoForja;
    if (tipo === "compra" && npc.dialogoCompra) lista = npc.dialogoCompra;
    if (tipo === "treino" && npc.dialogoTreino) lista = npc.dialogoTreino;
    if (tipo === "secreto" && npc.dialogosSecreto) lista = npc.dialogosSecreto;

    if (!lista || lista.length === 0) return "...";

    var txt = lista[Math.floor(Math.random() * lista.length)];
    return txt.replace(/\{nome\}/g, player.nome || "Aventureiro");
}

function getDicaNpc(npc) {
    if (!npc.dicas || npc.dicas.length === 0) return "";
    return "💡 " + npc.dicas[Math.floor(Math.random() * npc.dicas.length)];
}

function gerarNpcHeader(npc) {
    var h = '<div style="text-align:center; margin-bottom:10px; padding:10px; background:rgba(0,0,0,0.2); border-radius:10px;">';
    h += '<div style="display:inline-block;">' + renderNpcAvatar(npc) + '</div>';
    h += '<div class="npc-nome" style="color:#fbbf24; margin-top:4px; font-weight:bold;">' + npc.nome + '</div>';
    h += '<div style="color:#94a3b8; font-size:0.75em; font-style:italic;">' + npc.titulo + '</div>';
    h += '<div class="dialogue-text" style="margin-top:8px; font-size:0.82em;">' + getDialogoNpc(npc) + '</div>';
    var dica = getDicaNpc(npc);
    if (dica) h += '<div class="dialogue-dica" style="margin-top:6px; font-size:0.78em;">' + dica + '</div>';
    h += '</div>';
    return h;
}

// ============================================
// SEÇÃO 23: DIÁLOGO
// ============================================

function mostrarDialogoNpc(nome, texto) {
    var box = document.getElementById("npcDialogueBox");
    var content = document.getElementById("npcDialogueContent");
    if (!box || !content) return;

    content.innerHTML =
        '<div class="dialogue-box">' +
            '<div class="dialogue-header">' +
                '<div class="dialogue-npc-icon">💬</div>' +
                '<div class="dialogue-npc-name">' + nome + '</div>' +
            '</div>' +
            '<div class="dialogue-text">' + texto + '</div>' +
        '</div>';
    box.style.display = "block";
}

function fecharDialogo() {
    var box = document.getElementById("npcDialogueBox");
    if (box) box.style.display = "none";
}

// ============================================
// SEÇÃO 24: FORJA FERROX
// ============================================

var feroxData = typeof feroxData !== "undefined" ? feroxData : {
    pedidoAtual: 0,
    pedidosConcluidos: []
};

var pedidosFerrox = [
    {
        id: "pedido_cobre",
        titulo: "🔥 Pedido de Cobre",
        descricao: "Traga 3 Minérios de Cobre para Ferrox.",
        materiais: [{ nome: "Minério de Cobre", qtd: 3, icone: "🟤" }],
        recompensa: { ouro: 80, item: { nome: "Barra de Cobre Refinada", icone: "🟠", tipo: "material" } },
        dialogoEntrega: "Bom. Cobre bruto, mas útil. Já dá pra fazer algo decente com isso."
    },
    {
        id: "pedido_ferro",
        titulo: "⛏️ Forja Inicial",
        descricao: "Traga 2 Minérios de Ferro e 1 Pepita de Prata.",
        materiais: [
            { nome: "Minério de Ferro", qtd: 2, icone: "⛏️" },
            { nome: "Pepita de Prata", qtd: 1, icone: "🥈" }
        ],
        recompensa: { ouro: 150, item: { nome: "Liga Aprimorada", icone: "⚙️", tipo: "material" } },
        dialogoEntrega: "Ferro e prata. Agora estamos falando de material digno de uma bigorna."
    },
    {
        id: "pedido_adamantina",
        titulo: "💎 Metal Nobre",
        descricao: "Traga 1 Cristal de Adamantina para uma arma rara.",
        materiais: [{ nome: "Cristal de Adamantina", qtd: 1, icone: "💠" }],
        recompensa: { ouro: 300, item: { nome: "Núcleo de Forja Arcana", icone: "🌟", tipo: "material" } },
        dialogoEntrega: "Adamantina... agora sim você trouxe algo que merece respeito."
    }
];

function getPedidoFerroxAtual() {
    if (feroxData.pedidoAtual >= pedidosFerrox.length) return null;
    return pedidosFerrox[feroxData.pedidoAtual];
}

function contarItemInventario(nome) {
    var total = 0;
    if (!player.inventario) return 0;
    player.inventario.forEach(function(item) {
        if (item.nome === nome) total += item.quantidade || 1;
    });
    return total;
}

function temMateriaisPedido(pedido) {
    if (!pedido) return false;
    return pedido.materiais.every(function(mat) {
        return contarItemInventario(mat.nome) >= mat.qtd;
    });
}

function removerItemInventarioPorNome(nome, qtd) {
    if (!player.inventario) return false;
    var restante = qtd;

    for (var i = player.inventario.length - 1; i >= 0; i--) {
        var item = player.inventario[i];
        if (item.nome === nome) {
            var disponivel = item.quantidade || 1;
            if (disponivel <= restante) {
                restante -= disponivel;
                player.inventario.splice(i, 1);
            } else {
                item.quantidade -= restante;
                restante = 0;
            }

            if (restante <= 0) break;
        }
    }

    return restante <= 0;
}

function entregarPedidoFerrox() {
    var pedido = getPedidoFerroxAtual();
    if (!pedido) {
        mostrarNotificacao("✅ Ferrox não tem mais pedidos.");
        return;
    }

    if (!temMateriaisPedido(pedido)) {
        mostrarNotificacao("❌ Você ainda não tem todos os materiais.");
        return;
    }

    pedido.materiais.forEach(function(mat) {
        removerItemInventarioPorNome(mat.nome, mat.qtd);
    });

    player.gold += pedido.recompensa.ouro;

    if (pedido.recompensa.item) {
        adicionarItemInventario(
            pedido.recompensa.item.nome,
            pedido.recompensa.item.icone,
            1,
            { tipo: pedido.recompensa.item.tipo || "material" }
        );
    }

    feroxData.pedidosConcluidos.push(pedido.id);
    feroxData.pedidoAtual++;

    mostrarNotificacao("🔥 Pedido entregue! +" + pedido.recompensa.ouro + " ouro");
    log("🔥 Ferrox: pedido concluído — " + pedido.titulo);
    updateUI();
    abrirForja();
}

function renderPedidoFerrox() {
    var pedido = getPedidoFerroxAtual();

    if (!pedido) {
        return '<div style="background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.2);border-radius:8px;padding:10px;margin-bottom:10px;">' +
            '<strong style="color:#22c55e;">✅ Todos os pedidos concluídos</strong><br>' +
            '<span style="color:#94a3b8;font-size:0.82em;">Ferrox não precisa de mais materiais por enquanto.</span>' +
        '</div>';
    }

    var html = '';
    html += '<div style="background:rgba(251,191,36,0.08);border:1px solid rgba(251,191,36,0.15);border-radius:8px;padding:10px;margin-bottom:10px;">';
    html += '<strong style="color:#fbbf24;">📜 Pedido Atual de Ferrox</strong><br>';
    html += '<div style="margin-top:6px;color:#e2e8f0;font-weight:bold;">' + pedido.titulo + '</div>';
    html += '<div style="color:#94a3b8;font-size:0.82em;margin-bottom:8px;">' + pedido.descricao + '</div>';

    pedido.materiais.forEach(function(mat) {
        var qtdAtual = contarItemInventario(mat.nome);
        var ok = qtdAtual >= mat.qtd;
        html += '<div style="font-size:0.82em;margin:4px 0;color:' + (ok ? '#4ade80' : '#f87171') + ';">' +
            mat.icone + ' ' + mat.nome + ': ' + qtdAtual + '/' + mat.qtd + '</div>';
    });

    html += '<div style="margin-top:8px;color:#fbbf24;font-size:0.82em;">Recompensa: 💰' + pedido.recompensa.ouro;
    if (pedido.recompensa.item) {
        html += ' + ' + pedido.recompensa.item.icone + ' ' + pedido.recompensa.item.nome;
    }
    html += '</div>';

    if (temMateriaisPedido(pedido)) {
        html += '<button onclick="entregarPedidoFerrox()" style="margin-top:10px;padding:8px 16px;">📦 Entregar Materiais</button>';
    } else {
        html += '<button disabled style="margin-top:10px;padding:8px 16px;opacity:0.5;">❌ Materiais Insuficientes</button>';
    }

    html += '</div>';
    return html;
}

function abrirForja() {
    var painel = document.getElementById("forjaPanel");
    if (!painel) return;

    var npc = npcsData.ferrox;
    var pedidoAtual = getPedidoFerroxAtual();
    var fala = pedidoAtual ? pedidoAtual.dialogoEntrega || getDialogoNpc(npc, "forja") : getDialogoNpc(npc, "forja");

    var h = '';
    h += '<h3 style="color:#ffd700;text-align:center;margin-bottom:5px;"><img src="images/emoji/forja.png" class="emoji"> Forja</h3>';
    h += gerarNpcHeader({
        nome: npc.nome,
        titulo: npc.titulo,
        emoji: npc.emoji,
        img: npc.img,
        dialogos: [fala],
        dicas: npc.dicas
    });

    h += renderPedidoFerrox();
    h += '<p class="gold-display">💰 Ouro: <span id="forjaGoldUI">' + player.gold + '</span></p>';

    h += '<div class="shop-tabs">';
    h += '<button id="tabAlqPocao" class="shop-tab active-tab" onclick="trocarAbaForja(\'pocao\')">🧪 Poções</button>';
    h += '<button id="tabAlqElixir" class="shop-tab" onclick="trocarAbaForja(\'elixir\')">💊 Elixires</button>';
    h += '<button id="tabAlqEquip" class="shop-tab" onclick="trocarAbaForja(\'equipamento\')">⚔️ Equips</button>';
    h += '<button id="tabAlqMateriais" class="shop-tab" onclick="trocarAbaForja(\'materiais\')">📦 Materiais</button>';
    h += '</div>';

    h += '<div class="shop-content"><div id="forjaLista"></div></div>';
    h += '<button onclick="fecharForja()" class="back-btn">⬅️ Voltar à Cidade</button>';

    painel.innerHTML = h;

    if (typeof trocarAbaForja === "function") {
        trocarAbaForja("pocao");
    }

    mostrarPainelFullscreen("forjaPanel");
}

// ============================================
// SEÇÃO 25: NPCS DE CAMPANHA
// ============================================

function renderizarNpcCampanhaArea(areaKey) {
    if (typeof getNpcCampanhaDaArea !== "function") return "";
    if (typeof npcsCampanha === "undefined") return "";

    var lista = getNpcCampanhaDaArea(areaKey);
    if (!lista || lista.length === 0) return "";

    var html = '<div style="margin-top:12px;padding:10px;background:rgba(15,23,42,0.55);border:1px solid rgba(148,163,184,0.2);border-radius:10px;">';
    html += '<div style="color:#cbd5e1;font-weight:bold;margin-bottom:8px;">🧭 Presenças da Campanha</div>';

    lista.forEach(function(npcId) {
        var npc = npcsCampanha[npcId];
        if (!npc) return;
        html += '<button onclick="abrirEventoNpcCampanha(\'' + npcId + '\')" style="display:block;width:100%;margin:6px 0;padding:10px;border-radius:8px;text-align:left;">';
        html += npc.emoji + ' <strong>' + npc.nome + '</strong><br>';
        html += '<small style="color:#94a3b8;">' + npc.titulo + '</small>';
        html += '</button>';
    });

    html += '</div>';
    return html;
}

function abrirEventoNpcCampanha(npcId) {
    if (typeof getEventoNpcPorRota !== "function") return;

    var npc = npcsCampanha[npcId];
    var evento = getEventoNpcPorRota(npcId);
    if (!npc || !evento) return;

    mostrarPainelFullscreen("eventoPanel");

    var el = document.getElementById("eventoContent");
    if (!el) return;

    var html = '';
    html += '<div class="evento-container">';
    html += '<div class="evento-icone">' + npc.emoji + '</div>';
    html += '<div class="evento-titulo">' + npc.nome + ' — ' + evento.titulo + '</div>';
    html += '<div class="evento-descricao">' + evento.descricao + '</div>';
    html += '<div style="margin-top:10px;padding:8px;background:rgba(30,41,59,0.7);border-radius:8px;color:#fbbf24;">' + evento.recompensaTexto + '</div>';
    html += '<button onclick="concluirEventoNpcCampanha(\'' + npcId + '\')" class="back-btn" style="margin-top:15px;">✅ Prosseguir</button>';
    html += '<button onclick="fecharEvento()" class="back-btn" style="margin-top:8px;">⬅️ Voltar</button>';
    html += '</div>';

    el.innerHTML = html;
}

function concluirEventoNpcCampanha(npcId) {
    var rota = typeof getRotaDominante === "function" ? getRotaDominante() : "neutro";

    switch (npcId) {
        case "elian":
            if (rota === "heroi") {
                setFlagNarrativa("ajudouElian", true);
                alterarRelacaoNpcCampanha("elian", "confianca", 2);
                alterarRelacaoNpcCampanha("elian", "respeito", 1);
            } else if (rota === "sombrio") {
                setFlagNarrativa("traiuElian", true);
                alterarRelacaoNpcCampanha("elian", "medo", 2);
            }
            break;
        case "soraya":
            if (rota === "heroi") {
                setFlagNarrativa("libertouAlmasComSoraya", true);
                alterarRelacaoNpcCampanha("soraya", "confianca", 2);
            } else if (rota === "sombrio") {
                setFlagNarrativa("usouAlmasComSoraya", true);
                alterarRelacaoNpcCampanha("soraya", "ruptura", 1);
                player.narrativa.npcCampanha.soraya.ruptura = true;
            }
            break;
        case "draeven":
            if (rota === "heroi" || rota === "neutro") {
                setFlagNarrativa("ajudouDraeven", true);
                alterarRelacaoNpcCampanha("draeven", "respeito", 2);
            } else if (rota === "sombrio") {
                setFlagNarrativa("dominouDraeven", true);
                alterarRelacaoNpcCampanha("draeven", "medo", 2);
            }
            break;
        case "iris":
            if (rota === "heroi" || rota === "neutro") {
                setFlagNarrativa("confiouEmIris", true);
                alterarRelacaoNpcCampanha("iris", "respeito", 2);
            } else if (rota === "sombrio") {
                setFlagNarrativa("roubouIris", true);
                alterarRelacaoNpcCampanha("iris", "medo", 2);
            }
            break;
        case "tallen":
            if (rota === "heroi") {
                setFlagNarrativa("restaurouGuardaTallen", true);
                alterarRelacaoNpcCampanha("tallen", "confianca", 2);
            } else if (rota === "sombrio") {
                setFlagNarrativa("corrompeuTallen", true);
                alterarRelacaoNpcCampanha("tallen", "medo", 1);
                alterarRelacaoNpcCampanha("tallen", "respeito", 1);
            }
            break;
        case "maela":
            if (rota === "heroi") {
                setFlagNarrativa("salvouMaela", true);
                alterarRelacaoNpcCampanha("maela", "confianca", 2);
            } else if (rota === "sombrio") {
                setFlagNarrativa("explorouMaela", true);
                alterarRelacaoNpcCampanha("maela", "ruptura", 1);
                player.narrativa.npcCampanha.maela.ruptura = true;
            }
            break;
    }

    if (typeof marcarEventoNpcCampanhaConcluido === "function") {
        marcarEventoNpcCampanhaConcluido(npcId);
    }

    mostrarNotificacao("📖 Evento de campanha concluído!");
    fecharEvento();
}

function renderizarNpcCampanhaNoPainelArea() {
    if (!gameState || !gameState.areaAtual) return;
    if (typeof getNpcCampanhaDaArea !== "function") return;
    if (typeof npcsCampanha === "undefined") return;

    var container = document.getElementById("npcCampanhaAreaContainer");
    if (!container) return;

    var lista = (typeof getNpcCampanhaDisponiveisNaArea === "function")
        ? getNpcCampanhaDisponiveisNaArea(gameState.areaAtual)
        : getNpcCampanhaDaArea(gameState.areaAtual);

    if (!lista || lista.length === 0) {
        container.innerHTML = "";
        return;
    }

    var html = '<div style="margin-top:12px;padding:12px;background:rgba(15,23,42,0.65);border:1px solid rgba(148,163,184,0.18);border-radius:10px;">';
    html += '<div style="color:#cbd5e1;font-weight:bold;margin-bottom:8px;">🧭 Encontros na Região</div>';
    html += '<div style="display:grid;grid-template-columns:1fr;gap:8px;">';

    lista.forEach(function(npcId) {
        var npc = npcsCampanha[npcId];
        if (!npc) return;

        var estado = (player && player.narrativa && player.narrativa.npcCampanha && player.narrativa.npcCampanha[npcId])
            ? player.narrativa.npcCampanha[npcId]
            : null;

        var status = "";
        if (estado && estado.eventoConcluido) {
            status = '<span style="color:#4ade80;font-size:0.75em;">✅ Evento concluído</span>';
        } else {
            status = '<span style="color:#fbbf24;font-size:0.75em;">📖 Evento disponível</span>';
        }

        html += '<button onclick="abrirNpcCampanhaArea(\'' + npcId + '\')" style="display:block;width:100%;padding:10px;text-align:left;background:rgba(30,41,59,0.85);border:1px solid #334155;border-radius:8px;color:#e2e8f0;cursor:pointer;">';
        html += '<div style="display:flex;justify-content:space-between;align-items:center;gap:10px;">';
        html += '<div>';
        html += '<div style="font-weight:bold;">' + npc.emoji + ' ' + npc.nome + '</div>';
        html += '<div style="color:#94a3b8;font-size:0.8em;">' + npc.titulo + '</div>';
        html += '</div>';
        html += '<div style="text-align:right;">' + status + '</div>';
        html += '</div>';
        html += '</button>';
    });

    html += '</div></div>';
    container.innerHTML = html;
}

function abrirNpcCampanhaArea(npcId) {
    if (typeof npcsCampanha === "undefined") return;
    if (typeof getEventoNpcPorRota !== "function") return;

    var npc = npcsCampanha[npcId];
    if (!npc) return;

    var evento = getEventoNpcPorRota(npcId);
    if (!evento) return;

    mostrarPainelFullscreen("eventoPanel");

    var el = document.getElementById("eventoContent");
    if (!el) return;

    var estado = (player && player.narrativa && player.narrativa.npcCampanha && player.narrativa.npcCampanha[npcId])
        ? player.narrativa.npcCampanha[npcId] : null;

    var rotaAtual = (typeof getRotaDominante === "function") ? getRotaDominante() : "neutro";

    var html = '';
    html += '<div class="evento-container">';
    html += '<div class="evento-icone">' + npc.emoji + '</div>';
    html += '<div class="evento-titulo">' + npc.nome + '</div>';
    html += '<div style="color:#94a3b8;font-size:0.85em;margin-bottom:6px;">' + npc.titulo + '</div>';
    html += '<div class="evento-descricao" style="margin-bottom:8px;">' + npc.descricao + '</div>';

    html += '<div style="background:rgba(30,41,59,0.7);border:1px solid rgba(148,163,184,0.15);border-radius:8px;padding:10px;margin-bottom:10px;text-align:left;">';
    html += '<div style="color:#fbbf24;font-weight:bold;margin-bottom:4px;">Rota atual: ' + rotaAtual.toUpperCase() + '</div>';
    html += '<div style="color:#e2e8f0;font-weight:bold;">' + evento.titulo + '</div>';
    html += '<div style="color:#cbd5e1;font-size:0.9em;margin-top:6px;">' + evento.descricao + '</div>';
    html += '<div style="color:#86efac;font-size:0.85em;margin-top:8px;">' + evento.recompensaTexto + '</div>';
    html += '</div>';

    if (estado) {
        html += '<div style="background:rgba(15,23,42,0.55);border-radius:8px;padding:8px;margin-bottom:10px;text-align:left;font-size:0.82em;">';
        html += '<div style="color:#cbd5e1;font-weight:bold;margin-bottom:4px;">Estado da relação</div>';
        html += '<div style="color:#94a3b8;">🤝 Confiança: ' + estado.confianca + '</div>';
        html += '<div style="color:#94a3b8;">🛡️ Respeito: ' + estado.respeito + '</div>';
        html += '<div style="color:#94a3b8;">⚠️ Medo: ' + estado.medo + '</div>';
        html += '<div style="color:' + (estado.ruptura ? '#f87171' : '#4ade80') + ';">' + (estado.ruptura ? '💔 Relação rompida' : '🔗 Relação ativa') + '</div>';
        html += '</div>';
    }

    if (estado && estado.eventoConcluido) {
        html += '<button class="back-btn" onclick="fecharEvento()" style="margin-top:10px;">⬅️ Voltar</button>';
    } else {
        html += '<button onclick="concluirEventoNpcCampanha(\'' + npcId + '\'); fecharEvento(); renderizarNpcCampanhaNoPainelArea();" class="back-btn" style="margin-top:10px;">✅ Prosseguir com evento</button>';
        html += '<button onclick="fecharEvento()" class="back-btn" style="margin-top:8px;">⬅️ Voltar</button>';
    }

    html += '</div>';
    el.innerHTML = html;
}

function garantirContainerNpcCampanhaArea() {
    var painel = document.getElementById("areaOptionsPanel");
    if (!painel) return;

    var existente = document.getElementById("npcCampanhaAreaContainer");
    if (existente) return;

    var container = document.createElement("div");
    container.id = "npcCampanhaAreaContainer";
    container.style.marginTop = "10px";
    painel.appendChild(container);
}

function atualizarNpcCampanhaArea() {
    garantirContainerNpcCampanhaArea();
    renderizarNpcCampanhaNoPainelArea();
}

// ============================================
// SEÇÃO 26: INJETAR NPCS EM PAINÉIS EXISTENTES
// ============================================

(function() {
    setTimeout(function() {
        var cidadePanel = document.getElementById("cidadePanel");
        if (!cidadePanel) return;

        var cidadeOptions = cidadePanel.querySelector("#cidadeOptions") || cidadePanel;
        if (cidadePanel.innerHTML.indexOf("abrirTaverna") !== -1) return;

        var btnEstalagem = document.createElement("div");
        btnEstalagem.className = "cidade-btn";
        btnEstalagem.onclick = abrirEstalagem;
        btnEstalagem.innerHTML = '<img src="images/emoji/estalagem.png" class="emoji"> Estalagem<small>Marta, a Estalajadeira</small>';

        var btnTaverna = document.createElement("div");
        btnTaverna.className = "cidade-btn";
        btnTaverna.onclick = abrirTaverna;
        btnTaverna.innerHTML = '<img src="images/emoji/taverna.png" class="emoji"> Taverna<small>Corvinus, o Bardo</small>';

        cidadeOptions.appendChild(btnEstalagem);
        cidadeOptions.appendChild(btnTaverna);
    }, 1000);
})();

(function() {
    if (typeof abrirLoja === "function") {
        var originalAbrirLoja = abrirLoja;
        abrirLoja = function() {
            originalAbrirLoja();
            setTimeout(function() {
                var painel = document.getElementById("lojaPanel");
                if (painel && !painel.querySelector(".npc-header-injetado")) {
                    var header = document.createElement("div");
                    header.className = "npc-header-injetado";
                    header.innerHTML = gerarNpcHeader(npcsData.lydia);
                    painel.insertBefore(header, painel.firstChild);
                }
            }, 50);
        };
    }

    if (typeof abrirArmaria === "function") {
        var originalAbrirArmaria = abrirArmaria;
        abrirArmaria = function() {
            originalAbrirArmaria();
            setTimeout(function() {
                var painel = document.getElementById("armariaPanel");
                if (painel && !painel.querySelector(".npc-header-injetado")) {
                    var header = document.createElement("div");
                    header.className = "npc-header-injetado";
                    header.innerHTML = gerarNpcHeader(npcsData.gundrik);
                    painel.insertBefore(header, painel.firstChild);
                }
            }, 50);
        };
    }
})();

// ============================================
// SEÇÃO 27: ESTILOS AVANÇADOS DA NARRAÇÃO
// ============================================

(function adicionarEstilosNarracaoAvancada() {
    if (document.getElementById("narracaoEstilosAvancados")) return;

    var style = document.createElement("style");
    style.id = "narracaoEstilosAvancados";
    style.textContent = "\
        .historia-card { background: linear-gradient(180deg, rgba(15,23,42,0.92), rgba(30,41,59,0.9)); border: 1px solid rgba(148,163,184,0.16); border-radius: 14px; padding: 16px; box-shadow: 0 0 20px rgba(0,0,0,0.25); }\
        .historia-capitulo-titulo { color: #ffd700; font-size: 1.2em; font-weight: bold; text-align: center; margin-bottom: 8px; }\
        .historia-cena-titulo { color: #cbd5e1; font-size: 0.9em; text-align: center; margin-bottom: 10px; opacity: 0.9; }\
        .historia-icone { font-size: 2.4em; text-align: center; margin-bottom: 12px; }\
        .historia-narrador-label { color: #94a3b8; font-size: 0.72em; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 6px; text-align: center; }\
        .historia-texto { color: #e2e8f0; line-height: 1.85; white-space: pre-line; font-size: 0.96em; text-align: left; margin-bottom: 14px; }\
        .historia-fala-box { background: rgba(30,41,59,0.78); border-left: 4px solid #38bdf8; border-radius: 10px; padding: 12px; margin-bottom: 14px; text-align: left; }\
        .historia-fala-nome { color: #38bdf8; font-weight: bold; margin-bottom: 4px; }\
        .historia-fala-texto { color: #cbd5e1; line-height: 1.75; white-space: pre-line; }\
        .historia-pensamento-box { background: rgba(88,28,135,0.18); border-left: 4px solid #a78bfa; border-radius: 10px; padding: 12px; margin-bottom: 14px; text-align: left; }\
        .historia-pensamento-nome { color: #c4b5fd; font-weight: bold; margin-bottom: 4px; }\
        .historia-pensamento-texto { color: #ede9fe; font-style: italic; line-height: 1.75; white-space: pre-line; }\
        .historia-escolha-box { background: rgba(255,215,0,0.08); border: 1px solid rgba(255,215,0,0.18); border-radius: 10px; padding: 12px; margin: 12px 0; }\
        .historia-escolha-pergunta { color: #ffd700; font-weight: bold; margin-bottom: 10px; text-align: center; }\
        .historia-btn-escolha { display: block; width: 100%; margin: 6px 0; padding: 10px 12px; text-align: left; background: rgba(30,41,59,0.85); border: 1px solid #475569; border-radius: 8px; color: #e2e8f0; cursor: pointer; transition: all 0.18s ease; font-size: 0.92em; }\
        .historia-btn-escolha:hover { transform: translateY(-1px); border-color: #94a3b8; background: rgba(51,65,85,0.92); }\
        .historia-controles { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; margin-top: 10px; }\
        .historia-btn { padding: 10px 22px; border-radius: 8px; cursor: pointer; }\
        .historia-audio-indicador { text-align: center; color: #94a3b8; font-size: 0.75em; margin-top: -4px; margin-bottom: 10px; }\
        .historia-status-rota { text-align: center; font-size: 0.76em; color: #fbbf24; margin-bottom: 10px; }\
        .historia-resultado-box { background: rgba(15,23,42,0.72); border: 1px solid rgba(148,163,184,0.2); border-radius: 10px; padding: 14px; margin-top: 8px; }\
        .historia-recompensa { background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.22); border-radius: 8px; padding: 10px; color: #86efac; margin-top: 10px; font-size: 0.9em; }\
    ";
    document.head.appendChild(style);
})();

// ============================================
// SEÇÃO 28: MOBILE E INICIALIZAÇÃO
// ============================================

function configurarLayoutMobile() {
    var logEl = document.getElementById("log");
    if (logEl && window.innerWidth <= 768) {
        logEl.classList.add("show-mobile");
    }
}

window.addEventListener("load", configurarLayoutMobile);

window.addEventListener("resize", function() {
    var logEl = document.getElementById("log");
    if (!logEl) return;

    if (window.innerWidth <= 768) {
        var navContainer = document.getElementById("navigationContainer");
        if (navContainer && navContainer.style.display !== "none") {
            logEl.classList.add("show-mobile");
        } else {
            logEl.classList.remove("show-mobile");
        }
    } else {
        logEl.classList.remove("show-mobile");
        logEl.style.display = "block";
    }
});

// ============================================
// FIM DO UI.JS COMPLETO
// ============================================