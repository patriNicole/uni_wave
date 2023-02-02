/* SIGNUP THE USER */

const router = require("express").Router();
const { userRegister } = require('../controllers/authController.js');

router.post('/register', userRegister)

module.exports = router;
