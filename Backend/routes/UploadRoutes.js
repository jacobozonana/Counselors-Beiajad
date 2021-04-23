const express = require('express');
const router = express.Router();

const { verifyToken, storage } = require('../middlewares');

router.post('/upload', storage)

module.exports = router;