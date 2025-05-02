// App.jsx
import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { createGlobalStyle } from "styled-components";
import backgroundImg from "./images/dot-image.jpg";

const GlobalStyle = createGlobalStyle`
  body {
    @font-face {
      font-family: 'DungGeunMo';
      src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/DungGeunMo.woff') format('woff');
    }
    font-family: 'DungGeunMo';
    background-image: url(${backgroundImg});
    background-repeat : no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
