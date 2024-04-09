//Importing the model sauce file :
const Sauce = require('../models/Sauce');

//importing the fs from node.js : //file system(fs)
const fs = require('fs');



///Logic POST:

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce)
    delete sauceObject._id;

    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    //save the object in the database by calling the save method:
    sauce.save()
        .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
        .catch(error => { res.status(400).json( { error })});
}



//Logic PUT :

exports.modifySauce = (req, res, next) => {
   //if you modify the image file, retrieve the name of the current image file sauce for deletion,
  // to avoid having a useless file in the images folder :

  if(req.file){
    Sauce.findOne({ _id: req.params.id})
    .then(sauce => {
      const filename = sauce.imageUrl.split("/images")[1];

//deleting the image of the sauce because it will be replaced by the new image of sauce:
      fs.unlink(`images/${filename}`, (err) => {
        if(err) throw err;
      })

    })
    .catch(error => res.status(400).json({error}));  
  }

  
 //the object that will be sent to the database :
  const sauceObject = req.file ?

  {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } :
  { ...req.body};


  //update in the database :
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }) 
    .then(() => res.status(200).json({ message: "objet mise à jour" }))
    .catch((error) => res.status(404).json({ error }));
}



//Logic DELETE :

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];

      fs.unlink(`images/${filename}`, () => {

      Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: `l'objet ${req.params.id} a été supprimé` }))
        .catch((error) => res.status(404).json({ error }));
    });

  })
  .catch(error => res.status(500).json({error}));  
}




//Logic GET with Find :

exports.getAllSauce = (req, res, next) => {
    //use the find() method to get the complete list:
    Sauce.find()
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json({error}));
}



//Logic GET with OneFind :

exports.getOneSauce =  (req, res, next) => {
  // to access the id, req.params.id :
  
    Sauce.findOne({_id: req.params.id})
      .then(sauce => res.status(200).json(sauce))
      .catch((error) => res.status(400).json({error}));
}


