import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../libs/axiosInstance";
import styled from "styled-components";

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

export default function MemberInfo() {
  const { memberId } = useParams();
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
    </Container>
  );
}
