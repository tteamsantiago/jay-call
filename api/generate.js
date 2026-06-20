import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://fhuromvcoujzmikxxjnv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZodXJvbXZjb3Vqem1pa3h4am52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxMjM5MTgsImV4cCI6MjA5NTY5OTkxOH0.yiKrzsiIsoekNlG0r6Qwn8YrDB1q2josRBVrJfiP4uc'
)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) return res.status(401).json({ error: 'Não autenticado.' })

  const { data: { user }, error: authError } = await supabase.auth.getUser(token)
  if (authError || !user) return res.status(401).json({ error: 'Sessão inválida.' })

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return res.status(500).json({ error: 'Chave da API não configurada no servidor.' })

  try {
    const { system, messages, max_tokens = 4000 } = req.body

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens,
        system,
        messages,
      }),
    })

    if (!response.ok) {
      const err = await response.json().catch(() => ({}))
      return res.status(response.status).json({ error: err.error?.message || 'Erro na API Anthropic.' })
    }

    const data = await response.json()
    return res.json(data)
  } catch (e) {
    return res.status(500).json({ error: e.message || 'Erro desconhecido.' })
  }
}
