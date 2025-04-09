## 성능 개선 전
![Image](https://github.com/user-attachments/assets/f232e908-fc9b-47a5-8307-3d1923cf8387)


## 성능 개선 후
![Image](https://github.com/user-attachments/assets/37df1aa7-d92b-4992-828c-edc00035eeb6)


## useMemo 사용
### 1. undoneTasks & lastCompleted
TodoHead 컴포넌트의 undoneTasks와 lastCompleted를 useMemo로 최적화했습니다.
App.jsx에서 undoneTaskResult, lastCompletedResult 함수를 useMemo를 사용하여 만들고, todos가 변경될 때만 리렌더링되도록 하였습니다. 이 값을 props로 TodoHead에 받아오도록 했습니다. 

### 2. date
TodoHead 내부에서 new Date()를 호출할 때는 todos의 state가 변경될 때마다 날짜도 다시 리렌더링되는 불필요한 렌더링이 발생하였기 때문에, 
App.jsx에서 날짜 관련 값을 한 번만 계산하고 이를 useMemo를 통해 Memoization한 뒤 이를 TodoHead에 props로 전달하도록 했습니다. 

### 3. Icon
TodoItem에서 사용되는 아이콘이 컴포넌트가 리렌더링될 때마다 바뀌는 것을 방지하기 위해서 useMemo를 사용하였고, 의존성 배열에 빈 배열을 넣어서 컴포넌트 최초 렌더링 시 한 번만 실행되도록 하였습니다.

## useCallback 사용
### onToggle & onRemove
onToggle 함수와 onRemove 함수를 useCallback으로 메모이제이션하여 최적화하였습니다. 의존성 배열에 setTodos와 id를 넣어 이 값이 변경될 때만 렌더링되도록 하였습니다.

## React.memo 사용
TodoCreate, TodoHead, TodoItem에 React.memo를 사용하여 컴포넌트 리렌더링을 방지했습니다.

## Custom Hook 적용
날짜를 표시하는 부분을 커스텀 훅으로 만들어보았습니다. App.jsx에서 dateString과 dayName을 계산하던 것을 useToday Hook에서 하고, 이를 TodoHead 컴포넌트에서 가져와서 사용할 수 있도록 했습니다. 
