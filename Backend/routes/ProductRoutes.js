const express = require('express');
const router = express.Router();

const { ProductController } = require('../controllers');
// const { ProductValidator } = require('../validators')
// const { verifyToken } = require('../middlewares/VerifyToken')

router.get('/products/', ProductController.findAll)
router.get('/product/:id', ProductController.findOne)
router.post('/product/', ProductController.create)
router.delete('/product/:id/', ProductController.delete)

module.exports = router;
