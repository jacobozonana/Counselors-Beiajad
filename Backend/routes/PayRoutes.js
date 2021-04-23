const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares");
const { PayService } = require("../services");

router.post("/create-checkout-session/", verifyToken, PayService.pay);

module.exports = router;
