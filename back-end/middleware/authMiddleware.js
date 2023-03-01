const jwt = require("jsonwebtoken");

// request object, response object, and the next middleware function
module.exports.authMiddleware = async (req, res, next) => {

  const { authToken } = req.cookies;
  
  // if user has already been authenticated
  if (authToken) {
    // verify the token's authenticity
    const decodeToken = await jwt.verify(authToken, process.env.JWTPRIVATEKEY);
    // token is valid, it decodes the payload of the token and assigns the id 
    req.myId = decodeToken.id;
    //property to the req.myId property for future use by other middleware functions or request handlers
    next();

  } else {

    res.status(400).json({
      error: {
        errorMessage: ["Please Login First"],
      },
    });

  }
};
