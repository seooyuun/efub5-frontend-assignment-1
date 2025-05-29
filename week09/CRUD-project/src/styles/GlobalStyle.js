import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    font-family: 'Noto Sans KR', sans-serif;
    display: flex;
    justify-content: center;
    background-color: #f9f9f9;
    color: #0B0C11;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyle;
