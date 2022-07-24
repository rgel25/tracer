module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define("project", {
        project_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        project_description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        project_start: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        project_end: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        projectStatusRefId : {
            type : DataTypes.STRING,
            defaultValue: 'ps1'
        },

    });

    Project.associate = models => {
        Project.hasMany(models.ticket, {
           onDelete: "cascade" 
        });
        
    }

        



    return Project;
}