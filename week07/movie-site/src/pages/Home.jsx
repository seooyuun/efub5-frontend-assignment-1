import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import Header from "../components/Header";
import MovieCard from "../components/MovieCard";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const Wrapper = styled.div`
  position: relative;
`;

const ScrollContainer = styled.div`
  display: flex;
  gap: 30px;
  overflow-x: auto;
  padding: 20px;
  scroll-behavior: smooth;

  /* 스크롤바 숨김 */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Arrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(50, 50, 50, 0.6);
  color: white;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  z-index: 10;
  padding: 10px;

  ${(props) => (props.direction === "left" ? "left: 0" : "right: 0")};
`;

const ArrowLeftIcon = styled(FaArrowLeft)`
  font-size: 1.5rem;
  color: #fff;
`;

const ArrowRightIcon = styled(FaArrowRight)`
  font-size: 1.5rem;
  color: #fff;
`;

function Home() {
  const [movies, setMovies] = useState([]);
  const [sortBy, setSortBy] = useState("date_added");
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get("https://yts.mx/api/v2/list_movies.json", {
          params: { sort_by: sortBy },
        });
        setMovies(res.data.data.movies);
      } catch (error) {
        console.error("영화 데이터를 불러오는 중 오류 발생:", error);
      }
    };
    fetchMovies();
  }, [sortBy]);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 400;
    if (container) {
      container.scrollLeft +=
        direction === "left" ? -scrollAmount : scrollAmount;
    }
  };

  return (
    <>
      <Header sortBy={sortBy} setSortBy={setSortBy} />
      <Wrapper>
        <Arrow direction="left" onClick={() => scroll("left")}>
          <ArrowLeftIcon />
        </Arrow>
        <ScrollContainer ref={scrollRef}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ScrollContainer>
        <Arrow direction="right" onClick={() => scroll("right")}>
          <ArrowRightIcon />
        </Arrow>
      </Wrapper>
    </>
  );
}

export default Home;
