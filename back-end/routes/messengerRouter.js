const router = require('express').Router();

const { getFriends, messageUploadDatabase, getMessage, ImageSend } = require("../controllers/messengerController.js");
// if user authenticated
const { authMiddleware } = require('../middleware/authMiddleware.js');

// using GET the friends
router.get('/get-friends', authMiddleware, getFriends);
router.post('/send-message', authMiddleware, messageUploadDatabase);
router.get('/get-message/:id', authMiddleware, getMessage);
router.post('/send-image-message', authMiddleware, ImageSend);

module.exports = router;