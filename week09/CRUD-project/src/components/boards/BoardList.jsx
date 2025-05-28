import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const List = styled.ul`
  list-style: none;
  padding: 0;
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
    variant === "edit" ? "#4caf50" : "#f44336"};
  color: white;

  &:hover {
    opacity: 0.9;
  }
`;

export default function BoardList({ boards, onSelect, onEdit, onDelete }) {
  return (
    <List>
      {boards.map((board) => (
        <Item key={board.boardId}>
          <TitleButton onClick={() => onSelect(board.boardId)}>
            📌 {board.title}
          </TitleButton>
          <ButtonGroup>
            <ActionButton variant="edit" onClick={() => onEdit(board)}>
              ✏️ 수정
            </ActionButton>
            <ActionButton
              variant="delete"
              onClick={() => onDelete(board.boardId)}
            >
              🗑 삭제
            </ActionButton>
          </ButtonGroup>
        </Item>
      ))}
    </List>
  );
}
