const mysql = require("mysql");
const inquirer = require("inquirer");

const prompt = inquirer.createPromptModule();

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
    "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name FROM employee INNER JOIN role ON role.id = employee.role_id INNER JOIN department ON department.id = role.department_id";
  connection.query(query, (err, res) => {
    if (err) throw err;
    res.forEach(employee => {
      console.log(
        `${employee.first_name} ${employee.last_name}, ${employee.title}, $${employee.salary}, ${employee.name}`
      );
    });
  });
}

//query department

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

function queryAddManager(x, y, a, b) {
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
      console.log("manager added");
    }
  );
}

// query employee table

function queryEmployeeTableAndDelete() {
  let query =
    "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee INNER JOIN role ON role.id = employee.role_id";
  connection.query(query, (err, res) => {
    if (err) throw err;
    prompt([
      {
        type: "list",
        name: "delete",
        message: "Select Employee to Remove",
        choices: function() {
          let choiceArray = [];
          res.forEach(employee => {
            choiceArray.push(
              `${employee.first_name} ${employee.last_name}, ${employee.title}, ${employee.id}`
            );
          });
          return choiceArray;
        }
      }
    ]).then(ans => {
      let choice = ans.delete;
      let id = choice.match(/\d+/g);
      let query = "DELETE FROM employee WHERE id = ?";
      connection.query(query, id, (err, res) => {
        if (err) throw err;
        console.log("succesfully deleted");
      });
    });
  });
}

function queryEmployeeTableAndUpdateRole() {
  let query =
    "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee INNER JOIN role ON role.id = employee.role_id";
  connection.query(query, (err, res) => {
    if (err) throw err;
    prompt([
      {
        type: "list",
        name: "update",
        message: "Select Employee to Update Role",
        choices: function() {
          let choiceArray = [];
          res.forEach(employee => {
            choiceArray.push(
              `${employee.first_name} ${employee.last_name}, ${employee.title}, ${employee.id}`
            );
          });
          return choiceArray;
        }
      },
      {
        type: "list",
        name: "position",
        message: "Select Position",
        choices: [
          "Server",
          "Buser",
          "Host",
          "Floor Manager",
          "Dish Washer",
          "Cook",
          "Chef"
        ]
      },
      {
        type: "input",
        name: "managerId",
        message: "Assign Manager ID Number if applicable: ",
        validate: function(value) {
          var valid = !isNaN(value);
          return valid || "Please enter a number";
        }
      }
    ]).then(({ update, position, managerId }) => {
      let choice = update;
      let id = choice.match(/\d+/g);
      position === "Server"
        ? (position = 1)
        : position === "Buser"
        ? (position = 2)
        : position === "Host"
        ? (position = 3)
        : position === "Floor Manager"
        ? (position = 4)
        : position === "Dish Washer"
        ? (position = 5)
        : position === "Cook"
        ? (position = 6)
        : //else chef
          (position = 7);
      console.log("employee id", id);
      console.log("role", position);
      console.log("manager id", managerId);
      if (!managerId) {
        let query = "UPDATE employee SET role_id = ? WHERE id = ?";
        connection.query(query, [`${position}`, id], (err, res) => {
          if (err) throw err;
          console.log("employee updated");
        });
      } else {
        let query =
          "UPDATE employee SET role_id = ? , manager_id = ? WHERE id = ?";
        connection.query(
          query,
          [`${position}`, `${managerId}`, id],
          (err, res) => {
            if (err) throw err;
            console.log("Manager Updated");
          }
        );
      }
    });
  });
}

module.exports = {
  queryAllEmployees,
  queryDepartments,
  queryRole,
  queryManagers,
  queryAddEmployee,
  queryAddManager,
  queryEmployeeTableAndDelete,
  queryEmployeeTableAndUpdateRole
};
