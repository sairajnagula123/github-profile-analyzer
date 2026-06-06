const axios = require("axios");

const fetchGithubProfile = async (username) => {
  const response = await axios.get(
    `https://api.github.com/users/${username}`,
    {
      headers: {
        "User-Agent": "github-profile-analyzer"
      }
    }
  );

  return response.data;
};

module.exports = {
  fetchGithubProfile
};