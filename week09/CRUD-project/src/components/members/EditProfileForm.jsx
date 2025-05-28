import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../libs/axiosInstance";
import styled from "styled-components";

const FormContainer = styled.div`
  max-width: 600px;
  margin: 3rem auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 12px;
`;

const Label = styled.label`
  display: block;
  margin: 1rem 0 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
`;

const Button = styled.button`
  margin-top: 1.5rem;
  padding: 0.7rem 1.5rem;
  font-size: 1rem;
  background-color: #3c82f6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

export default function EditProfileForm() {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nickname: "",
    university: "",
    studentId: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/members/${memberId}`);
        const { nickname, university, studentId } = res.data;
        setFormData({ nickname, university, studentId });
      } catch (err) {
        setMessage("❌ 회원 정보 불러오기 실패");
      }
    };
    fetchData();
  }, [memberId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.patch(`/members/profile/${memberId}`, formData);
      setMessage("✅ 프로필 수정 완료!");
      setTimeout(() => {
        navigate(`/members/${memberId}`);
      }, 1000);
    } catch (err) {
      setMessage("❌ 수정 실패. 다시 시도해주세요.");
    }
  };

  return (
    <FormContainer>
      <h2>프로필 수정</h2>
      <form onSubmit={handleSubmit}>
        <Label>닉네임</Label>
        <Input
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          required
        />
        <Label>대학교</Label>
        <Input
          type="text"
          name="university"
          value={formData.university}
          onChange={handleChange}
          required
        />
        <Label>학번</Label>
        <Input
          type="text"
          name="studentId"
          value={formData.studentId}
          onChange={handleChange}
          required
        />
        <Button type="submit">수정하기</Button>
      </form>
      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
    </FormContainer>
  );
}
