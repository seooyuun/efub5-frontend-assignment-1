import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { createPost } from "../apis/post";
import { getPostsInBoard, getBoard } from "../apis/board";

const Container = styled.div`
  max-width: 700px;
  margin: 3rem auto;
  padding: 2rem;
`;

const Header = styled.div`
  margin-bottom: 2rem;
  border-bottom: 1px solid #ddd;
  padding-bottom: 1rem;
`;

const Title = styled.h2`
  margin-bottom: 0.5rem;
`;

const Info = styled.p`
  margin: 0.3rem 0;
`;

const PostList = styled.ul`
  list-style: none;
  padding: 0;
`;

const PostItem = styled.li`
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 0.6rem 1.2rem;
  background-color: #3c82f6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  padding: 0.6rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const TextArea = styled.textarea`
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: vertical;
`;

const CheckboxLabel = styled.label`
  margin: 0.5rem 0;
`;

export default function BoardPosts() {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState(null);
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [anonymous, setAnonymous] = useState(false);

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

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const writerId = Number(localStorage.getItem("memberId"));
    try {
      await createPost({
        title,
        content,
        anonymous,
        writerId,
        boardId: Number(boardId),
      });
      alert("✅ 게시글 등록 완료");
      setTitle("");
      setContent("");
      setAnonymous(false);
      setShowForm(false);

      const updated = await getPostsInBoard(boardId);
      setPosts(updated.data);
    } catch (err) {
      alert("❌ 게시글 작성 실패");
    }
  };

  if (!board) return <Container>⏳ 게시판 로딩 중...</Container>;

  return (
    <Container>
      <Header>
        <Title>{board.title}</Title>
        <Info>📄 설명: {board.description || "없음"}</Info>
        <Info>📌 공지사항: {board.notice || "없음"}</Info>
        <Button onClick={() => setShowForm((prev) => !prev)}>
          ➕ 게시글 작성
        </Button>
      </Header>

      {showForm && (
        <Form onSubmit={handleCreatePost}>
          <Input
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextArea
            placeholder="내용"
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <CheckboxLabel>
            <input
              type="checkbox"
              checked={anonymous}
              onChange={(e) => setAnonymous(e.target.checked)}
            />
            익명으로 작성
          </CheckboxLabel>
          <Button type="submit">작성하기</Button>
        </Form>
      )}

      <PostList>
        {posts.map((post) => (
          <PostItem key={post.postId}>
            <strong>{post.title}</strong>
            <p>{post.content}</p>
            <small>
              작성자: {post.anonymous ? "익명" : post.member.nickname}
            </small>
          </PostItem>
        ))}
      </PostList>
    </Container>
  );
}
