import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import React, {
  ChangeEvent,
  KeyboardEvent,
  FC,
  useState,
  useCallback,
} from 'react';
import { FilterValuesType } from '../App';
import './../App.css';
import { EditableSpan } from './EditableSpan';
import { SuperInput } from './SuperInput';
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../state/store';
import { useDispatch } from 'react-redux';
import {
  addTaskAC,
  changeTaskStatusAC,
  editTaskAC,
  removeTaskAC,
} from '../reducers/tasks-reducer';
import {
  changeTodolistFilterAC,
  editTodolistAC,
  removeTodolistAC,
} from '../reducers/todolist-reducer';
import { Task } from './Task';

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
  filter: FilterValuesType;
};

export const TodoListWithRedux: FC<TodoListPropsType> = React.memo((props) => {
  console.log('todo');
  let tasks = useSelector<AppRootStateType, Array<TaskType>>(
    (state) => state.tasks[props.id]
  );
  const dispatch = useDispatch();

  if (props.filter === 'active') {
    tasks = tasks.filter((task) => task.isDone === false);
  }
  if (props.filter === 'completed') {
    tasks = tasks.filter((task) => task.isDone === true);
  }
  let tasksList = tasks.length ? (
    tasks.map((task: TaskType) => {
      return (
        <Task
          id={props.id}
          taskId={task.id}
          isDone={task.isDone}
          title={task.title}
          key={props.id}
        />
      );
      //     const removeTask = () => dispatch(removeTaskAC(props.id, task.id))
      //     const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
      //       dispatch(changeTaskStatusAC(props.id, task.id, e.currentTarget.checked));
      //     }
      //     const editTaskHandler = (newTitle: string) => {
      //       dispatch(editTaskAC(props.id, task.id, newTitle));
      //     }
      //     return (
      //       <div key={task.id} className={task.isDone ? 'is-done' : ''}>
      //         <Checkbox onChange={changeTaskStatusHandler} checked={task.isDone} />
      //         <EditableSpan title={props.title} callBack={editTaskHandler} />
      //         <IconButton onClick={removeTask} aria-label="delete">
      //           <DeleteIcon />
      //         </IconButton>
      //       </div>
      //     );
    })
  ) : (
    <span>Your taskslist is empty</span>
  );

  const handlerCreator = useCallback(
    (filter: FilterValuesType) => {
      return () => dispatch(changeTodolistFilterAC(props.id, filter));
    },
    [props.id]
  );

  const addTaskHandler = useCallback(
    (title: string) => {
      return dispatch(addTaskAC(props.id, title));
    },
    [props.id]
  );

  const editTodolistHandler = useCallback(
    (newTitle: string) => {
      dispatch(editTodolistAC(props.id, newTitle));
    },
    [props.id]
  );

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} callBack={editTodolistHandler} />

        <IconButton
          onClick={() => dispatch(removeTodolistAC(props.id))}
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      </h3>
      <SuperInput callBack={addTaskHandler} />
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
});
