const colors = [
  "#004352",
  "#00668E",
  "#00B4B3",
  "#494873",
  "#008DA6",
  "#00406C",
];

const projectLabels = [];
const projectData = [];
projects.forEach((project) => {
  // GET ALL PROJECT NAMES
  projectLabels.push(project.project_name);
  //   GET ALL TICKETS RELATED TO PRORJECTS AND PUSH TO PROJECT DATA
  projectData.push(
    tickets.filter((ticket) => ticket.projectId === project.id).length
  );
});

const data1 = {
  labels: projectLabels,
  datasets: [
    {
      label: "Tickets by project",
      data: projectData,
      backgroundColor: colors,
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

const unassignedTickets = tickets.filter(
  (t) => t.ticketStatus.ref_id === "ts1"
).length;
const assignedTickets = tickets.filter(
  (t) => t.ticketStatus.ref_id === "ts2"
).length;
const testingTickets = tickets.filter(
  (t) => t.ticketStatus.ref_id === "ts3"
).length;
const closedTickets = tickets.filter(
  (t) => t.ticketStatus.ref_id === "ts4"
).length;
const archivedTickets = tickets.filter(
  (t) => t.ticketStatus.ref_id === "ts5"
).length;

const data2 = {
  labels: ["Unassigned", "Assigned", "Testing", "Closed", "Archived"],
  datasets: [
    {
      label: "Ticket by status",
      data: [
        unassignedTickets,
        assignedTickets,
        testingTickets,
        closedTickets,
        archivedTickets,
      ],
      backgroundColor: colors,
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

const blockerTickets = tickets.filter(
  (t) => t.ticketType.ref_id === "tt1"
).length;
const uiTickets = tickets.filter((t) => t.ticketType.ref_id === "tt2").length;
const bugTickets = tickets.filter((t) => t.ticketType.ref_id === "tt3").length;
const newfeatureTickets = tickets.filter(
  (t) => t.ticketType.ref_id === "tt4"
).length;

const data3 = {
  labels: ["Blocker", "UI/UX", "Bug", "New Feature"],
  datasets: [
    {
      label: "Ticket by type",
      data: [blockerTickets, uiTickets, bugTickets, newfeatureTickets],
      backgroundColor: colors,
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

const urgentTickets = tickets.filter(
  (t) => t.ticketPriority.ref_id === "tp1"
).length;
const highTickets = tickets.filter(
  (t) => t.ticketPriority.ref_id === "tp2"
).length;
const mediumTickets = tickets.filter(
  (t) => t.ticketPriority.ref_id === "tp3"
).length;
const lowTickets = tickets.filter(
  (t) => t.ticketPriority.ref_id === "tp4"
).length;

const data4 = {
  labels: ["Urgent", "High", "Medium", "Low"],
  datasets: [
    {
      label: "Ticket by Priority",
      data: [urgentTickets, highTickets, mediumTickets, lowTickets],
      backgroundColor: colors,
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
