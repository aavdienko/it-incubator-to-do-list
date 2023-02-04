import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import TodoList, { TaskType, TodlistTaskType } from './components/ToDoList';

// Перенесли в useState - удалить после выполнения домашки второй недели
// const tasks1: Array<TaskType> = [
//   { id: 1, title: 'HTML&CSS', isDone: true },
//   { id: 2, title: 'JS', isDone: true },
//   { id: 3, title: 'ReactJS', isDone: false },
//   { id: 4, title: 'CSS', isDone: false },
// ];
// const tasks2: Array<TaskType> = [
//   { id: 1, title: 'Bananas', isDone: true },
//   { id: 2, title: 'Milk', isDone: false },
//   { id: 3, title: 'Chicken', isDone: false },
// ];

const todoListTitle1: string = 'What to learn';
const todoListTitle2: string = 'What to buy';
const TODO_LIST_ID1: string = v1();
const TODO_LIST_ID2: string = v1();

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistsType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

const App = () => {
  const [todolists, setTodolists] = useState<Array<TodolistsType>>([
    { id: TODO_LIST_ID1, title: todoListTitle1, filter: 'all' },
    { id: TODO_LIST_ID2, title: todoListTitle2, filter: 'all' },
  ]);

  const [tasks, setTasks] = useState<TodlistTaskType>({
    [TODO_LIST_ID1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
      { id: v1(), title: 'CSS', isDone: false },
    ],
    [TODO_LIST_ID2]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
      { id: v1(), title: 'CSS', isDone: false },
    ],
  });

  const changeFilter = (todolistId: string, filter: FilterValuesType) => {const newTodolist = todolists.map(todolist =>
      todolist.id === todolistId ? {...todolist, filter} : todolist
    );
    setTodolists(newTodolist);
  };

  const removeTask = (todolistId: string, taskId: string) => {
    const newTasks = tasks[todolistId].filter(el => el.id !== taskId)
    setTasks({...tasks, [todolistId]: newTasks})
  };

  const addTask = (todolistId: string, title: string) => {
    const newTask: TaskType = {
      id: v1(),
      title: title,
      isDone: false,
    }
    setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]})
  };

  const changeTaskStatus = (todolistId: string, taskId: string, newIsDone: boolean) => {
  
    setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone: newIsDone} : el)})

  };

  const removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
    delete tasks[todolistId]
    console.log(tasks);
  }


  return (
    <div className="App">
      {todolists.map((todolist) => {
        let taskForTodolists = tasks[todolist.id];
        if (todolist.filter === 'active') {
          taskForTodolists = tasks[todolist.id].filter(
            (task) => task.isDone === false
          );
        }
        if (todolist.filter === 'completed') {
          taskForTodolists = tasks[todolist.id].filter(
            (task) => task.isDone === true
          );
        }
        return (
          <TodoList
            key={todolist.id}
            id={todolist.id}
            title={todoListTitle1}
            tasks={taskForTodolists}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            filter={todolist.filter}
            removeTodolist={removeTodolist}
          />
        );
      })}
    </div>
  );
};

export default App;
