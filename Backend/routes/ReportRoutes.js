const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middlewares/VerifyToken');
const { MailService } = require('../services');

router.post('/sendreport/', verifyToken, MailService.sendreport)

module.exports = router;