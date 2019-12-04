/* keyframes -> Utilizando para criação de animações. */
import styled, { keyframes, css } from 'styled-components';

export const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      margin-right: 10px;
    }
  }
`;

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid #eee;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg)
  }

  to {
    transform: rotate(360deg)
  }
`;

/* attrs -> É possivel também acessar as propriedades do elemento aqui dentro.
  O attrs consiste em trabalhar e movimentar atributos dentro do botão. */
export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  /* Setar a propriedade disabled, baseado na propriedade loading
  ou seja, se a propriedade loading estiver true, a propriedade
  disabled também ficara true. */
  disabled: props.loading,
}))`
  background: #7159c1;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  /*
    Configurações p/ quando ele estiver desabilitado.
    & -> Quando chamado, refere-se ao botão especifico.
  */

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    /* Adiciona uma estilização entre o li e outro, sempre proximo
  mais nunca anterior. Uma borda foi adicionada entre um elemento
  da lista e outra. */
    & + li {
      border-top: 1px solid #eee;
    }

    a {
      color: #fff;
      text-decoration: none;
      background: #7159c1;
      border: 0;
      padding: 5px 15px;
      margin-left: 10px;
      border-radius: 4px;

      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
