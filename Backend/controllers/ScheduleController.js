const { Schedule, User } = require("../models");
const { MailService } = require("../services");

module.exports = {
  findAll: (req, res) => {
    User.findById(req.params.id).then((info) => {
      let role = info.role;
      if (role !== "admin")
        res.status(400).json({ message: "No tienes acceso" });
      else {
        Schedule.find()
          .populate("user")
          .populate("doctor")
          .then((resDB) => res.status(200).json(resDB))
          .catch((Error) => console.log(Error));
      }
    });
  },
  findAllDatesByDoctor: (req, res) => {
    User.findById(req.params.id).then((info) => {
      let role = info.role;
      if (role !== "admin" && role !== "doctor" && role !== "user")
        res.status(400).json({ message: "No tienes acceso" });
      else {
        Schedule.find({ doctor: req.params.id2 })
          .populate("user")
          .populate("doctor")
          .then((resDB) => res.status(200).json(resDB))
          .catch((Error) => console.log(Error));
      }
    });
  },
  findAllDatesByUser: (req, res) => {
    User.findById(req.params.id).then((info) => {
      let role = info.role;
      if (role !== "admin" && role !== "user" && role !== "doctor")
        res.status(400).json({ message: "No tienes acceso" });
      else {
        Schedule.find({ user: req.params.id2 })
          .populate("user")
          .populate("doctor")
          .then((resDB) => res.status(200).json(resDB))
          .catch((Error) => console.log(Error));
      }
    });
  },
  findOne: (req, res) => {
    Schedule.findById(req.params.id)
      .populate("user")
      .populate("doctor")
      .then((resDB) => res.status(200).json(resDB))
      .catch((Error) => console.log(Error));
  },
  create: (req, res) => {
    User.findById(req.params.id).then((info) => {
      const role = info.role;
      const user = info;
      if (role !== "admin")
        res.status(400).json({ message: "No tienes acceso" });
      else {
        const { body } = req;
        const newSchedule = new Schedule(body);
        const future = Math.floor(Date.now() / 1000) + 60 * 1;
        const fut =
          Math.floor(new Date(newSchedule.date).valueOf() / 1000) - 60 * 60 * 4; // esta constante se usara, aqui ya en produccion poner la fecha que queremos el recordatorio, y si son mas recordatorios hay que mandar una funcion cada vez con la fecha solicitada
        newSchedule
          .save()
          .then(
            (resDB) => res.status(201).json(resDB),
            User.findById(newSchedule.doctor[0]).then((info) => {
              MailService.sendmail(
                user.email,
                "Cita creada",
                `  
                <!DOCTYPE html>
                  <html>
                    <head>
                      <style>
                        h1 {
                            text-align: center;
                          }
                        h3 {
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
                      <h1>Listo ${user.first_name} ${
                  user.last_name
                } tu cita se creo con exito</h1>
                      <h3 class="date">Dia: ${
                        newSchedule.date.toLocaleString().split(",")[0]
                      }</h3>
                      <h3 class="date">Hora: ${newSchedule.time}</h3>
                      <h3 class="date">Doctor: ${info.first_name} ${
                  info.last_name
                } </h3>
                    </body>
                  </html>
            `
              );
              MailService.sendfuturemail(
                future,
                user.email,
                "Recordatorio para tu cita",
                `  
                <!DOCTYPE html>
                  <html>
                    <head>
                      <style>
                        h1 {
                            text-align: center;
                          }
                        h3 {
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
                      <h1>Hola ${user.first_name} ${
                  user.last_name
                } te recordamos tu cita, te esperamos</h1>
                      <h3 class="date">Dia: ${
                        newSchedule.date.toLocaleString().split(",")[0]
                      }</h3>
                      <h3 class="date">Hora: ${newSchedule.time}</h3>
                      <h3 class="date">Doctor: ${info.first_name} ${
                  info.last_name
                } </h3>
                    </body>
                  </html>
            `
              );
            })
          )
          .catch((Error) => console.log(Error));
      }
    });
  },
  paytocreate: (req, res) => {
    User.findById(req.id).then((info) => {
      const role = info.role;
      const user = info;
      if (role !== "user")
        res.status(400).json({ message: "No tienes acceso" });
      else {
        const newSchedule = new Schedule(req);
        const future = Math.floor(Date.now() / 1000) + 60 * 1;
        const fut =
          Math.floor(new Date(newSchedule.date).valueOf() / 1000) - 60 * 60 * 4; // esta constante se usara, aqui ya en produccion poner la fecha que queremos el recordatorio, y si son mas recordatorios hay que mandar una funcion cada vez con la fecha solicitada la api permite maximo 72 horas de anticipacion, mas horas ya no lo manda
        newSchedule
          .save()
          .then(
            (resDB) => resDB,
            User.findById(newSchedule.doctor[0]).then((info) => {
              MailService.sendfuturemail(
                future,
                user.email,
                "Recordatorio para tu cita",
                `  
                <!DOCTYPE html>
                  <html>
                    <head>
                      <style>
                        h1 {
                            text-align: center;
                          }
                        h3 {
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
                      <h1>Hola ${user.first_name} ${
                  user.last_name
                } te recordamos tu cita, te esperamos</h1>
                      <h3 class="date">Dia: ${
                        newSchedule.date.toLocaleString().split(",")[0]
                      }</h3>
                      <h3 class="date">Hora: ${newSchedule.time}</h3>
                      <h3 class="date">Doctor: ${info.first_name} ${
                  info.last_name
                } </h3>
                    </body>
                  </html>
            `
              );
              MailService.sendmail(
                user.email,
                "Cita creada",
                `  
                <!DOCTYPE html>
                  <html>
                    <head>
                      <style>
                        h1 {
                            text-align: center;
                          }
                        h3 {
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
                      <h1>Listo ${user.first_name} ${
                  user.last_name
                } tu cita se creo con exito</h1>
                      <h3 class="date">Dia: ${
                        newSchedule.date.toLocaleString().split(",")[0]
                      }</h3>
                      <h3 class="date">Hora: ${newSchedule.time}</h3>
                      <h3 class="date">Doctor: ${info.first_name} ${
                  info.last_name
                } </h3>
                    </body>
                  </html>
            `
              );
            })
          )
          .catch((Error) => console.log(Error));
      }
    });
  },
  createb: (req, res) => {
    User.findById(req.params.id).then((info) => {
      const role = info.role;
      if (role !== "doctor")
        res.status(400).json({ message: "No tienes acceso" });
      else {
        const { body } = req;
        const newSchedule = new Schedule(body);
        newSchedule
          .save()
          .then((resDB) => res.status(201).json(resDB))
          .catch((Error) => console.log(Error));
      }
    });
  },
  change: (req, res) => {
    User.findById(req.params.id).then((info) => {
      let role = info.role;
      const user = info;
      if (role !== "admin" && role !== "user")
        res.status(400).json({ message: "No tienes acceso" });
      else {
        const { body } = req;
        Schedule.findByIdAndUpdate(req.params.id2, body, { new: true })
          .then(
            (resDB) => res.status(200).json(resDB),
            User.findById(body.doctor).then((info) => {
              MailService.sendmail(
                user.email,
                "Cita editada",
                `
                <!DOCTYPE html>
                <html>
                  <head>
                    <style>
                      h1 {
                          text-align: center;
                        }
                      h3 {
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
                    <h1>Listo ${user.first_name} ${
                  user.last_name
                } tu cita se edito con exito</h1>
                    <h3>Dia: ${body.date.split("T")[0]}</h3>
                    <h3>Hora: ${body.time}</h3>
                    <h3>Doctor: ${info.first_name} ${info.last_name} </h3>
                  </body>
                </html>
            `
              );
            })
          )
          .catch((err) => res.status(400).json(err));
      }
    });
  },
  delete: (req, res) => {
    User.findById(req.params.id).then((info) => {
      let role = info.role;
      if (role !== "admin" && role !== "user" && role !== "doctor")
        res.status(400).json({ message: "No tienes acceso" });
      else {
        Schedule.findByIdAndDelete(req.params.id2)
          .then(() => res.status(200).json({ message: "Cita borrada" }))
          .catch((err) => res.status(400).json(err));
      }
    });
  },
};
