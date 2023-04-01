import { TodolistsType, FilterValuesType} from './../App';
import { v1 } from "uuid"
import { addTodolistAC, changeTodolistFilterAC, editTodolistAC, removeTodolistAC, todolistsReducer } from "./todolist-reducer"

// вынесли данные из всех тестов наверх чтобы не дублировать :)
// перед каждыйм тестом, с помощью beforeEach мы сетаем дефолтное значение стейта для всех тестов.

let todoListTitle1: string
let todoListTitle2: string
let TODO_LIST_ID1: string
let TODO_LIST_ID2: string
let startState: TodolistsType[]

beforeEach( () => {
  todoListTitle1 = 'What to learn';
  todoListTitle2 = 'What to buy';
  TODO_LIST_ID1 = v1();
  TODO_LIST_ID2 = v1();
  startState = [
    { id: TODO_LIST_ID1, title: todoListTitle1, filter: 'all' },
    { id: TODO_LIST_ID2, title: todoListTitle2, filter: 'all' },]
})


test('correct todolist should be removed', ()=>{

  // const todoListTitle1: string = 'What to learn';
  // const todoListTitle2: string = 'What to buy';
  // const TODO_LIST_ID1: string = v1();
  // const TODO_LIST_ID2: string = v1();

  // const startState: TodolistsType[] = [
  //   { id: TODO_LIST_ID1, title: todoListTitle1, filter: 'all' },
  //   { id: TODO_LIST_ID2, title: todoListTitle2, filter: 'all' },]

  const endState = todolistsReducer(startState, removeTodolistAC(TODO_LIST_ID1))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(TODO_LIST_ID2)
  
})

test('new todolist should be added', ()=>{

  // const todoListTitle1: string = 'What to learn';
  // const todoListTitle2: string = 'What to buy';
  // const TODO_LIST_ID1: string = v1();
  // const TODO_LIST_ID2: string = v1();

  // const NEW_TODOLIST_ID = v1()
  const newTitle: string = 'New Todo Title'

  // const startState: TodolistsType[] = [
  //   { id: TODO_LIST_ID1, title: todoListTitle1, filter: 'all' },
  //   { id: TODO_LIST_ID2, title: todoListTitle2, filter: 'all' },]

  const endState = todolistsReducer(startState, addTodolistAC(newTitle))

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(newTitle)
  expect(endState[0].id).toBeDefined()
})

test('filter for correct todolist should be changed', ()=>{

  const filter: FilterValuesType = 'active'

  const endState = todolistsReducer(startState, changeTodolistFilterAC(TODO_LIST_ID1, filter))

  expect(endState[0].filter).toBe('active')
  expect(endState[1].filter).toBe('all')
  
})

test('correct todolist should be changed', ()=>{

  const newTitle: string = 'New Todo Title'

  const endState = todolistsReducer(startState, editTodolistAC(TODO_LIST_ID1, newTitle))

  expect(endState[0].title).toBe(newTitle)
  expect(endState[0].title).not.toBe(todoListTitle1)
  expect(endState[1].title).toBe(todoListTitle2)
  
})

