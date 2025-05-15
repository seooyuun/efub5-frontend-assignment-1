import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    @font-face {
    font-family: 'Cafe24ClassicType-Regular';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2210-2@1.0/Cafe24ClassicType-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}
    font-family: 'Cafe24ClassicType-Regular', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #111;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyle;
