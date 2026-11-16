import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Sparkles, 
  Search, 
  Trash2, 
  Plus, 
  Minus, 
  CheckCircle2, 
  RotateCcw, 
  Heart, 
  ArrowRight,
  Menu,
  X,
  Award
} from 'lucide-react';

// ============================================================================
// CATÁLOGO DE PRODUTOS E QUESTÕES DO QUIZ (ARRAYS E OBJETOS JAVASCRIPT)
// ============================================================================
const PRODUTOS = [
  {
    id: 1,
    nome: "Vestido Midi Terracota Linho",
    categoria: "Vestidos",
    estilo: "Clássico",
    preco: 289.90,
    imagem: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
    descricao: "Corte fluido em linho misto com botões frontais e caimento leve."
  },
  {
    id: 2,
    nome: "Blazer Alfaiataria Rosé",
    categoria: "Alfaiataria",
    estilo: "Clássico",
    preco: 349.90,
    imagem: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80",
    descricao: "Estrutura impecável com ombreiras sutis e forro acetinado."
  },
  {
    id: 3,
    nome: "Conjunto Tricô Minimal Creme",
    categoria: "Conjuntos",
    estilo: "Casual Chic",
    preco: 259.90,
    imagem: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
    descricao: "Blusa cropped e saia midi em tricô modal macio de alta elasticidade."
  },
  {
    id: 4,
    nome: "Calça Pantalona Cintura Alta",
    categoria: "Alfaiataria",
    estilo: "Moderno",
    preco: 229.90,
    imagem: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600&q=80",
    descricao: "Modelagem ampla que alonga a silhueta com pregas frontais."
  },
  {
    id: 5,
    nome: "Vestido Fluido Floral Vintage",
    categoria: "Vestidos",
    estilo: "Romântico",
    preco: 269.90,
    imagem: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80",
    descricao: "Mangas bufantes delicadas e estampa exclusiva em tons terrosos."
  },
  {
    id: 6,
    nome: "Blusa Seda Assimétrica",
    categoria: "Blusas",
    estilo: "Moderno",
    preco: 189.90,
    imagem: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=600&q=80",
    descricao: "Toque acetinado com recorte contemporâneo de um ombro só."
  }
];

const PERGUNTAS_QUIZ = [
  {
    id: 1,
    pergunta: "Qual peça não pode faltar no seu guarda-roupa para um evento importante?",
    opcoes: [
      { texto: "Um blazer bem cortado ou vestido midi estruturado", estilo: "Clássico", pontos: 3 },
      { texto: "Uma peça fluida com detalhes delicados e cintura marcada", estilo: "Romântico", pontos: 3 },
      { texto: "Um conjunto confortável, mas com acabamento sofisticado", estilo: "Casual Chic", pontos: 3 },
      { texto: "Uma modelagem assimétrica ou pantalona de impacto", estilo: "Moderno", pontos: 3 }
    ]
  },
  {
    id: 2,
    pergunta: "Qual paleta de cores mais atrai o seu olhar na vitrine?",
    opcoes: [
      { texto: "Tons neutros, bege, off-white e terrosos", estilo: "Clássico", pontos: 2 },
      { texto: "Rosé suave, lavanda e estampas florais discretas", estilo: "Romântico", pontos: 2 },
      { texto: "Creme, caramelo e tons naturais aconchegantes", estilo: "Casual Chic", pontos: 2 },
      { texto: "Contrastes marcantes, terracota intenso e preto", estilo: "Moderno", pontos: 2 }
    ]
  },
  {
    id: 3,
    pergunta: "Como você define a sua rotina ideal de estilo no dia a dia?",
    opcoes: [
      { texto: "Prática e elegante, pronta para qualquer reunião", estilo: "Clássico", pontos: 3 },
      { texto: "Leve, feminina e cheia de movimento", estilo: "Romântico", pontos: 3 },
      { texto: "Descomplicada, priorizando conforto sem perder o charme", estilo: "Casual Chic", pontos: 3 },
      { texto: "Autêntica, sempre testando tendências e novas proporções", estilo: "Moderno", pontos: 3 }
    ]
  },
  {
    id: 4,
    pergunta: "Qual acessório finaliza perfeitamente a sua produção?",
    opcoes: [
      { texto: "Brincos minimalistas dourados e bolsa estruturada", estilo: "Clássico", pontos: 2 },
      { texto: "Colares delicados em camadas e lenço de seda", estilo: "Romântico", pontos: 2 },
      { texto: "Óculos de sol tartaruga e rasteira de couro", estilo: "Casual Chic", pontos: 2 },
      { texto: "Argolas geométricas e salto bloco arquitetônico", estilo: "Moderno", pontos: 2 }
    ]
  }
];

// ============================================================================
// COMPONENTE 1: BARRA DE NAVEGAÇÃO RESPONSIVA (Navbar)
// ============================================================================
function Navbar({ abaAtiva, setAbaAtiva, totalItensCarrinho, estiloSalvo }) {
  const [menuMobileAberto, setMenuMobileAberto] = useState(false);

  const navegarPara = (aba) => {
    setAbaAtiva(aba);
    setMenuMobileAberto(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FDFBF9]/95 backdrop-blur-md border-b border-[#E8DCD5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        <button 
          onClick={() => navegarPara('loja')}
          className="flex items-center gap-2 text-left group"
        >
          <div className="w-10 h-10 rounded-full bg-[#B85D43] text-white flex items-center justify-center font-serif text-xl font-bold shadow-sm group-hover:bg-[#9E4B33] transition-colors">
            A
          </div>
          <div>
            <span className="font-serif text-2xl tracking-tight text-[#2C2421] font-semibold block leading-none">
              Aura Boutique
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#8C6D62]">
              Moda Feminina
            </span>
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => navegarPara('loja')}
            className={`text-sm font-medium transition-colors pb-1 ${
              abaAtiva === 'loja' 
                ? 'text-[#B85D43] border-b-2 border-[#B85D43]' 
                : 'text-[#5C4D47] hover:text-[#2C2421]'
            }`}
          >
            Coleção & Catálogo
          </button>
          
          <button
            onClick={() => navegarPara('quiz')}
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors pb-1 ${
              abaAtiva === 'quiz' 
                ? 'text-[#B85D43] border-b-2 border-[#B85D43]' 
                : 'text-[#5C4D47] hover:text-[#2C2421]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#B85D43]" />
            Quiz de Estilo
            {estiloSalvo && (
              <span className="ml-1 text-[10px] bg-[#F3E5DF] text-[#B85D43] px-2 py-0.5 rounded-full font-semibold">
                {estiloSalvo}
              </span>
            )}
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navegarPara('carrinho')}
            aria-label="Abrir Sacola de Compras"
            className="relative flex items-center gap-2 bg-[#2C2421] hover:bg-[#423632] text-[#FDFBF9] px-4 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Sacola</span>
            {totalItensCarrinho > 0 && (
              <span className="bg-[#B85D43] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItensCarrinho}
              </span>
            )}
          </button>

          <button
            onClick={() => setMenuMobileAberto(!menuMobileAberto)}
            className="md:hidden p-2 text-[#2C2421] hover:bg-[#F3E5DF] rounded-lg"
            aria-label="Menu"
          >
            {menuMobileAberto ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {menuMobileAberto && (
        <div className="md:hidden bg-[#FDFBF9] border-b border-[#E8DCD5] px-4 py-4 space-y-3">
          <button
            onClick={() => navegarPara('loja')}
            className={`block w-full text-left px-4 py-2.5 rounded-xl font-medium ${
              abaAtiva === 'loja' ? 'bg-[#F3E5DF] text-[#B85D43]' : 'text-[#2C2421]'
            }`}
          >
            Coleção & Catálogo
          </button>
          <button
            onClick={() => navegarPara('quiz')}
            className={`flex items-center justify-between w-full text-left px-4 py-2.5 rounded-xl font-medium ${
              abaAtiva === 'quiz' ? 'bg-[#F3E5DF] text-[#B85D43]' : 'text-[#2C2421]'
            }`}
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#B85D43]" />
              Quiz de Estilo Pessoal
            </span>
            {estiloSalvo && (
              <span className="text-xs bg-[#B85D43] text-white px-2.5 py-0.5 rounded-full">
                {estiloSalvo}
              </span>
            )}
          </button>
        </div>
      )}
    </header>
  );
}

// ============================================================================
// COMPONENTE 2: CATÁLOGO DA LOJA COM FILTROS E BUSCA (CatalogoLoja)
// ============================================================================
function CatalogoLoja({ adicionarAoCarrinho, estiloRecomendado, irParaQuiz }) {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todas');
  const [termoBusca, setTermoBusca] = useState('');
  const [apenasMeuEstilo, setApenasMeuEstilo] = useState(false);

  const categorias = ['Todas', 'Vestidos', 'Alfaiataria', 'Conjuntos', 'Blusas'];

  // Laço de repetição e condicionais para filtrar produtos
  const produtosFiltrados = [];
  for (let i = 0; i < PRODUTOS.length; i++) {
    const item = PRODUTOS[i];
    const bateCategoria = categoriaSelecionada === 'Todas' || item.categoria === categoriaSelecionada;
    const bateBusca = item.nome.toLowerCase().includes(termoBusca.toLowerCase()) || 
                      item.descricao.toLowerCase().includes(termoBusca.toLowerCase());
    const bateEstilo = !apenasMeuEstilo || !estiloRecomendado || item.estilo === estiloRecomendado;

    if (bateCategoria && bateBusca && bateEstilo) {
      produtosFiltrados.push(item);
    }
  }

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="bg-gradient-to-r from-[#F3E5DF] via-[#F8EFEA] to-[#EFE0D8] rounded-3xl p-6 sm:p-10 mb-10 border border-[#E6D4CB] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="max-w-xl space-y-4 text-center md:text-left">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#B85D43] bg-white/80 px-3 py-1 rounded-full">
            Nova Coleção Primavera / Verão
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#2C2421] font-semibold leading-tight">
            Elegância natural em cada detalhe.
          </h1>
          <p className="text-[#5C4D47] text-sm sm:text-base leading-relaxed">
            Peças atemporais desenvolvidas com tecidos nobres e paleta inspirada em tons terrosos. Descubra sua identidade visual com nosso quiz interativo.
          </p>
          <div className="pt-2 flex flex-wrap justify-center md:justify-start gap-3">
            <button
              onClick={irParaQuiz}
              className="inline-flex items-center gap-2 bg-[#B85D43] hover:bg-[#9E4B33] text-white px-6 py-3 rounded-full text-sm font-medium transition-all shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              {estiloRecomendado ? `Meu Estilo: ${estiloRecomendado}` : 'Descobrir Meu Estilo'}
            </button>
          </div>
        </div>

        {estiloRecomendado && (
          <div className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl border border-[#E6D4CB] max-w-xs w-full shadow-sm">
            <div className="flex items-center gap-2 text-[#B85D43] font-semibold text-sm mb-2">
              <Award className="w-5 h-5" />
              Curadoria Personalizada
            </div>
            <p className="text-xs text-[#5C4D47] mb-3">
              Seu perfil identificado no quiz é <strong>{estiloRecomendado}</strong>. Deseja filtrar apenas peças recomendadas para você?
            </p>
            <button
              onClick={() => setApenasMeuEstilo(!apenasMeuEstilo)}
              className={`w-full py-2 px-4 rounded-xl text-xs font-semibold transition-colors ${
                apenasMeuEstilo 
                  ? 'bg-[#2C2421] text-white' 
                  : 'bg-[#F3E5DF] text-[#B85D43] hover:bg-[#E8D3C9]'
              }`}
            >
              {apenasMeuEstilo ? 'Mostrando Meu Estilo (Limpar)' : `Filtrar Estilo ${estiloRecomendado}`}
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaSelecionada(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                categoriaSelecionada === cat
                  ? 'bg-[#2C2421] text-white shadow-sm'
                  : 'bg-white text-[#5C4D47] border border-[#E8DCD5] hover:border-[#B85D43]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#8C6D62] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar peça ou tecido..."
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E8DCD5] rounded-full text-sm text-[#2C2421] placeholder-[#9E877E] focus:outline-none focus:border-[#B85D43]"
          />
        </div>
      </div>

      {produtosFiltrados.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#E8DCD5]">
          <p className="text-[#5C4D47] font-medium mb-2">Nenhuma peça encontrada com esses filtros.</p>
          <button
            onClick={() => {
              setCategoriaSelecionada('Todas');
              setTermoBusca('');
              setApenasMeuEstilo(false);
            }}
            className="text-sm text-[#B85D43] font-semibold underline"
          >
            Limpar todos os filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {produtosFiltrados.map((produto) => (
            <article 
              key={produto.id} 
              className="bg-white rounded-2xl overflow-hidden border border-[#E8DCD5] hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-72 overflow-hidden bg-[#F5EFEA]">
                  <img
                    src={produto.imagem}
                    alt={produto.nome}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#2C2421] text-xs font-medium px-3 py-1 rounded-full">
                    {produto.estilo}
                  </span>
                </div>
                <div className="p-5">
                  <span className="text-xs text-[#8C6D62] uppercase tracking-wider font-medium">
                    {produto.categoria}
                  </span>
                  <h2 className="font-serif text-xl text-[#2C2421] font-semibold mt-1">
                    {produto.nome}
                  </h2>
                  <p className="text-xs text-[#6E5D56] mt-2 leading-relaxed">
                    {produto.descricao}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-[#F5EFEA]">
                <div>
                  <span className="text-xs text-[#8C6D62] block">Valor</span>
                  <span className="text-lg font-bold text-[#2C2421]">
                    R$ {produto.preco.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <button
                  onClick={() => adicionarAoCarrinho(produto)}
                  className="bg-[#B85D43] hover:bg-[#9E4B33] text-white px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Adicionar
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

// ============================================================================
// COMPONENTE 3: QUIZ INTERATIVO DE ESTILO PESSOAL (QuizEstilo)
// ============================================================================
function QuizEstilo({ progressoQuiz, setProgressoQuiz, irParaCatalogo }) {
  const { indiceAtual, respostas, pontuacaoTotal, concluido, estiloFinal } = progressoQuiz;

  const responderPergunta = (opcaoEscolhida) => {
    const novasRespostas = [...respostas, opcaoEscolhida];
    const novaPontuacao = pontuacaoTotal + opcaoEscolhida.pontos;

    if (indiceAtual + 1 < PERGUNTAS_QUIZ.length) {
      setProgressoQuiz({
        ...progressoQuiz,
        indiceAtual: indiceAtual + 1,
        respostas: novasRespostas,
        pontuacaoTotal: novaPontuacao
      });
    } else {
      const contagemEstilos = {};
      for (let i = 0; i < novasRespostas.length; i++) {
        const estilo = novasRespostas[i].estilo;
        contagemEstilos[estilo] = (contagemEstilos[estilo] || 0) + 1;
      }

      let estiloVencedor = "Clássico";
      let maiorFrequencia = 0;

      for (const estilo in contagemEstilos) {
        if (contagemEstilos[estilo] > maiorFrequencia) {
          maiorFrequencia = contagemEstilos[estilo];
          estiloVencedor = estilo;
        }
      }

      setProgressoQuiz({
        indiceAtual: indiceAtual,
        respostas: novasRespostas,
        pontuacaoTotal: novaPontuacao,
        concluido: true,
        estiloFinal: estiloVencedor
      });
    }
  };

  const reiniciarQuiz = () => {
    setProgressoQuiz({
      indiceAtual: 0,
      respostas: [],
      pontuacaoTotal: 0,
      concluido: false,
      estiloFinal: null
    });
  };

  const perguntaAtual = PERGUNTAS_QUIZ[indiceAtual];
  const progressoPercentual = concluido 
    ? 100 
    : Math.round((indiceAtual / PERGUNTAS_QUIZ.length) * 100);

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DCD5] shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#F3E5DF]">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#B85D43]">
              Consultoria Digital
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl text-[#2C2421] font-semibold mt-1">
              Descubra Seu Estilo Aura
            </h1>
          </div>
          <div className="text-right">
            <span className="text-xs text-[#8C6D62] block">Pontuação Acumulada</span>
            <span className="text-xl font-bold text-[#B85D43]">{pontuacaoTotal} pts</span>
          </div>
        </div>

        <div className="my-6">
          <div className="flex justify-between text-xs font-medium text-[#5C4D47] mb-2">
            <span>{concluido ? 'Quiz Concluído!' : `Questão ${indiceAtual + 1} de ${PERGUNTAS_QUIZ.length}`}</span>
            <span>{progressoPercentual}%</span>
          </div>
          <div className="w-full h-2.5 bg-[#F3E5DF] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#B85D43] transition-all duration-300 rounded-full"
              style={{ width: `${progressoPercentual}%` }}
            />
          </div>
        </div>

        {concluido ? (
          <div className="py-6 text-center space-y-6">
            <div className="w-16 h-16 bg-[#F3E5DF] text-[#B85D43] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-[#8C6D62] uppercase tracking-wider font-semibold">
                Seu Estilo Predominante é
              </p>
              <h2 className="font-serif text-4xl text-[#2C2421] font-bold">
                {estiloFinal}
              </h2>
              <p className="text-sm text-[#5C4D47] max-w-md mx-auto pt-2 leading-relaxed">
                Seu resultado e sua pontuação ({pontuacaoTotal} pontos) foram salvos automaticamente no seu navegador. Você pode fechar a página e voltar quando quiser!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                onClick={irParaCatalogo}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#B85D43] hover:bg-[#9E4B33] text-white px-6 py-3 rounded-full text-sm font-medium transition-colors"
              >
                Ver Peças Recomendadas
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={reiniciarQuiz}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#F3E5DF] hover:bg-[#E8D3C9] text-[#2C2421] px-6 py-3 rounded-full text-sm font-medium transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Refazer Quiz
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 py-2">
            <h2 className="text-lg sm:text-xl font-medium text-[#2C2421] leading-snug">
              {perguntaAtual.pergunta}
            </h2>

            <div className="space-y-3">
              {perguntaAtual.opcoes.map((opcao, idx) => (
                <button
                  key={idx}
                  onClick={() => responderPergunta(opcao)}
                  className="w-full text-left p-4 rounded-2xl border border-[#E8DCD5] hover:border-[#B85D43] hover:bg-[#FDF8F6] transition-all flex items-center justify-between group"
                >
                  <span className="text-sm sm:text-base text-[#2C2421] font-medium group-hover:text-[#B85D43]">
                    {opcao.texto}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#C4B0A8] group-hover:text-[#B85D43] shrink-0 ml-3" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ============================================================================
// COMPONENTE 4: SACOLA DE COMPRAS (CarrinhoCompras)
// ============================================================================
function CarrinhoCompras({ carrinho, alterarQuantidade, removerItem, limparCarrinho, voltarParaLoja }) {
  const [pedidoFinalizado, setPedidoFinalizado] = useState(false);

  let subtotal = 0;
  for (let i = 0; i < carrinho.length; i++) {
    subtotal += carrinho[i].preco * carrinho[i].quantidade;
  }

  const finalizarCompra = () => {
    setPedidoFinalizado(true);
    limparCarrinho();
  };

  if (pedidoFinalizado) {
    return (
      <section className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8DCD5] space-y-5">
          <div className="w-16 h-16 bg-[#E6F4EA] text-[#1E7E34] rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h2 className="font-serif text-3xl text-[#2C2421] font-semibold">
            Pedido Confirmado!
          </h2>
          <p className="text-sm text-[#5C4D47] max-w-md mx-auto">
            Obrigada por escolher a Aura Boutique. Seus itens foram reservados com sucesso.
          </p>
          <button
            onClick={() => {
              setPedidoFinalizado(false);
              voltarParaLoja();
            }}
            className="bg-[#2C2421] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#423632] transition-colors"
          >
            Continuar Explorando a Coleção
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl sm:text-3xl text-[#2C2421] font-semibold">
          Sua Sacola de Compras
        </h1>
        {carrinho.length > 0 && (
          <button
            onClick={limparCarrinho}
            className="text-xs text-[#B85D43] hover:underline font-medium"
          >
            Esvaziar Sacola
          </button>
        )}
      </div>

      {carrinho.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#E8DCD5] space-y-4">
          <ShoppingBag className="w-12 h-12 text-[#C4B0A8] mx-auto" />
          <h2 className="font-serif text-xl text-[#2C2421] font-medium">
            Sua sacola está vazia
          </h2>
          <p className="text-sm text-[#6E5D56] max-w-sm mx-auto">
            Explore nossa coleção de roupas femininas e adicione suas peças favoritas aqui.
          </p>
          <button
            onClick={voltarParaLoja}
            className="bg-[#B85D43] hover:bg-[#9E4B33] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors"
          >
            Ir para o Catálogo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {carrinho.map((item) => (
              <div 
                key={item.id} 
                className="bg-white p-4 rounded-2xl border border-[#E8DCD5] flex items-center gap-4"
              >
                <img
                  src={item.imagem}
                  alt={item.nome}
                  className="w-20 h-24 object-cover rounded-xl bg-[#F5EFEA]"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] text-[#8C6D62] uppercase">{item.categoria}</span>
                  <h3 className="font-serif text-base sm:text-lg text-[#2C2421] font-semibold truncate">
                    {item.nome}
                  </h3>
                  <p className="text-sm font-bold text-[#B85D43] mt-1">
                    R$ {(item.preco * item.quantidade).toFixed(2).replace('.', ',')}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center border border-[#E8DCD5] rounded-lg">
                    <button
                      onClick={() => alterarQuantidade(item.id, -1)}
                      aria-label="Diminuir quantidade"
                      className="p-1.5 text-[#5C4D47] hover:text-[#2C2421]"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-2.5 text-xs font-semibold text-[#2C2421]">
                      {item.quantidade}
                    </span>
                    <button
                      onClick={() => alterarQuantidade(item.id, 1)}
                      aria-label="Aumentar quantidade"
                      className="p-1.5 text-[#5C4D47] hover:text-[#2C2421]"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => removerItem(item.id)}
                    aria-label="Remover item"
                    className="p-2 text-[#9E877E] hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E8DCD5] h-fit space-y-4">
            <h2 className="font-serif text-xl text-[#2C2421] font-semibold border-b border-[#F3E5DF] pb-3">
              Resumo do Pedido
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-[#5C4D47]">
                <span>Subtotal</span>
                <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between text-[#5C4D47]">
                <span>Frete</span>
                <span className="text-[#1E7E34] font-medium">Grátis</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#2C2421] pt-3 border-t border-[#F3E5DF]">
                <span>Total</span>
                <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>

            <button
              onClick={finalizarCompra}
              className="w-full bg-[#2C2421] hover:bg-[#423632] text-white py-3 rounded-xl text-sm font-medium transition-colors shadow-sm"
            >
              Finalizar Compra
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL (App) — useState E useEffect COM localStorage
// ============================================================================
export default function App() {
  const [abaAtiva, setAbaAtiva] = useState('loja');

  const [carrinho, setCarrinho] = useState(() => {
    try {
      const salvo = localStorage.getItem('aura_boutique_carrinho');
      return salvo ? JSON.parse(salvo) : [];
    } catch {
      return [];
    }
  });

  const [progressoQuiz, setProgressoQuiz] = useState(() => {
    try {
      const salvo = localStorage.getItem('aura_boutique_quiz');
      return salvo ? JSON.parse(salvo) : {
        indiceAtual: 0,
        respostas: [],
        pontuacaoTotal: 0,
        concluido: false,
        estiloFinal: null
      };
    } catch {
      return {
        indiceAtual: 0,
        respostas: [],
        pontuacaoTotal: 0,
        concluido: false,
        estiloFinal: null
      };
    }
  });

  useEffect(() => {
    localStorage.setItem('aura_boutique_carrinho', JSON.stringify(carrinho));
  }, [carrinho]);

  useEffect(() => {
    localStorage.setItem('aura_boutique_quiz', JSON.stringify(progressoQuiz));
  }, [progressoQuiz]);

  const adicionarAoCarrinho = (produto) => {
    setCarrinho((prev) => {
      const existente = prev.find((item) => item.id === produto.id);
      if (existente) {
        return prev.map((item) =>
          item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });
  };

  const alterarQuantidade = (id, delta) => {
    setCarrinho((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantidade: item.quantidade + delta } : item
        )
        .filter((item) => item.quantidade > 0)
    );
  };

  const removerItem = (id) => {
    setCarrinho((prev) => prev.filter((item) => item.id !== id));
  };

  const limparCarrinho = () => {
    setCarrinho([]);
  };

  let totalItensCarrinho = 0;
  for (let i = 0; i < carrinho.length; i++) {
    totalItensCarrinho += carrinho[i].quantidade;
  }

  return (
    <div className="min-h-screen bg-[#FDFBF9] text-[#2C2421] flex flex-col font-sans">
      <Navbar 
        abaAtiva={abaAtiva} 
        setAbaAtiva={setAbaAtiva} 
        totalItensCarrinho={totalItensCarrinho}
        estiloSalvo={progressoQuiz.estiloFinal}
      />

      <main className="flex-1">
        {abaAtiva === 'loja' && (
          <CatalogoLoja 
            adicionarAoCarrinho={adicionarAoCarrinho}
            estiloRecomendado={progressoQuiz.estiloFinal}
            irParaQuiz={() => setAbaAtiva('quiz')}
          />
        )}

        {abaAtiva === 'quiz' && (
          <QuizEstilo 
            progressoQuiz={progressoQuiz}
            setProgressoQuiz={setProgressoQuiz}
            irParaCatalogo={() => setAbaAtiva('loja')}
          />
        )}

        {abaAtiva === 'carrinho' && (
          <CarrinhoCompras 
            carrinho={carrinho}
            alterarQuantidade={alterarQuantidade}
            removerItem={removerItem}
            limparCarrinho={limparCarrinho}
            voltarParaLoja={() => setAbaAtiva('loja')}
          />
        )}
      </main>

      <footer className="bg-[#F5EFEA] border-t border-[#E8DCD5] py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6E5D56]">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#B85D43]" />
            <span><strong>Aura Boutique</strong> — Projeto DSA 2026 em ReactJS</span>
          </div>
          <p>Paleta Adobe Color • Responsivo • Persistência via localStorage</p>
        </div>
      </footer>
    </div>
  );
}
