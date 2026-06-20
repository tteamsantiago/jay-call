import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null

export async function saveLeadRoteiro({ nome, formData, oferta, obs, roteiro, source = 'manual' }) {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('leads_jay')
    .insert([{ nome: nome || 'Sem nome', form_data: formData, oferta, obs, roteiro, source }])
    .select('id')
    .single()
  if (error) throw error
  return data
}

export async function fetchLeads(limit = 30) {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('leads_jay')
    .select('id, created_at, nome, roteiro')
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data ?? []
}

export async function fetchLead(id) {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('leads_jay')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

export async function deleteLead(id) {
  if (!supabase) return
  const { error } = await supabase.from('leads_jay').delete().eq('id', id)
  if (error) throw error
}
