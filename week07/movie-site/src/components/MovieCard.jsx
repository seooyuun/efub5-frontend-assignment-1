import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Card = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
`;

const Poster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
`;

const Title = styled.h3`
  text-align: center;
  font-size: 1rem;
  margin: 0;
`;

const Year = styled.p`
  font-size: 0.9rem;
  margin: 5px 0 0 0;
`;

// 카드 전체에 호버 시 오버레이가 나타남
const HoverCard = styled.div`
  width: 100%;
  aspect-ratio: 2 / 3;
  position: relative;

  &:hover ${Overlay} {
    opacity: 1;
  }
`;

function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`}>
      <HoverCard>
        <Card>
          <Poster src={movie.medium_cover_image} alt={movie.title} />
          <Overlay>
            <Title>{movie.title}</Title>
            <Year>{movie.year}</Year>
          </Overlay>
        </Card>
      </HoverCard>
    </Link>
  );
}

export default MovieCard;
