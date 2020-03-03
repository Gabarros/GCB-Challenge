const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "remotemysql.com",
  user: "TJCoJUbidF",
  password: "AtkVTNX8hD"
});

module.exports = connection;