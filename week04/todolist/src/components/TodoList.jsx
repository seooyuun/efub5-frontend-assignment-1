//TodoList.jsx
import React from "react";
import styled from "styled-components";
import TodoItem from "./TodoItem";

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
  max-height: 300px;

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #e2e2e2;
    border-radius: 3px;
  }
`;

function TodoList({ todos, setTodos }) {
  return (
    <TodoListBlock>
      {todos.map((todo) => (
        <TodoItem
          id={todo.id}
          text={todo.text}
          done={todo.done}
          key={todo.id}
          setTodos={setTodos}
          completeTime={todo.completeTime}
          category={todo.category}
        /> // TodoItem에 id, text, done, setTodos, completeTime, category를 전달
      ))}
    </TodoListBlock>
  );
}

export default TodoList;
