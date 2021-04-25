const express = require("express");
const router = express.Router();

const { PayService } = require("../services");

router.post("/paydate/", PayService.pay);

module.exports = router;
