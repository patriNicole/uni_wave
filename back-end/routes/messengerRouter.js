const router = require('express').Router();

const { getFriends, messageUploadDatabase } = require("../controllers/messengerController.js");
// if user authenticated
const { authMiddleware } = require('../middleware/authMiddleware.js');

// using GET the friends
router.get('/get-friends', authMiddleware, getFriends);
router.post('/send-message', authMiddleware, messageUploadDatabase);

module.exports = router;