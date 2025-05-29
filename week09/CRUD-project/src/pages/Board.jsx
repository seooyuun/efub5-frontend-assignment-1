import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BoardList from "../components/boards/BoardList";
import BoardModal from "../components/boards/BoardModal";
import axiosInstance from "../apis/axiosInstance";
import PageTemplate from "../components/common/PageTemplate";

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  display: block;
  margin: 0 auto 2rem;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  background-color: #c7d9dd;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #adb2d4;
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

  const fetchBoards = async () => {
    const temp = [];
    const lastId = Number(localStorage.getItem("lastBoardId")) || 30;

    for (let i = lastId; i >= 1; i--) {
      try {
        const res = await axiosInstance.get(`/boards/${i}`);
        if (res.data) temp.push(res.data);
      } catch (e) {
        // 삭제된 게시판 제외
      }
    }

    setBoards(temp.reverse());
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCreateSuccess = () => {
    setShowModal(false);
    fetchBoards(); // 게시판 목록 새로고침
  };

  return (
    <PageTemplate>
      <Title>게시판</Title>
      <Button onClick={handleOpenModal}>➕ 새 게시판 만들기</Button>
      <BoardList boards={boards} setBoards={setBoards} />

      {showModal && (
        <Overlay>
          <BoardModal
            onClose={handleCloseModal}
            onCreated={handleCreateSuccess}
          />
        </Overlay>
      )}
    </PageTemplate>
  );
}
