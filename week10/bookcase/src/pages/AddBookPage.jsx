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
  const [status, setStatus] = useState("읽고 싶은 책");

  const [imageUrl, setImageUrl] = useState("");
  const [rating, setRating] = useState(3);
  const [review, setReview] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author) return alert("모든 필드를 입력해주세요!");

    addBook({ title, author, status, rating, imageUrl, review });
    navigate("/books");
  };

  return (
    <CenteredContainer>
      <h2>📖 새 책 추가</h2>
      <BookForm
        title={title}
        author={author}
        image={imageUrl}
        status={status}
        rating={rating}
        review={review}
        onChangeTitle={(e) => setTitle(e.target.value)}
        onChangeAuthor={(e) => setAuthor(e.target.value)}
        onChangeImage={handleImageChange}
        onChangeStatus={(e) => setStatus(e.target.value)}
        onChangeRating={(e) => setRating(Number(e.target.value))}
        onChangeReview={(e) => setReview(e.target.value)}
        onSubmit={handleSubmit}
        buttonLabel="추가하기"
      />
    </CenteredContainer>
  );
}

export default AddBookPage;
