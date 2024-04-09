//Importing Express :
const express = require('express');

//Call Express to create the router of each midellware :
const router = express.Router();

//importation du middleware/auth :
const auth = require('../middleware/auth');

//Import the multer file of middlware for the management of image files:
const multer = require('../middleware/multer');

//Importing a sauce.js file from controllers :
const sauceControllers = require('../controllers/sauce');

//Importation of like.js file from controllers :
const likeControllers = require("../controllers/like")



//Route POST :
router.post('/', auth, multer, sauceControllers.createSauce);


//Route PUT :
router.put('/:id', auth, multer, sauceControllers.modifySauce);


//Route DELETE :
router.delete('/:id', auth, sauceControllers.deleteSauce);


//Route GET :
router.get('/', auth, sauceControllers.getAllSauce);


//Route GET :
router.get('/:id', auth, sauceControllers.getOneSauce);


//Route POST :
router.post("/:id/like" , auth, likeControllers.likeSauce);




//Exporting the sauce.js file of routes :
module.exports = router;