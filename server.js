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
      'View all departments',
      'View all roles',
      'View all employees',
      'Update an employee role',
      'Exit',
    ],
  },
];

// Inquirer add department question
const deptQuestion = [
  {
    type: 'rawlist',
    name: 'department',
    message: 'What department would you like to add?',
    choices: [
      'Graphics',
      'Food',
      'Legal',
    ],
  },
];


// =========== QUERY FUNCTIONS ============

let query = '';

// Add a new department function
function newDept() {
  inquirer.prompt(deptQuestion).then(response => {
    // take the response and make a query
    query = `INSERT INTO department (name) VALUES ('${response.department}');`;
    // query to add department into database
    connection.query(query, (err, results) => {
      if (err) throw err;
      // console.log(results);
    });
    // return to main menu
    askUser();
  });
}

// Add a new role function
function newRole() {
  // query the department table
  query = 'SELECT * FROM department;';
  connection.query(query, (err, results) => {
    if (err) throw err;
    // save departments to an array and use for choices
    const deptArr = results.map((dept) => {
      return {
        value: dept.id,
        name: dept.name,
      };
    });

    // ask for role
    inquirer.prompt([
      {
        type: 'rawlist',
        name: 'title',
        message: 'What role would you like to add?',
        choices: [
          'Graphic Designer',
          'Animator',
          'Head Chef',
          'Baker',
          'Prosecutor',
          'Defense Attorney',
        ],
      },
      {
        type: 'rawlist',
        name: 'salary',
        message: 'What is the salary of this role?',
        choices: [
          '50000',
          '60000',
          '70000',
          '80000',
          '90000',
          '100000',
        ],
      },
      {
        type: 'rawlist',
        name: 'deptId',
        message: 'What is the department ID?',
        choices: deptArr,
      },
    ]).then(response => {
      // take the response and make a query
      query = `INSERT INTO role (title, salary, department_id) VALUES ('${response.title}', ${response.salary}, ${response.deptId});`;
      // query to add role into database
      connection.query(query, (err, results) => {
        if (err) throw err;
        // console.log(results);
      });
      // return to main menu
      askUser();
    });
  });
}


// Add a new employee function
function newEmployee() {
  // query the roles table
  query = 'SELECT * FROM role;';
  connection.query(query, (err, results) => {
    if (err) throw err;
    // save all roles to an array and use for choices
    const allRoles = results.map((role) => {
      return {
        value: role.id,
        name: role.title,
      };
    });

    // ask about new employee
    inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'What is the employee\'s first name?',
      },
      {
        type: 'lastName',
        name: 'lastName',
        message: 'What is the employee\'s last name?',
      },
      {
        type: 'rawlist',
        name: 'roleId',
        message: 'What is the employee\'s role ID?',
        choices: allRoles,
      },
      {
        type: 'number',
        name: 'managerId',
        message: 'What manager ID are they under?',
      },
    ]).then(response => {
      // take the response and make a query
      query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${response.firstName}', '${response.lastName}', ${response.roleId}, ${response.managerId});`;
      // query to add employee into database
      connection.query(query, (err, results) => {
        if (err) throw err;
        // console.log(results);
      });
      // return to main menu
      askUser();
    });
  });
}

// show all departments function
function showAllDept() {
  query = 'SELECT * FROM department;';
  connection.query(query, (err, results) => {
    if (err) throw err;
    console.table(results);
    // return to main menu
    askUser();
  });
}

// show all roles function
function showAllRoles() {
  query = 'SELECT * FROM role;';
  connection.query(query, (err, results) => {
    if (err) throw err;
    console.table(results);
    // return to main menu
    askUser();
  });
}

// show all employees function
function showAllEmp() {
  query = 'SELECT * FROM employee;';
  connection.query(query, (err, results) => {
    if (err) throw err;
    console.table(results);
    // return to main menu
    askUser();
  });
}

// Update employee role function
function updateEmpRole() {
  // showing all the roles
  query = 'SELECT * FROM role;';
  connection.query(query, (err, results) => {
    if (err) throw err;

    // console.log(results) will return an array of objects
    // saving all the roles from the database to a variable
    const rolesArr = results.map((role) => {
      // console.log(role);
      // for each role in results, create an object with title and roleid
      return {
        value: role.id,
        name: role.title,
      };
    });

    // showing all the employees from the database and saving to a variable
    query = 'SELECT * FROM employee;';
    connection.query(query, (err, res) => {
      if (err) throw err;

      // for each employee, create an object; get first and last name, and employeeid from database
      const employeesArr = res.map((emp) => {
        return {
          value: emp.id,
          name: `${emp.first_name} ${emp.last_name}`,
        };
      });

      // then prompt user
      inquirer.prompt([
        {
          type: 'rawlist',
          name: 'employeeUpdate',
          choices: employeesArr, // <---- employee array we made above are now choices
          message: 'Which employee do you want to update?',
        },
        {
          type: 'rawlist',
          name: 'newEmpRole',
          choices: rolesArr, // <---- roles array we made above are now choices
          message: 'What is their new role?',
        },
      ]).then(response => {
        // take the response and make a query
        // console.log(response);
        query = `UPDATE employee SET role_id = '${response.newEmpRole}' WHERE id = '${response.employeeUpdate}';`;
        // console.log(query);
        // query to add employee into database
        connection.query(query, (err, results) => {
          if (err) throw err;
          // console.log(results);
          askUser();
        });
      });
    });
  });
}


// ================================

// ============== ASK THE USER =================

// Prompt the user
function askUser() {
  // ask the user what they want to do
  inquirer.prompt(basicQuestion).then(response => {
    // console.log(response, "line 257");
    // filter out the response here
    switch (response.basic) {
      case 'Add a department':
        newDept();
        // console.log('add a department');
        break;

      case 'Add a role':
        newRole();
        // console.log('add a role');
        break;

      case 'Add an employee':
        newEmployee();
        // console.log('add an employee');
        break;

      case 'View all departments':
        showAllDept();
        break;

      case 'View all roles':
        showAllRoles();
        break;

      case 'View all employees':
        showAllEmp();
        // console.log('view an employee');
        break;

      case 'Update an employee role':
        updateEmpRole();
        // console.log('update an employee role');
        break;

      case 'Exit':
        connection.end();
        break;

      default:
        break;
    }
  });
}

askUser();
