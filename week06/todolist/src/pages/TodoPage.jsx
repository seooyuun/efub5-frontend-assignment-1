// pages/TodoPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import TodoTemplate from "../components/TodoTemplate";
import TodoHead from "../components/TodoHead";
import TodoList from "../components/TodoList";
import TodoCreate from "../components/TodoCreate";

import { useNavigate } from "react-router-dom";

const TODO_LIST = [
  { id: 1, text: "자바스크립트 공부하기", done: false, completeTime: null },
  { id: 2, text: "EFUB 가기", done: false, completeTime: null },
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

  return (
    <>
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <button
          style={{
            backgroundColor: "#bddde4",
            border: "none",
            borderRadius: "8px",
            padding: "10px 20px",
            fontFamily: "DungGeunMo",
            fontSize: "16px",
            color: "white",
            cursor: "pointer",
          }}
          onClick={() => navigate("/playlist")}
        >
          🎵 플레이리스트 보기
        </button>
      </div>
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
