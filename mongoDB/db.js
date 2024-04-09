//Importation of Mongoose:
const mongoose = require('mongoose');

//Importation of dotenv for environment variables :
const dotenv = require("dotenv").config();

const mongoDBUrl = process.env.MONGODB_URI;


//Conection de mongoDB à l'API grâce à mongoose :

mongoose.connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));




//Exportation mangoose :
module.exports = mongoose;