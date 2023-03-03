const router = require("express").Router();
//controllers for the routes
const { inputCourse, getCourse } = require('../controllers/teachingController.js');
const { authMiddleware } = require('../middleware/authMiddleware.js');

router.post('/input-course', authMiddleware, inputCourse);
router.get('/get-course', authMiddleware, getCourse);

module.exports = router;