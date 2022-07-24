const db = require("../models");

module.exports.renderDashboard = async (req, res) => {
  // COMMENT THIS OUT IF YOU WANT TO TEST A USER FROM DB
  const currentUser = req.user;
  // USE THIS TO BY PASS LOGIN AND USE A DUMMY USER
  //   console.log(req.user);
  //   const user = {
  //     first_name: "argel",
  //     last_name: "miralles",
  //   };
  // GET ALL PROJECTS FOR PROJECT TABLE
  const projects = await db.project.findAll({
    include: [
      db.ticket,
      {
        model: db.reference_code,
        as: "projectPriority",
      },
    ],
    where: {
      projectStatusRefId: "ps1",
    },
  });
  // GET ALL TICKETS FOR TICKETS
  const tickets = await db.ticket.findAll({
    include: [
      {
        model: db.project,
        as: "project",
      },
      {
        model: db.reference_code,
        as: "ticketType",
      },
      {
        model: db.reference_code,
        as: "ticketStatus",
      },
      {
        model: db.reference_code,
        as: "ticketPriority",
      },
    ],
  });
  // GET ALL USERS FOR USERS
  const users = await db.user.findAll();
  res.render("pages/dashboard/index", {
    currentUser,
    projects,
    tickets,
    users,
  });
};
