const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  dataSubmit,
  getAllData,
} = require("./dataController");

const {generatePDF} = require("./pdfController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/submit", dataSubmit);
router.get("/data", getAllData);
router.get("/pdf", generatePDF);
module.exports = router;
