import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  /* Alinhas horizontamelmente ao centro. */
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  /* Um valor abaixo do outro. */
  flex-direction: column;
  align-items: center;

  a {
    color: #554d4d;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    /* Bordar arredondada para todos os avatars. */
    border-radius: 50%;
    /* Distancia da imagem para parte de cima. */
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 15px;
  }

  p {
    font-size: 14px;
    margin-top: 15px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;
