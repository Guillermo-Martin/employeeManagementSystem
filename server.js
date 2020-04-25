// require mysql and inquirer
const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');

// estalish connection with the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'employee_db',
});

// ===== INQUIRER QUESTIONS =====

// Inquirer opening question
const basicQuestion = [
  {
    type: 'list',
    name: 'basic',
    message: 'What would you like to do?',
    choices: [
      'Add a department',
      'Add a role',
      'Add an employee',
      'View a department',
      'View a role',
      'View an employee',
      'Update an employee role',
    ],
  },
];

// ==============================


// Prompt the user
function askUser() {
  // ask the user what they want to do
  inquirer.prompt(basicQuestion).then(function(response) {
    console.log(response);
  });
}

askUser();