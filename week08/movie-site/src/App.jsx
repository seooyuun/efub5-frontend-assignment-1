import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieInfo from "./pages/MovieInfo";
import GlobalStyle from "./styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";

const lightTheme = {
  hdbg: "#d3d3d3",
  bg: "#f9f9f9",
  text: "#111",
};

const darkTheme = {
  hdbg: "#7f7f7f",
  bg: "#111",
  text: "#f9f9f9",
};

function App() {
  const mode = useSelector((state) => state.theme.mode);

  return (
    <ThemeProvider theme={mode === "dark" ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieInfo />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
