import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Noto Sans KR', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #000000;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyle;
