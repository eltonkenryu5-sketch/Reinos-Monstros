
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
        // CURA
        { nome: "Poção Menor", icone: "🧪", preco: 15, tipo: "consumivel", descricao: "Restaura 25 HP", efeito: { tipo: "cura", valor: 25 } },
        { nome: "Poção de Cura", icone: "🧪", preco: 35, tipo: "consumivel", descricao: "Restaura 60 HP", efeito: { tipo: "cura", valor: 60 } },
        { nome: "Poção Grande", icone: "🧪", preco: 90, tipo: "consumivel", descricao: "Restaura 150 HP", efeito: { tipo: "cura", valor: 150 } },
        { nome: "Poção Superior", icone: "💉", preco: 220, tipo: "consumivel", descricao: "Restaura 350 HP", efeito: { tipo: "cura", valor: 350 } },
        { nome: "Poção Suprema", icone: "🧴", preco: 500, tipo: "consumivel", descricao: "Restaura 600 HP", efeito: { tipo: "cura", valor: 600 } },

        // UTILIDADE
        { nome: "Antídoto", icone: "💊", preco: 40, tipo: "consumivel", descricao: "Neutraliza toxinas e restaura 40 HP", efeito: { tipo: "cura", valor: 40 } },
        { nome: "Poção Revigorante", icone: "🍷", preco: 70, tipo: "consumivel", descricao: "Restaura 80 HP", efeito: { tipo: "cura", valor: 80 } },
        { nome: "Ração de Viagem", icone: "🥖", preco: 12, tipo: "consumivel", descricao: "Restaura 15 HP", efeito: { tipo: "cura", valor: 15 } },
        { nome: "Frasco de Emergência", icone: "🧃", preco: 120, tipo: "consumivel", descricao: "Restaura 180 HP", efeito: { tipo: "cura", valor: 180 } },

        // XP / PROGRESSÃO
        { nome: "Pergaminho de XP", icone: "📜", preco: 75, tipo: "consumivel", descricao: "+40 XP", efeito: { tipo: "exp", valor: 40 }, limiteCompra: 5, categoriaLoja: "xp" },
        { nome: "Tomo de Experiência", icone: "📘", preco: 180, tipo: "consumivel", descricao: "+120 XP", efeito: { tipo: "exp", valor: 120 }, limiteCompra: 5, categoriaLoja: "xp" },

        // BUFFS PERMANENTES
        { nome: "Tônico de Força", icone: "💪", preco: 180, tipo: "consumivel", descricao: "+2 Força permanente", efeito: { tipo: "buff_atk", valor: 2 }, limiteCompra: 10, categoriaLoja: "buff" },
        { nome: "Tônico da Destreza", icone: "💪", preco: 180, tipo: "consumivel", descricao: "+2 Destreza permanente", efeito: { tipo: "buff_atk", valor: 2 }, limiteCompra: 10, categoriaLoja: "buff" },
        { nome: "Tônico de Vigor", icone: "❤️", preco: 180, tipo: "consumivel", descricao: "+15 HP máx permanente", efeito: { tipo: "buff_hp", valor: 15 }, limiteCompra: 10, categoriaLoja: "buff" },

        // ESPECIAIS
        { nome: "Elixir de Poder", icone: "⚗️", preco: 450, tipo: "consumivel", descricao: "+5 Força permanente", efeito: { tipo: "buff_atk", valor: 5 }, limiteCompra: 5, categoriaLoja: "especial" },
        { nome: "Elixir de Vitalidade", icone: "💖", preco: 450, tipo: "consumivel", descricao: "+40 HP máx permanente", efeito: { tipo: "buff_hp", valor: 40 }, limiteCompra: 5, categoriaLoja: "especial" }
    ]
};
// ============================================
// EQUIPAMENTOS POR CLASSE (substitui catalogoArmaria)
// ============================================

var equipamentosPorClasse = {

   guerreiro: [
        { nome: "Espada de Ferro", icone: "⚔️", preco: 35, slot: "arma", descricao: "Lâmina simples e confiável", stats: { atk: 6, def: 0, hp: 0 } },
        { nome: "Espada de Aço", icone: "⚔️", preco: 120, slot: "arma", descricao: "Aço temperado e afiado", stats: { atk: 14, def: 0, hp: 0 } },
        { nome: "Machado de Guerra", icone: "🪓", preco: 300, slot: "arma", descricao: "Pesado e devastador", stats: { atk: 24, def: 0, hp: 0 } },
        { nome: "Lâmina do Colosso", icone: "⚔️", preco: 800, slot: "arma", descricao: "Forjada para gigantes", stats: { atk: 40, def: 5, hp: 0 } },
        { nome: "Espada do General", icone: "⚔️", preco: 1450, slot: "arma", descricao: "Arma dos líderes de guerra", stats: { atk: 54, def: 8, hp: 10 } },
        { nome: "Espada do Rei Carmesim", icone: "👑", preco: 2600, slot: "arma", descricao: "Uma arma lendária de conquista", stats: { atk: 72, def: 12, hp: 25 } },

        { nome: "Cota Leve", icone: "🛡️", preco: 40, slot: "armadura", descricao: "Proteção básica de metal", stats: { atk: 0, def: 4, hp: 10 } },
        { nome: "Cota de Malha", icone: "🛡️", preco: 130, slot: "armadura", descricao: "Anéis metálicos entrelaçados", stats: { atk: 0, def: 12, hp: 20 } },
        { nome: "Armadura de Placas", icone: "🛡️", preco: 350, slot: "armadura", descricao: "Placas de aço maciço", stats: { atk: 0, def: 22, hp: 40 } },
        { nome: "Armadura Titânica", icone: "🛡️", preco: 900, slot: "armadura", descricao: "Indestrutível como montanhas", stats: { atk: 0, def: 35, hp: 70 } },
        { nome: "Couraça do General", icone: "🛡️", preco: 1550, slot: "armadura", descricao: "Equipamento de veteranos lendários", stats: { atk: 4, def: 48, hp: 100 } },
        { nome: "Armadura do Imperador", icone: "👑", preco: 2800, slot: "armadura", descricao: "Forjada para um soberano de guerra", stats: { atk: 8, def: 65, hp: 140 } }
    ],

    paladino: [
        { nome: "Maça de Ferro", icone: "🔨", preco: 35, slot: "arma", descricao: "Arma simples e sólida", stats: { atk: 4, def: 2, hp: 0 } },
        { nome: "Espada Abençoada", icone: "⚔️", preco: 130, slot: "arma", descricao: "Brilha com luz sagrada", stats: { atk: 10, def: 3, hp: 10 } },
        { nome: "Martelo Sagrado", icone: "🔨", preco: 320, slot: "arma", descricao: "Consagrado contra o mal", stats: { atk: 18, def: 5, hp: 20 } },
        { nome: "Lâmina Divina", icone: "✨", preco: 850, slot: "arma", descricao: "Forjada na luz celestial", stats: { atk: 30, def: 10, hp: 30 } },
        { nome: "Martelo da Aurora", icone: "🔨", preco: 1500, slot: "arma", descricao: "Golpes marcados pela fé", stats: { atk: 42, def: 14, hp: 45 } },
        { nome: "Lâmina do Arcanjo", icone: "🌟", preco: 2700, slot: "arma", descricao: "Forjada nos céus", stats: { atk: 58, def: 18, hp: 65 } },

        { nome: "Cota Sagrada", icone: "🛡️", preco: 40, slot: "armadura", descricao: "Benta por sacerdotes", stats: { atk: 0, def: 5, hp: 15 } },
        { nome: "Armadura do Templo", icone: "🛡️", preco: 140, slot: "armadura", descricao: "Forjada nos templos", stats: { atk: 0, def: 12, hp: 25 } },
        { nome: "Armadura Celestial", icone: "🛡️", preco: 380, slot: "armadura", descricao: "Brilha com proteção divina", stats: { atk: 0, def: 24, hp: 45 } },
        { nome: "Égide Divina", icone: "✨", preco: 950, slot: "armadura", descricao: "Escudo dos deuses", stats: { atk: 0, def: 36, hp: 80 } },
        { nome: "Couraça do Serafim", icone: "🛡️", preco: 1600, slot: "armadura", descricao: "Proteção de luz pura", stats: { atk: 4, def: 50, hp: 110 } },
        { nome: "Armadura do Trono Sagrado", icone: "👑", preco: 2850, slot: "armadura", descricao: "Defesa concedida por reis santos", stats: { atk: 8, def: 68, hp: 150 } }
    ],

    arqueiro: [
        { nome: "Arco Curto", icone: "🏹", preco: 30, slot: "arma", descricao: "Leve e preciso", stats: { atk: 5, def: 0, hp: 0 } },
        { nome: "Arco Composto", icone: "🏹", preco: 125, slot: "arma", descricao: "Madeira e metal combinados", stats: { atk: 13, def: 0, hp: 0 } },
        { nome: "Arco Longo Élfico", icone: "🏹", preco: 310, slot: "arma", descricao: "Artesanato élfico milenar", stats: { atk: 22, def: 0, hp: 5 } },
        { nome: "Arco da Tempestade", icone: "⚡", preco: 820, slot: "arma", descricao: "Flechas como relâmpagos", stats: { atk: 38, def: 3, hp: 0 } },
        { nome: "Arco do Falcão Dourado", icone: "🏹", preco: 1420, slot: "arma", descricao: "Precisão mortal", stats: { atk: 52, def: 5, hp: 10 } },
        { nome: "Arco Celestial", icone: "🌟", preco: 2550, slot: "arma", descricao: "Dispara luz condensada", stats: { atk: 68, def: 8, hp: 18 } },

        { nome: "Veste de Couro", icone: "🦺", preco: 28, slot: "armadura", descricao: "Leve e flexível", stats: { atk: 0, def: 2, hp: 5 } },
        { nome: "Couro Reforçado", icone: "🦺", preco: 110, slot: "armadura", descricao: "Camadas de couro tratado", stats: { atk: 0, def: 7, hp: 12 } },
        { nome: "Armadura de Escamas", icone: "🦺", preco: 300, slot: "armadura", descricao: "Escamas metálicas leves", stats: { atk: 0, def: 14, hp: 25 } },
        { nome: "Manto do Vento", icone: "💨", preco: 800, slot: "armadura", descricao: "Move-se como o vento", stats: { atk: 5, def: 20, hp: 35 } },
        { nome: "Manto do Predador", icone: "🦅", preco: 1450, slot: "armadura", descricao: "Olhos e passos de caça", stats: { atk: 8, def: 28, hp: 55 } },
        { nome: "Vestes da Tempestade Celeste", icone: "🌩️", preco: 2500, slot: "armadura", descricao: "Leveza e precisão supremas", stats: { atk: 12, def: 38, hp: 80 } }
    ],

    mago: [
        { nome: "Cajado de Aprendiz", icone: "🪄", preco: 25, slot: "arma", descricao: "Madeira encantada", stats: { atk: 3, def: 0, hp: 5 } },
        { nome: "Cajado Arcano", icone: "🪄", preco: 120, slot: "arma", descricao: "Canaliza energia arcana", stats: { atk: 8, def: 0, hp: 15 } },
        { nome: "Cajado Elemental", icone: "🔮", preco: 310, slot: "arma", descricao: "Controla os elementos", stats: { atk: 16, def: 0, hp: 25 } },
        { nome: "Cajado do Archimago", icone: "🌟", preco: 850, slot: "arma", descricao: "Poder arcano supremo", stats: { atk: 28, def: 0, hp: 40 } },
        { nome: "Orbe Estelar", icone: "✨", preco: 1480, slot: "arma", descricao: "Concentra magia cósmica", stats: { atk: 42, def: 2, hp: 60 } },
        { nome: "Cetro do Infinito", icone: "🌌", preco: 2700, slot: "arma", descricao: "Canaliza o vazio astral", stats: { atk: 58, def: 4, hp: 85 } },

        { nome: "Túnica de Aprendiz", icone: "👘", preco: 22, slot: "armadura", descricao: "Tecido encantado simples", stats: { atk: 0, def: 1, hp: 10 } },
        { nome: "Manto Arcano", icone: "👘", preco: 100, slot: "armadura", descricao: "Protege com magia", stats: { atk: 0, def: 5, hp: 20 } },
        { nome: "Vestes Elementais", icone: "🔮", preco: 280, slot: "armadura", descricao: "Resistente aos elementos", stats: { atk: 2, def: 10, hp: 35 } },
        { nome: "Vestes do Archimago", icone: "🌟", preco: 850, slot: "armadura", descricao: "O manto supremo", stats: { atk: 5, def: 18, hp: 60 } },
        { nome: "Vestes Astrais", icone: "🌌", preco: 1520, slot: "armadura", descricao: "Tecidas em energia cósmica", stats: { atk: 8, def: 26, hp: 95 } },
        { nome: "Manto do Infinito", icone: "✨", preco: 2800, slot: "armadura", descricao: "A própria magia te envolve", stats: { atk: 12, def: 36, hp: 130 } }
    ],

    clerigo: [
        { nome: "Maça de Madeira", icone: "🔨", preco: 25, slot: "arma", descricao: "Benta e simples", stats: { atk: 3, def: 0, hp: 8 } },
        { nome: "Maça Benta", icone: "🔨", preco: 115, slot: "arma", descricao: "Ungida com óleo sagrado", stats: { atk: 7, def: 3, hp: 15 } },
        { nome: "Cetro Sagrado", icone: "✝️", preco: 300, slot: "arma", descricao: "Símbolo de autoridade divina", stats: { atk: 14, def: 5, hp: 25 } },
        { nome: "Martelo da Fé", icone: "🔨", preco: 800, slot: "arma", descricao: "A fé feita arma", stats: { atk: 24, def: 8, hp: 40 } },
        { nome: "Cajado da Graça", icone: "✨", preco: 1450, slot: "arma", descricao: "Irradia proteção sagrada", stats: { atk: 36, def: 12, hp: 60 } },
        { nome: "Cetro da Divindade", icone: "🌟", preco: 2600, slot: "arma", descricao: "Canaliza milagres antigos", stats: { atk: 50, def: 16, hp: 85 } },

        { nome: "Hábito Sagrado", icone: "👘", preco: 30, slot: "armadura", descricao: "Veste clerical básica", stats: { atk: 0, def: 3, hp: 15 } },
        { nome: "Cota Clerical", icone: "🛡️", preco: 125, slot: "armadura", descricao: "Metal abençoado", stats: { atk: 0, def: 10, hp: 28 } },
        { nome: "Armadura da Fé", icone: "🛡️", preco: 340, slot: "armadura", descricao: "Protegida por orações", stats: { atk: 0, def: 20, hp: 45 } },
        { nome: "Vestimenta Divina", icone: "✨", preco: 880, slot: "armadura", descricao: "Tecida pela luz", stats: { atk: 0, def: 30, hp: 80 } },
        { nome: "Vestes Consagradas", icone: "🌟", preco: 1500, slot: "armadura", descricao: "A fé te reveste", stats: { atk: 4, def: 42, hp: 110 } },
        { nome: "Manto do Sumo Sacerdote", icone: "👑", preco: 2700, slot: "armadura", descricao: "Vestes do mais alto clero", stats: { atk: 8, def: 56, hp: 150 } }
    ],

    ladino: [
        { nome: "Adaga Afiada", icone: "🗡️", preco: 25, slot: "arma", descricao: "Rápida e letal", stats: { atk: 5, def: 0, hp: 0 } },
        { nome: "Lâmina Gêmea", icone: "🗡️", preco: 120, slot: "arma", descricao: "Uma lâmina em cada mão", stats: { atk: 12, def: 0, hp: 0 } },
        { nome: "Kris Envenenada", icone: "🗡️", preco: 300, slot: "arma", descricao: "Lâmina ondulada com veneno", stats: { atk: 22, def: 0, hp: 0 } },
        { nome: "Lâmina Fantasma", icone: "👻", preco: 800, slot: "arma", descricao: "Invisível até o golpe", stats: { atk: 36, def: 5, hp: 0 } },
        { nome: "Punhal do Crepúsculo", icone: "🌑", preco: 1420, slot: "arma", descricao: "A morte chega em silêncio", stats: { atk: 50, def: 6, hp: 8 } },
        { nome: "Lâmina do Vazio", icone: "🕳️", preco: 2550, slot: "arma", descricao: "Corta a própria realidade", stats: { atk: 68, def: 10, hp: 18 } },

        { nome: "Couro Leve", icone: "🦺", preco: 22, slot: "armadura", descricao: "Não atrapalha os movimentos", stats: { atk: 1, def: 2, hp: 5 } },
        { nome: "Veste das Sombras", icone: "🌑", preco: 105, slot: "armadura", descricao: "Escurece ao redor", stats: { atk: 2, def: 6, hp: 10 } },
        { nome: "Armadura Furtiva", icone: "🌑", preco: 290, slot: "armadura", descricao: "Silenciosa como a noite", stats: { atk: 3, def: 12, hp: 20 } },
        { nome: "Manto da Invisibilidade", icone: "👻", preco: 780, slot: "armadura", descricao: "Agora você me vê...", stats: { atk: 5, def: 18, hp: 30 } },
        { nome: "Vestes do Assassino", icone: "🖤", preco: 1400, slot: "armadura", descricao: "Feita para matar e sumir", stats: { atk: 8, def: 26, hp: 45 } },
        { nome: "Manto do Vazio", icone: "🕳️", preco: 2480, slot: "armadura", descricao: "A escuridão te engole", stats: { atk: 12, def: 36, hp: 65 } }
    ],

    druida: [
        { nome: "Cajado de Carvalho", icone: "🪵", preco: 25, slot: "arma", descricao: "Madeira viva", stats: { atk: 4, def: 0, hp: 5 } },
        { nome: "Cajado Verdejante", icone: "🌿", preco: 115, slot: "arma", descricao: "Brotos crescem na madeira", stats: { atk: 9, def: 0, hp: 15 } },
        { nome: "Cajado da Floresta Antiga", icone: "🌳", preco: 300, slot: "arma", descricao: "Espírito da floresta", stats: { atk: 18, def: 2, hp: 25 } },
        { nome: "Cajado Primordial", icone: "🌟", preco: 830, slot: "arma", descricao: "Poder da natureza pura", stats: { atk: 30, def: 5, hp: 35 } },
        { nome: "Cajado do Eclipse Verde", icone: "🌙", preco: 1450, slot: "arma", descricao: "Equilíbrio entre vida e noite", stats: { atk: 42, def: 8, hp: 55 } },
        { nome: "Cajado do Mundo Vivo", icone: "🌌", preco: 2620, slot: "arma", descricao: "Pulsa com a energia do planeta", stats: { atk: 58, def: 12, hp: 80 } },

        { nome: "Veste Natural", icone: "🍃", preco: 28, slot: "armadura", descricao: "Folhas e fibras entrelaçadas", stats: { atk: 0, def: 3, hp: 10 } },
        { nome: "Couro Druídico", icone: "🍃", preco: 110, slot: "armadura", descricao: "Curtido com ervas", stats: { atk: 0, def: 8, hp: 20 } },
        { nome: "Armadura Silvestre", icone: "🌳", preco: 310, slot: "armadura", descricao: "A floresta te protege", stats: { atk: 0, def: 16, hp: 35 } },
        { nome: "Casca do Ancião", icone: "🌟", preco: 850, slot: "armadura", descricao: "Casca da árvore mãe", stats: { atk: 3, def: 28, hp: 60 } },
        { nome: "Vestes do Eclipse", icone: "🌙", preco: 1500, slot: "armadura", descricao: "Feitas de lua e folhas", stats: { atk: 6, def: 38, hp: 90 } },
        { nome: "Casca Primordial", icone: "🌌", preco: 2750, slot: "armadura", descricao: "Proteção do coração da floresta", stats: { atk: 10, def: 52, hp: 130 } }
    ],

    monge: [
        { nome: "Ataduras de Combate", icone: "🥊", preco: 22, slot: "arma", descricao: "Faixas nos punhos", stats: { atk: 4, def: 1, hp: 0 } },
        { nome: "Luvas Reforçadas", icone: "🥊", preco: 110, slot: "arma", descricao: "Metal sob o tecido", stats: { atk: 10, def: 2, hp: 5 } },
        { nome: "Punhos de Jade", icone: "💚", preco: 290, slot: "arma", descricao: "Jade encantada nos dedos", stats: { atk: 20, def: 3, hp: 10 } },
        { nome: "Punhos do Dragão", icone: "🐲", preco: 790, slot: "arma", descricao: "Golpes como garras", stats: { atk: 34, def: 5, hp: 15 } },
        { nome: "Manoplas do Mestre", icone: "🥋", preco: 1420, slot: "arma", descricao: "Punhos que quebram pedra", stats: { atk: 48, def: 8, hp: 25 } },
        { nome: "Punhos do Iluminado", icone: "🌟", preco: 2520, slot: "arma", descricao: "Força além da carne", stats: { atk: 64, def: 12, hp: 35 } },

        { nome: "Gi de Treinamento", icone: "🥋", preco: 24, slot: "armadura", descricao: "Uniforme básico", stats: { atk: 0, def: 2, hp: 8 } },
        { nome: "Vestes de Monge", icone: "🥋", preco: 100, slot: "armadura", descricao: "Tecido resistente", stats: { atk: 0, def: 6, hp: 15 } },
        { nome: "Traje do Mestre", icone: "🥋", preco: 300, slot: "armadura", descricao: "Dignidade e proteção", stats: { atk: 2, def: 14, hp: 30 } },
        { nome: "Vestes do Iluminado", icone: "🌟", preco: 800, slot: "armadura", descricao: "Transcendeu o corpo", stats: { atk: 5, def: 24, hp: 50 } },
        { nome: "Gi do Dragão Interior", icone: "🐉", preco: 1460, slot: "armadura", descricao: "Canaliza energia marcial", stats: { atk: 8, def: 34, hp: 75 } },
        { nome: "Vestes da Ascensão", icone: "☀️", preco: 2600, slot: "armadura", descricao: "O corpo se torna espírito", stats: { atk: 12, def: 46, hp: 105 } }
    ]
};

// ACESSÓRIOS COMPARTILHADOS (todos usam)
var acessoriosComuns = [
    // ELMOS
    { nome: "Gorro de Couro", icone: "⛑️", preco: 20, slot: "elmo", descricao: "Proteção simples", stats: { atk: 0, def: 1, hp: 5 } },
    { nome: "Elmo de Ferro", icone: "⛑️", preco: 80, slot: "elmo", descricao: "Protege a cabeça", stats: { atk: 0, def: 5, hp: 8 } },
    { nome: "Elmo do Campeão", icone: "⛑️", preco: 250, slot: "elmo", descricao: "Marca dos veteranos", stats: { atk: 3, def: 10, hp: 15 } },
    { nome: "Coroa de Batalha", icone: "👑", preco: 700, slot: "elmo", descricao: "Digna de um rei", stats: { atk: 8, def: 15, hp: 30 } },
    { nome: "Elmo do Lorde", icone: "👑", preco: 1350, slot: "elmo", descricao: "Proteção de nobres guerreiros", stats: { atk: 12, def: 22, hp: 45 } },
    { nome: "Coroa Astral", icone: "🌟", preco: 2400, slot: "elmo", descricao: "Brilha com poder superior", stats: { atk: 18, def: 30, hp: 70 } },

    // BOTAS
    { nome: "Sandálias Reforçadas", icone: "👢", preco: 20, slot: "botas", descricao: "Melhor que descalço", stats: { atk: 0, def: 1, hp: 3 } },
    { nome: "Botas de Caçador", icone: "👢", preco: 85, slot: "botas", descricao: "Leves e resistentes", stats: { atk: 1, def: 3, hp: 8 } },
    { nome: "Botas Céleres", icone: "👢", preco: 280, slot: "botas", descricao: "Encantadas com agilidade", stats: { atk: 3, def: 6, hp: 12 } },
    { nome: "Grevas Infernais", icone: "👢", preco: 650, slot: "botas", descricao: "Queimam o chão", stats: { atk: 6, def: 10, hp: 20 } },
    { nome: "Passos do Titã", icone: "👢", preco: 1300, slot: "botas", descricao: "Passos que estremecem a terra", stats: { atk: 10, def: 16, hp: 35 } },
    { nome: "Botas Astrais", icone: "🌌", preco: 2300, slot: "botas", descricao: "Pisam entre as estrelas", stats: { atk: 16, def: 24, hp: 55 } },

    // ANÉIS
    { nome: "Anel de Lata", icone: "💍", preco: 15, slot: "anel", descricao: "Quase decorativo", stats: { atk: 1, def: 0, hp: 3 } },
    { nome: "Anel de Prata", icone: "💍", preco: 90, slot: "anel", descricao: "Brilho discreto", stats: { atk: 3, def: 2, hp: 10 } },
    { nome: "Anel de Ouro", icone: "💍", preco: 300, slot: "anel", descricao: "Gema encantada", stats: { atk: 6, def: 4, hp: 20 } },
    { nome: "Anel do Vazio", icone: "💍", preco: 750, slot: "anel", descricao: "Conecta ao nada", stats: { atk: 12, def: 8, hp: 30 } },
    { nome: "Anel Real", icone: "👑", preco: 1450, slot: "anel", descricao: "Símbolo de poder soberano", stats: { atk: 18, def: 12, hp: 45 } },
    { nome: "Anel Celestial", icone: "🌟", preco: 2550, slot: "anel", descricao: "Brilha com luz eterna", stats: { atk: 26, def: 18, hp: 65 } },

    // AMULETOS
    { nome: "Cordão de Osso", icone: "📿", preco: 20, slot: "amuleto", descricao: "Talismã primitivo", stats: { atk: 0, def: 1, hp: 5 } },
    { nome: "Amuleto de Jade", icone: "📿", preco: 100, slot: "amuleto", descricao: "Emana energia vital", stats: { atk: 2, def: 3, hp: 15 } },
    { nome: "Amuleto Arcano", icone: "📿", preco: 320, slot: "amuleto", descricao: "Poder antigo", stats: { atk: 5, def: 6, hp: 25 } },
    { nome: "Amuleto do Crepúsculo", icone: "📿", preco: 800, slot: "amuleto", descricao: "Entre luz e sombra", stats: { atk: 10, def: 10, hp: 40 } },
    { nome: "Medalhão Real", icone: "👑", preco: 1500, slot: "amuleto", descricao: "Força e nobreza", stats: { atk: 15, def: 14, hp: 55 } },
    { nome: "Amuleto Celeste", icone: "🌌", preco: 2650, slot: "amuleto", descricao: "Proteção dos céus", stats: { atk: 22, def: 20, hp: 80 } }
];
function getEquipamentosArmaria() {
    let classe = getClassePlayer();
    let listaClasse = equipamentosPorClasse[classe] || [];
    return [...listaClasse, ...acessoriosComuns];

   
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
    function getBonusGuilda(tipo) {
    if (!player || !player.guilda || !player.guilda.atual) return 0;

    switch (player.guilda.atual) {
        case "guerreiros":
            if (tipo === "atk") return 0.10;
            return 0;

        case "arcano":
            if (tipo === "habilidade") return 0.15;
            return 0;

        case "sombras":
            if (tipo === "ouro") return 0.15;
            return 0;

        case "protetores":
            if (tipo === "def") return 0.10;
            if (tipo === "hp") return 0.10;
            return 0;

        default:
            return 0;
    }
}

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

function comprarItemLoja(i) {
    var item = catalogoLoja.comprar[i];
    if (!item) return;

    if (!podeComprarItemLoja(item)) {
        mostrarNotificacao("🚫 Limite de compra atingido para " + item.nome + "!");
        return;
    }

    var pf = Math.floor(item.preco * (1 - calcularDescontoLoja()));

    if (player.gold < pf) {
        mostrarNotificacao("💰 Ouro insuficiente!");
        return;
    }

    player.gold -= pf;

    adicionarItemInventario(item.nome, item.icone, 1, {
        tipo: item.tipo,
        descricao: item.descricao,
        efeito: item.efeito,
        preco: item.preco,
        precoVenda: calcularPrecoVenda(item)
    });

    if (item.limiteCompra) {
        registrarCompraLoja(item.nome);
    }

    mostrarNotificacao("🛒 Comprou " + item.nome + " por " + pf + " ouro!");
    if (document.getElementById("lojaGoldUI")) {
        document.getElementById("lojaGoldUI").textContent = player.gold;
    }
    renderizarLojaComprar();
    updateUI();
}

function venderItemLoja(i) {
    var item = player.inventario[i];
    if (!item) return;

    var pv = calcularPrecoVenda(item);
    player.gold += pv;
    item.quantidade--;

    if (item.quantidade <= 0) player.inventario.splice(i, 1);

    mostrarNotificacao("💰 +" + pv + " ouro!");
    document.getElementById("lojaGoldUI").textContent = player.gold;
    renderizarLojaVender();
    updateUI();
}
function comprarEquipamentoNovo(i) {
    var equipamentos = getEquipamentosArmaria();
    var item = equipamentos[i];
    if (!item) return;

    var desc = calcularDescontoLoja();
    var pf = Math.floor(item.preco * (1 - desc));

    if (player.gold < pf) {
        mostrarNotificacao("💰 Ouro insuficiente!");
        return;
    }

    player.gold -= pf;

    adicionarItemInventario(item.nome, item.icone, 1, {
        tipo: "equipamento",
        slot: item.slot,
        descricao: item.descricao,
        stats: {
            atk: (item.stats && item.stats.atk) || 0,
            def: (item.stats && item.stats.def) || 0,
            hp: (item.stats && item.stats.hp) || 0
        },
        preco: item.preco,
        precoVenda: calcularPrecoVenda(item)
    });

    mostrarNotificacao("⚒️ " + item.nome + "! -" + pf + " ouro");
    log("⚒️ Comprou " + item.nome + ". -" + pf + " ouro.");
    document.getElementById("armariaGoldUI").textContent = player.gold;
    renderizarArmariaComprar();
    updateUI();
}


function comprarEquipamento(i) {
    var item = catalogoArmaria.comprar[i];
    var pf = Math.floor(item.preco * (1 - calcularDescontoLoja()));

    if (player.gold < pf) {
        mostrarNotificacao("Sem ouro!");
        return;
    }

    player.gold -= pf;

    adicionarItemInventario(item.nome, item.icone, 1, {
        tipo: "equipamento",
        slot: item.slot,
        descricao: item.descricao,
        stats: item.stats,
        preco: item.preco,
        precoVenda: calcularPrecoVenda(item)
    });

    mostrarNotificacao("⚒️ " + item.nome + "! -" + pf);
    document.getElementById("armariaGoldUI").textContent = player.gold;
    renderizarArmariaComprar();
    updateUI();
}

function venderEquipamento(i) {
    var item = player.inventario[i];
    if (!item) return;

    var pv = calcularPrecoVenda(item);
    player.gold += pv;
    item.quantidade--;

    if (item.quantidade <= 0) player.inventario.splice(i, 1);

    mostrarNotificacao("💰 +" + pv + " ouro!");
    document.getElementById("armariaGoldUI").textContent = player.gold;
    renderizarArmariaVender();
    updateUI();
}
function abrirTreinamento() {
    mostrarPainel("treinamentoPanel");
    renderizarTreinamento();
}
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