const express = require('express');
const { getCompaniesInfoForUserDashboard } = require('../controllers/user');

const router = express.Router();

router.get('/dashboard', getCompaniesInfoForUserDashboard);

module.exports = router;
