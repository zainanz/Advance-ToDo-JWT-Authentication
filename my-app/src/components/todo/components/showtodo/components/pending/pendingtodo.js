import { useDispatch } from "react-redux";
import { markAsCompleted, deleteTodo } from "../../../../../../app/store/todoSlice";

export default function PendingTodo({data}){

  const dispatch = useDispatch();

  const handleMarkAsComplete = (e, id) => {
    e.target.parentNode.classList.add("remove-todo")
    setTimeout(() => {
      dispatch(markAsCompleted(id));
    }, 300);
  }

  const handleDeleteTodo = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteTodo(id));
  }
  return (
    <div>

    {data.length === 0 ?
      <h3 className="my-5 playwrite-de-grund text-secondary"> no pending todos.. </h3>
      : (data.map(todo =>
        (
          <div key={todo.id} className="pending-todo rounded card-color my-2 d-flex justify-content-between align-items-center px-3 card-container-boxshadow" style={{height:"50px", position:'relative'}}>
            <h4 className="d-flex playwrite-de-grund d-flex align-items-center text-dark" style={{ whiteSpace: "nowrap", overflow: "scroll", width:"400px", height:"50px"}}>{todo.content}</h4>
              <button className="rounded d-flex align-items-center close-button" onClick={(e) => handleDeleteTodo(e, todo.id)} style={{height:'20px',position:"absolute", right: '0px', top:'0px'}}>x</button>
              <button className="mx-3 mark-as-done" onClick={(e) => handleMarkAsComplete(e, todo.id)}>Done</button>
          </div>
        )
      ))
      }
    </div>
  )
}
