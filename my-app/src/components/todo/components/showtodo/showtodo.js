import { useSelector } from "react-redux"
import "./showtodo.css"
export default function ShowTodo(){
  const todos = useSelector(state => state.todo);
  return (
    <div className="d-flex flex-column align-items-center">
      {
      todos.todos.map(todo => {
        return (
          <div className="rounded card-color my-2 d-flex justify-content-between align-items-center px-3 card-container-boxshadow" style={{height:"90px", width:"750px", position:'relative'}}>
            <h2 className="important-color overflow-scroll" style={{width:"600px"}}>{todo}</h2>
              <button className="rounded d-flex align-items-center close-button" style={{height:'20px',position:"absolute", right: '0px', top:'0px'}}>x</button>
              <button className="mx-3 mark-as-done" >Mark as done</button>
          </div>
        )
      })
      }
    </div>
  )
}
