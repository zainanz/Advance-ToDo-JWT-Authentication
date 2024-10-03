import "../color.css"
import "./todo.css"
import { lazy,Suspense } from "react"
import AddTodo from "./components/addtodo/addtodo.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
const ShowTodo = lazy( () => import("./components/showtodo/showtodo.js"));


export default function Todo(){

  return (
    <div>

      <h1 className="text-center my-5 sofadi-one-regular"> Manage your daily tasks </h1>
      <AddTodo/>
      <Suspense fallback={<div style={{width:"100%", height:"100%"}} className="d-flex justify-content-center flex-column align-items-center"><FontAwesomeIcon className="fs-5 loading-animate" icon={faSpinner} /> Loading your projects..</div>}>
        <ShowTodo/>
      </Suspense>
    </div>
    )

}
