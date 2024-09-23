import "../color.css"
import "./todo.css"
import AddTodo from  "./components/addtodo/addtodo.js"
import ShowTodo from "./components/showtodo/showtodo.js"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

export default function Todo(){
  const [authCheck, setAuthCheck] = useState(false);
  const navigate = useNavigate();
  const auth = useSelector(state => state.auth)
  useEffect( () => {
    if(!auth.isLoggedIn){
      console.log(auth)
      navigate("/")
    } else {
      setAuthCheck(true);
    }
  }, [])
  return (
    <div>
      <h1 className="text-center my-5 sofadi-one-regular"> Manage your daily tasks </h1>
      <AddTodo/>
      <ShowTodo/>
    </div>
    )

}
