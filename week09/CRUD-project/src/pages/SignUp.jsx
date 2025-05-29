import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { signUp } from "../apis/member";

const Container = styled.main`
  max-width: 500px;
  margin: 3rem auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 12px;
  background-color: #fff;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin: 0;
  font-weight: bold;
`;

const Input = styled.input`
  margin-top: 0.4rem;
  padding: 0.6rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 100%;
`;

const Button = styled.button`
  margin-top: 1.5rem;
  padding: 0.8rem;
  background-color: #c7d9dd;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #adb2d4;
  }
`;

const Message = styled.p`
  margin-top: 1rem;
  font-weight: bold;
  color: red;
`;

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nickname: "",
    university: "",
    studentId: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signUp(formData);
      const memberId = res.data.memberId;
      const nickname = res.data.nickname;

      localStorage.setItem("memberId", memberId);
      localStorage.setItem("nickname", nickname);

      // 바로 홈으로 이동
      navigate("/home");
    } catch (err) {
      console.error(err);
      setMessage("❌ 회원가입 실패! 다시 시도해주세요.");
    }
  };

  return (
    <Container>
      <Title>회원가입</Title>
      <Form onSubmit={handleSubmit}>
        <Label>
          이메일
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Label>

        <Label>
          비밀번호
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Label>

        <Label>
          닉네임
          <Input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            required
          />
        </Label>

        <Label>
          대학교
          <Input
            type="text"
            name="university"
            value={formData.university}
            onChange={handleChange}
            required
          />
        </Label>

        <Label>
          학번
          <Input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            required
          />
        </Label>

        <Button type="submit">회원가입</Button>
      </Form>

      {message && <Message>{message}</Message>}
    </Container>
  );
}
