import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useBookStore from "../store/useBookStore";
import BookForm from "../components/BookForm";
import CenteredContainer from "../components/CenteredContainer";

function EditBookPage() {
  const { id } = useParams();
  const bookId = parseInt(id, 10);
  const navigate = useNavigate();
  const { books, updateBook } = useBookStore();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [status, setStatus] = useState("읽고 싶은 책");
  const [rating, setRating] = useState(3);

  useEffect(() => {
    const foundBook = books.find((b) => b.id === bookId);
    if (foundBook) {
      setTitle(foundBook.title);
      setAuthor(foundBook.author);
      setImageUrl(foundBook.imageUrl || "");
      setStatus(foundBook.status || "읽고 싶은 책");
      setRating(foundBook.rating || 3);
      setLoaded(true);
    }
  }, [books, bookId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author) return alert("모든 필드를 입력해주세요!");

    updateBook(bookId, { title, author, imageUrl, status, rating });
    navigate("/books");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result); // Base64 문자열 저장
      };
      reader.readAsDataURL(file);
    }
  };

  if (!loaded) return <div>로딩 중입니다...</div>;

  return (
    <CenteredContainer>
      <h2>✏️ 책 수정</h2>
      <BookForm
        title={title}
        author={author}
        image={imageUrl}
        status={status}
        rating={rating}
        onChangeTitle={(e) => setTitle(e.target.value)}
        onChangeAuthor={(e) => setAuthor(e.target.value)}
        onChangeImage={handleImageChange}
        onChangeStatus={(e) => setStatus(e.target.value)}
        onChangeRating={(e) => setRating(Number(e.target.value))}
        onSubmit={handleSubmit}
        buttonLabel="수정하기"
      />
    </CenteredContainer>
  );
}

export default EditBookPage;
