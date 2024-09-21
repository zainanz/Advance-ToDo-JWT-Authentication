import "../../../color.css"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux";
import { loadtodo, addTodo } from "../../../../app/store/todoSlice";
import "./addtodo.css"


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
    setTodo("")
  }

  useEffect( () => {
    dispatch(loadtodo())
  }, [])

  return (
    <div className="d-flex justify-content-center py-5 primary-bg">
      <form className="" onSubmit={handleAddSubmit}>
        <input className="rounded px-2 todo-content" placeholder="Make your bed.." style={{width:"500px", height: "50px"}} onChange={handleTodo} value={todo}/>
        <input className="mx-3 text-white fw-bolder border-none rounded" style={{backgroundColor:"#A5B68D", width:"90px", height: "49px"}} type="submit" value="Add" />
      </form>
    </div>
  )
}
