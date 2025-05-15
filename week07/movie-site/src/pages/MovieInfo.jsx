import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import MovieDetail from "../components/MovieDetail";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  padding: 20px;
  gap: 40px;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: center;
`;

const Poster = styled.img`
  width: 300px;
  border-radius: 10px;
  object-fit: cover;
`;

const BackBtn = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: #333;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #ff0558;
  }
`;

function MovieInfo() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(
          "https://yts.mx/api/v2/movie_details.json",
          {
            params: { movie_id: id },
          }
        );
        setMovie(res.data.data.movie);
      } catch (error) {
        console.error("영화 상세 정보를 불러오는 중 오류 발생:", error);
      }
    };
    fetchMovie();
  }, [id]);

  if (!movie) return <p style={{ padding: "20px" }}>Loading...</p>;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container>
        <BackBtn onClick={() => navigate("/")}>Home</BackBtn>
        <Poster src={movie.large_cover_image} alt={movie.title} />
        <MovieDetail movie={movie} />
      </Container>
    </div>
  );
}

export default MovieInfo;
