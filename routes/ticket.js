const express = require("express");
const router = express.Router();
const db = require("../models");
const { Op } = require("sequelize");

// Get all ticket
router.get("/", (req, res) => {
  // COMMENT THIS OUT IF YOU WANT TO TEST A USER FROM DB
  // const user = req.user;
  // USE THIS TO BY PASS LOGIN AND USE A DUMMY USER
  const user = {
    first_name: "argel",
    last_name: "miralles",
  };

  db.ticket
    .findAll({
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
      return res.render("pages/ticket/index", { user, tickets });
    });
});

router.get("/search", (req, res) => {
  // COMMENT THIS OUT IF YOU WANT TO TEST A USER FROM DB
  // const user = req.user;
  // USE THIS TO BY PASS LOGIN AND USE A DUMMY USER
  const user = {
    first_name: "argel",
    last_name: "miralles",
  };

  db.ticket
    .findAll({
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
      // where: {
      //   id: req.query.ticketID
      // }
      where: {
        title: { [Op.like]: '%' + req.query.ticketID.toLowerCase() + '%'}
      }
    })
    .then((tickets) => {
      return res.render("pages/ticket/index", { user, tickets });
    });
});

// Get Ticket Details
router.get("/details/:id", async (req, res) => {
  // COMMENT THIS OUT IF YOU WANT TO TEST A USER FROM DB
  // const user = req.user;
  // USE THIS TO BY PASS LOGIN AND USE A DUMMY USER
  const user = {
    first_name: "argel",
    last_name: "miralles",
  };

  // Get all ticket History
  // const ticketHistory = await db.ticket_history.findAll({ where : { ticketId : req.body.ticketId } })

  // Get every developer who is assigned to this ticket.
  const assignedDeveloper = await db.ticket_asign_developer.findAll({
    where: {
      ticketId: req.params.id,
    },
    include: db.user,
  });
  const devId = assignedDeveloper.map((dev) => dev.userId);

  // Get every developer who is not assigned to this ticket.
  const developer = await db.user.findAll({
    where: {
      id: {
        [Op.notIn]: devId,
      },
      userRoleRefId: "ur3",
    },
  });

  // Gel all comment in this ticket
  const comments = await db.comment.findAll({
    where: { ticketId: req.params.id },
    include: db.user,
  });

  const ticket = await db.ticket.findOne({
    where: {
      id: req.params.id,
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
    user,
    ticket,
    developer,
    comments,
    assignedDeveloper,
  });
});

// create new comment
router.post("/comment/new", async (req, res) => {
  // COMMENT THIS OUT IF YOU WANT TO TEST A USER FROM DB
  // const user = req.user;
  // USE THIS TO BY PASS LOGIN AND USE A DUMMY USER
  const user = {
    first_name: "argel",
    last_name: "miralles",
  };
  const comments = await db.comment.create({
    comment: req.body.comment,
    ticketId: req.body.ticketId,
    userId: req.body.userId,
  });

  return res.redirect("/ticket/details/" + req.body.ticketId);
});

// assign new developer
router.post("/assign/developer", async (req, res) => {
  // COMMENT THIS OUT IF YOU WANT TO TEST A USER FROM DB
  // const user = req.user;
  // USE THIS TO BY PASS LOGIN AND USE A DUMMY USER
  const user = {
    first_name: "argel",
    last_name: "miralles",
  };
  const userInfo = await db.user.findOne({ where: { id: req.body.developer } });
  const userName = userInfo.first_name + " " + userInfo.last_name;
  db.ticket_history.create({
    title: "New Assigned Ticket Developer",
    description: userName,
    ticketId: req.body.ticketId,
    userId: req.body.userId,
  });
  db.ticket_asign_developer.create({
    userId: req.body.developer,
    ticketId: req.body.ticketId,
  });

  return res.redirect(`/ticket/details/${req.body.ticketId}`);
});

module.exports = router;
