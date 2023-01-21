import React, { ChangeEvent, KeyboardEvent, FC, useState } from 'react';
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
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setTitle(event.currentTarget.value)
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      event.key === 'Enter' && addTask()
    }
    
    // const onClickHandlerAll = () => props.changeFilter('all')
    // const onClickHandlerActive = () => props.changeFilter('active')
    // const onClickHandlerCompleted = () => props.changeFilter('completed')

    const handlerCreator = (filter: FilterValuesType) => {
      return () => props.changeFilter(filter)
    } 
    // данная функция возвращает нам калбэки, чтобы не делать одникаовые функции как описано выше
    // несмотря на то, что на onClik вешаем функцию и сразу же ее вызываем, чтобы она создала / вернула калбэк для копки

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input 
          type='text'
          value={title} 
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}/>
        <button onClick={addTask}>+</button>
      </div>
      <ul>
        {tasksList}
      </ul>
      <div>
        <button onClick={handlerCreator('all')}>All</button>
        <button onClick={handlerCreator('active')}>Active</button>
        <button onClick={handlerCreator('completed')}>Completed</button>
      </div>
    </div>
  );
};

export default TodoList;
