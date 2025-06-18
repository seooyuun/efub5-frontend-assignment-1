import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useBookStore from "../store/useBookStore";

const Item = styled.li`
  margin-bottom: 1rem;
  border-bottom: 1px solid #ccc;
  padding-bottom: 0.5rem;
  cursor: pointer;
`;

const Info = styled.div`
  font-weight: bold;
`;

const Status = styled.span`
  margin-left: 10px;
`;

const ButtonGroup = styled.div`
  margin-top: 0.5rem;

  button {
    margin-right: 8px;
    background-color: #eee;
  }
`;

const getNextStatus = (current) => {
  if (current === "읽고 싶은 책") return "읽고 있는 책";
  if (current === "읽고 있는 책") return "읽은 책";
  return "읽고 싶은 책";
};

const getStatusIcon = (status) => {
  if (status === "읽은 책") return "🚩";
  if (status === "읽고 있는 책") return "📖";
  return "💖"; // 읽고 싶은 책
};

const Rating = styled.div`
  margin-top: 4px;
  font-size: 16px;
`;

function BookItem({ book, onDelete, onEdit }) {
  const navigate = useNavigate();
  const { updateStatus } = useBookStore();

  const handleStatusChange = (e) => {
    e.stopPropagation();
    const next = getNextStatus(book.status);
    updateStatus(book.id, next);
  };

  return (
    <Item onClick={() => navigate(`/books/${book.id}`)}>
      <Info>
        {book.title} - {book.author}
        <Status>
          {getStatusIcon(book.status)} {book.status}
        </Status>
      </Info>
      <Rating>{"⭐".repeat(book.rating)}</Rating>

      <ButtonGroup onClick={(e) => e.stopPropagation()}>
        <button onClick={handleStatusChange}>상태 변경</button>
        <button onClick={() => onEdit(book.id)}>수정</button>
        <button
          onClick={() => {
            const confirmed = window.confirm("이 책을 삭제하시겠습니까?");
            if (confirmed) {
              onDelete(book.id);
            }
          }}
        >
          삭제
        </button>
      </ButtonGroup>
    </Item>
  );
}

export default BookItem;
