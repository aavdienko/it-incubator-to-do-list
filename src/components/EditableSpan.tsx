import { TextField } from "@mui/material";
import { ChangeEvent, FC, useState } from "react";

type EditableSpanPropsType = {
  title: string
  callBack: (newTitle: string) => void
}

export const EditableSpan: FC<EditableSpanPropsType> = (props) => {
  const [newTitle, setNewTitle] = useState(props.title)
  const [edit, setEdit] = useState(false)
  const editFooHandler = () => {
    setEdit(!edit)
    props.callBack(newTitle)
  }
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement> ) => {
    setNewTitle(event.currentTarget.value)

  }
 return (
  edit 
    ? <TextField onChange={onChangeHandler} autoFocus onBlur={editFooHandler} value={newTitle}/> 
    : <span onDoubleClick={editFooHandler}>{props.title}</span>
 )
}

{/* <input onChange={onChangeHandler} autoFocus onBlur={editFooHandler} value={newTitle}/>  */}