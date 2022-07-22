module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("comment", {
        comment:{
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Comment.associate = models => {
        Comment.belongsTo(models.ticket, {
            foreignKey: {
               allowNull : true
            }
         });

         Comment.belongsTo(models.user, {
            foreignKey: {
               allowNull : true
            }
         });
    }

    return Comment;
}