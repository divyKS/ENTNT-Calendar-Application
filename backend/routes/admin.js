const express = require('express');
const { addCompany, getCompanies } = require('../controllers/admin');

const router = express.Router();

router.post('/add-company', addCompany);
router.get('/companies', getCompanies);

module.exports = router;
