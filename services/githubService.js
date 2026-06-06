const axios = require("axios");

const fetchGithubProfile = async (username) => {
  const response = await axios.get(
    `https://api.github.com/users/${username}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "User-Agent": "github-profile-analyzer"
      }
    }
  );

  return response.data;
};

module.exports = {
  fetchGithubProfile
};