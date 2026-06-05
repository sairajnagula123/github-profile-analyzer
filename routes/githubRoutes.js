const express = require("express");

const router = express.Router();

const {
  analyzeProfile,
  getProfiles,
  getSingleProfile
} = require("../controllers/githubController");

router.get("/github/:username", analyzeProfile);

router.get("/profiles", getProfiles);

router.get("/profiles/:id", getSingleProfile);

module.exports = router;