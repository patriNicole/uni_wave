const signupModel = require("../model/authModel.js");

module.exports.getFriends = async (req, res) => {
  try {
    //get all the users
    const friendGet = await signupModel.find({});
    res.status(200).json({ success: true, friends: friendGet });
  } catch (error) {
    res.status(500).json({
      error: {
        errorMessage: "Internal Sever Error",
      },
    });
  }
};
