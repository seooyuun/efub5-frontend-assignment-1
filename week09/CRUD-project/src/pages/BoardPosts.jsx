import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getPostsInBoard, getBoard } from "../apis/board";
import PageTemplate from "../components/common/PageTemplate";

const Header = styled.div`
  margin-bottom: 2rem;
  border-bottom: 1px solid #ddd;
  padding-bottom: 1rem;
  text-align: center;
  width: 500px;
`;

const Title = styled.h2`
  margin-bottom: 0.5rem;
`;

const Info = styled.p`
  margin: 0.3rem 0;
`;

const PostList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  list-style: none;
  padding: 0;
`;

const PostItem = styled.li`
  list-style-type: none;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 1rem;
  width: 230px;
`;

const Button = styled.button`
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 0.6rem 1.2rem;
  background-color: #c7d9dd;
  color: white;
  border: none;
  border-radius: 8px;
  width: 250px;
  cursor: pointer;
`;

export default function BoardPosts() {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const boardRes = await getBoard(boardId);
        setBoard(boardRes);

        const postRes = await getPostsInBoard(boardId);
        setPosts(postRes.data);
      } catch (err) {
        console.error("❌ 게시판/게시글 불러오기 실패", err);
      }
    };
    fetchBoard();
  }, [boardId]);

  if (!board) return <PageTemplate>⏳ 게시판 로딩 중...</PageTemplate>;

  return (
    <PageTemplate>
      <Header>
        <Title>{board.title}</Title>
        <Info>📄 설명: {board.description || "없음"}</Info>
        <Info>📌 공지사항: {board.notice || "없음"}</Info>
        <Button onClick={() => navigate("/posts")}>➕ 게시글 작성</Button>
      </Header>

      <PostList>
        {posts.map((post) => (
          <PostItem
            onClick={() => navigate(`/posts/${post.postId}`)}
            key={post.postId}
          >
            <strong>{post.title}</strong>
            <p>{post.content}</p>
            <small>
              작성자: {post.anonymous ? "익명" : post.member.nickname}
            </small>
          </PostItem>
        ))}
      </PostList>
    </PageTemplate>
  );
}
