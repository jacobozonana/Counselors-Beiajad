const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middlewares/VerifyToken');
const { FileController } = require('../controllers');

router.post('/upfile', FileController.upfile)
router.get('/findfile', FileController.findfile)
router.get('/findallfiles', FileController.findallfiles)
router.delete('/delfile', FileController.delfile)


module.exports = router;