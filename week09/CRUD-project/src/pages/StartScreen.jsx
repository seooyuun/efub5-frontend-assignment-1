import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background-color: #3c82f6;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
`;

export default function StartScreen() {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>CRUD 프로젝트</Title>
      <Button onClick={() => navigate("/signup")}>회원가입</Button>
    </Container>
  );
}
