//import database model :
const Sauce = require('../models/Sauce');

exports.likeSauce = (req, res, next) => { 

  //content of the like dislike request sent by the browser
  const sauceLikeObject = req.body;

  //sauce selection (allows the display of likes and dislikes on the front)
  Sauce.findOne({_id: req.params.id})
  .then((sauce) => {      


      //like = +1 (like +1)
      if((!sauce.usersLiked.includes(req.body.userId)) && (req.body.like == 1) ) {
        Sauce.updateOne({ _id: req.params.id }, { $inc: {likes : 1}, $push: { usersLiked : req.body.userId}, _id: req.params.id})
          .then(() => res.status(201).json({ message: "sauce +1 like" }))
          .catch((error) => {res.status(400).json({ error })});
      };      
      

//like = 0 (neutral for sauces that have been liked)
      if((sauce.usersLiked.includes(req.body.userId)) && (req.body.like == 0) ) {
        Sauce.updateOne({_id: req.params.id}, { $inc: {likes: -1}, $pull: {usersLiked : req.body.userId}, _id: req.params.id})
          .then(() => res.status(201).json({ message: "sauce 0 like" }))
          .catch((error) => {res.status(400).json({ error })});
      }


        //like = -1 (dislike = +1)
     if((!sauce.usersDisliked.includes(req.body.userId)) && (req.body.like == -1) ) {
      Sauce.updateOne({ _id: req.params.id }, { $inc: {dislikes : 1}, $push: { usersDisliked : req.body.userId}, _id: req.params.id})
        .then(() => res.status(201).json({ message: "sauce +1 dislike" }))
        .catch((error) => {res.status(400).json({ error })});
      };  


            //dislike = 0 (neutral for sauces that have been liked)
      if((sauce.usersDisliked.includes(req.body.userId)) && (req.body.like == 0) ) {
        Sauce.updateOne({_id: req.params.id}, { $inc: {dislikes: -1}, $pull: {usersDisliked : req.body.userId}, _id: req.params.id})
          .then(() => res.status(201).json({ message: "sauce 0 like" }))
          .catch((error) => {res.status(400).json({ error })});
      }   
  })  
  .catch((error) => res.status(404).json({error}));
};