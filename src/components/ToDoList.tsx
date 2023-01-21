import React, { FC, useState } from 'react';
import { FilterValuesType } from '../App';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}


export type TodoListPropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string) => void
  changeFilter: (filter: FilterValuesType) => void
  addTask: (title: string) => void
}

const TodoList: FC<TodoListPropsType> = (props) => {

  const [title, setTitle] = useState<string>('')
  console.log(title);
  
  let tasksList = props.tasks.length
  ? props.tasks.map((task:TaskType) => {
    const removeTask = () => props.removeTask(task.id)
      return (
        <li key={task.id}>
          <input type="checkbox" checked={task.isDone}/>
          <span>{task.title}</span>
          <button onClick={removeTask}>X</button>
        </li>
      )
    })
  : <span>Your taskslist is empty</span>

    const addTask = () => {
      props.addTask(title)
      setTitle('')
    }

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input 
          type='text'
          value={title} 
          onChange={(event) => setTitle(event.currentTarget.value)}
          onKeyDown={(event) => event.key === 'Enter' && addTask()}/>
        <button onClick={addTask}>+</button>
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
