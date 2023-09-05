const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

try {
  var sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: "postgres",
      operatorsAliases: false,
      pool: {
        max: 6,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    }
  );
} catch (error) {
  console.error("Error occurred while creating Sequelize instance:", error);
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, DataTypes);

module.exports = db;
