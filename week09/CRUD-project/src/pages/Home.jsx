import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  max-width: 800px;
  margin: 4rem auto;
  padding: 2rem;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
`;

const Welcome = styled.p`
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const Grid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
`;

const Card = styled.button`
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: bold;
  color: #0b0c11;
  cursor: pointer;
  background-color: #f8f9fa;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(199, 217, 221, 0.3);
    border-color: #c7d9dd;
  }
`;

export default function Home() {
  const navigate = useNavigate();
  const memberId = localStorage.getItem("memberId");
  const nickname = localStorage.getItem("nickname");

  return (
    <Container>
      <Title>🏠 홈</Title>
      <Welcome>반가워요, {nickname}님! 😊</Welcome>
      <Grid>
        <Card onClick={() => navigate("/boards")}>📋 게시판 보기</Card>
        <Card onClick={() => navigate(`/members/${memberId}`)}>👤 내 정보</Card>
        <Card onClick={() => navigate("/posts")}>📄 게시글 전체 목록</Card>
      </Grid>
    </Container>
  );
}
