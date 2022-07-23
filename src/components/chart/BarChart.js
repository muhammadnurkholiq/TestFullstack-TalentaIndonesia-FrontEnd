import React, { useEffect, useState } from "react";
import * as chartJs from "chart.js";
import { Bar } from "react-chartjs-2";

// API
import { API } from "../../config/API";

// css
import "../../assets/css/components/chart/index.css";

chartJs.Chart.register(
  chartJs.CategoryScale,
  chartJs.LinearScale,
  chartJs.BarElement,
  chartJs.Title,
  chartJs.ArcElement,
  chartJs.Tooltip,
  chartJs.Legend
);

export default function BarChart() {
  const [friend, setFriend] = useState([]);

  // get data
  const getFriend = async () => {
    try {
      const response = await API.get("/friends");
      if (response.data.status === "Success") {
        setFriend(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Friend presentase by gender and age",
      },
    },
  };

  console.log(friend);

  let femaleUnder19 = [];
  let maleUnder19 = [];
  let femaleOver19 = [];
  let maleOver19 = [];

  friend.map((item) => {
    if (item.gender === "Female" && item.age <= 19) {
      femaleUnder19.push(femaleUnder19.length + 1);
    }
    if (item.gender === "Male" && item.age <= 19) {
      maleUnder19.push(maleUnder19.length + 1);
    }
    if (item.gender === "Female" && item.age > 19) {
      femaleOver19.push(femaleOver19.length + 1);
    }
    if (item.gender === "Male" && item.age > 19) {
      maleOver19.push(maleOver19.length + 1);
    }
  });

  const data = {
    labels: [
      "Female under 19 years old",
      "Male under 19 years old",
      "Female over 19 years old",
      "Male over 19 years old",
    ],
    datasets: [
      {
        data: [
          femaleUnder19.length,
          maleUnder19.length,
          femaleOver19.length,
          maleOver19.length,
        ],
        backgroundColor: ["#FFC4DD", "#72FFFF", "#F73D93", "#0096FF"],
      },
    ],
  };

  useEffect(() => {
    getFriend();
  }, []);

  return <Bar options={options} data={data} className="chart" />;
}
