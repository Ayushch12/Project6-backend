//Importing Express :
const express = require('express');

//Importing morgan (http logger) :
const morgan = require("morgan");

//Importing mongoDB database conexion :
const mongoose = require('./mongoDB/db');

//Import the path of our server :
const path = require('path');

//Importing a helmet :
const helmet = require("helmet");



//Importation of user.js file of routes : :
const userRoutes = require('./routes/user');

//Importing sauce.js file of routes :
const sauceRoutes = require('./routes/sauce');




//Call Express to create an application:
const app = express();

//log requests and responses :
app.use(morgan('dev'));




//CORS : 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});





//Use of the express.json() function with Express to retrieve requests and display them in json format:
app.use(express.json());

// use of the 'helmet' module for security by protecting the application from certain vulnerabilities:
app.use(helmet({crossOriginResourcePolicy: false,}));



//Routes :
app.use('/images', express.static(path.join(__dirname,'images')));
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);



//Exporting the app.js file :
module.exports = app;





