import React, { useEffect, useMemo, useState } from "react";
import TodoTemplate from "../components/TodoTemplate";
import TodoHead from "../components/TodoHead";
import TodoList from "../components/TodoList";
import TodoCreate from "../components/TodoCreate";

import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const TODO_LIST = [
  {
    id: 1,
    text: "자바스크립트 공부하기",
    category: "공부",
    done: false,
    completeTime: null,
  },
  {
    id: 2,
    text: "EFUB 가기",
    category: "학교",
    done: false,
    completeTime: null,
  },
];

const STORAGE_KEY = "todos";

function TodoPage() {
  const navigate = useNavigate();

  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : TODO_LIST;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const undoneTasksResult = useMemo(
    () => todos.filter((todo) => !todo.done).length,
    [todos]
  );

  const lastCompletedResult = useMemo(() => {
    return todos
      .filter((todo) => todo.completeTime)
      .sort((a, b) => new Date(b.completeTime) - new Date(a.completeTime))[0];
  }, [todos]);

  const Button = styled.button`
    background-color: #bddde4;
    border: none;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;

    padding: 10px 24px;
    font-size: 16px;
    color: white;
    cursor: pointer;

    margin: 0 auto;
    position: relative;

    &:hover {
      background-color: #d5e9ee;
    }
  `;

  return (
    <>
      <Button onClick={() => navigate("/playlist")}>🎵 플레이리스트</Button>
      <Button onClick={() => navigate("/gallery")}>🖼️ 갤러리</Button>
      <TodoTemplate>
        <TodoHead
          undoneTasksResult={undoneTasksResult}
          lastCompletedResult={lastCompletedResult}
        />
        <TodoList todos={todos} setTodos={setTodos} />
        <TodoCreate todos={todos} setTodos={setTodos} />
      </TodoTemplate>
    </>
  );
}

export default TodoPage;
