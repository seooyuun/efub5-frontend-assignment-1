//TodoHead.jsx

import React from "react";
import styled from "styled-components";
import useToday from "../hooks/useToday";

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
  align-items: center;
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

function TodoHead({ undoneTasksResult, lastCompletedResult }) {
  const { dateString, dayName } = useToday(); // useToday Hook 사용해서 날짜 관련 정보 가져오기

  return (
    <TodoHeadBlock>
      <h1>TODOLIST</h1>
      <DateDayBlock>
        <h2>{dateString}</h2>
        <div className="day">{dayName}</div>
      </DateDayBlock>
      <TasksLeft>TASKS LEFT : {undoneTasksResult}</TasksLeft>
      <Completed $visible={!!lastCompletedResult}>
        {lastCompletedResult
          ? `Last Completion Time: ${new Date(
              lastCompletedResult.completeTime
            ).toLocaleTimeString("en-US")}`
          : ""}
      </Completed>
    </TodoHeadBlock>
  );
}

export default React.memo(TodoHead);
