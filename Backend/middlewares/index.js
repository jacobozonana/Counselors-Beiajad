const jwt = require("jsonwebtoken");
const multer = require("multer");

module.exports = {
  verifyToken: (req, res, next) => {
    try {
      const { authorization } = req.headers;
      // Bearer y el token que le mandamos
      // authorization.split -> ['Bearer', 'token']
      const token = authorization.split(" ")[1]; // El 0 es Bearer y 1 es el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.decoded = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: "Auth error", err });
    }
  },
  storage: (req, res, next) => {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "uploads/");
      },
      filename: function (req, file, cb) {
        // console.log(file);
        cb(null, file.originalname);
      },
    });
    const upload = multer({ storage }).single("file");
    upload(req, res, function (err) {
      if (err) {
        return res.send(err);
      }
      res.json(req.file);
      // console.log("file uploaded to server");
      // console.log(req.file);

      const cloudinary = require("cloudinary").v2;
      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY_CLOUDINARY,
        api_secret: process.env.API_SECRET_CLOUDINARY,
      });
      const path = req.file.path;
      const uniqueFilename = new Date().toISOString();
      cloudinary.uploader.upload(
        path,
        { public_id: `uploads/${uniqueFilename}`, tags: `uploads` }, // directory and tags are optional
        function (err, image) {
          if (err) return res.send(err);
          // console.log("file uploaded to Cloudinary");
          // remove file from server
          const fs = require("fs");
          fs.unlinkSync(path);
          // return image details
          // console.log(image);
        }
      );
    });
  },
};
