const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/VerifyToken");
const { FileController } = require("../controllers");

router.post("/upmedia", verifyToken, FileController.upMedia);
router.post("/upprofile", FileController.upProfilePhoto);
router.get("/findonemedia/:id", verifyToken, FileController.findOne);
router.get("/findallmedia", verifyToken, FileController.findAllMedia);
router.get("/findmediabytag/:tag", verifyToken, FileController.findMediaByTag);
router.delete("/delmedia/:id", verifyToken, FileController.delMedia);

module.exports = router;
