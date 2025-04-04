//TodoHead.jsx

import React from "react";
import styled from "styled-components";

const TodoHeadBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  h1 {
    margin: 0;
    font-size: 40px;
    color: #495057;
  }

  h2 {
    margin: 0;
    font-size: 30px;
    color: #6482ad;
  }
  .day {
    margin-top: 5px;
    color: #bddde4;
    font-size: 21px;
    font-weight: 600;
  }
  padding-top: 48px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e9ecef;
`;

const DateDayBlock = styled.div`
  display: flex;
  aligh-items: center;
  gap: 12px;
  margin-top: 8px;
`;

const TasksLeft = styled.div`
  color: #9fb3df;
  font-size: 18px;
  margin-top: 5px;
  font-weight: bold;
`;

const Completed = styled.div`
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  height: 15px;
`;

function TodoHead({ todos }) {
  // props로 todos 받아옴
  const today = new Date();

  const dateString = today.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const dayName = today.toLocaleString("en-US", { weekday: "short" });
  const undoneTasks = todos.filter((todo) => !todo.done); // done:false만 필터링해서 남은 목록 가져오기
  const lastCompleted = todos
    .filter((todo) => todo.completeTime)
    .sort((a, b) => new Date(b.completeTime) - new Date(a.completeTime))[0];
  // completeTime가 존재하는 todo만 필터링 -> 가장 최근에 완료된 항목이 제일 앞에 오도록
  return (
    <TodoHeadBlock>
      <h1>TODOLIST</h1>
      <DateDayBlock>
        <h2>{dateString}</h2>
        <div className="day">{dayName}</div>
      </DateDayBlock>
      <TasksLeft>TASKS LEFT : {undoneTasks.length}</TasksLeft>
      <Completed visible={!!lastCompleted}>
        {lastCompleted
          ? `Last Completion Time: ${new Date(
              lastCompleted.completeTime
            ).toLocaleTimeString("en-US")}`
          : ""}
      </Completed>
    </TodoHeadBlock>
  );
}

export default TodoHead;
