// ============================================
// HISTORIA.JS
// PARTE 1 — BASE DA CAMPANHA E PROTAGONISTAS
// ============================================

// ============================================
// SEÇÃO 1: METADADOS GERAIS DA CAMPANHA
// ============================================

var historiaCampanha = {
    titulo: "Reinos & Monstros",
    subtitulo: "A Queda dos Eternos",
    temaCentral: "Um mundo ferido por portais antigos luta para impedir o retorno de Axiom, enquanto o protagonista decide se salvará o mundo, sobreviverá a ele ou tentará dominá-lo.",

    pilaresTematicos: [
        "corrupção",
        "sacrifício",
        "memória",
        "poder versus humanidade",
        "legado",
        "fé e profanação",
        "identidade",
        "custo moral"
    ],

    atos: [
        {
            id: 1,
            nome: "Descoberta da Ferida",
            capitulos: [1, 2, 3, 4],
            resumo: "O protagonista descobre que ataques locais escondem uma ameaça muito maior: portais ligados ao culto dos Eternos."
        },
        {
            id: 2,
            nome: "Caçada aos Elos",
            capitulos: [5, 6, 7, 8, 9],
            resumo: "A jornada deixa de ser investigação e se torna perseguição ativa aos elos da rede, enquanto o custo da missão cresce."
        },
        {
            id: 3,
            nome: "O Preço da Vitória",
            capitulos: [10, 11, 12],
            resumo: "O sofrimento humano, a própria identidade do herói e o fracasso do passado tornam a guerra moralmente mais pesada."
        },
        {
            id: 4,
            nome: "Ascensão e Confronto Final",
            capitulos: [13, 14, 15],
            resumo: "O conflito ultrapassa o mundo material, entra no cósmico e no infernal, e culmina no confronto com Axiom."
        }
    ]
};

// ============================================
// SEÇÃO 2: FACÇÕES E FORÇAS NARRATIVAS
// ============================================

var faccoesNarrativas = {
    eternos: {
        id: "eternos",
        nome: "Os Eternos",
        tipo: "culto antigo",
        resumo: "Uma ordem ancestral que acreditava poder corrigir as falhas do mundo por meio do controle da morte, dos selos e da própria estrutura da realidade.",
        objetivo: "Ressuscitar Axiom e reconstruir o mundo à força, mesmo que isso exija sofrimento em escala continental.",
        temas: ["fanatismo", "controle", "corrupção do sagrado", "engenharia ritual"]
    },

    guardioesAntigos: {
        id: "guardioesAntigos",
        nome: "Guardiões Antigos",
        tipo: "ordens e sentinelas remanescentes",
        resumo: "Restos de ordens, vigias, reis, templos e criaturas que tentaram ou ainda tentam conter o avanço da rede.",
        objetivo: "Proteger o que resta dos selos, ainda que muitos já tenham se tornado ecos quebrados do próprio dever.",
        temas: ["dever", "cansaço", "legado", "fracasso honrado"]
    },

    sobreviventesDoMundo: {
        id: "sobreviventesDoMundo",
        nome: "Sobreviventes do Mundo",
        tipo: "povos dispersos",
        resumo: "Vilas, clãs, cidades arruinadas, comunidades subterrâneas e figuras isoladas que ainda resistem à expansão da rede.",
        objetivo: "Sobreviver, compreender e, às vezes, ajudar a impedir o colapso completo.",
        temas: ["resistência", "memória", "trauma", "esperança"]
    }
};

// ============================================
// SEÇÃO 3: ENTIDADES CENTRAIS DA HISTÓRIA
// ============================================

var entidadesNarrativas = {
    axiom: {
        id: "axiom",
        nome: "Axiom",
        titulo: "O Deus Corrompido",
        tipo: "entidade divina corrompida",
        resumo: "A presença central por trás da rede de portais e do plano dos Eternos.",
        funcaoNarrativa: "Antagonista final e espelho máximo da ambição, do fanatismo e da transformação da ordem em ruína.",
        relacaoComRotas: {
            heroi: "Vê o protagonista como o último defensor de um mundo imperfeito.",
            neutro: "Vê o protagonista como um rival lúcido que compreendeu a lógica da ruína sem se submeter a ela.",
            sombrio: "Vê o protagonista como possível herdeiro, sucessor ou usurpador."
        }
    },

    rede: {
        id: "rede",
        nome: "A Rede de Portais",
        tipo: "estrutura ritual continental",
        resumo: "Uma malha de elos, selos rompidos, passagens e focos de energia interligados, sustentando o retorno de Axiom.",
        funcaoNarrativa: "Transforma a campanha em guerra estrutural, e não apenas em sucessão de batalhas locais.",
        observacao: "Fechar um elo enfraquece a rede, mas também acelera o despertar de Axiom."
    }
};

// ============================================
// SEÇÃO 4: MAPA OFICIAL DE CAPÍTULOS POR ÁREA
// ============================================

var mapaCapitulosHistoriaPorArea = {
    floresta: "capitulo_1_floresta",
    pantano: "capitulo_2_pantano",
    colinas: "capitulo_3_colinas",
    ruinas: "capitulo_4_ruinas",
    deserto: "capitulo_5_deserto",
    cemiterio: "capitulo_6_cemiterio",
    caverna: "capitulo_7_caverna",
    vulcao: "capitulo_8_vulcao",
    geleira: "capitulo_9_geleira",
    cidadeFant: "capitulo_10_cidadeFant",
    abismo: "capitulo_11_abismo",
    castelo: "capitulo_12_castelo",
    planoAstral: "capitulo_13_planoAstral",
    infernus: "capitulo_14_infernus",
    tronoDeus: "capitulo_15_tronoDeus"
};

// ============================================
// SEÇÃO 5: RESUMO DOS CAPÍTULOS
// ============================================

var resumoCapitulosNarrativos = {
    1: {
        id: 1,
        area: "floresta",
        titulo: "O Chamado da Floresta",
        tema: "primeiro sinal da corrupção",
        funcao: "Apresenta a ameaça e sugere que ela é maior do que aparenta."
    },
    2: {
        id: 2,
        area: "pantano",
        titulo: "Águas Turvas",
        tema: "o conhecimento tem preço",
        funcao: "Apresenta a inteligência por trás dos portais e nomeia os Eternos."
    },
    3: {
        id: 3,
        area: "colinas",
        titulo: "A Batalha das Colinas",
        tema: "guerra, alianças e fragmentos",
        funcao: "Mostra que a corrupção atinge povos inteiros e introduz o cristal negro."
    },
    4: {
        id: 4,
        area: "ruinas",
        titulo: "Ecos do Passado",
        tema: "conhecimento enterrado e culpa antiga",
        funcao: "Revela que os portais formam uma rede e que os Eternos começaram como crentes."
    },
    5: {
        id: 5,
        area: "deserto",
        titulo: "Areias do Tempo",
        tema: "valor, perseguição e memória",
        funcao: "Mostra que os Eternos já sabem que o protagonista os está caçando."
    },
    6: {
        id: 6,
        area: "cemiterio",
        titulo: "O Preço dos Mortos",
        tema: "culpa, reparação e vigilância",
        funcao: "Aprofunda o horror espiritual e a sensação de que a rede observa de volta."
    },
    7: {
        id: 7,
        area: "caverna",
        titulo: "Nas Profundezas",
        tema: "resistência e escuridão",
        funcao: "Mostra que a guerra já alcançou todo o mundo, inclusive o subsolo."
    },
    8: {
        id: 8,
        area: "vulcao",
        titulo: "Forja do Inferno",
        tema: "provação e custo do poder",
        funcao: "Revela que fechar os elos acelera o despertar de Axiom."
    },
    9: {
        id: 9,
        area: "geleira",
        titulo: "O Inverno Eterno",
        tema: "origem, cansaço e virada",
        funcao: "Marca a metade da campanha e expõe a origem mais estruturada dos Eternos."
    },
    10: {
        id: 10,
        area: "cidadeFant",
        titulo: "Cidade dos Mortos",
        tema: "memória, luto e utilidade das almas",
        funcao: "Mostra o sofrimento humano como combustível da rede e o custo moral da missão."
    },
    11: {
        id: 11,
        area: "abismo",
        titulo: "Olhando para o Vazio",
        tema: "identidade e confronto interior",
        funcao: "Coloca o protagonista diante de sua própria sombra e revela um coração da rede."
    },
    12: {
        id: 12,
        area: "castelo",
        titulo: "A Fortaleza do Rei Morto",
        tema: "legado e fracasso",
        funcao: "Conecta a campanha atual à última grande tentativa fracassada de conter os Eternos."
    },
    13: {
        id: 13,
        area: "planoAstral",
        titulo: "Além da Realidade",
        tema: "transcendência e ambição",
        funcao: "Leva a guerra para a escala cósmica e testa o valor do protagonista diante do infinito."
    },
    14: {
        id: 14,
        area: "infernus",
        titulo: "Descida ao Inferno",
        tema: "pacto e custo final",
        funcao: "Oferece a última grande barganha antes do confronto final."
    },
    15: {
        id: 15,
        area: "tronoDeus",
        titulo: "O Confronto Final",
        tema: "destino, escolha e identidade final",
        funcao: "Conclui a campanha e transforma a batalha contra Axiom em resolução moral."
    }
};

// ============================================
// SEÇÃO 6: PROTAGONISTAS NARRATIVOS
// Complementa personagensPredefinidos do player.js
// ============================================

var protagonistasNarrativos = {
    guerreiro: {
        id: "guerreiro",
        nome: "Valerius",
        classe: "Guerreiro",
        raca: "Anão",
        genero: "Masculino",
        resumo: "Um veterano endurecido pela guerra, dividido entre honra e culpa.",
        passado: "Valerius foi capitão da guarda de uma fortaleza nas fronteiras do norte. Durante anos protegeu caravanas, vilas e passagens de montanha. Tudo mudou quando uma patrulha encontrou uma ruína antiga sob a fortaleza. Poucos dias depois, criaturas começaram a emergir das sombras, violentas e sem medo da morte. A posição caiu, seus soldados morreram, e Valerius sobreviveu apenas para carregar a memória de cada nome perdido.",
        motivacao: "Destruir a origem dos portais e impedir que outra fortaleza, vila ou povo sofra a mesma ruína.",
        personalidade: ["sério", "disciplinado", "protetor", "direto", "observador"],
        interesses: ["honra", "estratégia militar", "disciplina", "dever", "reconstrução da ordem"],
        segredoFerida: "Acredita que falhou como comandante. Teme não estar lutando pelo mundo, mas tentando compensar uma culpa que jamais será apagada.",
        ligacaoPrincipal: "Foi um dos primeiros a enfrentar diretamente as consequências de um portal.",
        tomNarrativo: "Sólido, marcial e grave. Lê o mundo como campo de batalha, responsabilidade e ameaça real.",
        fraseIntro: "Se a escuridão quer guerra, então a encontrará.",
        fraseFinal: "Perdi homens para monstros. Não entregarei o mundo a um deus.",
        afinidades: ["floresta", "colinas", "castelo", "tronoDeus"]
    },

    guerreira: {
        id: "guerreira",
        nome: "Lyra",
        classe: "Guerreira",
        raca: "Anã",
        genero: "Feminino",
        resumo: "Filha das profundezas, moldada pela pedra, pelo ferro e pela perda.",
        passado: "Lyra cresceu em um clã mineiro anão, onde o valor de alguém era medido pela resistência e pela capacidade de encarar o escuro sem tremer. Em uma grande escavação, seu povo abriu uma câmara esquecida marcada por runas antigas. O que parecia um salão ancestral era, na verdade, um selo rompido. Algo despertou ali embaixo. Monstros invadiram os túneis e devoraram famílias inteiras. Lyra sobreviveu lutando com ferramentas de mineração e jurou que jamais deixaria o mundo esquecer o que dorme sob a pedra.",
        motivacao: "Encontrar a origem das ruínas ligadas aos Eternos e impedir que outras profundezas sejam abertas.",
        personalidade: ["obstinada", "sarcástica", "prática", "feroz"],
        interesses: ["clãs anões", "ruínas subterrâneas", "metais raros", "resistência", "força provada em ação"],
        segredoFerida: "Parte dela ainda culpa os próprios anões pela tragédia, por terem cavado fundo demais por ambição.",
        ligacaoPrincipal: "Viu com os próprios olhos que as marcas dos Eternos estão enterradas sob o mundo.",
        tomNarrativo: "Áspero, resiliente e terreno. Sua visão enfatiza peso, dureza, esforço e sobrevivência.",
        fraseIntro: "Se o mal veio das profundezas, eu mesma vou arrancá-lo de lá.",
        fraseFinal: "Pedra resiste. Ferro resiste. E eu também.",
        afinidades: ["colinas", "caverna", "geleira"]
    },

    draconato: {
        id: "draconato",
        nome: "Ignis",
        classe: "Paladino",
        raca: "Draconato",
        genero: "Masculino",
        resumo: "Um cavaleiro sagrado criado para reconhecer o retorno de antigas trevas.",
        passado: "Ignis foi treinado por uma ordem solar dracônica dedicada a proteger o mundo contra poderes ancestrais esquecidos. Desde cedo ouviu profecias sobre Axiom, a chama corrompida que um dia tentaria retornar. Muitos consideravam esses textos exageros religiosos. Ignis, não. Quando surgiram os primeiros sinais de corrupção e os portais começaram a aparecer, ele entendeu que sua vida inteira havia sido preparação para esse momento.",
        motivacao: "Cumprir o juramento de sua ordem e impedir o retorno de Axiom.",
        personalidade: ["nobre", "firme", "inspirador", "leal", "exigente consigo mesmo"],
        interesses: ["juramentos", "fé", "honra", "relíquias sagradas", "proteção dos inocentes"],
        segredoFerida: "Teme que seu zelo religioso o transforme em fanático incapaz de enxergar nuances.",
        ligacaoPrincipal: "Sua ordem já conhecia o nome de Axiom e o preparou para este conflito.",
        tomNarrativo: "Elevado, épico e luminoso. Lê o mundo como provação, fé e destino.",
        fraseIntro: "A luz não recua. Ela avança.",
        fraseFinal: "Axiom, teu nome foi lembrado apenas para que eu pudesse apagá-lo.",
        afinidades: ["pantano", "ruinas", "tronoDeus", "infernus"]
    },

    draconata: {
        id: "draconata",
        nome: "Aethel",
        classe: "Paladina",
        raca: "Draconata",
        genero: "Feminino",
        resumo: "Guardião silenciosa de selos antigos, presa entre dever e verdade.",
        passado: "Aethel serviu em um templo erguido sobre um antigo selo sagrado. Sua missão era vigiar, proteger e jamais permitir que certas catacumbas fossem abertas. Quando o templo caiu sob uma onda de corrupção, ela foi a única guardiã sobrevivente. Desde então, vaga entre ruínas e santuários destruídos tentando descobrir se a queda foi causada apenas pelos Eternos — ou se sua própria ordem escondeu segredos perigosos.",
        motivacao: "Preservar os selos restantes e revelar a verdade sobre a queda do templo.",
        personalidade: ["calma", "introspectiva", "determinada", "leal", "observadora"],
        interesses: ["templos antigos", "rituais", "relíquias", "memória dos mortos", "segredos religiosos"],
        segredoFerida: "Desconfia que seus superiores sabiam mais sobre os portais do que jamais admitiram.",
        ligacaoPrincipal: "Conecta a campanha à ideia de selos, templos e ordens que falharam em conter Axiom.",
        tomNarrativo: "Contido, reverente e místico. Sua visão carrega peso espiritual.",
        fraseIntro: "Nem todo templo caiu por fraqueza. Alguns caíram guardando verdades demais.",
        fraseFinal: "Você corrompeu o sagrado. Eu serei o último selo.",
        afinidades: ["ruinas", "geleira", "castelo", "tronoDeus"]
    },

    arqueiro: {
        id: "arqueiro",
        nome: "Kael",
        classe: "Arqueiro",
        raca: "Elfo",
        genero: "Masculino",
        resumo: "Rastreador das fronteiras, segue pegadas que levam ao fim do mundo.",
        passado: "Kael servia nas fronteiras élficas, patrulhando bosques e trilhas esquecidas. Foi um dos primeiros a notar que os animais não enlouqueciam sem motivo — eles fugiam. Ao seguir esse rastro, perdeu um companheiro de longa data, engolido por uma névoa sombria perto de ruínas cobertas de raízes. Desde então, a floresta deixou de ser apenas lar. Tornou-se pista de um crime antigo.",
        motivacao: "Descobrir o destino do companheiro desaparecido e impedir que a corrupção destrua a natureza.",
        personalidade: ["reservado", "preciso", "observador", "paciente", "confiável"],
        interesses: ["mapas", "rastros", "caça", "silêncio", "proteção dos bosques"],
        segredoFerida: "Teme que seu amigo ainda esteja vivo, mas transformado em algo que precise ser morto.",
        ligacaoPrincipal: "Percebe a ameaça antes da maioria, pelo desequilíbrio natural causado pelos portais.",
        tomNarrativo: "Seco, preciso e sensorial. Percebe cheiro, rastro, distância e perigo.",
        fraseIntro: "Tudo deixa rastros. Até a ruína.",
        fraseFinal: "Eu segui seu rastro até aqui. Agora ele termina.",
        afinidades: ["floresta", "colinas", "abismo"]
    },

    arqueira: {
        id: "arqueira",
        nome: "Selene",
        classe: "Arqueira",
        raca: "Elfa",
        genero: "Feminino",
        resumo: "Expulsa injustamente, caça a verdade com a mesma precisão com que dispara.",
        passado: "Selene liderava patrulhas que protegiam fronteiras sagradas da floresta élfica. Quando criaturas corrompidas romperam as linhas e atacaram aldeias, seus superiores a culparam pela falha. Sem julgamento justo, foi afastada do posto. Recusando-se a carregar uma culpa que não era sua, partiu para rastrear a origem da corrupção e limpar o próprio nome.",
        motivacao: "Provar sua inocência e impedir a destruição do território que jurou proteger.",
        personalidade: ["orgulhosa", "feroz", "disciplinada", "intensa", "implacável contra injustiça"],
        interesses: ["honra", "fronteiras sagradas", "vigilância", "precisão", "restaurar reputação"],
        segredoFerida: "Sua maior dor não é o exílio, mas saber que foi condenada por pessoas em quem confiava.",
        ligacaoPrincipal: "Representa o impacto político e social dos portais sobre povos organizados.",
        tomNarrativo: "Tenso, elegante e afiado. Carrega vigilância e contenção emocional.",
        fraseIntro: "Se me arrancaram meu posto, que ao menos me deixem a verdade.",
        fraseFinal: "Você não tirou apenas vidas. Tirou lares, juramentos e paz. Isso eu cobro agora.",
        afinidades: ["colinas", "cidadeFant", "castelo"]
    },

    mago: {
        id: "mago",
        nome: "Thalric",
        classe: "Mago",
        raca: "Humano",
        genero: "Masculino",
        resumo: "Um estudioso de saberes proibidos que descobriu a verdade cedo demais.",
        passado: "Thalric passou a vida entre bibliotecas, pergaminhos e ruínas antigas. Fascinado por tudo que a história oficial omitia, mergulhou em textos censurados sobre civilizações desaparecidas e cultos banidos. Foi assim que encontrou referências aos Eternos. Ridicularizado por colegas e mestres, persistiu sozinho em sua pesquisa. Agora, com os portais se abrindo, carrega a terrível satisfação de estar certo.",
        motivacao: "Compreender a rede dos portais e impedir que o conhecimento antigo destrua o presente.",
        personalidade: ["inteligente", "obstinado", "curioso", "analítico", "ocasionalmente arrogante"],
        interesses: ["grimórios", "runas", "civilizações perdidas", "símbolos antigos", "padrões ocultos"],
        segredoFerida: "Parte dele está fascinado demais pela grandiosidade do que descobriu — e isso o assusta.",
        ligacaoPrincipal: "É ponte direta entre a investigação histórica e a estrutura dos Eternos.",
        tomNarrativo: "Intelectual, curioso e investigativo. Busca significado em tudo.",
        fraseIntro: "Os livros estavam certos. Eu só não esperava que isso fosse tão terrível.",
        fraseFinal: "Passei a vida procurando verdades enterradas. A sua será enterrada comigo de pé.",
        afinidades: ["ruinas", "deserto", "abismo", "planoAstral"]
    },

    maga: {
        id: "maga",
        nome: "Isolde",
        classe: "Maga",
        raca: "Humana",
        genero: "Feminino",
        resumo: "Prodígio arcano marcada por forças que talvez a tenham escolhido antes mesmo do nascimento.",
        passado: "Isolde demonstrou talento mágico cedo e com intensidade tão grande que rapidamente deixou de ser vista como aluna e passou a ser tratada como anomalia. Desde criança, sonhava com portas de luz se abrindo no vazio. Com o surgimento dos portais, esses sonhos ficaram mais nítidos. Uma presença passou a sussurrar em seu sono. Ela não sabe se foi escolhida para impedir Axiom — ou para servi-lo.",
        motivacao: "Descobrir a origem de sua ligação com o poder antigo antes que ele a consuma.",
        personalidade: ["brilhante", "intensa", "ambiciosa", "inquieta", "emocionalmente contida"],
        interesses: ["magia rara", "artefatos antigos", "sonhos proféticos", "limites do conhecimento"],
        segredoFerida: "Teme secretamente que parte do poder dos portais ressoe bem demais dentro dela.",
        ligacaoPrincipal: "Possui fortíssima conexão com Axiom, o Abismo, o Plano Astral e as rotas sombrias.",
        tomNarrativo: "Hipnótico, sensível e arcano. Percebe o mundo por presságios e energia.",
        fraseIntro: "Há vozes no vazio. E ultimamente... elas sabem meu nome.",
        fraseFinal: "Se você me chamou até aqui, Axiom, vai se arrepender de ter sido ouvido.",
        afinidades: ["abismo", "planoAstral", "tronoDeus", "infernus"]
    },

    "leonide.m": {
        id: "leonide.m",
        nome: "Bram",
        classe: "Clérigo",
        raca: "Leonídeo",
        genero: "Masculino",
        resumo: "Um sacerdote de fé inabalável, disposto a levar consolo aos vivos e julgamento aos profanadores.",
        passado: "Bram servia em um santuário leonídeo conhecido por acolher peregrinos, órfãos e feridos de guerra. Certa noite, infiltrados dos Eternos profanaram o templo, corromperam o altar e transformaram o lugar de cura em matadouro. Bram sobreviveu protegendo crianças e doentes, mas nunca esqueceu os cânticos distorcidos ecoando no santuário em chamas.",
        motivacao: "Punir os profanadores e restaurar a fé dos que foram quebrados pelo terror.",
        personalidade: ["sereno", "paternal", "compassivo", "firme", "corajoso"],
        interesses: ["ritos sagrados", "cura", "acolhimento", "justiça divina", "proteção dos inocentes"],
        segredoFerida: "Teme que sua compaixão o torne lento diante de inimigos que não merecem clemência.",
        ligacaoPrincipal: "Se conecta fortemente à profanação, mortos-vivos, cemitério e aspectos espirituais da guerra.",
        tomNarrativo: "Calmo, nobre e moral. Valoriza dignidade e esperança.",
        fraseIntro: "Enquanto houver vida para proteger, minha fé não vacilará.",
        fraseFinal: "Você corrompeu altares, almas e promessas. Agora responderá por todas.",
        afinidades: ["cemiterio", "cidadeFant", "castelo", "tronoDeus"]
    },

    "leonide.f": {
        id: "leonide.f",
        nome: "Aria",
        classe: "Clériga",
        raca: "Leonídea",
        genero: "Feminino",
        resumo: "Uma alma sensível marcada por visões e por uma escolha que talvez não seja divina.",
        passado: "Desde criança, Aria ouvia vozes onde outros ouviam silêncio. Seus mestres a chamaram de escolhida, mas nunca souberam explicar escolhida por quem. Com o avanço da corrupção, as vozes ficaram mais claras — e algumas não soam sagradas. Entre orações, sonhos e sinais, Aria sente que seu destino está ligado ao despertar de Axiom de maneira íntima e perigosa.",
        motivacao: "Descobrir a origem de suas visões e impedir que forças falsas se façam passar por divinas.",
        personalidade: ["gentil", "intuitiva", "sensível", "determinada", "espiritualmente inquieta"],
        interesses: ["profecias", "almas", "sonhos", "sinais", "verdade espiritual"],
        segredoFerida: "Teme que a voz que a guiou por toda a vida não pertença à luz.",
        ligacaoPrincipal: "Ótima conexão com Cidade Fantasma, Trono dos Deuses, portais espirituais e conflito entre fé e corrupção.",
        tomNarrativo: "Suave, místico e emotivo. Vê o mundo por ecos espirituais.",
        fraseIntro: "Ouvi esse chamado a vida inteira. Agora finalmente sei que ele era um aviso.",
        fraseFinal: "Nem toda voz que ecoa do alto é digna de adoração.",
        afinidades: ["cidadeFant", "abismo", "tronoDeus"]
    },

    "halfling.m": {
        id: "halfling.m",
        nome: "Finn",
        classe: "Ladino",
        raca: "Halfling",
        genero: "Masculino",
        resumo: "Um ladrão espirituoso que roubou a coisa errada de pessoas ainda piores.",
        passado: "Finn cresceu nas ruas, aprendendo cedo que lei, moral e fome raramente andam juntas. Viveu de golpes pequenos, fugas rápidas e sorrisos convincentes. Tudo ia bem até o dia em que roubou um medalhão estranho de um viajante encapuzado. O homem era um cultista dos Eternos. Desde então, Finn passou a ser caçado por assassinos, monstros e figuras que fariam qualquer ladrão largar a profissão.",
        motivacao: "Sobreviver, descobrir o valor real do medalhão e impedir que o culto o recupere.",
        personalidade: ["esperto", "irreverente", "ágil", "desconfiado", "mais leal do que admite"],
        interesses: ["tesouros", "rotas de fuga", "segredos", "cofres", "relíquias vendáveis"],
        segredoFerida: "Finge não se importar com ninguém porque sabe como dói perder os poucos que importavam.",
        ligacaoPrincipal: "Perfeito para tramas de artefato-chave, infiltração e informação roubada dos Eternos.",
        tomNarrativo: "Leve, sarcástico e rápido. Encontra ironia mesmo em situações sombrias.",
        fraseIntro: "Eu só queria roubar uma bugiganga. Aparentemente, era o começo do apocalipse.",
        fraseFinal: "Já roubei de nobres, bandidos e monstros. Agora vou tirar um mundo inteiro das suas mãos.",
        afinidades: ["pantano", "deserto", "castelo", "tronoDeus"]
    },

    "halfling.f": {
        id: "halfling.f",
        nome: "Mila",
        classe: "Ladina",
        raca: "Halfling",
        genero: "Feminino",
        resumo: "Rápida, furtiva e desacreditada, jurou nunca mais ser ignorada.",
        passado: "Mila trabalhou como mensageira, informante e ladra em cidades onde os ricos chamavam sobrevivência de crime. Durante uma entrega clandestina, escutou cultistas dos Eternos falando sobre empurrar monstros para vilas indefesas por meio de rupturas controladas. Ela correu para avisar. Ninguém acreditou. Dias depois, a tragédia aconteceu exatamente como ouvira.",
        motivacao: "Impedir novas tragédias e provar que a verdade não depende do status de quem a carrega.",
        personalidade: ["astuta", "afiada", "irônica", "corajosa", "ressentida com autoridades cegas"],
        interesses: ["informação", "espionagem", "passagens secretas", "sabotagem", "justiça para os esquecidos"],
        segredoFerida: "O que mais a atormenta não é ter sido ignorada, mas saber quantos morreram porque ela não foi ouvida.",
        ligacaoPrincipal: "Conecta-se bem a espionagem, rotas ocultas, castelo, cidade e infiltração contra os Eternos.",
        tomNarrativo: "Ágil, desconfiado e urbano. Sua voz é viva, cortante e alerta.",
        fraseIntro: "Quando ninguém escuta os pequenos, os monstros entram pela porta da frente.",
        fraseFinal: "Você contou com o silêncio dos outros. Errou. Eu sobrevivi a ele.",
        afinidades: ["colinas", "deserto", "cidadeFant", "castelo"]
    },

    "druida.m": {
        id: "druida.m",
        nome: "Samir",
        classe: "Druida",
        raca: "Fauno",
        genero: "Masculino",
        resumo: "Guardião de círculos antigos, escuta a dor da terra como se fosse a sua.",
        passado: "Samir foi criado entre círculos druídicos que protegiam bosques erguidos sobre linhas vitais de energia do mundo. Essas linhas começaram a pulsar com dor e corrupção. Quando a primeira grande ruptura ocorreu, seu círculo tentou selá-la à força e foi destruído. Samir sobreviveu, mas desde então sente cada portal como uma ferida aberta no próprio corpo do mundo.",
        motivacao: "Curar as linhas vitais da terra e restaurar o equilíbrio antes que o mundo inteiro apodreça.",
        personalidade: ["calmo", "reflexivo", "empático", "firme", "severo com a profanação"],
        interesses: ["animais", "ervas raras", "estações", "ciclos", "equilíbrio entre vida e morte"],
        segredoFerida: "Teme que o mundo esteja tão ferido que selar os portais já não seja suficiente.",
        ligacaoPrincipal: "Tem ligação fortíssima com a rede como ferida energética e natural do mundo.",
        tomNarrativo: "Orgânico, contemplativo e sensorial. Percebe vento, raiz, seiva e desequilíbrio.",
        fraseIntro: "A terra grita. Poucos escutam. Eu não tenho esse privilégio.",
        fraseFinal: "Você feriu o mundo. E eu vim fechar a ferida.",
        afinidades: ["floresta", "pantano", "vulcao", "tronoDeus"]
    },

    "druida.f": {
        id: "druida.f",
        nome: "Flora",
        classe: "Druida",
        raca: "Fauna",
        genero: "Feminino",
        resumo: "Sintonizada com a canção do mundo, luta para impedir seu último silêncio.",
        passado: "Flora sempre ouviu a natureza de uma forma que nem outros druidas compreendiam. Para ela, o mundo cantava: em rios, folhas, raízes e luas. Quando os portais começaram a surgir, essa canção virou um lamento cortado por ruídos que não pertenciam à vida. Ela percebeu que não se tratava apenas de monstros ou magia, mas do próprio tecido espiritual do mundo se rompendo.",
        motivacao: "Impedir que a alma do mundo seja silenciada pela corrupção dos Eternos.",
        personalidade: ["gentil", "poética", "sensível", "intuitiva", "intensa quando enfurecida"],
        interesses: ["espíritos naturais", "cura", "visões", "plantas raras", "harmonia"],
        segredoFerida: "Sente tanto a dor do mundo que teme desaparecer com ele, caso falhe.",
        ligacaoPrincipal: "Excelente para capítulos espirituais como Cidade Fantasma, Cemitério e Plano Astral.",
        tomNarrativo: "Lírico, sensível, belo e melancólico.",
        fraseIntro: "O mundo ainda canta... mas há algo tentando fazê-lo esquecer a própria voz.",
        fraseFinal: "Você trouxe silêncio onde deveria haver vida. Eu trarei de volta o canto.",
        afinidades: ["cemiterio", "cidadeFant", "planoAstral"]
    },

    "monge.m": {
        id: "monge.m",
        nome: "Korg",
        classe: "Monge",
        raca: "Meio-Orc",
        genero: "Masculino",
        resumo: "Um homem de força brutal que escolheu a disciplina para não se tornar monstro.",
        passado: "Korg cresceu em violência, cercado por desprezo e medo. Lutou em arenas clandestinas e quase matou um oponente em um acesso de fúria que nem ele compreendeu. Resgatado por monges errantes, encontrou disciplina, silêncio e propósito. Mas, desde o surgimento dos portais, essa antiga fúria voltou a se agitar dentro dele — como se algo nas trevas reconhecesse sua parte mais perigosa.",
        motivacao: "Provar que sua força pertence à sua vontade, não ao caos dentro dele.",
        personalidade: ["silencioso", "disciplinado", "firme", "contido", "explosivo no limite"],
        interesses: ["autocontrole", "treino", "combate justo", "superação", "quebra de preconceitos"],
        segredoFerida: "Teme que, diante de poder suficiente, sua disciplina não seja mais forte que sua natureza.",
        ligacaoPrincipal: "Conecta-se ao Abismo, às rotas sombrias e ao tema de confrontar a própria escuridão.",
        tomNarrativo: "Contido, pesado e introspectivo. Fala por impacto e tensão.",
        fraseIntro: "Passei anos domando o monstro. Não deixarei outro me dominar.",
        fraseFinal: "Você quer a fúria do mundo. Vai receber a minha — sob controle.",
        afinidades: ["abismo", "infernus", "tronoDeus"]
    },

    "monge.f": {
        id: "monge.f",
        nome: "Zora",
        classe: "Monge",
        raca: "Meio-Orc",
        genero: "Feminino",
        resumo: "Guiada por visões e silêncio interior, caminha rumo ao fim que viu antes de todos.",
        passado: "Zora foi criada em um mosteiro distante, onde mestres ensinavam a escutar o vazio para compreender o mundo. Em uma meditação profunda, viu tronos quebrados, céus em chamas e uma presença colossal presa atrás de luz e ruína. Quando os portais começaram a surgir, soube que suas visões não eram metáforas. Eram memória do futuro.",
        motivacao: "Seguir suas visões até a origem e impedir o colapso espiritual do mundo.",
        personalidade: ["serena", "focada", "enigmática", "sábia", "inflexível quando tem certeza"],
        interesses: ["meditação", "transcendência", "profecias", "energia espiritual", "compreensão do vazio"],
        segredoFerida: "Teme que, para deter Axiom, precise abrir mão da própria humanidade.",
        ligacaoPrincipal: "Uma das personagens mais fortes para Plano Astral, Abismo e Trono dos Deuses.",
        tomNarrativo: "Filosófico, limpo, contemplativo, quase profético.",
        fraseIntro: "Eu vi este caminho antes de pisá-lo. Ainda assim, escolho segui-lo.",
        fraseFinal: "Não temo o vazio. Temo apenas o que você faria com ele.",
        afinidades: ["abismo", "planoAstral", "tronoDeus"]
    }
};

// ============================================
// SEÇÃO 7: FUNÇÕES DE ACESSO AOS PROTAGONISTAS
// ============================================

function getProtagonistaNarrativoAtual() {
    if (typeof getPersonagemNarrativoId === "function") {
        var id = getPersonagemNarrativoId();
        if (id && protagonistasNarrativos[id]) {
            return protagonistasNarrativos[id];
        }
    }

    // fallback por nome
    if (typeof player !== "undefined" && player && player.nome) {
        var lista = Object.keys(protagonistasNarrativos);
        for (var i = 0; i < lista.length; i++) {
            var key = lista[i];
            if (protagonistasNarrativos[key].nome === player.nome) {
                return protagonistasNarrativos[key];
            }
        }
    }

    return null;
}

function getResumoProtagonistaNarrativoAtual() {
    var p = getProtagonistaNarrativoAtual();
    if (!p) return null;

    return {
        nome: p.nome,
        classe: p.classe,
        raca: p.raca,
        resumo: p.resumo,
        motivacao: p.motivacao,
        tomNarrativo: p.tomNarrativo,
        fraseIntro: p.fraseIntro,
        fraseFinal: p.fraseFinal
    };
}

function getAfinidadesNarrativasDoProtagonista() {
    var p = getProtagonistaNarrativoAtual();
    if (!p || !p.afinidades) return [];
    return p.afinidades.slice();
}

// ============================================
// SEÇÃO 8: FUNÇÕES OFICIAIS DE CAPÍTULO POR ÁREA
// ============================================

function getCapituloNarrativoIdPorArea(areaKey) {
    return mapaCapitulosHistoriaPorArea[areaKey] || null;
}

function getResumoCapituloPorArea(areaKey) {
    if (!areaKey || !areas || !areas[areaKey]) return null;

    var area = areas[areaKey];
    var capId = area.capitulo;
    if (!capId) return null;

    return resumoCapitulosNarrativos[capId] || null;
}

function getAtoNarrativoAtual() {
    if (!player || !player.level) return historiaCampanha.atos[0];

    var capituloEstimado = 1;

    if (player.level >= 4)  capituloEstimado = 2;
    if (player.level >= 7)  capituloEstimado = 3;
    if (player.level >= 10) capituloEstimado = 4;
    if (player.level >= 13) capituloEstimado = 5;
    if (player.level >= 16) capituloEstimado = 6;
    if (player.level >= 19) capituloEstimado = 7;
    if (player.level >= 22) capituloEstimado = 8;
    if (player.level >= 25) capituloEstimado = 9;
    if (player.level >= 28) capituloEstimado = 10;
    if (player.level >= 31) capituloEstimado = 11;
    if (player.level >= 34) capituloEstimado = 12;
    if (player.level >= 37) capituloEstimado = 13;
    if (player.level >= 40) capituloEstimado = 14;
    if (player.level >= 43) capituloEstimado = 15;

    for (var i = 0; i < historiaCampanha.atos.length; i++) {
        if (historiaCampanha.atos[i].capitulos.indexOf(capituloEstimado) !== -1) {
            return historiaCampanha.atos[i];
        }
    }

    return historiaCampanha.atos[0];
}

// ============================================
// SEÇÃO 9: INICIALIZAÇÃO DE SEGURANÇA
// ============================================

if (typeof garantirEstadoNarrativoPlayer === "function") {
    garantirEstadoNarrativoPlayer();
}

// ============================================
// HISTORIA.JS
// PARTE 2 — NPCs DE CAMPANHA, ESCOLHAS E VÍNCULOS
// ============================================

// ============================================
// SEÇÃO 10: NPCs NARRATIVOS DA CAMPANHA
// ============================================

var npcsNarrativosCampanha = {
    elian: {
        id: "elian",
        nome: "Elian",
        titulo: "O Cronista Queimado",
        emoji: "📚",
        resumo: "Historiador sobrevivente dos textos proibidos sobre os Eternos.",
        conceito: "Elian era um escriba real que estudou registros banidos sobre os Eternos. Tentou alertar reis e templos, mas foi silenciado. Sobreviveu a uma queima pública de arquivos e hoje vaga reunindo fragmentos da verdade.",
        personalidade: ["erudito", "amargo", "lúcido", "cauteloso", "obcecado por memória histórica"],
        funcaoNarrativa: "Explica a história dos Eternos, liga ruínas e templos e mostra como a verdade foi apagada ao longo dos séculos.",
        areas: ["ruinas", "deserto", "castelo"],
        temas: ["memória", "verdade apagada", "história proibida", "conhecimento perigoso"],

        rotas: {
            heroi: {
                titulo: "O Arquivo Perdido",
                tema: "preservar memória sem repetir violência",
                descricao: "Elian pede ajuda para recuperar pergaminhos sem destruir os ecos de guardiões que ainda protegem a biblioteca enterrada."
            },
            neutro: {
                titulo: "O Texto e o Preço",
                tema: "verdade como recurso estratégico",
                descricao: "Elian oferece um manuscrito raro em troca de ajuda para escolher quais documentos salvar e quais abandonar."
            },
            sombrio: {
                titulo: "As Páginas Banidas",
                tema: "saber arrancado, não recebido",
                descricao: "Elian hesita em revelar um tomo proibido, e o protagonista o toma ou o pressiona a revelar fórmulas dos Eternos."
            }
        },

        reacoesPorRota: {
            heroi: "admira",
            neutro: "negocia",
            sombrio: "teme"
        }
    },

    soraya: {
        id: "soraya",
        nome: "Soraya",
        titulo: "A Filha do Pântano",
        emoji: "🕯️",
        resumo: "Médium e intérprete de espíritos presos entre mundos.",
        conceito: "Soraya nasceu em terras encharcadas próximas ao Pântano Venenoso e cresceu ouvindo vozes dos mortos. Não é exatamente bruxa, nem sacerdotisa, nem fantasma — está entre mundos.",
        personalidade: ["serena", "inquietante", "compassiva", "intuitiva", "enigmática"],
        funcaoNarrativa: "Interpreta ecos dos mortos, explica como sofrimento alimenta portais e antecipa eventos do Cemitério e da Cidade Fantasma.",
        areas: ["pantano", "cemiterio", "abismo"],
        temas: ["morte", "luto", "escuta", "limiar entre mundos"],

        rotas: {
            heroi: {
                titulo: "Vigília das Almas",
                tema: "ouvir e libertar",
                descricao: "Soraya pede que o protagonista a proteja durante um ritual de libertação de espíritos presos."
            },
            neutro: {
                titulo: "Os Mortos Informam",
                tema: "negociar com o além",
                descricao: "Soraya canaliza vozes do além em troca de um favor tático, e o protagonista decide quais vozes valem ouvir."
            },
            sombrio: {
                titulo: "Corrente de Ecos",
                tema: "instrumentalizar os mortos",
                descricao: "Soraya se horroriza ao perceber que o protagonista quer usar os espíritos como fonte de poder ou informação forçada."
            }
        },

        reacoesPorRota: {
            heroi: "confia",
            neutro: "tolera",
            sombrio: "condena"
        }
    },

    draeven: {
        id: "draeven",
        nome: "Draeven",
        titulo: "O Orc Sem Clã",
        emoji: "🪓",
        resumo: "Um sobrevivente orc que prova que a corrupção destrói povos inteiros, não apenas monstros.",
        conceito: "Draeven foi batedor orc durante a crise das Colinas Sangrentas. Depois da queda do chefe corrompido, tornou-se errante. Busca reunir sobreviventes e impedir que fragmentos negros voltem a enlouquecer outros clãs.",
        personalidade: ["direto", "honrado à sua maneira", "brutal sem sadismo", "leal", "ressentido contra os Eternos"],
        funcaoNarrativa: "Humaniza povos tratados como inimigos e mostra o impacto político e social da corrupção.",
        areas: ["colinas", "caverna", "vulcao"],
        temas: ["guerra", "clã", "sobrevivência coletiva", "aliança improvável"],

        rotas: {
            heroi: {
                titulo: "Os Restos do Clã",
                tema: "proteção além de fronteiras",
                descricao: "Draeven pede ajuda para escoltar órfãos e sobreviventes orcs até um vale seguro."
            },
            neutro: {
                titulo: "A Trégua das Cinzas",
                tema: "aliança funcional",
                descricao: "Draeven propõe um acordo: o protagonista ajuda a eliminar um grupo corrompido, e ele oferece guerreiros ou recursos."
            },
            sombrio: {
                titulo: "A Lei do Forte",
                tema: "comando pela imposição",
                descricao: "O protagonista convence ou domina Draeven a reunir os sobreviventes sob força brutal."
            }
        },

        reacoesPorRota: {
            heroi: "respeita",
            neutro: "firma_acordo",
            sombrio: "obedece_ou_rompe"
        }
    },

    iris: {
        id: "iris",
        nome: "Iris Vael",
        titulo: "A Maga Exilada",
        emoji: "🔷",
        resumo: "Especialista em selos e estudiosa do limiar entre mundos.",
        conceito: "Iris foi expulsa de uma academia arcana por estudar o que chamavam de estruturas impossíveis. Entendeu cedo demais que os portais obedeciam a lógica, não loucura.",
        personalidade: ["fria", "brilhante", "sarcástica", "precisa", "emocionalmente contida"],
        funcaoNarrativa: "Explica o funcionamento técnico da rede e faz a ponte entre ciência arcana e horror cósmico.",
        areas: ["ruinas", "planoAstral", "tronoDeus"],
        temas: ["conhecimento", "lógica da ruína", "selo", "limiar dimensional"],

        rotas: {
            heroi: {
                titulo: "Selar, Não Tomar",
                tema: "renúncia ao ganho pelo bem maior",
                descricao: "Iris oferece uma forma mais segura de romper um elo, desde que o protagonista aceite abrir mão do poder residual."
            },
            neutro: {
                titulo: "Equação do Vazio",
                tema: "inteligência estratégica",
                descricao: "Iris trabalha com o protagonista para calcular qual elo romper primeiro e como extrair vantagem sem colapso total."
            },
            sombrio: {
                titulo: "Roubar a Fórmula",
                tema: "ultrapassar limites do conhecimento",
                descricao: "O protagonista usa, rouba ou impõe acesso às anotações mais proibidas de Iris sobre absorção de energia portal."
            }
        },

        reacoesPorRota: {
            heroi: "colabora",
            neutro: "respeita_a_logica",
            sombrio: "teme_ou_se_fascina"
        }
    },

    tallen: {
        id: "tallen",
        nome: "Tallen",
        titulo: "O Cavaleiro que Sobrou",
        emoji: "🛡️",
        resumo: "Último descendente da guarda do rei morto.",
        conceito: "Tallen descende da guarda real que caiu defendendo o castelo contra a ascensão dos Eternos. Cresceu ouvindo que sua linhagem falhou no momento decisivo e vive obcecado em restaurar essa honra.",
        personalidade: ["leal", "orgulhoso", "ferido pelo passado", "disciplinado", "inspirável ou manipulável"],
        funcaoNarrativa: "Conecta o protagonista ao legado do castelo e ao eco entre o último rei e o último guardião mortal.",
        areas: ["castelo", "cidadeFant", "tronoDeus"],
        temas: ["legado", "honra", "fracasso herdado", "reconstrução"],

        rotas: {
            heroi: {
                titulo: "A Guarda Renascida",
                tema: "legado restaurado",
                descricao: "Você ajuda Tallen a reunir descendentes, símbolos e juramentos para restaurar a guarda como ordem protetora."
            },
            neutro: {
                titulo: "A Espada e o Nome",
                tema: "tradição adaptada",
                descricao: "Tallen aceita que honra também precisa de sobrevivência, e juntos vocês recuperam relíquias e estratégia."
            },
            sombrio: {
                titulo: "O Último Juramento",
                tema: "legado corrompido em nome da vitória",
                descricao: "Você convence Tallen a trocar honra por vitória total, usando relíquias da antiga guarda de forma profana."
            }
        },

        reacoesPorRota: {
            heroi: "se_inspira",
            neutro: "segue_por_pragmatismo",
            sombrio: "pode_ser_corrompido"
        }
    },

    maela: {
        id: "maela",
        nome: "Maela",
        titulo: "A Portadora da Cicatriz",
        emoji: "🩸",
        resumo: "Uma humana marcada por energia portal, espelho vivo do risco do protagonista.",
        conceito: "Maela sobreviveu a um rompimento parcial de portal e ficou marcada física e espiritualmente pela energia da rede. Não serve aos Eternos, mas tampouco saiu intacta.",
        personalidade: ["intensa", "cética", "dolorosamente lúcida", "resiliente", "desconfiada"],
        funcaoNarrativa: "Mostra o custo físico e mental da corrupção e espelha o protagonista, especialmente na rota sombria.",
        areas: ["geleira", "abismo", "infernus"],
        temas: ["ferida", "corrupção viva", "limite", "sobrevivência marcada"],

        rotas: {
            heroi: {
                titulo: "Segurar a Ruptura",
                tema: "salvar alguém já usada pelo abismo",
                descricao: "Você ajuda Maela a conter uma crise causada pela própria cicatriz sem explorá-la."
            },
            neutro: {
                titulo: "Usar a Marca",
                tema: "risco administrado",
                descricao: "Vocês cooperam para usar a cicatriz dela como sensor temporário da rede, com risco calculado."
            },
            sombrio: {
                titulo: "Abrir a Ferida",
                tema: "transformar dor alheia em instrumento",
                descricao: "O protagonista força Maela a usar a marca além do limite, obtendo vantagem às custas dela."
            }
        },

        reacoesPorRota: {
            heroi: "se_apega",
            neutro: "coopera_com_cautela",
            sombrio: "odeia_ou_teme"
        }
    }
};

// ============================================
// SEÇÃO 11: ESCOLHAS NARRATIVAS IMPORTANTES
// ============================================

var escolhasNarrativasImportantes = {
    altar_purificar: {
        id: "altar_purificar",
        capitulo: 1,
        cena: "cap1_cena3",
        pesoRota: 2,
        rota: "heroi",
        tema: "purificação do primeiro foco de corrupção",
        flags: ["altarPurificado"],
        impactoFinal: "reforca_linha_heroica"
    },

    altar_estudar: {
        id: "altar_estudar",
        capitulo: 1,
        cena: "cap1_cena3",
        pesoRota: 1,
        rota: "neutro",
        tema: "conhecimento como arma",
        flags: ["altarEstudado"],
        impactoFinal: "reforca_linha_neutra"
    },

    altar_absorver: {
        id: "altar_absorver",
        capitulo: 1,
        cena: "cap1_cena3",
        pesoRota: 2,
        rota: "sombrio",
        tema: "primeiro pacto íntimo com a corrupção",
        flags: ["altarAbsorvido"],
        impactoFinal: "reforca_linha_sombria"
    },

    bruxa_pagar: {
        id: "bruxa_pagar",
        capitulo: 2,
        cena: "cap2_cena2",
        pesoRota: 1,
        rota: "neutro",
        tema: "conhecimento comprado",
        flags: ["confiouBruxa"]
    },

    bruxa_ameacar: {
        id: "bruxa_ameacar",
        capitulo: 2,
        cena: "cap2_cena2",
        pesoRota: 1,
        rota: "sombrio",
        tema: "imposição sobre a sabedoria",
        flags: ["ameacouBruxa"]
    },

    bruxa_ajudar: {
        id: "bruxa_ajudar",
        capitulo: 2,
        cena: "cap2_cena2",
        pesoRota: 1,
        rota: "heroi",
        tema: "merecer o conhecimento",
        flags: ["ajudouBruxa"]
    },

    orc_alianca: {
        id: "orc_alianca",
        capitulo: 3,
        cena: "cap3_cena2",
        pesoRota: 1,
        rota: "heroi",
        tema: "aliança improvável",
        flags: ["aliouOrcs"]
    },

    orc_matar: {
        id: "orc_matar",
        capitulo: 3,
        cena: "cap3_cena2",
        pesoRota: 2,
        rota: "sombrio",
        tema: "eficiência cruel",
        flags: ["matouBatedorOrc"]
    },

    ruinas_libertar: {
        id: "ruinas_libertar",
        capitulo: 4,
        cena: "cap4_cena3",
        pesoRota: 2,
        rota: "heroi",
        tema: "misericórdia diante do arrependimento",
        flags: ["libertouEspíritoRuinas"]
    },

    ruinas_absorver: {
        id: "ruinas_absorver",
        capitulo: 4,
        cena: "cap4_cena3",
        pesoRota: 2,
        rota: "sombrio",
        tema: "poder roubado de uma alma em culpa",
        flags: ["absorveuEspíritoRuinas"]
    },

    sombra_integrar: {
        id: "sombra_integrar",
        capitulo: 11,
        cena: "cap11_cena2",
        pesoRota: 2,
        rota: "heroi",
        tema: "integração da escuridão interior",
        flags: ["integrouSombra"],
        impactoFinal: "equilibrio_interior"
    },

    sombra_destruir: {
        id: "sombra_destruir",
        capitulo: 11,
        cena: "cap11_cena2",
        pesoRota: 1,
        rota: "neutro",
        tema: "negação combativa da sombra",
        flags: ["destruiuSombra"]
    },

    sombra_fundir: {
        id: "sombra_fundir",
        capitulo: 11,
        cena: "cap11_cena2",
        pesoRota: 2,
        rota: "sombrio",
        tema: "abraçar a escuridão como poder",
        flags: ["fundiuSombra"],
        impactoFinal: "ascensao_sombria"
    },

    rei_espada: {
        id: "rei_espada",
        capitulo: 12,
        cena: "cap12_cena2",
        pesoRota: 1,
        rota: "neutro",
        tema: "legado de guerra",
        flags: ["pegouEspadaRei"]
    },

    rei_coroa: {
        id: "rei_coroa",
        capitulo: 12,
        cena: "cap12_cena2",
        pesoRota: 1,
        rota: "heroi",
        tema: "legado de visão e responsabilidade",
        flags: ["pegouCoroaRei"]
    },

    rei_ambos: {
        id: "rei_ambos",
        capitulo: 12,
        cena: "cap12_cena2",
        pesoRota: 2,
        rota: "sombrio",
        tema: "tomar tudo, inclusive a essência do legado",
        flags: ["absorveuRei"]
    },

    pacto_parcial: {
        id: "pacto_parcial",
        capitulo: 14,
        cena: "cap14_cena2",
        pesoRota: 1,
        rota: "neutro",
        tema: "compromisso perigoso",
        flags: ["pactoDemoniacoParcial"]
    },

    pacto_total: {
        id: "pacto_total",
        capitulo: 14,
        cena: "cap14_cena2",
        pesoRota: 2,
        rota: "sombrio",
        tema: "venda de si em nome do poder absoluto",
        flags: ["pactoDemoniacoTotal"],
        impactoFinal: "alma_marcada"
    }
};

// ============================================
// SEÇÃO 12: PESO NARRATIVO DAS CENAS
// ============================================

var pesoNarrativoCenas = {
    cap1_cena3:  { tipo: "chave_maxima", pesoRota: 2, exigePensamentoExclusivo: true },
    cap2_cena3:  { tipo: "chave_maxima", pesoRota: 1, exigePensamentoExclusivo: true },
    cap4_cena4:  { tipo: "chave_maxima", pesoRota: 1, exigePensamentoExclusivo: true },
    cap8_cena4:  { tipo: "chave_maxima", pesoRota: 1, exigePensamentoExclusivo: true },
    cap9_cena4:  { tipo: "chave_maxima", pesoRota: 1, exigePensamentoExclusivo: true },
    cap11_cena2: { tipo: "chave_maxima", pesoRota: 2, exigePensamentoExclusivo: true },
    cap12_cena4: { tipo: "chave_maxima", pesoRota: 1, exigePensamentoExclusivo: true },
    cap14_cena2: { tipo: "chave_maxima", pesoRota: 2, exigePensamentoExclusivo: true },
    cap15_cena2: { tipo: "chave_maxima", pesoRota: 2, exigePensamentoExclusivo: true },
    cap15_cena3: { tipo: "chave_maxima", pesoRota: 1, exigePensamentoExclusivo: true }
};

// ============================================
// SEÇÃO 13: LIMIARES DE RELAÇÃO COM NPCs
// ============================================

var limitesRelacaoNpc = {
    aliado: {
        confianca: 2,
        respeito: 2,
        medoMaximo: 1
    },
    favoravel: {
        confianca: 1,
        respeito: 1
    },
    temeroso: {
        medo: 2
    }
};

// ============================================
// SEÇÃO 14: FUNÇÕES DE RELAÇÃO COM NPCs
// ============================================

function getDadosRelacaoNpc(npcId) {
    if (!player || !player.narrativa || !player.narrativa.npcCampanha) return null;
    return player.narrativa.npcCampanha[npcId] || null;
}

function getEstadoRelacaoNpc(npcId) {
    var rel = getDadosRelacaoNpc(npcId);
    if (!rel) return "desconhecido";

    if (rel.ruptura) return "ruptura";
    if (rel.medo >= limitesRelacaoNpc.temeroso.medo && rel.confianca <= 0) return "temeroso";
    if (
        rel.confianca >= limitesRelacaoNpc.aliado.confianca &&
        rel.respeito >= limitesRelacaoNpc.aliado.respeito &&
        rel.medo <= limitesRelacaoNpc.aliado.medoMaximo
    ) {
        return "aliado";
    }
    if (
        rel.confianca >= limitesRelacaoNpc.favoravel.confianca ||
        rel.respeito >= limitesRelacaoNpc.favoravel.respeito
    ) {
        return "favoravel";
    }

    return "neutro";
}

function npcPodeAjudarNoFinal(npcId) {
    var estado = getEstadoRelacaoNpc(npcId);
    return estado === "aliado" || estado === "favoravel";
}

function marcarRupturaNpc(npcId) {
    if (!player || !player.narrativa || !player.narrativa.npcCampanha || !player.narrativa.npcCampanha[npcId]) return;
    player.narrativa.npcCampanha[npcId].ruptura = true;
}

function aplicarMudancaRelacaoNpc(npcId, delta) {
    if (!npcId || !delta) return;
    if (typeof alterarRelacaoNpcCampanha !== "function") return;

    if (typeof delta.confianca === "number") {
        alterarRelacaoNpcCampanha(npcId, "confianca", delta.confianca);
    }
    if (typeof delta.respeito === "number") {
        alterarRelacaoNpcCampanha(npcId, "respeito", delta.respeito);
    }
    if (typeof delta.medo === "number") {
        alterarRelacaoNpcCampanha(npcId, "medo", delta.medo);
    }

    if (delta.ruptura === true) {
        marcarRupturaNpc(npcId);
    }
}

// ============================================
// SEÇÃO 15: IMPACTO DE ESCOLHAS GRANDES EM NPCs
// ============================================

var impactoEscolhasEmNpcs = {
    altar_purificar: {
        iris:   { respeito: 1 },
        soraya: { confianca: 1 }
    },
    altar_estudar: {
        elian: { respeito: 1 },
        iris:  { respeito: 1 }
    },
    altar_absorver: {
        iris:   { respeito: 1, medo: 1 },
        soraya: { medo: 1 }
    },

    bruxa_ajudar: {
        soraya: { confianca: 1 }
    },
    bruxa_ameacar: {
        soraya: { medo: 1 }
    },

    orc_alianca: {
        draeven: { confianca: 1, respeito: 1 }
    },
    orc_matar: {
        draeven: { medo: 1, ruptura: true }
    },

    ruinas_libertar: {
        elian: { confianca: 1, respeito: 1 },
        iris:  { respeito: 1 }
    },
    ruinas_absorver: {
        elian: { medo: 2 },
        iris:  { respeito: 1, medo: 1 }
    },

    sombra_integrar: {
        maela: { confianca: 1 },
        soraya:{ respeito: 1 }
    },
    sombra_destruir: {
        tallen: { respeito: 1 }
    },
    sombra_fundir: {
        maela: { medo: 2 },
        iris:  { medo: 1, respeito: 1 }
    },

    rei_coroa: {
        tallen: { confianca: 1, respeito: 2 }
    },
    rei_espada: {
        tallen: { respeito: 1 }
    },
    rei_ambos: {
        tallen: { medo: 2, ruptura: true }
    },

    pacto_parcial: {
        maela: { medo: 1 },
        soraya:{ medo: 1 }
    },
    pacto_total: {
        maela: { medo: 2, ruptura: true },
        soraya:{ medo: 2 },
        tallen:{ medo: 1 }
    }
};

// ============================================
// SEÇÃO 16: FUNÇÃO PARA APLICAR IMPACTO EM NPCs
// ============================================

function aplicarImpactoEscolhaEmNpcs(escolhaId) {
    var impactos = impactoEscolhasEmNpcs[escolhaId];
    if (!impactos) return;

    Object.keys(impactos).forEach(function(npcId) {
        aplicarMudancaRelacaoNpc(npcId, impactos[npcId]);
    });
}

// ============================================
// SEÇÃO 17: REGISTRO DE ESCOLHAS GRANDES
// ============================================

function registrarEscolhaNarrativaGrande(escolhaId) {
    if (!player || !player.narrativa) return;

    if (!player.narrativa.escolhasGrandes) {
        player.narrativa.escolhasGrandes = [];
    }

    if (player.narrativa.escolhasGrandes.indexOf(escolhaId) === -1) {
        player.narrativa.escolhasGrandes.push(escolhaId);
    }
}

function jogadorFezEscolhaGrande(escolhaId) {
    if (!player || !player.narrativa || !player.narrativa.escolhasGrandes) return false;
    return player.narrativa.escolhasGrandes.indexOf(escolhaId) !== -1;
}

// ============================================
// SEÇÃO 18: RESUMO DE REAÇÃO DOS NPCs À ROTA ATUAL
// ============================================

function getResumoReacaoNpcsPorRotaAtual() {
    if (typeof getRotaDominante !== "function") return {};

    var rota = getRotaDominante();
    var resumo = {};

    Object.keys(npcsNarrativosCampanha).forEach(function(id) {
        var npc = npcsNarrativosCampanha[id];
        resumo[id] = npc.reacoesPorRota[rota] || "neutro";
    });

    return resumo;
}

// ============================================
// SEÇÃO 19: RESUMO NARRATIVO DOS NPCs DA ÁREA
// ============================================

function getNpcsNarrativosDaArea(areaKey) {
    if (typeof getNpcCampanhaDaArea !== "function") return [];

    var ids = getNpcCampanhaDaArea(areaKey) || [];
    return ids.map(function(id) {
        return npcsNarrativosCampanha[id];
    }).filter(Boolean);
}

// ============================================
// SEÇÃO 20: EXPANSÃO SEGURA DO ESTADO NARRATIVO
// ============================================

function expandirEstadoNarrativoHistoria() {
    if (typeof garantirEstadoNarrativoPlayer === "function") {
        garantirEstadoNarrativoPlayer();
    }

    if (!player || !player.narrativa) return;

    if (!player.narrativa.escolhasGrandes) {
        player.narrativa.escolhasGrandes = [];
    }

    if (!player.narrativa.marcasNarrativas) {
        player.narrativa.marcasNarrativas = {
            contatoComCorrupcao: 0,
            misericordiaExercida: 0,
            ambicaoAssumida: 0
        };
    }
}

expandirEstadoNarrativoHistoria();
// ============================================
// HISTORIA.JS
// PARTE 3 — LORE, CONSEQUÊNCIAS, PROGRESSÃO E FINAIS
// ============================================

// ============================================
// SEÇÃO 21: CODEX / LORE DO MUNDO
// ============================================

var codexNarrativo = {
    eternos: {
        id: "eternos",
        titulo: "Os Eternos",
        categoria: "facção",
        resumo: "Culto antigo que acreditava poder corrigir as falhas do mundo por meio de selos, rituais e controle da passagem entre vida, morte e divindade.",
        detalhes: [
            "Nem todos começaram como monstros; muitos acreditavam que serviam a uma revelação.",
            "Transformaram fé em estrutura ritual e sofrimento em mecanismo.",
            "Buscam o retorno de Axiom por meio de uma rede de elos espalhada pelo mundo."
        ]
    },

    axiom: {
        id: "axiom",
        titulo: "Axiom, o Deus Corrompido",
        categoria: "entidade",
        resumo: "A entidade central por trás da rede de portais e do plano dos Eternos.",
        detalhes: [
            "Representa o retorno de uma divindade que já não preserva ordem, apenas dominação e ruína.",
            "Não é apenas força bruta; é também presença ideológica, espiritual e estrutural.",
            "Enxerga o protagonista de modo diferente conforme a rota dominante."
        ]
    },

    rede: {
        id: "rede",
        titulo: "A Rede de Portais",
        categoria: "estrutura",
        resumo: "Uma malha de elos rituais interligados que sustenta o retorno de Axiom.",
        detalhes: [
            "Os portais não são isolados; cada elo sustenta os demais.",
            "Fechar um elo ajuda, mas não basta enquanto a rede permanecer ativa.",
            "Quanto mais elos são quebrados, mais a estrutura central reage."
        ]
    },

    selos: {
        id: "selos",
        titulo: "Selos Antigos",
        categoria: "ritual",
        resumo: "Âncoras e estruturas antigas criadas para conter ou manipular a passagem entre mundos.",
        detalhes: [
            "Alguns foram erguidos para proteger o mundo.",
            "Outros foram pervertidos ou adaptados pelos Eternos.",
            "Muitos guardiões acabaram presos ao próprio dever por séculos."
        ]
    },

    fragmentosNegros: {
        id: "fragmentosNegros",
        titulo: "Fragmentos Negros",
        categoria: "artefato",
        resumo: "Peças arrancadas de estruturas maiores da rede, capazes de corromper líderes, criaturas e territórios.",
        detalhes: [
            "São pequenos demais para parecerem centrais, mas fortes demais para serem acidente.",
            "Amplificam fissuras internas, violência e obsessão.",
            "Funcionam como instrumentos materiais da vontade dos Eternos."
        ]
    },

    sofrimentoComoCombustivel: {
        id: "sofrimentoComoCombustivel",
        titulo: "Sofrimento como Combustível",
        categoria: "segredo",
        resumo: "Uma das descobertas mais monstruosas dos Eternos: tragédia coletiva pode estabilizar elos da rede.",
        detalhes: [
            "Quanto maior a dor compartilhada, mais profundo o rasgo na realidade.",
            "Cidades destruídas, mortos presos e luto interrompido foram transformados em infraestrutura ritual.",
            "Esse conhecimento marca o ponto em que o culto deixa de poder alegar qualquer pureza."
        ]
    },

    paradoxoDoSelamento: {
        id: "paradoxoDoSelamento",
        titulo: "O Paradoxo do Selamento",
        categoria: "verdade central",
        resumo: "Fechar os portais enfraquece a rede, mas também acelera a reação do que dorme em seu centro.",
        detalhes: [
            "Cada vitória aproxima o mundo da salvação e do confronto final ao mesmo tempo.",
            "A campanha deixa de ser simples missão de erradicação e se torna corrida contra um despertar.",
            "Esse paradoxo torna a guerra moralmente e estrategicamente mais dura."
        ]
    },

    temploOriginal: {
        id: "temploOriginal",
        titulo: "O Templo Original",
        categoria: "origem",
        resumo: "Local mais antigo associado à origem estruturada dos Eternos e da rede.",
        detalhes: [
            "Na Geleira Eterna, os símbolos aparecem mais completos e menos improvisados.",
            "Ali, os Eternos já não parecem delirantes, mas metódicos.",
            "É a prova de que o desastre nasceu de um projeto, não apenas de um desvio."
        ]
    },

    guardioesPresos: {
        id: "guardioesPresos",
        titulo: "Guardiões Presos",
        categoria: "tema",
        resumo: "Criaturas, reis, espíritos e vigias presos por eras a deveres, selos ou estruturas que não escolheram mais servir.",
        detalhes: [
            "Nem todo inimigo é origem do mal; muitos são vítimas acorrentadas à função.",
            "O dragão das profundezas, o gigante de gelo e o rei morto expressam esse tema.",
            "Libertar, respeitar ou explorar esses seres define muito da rota do protagonista."
        ]
    }
};

// ============================================
// SEÇÃO 22: FUNÇÕES DE ACESSO AO CODEX
// ============================================

function getEntradaCodex(id) {
    return codexNarrativo[id] || null;
}

function getTodasEntradasCodex() {
    return Object.keys(codexNarrativo).map(function(key) {
        return codexNarrativo[key];
    });
}

// ============================================
// SEÇÃO 23: CAPÍTULOS VISTOS E PROGRESSÃO NARRATIVA
// ============================================

function capituloJaFoiVisto(capituloId) {
    if (!player || !player.narrativa || !player.narrativa.capitulosVistos) return false;
    return player.narrativa.capitulosVistos.indexOf(capituloId) !== -1;
}

function cenaJaFoiVista(cenaId) {
    if (!player || !player.narrativa || !player.narrativa.cenasVistas) return false;
    return player.narrativa.cenasVistas.indexOf(cenaId) !== -1;
}

function registrarCapituloVistoHistoria(capituloId) {
    expandirEstadoNarrativoHistoria();

    if (player.narrativa.capitulosVistos.indexOf(capituloId) === -1) {
        player.narrativa.capitulosVistos.push(capituloId);
    }
}

function registrarCenaVistaHistoria(cenaId) {
    expandirEstadoNarrativoHistoria();

    if (player.narrativa.cenasVistas.indexOf(cenaId) === -1) {
        player.narrativa.cenasVistas.push(cenaId);
    }
}

// ============================================
// SEÇÃO 24: CAPÍTULO NARRATIVO DISPONÍVEL
// Função oficial para substituir inconsistências de core/world
// ============================================

function verificarCapituloNarrativoDisponivelOficial() {
    if (!gameState || !gameState.areaAtual) return null;
    if (typeof capitulosNarrativos === "undefined") return null;

    var areaKey = gameState.areaAtual;
    var capituloKey = getCapituloNarrativoIdPorArea(areaKey);
    if (!capituloKey) return null;

    if (Array.isArray(capitulosNarrativos)) {
        for (var i = 0; i < capitulosNarrativos.length; i++) {
            if (capitulosNarrativos[i] && capitulosNarrativos[i].area === areaKey) {
                return capitulosNarrativos[i];
            }
        }
        return null;
    }

    return capitulosNarrativos[capituloKey] || null;
}

// ============================================
// SEÇÃO 25: MARCAS NARRATIVAS DO PROTAGONISTA
// ============================================

function adicionarMarcaNarrativa(tipo, valor) {
    expandirEstadoNarrativoHistoria();
    valor = valor || 1;

    if (!player.narrativa.marcasNarrativas.hasOwnProperty(tipo)) return;
    player.narrativa.marcasNarrativas[tipo] += valor;
}

function getMarcasNarrativas() {
    expandirEstadoNarrativoHistoria();
    return player.narrativa.marcasNarrativas;
}

// ============================================
// SEÇÃO 26: CONSEQUÊNCIAS AVANÇADAS DAS ESCOLHAS
// Expande a função simples já existente no world.js
// ============================================

function aplicarConsequenciaNarrativaAvancada(escolhaId, tipoRota, peso) {
    peso = peso || 1;

    expandirEstadoNarrativoHistoria();

    // manter compatibilidade com sistema atual
    if (typeof adicionarPontoRota === "function") {
        adicionarPontoRota(tipoRota, peso);
    }

    registrarEscolhaNarrativaGrande(escolhaId);
    aplicarImpactoEscolhaEmNpcs(escolhaId);

    var escolha = escolhasNarrativasImportantes[escolhaId];
    if (escolha && escolha.flags) {
        escolha.flags.forEach(function(flag) {
            if (typeof setFlagNarrativa === "function") {
                setFlagNarrativa(flag, true);
            }
        });
    }

    // marcas narrativas globais
    switch (tipoRota) {
        case "heroi":
            adicionarMarcaNarrativa("misericordiaExercida", peso);
            break;
        case "sombrio":
            adicionarMarcaNarrativa("ambicaoAssumida", peso);
            adicionarMarcaNarrativa("contatoComCorrupcao", peso);
            break;
        case "neutro":
            // neutro marca menos extremos, então sem contadores específicos por padrão
            break;
    }

    // consequências temáticas específicas
    switch (escolhaId) {
        case "altar_absorver":
        case "ruinas_absorver":
        case "sombra_fundir":
        case "pacto_total":
            adicionarMarcaNarrativa("contatoComCorrupcao", 2);
            break;

        case "altar_purificar":
        case "ruinas_libertar":
        case "sombra_integrar":
            adicionarMarcaNarrativa("misericordiaExercida", 1);
            break;

        case "rei_ambos":
        case "pacto_total":
        case "cap15_substituir_axiom":
            adicionarMarcaNarrativa("ambicaoAssumida", 2);
            break;
    }
}

// ============================================
// SEÇÃO 27: SUBSTITUIÇÃO SEGURA DA FUNÇÃO ANTIGA
// ============================================

if (typeof aplicarConsequenciaNarrativa === "function") {
    var _aplicarConsequenciaNarrativaOriginal = aplicarConsequenciaNarrativa;

    aplicarConsequenciaNarrativa = function(escolhaId, tipoRota, peso) {
        _aplicarConsequenciaNarrativaOriginal(escolhaId, tipoRota, peso);
        aplicarConsequenciaNarrativaAvancada(escolhaId, tipoRota, peso);
    };
} else {
    function aplicarConsequenciaNarrativa(escolhaId, tipoRota, peso) {
        aplicarConsequenciaNarrativaAvancada(escolhaId, tipoRota, peso);
    }
}

// ============================================
// SEÇÃO 28: APOIO FINAL E LEITURA DOS ALIADOS
// ============================================

function getAliadosFinaisDisponiveis() {
    var lista = [];

    Object.keys(npcsNarrativosCampanha).forEach(function(npcId) {
        if (npcPodeAjudarNoFinal(npcId)) {
            lista.push(npcId);
        }
    });

    return lista;
}

function getQuantidadeAliadosFinais() {
    return getAliadosFinaisDisponiveis().length;
}

// ============================================
// SEÇÃO 29: FINAIS EXPANDIDOS
// ============================================

var finaisNarrativosExpandidos = {
    heroi: {
        id: "final_heroi_expandido",
        titulo: "O Mundo Respira",
        tom: "vitória luminosa e melancólica",
        condicao: "rota heroica dominante",
        resumoExpandido: "Você derrota Axiom e impede seu retorno, mas paga um preço real por isso. O mundo respira, embora você já não possa voltar a ser quem era no início da jornada.",
        estadoProtagonista: [
            "carrega marcas irreversíveis da guerra contra a rede",
            "pode desaparecer, se sacrificar ou permanecer transformado",
            "torna-se símbolo de resistência mais do que herói convencional"
        ],
        estadoDoMundo: [
            "os portais são interrompidos",
            "o mundo sobrevive",
            "a esperança retorna, mas não sem luto"
        ]
    },

    neutro: {
        id: "final_neutro_expandido",
        titulo: "A Cicatriz Permanece",
        tom: "vitória pragmática, imperfeita e madura",
        condicao: "rota neutra dominante",
        resumoExpandido: "Axiom cai, mas a rede deixa sequelas. O mundo sobrevive, mas não ileso. Você vive, porém marcado por tudo o que foi necessário para vencer.",
        estadoProtagonista: [
            "sobrevive, mas distante do que já foi",
            "carrega lucidez dura e cicatrizes permanentes",
            "sabe que venceu sem pureza e sem rendição total"
        ],
        estadoDoMundo: [
            "os elos principais foram quebrados",
            "restos da rede podem permanecer como cicatriz histórica",
            "a sobrevivência venceu, mas sem limpeza absoluta"
        ]
    },

    sombrio: {
        id: "final_sombrio_expandido",
        titulo: "O Novo Trono",
        tom: "triunfo poderoso e perturbador",
        condicao: "rota sombria dominante",
        resumoExpandido: "Você derrota Axiom, mas assume parte de seu poder, de seu lugar ou de seu legado. O mundo é salvo da ruína imediata — e entregue a uma nova possibilidade de temor.",
        estadoProtagonista: [
            "torna-se guardião, usurpador, sucessor ou entidade limiar",
            "vence, mas à custa de parte da própria humanidade",
            "já não pode ser lido apenas como herói"
        ],
        estadoDoMundo: [
            "a ameaça de Axiom atual é interrompida",
            "surge uma nova incerteza sobre o futuro",
            "o mundo sobrevive sob sombra de um novo poder"
        ]
    }
};

// ============================================
// SEÇÃO 30: OBTENÇÃO DO FINAL EXPANDIDO
// ============================================

function getFinalNarrativoExpandido() {
    if (typeof getRotaDominante !== "function") return finaisNarrativosExpandidos.neutro;

    var rota = getRotaDominante();
    return finaisNarrativosExpandidos[rota] || finaisNarrativosExpandidos.neutro;
}

// ============================================
// SEÇÃO 31: LEITURA DO ESTADO FINAL DO PROTAGONISTA
// ============================================

function getEstadoNarrativoFinalDoProtagonista() {
    var finalData = getFinalNarrativoExpandido();
    if (!finalData) return [];

    var extras = [];

    if (jogadorFezEscolhaGrande("pacto_total")) {
        extras.push("carrega um pacto infernal que nenhuma vitória apaga por completo");
    }

    if (jogadorFezEscolhaGrande("sombra_fundir")) {
        extras.push("abraçou partes sombrias de si que agora fazem parte definitiva de sua identidade");
    }

    if (jogadorFezEscolhaGrande("rei_ambos")) {
        extras.push("tomou para si um legado que não lhe foi dado livremente");
    }

    return finalData.estadoProtagonista.concat(extras);
}

// ============================================
// SEÇÃO 32: EPÍLOGO GLOBAL DO MUNDO
// ============================================

function getEpilogoGlobalDoMundo() {
    var rota = (typeof getRotaDominante === "function") ? getRotaDominante() : "neutro";
    var aliados = getQuantidadeAliadosFinais();

    if (rota === "heroi") {
        if (aliados >= 5) {
            return "O mundo não apenas sobrevive: ele começa, lentamente, a se reconstruir com memória, luto e coragem compartilhada.";
        }
        if (aliados >= 3) {
            return "O mundo respira novamente, embora ainda carregue ruínas demais para chamar isso de paz completa.";
        }
        return "O mundo foi salvo, mas o silêncio após a vitória pesa tanto quanto a esperança que retorna.";
    }

    if (rota === "sombrio") {
        if (aliados >= 3) {
            return "O mundo sobrevive, mas agora observa o horizonte com gratidão cautelosa e medo difícil de nomear.";
        }
        return "O mundo foi arrancado da ruína imediata, apenas para aprender que nem toda salvação se parece com luz.";
    }

    if (aliados >= 5) {
        return "O mundo sobrevive cicatrizado, sustentado por quem restou e por quem decidiu seguir em frente mesmo sem respostas perfeitas.";
    }
    if (aliados >= 3) {
        return "A guerra acabou, mas deixou marcas profundas demais para serem esquecidas em uma geração.";
    }
    return "A vitória foi suficiente para impedir o pior, mas não para devolver ao mundo a inocência perdida.";
}

// ============================================
// SEÇÃO 33: DESFECHOS INDIVIDUAIS DE NPCs
// ============================================

function getDesfechoNpcPorEstado(npcId) {
    var estado = getEstadoRelacaoNpc(npcId);
    var npc = npcsNarrativosCampanha[npcId];
    if (!npc) return "";

    switch (npcId) {
        case "elian":
            if (estado === "ruptura") return "📚 Elian desaparece com parte da verdade, convencido de que certos conhecimentos não deviam mais circular entre os vivos.";
            if (estado === "aliado" || estado === "favoravel") return "📚 Elian sobrevive para registrar a verdadeira história da queda dos Eternos e do herói que os enfrentou.";
            return "📚 Elian continua reunindo fragmentos da memória do mundo, sem saber ao certo se a história voltará a ser ouvida.";

        case "soraya":
            if (estado === "ruptura") return "🕯️ Soraya se afasta, levando consigo o julgamento silencioso dos mortos que se recusaram a perdoar certos caminhos.";
            if (estado === "aliado" || estado === "favoravel") return "🕯️ Soraya ajuda espíritos perdidos a encontrarem descanso, e o lamento do mundo se torna um pouco menos agudo.";
            return "🕯️ Soraya permanece entre mundos, ouvindo ecos que poucos têm coragem de escutar.";

        case "draeven":
            if (estado === "ruptura") return "🪓 Draeven segue sozinho, convencido de que alguns monstros usam rosto de salvador.";
            if (estado === "aliado" || estado === "favoravel") return "🪓 Draeven ajuda a reconstruir a dignidade dos seus, provando que um povo ferido ainda pode escolher outro destino.";
            return "🪓 Draeven continua reunindo sobreviventes, entre cinzas, cautela e memória.";
        
        case "iris":
            if (estado === "ruptura") return "🔷 Iris oculta seus estudos mais perigosos do mundo, preferindo o exílio ao risco de vê-los nas mãos erradas outra vez.";
            if (estado === "aliado" || estado === "favoravel") return "🔷 Iris preserva o conhecimento necessário para que os selos jamais sejam esquecidos de novo.";
            return "🔷 Iris continua entre fórmulas e fendas, tentando entender o que ainda pode ser salvo da lógica da ruína.";

        case "tallen":
            if (estado === "ruptura") return "🛡️ Tallen carrega o velho legado como peso morto, incapaz de decidir se fracassou ou apenas sobreviveu demais.";
            if (estado === "aliado" || estado === "favoravel") return "🛡️ Tallen transforma o fracasso da antiga guarda em semente de uma nova ordem protetora.";
            return "🛡️ Tallen permanece entre ruínas e juramentos, ainda tentando descobrir o que significa honrar um passado quebrado.";

        case "maela":
            if (estado === "ruptura") return "🩸 Maela vive como cicatriz aberta do mundo, lembrando a todos que nem toda vitória foi gentil com quem já havia sofrido demais.";
            if (estado === "aliado" || estado === "favoravel") return "🩸 Maela aprende a viver sem ser apenas ferida, tornando-se símbolo de sobrevivência contra a corrupção dos portais.";
            return "🩸 Maela segue carregando sua marca, não como cura, mas como prova viva de que a ruína tocou carne humana de perto demais.";
    }

    return "";
}

function getTodosDesfechosNpc() {
    return Object.keys(npcsNarrativosCampanha)
        .map(function(npcId) {
            return getDesfechoNpcPorEstado(npcId);
        })
        .filter(function(txt) {
            return !!txt;
        });
}

// ============================================
// SEÇÃO 34: RESUMO NARRATIVO FINAL COMPLETO
// ============================================

function getResumoNarrativoFinalCompleto() {
    return {
        finalExpandido: getFinalNarrativoExpandido(),
        estadoProtagonista: getEstadoNarrativoFinalDoProtagonista(),
        epilogoMundo: getEpilogoGlobalDoMundo(),
        desfechosNpc: getTodosDesfechosNpc(),
        aliadosFinais: getAliadosFinaisDisponiveis()
    };
}

// ============================================
// SEÇÃO 35: PATCH DE COMPATIBILIDADE PARA CAMPOS NARRATIVOS
// ============================================

function normalizarCamposNarrativosSeNecessario() {
    if (!player || !player.narrativa) return;

    if (!player.narrativa.capitulosVistos && player.narrativa.capitulosNarrativosVistos) {
        player.narrativa.capitulosVistos = player.narrativa.capitulosNarrativosVistos;
    }

    if (!player.narrativa.cenasVistas && player.narrativa.cenasNarrativasVistas) {
        player.narrativa.cenasVistas = player.narrativa.cenasNarrativasVistas;
    }

    if (!player.narrativa.capitulosVistos) player.narrativa.capitulosVistos = [];
    if (!player.narrativa.cenasVistas) player.narrativa.cenasVistas = [];
    if (!player.narrativa.eventosNarrativosConcluidos) player.narrativa.eventosNarrativosConcluidos = [];
}

normalizarCamposNarrativosSeNecessario();

// ============================================
// SEÇÃO 36: FUNÇÕES PÚBLICAS DE APOIO À INTEGRAÇÃO
// ============================================

function getResumoNarrativoAtual() {
    var protagonista = getProtagonistaNarrativoAtual();
    var ato = getAtoNarrativoAtual();
    var finalPrevisto = getFinalNarrativoExpandido();

    return {
        protagonista: protagonista ? protagonista.nome : null,
        rota: (typeof getRotaDominante === "function") ? getRotaDominante() : "neutro",
        atoAtual: ato ? ato.nome : null,
        finalProvavel: finalPrevisto ? finalPrevisto.titulo : null,
        aliadosDisponiveis: getAliadosFinaisDisponiveis()
    };
}

function getCapituloNarrativoAtualPorArea() {
    if (!gameState || !gameState.areaAtual) return null;
    return getResumoCapituloPorArea(gameState.areaAtual);
}

// ============================================
// SEÇÃO 37: PATCH OFICIAL PARA verificarCapituloDisponivel
// Se quiser, isso substitui as versões quebradas espalhadas
// ============================================

if (typeof verificarCapituloDisponivel === "function") {
    verificarCapituloDisponivel = function() {
        return verificarCapituloNarrativoDisponivelOficial();
    };
} else {
    function verificarCapituloDisponivel() {
        return verificarCapituloNarrativoDisponivelOficial();
    }
}

// ============================================
// SEÇÃO 38: PATCH OFICIAL PARA abrirHistoria
// mantém compatibilidade com world.js sem duplicar mapa
// ============================================

if (typeof abrirHistoria === "function") {
    abrirHistoria = function() {
        if (!gameState || !gameState.areaAtual) {
            if (typeof mostrarNotificacao === "function") {
                mostrarNotificacao("📖 Nenhuma área selecionada.");
            }
            return;
        }

        var capituloId = getCapituloNarrativoIdPorArea(gameState.areaAtual);
        if (!capituloId) {
            if (typeof mostrarNotificacao === "function") {
                mostrarNotificacao("📖 Nenhum capítulo narrativo disponível nesta área.");
            }
            return;
        }

        if (typeof abrirCapituloNarrativoPorId === "function") {
            abrirCapituloNarrativoPorId(capituloId);
        } else if (typeof mostrarNotificacao === "function") {
            mostrarNotificacao("⚠️ Sistema de narração não carregado.");
        }
    };
}

// ============================================
// SEÇÃO 39: INICIALIZAÇÃO FINAL DE SEGURANÇA
// ============================================

expandirEstadoNarrativoHistoria();
normalizarCamposNarrativosSeNecessario();