import { log } from 'console';
import React, { useReducer, useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { ButtonAppBar } from './components/ButtonAppBar';
import { SuperInput } from './components/SuperInput';
import TodoList, { TaskType, TodlistTaskType } from './components/ToDoList';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { addTodolistAC, changeTodolistFilterAC, editTodolistAC, removeTodolistAC, todolistsReducer } from './reducers/todolist-reducer';
import { addTaskAC, changeTaskStatusAC, editTaskAC, removeTaskAC, tasksReducer } from './reducers/tasks-reducer';

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
  // const [todolists, setTodolists] = useState<Array<TodolistsType>>([
  //   { id: TODO_LIST_ID1, title: todoListTitle1, filter: 'all' },
  //   { id: TODO_LIST_ID2, title: todoListTitle2, filter: 'all' },
  // ]);

  // const [tasks, setTasks] = useState<TodlistTaskType>({
  //   [TODO_LIST_ID1]: [
  //     { id: v1(), title: 'HTML&CSS', isDone: true },
  //     { id: v1(), title: 'JS', isDone: true },
  //     { id: v1(), title: 'ReactJS', isDone: false },
  //     { id: v1(), title: 'CSS', isDone: false },
  //   ],
  //   [TODO_LIST_ID2]: [
  //     { id: v1(), title: 'HTML&CSS', isDone: true },
  //     { id: v1(), title: 'JS', isDone: true },
  //     { id: v1(), title: 'ReactJS', isDone: false },
  //     { id: v1(), title: 'CSS', isDone: false },
  //   ],
  // });

  const [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
    { id: TODO_LIST_ID1, title: todoListTitle1, filter: 'all' },
    { id: TODO_LIST_ID2, title: todoListTitle2, filter: 'all' },
  ]);

  const [tasks, dispatchTasks] = useReducer(tasksReducer, {
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

  const removeTodolist = (todolistId: string) => {
    dispatchTodolists(removeTodolistAC(todolistId))
    // setTodolists(todolists.filter((todolist) => todolist.id !== todolistId));
    delete tasks[todolistId];
    console.log(tasks);
  };

  const addTodolist = (newTitle: string) => {
    dispatchTodolists(addTodolistAC(newTitle))


    // const newTodolist: TodolistsType = {
    //   id: newTodolistId,
    //   title: newTitle,
    //   filter: 'all',
    // };
    // setTodolists([newTodolist, ...todolists]);
    // setTasks({ [newTodolistId]: [], ...tasks });
  }; 

  const changeFilter = (todolistId: string, filter: FilterValuesType) => {
    dispatchTodolists(changeTodolistFilterAC(todolistId, filter))
    // const newTodolist = todolists.map((todolist) =>
    //   todolist.id === todolistId ? { ...todolist, filter } : todolist
    // );
    // setTodolists(newTodolist);
  };

  const editTodolist = (todolistId: string, newTitle: string) => {
    dispatchTodolists(editTodolistAC(todolistId, newTitle))
    // const updatedTodolist = todolists.map((todolist) =>
    //   todolist.id === todolistId ? { ...todolist, title: newTitle } : todolist
    // );
    // setTodolists(updatedTodolist);
  };  

  const removeTask = (todolistId: string, taskId: string) => {
    dispatchTasks(removeTaskAC(todolistId, taskId))

    // const newTasks = tasks[todolistId].filter((el) => el.id !== taskId);
    // setTasks({ ...tasks, [todolistId]: newTasks });
  };

  const addTask = (todolistId: string, title: string) => {
    dispatchTasks(addTaskAC(todolistId, title))
    // const newTask: TaskType = {
    //   id: v1(),
    //   title: title,
    //   isDone: false,
    // };
    // setTasks({ ...tasks, [todolistId]: [...tasks[todolistId], newTask] });
  };

  const changeTaskStatus = (
    todolistId: string,
    taskId: string,
    newIsDone: boolean
  ) => {
    dispatchTasks(changeTaskStatusAC(todolistId, taskId, newIsDone))
    // setTasks({
    //   ...tasks,
    //   [todolistId]: tasks[todolistId].map((el) =>
    //     el.id === taskId ? { ...el, isDone: newIsDone } : el
    //   ),
    // });
  };

  const editTask = (todolistId: string, taskId: string, newTitle: string) => {
    dispatchTasks(editTaskAC(todolistId, taskId, newTitle))
    // const updatedTask = {
    //   ...tasks,
    //   [todolistId]: tasks[todolistId].map((task) =>
    //     task.id === taskId ? { ...task, title: newTitle } : task
    //   ),
    // };
    // setTasks(updatedTask);
  };

  return (
    <div className="App">
      <ButtonAppBar />
      <Container fixed>
        <Grid container style={{padding:'20px'}}>
          <SuperInput callBack={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
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
            <Grid item>
              <Paper style={{padding:'10px'}} elevation={3}>
                <TodoList
                  key={todolist.id}
                  id={todolist.id}
                  title={todolist.title}
                  tasks={taskForTodolists}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeTaskStatus}
                  filter={todolist.filter}
                  removeTodolist={removeTodolist}
                  editTask={editTask}
                  editTodolist={editTodolist}
                /> 
              </Paper>
            </Grid>
          );
        })}
        </Grid>
      </Container>
    </div>
  );
};

export default App;
