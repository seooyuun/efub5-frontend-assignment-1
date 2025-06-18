import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useBookStore from "../store/useBookStore";
import styled from "styled-components";

const Container = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Image = styled.img`
  margin-top: 1rem;
  width: 200px;
  border-radius: 8px;
`;

const BackButton = styled.button`
  margin-top: 2rem;
  padding: 8px 12px;
  background-color: #bdc3c7;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #95a5a6;
  }
`;

function BookDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const bookId = parseInt(id, 10);
  const { books } = useBookStore();

  const book = books.find((b) => b.id === bookId);

  if (!book) return <Container>책을 찾을 수 없습니다.</Container>;

  return (
    <Container>
      <h2>{book.title}</h2>
      <p>
        <strong>저자:</strong> {book.author}
      </p>
      <p>
        <strong>읽음 여부:</strong> {book.read ? "✅ 읽음" : "❌ 미읽음"}
      </p>
      {book.imageUrl && <Image src={book.imageUrl} alt="책 이미지" />}
      <BackButton onClick={() => navigate("/books")}>
        ← 목록으로 돌아가기
      </BackButton>
    </Container>
  );
}

export default BookDetailPage;
