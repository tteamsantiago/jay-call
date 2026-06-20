import { useEffect, useState } from 'react'
import { fetchLeads, deleteLead } from '../lib/supabase'

function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
    + ' ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

export default function Sidebar({ activeId, onSelect, refreshKey }) {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      setLeads(await fetchLeads(40))
    } catch {
      // supabase not configured
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [refreshKey])

  const handleDelete = async (e, id) => {
    e.stopPropagation()
    if (!confirm('Excluir este lead?')) return
    await deleteLead(id)
    setLeads(prev => prev.filter(l => l.id !== id))
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-title">Leads recentes</div>
      </div>
      <div className="sidebar-list">
        {loading && <div className="empty">Carregando...</div>}

        {!loading && leads.length === 0 && (
          <div className="empty">
            Nenhum lead ainda.<br />
            Gere o primeiro roteiro.
          </div>
        )}

        {!loading && leads.map(lead => (
          <div
            key={lead.id}
            className={`lead-item ${activeId === lead.id ? 'active' : ''}`}
            onClick={() => onSelect(lead.id)}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div className="lead-item-name">
                <span className="lead-item-dot" />
                {lead.nome}
              </div>
              <button
                onClick={(e) => handleDelete(e, lead.id)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--muted2)', fontSize: '13px', lineHeight: 1, padding: '0 2px',
                  opacity: 0.6,
                }}
                title="Excluir"
              >
                ×
              </button>
            </div>
            <div className="lead-item-date">{formatDate(lead.created_at)}</div>
          </div>
        ))}
      </div>

      <div style={{
        padding: '12px 16px',
        borderTop: '1px solid var(--border)',
        fontSize: '11px',
        color: 'var(--muted2)',
        textAlign: 'center',
      }}>
        {leads.length} lead{leads.length !== 1 ? 's' : ''} salvos
      </div>
    </aside>
  )
}
