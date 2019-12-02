import { createGlobalStyle } from 'styled-components';

/* Todo o CSS criado e declarado dentro deste arquivo
sera global e vai compartilhado com toda a aplicação. */
export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  /* Ocupar 100% da altura da pagina por padrão. */
  html, body, #root {
    min-height: 100%
  }

  /* Cor de fundo padrão e global utilizado em toda as paginas. */
  body {
    background: #7159C1;
    -webkit-font-smoothing: antialiased !important
  }

  body, input, button {
    color: #222;
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif
  }

  button {
    cursor: pointer;
  }
`;
