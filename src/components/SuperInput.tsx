import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';

type SuperInputPropsType = {
  callBack: (title: string) => void;
};

export const SuperInput: FC<SuperInputPropsType> = (props) => {
  const [title, setTitle] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const addTask = () => {
    const newTitle = title.trim();
    if (newTitle !== '') {
      props.callBack(newTitle);
    } else {
      setError(true);
    }
    setTitle('');
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    error && setError(false);
    setTitle(event.currentTarget.value);
  };
  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    event.key === 'Enter' && addTask();
  };

  const errorMessage = error && (
    <p style={{ color: 'red', fontWeight: 'bold' }}>Title is required</p>
  );

  return (
    <div>
      {/* <input
        value={title}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        className={error ? 'input-error' : ''}
      /> */}
      <TextField
        id="standard-basic" 
        label={error ? 'Title is required' : "Title"} // отрисовываем label или текс ошибки 
        variant="standard"
        value={title}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        // className={error ? 'input-error' : ''}
        error={!!error} // через псевдоложь меняем занчение ошибки со строки на boolean
        // helperText={errorMessage}
      />

      {/* <button onClick={addTask}>+</button> */}
      <IconButton
        onClick={addTask}
        color="success"
      >
        <AddCircleIcon style={{color: 'black'}}/>
      </IconButton>
      {/* {errorMessage} */}
    </div>
  );
};

// variant="contained"
// size="small"
// color="success"