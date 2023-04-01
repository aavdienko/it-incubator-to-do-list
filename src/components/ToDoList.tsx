import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { ChangeEvent, KeyboardEvent, FC, useState } from 'react';
import { FilterValuesType } from '../App';
import './../App.css';
import { EditableSpan } from './EditableSpan';
import { SuperInput } from './SuperInput';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TodlistTaskType = {
  [id: string]: Array<TaskType>;
};

export type TodoListPropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  filter: FilterValuesType;
  removeTask: (todolistId: string, taskId: string) => void;
  changeFilter: (todolistId: string, filter: FilterValuesType) => void;
  addTask: (todolistId: string, title: string) => void;
  changeTaskStatus: (
    todolistId: string,
    title: string,
    newIsDone: boolean
  ) => void;
  removeTodolist: (todolistId: string) => void;
  editTask: (todolistId: string, taskId: string, newTitle: string) => void;
  editTodolist: (todolistId: string, newTitle: string) => void;
};

const TodoList: FC<TodoListPropsType> = (props) => {
debugger
  let tasksList = props.tasks.length ? (
    props.tasks.map((task: TaskType) => {
      const removeTask = () => props.removeTask(props.id, task.id);
      const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.id, task.id, e.currentTarget.checked);
      };
      const editTaskHandler = (newTitle: string) => {
        props.editTask(props.id, task.id, newTitle);
      };
      return (
        <div key={task.id} className={task.isDone ? 'is-done' : ''}>
          <Checkbox onChange={changeTaskStatusHandler} checked={task.isDone} />
          {/* <input
            type="checkbox"
            onChange={changeTaskStatusHandler} // обращаемся к evnt для получения инфо которая будет записанна в newIsDone и засетана в стейт
            checked={task.isDone}
          /> */}
          {/* <span>{task.title}</span> */}
          <EditableSpan title={task.title} callBack={editTaskHandler} />
          <IconButton onClick={removeTask} aria-label="delete">
            <DeleteIcon />
          </IconButton>
          {/* <button onClick={removeTask}>X</button> */}
        </div>
      );
    })
  ) : (
    <span>Your taskslist is empty</span>
  );

  // Вынесли в SuperInput
  // const addTask = () => {
  //   const trimedTitle = title.trim()
  //   if (trimedTitle !== '') {
  //     props.addTask(props.id, trimedTitle)
  //   } else {
  //     setError(true)
  //   }
  //   setTitle('')
  // }

  // const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
  //   error && setError(false)
  //   setTitle(event.currentTarget.value)
  // }
  // const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
  //   event.key === 'Enter' && addTask()
  // }
  // const onClickHandlerAll = () => props.changeFilter('all')
  // const onClickHandlerActive = () => props.changeFilter('active')
  // const onClickHandlerCompleted = () => props.changeFilter('completed')

  const handlerCreator = (filter: FilterValuesType) => {
    return () => props.changeFilter(props.id, filter);
  };
  // данная функция возвращает нам калбэки, чтобы не делать одникаовые функции как описано выше
  // несмотря на то, что на onClik вешаем функцию и сразу же ее вызываем, чтобы она создала / вернула калбэк для копки

  // const errorMessage = error && <p style={{color: "red", fontWeight: 'bold' }}>Title is required</p>

  const addTaskHandler = (title: string) => {
    return props.addTask(props.id, title);
  };

  const editTodolistHandler = (newTitle: string) => {
    props.editTodolist(props.id, newTitle);
  };

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} callBack={editTodolistHandler} />
        {/* {props.title} */}
        <IconButton
          onClick={() => props.removeTodolist(props.id)}
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
        {/* <Button onClick={()=>props.removeTodolist(props.id)}>X</Button>
        <button onClick={()=>props.removeTodolist(props.id)}>X</button> */}
      </h3>
      <SuperInput callBack={addTaskHandler} />
      {/* <div>
        <input 
          type='text'
          value={title} 
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
          className={error ? 'input-error' : ''}/>
        <button onClick={addTask}>+</button>
        {errorMessage}
      </div> */}
      <div>{tasksList}</div>
      <div>
        <Button
          variant={props.filter === 'all' ? 'contained' : 'text'}
          className={props.filter === 'all' ? 'active-btn' : ''}
          onClick={handlerCreator('all')}
        >
          All
        </Button>
        <Button
          color="primary"
          variant={props.filter === 'active' ? 'contained' : 'text'}
          className={props.filter === 'active' ? 'active-btn' : ''}
          onClick={handlerCreator('active')}
        >
          Active
        </Button>
        <Button
          color="secondary"
          variant={props.filter === 'completed' ? 'contained' : 'text'}
          className={props.filter === 'completed' ? 'active-btn' : ''}
          onClick={handlerCreator('completed')}
        >
          Completed
        </Button>
      </div>
    </div>
  );
};

export default TodoList;
