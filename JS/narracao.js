// ============================================
// SEÇÃO 1: CONFIGURAÇÃO DE NARRAÇÃO E VOZES
// ============================================

var narracaoConfig = {
    pastaVozes: "images/sons/",
    habilitarVoz: true,
    habilitarTextoPensamento: true,
    habilitarTextoNarrador: true,
    habilitarTextoFala: true
};

function getCaminhoVoz(nomeArquivo) {
    return "images/Sons/narracao/" + nomeArquivo;
}
// ============================================
// SEÇÃO 2: SISTEMA DE ROTAS NARRATIVAS
// ============================================

function garantirNarrativa() {
    if (typeof garantirEstadoNarrativoPlayer === "function") {
        garantirEstadoNarrativoPlayer();
    }
}

function adicionarPontoRota(tipo, valor) {
    garantirNarrativa();
    valor = valor || 1;

    if (!player.narrativa || !player.narrativa.rota) return;
    if (!player.narrativa.rota.hasOwnProperty(tipo)) return;

    player.narrativa.rota[tipo] += valor;
}

function getRotaDominante() {
    garantirNarrativa();

    var r = player.narrativa.rota;
    if (r.heroi >= r.neutro && r.heroi >= r.sombrio) return "heroi";
    if (r.sombrio >= r.heroi && r.sombrio >= r.neutro) return "sombrio";
    return "neutro";
}
// ============================================
// SEÇÃO 3: FLAGS NARRATIVAS
// ============================================

function setFlagNarrativa(flag, valor) {
    garantirNarrativa();
    if (!player.narrativa.flagsNarrativas.hasOwnProperty(flag)) return;
    player.narrativa.flagsNarrativas[flag] = (valor !== false);
}

function getFlagNarrativa(flag) {
    garantirNarrativa();
    return !!player.narrativa.flagsNarrativas[flag];
}
// ============================================
// SEÇÃO 4: RELAÇÃO COM NPCs DE CAMPANHA
// ============================================

function alterarRelacaoNpcCampanha(npcId, tipo, valor) {
    garantirNarrativa();
    valor = valor || 1;

    if (!player.narrativa.npcCampanha[npcId]) return;
    if (!player.narrativa.npcCampanha[npcId].hasOwnProperty(tipo)) return;

    player.narrativa.npcCampanha[npcId][tipo] += valor;
}

function marcarEventoNpcCampanhaConcluido(npcId) {
    garantirNarrativa();
    if (!player.narrativa.npcCampanha[npcId]) return;
    player.narrativa.npcCampanha[npcId].eventoConcluido = true;
}
// ============================================
// SEÇÃO 5: NPCs PRINCIPAIS DA CAMPANHA
// ============================================

var npcsCampanha = {
    elian: {
        id: "elian",
        nome: "Elian",
        titulo: "O Cronista Queimado",
        emoji: "📚",
        img: "",
        areas: ["ruinas", "deserto", "castelo"],
        descricao: "Historiador sobrevivente dos registros banidos sobre os Eternos."
    },

    soraya: {
        id: "soraya",
        nome: "Soraya",
        titulo: "A Filha do Pântano",
        emoji: "🕯️",
        img: "",
        areas: ["pantano", "cemiterio", "abismo"],
        descricao: "Médium capaz de ouvir e interpretar espíritos presos pela rede."
    },

    draeven: {
        id: "draeven",
        nome: "Draeven",
        titulo: "O Orc Sem Clã",
        emoji: "🪓",
        img: "",
        areas: ["colinas", "caverna", "vulcao"],
        descricao: "Sobrevivente da corrupção nas colinas, prova viva do colapso de seu povo."
    },

    iris: {
        id: "iris",
        nome: "Iris Vael",
        titulo: "A Maga Exilada",
        emoji: "🔷",
        img: "",
        areas: ["ruinas", "planoAstral", "tronoDeus"],
        descricao: "Estudiosa dos selos e do limiar entre realidades."
    },

    tallen: {
        id: "tallen",
        nome: "Tallen",
        titulo: "O Cavaleiro que Sobrou",
        emoji: "🛡️",
        img: "",
        areas: ["castelo", "cidadeFant", "tronoDeus"],
        descricao: "Descendente da guarda que tombou defendendo o antigo rei."
    },

    maela: {
        id: "maela",
        nome: "Maela",
        titulo: "A Portadora da Cicatriz",
        emoji: "🩸",
        img: "",
        areas: ["geleira", "abismo", "infernus"],
        descricao: "Sobrevivente marcada diretamente pela energia dos portais."
    }
};
// ============================================
// SEÇÃO 6: EVENTOS DE NPCs POR ROTA
// ============================================

var eventosNpcCampanha = {
    elian: {
        heroi: {
            titulo: "O Arquivo Perdido",
            descricao: "Elian pede ajuda para recuperar pergaminhos antigos sem destruir o que ainda resta da memória dos guardiões.",
            recompensaTexto: "📖 Conhecimento preservado | +Respeito de Elian"
        },
        neutro: {
            titulo: "O Texto e o Preço",
            descricao: "Elian oferece acesso a manuscritos raros, mas você precisa decidir quais documentos são úteis o bastante para salvar.",
            recompensaTexto: "📜 Informação estratégica | +Utilidade narrativa"
        },
        sombrio: {
            titulo: "As Páginas Banidas",
            descricao: "Você força Elian a revelar os tomos proibidos que ele jurou esconder do mundo.",
            recompensaTexto: "🖤 Conhecimento sombrio | +Poder arcano"
        }
    },

    soraya: {
        heroi: {
            titulo: "Vigília das Almas",
            descricao: "Soraya tenta libertar espíritos presos. Você a protege enquanto as correntes espirituais se desfazem.",
            recompensaTexto: "✨ Bênção espiritual | +Confiança de Soraya"
        },
        neutro: {
            titulo: "Os Mortos Informam",
            descricao: "Soraya canaliza vozes do além para revelar segredos úteis, desde que você saiba o que vale ouvir.",
            recompensaTexto: "👁️ Pistas e fraquezas | +Informação"
        },
        sombrio: {
            titulo: "Corrente de Ecos",
            descricao: "Você força as almas a responderem, transformando luto em ferramenta.",
            recompensaTexto: "☠️ Essência espectral | +Poder sombrio"
        }
    },

    draeven: {
        heroi: {
            titulo: "Os Restos do Clã",
            descricao: "Draeven pede ajuda para levar sobreviventes do seu povo até um refúgio seguro.",
            recompensaTexto: "🛡️ Aliança orc | +Respeito e apoio"
        },
        neutro: {
            titulo: "A Trégua das Cinzas",
            descricao: "Você e Draeven firmam uma cooperação prática contra grupos corrompidos.",
            recompensaTexto: "⚔️ Apoio tático | +Ouro/recursos"
        },
        sombrio: {
            titulo: "A Lei do Forte",
            descricao: "Você convence ou subjuga Draeven a reunir os seus pelo medo e pela força.",
            recompensaTexto: "🩸 Força militar brutal | +Temor"
        }
    },

    iris: {
        heroi: {
            titulo: "Selar, Não Tomar",
            descricao: "Iris propõe um método seguro de romper um elo sem absorver o poder residual.",
            recompensaTexto: "🔒 Proteção contra corrupção"
        },
        neutro: {
            titulo: "Equação do Vazio",
            descricao: "Iris trabalha com você para calcular a forma mais eficiente de interferir na rede.",
            recompensaTexto: "📐 Vantagem estratégica"
        },
        sombrio: {
            titulo: "Roubar a Fórmula",
            descricao: "Você toma para si os estudos mais proibidos de Iris sobre absorção de energia portal.",
            recompensaTexto: "💠 Poder arcano sombrio"
        }
    },

    tallen: {
        heroi: {
            titulo: "A Guarda Renascida",
            descricao: "Você ajuda Tallen a restaurar a honra da antiga guarda e reerguer seu juramento.",
            recompensaTexto: "👑 Apoio da velha guarda"
        },
        neutro: {
            titulo: "A Espada e o Nome",
            descricao: "Você e Tallen transformam o velho legado em uma ordem mais prática e sobrevivente.",
            recompensaTexto: "⚔️ Relíquias e estratégia"
        },
        sombrio: {
            titulo: "O Último Juramento",
            descricao: "Você leva Tallen a sacrificar a pureza do legado em nome da vitória total.",
            recompensaTexto: "🖤 Relíquia corrompida"
        }
    },

    maela: {
        heroi: {
            titulo: "Segurar a Ruptura",
            descricao: "Você ajuda Maela a sobreviver à própria cicatriz sem explorá-la.",
            recompensaTexto: "💚 Resistência à corrupção"
        },
        neutro: {
            titulo: "Usar a Marca",
            descricao: "Vocês transformam a cicatriz de Maela em instrumento controlado de rastreamento.",
            recompensaTexto: "📍 Sensor de portais"
        },
        sombrio: {
            titulo: "Abrir a Ferida",
            descricao: "Você força Maela a usar sua marca além do limite para extrair vantagem imediata.",
            recompensaTexto: "🩸 Acesso proibido e poder"
        }
    }
};
// ============================================
// SEÇÃO 7: RESOLVER EVENTO POR ROTA
// ============================================

function getEventoNpcPorRota(npcId) {
    var rota = getRotaDominante();
    if (!eventosNpcCampanha[npcId]) return null;
    return eventosNpcCampanha[npcId][rota] || null;
}
// ============================================
// SEÇÃO 8: FALAS DE AXYOM POR ROTA
// ============================================

var falasAxiomPorRota = {
    heroi: {
        intro: "Você insiste em carregar um mundo que já deveria ter cedido.",
        meio: "Sua compaixão é bela, mortal. E inútil diante do inevitável.",
        final: "Se me destruir, ainda assim provará que foi moldado pelo sofrimento que eu causei."
    },
    neutro: {
        intro: "Você compreendeu a lógica da ruína. Apenas escolheu não se sentar nela.",
        meio: "Entre todos, você foi o que mais se aproximou de entender sem ajoelhar.",
        final: "Você não é puro. Nunca foi. Talvez por isso tenha chegado tão longe."
    },
    sombrio: {
        intro: "Finalmente. Um mortal que entendeu que destruir um deus é menos interessante do que substituí-lo.",
        meio: "Você já cruzou linhas demais para fingir que veio apenas salvar.",
        final: "Mate-me, então. E descubra se o trono aceita herdeiros... ou devora usurpadores."
    }
};

function getFalasAxiomRota() {
    return falasAxiomPorRota[getRotaDominante()] || falasAxiomPorRota.neutro;
}
// ============================================
// SEÇÃO 9: FINAIS NARRATIVOS
// ============================================

var finaisNarrativos = {
    heroi: {
        id: "final_heroi",
        titulo: "O Mundo Respira",
        resumo: "Você derrota Axiom e salva o mundo, mas não sai ileso. A vitória é luminosa, porém marcada por perda, sacrifício ou transformação irreversível."
    },
    neutro: {
        id: "final_neutro",
        titulo: "A Cicatriz Permanece",
        resumo: "Axiom cai, mas a rede deixa marcas permanentes no mundo. Você vence, porém sabe que a vitória nunca foi limpa nem completa."
    },
    sombrio: {
        id: "final_sombrio",
        titulo: "O Novo Trono",
        resumo: "Você derrota Axiom, mas assume parte de seu poder, lugar ou legado. O mundo é salvo de uma ruína... e entregue a outra possibilidade."
    }
};

function getFinalNarrativo() {
    var rota = getRotaDominante();
    return finaisNarrativos[rota] || finaisNarrativos.neutro;
}
// ============================================
// SEÇÃO 10: ESTADO GLOBAL DA NARRAÇÃO
// ============================================

var narracaoState = {
    capituloAtualId: null,
    cenaAtualIndex: 0,
    capituloAtual: null,
    emNarracao: false,
    bloqueado: false,
    filaAudio: [],
    audioAtual: null
};
// ============================================
// SEÇÃO 11: ARQUÉTIPOS NARRATIVOS
// ============================================

function getArquetipoNarrativo() {
    if (!player || !player.class) return "guerreiro";

    var mapa = {
        "Guerreiro": "guerreiro",
        "Guerreira": "guerreiro",
        "Paladino": "paladino",
        "Paladina": "paladino",
        "Arqueiro": "arqueiro",
        "Arqueira": "arqueiro",
        "Mago": "mago",
        "Maga": "mago",
        "Clerigo": "clerigo",
        "Cleriga": "clerigo",
        "Ladino": "ladino",
        "Ladina": "ladino",
        "Druida": "druida",
        "Monge": "monge"
    };

    return mapa[player.class] || "guerreiro";
}
// ============================================
// SEÇÃO 12: IDENTIFICADOR DO PERSONAGEM ATUAL
// ============================================

function getPersonagemNarrativoId() {
    if (!player || !player.nome || !player.class) return null;

    var mapa = {
        "Valerius": "guerreiro",
        "Lyra": "guerreira",
        "Ignis": "draconato",
        "Aethel": "draconata",
        "Kael": "arqueiro",
        "Selene": "arqueira",
        "Thalric": "mago",
        "Isolde": "maga",
        "Bram": "leonide.m",
        "Aria": "leonide.f",
        "Finn": "halfling.m",
        "Mila": "halfling.f",
        "Samir": "druida.m",
        "Flora": "druida.f",
        "Korg": "monge.m",
        "Zora": "monge.f"
    };

    return mapa[player.nome] || null;
}
// ============================================
// SEÇÃO 13: MODELO DE CENA NARRATIVA
// ============================================

function criarCenaNarrativaBase(dados) {
    return {
        id: dados.id || "",
        tipo: dados.tipo || "secundaria", // secundaria | chave
        titulo: dados.titulo || "",
        icone: dados.icone || "📖",
        narrador: dados.narrador || "Narrador",
        texto: dados.texto || "",
        fala: dados.fala || null, // { nome, texto, retrato, voz }
        pensamentoBase: dados.pensamentoBase || "",
        pensamentosArquetipo: dados.pensamentosArquetipo || {},
        pensamentosPersonagem: dados.pensamentosPersonagem || {},
        escolha: dados.escolha || null, // estrutura de escolha
        vozNarrador: dados.vozNarrador || null,
        vozFala: dados.vozFala || null,
        efeitos: dados.efeitos || null
    };
}
// ============================================
// SEÇÃO 14: RESOLVER PENSAMENTO DA CENA
// ============================================

function getPensamentoCena(cena) {
    if (!cena) return "";

    var personagemId = null;
    var arquetipo = null;

    try {
        if (typeof getPersonagemNarrativoId === "function") {
            personagemId = getPersonagemNarrativoId();
        }
    } catch (e) {
        console.warn("Erro ao obter personagem narrativo:", e);
    }

    try {
        if (typeof getArquetipoNarrativo === "function") {
            arquetipo = getArquetipoNarrativo();
        }
    } catch (e) {
        console.warn("Erro ao obter arquétipo narrativo:", e);
    }

    if (
        cena.pensamentosPersonagem &&
        personagemId &&
        cena.pensamentosPersonagem[personagemId]
    ) {
        return cena.pensamentosPersonagem[personagemId];
    }

    if (
        cena.pensamentosArquetipo &&
        arquetipo &&
        cena.pensamentosArquetipo[arquetipo]
    ) {
        return cena.pensamentosArquetipo[arquetipo];
    }

    if (cena.pensamentoBase) {
        return cena.pensamentoBase;
    }

    if (cena.pensamento) {
        return cena.pensamento;
    }

    return "";
}
// ============================================
// SEÇÃO 15: ÁUDIO DE NARRAÇÃO E VOZES
// ============================================

function pararAudioNarracao() {
    if (narracaoState.audioAtual) {
        narracaoState.audioAtual.pause();
        narracaoState.audioAtual.currentTime = 0;
        narracaoState.audioAtual = null;
    }
}

function tocarAudioNarracao(nomeArquivo) {
    if (!narracaoConfig.habilitarVoz) return;
    if (!nomeArquivo) return;

    try {
        pararAudioNarracao();

        var caminho = getCaminhoVoz(nomeArquivo);
        console.log("Tentando tocar áudio:", caminho);

        var audio = new Audio(caminho);
        narracaoState.audioAtual = audio;

        audio.play().catch(function(err) {
            console.warn("Falha ao tocar áudio de narração:", err);
        });
    } catch (e) {
        console.warn("Erro ao inicializar áudio de narração:", e);
    }
}
// ============================================
// SEÇÃO 16: REGISTRO DE PROGRESSO NARRATIVO
// ============================================

function registrarCapituloVisto(capituloId) {
    if (typeof garantirEstadoNarrativoPlayer === "function") {
        garantirEstadoNarrativoPlayer();
    }

    if (!player.narrativa.capitulosVistos) {
        player.narrativa.capitulosVistos = [];
    }

    if (!player.narrativa.capitulosVistos.includes(capituloId)) {
        player.narrativa.capitulosVistos.push(capituloId);
    }
}

function registrarCenaVista(cenaId) {
    if (typeof garantirEstadoNarrativoPlayer === "function") {
        garantirEstadoNarrativoPlayer();
    }

    if (!player.narrativa.cenasVistas) {
        player.narrativa.cenasVistas = [];
    }

    if (!player.narrativa.cenasVistas.includes(cenaId)) {
        player.narrativa.cenasVistas.push(cenaId);
    }
}
// ============================================
// SEÇÃO 17: INICIAR CAPÍTULO NARRATIVO
// ============================================

function iniciarCapituloNarrativo(capitulo) {
    if (!capitulo || !capitulo.cenas || capitulo.cenas.length === 0) return;

    narracaoState.capituloAtualId = capitulo.id;
    narracaoState.cenaAtualIndex = 0;
    narracaoState.capituloAtual = capitulo;
    narracaoState.emNarracao = true;
    narracaoState.bloqueado = false;
    narracaoState.modoRevisao = false;

    if (typeof registrarCapituloVistoHistoria === "function") {
        registrarCapituloVistoHistoria(capitulo.id);
    }

    if (typeof mostrarPainel === "function") {
        mostrarPainel("historiaPanel");
    }

    renderizarCenaNarrativaAtual();
}
// ============================================
// SEÇÃO 18: OBTER CENA ATUAL
// ============================================

function getCenaNarrativaAtual() {
    if (!narracaoState.capituloAtual) return null;
    return narracaoState.capituloAtual.cenas[narracaoState.cenaAtualIndex] || null;
}
// ============================================
// SEÇÃO 19: RENDERIZAR CENA NARRATIVA
// ============================================

function renderizarCenaNarrativaAtual() {
    var cena = getCenaNarrativaAtual();
    if (!cena) {
        finalizarCapituloNarrativo();
        return;
    }

    registrarCenaVista(cena.id);

    var el = document.getElementById("historiaContent");
    if (!el) return;

    var pensamento = getPensamentoCena(cena);
    var statusAudio = getStatusAudioNarracaoTexto(cena);
    var textoRota = getTextoRotaAtualUI();

    var html = '<div class="historia-card">';
    html += '<div class="historia-capitulo-titulo">' + (narracaoState.capituloAtual.titulo || "Capítulo") + '</div>';

    if (cena.titulo) {
        html += '<div class="historia-cena-titulo">' + cena.titulo + '</div>';
    }

    html += '<div class="historia-status-rota">' + textoRota + '</div>';
    html += '<div class="historia-icone">' + (cena.icone || "📖") + '</div>';
    html += '<div class="historia-audio-indicador">' + statusAudio + '</div>';

    html += '<div class="historia-narrador-label">' + (cena.narrador || "Narrador") + '</div>';
    html += '<div class="historia-texto">' + (cena.texto || "") + '</div>';

    if (cena.fala) {
        html += '<div class="historia-fala-box">';
        html += '<div class="historia-fala-nome">' + (cena.fala.nome || "Personagem") + '</div>';
        html += '<div class="historia-fala-texto">' + (cena.fala.texto || "") + '</div>';
        html += '</div>';
    }

    if (pensamento && narracaoConfig.habilitarTextoPensamento) {
        html += '<div class="historia-pensamento-box">';
        html += '<div class="historia-pensamento-nome">Pensamento de ' + (player.nome || "Protagonista") + '</div>';
        html += '<div class="historia-pensamento-texto">' + pensamento + '</div>';
        html += '</div>';
    }

    if (cena.escolha) {
        html += '<div class="historia-escolha-box">';
        html += '<div class="historia-escolha-pergunta">' + cena.escolha.pergunta + '</div>';

        cena.escolha.opcoes.forEach(function(opcao, i) {
            html += '<button class="historia-btn-escolha" onclick="escolherOpcaoNarrativa(' + i + ')">' + opcao.texto + '</button>';
        });

        html += '</div>';

        html += '<div class="historia-controles">';
        html += '<button class="historia-btn" onclick="repetirVozCenaAtual()">🔁 Repetir Voz</button>';
        html += '</div>';
    } else {
        html += '<div class="historia-controles">';
        html += '<button class="historia-btn" onclick="proximaCenaNarrativa()">Continuar ▶️</button>';
        html += '<button class="historia-btn" onclick="repetirVozCenaAtual()">🔁 Repetir Voz</button>';
        html += '</div>';
    }

    html += '</div>';

    el.innerHTML = html;

    var capituloId = narracaoState.capituloAtual.id;
    var cenaId = narracaoState.cenaAtualIndex + 1;
    var tipoAudio = "narrador";

    var nomeArquivo = criarNomeArquivoVoz(capituloId, cenaId, tipoAudio);
    console.log("Áudio da cena:", nomeArquivo);

    tocarAudioNarracao(nomeArquivo);
}
// ============================================
// SEÇÃO 20: AVANÇAR CENA NARRATIVA
// ============================================

function proximaCenaNarrativa() {
    if (!narracaoState.emNarracao) return;
    if (narracaoState.bloqueado) return;

    narracaoState.cenaAtualIndex++;

    if (narracaoState.cenaAtualIndex >= narracaoState.capituloAtual.cenas.length) {
        finalizarCapituloNarrativo();
        return;
    }

    renderizarCenaNarrativaAtual();
}
// ============================================
// SEÇÃO 21: PROCESSAR ESCOLHA NARRATIVA
// ============================================

function escolherOpcaoNarrativa(indiceOpcao) {
    var cena = getCenaNarrativaAtual();
    if (!cena || !cena.escolha || !cena.escolha.opcoes[indiceOpcao]) return;

    var opcao = cena.escolha.opcoes[indiceOpcao];

    // rota
    if (opcao.rota) {
        adicionarPontoRota(opcao.rota, opcao.pesoRota || 1);
    }

    // flags
    if (opcao.flag) {
        setFlagNarrativa(opcao.flag, true);
    }

    // callback extra
    if (typeof opcao.onEscolha === "function") {
        opcao.onEscolha(opcao, cena);
    }

    // resultado imediato
    if (opcao.resultadoTexto) {
        mostrarResultadoEscolhaNarrativa(opcao);
        return;
    }

    proximaCenaNarrativa();
}
// ============================================
// SEÇÃO 22: RESULTADO DE ESCOLHA NARRATIVA
// ============================================

function mostrarResultadoEscolhaNarrativa(opcao) {
    var el = document.getElementById("historiaContent");
    if (!el) return;

    var html = '<div style="text-align:center;padding:15px;">';
    html += '<p style="font-size:2em;margin-bottom:10px;">' + (opcao.iconeResultado || "✨") + '</p>';
    html += '<div style="color:#e2e8f0;line-height:1.8;white-space:pre-line;margin-bottom:15px;">' + opcao.resultadoTexto + '</div>';

    if (opcao.recompensaTexto) {
        html += '<div style="background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.2);border-radius:8px;padding:10px;margin-bottom:15px;color:#86efac;">' + opcao.recompensaTexto + '</div>';
    }

    html += '<button onclick="proximaCenaNarrativa()" style="padding:10px 25px;">Continuar ▶️</button>';
    html += '</div>';

    el.innerHTML = html;

    if (opcao.vozResultado) {
        tocarAudioNarracao(opcao.vozResultado);
    }
}
// ============================================
// SEÇÃO 23: FINALIZAR CAPÍTULO NARRATIVO
// ============================================

function finalizarCapituloNarrativo() {
    narracaoState.emNarracao = false;
    narracaoState.bloqueado = false;
    narracaoState.modoRevisao = false;

    if (typeof mostrarPainel === "function") {
        mostrarPainel("areaOptionsPanel");
    }

    if (typeof mostrarNotificacao === "function") {
        mostrarNotificacao("📖 Capítulo encerrado.");
    }
}
// ============================================
// SEÇÃO 24: CENAS DINÂMICAS DE AXYOM
// ============================================

function getTextoAxiomPorMomento(momento) {
    var falas = getFalasAxiomRota();
    if (!falas) return "";

    switch (momento) {
        case "intro": return falas.intro || "";
        case "meio": return falas.meio || "";
        case "final": return falas.final || "";
        default: return "";
    }
}
// ============================================
// SEÇÃO 25: EXIBIR FINAL NARRATIVO
// ============================================

function mostrarFinalNarrativo() {
    var finalData = getFinalNarrativo();
    if (!finalData) return;

    if (typeof mostrarPainel === "function") {
        mostrarPainel("historiaPanel");
    }

    var el = document.getElementById("historiaContent");
    if (!el) return;

    var html = '<div style="text-align:center;padding:20px;">';
    html += '<p style="font-size:2.5em;margin-bottom:10px;">🌟</p>';
    html += '<h2 style="color:#ffd700;margin-bottom:10px;">' + finalData.titulo + '</h2>';
    html += '<div style="color:#e2e8f0;line-height:1.8;max-width:700px;margin:0 auto;">' + finalData.resumo + '</div>';
    html += '<button onclick="mostrarPainel(\'navigationContainer\')" style="margin-top:20px;padding:10px 24px;">Voltar ao Jogo</button>';
    html += '</div>';

    el.innerHTML = html;

    garantirNarrativa();
    player.narrativa.finalAlcancado = finalData.id;
}
// ============================================
// SEÇÃO 26: BASE DE CAPÍTULOS NARRATIVOS
// ============================================

var capitulosNarrativos = {};
// ============================================
// SEÇÃO 26: BASE DE CAPÍTULOS NARRATIVOS
// ============================================

var capitulosNarrativos = {};
// ============================================
// SEÇÃO 28: ABRIR CAPÍTULO NARRATIVO POR ID
// ============================================

function abrirCapituloNarrativoPorId(capituloId) {
    var capitulo = capitulosNarrativos[capituloId];
    if (!capitulo) {
        console.warn("Capítulo narrativo não encontrado:", capituloId);
        return;
    }

    iniciarCapituloNarrativo(capitulo);
}
// ============================================
// SEÇÃO 29: PONTE COM SISTEMA ANTIGO DE HISTÓRIA
// ============================================



function verificarCapituloDisponivel() {
    if (typeof areas === "undefined" || !gameState || !gameState.areaAtual) return null;
    if (typeof capitulosNarrativos === "undefined") return null;

    for (var i = 0; i < capitulosNarrativos.length; i++) {
        if (capitulosNarrativos[i].area === gameState.areaAtual) {
            return capitulosNarrativos[i];
        }
    }

    return null;
}
// ============================================
// SEÇÃO 30: HELPERS DE VOZ POR CENA
// ============================================

function criarNomeArquivoVoz(capituloId, cenaId, tipo, variante) {
    var nome = "cap" + capituloId + "_cena" + cenaId;

    if (variante) {
        nome += "_" + String(variante).toLowerCase().trim();
    }

    nome += "_" + tipo + ".mp3";
    return nome;
    var personagemId = null;

if (typeof getPersonagemNarrativoId === "function") {
    personagemId = getPersonagemNarrativoId();
}
}
// ============================================
// SEÇÃO 31: CRIAR OPÇÃO DE ESCOLHA NARRATIVA
// ============================================

function criarOpcaoNarrativa(dados) {
    return {
        texto: dados.texto || "Escolha",
        rota: dados.rota || null,
        pesoRota: dados.pesoRota || 1,
        flag: dados.flag || null,
        resultadoTexto: dados.resultadoTexto || "",
        recompensaTexto: dados.recompensaTexto || "",
        iconeResultado: dados.iconeResultado || "✨",
        vozResultado: dados.vozResultado || null,
        onEscolha: dados.onEscolha || null
    };
}
// ============================================
// REGISTRO DE CAPÍTULOS NARRATIVOS
// ============================================

function registrarCapituloNarrativo(chave, dados) {
    if (typeof capitulosNarrativos === "undefined" || !capitulosNarrativos) {
        capitulosNarrativos = {};
    }

    capitulosNarrativos[chave] = dados;
}

registrarCapituloNarrativo("exemplo_capitulo", {
    id: 999,
    titulo: "Capítulo Exemplo",
    area: "floresta",
    cenas: [
        criarCenaNarrativaBase({
            id: "cena_ex_1",
            tipo: "secundaria",
            titulo: "Exemplo",
            icone: "🌲",
            narrador: "Narrador",
            texto: "A floresta respirava em silêncio, como se esperasse sua decisão.",
            pensamentoBase: "Algo estava errado ali.",
            pensamentosArquetipo: {
                guerreiro: "Lugar ruim para hesitar.",
                mago: "Há magia antiga no ar."
            },
            vozNarrador: criarNomeArquivoVoz(999, "cena_ex_1", "narrador")
        }),

        criarCenaNarrativaBase({
            id: "cena_ex_2",
            tipo: "chave",
            titulo: "Escolha",
            icone: "🔮",
            narrador: "Narrador",
            texto: "Diante de você, o altar pulsava com energia escura.",
            pensamentosPersonagem: {
                "guerreiro": "Já vi ruínas anunciarem tragédia antes.",
                "maga": "Isso me reconhece. E eu detesto isso."
            },
            escolha: {
                pergunta: "O que fazer com o altar?",
                opcoes: [
                    criarOpcaoNarrativa({
                        texto: "Purificar",
                        rota: "heroi",
                        pesoRota: 2,
                        flag: "altarPurificado",
                        resultadoTexto: "Você ergue a vontade contra a corrupção e a luz vence o primeiro embate.",
                        recompensaTexto: "+Alinhamento heroico",
                        iconeResultado: "🙏",
                        vozResultado: criarNomeArquivoVoz(999, "cena_ex_2", "resultado_heroi")
                    }),
                    criarOpcaoNarrativa({
                        texto: "Estudar",
                        rota: "neutro",
                        pesoRota: 1,
                        flag: "altarEstudado",
                        resultadoTexto: "Você observa padrões e aprende sem se entregar nem recuar.",
                        recompensaTexto: "+Alinhamento neutro",
                        iconeResultado: "📖",
                        vozResultado: criarNomeArquivoVoz(999, "cena_ex_2", "resultado_neutro")
                    }),
                    criarOpcaoNarrativa({
                        texto: "Absorver",
                        rota: "sombrio",
                        pesoRota: 2,
                        flag: "altarAbsorvido",
                        resultadoTexto: "O poder entra em você como promessa e ameaça ao mesmo tempo.",
                        recompensaTexto: "+Alinhamento sombrio",
                        iconeResultado: "💀",
                        vozResultado: criarNomeArquivoVoz(999, "cena_ex_2", "resultado_sombrio")
                    })
                ]
            }
        })
    ]
});
// ============================================
// SEÇÃO 33: CAPÍTULO 1 — O CHAMADO DA FLORESTA
// ============================================

registrarCapituloNarrativo("capitulo_1_floresta", {
    id: 1,
    titulo: "O Chamado da Floresta",
    area: "floresta",
    cenas: [

        criarCenaNarrativaBase({
            id: "cap1_cena1",
            tipo: "secundaria",
            titulo: "O homem na estrada",
            icone: "👴",
            narrador: "Narrador",
            texto: "O crepúsculo caía lentamente sobre a estrada quando um velho surgiu entre a poeira, tropeçando mais do que correndo. Suas roupas estavam rasgadas por galhos, e o pânico em seus olhos era o tipo que não nasce de boatos, mas de visão direta do horror.",
            fala: {
                nome: "Ancião",
                texto: "Aventureiro! Graças aos deuses... você precisa nos ajudar! Os lobos da Floresta Sombria estão atacando nossa vila. Mas não é fome... não é natural. Há algo lá dentro. Algo antigo."
            },
            pensamentosArquetipo: {
                guerreiro: "Pânico assim não nasce de boato. Alguma coisa realmente chegou até a vila.",
                paladino: "Se inocentes pedem ajuda, já não há escolha moral a fazer.",
                arqueiro: "Os olhos dele viram o suficiente para largar a estrada e correr sem direção.",
                mago: "“Algo antigo”... isso raramente significa algo simples.",
                clerigo: "O medo dele é sincero. E o sofrimento já começou.",
                ladino: "Velho apavorado, floresta estranha e pedido urgente. Nada disso promete lucro fácil.",
                druida: "Se a floresta invadiu a vila, então alguém feriu seu equilíbrio.",
                monge: "O pânico dos outros exige calma de quem ainda consegue oferecê-la."
            },
            vozNarrador: criarNomeArquivoVoz(1, "cena1", "narrador"),
            vozFala: criarNomeArquivoVoz(1, "cena1", "fala")
        }),

        criarCenaNarrativaBase({
            id: "cap1_cena2",
            tipo: "secundaria",
            titulo: "À sombra das árvores",
            icone: "🌲",
            narrador: "Narrador",
            texto: "A entrada da Floresta Sombria engolia a luz do fim de tarde como se tivesse fome dela. O ar era úmido, mas não fresco. Havia um peso invisível entre os troncos, e cada passo parecia afundar num silêncio que observava de volta.\n\nNenhum canto de pássaro. Nenhum farfalhar leve de presa. Apenas o som de galhos distantes, como se algo grande se movesse sem querer ser visto.",
            pensamentosArquetipo: {
                guerreiro: "Lugar ruim para baixar a guarda.",
                paladino: "Há profanação nessa mata. Dá para sentir no ar.",
                arqueiro: "Silêncio demais. Nenhum pássaro cantaria perto disso.",
                mago: "A energia aqui não está apenas corrompida. Está concentrada.",
                clerigo: "Até a própria floresta parece pedir socorro.",
                ladino: "Se algo me atacar aqui, vai sair de um ponto que eu ainda não vi.",
                druida: "A mata não está zangada. Está doente.",
                monge: "Silêncio sem paz sempre esconde violência."
            },
            vozNarrador: criarNomeArquivoVoz(1, "cena2", "narrador")
        }),

        criarCenaNarrativaBase({
            id: "cap1_cena3",
            tipo: "chave",
            titulo: "O altar profanado",
            icone: "🔮",
            narrador: "Narrador",
            texto: "No coração da mata, entre raízes retorcidas e pedras cobertas de musgo negro, você encontra um altar antigo. A pedra central estava rachada, mas ainda pulsava com uma energia escura e lenta, como o bater de um coração enterrado.\n\nSímbolos estranhos serpenteavam pela superfície da rocha. Alguns pareciam antigos. Outros pareciam ter sido gravados recentemente, com raiva e pressa.",
            pensamentosPersonagem: {
                "guerreiro": "Já vi postos avançados corrompidos antes de cair. Isto tem o mesmo cheiro de desastre começando.",
                "guerreira": "Pedra rachada, símbolo torto e poder errado. Nada bom jamais saiu de ruína mexida sem cuidado.",
                "draconato": "O sagrado foi violado aqui. Isso sozinho já exige resposta.",
                "draconata": "Altar nenhum se profana sozinho. Alguém abriu esta ferida de propósito.",
                "arqueiro": "Nem os animais se aproximariam disto por escolha. A mata inteira está recuando.",
                "arqueira": "Quem tocou este altar não queria apenas corromper a floresta. Queria marcar território.",
                "mago": "Esses símbolos não são desordem. São estrutura. Isso é o mais perigoso.",
                "maga": "Eu já senti magia antiga. Isto é diferente. Isto parece fome com forma.",
                "leonide.m": "Há lugares onde a oração se ergue. Aqui, ela foi arrastada para baixo.",
                "leonide.f": "É como ouvir uma voz sagrada falando de trás para frente.",
                "halfling.m": "Se essa pedra começar a falar comigo, vou considerar isso meu pior dia até agora.",
                "halfling.f": "Já vi cultistas improvisarem horrores. Isso aqui foi feito por gente que sabia exatamente o que estava fazendo.",
                "druida.m": "A floresta está ferida ao redor dele, como carne infeccionada em volta de uma lâmina.",
                "druida.f": "Até o vento evita tocar esse altar por inteiro.",
                "monge.m": "Algo aqui quer entrar em mim pela raiva. Não vou abrir espaço.",
                "monge.f": "Certas portas são abertas primeiro dentro de quem as encontra."
            },
            escolha: {
                pergunta: "O que você faz com o altar?",
                opcoes: [
                    criarOpcaoNarrativa({
                        texto: "🙏 Purificar o altar",
                        rota: "heroi",
                        pesoRota: 2,
                        flag: "altarPurificado",
                        resultadoTexto: "Você se aproxima com cautela e impõe sua vontade sobre a energia corrompida. Por um breve instante, a escuridão resiste, vibrando como fera acuada. Então cede. Uma luz morna se espalha pelas pedras, e o ar pesado da floresta parece recuar.\n\nAs árvores ao redor deixam de ranger. Em algum lugar distante, um pássaro volta a cantar.",
                        recompensaTexto: "❤️ +20 Max HP | Alinhamento Heroico",
                        iconeResultado: "🙏",
                        vozResultado: criarNomeArquivoVoz(1, "cena3", "resultado_heroi"),
                        onEscolha: function() {
                            aplicarConsequenciaNarrativa("altar_purificar", "heroi", 2);
        player.maxHp += 20;
                            if (typeof updateUI === "function") updateUI();
                        }
                    }),
                    criarOpcaoNarrativa({
                        texto: "🔮 Estudar os símbolos",
                        rota: "neutro",
                        pesoRota: 1,
                        flag: "altarEstudado",
                        resultadoTexto: "Você se ajoelha diante do altar e observa cada símbolo, cada ranhura, cada padrão oculto entre as marcas escuras. Aquilo não era simples magia profana. Havia ordem na corrupção. Método. Intenção.\n\nVocê memoriza os sinais e percebe que alguns deles parecem indicar direção — como se o altar não fosse origem, mas ponto de passagem.",
                        recompensaTexto: "🔮 +1 Inteligência | Alinhamento Neutro",
                        iconeResultado: "📖",
                        vozResultado: criarNomeArquivoVoz(1, "cena3", "resultado_neutro"),
                        onEscolha: function() {
                            aplicarConsequenciaNarrativa("altar_estudar", "neutro", 1);
                            player.inteligencia += 1;
                            if (typeof aplicarBonusEquipamentos === "function") aplicarBonusEquipamentos();
                            if (typeof updateUI === "function") updateUI();
                        }
                    }),
                    criarOpcaoNarrativa({
                        texto: "💀 Absorver a energia sombria",
                        rota: "sombrio",
                        pesoRota: 2,
                        flag: "altarAbsorvido",
                        resultadoTexto: "Você estende a mão. A energia do altar hesita por um instante, como se o avaliasse. Então avança.\n\nO poder entra em você como gelo e fogo ao mesmo tempo. Sua visão oscila. Por um segundo, você vê corredores de pedra, figuras encapuzadas e um brilho negro se abrindo como uma ferida no mundo.\n\nQuando recua, o altar está inerte — e algo em você está mais forte. Mas não intacto.",
                        recompensaTexto: "⚔️ +2 Força | 💔 -10 HP Máx | Alinhamento Sombrio",
                        iconeResultado: "💀",
                        vozResultado: criarNomeArquivoVoz(1, "cena3", "resultado_sombrio"),
                        onEscolha: function() {
                            aplicarConsequenciaNarrativa("altar_absorver", "sombrio", 2);
                            player.forca += 2;
                            player.baseMaxHp = Math.max(1, player.baseMaxHp - 10);
                            if (typeof aplicarBonusEquipamentos === "function") aplicarBonusEquipamentos();
                            player.hp = Math.min(player.hp, player.maxHp);
                            if (typeof updateUI === "function") updateUI();
                        }
                    })
                ]
            },
            vozNarrador: criarNomeArquivoVoz(1, "cena3", "narrador")
        }),

        criarCenaNarrativaBase({
            id: "cap1_cena4",
            tipo: "chave",
            titulo: "A verdade por trás dos lobos",
            icone: "⚠️",
            narrador: "Narrador",
            texto: "Ao seguir o rastro deixado pelos ataques, a verdade se revela. Os lobos não estavam caçando a vila. Estavam fugindo.\n\nNas profundezas da floresta, entre pedras antigas e árvores mortas, você encontra restos de criaturas que não pertencem àquele lugar. Carcaças deformadas, marcas de energia negra e uma passagem arruinada voltada para o norte.\n\nLá, escondido entre ruínas cobertas por raízes, pulsa um brilho estranho.\n\nUm portal.\n\nAinda instável. Ainda incompleto. Mas real.",
            pensamentosPersonagem: {
                "guerreiro": "Então não era ataque. Era retirada. A vila só estava no caminho de algo pior.",
                "guerreira": "Bichos fugindo de monstro maior. Simples. Sempre começa assim.",
                "draconato": "Se há portal, então a batalha da floresta era apenas sintoma.",
                "draconata": "Um selo rompido, uma passagem instável... alguém está testando a velha arquitetura do desastre.",
                "arqueiro": "Eu sabia. Predador nenhum abandona território sem uma razão que o apavore.",
                "arqueira": "As criaturas da floresta não enlouqueceram. Foram expulsas.",
                "mago": "Portal confirmado. A teoria morreu. Agora resta o problema real.",
                "maga": "Eu senti. Antes mesmo de ver, eu senti. Isto é só o começo.",
                "leonide.m": "Uma vila pediu socorro. O mundo inteiro pode acabar precisando do mesmo.",
                "leonide.f": "Então o chamado dos meus sonhos tinha direção.",
                "halfling.m": "Ótimo. Não eram só lobos. Era uma rachadura no mundo. Claro que era.",
                "halfling.f": "Quando a verdade aparece, ela quase sempre é pior do que o aviso.",
                "druida.m": "Não foi a floresta que se voltou contra os vivos. Foi ferida até cuspir tudo para fora.",
                "druida.f": "A mata tentou avisar de todas as formas que pôde. Só ninguém escutou.",
                "monge.m": "Agora ficou simples. Não é sobre medo. É sobre enfrentar a origem.",
                "monge.f": "Todo primeiro portal parece pequeno até ser entendido como convite."
            },
            vozNarrador: criarNomeArquivoVoz(1, "cena4", "narrador")
        })
    ]
});

// ============================================
// SEÇÃO 34: CAPÍTULO 2 — ÁGUAS TURVAS
// ============================================

registrarCapituloNarrativo("capitulo_2_pantano", {
    id: 2,
    titulo: "Águas Turvas",
    area: "pantano",
    cenas: [

        criarCenaNarrativaBase({
            id: "cap2_cena1",
            tipo: "secundaria",
            titulo: "O caminho pelo pântano",
            icone: "🐸",
            narrador: "Narrador",
            texto: "O caminho para o norte não era estrada, mas insistência. O Pântano Venenoso se estendia à frente como uma terra que havia desistido de ser firme. A água turva respirava bolhas lentas. O lodo agarrava botas e patas. O ar tinha gosto de ferrugem e podridão.\n\nAinda assim, havia rumores de alguém que vivia ali. Alguém velha o bastante para reconhecer símbolos que a maioria dos sábios só fingia entender.",
            pensamentosArquetipo: {
                guerreiro: "Terreno ruim, visão ruim, cheiro ruim. Perfeito para emboscada.",
                paladino: "Lugares assim testam mais a fé do que a coragem.",
                arqueiro: "Cada raiz pode esconder presa, predador ou cadáver.",
                mago: "O pântano inteiro parece saturado por resíduos de rituais antigos.",
                clerigo: "A decadência aqui não é natural. É cultivada.",
                ladino: "Nunca confiei em lama que borbulha sozinha.",
                druida: "Pântanos também são vivos. Mas este foi envenenado por vontade.",
                monge: "Ambientes hostis punem quem perde o centro por um instante."
            },
            vozNarrador: criarNomeArquivoVoz(2, "cena1", "narrador")
        }),

        criarCenaNarrativaBase({
            id: "cap2_cena2",
            tipo: "chave",
            titulo: "A bruxa das águas mortas",
            icone: "🧙‍♀️",
            narrador: "Narrador",
            texto: "A porta da cabana se abre com lentidão. A mulher à sua frente é tão velha quanto o pântano parece. Seus olhos, porém, são vívidos demais — atentos demais para alguém que vive cercada por morte vegetal e névoa tóxica.\n\nFrascos, ossos, ervas e símbolos pendem do teto da cabana. O ambiente cheira a fumaça amarga e plantas esmagadas.",
            fala: {
                nome: "Bruxa do Pântano",
                texto: "Ah... então foi você. O barulho dos portais chegou antes dos seus passos.\n\nPosso ajudá-lo. Posso até dizer o que se move por trás das cortinas do mundo. Mas nada é de graça, aventureiro."
            },
            pensamentosPersonagem: {
                "guerreiro": "Gente que sorri assim nunca entrega informação sem medir o preço duas vezes.",
                "guerreira": "Velha demais para mentir por esporte. Esperta demais para falar por bondade.",
                "draconato": "Ela conhece os portais sem se assustar com eles. Isso já diz muito.",
                "draconata": "Conhecimento guardado em lugares podres ainda é conhecimento — só raramente vem limpo.",
                "arqueiro": "Ela me olha como se soubesse por onde passei antes de eu dizer uma palavra.",
                "arqueira": "Mulheres assim não sobrevivem em pântanos sendo inofensivas.",
                "mago": "Finalmente alguém que talvez saiba mais do que rumores e superstição.",
                "maga": "Ela reconheceu o tipo de poder que estou seguindo. Isso me inquieta mais do que me alivia.",
                "leonide.m": "Sabedoria sem compaixão costuma cobrar caro demais.",
                "leonide.f": "Há verdade nela. Mas também há prazer em testá-la nos outros.",
                "halfling.m": "Óbvio. Bruxa de pântano, cabana suspeita, fala enigmática. O manual da desgraça está completo.",
                "halfling.f": "Se ela sabe tanto, então também sabe o valor de parecer indispensável.",
                "druida.m": "Ela vive em lugar corrompido sem ser consumida. Isso por si só já é uma forma de poder.",
                "druida.f": "Algumas pessoas aprendem a florescer até na água envenenada. Ainda assim, continuam envenenadas.",
                "monge.m": "Ela não quer minha confiança. Quer medir o tamanho da minha necessidade.",
                "monge.f": "Certas guias aparecem não para facilitar o caminho, mas para revelar o preço de segui-lo."
            },
            escolha: {
                pergunta: "O que você oferece à bruxa?",
                opcoes: [
                    criarOpcaoNarrativa({
                        texto: "💰 Pagar 100 de ouro",
                        rota: "neutro",
                        pesoRota: 1,
                        flag: "confiouBruxa",
                        resultadoTexto: "Você coloca o ouro diante dela. A bruxa passa os dedos sobre as moedas sem pressa, como se estivesse tocando memórias e não metal.\n\nEntão ela abre um mapa antigo sobre a mesa. As marcas nele não mostram apenas trilhas — mostram convergências.",
                        recompensaTexto: "📘 +100 XP | Alinhamento Neutro",
                        iconeResultado: "💰",
                        vozResultado: criarNomeArquivoVoz(2, "cena2", "resultado_neutro"),
                        onEscolha: function() {
                            aplicarConsequenciaNarrativa("bruxa_pagar", "neutro", 1);
                            if (player.gold >= 100) player.gold -= 100;
                            if (typeof ganharExp === "function") ganharExp(100);
                            if (typeof updateUI === "function") updateUI();
                        }
                    }),
                    criarOpcaoNarrativa({
                        texto: "⚔️ Ameaçá-la",
                        rota: "sombrio",
                        pesoRota: 1,
                        flag: "ameacouBruxa",
                        resultadoTexto: "Você endurece a voz e leva a mão à arma. Por um instante, a cabana inteira parece reagir. As velas se apagam. Frascos vibram. Algo se move sob a água do lado de fora.\n\nA bruxa sorri, mas agora com dentes.",
                        recompensaTexto: "🧪 +3 Poções | 📖 -1 Sabedoria | Alinhamento Sombrio",
                        iconeResultado: "⚔️",
                        vozResultado: criarNomeArquivoVoz(2, "cena2", "resultado_sombrio"),
                        onEscolha: function() {
                            aplicarConsequenciaNarrativa("bruxa_ameacar", "sombrio", 1);
                            player.potions += 3;
                            player.sabedoria = Math.max(1, player.sabedoria - 1);
                            if (typeof aplicarBonusEquipamentos === "function") aplicarBonusEquipamentos();
                            if (typeof updateUI === "function") updateUI();
                        }
                    }),
                    criarOpcaoNarrativa({
                        texto: "🤝 Ajudá-la com ingredientes",
                        rota: "heroi",
                        pesoRota: 1,
                        flag: "ajudouBruxa",
                        resultadoTexto: "Você passa horas atravessando lama, recolhendo ervas raras, fungos venenosos e flores pálidas que só se abrem onde a água é mais funda.\n\nQuando retorna, a bruxa observa os ingredientes em silêncio, como se medisse não seu esforço, mas sua intenção.",
                        recompensaTexto: "📖 +2 Sabedoria | Alinhamento Heroico",
                        iconeResultado: "🌿",
                        vozResultado: criarNomeArquivoVoz(2, "cena2", "resultado_heroi"),
                        onEscolha: function() {
                            aplicarConsequenciaNarrativa("bruxa_ajudar", "heroi", 1);
                            player.sabedoria += 2;
                            if (typeof aplicarBonusEquipamentos === "function") aplicarBonusEquipamentos();
                            if (typeof updateUI === "function") updateUI();
                        }
                    })
                ]
            },
            vozNarrador: criarNomeArquivoVoz(2, "cena2", "narrador"),
            vozFala: criarNomeArquivoVoz(2, "cena2", "fala")
        }),

        criarCenaNarrativaBase({
            id: "cap2_cena3",
            tipo: "chave",
            titulo: "O nome dos inimigos",
            icone: "📖",
            narrador: "Narrador",
            texto: "A bruxa acende uma chama verde sobre uma tigela de ferro. Na fumaça, formas se erguem: ruínas, figuras encapuzadas, altares, estrelas apagadas.",
            fala: {
                nome: "Bruxa do Pântano",
                texto: "Eles se chamavam de Os Eternos.\n\nUm culto antigo. Velho demais para os reis lembrarem, perigoso demais para os sábios admitirem.\n\nQuerem ressuscitar um deus esquecido.\n\nAxiom."
            },
            pensamentosPersonagem: {
                "guerreiro": "Nomear o inimigo muda tudo. Guerra sem nome é confusão. Guerra com nome é campanha.",
                "guerreira": "Então os desgraçados têm título e projeto. Melhor ainda. Fica mais fácil odiar direito.",
                "draconato": "Axiom... então as profecias não eram exagero. Eram aviso mal compreendido.",
                "draconata": "Os Eternos. Finalmente a sombra ganha forma suficiente para ser caçada.",
                "arqueiro": "Todo o rastro faz mais sentido agora. Havia inteligência atrás do terror.",
                "arqueira": "Culto, rede, deus esquecido. Quanto mais a verdade cresce, menos espaço sobra para dúvida.",
                "mago": "Finalmente. Um nome, uma ordem, uma finalidade. A teoria agora tem espinha dorsal.",
                "maga": "Axiom. Então era essa a presença por trás dos meus sonhos.",
                "leonide.m": "Falsos salvadores sempre começam prometendo corrigir o mundo.",
                "leonide.f": "Eu já ouvi esse nome em silêncio. Agora ele pesa mais acordada.",
                "halfling.m": "Eu preferia quando eram só monstros aleatórios. Culto organizado complica bastante as chances de vida longa.",
                "halfling.f": "Ótimo. Então não era caos. Era estratégia. Isso quase me irrita mais.",
                "druida.m": "Quando alguém declara o mundo “falho”, geralmente está se preparando para violentá-lo em nome de uma cura.",
                "druida.f": "Até um deus pode ser lembrado da forma errada e voltar como ferida.",
                "monge.m": "Tudo que quer se erguer acima do mundo costuma começar afirmando que o mundo não basta.",
                "monge.f": "Dar nome ao abismo não o reduz. Só impede que finjamos não vê-lo."
            },
            vozNarrador: criarNomeArquivoVoz(2, "cena3", "narrador"),
            vozFala: criarNomeArquivoVoz(2, "cena3", "fala")
        })
    ]
});

// ============================================
// SEÇÃO 35: CAPÍTULO 3 — A BATALHA DAS COLINAS
// ============================================

registrarCapituloNarrativo("capitulo_3_colinas", {
    id: 3,
    titulo: "A Batalha das Colinas",
    area: "colinas",
    cenas: [

        criarCenaNarrativaBase({
            id: "cap3_cena1",
            tipo: "secundaria",
            titulo: "Terra de guerra antiga",
            icone: "⛰️",
            narrador: "Narrador",
            texto: "As Colinas Sangrentas faziam jus ao nome. O vento soprava sobre campos marcados por antigas trincheiras, estandartes apodrecidos e espadas partidas meio enterradas na terra.\n\nAgora, uma nova força ocupava as colinas.",
            pensamentosArquetipo: {
                guerreiro: "Essas colinas conhecem batalha melhor do que paz.",
                paladino: "Sangue antigo ainda pesa sobre lugares onde justiça não foi concluída.",
                arqueiro: "Terreno alto, linhas abertas, vento forte. Ótimo lugar para morrer à distância.",
                mago: "Campos de batalha antigos sempre deixam resíduos de intenção e trauma.",
                clerigo: "Há lugares onde os mortos não descansam porque os vivos nunca aprenderam.",
                ladino: "Se houve guerra aqui antes, ainda deve haver coisa enterrada que ninguém encontrou.",
                druida: "A terra lembra o sangue derramado mesmo quando a grama volta a crescer.",
                monge: "Violência repetida transforma o lugar em extensão do impulso."
            },
            vozNarrador: criarNomeArquivoVoz(3, "cena1", "narrador")
        }),

        criarCenaNarrativaBase({
            id: "cap3_cena2",
            tipo: "chave",
            titulo: "O batedor orc",
            icone: "👹",
            narrador: "Narrador",
            texto: "Antes que pudesse se aproximar mais do acampamento principal, uma figura salta das pedras com lança em punho. Um orc batedor. Forte, ferido e mais cansado do que hostil.\n\nEle poderia atacar. Em vez disso, observa.",
            fala: {
                nome: "Batedor Orc",
                texto: "Humano... anão... elfo... tanto faz. Escute antes de sacar aço.\n\nNosso chefe encontrou um artefato negro nas ruínas. Desde então, ele ouve vozes. Mata os próprios guerreiros. Quer guerra contra tudo. Se você o derrubar, meu povo recua."
            },
            pensamentosPersonagem: {
                "guerreiro": "Soldado cansado, voz firme, chefe enlouquecido. Já vi exércitos quebrarem assim antes.",
                "guerreira": "Se até o batedor quer derrubar o próprio chefe, então a pedra está mais podre no centro.",
                "draconato": "Corrupção reconhecida até por quem deveria servi-la. Isso importa.",
                "draconata": "Nem todo inimigo de agora escolheu o lado em que está preso.",
                "arqueiro": "Ele não cheira a armadilha. Cheira a pressa e desespero.",
                "arqueira": "Quando um guerreiro arrisca parecer fraco diante de um estranho, é porque o problema já passou do limite.",
                "mago": "Artefato antigo, líder alterado, povo dividido. O padrão se repete depressa demais.",
                "maga": "As vozes do cristal chegaram até ele. Então o fragmento não é passivo. Ele chama.",
                "leonide.m": "Se houver chance de impedir mais sangue sem negar justiça, preciso considerá-la.",
                "leonide.f": "Mesmo na voz dele há medo do que aquele artefato desperta.",
                "halfling.m": "Quando o próprio orc oferece atalho, duas opções existem: é armadilha ou é oportunidade. Às vezes as duas.",
                "halfling.f": "Gente encurralada costuma falar mais verdade do que generais e reis.",
                "druida.m": "Povo empurrado contra a própria violência. A corrupção gosta desse tipo de terreno.",
                "druida.f": "Até a brutalidade natural de uma guerra muda quando algo antigo sopra por trás dela.",
                "monge.m": "Reconheço esse olhar: o de quem vê força virar loucura na própria frente.",
                "monge.f": "Às vezes o mensageiro mais improvável carrega a parte mais limpa da verdade."
            },
            escolha: {
                pergunta: "Como proceder?",
                opcoes: [
                    criarOpcaoNarrativa({
                        texto: "🤝 Aceitar a aliança",
                        rota: "heroi",
                        pesoRota: 1,
                        flag: "aliouOrcs",
                        resultadoTexto: "Você baixa a arma, mas não a guarda. O batedor percebe a cautela e a respeita. Em silêncio, ele o conduz por um caminho estreito entre pedras e ravinas, longe dos olhos do acampamento principal.\n\nNo trajeto, você vê orcs feridos escondidos, guerreiros assustados e marcas de execução recente.",
                        recompensaTexto: "🏹 +2 Destreza | Alinhamento Heroico",
                        iconeResultado: "🤝",
                        vozResultado: criarNomeArquivoVoz(3, "cena2", "resultado_heroi"),
                        onEscolha: function() {
                            aplicarConsequenciaNarrativa("orc_alianca", "heroi", 1);
                            player.destreza += 2;
                            if (typeof aplicarBonusEquipamentos === "function") aplicarBonusEquipamentos();
                            if (typeof updateUI === "function") updateUI();
                        }
                    }),
                    criarOpcaoNarrativa({
                        texto: "⚔️ Recusar e lutar sozinho",
                        rota: "neutro",
                        pesoRota: 1,
                        resultadoTexto: "Você recusa a ajuda. Se há um chefe corrompido no alto da colina, irá alcançá-lo por sua própria força.\n\nA subida é brutal. Você enfrenta vigias, emboscadas e o terreno hostil sem guia nem proteção. Cada passo custa esforço. Cada vitória é conquistada sem favor.",
                        recompensaTexto: "⚔️ +2 Força | Alinhamento Neutro",
                        iconeResultado: "⚔️",
                        vozResultado: criarNomeArquivoVoz(3, "cena2", "resultado_neutro"),
                        onEscolha: function() {
                            adicionarPontoRota("neutro", 1);
                            player.forca += 2;
                            if (typeof aplicarBonusEquipamentos === "function") aplicarBonusEquipamentos();
                            if (typeof updateUI === "function") updateUI();
                        }
                    }),
                    criarOpcaoNarrativa({
                        texto: "🗡️ Matar o batedor e usar a informação",
                        rota: "sombrio",
                        pesoRota: 2,
                        flag: "matouBatedorOrc",
                        resultadoTexto: "Você finge ouvir até o fim. Então ataca rápido.\n\nO batedor mal consegue reagir. Quando cai, o silêncio pesa mais do que o golpe. Em sua bolsa, você encontra ouro, um mapa grosseiro da colina e marcas de rotas de patrulha.",
                        recompensaTexto: "💰 +150 ouro | Alinhamento Sombrio",
                        iconeResultado: "🗡️",
                        vozResultado: criarNomeArquivoVoz(3, "cena2", "resultado_sombrio"),
                        onEscolha: function() {
                            aplicarConsequenciaNarrativa("orc_matar", "sombrio", 2);
                            player.gold += 150;
                            if (typeof updateUI === "function") updateUI();
                        }
                    })
                ]
            },
            vozNarrador: criarNomeArquivoVoz(3, "cena2", "narrador"),
            vozFala: criarNomeArquivoVoz(3, "cena2", "fala")
        }),

        criarCenaNarrativaBase({
            id: "cap3_cena3",
            tipo: "secundaria",
            titulo: "O chefe no alto da colina",
            icone: "⚔️",
            narrador: "Narrador",
            texto: "No topo das Colinas Sangrentas, diante de um círculo de pedras antigas, você encontra o chefe orc. Ele é enorme, mas o que mais impõe medo não é seu tamanho — é o cristal negro preso a uma corrente sobre seu peito.\n\nA pedra pulsa em ritmo irregular, como se respondesse a algo distante.",
            pensamentosArquetipo: {
                guerreiro: "Não é só força bruta. É corrupção usando força como ferramenta.",
                paladino: "Qualquer poder que precise escravizar a vontade já se condenou sozinho.",
                arqueiro: "O cristal fez dele alvo e arma ao mesmo tempo.",
                mago: "Esse fragmento não amplifica apenas poder. Amplifica fissuras internas.",
                clerigo: "Nada sagrado habita algo que exige dor para falar.",
                ladino: "Já vi líder enlouquecer por ouro. Nunca por uma pedra que lateja.",
                druida: "Isso não fortalece. Deforma.",
                monge: "Quando a mente perde o centro, o corpo vira instrumento de algo pior."
            },
            vozNarrador: criarNomeArquivoVoz(3, "cena3", "narrador")
        }),

        criarCenaNarrativaBase({
            id: "cap3_cena4",
            tipo: "chave",
            titulo: "O fragmento",
            icone: "🔮",
            narrador: "Narrador",
            texto: "Após a batalha, o corpo do chefe cai pesadamente entre as pedras. O vento muda. O silêncio volta de forma abrupta, quase desconfortável.\n\nO cristal negro continua pulsando.\n\nDe perto, você percebe que ele não é uma gema comum. É um fragmento. Uma peça arrancada de algo maior — talvez de um selo, talvez do próprio portal.",
            pensamentosPersonagem: {
                "guerreiro": "Então a pedra é real. E a guerra deles já não é só tribal — é instrumental.",
                "guerreira": "Fragmento maldito. Sempre uma peça pequena demais para parecer ameaça até destruir uma comunidade inteira.",
                "draconato": "Não é apenas artefato. É heresia condensada.",
                "draconata": "Um fragmento assim não abre sozinho. Serve a algo maior e responde a uma estrutura antiga.",
                "arqueiro": "É isso que os lobos sentiram. É isso que empurrou tudo para fora do lugar.",
                "arqueira": "Agora temos prova física. Ninguém sensato pode chamar isso de coincidência.",
                "mago": "Perfeito. Horrível. Perfeito. Isso conecta símbolos, ruínas e portais num único sistema.",
                "maga": "É pequeno, mas pulsa como se quisesse me reconhecer de volta.",
                "leonide.m": "Mesmo uma peça tão pequena já carrega maldade demais para pesar tão pouco.",
                "leonide.f": "Essa coisa não brilha. Ela insiste.",
                "halfling.m": "Lá está. A bugiganga apocalíptica da vez.",
                "halfling.f": "Se uma peça dessas faz isso numa colina, quantas mais existem por aí?",
                "druida.m": "Fragmento de passagem. Espinho da rede cravado no mundo.",
                "druida.f": "Até a terra ao redor dele parece querer cuspir essa pedra para fora.",
                "monge.m": "Coisa pequena. Vontade enorme. Esse costuma ser o tipo mais perigoso.",
                "monge.f": "Todo fragmento promete pouco à vista e cobra muito depois."
            },
            vozNarrador: criarNomeArquivoVoz(3, "cena4", "narrador")
        })
    ]
});

// ============================================
// SEÇÃO 36: CAPÍTULO 4 — ECOS DO PASSADO
// ============================================

registrarCapituloNarrativo("capitulo_4_ruinas", {
    id: 4,
    titulo: "Ecos do Passado",
    area: "ruinas",
    cenas: [

        criarCenaNarrativaBase({
            id: "cap4_cena1",
            tipo: "secundaria",
            titulo: "Pedra que lembra",
            icone: "🏚️",
            narrador: "Narrador",
            texto: "As Ruínas Esquecidas não pareciam mortas. Pareciam interrompidas.\n\nColunas rachadas ainda sustentavam tetos quebrados. Escadarias levavam a salões soterrados. Estátuas sem rosto observavam corredores cobertos por poeira e teias, como sentinelas de um povo que desapareceu depressa demais para se despedir.",
            pensamentosArquetipo: {
                guerreiro: "Ruínas assim não caem de uma vez. Foram quebradas em etapas.",
                paladino: "Até a pedra conserva ecos do que foi profanado.",
                arqueiro: "Lugar péssimo para avançar rápido e excelente para ser observado.",
                mago: "Essas inscrições foram feitas para durar mais do que seus autores.",
                clerigo: "Quando um povo desaparece assim, geralmente não levou só sua fé junto — levou suas falhas.",
                ladino: "Se ninguém voltou para saquear tudo isso direito, então havia motivo.",
                druida: "A natureza cobriu as ruínas, mas não conseguiu apagá-las.",
                monge: "O tempo desgasta superfície. Não intenção."
            },
            vozNarrador: criarNomeArquivoVoz(4, "cena1", "narrador")
        }),

        criarCenaNarrativaBase({
            id: "cap4_cena2",
            tipo: "secundaria",
            titulo: "Guardiões dos mortos",
            icone: "💀",
            narrador: "Narrador",
            texto: "Ao avançar pelos corredores centrais, você descobre que as ruínas não estão vazias. Esqueletos armados permanecem de pé como se ainda servissem a ordens que o tempo foi incapaz de apagar. Correntes se movem sozinhas. Portas de pedra abrem com gemidos lentos.\n\nO próprio templo parece resistir à sua presença.",
            pensamentosArquetipo: {
                guerreiro: "Defesas que ainda funcionam séculos depois merecem respeito — e cautela.",
                paladino: "Mortos transformados em sentinelas são sempre sinal de juramento corrompido.",
                arqueiro: "Corredores estreitos e guardiões imóveis. Péssima combinação.",
                mago: "A magia aqui não sustenta vida. Sustenta propósito fossilizado.",
                clerigo: "Esses mortos não servem a paz. Servem a uma ordem que recusou o fim.",
                ladino: "Nada pior do que guarda que não dorme, não bebe e não negocia.",
                druida: "Quando a morte é impedida de concluir o ciclo, tudo ao redor adoece junto.",
                monge: "Persistência sem consciência vira prisão."
            },
            vozNarrador: criarNomeArquivoVoz(4, "cena2", "narrador")
        }),

        criarCenaNarrativaBase({
            id: "cap4_cena3",
            tipo: "chave",
            titulo: "O sacerdote arrependido",
            icone: "👻",
            narrador: "Narrador",
            texto: "A figura translúcida vestia restos de antigas roupas cerimoniais. Sua forma oscilava entre homem e fumaça, presa a um círculo de pedra negra gravado no chão.\n\nEle ergue o rosto ao vê-lo, e em seus olhos existe algo raro naquele lugar: vergonha.",
            fala: {
                nome: "Espírito Arrependido",
                texto: "Você não pertence a este templo... e isso talvez seja uma bênção.\n\nEu servi aos Eternos. Não por maldade. Por fé. Nós acreditávamos que podíamos tocar a eternidade, superar a morte, corrigir as falhas do mundo.\n\nFomos tolos.\n\nEu posso te mostrar como selar os portais. Mas preciso de algo em troca."
            },
            pensamentosPersonagem: {
                "guerreiro": "Arrependimento depois da ruína ainda pode ser útil — mas não inocenta ninguém.",
                "guerreira": "Conveniente pedir compreensão quando se virou fantasma e perdeu o controle da própria obra.",
                "draconato": "Se ele realmente caiu em erro por fé, então o erro começou bem antes do ritual final.",
                "draconata": "É nisso que ordens cegas se transformam quando confundem devoção com obediência.",
                "arqueiro": "Ele não me parece mentiroso. Só tarde demais.",
                "arqueira": "Quem ajuda a erguer horror não recupera honra só porque finalmente o reconhece.",
                "mago": "Finalmente alguém que viu o interior do culto antes da ruína total.",
                "maga": "O mais inquietante não é ele ter servido aos Eternos. É ter acreditado que fazia o certo.",
                "leonide.m": "Pecado reconhecido não é pecado apagado. Mas ainda pode abrir caminho para reparo.",
                "leonide.f": "Arrependimento verdadeiro sempre soa mais cansado do que dramático.",
                "halfling.m": "Fantasma culpado oferecendo segredo antigo. Isso está começando a parecer meu tipo de problema recorrente.",
                "halfling.f": "Todo arrependido acha que informação compensa estrago. Às vezes compensa. Às vezes não.",
                "druida.m": "Alguns desastres nascem menos da crueldade e mais da convicção errada. Ainda assim, ferem do mesmo jeito.",
                "druida.f": "É triste perceber que tanta devastação pode ter começado como oração torta.",
                "monge.m": "Erro feito em nome de disciplina cega ainda é erro. Talvez pior.",
                "monge.f": "Os que se arrependem tarde demais são frequentemente os que enxergam mais longe depois."
            },
            escolha: {
                pergunta: "Como responder ao espírito?",
                opcoes: [
                    criarOpcaoNarrativa({
                        texto: "🙏 Prometer libertá-lo",
                        rota: "heroi",
                        pesoRota: 2,
                        flag: "libertouEspíritoRuinas",
                        resultadoTexto: "Você não vê diante de si apenas um servo arrependido, mas um prisioneiro de sua própria falha. Ao prometer libertá-lo, o círculo no chão enfraquece ligeiramente, como se a esperança ainda tivesse poder sobre a maldição.\n\nO espírito fecha os olhos, e símbolos de luz se desenham no ar entre vocês.",
                        recompensaTexto: "📖 +2 Sabedoria | 🔮 +1 Inteligência | Alinhamento Heroico",
                        iconeResultado: "🙏",
                        vozResultado: criarNomeArquivoVoz(4, "cena3", "resultado_heroi"),
                        onEscolha: function() {
                            aplicarConsequenciaNarrativa("ruinas_libertar", "heroi", 2);
                            player.sabedoria += 2;
                            player.inteligencia += 1;
                            if (typeof aplicarBonusEquipamentos === "function") aplicarBonusEquipamentos();
                            if (typeof updateUI === "function") updateUI();
                        }
                    }),
                    criarOpcaoNarrativa({
                        texto: "🔮 Absorver o espírito",
                        rota: "sombrio",
                        pesoRota: 2,
                        flag: "absorveuEspíritoRuinas",
                        resultadoTexto: "Você sente o poder contido naquela alma antiga e decide tomá-lo. O espírito entende sua intenção antes mesmo que você complete o gesto.\n\nAinda assim, ele não consegue resistir. Sua essência se desfaz em fios de luz escura que entram em você como fumaça puxada por vento.",
                        recompensaTexto: "🔮 +3 Inteligência | Alinhamento Sombrio",
                        iconeResultado: "💀",
                        vozResultado: criarNomeArquivoVoz(4, "cena3", "resultado_sombrio"),
                        onEscolha: function() {
                            aplicarConsequenciaNarrativa("ruinas_absorver", "sombrio", 2);
                            player.inteligencia += 3;
                            if (typeof aplicarBonusEquipamentos === "function") aplicarBonusEquipamentos();
                            if (typeof updateUI === "function") updateUI();
                        }
                    }),
                    criarOpcaoNarrativa({
                        texto: "📜 Negociar conhecimento mútuo",
                        rota: "neutro",
                        pesoRota: 1,
                        resultadoTexto: "Você se recusa tanto à piedade cega quanto à crueldade imediata. Em vez disso, propõe troca.\n\nO espírito lhe ensina o que sabe sobre selos, rituais e falhas dos Eternos; em retorno, você lhe fala do mundo atual — dos reinos caídos, das vilas e dos nomes que o tempo levou embora.",
                        recompensaTexto: "📘 +200 XP | Alinhamento Neutro",
                        iconeResultado: "📜",
                        vozResultado: criarNomeArquivoVoz(4, "cena3", "resultado_neutro"),
                        onEscolha: function() {
                            adicionarPontoRota("neutro", 1);
                            if (typeof ganharExp === "function") ganharExp(200);
                            if (typeof updateUI === "function") updateUI();
                        }
                    })
                ]
            },
            vozNarrador: criarNomeArquivoVoz(4, "cena3", "narrador"),
            vozFala: criarNomeArquivoVoz(4, "cena3", "fala")
        }),

        criarCenaNarrativaBase({
            id: "cap4_cena4",
            tipo: "chave",
            titulo: "A rede",
            icone: "⚠️",
            narrador: "Narrador",
            texto: "No coração mais profundo das ruínas, você encontra um salão circular coberto por um mapa esculpido em pedra. Linhas finas, quase apagadas, ligam pontos espalhados pelo continente. Em cada interseção, símbolos conhecidos pulsavam fracamente.\n\nPortais.\n\nNão isolados. Conectados.\n\nUma rede.",
            fala: {
                nome: "Espírito Arrependido",
                texto: "Fechar um não basta. Cada passagem sustenta as demais. Enquanto a rede existir, Axiom continuará encontrando caminho de volta."
            },
            pensamentosPersonagem: {
                "guerreiro": "Então não é uma guerra de fronteira. É cerco total ao mundo.",
                "guerreira": "Ótimo. Não basta quebrar um problema. Tem que quebrar o sistema inteiro.",
                "draconato": "Isso muda a missão de combate isolado para campanha sagrada completa.",
                "draconata": "Selos ligados entre si... então a arquitetura antiga era muito mais vasta do que os templos admitiam.",
                "arqueiro": "Cada rastro leva a outro. Agora faz sentido por que nunca parecia terminar.",
                "arqueira": "Uma rede dessas explica como a corrupção atravessou territórios tão distantes tão rápido.",
                "mago": "Perfeito. Horrendo, mas perfeito. Finalmente a lógica inteira se revela.",
                "maga": "Então os portais não chamam uns aos outros por acaso. Eles se sustentam como coro.",
                "leonide.m": "Não bastará fé em um único lugar. Será preciso perseverança até o último elo.",
                "leonide.f": "É por isso que as vozes mudavam de direção sem jamais se calar.",
                "halfling.m": "Eu preferia muito quando o problema parecia local.",
                "halfling.f": "Rede significa organização. Organização significa tempo. Tempo significa planejamento. Isso é ruim em muitos níveis.",
                "druida.m": "O mundo inteiro foi perfurado em pontos pensados para sangrar junto.",
                "druida.f": "Agora a dor da terra tem desenho. Isso a torna ainda mais triste.",
                "monge.m": "Quando o inimigo opera como rede, hesitação em um ponto ajuda o resto inteiro.",
                "monge.f": "Conhecer a forma da prisão é o primeiro passo real para desmontá-la."
            },
            vozNarrador: criarNomeArquivoVoz(4, "cena4", "narrador"),
            vozFala: criarNomeArquivoVoz(4, "cena4", "fala")
        })
    ]
});

// ============================================
// SEÇÃO 37: CAPÍTULO 5 — AREIAS DO TEMPO
// ============================================

registrarCapituloNarrativo("capitulo_5_deserto", {
    id: 5,
    titulo: "Areias do Tempo",
    area: "deserto",
    cenas: [

        criarCenaNarrativaBase({
            id: "cap5_cena1",
            tipo: "secundaria",
            titulo: "Sol e ruína",
            icone: "🏜️",
            narrador: "Narrador",
            texto: "O deserto não recebia visitantes; consumia-os.\n\nCada passo afundava em areia quente. O horizonte tremia em miragens. O sol era menos luz e mais opressão, esmagando pensamentos e secando a paciência junto com a água.",
            pensamentosArquetipo: {
                guerreiro: "O deserto mata devagar. E isso o torna tão perigoso quanto qualquer exército.",
                paladino: "Há lugares onde a provação limpa. Este lugar apenas esgota.",
                arqueiro: "Miragem, calor e terreno aberto. Nada aqui favorece erro.",
                mago: "A areia preserva vestígios como se escondesse segredos por contrato.",
                clerigo: "Até o silêncio do deserto parece julgamento.",
                ladino: "Se eu precisasse esconder um templo antigo, escolheria um lugar que tenta matar curiosos antes.",
                druida: "Mesmo a aridez tem equilíbrio. Aqui há intenção enterrada sob ela.",
                monge: "Ambientes extremos expõem quanto ruído ainda existe dentro de nós."
            },
            vozNarrador: criarNomeArquivoVoz(5, "cena1", "narrador")
        }),

        criarCenaNarrativaBase({
            id: "cap5_cena2",
            tipo: "chave",
            titulo: "O homem que vende caminhos",
            icone: "🧑‍💼",
            narrador: "Narrador",
            texto: "Ao longe, entre tendas gastas e estandartes de viagem, uma figura o observa de pé ao lado de uma carroça estreita.\n\nUm mercador.\n\nMas não do tipo comum.\n\nEle veste tecidos claros, joias discretas e um sorriso treinado demais para ser sincero.",
            fala: {
                nome: "Mercador Misterioso",
                texto: "Procura o templo, não procura?\n\nTenho um mapa. Antigo. Confiável. E raro o bastante para salvar sua vida.\n\nMas há mapas que custam mais do que ouro."
            },
            pensamentosPersonagem: {
                "guerreiro": "Homem demais para ser coincidência, calmo demais para ser inocente.",
                "guerreira": "Mercador no meio do deserto com o mapa exato? Isso fede a manipulação refinada.",
                "draconato": "Tentação sempre se apresenta como conveniência quando o caminho é duro.",
                "draconata": "Não é o mapa que mais me preocupa. É ele saber que eu o procuraria.",
                "arqueiro": "Quem espera viajante no deserto escolheu muito bem o lugar para parecer inevitável.",
                "arqueira": "Não confio em gente que sorri oferecendo atalhos para lugares que deveriam permanecer escondidos.",
                "mago": "Se esse mapa for real, vale mais do que o homem aparenta entender — ou exatamente o que ele entende.",
                "maga": "Ele me olha como se soubesse que a curiosidade é a fraqueza mais fácil de negociar.",
                "leonide.m": "Nem toda barganha injusta parece cruel à primeira vista.",
                "leonide.f": "Há algo nele que não combina com o calor. Como se já estivesse meio fora do mundo comum.",
                "halfling.m": "Ah, claro. Um sujeito elegante no meio do nada oferecendo exatamente o que preciso. Nada suspeito.",
                "halfling.f": "Informação vendida tão perfeitamente nunca é só comércio.",
                "druida.m": "Algumas figuras prosperam onde o mundo está mais quebrado. Ele é uma delas.",
                "druida.f": "Ele parece menos um homem comum e mais uma oportunidade vestida de pele.",
                "monge.m": "Preço pouco claro quase sempre significa dívida grande demais.",
                "monge.f": "Certos encontros não testam caminho. Testam valor."
            },
            escolha: {
                pergunta: "O que entregar?",
                opcoes: [
                    criarOpcaoNarrativa({
                        texto: "💍 Entregar seu melhor anel/amuleto",
                        rota: "neutro",
                        pesoRota: 1,
                        resultadoTexto: "Você entrega um item valioso, e o mercador o recebe com satisfação tranquila, como se já esperasse aquela decisão.\n\nEm troca, desenrola o mapa sobre a carroça. Ali estão câmaras laterais, passagens de ventilação, corredores falsos e o traçado de uma rota segura para o centro do templo.",
                        recompensaTexto: "❤️ +3 Vigor | Alinhamento Neutro",
                        iconeResultado: "💍",
                        vozResultado: criarNomeArquivoVoz(5, "cena2", "resultado_neutro"),
                        onEscolha: function() {
                            adicionarPontoRota("neutro", 1);
                            player.vigor += 3;
                            if (typeof aplicarBonusEquipamentos === "function") aplicarBonusEquipamentos();
                            if (typeof updateUI === "function") updateUI();
                        }
                    }),
                    criarOpcaoNarrativa({
                        texto: "🗡️ Roubar o mapa",
                        rota: "sombrio",
                        pesoRota: 1,
                        resultadoTexto: "Você espera o momento exato em que o olhar do mercador se desvia e age rápido. O mapa muda de mãos com um movimento seco e treinado.\n\nQuando se afasta o bastante para olhar o mapa, uma dúvida persiste. Ainda assim, o ouro é real. E a rota também parece ser.",
                        recompensaTexto: "💰 +250 ouro | Alinhamento Sombrio",
                        iconeResultado: "🗡️",
                        vozResultado: criarNomeArquivoVoz(5, "cena2", "resultado_sombrio"),
                        onEscolha: function() {
                            adicionarPontoRota("sombrio", 1);
                            player.gold += 250;
                            if (typeof updateUI === "function") updateUI();
                        }
                    }),
                    criarOpcaoNarrativa({
                        texto: "🤝 Escoltá-lo em segurança",
                        rota: "heroi",
                        pesoRota: 1,
                        resultadoTexto: "Você percebe que o mercador não é apenas esperto — está com medo. Durante a travessia entre dunas e ruínas semi-enterradas, criaturas do deserto emergem da areia atraídas por algo invisível, e você o mantém vivo até o destino.\n\nAo fim, ele entrega o mapa sem barganha adicional.",
                        recompensaTexto: "🗣️ +2 Carisma | Alinhamento Heroico",
                        iconeResultado: "🤝",
                        vozResultado: criarNomeArquivoVoz(5, "cena2", "resultado_heroi"),
                        onEscolha: function() {
                            adicionarPontoRota("heroi", 1);
                            player.carisma += 2;
                            if (typeof aplicarBonusEquipamentos === "function") aplicarBonusEquipamentos();
                            if (typeof updateUI === "function") updateUI();
                        }
                    })
                ]
            },
            vozNarrador: criarNomeArquivoVoz(5, "cena2", "narrador"),
            vozFala: criarNomeArquivoVoz(5, "cena2", "fala")
        }),

        criarCenaNarrativaBase({
            id: "cap5_cena3",
            tipo: "secundaria",
            titulo: "O templo sob a areia",
            icone: "🏺",
            narrador: "Narrador",
            texto: "A entrada do templo surge quando o sol já desce no céu, revelada sob pedras desenterradas e escadarias que afundam no subsolo. O ar lá dentro é mais frio, mas não mais seguro. As paredes estão cobertas por relevos mostrando figuras encapuzadas oferecendo fragmentos de luz negra a um ser colossal sem rosto.",
            pensamentosArquetipo: {
                guerreiro: "Estrutura enterrada, passagem estreita, visibilidade ruim. Nada disso é casual.",
                paladino: "O sagrado pode ser soterrado. Não por isso deixa de testemunhar.",
                arqueiro: "Entrar ali é como atravessar a garganta de uma armadilha antiga.",
                mago: "Essas paredes não guardam apenas história. Guardam método.",
                clerigo: "Quando um templo serve à corrupção, a arquitetura inteira vira blasfêmia.",
                ladino: "Templo antigo significa duas coisas: segredos e mecanismos para punir curiosos.",
                druida: "A areia cobriu tudo, mas não conseguiu neutralizar o que pulsa aqui embaixo.",
                monge: "Quanto mais fundo o lugar, mais fundo ele quer entrar na mente de quem pisa nele."
            },
            vozNarrador: criarNomeArquivoVoz(5, "cena3", "narrador")
        }),

        criarCenaNarrativaBase({
            id: "cap5_cena4",
            tipo: "chave",
            titulo: "Agora eles sabem",
            icone: "⚡",
            narrador: "Narrador",
            texto: "Quando o selo do templo se rompe sob sua intervenção, uma onda de energia percorre as paredes como relâmpago preso à pedra. Por um instante, todos os símbolos do salão brilham ao mesmo tempo.\n\nEntão uma voz, distante e coletiva, ecoa pelas câmaras.\n\nNão fala com o templo. Fala com você.",
            fala: {
                nome: "Vozes dos Eternos",
                texto: "Um elo caiu.\n\nEle nos caça.\n\nEntão que seja caçado também."
            },
            pensamentosPersonagem: {
                "guerreiro": "Bom. Se me notaram, também podem ser forçados a reagir antes da hora certa.",
                "guerreira": "Ótimo. Agora o culto sabe meu nome e eu sei que vou precisar continuar mesmo assim.",
                "draconato": "Se fui reconhecido pelo inimigo, então minha presença já pesa sobre a guerra.",
                "draconata": "Era inevitável. Quanto mais elos caem, menos espaço sobra para eu agir invisível.",
                "arqueiro": "Caçador visto ainda pode matar. Só precisa aceitar que também será visado.",
                "arqueira": "Que saibam. Se precisavam de rosto para odiar, agora têm um.",
                "mago": "Ser percebido pelo sistema significa que já alterei variáveis demais para ser tratado como acaso.",
                "maga": "Então chegou a fase em que não estou apenas seguindo o chamado — estou sendo chamada de volta.",
                "leonide.m": "Se o mal finalmente me olha de frente, que também veja que não recuarei.",
                "leonide.f": "Agora as vozes deixaram de ser eco distante. Tornaram-se resposta.",
                "halfling.m": "Perfeito. Já não bastava ser perseguido pela própria vida; agora também estou oficialmente na lista do culto.",
                "halfling.f": "Se eles sabem que eu existo, é porque já comecei a custar caro demais.",
                "druida.m": "Ferida tocada reage. Era só questão de tempo.",
                "druida.f": "O mundo inteiro parece ter estremecido ao perceber que alguém começou a responder à dor dele.",
                "monge.m": "Quando o inimigo finalmente reconhece sua presença, a luta deixa de ser teórica.",
                "monge.f": "Ser visto pelo abismo é parte do preço de encará-lo tempo suficiente."
            },
            vozNarrador: criarNomeArquivoVoz(5, "cena4", "narrador"),
            vozFala: criarNomeArquivoVoz(5, "cena4", "fala")
        })
    ]
});

// ============================================
// SEÇÃO 38: CAPÍTULO 6 — O PREÇO DOS MORTOS
// ============================================

registrarCapituloNarrativo("capitulo_6_cemiterio", {
    id: 6,
    titulo: "O Preço dos Mortos",
    area: "cemiterio",
    cenas: [

        criarCenaNarrativaBase({
            id: "cap6_cena1",
            tipo: "secundaria",
            titulo: "Terra que não aceita repouso",
            icone: "⚰️",
            narrador: "Narrador",
            texto: "O Cemitério Profano se espalhava como uma cicatriz no mundo. Lápides partidas saíam da terra em ângulos errados. Mausoléus sem portas exalavam névoa fria. Árvores mortas erguiam galhos secos como mãos pedindo socorro ou julgamento.",
            pensamentosArquetipo: {
                guerreiro: "Cemitério ruim é campo de batalha que se recusa a acabar.",
                paladino: "A morte merece descanso. Aqui até isso foi violado.",
                arqueiro: "Terreno aberto demais para os vivos, bom demais para aquilo que já caiu uma vez.",
                mago: "A concentração de energia necromântica aqui é absurdamente estável.",
                clerigo: "Nada é mais triste do que um lugar onde nem o luto termina direito.",
                ladino: "Nunca gostei de gente que levanta depois de cair. Muito trabalho dobrado.",
                druida: "O ciclo foi interrompido. É por isso que o ar parece preso.",
                monge: "Quando até os mortos perdem quietude, há desequilíbrio profundo em ação."
            },
            vozNarrador: criarNomeArquivoVoz(6, "cena1", "narrador")
        }),

        criarCenaNarrativaBase({
            id: "cap6_cena2",
            tipo: "chave",
            titulo: "O necromante arrependido",
            icone: "💀",
            narrador: "Narrador",
            texto: "No centro das catacumbas, à luz fraca de velas verdes, você encontra um homem ajoelhado diante de um círculo de ossos e cinzas.\n\nUm necromante.\n\nMas não um que pareça triunfante.",
            fala: {
                nome: "Necromante Arrependido",
                texto: "Chegou tarde demais para impedir o que eu ajudei a fazer.\n\nMas talvez ainda em tempo de me deixar corrigir parte disso.\n\nEu ajudei os Eternos a levantar os mortos deste lugar. Achei que podia controlar a fronteira entre vida e morte. Estava errado."
            },
            pensamentosPersonagem: {
                "guerreiro": "Já enterrei homens demais para ouvir com leveza alguém que resolveu levantar os mortos de volta.",
                "guerreira": "Arrependido, é? Sempre depois que a desgraça já espalhou raízes.",
                "draconato": "Conhecimento que atravessa a linha da morte sem reverência quase sempre termina nisso.",
                "draconata": "Ele não me parece inocente. Só finalmente consciente do tamanho da própria falha.",
                "arqueiro": "Homem cansado, mãos trêmulas, olhos fundos. Já vi culpa com esse rosto.",
                "arqueira": "Se ele realmente quer corrigir parte disso, ótimo. Ainda assim, não merece confiança fácil.",
                "mago": "Necromante arrependido é, ao mesmo tempo, fonte valiosa e risco evidente.",
                "maga": "O mais terrível é que ele parece ter aprendido exatamente o que não deveria ter existido para aprender.",
                "leonide.m": "Há pecados que não podem ser desfeitos, mas ainda podem ser interrompidos.",
                "leonide.f": "Ele carrega a exaustão de quem já se julgou por dentro cem vezes.",
                "halfling.m": "Claro. Homem que mexe com mortos e agora quer “ajudar”. Isso nunca fica simples.",
                "halfling.f": "Os culpados sempre soam mais sinceros quando o fogo já alcançou a própria porta.",
                "druida.m": "Quem rompe o ciclo da morte fere a terra de um jeito que leva eras para cicatrizar.",
                "druida.f": "Ele parece menos vivo do que os mortos que criou.",
                "monge.m": "Conheço o peso do remorso em quem finalmente entende o que fez com a própria força.",
                "monge.f": "Alguns buscam perdão. Outros só buscam que alguém impeça a continuação de si mesmos."
            },
            escolha: {
                pergunta: "Confiar nele?",
                opcoes: [
                    criarOpcaoNarrativa({
                        texto: "🤝 Aceitar ajuda",
                        rota: "heroi",
                        pesoRota: 1,
                        resultadoTexto: "Você decide acreditar que alguém pode tentar reparar o mal que causou. O necromante o conduz por criptas e corredores invisíveis aos olhos comuns, marca pontos fracos dos mortos-vivos e desfaz parte dos vínculos que os mantêm erguidos.",
                        recompensaTexto: "❤️ +2 Vigor | Combates mais fáceis nesta área | Alinhamento Heroico",
                        iconeResultado: "🤝",
                        vozResultado: criarNomeArquivoVoz(6, "cena2", "resultado_heroi"),
                        onEscolha: function() {
                            adicionarPontoRota("heroi", 1);
                            player.vigor += 2;
                            if (typeof aplicarBonusEquipamentos === "function") aplicarBonusEquipamentos();
                            if (typeof updateUI === "function") updateUI();
                        }
                    }),
                    criarOpcaoNarrativa({
                        texto: "🔮 Forçá-lo a revelar segredos",
                        rota: "sombrio",
                        pesoRota: 1,
                        resultadoTexto: "Você não confia em arrependimento vindo tarde demais. Sob ameaça, pressão ou magia, força o necromante a abrir seu grimório e revelar fórmulas, nomes e mecanismos dos rituais dos Eternos.",
                        recompensaTexto: "🔮 +3 Inteligência | Alinhamento Sombrio",
                        iconeResultado: "🔮",
                        vozResultado: criarNomeArquivoVoz(6, "cena2", "resultado_sombrio"),
                        onEscolha: function() {
                            adicionarPontoRota("sombrio", 1);
                            player.inteligencia += 3;
                            if (typeof aplicarBonusEquipamentos === "function") aplicarBonusEquipamentos();
                            if (typeof updateUI === "function") updateUI();
                        }
                    }),
                    criarOpcaoNarrativa({
                        texto: "⚔️ Eliminá-lo por segurança",
                        rota: "neutro",
                        pesoRota: 1,
                        resultadoTexto: "Você não aceita risco. Nem promessa. Nem arrependimento.\n\nO golpe é rápido. O necromante mal ergue a mão para se defender. Quando cai, o grimório escorrega e se abre no chão, revelando páginas repletas de nomes riscados e tentativas inacabadas de desfazer os próprios rituais.",
                        recompensaTexto: "⚔️ +2 Força | Alinhamento Neutro",
                        iconeResultado: "⚔️",
                        vozResultado: criarNomeArquivoVoz(6, "cena2", "resultado_neutro"),
                        onEscolha: function() {
                            adicionarPontoRota("neutro", 1);
                            player.forca += 2;
                            if (typeof aplicarBonusEquipamentos === "function") aplicarBonusEquipamentos();
                            if (typeof updateUI === "function") updateUI();
                        }
                    })
                ]
            },
            vozNarrador: criarNomeArquivoVoz(6, "cena2", "narrador"),
            vozFala: criarNomeArquivoVoz(6, "cena2", "fala")
        }),

        criarCenaNarrativaBase({
            id: "cap6_cena3",
            tipo: "secundaria",
            titulo: "O portal dos que não partiram",
            icone: "👁️",
            narrador: "Narrador",
            texto: "Nas profundezas do cemitério, atrás de um mausoléu afundado, o núcleo do portal pulsa como uma pupila feita de névoa e cinza. Rostos surgem e desaparecem em sua superfície, como se almas inteiras estivessem presas no ato de atravessar sem nunca conseguir.",
            pensamentosArquetipo: {
                guerreiro: "Já enfrentei muitos inimigos. Poucos tão errados quanto isso.",
                paladino: "Um portal alimentado por almas é heresia em forma pura.",
                arqueiro: "Nem olhar demais para isso parece seguro.",
                mago: "É repulsivo. E ao mesmo tempo engenhosamente terrível.",
                clerigo: "Isso não prende apenas mortos. Prende despedidas.",
                ladino: "Se existe pior combustível do que ouro sujo, é alma presa.",
                druida: "Vida, morte e passagem foram arrancadas de seus lugares.",
                monge: "Dor contínua sempre deforma o espaço onde insiste em permanecer."
            },
            vozNarrador: criarNomeArquivoVoz(6, "cena3", "narrador")
        }),

        criarCenaNarrativaBase({
            id: "cap6_cena4",
            tipo: "chave",
            titulo: "Eles observam",
            icone: "👁️",
            narrador: "Narrador",
            texto: "Quando você emerge das catacumbas, o céu sobre o cemitério parece escuro demais mesmo para o fim do dia. Corvos se aglomeram sobre cruzes antigas. O vento leva sussurros que não pertencem aos vivos.\n\nPor um momento, você sente com absoluta clareza que não está sozinho.\n\nNão apenas seguido.\n\nObservado.",
            pensamentosPersonagem: {
                "guerreiro": "Então acabou a parte em que eu podia fingir que ainda tinha surpresa ao meu favor.",
                "guerreira": "Ótimo. Que olhem. Não foram eles que cavaram até aqui por mim.",
                "draconato": "Se as trevas me veem, que aprendam também a reconhecer resistência.",
                "draconata": "Ser observada por eles não muda meu caminho. Só confirma a proximidade do centro.",
                "arqueiro": "Caçador visto precisa se mover melhor. Só isso.",
                "arqueira": "Que saibam quem está desfazendo o trabalho deles. Isso também tem valor.",
                "mago": "Monitoramento ativo da rede. A teoria está praticamente confirmada agora.",
                "maga": "Essa sensação... não é medo. É a certeza de ter entrado no campo de visão de algo antigo demais.",
                "leonide.m": "Há males que espreitam em silêncio porque ainda não foram confrontados direito. Agora foram.",
                "leonide.f": "O olhar deles é frio. Mas não mais frio do que o que sinto respondendo de volta.",
                "halfling.m": "Excelente. Agora não sou só azarado. Sou oficialmente relevante para o culto apocalíptico.",
                "halfling.f": "Ser notada pelo inimigo significa que eu finalmente deixei de ser descartável.",
                "druida.m": "A ferida reage sempre que alguém começa a fechá-la de verdade.",
                "druida.f": "É como se a própria noite tivesse virado o rosto na minha direção.",
                "monge.m": "Quando o inimigo deixa de ser hipótese e passa a ser presença, a disciplina precisa ficar mais rígida.",
                "monge.f": "Todo olhar vindo do abismo carrega a esperança de que você vacile primeiro."
            },
            vozNarrador: criarNomeArquivoVoz(6, "cena4", "narrador")
        })
    ]
});

// ============================================
// SEÇÃO 39: CAPÍTULO 7 — NAS PROFUNDEZAS
// ============================================

registrarCapituloNarrativo("capitulo_7_caverna", {
    id: 7,
    titulo: "Nas Profundezas",
    area: "caverna",
    cenas: [

        criarCenaNarrativaBase({
            id: "cap7_cena1",
            tipo: "secundaria",
            titulo: "O mundo de baixo",
            icone: "🕳️",
            narrador: "Narrador",
            texto: "A entrada da Caverna Profunda parecia menos uma passagem e mais uma boca aberta na terra. O ar que vinha de dentro era frio, pesado e velho demais. Cada passo adiante afastava luz, calor e céu.\n\nLá embaixo, o som se comportava de forma errada. Ecos chegavam antes das causas. Pedras rolavam sem serem tocadas. E algo, muito distante, parecia respirar através da montanha.",
            pensamentosArquetipo: {
                guerreiro: "Lugar perfeito para luta ruim e retirada pior ainda.",
                paladino: "A ausência de luz não é o problema. O que aprendeu a viver sem ela, sim.",
                arqueiro: "Eco falso, ângulo morto e pouca distância. Odeio tudo nisso.",
                mago: "As profundezas concentram energia antiga com facilidade desconfortável.",
                clerigo: "Mesmo debaixo da terra, ainda há quem resista. Isso importa.",
                ladino: "Quanto mais fundo, mais caro costuma ser o erro.",
                druida: "Até o subsolo tem seu próprio equilíbrio. E este foi violado.",
                monge: "Escuridão externa sempre tenta negociar com a interna."
            },
            vozNarrador: criarNomeArquivoVoz(7, "cena1", "narrador")
        }),

        criarCenaNarrativaBase({
            id: "cap7_cena2",
            tipo: "chave",
            titulo: "O povo que ainda resiste",
            icone: "⛏️",
            narrador: "Narrador",
            texto: "Depois de atravessar corredores estreitos, pontes de pedra e salões naturais maiores do que fortalezas, você encontra sinais de vida organizada: trilhos de mineração, lampiões protegidos por vidro grosso, barricadas improvisadas e marcas de martelo em rochas reforçadas.\n\nAnões.\n\nUma pequena comunidade subterrânea sobrevive ali, cercada por monstros e pela expansão de algo pior.",
            fala: {
                nome: "Anão Guardião",
                texto: "Forasteiro. Se desceu até aqui, então ou perdeu o juízo... ou tem motivo.\n\nAs coisas das profundezas ficaram mais agressivas. Piores. E um dragão tomou a câmara abaixo. Guarda algo que pulsa como os cristais negros que encontramos em ruínas antigas."
            },
            pensamentosPersonagem: {
                "guerreiro": "É sempre assim. Quando a guerra cresce, alguém segura a linha em algum lugar esquecido.",
                "guerreira": "Anões cercados, pedra sob pressão, ferramentas virando armas. Isso eu entendo bem demais.",
                "draconato": "Mesmo debaixo da terra, ainda há quem escolha proteger em vez de fugir. Isso importa.",
                "draconata": "Toda resistência organizada me lembra que o mundo ainda não se curvou por completo.",
                "arqueiro": "Sobrevivência aqui não parece heroísmo. Parece rotina amarga.",
                "arqueira": "Eles não estão lutando por glória. Estão lutando para continuar existindo. Costuma ser o tipo mais sério de guerra.",
                "mago": "Se até comunidades subterrâneas reconhecem o padrão da corrupção, a crise já é incontornável.",
                "maga": "A guerra alcançou até quem vivia longe do céu. Isso diz muito sobre a força da rede.",
                "leonide.m": "Resistência humilde costuma ter mais dignidade do que muitos tronos.",
                "leonide.f": "Há esperança até aqui. Fadigada, ferida... mas ainda em pé.",
                "halfling.m": "Quando até anão subterrâneo parece cansado demais para desconfiar direito, a situação está realmente feia.",
                "halfling.f": "Gente encurralada fala pouco e mede muito. Faz bem.",
                "druida.m": "A terra ainda sustenta os que tentam defendê-la. Mesmo nas profundezas.",
                "druida.f": "É estranho como até em lugares de sombra a vida ainda tenta se organizar em cuidado.",
                "monge.m": "Resistir sem espetáculo é uma forma de força que respeito.",
                "monge.f": "Os que suportam o cerco por tempo demais deixam de lutar por vitória. Lutam por permanência."
            },
            escolha: {
                pergunta: "Ajudar os anões?",
                opcoes: [
                    criarOpcaoNarrativa({
                        texto: "⚔️ Lutar ao lado deles",
                        rota: "heroi",
                        pesoRota: 1,
                        resultadoTexto: "Você aceita sem barganha. Ao lado dos anões, enfrenta criaturas que rastejam das fendas, repele investidas no corredor principal e segura uma barricada por tempo suficiente para que civis recuem.\n\nQuando o combate termina, o respeito entre vocês não é falado. É entendido.",
                        recompensaTexto: "⚔️ +3 Força | Alinhamento Heroico",
                        iconeResultado: "⚔️",
                        vozResultado: criarNomeArquivoVoz(7, "cena2", "resultado_heroi"),
                        onEscolha: function() {
                            adicionarPontoRota("heroi", 1);
                            player.forca += 3;
                            if (typeof aplicarBonusEquipamentos === "function") aplicarBonusEquipamentos();
                            if (typeof updateUI === "function") updateUI();
                        }
                    }),
                    criarOpcaoNarrativa({
                        texto: "💰 Pedir pagamento primeiro",
                        rota: "neutro",
                        pesoRota: 1,
                        resultadoTexto: "Você aceita ajudar, mas deixa claro que risco tem preço. Os anões não gostam — e não escondem isso —, mas também sabem que desespero reduz espaço para orgulho.\n\nUm baú de emergência é aberto, e parte de suas reservas é colocada diante de você.",
                        recompensaTexto: "💰 +500 ouro | Alinhamento Neutro",
                        iconeResultado: "💰",
                        vozResultado: criarNomeArquivoVoz(7, "cena2", "resultado_neutro"),
                        onEscolha: function() {
                            adicionarPontoRota("neutro", 1);
                            player.gold += 500;
                            if (typeof updateUI === "function") updateUI();
                        }
                    }),
                    criarOpcaoNarrativa({
                        texto: "🗡️ Saquear enquanto lutam",
                        rota: "sombrio",
                        pesoRota: 1,
                        resultadoTexto: "Enquanto os defensores anões seguram uma investida em outro corredor, você se afasta sob o pretexto de explorar uma rota alternativa. Em depósitos laterais, encontra artefatos, metais e itens de valor guardados para tempos desesperados.\n\nVocê leva o que pode.",
                        recompensaTexto: "🏹 +3 Destreza | Alinhamento Sombrio",
                        iconeResultado: "🗡️",
                        vozResultado: criarNomeArquivoVoz(7, "cena2", "resultado_sombrio"),
                        onEscolha: function() {
                            adicionarPontoRota("sombrio", 1);
                            player.destreza += 3;
                            if (typeof aplicarBonusEquipamentos === "function") aplicarBonusEquipamentos();
                            if (typeof updateUI === "function") updateUI();
                        }
                    })
                ]
            },
            vozNarrador: criarNomeArquivoVoz(7, "cena2", "narrador"),
            vozFala: criarNomeArquivoVoz(7, "cena2", "fala")
        }),

        criarCenaNarrativaBase({
            id: "cap7_cena3",
            tipo: "chave",
            titulo: "O dragão das profundezas",
            icone: "🐲",
            narrador: "Narrador",
            texto: "A câmara final das profundezas é imensa, sustentada por colunas naturais e cortada por fissuras que descem até onde a luz não alcança. No centro, sobre um círculo de cristais negros e ossos antigos, repousa a criatura que domina o subsolo.\n\nUm dragão.\n\nNão majestoso. Não nobre. Antigo, ferido e corrompido.",
            fala: {
                nome: "Dragão das Profundezas",
                texto: "Eles... abriram... o fundo... do mundo...\n\nE me prenderam... para guardar."
            },
            pensamentosPersonagem: {
                "guerreiro": "Já enfrentei comandantes quebrados pela guerra. Este foi acorrentado a ela.",
                "guerreira": "Não é rei das profundezas. É prisioneiro vestido de monstro.",
                "draconato": "Guardião corrompido ainda pode guardar a verdade de como foi corrompido.",
                "draconata": "Pior do que cair para as trevas é ser preso para servi-las consciente disso.",
                "arqueiro": "Ele fala como animal ferido e sentinela condenada ao mesmo tempo.",
                "arqueira": "Não gosto de matar criaturas que claramente já foram transformadas em instrumento.",
                "mago": "Então a rede não usa apenas lugares. Também subjuga seres capazes de sustentá-la.",
                "maga": "Esse dragão não protege o selo por devoção. Protege porque a dor dele foi amarrada ao núcleo.",
                "leonide.m": "Há misericórdia até no combate, quando o combate é a única forma de libertar.",
                "leonide.f": "O sofrimento dele ecoa antes mesmo do rugido.",
                "halfling.m": "Ótimo. Dragão antigo, câmara ritual e cristal negro. Isso está ficando quase caricaturalmente perigoso.",
                "halfling.f": "Quanto mais eu vejo, mais a palavra “guarda” parece só outra forma de dizer “escravizado”.",
                "druida.m": "Uma criatura tão antiga ligada à rede... a ferida é mais funda do que pensei.",
                "druida.f": "Até um ser tão grandioso pode ser reduzido à função de corrente viva. Isso é brutal.",
                "monge.m": "Conheço o horror de sentir a própria força servindo algo que não escolhi.",
                "monge.f": "Há destinos piores que a morte. Vigiar o erro alheio por eras é um deles."
            },
            vozNarrador: criarNomeArquivoVoz(7, "cena3", "narrador"),
            vozFala: criarNomeArquivoVoz(7, "cena3", "fala")
        }),

        criarCenaNarrativaBase({
            id: "cap7_cena4",
            tipo: "secundaria",
            titulo: "Mais um selo, mais uma guerra",
            icone: "⚡",
            narrador: "Narrador",
            texto: "Com a queda do dragão, a energia que pulsava na câmara perde estabilidade. Os cristais racham, luz negra escapa em fios curtos e o chão vibra em resposta ao rompimento do elo.\n\nAo deixar as profundezas, os anões observam em silêncio. Alguns baixam a cabeça em respeito. Outros olham para o túnel escuro como quem sabe que a vitória de hoje não encerra nada.",
            pensamentosArquetipo: {
                guerreiro: "Vitória local. Guerra maior. O padrão está claro.",
                paladino: "Cada selo fechado é um passo de luz — e um desafio maior lançado às trevas.",
                arqueiro: "Quanto mais fundo vou, menos isso parece missão isolada.",
                mago: "A rede responde como organismo. Isso é cada vez mais evidente.",
                clerigo: "Se até os subterrâneos sofrem, ninguém está fora desta guerra.",
                ladino: "Ótimo. Então o problema tem alcance continental e péssimo senso de limites.",
                druida: "O mundo inteiro está ligado por esta ferida. Agora já não há dúvida.",
                monge: "Reconhecer a escala do conflito é parte de não ser esmagado por ela."
            },
            vozNarrador: criarNomeArquivoVoz(7, "cena4", "narrador")
        })
    ]
});

// ============================================
// SEÇÃO 40: CAPÍTULO 8 — FORJA DO INFERNO
// ============================================

registrarCapituloNarrativo("capitulo_8_vulcao", {
    id: 8,
    titulo: "Forja do Inferno",
    area: "vulcao",
    cenas: [

        criarCenaNarrativaBase({
            id: "cap8_cena1",
            tipo: "secundaria",
            titulo: "A montanha em chamas",
            icone: "🌋",
            narrador: "Narrador",
            texto: "O Vulcão Infernal não era apenas uma montanha. Era uma ferida acesa no horizonte.\n\nRios de lava riscavam a pedra negra como veias expostas. O ar queimava a garganta. Cinzas caiam do céu em flocos quentes, cobrindo trilhas e cadáveres de criaturas que haviam chegado perto demais.",
            pensamentosArquetipo: {
                guerreiro: "Lugar onde até o terreno ataca.",
                paladino: "Fogo pode purificar. Aqui foi ensinado a corromper.",
                arqueiro: "Calor demais, fumaça demais, cobertura de menos.",
                mago: "Energia bruta assim explica por que os Eternos escolheram este lugar.",
                clerigo: "Quando a criação parece odiar a própria forma, algo profano está em ação.",
                ladino: "Nem monstros precisam me matar aqui. O clima já está tentando.",
                druida: "Isso não é apenas força natural. É força natural forçada para além do equilíbrio.",
                monge: "Suportar o ambiente já é parte da prova."
            },
            vozNarrador: criarNomeArquivoVoz(8, "cena1", "narrador")
        }),

        criarCenaNarrativaBase({
            id: "cap8_cena2",
            tipo: "chave",
            titulo: "A fênix sombria",
            icone: "🐦‍🔥",
            narrador: "Narrador",
            texto: "Próximo ao cume, onde o calor distorce a própria visão, uma silhueta desce do céu em meio a faíscas negras. Asas abertas. Garras de fogo. Pena e brasa.\n\nUma fênix.\n\nMas corrompida por algo mais velho que chama.",
            fala: {
                nome: "Fênix Sombria",
                texto: "O que você busca custará tudo que é."
            },
            pensamentosPersonagem: {
                "guerreiro": "Provação em forma de fogo. Ótimo. Pelo menos ela não esconde o que está fazendo.",
                "guerreira": "Se uma ave de fogo resolveu me julgar no alto de um vulcão, a jornada já passou do razoável faz tempo.",
                "draconato": "Há criaturas feitas para testar o que carregamos de mais puro ou de mais falso.",
                "draconata": "Ela não guarda passagem. Guarda verdade.",
                "arqueiro": "Predadores costumam medir medo. Esta mede intenção.",
                "arqueira": "Gosto ainda menos quando algo antigo me observa como se já soubesse o que direi.",
                "mago": "Magnífico. Terrível, mas magnificamente coerente com este lugar.",
                "maga": "Ela parece menos interessada em barrar meu caminho do que em classificar minha alma.",
                "leonide.m": "Nem toda criatura em chamas serve à luz. Nem toda prova em chamas é injusta.",
                "leonide.f": "Há sentença nos olhos dela antes mesmo da resposta.",
                "halfling.m": "Claro. Até a ave infernal quer conversa filosófica antes de me deixar seguir.",
                "halfling.f": "Quando o mundo quer te medir, sempre escolhe o pior cenário possível para isso.",
                "druida.m": "Fogo também julga. Principalmente quando foi distorcido e ainda assim preserva instinto antigo.",
                "druida.f": "Ela ainda carrega beleza, mesmo corrompida. Isso a torna mais triste e mais perigosa.",
                "monge.m": "Responder à verdade sobre o próprio desejo costuma doer mais do que combate.",
                "monge.f": "Algumas guardiãs não perguntam o que você faz. Perguntam quem você se tornou fazendo."
            },
            escolha: {
                pergunta: "Como responder à fênix?",
                opcoes: [
                    criarOpcaoNarrativa({
                        texto: "🙏 “Busco proteger os vivos.”",
                        rota: "heroi",
                        pesoRota: 2,
                        resultadoTexto: "Você responde sem hesitação. A fênix inclina a cabeça, e as chamas ao redor deixam de rugir por um breve instante.\n\nEla abre as asas, e uma onda de calor o atravessa sem ferir. Em vez de dor, você sente vigor.",
                        recompensaTexto: "📖 +3 Sabedoria | ❤️ +100 HP | Alinhamento Heroico",
                        iconeResultado: "🙏",
                        vozResultado: criarNomeArquivoVoz(8, "cena2", "resultado_heroi"),
                        onEscolha: function() {
                            adicionarPontoRota("heroi", 2);
                            player.sabedoria += 3;
                            player.hp = Math.min(player.maxHp, player.hp + 100);
                            if (typeof aplicarBonusEquipamentos === "function") aplicarBonusEquipamentos();
                            if (typeof updateUI === "function") updateUI();
                        }
                    }),
                    criarOpcaoNarrativa({
                        texto: "⚔️ “Busco poder para vencer.”",
                        rota: "neutro",
                        pesoRota: 1,
                        resultadoTexto: "Sua resposta é direta, sem nobreza fingida. A fênix o encara longamente, e o vento quente gira ao redor como se pesasse sua honestidade.\n\nFaíscas se prendem à sua pele e desaparecem. Você sente seu corpo reagir, mais resistente.",
                        recompensaTexto: "❤️ +3 Vigor | Alinhamento Neutro",
                        iconeResultado: "⚔️",
                        vozResultado: criarNomeArquivoVoz(8, "cena2", "resultado_neutro"),
                        onEscolha: function() {
                            adicionarPontoRota("neutro", 1);
                            player.vigor += 3;
                            if (typeof aplicarBonusEquipamentos === "function") aplicarBonusEquipamentos();
                            if (typeof updateUI === "function") updateUI();
                        }
                    }),
                    criarOpcaoNarrativa({
                        texto: "💀 “Busco dominar tudo.”",
                        rota: "sombrio",
                        pesoRota: 2,
                        resultadoTexto: "A fênix ri. Um som terrível, belo e cruel ao mesmo tempo.\n\nEla avança e toca seu peito com fogo escuro. A dor é brutal, mas rápida. Quando passa, sua força aumentou — e algo em sua vitalidade diminuiu como preço inevitável.",
                        recompensaTexto: "⚔️ +4 Força | 💔 -20 HP Máx | Alinhamento Sombrio",
                        iconeResultado: "💀",
                        vozResultado: criarNomeArquivoVoz(8, "cena2", "resultado_sombrio"),
                        onEscolha: function() {
                            adicionarPontoRota("sombrio", 2);
                            player.forca += 4;
                            player.baseMaxHp = Math.max(1, player.baseMaxHp - 20);
                            if (typeof aplicarBonusEquipamentos === "function") aplicarBonusEquipamentos();
                            player.hp = Math.min(player.hp, player.maxHp);
                            if (typeof updateUI === "function") updateUI();
                        }
                    })
                ]
            },
            vozNarrador: criarNomeArquivoVoz(8, "cena2", "narrador"),
            vozFala: criarNomeArquivoVoz(8, "cena2", "fala")
        }),

        criarCenaNarrativaBase({
            id: "cap8_cena3",
            tipo: "secundaria",
            titulo: "O coração do vulcão",
            icone: "🔥",
            narrador: "Narrador",
            texto: "No interior do vulcão, além de rochas fundidas e passagens estreitas sobre lava viva, você encontra o núcleo ritual dos Eternos naquela região. É menos um portal visível e mais uma forja de passagem: uma estrutura capaz de enfraquecer o limite entre mundos usando calor, pressão e sacrifício.",
            pensamentosArquetipo: {
                guerreiro: "Eles transformaram um desastre natural em fortaleza ritual.",
                paladino: "Profanaram fogo, metal e sacrifício de uma vez.",
                arqueiro: "Lugar ruim para lutar e pior ainda para hesitar.",
                mago: "É uma forja de ruptura. Crua, brutal e eficiente.",
                clerigo: "Se até o fogo serve à corrupção, então nada foi poupado.",
                ladino: "Sempre impressiona quando alguém investe tanto esforço em fazer a pior coisa possível.",
                druida: "O vulcão não quis isso. Foi dobrado a servir.",
                monge: "Poder sem medida sempre consome o recipiente junto."
            },
            vozNarrador: criarNomeArquivoVoz(8, "cena3", "narrador")
        }),

        criarCenaNarrativaBase({
            id: "cap8_cena4",
            tipo: "chave",
            titulo: "O tremor",
            icone: "🌍",
            narrador: "Narrador",
            texto: "Quando o elo vulcânico é destruído, o chão treme com violência. Rochas despencam. Fissuras se abrem. O céu acima do cume se tinge de vermelho e preto.\n\nMas isso não parece mero desabamento local.\n\nÉ maior.\n\nMuito maior.",
            pensamentosPersonagem: {
                "guerreiro": "O campo inteiro respondeu. Isso não foi vitória local — foi mensagem.",
                "guerreira": "Se fechar um elo faz o mundo inteiro ranger, então a estrutura dessa coisa está mais funda do que qualquer mina.",
                "draconato": "Cada selo rompido em favor da luz também força a escuridão a reagir mais rápido.",
                "draconata": "É isso. Estávamos certos e errados ao mesmo tempo. Precisamos fechar a rede — e isso acelera o despertar.",
                "arqueiro": "Agora entendo por que o perigo parece crescer junto com nosso avanço.",
                "arqueira": "Salvar o mundo e acordar o inimigo ao mesmo tempo. Sempre odiei guerras assim.",
                "mago": "Paradoxo confirmado. Desmontar o sistema também o desestabiliza em direção ao colapso final.",
                "maga": "Era por isso que o poder por trás dos portais parecia me sentir cada vez mais perto.",
                "leonide.m": "Às vezes a cura dói mais à medida que finalmente alcança a infecção central.",
                "leonide.f": "As vozes não ficaram mais fortes por acaso. Estão reagindo aos elos caindo.",
                "halfling.m": "Excelente. Então cada vez que resolvemos o problema, empurramos a próxima crise para mais perto.",
                "halfling.f": "Não dá mais para romantizar. Estamos trabalhando contra o tempo e alimentando a própria contagem.",
                "druida.m": "Fechar a ferida obriga o corpo do mundo a reagir violentamente. Faz sentido. Ainda assim, assusta.",
                "druida.f": "O grito do vulcão parecia vir de muito além dele. Como se o mundo inteiro tivesse estremecido junto.",
                "monge.m": "Quando o remédio se parece com veneno no curto prazo, a disciplina precisa segurar a decisão.",
                "monge.f": "Há finais que se apressam justamente porque alguém começou a impedir que continuassem adiados."
            },
            vozNarrador: criarNomeArquivoVoz(8, "cena4", "narrador")
        })
    ]
});

// ============================================
// SEÇÃO 41: CAPÍTULO 9 — O INVERNO ETERNO
// ============================================

registrarCapituloNarrativo("capitulo_9_geleira", {
    id: 9,
    titulo: "O Inverno Eterno",
    area: "geleira",
    cenas: [

        criarCenaNarrativaBase({
            id: "cap9_cena1",
            tipo: "secundaria",
            titulo: "Onde tudo começou",
            icone: "🏔️",
            narrador: "Narrador",
            texto: "A Geleira Eterna era um reino de silêncio branco e pedra congelada. O vento cortava como lâmina. O gelo rangia sob os pés como se estivesse vivo, velho e cansado de sustentar segredos.\n\nSegundo fragmentos reunidos até ali, aquele era o mais antigo templo dos Eternos.\n\nTalvez o primeiro.",
            pensamentosArquetipo: {
                guerreiro: "Lugar antigo, difícil de invadir e ainda pior de tomar. Faz sentido como origem.",
                paladino: "Quanto mais antigo o templo, mais fundo o pecado costuma estar enterrado.",
                arqueiro: "Frio, branco e silencioso. Péssimo para confiar nos próprios olhos.",
                mago: "Os símbolos aqui são mais completos. Isso muda tudo.",
                clerigo: "Às vezes o primeiro erro é o que mais demora a morrer.",
                ladino: "Se este é o começo de tudo, então alguém teve gosto refinado para esconder desastre.",
                druida: "Até o gelo preserva corrupção quando ela é plantada fundo o suficiente.",
                monge: "Origem não significa pureza. Só significa começo."
            },
            vozNarrador: criarNomeArquivoVoz(9, "cena1", "narrador")
        }),

        criarCenaNarrativaBase({
            id: "cap9_cena2",
            tipo: "chave",
            titulo: "O último guardião",
            icone: "⛰️",
            narrador: "Narrador",
            texto: "Diante da entrada principal do templo congelado, ergue-se uma figura colossal feita de carne, gelo e idade.\n\nUm gigante.\n\nSua pele parece pedra glacial, seus olhos carregam séculos e sua voz sai lenta, como avalanche distante.",
            fala: {
                nome: "Gigante de Gelo",
                texto: "Milênios.\n\nPassei milênios guardando esta porta. Esperando um deus que nunca veio. Servindo mestres que viraram pó."
            },
            pensamentosPersonagem: {
                "guerreiro": "Já vi veteranos carregarem ordens por tempo demais. Nunca por milênios.",
                "guerreira": "Guardião antigo, cansado e preso a ordem morta. Não sei se isso é honra ou castigo.",
                "draconato": "Todo juramento que sobrevive à fé original corre o risco de virar prisão sagrada.",
                "draconata": "Há algo profundamente triste em ver um guardião permanecer depois que até o propósito apodreceu.",
                "arqueiro": "Ele não tem cheiro de emboscada. Tem cheiro de fim adiado.",
                "arqueira": "Guerreiro cansado é mais perigoso do que furioso. Já não espera muito além do golpe final.",
                "mago": "Testemunha viva da origem da rede. E esgotada demais para continuar negando isso.",
                "maga": "Ele guarda a porta há tanto tempo que talvez já tenha esquecido a própria vida antes dela.",
                "leonide.m": "Há uma diferença entre dever e martírio. Ele ultrapassou essa linha eras atrás.",
                "leonide.f": "Ele não me assusta como inimigo. Me pesa como lamento.",
                "halfling.m": "Eu sempre soube que guarda de porta antiga seria problema. Só não esperava um problema filosófico e enorme.",
                "halfling.f": "Quando alguém continua servindo depois que todo o resto já morreu, sobra mais vazio do que lealdade.",
                "druida.m": "Ser mantido contra o fluxo natural do tempo é outra forma de violência.",
                "druida.f": "O frio ao redor dele parece menos gelo e mais exaustão cristalizada.",
                "monge.m": "Reconheço a fadiga de quem ainda está de pé só porque nunca lhe deram permissão para cair.",
                "monge.f": "Alguns guardiões não vigiam entrada nenhuma. Vigiam o próprio sentido de continuar."
            },
            escolha: {
                pergunta: "O que dizer ao gigante?",
                opcoes: [
                    criarOpcaoNarrativa({
                        texto: "🤝 “Descanse, eu termino isso.”",
                        rota: "heroi",
                        pesoRota: 2,
                        resultadoTexto: "Você não ergue a arma. Não primeiro. Suas palavras atravessam o frio melhor do que aço atravessaria carne.\n\nO gigante o encara por longos segundos. Então, lentamente, ajoelha-se. O gelo ao redor estala como se o próprio templo reagisse à decisão.",
                        recompensaTexto: "📖 +3 Sabedoria | ❤️ +3 Vigor | Alinhamento Heroico",
                        iconeResultado: "🤝",
                        vozResultado: criarNomeArquivoVoz(9, "cena2", "resultado_heroi"),
                        onEscolha: function() {
                            adicionarPontoRota("heroi", 2);
                            player.sabedoria += 3;
                            player.vigor += 3;
                            if (typeof aplicarBonusEquipamentos === "function") aplicarBonusEquipamentos();
                            if (typeof updateUI === "function") updateUI();
                        }
                    }),
                    criarOpcaoNarrativa({
                        texto: "⚔️ “Saia do caminho ou morra.”",
                        rota: "neutro",
                        pesoRota: 1,
                        resultadoTexto: "Você escolhe firmeza absoluta. O gigante fecha os olhos por um instante, como quem lamenta que o fim precise vir assim.\n\nEntão se ergue.\n\nA luta que segue é pesada, lenta e monumental.",
                        recompensaTexto: "📘 +500 XP | Alinhamento Neutro",
                        iconeResultado: "⚔️",
                        vozResultado: criarNomeArquivoVoz(9, "cena2", "resultado_neutro"),
                        onEscolha: function() {
                            adicionarPontoRota("neutro", 1);
                            if (typeof ganharExp === "function") ganharExp(500);
                            if (typeof updateUI === "function") updateUI();
                        }
                    }),
                    criarOpcaoNarrativa({
                        texto: "🔮 “Dê-me seu poder.”",
                        rota: "sombrio",
                        pesoRota: 2,
                        resultadoTexto: "Você sente a antiguidade daquela criatura e escolhe tomá-la para si. O gigante o observa com uma tristeza tão funda quanto o gelo ao redor.\n\nVocê drena sua essência glacial. O frio invade seus ossos, mas em vez de paralisá-lo, organiza sua mente em clareza cortante.",
                        recompensaTexto: "🔮 +4 Inteligência | Alinhamento Sombrio",
                        iconeResultado: "🔮",
                        vozResultado: criarNomeArquivoVoz(9, "cena2", "resultado_sombrio"),
                        onEscolha: function() {
                            adicionarPontoRota("sombrio", 2);
                            player.inteligencia += 4;
                            if (typeof aplicarBonusEquipamentos === "function") aplicarBonusEquipamentos();
                            if (typeof updateUI === "function") updateUI();
                        }
                    })
                ]
            },
            vozNarrador: criarNomeArquivoVoz(9, "cena2", "narrador"),
            vozFala: criarNomeArquivoVoz(9, "cena2", "fala")
        }),

        criarCenaNarrativaBase({
            id: "cap9_cena3",
            tipo: "chave",
            titulo: "O templo original",
            icone: "❄️",
            narrador: "Narrador",
            texto: "Dentro do templo, tudo confirma a suspeita mais desconfortável: foi ali que grande parte da estrutura dos Eternos nasceu. Mapas mais antigos. Rituais mais completos. Diagramas da rede em estado quase puro.\n\nNo centro, sob uma cúpula de gelo azul, repousa um selo antigo rachado.\n\nO primeiro grande erro.",
            pensamentosPersonagem: {
                "guerreiro": "Então o centro da guerra foi desenhado aqui muito antes de qualquer reino atual erguer muralha.",
                "guerreira": "Não é ruína improvisada. É projeto. Isso muda tudo.",
                "draconato": "O erro original raramente parece monstruoso quando nasce. Parece inevitável, até convincente.",
                "draconata": "É pior do que pensei. Não foi desvio de fé. Foi sistema deliberado desde cedo.",
                "arqueiro": "Quanto mais perto da origem, menos caos vejo. Só intenção antiga.",
                "arqueira": "Agora ficou impossível fingir que os Eternos só enlouqueceram no caminho. Havia método desde o começo.",
                "mago": "Isto é a espinha dorsal ideológica e estrutural da rede inteira.",
                "maga": "Aqui tudo ressoa mais forte. Como se a primeira nota errada da música ainda estivesse tocando.",
                "leonide.m": "Foi aqui que escolheram chamar controle de salvação.",
                "leonide.f": "As vozes de lugar nenhum parecem mais nítidas aqui. Como se tudo tivesse começado falando baixo.",
                "halfling.m": "Eu adoraria que a origem de tudo fosse menos bem planejada. Seria psicologicamente reconfortante.",
                "halfling.f": "Projeto antigo, disciplina ritual, escala continental. Isso nunca foi delírio pequeno.",
                "druida.m": "A primeira ferida é sempre a mais profunda, mesmo quando outras parecem mais recentes.",
                "druida.f": "Todo sofrimento posterior parece nascer como eco desta decisão inicial.",
                "monge.m": "Quanto mais penso nisso, mais vejo que o pior não foi força sem controle — foi convicção sem freio.",
                "monge.f": "O começo de grandes quedas quase sempre carrega a aparência de grande revelação."
            },
            vozNarrador: criarNomeArquivoVoz(9, "cena3", "narrador")
        }),

        criarCenaNarrativaBase({
            id: "cap9_cena4",
            tipo: "chave",
            titulo: "A metade do caminho",
            icone: "⚠️",
            narrador: "Narrador",
            texto: "Quando você deixa a Geleira Eterna para trás, o céu parece mais vasto e mais vazio ao mesmo tempo. O vento sopra forte, mas não traz paz.\n\nMetade dos portais foi selada.\nMetade da rede caiu.\n\nMas em vez de enfraquecer em silêncio, o mundo responde como corpo que sente o invasor ser arrancado à força.",
            pensamentosPersonagem: {
                "guerreiro": "Metade vencida. Metade restante. Agora a campanha deixa de ser reação e vira confronto direto.",
                "guerreira": "Cheguei longe demais para achar que o resto vai ser menos brutal. Vai ser pior, e pronto.",
                "draconato": "O inimigo perdeu muitos elos. Agora responderá com menos disfarce e mais desespero.",
                "draconata": "Daqui em diante, não restará muito do véu entre missão e destino.",
                "arqueiro": "Até aqui eu seguia rastros. Agora o rastro vai começar a vir na minha direção também.",
                "arqueira": "A primeira metade provou que a ameaça é real. A segunda vai cobrar o preço de tê-la afrontado.",
                "mago": "Metade dos dados reunidos, metade da estrutura derrubada, risco exponencial crescente. O padrão é claro.",
                "maga": "Se até aqui eu estudava o chamado, agora ele vai me responder sem filtro.",
                "leonide.m": "Chegar à metade não alivia. Apenas confirma o tamanho do que ainda falta.",
                "leonide.f": "Há algo diferente no silêncio agora. Menos distante. Mais atento.",
                "halfling.m": "Metade do apocalipse desmontado. Metade restante provavelmente muito mais desagradável. Excelente.",
                "halfling.f": "Passar da metade não dá segurança. Dá responsabilidade.",
                "druida.m": "O mundo já sente diferença. Mas também sente o esforço. Isso pesa.",
                "druida.f": "A dor da terra mudou de tom. Ainda existe, mas agora sabe que alguém a escutou.",
                "monge.m": "O verdadeiro teste começa quando o corpo já está cansado e o caminho ainda exige mais.",
                "monge.f": "Metade do caminho é o momento em que parar parece impossível e continuar parece custar demais."
            },
            vozNarrador: criarNomeArquivoVoz(9, "cena4", "narrador")
        })
    ]
});

// ============================================
// SEÇÃO 42: CAPÍTULO 10 — CIDADE DOS MORTOS
// ============================================

registrarCapituloNarrativo("capitulo_10_cidadeFant", {
    id: 10,
    titulo: "Cidade dos Mortos",
    area: "cidadeFant",
    cenas: [

        criarCenaNarrativaBase({
            id: "cap10_cena1",
            tipo: "secundaria",
            titulo: "Ruas que ainda lembram",
            icone: "👻",
            narrador: "Narrador",
            texto: "A Cidade Fantasma não estava vazia.\n\nEstava presa.\n\nCasas antigas se alinhavam em ruas de pedra cobertas por névoa pálida. Janelas quebradas refletiam luz sem origem visível. Portas balançavam sozinhas. Ao longe, sinos tocavam em horários que o mundo já não seguia havia séculos.",
            pensamentosArquetipo: {
                guerreiro: "Cidade assim não foi só derrotada. Foi quebrada por dentro.",
                paladino: "Essas almas não descansam porque a violência delas ainda não terminou.",
                arqueiro: "Pior do que ruínas vazias são ruínas que continuam repetindo gente.",
                mago: "Isto é memória sustentada por energia, não simples assombração.",
                clerigo: "Nada dói mais do que ver a morte impedida de concluir sua misericórdia.",
                ladino: "Lugar onde até fantasma parece preso à rotina. Isso sim é pesadelo.",
                druida: "A cidade não morreu por completo. Ficou presa no instante do trauma.",
                monge: "Memória sem liberação vira cárcere."
            },
            vozNarrador: criarNomeArquivoVoz(10, "cena1", "narrador")
        }),

        criarCenaNarrativaBase({
            id: "cap10_cena2",
            tipo: "chave",
            titulo: "O prefeito que permaneceu",
            icone: "🏛️",
            narrador: "Narrador",
            texto: "Na antiga praça central, diante de um edifício cívico semi-destruído, uma figura mais nítida do que as demais se forma lentamente. Um homem de postura ereta, vestido com restos de roupas nobres e uma faixa municipal desbotada pelo tempo.\n\nO espírito do antigo prefeito.",
            fala: {
                nome: "Prefeito Fantasma",
                texto: "Você... é diferente.\n\nEles não entendem mais o que aconteceu. Só revivem. Eu ainda lembro.\n\nOs Eternos não nos destruíram apenas. Usaram nossa queda. Nossas mortes alimentaram um dos selos. Nossa dor virou combustível.\n\nVocê pode libertar estas almas... ou usá-las para fechar o portal mais rápido."
            },
            pensamentosPersonagem: {
                "guerreiro": "Líder morto, cidade presa e dever ainda em pé. Já vi isso em homens vivos também.",
                "guerreira": "Até os fantasmas daqui parecem cansados de repetir o próprio fim.",
                "draconato": "Quando até um governante morto ainda tenta proteger seu povo, vale ouvir com seriedade.",
                "draconata": "Há dignidade rara em alguém que permaneceu não por poder, mas por memória.",
                "arqueiro": "Ele não fala como assombração aleatória. Fala como quem segurou a cidade até o último instante.",
                "arqueira": "Responsabilidade não terminou com a morte dele. Isso é admirável e terrível.",
                "mago": "Espírito estável, memória preservada e função cívica mantida. Fascinante... e trágico.",
                "maga": "Ele não é só um fantasma. É uma vontade que se recusou a dissolver.",
                "leonide.m": "Pastores, reis e prefeitos verdadeiros permanecem mesmo quando tudo já caiu.",
                "leonide.f": "É como se a cidade inteira ainda respirasse através da voz dele.",
                "halfling.m": "Prefeito morto ainda administrando ruína. Honestamente, é o governante mais comprometido que encontrei em muito tempo.",
                "halfling.f": "Quando até morto ele ainda tenta dar sentido ao desastre, é porque a cidade merecia melhor.",
                "druida.m": "Algumas consciências se tornam raízes em solo devastado e se recusam a soltar.",
                "druida.f": "A memória dele segura a cidade no lugar como último fio de costura.",
                "monge.m": "Permanecer depois da derrota total exige um tipo de força que quase ninguém reconhece.",
                "monge.f": "Há espíritos que não ficam por apego à vida, mas por recusa em abandonar responsabilidade."
            },
            escolha: {
                pergunta: "Como usar as almas da cidade?",
                opcoes: [
                    criarOpcaoNarrativa({
                        texto: "🙏 Libertá-las com respeito",
                        rota: "heroi",
                        pesoRota: 2,
                        resultadoTexto: "Você recusa qualquer solução que trate os mortos como ferramenta. Em vez disso, percorre a praça, o templo arruinado e o coração do antigo bairro nobre, desfazendo vínculos, rompendo inscrições e devolvendo nomes aos esquecidos.\n\nÀ medida que o ritual se completa, os espíritos deixam de repetir os últimos instantes de vida.",
                        recompensaTexto: "❤️ +4 Vigor | ❤️ +50 HP | Alinhamento Heroico",
                        iconeResultado: "🙏",
                        vozResultado: criarNomeArquivoVoz(10, "cena2", "resultado_heroi"),
                        onEscolha: function() {
                            adicionarPontoRota("heroi", 2);
                            player.vigor += 4;
                            player.hp = Math.min(player.maxHp, player.hp + 50);
                            if (typeof aplicarBonusEquipamentos === "function") aplicarBonusEquipamentos();
                            if (typeof updateUI === "function") updateUI();
                        }
                    }),
                    criarOpcaoNarrativa({
                        texto: "🔮 Usá-las como combustível",
                        rota: "sombrio",
                        pesoRota: 2,
                        resultadoTexto: "Você escolhe o caminho brutalmente eficaz. Reúne as correntes espirituais da cidade e as redireciona para o foco do selo. O portal vacila quase de imediato.\n\nA cidade treme. Gritos ecoam em todas as ruas ao mesmo tempo.",
                        recompensaTexto: "⚔️ +5 Força | 📖 -2 Sabedoria | Alinhamento Sombrio",
                        iconeResultado: "💀",
                        vozResultado: criarNomeArquivoVoz(10, "cena2", "resultado_sombrio"),
                        onEscolha: function() {
                            adicionarPontoRota("sombrio", 2);
                            player.forca += 5;
                            player.sabedoria = Math.max(1, player.sabedoria - 2);
                            if (typeof aplicarBonusEquipamentos === "function") aplicarBonusEquipamentos();
                            if (typeof updateUI === "function") updateUI();
                        }
                    }),
                    criarOpcaoNarrativa({
                        texto: "📜 Pedir que guiem seu caminho",
                        rota: "neutro",
                        pesoRota: 1,
                        resultadoTexto: "Você não força nem liberta de imediato. Em vez disso, pede ajuda. Por um momento, a cidade inteira parece hesitar. Então os espíritos começam a apontar: para cofres escondidos, passagens soterradas, depósitos enterrados e câmaras onde relíquias foram preservadas junto ao medo.",
                        recompensaTexto: "💰 +800 ouro | Alinhamento Neutro",
                        iconeResultado: "📜",
                        vozResultado: criarNomeArquivoVoz(10, "cena2", "resultado_neutro"),
                        onEscolha: function() {
                            adicionarPontoRota("neutro", 1);
                            player.gold += 800;
                            if (typeof updateUI === "function") updateUI();
                        }
                    })
                ]
            },
            vozNarrador: criarNomeArquivoVoz(10, "cena2", "narrador"),
            vozFala: criarNomeArquivoVoz(10, "cena2", "fala")
        }),

        criarCenaNarrativaBase({
            id: "cap10_cena3",
            tipo: "chave",
            titulo: "A cruel verdade da rede",
            icone: "💀",
            narrador: "Narrador",
            texto: "No centro subterrâneo da cidade, abaixo do antigo salão do conselho, repousa o foco espiritual que sustenta aquele ponto da rede. Ali, inscrições descrevem com clareza terrível o que os Eternos descobriram séculos atrás:\n\nQuanto mais dor coletiva, mais estável o elo.\nQuanto mais almas presas, mais forte a passagem.\nQuanto maior a tragédia, mais fundo o rasgo no mundo.",
            pensamentosPersonagem: {
                "guerreiro": "Então eles usavam tragédias como recurso. Não era só guerra. Era colheita.",
                "guerreira": "Transformar cidade caída em combustível? Isso já passou da crueldade comum há muito tempo.",
                "draconato": "Qualquer causa que se alimente de sofrimento coletivo já prova sua própria corrupção absoluta.",
                "draconata": "Os Eternos não queriam apenas abrir caminho. Queriam converter dor em infraestrutura sagrada.",
                "arqueiro": "Agora cada ruína parece suspeita de ter sido escolhida, não apenas destruída.",
                "arqueira": "Eles não atacavam só para vencer território. Atacavam para produzir matéria-prima espiritual.",
                "mago": "É monstruoso. E intelectualmente coerente com a lógica da rede. O que torna tudo pior.",
                "maga": "Tecnologia ritual baseada em sofrimento. Isso é tão brilhante quanto repulsivo.",
                "leonide.m": "Quando a dor de um povo vira ferramenta, não resta desculpa possível para quem a construiu.",
                "leonide.f": "É por isso que tantas almas soavam não apenas tristes, mas usadas.",
                "halfling.m": "Eu odiava a rede antes. Agora odeio com fundamento extra.",
                "halfling.f": "Explorar os vivos já é comum. Explorar os mortos em massa exige outro nível de depravação.",
                "druida.m": "Isso explica por que a terra em certos lugares parecia ferida de um jeito mais fundo que simples batalha.",
                "druida.f": "Dor transformada em mecanismo. Que tipo de mente olha para luto e vê oportunidade?",
                "monge.m": "Quando alguém transforma sofrimento em sistema, não merece ser combatido com hesitação.",
                "monge.f": "Há conhecimentos que deveriam ter sido esquecidos pela própria realidade. Este é um deles."
            },
            vozNarrador: criarNomeArquivoVoz(10, "cena3", "narrador")
        }),

        criarCenaNarrativaBase({
            id: "cap10_cena4",
            tipo: "chave",
            titulo: "O custo de salvar",
            icone: "⚠️",
            narrador: "Narrador",
            texto: "Ao deixar a Cidade Fantasma, o vento sopra pelas ruas como se carregasse despedidas antigas. Pela primeira vez em muito tempo, parte da névoa se abre e deixa o luar tocar as pedras.\n\nAinda assim, o alívio é incompleto.\n\nVocê entende agora que salvar o mundo não será um ato limpo.",
            pensamentosPersonagem: {
                "guerreiro": "Salvar sempre cobra. A diferença é saber de quem e por quê.",
                "guerreira": "Se vencer exige escolha amarga, então que ao menos a amargura não seja desperdiçada.",
                "draconato": "Pureza total em guerra assim pode ser ilusão. Mas direção moral ainda importa.",
                "draconata": "Chegamos ao ponto em que bondade, eficácia e consequência já não caminham juntas com facilidade.",
                "arqueiro": "Quanto mais a jornada avança, menos existe decisão sem rastro.",
                "arqueira": "Vencer não basta. É preciso continuar reconhecendo o preço do que se faz para vencer.",
                "mago": "Agora a campanha deixou de ser apenas estratégica. Tornou-se eticamente estrutural.",
                "maga": "Todo poder exige custo. A questão real é quem escolhe pagá-lo.",
                "leonide.m": "Se salvar o mundo exigir dureza, então que essa dureza jamais esqueça a compaixão.",
                "leonide.f": "É aqui que heróis deixam de parecer histórias simples.",
                "halfling.m": "Eu estava preparado para monstros, cultistas e deuses. Dilema moral recorrente talvez seja a parte mais exaustiva.",
                "halfling.f": "Quanto mais perto do centro, menos luxo existe para respostas limpas.",
                "druida.m": "Curar grande ferida quase sempre obriga cortar antes. Ainda assim, cortar nunca deixa de ser grave.",
                "druida.f": "Salvar não é o mesmo que preservar intacto. Essa talvez seja a lição mais triste até agora.",
                "monge.m": "Força real inclui suportar o peso da escolha depois de feita.",
                "monge.f": "O caminho correto raramente se revela sem também mostrar aquilo que ele pede em troca."
            },
            vozNarrador: criarNomeArquivoVoz(10, "cena4", "narrador")
        })
    ]
});

// ============================================
// SEÇÃO 43: CAPÍTULO 11 — OLHANDO PARA O VAZIO
// ============================================

registrarCapituloNarrativo("capitulo_11_abismo", {
    id: 11,
    titulo: "Olhando para o Vazio",
    area: "abismo",
    cenas: [

        criarCenaNarrativaBase({
            id: "cap11_cena1",
            tipo: "secundaria",
            titulo: "A ferida no mundo",
            icone: "🌑",
            narrador: "Narrador",
            texto: "O Abismo Sombrio não parecia um lugar criado pela natureza. Parecia um erro.\n\nA terra desaparecia em cortes impossíveis, formando fendas onde não havia fundo visível. Rochas flutuavam por breves instantes antes de despencar em silêncio absoluto.",
            pensamentosArquetipo: {
                guerreiro: "Já vi terreno ruim. Isso aqui nem deveria existir.",
                paladino: "Quando a própria realidade se rompe, a corrupção já passou de qualquer limite comum.",
                arqueiro: "Não confio em chão que parece decidir sozinho onde termina.",
                mago: "Isto não é apenas lugar. É distorção persistente.",
                clerigo: "Se o mundo tem cicatriz, esta é uma delas.",
                ladino: "Excelente. Agora até a geografia quer me matar conceitualmente.",
                druida: "O abismo é a prova de que o mundo também pode adoecer em forma.",
                monge: "Certos lugares exigem não só firmeza do corpo, mas da identidade."
            },
            vozNarrador: criarNomeArquivoVoz(11, "cena1", "narrador")
        }),

        criarCenaNarrativaBase({
            id: "cap11_cena2",
            tipo: "chave",
            titulo: "O reflexo que anda",
            icone: "🪞",
            narrador: "Narrador",
            texto: "No centro de uma plataforma de pedra cercada por escuridão viva, sua própria sombra se descola do chão.\n\nEla se ergue.\n\nGanha forma.\n\nRosto.\n\nVoz.\n\nÉ você — mas sem contenção, sem máscara, sem justificativa.",
            fala: {
                nome: "Sua Sombra",
                texto: "Finalmente.\n\nEu sou tudo o que você calou para continuar andando."
            },
            pensamentosPersonagem: {
                "guerreiro": "Então era isso que marchava comigo desde a fortaleza caída: culpa com meu próprio rosto.",
                "guerreira": "Não basta cavar fundo na pedra. Também chega a hora de cavar fundo em si mesma.",
                "draconato": "Se até minha sombra pede voz, então minha luz precisará ser escolha, não reflexo.",
                "draconata": "Toda guardiã teme a porta externa. Mas são as internas que mais demoramos a vigiar.",
                "arqueiro": "Passei a vida rastreando monstros. Nunca pensei que um deles pisaria exatamente como eu.",
                "arqueira": "Se o mundo quis me chamar de falha, aqui está a forma que escolheu para isso.",
                "mago": "Conhecimento sempre olha de volta em algum momento. Hoje ele escolheu usar meu rosto.",
                "maga": "Então a voz no vazio sempre encontrou eco em mim antes de me chamar por inteiro.",
                "leonide.m": "A fé não elimina a sombra. Só impede que ela reine sem resistência.",
                "leonide.f": "Se até minha escuridão tem palavras, preciso decidir qual voz seguirá comigo.",
                "halfling.m": "Excelente. Agora até meus traumas decidiram se materializar com timing impecável.",
                "halfling.f": "Fugi de muita gente e de muitos erros. Era só questão de tempo até parar diante de mim mesma.",
                "druida.m": "Todo ciclo tem sombra. Negá-la também é desequilíbrio.",
                "druida.f": "Até a canção mais pura carrega uma nota escura. O horror está em fingir que não.",
                "monge.m": "Eu conheço esse olhar. Foi com ele que quase deixei de ser homem e virei só força.",
                "monge.f": "O vazio não cria sombras. Apenas revela as que já existiam silenciosas."
            },
            escolha: {
                pergunta: "Como enfrentar sua sombra?",
                opcoes: [
                    criarOpcaoNarrativa({
                        texto: "🤝 Aceitar e integrar",
                        rota: "heroi",
                        pesoRota: 2,
                        flag: "integrouSombra",
                        resultadoTexto: "Você não ergue a arma de imediato. Em vez disso, encara a sombra como parte de si — não como inimiga separada.\n\nQuando as duas formas se tocam, não há explosão nem triunfo. Há equilíbrio difícil, conquistado.",
                        recompensaTexto: "🌟 +2 em TODOS os atributos | Alinhamento Heroico",
                        iconeResultado: "🤝",
                        vozResultado: criarNomeArquivoVoz(11, "cena2", "resultado_heroi"),
                        onEscolha: function() {
                            aplicarConsequenciaNarrativa("sombra_integrar", "heroi", 2);
                            player.forca += 2;
                            player.destreza += 2;
                            player.vigor += 2;
                            player.inteligencia += 2;
                            player.sabedoria += 2;
                            player.carisma += 2;
                            if (typeof aplicarBonusEquipamentos === "function") aplicarBonusEquipamentos();
                            if (typeof updateUI === "function") updateUI();
                        }
                    }),
                    criarOpcaoNarrativa({
                        texto: "⚔️ Destruir a sombra",
                        rota: "neutro",
                        pesoRota: 1,
                        flag: "destruiuSombra",
                        resultadoTexto: "Você recusa qualquer pacto com sua própria escuridão. A arma sobe, o corpo avança, e o combate que segue é brutal porque cada golpe parece prever o outro.\n\nQuando finalmente a atravessa, a figura se desfaz em névoa negra.",
                        recompensaTexto: "⚔️ +4 Força | ❤️ +4 Vigor | Alinhamento Neutro",
                        iconeResultado: "⚔️",
                        vozResultado: criarNomeArquivoVoz(11, "cena2", "resultado_neutro"),
                        onEscolha: function() {
                            aplicarConsequenciaNarrativa("sombra_destruir", "neutro", 1);
                            player.forca += 4;
                            player.vigor += 4;
                            if (typeof aplicarBonusEquipamentos === "function") aplicarBonusEquipamentos();
                            if (typeof updateUI === "function") updateUI();
                        }
                    }),
                    criarOpcaoNarrativa({
                        texto: "💀 Fundir-se com a sombra",
                        rota: "sombrio",
                        pesoRota: 2,
                        flag: "fundiuSombra",
                        resultadoTexto: "Você dá um passo à frente não para negar, mas para desejar. A sombra sorri como se sempre soubesse que este seria o fim da conversa.\n\nQuando se unem, o Abismo responde com prazer sombrio.",
                        recompensaTexto: "⚔️ +6 Força | 🔮 +4 Inteligência | 📖 -3 Sabedoria | Alinhamento Sombrio",
                        iconeResultado: "💀",
                        vozResultado: criarNomeArquivoVoz(11, "cena2", "resultado_sombrio"),
                        onEscolha: function() {
                            aplicarConsequenciaNarrativa("sombra_fundir", "sombrio", 2);
                            player.forca += 6;
                            player.inteligencia += 4;
                            player.sabedoria = Math.max(1, player.sabedoria - 3);
                            if (typeof aplicarBonusEquipamentos === "function") aplicarBonusEquipamentos();
                            if (typeof updateUI === "function") updateUI();
                        }
                    })
                ]
            },
            vozNarrador: criarNomeArquivoVoz(11, "cena2", "narrador"),
            vozFala: criarNomeArquivoVoz(11, "cena2", "fala")
        }),

        criarCenaNarrativaBase({
            id: "cap11_cena3",
            tipo: "chave",
            titulo: "O coração do abismo",
            icone: "🌍",
            narrador: "Narrador",
            texto: "Além do encontro consigo mesmo, o verdadeiro núcleo do Abismo se revela: uma fissura dimensional mantida aberta por uma geometria impossível, como se a realidade ali tivesse sido dobrada e deixada cicatrizar errado.\n\nO Abismo não é apenas um lugar da rede.\n\nÉ um de seus centros.\n\nUm coração.",
            pensamentosPersonagem: {
                "guerreiro": "Então havia um centro real. Ótimo. Até horrores incompreensíveis sangram quando têm coração.",
                "guerreira": "Todo sistema tem uma viga mestra. Finalmente encontrei a desta desgraça.",
                "draconato": "Se isto sustenta parte da rede, então cairá como toda falsa eternidade cai.",
                "draconata": "Um nó central da corrupção... é aqui que a velha arquitetura mostra sua forma mais honesta.",
                "arqueiro": "Agora o rastro terminou em algo concreto. Feio, impossível... mas concreto.",
                "arqueira": "Se isso é o coração da rede, então cada passo até aqui finalmente encontrou o alvo certo.",
                "mago": "Extraordinário. Detestável, mas extraordinário. Um centro dimensional funcional sustentando múltiplos elos.",
                "maga": "É como olhar para um pensamento proibido que aprendeu a existir sozinho.",
                "leonide.m": "Se esta é a ferida central, então fechá-la é mais do que combate. É misericórdia para o mundo.",
                "leonide.f": "Agora entendo por que tantas vozes pareciam vir de lugar nenhum. Vinham daqui.",
                "halfling.m": "Claro. O horror abstrato tinha um coração. Sempre tem. Isso ajuda a odiar melhor.",
                "halfling.f": "Quanto mais central a peça, menos desculpa sobra para hesitar.",
                "druida.m": "A terra sangra em muitos pontos, mas alguns concentram a infecção. Este é um deles.",
                "druida.f": "Até o próprio espaço parece sofrer para manter isto aberto.",
                "monge.m": "Se existe núcleo, então existe fim possível. É nisso que importa focar.",
                "monge.f": "Toda prisão vasta precisa de um ponto onde sua lógica se sustenta. Este é o ponto."
            },
            vozNarrador: criarNomeArquivoVoz(11, "cena3", "narrador")
        }),

        criarCenaNarrativaBase({
            id: "cap11_cena4",
            tipo: "chave",
            titulo: "Terremoto dimensional",
            icone: "🌑",
            narrador: "Narrador",
            texto: "Ao escapar do colapso do Abismo, você sente o mundo tremer não apenas sob os pés, mas nas bordas da percepção. Como se, por um instante, tudo tivesse ficado ligeiramente desalinhado.\n\nVocê destruiu algo central demais para passar despercebido.",
            pensamentosPersonagem: {
                "guerreiro": "Agora eles sentiram de verdade. Isso não foi escaramuça. Foi golpe de guerra central.",
                "guerreira": "Quebre a viga certa e o teto inteiro responde. Exatamente isso.",
                "draconato": "O mundo vacilou porque uma treva antiga perdeu sustentação. Bom.",
                "draconata": "Agora não há mais retorno discreto. O centro da rede foi ferido abertamente.",
                "arqueiro": "Até o ar pareceu errar o caminho por um instante. Isso foi fundo demais para passar despercebido.",
                "arqueira": "Se antes eu perturbava os planos deles, agora eu os firo diretamente.",
                "mago": "Impacto estrutural confirmado em múltiplas camadas da realidade. Magnitude alarmante.",
                "maga": "Eu senti a resposta no próprio corpo. Como se algo imenso tivesse se virado abruptamente na minha direção.",
                "leonide.m": "Quando a criação inteira vacila, é porque o mal foi tocado em parte vital.",
                "leonide.f": "As vozes ficaram mais próximas. Não mais fortes — mais próximas.",
                "halfling.m": "Excelente. Agora até o universo sabe que eu estou metido nisso.",
                "halfling.f": "Depois disso, qualquer ilusão de anonimato morreu.",
                "druida.m": "Fechar a ferida central fez o corpo do mundo estremecer por inteiro.",
                "druida.f": "O abismo gritou sem som, e mesmo assim o mundo ouviu.",
                "monge.m": "Golpe certeiro não é o que parece bonito. É o que faz o inimigo inteiro reagir.",
                "monge.f": "Há momentos em que o destino deixa de avançar em silêncio e passa a responder."
            },
            vozNarrador: criarNomeArquivoVoz(11, "cena4", "narrador")
        })
    ]
});

// ============================================
// SEÇÃO 44: CAPÍTULO 12 — A FORTALEZA DO REI MORTO
// ============================================

registrarCapituloNarrativo("capitulo_12_castelo", {
    id: 12,
    titulo: "A Fortaleza do Rei Morto",
    area: "castelo",
    cenas: [

        criarCenaNarrativaBase({
            id: "cap12_cena1",
            tipo: "secundaria",
            titulo: "O castelo que não caiu por completo",
            icone: "🏰",
            narrador: "Narrador",
            texto: "O Castelo Amaldiçoado se ergue sobre um penhasco como uma lembrança que se recusou a desaparecer. Suas torres estavam quebradas, mas ainda desafiavam o céu. Pontes ruídas ligavam muralhas rachadas.\n\nAo atravessar os portões, você sente algo diferente de todos os outros lugares corrompidos.\n\nNão apenas trevas.\n\nFracasso.",
            pensamentosArquetipo: {
                guerreiro: "Fortaleza derrotada, sim. Rendida, nunca.",
                paladino: "Há nobreza triste em lugares que tombaram sem renunciar ao dever.",
                arqueiro: "Torres quebradas ainda observam melhor do que muita gente viva.",
                mago: "Fracasso prolongado deixa marcas mágicas tão fortes quanto vitória.",
                clerigo: "Este castelo virou mausoléu de um juramento coletivo.",
                ladino: "Lugar com cara de armadilha antiga e culpa persistente. Nada acolhedor.",
                druida: "A pedra aqui resistiu, mas nunca cicatrizou.",
                monge: "Há lugares onde o apego ao passado pesa mais do que a ruína."
            },
            vozNarrador: criarNomeArquivoVoz(12, "cena1", "narrador")
        }),

        criarCenaNarrativaBase({
            id: "cap12_cena2",
            tipo: "chave",
            titulo: "O rei acorrentado",
            icone: "👑",
            narrador: "Narrador",
            texto: "Diante do trono partido, cercado por correntes espectrais presas às colunas do salão, ergue-se o fantasma do último rei que tentou deter os Eternos.\n\nMesmo morto, ele mantém presença de soberano.\nMesmo derrotado, mantém postura de guerra.",
            fala: {
                nome: "Rei Fantasma",
                texto: "Então chegou outro.\n\nEu também acreditei que bastava coragem. Que bastava muralha. Que bastava fé.\n\nEu falhei.\n\nPosso lhe dar algo. Minha espada... ou minha coroa. Poder. Ou visão.\n\nOu ambos, se estiver disposto a tomar mais do que deveria."
            },
            pensamentosPersonagem: {
                "guerreiro": "Eu conheço esse peso. O de quem comandou, perdeu e sobreviveu tempo demais à própria queda.",
                "guerreira": "Rei derrotado ainda segurando o castelo no ódio e no dever. Quase admiro.",
                "draconato": "Mesmo falho, ele caiu em combate contra as trevas. Isso merece escuta.",
                "draconata": "Algumas coroas viram correntes antes mesmo do corpo morrer.",
                "arqueiro": "Ele não parece um fantasma preso ao poder. Parece preso ao fracasso.",
                "arqueira": "Há diferença entre derrota e desonra. Este rei claramente conhece só a primeira.",
                "mago": "Testemunha histórica, política e ritual em um único espírito. Extraordinário.",
                "maga": "Ele não quer apenas ser lembrado. Quer que alguém termine o que ele não conseguiu.",
                "leonide.m": "Pior do que um rei morto é um rei que ainda carrega o próprio povo nos ombros depois da morte.",
                "leonide.f": "As correntes dele parecem feitas tanto de magia quanto de culpa.",
                "halfling.m": "Fantasma de rei oferecendo legado. Isso está perigosamente perto de virar problema meu pessoal.",
                "halfling.f": "Pelo menos este governante parece ter caído tentando fazer algo útil.",
                "druida.m": "Até estruturas de poder apodrecem, mas alguns juramentos continuam agarrados nelas como raiz seca.",
                "druida.f": "Ele soa como castelo: quebrado, mas ainda em pé por insistência.",
                "monge.m": "Fracasso reconhecido sem desculpa é raro. Eu respeito isso.",
                "monge.f": "Algumas almas não ficam por apego ao trono. Ficam porque ainda se recusam a chamar o fim de fim."
            },
            escolha: {
                pergunta: "O que aceitar do rei?",
                opcoes: [
                    criarOpcaoNarrativa({
                        texto: "⚔️ A Espada",
                        rota: "neutro",
                        pesoRota: 1,
                        flag: "pegouEspadaRei",
                        resultadoTexto: "Você escolhe o legado direto da guerra. A espada do rei surge diante de você, espectral por um instante, até ganhar peso e forma.\n\nAo segurá-la, sente não apenas poder, mas intenção — a vontade de alguém que tombou sem recuar.",
                        recompensaTexto: "⚔️ +5 Força | Alinhamento Neutro",
                        iconeResultado: "⚔️",
                        vozResultado: criarNomeArquivoVoz(12, "cena2", "resultado_neutro"),
                        onEscolha: function() {
                            aplicarConsequenciaNarrativa("rei_espada", "neutro", 1);
                            player.forca += 5;
                            if (typeof aplicarBonusEquipamentos === "function") aplicarBonusEquipamentos();
                            if (typeof updateUI === "function") updateUI();
                        }
                    }),
                    criarOpcaoNarrativa({
                        texto: "👑 A Coroa",
                        rota: "heroi",
                        pesoRota: 1,
                        flag: "pegouCoroaRei",
                        resultadoTexto: "Você escolhe não o aço, mas o símbolo. A coroa paira à sua frente, rachada e gasta, mas ainda carregando eco de autoridade e percepção.\n\nQuando toca sua testa, não pesa como metal. Pesa como memória.",
                        recompensaTexto: "📖 +4 Sabedoria | 🗣️ +3 Carisma | Alinhamento Heroico",
                        iconeResultado: "👑",
                        vozResultado: criarNomeArquivoVoz(12, "cena2", "resultado_heroi"),
                        onEscolha: function() {
                            aplicarConsequenciaNarrativa("rei_coroa", "heroi", 1);
                            player.sabedoria += 4;
                            player.carisma += 3;
                            if (typeof aplicarBonusEquipamentos === "function") aplicarBonusEquipamentos();
                            if (typeof updateUI === "function") updateUI();
                        }
                    }),
                    criarOpcaoNarrativa({
                        texto: "💀 Ambos",
                        rota: "sombrio",
                        pesoRota: 2,
                        flag: "absorveuRei",
                        resultadoTexto: "Você recusa a limitação da oferta. Em vez de escolher, toma.\n\nAs correntes espectrais vibram. O rei percebe tarde demais. Ao absorver espada e coroa juntas, você arranca também o restante da essência que ainda o mantinha preso ao salão.",
                        recompensaTexto: "⚔️ +4 Força | 🔮 +4 Inteligência | Alinhamento Sombrio",
                        iconeResultado: "💀",
                        vozResultado: criarNomeArquivoVoz(12, "cena2", "resultado_sombrio"),
                        onEscolha: function() {
                            aplicarConsequenciaNarrativa("rei_ambos", "sombrio", 2);
                            player.forca += 4;
                            player.inteligencia += 4;
                            if (typeof aplicarBonusEquipamentos === "function") aplicarBonusEquipamentos();
                            if (typeof updateUI === "function") updateUI();
                        }
                    })
                ]
            },
            vozNarrador: criarNomeArquivoVoz(12, "cena2", "narrador"),
            vozFala: criarNomeArquivoVoz(12, "cena2", "fala")
        }),

        criarCenaNarrativaBase({
            id: "cap12_cena3",
            tipo: "chave",
            titulo: "O último mapa",
            icone: "⚡",
            narrador: "Narrador",
            texto: "Com o vínculo do rei rompido, o salão do trono revela algo que permaneceu oculto por séculos: uma câmara atrás do trono onde mapas, anotações e registros da última guerra ainda resistem.\n\nSó restam três grandes elos.\n\nPlano Astral.\nInfernus.\nTrono dos Deuses.",
            pensamentosPersonagem: {
                "guerreiro": "Finalmente o resto da campanha ganhou fronteiras claras: céu, inferno e trono.",
                "guerreira": "Plano Astral, Infernus e Trono dos Deuses. Claro. Como se o mundo comum já não bastasse de problema.",
                "draconato": "Agora a missão se revela inteira. E inteira ela pede tudo.",
                "draconata": "Não restam mais regiões apenas perigosas. Restam domínios fundamentais da realidade.",
                "arqueiro": "Isso já não é mais caça em território conhecido. É travessia para onde poucos deveriam ir.",
                "arqueira": "Três últimos elos. Três golpes finais. Pelo menos o caminho deixou de mentir sobre o tamanho do preço.",
                "mago": "Plano, inferno, trono. Os três níveis finais cobrem mente, corrupção e divindade. Isso é quase elegantemente terrível.",
                "maga": "Os últimos nomes soam menos como destinos e mais como provas feitas sob medida para o fim.",
                "leonide.m": "Se o último mapa aponta para céu, inferno e trono, então a guerra alcançou tudo que os homens chamam de absoluto.",
                "leonide.f": "Eu sempre soube que o chamado terminaria acima e abaixo do mundo comum. Agora tenho os nomes.",
                "halfling.m": "Adoro como minha carreira saiu de “pequenos furtos” para “invasão de planos cósmicos”. Muito proporcional.",
                "halfling.f": "Ao menos a verdade final teve a decência de ser direta.",
                "druida.m": "Quando até os domínios além da terra entram na equação, fica claro que a rede nunca foi só geográfica.",
                "druida.f": "É como se o próprio mundo agora apontasse para seus três últimos nervos expostos.",
                "monge.m": "Quanto mais alto o alvo, menos espaço sobra para dúvida ou distração.",
                "monge.f": "Há caminhos que, uma vez nomeados, tornam inevitável o passo seguinte."
            },
            vozNarrador: criarNomeArquivoVoz(12, "cena3", "narrador")
        }),

        criarCenaNarrativaBase({
            id: "cap12_cena4",
            tipo: "chave",
            titulo: "A guerra final começa",
            icone: "🌌",
            narrador: "Narrador",
            texto: "Ao deixar o castelo, você leva mais do que poder ou informação. Leva herança.\n\nA tentativa de um rei morto.\nO fracasso de uma fortaleza inteira.\nA prova de que outros chegaram perto — e caíram.\n\nMas você também leva clareza.",
            pensamentosPersonagem: {
                "guerreiro": "Acabou a fase de marcha longa. Agora é guerra de decisão.",
                "guerreira": "Cheguei longe demais para fingir que ainda existe volta simples depois disso.",
                "draconato": "Tudo até aqui foi preparação. Agora vem o cumprimento real do juramento.",
                "draconata": "Daqui em diante, cada passo será atravessado por propósito antigo e resposta imediata.",
                "arqueiro": "Não restam mais rastros para seguir. Só alvo para alcançar.",
                "arqueira": "A reta final sempre separa quem queria vencer de quem está disposto a pagar para isso.",
                "mago": "Todos os dados convergiram. Agora a hipótese vira enfrentamento final.",
                "maga": "O chamado que me acompanhou até aqui já não sussurra. Ele espera.",
                "leonide.m": "A guerra final não começa quando o inimigo cresce. Começa quando não resta mais nada acima do dever.",
                "leonide.f": "É estranho como o medo fica mais limpo quando o caminho para o fim finalmente se revela sem neblina.",
                "halfling.m": "Bom. Sem mais ilusões. Sem mais desvios. Só o pior do pior pela frente.",
                "halfling.f": "Agora não há mais desculpa para não escolher completamente quem eu serei nisso.",
                "druida.m": "A terra me trouxe até onde ela já não consegue mais ser meu único chão. Isso diz tudo.",
                "druida.f": "O mundo inteiro parece ter prendido a respiração comigo.",
                "monge.m": "A parte final de qualquer disciplina é agir quando o corpo já preferia descanso.",
                "monge.f": "O começo do fim costuma ser o momento em que toda hesitação perde utilidade."
            },
            vozNarrador: criarNomeArquivoVoz(12, "cena4", "narrador")
        })
    ]
});

// ============================================
// SEÇÃO 45: CAPÍTULO 13 — ALÉM DA REALIDADE
// ============================================

registrarCapituloNarrativo("capitulo_13_planoAstral", {
    id: 13,
    titulo: "Além da Realidade",
    area: "planoAstral",
    cenas: [

        criarCenaNarrativaBase({
            id: "cap13_cena1",
            tipo: "secundaria",
            titulo: "Onde o mundo perde forma",
            icone: "🌌",
            narrador: "Narrador",
            texto: "Entrar no Plano Astral não é como cruzar uma fronteira. É como deixar de pertencer a uma ideia.\n\nO chão brilha como céu. Estrelas nascem e morrem em segundos. Fragmentos de ruínas flutuam em vazio colorido, ligados por pontes de luz que aparecem apenas quando você pisa onde não há nada.",
            pensamentosArquetipo: {
                guerreiro: "Prefiro inimigo concreto. Lugar assim complica até ficar de pé.",
                paladino: "Quando a criação se mostra tão vasta, a fé precisa ficar mais firme, não menor.",
                arqueiro: "Nada pior do que horizonte que não se comporta como horizonte.",
                mago: "Finalmente um lugar que confirma que teoria nenhuma basta sozinha.",
                clerigo: "A vastidão pode humilhar. Ou lembrar que até ela testemunha escolhas.",
                ladino: "Se eu tropeçar no nada e cair no infinito, vou achar pessoal.",
                druida: "Mesmo fora da terra, ainda existe padrão. Só mais amplo do que corpo mortal aguenta.",
                monge: "Perder referência externa é quando se descobre se o centro interno existe mesmo."
            },
            vozNarrador: criarNomeArquivoVoz(13, "cena1", "narrador")
        }),

        criarCenaNarrativaBase({
            id: "cap13_cena2",
            tipo: "chave",
            titulo: "A entidade que observa eras",
            icone: "🌟",
            narrador: "Narrador",
            texto: "Em uma plataforma de luz cercada por órbitas quebradas, uma entidade toma forma diante de você. Não é humana, nem monstruosa, nem exatamente divina. Parece feita de céu noturno, ouro líquido e silêncio antigo.\n\nSeus olhos não brilham. Contêm galáxias.",
            fala: {
                nome: "Entidade Cósmica",
                texto: "Mortal curioso.\n\nEu vi civilizações nascerem, cantarem, guerrearem e desaparecerem antes que seus descendentes aprendessem seus próprios nomes.\n\nO que faz você diferente?"
            },
            pensamentosPersonagem: {
                "guerreiro": "Se até o infinito exige justificativa, então responderei como soldado: pelo que ainda precisa ser defendido.",
                "guerreira": "Ótimo. Agora até criatura cósmica quer avaliar meu valor antes de me deixar continuar.",
                "draconato": "Diante do infinito, a fé não diminui. Só fica mais exposta.",
                "draconata": "Há perguntas que pesam mais do que armas. Esta é uma delas.",
                "arqueiro": "Predador nenhum que conheci olhava assim. Isso é outra escala de julgamento.",
                "arqueira": "Se o cosmos quer saber por que continuo, então ouvirá algo mais firme do que reverência vazia.",
                "mago": "Ser interrogado por uma entidade além da realidade é, academicamente, uma ocasião notável. Infelizmente também é uma crise existencial.",
                "maga": "Parte de mim sempre quis um olhar assim. E parte de mim teme exatamente isso.",
                "leonide.m": "Mesmo diante da vastidão, uma vida justa ainda precisa saber responder por si.",
                "leonide.f": "Curioso. Não me sinto pequena diante dela. Me sinto lida.",
                "halfling.m": "Claro. Não bastava o apocalipse. Agora também tenho entrevista com entidade cósmica.",
                "halfling.f": "Quando algo tão antigo pergunta quem você é, mentir parece ainda mais inútil do que normal.",
                "druida.m": "O cosmos observa ciclos maiores do que qualquer floresta. Ainda assim, pergunta pela intenção. Isso importa.",
                "druida.f": "É como encarar o céu inteiro e perceber que ele também escuta.",
                "monge.m": "Pergunta simples. Peso imenso. Exatamente como deveria ser.",
                "monge.f": "Há seres que não testam força, mas clareza. E às vezes isso é mais difícil."
            },
            escolha: {
                pergunta: "O que responder?",
                opcoes: [
                    criarOpcaoNarrativa({
                        texto: "🙏 “Eu luto por quem não pode lutar.”",
                        rota: "heroi",
                        pesoRota: 2,
                        resultadoTexto: "A entidade o observa em silêncio longo demais para ser medido. Depois, algo que talvez seja um sorriso se forma em sua expressão impossível.\n\nUma onda de energia suave o atravessa, como se o próprio espaço reconhecesse sua resposta.",
                        recompensaTexto: "🌟 +3 em TODOS os atributos | Alinhamento Heroico",
                        iconeResultado: "🙏",
                        vozResultado: criarNomeArquivoVoz(13, "cena2", "resultado_heroi"),
                        onEscolha: function() {
                            adicionarPontoRota("heroi", 2);
                            player.forca += 3;
                            player.destreza += 3;
                            player.vigor += 3;
                            player.inteligencia += 3;
                            player.sabedoria += 3;
                            player.carisma += 3;
                            if (typeof aplicarBonusEquipamentos === "function") aplicarBonusEquipamentos();
                            if (typeof updateUI === "function") updateUI();
                        }
                    }),
                    criarOpcaoNarrativa({
                        texto: "⚔️ “Eu luto porque é o que sei fazer.”",
                        rota: "neutro",
                        pesoRota: 1,
                        resultadoTexto: "Você não veste sua vontade com nobreza extra. Responde com a honestidade seca dos que já viveram demais em guerra para romantizá-la.\n\nA energia que recebe não é gentil, mas firme. Como estrutura. Como eixo.",
                        recompensaTexto: "⚔️ +5 Força | ❤️ +5 Vigor | Alinhamento Neutro",
                        iconeResultado: "⚔️",
                        vozResultado: criarNomeArquivoVoz(13, "cena2", "resultado_neutro"),
                        onEscolha: function() {
                            adicionarPontoRota("neutro", 1);
                            player.forca += 5;
                            player.vigor += 5;
                            if (typeof aplicarBonusEquipamentos === "function") aplicarBonusEquipamentos();
                            if (typeof updateUI === "function") updateUI();
                        }
                    }),
                    criarOpcaoNarrativa({
                        texto: "💀 “Eu serei o próximo deus.”",
                        rota: "sombrio",
                        pesoRota: 2,
                        resultadoTexto: "A resposta paira no vazio astral como lâmina puxada muito cedo ou muito tarde.\n\nA entidade o encara. Então ri. Não com desprezo. Com interesse.\n\nA energia que entra em você é vasta, afiada e difícil de conter.",
                        recompensaTexto: "🔮 +6 Inteligência | ⚔️ +4 Força | Alinhamento Sombrio",
                        iconeResultado: "💀",
                        vozResultado: criarNomeArquivoVoz(13, "cena2", "resultado_sombrio"),
                        onEscolha: function() {
                            adicionarPontoRota("sombrio", 2);
                            player.inteligencia += 6;
                            player.forca += 4;
                            if (typeof aplicarBonusEquipamentos === "function") aplicarBonusEquipamentos();
                            if (typeof updateUI === "function") updateUI();
                        }
                    })
                ]
            },
            vozNarrador: criarNomeArquivoVoz(13, "cena2", "narrador"),
            vozFala: criarNomeArquivoVoz(13, "cena2", "fala")
        }),

        criarCenaNarrativaBase({
            id: "cap13_cena3",
            tipo: "secundaria",
            titulo: "O penúltimo grande selo astral",
            icone: "👁️",
            narrador: "Narrador",
            texto: "No centro do Plano Astral, protegido por estruturas de luz rachada e geometria impossível, você encontra o elo daquele domínio: um olho de energia suspenso entre véus de realidade, observando todos os mundos ao mesmo tempo.\n\nEle não é apenas portal.\n\nÉ vigilância.",
            pensamentosArquetipo: {
                guerreiro: "Grande demais para ser ignorado. Claro demais para hesitar.",
                paladino: "Se eles queriam que o cosmos inteiro testemunhasse a queda, então a resposta precisa ser igualmente clara.",
                arqueiro: "Nem tudo que observa de longe está distante de verdade.",
                mago: "Isto é rito em escala cosmológica. Absurdo. E coerente com tudo que vieram construindo.",
                clerigo: "Até o alto foi ferido por essa ambição.",
                ladino: "É sempre ruim quando o problema ganha dimensão universal de verdade.",
                druida: "Mesmo longe do solo, ainda se trata de equilíbrio rompido.",
                monge: "Quanto maior a escala, mais simples precisa ser a decisão."
            },
            vozNarrador: criarNomeArquivoVoz(13, "cena3", "narrador")
        }),

        criarCenaNarrativaBase({
            id: "cap13_cena4",
            tipo: "chave",
            titulo: "Restam dois",
            icone: "⚠️",
            narrador: "Narrador",
            texto: "Ao deixar o Plano Astral, você sente a presença de Axiom mais próxima do que nunca. Não é visão. Não é voz. É pressão.\n\nRestam apenas dois grandes portais:\n\nInfernus.\nE o Trono dos Deuses.",
            pensamentosPersonagem: {
                "guerreiro": "Dois alvos. Dois passos finais. Agora a guerra pode ser contada em golpes, não em regiões.",
                "guerreira": "Bom. Menos portais. Mais inferno e trono. Naturalmente.",
                "draconato": "Agora o mal já não se esconde em escala. Restou o infernal e o divino corrompido.",
                "draconata": "Dois elos restantes. E ambos pertencem ao tipo de lugar onde antigos juramentos costumam falhar.",
                "arqueiro": "Quanto mais curto o caminho, mais pesado ele parece.",
                "arqueira": "Dois passos. E sei perfeitamente que serão os piores da jornada.",
                "mago": "Matematicamente reconfortante. Emocionalmente desastroso.",
                "maga": "Agora até o vazio parece apontar para o mesmo fim sem hesitação.",
                "leonide.m": "Restar pouco não significa estar perto de paz. Significa estar perto de provação total.",
                "leonide.f": "As vozes se afunilaram. Antes pareciam vir de muitos lugares. Agora vêm de dois.",
                "halfling.m": "Dois destinos restantes, ambos péssimos. Eficiência narrativa admirável.",
                "halfling.f": "Quando sobram só os maiores monstros, a verdade final fica muito simples.",
                "druida.m": "A ferida do mundo está quase fechada. É justamente por isso que vai doer mais agora.",
                "druida.f": "O canto do mundo está mais fraco, mas mais claro. Como se soubesse que o fim se aproxima.",
                "monge.m": "Poucos passos também podem exigir tudo que resta.",
                "monge.f": "Na reta final, quantidade deixa de importar. Só profundidade."
            },
            vozNarrador: criarNomeArquivoVoz(13, "cena4", "narrador")
        })
    ]
});

// ============================================
// SEÇÃO 46: CAPÍTULO 14 — DESCIDA AO INFERNO
// ============================================

registrarCapituloNarrativo("capitulo_14_infernus", {
    id: 14,
    titulo: "Descida ao Inferno",
    area: "infernus",
    cenas: [

        criarCenaNarrativaBase({
            id: "cap14_cena1",
            tipo: "secundaria",
            titulo: "Onde almas queimam",
            icone: "🔥",
            narrador: "Narrador",
            texto: "Infernus não precisava de descrição. O corpo entendia antes da mente.\n\nO chão era rocha negra rachada por rios de fogo. O céu sangrava brasas. Gritos ecoavam de torres distantes, cavernas abertas e correntes suspensas no vazio.",
            pensamentosArquetipo: {
                guerreiro: "Lugar onde até respirar parece concessão temporária.",
                paladino: "Inferno algum merece ser tratado como inevitável.",
                arqueiro: "Cobertura ruim, calor absurdo, demônios em potencial. Excelente.",
                mago: "Energia infernal tão estável assim explica o interesse dos Eternos.",
                clerigo: "Dor organizada em arquitetura. Isso por si só já é monstruoso.",
                ladino: "Sempre ouvi dizer que o inferno era ruim. Ainda assim, superou expectativas.",
                druida: "Nem este lugar está fora do ciclo. Só foi tomado por sua forma mais pervertida.",
                monge: "Ambientes extremos tentam convencer o corpo a abandonar a mente."
            },
            vozNarrador: criarNomeArquivoVoz(14, "cena1", "narrador")
        }),

        criarCenaNarrativaBase({
            id: "cap14_cena2",
            tipo: "chave",
            titulo: "O príncipe demônio",
            icone: "😈",
            narrador: "Narrador",
            texto: "Em um salão infernal sustentado por correntes e pilares de osso escurecido, um trono de metal derretido se ergue acima de um lago de fogo.\n\nNele, repousa o Príncipe Demônio.\n\nSua forma mistura beleza cruel, arrogância absoluta e uma calma predatória.",
            fala: {
                nome: "Príncipe Demônio",
                texto: "Então é você.\n\nO mortal que vem apagando os caminhos de um deus.\n\nPosso fechar o portal de Infernus para você. Em troca, quero sua alma quando morrer."
            },
            pensamentosPersonagem: {
                "guerreiro": "Pactos sempre parecem estratégicos para quem quer que você esqueça o preço real.",
                "guerreira": "Demônio oferecendo atalho. Eu realmente esperava algo mais original do inferno.",
                "draconato": "Tudo nele fede a poder sem honra, ajuda sem misericórdia e preço sem limite.",
                "draconata": "Certas tentações não seduzem pela beleza, mas pela conveniência exata.",
                "arqueiro": "Predador confiante demais costuma já ter escolhido como quer que a presa responda.",
                "arqueira": "O pior não é ele me tentar. É ele entender exatamente por onde a tentação entra.",
                "mago": "Parceria infernal: intelectualmente previsível, estrategicamente tentadora, moralmente corrosiva.",
                "maga": "Ele fala como quem percebe que parte do que oferece me atrai mais do que deveria.",
                "leonide.m": "Ajuda que exige alma nunca foi ajuda. Só contrato com verniz de solução.",
                "leonide.f": "Ele não quer apenas meu futuro. Quer o direito de dizer que escolhi entregá-lo.",
                "halfling.m": "Eu sabia. Sempre chega o momento em que um demônio acha que você está cansado o bastante para negociar mal.",
                "halfling.f": "Tentação boa de verdade nunca vem disfarçada de bondade. Vem disfarçada de eficiência.",
                "druida.m": "Tudo nele parece separado do ciclo natural. Como se só soubesse existir cobrando demais em troca.",
                "druida.f": "É estranho como ele consegue tornar a corrupção quase elegante. Quase.",
                "monge.m": "O pacto mais perigoso é sempre o que combina com a exaustão de quem chegou tão longe.",
                "monge.f": "Alguns testes não perguntam se você é forte. Perguntam se você ainda sabe o que não aceita se tornar."
            },
            escolha: {
                pergunta: "Aceitar o pacto?",
                opcoes: [
                    criarOpcaoNarrativa({
                        texto: "❌ Recusar e lutar",
                        rota: "heroi",
                        pesoRota: 2,
                        resultadoTexto: "Você recusa sem rodeios. A expressão do demônio não muda de imediato — mas o salão inteiro parece perder calor por um segundo.\n\nEntão ele ri.\n\nA luta que se segue é brutal. Você vence não por atalho, mas por resistência total à corrupção do acordo.",
                        recompensaTexto: "❤️ +5 Vigor | 📖 +5 Sabedoria | Alinhamento Heroico",
                        iconeResultado: "❌",
                        vozResultado: criarNomeArquivoVoz(14, "cena2", "resultado_heroi"),
                        onEscolha: function() {
                            adicionarPontoRota("heroi", 2);
                            player.vigor += 5;
                            player.sabedoria += 5;
                            if (typeof aplicarBonusEquipamentos === "function") aplicarBonusEquipamentos();
                            if (typeof updateUI === "function") updateUI();
                        }
                    }),
                    criarOpcaoNarrativa({
                        texto: "🤝 Aceitar parcialmente",
                        rota: "neutro",
                        pesoRota: 1,
                        flag: "pactoDemoniacoParcial",
                        resultadoTexto: "Você não entrega tudo. Negocia. O demônio gosta disso mais do que demonstra. Após uma longa barganha, um acordo imperfeito é feito.\n\nEle não fecha o portal diretamente, mas enfraquece seus guardiões e abre uma brecha no sistema do selo.",
                        recompensaTexto: "📘 +1000 XP | Alinhamento Neutro",
                        iconeResultado: "🤝",
                        vozResultado: criarNomeArquivoVoz(14, "cena2", "resultado_neutro"),
                        onEscolha: function() {
                            aplicarConsequenciaNarrativa("pacto_parcial", "neutro", 1);
                            if (typeof ganharExp === "function") ganharExp(1000);
                            if (typeof updateUI === "function") updateUI();
                        }
                    }),
                    criarOpcaoNarrativa({
                        texto: "💀 Aceitar completamente",
                        rota: "sombrio",
                        pesoRota: 2,
                        flag: "pactoDemoniacoTotal",
                        resultadoTexto: "Você aceita.\n\nSem hesitação, sem ornamento. O demônio se ergue do trono, satisfeito. Correntes de fogo sobem do chão e selam o pacto. A energia infernal corre por seu corpo com violência gloriosa.",
                        recompensaTexto: "⚔️ +8 Força | 🔮 +8 Inteligência | Alinhamento Sombrio",
                        iconeResultado: "💀",
                        vozResultado: criarNomeArquivoVoz(14, "cena2", "resultado_sombrio"),
                        onEscolha: function() {
                            aplicarConsequenciaNarrativa("pacto_total", "sombrio", 2);
                            player.forca += 8;
                            player.inteligencia += 8;
                            if (typeof aplicarBonusEquipamentos === "function") aplicarBonusEquipamentos();
                            if (typeof updateUI === "function") updateUI();
                        }
                    })
                ]
            },
            vozNarrador: criarNomeArquivoVoz(14, "cena2", "narrador"),
            vozFala: criarNomeArquivoVoz(14, "cena2", "fala")
        }),

        criarCenaNarrativaBase({
            id: "cap14_cena3",
            tipo: "secundaria",
            titulo: "O selo infernal cai",
            icone: "⛓️",
            narrador: "Narrador",
            texto: "Seja por combate ou pacto, o elo infernal acaba cedendo. Correntes demoníacas racham. O lago de fogo se agita. Runas se partem. Criaturas infernais recuam como se a própria estrutura do lugar tivesse sido ofendida.",
            pensamentosArquetipo: {
                guerreiro: "Mais um pilar caiu. Agora só resta o mais alto.",
                paladino: "Mesmo no inferno, a corrupção pode ser ferida.",
                arqueiro: "Depois disso, não restam mais desvios. Só linha reta para o fim.",
                mago: "A rede está quase totalmente exposta. Falta pouco.",
                clerigo: "Se até Infernus cedeu, então nada no caminho é intocável.",
                ladino: "Nunca achei que diria isso, mas sair vivo do inferno conta como excelente dia.",
                druida: "A ferida está quase fechando. O problema é o que pode escapar antes.",
                monge: "Reta final: menos dúvida, mais consequência."
            },
            vozNarrador: criarNomeArquivoVoz(14, "cena3", "narrador")
        }),

        criarCenaNarrativaBase({
            id: "cap14_cena4",
            tipo: "chave",
            titulo: "Só resta o trono",
            icone: "⚡",
            narrador: "Narrador",
            texto: "Com a queda de Infernus, a sensação da presença de Axiom deixa de ser distante.\n\nAgora parece iminente.\n\nO mundo inteiro parece segurar a respiração em algum nível invisível.\n\nResta apenas o Trono dos Deuses.",
            pensamentosPersonagem: {
                "guerreiro": "Pronto. Agora é só o alvo final entre mim e o fim desta guerra.",
                "guerreira": "Todo o caminho para terminar em trono de deus corrompido. Confesso que a jornada manteve padrão alto de absurdo.",
                "draconato": "Agora nada mais separa fé e prova. Só combate.",
                "draconata": "Chegamos ao ponto em que a última porta é também a mais antiga.",
                "arqueiro": "Não restam mais desvios. Só linha reta para o coração do problema.",
                "arqueira": "O pior da jornada é sempre quando a espera acaba.",
                "mago": "Último elo confirmado. Todo o resto agora é execução final da hipótese inteira.",
                "maga": "Estranho como, depois de tanto horror, clareza pode parecer quase alívio.",
                "leonide.m": "Quando resta apenas o trono, resta também o julgamento do que viemos nos tornar até aqui.",
                "leonide.f": "As vozes não estão mais espalhadas. Estão concentradas. E isso é pior.",
                "halfling.m": "Excelente. Nada mais entre mim e um deus corrompido. Simples, direto e terrível.",
                "halfling.f": "Chegar ao fim não é vitória. É o momento em que finalmente não há mais desculpa para adiar o confronto.",
                "druida.m": "Se o último elo cair, talvez o mundo volte a respirar. Talvez por um fio. Mas volte.",
                "druida.f": "O canto do mundo agora é quase só um pedido: termina isso.",
                "monge.m": "Último adversário, última hesitação útil. Depois disso, só ação.",
                "monge.f": "O fim da travessia é também o ponto onde toda escolha anterior retorna em silêncio."
            },
            vozNarrador: criarNomeArquivoVoz(14, "cena4", "narrador")
        })
    ]
});

// ============================================
// SEÇÃO 47: CAPÍTULO 15 — O CONFRONTO FINAL
// ============================================

registrarCapituloNarrativo("capitulo_15_tronoDeus", {
    id: 15,
    titulo: "O Confronto Final",
    area: "tronoDeus",
    cenas: [

        criarCenaNarrativaBase({
            id: "cap15_cena1",
            tipo: "secundaria",
            titulo: "O lugar onde deuses sentaram",
            icone: "⚡",
            narrador: "Narrador",
            texto: "O Trono dos Deuses não parece ruína comum.\n\nParece blasfêmia em escala arquitetônica.\n\nEscadarias impossíveis sobem até plataformas de mármore rachado, sustentadas por colunas enormes marcadas por relâmpagos negros. Estátuas de divindades antigas jazem partidas.",
            pensamentosArquetipo: {
                guerreiro: "Lugar construído para impor submissão. Vai ter que tentar mais.",
                paladino: "O sagrado foi ferido aqui. Não significa que deixou de existir.",
                arqueiro: "Quanto maior o cenário, mais fatal costuma ser o erro.",
                mago: "O trono em si já é uma tese sobre poder corrompido.",
                clerigo: "Se até deuses caíram, então a fé precisa escolher melhor onde se ajoelha.",
                ladino: "Sempre desconfiei de tronos. Este só confirma a regra em escala divina.",
                druida: "Quando até o céu parece quebrado, o mundo inteiro pede reparo.",
                monge: "O topo de toda ambição costuma ser o ponto onde o vazio fica mais evidente."
            },
            vozNarrador: criarNomeArquivoVoz(15, "cena1", "narrador")
        }),

        criarCenaNarrativaBase({
            id: "cap15_cena2",
            tipo: "chave",
            titulo: "O deus corrompido fala",
            icone: "⚡",
            narrador: "Narrador",
            texto: "Axiom não cabe totalmente na percepção mortal. Sua forma muda conforme você tenta entendê-la: por vezes humanoide, por vezes colossal, por vezes feita de armadura, ossos, luz negra e ruína divina.\n\nSeus olhos parecem estrelas mortas.",
            fala: {
                nome: "Axiom",
                texto: getTextoAxiomPorMomento("intro")
            },
            pensamentosPersonagem: {
                "guerreiro": "Bom. Agora o inimigo tem forma suficiente para cair.",
                "guerreira": "Deus, culto, trono, ruína... no fim ainda é só mais um tirano que precisa ser derrubado.",
                "draconato": "Ele fala como divindade. Eu o ouço como usurpador.",
                "draconata": "Então esta é a voz por trás de séculos de selos partidos e fé deformada.",
                "arqueiro": "Tanto rastro, tanta morte e tanta fuga para terminar em uma presença só.",
                "arqueira": "Ele quer parecer inevitável. Já vi líderes assim caírem gritando menos.",
                "mago": "Finalmente, Axiom. Fenômeno, entidade, desastre teológico e alvo definitivo.",
                "maga": "É pior do que nos sonhos. E, estranhamente, mais familiar do que eu gostaria.",
                "leonide.m": "Nem toda grandeza merece reverência. Algumas merecem resistência absoluta.",
                "leonide.f": "Então era esta a presença que falava por trás de tantas vozes fragmentadas.",
                "halfling.m": "Ótimo. O apocalipse finalmente parou de mandar intermediários.",
                "halfling.f": "Ele fala como quem sempre esperou ser obedecido. Vai ser bom quebrar isso.",
                "druida.m": "Não importa o tamanho da força. Tudo que fere o mundo pode ser enfrentado.",
                "druida.f": "É como ver uma canção antiga apodrecer e ainda insistir em ser cantada.",
                "monge.m": "Quanto maior a presença, mais simples precisa ser o centro da minha vontade.",
                "monge.f": "Enfim. O nome, a forma e o vazio por trás de ambos no mesmo lugar."
            },
            escolha: {
                pergunta: "Últimas palavras antes da batalha final?",
                opcoes: [
                    criarOpcaoNarrativa({
                        texto: "🙏 “Eu luto pelo mundo que você quer destruir.”",
                        rota: "heroi",
                        pesoRota: 2,
                        resultadoTexto: "Você responde com tudo o que a jornada fez de você: perdas, vitórias, cicatrizes, nomes de mortos, cidades salvas e horrores enfrentados. Não fala apenas por si.\n\nPor um instante, a energia dos portais já selados parece vibrar ao seu redor como resposta.",
                        recompensaTexto: "🌟 +5 em TODOS os atributos | Alinhamento Heroico",
                        iconeResultado: "🙏",
                        vozResultado: criarNomeArquivoVoz(15, "cena2", "resultado_heroi"),
                        onEscolha: function() {
                            adicionarPontoRota("heroi", 2);
                            player.forca += 5;
                            player.destreza += 5;
                            player.vigor += 5;
                            player.inteligencia += 5;
                            player.sabedoria += 5;
                            player.carisma += 5;
                            if (typeof aplicarBonusEquipamentos === "function") aplicarBonusEquipamentos();
                            if (typeof updateUI === "function") updateUI();
                        }
                    }),
                    criarOpcaoNarrativa({
                        texto: "⚔️ “Menos conversa. Mais luta.”",
                        rota: "neutro",
                        pesoRota: 1,
                        resultadoTexto: "Você não oferece discurso. Não oferece medo. Não oferece filosofia.\n\nApenas decisão.\n\nSeu corpo se enrijece, sua vontade se concentra, e tudo em você se volta para o essencial: vencer.",
                        recompensaTexto: "⚔️ +8 Força | ❤️ +8 Vigor | Alinhamento Neutro",
                        iconeResultado: "⚔️",
                        vozResultado: criarNomeArquivoVoz(15, "cena2", "resultado_neutro"),
                        onEscolha: function() {
                            adicionarPontoRota("neutro", 1);
                            player.forca += 8;
                            player.vigor += 8;
                            if (typeof aplicarBonusEquipamentos === "function") aplicarBonusEquipamentos();
                            if (typeof updateUI === "function") updateUI();
                        }
                    }),
                    criarOpcaoNarrativa({
                        texto: "💀 “Eu não vim destruí-lo. Vim substituí-lo.”",
                        rota: "sombrio",
                        pesoRota: 2,
                        resultadoTexto: "Suas palavras atravessam o trono como lâmina invisível.\n\nPela primeira vez desde o início do encontro, Axiom hesita.\n\nA energia ao redor se agita com violência. Parte do poder do trono parece reagir a essa ousadia quase como convite.",
                        recompensaTexto: "⚔️ +10 Força | 🔮 +10 Inteligência | Alinhamento Sombrio",
                        iconeResultado: "💀",
                        vozResultado: criarNomeArquivoVoz(15, "cena2", "resultado_sombrio"),
                        onEscolha: function() {
                            adicionarPontoRota("sombrio", 2);
                            player.forca += 10;
                            player.inteligencia += 10;
                            if (typeof aplicarBonusEquipamentos === "function") aplicarBonusEquipamentos();
                            if (typeof updateUI === "function") updateUI();
                        }
                    })
                ]
            },
            vozNarrador: criarNomeArquivoVoz(15, "cena2", "narrador"),
            vozFala: criarNomeArquivoVoz(15, "cena2", "fala_intro")
        }),

        criarCenaNarrativaBase({
            id: "cap15_cena3",
            tipo: "chave",
            titulo: "Antes do último golpe",
            icone: "⚔️",
            narrador: "Narrador",
            texto: "Tudo converge ali.\n\nA estrada da floresta.\nA névoa do pântano.\nAs colinas de guerra.\nAs ruínas.\nO deserto.\nOs mortos.\nAs profundezas.\nO vulcão.\nA geleira.\nA cidade perdida.\nO abismo.\nO castelo.\nAs estrelas.\nO inferno.\n\nCada passo da jornada o trouxe até o último campo de batalha.",
            pensamentosPersonagem: {
                "guerreiro": "Todos os mortos que carreguei até aqui finalmente têm direção.",
                "guerreira": "Cada túnel perdido, cada ruína e cada pedra rachada trouxeram meu passo até este ponto.",
                "draconato": "Se todo juramento da minha ordem servia a algo, era a este instante.",
                "draconata": "As quedas dos templos, os selos rompidos, os velhos segredos — tudo converge aqui.",
                "arqueiro": "Todo rastro termina. O deste horror termina em mim agora.",
                "arqueira": "Tudo que me expulsou, acusou ou tentou quebrar só me trouxe mais reta até este momento.",
                "mago": "Teoria, ruína, culto, rede, deus. A jornada inteira finalmente assume forma completa.",
                "maga": "Se fui chamada até aqui desde cedo, então agora respondo com toda consciência do que isso significa.",
                "leonide.m": "Cada alma que não pôde subir, cada altar que caiu, cada inocente perdido... todos vieram comigo até este ponto.",
                "leonide.f": "As vozes se calam porque chegou a hora da minha, sozinha, decidir.",
                "halfling.m": "Eu só queria sobreviver. Agora estou prestes a decidir o destino do mundo. Que trajetória inconveniente.",
                "halfling.f": "Fui ignorada, desacreditada e deixada para trás vezes demais. Não agora.",
                "druida.m": "Cada ferida que senti no mundo me trouxe até a artéria principal.",
                "druida.f": "Tudo que ainda canta, mesmo ferido, parece respirar através de mim por um instante.",
                "monge.m": "Todo treino, toda contenção, toda luta contra o que há de pior em mim existia para que eu não vacilasse aqui.",
                "monge.f": "O futuro que vi não termina sozinho. Ele espera decisão."
            },
            vozNarrador: criarNomeArquivoVoz(15, "cena3", "narrador")
        }),

        criarCenaNarrativaBase({
            id: "cap15_cena4",
            tipo: "chave",
            titulo: "O destino do mundo",
            icone: "🌟",
            narrador: "Narrador",
            texto: "A batalha final se aproxima.\n\nSe você cair, a rede pode se reabrir.\nSe vencer, o mundo respira.\nMas talvez não volte a ser o mesmo.\n\nPorque ninguém atravessa tantos portais, tantos infernos, tantos espelhos e tantos deuses sem deixar partes de si pelo caminho.",
            fala: {
                nome: "Axiom",
                texto: "Venha, então.\n\nMostre-me se o mundo realmente merece sobreviver através de você."
            },
            pensamentosPersonagem: {
                "guerreiro": "Se este for meu último campo de batalha, que ao menos seja o necessário.",
                "guerreira": "O mundo aguenta mais do que pensa. Ainda assim, seria bom não deixá-lo provar o contrário hoje.",
                "draconato": "Se eu cair, que caia voltado para a luz e contra a ruína.",
                "draconata": "Nem sempre é possível salvar tudo. Mas ainda é possível impedir o pior.",
                "arqueiro": "No fim, toda caça vira um instante de silêncio antes da decisão.",
                "arqueira": "Não vim tão longe para permitir que a história termine nas mãos dele.",
                "mago": "Todo conhecimento reunido agora se resume a uma única variável: vencer.",
                "maga": "Se o poder queria me conduzir até aqui, então vai me encontrar decidindo o que fazer com ele.",
                "leonide.m": "O mundo sempre vale o esforço de tentar salvá-lo, mesmo quando ele já parece tarde demais.",
                "leonide.f": "Talvez eu nunca tenha sido escolhida para obedecer. Talvez tenha sido escolhida para dizer não.",
                "halfling.m": "Eu realmente preferiria que alguém mais qualificado resolvesse isso. Mas como não aconteceu, tudo bem.",
                "halfling.f": "Se o destino do mundo sempre acaba na mão dos improváveis, então hoje ele tem sorte de eu estar aqui.",
                "druida.m": "O mundo ainda quer viver. Dá para sentir isso mesmo agora.",
                "druida.f": "Enquanto ainda houver uma nota viva no mundo, vale lutar para que ela continue.",
                "monge.m": "O fim não me assusta tanto quanto a ideia de entregar a decisão sem lutar até o último limite.",
                "monge.f": "Destino nunca foi sentença pronta. Sempre foi encontro entre possibilidade e escolha."
            },
            vozNarrador: criarNomeArquivoVoz(15, "cena4", "narrador"),
            vozFala: criarNomeArquivoVoz(15, "cena4", "fala")
        })
    ]
});

// ============================================
// SEÇÃO 48: NPCs DE CAMPANHA DISPONÍVEIS NA ÁREA
// ============================================

function getNpcCampanhaDisponiveisNaArea(areaKey) {
    if (typeof getNpcCampanhaDaArea !== "function") return [];

    var lista = getNpcCampanhaDaArea(areaKey) || [];

    if (typeof npcCampanhaEstaDisponivel !== "function") {
        return lista;
    }

    return lista.filter(function(npcId) {
        return npcCampanhaEstaDisponivel(npcId);
    });
}

// ============================================
// SEÇÃO 49: STATUS DE VOZ NA INTERFACE
// ============================================

function getStatusAudioNarracaoTexto(cena) {
    if (!narracaoConfig.habilitarVoz) return "🔇 Voz desativada";

    if (cena && (cena.vozNarrador || cena.vozFala)) {
        return "🎙️ Narração com voz disponível";
    }

    return "🔈 Cena sem voz gravada";
}

// ============================================
// SEÇÃO 50: TEXTO VISUAL DA ROTA ATUAL
// ============================================

function getTextoRotaAtualUI() {
    var rota = getRotaDominante();

    switch (rota) {
        case "heroi": return "Rota dominante: HEROICA";
        case "sombrio": return "Rota dominante: SOMBRIA";
        default: return "Rota dominante: NEUTRA";
    }
}
function tocarListaAudiosNarracao(lista) {
    if (!lista || lista.length === 0) return;

    var index = 0;

    function tocarProximo() {
        if (index >= lista.length) return;

        var nomeArquivo = lista[index];
        var caminho = getCaminhoVoz(nomeArquivo);

        console.log("Tocando áudio da lista:", caminho);

        pararAudioNarracao();

        var audio = new Audio(caminho);
        narracaoState.audioAtual = audio;

        audio.onended = function() {
            index++;
            tocarProximo();
        };

        audio.onerror = function() {
            console.warn("Erro ao carregar áudio:", caminho);
            index++;
            tocarProximo();
        };

        audio.play().catch(function(err) {
            console.warn("Falha ao tocar áudio:", caminho, err);
            index++;
            tocarProximo();
        });
    }

    tocarProximo();
}

// ============================================
// SEÇÃO 51: RENDERIZAÇÃO AVANÇADA DA CENA NARRATIVA
// ============================================

function renderizarCenaNarrativaAtual() {
    var cena = getCenaNarrativaAtual();
    if (!cena) {
        finalizarCapituloNarrativo();
        return;
    }

    registrarCenaVista(cena.id);

    var el = document.getElementById("historiaContent");
    if (!el) return;

    var pensamento = getPensamentoCena(cena);
    var statusAudio = getStatusAudioNarracaoTexto(cena);
    var textoRota = getTextoRotaAtualUI();

    var html = '<div class="historia-card">';
    html += '<div class="historia-capitulo-titulo">' + (narracaoState.capituloAtual.titulo || "Capítulo") + '</div>';

    if (cena.titulo) {
        html += '<div class="historia-cena-titulo">' + cena.titulo + '</div>';
    }

    html += '<div class="historia-status-rota">' + textoRota + '</div>';
    html += '<div class="historia-icone">' + (cena.icone || "📖") + '</div>';
    html += '<div class="historia-audio-indicador">' + statusAudio + '</div>';

    html += '<div class="historia-narrador-label">' + (cena.narrador || "Narrador") + '</div>';
    html += '<div class="historia-texto">' + (cena.texto || "") + '</div>';

    if (cena.fala) {
        html += '<div class="historia-fala-box">';
        html += '<div class="historia-fala-nome">' + (cena.fala.nome || "Personagem") + '</div>';
        html += '<div class="historia-fala-texto">' + (cena.fala.texto || "") + '</div>';
        html += '</div>';
    }

    if (pensamento && narracaoConfig.habilitarTextoPensamento) {
        html += '<div class="historia-pensamento-box">';
        html += '<div class="historia-pensamento-nome">Pensamento de ' + (player.nome || "Protagonista") + '</div>';
        html += '<div class="historia-pensamento-texto">' + pensamento + '</div>';
        html += '</div>';
    }

    if (cena.escolha) {
        html += '<div class="historia-escolha-box">';
        html += '<div class="historia-escolha-pergunta">' + cena.escolha.pergunta + '</div>';

        cena.escolha.opcoes.forEach(function(opcao, i) {
            html += '<button class="historia-btn-escolha" onclick="escolherOpcaoNarrativa(' + i + ')">' + opcao.texto + '</button>';
        });

        html += '</div>';

        html += '<div class="historia-controles">';
        html += '<button class="historia-btn" onclick="repetirVozCenaAtual()">🔁 Repetir Voz</button>';
        html += '</div>';
    } else {
        html += '<div class="historia-controles">';
        html += '<button class="historia-btn" onclick="proximaCenaNarrativa()">Continuar ▶️</button>';
        html += '<button class="historia-btn" onclick="repetirVozCenaAtual()">🔁 Repetir Voz</button>';
        html += '</div>';
    }

    html += '</div>';

el.innerHTML = html;

try {
    var capituloId = narracaoState.capituloAtual.id;
    var cenaId = narracaoState.cenaAtualIndex + 1;
    var listaAudios = [];

    if (cena.texto) {
        listaAudios.push(criarNomeArquivoVoz(capituloId, cenaId, "narrador"));
    }

    if (cena.fala) {
        listaAudios.push(criarNomeArquivoVoz(capituloId, cenaId, "fala"));
    }

    if (pensamento) {
        var personagemId = null;

        if (typeof getPersonagemNarrativoId === "function") {
            personagemId = getPersonagemNarrativoId();
        }

        if (personagemId) {
            listaAudios.push(criarNomeArquivoVoz(capituloId, cenaId, "pensamento", personagemId));
        } 
        
    }

    setTimeout(function() {
        tocarListaAudiosNarracao(listaAudios);
    }, 200);
} catch (e) {
    console.warn("Erro no bloco de áudio da narrativa:", e);
}}
// ============================================
// SEÇÃO 52: RESULTADO DE ESCOLHA VISUAL MELHORADO
// ============================================

function mostrarResultadoEscolhaNarrativa(opcao) {
    var el = document.getElementById("historiaContent");
    if (!el) return;

    var html = '<div class="historia-card">';
    html += '<div class="historia-icone">' + (opcao.iconeResultado || "✨") + '</div>';
    html += '<div class="historia-texto" style="text-align:center;">' + opcao.resultadoTexto + '</div>';

    if (opcao.recompensaTexto) {
        html += '<div class="historia-recompensa">' + opcao.recompensaTexto + '</div>';
    }

    html += '<div class="historia-controles">';
    html += '<button class="historia-btn" onclick="proximaCenaNarrativa()">Continuar ▶️</button>';
    html += '</div>';
    html += '</div>';

    el.innerHTML = html;

    if (opcao.vozResultado) {
        tocarAudioNarracao(opcao.vozResultado);
    }
}

// ============================================
// SEÇÃO 53: REPETIR VOZ DA CENA
// ============================================

function repetirVozCenaAtual() {
    var cena = getCenaNarrativaAtual();
    if (!cena) return;

    if (cena.vozNarrador) {
        tocarAudioNarracao(cena.vozNarrador);
    } else if (cena.vozFala) {
        tocarAudioNarracao(cena.vozFala);
    } else {
        if (typeof mostrarNotificacao === "function") {
            mostrarNotificacao("🔇 Esta cena ainda não possui voz gravada.");
        }
    }
}

// ============================================
// SEÇÃO 54: RESUMO DOS ALIADOS DA CAMPANHA
// ============================================

function getResumoAliadosCampanha() {
    garantirNarrativa();

    var npc = player.narrativa.npcCampanha;

    return {
        elianAliado: npc.elian && (npc.elian.confianca > 0 || npc.elian.respeito > 1) && !npc.elian.ruptura,
        sorayaAliada: npc.soraya && (npc.soraya.confianca > 0 || npc.soraya.respeito > 0) && !npc.soraya.ruptura,
        draevenAliado: npc.draeven && (npc.draeven.respeito > 0 || npc.draeven.confianca > 0) && !npc.draeven.ruptura,
        irisAliada: npc.iris && (npc.iris.respeito > 0 || npc.iris.confianca > 0) && !npc.iris.ruptura,
        tallenAliado: npc.tallen && (npc.tallen.respeito > 0 || npc.tallen.confianca > 0) && !npc.tallen.ruptura,
        maelaAliada: npc.maela && (npc.maela.confianca > 0 || npc.maela.respeito > 0) && !npc.maela.ruptura
    };
}

// ============================================
// SEÇÃO 55: EPÍLOGOS DE NPCs NO FINAL
// ============================================

function getEpilogosNpcFinal() {
    var aliados = getResumoAliadosCampanha();
    var textos = [];

    if (aliados.elianAliado) {
        textos.push("📚 Elian sobrevive para registrar a verdadeira história dos Eternos e do herói que os enfrentou.");
    }

    if (aliados.sorayaAliada) {
        textos.push("🕯️ Soraya conduz almas perdidas ao descanso, e os mortos deixam de sussurrar com tanto desespero.");
    }

    if (aliados.draevenAliado) {
        textos.push("🪓 Draeven ajuda a reconstruir a honra dos seus, provando que povos marcados pela guerra ainda podem escolher outro futuro.");
    }

    if (aliados.irisAliada) {
        textos.push("🔷 Iris Vael preserva o conhecimento necessário para que os selos jamais sejam esquecidos de novo.");
    }

    if (aliados.tallenAliado) {
        textos.push("🛡️ Tallen faz do velho fracasso da guarda real a semente de uma nova ordem protetora.");
    }

    if (aliados.maelaAliada) {
        textos.push("🩸 Maela aprende a viver sem ser apenas cicatriz, tornando-se símbolo de sobrevivência contra a corrupção dos portais.");
    }

    return textos;
}

// ============================================
// SEÇÃO 56: FINAL NARRATIVO EXPANDIDO
// ============================================

function mostrarFinalNarrativo() {
    var finalData = getFinalNarrativo();
    if (!finalData) return;

    if (typeof mostrarPainel === "function") {
        mostrarPainel("historiaPanel");
    }

    var el = document.getElementById("historiaContent");
    if (!el) return;

    var epilogosNpc = getEpilogosNpcFinal();
    var rota = getRotaDominante();

    var html = '<div class="historia-card">';
    html += '<div class="historia-icone">🌟</div>';
    html += '<div class="historia-capitulo-titulo">' + finalData.titulo + '</div>';
    html += '<div class="historia-status-rota">Desfecho da rota: ' + rota.toUpperCase() + '</div>';
    html += '<div class="historia-texto">' + finalData.resumo + '</div>';
    html += '<div class="historia-pensamento-box">';
html += '<div class="historia-pensamento-nome">Último eco de Axiom</div>';
html += '<div class="historia-pensamento-texto">' + getDesfechoAxiomPorRota() + '</div>';
html += '</div>';
html += '<div class="historia-recompensa">' + getBonusFinalPorAliados() + '</div>';
    if (epilogosNpc.length > 0) {
        html += '<div class="historia-fala-box" style="border-left-color:#fbbf24;">';
        html += '<div class="historia-fala-nome" style="color:#fbbf24;">Ecos do mundo após sua vitória</div>';
        html += '<div class="historia-fala-texto">';
        html += epilogosNpc.join("\n\n");
        html += '</div>';
        html += '</div>';
    }

    html += '<div class="historia-controles">';
    html += '<button class="historia-btn" onclick="mostrarPainel(\'navigationContainer\')">Voltar ao Jogo</button>';
    html += '</div>';
    html += '</div>';

    el.innerHTML = html;

    garantirNarrativa();
    player.narrativa.finalAlcancado = finalData.id;
}

// ============================================
// SEÇÃO 57: DESFECHO DE AXYOM POR ROTA
// ============================================

function getDesfechoAxiomPorRota() {
    var rota = getRotaDominante();

    switch (rota) {
        case "heroi":
            return "Ao cair, Axiom não vê um usurpador nem um rival pragmático. Vê alguém que insistiu em proteger um mundo imperfeito até o fim.";
        case "sombrio":
            return "Ao cair, Axiom reconhece no vencedor algo ainda mais inquietante do que oposição: continuidade possível.";
        default:
            return "Ao cair, Axiom reconhece no vencedor a rara lucidez de quem compreendeu a ruína sem se ajoelhar diante dela.";
    }
}

// ============================================
// SEÇÃO 58: BÔNUS DE FINAL POR ALIADOS
// ============================================

function getBonusFinalPorAliados() {
    var aliados = getResumoAliadosCampanha();
    var total = 0;

    Object.keys(aliados).forEach(function(k) {
        if (aliados[k]) total++;
    });

    if (total >= 5) {
        return "🌍 Muitos permaneceram ao seu lado até o fim. Sua vitória ecoa como reconstrução, não apenas como sobrevivência.";
    }

    if (total >= 3) {
        return "🕊️ Alguns ainda guardam sua memória como prova de que o mundo quase caiu — e ainda assim resistiu.";
    }

    return "🌫️ Sua vitória foi real, mas solitária. O mundo sobrevive, embora com menos vozes para lembrá-la.";
}

