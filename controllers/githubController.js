const { fetchGithubProfile } = require("../services/githubService");

const {
  saveProfile,
  getAllProfiles,
  getProfileById
} = require("../models/profileModel");

const analyzeProfile = async (req, res) => {

  try {

    const username = req.params.username;

    const profile = await fetchGithubProfile(username);

    const popularityScore =
      (profile.followers * 2) +
      (profile.public_repos * 1.5) -
      profile.following;

    const repoFollowerRatio =
      profile.followers > 0
        ? (
            profile.public_repos /
            profile.followers
          ).toFixed(2)
        : profile.public_repos;

    const profileData = [
      profile.id,
      profile.login,
      profile.name,
      profile.bio,
      profile.public_repos,
      profile.followers,
      profile.following,
      profile.html_url,
      profile.created_at.split("T")[0],
      popularityScore,
      repoFollowerRatio
    ];

    saveProfile(profileData);

    res.status(200).json({
      success: true,
      username: profile.login,
      followers: profile.followers,
      publicRepos: profile.public_repos,
      popularityScore,
      repoFollowerRatio
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

const getProfiles = (req, res) => {

  getAllProfiles((err, results) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(results);
  });
};

const getSingleProfile = (req, res) => {

  const id = req.params.id;

  getProfileById(id, (err, results) => {

    if (err) {
      return res.status(500).json(err);
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Profile not found"
      });
    }

    res.json(results[0]);
  });
};

module.exports = {
  analyzeProfile,
  getProfiles,
  getSingleProfile
};