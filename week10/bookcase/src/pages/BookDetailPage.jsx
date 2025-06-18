import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useBookStore from "../store/useBookStore";
import styled from "styled-components";

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 2rem;
  align-items: flex-start;
`;

const InfoSection = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 200px;
  border-radius: 8px;
`;

const BackButton = styled.button`
  margin-top: 2rem;
  padding: 8px 12px;
  background-color: #bbb;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #999;
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
      <ContentWrapper>
        <InfoSection>
          <h2>{book.title}</h2>
          <p>
            <strong>저자:</strong> {book.author}
          </p>
          <p>
            <strong>상태:</strong> {book.status}
          </p>
          <p>
            <strong>별점:</strong> {"⭐".repeat(book.rating)}
          </p>
          <p>
            <strong>리뷰:</strong> {book.review || "작성된 리뷰가 없습니다."}
          </p>
        </InfoSection>
        {book.imageUrl && <Image src={book.imageUrl} alt="책 이미지" />}
      </ContentWrapper>
      <BackButton onClick={() => navigate("/books")}>
        ← 목록으로 돌아가기
      </BackButton>
    </Container>
  );
}

export default BookDetailPage;
