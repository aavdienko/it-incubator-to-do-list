import { TodolistsType, FilterValuesType} from './../App';
import { v1 } from "uuid"
import { addTodolistAC, changeTodolistFilterAC, editTodolistAC, removeTodolistAC, todolistsReducer } from "./todolist-reducer"


test('correct todolist should be removed', ()=>{

  const todoListTitle1: string = 'What to learn';
  const todoListTitle2: string = 'What to buy';
  const TODO_LIST_ID1: string = v1();
  const TODO_LIST_ID2: string = v1();

  const startState: TodolistsType[] = [
    { id: TODO_LIST_ID1, title: todoListTitle1, filter: 'all' },
    { id: TODO_LIST_ID2, title: todoListTitle2, filter: 'all' },]

  const endState = todolistsReducer(startState, removeTodolistAC(TODO_LIST_ID1))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(TODO_LIST_ID2)
  
})

test('new todolist should be added', ()=>{

  const todoListTitle1: string = 'What to learn';
  const todoListTitle2: string = 'What to buy';
  const TODO_LIST_ID1: string = v1();
  const TODO_LIST_ID2: string = v1();

  const NEW_TODOLIST_ID = v1()
  const newTitle: string = 'New Todo Title'

  const startState: TodolistsType[] = [
    { id: TODO_LIST_ID1, title: todoListTitle1, filter: 'all' },
    { id: TODO_LIST_ID2, title: todoListTitle2, filter: 'all' },]

  const endState = todolistsReducer(startState, addTodolistAC(newTitle, NEW_TODOLIST_ID))

  expect(endState.length).toBe(3)
  expect(endState[0].id).toBe(NEW_TODOLIST_ID)
  
})

test('filter for correct todolist should be changed', ()=>{

  const todoListTitle1: string = 'What to learn';
  const todoListTitle2: string = 'What to buy';
  const TODO_LIST_ID1: string = v1();
  const TODO_LIST_ID2: string = v1();

  const filter: FilterValuesType = 'active'

  const startState: TodolistsType[] = [
    { id: TODO_LIST_ID1, title: todoListTitle1, filter: 'all' },
    { id: TODO_LIST_ID2, title: todoListTitle2, filter: 'all' },]

  const endState = todolistsReducer(startState, changeTodolistFilterAC(TODO_LIST_ID1, filter))

  expect(endState[0].filter).toBe('active')
  expect(endState[1].filter).toBe('all')
  
})

test('correct todolist should be changed', ()=>{

  const todoListTitle1: string = 'What to learn';
  const todoListTitle2: string = 'What to buy';
  const TODO_LIST_ID1: string = v1();
  const TODO_LIST_ID2: string = v1();

  const newTitle: string = 'New Todo Title'

  const startState: TodolistsType[] = [
    { id: TODO_LIST_ID1, title: todoListTitle1, filter: 'all' },
    { id: TODO_LIST_ID2, title: todoListTitle2, filter: 'all' },]

  const endState = todolistsReducer(startState, editTodolistAC(TODO_LIST_ID1, newTitle))

  expect(endState[0].title).toBe(newTitle)
  expect(endState[0].title).not.toBe(todoListTitle1)
  expect(endState[1].title).toBe(todoListTitle2)
  
})

