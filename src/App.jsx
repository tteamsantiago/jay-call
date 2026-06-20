import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Generator from './components/Generator'
import Guide from './components/Guide'
import { supabase } from './lib/supabase'

function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email || !password) { setError('Preencha email e senha.'); return }
    setLoading(true)
    setError('')
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    if (authError) {
      setError('Email ou senha incorretos.')
      setLoading(false)
    }
  }

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      height: '100vh', background: 'var(--bg)',
    }}>
      <form onSubmit={handleLogin} style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 16, padding: '40px 36px', width: 360,
        display: 'flex', flexDirection: 'column', gap: 16,
      }}>
        <div style={{ textAlign: 'center', marginBottom: 8 }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)' }}>Jay Call</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>Squad Olympia · Acesso restrito</div>
        </div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{
            background: 'var(--card)', border: '1px solid var(--border2)',
            borderRadius: 10, padding: '10px 14px', color: 'var(--text)',
            fontSize: 14, outline: 'none',
          }}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{
            background: 'var(--card)', border: '1px solid var(--border2)',
            borderRadius: 10, padding: '10px 14px', color: 'var(--text)',
            fontSize: 14, outline: 'none',
          }}
        />
        {error && (
          <div style={{ fontSize: 13, color: 'var(--red)', textAlign: 'center' }}>{error}</div>
        )}
        <button
          type="submit"
          disabled={loading}
          style={{
            background: loading ? 'var(--border2)' : 'var(--accent)',
            color: '#fff', border: 'none', borderRadius: 10,
            padding: '11px', fontSize: 14, fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer', marginTop: 4,
          }}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  )
}

export default function App() {
  const [user, setUser] = useState(undefined)
  const [activeTab, setActiveTab] = useState('gerador')
  const [refreshKey, setRefreshKey] = useState(0)
  const [loadLeadId, setLoadLeadId] = useState(null)
  const [activeSidebarId, setActiveSidebarId] = useState(null)

  useEffect(() => {
    if (!supabase) { setUser(null); return }
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleSaved = () => setRefreshKey(k => k + 1)
  const handleSelectLead = (id) => {
    setActiveSidebarId(id)
    setLoadLeadId(id)
    setActiveTab('gerador')
  }

  if (user === undefined) return null

  if (!user) return <LoginScreen />

  return (
    <div className="app-shell">
      <Sidebar
        activeId={activeSidebarId}
        onSelect={handleSelectLead}
        refreshKey={refreshKey}
      />

      <div className="main-area">
        <header className="app-header">
          <div className="app-logo">
            Jay Call <span>· Squad Olympia</span>
          </div>
          <nav className="nav-tabs">
            <button
              className={`nav-tab ${activeTab === 'gerador' ? 'active' : ''}`}
              onClick={() => setActiveTab('gerador')}
            >
              Gerador
            </button>
            <button
              className={`nav-tab ${activeTab === 'guia' ? 'active' : ''}`}
              onClick={() => setActiveTab('guia')}
            >
              Guia — 10 Blocos
            </button>
          </nav>
          <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span>SPIN · GAP · CLOSER · Hormozi</span>
            <button
              onClick={() => supabase.auth.signOut()}
              style={{
                background: 'transparent', border: '1px solid var(--border2)',
                color: 'var(--muted)', borderRadius: 8, padding: '4px 10px',
                fontSize: 12, cursor: 'pointer',
              }}
            >
              Sair
            </button>
          </div>
        </header>

        <div className="content">
          {activeTab === 'gerador' && (
            <Generator
              onSaved={handleSaved}
              loadLeadId={loadLeadId}
              onLeadLoaded={() => setLoadLeadId(null)}
            />
          )}
          {activeTab === 'guia' && <Guide />}
        </div>
      </div>
    </div>
  )
}
