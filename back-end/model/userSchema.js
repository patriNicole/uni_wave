const mongoose = require("mongoose");
//using sessions 
const jwt = require("jsonwebtoken");
//defines constraints for schema 
const Joi = require("joi");
//creates a Joi object that validates password complexity
const passwordComplexity = require("joi-password-complexity");

const userSchemaInformations = mongoose.Schema({
    username: { type: String, unique: true, required: true, trim: true }, 
    email: { type: String, unique: true, required: true, trim: true }, 
    password: { type: String, required: true, minlength: 8, trim: true },   
});

//sign() method to create a JSON Web Token for that user
//returns the token in the form of a JSON string
userSchemaInformations.methods.generateAuthToken = function () {
    //get the user by its id
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "3h", //token expires in 3 hours
	});
	return token;
};

//create a Model by passing the collection name and the schema
const User = mongoose.model("UserInformation", userSchemaInformations);

const validate = (data) => {
	const schema = Joi.object({
		username: Joi.string().required().label("Username"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};

//export the User schema model and the validation of the input
module.exports = { User, validate };
