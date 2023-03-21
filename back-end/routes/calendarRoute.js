const router = require('express').Router();

const { inputCalendar, getCalendar, deleteEvent, updateCalendar } = require("../controllers/calendarController.js");
// if user authenticated
const { authMiddleware } = require('../middleware/authMiddleware.js');

// using POST the todo
router.post('/input-calendar', authMiddleware, inputCalendar); 
router.get('/get-calendar', authMiddleware, getCalendar); 
router.delete('/delete-event/:id', authMiddleware, deleteEvent); 
router.put('/update-calendar/:id', authMiddleware, updateCalendar);

module.exports = router;