const express = require("express");
const {
  getCompaniesInfoForUserDashboard,
  logCommunication,
} = require("../controllers/user");

const router = express.Router();

router.get("/dashboard", getCompaniesInfoForUserDashboard);
router.post("/log-communication/:companyId", logCommunication);

module.exports = router;
