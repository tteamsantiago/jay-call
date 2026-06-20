import { supabase } from './supabase'

function buildPrompt({ nome, formData, oferta, obs }) {
  const n = nome || 'o lead'
  const hasLimitedInfo = !formData || formData.split('\n').filter(x => x.trim()).length < 4
  const bar = '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
  const personaSection = (oferta || '').trim()
    ? bar + '\nCONTEXTO DO VENDEDOR\n' + bar + '\n' + oferta.trim() + '\n\n'
    : ''
  const missingNote = hasLimitedInfo
    ? '\nNOTA: As informações sobre este lead são parciais. Para cada bloco do roteiro em que faltar dado importante, inclua entre colchetes uma sugestão de como obter essa informação durante a call. Ex: [Pergunta para descobrir: "Quanto você fatura hoje, em média?"]'
    : ''

  return 'Você é um expert em vendas de alto ticket para consultoria de Treinamento e Nutrição no Brasil.\n'
    + 'Domina SPIN Selling, GAP Selling e o framework CLOSER (Hormozi).\n\n'
    + personaSection
    + bar + '\n'
    + 'FORMULÁRIO DE PRÉ-CALL — ' + n.toUpperCase() + '\n'
    + bar + '\n'
    + (formData || '(sem dados — gerar roteiro genérico com perguntas exploratórias)') + '\n'
    + (obs ? '\nOBSERVAÇÃO DO VENDEDOR: ' + obs : '')
    + '\n' + bar
    + missingNote + '\n\n'
    + 'INSTRUÇÕES:\n\n'
    + 'PARTE 1 — ANÁLISE DO LEAD\n'
    + 'Faça uma análise rápida de ' + n + ':\n'
    + '• BANT: Budget, Authority, Need, Timeline\n'
    + '• Principal oportunidade desta call\n'
    + '• Maior risco / o que pode travar o fechamento\n'
    + '• Objeção mais provável com base nos dados\n\n'
    + 'PARTE 2 — ROTEIRO PERSONALIZADO (10 blocos)\n'
    + 'Gere o roteiro completo. REGRAS:\n'
    + '1. Use o nome "' + n + '" nas perguntas\n'
    + '2. Baseie cada pergunta nos dados reais do formulário\n'
    + '3. Bloco 4 (âncora emocional): use o porquê real que ele mencionou\n'
    + '4. Bloco 6 (amplificação): use números reais — peça pra ELE fazer a conta\n'
    + '5. Se houver sinal de ceticismo: inclua diagnóstico de experiências anteriores no Bloco 5\n'
    + '6. Bloco 10 (fechamento): conecte com o objetivo declarado por ele\n'
    + (hasLimitedInfo ? '7. Para dados desconhecidos: inclua [colchetes] com a pergunta ideal\n' : '')
    + '\nBLOCOS:\n'
    + '1. Abertura — rapport e entender o momento atual\n'
    + '2. Diagnóstico de negócio — números e contexto\n'
    + '3. Qualificação financeira — budget de forma natural\n'
    + '4. Âncora emocional — porquê maior por trás da meta\n'
    + '5. Identificação do problema real — o que realmente trava\n'
    + '6. Amplificação — custo de não resolver (ele calcula)\n'
    + '7. Visão do futuro — estado desejado concreto\n'
    + '8. Comprometimento — sim ou não antes de apresentar\n'
    + '9. Pós-apresentação — identificar objeção real\n'
    + '10. Fechamento — âncora emocional + decisão\n\n'
    + 'PARTE 3 — PREPARAÇÃO PARA OBJEÇÃO\n'
    + 'Identifique a objeção mais provável e dê 3 respostas específicas usando o contexto real de ' + n + '.\n\n'
    + 'Linguagem: português brasileiro, tom de conversa, natural. Sem travessão nas falas.'
}

export const hasKey = () => true

export async function generateRoteiro(leadData) {
  if (!supabase) throw new Error('Supabase não configurado.')

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) throw new Error('Sessão expirada. Faça login novamente.')

  const prompt = buildPrompt(leadData)

  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.access_token}`,
    },
    body: JSON.stringify({
      system: 'Você é um expert em vendas de alto ticket para consultoria de Treinamento e Nutrição no Brasil. O vendedor é Treinador e Nutricionista. Domina SPIN Selling, GAP Selling e o framework CLOSER (Hormozi). Gere roteiros de call estruturados, detalhados e personalizados. Responda em português brasileiro, de forma direta, sem introduções desnecessárias.',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 4000,
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.error || 'Erro ao chamar o servidor.')
  }

  const data = await response.json()
  return data.content[0].text
}

export function buildClaudeUrl(leadData) {
  const prompt = buildPrompt(leadData)
  const enc = encodeURIComponent(prompt)
  return enc.length < 8000
    ? 'https://claude.ai/new?q=' + enc
    : 'https://claude.ai/new'
}
