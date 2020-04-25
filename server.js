// require mysql and inquirer
const inquirer = require('inquirer');
const mysql = require('mysql');

// estalish connection with the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'employee_db',
});

