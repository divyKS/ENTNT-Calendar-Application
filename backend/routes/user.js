const express = require('express');
const { getCompaniesInfoForUserDashboard, logCommunication } = require('../controllers/user');

const router = express.Router();

router.get('/dashboard', getCompaniesInfoForUserDashboard);
router.get('/log-communication', logCommunication);

module.exports = router;
