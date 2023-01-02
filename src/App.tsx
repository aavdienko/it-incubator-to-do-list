import React from 'react';
import './App.css';
import TodoList, { TaskType } from './components/ToDoList';

const tasks1: Array<TaskType> = [
  { id: 1, title: 'HTML&CSS', isDone: true },
  { id: 2, title: 'JS', isDone: true },
  { id: 3, title: 'ReactJS', isDone: false },
  { id: 4, title: 'CSS', isDone: false },
];
const tasks2: Array<TaskType> = [
  { id: 1, title: 'Bananas', isDone: true },
  { id: 2, title: 'Milk', isDone: false },
  { id: 3, title: 'Chicken', isDone: false },
];

const todoListTitle1: string = 'What to learn';
const todoListTitle2: string = 'What to buy';

const App = () => {
  return (
    <div className="App">
      <TodoList title={todoListTitle1} tasks={tasks1} />
      <TodoList title={todoListTitle2} tasks={tasks2} />
      {/* <TodoList title={'Books'} /> */}
    </div>
  );
};

export default App;
