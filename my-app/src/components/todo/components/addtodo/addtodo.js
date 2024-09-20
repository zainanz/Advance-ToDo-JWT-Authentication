import "../../../color.css"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux";
import { loadtodo } from "../../../../app/store/todoSlice";


export default function AddTodo(){



  const [todo, setTodo] = useState(0);
  const dispatch = useDispatch();



  const handleAddSubmit = (e) => {
    e.preventDefault();
    console.log("Submit")
  }

  useEffect( () => {
    dispatch(loadtodo())
  }, [])

  return (
    <div>
      <form onSubmit={handleAddSubmit}>
        <input type="text" />
        <input type="submit" value="Add" />
      </form>
    </div>
  )
}
