import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { EditableSpan } from './EditableSpan';
import React, {
  ChangeEvent,
  useCallback,
} from 'react';
import { useDispatch } from 'react-redux';
import {
  changeTaskStatusAC,
  editTaskAC,
  removeTaskAC,
} from '../reducers/tasks-reducer';

type TaskPropsType = {
  id: string,
  taskId: string,
  isDone: boolean,
  title: string
  key: string
};

export const Task = React.memo((props: TaskPropsType) => {
  console.log('task')
  const dispatch = useDispatch();

  const removeTask = useCallback(
    () => dispatch(removeTaskAC(props.id, props.taskId)),
    [props.id, props.taskId]
  );
  const changeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeTaskStatusAC(props.id, props.taskId, e.currentTarget.checked));
  },[props.id, props.taskId]
  );
  const editTaskHandler = useCallback((newTitle: string) => {
    dispatch(editTaskAC(props.id, props.taskId, newTitle));
  }, [props.id, props.taskId]
  );
  return (
    <div key={props.taskId} className={props.isDone ? 'is-done' : ''}>
      <Checkbox onChange={changeTaskStatusHandler} checked={props.isDone} />
      <EditableSpan title={props.title} callBack={editTaskHandler} />
      <IconButton onClick={removeTask} aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </div>
  );
});
