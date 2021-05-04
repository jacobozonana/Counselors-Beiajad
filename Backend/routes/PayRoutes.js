const express = require("express");
const router = express.Router();

const { PayService } = require("../services");
const { verifyToken } = require("../middlewares/VerifyToken");

router.post("/paydate/", verifyToken, PayService.pay);
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  PayService.whook
);

module.exports = router;
