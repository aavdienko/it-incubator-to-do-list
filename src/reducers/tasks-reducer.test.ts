import { v1 } from "uuid";
import { TodlistTaskType } from "../components/ToDoList";
import { addTaskAC, changeTaskStatusAC, editTaskAC, removeTaskAC, tasksReducer } from "./tasks-reducer";
import { addTodolistAC, removeTodolistAC } from "./todolist-reducer";

let TODO_LIST_ID1: string
let TODO_LIST_ID2: string
let TASK_ID_1: string
let startState: TodlistTaskType


beforeEach( () => {

  TODO_LIST_ID1 = v1();
  TODO_LIST_ID2 = v1();
  TASK_ID_1 = v1()
  startState = {
    [TODO_LIST_ID1]: [
      { id: TASK_ID_1, title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
      { id: v1(), title: 'CSS', isDone: false },
    ],
    [TODO_LIST_ID2]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
      { id: v1(), title: 'CSS', isDone: false },
    ],
  }
})

test('correct task should be removed', ()=>{

  const endState = tasksReducer(startState, removeTaskAC(TODO_LIST_ID1, TASK_ID_1))

  expect(endState[TODO_LIST_ID1].length).toBe(3)
  expect(endState[TODO_LIST_ID1][0].title).toBe('JS')
  expect(endState[TODO_LIST_ID1][0].title).not.toBe('HTML&CSS')
})

test('new task should be added into correct todolist', () => {

  const endState = tasksReducer(startState, addTaskAC(TODO_LIST_ID1, 'jjjj'))

  expect(endState[TODO_LIST_ID1].length).toBe(5)
  expect(endState[TODO_LIST_ID1][0].title).toBe('jjjj')
  expect(endState[TODO_LIST_ID1][0].isDone).toBe(false)
  expect(endState[TODO_LIST_ID2].length).toBe(4)
})

test('status of correct task should be changed', () => {

  const endState = tasksReducer(startState, changeTaskStatusAC(TODO_LIST_ID1, TASK_ID_1, false))

  expect(endState[TODO_LIST_ID1].length).toBe(4)
  expect(endState[TODO_LIST_ID2].length).toBe(4)
  expect(endState[TODO_LIST_ID1][0].isDone).toBeFalsy()
  expect(endState[TODO_LIST_ID2][0].isDone).toBeTruthy()
})

test('title of correct task should be changed', () => {

  const endState = tasksReducer(startState, editTaskAC(TODO_LIST_ID1, TASK_ID_1, 'New Ttitle for T1'))

  expect(endState[TODO_LIST_ID1].length).toBe(4)
  expect(endState[TODO_LIST_ID2].length).toBe(4)
  expect(endState[TODO_LIST_ID1][0].isDone).toBeTruthy()
  expect(endState[TODO_LIST_ID1][0].title).toBe('New Ttitle for T1')
})

test('property with todolistId should be deleted', () => {
  // const startState: TodlistTaskType = {
  //     'todolistId1': [
  //         {id: '1', title: 'CSS', isDone: false},
  //         {id: '2', title: 'JS', isDone: true},
  //         {id: '3', title: 'React', isDone: false}
  //     ],
  //     'todolistId2': [
  //         {id: '1', title: 'bread', isDone: false},
  //         {id: '2', title: 'milk', isDone: true},
  //         {id: '3', title: 'tea', isDone: false}
  //     ]
  // }

  // const action = removeTodolistAC('todolistId2')

  const action = removeTodolistAC(TODO_LIST_ID2)
  const endState = tasksReducer(startState, action)
  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState[TODO_LIST_ID2]).not.toBeDefined()
})
