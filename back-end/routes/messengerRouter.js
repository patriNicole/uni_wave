const router = require('express').Router();

const { getFriends } = require("../controllers/messengerController.js");
// if user authenticated
const { authMiddleware } = require('../middleware/authMiddleware.js');

// using GET the friends
router.get('/get-friends', authMiddleware, getFriends);

module.exports = router;