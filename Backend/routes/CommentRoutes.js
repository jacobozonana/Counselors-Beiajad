const express = require('express');
const router = express.Router();

const { CommentController } = require('../controllers');
const { CommentValidator } = require('../validators')
const { verifyToken } = require('../middlewares/VerifyToken')

router.get('/comments/:id/', verifyToken, CommentController.findAll)
router.get('/commentsbyauthor/:id/:id2', verifyToken, CommentController.findAllCommentsByAuthor)
router.get('/commentsbyabout/:id/:id2', verifyToken, CommentController.findAllCommentsByAbout)
router.get('/comment/:id', verifyToken, CommentController.findOne)
router.post('/comment/:id', verifyToken, CommentValidator.create, CommentController.create)
router.patch('/comment/:id/:id2', verifyToken, CommentValidator.change, CommentController.change)
router.delete('/comment/:id/:id2', verifyToken, CommentController.delete)

module.exports = router;
