import { FilterValuesType, TodolistsType } from "../App";

type MainActionType = RemoveTodolistACType | AddTodolistACType | ChangeTodolistFilterACType | EditTodolistACType

type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
type AddTodolistACType = ReturnType<typeof addTodolistAC>
type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
type EditTodolistACType=ReturnType<typeof editTodolistAC>

const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
const ADD_TODOLIST = 'ADD-TODOLIST'
const CHANGE_FILTER = 'CHANGE-FILTER'
const EDIT_TODOLIST = 'EDIT-TODOLIST'


export const todolistsReducer = (state: TodolistsType[], action: MainActionType): TodolistsType[] => {
  switch(action.type) {
    case REMOVE_TODOLIST: {
      return state.filter(todolist => todolist.id !== action.payload.todolistId)
    }
    case ADD_TODOLIST: {
      const newTodo: TodolistsType = {
        id: action.payload.newTodolistId,
        title: action.payload.newTitle,
        filter: 'all'
      }
      return [newTodo, ...state]
    }
    case CHANGE_FILTER: {
      return state.map(todolist => todolist.id === action.payload.todolistId ? {...todolist, filter: action.payload.filter}: todolist)
    }
    case EDIT_TODOLIST: {
      return state.map(todolist => todolist.id === action.payload.todolistId ? {...todolist, title: action.payload.newTitle} : todolist)
    }
    default: return state
  }
}

export const removeTodolistAC = (todolistId: string) => {
  return {
    type: REMOVE_TODOLIST,
    payload: {
      todolistId
    }
  } as const
}

export const addTodolistAC = (newTitle: string, newTodolistId: string) => {
  return {
    type: ADD_TODOLIST,
    payload: {
      newTitle,
      newTodolistId
    }
  } as const
}

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
  return {
    type: CHANGE_FILTER,
    payload: {
      todolistId,
      filter,
    }
  } as const
}

export const editTodolistAC = (todolistId: string, newTitle: string) => {
  return {
    type: EDIT_TODOLIST,
    payload: {
      todolistId,
      newTitle,
    }
  } as const
}