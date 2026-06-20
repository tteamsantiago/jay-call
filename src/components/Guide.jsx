const BLOCOS = [
  {
    num: 1,
    titulo: 'Abertura',
    tag: 'Rapport · entender o momento atual',
    objetivo: 'Baixar a guarda, criar conexão e assumir o controle leve da conversa — com permissão.',
    falar: [
      '"E aí, [Nome], tudo certo? Como tá sendo seu dia hoje?"',
      '"Deixa eu te explicar rapidinho como vai funcionar a nossa conversa: primeiro eu quero entender de verdade onde você está hoje e onde quer chegar. Se eu ver que faço sentido pra te levar lá, eu te mostro como. Se eu não fizer sentido, eu mesmo te falo, sem enrolação. Combinado?"',
    ],
    dica: 'Pedir permissão pra conduzir ("combinado?") te dá o controle da call sem soar agressivo. Não venda nada aqui — só conecte.',
  },
  {
    num: 2,
    titulo: 'Diagnóstico de negócio',
    tag: 'SPIN: Situação · números e contexto',
    objetivo: 'Mapear a situação real: como ele trabalha, volume, faturamento. Fatos, não opiniões.',
    falar: [
      '"Me conta um pouco: como funciona seu trabalho hoje? Você atende mais [presencial ou online]?"',
      '"Quantos [clientes/alunos] você atende hoje, mais ou menos?"',
      '"E em média, quanto isso te dá de faturamento por mês?"',
    ],
    dica: 'Anote os números exatos — você vai usar eles no Bloco 6 pra fazer a conta da dor. Sem números agora, não tem amplificação depois.',
  },
  {
    num: 3,
    titulo: 'Qualificação financeira',
    tag: 'Budget de forma natural',
    objetivo: 'Entender a capacidade e a disposição de investir — antes de se apaixonar pela venda.',
    falar: [
      '"Deixa eu te perguntar com sinceridade, pra eu te mostrar o caminho certo: quando você pensa em investir pra destravar isso de vez, você já tem uma ideia de quanto faz sentido pra você? Ou tá totalmente aberto a entender?"',
    ],
    dica: 'Faça com naturalidade e siga em frente. O objetivo é só plantar que vai existir um investimento — não negociar preço agora.',
  },
  {
    num: 4,
    titulo: 'Âncora emocional',
    tag: 'O porquê maior por trás da meta',
    objetivo: 'Sair do racional e chegar no motivo emocional real. É aqui que a venda é ganha ou perdida.',
    falar: [
      '"Você me disse que quer [meta dele]. Deixa eu te fazer uma pergunta mais pessoal: por que isso é importante pra você? O que muda na sua vida quando você chega lá?"',
      '"E por que agora? Por que não deixar isso pra daqui a um ou dois anos?"',
    ],
    dica: 'Quando ele responder, aprofunde: "e por que isso importa?". O verdadeiro porquê costuma estar 2-3 camadas abaixo da primeira resposta. Guarde essa frase — ela volta no fechamento.',
  },
  {
    num: 5,
    titulo: 'Identificação do problema real',
    tag: 'GAP: o que realmente trava',
    objetivo: 'Expor o gap entre onde ele está e onde quer chegar — e fazer ELE nomear o que trava.',
    falar: [
      '"Se hoje você quer chegar em [meta] e está em [situação atual]... na sua visão, o que está te impedindo de já estar lá?"',
      '"Você já tentou resolver isso antes? O que aconteceu?"',
    ],
    dica: 'Se ele já tentou e se frustrou (sinal de ceticismo), explore: "o que exatamente não funcionou?". Você vai usar isso pra mostrar por que desta vez é diferente.',
  },
  {
    num: 6,
    titulo: 'Amplificação',
    tag: 'Custo de não resolver — ELE calcula',
    objetivo: 'Tornar o custo de continuar parado concreto e financeiro — dito pela boca do lead.',
    falar: [
      '"Deixa eu te fazer uma conta rápida — e quero que você me responda: se você fatura [X por mês] hoje e podia estar faturando [meta]... quanto você está deixando na mesa por mês?"',
      '"E em um ano, isso dá quanto?"',
      '"Como você se sente sabendo que esse dinheiro está passando todo mês?"',
    ],
    dica: 'Faça silêncio depois da conta. Deixa ele sentir o número. Quem fala o custo é ele — fica muito mais forte do que se você falasse.',
  },
  {
    num: 7,
    titulo: 'Visão do futuro',
    tag: 'Estado desejado concreto',
    objetivo: 'Contrastar a dor com o prazer: fazer ele visualizar e sentir a vida com o problema resolvido.',
    falar: [
      '"Agora imagina o contrário. Daqui a [6 meses], você já [resultado desejado]. Como é um dia seu? Quanto você está faturando? Como está sua rotina, sua cabeça?"',
    ],
    dica: 'Deixe ele descrever o futuro com as próprias palavras. Quanto mais detalhe ele der, mais ele se compromete com aquele cenário.',
  },
  {
    num: 8,
    titulo: 'Comprometimento',
    tag: 'CLOSER: sim ou não antes de apresentar',
    objetivo: 'Conseguir um "sim condicional" antes de mostrar a oferta — pra não apresentar pra quem não quer.',
    falar: [
      '"[Nome], baseado em tudo que você me contou, eu tenho um caminho que faz exatamente isso: te levar de [situação atual] pra [meta]."',
      '"Antes de eu te mostrar como funciona — se eu te provar que isso resolve [a dor dele] e te leva pra onde você quer, existe algum motivo pra você não começar essa semana?"',
    ],
    dica: 'Se ele disser "nenhum motivo", você praticamente já vendeu. Se ele trouxer um "mas...", ótimo — você descobriu a objeção real antes de apresentar o preço.',
  },
  {
    num: 9,
    titulo: 'Pós-apresentação',
    tag: 'Identificar a objeção real',
    objetivo: 'Depois de apresentar a oferta, descobrir a real hesitação — não a primeira desculpa.',
    falar: [
      '"Faz sentido pra você? O que está passando pela sua cabeça agora?"',
      '"De 0 a 10, o quanto você quer fazer isso?"',
      '"Por que [número] e não 5? ... E o que faltaria pra ser um 10?"',
    ],
    dica: 'O "por que não um número menor?" faz ele vender pra si mesmo. O "o que falta pra ser 10?" entrega a objeção real de bandeja.',
  },
  {
    num: 10,
    titulo: 'Fechamento',
    tag: 'Âncora emocional + decisão',
    objetivo: 'Conectar a decisão ao porquê emocional dele e pedir o próximo passo de forma clara.',
    falar: [
      '"Olha, você me disse que quer [meta] porque [o porquê do Bloco 4]. Esse caminho é exatamente isso."',
      '"A pergunta não é se você vai chegar lá — é se vai chegar sozinho, tentando por mais um ano, ou comigo, em [prazo]. Bora começar agora?"',
      '[silêncio — quem falar primeiro, perde]',
      '"Perfeito. Vou te mandar o link aqui e a gente já garante sua vaga."',
    ],
    dica: 'Devolva exatamente as palavras dele do Bloco 4. Peça a decisão e cale a boca. Tenha o link de pagamento pronto pra mandar na hora.',
  },
]

const OBJECOES = [
  {
    ic: '💰',
    q: <>Tá <span className="says">caro</span> / preciso de um tempo pra pensar</>,
    label: 'Preço',
    resp: (
      <>
        <span className="lead-in">"Entendo. Deixa eu te perguntar:</span> caro comparado a quê? Porque caro mesmo é continuar mais um ano faturando [X] e deixando [Y] na mesa, igual você acabou de me dizer. O investimento aqui se paga com [N clientes]. A real é: o que te trava é o valor, ou é a dúvida se vai funcionar pra você?"
      </>
    ),
    why: 'Reposiciona o "caro" contra o custo de não agir (que ELE calculou no Bloco 6) e separa preço de insegurança.',
  },
  {
    ic: '🤔',
    q: <>Já <span className="says">tentei</span> antes e não deu certo</>,
    label: 'Ceticismo',
    resp: (
      <>
        <span className="lead-in">"Faz todo sentido você estar receoso.</span> Me diz uma coisa: o que exatamente não funcionou da última vez? <span className="cue">— deixa ele responder —</span> Pois é — e é exatamente isso que a gente faz diferente aqui: [diferencial específico que ataca o que falhou]. Você não vai estar sozinho como da outra vez."
      </>
    ),
    why: 'Valida o medo, descobre a causa da frustração passada e ancora seu diferencial exatamente nela.',
  },
  {
    ic: '⏰',
    q: <>Agora não é a hora, não tenho <span className="says">tempo</span></>,
    label: 'Tempo',
    resp: (
      <>
        <span className="lead-in">"Justamente por isso.</span> Você não tem tempo porque hoje faz tudo do jeito que te mantém preso em [situação atual]. Se daqui a seis meses você continuar esperando 'a hora certa', você vai estar exatamente onde está hoje — só com seis meses a menos. A hora certa é a que faz você sair do lugar."
      </>
    ),
    why: 'Transforma a objeção de tempo no próprio motivo pra agir, em vez de discutir agenda.',
  },
  {
    ic: '💍',
    q: <>Preciso falar com meu(minha) <span className="says">esposo(a)</span></>,
    label: 'Cônjuge',
    resp: (
      <>
        <span className="lead-in">"Claro, faz todo sentido envolver.</span> Deixa eu te perguntar: se dependesse só de você, você faria? <span className="cue">— deixa ele responder —</span> Então o caminho é esse. O que [seu/sua parceiro(a)] precisaria entender pra te apoiar nessa decisão? Bora pensar juntos em como você apresenta isso de um jeito que ele(a) veja o que você viu aqui."
      </>
    ),
    why: 'Isola se a objeção é real ou desculpa e te coloca como aliado na conversa com o cônjuge.',
  },
]

const REGRAS = [
  { n: 1, bold: 'Quem pergunta, controla.', text: 'O lead deveria falar 70% da call. Sua arma é a pergunta certa, não o argumento.' },
  { n: 2, bold: 'Diagnostique antes de prescrever.', text: 'Médico que receita sem examinar é charlatão. Nunca apresente antes do Bloco 8.' },
  { n: 3, bold: 'Use os números e palavras dele.', text: 'Nada convence mais alguém do que ouvir o próprio argumento de volta.' },
  { n: 4, bold: 'Silêncio é fechamento.', text: 'Depois de pedir a decisão, o primeiro a falar perde. Aguente o silêncio.' },
  { n: 5, bold: 'Objeção é pedido de ajuda.', text: '"Tá caro" quase sempre é "me ajuda a ter certeza". Acolha, não combata.' },
  { n: 6, bold: 'Tenha o próximo passo pronto.', text: 'Link de pagamento na mão. Decisão tomada esfria rápido — execute na hora.' },
]

const BANT = [
  { ic: '💰', label: 'Budget', text: 'Ele tem capacidade financeira pro investimento? Qual a faixa de faturamento dele hoje?' },
  { ic: '👤', label: 'Authority', text: 'Decide sozinho? Ou depende de sócio / cônjuge? (Se depende, traga isso à tona cedo.)' },
  { ic: '🔥', label: 'Need', text: 'Qual a dor real? O que mais incomoda hoje? Onde ele trava?' },
  { ic: '⏱️', label: 'Timeline', text: 'Qual a urgência? Por que resolver agora e não daqui a 1 ano?' },
  { ic: '🎯', label: 'Oportunidade', text: 'Qual o principal ganho que esta call pode destravar pra ele?' },
  { ic: '⚠️', label: 'Objeção provável', text: 'Com base nos dados, o que mais pode travar o fechamento? (preço, ceticismo, tempo, cônjuge)' },
]

export default function Guide() {
  return (
    <div className="guide-wrap">
      {/* BANT */}
      <div className="sec-title"><span className="n">01</span> Antes da call — análise do lead (BANT)</div>
      <div className="bant">
        <div className="bant-head">Preencha em 2 minutos antes de discar</div>
        <p className="bant-desc">Olhe o formulário/contexto do lead e responda. Isso define onde você vai pisar mais forte na conversa.</p>
        <div className="bant-grid">
          {BANT.map(b => (
            <div key={b.label} className="bant-item">
              <div className="lbl">{b.ic} <b>{b.label}</b></div>
              <p>{b.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 10 BLOCOS */}
      <div className="sec-title"><span className="n">02</span> O roteiro — 10 blocos</div>
      {BLOCOS.map(b => (
        <div key={b.num} className="bloco">
          <div className="bloco-head">
            <div className="bloco-num">{b.num}</div>
            <div>
              <div className="bloco-title">{b.titulo}</div>
              <div className="bloco-tag">{b.tag}</div>
            </div>
          </div>
          <div className="row goal">
            <div className="row-lbl">🎯 Objetivo</div>
            <p>{b.objetivo}</p>
          </div>
          <div className="row say">
            <div className="row-lbl">🗣️ O que falar</div>
            <div className="say-box">
              {b.falar.map((f, i) => (
                <p key={i}>{f}</p>
              ))}
            </div>
          </div>
          <div className="row tip">
            <div className="row-lbl">💡 Dica do closer</div>
            <p className="tip-box">{b.dica}</p>
          </div>
        </div>
      ))}

      {/* OBJEÇÕES */}
      <div className="sec-title"><span className="n">03</span> Banco de objeções</div>
      {OBJECOES.map((o, i) => (
        <div key={i} className="obj">
          <div className="obj-head">
            <span className="obj-ic">{o.ic}</span>
            <span className="obj-q">"{o.q}"</span>
            <span className="obj-label">{o.label}</span>
          </div>
          <p className="obj-resp">{o.resp}</p>
          <p className="obj-why"><b>Por que funciona:</b> {o.why}</p>
        </div>
      ))}

      {/* REGRAS */}
      <div className="sec-title"><span className="n">04</span> 6 regras de ouro do closer</div>
      <div className="regras">
        {REGRAS.map(r => (
          <div key={r.n} className="regra">
            <span className="rn">{r.n}</span>
            <p><b>{r.bold}</b> <span>{r.text}</span></p>
          </div>
        ))}
      </div>

      <div style={{ height: 48 }} />
    </div>
  )
}
