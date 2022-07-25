const db = require("../models");
const { Op } = require("sequelize");

//////////////////////////////////////////////////////////////// Get all ticket
module.exports.tickets = async (req, res) => {
  const currentUser = req.user;

  await db.ticket
    .findAll({
      where: {
        ticketStatusRefId: {
          [Op.not]: "ts5",
        },
      },
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
    })
    .then((tickets) => {
      return res.render("pages/ticket/index", { currentUser, tickets });
    });
};

//////////////////////////////////////////////////////////////// Get all my ticket
module.exports.renderMyTicketPage = async (req, res) => {
  // COMMENT THIS OUT IF YOU WANT TO TEST A USER FROM DB
  const currentUser = req.user;
  const id = req.user.id;
  // USE THIS TO BY PASS LOGIN AND USE A DUMMY USER

  const tickets = await db.ticket.findAll({
    where: {
      developerId: id,
      ticketStatusRefId: {
        [Op.not]: "ts5",
      },
    },
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

  return res.render("pages/ticket/myTicket", { currentUser, tickets });
};

//////////////////////////////////////////////////////////////// Get all archived ticket
module.exports.renderArchivedTicketPage = async (req, res) => {
  const currentUser = req.user;

  const tickets = await db.ticket.findAll({
    where: { ticketStatusRefId: "ts5" },
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
  return res.render("pages/ticket/archivedTickets", { currentUser, tickets });
};

////////////////////////////////////////////////////////////////////// Render Add Ticket page
module.exports.renderAddTicketPage = async (req, res) => {
  const currentUser = req.user;
  const projects = await db.project.findAll();
  const ticketPriority = await db.reference_code.findAll({
    where: { group_name: "tp" },
  });
  const ticketType = await db.reference_code.findAll({
    where: { group_name: "tt" },
  });

  return res.render("pages/ticket/addTicket", {
    currentUser,
    projects,
    ticketPriority,
    ticketType,
  });
};

////////////////////////////////////////////////////////////////////// Add Ticket
module.exports.addTicket = async (req, res) => {
  const currentUserId = req.user.id;

  const errors = [];
  // Check all required fields
  if (
    !req.body.title ||
    !req.body.description ||
    !req.body.ticketType ||
    !req.body.projectId ||
    !req.body.ticketPriority
  ) {
    errors.push({ errorMsg: "Please fill in all fields." });
  }

  if (errors.length > 0) {
    // VALIDATION FAIL
    req.flash(
      "error",
      errors.map((err) => err.errorMsg)
    );
    res.redirect("/auth/signup");
  } else {
    // VALIDATION PASS
    const addTicket = await db.ticket.create({
      title: req.body.title,
      description: req.body.description,
      ticketTypeRefId: req.body.ticketType,
      projectId: req.body.projectId,
      ticketPriorityRefId: req.body.ticketPriority,
      userId: currentUserId,
    });
    req.flash("success", "Ticket successfully created!");
    return res.redirect("/dashboard/ticket");
  }
};

/////////////////////////////////////////////////////////////////////// Get one ticket
module.exports.getTicket = async (req, res) => {
  const currentUser = req.user;

  const { id } = req.params;
  const projects = await db.project.findAll();
  const ticketStatus = await db.reference_code.findAll({
    where: { group_name: "ts" },
  });
  const ticketPriority = await db.reference_code.findAll({
    where: { group_name: "tp" },
  });
  const ticketType = await db.reference_code.findAll({
    where: { group_name: "tt" },
  });
  const ticket = await db.ticket.findOne({
    where: { id: id },
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

  return res.render("pages/ticket/updateTicket", {
    currentUser,
    ticket,
    projects,
    ticketStatus,
    ticketType,
    ticketPriority,
  });
};

////////////////////////////////////////////////////////////////// View Ticket Details
module.exports.ticketDetails = async (req, res) => {
  const currentUser = req.user;

  const { id } = req.params;
  // Get all ticket History
  const ticketHistory = await db.ticket_history.findAll({
    include: db.user,
    where: { ticketId: id },
  });

  // get assigned developer
  const assignedDeveloper = await db.ticket.findOne({
    where: { id: id },
    include: {
      model: db.user,
      as: "developer",
    },
  });

  // Get every developer who is not assigned to this ticket.
  const developer = await db.user.findAll({
    where: {
      id: {
        [Op.not]: assignedDeveloper.developerId,
      },
      userRoleRefId: {
        [Op.in]: ["ur3", "ur4"],
      },
    },
  });

  // Gel all comment on this ticket
  const comments = await db.comment.findAll({
    where: { ticketId: id },
    include: db.user,
  });

  const ticket = await db.ticket.findOne({
    where: {
      id: id,
    },
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
  return res.render("pages/ticket/details", {
    currentUser,
    ticket,
    developer,
    comments,
    assignedDeveloper,
    ticketHistory,
  });
};

///////////////////////////////////////////////////////////////// update Ticket
module.exports.updateTicket = async (req, res) => {
  const currentUserId = req.user.id;

  const id = req.body.ticketId;

  const changesRaw = [];
  if (req.body.originalTitle !== req.body.title) {
    changesRaw.push("Title");
  }
  if (req.body.originalDescription !== req.body.description) {
    changesRaw.push("Description");
  }
  if (req.body.originalProjectId !== req.body.projectId) {
    changesRaw.push("ProjectId");
  }
  if (req.body.originalTicketPriority !== req.body.ticketPriority) {
    changesRaw.push("Priority");
  }
  if (req.body.originalTicketStatus !== req.body.ticketStatus) {
    changesRaw.push("Status");
  }
  if (req.body.originalTicketType !== req.body.ticketType) {
    changesRaw.push("Type");
  }
  const historyDescription = changesRaw.join(", ").concat(" updated");

  await db.ticket_history.create({
    title: "Ticket Update",
    description: historyDescription,
    ticketId: req.body.ticketId,
    userId: currentUserId,
  });

  await db.ticket.update(
    {
      title: req.body.title,
      description: req.body.description,
      projectId: req.body.projectId,
      ticketPriorityRefId: req.body.ticketPriority,
      ticketStatusRefId: req.body.ticketStatus,
      ticketTypeRefId: req.body.ticketType,
    },
    {
      where: {
        id: id,
      },
    }
  );
  req.flash("success", "The ticket was updated successfully!");
  return res.redirect("/dashboard/ticket");
};

//////////////////////////////////////////////////////////////// delete ticket
module.exports.deleteTicket = async (req, res) => {
  const ticketId = req.params.id;
  await db.ticket.destroy({
    where: { id: ticketId },
  });
  req.flash("success", "The ticket was deleted successfully!");
  return res.redirect("/dashboard/ticket/archive");
};

//////////////////////////////////////////////////////////////// archive ticket
module.exports.archiveTicket = async (req, res) => {
  const ticketId = req.params.id;
  await db.ticket.update(
    {
      ticketStatusRefId: "ts5",
    },
    { where: { id: ticketId } }
  );
  req.flash("success", "A ticket has been archived!");
  return res.redirect("/dashboard/ticket");
};

/////////////////////////////////////////////////////////////// create new comment
module.exports.addComment = async (req, res) => {
  const currentUserId = req.user.id;
  const comments = await db.comment.create({
    comment: req.body.comment,
    ticketId: req.body.ticketId,
    userId: currentUserId,
  });

  return res.redirect(`/dashboard/ticket/details/${req.body.ticketId}`);
};

/////////////////////////////////////////////////////////////////// assign new developer
module.exports.assignDeveloper = async (req, res) => {
  const currentUserId = req.user.id;
  const userInfo = await db.user.findOne({ where: { id: req.body.developer } });
  const formatName = (...inputs) => {
    return inputs
      .map((input) => {
        return input
          .split(" ")
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join(" ");
      })
      .join(" ");
  };
  const userName = formatName(userInfo.first_name, userInfo.last_name);
  const ticketStatus = await db.ticket.findOne({
    where: { id: req.body.ticketId },
  });
  await db.ticket_history.create({
    title: "New Assigned Ticket Developer",
    description: userName,
    ticketId: req.body.ticketId,
    userId: currentUserId,
  });
  await db.ticket.update(
    {
      developerId: req.body.developer,
    },
    {
      where: {
        id: req.body.ticketId,
      },
    }
  );

  if (ticketStatus.ticketStatusRefId === "ts1") {
    await db.ticket.update(
      {
        ticketStatusRefId: "ts2",
      },
      {
        where: {
          id: req.body.ticketId,
        },
      }
    );
  }

  return res.redirect(`/dashboard/ticket/details/${req.body.ticketId}`);
};
