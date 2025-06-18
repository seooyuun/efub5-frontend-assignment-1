import React from "react";
import { useNavigate } from "react-router-dom";
import useBookStore from "../store/useBookStore";
import BookItem from "../components/BookItem";
import styled from "styled-components";

const Container = styled.div`
  max-width: 600px;
  margin: 2rem auto;
`;

const Title = styled.h2`
  color: #333;
`;

const AddButton = styled.button`
  margin-bottom: 1rem;
  padding: 8px 12px;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #27ae60;
  }
`;

function BooksPage() {
  const navigate = useNavigate();
  const { books, deleteBook, toggleRead, selectBook } = useBookStore();

  const onEditClick = (id) => {
    selectBook(id);
    navigate(`/edit/${id}`);
  };

  return (
    <Container>
      <Title>📚 내 책장</Title>
      <AddButton onClick={() => navigate("/add")}>+ 새 책 추가</AddButton>
      <ul>
        {books.map((book) => (
          <BookItem
            key={book.id}
            book={book}
            onToggle={toggleRead}
            onDelete={deleteBook}
            onEdit={onEditClick}
          />
        ))}
      </ul>
    </Container>
  );
}

export default BooksPage;
