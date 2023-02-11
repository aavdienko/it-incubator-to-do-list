import { ChangeEvent, FC, KeyboardEvent, useState } from "react"

type SuperInputPropsType = {
  callBack: (title: string) => void
}


export const SuperInput: FC<SuperInputPropsType> = (props) => {
  const [title, setTitle] = useState<string>('')
  const [error, setError] = useState<boolean>(false)


  const addTask = () => {

    const newTitle = title.trim()
    if (newTitle !== '') {
      props.callBack(newTitle)
    } else {
      setError(true)
    }
    setTitle('')
  }

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    error && setError(false)
    setTitle(event.currentTarget.value)
  }
  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    event.key === 'Enter' && addTask()
  }

const errorMessage = error && <p style={{color: "red", fontWeight: 'bold' }}>Title is required</p>

  return (
    <div>
    <input 
      type='text'
      value={title} 
      onChange={onChangeHandler}
      onKeyDown={onKeyDownHandler}
      className={error ? 'input-error' : ''}/>
    <button onClick={addTask}>+</button>
    {errorMessage}
  </div>
  )
}