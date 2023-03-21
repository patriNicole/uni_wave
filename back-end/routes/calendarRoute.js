const router = require('express').Router();

const { inputCalendar, getCalendar, deleteEvent } = require("../controllers/calendarController.js");
// if user authenticated
const { authMiddleware } = require('../middleware/authMiddleware.js');

// using POST the todo
router.post('/input-calendar', authMiddleware, inputCalendar); 
router.get('/get-calendar', authMiddleware, getCalendar); 
router.delete('/delete-event/:id', authMiddleware, deleteEvent); 
//router.put('/update-todo/:id', authMiddleware, updateToDo);

module.exports = router;