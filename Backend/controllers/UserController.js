const { User } = require('../models');
const { UserService } = require('../services');
const { comparePasswords, createToken } = require('../utils')


module.exports = {

    findAll:(req, res)=>{
    User.findById(req.params.id)
      .then((info) => {
            let role = info.role;
            if (role !== "admin") res.status(400).json({message: 'No tienes acceso'})
            else {User.find()
            .then((resDB) => res.status(200).json(resDB))
            .catch((Error)=> console.log(Error))}
     }) 
    }, 
    findAllAdmins:(req, res)=>{
     User.findById(req.params.id)
      .then((info) => {
            let role = info.role;
            if (role !== "admin") res.status(400).json({message: 'No tienes acceso'})
            else {User.find({ role: "admin"})
            .then((resDB) => res.status(200).json(resDB))
            .catch((Error)=> console.log(Error))}
      }) 
    },
    findAllDoctors:(req, res)=>{
     User.findById(req.params.id)
      .then((info) => {
            let role = info.role;
            if (role !== "admin" && role !== "doctor") res.status(400).json({message: 'No tienes acceso'})
            else {User.find({ role: "doctor"})
            .then((resDB) => res.status(200).json(resDB))
            .catch((Error)=> console.log(Error))}
      }) 
    },
    findAllUsers:(req, res)=>{
      User.findById(req.params.id)
      .then((info) => {
            let role = info.role;
            if (role !== "admin" && role !== "doctor") res.status(400).json({message: 'No tienes acceso'})
            else {
        User.find({ role: "user"})
            .then((resDB) => res.status(200).json(resDB))
            .catch((Error)=> console.log(Error))}
      })
    },
    findOne: (req, res) => {
       User.findById(req.params.id2)
      .then((resDB) => res.status(200).json(resDB))
      .catch((Error)=> console.log(Error))
    },
    signupUser: async (req, res)=>{
        const { body } = req;
        try {
            const emailExist = await UserService.findOneByEmail(body.email)
            if (emailExist) res.status(400).json({message: 'Email taken'})
            else {const newUser = new User(body);
            const user = await newUser.save();
            user.password = undefined
            res.status(201).json(user);}       
        } catch (error) {
            res.status(400).json(error)
        }
    },
    signupDoctor:(req, res)=>{
      User.findById(req.params.id)
      .then(async (info) => {
        let role = info.role;
        if (role !== "admin") res.status(400).json({message: 'No tienes acceso'})
       else {
      const { body } = req;
      try {
          const emailExist = await UserService.findOneByEmail(body.email)
          if (emailExist) res.status(400).json({message: 'Email taken'})
          else {const newUser = new User(body);
          const user = await newUser.save();
          user.password = undefined
          res.status(201).json(user);}          
      } catch (error) {
          res.status(400).json(error)
      }}
    }) 
  },
  signupAdmin: (req, res)=>{
    User.findById(req.params.id)
    .then(async (info) => {
      let role = info.role;
      if (role !== "admin") res.status(400).json({message: 'No tienes acceso'})
     else {
    const { body } = req;
    try {
        const emailExist = await UserService.findOneByEmail(body.email)
        if (emailExist) res.status(400).json({message: 'Email taken'})
        else {const newUser = new User(body);
        const user = await newUser.save();
        user.password = undefined
        res.status(201).json(user);}
    } catch (error) {
        res.status(400).json(error)
    }}
  }) 
},
    login: async (req, res)=>{
        const { email, password } = req.body;
        try{
            const user = await UserService.findOneByEmail(email);
            if (!user) res.status(400).json({message: 'Email not valid'})
            const isValid = comparePasswords(password, user.password)
            if (!isValid) res.status(400).json({message: 'Password incorrect'})
            const token = createToken(user);
            if(!token) res.status(500).json({message: 'Error creating token'})
            res.status(200).json({message: 'successful login', token})
        } catch (error) {
            res.status(400).json(error)
       }
    },
    changeUsers:(req, res)=>{
     User.findById(req.params.id)
      .then((info) => {
        let role = info.role;
        if (role !== "admin" && role !== "user") res.status(400).json({message: 'No tienes acceso'})
        else {
        const { body } = req
        User.findByIdAndUpdate(req.params.id2, body, {new: true})
           .then((resDB)=> res.status(200).json(resDB))
           .catch((err)=> res.status(400).json(err))}
    })
    },
    changeDoctors:(req, res)=>{
        User.findById(req.params.id)
         .then((info) => {
           let role = info.role;
           if (role !== "admin" && role !== "doctor") res.status(400).json({message: 'No tienes acceso'})
           else {
           const { body } = req
           User.findByIdAndUpdate(req.params.id2, body, {new: true})
              .then((resDB)=> res.status(200).json(resDB))
              .catch((err)=> res.status(400).json(err))}
       })
    },
    changeAdmins:(req, res)=>{
        User.findById(req.params.id)
         .then((info) => {
           let role = info.role;
           if (role !== "admin") res.status(400).json({message: 'No tienes acceso'})
           else {
           const { body } = req
           User.findByIdAndUpdate(req.params.id2, body, {new: true})
              .then((resDB)=> res.status(200).json(resDB))
              .catch((err)=> res.status(400).json(err))}
       })
    },
    deleteUsers:(req, res)=>{
    User.findById(req.params.id)
      .then((info) => {
        let role = info.role;
        if (role !== "admin" && role !== "user") res.status(400).json({message: 'No tienes acceso'})
        else {
        User.findByIdAndDelete(req.params.id2)
           .then(res.status(200).json({message: 'Usuario borrado'}))
           .catch((err)=> res.status(400).json(err))}
     })
    },
    deleteDoctors:(req, res)=>{
        User.findById(req.params.id)
          .then((info) => {
            let role = info.role;
            if (role !== "admin" && role !== "doctor") res.status(400).json({message: 'No tienes acceso'})
            else {
            User.findByIdAndDelete(req.params.id2)
               .then(res.status(200).json({message: 'Doctor borrado'}))
               .catch((err)=> res.status(400).json(err))}
     })
    },
    deleteAdmins:(req, res)=>{
        User.findById(req.params.id)
          .then((info) => {
            let role = info.role;
            if (role !== "admin") res.status(400).json({message: 'No tienes acceso'})
            else {
            User.findByIdAndDelete(req.params.id2)
               .then(res.status(200).json({message: 'Administrador borrado'}))
               .catch((err)=> res.status(400).json(err))}
     })
    },
    /*findRole: (req, res) => {
        User.findById(req.params.id)
        .then((info) => {
            let role = info.role;
            if (role !== "admin") res.status(400).json({message: 'No tienes acceso'})
            else {User.find()
                .then((resDB) => res.status(200).json(resDB))
                .catch((Error)=> console.log(Error))} 
      })       
    },*/  
}

