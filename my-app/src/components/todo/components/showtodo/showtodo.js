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
      {/* Shows all the uncompleted todos */}
      <PendingTodo data={todos.todos.filter( todo => !todo.completed)}/>

      {/* This shows all the completed todos */}
      <CompletedList data={todos.todos.filter( todo => todo.completed)} />
      {/* This shows your todo task */}
      <PieChart/>
    </div>
  )
}
