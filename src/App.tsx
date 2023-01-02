import React from 'react';
import './App.css';
import TodoList from './components/ToDoList';

const tasks1 = [
  { id: 1, title: 'HTML&CSS', isDone: true },
  { id: 2, title: 'JS', isDone: true },
  { id: 3, title: 'ReactJS', isDone: false },
];
const tasks2 = [
  { id: 1, title: 'Hello world', isDone: true },
  { id: 2, title: 'I am Happy', isDone: false },
  { id: 3, title: 'Yo', isDone: false },
];

const todoListTitle1: string = 'What to learn'
const todoListTitle2: string = 'What to buy'

const App = () => {
  return (
    <div className="App">
      <TodoList title={todoListTitle1}/>
      <TodoList title={todoListTitle2}/>
      {/* <TodoList title={'Books'} /> */}
    </div>
  );
};

export default App;
