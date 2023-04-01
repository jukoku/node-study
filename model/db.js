var Sequelize = require("sequelize");
var sequelize;
sequelize = new Sequelize("nodeStudy", "root", "test123", {
  host: "db",
  port: 3306,
  dialect: "mysql",
  timezone: "++09:00",
  define: {
    charset: "utf8",
    collate: "utf8_general_ci",
    timestamps: true,
    freezeTableName: true
  }
})

var db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;