import React from "react";

const Playlist = () => (
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
);

export default Playlist;
