module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userRoleRefId: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "ur5",
    },
  });

  User.associate = (models) => {
    User.hasMany(models.comment, {
      onDelete: "cascade",
    });
    User.hasMany(models.ticket_history, {
      onDelete: "cascade",
    });

    User.hasOne(models.project, {as: 'manager'});
    models.project.belongsTo(User, {as: 'manager'});

    User.hasOne(models.ticket, {as: 'developer'});
    models.ticket.belongsTo(User, {as: 'developer'});
  };
  return User;
};
