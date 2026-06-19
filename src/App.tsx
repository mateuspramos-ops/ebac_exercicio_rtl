import React, { useState } from 'react'

type Comentario = {
  id: number
  texto: string
}

function App() {
  const [comentarios, setComentarios] = useState<Comentario[]>([])
  const [novoComentario, setNovoComentario] = useState('')

  const adicionarComentario = () => {
    const texto = novoComentario.trim()
    if (!texto) return

    setComentarios([
      ...comentarios,
      { id: Date.now(), texto }
    ])
    setNovoComentario('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') adicionarComentario()
  }

  return (
    <div className="App">
      <h1>Comentários</h1>

      <div>
        <input
          data-testid="campo-comentario"
          type="text"
          placeholder="Digite seu comentário..."
          value={novoComentario}
          onChange={(e) => setNovoComentario(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          data-testid="botao-adicionar"
          onClick={adicionarComentario}
        >
          Adicionar
        </button>
      </div>

      <ul data-testid="lista-comentarios">
        {comentarios.map((comentario) => (
          <li
            key={comentario.id}
            data-testid="item-comentario"
          >
            {comentario.texto}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
