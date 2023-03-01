const router = require('express').Router();

const { getFriends, messageUploadDatabase, getMessage, ImageSend, messageSeen, messageDeliver } = require("../controllers/messengerController.js");
// if user authenticated
const { authMiddleware } = require('../middleware/authMiddleware.js');

// using GET the friends
router.get('/get-friends', authMiddleware, getFriends);
router.post('/send-message', authMiddleware, messageUploadDatabase);
router.get('/get-message/:id', authMiddleware, getMessage);
router.post('/send-image-message', authMiddleware, ImageSend);
// Message Seen/Delivered
router.post('/seen-message', authMiddleware, messageSeen); 
router.post('/deliver-message', authMiddleware, messageDeliver);

module.exports = router;