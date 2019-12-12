const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "happy",
  database: "cms_db"
});
// all qruey functions to parse res

//query for getting all employees
function queryAllEmployees() {
  let query =
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name FROM employee INNER JOIN role ON role.id = employee.role_id INNER JOIN department ON department.id = role.department_id";
  connection.query(query, (err, res) => {
    if (err) throw err;
    res.forEach(employee => {
      console.log(
        `${employee.id} ${employee.first_name} ${employee.last_name} ${employee.title} ${employee.salary} ${employee.name}`
      );
    });
  });
}

//query department
// WHERE department.id = 1

function queryDepartments(x) {
  let query =
    "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name FROM department INNER JOIN role ON department.id = role.department_id INNER JOIN employee ON role.id = employee.role_id WHERE  department.id = ?";
  connection.query(query, `${x}`, (err, res) => {
    if (err) throw err;
    res.forEach(emp => {
      console.log(
        `${emp.first_name} ${emp.last_name}, ${emp.title}, $${emp.salary}`
      );
    });
  });
}

//query roles

function queryRole(x) {
  let query =
    "SELECT employee.first_name, employee.last_name, role.salary FROM role INNER JOIN employee ON role.id = employee.role_id WHERE role.title = ?";
  connection.query(query, `${x}`, (err, res) => {
    if (err) throw err;
    res.forEach(emp => {
      console.log(`${emp.first_name} ${emp.last_name}, $${emp.salary}`);
    });
  });
}

function queryManagers() {
  let query =
    "SELECT * FROM employee INNER JOIN role on role.id = employee.role_id WHERE manager_id";
  connection.query(query, (err, res) => {
    if (err) throw err;
    res.forEach(emp => {
      console.log(
        `${emp.first_name} ${emp.last_name}, ${emp.title}, $${emp.salary}`
      );
    });
  });
}

function queryAddEmployee(x, y, a, b) {
  let query = "INSERT INTO employee SET ?";
  connection.query(
    query,
    {
      first_name: x,
      last_name: y,
      role_id: a,
      manager_id: b
    },
    err => {
      if (err) throw err;
      console.log("employee added");
    }
  );
}

function queryAddManager(x, y, z) {
  let query = "INSERT INTO employee SET ?";
  connection.query(
    query,
    {
      first_name: x,
      last_name: y,
      role_id: a
    },
    err => {
      if (err) throw err;
      console.log("employee added");
    }
  );
}

module.exports = {
  queryAllEmployees,
  queryDepartments,
  queryRole,
  queryManagers,
  queryAddEmployee,
  queryAddManager
};
