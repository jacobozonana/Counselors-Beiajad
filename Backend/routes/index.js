const express = require("express");
const router = express.Router();

router.use(require("./UserRoutes"));
router.use(require("./AuthRoutes"));
router.use(require("./ScheduleRoutes"));
router.use(require("./CommentRoutes"));
router.use(require("./ReportRoutes"));
router.use(require("./PayRoutes"));
router.use(require("./FileRoutes"));
router.use(require("./ContactRoutes"));
router.use(require("./ProductRoutes"));
router.use(require("./CartItemRoutes"));

module.exports = router;
