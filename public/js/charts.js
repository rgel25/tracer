const data1 = {
  labels: ["Talently", "Tracer", "PSStudios"],
  datasets: [
    {
      label: "My First Dataset",
      data: [88, 50, 22],
      backgroundColor: ["#008DA6", "#00406C", "#00668E"],
      hoverOffset: 4,
    },
  ],
};

const config1 = {
  type: "pie",
  data: data1,
  options: {},
};
const myChart = new Chart(document.getElementById("chart1"), config1);

// #191D43
// #00406C
// #00668E
// #008DA6
// #00B4B3
// #65DBB7

const data2 = {
  labels: ["Unassigned", "Assigned", "Testing", "Closed", "Archived"],
  datasets: [
    {
      label: "My First Dataset",
      data: [20, 5, 3, 15, 23],
      backgroundColor: ["#008DA6", "#00406C", "#00668E", " #00B4B3", "#65DBB7"],
      hoverOffset: 4,
    },
  ],
};

const config2 = {
  type: "pie",
  data: data2,
  options: {},
};
const chart2 = new Chart(document.getElementById("chart2"), config2);

const data3 = {
  labels: ["Maintenance", "UI", "Runtime", "New Development"],
  datasets: [
    {
      label: "My First Dataset",
      data: [15, 45, 30, 5],
      backgroundColor: ["#008DA6", "#00406C", "#00668E", " #00B4B3", "#65DBB7"],
      hoverOffset: 4,
    },
  ],
};

const config3 = {
  type: "pie",
  data: data3,
  options: {},
};
const chart3 = new Chart(document.getElementById("chart3"), config3);

const data4 = {
  labels: ["Urgent", "High", "Medium", "Low"],
  datasets: [
    {
      label: "My First Dataset",
      data: [3, 12, 22, 26],
      backgroundColor: ["#008DA6", "#00406C", "#00668E", " #00B4B3", "#65DBB7"],
      hoverOffset: 4,
    },
  ],
};

const config4 = {
  type: "pie",
  data: data4,
  options: {},
};
const chart4 = new Chart(document.getElementById("chart4"), config4);
