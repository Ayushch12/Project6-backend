//importing the password-validator :
const passwordValidator = require('password-validator');

//creation of the scheme :
const passwordSchema = new passwordValidator ();


//the scheme must respect the password : 
passwordSchema
    .is().min(6)                                 
    .is().max(100)                                  
    .has().uppercase()                              
    .has().lowercase()                              
    .has().digits(2)                                
    .has().not().spaces()                           
    .is().not().oneOf(['Passw0rd', 'Password123']); 



//checking the quality of the password against the scheme :
module.exports = (req, res, next) => {

    if(passwordSchema.validate(req.body.password)){
        next();
    }

    else{
        res.status(400).json({error : `The password is not strong enough ${passwordSchema.validate('req.body.password', {list: true})}`})
    }
}