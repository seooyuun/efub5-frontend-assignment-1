import React, { useState } from "react";
import useBookStore from "../store/useBookStore";
import { useNavigate } from "react-router-dom";
import BookForm from "../components/BookForm";
import CenteredContainer from "../components/CenteredContainer";

function AddBookPage() {
  const { addBook } = useBookStore();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const [imageUrl, setImageUrl] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author) return alert("모든 필드를 입력해주세요!");

    addBook({ title, author, read: false, imageUrl });
    navigate("/books");
  };

  return (
    <CenteredContainer>
      <h2>📖 새 책 추가</h2>
      <BookForm
        title={title}
        author={author}
        onChangeTitle={(e) => setTitle(e.target.value)}
        onChangeAuthor={(e) => setAuthor(e.target.value)}
        onChangeImage={handleImageChange}
        onSubmit={handleSubmit}
        buttonLabel="추가하기"
      />
    </CenteredContainer>
  );
}

export default AddBookPage;
