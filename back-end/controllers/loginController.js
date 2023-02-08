const signupModel = require("../model/authModel.js");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { options } = require("../routes/authRoute.js");

module.exports.userLogin = async (req, res) => {
  const error = [];
  //take the username and password from requested body
  const { username, password } = req.body;

  console.log(req.body)

  if (!username) {
    error.push("Please provide your username. ");
  }
  if (!password) {
    error.push("Please provide your Passowrd. ");
  }
  
  if (error.length > 0) {
    res.status(400).json({
      error: {
        errorMessage: error,
      },
    });
  } else {
    try {
      //check user by username
      const checkUserExists = await signupModel
        .findOne({
          username: username,
          //The .select('+password') modifier is used to override the select:
          //false setting for the password field and include it in the query result.
        })
        .select("+password");

      //console.log(checkUserExists);

      if (checkUserExists) {
        //check if password input same as one from database
        const matchPassword = await bcrypt.compare(
          password,
          checkUserExists.password
        );

        if (matchPassword) {
          //generate the token
          const token = jwt.sign(
            {
              id: checkUserExists._id,
              email: checkUserExists.email,
              userName: checkUserExists.username,
              image: checkUserExists.image,
              registerTime: checkUserExists.createdAt,
            },
            process.env.JWTPRIVATEKEY,
            {
              expiresIn: process.env.TOKEN_EXP,
            }
          );

          /* Pass the data to cookie */
          //option for cookie to expire (date, min, sec, milisec)
          const options = {
            expires: new Date(
              Date.now() + process.env.COOKIE_EXP * 24 * 60 * 60 * 1000
            ),
          };
          //generate the cookie with the name authToken
          res.status(201).cookie("authToken", token, options).json({
            successMessage: " You Logged In Successfully ",
            token,
          });

        } else {
          res.status(400).json({
            error: {
              errorMessage: ["Your Password not Valid. "],
            },
          });
        }

      } else {
        res.status(400).json({
          error: {
            errorMessage: ["Your Username Not Found. "],
          },
        });
      }

    } catch {
        res.status(404).json({
            error: {
                 errorMessage : ['Internal Sever Error']
            }
        })
    }
  }
};
