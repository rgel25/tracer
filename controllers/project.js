const db = require("../models");
const { Op } = require("sequelize");

////////////////////////////////////////////////////////////////////////////////////////// Get All Projects
module.exports.projects = async (req, res) => {
  // COMMENT THIS OUT IF YOU WANT TO TEST A USER FROM DB
  const currentUser = req.user;
  // USE THIS TO BY PASS LOGIN AND USE A DUMMY USER
  // const user = {
  //     first_name: "argel",
  //     last_name: "miralles",
  // };
  const projects = await db.project.findAll({
    include: [
      db.ticket,
      {
        model: db.reference_code,
        as: "projectPriority",
      },
    ],
    where: {
      projectStatusRefId: {
        [Op.not]: "ps3",
      },
    },
  });
  return res.render("pages/project/index", { currentUser, projects });
};

////////////////////////////////////////////////////////////////////////////////////////// Get | New project form
module.exports.renderNewProjectForm = (req, res) => {
  // COMMENT THIS OUT IF YOU WANT TO TEST A USER FROM DB
  const currentUser = req.user;
  // USE THIS TO BY PASS LOGIN AND USE A DUMMY USER
  // const user = {
  //     first_name: "argel",
  //     last_name: "miralles",
  // };
  return res.render("pages/project/newProject", { currentUser });
};

////////////////////////////////////////////////////////////////////////////////////////// Post | New project
module.exports.newProject = async (req, res) => {
  const {
    project_name,
    project_description,
    project_start,
    project_end,
    projectPriorityRefId,
  } = req.body;
  const errors = [];

  // Check all Fields
  if (
    !project_name ||
    !project_description ||
    !project_start ||
    !project_end ||
    !projectPriorityRefId
  ) {
    errors.push({ errorMsg: "Please fill in all fields." });
  }
  // Check Description length
  if (project_description.length < 10) {
    errors.push({ errorMsg: "Description should at least be 10 characters." });
  }
  // Check Start Date
  let today = new Date().toISOString().slice(0, 10);
  if (project_start < today) {
    errors.push({ errorMsg: "Please enter valid start date" });
  }
  // Check Start Date
  if (project_start > project_end) {
    errors.push({ errorMsg: "Please enter valid end date" });
  }

  if (errors.length > 0) {
    req.flash(
      "error",
      errors.map((err) => err.errorMsg)
    );
    res.redirect("/dashboard/projects/new");
  } else {
    await db.project.create({
      project_name: req.body.project_name,
      project_description: req.body.project_description,
      project_start: req.body.project_start,
      project_end: req.body.project_end,
      projectPriorityRefId: req.body.projectPriorityRefId,
    });
    req.flash("success", "Project Successfully Created");
    return res.redirect("/dashboard/projects");
  }
};

//////////////////////////////////////////////////////////////////////////////////////////  GET | Update Project Form
module.exports.renderUpdateProjectForm = (req, res) => {
  const { id } = req.params;
  // COMMENT THIS OUT IF YOU WANT TO TEST A USER FROM DB
  const currentUser = req.user;
  // USE THIS TO BY PASS LOGIN AND USE A DUMMY USER
  // const user = {
  //     first_name: "argel",
  //     last_name: "miralles",
  // };
  db.project
    .findAll({
      where: {
        id: id,
      },
    })
    .then((projects) => {
      return res.render("pages/project/updateProject", {
        currentUser,
        projects,
      });
    });
};

////////////////////////////////////////////////////////////////////////////////////////// PUT | Update Project
module.exports.updateProject = async (req, res) => {
  const { id } = req.params;

  await db.project.update(
    {
      project_name: req.body.project_name,
      project_description: req.body.project_description,
      project_start: req.body.project_start,
      project_end: req.body.project_end,
      projectPriorityRefId: req.body.projectPriorityRefId,
    },
    {
      where: {
        id: id,
      },
    }
  );
  req.flash("success", "Project Updated Successfully");
  return res.redirect(`/dashboard/projects/${id}/view`);
};

////////////////////////////////////////////////////////////////////////////////////////// delete | delete project
module.exports.deleteProject = async (req, res) => {
  const { id } = req.params;

  await db.project.destroy({
    where: {
      id: id,
    },
  });

  req.flash("success", "Project Permanently Deleted");
  return res.redirect("/dashboard/projects/archive");
};

////////////////////////////////////////////////////////////////////////////////////////// Get | View Project
module.exports.viewProject = async (req, res) => {
  const { id } = req.params;
  // COMMENT THIS OUT IF YOU WANT TO TEST A USER FROM DB
  const currentUser = req.user;
  // USE THIS TO BY PASS LOGIN AND USE A DUMMY USER
  // const user = {
  //     first_name: "argel",
  //     last_name: "miralles",
  //     userId : 1
  // };

  // get assigned manager
  const assignedManager = await db.project.findOne({
    where: { id: id },
    include: {
      model: db.user,
      as: "manager",
    },
  });

  // Get every developer who is not assigned to this ticket.
  const manager = await db.user.findAll({
    where: {
      userRoleRefId: "ur2",
    },
  });

  await db.project
    .findOne({
      include: [
        {
          model: db.ticket,
          as: "tickets",
          include: [
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
        },
        {
          model: db.reference_code,
          as: "projectPriority",
        },
      ],
      where: {
        id: id,
      },
    })
    .then((projects) => {
      return res.render("pages/project/viewProject", {
        currentUser,
        projects,
        manager,
        assignedManager,
      });
    });
};

////////////////////////////////////////////////////////////////////////////////////////// get all project archived
module.exports.archivedProjects = async (req, res) => {
  // COMMENT THIS OUT IF YOU WANT TO TEST A USER FROM DB
  const currentUser = req.user;
  // USE THIS TO BY PASS LOGIN AND USE A DUMMY USER
  // const user = {
  //     first_name: "argel",
  //     last_name: "miralles",
  // };
  const projects = await db.project.findAll({
    include: [
      db.ticket,
      {
        model: db.reference_code,
        as: "projectPriority",
      },
    ],
    where: {
      projectStatusRefId: "ps3",
    },
  });
  return res.render("pages/project/archivedProject", { currentUser, projects });
};

////////////////////////////////////////////////////////////////////////////////////////// archive specific project

module.exports.archiveProject = async (req, res) => {
  const { id } = req.params;

  await db.project.update(
    {
      projectStatusRefId: "ps3",
    },
    {
      where: {
        id: id,
      },
    }
  );
  req.flash("success", "Project Archived Successfully");
  return res.redirect("/dashboard/projects");
};

/////////////////////////////////////////////////////////////////////////////////////////////////// assign project manager

module.exports.assignProjectManager = async (req, res) => {
  await db.project.update(
    {
      managerId: req.body.projectManager,
    },
    {
      where: {
        id: req.body.projectId,
      },
    }
  );
  return res.redirect("/dashboard/projects/1/view");
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports.renderMyProjectPage = async (req, res) => {
  // COMMENT THIS OUT IF YOU WANT TO TEST A USER FROM DB
  const currentUser = req.user;
  // USE THIS TO BY PASS LOGIN AND USE A DUMMY USER
  // const user = {
  //     first_name: "argel",
  //     last_name: "miralles",
  //     userId: 1
  // };
  const projects = await db.project.findAll({
    include: [
      db.ticket,
      {
        model: db.reference_code,
        as: "projectPriority",
      },
    ],
    where: {
      managerId: currentUser.id,
      projectStatusRefId: {
        [Op.not]: "ps3",
      },
    },
  });
  return res.render("pages/project/myProject", { currentUser, projects });
};
