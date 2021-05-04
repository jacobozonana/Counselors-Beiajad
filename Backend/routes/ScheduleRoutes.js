const express = require('express');
const router = express.Router();

const { ScheduleController } = require('../controllers');
const { ScheduleValidator } = require('../validators');
const { verifyToken } = require('../middlewares/VerifyToken');

router.get('/schedules/:id/', verifyToken, ScheduleController.findAll)
router.get('/schedulesbydoctor/:id/:id2', verifyToken, ScheduleController.findAllDatesByDoctor)
router.get('/schedulesbyuser/:id/:id2', verifyToken, ScheduleController.findAllDatesByUser)
router.get('/schedule/:id', verifyToken, ScheduleController.findOne)
router.post('/schedule/:id', verifyToken, ScheduleValidator.create, ScheduleController.create)
router.post('/scheduleblock/:id', verifyToken, ScheduleValidator.create, ScheduleController.createb)
router.patch('/schedule/:id/:id2', verifyToken, ScheduleValidator.change, ScheduleController.change)
router.delete('/schedule/:id/:id2', verifyToken, ScheduleController.delete)

module.exports = router;
