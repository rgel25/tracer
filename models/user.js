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
    UserRoleRefId: {
      type: DataTypes.STRING,
      defaultValue: "ur1",
    },
  });

  User.associate = (models) => {
    User.hasMany(models.comment, {
      onDelete: "cascade",
    });
    User.hasMany(models.ticket_history, {
      onDelete: "cascade",
    });
  };
  return User;
};
