const { Schedule, User } = require('../models');


module.exports = {
    findAll:(req, res)=>{
    User.findById(req.params.id)
    .then((info) => {
            let role = info.role;
            if (role !== "admin" && role !== "doctor" && role !== "user" ) res.status(400).json({message: 'No tienes acceso'})
            else {
       Schedule.find()
            .populate("user")
            .then((resDB) => res.status(200).json(resDB))
            .catch((Error)=> console.log(Error))}
    }) 
    },
    findOne: (req, res) => {
      Schedule.findById(req.params.id)
            .populate("user")
            .then((resDB) => res.status(200).json(resDB))
            .catch((Error)=> console.log(Error)) 
    },
    create:(req, res)=>{
        const { body } = req;
        const newSchedule = new Schedule(body);
        newSchedule.save()
        .then((resDB) => res.status(201).json(resDB))
        .catch((Error)=> console.log(Error))      
    },
    change:(req, res)=>{
        const { body } = req
       Schedule.findByIdAndUpdate(req.params.id, body, {new: true})
           .then((resDB)=> res.status(200).json(resDB))
           .catch((err)=> res.status(400).json(err))
    },
    delete:(req, res)=>{
        Schedule.findByIdAndDelete(req.params.id)
           .then((resDB)=> res.status(204).json(resDB))
           .catch((err)=> res.status(400).json(err))
    },
}   