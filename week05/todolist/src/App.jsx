//App.js
import React, { useEffect, useMemo, useState } from "react";
import { createGlobalStyle } from "styled-components";
import TodoTemplate from "./components/TodoTemplate";
import TodoHead from "./components/TodoHead";
import TodoList from "./components/TodoList";
import TodoCreate from "./components/TodoCreate";
import backgroundImg from "./images/dot-image.jpg";

const GlobalStyle = createGlobalStyle`
  body {
  @font-face {
     font-family: 'DungGeunMo';
     src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/DungGeunMo.woff') format('woff');
     font-weight: normal;
     font-style: normal;
    } // 웹 폰트 적용
     font-family: 'DungGeunMo';
    background-image: url(${backgroundImg});
    background-repeat : no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
  }
`;

const TODO_LIST = [
  { id: 1, text: "자바스크립트 공부하기", done: false, completeTime: null },
  {
    id: 2,
    text: "EFUB 가기",
    done: false,
    completeTime: null,
  },
];

const STORAGE_KEY = "todos"; // localStorage Key

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem(STORAGE_KEY);
    return savedTodos ? JSON.parse(savedTodos) : TODO_LIST;
  }); // todos: 할 일을 저장하는 변수
  // localStorage에 저장된 투두리스트가 있으면 localStorage를 불러오고, 없으면 TODO_LIST 불러오기

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);
  // todos가 변경될 때마다 localStorage에 변경된 값 저장

  // useMemo를 사용해서 필요한 값만 추출해서 전달하도록
  const undoneTasksResult = useMemo(
    () => todos.filter((todo) => !todo.done).length,
    [todos]
  ); // done:false만 필터링해서 남은 목록의 개수 가져오기

  const lastCompletedResult = useMemo(() => {
    return todos
      .filter((todo) => todo.completeTime)
      .sort((a, b) => new Date(b.completeTime) - new Date(a.completeTime))[0];
  }, [todos]); // completeTime가 존재하는 todo만 필터링 -> 가장 최근에 완료된 항목이 제일 앞에 오도록

  // 테스트용 임시 state 생성
  const [tempState, setTempState] = useState(0);

  return (
    <>
      <button onClick={() => setTempState((prev) => prev + 1)}>
        테스트 버튼
      </button>
      <GlobalStyle />
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

export default App;
