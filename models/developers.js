module.exports = (sequelize, DataTypes) => {
    const Developer = sequelize.define("ticket_asign_developer", {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull: false
        }
    });

    Developer.associate = models => {
        Developer.belongsTo(models.ticket, {
            foreignKey: {
               allowNull : true
            }
         });

         Developer.belongsTo(models.user, {
            foreignKey: {
               allowNull : true
            }
         });
    }

    return Developer;
}