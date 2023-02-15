const { model, Schema } = require('mongoose');

const registerSchema = new Schema({
     username : {
          type : String,
          required : true,
          unique: true,
          trim: true
     },
     email : {
          type: String,
          required : true,
          unique: true,
          trim: true,
          lowercase: true
     },
     password : {
          type: String,
          required : true,
          //IMPORTANT - security reasons
          //even if someone gains unauthorized access to the database, 
          //they won't be able to see the password in plain text
          //PASSWORD WON'T BE DISPLAYED IN Check User unless select: true
          select : false,
          minlength: 8,
          trim: true
     },
     image : {
          type: String,
          required : true,
     }
    //timestamp represents the time when the 
    //account has been created or updated
},{timestamps : true});

module.exports = model('user',registerSchema);