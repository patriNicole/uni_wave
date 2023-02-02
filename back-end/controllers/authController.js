//parsing form data, especially file uploads
const formidable = require("formidable");
const validator = require("validator");

const signupModel = require("../model/authModel.js");

const cloudinary = require("cloudinary").v2;

// Configuration
cloudinary.config({
  cloud_name: process.env.Cloud_Name,
  api_key: process.env.Api_Key,
  api_secret: process.env.Api_Secret,
});

module.exports.userRegister = (req, res) => {
  const form = formidable();

  form.parse(req, async (err, fields, files) => {
    const { username, email, password } = fields;

    //const { image } = files;
    const error = [];

    if (!username) {
      error.push("Please provide your user name");
    }
    if (!email) {
      error.push("Please provide your Email");
    }
    //if unauthorised email
    if (email && !validator.isEmail(email)) {
      error.push("Please provide your Valid Email");
    }
    if (!password) {
      error.push("Please provide your Password");
    }
    if (password && password.length < 9) {
      error.push("Please provide password mush be 8 charecter");
    }
    //if no image uploaded
    /*if (Object.keys(files).length === 0) {
      error.push("Please provide user image");
    }*/
    if (error.length > 0) {
      res.status(400).json({
        error: {
          errorMessage: error,
        },
      });
    } else {
      console.log(fields, files);
      /* IF USER ALREADY EXISTS => ERROR */
	  /*cloudinary.uploader.upload(files.image.path, {
		resource_type: "auto"
	  }, function(error, result) {
		if(error) throw error;
		console.log(result.url);
		// Pass the result.url to your MongoDB user schema
	  });/*
      try {
        const checkUserExists = await signupModel.findOne({
          email: email,
        });
        if (checkUserExists) {
          res.status(404).json({
            error: {
              errorMessage: ["You already signed up with this email."],
            },
          });
        } else {

        // CREATE THE USER 
		
		  cloudinary.uploader.upload(files.image.path, {
			resource_type: "auto"
		  }, function(error, result) {
			if(error) throw error;
			console.log(result.url);
			// Pass the result.url to your MongoDB user schema
		  });
          
          const userCreate = await signupModel.create({
            username,
            email,
            password,
            image: "urlImage",
          });
          console.log("registration Complete successfully");
        }
      } catch (error) {
        res.status(500).json({
          error: {
            errorMessage: ["Interanl Server Error"],
          },
        });
      }*/
    }
  });
};

/*
const { User } = require("../model/userSchema.js");
//bcrypt the password
const bcrypt = require("bcryptjs");
const Joi = require("joi");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const token = user.generateAuthToken();
		res.status(200).send({ data: token, message: "Logged in successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};*/
