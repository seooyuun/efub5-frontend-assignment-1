import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Item = styled.li`
  margin-bottom: 1rem;
  border-bottom: 1px solid #ccc;
  padding-bottom: 0.5rem;
`;

const Info = styled.div`
  font-weight: bold;
`;

const Status = styled.span`
  margin-left: 10px;
  color: ${({ read }) => (read ? "green" : "red")};
`;

const ButtonGroup = styled.div`
  margin-top: 0.5rem;

  button {
    margin-right: 8px;
  }
`;

function BookItem({ book, onToggle, onDelete, onEdit }) {
  const navigate = useNavigate();

  return (
    <Item onClick={() => navigate(`/books/${book.id}`)}>
      <Info>
        {book.title} - {book.author}
        <Status read={book.read}>{book.read ? "✅ 읽음" : "❌ 미읽음"}</Status>
      </Info>
      <ButtonGroup onClick={(e) => e.stopPropagation()}>
        <button onClick={() => onToggle(book.id)}>읽음 토글</button>
        <button onClick={() => onEdit(book.id)}>수정</button>
        <button onClick={() => onDelete(book.id)}>삭제</button>
      </ButtonGroup>
    </Item>
  );
}

export default BookItem;
