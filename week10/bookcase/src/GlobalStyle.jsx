import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}
    margin: 0;
    padding: 0;
    font-family: 'Pretendard-Regular', sans-serif;
    background-color: #f9f9f9;
    color: #333;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    border-radius: 4px;
  }

  input {
    font-family: inherit;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul {
    list-style: none;
    padding-left: 0;
  }
`;

export default GlobalStyle;
