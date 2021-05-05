const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/VerifyToken");
const { FileController } = require("../controllers");

router.post("/upmedia", verifyToken, FileController.upMedia);
router.post("/upprofile", verifyToken, FileController.upProfilePhoto);
router.post("/findmediabyfolder", verifyToken, FileController.findMediaByFolder);
router.get("/findallmedia", verifyToken, FileController.findAllMedia);
router.delete("/delmedia", verifyToken, FileController.delMedia);

module.exports = router;