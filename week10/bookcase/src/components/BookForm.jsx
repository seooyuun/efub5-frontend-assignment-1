import React from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 8px 14px;
  border: none;
  background-color: #3498db;
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`;

function BookForm({
  title,
  author,
  image,
  onChangeTitle,
  onChangeAuthor,
  onChangeImage,
  onSubmit,
  buttonLabel,
}) {
  return (
    <Form onSubmit={onSubmit}>
      <div>
        <Label>제목:</Label>
        <Input value={title} onChange={onChangeTitle} />
      </div>
      <div>
        <Label>저자:</Label>
        <Input value={author} onChange={onChangeAuthor} />
      </div>
      <div>
        <Label>책 이미지:</Label>
        <input type="file" accept="image/*" onChange={onChangeImage} />
        {image && (
          <img
            src={image}
            alt="preview"
            width="100"
            style={{ marginTop: "10px" }}
          />
        )}
      </div>
      <Button type="submit">{buttonLabel || "저장"}</Button>
    </Form>
  );
}

export default BookForm;
