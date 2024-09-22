import { useRef, useEffect } from "react";
import { useSelector } from "react-redux"
import { lazy } from "react";
//Styling
import "./showtodo.css"

//components
import PendingTodo from "./components/pending/pendingtodo";
import CompletedList from "./components/completed/completedlist";
const PieChart = lazy(() => import("./components/chart/piechart"));
export default function ShowTodo(){
  const pendingRef = useRef(null);
  const chartRef = useRef(null);
  const completedRef = useRef(null);
  const todos = useSelector(state => state.todo);

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="appear" ref={completedRef}>
        <CompletedList data={todos.todos.filter( todo => todo.completed)} />
      </div>
      <div className="appear" ref={pendingRef}>
        <PendingTodo data={todos.todos.filter( todo => !todo.completed)}/>
      </div>
      <div className="appear" ref={chartRef}>
        <PieChart  />
      </div>
    </div>
  )
}
