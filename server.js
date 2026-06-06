require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/check-token", (req, res) => {
  res.json({
    tokenExists: !!process.env.GITHUB_TOKEN
  });
});

app.use("/api", require("./routes/githubRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});