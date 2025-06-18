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

const Select = styled.select`
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  resize: none;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.4;
`;

const Button = styled.button`
  padding: 8px 14px;
  border: none;
  background-color: #90c8e9;
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #62b1de;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ReviewWrapper = styled(FormGroup)`
  margin-top: 1rem;
`;

const ImagePreview = styled.img`
  margin-top: 10px;
  width: 100px;
  border-radius: 4px;
`;

function BookForm({
  title,
  author,
  image,
  status,
  rating,
  review,
  onChangeTitle,
  onChangeAuthor,
  onChangeImage,
  onChangeStatus,
  onChangeRating,
  onChangeReview,
  onSubmit,
  buttonLabel,
}) {
  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label>제목:</Label>
        <Input value={title} onChange={onChangeTitle} />
      </FormGroup>

      <FormGroup>
        <Label>저자:</Label>
        <Input value={author} onChange={onChangeAuthor} />
      </FormGroup>

      <FormGroup>
        <Label>읽기 상태:</Label>
        <Select value={status} onChange={onChangeStatus}>
          <option value="읽고 싶은 책">읽고 싶은 책</option>
          <option value="읽고 있는 책">읽고 있는 책</option>
          <option value="읽은 책">읽은 책</option>
        </Select>
      </FormGroup>

      <FormGroup>
        <Label>별점:</Label>
        <Select value={rating} onChange={onChangeRating}>
          <option value={1}>⭐</option>
          <option value={2}>⭐⭐</option>
          <option value={3}>⭐⭐⭐</option>
          <option value={4}>⭐⭐⭐⭐</option>
          <option value={5}>⭐⭐⭐⭐⭐</option>
        </Select>
      </FormGroup>

      <ReviewWrapper>
        <Label>리뷰:</Label>
        <Textarea
          rows="3"
          placeholder="이 책에 대한 리뷰를 남겨주세요."
          value={review}
          onChange={onChangeReview}
        />
      </ReviewWrapper>

      <FormGroup>
        <Label>책 이미지:</Label>
        <Input type="file" accept="image/*" onChange={onChangeImage} />
        {image && <ImagePreview src={image} alt="preview" />}
      </FormGroup>

      <Button type="submit">{buttonLabel || "저장"}</Button>
    </Form>
  );
}

export default BookForm;
