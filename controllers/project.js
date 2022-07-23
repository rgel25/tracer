const db = require("../models");
const router = require("../routes/project");


// Get All Projects
module.exports.projects = async (req, res) => {
    // COMMENT THIS OUT IF YOU WANT TO TEST A USER FROM DB
  // const user = req.user;
  // USE THIS TO BY PASS LOGIN AND USE A DUMMY USER
    const user = {
        first_name: "argel",
        last_name: "miralles",
    };
    const projects = await db.project.findAll({
    include: [
        db.ticket,
        {
            model: db.reference_code,
            as : 'projectPriority'
        }
    ],
        where: {
            projectStatusRefId: "ps1"
        }
    })
    return res.render("pages/project/index", { user , projects })
    // .then(projects => {
    // return res.render("pages/project/index", { user , projects })
    // })
};

// Get | New project form 
module.exports.renderNewProjectForm = (req, res) => {
    // COMMENT THIS OUT IF YOU WANT TO TEST A USER FROM DB
    // const user = req.user;
    // USE THIS TO BY PASS LOGIN AND USE A DUMMY USER
    const user = {
        first_name: "argel",
        last_name: "miralles",
    };
    return res.render("pages/project/newProject", {user})
}

// Post | New project
module.exports.newProject = async (req, res) => {
    // COMMENT THIS OUT IF YOU WANT TO TEST A USER FROM DB
    // const user = req.user;
    // USE THIS TO BY PASS LOGIN AND USE A DUMMY USER
    const user = {
        first_name: "argel",
        last_name: "miralles",
    };
    await db.project.create({
        project_name: req.body.project_name,
        project_description: req.body.project_description,
        project_start: req.body.project_start,
        project_end: req.body.project_end,
        projectPriorityRefId: req.body.projectPriorityRefId,
    })
    return res.redirect("/dashboard/projects");
};


// GET | Update Project Form
module.exports.renderUpdateProjectForm = (req, res) => {
    const { id } = req.params;
    // COMMENT THIS OUT IF YOU WANT TO TEST A USER FROM DB
    // const user = req.user;
    // USE THIS TO BY PASS LOGIN AND USE A DUMMY USER
    const user = {
        first_name: "argel",
        last_name: "miralles",
    };
    db.project.findAll({
        where: {
            id: id
        }
    }).then(projects => {
        return res.render("pages/project/updateProject",  { user , projects });
})
}

// PUT | Update Project
module.exports.updateProject = async (req,res) => {
    const { id } = req.params;
    // COMMENT THIS OUT IF YOU WANT TO TEST A USER FROM DB
    // const user = req.user;
    // USE THIS TO BY PASS LOGIN AND USE A DUMMY USER
    const user = {
        first_name: "argel",
        last_name: "miralles",
    };

    await db.project.update({
        project_name: req.body.project_name,
        project_description: req.body.project_description,
        project_start: req.body.project_start,
        project_end: req.body.project_end,
        projectPriorityRefId: req.body.projectPriorityRefId
    }, {
        where: {
            id : id
        }
    });
    return res.redirect(`/dashboard/projects/${id}/view`);
};


//delete | delete project
module.exports.deleteProject = async (req,res) => {
    const { id } = req.params;
    // COMMENT THIS OUT IF YOU WANT TO TEST A USER FROM DB
    // const user = req.user;
    // USE THIS TO BY PASS LOGIN AND USE A DUMMY USER
    const user = {
        first_name: "argel",
        last_name: "miralles",
    };

    await db.project.destroy({
        where: {
            id: id
        }
    })

    return res.redirect("/dashboard/projects");
};


// Get | View Project 
module.exports.viewProject = (req, res) => {
    const { id } = req.params;
    // COMMENT THIS OUT IF YOU WANT TO TEST A USER FROM DB
    // const user = req.user;
    // USE THIS TO BY PASS LOGIN AND USE A DUMMY USER
    const user = {
        first_name: "argel",
        last_name: "miralles",
    };
    db.project.findOne({
        include: [
            { 
                model: db.ticket,
                as: 'tickets',
                include:[
                    {
                        model: db.reference_code,
                        as: 'ticketType'
                    },
                    {
                        model: db.reference_code,
                        as: 'ticketStatus'
                    },
                    {
                        model: db.reference_code,
                        as: 'ticketPriority'
                    },
                ]
            },
            {
                model: db.reference_code,
                as : 'projectPriority'
            },
            
        ],
        where: {
            id: id,
        }
    }).then(projects => {
        console.log(projects)
        return res.render("pages/project/viewProject",  { user , projects });
})
}


//get all project archived
module.exports.archivedProjects = async (req, res) => {
    // COMMENT THIS OUT IF YOU WANT TO TEST A USER FROM DB
  // const user = req.user;
  // USE THIS TO BY PASS LOGIN AND USE A DUMMY USER
    const user = {
        first_name: "argel",
        last_name: "miralles",
    };
    const projects = await db.project.findAll({
    include: [
        db.ticket,
        {
            model: db.reference_code,
            as : 'projectPriority'
        }
    ],
        where: {
            projectStatusRefId: "ps3"
        }
    })
    return res.render("pages/project/archivedProject", { user , projects })
};

// archive specific project

module.exports.archiveProject = async (req,res) => {
    const { id } = req.params;
    // COMMENT THIS OUT IF YOU WANT TO TEST A USER FROM DB
    // const user = req.user;
    // USE THIS TO BY PASS LOGIN AND USE A DUMMY USER
    const user = {
        first_name: "argel",
        last_name: "miralles",
    };

    await db.project.update({
        projectStatusRefId: "ps3"
    }, {
        where: {
            id: id
        }
    });
    return res.redirect("/dashboard/projects");
}