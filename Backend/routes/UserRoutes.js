const express = require('express');
const router = express.Router();

const { UserController } = require('../controllers');
const { UserValidator } = require('../validators')
const { verifyToken } = require('../middlewares/VerifyToken')

router.get('/users/:id', verifyToken,  UserController.findAll)
router.get('/user/:id', verifyToken, UserController.findOne)
router.get('/admins/:id', verifyToken,  UserController.findAllAdmins)
router.get('/doctors/:id', verifyToken, UserController.findAllDoctors)
router.get('/usuarios/:id', verifyToken, UserController.findAllUsers)

router.patch('/editusers/:id/:id2', verifyToken, UserValidator.change, UserController.changeUsers)
router.patch('/editdoctors/:id/:id2', verifyToken, UserValidator.change, UserController.changeDoctors)
router.patch('/editadmins/:id/:id2', verifyToken, UserValidator.change, UserController.changeAdmins)
router.patch('/editpas/:id', verifyToken, UserValidator.change, UserController.changePas)

router.delete('/deleteusers/:id/:id2', verifyToken, UserController.deleteUsers)
router.delete('/deletedoctors/:id/:id2', verifyToken, UserController.deleteDoctors)
router.delete('/deleteadmins/:id/:id2', verifyToken, UserController.deleteAdmins)

module.exports = router;