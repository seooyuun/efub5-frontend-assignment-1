import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getBoard, updateBoard, deleteBoard } from "../apis/board";

const Container = styled.div`
  width: 700px;
  max-width: 960px;
  min-height: 40vh;
  margin: 3rem auto;
  padding: 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Info = styled.p`
  margin: 0.5rem 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const ActionButton = styled.button`
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  color: white;
  cursor: pointer;

  background-color: ${({ variant }) =>
    variant === "delete" ? "#D5E5D5" : "#C7D9DD"};

  &:hover {
    opacity: 0.9;
  }
`;

export default function BoardMain() {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const res = await getBoard(boardId);
        setBoard(res);
      } catch (err) {
        console.error("❌ 게시판 불러오기 실패", err);
      }
    };
    fetchBoard();
  }, [boardId]);

  const handleEdit = async () => {
    const newTitle = prompt("새 게시판 제목을 입력하세요", board.title);
    if (!newTitle || newTitle === board.title) return;
    try {
      await updateBoard(board.boardId, { ...board, title: newTitle });
      alert("✅ 수정 완료");
      setBoard((prev) => ({ ...prev, title: newTitle }));
    } catch (err) {
      console.error("❌ 수정 실패", err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("정말 이 게시판을 삭제하시겠습니까?")) return;
    try {
      await deleteBoard(board.boardId);
      alert("✅ 삭제 완료");
      navigate("/boards");
    } catch (err) {
      console.error("❌ 삭제 실패", err);
    }
  };

  if (!board) return <Container>⏳ 로딩 중...</Container>;

  return (
    <Container>
      <Title>{board.title}</Title>
      <Info>📄 설명: {board.description}</Info>
      <Info>📌 공지사항: {board.notice}</Info>

      <ButtonGroup>
        <ActionButton variant="edit" onClick={handleEdit}>
          수정
        </ActionButton>
        <ActionButton variant="delete" onClick={handleDelete}>
          삭제
        </ActionButton>
        <ActionButton
          onClick={() => navigate(`/boards/${board.boardId}/posts`)}
        >
          게시글 확인
        </ActionButton>
      </ButtonGroup>
    </Container>
  );
}
