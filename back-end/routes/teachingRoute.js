const router = require("express").Router();
//controllers for the routes
const { inputCourse } = require('../controllers/teachingController.js');
const { authMiddleware } = require('../middleware/authMiddleware.js');

router.post('/input-course', authMiddleware, inputCourse);

module.exports = router;