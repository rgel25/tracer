module.exports = (sequelize, DataTypes) => {
    const History = sequelize.define("ticket_history", {
        title : {
            type : DataTypes.STRING,
            allowNull: false
        },
        description : {
            type : DataTypes.STRING,
            allowNull: false
        }
    });

    History.associate = models => {
        History.belongsTo(models.ticket, {
            foreignKey: {
               allowNull : true
            }
         });

         History.belongsTo(models.user, {
            foreignKey: {
               allowNull : true
            }
         });

    }

    return History
}