/* CREATE THE USER */

const router = require("express").Router();
//import the user model and validation
const { User, validate } = require("../model/userSchema.js");
//bcrypt the password
const bcrypt = require("bcryptjs");

//POST call to the API
router.post("/", async (req, res) => {
  try {
    //finds the validation errors in this request and wraps them in an object
    const { error } = validate(req.body);
    if (error) {
      //400 = an HTTP status code that describes an error caused by an invalid request
      return res.status(400).send({ message: error.details[0].message });
    }
    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res
      //409 = the request could not be processed because of conflict in the request
        .status(409)
        .send({ message: "User with given email already Exist!" });

    //encrypt the password
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    //add the salt string to the password
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new User({ ...req.body, password: hashPassword }).save();
    //201 = created successflly
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
