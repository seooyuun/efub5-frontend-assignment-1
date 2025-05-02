import React from "react";
import TodoTemplate from "../components/TodoTemplate";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Button = styled.button`
  background-color: #bddde4;
  border: none;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  padding: 10px 24px;
  font-family: "DungGeunMo";
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

function Playlist() {
  const navigate = useNavigate();

  return (
    <>
      <Button onClick={() => navigate("/")}>⬅️ 돌아가기</Button>
      <TodoTemplate>
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h2>🎵 나의 플레이리스트</h2>
          <ul>
            <li>
              <a
                href="https://www.youtube.com/watch?v=DWcJFNfaw9c"
                target="_blank"
                rel="noreferrer"
              >
                집중용 Lo-fi 음악
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/watch?v=hHW1oY26kxQ"
                target="_blank"
                rel="noreferrer"
              >
                Chill 공부 브금
              </a>
            </li>
          </ul>
        </div>
      </TodoTemplate>
    </>
  );
}

export default Playlist;
