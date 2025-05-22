import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../store/themeSlice";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background-color: ${({ theme }) => theme.hdbg};
  color: #ffffff;
  height: 70px;
`;

const Logo = styled.img`
  max-height: 100%;
`;

const Sort = styled.div`
  display: flex;
  gap: 8px;
  padding: 5px 10px;
`;

const SortBtn = styled.button`
  @font-face {
    font-family: "Cafe24ClassicType-Regular";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2210-2@1.0/Cafe24ClassicType-Regular.woff2")
      format("woff2");
    font-weight: normal;
    font-style: normal;
  }
  font-family: "Cafe24ClassicType-Regular";
  font-size: 0.9rem;
  background-color: transparent;
  color: ${({ active }) => (active ? "#ff0558" : "#fff")};
  border: none;
  padding: 6px 15px;
  cursor: pointer;

  &:hover {
    color: ${({ active }) => "#ff0558"};
  }
`;

const sortOptions = [
  { label: "popularity", value: "download_count" },
  { label: "title", value: "title" },
  { label: "year", value: "year" },
  { label: "rating", value: "rating" },
];

const ToggleBtn = styled.button`
  background-color: #666;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #999;
  }
`;

function Header({ sortBy, setSortBy }) {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);

  return (
    <HeaderContainer>
      <Logo
        src="https://oopy.lazyrockets.com/api/v2/notion/image?src=https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Ffc327ed6-4e98-4bfc-a3b9-86d14dbc3245%2FWATCHA_PEDIA_LOGO.svg&blockId=314b8d15-5712-454d-b22e-37c72f131885"
        alt="WATCHA PEDIA LOGO"
      />
      <Sort>
        {sortOptions.map((option) => (
          <SortBtn
            key={option.value}
            active={sortBy === option.value}
            onClick={() => setSortBy(option.value)}
          >
            {option.label}
          </SortBtn>
        ))}

        <ToggleBtn onClick={() => dispatch(toggleTheme())}>
          {mode === "light" ? "☀️" : "🌙"}
        </ToggleBtn>
      </Sort>
    </HeaderContainer>
  );
}

export default Header;
