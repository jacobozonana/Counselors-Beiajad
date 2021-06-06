const { Product, User } = require("../models");

module.exports = {
  findAll: (req, res) => {
    // User.findById(req.params.id).then((info) => {
    //   let role = info.role;
    //   if (role !== "admin")
    //     res.status(400).json({ message: "No tienes acceso" });
    //   else {
        Product.find()
          .then((resDB) => res.status(200).json(resDB))
          .catch((Error) => console.log(Error));
    //   }
    // });
  },
  findOne: (req, res) => {
    Product.findById(req.params.id)
      .then((resDB) => res.status(200).json(resDB))
      .catch((Error) => console.log(Error));
  },
  create: (req, res) => {
    // User.findById(req.params.id).then((info) => {
    //   let role = info.role;
    //   if (role !== "admin" && role !== "user" && role !== "doctor")
    //     res.status(400).json({ message: "No tienes acceso" });
    //   else {
        const { body } = req;
        const newProduct = new Product(body);
        newProduct
          .save()
          .then((resDB) => res.status(201).json(resDB))
          .catch((Error) => console.log(Error));
    //   }
    // });
  },
  delete: (req, res) => {
    // User.findById(req.params.id).then((info) => {
    //   let role = info.role;
    //   if (role !== "admin" && role !== "user")
    //     res.status(400).json({ message: "No tienes acceso" });
    //   else {
        Product.findByIdAndDelete(req.params.id)
          .then((resDB) =>
            res.status(200).json({ message: "Producto borrado" })
          )
          .catch((err) => res.status(400).json(err));
    //   }
    // });
  },
};
