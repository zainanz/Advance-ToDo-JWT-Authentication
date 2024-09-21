import { Pie } from "react-chartjs-2";

export default function ShowChart({chartData}){
  return (<Pie
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
