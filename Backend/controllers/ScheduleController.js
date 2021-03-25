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
      if (role !== "admin" && role !== "user" && role !== "doctor")
        res.status(400).json({ message: "No tienes acceso" });
      else {
        const { body } = req;
        const newSchedule = new Schedule(body);
        newSchedule
          .save()
          .then(
            (resDB) => res.status(201).json(resDB),
            User.findById(newSchedule.doctor[0]).then((info) => {
              MailService.sendmail(
                user.email,
                "Cita creada",
                `              
              <h1>Listo ${user.first_name} ${user.last_name} tu cita se creo con exito</h1>
              <p>Dia: ${newSchedule.date}</p>
              <p>Hora: ${newSchedule.time}</p>
              <p>Doctor: ${info.first_name} ${info.last_name} </p>
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
      const user = info;
      if (role !== "admin" && role !== "user" && role !== "doctor")
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
              <h1>Listo ${user.first_name} ${
                  user.last_name
                } tu cita se edito con exito</h1>
              <p>Dia: ${body.date.split("T")[0]}</p>
              <p>Hora: ${body.time}</p>
              <p>Doctor: ${info.first_name} ${info.last_name} </p>
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
