import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function MovieInfo() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios
      .get(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
      .then((res) => setMovie(res.data.data.movie));
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>
        {movie.title} ({movie.year})
      </h2>
      <img src={movie.large_cover_image} alt={movie.title} />
      <p>{movie.description_full}</p>
    </div>
  );
}

export default MovieInfo;
