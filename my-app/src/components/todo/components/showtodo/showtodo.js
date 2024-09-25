import { useSelector } from "react-redux"
import { lazy, useEffect } from "react";
import { useState } from "react";
//Styling
import "./showtodo.css"

//components
import PendingTodo from "./components/pending/pendingtodo";
import CompletedList from "./components/completed/completedlist";
const PieChart = lazy(() => import("./components/chart/piechart"));


export default function ShowTodo(){
  const [active, setActive] = useState("pending");
  const todos = useSelector(state => state.todo);

  const handleSetActive = (display) => {
    console.log(display)
    setActive(display)
  }

  return (
    <>
      <div className="mobile flex-column align-items-center ">
        <div className="buttons my-3">
          <button onClick={() => handleSetActive("chart")} className="mx-3 text-white fw-bolder border-none rounded" style={{backgroundColor:"#A5B68D", width:"90px", height: "49px"}}>
            Graph
          </button>
          <button onClick={() => handleSetActive("pending")} className="mx-3 text-white fw-bolder border-none rounded" style={{backgroundColor:"#A5B68D", width:"90px", height: "49px"}}>
            Pending
          </button>
          <button onClick={() => handleSetActive("history")} className="mx-3 text-white fw-bolder border-none rounded" style={{backgroundColor:"#A5B68D", width:"90px", height: "49px"}}>
            History
          </button>
        </div>
        <div>
          {
            active === "chart" && <PieChart/>

          }
          {
            active === "pending" && <PendingTodo data={todos.todos.filter(todo => !todo.completed)}/>
          }
          {
            active === "history" && <CompletedList data={todos.todos.filter(todo => todo.completed)}/>
          }
        </div>
      </div>

      <div className="big-screen flex-column align-items-center">
        <div className="appear">
          <CompletedList data={todos.todos.filter( todo => todo.completed)} />
        </div>
        <div className="appear">
          <PendingTodo data={todos.todos.filter( todo => !todo.completed)}/>
        </div>
        <div className="appear">
          <PieChart  />
        </div>
      </div>
    </>
  )
}
