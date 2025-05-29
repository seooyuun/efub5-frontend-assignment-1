import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { updateBoard, deleteBoard } from "../../apis/board";
import axiosInstance from "../../apis/axiosInstance";

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 0;
  list-style: none;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-bottom: 1rem;
  gap: 1rem;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const TitleButton = styled.button`
  flex: 1;
  background: none;
  border: none;
  font-size: 1rem;
  text-align: left;
  cursor: pointer;
  color: black;

  &:hover {
    text-decoration: underline;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  background-color: ${({ variant }) =>
    variant === "edit" ? "#c7d9dd" : "#D5E5D5"};
  color: white;

  &:hover {
    opacity: 0.9;
  }
`;

export default function BoardList({ boards, setBoards }) {
  const navigate = useNavigate();

  const fetchBoards = async () => {
    const temp = [];
    const lastId = Number(localStorage.getItem("lastBoardId")) || 30;

    for (let i = lastId; i >= 1; i--) {
      try {
        const res = await axiosInstance.get(`/boards/${i}`);
        if (res.data) temp.push(res.data);
      } catch (e) {
        // 삭제된 게시판 무시
      }
    }

    setBoards(temp.reverse()); // 다시 정방향 정렬
  };

  const handleEdit = async (board) => {
    const newTitle = prompt("새 게시판 제목을 입력하세요", board.title);
    if (!newTitle || newTitle === board.title) return;
    try {
      await updateBoard(board.boardId, { ...board, title: newTitle });
      alert("✅ 수정 완료");
      fetchBoards();
    } catch (err) {
      console.error("❌ 수정 실패", err);
    }
  };

  const handleDelete = async (board) => {
    if (!window.confirm("정말 이 게시판을 삭제하시겠습니까?")) return;
    try {
      await deleteBoard(board.boardId);
      alert("✅ 삭제 완료");
      fetchBoards();
    } catch (err) {
      console.error("❌ 삭제 실패", err);
    }
  };

  return (
    <List>
      {boards.map((board) => (
        <Item key={board.boardId}>
          <TitleButton onClick={() => navigate(`/boards/${board.boardId}`)}>
            📌 {board.title || "제목 없음"}
          </TitleButton>
          <ButtonGroup>
            <ActionButton variant="edit" onClick={() => handleEdit(board)}>
              수정
            </ActionButton>
            <ActionButton variant="delete" onClick={() => handleDelete(board)}>
              삭제
            </ActionButton>
          </ButtonGroup>
        </Item>
      ))}
    </List>
  );
}
