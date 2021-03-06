const fs = require("fs");
const inquirer = require("inquirer");
const questions = require("./questions");
const queries = require("./queries");
const cTable = require("console.table");

//questions
const start = questions.start;
const employeesByDepartment = questions.employeesByDepartment;
const employeesByRole = questions.employeesByRole;
const confirmManager = questions.confirmManger;
const employeeInfo = questions.employeeInfo;
const managerInfo = questions.managerInfo;

//queries
const queryAllEmployees = queries.queryAllEmployees;
const queryDepartments = queries.queryDepartments;
const queryRole = queries.queryRole;
const queryManagers = queries.queryManagers;
const queryAddEmployee = queries.queryAddEmployee;
const queryAddManager = queries.queryAddManager;
const queryEmployeeTableAndDelete = queries.queryEmployeeTableAndDelete;
const queryEmployeeTableAndUpdateRole = queries.queryEmployeeTableAndUpdateRole;

const prompt = inquirer.createPromptModule();

function init() {
  prompt(start).then(({ action }) => {
    switch (action) {
      case "View All Employees":
        queryAllEmployees();
        break;
    }
    switch (action) {
      case "View All Employees by Department":
        searchDepartments();
        break;
    }
    switch (action) {
      case "View All Employees by Roles":
        queryRoles();
        break;
    }
    switch (action) {
      case "View All Employees by Manager":
        queryManagers();
        break;
    }
    switch (action) {
      case "Add Employee":
        isManager();
        break;
    }
    switch (action) {
      case "Remove Employee":
        queryEmployeeTableAndDelete();
        break;
    }
    switch (action) {
      case "Update Employee Role":
        queryEmployeeTableAndUpdateRole();
        break;
    }
  });
}

function searchDepartments() {
  prompt(employeesByDepartment).then(({ deparmentId }) => {
    if (deparmentId === "Front of the House") {
      deparmentId = "1";
    } else if (deparmentId === "Back of the House") {
      deparmentId = "2";
    }
    queryDepartments(deparmentId);
  });
}

function queryRoles() {
  prompt(employeesByRole).then(({ roleTitle }) => {
    queryRole(roleTitle);
  });
}

function isManager() {
  prompt(confirmManager).then(ans => {
    if (ans.isManager) {
      addManager();
    } else {
      addEmployee();
    }
  });
}

function addManager() {
  prompt(managerInfo).then(ans => {
    console.log("now add manager query ");
  });
}

function addEmployee() {
  prompt(employeeInfo).then(({ firstName, lastName, position }) => {
    position === "Server"
      ? (position = 1)
      : position === "Buser"
      ? (position = 2)
      : position === "Host"
      ? (position = 3)
      : position === "Dish Washer"
      ? (position = 5)
      : //else cook
        (position = 6);
    queryAddEmployee(firstName, lastName, position);
  });
}

function addManager() {
  prompt(managerInfo).then(({ firstName, lastName, position, id }) => {
    position === "Floor Manager"
      ? (position = 4)
      : //else chef
        (position = 7);
    queryAddManager(firstName, lastName, position, id);
  });
}

init();
