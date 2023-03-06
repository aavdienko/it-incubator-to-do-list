import { v1 } from "uuid";
import { TodolistsType } from "../App";
import { TodlistTaskType } from "../components/ToDoList";
import { tasksReducer } from "./tasks-reducer";
import { addTodolistAC, todolistsReducer } from "./todolist-reducer";

// test('empty array should be added for new todolist', ()=>{

//   const TODO_LIST_ID1: string = v1();
//   const TODO_LIST_ID2: string = v1();
//   const TODO_LIST_ID3: string = v1();

//   const startState: TodlistTaskType = {
//     [TODO_LIST_ID1]: [
//       { id: v1(), title: 'HTML&CSS', isDone: true },
//       { id: v1(), title: 'JS', isDone: true },
//       { id: v1(), title: 'ReactJS', isDone: false },
//       { id: v1(), title: 'CSS', isDone: false },
//     ],
//     [TODO_LIST_ID2]: [
//       { id: v1(), title: 'HTML&CSS', isDone: true },
//       { id: v1(), title: 'JS', isDone: true },
//       { id: v1(), title: 'ReactJS', isDone: false },
//       { id: v1(), title: 'CSS', isDone: false },
//     ],
//   }
//   const endState = tasksReducer(startState, addTodolistAC('3rd todo'))

//   expect(endState[TODO_LIST_ID1].length).toBe(4)
//   expect(endState[TODO_LIST_ID2].length).toBe(4)
//   expect(endState.length).toBe(3)
// })

test('new array should be added when new todolist is added', () => {
  const startState: TodlistTaskType = {
      'todolistId1': [
          {id: '1', title: 'CSS', isDone: false},
          {id: '2', title: 'JS', isDone: true},
          {id: '3', title: 'React', isDone: false}
      ],
      'todolistId2': [
          {id: '1', title: 'bread', isDone: false},
          {id: '2', title: 'milk', isDone: true},
          {id: '3', title: 'tea', isDone: false}
      ]
  }

  const action = addTodolistAC('new todolist')

  const endState = tasksReducer(startState, action)


  const keys = Object.keys(endState) // массив Todolist ID
  const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
  if (!newKey) {
      throw Error('new key should be added')
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test('ids should be equals', () => {
  const startTasksState: TodlistTaskType = {}
  const startTodolistsState: Array<TodolistsType> = []

  const action = addTodolistAC('new todolist')

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState) // массив из 1 id todolist
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.newTodolistId)
  expect(idFromTodolists).toBe(action.payload.newTodolistId)
})
