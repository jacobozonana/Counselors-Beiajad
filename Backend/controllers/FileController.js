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
        cb(null, "./api");
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
      const user = req.body.user;
      const uniqueFilename = new Date().toISOString();
      cloudinary.uploader.upload(
        path,
        { public_id: `counselor/${uniqueFilename}`, tags: user }, // directory and tags are optional
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
        cb(null, "./api");
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
      const user = req.body.user;
      cloudinary.uploader.upload(
        path,
        { public_id: `counselor/profile${user}` }, // directory and tags are optional
        function (err, image) {
          if (err) return res.send(err);
          const fs = require("fs");
          fs.unlinkSync(path);
          res.status(200).json(image);
        }
      );
    });
  },
  findOne: (req, res) => {
    cloudinary.api.resource(
      `counselor/${req.params.id}`,
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
  findMediaByTag1: (req, res) => {
    // esta funcion solo encuentra imagenes con el tag, no otro tipo de archivo
    cloudinary.api.resources_by_tag(req.params.tag, function (err, result) {
      if (err) return res.send(err);
      res.status(200).json(result);
    });
  },
  findMediaByTag: (req, res) => {
    cloudinary.search
      .expression(req.params.tag)
      .with_field("context")
      .with_field("tags")
      .max_results(10)
      .execute()
      .then((resDB) => res.status(200).json(resDB))
      .catch((Error) => console.log(Error));
  },
  delMedia: (req, res) => {
    cloudinary.api.delete_resources(
      `counselor/${req.params.id}`,
      function (err, result) {
        if (err) return res.send(err);
        res.status(200).json(result);
      }
    );
  },
};
