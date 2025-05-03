import React, { useState } from "react";
import styled from "styled-components";
import TodoTemplate from "../components/TodoTemplate";
import { useNavigate } from "react-router-dom";

const Button = styled.button`
  background-color: #bddde4;
  border: none;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  padding: 10px 24px;
  font-size: 16px;
  color: white;
  cursor: pointer;

  margin: 0 auto;
  z-index: 1;
  position: relative;

  &:hover {
    background-color: #9ec6f3;
  }
`;

const GalleryHeadBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  h1 {
    font-size: 40px;
    margin: 0;
    color: #495057;
  }

  height: 144px;
  padding: 48px 32px 24px 32px;
  border-bottom: 1px solid #e9ecef;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  padding: 24px;
`;

const ImageCard = styled.img`
  width: 100%;
  border-radius: 12px;
  &:hover {
    box-shadow: 0 0 12px 4px rgba(189, 221, 228, 0.7);
  }
`;

const GalleryButton = styled.button`
  background-color: #f0f4f8;
  border: 2px solid #bddde4;
  padding: 10px 20px;
  margin: 10px;
  border-radius: 10px;
  font-size: 16px;
  color: #495057;
  cursor: pointer;

  &:hover {
    background-color: #bddde4;
    color: white;
  }
`;

const images = [
  "/gallery-1.jpg",
  "/gallery-2.jpg",
  "/gallery-3.jpg",
  "/gallery-4.jpg",
  "/gallery-5.jpg",
  "/gallery-6.jpg",
  "/gallery-7.jpg",
  "/gallery-8.jpg",
  "/gallery-9.jpg",
];

const shuffleImages = () => {
  const shuffle = [...images].sort(() => Math.random() - 0.5);
  return shuffle.slice(0, 6);
};

function Gallery() {
  const navigate = useNavigate();
  const [randomPick, setRandomPick] = useState(shuffleImages());

  const shuffle = () => {
    setRandomPick(shuffleImages());
  };

  return (
    <>
      <Button onClick={() => navigate("/")}>⬅️ 돌아가기</Button>
      <Button onClick={() => navigate("/playlist")}>🎵 플레이리스트</Button>
      <TodoTemplate>
        <GalleryHeadBlock>
          <h1>My Gallery</h1>
          <div style={{ marginTop: "25px" }}>
            <GalleryButton onClick={shuffle}>👀 REFRESH</GalleryButton>
          </div>
        </GalleryHeadBlock>
        <ImageGrid>
          {randomPick.map((src, idx) => (
            <ImageCard key={idx} src={src} alt={`gallery-${idx}`} />
          ))}
        </ImageGrid>
      </TodoTemplate>
    </>
  );
}

export default Gallery;
