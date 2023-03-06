import { TaskType } from './../components/ToDoList';
import { v1 } from "uuid";
import { TodlistTaskType } from "../components/ToDoList";
import { AddTodolistACType, ADD_TODOLIST, RemoveTodolistACType, REMOVE_TODOLIST } from './todolist-reducer';

type MainActionType = RemoveTaskACType | AddTaskACType | ChangeTaskStatusAC | EditTaskACType | AddTodolistACType | RemoveTodolistACType

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusAC = ReturnType<typeof changeTaskStatusAC>
type EditTaskACType = ReturnType<typeof editTaskAC>
// type AddTasksForNewTodoType = ReturnType<typeof addTasksForNewTodo>

const REMOVE_TASK = 'REMOVE-TASK'
const ADD_TASK = 'ADD-TASK'
const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS'
const EDIT_TASK = 'EDIT-TASK'
// const ADD_TASK_FOR_NEW_TODO = 'ADD-TASK-FOR-NEW-TODO'


export const tasksReducer = (state: TodlistTaskType, action: MainActionType): TodlistTaskType => {
  switch(action.type) {
    case REMOVE_TASK: {
      return {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)}
    }
    case ADD_TASK: {
      const newTask: TaskType = {
        id: v1(),
        title: action.payload.title,
        isDone: false
      }
      return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
    }
    case CHANGE_TASK_STATUS: {
      return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(task=> task.id === action.payload.taskId ? {...task, isDone: action.payload.newIsDone} : task)}
    }
    case EDIT_TASK: {
      return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {...task, title: action.payload.newTitle} : task)}
    }
    case ADD_TODOLIST: {
      return {[action.payload.newTodolistId]: [], ...state }    
    }
    case REMOVE_TODOLIST: {
      const stateCopy = {...state}
       delete stateCopy[action.payload.todolistId] 
       return stateCopy
    }    
    
    // case ADD_TASK_FOR_NEW_TODO: {
    //   return { ...state, [action.payload.newTodolistId]: [ ]}
    // }
    default: return state
  }
}

export const removeTaskAC = (todolistId: string, taskId: string) => {
  return {
    type: REMOVE_TASK,
    payload: {
      todolistId,
      taskId
    } 
  } as const
}

export const addTaskAC = (todolistId: string, title: string) => {
  return {
    type: ADD_TASK,
    payload: {
      todolistId,
      title
    } 
  } as const
}

export const changeTaskStatusAC = (todolistId: string,
  taskId: string,
  newIsDone: boolean) => {
  return {
    type: CHANGE_TASK_STATUS,
    payload: {
      todolistId,
      taskId,
      newIsDone
    } 
  } as const
}

export const editTaskAC = (todolistId: string, taskId: string, newTitle: string) => {
  return {
    type: EDIT_TASK,
    payload: {
      todolistId,
      taskId,
      newTitle
    } 
  } as const
}

// export const addTasksForNewTodo = (newTodolistId: string) => {
//   return {
//     type: ADD_TASK_FOR_NEW_TODO,
//     payload: {
//       newTodolistId
//     } 
//   } as const
// }