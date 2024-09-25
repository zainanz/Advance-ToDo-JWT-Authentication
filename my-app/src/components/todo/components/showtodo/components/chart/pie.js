import { Doughnut } from "react-chartjs-2";
import React from "react";

export default function ShowChart({chartData}){

  return (<Doughnut
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "My Todos Graph"
            }
          }
        }}
      />)
}
