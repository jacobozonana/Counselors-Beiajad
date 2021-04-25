const multer = require("multer");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY_CLOUDINARY,
  api_secret: process.env.API_SECRET_CLOUDINARY,
});

module.exports = {
  upfile: (req, res) => {
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
      const uniqueFilename = new Date().toISOString();
      cloudinary.uploader.upload(
        path,
        { public_id: `uploads/${uniqueFilename}`, tags: [`mail2`, `id`] }, // directory and tags are optional
        function (err, image) {
          if (err) return res.send(err);
          const fs = require("fs");
          fs.unlinkSync(path);
          res.status(200).json(image);
        }
      );
    });
  },
  findfile: (req, res) => {
    const { email, type } = req.body;
    cloudinary.api.resources_by_tag(
      email,
      type, //los tags para buscar tienen que pasarse en el orden que se graban en la api
      function (err, result) {
        if (err) return res.send(err);
        res.status(200).json(result);
      }
    );
  },
  findallfiles: (req, res) => {
    cloudinary.api.resources(
      function (err, result) {
        if (err) return res.send(err);
        res.status(200).json(result);
      }
    );
  },
  delfile: (req, res) => {
    const { public_id } = req.body;
    cloudinary.api.delete_resources(
      public_id,
      function (err, result) {
        if (err) return res.send(err);
        res.status(200).json(result);
      }
    );
  },
};
