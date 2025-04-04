//App.js
import React, { useEffect, useState } from "react";
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
  // localStorage에 저장된 투두리스트가 있으면 localStorage를 불러오고, 없으면 TODO_LIST 불러오기기

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);
  // todos가 변경될 때마다 localStorage에 변경된 값 저장

  return (
    <>
      <GlobalStyle />
      <TodoTemplate>
        <TodoHead todos={todos} />
        <TodoList todos={todos} setTodos={setTodos} />
        <TodoCreate todos={todos} setTodos={setTodos} />
      </TodoTemplate>
    </>
  );
}

export default App;
