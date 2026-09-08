const express = require("express")

const { getEmployees, getEmployeesById, createEmployee } = require("../controllers/employeeController")

const router = express.Router()

router.get("/",getEmployees);
router.get("/:id",getEmployeesById)
router.post("/",createEmployee)

module.exports = router