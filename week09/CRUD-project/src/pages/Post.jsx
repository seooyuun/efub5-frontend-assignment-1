import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CreatePost from "../components/posts/CreatePost";
import axiosInstance from "../apis/axiosInstance";
import { useNavigate } from "react-router-dom";
import PageTemplate from "../components/common/PageTemplate";

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
`;

const PostItem = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  width: 90%;
`;

const Meta = styled.small`
  color: #555;
`;

export default function Post() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const res = await axiosInstance.get("/posts");
      setPosts(res.data);
    } catch (err) {
      console.error("❌ 게시글 목록 불러오기 실패", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <PageTemplate>
      <Title>📝 게시글 작성</Title>
      <CreatePost onSuccess={fetchPosts} />

      <Title>📄 전체 게시글 목록</Title>
      {posts.length === 0 ? (
        <p>게시글이 없습니다.</p>
      ) : (
        posts.map((post) => (
          <PostItem
            onClick={() => navigate(`/posts/${post.postId}`)}
            key={post.postId}
          >
            <strong>{post.title}</strong>
            <p>{post.content}</p>
            <Meta>
              작성자: {post.anonymous ? "익명" : post.member.nickname} <br />
              게시판: {post.board.title}
            </Meta>
          </PostItem>
        ))
      )}
    </PageTemplate>
  );
}
