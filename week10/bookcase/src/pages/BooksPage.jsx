import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useBookStore from "../store/useBookStore";
import BookItem from "../components/BookItem";
import styled from "styled-components";

const Container = styled.div`
  max-width: 600px;
  margin: 2rem auto;
`;

const Title = styled.h2`
  font-size: 30px;
  margin-bottom: 16px;
  color: #333;
`;

const AddButton = styled.button`
  font-size: 16px;
  padding: 8px 12px;
  background-color: #90c8e9;
  color: white;
  border: 0;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #62b1de;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 8px;
  margin: 1rem 0;
`;

const FilterButton = styled.button`
  padding: 6px 12px;
  font-size: 14px;
  background-color: ${({ $active }) => ($active ? "#90c8e9" : "#ccc")};
  color: white;
  border: 0;
  border-radius: 4px;
  cursor: pointer;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const SortSelect = styled.select`
  padding: 6px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

function BooksPage() {
  const navigate = useNavigate();
  const { books, deleteBook, selectBook } = useBookStore();

  const [filter, setFilter] = useState("전체");

  const filteredBooks = books.filter((book) => {
    if (filter === "전체") return true;
    return book.status === filter;
  });

  const [sortOption, setSortOption] = useState("최신순");

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortOption === "최신순") return b.id - a.id;
    if (sortOption === "오래된순") return a.id - b.id;
    if (sortOption === "별점순") return b.rating - a.rating;
    return 0;
  });

  const onEditClick = (id) => {
    selectBook(id);
    navigate(`/edit/${id}`);
  };

  return (
    <Container>
      <Title>🚪 내 책장</Title>
      <AddButton onClick={() => navigate("/add")}>+ 새 책 추가</AddButton>

      <HeaderRow>
        <FilterGroup>
          {["전체", "읽은 책", "읽고 있는 책", "읽고 싶은 책"].map((type) => (
            <FilterButton
              key={type}
              $active={filter === type}
              onClick={() => setFilter(type)}
            >
              {type}
            </FilterButton>
          ))}
        </FilterGroup>

        <SortSelect
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="최신순">최신순</option>
          <option value="오래된순">오래된순</option>
          <option value="별점순">별점순</option>
        </SortSelect>
      </HeaderRow>

      <ul>
        {sortedBooks.map((book) => (
          <BookItem
            key={book.id}
            book={book}
            onDelete={deleteBook}
            onEdit={onEditClick}
          />
        ))}
      </ul>
    </Container>
  );
}

export default BooksPage;
