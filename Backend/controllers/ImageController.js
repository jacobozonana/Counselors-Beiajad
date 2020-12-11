const { Image } = require('../models');


module.exports = {
    findAll:(res)=>{
       Image.find()
            .then((resDB) => res.status(200).json(resDB))
            .catch((Error)=> console.log(Error)) 
    },
    findOne: (req, res) => {
      Image.findById(req.params.id)
            .then((resDB) => res.status(200).json(resDB))
            .catch((Error)=> console.log(Error)) 
    },
    create:(req, res)=>{

        console.log('req.file : ', req.file)
       /* const { body } = req;
        const newImage = new Image(body);
        newImage.save()
        .then((resDB) => res.status(201).json(resDB))
        .catch((Error)=> console.log(Error))  */    
    },
    change:(req, res)=>{
        const { body } = req
       Image.findByIdAndUpdate(req.params.id, body, {new: true})
           .then((resDB)=> res.status(200).json(resDB))
           .catch((err)=> res.status(400).json(err))
    },
    delete:(req, res)=>{
        Image.findByIdAndDelete(req.params.id)
           .then((resDB)=> res.status(204).json(resDB))
           .catch((err)=> res.status(400).json(err))
    },
}   