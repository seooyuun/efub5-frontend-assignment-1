import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #333;
  color: white;
  height: 80px;
`;

const Logo = styled.img`
  max-height: 90%;
`;

const Sort = styled.div`
  display: flex;
  gap: 10px;
  padding: 5px 10px;
  font-size: 1rem;
`;

const SortBtn = styled.button`
  background-color: ${({ active }) => (active ? "#ff0558" : "#666")};
  color: #fff;
  border: none;
  padding: 6px 14px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: ${({ active }) => (active ? "#ff0558" : "#888")};
  }
`;

const sortOptions = [
  { label: "인기순", value: "download_count" },
  { label: "제목순", value: "title" },
  { label: "연도순", value: "year" },
  { label: "평점순", value: "rating" },
];

function Header({ sortBy, setSortBy }) {
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
      </Sort>
    </HeaderContainer>
  );
}

export default Header;
