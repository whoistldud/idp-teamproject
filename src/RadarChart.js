/*eslint-disable*/
import "./App.css";
import "chart.js";


function RadarChart() {
  new Chart(document.getElementById("radar-chart"), {
    type: 'radar',
    data: {
      labels: ["병상수", "의료인수", "입원실수"],
      datasets: [
        {
          label: "노원을지대학교병원",
          fill: true,
          backgroundColor: "rgba(204,51,102,0.2)",
          borderColor: "rgba(204,51,102,1)",
          pointBorderColor: "#fff",
          pointBackgroundColor: "rgba(204,51,102,1)",
          data: [546, 741, 123]
        },
        {
          label: "인제대학교 상계백병원",
          fill: true,
          backgroundColor: "rgba(0, 102,204,0.2)",
          borderColor: "rgba(0, 102,204,1)",
          pointBorderColor: "#fff",
          pointBackgroundColor: "rgba(0, 102,204,1)",
          data: [541, 962, 135]
        },
        {
          label: "한국원자력의학원원자력병원",
          fill: true,
          backgroundColor: "rgba(0,153,102,0.2)",
          borderColor: "rgba(0,153,102,1)",
          pointBorderColor: "#fff",
          pointBackgroundColor: "rgba(0,153,102,1)",
          data: [479, 616, 162]
        },
        {
          label: "더조은요양병원",
          fill: true,
          backgroundColor: "rgba(255,153,0,0.2)",
          borderColor: "rgba(255,153,0,1)",
          pointBorderColor: "#fff",
          pointBackgroundColor: "rgba(255,153,0,1)",
          data: [299, 65, 58]
        },
        {
          label: "그레이스힐 요양병원",
          fill: true,
          backgroundColor: "rgba(102, 51, 153,0.2)",
          borderColor: "rgba(102, 51, 153,1)",
          pointBorderColor: "#fff",
          pointBackgroundColor: "rgba(102, 51, 153,1)",
          data: [220, 15, 41]
        }
  
      ]
    },
    options: {
      
      title: {
        display: true,
        text: '병상수 기준 Top5 병원 레이더 차트'
      }
    }
  });
}

export default RadarChart;