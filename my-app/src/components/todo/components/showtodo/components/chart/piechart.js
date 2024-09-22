import { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import ShowChart from "./pie";
import { useSelector } from "react-redux";
export default function PieChart(){
  const todo = useSelector(state => state.todo);


  const [chartData, setChartData] = useState({
    labels: ["Completed", "Pending"],
    datasets: [
      {
        label: "Users Gained ",
        data: [todo.todos.length, todo.todos.filter( todo => !todo.completed).length],
        backgroundColor: [
          "#588157",
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
            label: "Users Gained ",
            data:  [ todo.todos.filter( todo => todo.completed).length, todo.todos.filter( todo => !todo.completed).length],
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
    }, [todo.todos])

  if (todo.todos.length < 1) return
  return (
    <div className="mx-3 todo-graph">
          <h5 className="my-1 sofadi-one-regular text-center">Graph</h5>
          <ShowChart chartData={chartData}/>
    </div>
  )
}
