import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: "Segoe UI", "Roboto", "Helvetica Neue", sans-serif;
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
