const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "vishu7@mysql", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;

// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   database: "node-complete",
//   user: "root",
//   host: "localhost",
//   password: "vishu7@mysql",
// });

// module.exports = pool.promise();
