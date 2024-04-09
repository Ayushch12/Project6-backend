//Importation of Mongoose:
const mongoose = require('mongoose');

//Importing uniqueValidator :
const uniqueValidator = require('mongoose-unique-validator')

//the database template for signup (to register a new user) :
const userSchema = mongoose.Schema({
    email : {type: String, required: true, unique: true},
    password : {type: String, required: true}
});

//safety advised not to register twice the same email address in the database:
// we apply the plugin method to control the mail :
// on applique la méthode plugin pour controler le mail :
userSchema.plugin(uniqueValidator);

//Exporting the userSchema : 
module.exports = mongoose.model('User', userSchema);