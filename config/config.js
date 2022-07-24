require("dotenv").config();
module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: process.env.CLEAR_DB_USERNAME,
    password: process.env.CLEAR_DB_PASSWORD,
    database: process.env.CLEAR_DB_DATABASE,
    host: process.env.CLEAR_DB_HOST,
    dialect: "mysql",
  },
};
