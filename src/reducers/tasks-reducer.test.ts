import { v1 } from "uuid";
import { TodlistTaskType } from "../components/ToDoList";
import { removeTaskAC, tasksReducer } from "./tasks-reducer";


test('correct task should be removed', ()=>{

  const TODO_LIST_ID1: string = v1();
  const TODO_LIST_ID2: string = v1();
  const TASK_ID_1 = v1()

  const startState: TodlistTaskType = {
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
  const endState = tasksReducer(startState, removeTaskAC(TODO_LIST_ID1, TASK_ID_1))

  expect(endState[TODO_LIST_ID1].length).toBe(3)
  expect(endState[TODO_LIST_ID1][0].title).toBe('JS')
  expect(endState[TODO_LIST_ID1][0].title).not.toBe('HTML&CSS')
})

test('new task should be added into correct todolist', ()=>{

  const TODO_LIST_ID1: string = v1();
  const TODO_LIST_ID2: string = v1();
  const TASK_ID_1 = v1()

  const startState: TodlistTaskType = {
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
  const endState = tasksReducer(startState, removeTaskAC(TODO_LIST_ID1, TASK_ID_1))

  expect(endState[TODO_LIST_ID1].length).toBe(3)
  expect(endState[TODO_LIST_ID1][0].title).toBe('JS')
  expect(endState[TODO_LIST_ID1][0].title).not.toBe('HTML&CSS')
})
