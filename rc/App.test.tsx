import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

describe('Testando inserção de comentários', () => {

  test('deve renderizar o campo de comentário e o botão', () => {
    render(<App />)

    // Verifica se o campo e o botão estão na tela
    const campo  = screen.getByTestId('campo-comentario')
    const botao  = screen.getByTestId('botao-adicionar')
    const lista  = screen.getByTestId('lista-comentarios')

    expect(campo).toBeInTheDocument()
    expect(botao).toBeInTheDocument()
    expect(lista).toBeInTheDocument()
  })

  test('deve inserir o primeiro comentário na lista', () => {
    render(<App />)

    const campo = screen.getByTestId('campo-comentario')
    const botao = screen.getByTestId('botao-adicionar')

    // Digita o primeiro comentário e clica em adicionar
    fireEvent.change(campo, { target: { value: 'Primeiro comentário' } })
    fireEvent.click(botao)

    // Verifica se o comentário aparece na lista
    const itens = screen.getAllByTestId('item-comentario')
    expect(itens).toHaveLength(1)
    expect(itens[0]).toHaveTextContent('Primeiro comentário')
  })

  test('deve inserir dois comentários na lista', () => {
    render(<App />)

    const campo = screen.getByTestId('campo-comentario')
    const botao = screen.getByTestId('botao-adicionar')

    // Insere o primeiro comentário
    fireEvent.change(campo, { target: { value: 'Primeiro comentário' } })
    fireEvent.click(botao)

    // Insere o segundo comentário
    fireEvent.change(campo, { target: { value: 'Segundo comentário' } })
    fireEvent.click(botao)

    // Verifica se os dois comentários estão na lista
    const itens = screen.getAllByTestId('item-comentario')
    expect(itens).toHaveLength(2)
    expect(itens[0]).toHaveTextContent('Primeiro comentário')
    expect(itens[1]).toHaveTextContent('Segundo comentário')
  })

  test('deve limpar o campo após adicionar o comentário', () => {
    render(<App />)

    const campo = screen.getByTestId('campo-comentario')
    const botao = screen.getByTestId('botao-adicionar')

    // Digita e adiciona
    fireEvent.change(campo, { target: { value: 'Comentário teste' } })
    fireEvent.click(botao)

    // Campo deve estar vazio após adicionar
    expect(campo).toHaveValue('')
  })

  test('não deve adicionar comentário vazio', () => {
    render(<App />)

    const botao = screen.getByTestId('botao-adicionar')

    // Clica sem digitar nada
    fireEvent.click(botao)

    // Lista deve continuar vazia
    const lista = screen.getByTestId('lista-comentarios')
    expect(lista).toBeEmptyDOMElement()
  })

})

