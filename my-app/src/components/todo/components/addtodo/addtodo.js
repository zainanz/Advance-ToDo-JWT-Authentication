import "../../../color.css"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux";
import { loadtodo, addTodo } from "../../../../app/store/todoSlice";


export default function AddTodo(){



  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();


  const handleTodo = (e) => {
    console.log(e.target.value)
    setTodo(e.target.value)
  }

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if(todo === '') return
    dispatch(addTodo(todo))
  }

  useEffect( () => {
    dispatch(loadtodo())
  }, [])

  return (
    <div>
      <form onSubmit={handleAddSubmit}>
        <input onChange={handleTodo} value={todo}/>
        <input type="submit" value="Add" />
      </form>
    </div>
  )
}
