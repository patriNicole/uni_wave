/* SIGNUP THE USER */

const router = require("express").Router();
//controllers for the routes
const { userRegister } = require('../controllers/registerController.js');
const { userLogin } = require('../controllers/loginController.js');
const { userLogout } = require('../controllers/logoutController.js');
const { authMiddleware } = require('../middleware/authMiddleware.js');

router.post('/user-login', userLogin);
router.post('/register', userRegister);
router.post('/user-logout', authMiddleware, userLogout);

module.exports = router;
