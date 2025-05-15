import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Header from "../components/Header";
import MovieCard from "../components/MovieCard";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 24px;
  padding: 20px;
`;

function Home() {
  const [movies, setMovies] = useState([]);
  const [sortBy, setSortBy] = useState("date_added");

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

  return (
    <>
      <Header sortBy={sortBy} setSortBy={setSortBy} />
      <Grid>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Grid>
    </>
  );
}

export default Home;
