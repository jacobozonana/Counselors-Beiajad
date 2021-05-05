const multer = require("multer");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY_CLOUDINARY,
  api_secret: process.env.API_SECRET_CLOUDINARY,
});

module.exports = {
  upMedia: (req, res) => {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "uploads/");
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      },
    });
    const upload = multer({ storage }).single("file");
    upload(req, res, function (err) {
      if (err) {
        return res.send(err);
      }
      const path = req.file.path;
      const route = req.body.route;
      const uniqueFilename = new Date().toISOString();
      cloudinary.uploader.upload(
        path,
        { public_id: `${route}/${uniqueFilename}` },
        function (err, image) {
          if (err) return res.send(err);
          const fs = require("fs");
          fs.unlinkSync(path);
          res.status(200).json(image);
        }
      );
    });
  },
  upProfilePhoto: (req, res) => {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "uploads/");
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      },
    });
    const upload = multer({ storage }).single("file");
    upload(req, res, function (err) {
      if (err) {
        return res.send(err);
      }
      const path = req.file.path;
      const route = req.body.route;
      cloudinary.uploader.upload(
        path,
        { public_id: `${route}/profile` },
        function (err, image) {
          if (err) return res.send(err);
          const fs = require("fs");
          fs.unlinkSync(path);
          res.status(200).json(image);
        }
      );
    });
  },
  findMediaByFolder: (req, res) => {
    const { route } = req.body;
    cloudinary.api.resources(
      {
        type: "upload",
        prefix: route,
      },
      function (err, result) {
        if (err) return res.send(err);
        res.status(200).json(result);
      }
    );
  },
  findAllMedia: (req, res) => {
    cloudinary.api.resources(function (err, result) {
      if (err) return res.send(err);
      res.status(200).json(result);
    });
  },
  delMedia: (req, res) => {
    const { public_id } = req.body;
    cloudinary.api.delete_resources(public_id, function (err, result) {
      if (err) return res.send(err);
      res.status(200).json(result);
    });
  },
};
