const express = require("express");
const { getCalendarCommunications } = require("../controllers/calendar");
const router = express.Router();

router.get("/getCommunications", getCalendarCommunications);

module.exports = router;
