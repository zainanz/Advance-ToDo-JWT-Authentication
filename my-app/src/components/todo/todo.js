import "../color.css"
import "./todo.css"
import AddTodo from  "./components/addtodo/addtodo.js"
import ShowTodo from "./components/showtodo/showtodo.js"



export default function Todo(){

  return (
    <div>
      <h1 className="text-center my-5 sofadi-one-regular"> Manage your daily tasks </h1>
      <AddTodo/>
      <ShowTodo/>
    </div>
    )

}
