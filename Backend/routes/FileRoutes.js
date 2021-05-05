const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/VerifyToken");
const { FileController } = require("../controllers");

router.post("/upfile", verifyToken, FileController.upFile);
router.post("/upprofile", verifyToken, FileController.upProfilePhoto);
router.post("/findfilesbyfolder", verifyToken, FileController.findFilesByFolder);
router.get("/findallfiles", verifyToken, FileController.findallfiles);
router.delete("/delfile", verifyToken, FileController.delfile);

module.exports = router;