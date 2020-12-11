const express = require('express');
const router = express.Router();

const { ImageController } = require('../controllers');
const { ImageValidator } = require('../validators')
const { verifyToken } = require('../middlewares/index')
const { multerUploads } = require('../middlewares/multer')

router.get('/image', verifyToken, ImageController.findAll)
router.get('/image/:id', verifyToken, ImageController.findOne)
router.post('/upload', multerUploads, ImageController.create)
router.patch('/image/:id', verifyToken, ImageValidator.change, ImageController.change)
router.delete('/image/:id', verifyToken, ImageController.delete)

module.exports = router;

//falts verifytoken en el post , ImageValidator.create