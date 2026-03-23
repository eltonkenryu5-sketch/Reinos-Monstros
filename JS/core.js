// ============================================
// CORE.JS LIMPO
// ============================================

// ============================================
// SEÇÃO 1: MODO DE JOGO
// ============================================

var modoJogo = null;

function selecionarModo(modo) {
    modoJogo = modo;

    const btnNormal = document.getElementById("btnModoNormal");
    const btnHardcore = document.getElementById("btnModoHardcore");
    const modoDescricao = document.getElementById("modoDescricao");
    const modoDescTexto = document.getElementById("modoDescTexto");
    const btnJogar = document.getElementById("btnJogar");
    const erro = document.getElementById("modoErroMsg");

    if (btnNormal) btnNormal.classList.remove("modo-selecionado");
    if (btnHardcore) btnHardcore.classList.remove("modo-selecionado");

    if (modo === "normal") {
        if (btnNormal) btnNormal.classList.add("modo-selecionado");
        if (modoDescricao) modoDescricao.className = "modo-descricao normal";
        if (modoDescTexto) {
            modoDescTexto.textContent = "Modo clássico. Ao morrer, perde 50% do ouro e revive na cidade.";
        }
    } else {
        if (btnHardcore) btnHardcore.classList.add("modo-selecionado");
        if (modoDescricao) modoDescricao.className = "modo-descricao hardcore";
        if (modoDescTexto) {
            modoDescTexto.textContent = "☠️ Morte permanente! Sem segunda chance. Recompensas +50%.";
        }
    }

    if (btnJogar) btnJogar.classList.remove("modo-nao-selecionado");
    if (erro) erro.classList.remove("show");
}

function isHardcore() {
    return modoJogo === "hardcore" || (player && player.modoHardcore);
}

function getBonusHardcore(tipo) {
    if (!isHardcore()) return 1.0;

    switch (tipo) {
        case "xp": return 1.50;
        case "ouro": return 1.50;
        case "drop": return 0.10;
        default: return 1.0;
    }
}

function novoJogoHardcore() {
    const gs = document.getElementById("gameOverScreen");
    if (gs) gs.style.display = "none";

    modoJogo = null;
    mudarTela("welcomeScreen");
}

// ============================================
// SEÇÃO 2: HISTÓRIA E CAPÍTULOS
// ============================================

function finalizarCapitulo() {
    const cap = gameState.capituloEmAndamento;
    if (!cap) return;

    if (typeof garantirEstadoNarrativoPlayer === "function") {
        garantirEstadoNarrativoPlayer();
    }

    if (typeof expandirEstadoNarrativoHistoria === "function") {
        expandirEstadoNarrativoHistoria();
    }

    if (player && player.narrativa && player.narrativa.capitulosVistos) {
        if (!player.narrativa.capitulosVistos.includes(cap.id)) {
            player.narrativa.capitulosVistos.push(cap.id);
        }
    }

    gameState.capituloEmAndamento = null;

    let caminhoTexto = "⚖️ Neutro";
    if (typeof getRotaDominante === "function") {
        const rota = getRotaDominante();
        caminhoTexto =
            rota === "heroi" ? "🙏 Herói" :
            rota === "sombrio" ? "💀 Sombrio" :
            "⚖️ Neutro";
    }

    if (typeof mostrarResultado === "function") {
        mostrarResultado(
            "📖 Capítulo " + cap.id + " Completo!",
            "📖",
            cap.titulo + "\n\nCaminho: " + caminhoTexto,
            "Capítulo " + cap.id + "/15 concluído!"
        );
    }

    if (typeof log === "function") {
        log("📖 Capítulo " + cap.id + " '" + cap.titulo + "' — " + caminhoTexto);
    }

    if (typeof mostrarPainel === "function") {
        mostrarPainel("areaOptionsPanel");
    }
}
// ============================================
// SEÇÃO 3: POPUPS AUTO-FECHÁVEIS
// ============================================

function mostrarPopupAutoFechavel(elementId, duracao, callbackAoFechar) {
    duracao = duracao || 4000;

    const el = document.getElementById(elementId);
    if (!el) {
        if (callbackAoFechar) callbackAoFechar();
        return;
    }

    el.style.display = "flex";
    el.style.pointerEvents = "auto";
    el.style.visibility = "visible";
    el.style.opacity = "1";

    el.style.animation = "none";

    const box =
        el.querySelector(".overlay-box") ||
        el.querySelector(".levelup-box") ||
        el.querySelector(".gameover-box");

    if (box) box.style.animation = "none";

    void el.offsetWidth;

    const fadeOut = (duracao / 1000) - 0.3;
    const boxOut = (duracao / 1000) - 0.5;

    el.style.animation =
        "overlayFadeInAuto 0.3s ease forwards, overlayFadeOutAuto 0.3s ease " + fadeOut + "s forwards";

    if (box) {
        box.style.animation =
            "popupAutoIn 0.5s ease forwards, popupAutoOut 0.5s ease " + boxOut + "s forwards";
    }

    setTimeout(function() {
        el.style.display = "none";
        el.style.animation = "";
        if (box) box.style.animation = "";
        if (callbackAoFechar) callbackAoFechar();
    }, duracao);
}

// ============================================
// SEÇÃO 4: SISTEMA DE MÚSICA
// ============================================

var musicaAtual = null;
var musicaElement = null;
var musicaVolume = 0.3;
var musicaMudo = false;

var trilhasSonoras = {
    menu:       "images/Sons/menu.mp3",
    cidade:     "audio/cidade.mp3",
    combate:    "audio/combate.mp3",
    boss:       "audio/boss.mp3",
    masmorra:   "audio/masmorra.mp3",
    vitoria:    "audio/vitoria.mp3",
    derrota:    "audio/derrota.mp3",

    floresta:   "audio/area_floresta.mp3",
    pantano:    "audio/area_natureza.mp3",
    colinas:    "audio/area_natureza.mp3",
    ruinas:     "audio/area_misterio.mp3",
    deserto:    "audio/area_deserto.mp3",
    cemiterio:  "audio/area_sombrio.mp3",
    caverna:    "audio/area_caverna.mp3",
    vulcao:     "audio/area_epico.mp3",
    geleira:    "audio/area_geleira.mp3",
    cidadeFant: "audio/area_sombrio.mp3",
    abismo:     "audio/area_sombrio.mp3",
    castelo:    "audio/area_epico.mp3",
    planoAstral:"audio/area_epico.mp3",
    infernus:   "audio/area_epico.mp3",
    tronoDeus:  "audio/area_final.mp3"
};

function getClassePlayer() {
    var classe = player.classe || player.class || "Guerreiro";

    var mapa = {
        "Guerreiro": "guerreiro",
        "Guerreira": "guerreiro",
        "Paladino": "paladino",
        "Paladina": "paladino",
        "Arqueiro": "arqueiro",
        "Arqueira": "arqueiro",
        "Mago": "mago",
        "Maga": "mago",
        "Clérigo": "clerigo",
        "Clériga": "clerigo",
        "Ladino": "ladino",
        "Ladina": "ladino",
        "Druida": "druida",
        "Monge": "monge"
    };

    return mapa[classe] || classe.toLowerCase();
}

function calcularDescontoLoja() {
    let carisma = 0;

    if (player.carisma != null) {
        carisma = player.carisma;
    } else if (player.atributos && player.atributos.carisma != null) {
        carisma = player.atributos.carisma;
    }

    let desconto = carisma * 0.01;
    if (desconto > 0.25) desconto = 0.25;
    if (desconto < 0) desconto = 0;

    return desconto;
}

function calcularPrecoVenda(item) {
    if (!item || !item.preco) return 0;

    if (item.tipo === "consumivel") {
        return Math.floor(item.preco * 0.5);
    }

    return Math.floor(item.preco * 0.4);

}
function getEquipamentosArmaria() {
    let classe = getClassePlayer();
    let listaClasse = equipamentosPorClasse[classe] || [];
    return [...listaClasse, ...acessoriosComuns];
}
if (!player.equipamentos) {
    player.equipamentos = {
        arma: null,
        armadura: null,
        elmo: null,
        botas: null,
        anel: null,
        amuleto: null
    };
}
function inicializarMusica() {
    if (musicaElement) return;

    musicaElement = document.createElement("audio");
    musicaElement.loop = true;
    musicaElement.volume = musicaVolume;
    document.body.appendChild(musicaElement);
}

function fadeInMusica() {
    if (!musicaElement) return;

    let vol = 0;
    const interval = setInterval(function() {
        vol += 0.02;
        if (vol >= musicaVolume) {
            vol = musicaVolume;
            clearInterval(interval);
        }
        musicaElement.volume = vol;
    }, 50);
}

function fadeOutMusica(callback) {
    if (!musicaElement || musicaElement.paused) {
        if (callback) callback();
        return;
    }

    let vol = musicaElement.volume;
    const interval = setInterval(function() {
        vol -= 0.02;
        if (vol <= 0) {
            vol = 0;
            musicaElement.volume = 0;
            clearInterval(interval);
            if (callback) callback();
        } else {
            musicaElement.volume = vol;
        }
    }, 50);
}

function tocarMusica(nomeMusica) {
    if (!musicaElement) inicializarMusica();
    if (musicaMudo) return;

    const src = trilhasSonoras[nomeMusica];
    if (!src) return;

    if (musicaAtual === nomeMusica && !musicaElement.paused) return;

    fadeOutMusica(function() {
        musicaAtual = nomeMusica;
        musicaElement.src = src;
        musicaElement.volume = 0;

        musicaElement.play().then(function() {
            fadeInMusica();
        }).catch(function() {
            console.log("Música bloqueada pelo navegador (precisa de interação do usuário).");
        });
    });
}

function pararMusica() {
    if (!musicaElement) return;

    fadeOutMusica(function() {
        musicaElement.pause();
        musicaAtual = null;
    });
}

function toggleMudo() {
    musicaMudo = !musicaMudo;
    const btn = document.getElementById("btnMudo");

    if (musicaMudo) {
        if (btn) btn.textContent = "🔇";
        if (musicaElement) musicaElement.volume = 0;
    } else {
        if (btn) btn.textContent = "🔊";
        if (musicaElement) musicaElement.volume = musicaVolume;
    }
}

function ajustarVolume(valor) {
    musicaVolume = valor;
    if (musicaElement && !musicaMudo) {
        musicaElement.volume = valor;
    }
}

function atualizarMusicaPorContexto(contexto) {
    if (trilhasSonoras[contexto]) {
        tocarMusica(contexto);
        return;
    }

    switch (contexto) {
        case "menu":
        case "cidade":
        case "combate":
        case "boss":
        case "masmorra":
        case "vitoria":
        case "derrota":
            tocarMusica(contexto);
            break;
    }
}

// ============================================
// SEÇÃO 5: VOLUME GLOBAL
// ============================================

(function() {
    let volumeJogo = 1.0;

    function aplicarVolume(vol) {
        volumeJogo = vol;

        const audios = document.querySelectorAll("audio");
        for (let i = 0; i < audios.length; i++) {
            audios[i].volume = vol;
        }

        if (typeof bgm !== "undefined" && bgm) bgm.volume = vol;
        if (typeof sfx !== "undefined" && sfx) sfx.volume = vol;
        if (typeof musicaElement !== "undefined" && musicaElement) musicaElement.volume = vol;

        const slider = document.getElementById("volumeSlider");
        if (slider) slider.value = vol;
    }

    const AudioOriginal = window.Audio;
    window.Audio = function(src) {
        const audio = new AudioOriginal(src);
        audio.volume = volumeJogo;
        return audio;
    };

    setTimeout(function() {
        const slider = document.getElementById("volumeSlider");
        if (slider) {
            slider.addEventListener("input", function() {
                aplicarVolume(parseFloat(this.value));
            });
        }
    }, 1000);

    window.aplicarVolume = aplicarVolume;
    window.getVolumeJogo = function() {
        return volumeJogo;
    };
})();

function sincronizarNarrativaBasica() {
    if (typeof garantirEstadoNarrativoPlayer === "function") {
        garantirEstadoNarrativoPlayer();
    }

    if (typeof expandirEstadoNarrativoHistoria === "function") {
        expandirEstadoNarrativoHistoria();
    }

    if (typeof normalizarCamposNarrativosSeNecessario === "function") {
        normalizarCamposNarrativosSeNecessario();
    }
}
function pegarMissao() {
    if (typeof sistemaMissoes === "undefined") {
        mostrarNotificacao("⚠️ Sistema de missões não encontrado.");
        return;
    }

    if (sistemaMissoes.missaoAtiva) {
        mostrarNotificacao("📜 Você já tem uma missão ativa!");
        return;
    }

    if (typeof gerarMissaoAreaAtual === "function") {
        gerarMissaoAreaAtual();
        atualizarUIMissao();
        mostrarNotificacao("📜 Missão aceita!");
        log("📜 Nova missão aceita.");
        return;
    }

    mostrarNotificacao("⚠️ Função de gerar missão ainda não configurada.");
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

             
function esconderTodosPaineisBase() {
    var ids = [
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

    ids.forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.classList.remove("active-panel");
    });
}

function mostrarPainelFullscreen(painelId) {
    esconderTodosPaineisBase();

    var painel = document.getElementById(painelId);
    if (painel) {
        painel.classList.add("active-panel");
    }

    var actionPanel = document.getElementById("actionPanel");
    if (actionPanel) {
        actionPanel.classList.add("fullscreen-mode");
    }

    document.body.classList.add("has-fullscreen-panel");
}

function mostrarPainelfullscreen(painelId) {
    mostrarPainelFullscreen(painelId);
}

// ============================================
// SEÇÃO 6: INICIALIZAÇÃO
// ============================================

window.onload = function() {
    console.log("🎮 Axion: O Retorno Profano");

    if (typeof verificarSaveExistente === "function") {
        verificarSaveExistente();
    }

    if (typeof sincronizarNarrativaBasica === "function") {
        sincronizarNarrativaBasica();
    }

    document.addEventListener("click", function() {
        if (typeof inicializarAudio === "function") {
            inicializarAudio();
        }
        inicializarMusica();
    }, { once: true });

    console.log("✅ Core carregado!");
};