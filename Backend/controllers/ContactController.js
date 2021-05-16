const { Contact, User } = require("../models");
const { MailService } = require("../services");

module.exports = {
  findAll: (req, res) => {
    Contact.find()
      .then((resDB) => res.status(200).json(resDB))
      .catch((Error) => console.log(Error));
  },
  findOne: (req, res) => {
    Contact.findById(req.params.id)
      .then((resDB) => res.status(200).json(resDB))
      .catch((Error) => console.log(Error));
  },
  create: (req, res) => {
    const { body } = req;
    const newContact = new Contact(body);
    newContact
      .save()
      .then(
        (resDB) => res.status(201).json(resDB),
        MailService.sendmail(
          "jacobozonana@gmail.com",
          "Contacto",
          `  
        <!DOCTYPE html>
          <html>
            <head>
              <style>                                
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
              <h1>Informacion de contacto</h1>
              <h3>Nombre: ${newContact.name}</h3>
              <h3>Email: ${newContact.email}</h3>
              <h3>Telefono: ${newContact.tel}</h3>
              <h3>Mensaje: ${newContact.note}</h3>
            </body>
          </html>
    `
        )
      )
      .catch((Error) => console.log(Error));
  },
  delete: (req, res) => {
    User.findById(req.params.id).then((info) => {
      let role = info.role;
      if (role !== "admin")
        res.status(400).json({ message: "No tienes acceso" });
      else {
        Contact.findByIdAndDelete(req.params.id2)
          .then((resDB) =>
            res.status(200).json({ message: "Contacto borrado" })
          )
          .catch((err) => res.status(400).json(err));
      }
    });
  },
};
