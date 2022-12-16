const mysql = require("mysql");
const dotenv = require("dotenv")
dotenv.config();

// connection to mysql database
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});
connection.connect((error) => {
  if (error) throw error;
  console.log("coonection successfull");
});

module.exports = connection;