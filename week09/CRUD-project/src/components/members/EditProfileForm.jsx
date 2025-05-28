import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMember, updateProfile } from "../../apis/members";

const FormContainer = styled.div`
  max-width: 600px;
  margin: 3rem auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  background-color: #fff;
`;

const Title = styled.h2`
  margin-bottom: 2rem;
  text-align: center;
`;

const Label = styled.label`
  display: block;
  margin: 1rem 0 0.5rem;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.6rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Button = styled.button`
  margin-top: 1.5rem;
  padding: 0.8rem;
  background-color: #3c82f6;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #265ddc;
  }
`;

const Message = styled.p`
  margin-top: 1rem;
  font-weight: bold;
  color: ${({ $success }) => ($success ? "green" : "red")};
`;

export default function EditProfileForm() {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await getMember(memberId);
        setNickname(res.data.nickname);
      } catch (err) {
        setMessage("❌ 회원 정보 불러오기 실패");
        setIsSuccess(false);
      }
    };
    fetchMember();
  }, [memberId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(memberId, nickname);
      setMessage("✅ 프로필 수정 완료!");
      setIsSuccess(true);
      setTimeout(() => {
        navigate(`/members/${memberId}`);
      }, 1000);
    } catch (err) {
      setMessage("❌ 수정 실패. 다시 시도해주세요.");
      setIsSuccess(false);
    }
  };

  return (
    <FormContainer>
      <Title>프로필 수정</Title>
      <form onSubmit={handleSubmit}>
        <Label>닉네임</Label>
        <Input
          type="text"
          name="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />
        <Button type="submit">수정하기</Button>
      </form>
      {message && <Message $success={isSuccess}>{message}</Message>}
    </FormContainer>
  );
}
