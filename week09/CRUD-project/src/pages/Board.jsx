import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BoardForm from "../components/boards/BoardForm";
import BoardList from "../components/boards/BoardList";
import {
  createBoard,
  getBoard,
  updateBoard,
  deleteBoard,
  getPostsInBoard,
} from "../apis/board";

const Container = styled.div`
  max-width: 700px;
  margin: 3rem auto;
  padding: 2rem;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
`;

export default function Board() {
  const [boards, setBoards] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const memberId = localStorage.getItem("memberId");

  const fetchBoards = async () => {
    try {
      const res = await getPostsInBoard(0); // 혹은 게시판 목록을 가져오는 별도 API가 있으면 교체
      setBoards(res.data);
    } catch (err) {
      console.error("❌ 게시판 목록 불러오기 실패", err);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await createBoard({
        title,
        description: "기본 설명입니다",
        notice: "공지 없음",
        ownerId: parseInt(memberId),
      });
      setTitle("");
      fetchBoards();
    } catch (err) {
      console.error("❌ 게시판 생성 실패", err);
    }
  };

  const handleEdit = async (board) => {
    const newTitle = prompt("새 게시판 이름을 입력하세요", board.title);
    if (!newTitle || newTitle === board.title) return;
    try {
      await updateBoard(board.boardId, {
        ...board,
        title: newTitle,
      });
      fetchBoards();
    } catch (err) {
      console.error("❌ 게시판 수정 실패", err);
    }
  };

  const handleDelete = async (boardId) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await deleteBoard(boardId);
      fetchBoards();
    } catch (err) {
      console.error("❌ 게시판 삭제 실패", err);
    }
  };

  const handleSelect = (boardId) => {
    navigate(`/boards/${boardId}/posts`);
  };

  return (
    <Container>
      <Title>📚 게시판 목록</Title>
      <BoardForm
        title={title}
        setTitle={setTitle}
        onSubmit={handleSubmit}
        onSuccess={fetchBoards}
      />
      <BoardList
        boards={boards}
        onSelect={handleSelect}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </Container>
  );
}
