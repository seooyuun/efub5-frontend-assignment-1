import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axiosInstance from "../../apis/axiosInstance";

const Form = styled.form`
  display: flex;
  width: 600px;
  flex-direction: column;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  padding: 0.6rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const TextArea = styled.textarea`
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 1rem;
  resize: vertical;
`;

const CheckboxLabel = styled.label`
  margin: 0.5rem 0;
`;

const Button = styled.button`
  margin-top: 1rem;
  padding: 0.6rem 1.2rem;
  background-color: #c7d9dd;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #adb2d4;
  }
`;

export default function CreatePost({ onSuccess }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [boardTitle, setBoardTitle] = useState("");
  const [boardList, setBoardList] = useState([]); // 모든 게시판 정보 저장용

  useEffect(() => {
    const fetchBoards = async () => {
      const temp = [];
      for (let i = 1; i <= 30; i++) {
        try {
          const res = await axiosInstance.get(`/boards/${i}`);
          if (res.data) temp.push(res.data);
        } catch (e) {
          // 무시
        }
      }
      setBoardList(temp); // [{ boardId: 1, title: '공지사항' }, ...]
    };

    fetchBoards();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const writerId = Number(localStorage.getItem("memberId"));
    const matched = boardList.find((b) => b.title === boardTitle);

    if (!matched) {
      alert("❌ 존재하지 않는 게시판입니다.");
      return;
    }

    const boardId = matched.boardId;

    try {
      await axiosInstance.post("/posts", {
        title,
        content,
        anonymous,
        writerId,
        boardId,
      });
      alert("✅ 게시글 작성 완료!");
      setTitle("");
      setContent("");
      setAnonymous(false);
      setBoardTitle("");
      onSuccess(); // 새로고침
    } catch (err) {
      alert("❌ 게시글 작성 실패");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        placeholder="게시판 제목 (예: 공지사항)"
        value={boardTitle}
        onChange={(e) => setBoardTitle(e.target.value)}
        required
      />
      <Input
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <TextArea
        placeholder="내용"
        rows={5}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <CheckboxLabel>
        <input
          type="checkbox"
          checked={anonymous}
          onChange={(e) => setAnonymous(e.target.checked)}
        />
        익명으로 작성
      </CheckboxLabel>
      <Button type="submit">작성하기</Button>
    </Form>
  );
}
