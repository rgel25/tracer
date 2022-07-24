module.exports = (sequelize, DataTypes) => {
   const Ticket = sequelize.define("ticket", {
         title : {
            type : DataTypes.STRING,
            allowNull : false
         },
         description : {
            type : DataTypes.STRING
         },
         attachment : {
            type : DataTypes.STRING
         },
         projectId : {
            type : DataTypes.INTEGER
         },
         ticketStatusRefId : {
            type : DataTypes.STRING,
            defaultValue : 'ts1'
         }
   });

   Ticket.associate = models => {
      Ticket.belongsTo(models.project, {
         foreignKey: {
            allowNull : true
         }
      });

      Ticket.hasMany(models.comment, {
         onDelete : "cascade"
      });

      Ticket.hasMany(models.ticket_history, {
         onDelete : "cascade"
      });

   }

   

   return Ticket;
}