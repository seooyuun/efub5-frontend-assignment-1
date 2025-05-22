import React from "react";
import styled from "styled-components";

const DetailBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin: 0;
  line-height: 1.3;
`;

const Genre = styled.h3`
  font-size: 1.3rem;
  margin: 0;
`;

const Runtime = styled.p`
  font-size: 0.9rem;
  margin: 0;
`;

const Rating = styled.span`
  font-size: 1.2rem;
  color: #f39c12;
  margin: 0;
`;

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-top: 5px;
`;

function MovieDetail({ movie }) {
  return (
    <DetailBox>
      <Title>
        {movie.title} ({movie.year})
      </Title>
      <Genre>{movie.genres?.join(", ")}</Genre>
      <Runtime>{movie.runtime} min</Runtime>
      <Rating>⭐ {movie.rating}</Rating>
      {movie.description_full && (
        <Description>{movie.description_full}</Description>
      )}
    </DetailBox>
  );
}

export default MovieDetail;
