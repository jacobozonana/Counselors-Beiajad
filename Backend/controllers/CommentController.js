const { Comment, User } = require("../models");

module.exports = {
  findAll: (req, res) => {
    User.findById(req.params.id).then((info) => {
      let role = info.role;
      if (role !== "admin")
        res.status(400).json({ message: "No tienes acceso" });
      else {
        Comment.find()
          .populate("author")
          .populate("about")
          .then((resDB) => res.status(200).json(resDB))
          .catch((Error) => console.log(Error));
      }
    });
  },
  findAllCommentsByAuthor: (req, res) => {
    User.findById(req.params.id).then((info) => {
      let role = info.role;
      if (role !== "admin" && role !== "doctor" && role !== "user")
        res.status(400).json({ message: "No tienes acceso" });
      else {
        Comment.find({ author: req.params.id2 })
          .populate("author")
          .populate("about")
          .then((resDB) => res.status(200).json(resDB))
          .catch((Error) => console.log(Error));
      }
    });
  },
  findAllCommentsByAbout: (req, res) => {
    User.findById(req.params.id).then((info) => {
      let role = info.role;
      if (role !== "admin" && role !== "user" && role !== "doctor")
        res.status(400).json({ message: "No tienes acceso" });
      else {
        Comment.find({ about: req.params.id2 })
          .populate("author")
          .populate("about")
          .then((resDB) => res.status(200).json(resDB))
          .catch((Error) => console.log(Error));
      }
    });
  },
  findOne: (req, res) => {
    Comment.findById(req.params.id)
      .populate("author")
      .populate("about")
      .then((resDB) => res.status(200).json(resDB))
      .catch((Error) => console.log(Error));
  },
  create: (req, res) => {
    User.findById(req.params.id).then((info) => {
      let role = info.role;
      if (role !== "admin" && role !== "user" && role !== "doctor")
        res.status(400).json({ message: "No tienes acceso" });
      else {
        const { body } = req;
        const newComment = new Comment(body);
        newComment
          .save()
          .then((resDB) => res.status(201).json(resDB))
          .catch((Error) => console.log(Error));
      }
    });
  },
  change: (req, res) => {
    User.findById(req.params.id).then((info) => {
      let role = info.role;
      if (role !== "admin")
        res.status(400).json({ message: "No tienes acceso" });
      else {
        const { body } = req;
        Comment.findByIdAndUpdate(req.params.id2, body, { new: true })
          .then((resDB) => res.status(200).json(resDB))
          .catch((err) => res.status(400).json(err));
      }
    });
  },
  delete: (req, res) => {
    User.findById(req.params.id).then((info) => {
      let role = info.role;
      if (role !== "admin" && role !== "user")
        res.status(400).json({ message: "No tienes acceso" });
      else {
        Comment.findByIdAndDelete(req.params.id2)
          .then((resDB) =>
            res.status(200).json({ message: "Comentario borrado" })
          )
          .catch((err) => res.status(400).json(err));
      }
    });
  },
};
