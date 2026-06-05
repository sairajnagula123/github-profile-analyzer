const db = require("../config/db");

const saveProfile = (profileData) => {

  const query = `
  INSERT INTO profiles
  (
    github_id,
    username,
    name,
    bio,
    public_repos,
    followers,
    following,
    profile_url,
    account_created,
    popularity_score,
    repo_follower_ratio
  )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE
    public_repos = VALUES(public_repos),
    followers = VALUES(followers),
    following = VALUES(following),
    popularity_score = VALUES(popularity_score),
    repo_follower_ratio = VALUES(repo_follower_ratio)
  `;

  db.query(query, profileData);
};

const getAllProfiles = (callback) => {
  db.query(
    "SELECT * FROM profiles ORDER BY created_at DESC",
    callback
  );
};

const getProfileById = (id, callback) => {
  db.query(
    "SELECT * FROM profiles WHERE id=?",
    [id],
    callback
  );
};

module.exports = {
  saveProfile,
  getAllProfiles,
  getProfileById
};