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
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';

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

const AppWithRedux = () => {

  // let [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
  //   { id: TODO_LIST_ID1, title: todoListTitle1, filter: 'all' },
  //   { id: TODO_LIST_ID2, title: todoListTitle2, filter: 'all' },
  // ]);

  // let [tasks, dispatchTasks] = useReducer(tasksReducer, {
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

  const todolists = useSelector<AppRootStateType, Array<TodolistsType>>( state => state.todolists)
  const tasks = useSelector<AppRootStateType, TodlistTaskType>(state => state.tasks)
  const dispatch = useDispatch()

  const removeTodolist = (todolistId: string) => {
    dispatch(removeTodolistAC(todolistId))


    // setTodolists(todolists.filter((todolist) => todolist.id !== todolistId));
    // delete tasks[todolistId];
    console.log(tasks);
  };

  const addTodolist = (newTitle: string) => {
    dispatch(addTodolistAC(newTitle))



    // const newTodolist: TodolistsType = {
    //   id: newTodolistId,
    //   title: newTitle,
    //   filter: 'all',
    // };
    // setTodolists([newTodolist, ...todolists]);
    // setTasks({ [newTodolistId]: [], ...tasks });
  }; 

  const changeFilter = (todolistId: string, filter: FilterValuesType) => {
    dispatch(changeTodolistFilterAC(todolistId, filter))
    // const newTodolist = todolists.map((todolist) =>
    //   todolist.id === todolistId ? { ...todolist, filter } : todolist
    // );
    // setTodolists(newTodolist);
  };

  const editTodolist = (todolistId: string, newTitle: string) => {
    dispatch(editTodolistAC(todolistId, newTitle))
    // const updatedTodolist = todolists.map((todolist) =>
    //   todolist.id === todolistId ? { ...todolist, title: newTitle } : todolist
    // );
    // setTodolists(updatedTodolist);
  };  

  const removeTask = (todolistId: string, taskId: string) => {
    dispatch(removeTaskAC(todolistId, taskId))

    // const newTasks = tasks[todolistId].filter((el) => el.id !== taskId);
    // setTasks({ ...tasks, [todolistId]: newTasks });
  };

  const addTask = (todolistId: string, title: string) => {
    dispatch(addTaskAC(todolistId, title))
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
    dispatch(changeTaskStatusAC(todolistId, taskId, newIsDone))
    // setTasks({
    //   ...tasks,
    //   [todolistId]: tasks[todolistId].map((el) =>
    //     el.id === taskId ? { ...el, isDone: newIsDone } : el
    //   ),
    // });
  };

  const editTask = (todolistId: string, taskId: string, newTitle: string) => {
    dispatch(editTaskAC(todolistId, taskId, newTitle))
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

export default AppWithRedux;
