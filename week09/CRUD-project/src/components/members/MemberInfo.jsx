import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../libs/axiosInstance";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  max-width: 600px;
  margin: 3rem auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 12px;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
`;

const Info = styled.p`
  margin: 0.5rem 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  ${({ variant }) =>
    variant === "edit"
      ? `
    background-color: #3c82f6;
    color: white;
  `
      : `
    background-color: #f44336;
    color: white;
  `}

  &:hover {
    opacity: 0.9;
  }
`;

export default function MemberInfo() {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await axiosInstance.get(`/members/${memberId}`);
        setMember(res.data);
      } catch (err) {
        setError("❌ 회원 정보를 불러오지 못했습니다.");
        console.error(err);
      }
    };

    fetchMember();
  }, [memberId]);

  const handleEdit = () => {
    navigate(`/members/${memberId}/edit`);
  };

  const handleDelete = async () => {
    if (window.confirm("정말로 탈퇴하시겠습니까?")) {
      try {
        await axiosInstance.patch(`/members/${memberId}`);
        alert("회원 탈퇴가 완료되었습니다.");
        navigate("/");
      } catch (err) {
        alert("❌ 탈퇴 중 오류가 발생했습니다.");
      }
    }
  };

  if (error) return <Container>{error}</Container>;
  if (!member) return <Container>⏳ 로딩 중...</Container>;

  return (
    <Container>
      <Title>👤 회원 정보</Title>
      <Info>📧 이메일: {member.email}</Info>
      <Info>🧑‍🎓 닉네임: {member.nickname}</Info>
      <Info>🏫 대학교: {member.university}</Info>
      <Info>🎓 학번: {member.studentId}</Info>
      <Info>📌 상태: {member.status}</Info>
      <Info>🕒 가입일: {new Date(member.createdDate).toLocaleString()}</Info>

      <ButtonGroup>
        <Button variant="edit" onClick={handleEdit}>
          ✏️ 프로필 수정
        </Button>
        <Button variant="delete" onClick={handleDelete}>
          🗑 회원 탈퇴
        </Button>
      </ButtonGroup>
    </Container>
  );
}
