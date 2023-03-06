const router = require("express").Router();
//controllers for the routes
const { inputCourse, getCourse, deleteCourse } = require('../controllers/teachingController.js');
const { authMiddleware } = require('../middleware/authMiddleware.js');

router.post('/input-course', authMiddleware, inputCourse);
router.get('/get-course', authMiddleware, getCourse);
router.delete('/delete-course/:courseId', authMiddleware, deleteCourse);

module.exports = router;