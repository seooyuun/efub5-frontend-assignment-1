import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axiosInstance from "../apis/axiosInstance";

const Container = styled.div`
  width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 12px;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
`;

const Content = styled.p`
  white-space: pre-wrap;
  margin-bottom: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const Button = styled.button`
  width: 30%;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  color: white;
  background-color: ${({ variant }) =>
    variant === "delete" ? "#D5E5D5" : "#ADB2D4"};

  &:hover {
    opacity: 0.9;
  }
`;

export default function PostMain() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [hearted, setHearted] = useState(false);
  const memberId = Number(localStorage.getItem("memberId"));

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axiosInstance.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        alert("❌ 게시글 조회 실패");
      }
    };

    fetchPost();
  }, [postId]);

  const handleHeart = async () => {
    try {
      await axiosInstance.post(`/posts/${postId}/hearts`, {
        memberId,
      });
      alert("💗 좋아요 등록!");
      setHearted(true);
    } catch (err) {
      alert("❌ 좋아요 실패");
    }
  };

  const handleUnheart = async () => {
    try {
      await axiosInstance.delete(`/posts/${postId}/hearts`, {
        params: { memberId },
      });
      alert("💔 좋아요 취소!");
      setHearted(false);
    } catch (err) {
      alert("❌ 좋아요 취소 실패");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await axiosInstance.delete(`/posts/${postId}`);
      alert("✅ 삭제 완료");
      navigate(-1); // 이전 페이지로 이동
    } catch (err) {
      alert("❌ 삭제 실패");
    }
  };

  const handleEdit = async () => {
    const newTitle = prompt("새 제목", post.title);
    const newContent = prompt("새 내용", post.content);
    if (!newTitle || !newContent) return;
    try {
      await axiosInstance.put(`/posts/${postId}`, {
        ...post,
        title: newTitle,
        content: newContent,
      });
      alert("✅ 수정 완료");
      setPost((prev) => ({
        ...prev,
        title: newTitle,
        content: newContent,
      }));
    } catch (err) {
      alert("❌ 수정 실패");
    }
  };

  if (!post) return <Container>⏳ 로딩 중...</Container>;

  return (
    <Container>
      <Title>{post.title}</Title>
      <Content>{post.content}</Content>
      <p>작성자: {post.anonymous ? "익명" : post.member?.nickname}</p>
      <ButtonGroup>
        <Button onClick={handleEdit}>수정</Button>
        <Button variant="delete" onClick={handleDelete}>
          삭제
        </Button>
        <Button variant="heart" onClick={hearted ? handleUnheart : handleHeart}>
          {hearted ? "💔 좋아요 취소" : "💗 좋아요"}
        </Button>
      </ButtonGroup>
    </Container>
  );
}
