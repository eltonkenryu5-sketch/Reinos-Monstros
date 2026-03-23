// ============================================
// SAVE.JS COM 3 SLOTS
// ============================================

// ============================================
// SEÇÃO 1: CONFIGURAÇÃO
// ============================================

const SAVE_VERSION = "6.0";
const TOTAL_SLOTS = 3;

function getSaveKey(slot) {
    return "reinosMonstros_save_slot_" + slot;
}

// ============================================
// SEÇÃO 2: MONTAR DADOS
// ============================================

function montarDadosSave() {
    return {
        version: SAVE_VERSION,
        dataSalvamento: new Date().toLocaleString("pt-BR"),

        player: typeof player !== "undefined" ? player : null,
        gameState: typeof gameState !== "undefined" ? gameState : null,
        talentos: typeof talentos !== "undefined" ? talentos : null,
        estatisticas: typeof estatisticas !== "undefined" ? estatisticas : null,

        sistemaMissoes: typeof sistemaMissoes !== "undefined" ? {
            missoesCompletas: sistemaMissoes.missoesCompletas || 0,
            missaoAtiva: sistemaMissoes.missaoAtiva || null,
            historico: sistemaMissoes.historico || []
        } : null,

        conquistas: typeof conquistas !== "undefined" ? {
            total: conquistas.totalDesbloqueadas || 0,
            ids: (conquistas.lista || [])
                .filter(function(c) { return c.desbloqueada; })
                .map(function(c) { return c.id; })
        } : null,

        treinamento: typeof treinamento !== "undefined" ? treinamento : null,
        arena: typeof arena !== "undefined" ? arena : null,
        cemiterio: typeof cemiterio !== "undefined" ? cemiterio : null,
        mineracaoState: typeof mineracaoState !== "undefined" ? mineracaoState : null,
        feroxData: typeof feroxData !== "undefined" ? feroxData : null,

        arvoreHabilidades: typeof arvoreHabilidades !== "undefined" ? arvoreHabilidades : null,
        pontosHabilidade: typeof pontosHabilidade !== "undefined" ? pontosHabilidade : 0,
        modoJogo: typeof modoJogo !== "undefined" ? modoJogo : null
    };
}

// ============================================
// SEÇÃO 3: SALVAR EM SLOT (ATUALIZADO)
// ============================================

function salvarJogo(slot) {
    if (!slot) {
        abrirMenuSlotsSalvar();
        return;
    }

    try {
        if (typeof garantirEstadoNarrativoPlayer === "function") {
            garantirEstadoNarrativoPlayer();
        }
        if (typeof expandirEstadoNarrativoHistoria === "function") {
            expandirEstadoNarrativoHistoria();
        }
        if (typeof normalizarCamposNarrativosSeNecessario === "function") {
            normalizarCamposNarrativosSeNecessario();
        }

        const saveData = montarDadosSaveCompleto();

        // Atualizar o slot do auto-save para o slot que o jogador escolheu
        slotAutoSaveAtual = slot;

        // Se não tem gameId ainda, gerar um
        if (!gameIdAtual) {
            gameIdAtual = gerarGameId();
            saveData.gameId = gameIdAtual;
        }

        localStorage.setItem(getSaveKey(slot), JSON.stringify(saveData));

        verificarSaveExistente();
        fecharMenuSlots();

        if (typeof mostrarNotificacao === "function") {
            mostrarNotificacao("💾 Jogo salvo no Slot " + slot + "!");
        }

        if (typeof log === "function") {
            log("💾 Progresso salvo no Slot " + slot + ".");
        }
    } catch (e) {
        console.error("Erro ao salvar no slot " + slot + ":", e);

        if (typeof mostrarNotificacao === "function") {
            mostrarNotificacao("❌ Erro ao salvar no Slot " + slot + "!");
        }
    }
}
// ============================================
// SEÇÃO 4: MIGRAÇÃO E GARANTIA DE DADOS NARRATIVOS
// ============================================

function migrarSaveNarrativo(dados) {
    if (!dados) return dados;
    if (!dados.player) return dados;

    // Se não existir narrativa, cria base completa
    if (!dados.player.narrativa) {
        dados.player.narrativa = {
            rota: {
                heroi: 0,
                neutro: 0,
                sombrio: 0
            },

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

    // Garantias extras para saves antigos ou incompletos
    if (!dados.player.narrativa.rota) {
        dados.player.narrativa.rota = { heroi: 0, neutro: 0, sombrio: 0 };
    }

    if (!dados.player.narrativa.flagsNarrativas) {
        dados.player.narrativa.flagsNarrativas = {};
    }

    if (!dados.player.narrativa.npcCampanha) {
        dados.player.narrativa.npcCampanha = {
            elian:   { confianca: 0, respeito: 0, medo: 0, ruptura: false, eventoConcluido: false },
            soraya:  { confianca: 0, respeito: 0, medo: 0, ruptura: false, eventoConcluido: false },
            draeven: { confianca: 0, respeito: 0, medo: 0, ruptura: false, eventoConcluido: false },
            iris:    { confianca: 0, respeito: 0, medo: 0, ruptura: false, eventoConcluido: false },
            tallen:  { confianca: 0, respeito: 0, medo: 0, ruptura: false, eventoConcluido: false },
            maela:   { confianca: 0, respeito: 0, medo: 0, ruptura: false, eventoConcluido: false }
        };
    }

    // compatibilidade com nomes antigos
    if (!dados.player.narrativa.capitulosVistos && dados.player.narrativa.capitulosNarrativosVistos) {
        dados.player.narrativa.capitulosVistos = dados.player.narrativa.capitulosNarrativosVistos;
    }

    if (!dados.player.narrativa.cenasVistas && dados.player.narrativa.cenasNarrativasVistas) {
        dados.player.narrativa.cenasVistas = dados.player.narrativa.cenasNarrativasVistas;
    }

    if (!dados.player.narrativa.capitulosVistos) dados.player.narrativa.capitulosVistos = [];
    if (!dados.player.narrativa.cenasVistas) dados.player.narrativa.cenasVistas = [];
    if (!dados.player.narrativa.eventosNarrativosConcluidos) dados.player.narrativa.eventosNarrativosConcluidos = [];
    if (!dados.player.narrativa.escolhasGrandes) dados.player.narrativa.escolhasGrandes = [];

    if (!dados.player.narrativa.marcasNarrativas) {
        dados.player.narrativa.marcasNarrativas = {
            contatoComCorrupcao: 0,
            misericordiaExercida: 0,
            ambicaoAssumida: 0
        };
    }

    if (typeof dados.player.narrativa.finalAlcancado === "undefined") {
        dados.player.narrativa.finalAlcancado = null;
    }

    return dados;
}



// ============================================
// SEÇÃO 5: CARREGAR DE SLOT (ATUALIZADO)
// ============================================

function carregarJogoSalvo(slot) {
    if (!slot) {
        abrirMenuSlotsCarregar();
        return;
    }

    const save = localStorage.getItem(getSaveKey(slot));

    if (!save) {
        if (typeof mostrarNotificacao === "function") {
            mostrarNotificacao("⚠️ Slot " + slot + " vazio.");
        }
        return;
    }

    try {
        const d = JSON.parse(save);
        const dadosMigrados = migrarSaveNarrativo(d);

        // ★ CORREÇÃO PRINCIPAL: Restaurar slot e gameId ao carregar
        slotAutoSaveAtual = slot;
        gameIdAtual = dadosMigrados.gameId || gerarGameId();

        console.log("[SaveSystem] Jogo carregado do Slot " + slot + " | GameID: " + gameIdAtual);
        console.log("[SaveSystem] Auto-save agora aponta para Slot " + slotAutoSaveAtual);

        if (dadosMigrados.player) {
            player = Object.assign({
                equipamentos: {
                    arma: null,
                    armadura: null,
                    elmo: null,
                    botas: null,
                    anel: null,
                    amuleto: null
                },
                inventario: [],
                missoesConcluidas: [],
                baseMaxHp: 0,
                guilda: {
                    atual: null,
                    rank: 0,
                    xp: 0,
                    xpProximo: 100,
                    missaoAtiva: null,
                    missaoProgresso: 0
                }
            }, dadosMigrados.player);

            if (!player.baseMaxHp) player.baseMaxHp = player.maxHp || 0;
            if (!player.missoesConcluidas) player.missoesConcluidas = [];
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

        if (typeof garantirEstadoNarrativoPlayer === "function") {
            garantirEstadoNarrativoPlayer();
        }

        if (dadosMigrados.gameState && typeof gameState !== "undefined") gameState = Object.assign(gameState, dadosMigrados.gameState);
        if (dadosMigrados.talentos && typeof talentos !== "undefined") talentos = dadosMigrados.talentos;
        if (dadosMigrados.estatisticas && typeof estatisticas !== "undefined") estatisticas = Object.assign(estatisticas, dadosMigrados.estatisticas);
        if (dadosMigrados.historiaProgresso && typeof historiaProgresso !== "undefined") historiaProgresso = dadosMigrados.historiaProgresso;

        if (dadosMigrados.sistemaMissoes && typeof sistemaMissoes !== "undefined") {
            sistemaMissoes.missoesCompletas = dadosMigrados.sistemaMissoes.missoesCompletas || 0;
            sistemaMissoes.missaoAtiva = dadosMigrados.sistemaMissoes.missaoAtiva || null;
            sistemaMissoes.historico = dadosMigrados.sistemaMissoes.historico || [];
        }

        if (dadosMigrados.conquistas && typeof conquistas !== "undefined") {
            (conquistas.lista || []).forEach(function (c) {
                c.desbloqueada = false;
            });

            if (dadosMigrados.conquistas.ids) {
                dadosMigrados.conquistas.ids.forEach(function (id) {
                    const c = conquistas.lista.find(function (x) {
                        return x.id === id;
                    });
                    if (c) c.desbloqueada = true;
                });
            }

            conquistas.totalDesbloqueadas = dadosMigrados.conquistas.total || 0;
        }

        if (dadosMigrados.treinamento && typeof treinamento !== "undefined") treinamento = dadosMigrados.treinamento;
        if (dadosMigrados.arena && typeof arena !== "undefined") arena = dadosMigrados.arena;
        if (dadosMigrados.cemiterio && typeof cemiterio !== "undefined") cemiterio = dadosMigrados.cemiterio;
        if (dadosMigrados.mineracaoState && typeof mineracaoState !== "undefined") mineracaoState = dadosMigrados.mineracaoState;
        if (dadosMigrados.feroxData && typeof feroxData !== "undefined") feroxData = dadosMigrados.feroxData;
        if (dadosMigrados.arvoreHabilidades && typeof arvoreHabilidades !== "undefined") arvoreHabilidades = dadosMigrados.arvoreHabilidades;
        if (typeof dadosMigrados.pontosHabilidade !== "undefined" && typeof pontosHabilidade !== "undefined") pontosHabilidade = dadosMigrados.pontosHabilidade;
        if (typeof dadosMigrados.modoJogo !== "undefined") modoJogo = dadosMigrados.modoJogo;

        const img = document.getElementById("playerImage");
        if (img && player.img) img.src = player.img;

        if (typeof aplicarBonusEquipamentos === "function") aplicarBonusEquipamentos();
        if (typeof updateUI === "function") updateUI();
        if (typeof mudarTela === "function") mudarTela("game");
        if (typeof mostrarPainel === "function") mostrarPainel("navigationContainer");

        fecharMenuSlots();

        if (typeof mostrarNotificacao === "function") {
            mostrarNotificacao("📂 Slot " + slot + " carregado com sucesso!");
        }

        if (typeof log === "function") {
            log("📂 Progresso carregado do Slot " + slot + ".");
        }

    } catch (e) {
        console.error("Erro ao carregar slot " + slot + ":", e);

        if (typeof mostrarNotificacao === "function") {
            mostrarNotificacao("❌ Erro ao carregar o Slot " + slot + "!");
        }
    }
}

// ============================================
// SEÇÃO 6: VERIFICAR SLOTS EXISTENTES
// ============================================

function verificarSaveExistente() {
    const btn = document.getElementById("btnContinuarSalvo") || document.getElementById("btnLoadGame");
    let existeAlgum = false;

    for (let i = 1; i <= TOTAL_SLOTS; i++) {
        if (localStorage.getItem(getSaveKey(i))) {
            existeAlgum = true;
            break;
        }
    }

    if (btn) {
        btn.style.display = existeAlgum ? "inline-block" : "none";
    }
}

// ============================================
// SEÇÃO 7: APAGAR SLOT
// ============================================

function apagarSave(slot) {
    if (!slot) return;

    try {
        localStorage.removeItem(getSaveKey(slot));
        verificarSaveExistente();

        if (typeof mostrarNotificacao === "function") {
            mostrarNotificacao("🗑️ Slot " + slot + " apagado.");
        }

        if (typeof log === "function") {
            log("🗑️ Save do Slot " + slot + " removido.");
        }
    } catch (e) {
        console.error("Erro ao apagar slot " + slot + ":", e);

        if (typeof mostrarNotificacao === "function") {
            mostrarNotificacao("❌ Erro ao apagar Slot " + slot + "!");
        }
    }
}

// ============================================
// SEÇÃO 8: MENU VISUAL DOS SLOTS
// ============================================

function obterResumoSlot(slot) {
    const save = localStorage.getItem(getSaveKey(slot));

    if (!save) {
        return {
            vazio: true,
            titulo: "Slot " + slot,
            subtitulo: "Vazio"
        };
    }

    try {
        const d = JSON.parse(save);

        return {
            vazio: false,
            titulo: "Slot " + slot,
            subtitulo: ((d.player && d.player.nome) || "Sem nome") + " — Lv." + ((d.player && d.player.level) || 1),
            data: d.dataSalvamento || "Sem data"
        };
    } catch (e) {
        return {
            vazio: false,
            titulo: "Slot " + slot,
            subtitulo: "Save corrompido"
        };
    }
}
function abrirMenuSlotsSalvar() {
    let html = '<div style="padding:15px;text-align:center;">';
    html += '<h3 style="color:#ffd700;margin-bottom:12px;">💾 Escolha um Slot para Salvar</h3>';

    for (let i = 1; i <= TOTAL_SLOTS; i++) {
        const s = obterResumoSlot(i);
        html += '<div style="background:rgba(30,41,59,0.7);border:1px solid #334155;border-radius:8px;padding:10px;margin-bottom:8px;">';
        html += '<strong style="color:#e2e8f0;">' + s.titulo + '</strong><br>';
        html += '<small style="color:#94a3b8;">' + s.subtitulo + '</small>';
        if (s.data) html += '<br><small style="color:#64748b;">' + s.data + '</small>';
        html += '<br><button onclick="salvarJogo(' + i + ')" style="margin-top:8px;">Salvar neste Slot</button>';
        html += '</div>';
    }

    html += '<button onclick="fecharMenuSlots()" class="back-btn">⬅️ Cancelar</button>';
    html += '</div>';

    abrirPopupSlots(html);
}

function abrirMenuSlotsCarregar() {
    let html = '<div style="padding:15px;text-align:center;">';
    html += '<h3 style="color:#ffd700;margin-bottom:12px;">📂 Escolha um Slot para Carregar</h3>';

    for (let i = 1; i <= TOTAL_SLOTS; i++) {
        const s = obterResumoSlot(i);
        html += '<div style="background:rgba(30,41,59,0.7);border:1px solid #334155;border-radius:8px;padding:10px;margin-bottom:8px;">';
        html += '<strong style="color:#e2e8f0;">' + s.titulo + '</strong><br>';
        html += '<small style="color:#94a3b8;">' + s.subtitulo + '</small>';
        if (s.data) html += '<br><small style="color:#64748b;">' + s.data + '</small>';

        if (!s.vazio) {
            html += '<br><button onclick="carregarJogoSalvo(' + i + ')" style="margin-top:8px;">Carregar</button>';
            html += ' <button onclick="apagarSave(' + i + '); abrirMenuSlotsCarregar();" style="margin-top:8px;background:#7f1d1d;border-color:#991b1b;">Apagar</button>';
        } else {
            html += '<br><button disabled style="margin-top:8px;opacity:0.5;">Vazio</button>';
        }

        html += '</div>';
    }

    html += '<button onclick="fecharMenuSlots()" class="back-btn">⬅️ Cancelar</button>';
    html += '</div>';

    abrirPopupSlots(html);
}

function abrirPopupSlots(html) {
    let popup = document.getElementById("slotsPopup");

    if (!popup) {
        popup = document.createElement("div");
        popup.id = "slotsPopup";
        popup.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.85);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 500;
            backdrop-filter: blur(4px);
        `;

        const box = document.createElement("div");
        box.id = "slotsPopupContent";
        box.style.cssText = `
            background: linear-gradient(135deg,#1e293b,#334155);
            border: 2px solid #38bdf8;
            border-radius: 12px;
            width: 90%;
            max-width: 420px;
            max-height: 85vh;
            overflow-y: auto;
            box-shadow: 0 0 20px rgba(56,189,248,0.25);
        `;

        popup.appendChild(box);
        document.body.appendChild(popup);
    }

    const content = document.getElementById("slotsPopupContent");
    if (content) content.innerHTML = html;

    popup.style.display = "flex";
}

function fecharMenuSlots() {
    const popup = document.getElementById("slotsPopup");
    if (popup) popup.style.display = "none";
}

// ============================================
// SEÇÃO 9: AUTOSAVE (CORRIGIDO)
// ============================================

let slotAutoSaveAtual = -1; // -1 = nenhum slot definido ainda
let gameIdAtual = ""; // identificador único da partida atual

// --- FUNÇÕES DE VERIFICAÇÃO DE SLOTS ---

/**
 * Verifica se um slot específico está vazio
 */
function isSlotVazio(slot) {
    return !localStorage.getItem(getSaveKey(slot));
}

/**
 * Verifica se um slot específico está ocupado
 */
function isSlotOcupado(slot) {
    return !!localStorage.getItem(getSaveKey(slot));
}

/**
 * Encontra o primeiro slot vazio disponível
 * Retorna: número do slot (1-3) ou -1 se todos ocupados
 */
function encontrarSlotVazio() {
    for (let i = 1; i <= TOTAL_SLOTS; i++) {
        if (isSlotVazio(i)) {
            console.log("[SaveSystem] Slot vazio encontrado: " + i);
            return i;
        }
    }
    console.log("[SaveSystem] Nenhum slot vazio disponível");
    return -1;
}

/**
 * Encontra o slot com o save mais antigo
 * Retorna: número do slot mais antigo
 */
function encontrarSlotMaisAntigo() {
    let slotMaisAntigo = 1;
    let dataMaisAntiga = null;

    for (let i = 1; i <= TOTAL_SLOTS; i++) {
        const save = localStorage.getItem(getSaveKey(i));
        if (!save) return i; // Se encontrar vazio, retorna direto

        try {
            const dados = JSON.parse(save);
            const timestamp = dados.timestamp || 0;

            if (dataMaisAntiga === null || timestamp < dataMaisAntiga) {
                dataMaisAntiga = timestamp;
                slotMaisAntigo = i;
            }
        } catch (e) {
            // Save corrompido = candidato a ser substituído
            return i;
        }
    }

    console.log("[SaveSystem] Slot mais antigo: " + slotMaisAntigo);
    return slotMaisAntigo;
}

/**
 * Encontra o melhor slot para auto-save de um novo jogo
 * Prioridade: slot vazio → slot mais antigo
 */
function encontrarMelhorSlotParaNovoJogo() {
    // 1º: Procurar slot vazio
    const slotVazio = encontrarSlotVazio();
    if (slotVazio !== -1) {
        return slotVazio;
    }

    // 2º: Todos ocupados → retorna -1 para perguntar ao jogador
    return -1;
}

/**
 * Encontra um slot pelo gameId (para continuar salvando na mesma partida)
 */
function encontrarSlotPorGameId(gameId) {
    if (!gameId) return -1;

    for (let i = 1; i <= TOTAL_SLOTS; i++) {
        const save = localStorage.getItem(getSaveKey(i));
        if (!save) continue;

        try {
            const dados = JSON.parse(save);
            if (dados.gameId === gameId) {
                return i;
            }
        } catch (e) {
            continue;
        }
    }
    return -1;
}

/**
 * Gera um ID único para a partida
 */
function gerarGameId() {
    return Date.now().toString(36) + "_" + Math.random().toString(36).substr(2, 6);
}

/**
 * Retorna informações detalhadas de todos os slots
 */
function obterInfoTodosSlots() {
    const info = [];

    for (let i = 1; i <= TOTAL_SLOTS; i++) {
        const save = localStorage.getItem(getSaveKey(i));

        if (!save) {
            info.push({
                slot: i,
                ocupado: false,
                dados: null
            });
            continue;
        }

        try {
            const dados = JSON.parse(save);
            info.push({
                slot: i,
                ocupado: true,
                dados: dados,
                nome: (dados.player && dados.player.nome) || "Sem nome",
                level: (dados.player && dados.player.level) || 1,
                data: dados.dataSalvamento || "Sem data",
                timestamp: dados.timestamp || 0,
                gameId: dados.gameId || ""
            });
        } catch (e) {
            info.push({
                slot: i,
                ocupado: true,
                dados: null,
                nome: "Corrompido",
                level: 0,
                data: "Erro",
                timestamp: 0,
                gameId: ""
            });
        }
    }

    return info;
}

// --- DEFINIR SLOT PARA AUTO-SAVE ---

function definirSlotAutoSave(slot) {
    slotAutoSaveAtual = slot;
    console.log("[SaveSystem] Slot de auto-save definido: " + slot);
}

// --- INICIAR NOVO JOGO COM SLOT CORRETO ---

/**
 * Deve ser chamada quando o jogador clica em "Novo Jogo"
 * Encontra automaticamente o slot correto
 */
function iniciarNovoJogoComSlot(callbackIniciar) {
    const slotVazio = encontrarSlotVazio();

    if (slotVazio !== -1) {
        // Existe slot vazio → usar diretamente
        gameIdAtual = gerarGameId();
        slotAutoSaveAtual = slotVazio;

        console.log("[SaveSystem] Novo jogo → Slot " + slotVazio + " (vazio) | GameID: " + gameIdAtual);

        if (typeof mostrarNotificacao === "function") {
            mostrarNotificacao("🎮 Novo jogo iniciado no Slot " + slotVazio + "!");
        }

        if (typeof callbackIniciar === "function") {
            callbackIniciar(slotVazio);
        }
    } else {
        // Todos os slots ocupados → perguntar ao jogador qual substituir
        console.log("[SaveSystem] Todos os slots ocupados. Pedindo escolha ao jogador.");
        abrirMenuEscolherSlotParaNovoJogo(callbackIniciar);
    }
}

/**
 * Menu para escolher qual slot sobrescrever quando todos estão cheios
 */
function abrirMenuEscolherSlotParaNovoJogo(callbackIniciar) {
    let html = '<div style="padding:15px;text-align:center;">';
    html += '<h3 style="color:#ff6b6b;margin-bottom:8px;">⚠️ Todos os Slots Ocupados</h3>';
    html += '<p style="color:#94a3b8;margin-bottom:12px;font-size:14px;">Escolha um slot para sobrescrever com o novo jogo:</p>';

    for (let i = 1; i <= TOTAL_SLOTS; i++) {
        const s = obterResumoSlot(i);
        html += '<div style="background:rgba(30,41,59,0.7);border:1px solid #ef4444;border-radius:8px;padding:10px;margin-bottom:8px;">';
        html += '<strong style="color:#e2e8f0;">' + s.titulo + '</strong><br>';
        html += '<small style="color:#94a3b8;">' + s.subtitulo + '</small>';
        if (s.data) html += '<br><small style="color:#64748b;">' + s.data + '</small>';
        html += '<br><button onclick="confirmarSobrescreverSlot(' + i + ')" ';
        html += 'style="margin-top:8px;background:#7f1d1d;border-color:#ef4444;color:#fca5a5;">';
        html += '⚠️ Sobrescrever este Slot</button>';
        html += '</div>';
    }

    html += '<button onclick="fecharMenuSlots()" class="back-btn" style="margin-top:10px;">⬅️ Cancelar</button>';
    html += '</div>';

    // Armazenar o callback para usar depois
    window._callbackNovoJogo = callbackIniciar;

    abrirPopupSlots(html);
}

/**
 * Confirmação antes de sobrescrever
 */
function confirmarSobrescreverSlot(slot) {
    const s = obterResumoSlot(slot);

    let html = '<div style="padding:20px;text-align:center;">';
    html += '<h3 style="color:#ff6b6b;margin-bottom:12px;">⚠️ Tem Certeza?</h3>';
    html += '<p style="color:#e2e8f0;margin-bottom:8px;">Você vai sobrescrever:</p>';
    html += '<div style="background:rgba(127,29,29,0.3);border:1px solid #ef4444;border-radius:8px;padding:10px;margin-bottom:12px;">';
    html += '<strong style="color:#fca5a5;">' + s.titulo + '</strong><br>';
    html += '<small style="color:#f87171;">' + s.subtitulo + '</small>';
    if (s.data) html += '<br><small style="color:#ef4444;">' + s.data + '</small>';
    html += '</div>';
    html += '<p style="color:#ff6b6b;font-size:13px;margin-bottom:15px;">⚠️ Este save será perdido permanentemente!</p>';

    html += '<button onclick="executarSobrescreverSlot(' + slot + ')" ';
    html += 'style="background:#dc2626;border-color:#ef4444;color:white;padding:10px 20px;margin-right:8px;">';
    html += '✓ Sim, Sobrescrever</button>';

    html += '<button onclick="abrirMenuEscolherSlotParaNovoJogo(window._callbackNovoJogo)" ';
    html += 'style="padding:10px 20px;">⬅️ Voltar</button>';

    html += '</div>';

    const content = document.getElementById("slotsPopupContent");
    if (content) content.innerHTML = html;
}

/**
 * Executa a sobrescrita e inicia o novo jogo
 */
function executarSobrescreverSlot(slot) {
    // Apagar o save antigo
    localStorage.removeItem(getSaveKey(slot));

    // Configurar novo jogo neste slot
    gameIdAtual = gerarGameId();
    slotAutoSaveAtual = slot;

    console.log("[SaveSystem] Slot " + slot + " sobrescrito | Novo GameID: " + gameIdAtual);

    fecharMenuSlots();

    if (typeof mostrarNotificacao === "function") {
        mostrarNotificacao("🎮 Novo jogo iniciado no Slot " + slot + "!");
    }

    // Executar callback do novo jogo
    if (typeof window._callbackNovoJogo === "function") {
        window._callbackNovoJogo(slot);
        window._callbackNovoJogo = null;
    }
}

// --- SALVAR COM GAME ID ---

/**
 * Versão melhorada do montarDadosSave que inclui gameId e timestamp
 */
function montarDadosSaveCompleto() {
    const dados = montarDadosSave();

    // Adicionar identificadores de controle
    dados.gameId = gameIdAtual;
    dados.timestamp = Date.now();
    dados.slotOriginal = slotAutoSaveAtual;

    return dados;
}

// --- AUTO-SAVE CORRIGIDO ---

function autoSalvarJogo() {
    try {
        // Verificações de segurança
        if (typeof player === "undefined" || !player) return;
        if (!player.nome || player.level <= 0) return;

        // Se não tem slot definido, tentar encontrar pelo gameId
        if (slotAutoSaveAtual === -1 || slotAutoSaveAtual < 1) {
            if (gameIdAtual) {
                const slotEncontrado = encontrarSlotPorGameId(gameIdAtual);
                if (slotEncontrado !== -1) {
                    slotAutoSaveAtual = slotEncontrado;
                    console.log("[SaveSystem] Auto-save: slot recuperado pelo GameID → Slot " + slotEncontrado);
                } else {
                    console.warn("[SaveSystem] Auto-save: nenhum slot definido e GameID não encontrado. Abortando.");
                    return;
                }
            } else {
                console.warn("[SaveSystem] Auto-save: nenhum slot e nenhum GameID definido. Abortando.");
                return;
            }
        }

        // Garantir dados narrativos
        if (typeof garantirEstadoNarrativoPlayer === "function") {
            garantirEstadoNarrativoPlayer();
        }

        // Montar e salvar
        const saveData = montarDadosSaveCompleto();
        localStorage.setItem(getSaveKey(slotAutoSaveAtual), JSON.stringify(saveData));

        console.log("[SaveSystem] Auto-save realizado no Slot " + slotAutoSaveAtual);

    } catch (e) {
        console.warn("[SaveSystem] Auto-save falhou:", e);
    }
}

// Timer de auto-save (60 segundos)
setInterval(function () {
    autoSalvarJogo();
}, 60000);

// --- RESETAR SESSÃO ---

/**
 * Chamar quando voltar ao menu principal
 */
function resetarSessaoSave() {
    slotAutoSaveAtual = -1;
    gameIdAtual = "";
    console.log("[SaveSystem] Sessão de save resetada");
}

// --- DEBUG ---

function debugSaveSlots() {
    console.log("\n========= STATUS DOS SLOTS =========");
    console.log("Slot auto-save atual: " + slotAutoSaveAtual);
    console.log("Game ID atual: " + gameIdAtual);

    const info = obterInfoTodosSlots();
    info.forEach(function (s) {
        if (s.ocupado) {
            console.log("SLOT " + s.slot + ": OCUPADO | " + s.nome + " Lv." + s.level + " | " + s.data + " | GID: " + s.gameId);
        } else {
            console.log("SLOT " + s.slot + ": VAZIO");
        }
    });
    console.log("=====================================\n");
}