DROP DATABASE IF EXISTS cms_db;
CREATE DATABASE cms_db;
USE cms_db;

CREATE TABLE department(
  id INTEGER(10) NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE role(
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(11,2),
  department_id INT(10) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee(
    id INT(10) AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT(10) NOT NULL,
    manager_id INT(10),
    PRIMARY KEY(id)
);

INSERT INTO department (name)
VALUES ('FoH');

INSERT INTO department (name)
VALUES ('BoH');

INSERT INTO role (title, salary, department_id)
VALUES ('server', 55000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ('buser', 35000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ('host', 30000,1);

INSERT INTO role (title, salary, department_id)
VALUES ('floor manager', 65000, 1);


INSERT INTO role (title, salary, department_id)
VALUES ('dish washer', 25000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ('cook', 34000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ('chef', 65000, 2);


INSERT INTO employee (first_name, last_name, role_id)
VALUES('Sarah', 'Green', 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Tim', 'Smith', 4, 17);

INSERT INTO employee (first_name, last_name, role_id)
VALUES('Liam', 'Roy', 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Steph', 'Car', 7, 12);

SELECT p1.name, p1.sex, p2.name, p2.sex, p1.species
       FROM pet AS p1 INNER JOIN pet AS p2
         ON p1.species = p2.species
         AND p1.sex = 'f' AND p1.death IS NULL
         AND p2.sex = 'm' AND p2.death IS NULL;

          name   | sex  | name  | sex  | species |
+--------+------+-------+------+---------+
| Fluffy | f    | Claws | m    | cat     |
| Buffy  | f    | Fang  | m    | dog     |

ALTER TABLE ORDERS 
   ADD FOREIGN KEY (Customer_ID) REFERENCES CUSTOMERS (ID);

SELECT role.title, role.salary, role.id, employee.first_name, employee.last_name, employee.role_id
  FROM role INNER JOIN employee
    ON role.id = employee.role_id

SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name 
  FROM employee
  INNER JOIN role
    ON role.id = employee.role_id
  INNER JOIN department
    ON department.id = role.department_id;

SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name 
FROM department 
INNER JOIN role ON department.id = role.department_id 
INNER JOIN employee ON role.id = employee.role_id;

SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name FROM department INNER JOIN role ON department.id = role.department_id INNER JOIN employee ON role.id = employee.role_id WHERE department.id = 1;

SELECT id WHERE department

