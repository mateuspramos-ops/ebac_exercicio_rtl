import { fireEvent, render, screen } from '@testing-library/react'
import Post from '.'
import PostComment from '.'

describe('Teste para o componente PostComment', () => {
  it('Deve renderizar o componente corretamente', () => {
    render(<PostComment />)
    expect(screen.getByText('Comentar')).toBeInTheDocument()
  })

  it('Deve adicionar dois comentários e verificar se foram adicionados', () => {
    render(<Post />)

    const textarea = screen.getByRole('textbox')

    // Adiciona o primeiro comentário
    fireEvent.change(textarea, { target: { value: 'Primeiro comentário' } })
    fireEvent.click(screen.getByText('Comentar'))

    // Verifica se o primeiro comentário apareceu na lista
    expect(screen.getByText('Primeiro comentário')).toBeInTheDocument()

    // Adiciona o segundo comentário
    fireEvent.change(textarea, { target: { value: 'Segundo comentário' } })
    fireEvent.click(screen.getByText('Comentar'))

    // Verifica se o segundo comentário apareceu na lista
    expect(screen.getByText('Segundo comentário')).toBeInTheDocument()
  })
})
