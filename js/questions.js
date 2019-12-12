const start = {
  type: "list",
  name: "action",
  message: "What would you like to do?",
  choices: [
    "View All Employees",
    "View All Employees by Department",
    "View All Employees by Roles",
    "View All Employees by Manager",
    "Add Employee",
    "Remove Employee",
    "Update Employee Role",
    "Update Employee Manager"
  ]
};

const employeesByDepartment = {
  type: "list",
  name: "deparmentId",
  message: "Which department?",
  choices: ["Front of the House", "Back of the House"]
};

const employeesByRole = {
  type: "list",
  name: "roleTitle",
  message: "Which Role?",
  choices: ["Server", "Buser", "Host", "Dish Washer", "Cook"]
};

const confirmManger = {
  type: "confirm",
  name: "isManager",
  message: "Is this employee a manager?",
  default: false
};

const employeeInfo = [
  {
    type: "input",
    name: "firstName",
    message: "What is the employee's first name?"
  },
  {
    type: "input",
    name: "lastName",
    message: "What is the employee's last name?"
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
  }
];

const managerInfo = [
  {
    type: "input",
    name: "firstName",
    message: "What is the manager's first name?"
  },
  {
    type: "input",
    name: "lastName",
    message: "What is the manager's last name?"
  },
  {
    type: "list",
    name: "position",
    message: "Select Position",
    choices: ["Floor Manager", "Chef"]
  },
  {
    type: "input",
    name: "id",
    message: "Assign Manager ID Number: ",
    validate: function(value) {
      var valid = !isNaN(value);
      return valid || "Please enter a number";
    }
  }
];

const empty = [
  {
    type: "input",
    name: "firstName",
    message: "What is the employees first name?"
  },
  {
    type: "input",
    name: "lastName",
    message: "What is the employees last name?"
  },
  {
    type: "input",
    name: "id",
    message: "ID Number: ",
    validate: function(value) {
      var valid = !isNaN(value);
      return valid || "Please enter a number";
    }
  },
  {
    type: "input",
    name: "email",
    message: "Email Address: "
  },
  {
    type: "input",
    name: "school",
    message: "School Attended: "
  },
  {
    type: "confirm",
    name: "addEmployee",
    message: "Would you like to enter a new employee?",
    default: false
  }
];

module.exports = {
  start,
  employeesByDepartment,
  employeesByRole,
  confirmManger,
  employeeInfo,
  managerInfo
};
