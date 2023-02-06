/* SIGNUP THE USER */

const router = require("express").Router();
//controllers for the routes
const { userRegister } = require('../controllers/registerController.js');
const { userLogin } = require('../controllers/loginController.js');

router.post('/user-login',userLogin);
router.post('/register', userRegister);

module.exports = router;
