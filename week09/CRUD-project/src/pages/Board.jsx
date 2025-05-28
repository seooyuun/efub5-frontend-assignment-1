import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BoardList from "../components/boards/BoardList";
import BoardModal from "../components/boards/BoardModal";
import axiosInstance from "../apis/axiosInstance";

const Container = styled.div`
  max-width: 700px;
  margin: 3rem auto;
  padding: 2rem;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  display: block;
  margin: 0 auto 2rem;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  background-color: #3c82f6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #265ddc;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export default function Board() {
  const [boards, setBoards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const fetchBoards = async () => {
    try {
      const res = await axiosInstance.get("/boards"); // 백엔드에서 목록 API가 없다면 더미 데이터로 대체
      setBoards(res.data);
    } catch (err) {
      console.error("❌ 게시판 목록 불러오기 실패", err);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const handleSelect = (boardId) => {
    navigate(`/boards/${boardId}`);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // ✅ BoardModal에서 새 게시판 등록 후 해당 페이지로 이동하도록
  const handleCreateSuccess = (newBoardId) => {
    setShowModal(false);
    navigate(`/boards/${newBoardId}`);
  };

  return (
    <Container>
      <Title>게시판</Title>
      <Button onClick={handleOpenModal}>➕ 새 게시판 만들기</Button>
      <BoardList boards={boards} onSelect={handleSelect} />
      {showModal && (
        <Overlay>
          <BoardModal
            onClose={handleCloseModal}
            onCreated={handleCreateSuccess}
          />
        </Overlay>
      )}
    </Container>
  );
}
