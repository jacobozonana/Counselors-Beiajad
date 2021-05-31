const { User } = require("../models");
const { UserService, MailService } = require("../services");
const { comparePasswords, createToken } = require("../utils");
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

module.exports = {
  findAll: (req, res) => {
    User.findById(req.params.id).then((info) => {
      let role = info.role;
      if (role !== "admin")
        res.status(400).json({ message: "No tienes acceso" });
      else {
        User.find()
          .then((resDB) => res.status(200).json(resDB))
          .catch((Error) => console.log(Error));
      }
    });
  },
  findAllAdmins: (req, res) => {
    User.findById(req.params.id).then((info) => {
      let role = info.role;
      if (role !== "admin")
        res.status(400).json({ message: "No tienes acceso" });
      else {
        User.find({ role: "admin" })
          .then((resDB) => res.status(200).json(resDB))
          .catch((Error) => console.log(Error));
      }
    });
  },
  findAllDoctors: (req, res) => {
    User.findById(req.params.id).then((info) => {
      let role = info.role;
      if (role !== "admin" && role !== "doctor" && role !== "user")
        res.status(400).json({ message: "No tienes acceso" });
      else {
        User.find({ role: "doctor" })
          .then((resDB) => res.status(200).json(resDB))
          .catch((Error) => console.log(Error));
      }
    });
  },
  findAllUsers: (req, res) => {
    User.findById(req.params.id).then((info) => {
      let role = info.role;
      if (role !== "admin" && role !== "doctor")
        res.status(400).json({ message: "No tienes acceso" });
      else {
        User.find({ role: "user" })
          .then((resDB) => res.status(200).json(resDB))
          .catch((Error) => console.log(Error));
      }
    });
  },
  findOne: (req, res) => {
    User.findById(req.params.id)
      .then((resDB) => res.status(200).json(resDB))
      .catch((Error) => console.log(Error));
  },
  signupUser: async (req, res) => {
    const { body } = req;
    try {
      const emailExist = await UserService.findOneByEmail(body.email);
      if (emailExist) res.status(400).json({ message: "Correo ocupado escoge otro" });
      else {
        const newUser = new User(body);
        const user = await newUser.save();
        user.password = undefined;
        res.status(201).json(user);
        MailService.sendmail(
          body.email,
          "Bienvenid@",
          ` 
          <!DOCTYPE html>
            <html>
              <head>
                <style>
                  h1 {
                      text-align: center;
                     }
                  .img-container {
                                  display: block;
                                  margin-left: auto;
                                  margin-right: auto;
                                  height: 90px;
                                  width: auto;
                                  border-radius: 30%;
                                 }
                </style>
              </head>
              <body>
                <img class="img-container" alt="Logo" src="http://drive.google.com/uc?export=view&id=1ZStbt9J-8SQhcCB71hT744TO5PRLb1Mt" />              
                <h1>Hola ${user.first_name} ${user.last_name}, tu cuenta se creo con exito</h1>
              </body>
            </html>
          `
        );
      }
    } catch (error) {
      res.status(400).json(error);
    }
  },
  signupDoctor: (req, res) => {
    User.findById(req.params.id).then(async (info) => {
      let role = info.role;
      if (role !== "admin")
        res.status(400).json({ message: "No tienes acceso" });
      else {
        const { body } = req;
        try {
          const emailExist = await UserService.findOneByEmail(body.email);
          if (emailExist) res.status(400).json({ message: "Correo ocupado escoge otro" });
          else {
            const newUser = new User(body);
            const user = await newUser.save();
            user.password = undefined;
            res.status(201).json(user);
            MailService.sendmail(
              body.email,
              "Bienvenid@",
          ` 
          <!DOCTYPE html>
            <html>
              <head>
                <style>
                  h1 {
                      text-align: center;
                     }
                  .img-container {
                                  display: block;
                                  margin-left: auto;
                                  margin-right: auto;
                                  height: 90px;
                                  width: auto;
                                  border-radius: 30%;
                                 }
                </style>
              </head>
              <body>
                <img class="img-container" alt="Logo" src="http://drive.google.com/uc?export=view&id=1ZStbt9J-8SQhcCB71hT744TO5PRLb1Mt" />              
                <h1>Hola ${user.first_name} ${user.last_name}, tu cuenta se creo con exito</h1>
              </body>
            </html>
          `
            );
          }
        } catch (error) {
          res.status(400).json(error);
        }
      }
    });
  },
  signupAdmin: (req, res) => {
    User.findById(req.params.id).then(async (info) => {
      let role = info.role;
      if (role !== "admin")
        res.status(400).json({ message: "No tienes acceso" });
      else {
        const { body } = req;
        try {
          const emailExist = await UserService.findOneByEmail(body.email);
          if (emailExist) res.status(400).json({ message: "Correo ocupado escoge otro" });
          else {
            const newUser = new User(body);
            const user = await newUser.save();
            user.password = undefined;
            res.status(201).json(user);
            MailService.sendmail(
              body.email,
              "Bienvenid@",
              ` 
              <!DOCTYPE html>
                <html>
                  <head>
                    <style>
                      h1 {
                          text-align: center;
                         }
                      .img-container {
                                      display: block;
                                      margin-left: auto;
                                      margin-right: auto;
                                      height: 90px;
                                      width: auto;
                                      border-radius: 30%;
                                     }
                    </style>
                  </head>
                  <body>
                    <img class="img-container" alt="Logo" src="http://drive.google.com/uc?export=view&id=1ZStbt9J-8SQhcCB71hT744TO5PRLb1Mt" />              
                    <h1>Hola ${user.first_name} ${user.last_name}, tu cuenta se creo con exito</h1>
                  </body>
                </html>
              `
            );
          }
        } catch (error) {
          res.status(400).json(error);
        }
      }
    });
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await UserService.findOneByEmail(email);
      if (!user) res.status(400).json({ message: "Email no valido" });
      const isValid = comparePasswords(password, user.password);
      if (!isValid) res.status(400).json({ message: "Contraseña incorrecta" });
      const token = createToken(user);
      if (!token) res.status(500).json({ message: "Error al crear token" });
      res.status(200).json({ message: "Acceso correcto", token });
    } catch (error) {
      res.status(400).json(error);
    }
  },
  changeUsers: (req, res) => {
    User.findById(req.params.id).then((info) => {
      let role = info.role;
      if (role !== "admin" && role !== "user")
        res.status(400).json({ message: "No tienes acceso" });
      else {
        User.findById(req.params.id2).then(async (info) => {
          let role = info.role;
          if (role !== "user")
            res
              .status(400)
              .json({ message: "El ID que desea editar no es usuario" });
          else {
            const { body } = req;
            try {
              const emailExist = await UserService.findOneByEmail(body.email);
              if (emailExist) res.status(400).json({ message: "Correo ocupado escoge otro" });
              else {
                User.findByIdAndUpdate(req.params.id2, body, { new: true })
                  .then((resDB) => res.status(200).json(resDB))
                  .catch((err) => res.status(400).json(err));
              }
            } catch (error) {
              res.status(400).json(error);
            }
          }
        });
      }
    });
  },
  changeDoctors: (req, res) => {
    User.findById(req.params.id).then((info) => {
      let role = info.role;
      if (role !== "admin" && role !== "doctor")
        res.status(400).json({ message: "No tienes acceso" });
      else {
        User.findById(req.params.id2).then(async (info) => {
          let role = info.role;
          if (role !== "doctor")
            res
              .status(400)
              .json({ message: "El ID que desea editar no es doctor" });
          else {
            const { body } = req;
            try {
              const emailExist = await UserService.findOneByEmail(body.email);
              if (emailExist) res.status(400).json({ message: "Correo ocupado escoge otro" });
              else {
                User.findByIdAndUpdate(req.params.id2, body, { new: true })
                  .then((resDB) => res.status(200).json(resDB))
                  .catch((err) => res.status(400).json(err));
              }
            } catch (error) {
              res.status(400).json(error);
            }
          }
        });
      }
    });
  },
  changeAdmins: (req, res) => {
    User.findById(req.params.id).then((info) => {
      let role = info.role;
      if (role !== "admin")
        res.status(400).json({ message: "No tienes acceso" });
      else {
        User.findById(req.params.id2).then(async (info) => {
          let role = info.role;
          if (role !== "admin")
            res
              .status(400)
              .json({ message: "El ID que desea editar no es administrador" });
          else {
            const { body } = req;
            try {
              const emailExist = await UserService.findOneByEmail(body.email);
              if (emailExist) res.status(400).json({ message: "Correo ocupado escoge otro" });
              else {
                User.findByIdAndUpdate(req.params.id2, body, { new: true })
                  .then((resDB) => res.status(200).json(resDB))
                  .catch((err) => res.status(400).json(err));
              }
            } catch (error) {
              res.status(400).json(error);
            }
          }
        });
      }
    });
  },
  deleteUsers: (req, res) => {
    User.findById(req.params.id).then((info) => {
      let role = info.role;
      if (role !== "admin" && role !== "user")
        res.status(400).json({ message: "No tienes acceso" });
      else {
        User.findById(req.params.id2).then((info) => {
          let role = info.role;
          if (role !== "user")
            res
              .status(400)
              .json({ message: "El ID que desea borrar no es usuario" });
          else {
            User.findByIdAndDelete(req.params.id2)
              .then(res.status(200).json({ message: "Usuario borrado" }))
              .catch((err) => res.status(400).json(err));
          }
        });
      }
    });
  },
  deleteDoctors: (req, res) => {
    User.findById(req.params.id).then((info) => {
      let role = info.role;
      if (role !== "admin")
        res.status(400).json({ message: "No tienes acceso" });
      else {
        User.findById(req.params.id2).then((info) => {
          let role = info.role;
          if (role !== "doctor")
            res
              .status(400)
              .json({ message: "El ID que desea borrar no es doctor" });
          else {
            User.findByIdAndDelete(req.params.id2)
              .then(res.status(200).json({ message: "Doctor borrado" }))
              .catch((err) => res.status(400).json(err));
          }
        });
      }
    });
  },
  deleteAdmins: (req, res) => {
    User.findById(req.params.id).then((info) => {
      let role = info.role;
      if (role !== "admin")
        res.status(400).json({ message: "No tienes acceso" });
      else {
        User.findById(req.params.id2).then((info) => {
          let role = info.role;
          if (role !== "admin")
            res
              .status(400)
              .json({ message: "El ID que desea borrar no es administrador" });
          else {
            User.findByIdAndDelete(req.params.id2)
              .then(res.status(200).json({ message: "Administrador borrado" }))
              .catch((err) => res.status(400).json(err));
          }
        });
      }
    });
  },
  changePas: async (req, res) => {
    const { email, password, newpassword } = req.body;
    try {
      const user = await UserService.findOneByEmail(email);
      const isValid = comparePasswords(password, user.password);
      if (!isValid) res.status(400).json({ message: "Contraseña incorrecta" });
      const hash = bcrypt.hashSync(newpassword, SALT_WORK_FACTOR);
      User.findByIdAndUpdate(req.params.id, { password: hash }, { new: true })
        .then(() =>
          res.status(200).json({ message: "La contraseña se cambio con exito" })
        )
        .catch((err) => res.status(400).json(err));
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
