import React, { useState } from "react";
import styled from "styled-components";
import { createBoard } from "../../apis/board";

const Input = styled.input`
  margin-bottom: 1rem;
  width: 100%;
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const ModalTitle = styled.h3`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.6rem 1.2rem;
  width: 100%;
  background-color: ${({ variant }) =>
    variant === "cancel" ? "#ccc" : "#C7D9DD"};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:active {
    background-color: #adb2d4;
    border: none;
  }
`;

const Container = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

export default function BoardModal({ onClose, onCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notice, setNotice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ownerId = Number(localStorage.getItem("memberId"));
    try {
      const res = await createBoard({ title, description, notice, ownerId });
      const boardId = res.data.boardId;

      localStorage.setItem("lastBoardId", boardId);
      onCreated(); // 리스트 갱신
    } catch (err) {
      alert("❌ 생성 실패");
    }
  };

  return (
    <Container>
      <ModalTitle>새 게시판 만들기</ModalTitle>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Input
          placeholder="설명"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Input
          placeholder="공지사항"
          value={notice}
          onChange={(e) => setNotice(e.target.value)}
          required
        />
        <ButtonGroup>
          <Button type="submit">등록</Button>
          <Button type="button" variant="cancel" onClick={onClose}>
            취소
          </Button>
        </ButtonGroup>
      </form>
    </Container>
  );
}
