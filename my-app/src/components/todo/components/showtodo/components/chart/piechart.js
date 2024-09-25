import { useState, useEffect } from "react";
import ShowChart from "./pie";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useSelector } from "react-redux";

export default function PieChart(){

  const todo = useSelector(state => state.todo);
  const completedTodo = todo.todos.filter( todo => todo.completed).length
  const pendingTodo = todo.todos.filter( todo => !todo.completed).length
  Chart.register(CategoryScale);
  const [chartData, setChartData] = useState({
    labels: ["Completed", "Pending"],
    datasets: [
      {
        label: "Tasks Stats",
        data:  [ completedTodo, pendingTodo],
        backgroundColor: [
          "#588157",
          "#e9edc9",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderWidth: 2
      }
    ]
  });

    useEffect( () => {
      setChartData({
        labels: ["Completed", "Pending"],
        datasets: [
          {
            label: "Tasks Stats",
            data:  [ completedTodo, pendingTodo],
            backgroundColor: [
              "#588157",
              "#e9edc9",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0"
            ],
            borderWidth: 2
          }
        ]
      })
    }, [completedTodo, pendingTodo, todo.todos])

  if (todo.todos.length < 1) return
  return (
    <div className="mx-3 todo-graph d-flex flex-column align-items-center">
          <h5 className="my-1 sofadi-one-regular text-center">Graph</h5>
          <ShowChart chartData={chartData}/>
          {
            pendingTodo === 0 ? <h6 className="my-5 fs-5 fw-bolder fst-italic">You caught up!</h6>
            : <h6 className="my-5 fs-5 fw-bolder fst-italic"> You have <span style={{color: '#198754'}}>{pendingTodo}</span> pending task.</h6>

          }
    </div>
  )
}
