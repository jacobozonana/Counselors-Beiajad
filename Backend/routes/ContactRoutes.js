const express = require('express');
const router = express.Router();

const { ContactController } = require('../controllers');
const { verifyToken } = require('../middlewares/VerifyToken')

router.get('/contacts/', verifyToken, ContactController.findAll)
router.get('/contact/', verifyToken, ContactController.findOne)
router.post('/contact/', ContactController.create)
router.delete('/contact/:id/:id2', verifyToken, ContactController.delete)

module.exports = router;
