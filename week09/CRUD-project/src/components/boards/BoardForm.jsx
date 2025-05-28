import React, { useState } from "react";
import styled from "styled-components";
import { createBoard } from "../../apis/board";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  height: 48px;
  font-size: 16px;
  padding: 0 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
`;

const Button = styled.button`
  height: 48px;
  font-size: 16px;
  line-height: 48px;
  padding: 0;
  text-align: center;
  background-color: #3c82f6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: #265ddc;
  }
`;

const Label = styled.label`
  font-weight: bold;
`;

export default function BoardForm({ onSuccess }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notice, setNotice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const rawId = localStorage.getItem("memberId");
    const ownerId = rawId !== null ? Number(rawId) : null;

    if (!ownerId) {
      alert("❌ 로그인 후 이용해주세요.");
      return;
    }

    try {
      await createBoard({ title, description, notice, ownerId });
      alert("✅ 게시판 생성 완료!");
      setTitle("");
      setDescription("");
      setNotice("");
      if (onSuccess) onSuccess(); // 목록 새로고침 콜백
    } catch (err) {
      console.error("❌ 게시판 생성 실패", err);
      alert("게시판 생성에 실패했습니다.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <Label>제목</Label>
        <Input
          type="text"
          placeholder="게시판 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <Label>설명</Label>
        <Input
          type="text"
          placeholder="게시판 설명"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <Label>공지사항</Label>
        <Input
          type="text"
          placeholder="공지사항 내용"
          value={notice}
          onChange={(e) => setNotice(e.target.value)}
          required
        />
      </div>
      <Button type="submit">➕ 게시판 등록</Button>
    </Form>
  );
}
