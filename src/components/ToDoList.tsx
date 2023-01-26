import React, { ChangeEvent, KeyboardEvent, FC, useState } from 'react';
import { FilterValuesType } from '../App';
import './../App.css'

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}


export type TodoListPropsType = {
  title: string
  tasks: Array<TaskType>
  filter: FilterValuesType
  removeTask: (taskId: string) => void
  changeFilter: (filter: FilterValuesType) => void
  addTask: (title: string) => void
  changeTaskStatus: (title: string, newIsDone: boolean) => void
}

const TodoList: FC<TodoListPropsType> = (props) => {

  const [title, setTitle] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  
  let tasksList = props.tasks.length
  ? props.tasks.map((task:TaskType) => {
    const removeTask = () => props.removeTask(task.id)
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => { props.changeTaskStatus(task.id, e.currentTarget.checked)
    }
      return (
        <li key={task.id} className={task.isDone ? 'is-done' : ''}>
          <input 
            type="checkbox" 
            onChange={changeTaskStatusHandler} // обращаемся к evnt для получения инфо которая будет записанна в newIsDone и засетана в стейт 
            checked={task.isDone}/>
          <span>{task.title}</span>
          <button onClick={removeTask}>X</button>
        </li>
      )
    })
  : <span>Your taskslist is empty</span>

    const addTask = () => {
      const trimedTitle = title.trim()
      if (trimedTitle !== '') {
        props.addTask(trimedTitle)
      } else {
        setError(true)
      }
      setTitle('')
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      error && setError(false)
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

    const errorMessage = error && <p style={{color: "red", fontWeight: 'bold' }}>Title is required</p>

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input 
          type='text'
          value={title} 
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
          className={error ? 'input-error' : ''}/>
        <button onClick={addTask}>+</button>
        {errorMessage}
      </div>
      <ul>
        {tasksList}
      </ul>
      <div>
        <button 
          className={props.filter === 'all' ? 'active-btn' : ''} 
          onClick={handlerCreator('all')}>All</button>
        <button 
          className={props.filter === 'active' ? 'active-btn'  : ''} 
          onClick={handlerCreator('active')}>Active</button>
        <button 
          className={props.filter === 'completed' ? 'active-btn'  : ''} 
          onClick={handlerCreator('completed')}>Completed</button>
      </div>
    </div>
  );
};

export default TodoList;
