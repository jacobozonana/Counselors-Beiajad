const express = require('express');
const router = express.Router();

const { CartItemController } = require('../controllers');
// const { CartItemValidator } = require('../validators');
// const { verifyToken } = require('../middlewares/VerifyToken');

router.get('/cartitems/', CartItemController.findAll)
router.get('/cartitem/:id', CartItemController.findOne)
router.post('/cartitem/',  CartItemController.create)
router.delete('/cartitem/:id2', CartItemController.delete)

module.exports = router;
