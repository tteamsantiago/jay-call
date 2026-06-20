import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Generator from './components/Generator'
import Guide from './components/Guide'

export default function App() {
  const [activeTab, setActiveTab] = useState('gerador')
  const [refreshKey, setRefreshKey] = useState(0)
  const [loadLeadId, setLoadLeadId] = useState(null)
  const [activeSidebarId, setActiveSidebarId] = useState(null)

  const handleSaved = () => {
    setRefreshKey(k => k + 1)
  }

  const handleSelectLead = (id) => {
    setActiveSidebarId(id)
    setLoadLeadId(id)
    setActiveTab('gerador')
  }

  return (
    <div className="app-shell">
      <Sidebar
        activeId={activeSidebarId}
        onSelect={handleSelectLead}
        refreshKey={refreshKey}
      />

      <div className="main-area">
        {/* Header */}
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
          <div className="header-right">SPIN · GAP · CLOSER · Hormozi</div>
        </header>

        {/* Content */}
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
