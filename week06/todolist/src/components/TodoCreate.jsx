//TodoCreate.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { SlCheck } from "react-icons/sl";

const InsertFormPositioner = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
`;

const InsertForm = styled.form`
  background: #f8f9fa;
  padding-left: 32px;
  padding-top: 32px;
  padding-right: 32px;
  padding-bottom: 72px;

  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
`;

const EnterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Select = styled.select`
  font-family: "DungGeunMo";
  margin-left: 10px;
  padding: 8px;
  font-size: 18px;
  width: 75px;
  height: 40px;
  border-radius: 10%;
  border: 1px solid #bddde4;
`;

const Input = styled.input`
  font-family: "DungGeunMo";
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #bddde4;
  width: 100%;
  outline: none;
  font-size: 17px;
  box-sizing: border-box;
`;

const AddButton = styled.button`
  background: #bddde4;
  border: none;
  width: 50px;
  height: 40px;
  border-radius: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 10px;
  outline: none;
  color: white;
  font-size: 24px;
  transition: 0.2s;

  &:hover {
    background: #9ec6f3;
  }

  &:active {
    background: #9fb3df;
  }
`;

const CATEGORY_ORDER = {
  공부: 1,
  일상: 2,
  학교: 3,
};

// 새로운 할 일을 추가하는 컴포넌트
function TodoCreate({ todos, setTodos }) {
  // props로 todos와 setTodos를 받아옴
  const [text, setText] = useState("");
  const [id, setId] = useState(Date.now());
  const [category, setCategory] = useState("");
  const newItem = {
    id: id,
    text: text,
    done: false,
    completeTime: null,
    category,
  };

  const onSubmit = (e) => {
    e.preventDefault(); // 새로고침 방지
    if (!text.trim()) return; // 빈 값 방지

    if (!category) {
      alert("카테고리를 선택해주세요!");
      return; // 카테고리를 선택하지 않고 등록하려 했을 때 알람
    }

    if (text) {
      // 입력된 값이 있을 때
      setId(Date.now()); // 새로운 id 설정
      setTodos([...todos, newItem]); // 기존 todos 목록에 newItem 추가
    }

    const nextTodos = [...todos, newItem].sort((a, b) => {
      const orderA = CATEGORY_ORDER[a.category] || 99;
      const orderB = CATEGORY_ORDER[b.category] || 99;
      return orderA - orderB || a.id - b.id;
    });

    setTodos(nextTodos); // 정렬
    setText(""); // 입력창 비우기
    setCategory(""); // 선택 비우기
  };

  const handleChange = (e) => {
    // 값이 입력될 때마다
    setText(e.target.value); // setText를 호출해서 text 상태 업데이트
  };

  return (
    <>
      <InsertFormPositioner>
        <InsertForm onSubmit={onSubmit}>
          <EnterContainer>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">선택</option>
              <option value="공부">공부</option>
              <option value="일상">일상</option>
              <option value="학교">학교</option>
            </Select>
            <Input
              autoFocus
              onChange={handleChange}
              value={text}
              placeholder="할 일을 입력 후, ENTER 혹은 버튼을 누르세요"
            />
            <AddButton type="submit">
              <SlCheck />
            </AddButton>
          </EnterContainer>
        </InsertForm>
      </InsertFormPositioner>
    </>
  );
}

export default React.memo(TodoCreate);
