const express = require('express');
const router = express.Router();

const { UserController } = require('../controllers');
const { UserValidator } = require('../validators')

router.post('/login', UserController.login)
router.post('/signupuser', UserValidator.create, UserController.signupUser)
router.post('/signupdoctor/:id', UserValidator.create, UserController.signupDoctor)
router.post('/signupadmin/:id', UserValidator.create, UserController.signupAdmin)



module.exports = router;