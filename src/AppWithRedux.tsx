import './App.css';
import { ButtonAppBar } from './components/ButtonAppBar';
import { SuperInput } from './components/SuperInput';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { addTodolistAC, } from './reducers/todolist-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';
import { TodoListWithRedux } from './components/ToDoListWithRedux';
import { useCallback } from 'react';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistsType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

const AppWithRedux = () => {
  console.log('app')
  const todolists = useSelector<AppRootStateType, Array<TodolistsType>>( state => state.todolists)
  const dispatch = useDispatch()

  const addTodolist = useCallback((newTitle: string) => {
    dispatch(addTodolistAC(newTitle))
  }, []); 

  return (
    <div className="App">
      <ButtonAppBar />
      <Container fixed>
        <Grid container style={{padding:'20px'}}>
          <SuperInput callBack={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
        {todolists.map((todolist) => {
          return ( 
            <Grid key={todolist.id} item>
              <Paper style={{padding:'10px'}} elevation={3}>
                <TodoListWithRedux
                  id={todolist.id}
                  title={todolist.title}
                  filter={todolist.filter}
                /> 
              </Paper>
            </Grid>
          );
        })}
        </Grid>
      </Container>
    </div>
  );
};

export default AppWithRedux;
