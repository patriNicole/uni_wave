module.exports.userLogout = (req, res) => {
  /* Cookie Options */
  const options = {
    httpOnly: true,
    domain: "localhost",
    sameSite: false,
  };
  // Clear the authToken cookie by setting it to an empty string and sending it back to the client
  res.status(201).cookie("authToken", "", options).json({
    success: true
  });
};
