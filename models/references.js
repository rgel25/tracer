module.exports = (sequelize, DataTypes) => {
    const Reference = sequelize.define("reference_code", {
        ref_id : {
            type : DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        name : {
            type : DataTypes.STRING,
            allowNull: false
        },
        rank : {
            type : DataTypes.INTEGER,
            allowNull: false
        },
        description : {
            type : DataTypes.STRING,
            allowNull: false
        },
        group_name : {
            type : DataTypes.STRING,
            allowNull: false
        }
    });

    Reference.associate = models => {
        Reference.hasOne(models.ticket, {as: 'ticketType'});
        models.ticket.belongsTo(Reference, {as: 'ticketType'});

        Reference.hasOne(models.ticket, {as: 'ticketStatus'});
        models.ticket.belongsTo(Reference, {as: 'ticketStatus'});

        Reference.hasOne(models.ticket, {as: 'ticketPriority'});
        models.ticket.belongsTo(Reference, {as: 'ticketPriority'});

        Reference.hasOne(models.project, {as: 'projectPriority'});
        models.project.belongsTo(Reference, {as: 'projectPriority'});

        Reference.hasOne(models.project, {as: 'projectStatus'});
        models.project.belongsTo(Reference, {as: 'projectStatus'});

        Reference.hasOne(models.user, {as: 'userRole'});
        models.user.belongsTo(Reference, {as: 'userRole'});
    }
    


    return Reference;
}