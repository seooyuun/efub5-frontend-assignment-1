//TodoItem.jsx
import React, { useMemo, useCallback } from "react";
import styled, { css } from "styled-components";
import { MdDelete } from "react-icons/md";
import { SlMagicWand, SlStar } from "react-icons/sl";
import { IoIosHeartEmpty } from "react-icons/io";
import { LuWandSparkles } from "react-icons/lu";

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  visibility: hidden;
  &:hover {
    color: #ff0000;
  }
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 600px;
  &:hover {
    ${Remove} {
      visibility: visible;
    }
  }
`;

const CheckCircle = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 13px;
  border: 1px solid #adb5bd;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${(props) =>
    props.done &&
    css`
      border: 1px solid #9ec6f3;
      color: #9ec6f3;
    `}
`;

const Category = styled.div`
  font-size: 14px;
  margin-left: 10px;
  color: #adb5bd;
`;

const Text = styled.div`
  flex: 1;
  font-size: 20px;
  color: #495057;
  ${(props) =>
    props.done &&
    css`
      color: #9ec6f3;
      text-decoration: line-through;
    `}
`;

const Completed = styled.div`
  color: #495057;
  font-size: 15px;
  margin-right: 20px;
`;

const icons = [SlMagicWand, SlStar, IoIosHeartEmpty, LuWandSparkles]; // 랜덤 이모티콘 생성

function TodoItem({ id, done, text, setTodos, completeTime, category }) {
  // props로 id, done, text, setTodos, completeTime, category 받아옴
  // onToggle을 useCallback을 사용하여 최적화
  const onToggle = useCallback(() => {
    setTodos(
      (prev) =>
        prev.map((todo) =>
          todo.id === id
            ? {
                ...todo,
                done: !todo.done,
                completeTime: !todo.done ? Date.now() : null,
              }
            : todo
        )
      // todos 배열을 순회하면서 id가 일치하는 항목을 찾음(일치하면 done 값을 토글시킴)
      // toggle 할 당시의 시간을 complete time에 저장
    );
  }, [setTodos, id]); // 할 일 상태 변경

  // onRemove를 useCallback을 사용하여 최적화
  const onRemove = useCallback(() => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, [setTodos, id]); // 할 일 삭제

  const RandomIcon = useMemo(() => {
    return icons[Math.floor(Math.random() * icons.length)];
  }, []); // 빈 배열을 넣어 컴포넌트가 처음 렌더링될 때만 실행, 랜덤 아이콘 생성

  return (
    <TodoItemBlock>
      <CheckCircle $done={done} onClick={onToggle}>
        {done && <RandomIcon />}
      </CheckCircle>
      <Category>{category}📌</Category>
      <Text $done={done}>{text}</Text>
      {done && completeTime !== null && completeTime !== undefined && (
        <Completed>
          {completeTime
            ? new Date(completeTime).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })
            : ""}
        </Completed>
      )}
      <Remove onClick={onRemove}>
        <MdDelete />
      </Remove>
    </TodoItemBlock>
  );
}

export default React.memo(TodoItem); // 불필요한 리렌더링 방지
