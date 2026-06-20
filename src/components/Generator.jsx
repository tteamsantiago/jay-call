import { useRef, useState } from 'react'
import { generateRoteiro, buildClaudeUrl, hasKey } from '../lib/claude'
import { saveLeadRoteiro, fetchLead } from '../lib/supabase'

export default function Generator({ onSaved, loadLeadId, onLeadLoaded }) {
  const [mode, setMode] = useState('paste')
  const [formData, setFormData] = useState('')
  const [nome, setNome] = useState('')
  const [oferta, setOferta] = useState('')
  const [obs, setObs] = useState('')
  const [loading, setLoading] = useState(false)
  const [roteiro, setRoteiro] = useState('')
  const [savedId, setSavedId] = useState(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const fileRef = useRef(null)
  const [uploadStatus, setUploadStatus] = useState('')

  // Load a saved lead when sidebar item clicked
  const lastLoadedId = useRef(null)
  if (loadLeadId && loadLeadId !== lastLoadedId.current) {
    lastLoadedId.current = loadLeadId
    fetchLead(loadLeadId).then(lead => {
      if (!lead) return
      setFormData(lead.form_data || '')
      setNome(lead.nome || '')
      setOferta(lead.oferta || '')
      setObs(lead.obs || '')
      setRoteiro(lead.roteiro || '')
      setSavedId(lead.id)
      setError('')
      onLeadLoaded?.()
    })
  }

  const detectNome = (text) => {
    const m = text.match(/nome[^\n]*\n([^\n]+)/i)
    return m ? m[1].trim() : ''
  }

  const handleFile = async (file) => {
    setUploadStatus('Lendo ' + file.name + '...')
    try {
      let text = ''
      if (file.name.toLowerCase().endsWith('.txt')) {
        text = await file.text()
      } else {
        text = await file.text().catch(() => '')
        if (!text) throw new Error('Formato não suportado. Use .txt ou cole o texto.')
      }
      setFormData(text)
      if (!nome) setNome(detectNome(text))
      setUploadStatus('✓ ' + file.name + ' lido')
      setMode('paste')
    } catch (err) {
      setUploadStatus('Erro: ' + err.message)
    }
  }

  const handleGenerate = async () => {
    if (!formData.trim()) { setError('Cole o formulário do lead antes de gerar.'); return }
    setError('')
    setLoading(true)
    setRoteiro('')
    setSavedId(null)

    const leadNome = nome.trim() || detectNome(formData) || 'Lead'

    try {
      const result = await generateRoteiro({ nome: leadNome, formData, oferta, obs })
      setRoteiro(result)

      const saved = await saveLeadRoteiro({
        nome: leadNome,
        formData,
        oferta,
        obs,
        roteiro: result,
      })
      if (saved) { setSavedId(saved.id); onSaved?.() }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(roteiro)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleOpenClaude = () => {
    const url = buildClaudeUrl({ nome: nome || detectNome(formData) || 'Lead', formData, oferta, obs })
    if (!hasKey()) {
      navigator.clipboard.writeText(
        `Você é um expert em vendas de alto ticket para mentorias e consultorias no Brasil.\n\nFORMULÁRIO:\n${formData}`
      )
    }
    window.open(url, '_blank')
  }

  return (
    <div className="tool">
      <h2>Gere o roteiro do seu lead</h2>
      <p className="lead">
        Cole o formulário de pré-call que o lead respondeu. O Jay Call gera o roteiro completo e salva no histórico.
      </p>

      {/* Tabs */}
      <div className="tabs">
        <button className={`tab ${mode === 'paste' ? 'active' : ''}`} onClick={() => setMode('paste')}>
          Colar formulário
        </button>
        <button className={`tab ${mode === 'upload' ? 'active' : ''}`} onClick={() => setMode('upload')}>
          Subir arquivo (.txt)
        </button>
      </div>

      {/* Paste mode */}
      {mode === 'paste' && (
        <>
          <div className="fld-lbl">Formulário de pré-call respondido pelo lead</div>
          <textarea
            className="main"
            value={formData}
            onChange={e => setFormData(e.target.value)}
            placeholder="Cole aqui o formulário completo que o lead preencheu (perguntas e respostas)..."
          />
        </>
      )}

      {/* Upload mode */}
      {mode === 'upload' && (
        <>
          <div className="fld-lbl">Arquivo de texto (.txt)</div>
          <div
            onClick={() => fileRef.current?.click()}
            onDragOver={e => e.preventDefault()}
            onDrop={e => { e.preventDefault(); handleFile(e.dataTransfer.files[0]) }}
            style={{
              border: '2px dashed var(--border2)',
              borderRadius: '12px',
              padding: '32px 20px',
              textAlign: 'center',
              cursor: 'pointer',
              fontSize: '14px',
              color: 'var(--muted)',
            }}
          >
            Arraste o arquivo aqui ou <strong style={{ color: 'var(--accent2)' }}>clique para escolher</strong>
            <small style={{ display: 'block', marginTop: 6, fontSize: 12, color: 'var(--muted2)' }}>
              .txt — leitura local, nada é enviado
            </small>
          </div>
          <input ref={fileRef} type="file" accept=".txt" hidden onChange={e => handleFile(e.target.files[0])} />
          {uploadStatus && (
            <div style={{ marginTop: 10, fontSize: 13, color: 'var(--muted)' }}>{uploadStatus}</div>
          )}
        </>
      )}

      {/* Common fields */}
      <div className="fld-lbl">Nome do lead <span className="opt">(opcional — detecto do formulário)</span></div>
      <input
        type="text"
        value={nome}
        onChange={e => setNome(e.target.value)}
        placeholder="Ex: Douglas"
      />

      <div className="fld-lbl">Sua oferta / persona <span className="opt">(opcional, mas melhora muito o roteiro)</span></div>
      <textarea
        className="sm"
        value={oferta}
        onChange={e => setOferta(e.target.value)}
        placeholder="O que você vende: mentoria/consultoria, pra quem, ticket médio, seu método e diferenciais..."
      />

      <div className="fld-lbl">Observação sobre o lead <span className="opt">(opcional)</span></div>
      <textarea
        className="sm"
        value={obs}
        onChange={e => setObs(e.target.value)}
        placeholder="Algo que você notou antes da call (veio por indicação, demonstrou urgência, etc.)..."
      />

      {error && (
        <div style={{ marginTop: 14, padding: '10px 14px', background: 'var(--red-soft)', border: '1px solid rgba(239,68,68,.3)', borderRadius: 9, fontSize: 13, color: 'var(--red)' }}>
          {error}
        </div>
      )}

      <button className="gen-btn" onClick={handleGenerate} disabled={loading || !formData.trim()}>
        {loading ? <><span className="spinner" />Gerando roteiro...</> : 'Gerar Roteiro'}
      </button>

      {/* Output */}
      {roteiro && (
        <div className="out">
          <div className="out-head">
            <span className="out-lbl">Roteiro gerado</span>
            <div className="out-actions">
              <button className="oa" onClick={handleCopy}>{copied ? 'Copiado ✓' : 'Copiar'}</button>
              {!hasKey() && (
                <button className="oa primary" onClick={handleOpenClaude}>Abrir no Claude →</button>
              )}
            </div>
          </div>
          <div className="out-box">{roteiro}</div>
          {savedId && (
            <div className="save-badge">
              <span className="dot" />
              Salvo no histórico
            </div>
          )}
        </div>
      )}
    </div>
  )
}
