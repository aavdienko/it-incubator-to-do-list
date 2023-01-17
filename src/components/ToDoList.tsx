import React, { FC } from 'react';
import { FilterValuesType } from '../App';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}


type TodoListPropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string) => void
  changeFilter: (filter: FilterValuesType) => void
}


const TodoList: FC<TodoListPropsType> = (props) => {
  let tasksList = props.tasks.length
  ? props.tasks.map((task:TaskType) => {
    const removeTask = () => props.removeTask(task.id)
      return (
        <li>
          <input type="checkbox" checked={task.isDone}/>
          <span>{task.title}</span>
          <button onClick={removeTask}>X</button>
        </li>
      )
    })
  : <span>Your taskslist is empty</span>
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {tasksList}
      </ul>
      <div>
        <button onClick={() => props.changeFilter('all')}>All</button>
        <button onClick={() => props.changeFilter('active')}>Active</button>
        <button onClick={() => props.changeFilter('completed')}>Completed</button>
      </div>
    </div>
  );
};

export default TodoList;
