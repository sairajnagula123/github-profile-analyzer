require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

// Root Route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Check if token exists
app.get("/check-token", (req, res) => {
  res.json({
    tokenExists: !!process.env.GITHUB_TOKEN
  });
});

// Test GitHub token directly
app.get("/github-test", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.github.com/user",
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          "User-Agent": "github-profile-analyzer",
          Accept: "application/vnd.github+json"
        }
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({
      status: err.response?.status,
      data: err.response?.data,
      message: err.message
    });
  }
});

// Existing Routes
app.use("/api", require("./routes/githubRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});