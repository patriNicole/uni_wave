//parsing form data, especially file uploads
const formidable = require("formidable");
const validator = require("validator");
const signupModel = require("../model/authModel.js");
//password hashing
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//const { options } = require("../routes/authRoute.js");
//used for uploading the picture
const cloudinary = require("cloudinary").v2;

// Configuration
cloudinary.config({
  cloud_name: process.env.Cloud_Name,
  api_key: process.env.Api_Key,
  api_secret: process.env.Api_Secret,
});

module.exports = {
  async userRegister(req, res) {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { username, email, password } = fields;

      const error = [];

      /* Check inputs */
      if (!username) {
        error.push("Please provide your user name. ");
      }
      if (!email) {
        error.push("Please provide your Email. ");
      }
      //if unauthorised email
      if (email && !validator.isEmail(email)) {
        error.push("Please provide your Valid Email. ");
      }
      var pass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
      if (!password) {
        error.push("Please provide your Password. ");
      }
      if (password && password.length < 6) {
        error.push("Please provide password with at least 6 characters. ");
      }
      //if no image uploaded
      if (Object.keys(files).length === 0) {
        error.push("Please provide user image. ");
      }

      /* If error while processing the inputs */
      if (error.length > 0) {
        res.status(400).json({
          error: {
            errorMessage: error,
          },
        });
      } else {
        try {
          const checkUserExists = await signupModel.findOne({ email: email });

          /* IF USER ALREADY EXISTS => ERROR */
          if (checkUserExists) {
            res.status(404).json({
              error: {
                errorMessage: ["You already signed up with this email."],
              },
            });
          } else {
            
            const hashedPassword = await bcrypt.hash(password, 10);
            /* Upload Image on Cloudinary */
            cloudinary.uploader.upload(
              files.image.filepath,
              {
                resource_type: "auto",
              },
              function (error, result) {
                if (error) throw error;
                //console.log(result.url);

                /* CREATE THE USER */
                signupModel
                  .create({
                    username,
                    email,
                    password: hashedPassword, //await bcrypt.hash(password, 10),
                    image: result.url, //files.image.originalFilename,
                  })
                  .then((data) => {
                    console.log("registration Complete successfully, ");
                    /* JWT for communicating information as a JSON object between two parties */
                    const token = jwt.sign(
                      {
                        //access the userCreate values from database
                        data,
                      },
                      //generate the secret key
                      process.env.JWTPRIVATEKEY,
                      {
                        //token expires in 1 day
                        expiresIn: process.env.TOKEN_EXP,
                      }
                    );

                    /* Pass the data to cookie */
                    //option for cookie to expire (date, min, sec, milisec)
                    const options = {
                      expires: new Date(
                        Date.now() +
                          process.env.COOKIE_EXP * 24 * 60 * 60 * 1000
                      ),
                    };
                    //generate the cookie with the name authToken
                    res.status(201).cookie("authToken", token, options).json({
                      successMessage: " You Registered Successfully ",
                      token,
                    });
                  })
                  .catch((error) => {
                    res.status(500).json({
                      error: {
                        errorMessage: [error.message],
                      },
                    });
                  });
              }
            );
            
          }
        } catch (error) {
          res.status(500).json({
            error: {
              errorMessage: [error.message],
            },
          });
        }
      }
    });
  },
};
