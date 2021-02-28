const express = require("express");
const router = express.Router();

router.use(require("./UserRoutes"));
router.use(require("./AuthRoutes"));
router.use(require("./ImageRoutes"));
router.use(require("./ScheduleRoutes"));
router.use(require("./CommentRoutes"));

module.exports = router;
