import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";

import MemberInfo from "./components/members/MemberInfo";
import SignUp from "./pages/SignUp";
import StartScreen from "./pages/StartScreen";

export default function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/members/:memberId" element={<MemberInfo />} />
      </Routes>
    </Router>
  );
}
