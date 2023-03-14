const router = require("express").Router();
//controllers for the routes
const { inputCourse, getCourse, deleteCourse, updateCourse, deletePDF, deleteFile, deleteVideo } = require('../controllers/teachingController.js');
const { authMiddleware } = require('../middleware/authMiddleware.js');

router.post('/input-course', authMiddleware, inputCourse);
router.get('/get-course', authMiddleware, getCourse);
router.delete('/delete-course/:courseId', authMiddleware, deleteCourse);
router.put('/update-course/:id', authMiddleware, updateCourse);
router.delete('/delete-pdf/:courseId', authMiddleware, deletePDF);
router.delete('/delete-file/:courseId', authMiddleware, deleteFile);
router.delete('/delete-video/:courseId', authMiddleware, deleteVideo);

module.exports = router;