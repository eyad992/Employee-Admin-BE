const express = require("express");
const bodyParser = require("body-parser");
const employees = require("./employees");
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get("/employees", (req, res) => {
  res.json(employees);
});

app.get("/employees/:id", (req, res) => {
  const id = req.params.id;
  const employee = employees.find(emp => emp.id === parseInt(id));
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ message: "Employee not found" });
  }
});

app.post("/employees", (req, res) => {
  const newEmployee = req.body;
  newEmployee.id = employees.length + 1;
  employees.push(newEmployee);
  res.status(201).json(newEmployee);
});

app.put("/employees/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedEmployee = req.body;
  employees[id - 1] = updatedEmployee;
  res.json(updatedEmployee);
});

app.delete("/employees/:id", (req, res) => {
  const id = parseInt(req.params.id);
  employees.splice(id - 1, 1);
  res.status(204).send();
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});