-- DROP DATABASE IF EXISTS seed;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NULL,
  salary DECIMAL(10, 2) NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("Graphic Design"), ("Animation"), ("Promotions");

INSERT INTO role (title, salary, department_id)
VALUES ("Graphic Designer", 100000, 1), ("Animator", 200000, 2), ("Influencer", 300000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ryan", "Atwood", 1, 2), ("Seth", "Cohen", 1, 2), ("Marissa", "Cooper", 2, 2), ("Summer", "Roberts", 2, NULL);

-- SELECT * FROM department; 

-- SELECT * FROM role;

-- SELECT * FROM employee;