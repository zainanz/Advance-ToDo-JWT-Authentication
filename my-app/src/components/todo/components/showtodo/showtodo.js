import { useSelector } from "react-redux"
import { lazy } from "react";
//Styling
import "./showtodo.css"

//components
import PendingTodo from "./components/pending/pendingtodo";
import CompletedList from "./components/completed/completedlist";
const PieChart = lazy(() => import("./components/chart/piechart"));
export default function ShowTodo(){
  const todos = useSelector(state => state.todo);

  return (
    <div className="d-flex flex-column align-items-center">
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
  )
}
