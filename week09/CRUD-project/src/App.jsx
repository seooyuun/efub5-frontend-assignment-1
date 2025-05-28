import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";

import MemberInfo from "./components/members/MemberInfo";
import SignUp from "./pages/SignUp";
import StartScreen from "./pages/StartScreen";
import EditProfileForm from "./components/members/EditProfileForm";
import Home from "./pages/Home";
import Board from "./pages/Board";
import BoardMain from "./pages/BoardMain";
import BoardPosts from "./pages/BoardPosts";

export default function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/members/:memberId" element={<MemberInfo />} />
        <Route path="/members/:memberId/edit" element={<EditProfileForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/boards" element={<Board />} />
        <Route path="/boards/:boardId" element={<BoardMain />} />
        <Route path="/boards/:boardId/posts" element={<BoardPosts />} />
      </Routes>
    </Router>
  );
}
