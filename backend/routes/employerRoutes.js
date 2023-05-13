const express = require("express")
const router = express.Router()
const protect = require('../middlewares/protect')
const {registerEmployer, loginEmployer, updateEmployer} = require('../controllers/employerController')
const { getEmployees, getAppoitments } = require('../controllers/employeeController')


// Register and Login Routes for employer
router.route('/register/').post(registerEmployer)
router.route('/login/').post(loginEmployer)
router.route('/update/').put(protect, updateEmployer)
router.route('/search/employee/:specialization').get(getEmployees)
router.route('/get-appointments/').get(getAppoitments)

module.exports = router;