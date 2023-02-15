const router = require('express').Router();

const { getFriends } = require("../controllers/messengerController.js");

// using GET the friends
router.get('/get-friends', getFriends);

module.exports = router;