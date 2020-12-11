const express = require('express');
const router = express.Router();

const { ScheduleController } = require('../controllers');
const { ScheduleValidator } = require('../validators')
const { verifyToken } = require('../middlewares')

router.get('/schedules/:id', verifyToken, ScheduleController.findAll)
router.get('/schedule/:id', verifyToken, ScheduleController.findOne)
router.post('/schedule', verifyToken, ScheduleValidator.create, ScheduleController.create)
router.patch('/schedule/:id', verifyToken, ScheduleValidator.change, ScheduleController.change)
router.delete('/schedule/:id', verifyToken, ScheduleController.delete)

module.exports = router;
