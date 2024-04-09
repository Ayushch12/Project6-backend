//multer : to manage HTTP requests with file sending :

//Importing the multer package :
const multer = require('multer');



//the MIME_TYPES dictionary :
const MIME_TYPES = {
    'image/jpg' : 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png',
    'image/gif': 'gif'
};



//the destination of the file (directory) and generate a unique file name :
const storage = multer.diskStorage({
    ///storage destination of the file :
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    
    filename: (req, file, callback) => {
        //delete spaces in the file name :
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype]
        callback(null, name + Date.now() + '.' + extension);
    }
})

 
//Exportation du middleware multer : 
module.exports = multer({storage}).single('image');






