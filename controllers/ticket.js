const db = require("../models");
const { Op } = require("sequelize");


//////////////////////////////////////////////////////////////// Get all ticket
module.exports.tickets = async (req, res) => {
    // COMMENT THIS OUT IF YOU WANT TO TEST A USER FROM DB
    // const user = req.user;
    // USE THIS TO BY PASS LOGIN AND USE A DUMMY USER
    const user = {
        first_name: "argel",
        last_name: "miralles",
    };

    await db.ticket.findAll({
        include: [
        {
            model: db.project,
            as : 'project'
        },
        {
            model: db.reference_code,
            as : 'ticketType'
        },
        {
            model: db.reference_code,
            as : 'ticketStatus'
        },
        {
            model: db.reference_code,
            as : 'ticketPriority'
        }
    ]
    }).then( tickets => {
        return res.render("pages/ticket/index", { user , tickets});
    });

};

//////////////////////////////////////////////////////////////// Get all my ticket
module.exports.renderMyTicketPage = async (req, res) => {
    // COMMENT THIS OUT IF YOU WANT TO TEST A USER FROM DB
    // const user = req.user;
    // USE THIS TO BY PASS LOGIN AND USE A DUMMY USER
    const user = {
        first_name: "argel",
        last_name: "miralles",
        userId : 1
    };

    const tickets = await db.ticket_asign_developer.findAll({
        include: [{
            model: db.ticket,
            as : 'ticket',
            include: [
                {
                    model: db.project,
                    as : 'project'
                },
                {
                    model: db.reference_code,
                    as : 'ticketType'
                },
                {
                    model: db.reference_code,
                    as : 'ticketStatus'
                },
                {
                    model: db.reference_code,
                    as : 'ticketPriority'
                }]
        }]
    },{
        where : {
            userId : user.userId
        }
    })

    return res.render("pages/ticket/myTicket", { user , tickets});
   
};

//////////////////////////////////////////////////////////////// Get all archived ticket
module.exports.renderArchivedTicketPage = async (req, res) => {
    // COMMENT THIS OUT IF YOU WANT TO TEST A USER FROM DB
    // const user = req.user;
    // USE THIS TO BY PASS LOGIN AND USE A DUMMY USER
    const user = {
        first_name: "argel",
        last_name: "miralles",
        userId : 1
    };

    const tickets = await db.ticket.findAll({
        where : { ticketStatusRefId : 'ts5' },
        include : [
            {
                model: db.project,
                as : 'project'
            },
            {
                model: db.reference_code,
                as : 'ticketType'
            },
            {
                model: db.reference_code,
                as : 'ticketStatus'
            },
            {
                model: db.reference_code,
                as : 'ticketPriority'
            }
        ]
    })

    return res.render("pages/ticket/archivedTickets", { user , tickets});
   
};


////////////////////////////////////////////////////////////////////// Render Add Ticket page
module.exports.renderAddTicketPage = async (req, res) => {
    // COMMENT THIS OUT IF YOU WANT TO TEST A USER FROM DB
    // const user = req.user;
    // USE THIS TO BY PASS LOGIN AND USE A DUMMY USER
    const user = {
        first_name: "argel",
        last_name: "miralles",
    };
    const projects = await db.project.findAll();
    const ticketPriority = await db.reference_code.findAll({ where : { group_name : 'tp'} });
    const ticketType = await db.reference_code.findAll({ where : { group_name : 'tt'} });
    
    return res.render("pages/ticket/addTicket", { 
        user , 
        projects , 
        ticketPriority ,
        ticketType
    });
}

////////////////////////////////////////////////////////////////////// Add Ticket
module.exports.addTicket = async (req, res) => {
    // COMMENT THIS OUT IF YOU WANT TO TEST A USER FROM DB
    // const user = req.user;
    // USE THIS TO BY PASS LOGIN AND USE A DUMMY USER
    const user = {
        first_name: "argel",
        last_name: "miralles",
        userId: 1 
    };

    const addTicket = await db.ticket.create({
        title : req.body.title,
        description : req.body.description,
        ticketTypeRefId : req.body.ticketType,
        projectId : req.body.projectId,
        ticketPriorityRefId : req.body.ticketPriority,
        userId : user.userId
    })

    return res.redirect("/dashboard/ticket");
}

/////////////////////////////////////////////////////////////////////// Get one ticket
module.exports.getTicket = async (req, res) => {
     // COMMENT THIS OUT IF YOU WANT TO TEST A USER FROM DB
    // const user = req.user;
    // USE THIS TO BY PASS LOGIN AND USE A DUMMY USER
    const user = {
        first_name: "argel",
        last_name: "miralles",
    };

    const { id } = req.params;
    const projects = await db.project.findAll();
    const ticketStatus = await db.reference_code.findAll({ where : { group_name : 'ts'} });
    const ticketPriority = await db.reference_code.findAll({ where : { group_name : 'tp'} });
    const ticketType = await db.reference_code.findAll({ where : { group_name : 'tt'} });
    const ticket = await db.ticket.findOne({ 
        where : { id : id },
        include: [
            {
                model: db.project,
                as : 'project'
            },
            {
                model: db.reference_code,
                as : 'ticketType'
            },
            {
                model: db.reference_code,
                as : 'ticketStatus'
            },
            {
                model: db.reference_code,
                as : 'ticketPriority'
            }
        ]
    });
    
    return res.render("pages/ticket/updateTicket", { 
        user , 
        ticket , 
        projects ,
        ticketStatus ,
        ticketType ,
        ticketPriority 
    });
}

////////////////////////////////////////////////////////////////// View Ticket Details
module.exports.ticketDetails = async (req, res) => {
    // COMMENT THIS OUT IF YOU WANT TO TEST A USER FROM DB
    // const user = req.user;
    // USE THIS TO BY PASS LOGIN AND USE A DUMMY USER
    const user = {
        first_name: "argel",
        last_name: "miralles"
    };

    const { id } = req.params;
    // Get all ticket History
    const ticketHistory = await db.ticket_history.findAll({
        include : db.user,
        where : { ticketId : id } 
    });

    // Get every developer who is assigned to this ticket.
    const assignedDeveloper = await db.ticket_asign_developer.findAll({
        where : {
            ticketId : id
        },
        include : db.user
    });
    const devId = assignedDeveloper.map(dev => dev.userId);

    // Get every developer who is not assigned to this ticket.
    const developer = await db.user.findAll({
        where : {
            id : {
                [Op.notIn] : devId
            },
            userRoleRefId : 'ur3'
        }
    });
    
    // Gel all comment on this ticket
    const comments = await db.comment.findAll({ 
        where : { ticketId : id },
        include : db.user
    });

    const ticket = await db.ticket.findOne({
        where:{
            id : id
        },
        include: [
            {
                model: db.project,
                as : 'project'
            },
            {
                model: db.reference_code,
                as : 'ticketType'
            },
            {
                model: db.reference_code,
                as : 'ticketStatus'
            },
            {
                model: db.reference_code,
                as : 'ticketPriority'
            }
        ]
    });
    return res.render("pages/ticket/details", { 
        user , 
        ticket , 
        developer , 
        comments , 
        assignedDeveloper ,
        ticketHistory
    });
};

///////////////////////////////////////////////////////////////// update Ticket
module.exports.updateTicket = async (req, res) => {
    // COMMENT THIS OUT IF YOU WANT TO TEST A USER FROM DB
    // const user = req.user;
    // USE THIS TO BY PASS LOGIN AND USE A DUMMY USER
    const user = {
        first_name: "argel",
        last_name: "miralles",
        userId: 1
    };
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
        title : 'Ticket Update',
        description : historyDescription,
        ticketId : req.body.ticketId,
        userId : user.userId
    })

    await db.ticket.update({
        title : req.body.title,
        description : req.body.description,
        projectId : req.body.projectId,
        ticketPriorityRefId : req.body.ticketPriority,
        ticketStatusRefId : req.body.ticketStatus,
        ticketTypeRefId : req.body.ticketType,
    }, {
        where : {
            id : id
        }
    })

    return res.redirect("/dashboard/ticket");
}

//////////////////////////////////////////////////////////////// delete ticket
module.exports.deleteTicket = async (req, res) => {
    // COMMENT THIS OUT IF YOU WANT TO TEST A USER FROM DB
    // const user = req.user;
    // USE THIS TO BY PASS LOGIN AND USE A DUMMY USER
    const user = {
        first_name: "argel",
        last_name: "miralles",
        userId: 1
    };
    const ticketId = req.params.id;
    await db.ticket.destroy({
        where : { id : ticketId}
    })

    return res.redirect("/dashboard/ticket");
}

/////////////////////////////////////////////////////////////// create new comment
module.exports.addComment = async (req, res) => {
    // COMMENT THIS OUT IF YOU WANT TO TEST A USER FROM DB
    // const user = req.user;
    // USE THIS TO BY PASS LOGIN AND USE A DUMMY USER
    const user = {
        first_name: "argel",
        last_name: "miralles",
        userId: 1
    };
    const comments = await db.comment.create({
        comment : req.body.comment,
        ticketId : req.body.ticketId,
        userId : user.userId
    });

    return res.redirect(`/dashboard/ticket/details/${req.body.ticketId}`);

};

/////////////////////////////////////////////////////////////////// assign new developer
module.exports.assignDeveloper = async (req, res) => {
    // COMMENT THIS OUT IF YOU WANT TO TEST A USER FROM DB
    // const user = req.user;
    // USE THIS TO BY PASS LOGIN AND USE A DUMMY USER
    const user = {
        first_name: "argel",
        last_name: "miralles",
        userId: 1
    };
    const userInfo = await db.user.findOne({ where : { id : req.body.developer } });
    const userName = userInfo.first_name + ' ' + userInfo.last_name;
    const ticketStatus = await db.ticket.findOne({ where : { id : req.body.ticketId }});
    await db.ticket_history.create({
        title : 'New Assigned Ticket Developer',
        description : userName,
        ticketId : req.body.ticketId,
        userId : user.userId
    })
    await db.ticket_asign_developer.create({
        userId : req.body.developer,
        ticketId : req.body.ticketId
    })
    console.log(ticketStatus.ticketStatusRefId);
    if(ticketStatus.ticketStatusRefId === 'ts1'){
        await db.ticket.update({
            ticketStatusRefId : 'ts2'
        },{
            where : {
                id : req.body.ticketId
            }
        });
    }
    
    return res.redirect(`/dashboard/ticket/details/${req.body.ticketId}`);

};