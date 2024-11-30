const express = require("express");
const { tasksOverDueAndDueToday } = require("../controllers/notifications");

const router = express.Router();

router.get("/getAll", tasksOverDueAndDueToday);

module.exports = router;
