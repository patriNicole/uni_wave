/* SIGNUP THE USER */

const router = require("express").Router();
//controllers for the routes
const { userRegister } = require('../controllers/registerController.js');
const { userLogin } = require('../controllers/loginController.js');

router.post('/register', userRegister);
router.post('/user-login',userLogin);

module.exports = router;
