import React, { useState } from "react";
import TodoTemplate from "../components/TodoTemplate";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// 페이지 이동 버튼
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
  position: relative;

  &:hover {
    background-color: #d5e9ee;
  }
`;

// 플레이리스트 페이지 헤더
const PlaylistHeadBlock = styled.div`
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

// 플레이리스트 버튼
const TrackButton = styled.button`
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

function Playlist() {
  const navigate = useNavigate();
  const [embedUrl, setEmbedUrl] = useState(null);

  return (
    <>
      {/* 상단 네비게이션 버튼 */}
      <Button onClick={() => navigate("/")}>⬅️ 돌아가기</Button>
      <Button onClick={() => navigate("/gallery")}>🖼️ 갤러리</Button>
      {/* 투두리스트 템플릿과 동일하도록 */}
      <TodoTemplate>
        <PlaylistHeadBlock>
          <h1>My Playlist</h1>
          <div style={{ marginTop: "25px" }}>
            {/* Apple Music embed URL을 설정 */}
            <TrackButton
              onClick={() =>
                setEmbedUrl(
                  "https://embed.music.apple.com/kr/playlist/pl.u-9N9LXPNCx8jpE9e"
                )
              }
            >
              🎵 I LOVE BAND
            </TrackButton>
            <TrackButton
              onClick={() =>
                setEmbedUrl(
                  "https://embed.music.apple.com/kr/playlist/pl.u-d2b05dVTMZlqz0A"
                )
              }
            >
              🎵 I LOVE J-POP
            </TrackButton>
          </div>
        </PlaylistHeadBlock>

        {!embedUrl && (
          <p
            style={{ textAlign: "center", color: "#495057", marginTop: "20px" }}
          >
            플레이리스트 버튼을 눌러보세요 🎶
          </p>
        )}

        {embedUrl && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "15px",
            }}
          >
            <iframe
              allow="autoplay *; encrypted-media *;"
              height="450"
              style={{
                width: "100%",
                maxWidth: "660px",
                overflow: "hidden",
                background: "transparent",
              }}
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
              src={embedUrl}
              title="Apple Music Playlist"
            ></iframe>
          </div>
        )}
      </TodoTemplate>
    </>
  );
}

export default Playlist;
