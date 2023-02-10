const mysql = require("mysql2");

const pool = mysql.createPool({
  database: "node-complete",
  user: "root",
  host: "localhost",
  password: "vishu7@mysql",
});

module.exports = pool.promise();
