const express = require("express");
const {
  addCompany,
  getCompanies,
  editCompany,
  deleteCompany,
} = require("../controllers/admin");

const router = express.Router();

router.get("/companies", getCompanies);
router.post("/add-company", addCompany);
router.put("/companies/:id", editCompany);
router.delete("/companies/:id", deleteCompany);

module.exports = router;
