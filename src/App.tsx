import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import TodoList, { TaskType } from './components/ToDoList';


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
// const todoListTitle2: string = 'What to buy';

export type FilterValuesType = 'all' | 'active' | 'completed'

const App = () => {

const [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
    { id: v1(), title: 'CSS', isDone: false },
  ])

const [filter, setFilter] = useState<FilterValuesType>('all')
const changeFilter = (filter: FilterValuesType) => {
  setFilter(filter)
}

const getFilteredTasksForRender = 
  (tasks: Array<TaskType>, filter: FilterValuesType):Array<TaskType> => {
    switch(filter){
      case 'active': return tasks.filter(task => task.isDone === false)
      case 'completed': return tasks.filter(task => task.isDone === true)
      default: return tasks
    }
}
const removeTask = (taskId: string) => {
  setTasks(tasks.filter(task => task.id !== taskId))
}
const filteredTasksForRender = getFilteredTasksForRender(tasks, filter)



  return (
    <div className="App">
      <TodoList 
        title={todoListTitle1} 
        tasks={filteredTasksForRender} 
        removeTask={removeTask}
        changeFilter={changeFilter}
        />
      {/* <TodoList title={todoListTitle2} tasks={tasks2} /> */}
    </div>
  );
};

export default App;
