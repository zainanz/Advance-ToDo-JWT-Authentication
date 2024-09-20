import { useSelector } from "react-redux"
export default function ShowTodo(){
  const todos = useSelector(state => state.todo);
  return (
    <div>{
      todos.todos
    }</div>
  )
}
