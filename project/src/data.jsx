// Shared data + helpers

const SKILLS = [
  { name: 'Análise de Dados',          source: 'COMUNICAÇÃO',          note: 'Dois anos de fundamentos em Ciência de Dados.',          tier: 'applied' },
  { name: 'Python / NumPy',            source: 'EMAp',          note: 'Uso recorrente em estudos, EDA e automações.',           tier: 'applied' },
  { name: 'Estatística Aplicada',      source: 'EMAp',          note: 'Distribuições, inferência e testes de hipótese.',        tier: 'applied' },
  { name: 'Storytelling com Dados',    source: 'COMUNICAÇÃO',           note: 'Traduzir números em narrativa com intenção editorial.', tier: 'core' },
  { name: 'Estratégia de Comunicação', source: 'COMUNICAÇÃO',           note: 'Em construção no curso de Comunicação Digital.',         tier: 'learning' },
  { name: 'IA Generativa & Prompting', source: 'Projetos',      note: 'Pipelines, agentes e desenho de prompts em uso diário.', tier: 'core' },
  { name: 'DSPy / LLM Pipelines',      source: 'Projetos',      note: 'Estudo ativo, aplicado em projeto independente.',        tier: 'learning' },
  { name: 'Análise Exploratória (EDA)', source: 'COMUNICAÇÃO',   note: 'Cruzando dados quantitativos com leitura cultural.',     tier: 'core' },
];

// Vocabulário honesto de profundidade — sem percentual fabricado.
// 'core'     → em prática contínua hoje
// 'applied'  → já apliquei em contexto real
// 'learning' → em estudo / aprofundamento
const TIERS = {
  core:     { label: 'Em prática',  ord: 1, accent: true  },
  applied:  { label: 'Aplicado',    ord: 2, accent: false },
  learning: { label: 'Em estudo',   ord: 3, accent: false },
};

const TAGS = ['EDA','DSPy','Docling','Pydantic','Claude API','Engenharia de IA','Langchain','Agno','Storytelling','Estratégia Digital','Análise Comunicacional'];

const PROJECTS = [
  {
    id: 1,
    num: '01',
    category: 'Comunicação Estratégica',
    date: '2025',
    title: 'Narrativas de Dados para Marcas Emergentes',
    challenge: 'Traduzir relatórios densos de inteligência de mercado em narrativas visuais acessíveis para times de marketing.',
    tools: ['Python','Pandas','Figma','Claude API'],
    solution: 'Pipeline em DSPy que ingere PDFs setoriais via Docling, sumariza pontos-chave e gera storyboards editoriais. Camada de revisão humana garante tom de voz consistente com a marca.',
    deliverables: ['Decks editoriais (12)', 'Dashboard interativo', 'Guia de estilo de dados'],
    discipline: 'Comunicação Digital / FGV',
    role: 'Pesquisa, modelagem do pipeline, direção editorial.',
    impact: 'Redução de 60% no tempo de produção de relatórios; adoção em 3 squads internos.',
  },
  {
    id: 2,
    num: '02',
    category: 'IA & Produto',
    date: '2025',
    title: 'Sistema de Identidade Visual Assistido por IA',
    challenge: 'Acelerar a fase de exploração visual sem perder identidade autoral em estúdios pequenos.',
    tools: ['Claude API','Pydantic','DSPy','SVG'],
    solution: 'Agente de prompts estruturados que produz variações tipográficas, paletas e moodboards a partir de um briefing tagueado. Saídas validadas com Pydantic para integração em ferramentas downstream.',
    deliverables: ['Agente conversacional','Biblioteca de prompts curados','Estudo de caso (PDF)'],
    discipline: 'Projeto independente',
    role: 'Arquitetura do sistema, prompt engineering, design das saídas.',
    impact: 'Briefings de 4h reduzidos a 25min de iteração inicial; mantém 100% de assinatura humana na peça final.',
  },
  {
    id: 3,
    num: '03',
    category: 'Análise Comunicacional',
    date: '2024',
    title: 'EDA de Discurso em Mídias Sociais',
    challenge: 'Entender como narrativas políticas se ramificam entre plataformas e quais marcadores linguísticos antecipam viralização.',
    tools: ['Python','NumPy','spaCy','Matplotlib'],
    solution: 'Análise exploratória sobre corpus de 1.2M posts, com clustering temático e séries temporais de sentimento. Resultados embalados em ensaio visual com cortes editoriais.',
    deliverables: ['Notebook reproduzível','Ensaio visual (web)','Apresentação em sala'],
    discipline: 'EMAp · Ciência de Dados',
    role: 'Coleta, EDA, redação do ensaio.',
    impact: 'Trabalho citado por colegas como referência metodológica; base para artigo em preparação.',
  },
];

const NAV = [
  { href: '#capa', label: 'Início' },
  { href: '#competencias', label: 'Competências' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#certificados', label: 'Certificados' },
  { href: '#contato', label: 'Contato' },
];

const EMAIL = 'gustavo.oliveira@exemplo.com';
const LINKEDIN = 'https://linkedin.com/in/gustavo-de-oliveira';

Object.assign(window, { SKILLS, TIERS, TAGS, PROJECTS, NAV, EMAIL, LINKEDIN });
