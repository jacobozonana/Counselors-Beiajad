const express = require('express');
const router = express.Router();

const { UserController } = require('../controllers');
const { UserValidator } = require('../validators')
const { verifyToken } = require('../middlewares/VerifyToken')

router.post('/login', UserController.login)
router.post('/signupuser', UserValidator.create, UserController.signupUser)
router.post('/signupdoctor/:id', verifyToken, UserValidator.create, UserController.signupDoctor)
router.post('/signupadmin/:id', verifyToken, UserValidator.create, UserController.signupAdmin)

module.exports = router;