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
  async updateProfileUser(req, res) {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const updateFields = {};

      const { id, username, oldPassword, newPassword } = fields;
      // check if new picture has been provided

      const error = [];
      // check if username did not change
      const sameUser = await signupModel.findById(id);
      // if the username changed
      if (sameUser.username !== username) {
        // check against all the other usernames in the database
        // to see if the username exists
        const user = await signupModel.findOne({ username });
        if (user !== null) {
          error.push(
            "Username already exists. Please choose a different username."
          );
        }
        updateFields.username = username;
      }

      // Upload another user profile picture
      //console.log(files.imageData.filepath);
      if (Object.keys(files).length !== 0) {
        const { url } = await cloudinary.uploader.upload(
          files.imageData.filepath,
          {
            resource_type: "auto",
            folder: "registration",
          }
        );
        updateFields.image = url;
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
          //console.log(updateFields);
          // If no updates, return
          if (Object.keys(updateFields).length === 0) {
            return;
          }
          const userProfile = await signupModel.findByIdAndUpdate(
            id,
            updateFields
          );

          res
            .status(200)
            .json({
              success: true,
              successMessage: " Profile Updated Successfully ",
            });
        } catch (error) {
          //console.log(error);
          res.status(500).json({
            success: false,
            error: {
              errorMessage: [error.message],
            },
          });
        }
      }
    });
  },
};
