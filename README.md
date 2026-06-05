# GitHub Profile Analyzer API

A Node.js + Express + MySQL backend service that analyzes GitHub user profiles using the GitHub Public API and stores insights in a MySQL database.

## Features

- Fetch GitHub profile by username
- Store profile insights in MySQL
- Calculate popularity score
- Calculate repository-to-follower ratio
- Get all analyzed profiles
- Get a single analyzed profile

## Tech Stack

- Node.js
- Express.js
- MySQL
- GitHub Public API
- Axios

## Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/github-profile-analyzer.git
cd github-profile-analyzer
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=hello121
DB_NAME=github_analyzer
```

Run the server:

```bash
npm run dev
```

## Database Setup

```sql
CREATE DATABASE github_analyzer;

USE github_analyzer;

CREATE TABLE profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    github_id BIGINT UNIQUE,
    username VARCHAR(100),
    name VARCHAR(255),
    bio TEXT,
    public_repos INT,
    followers INT,
    following INT,
    profile_url VARCHAR(255),
    account_created DATE,
    popularity_score DECIMAL(10,2),
    repo_follower_ratio DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints

### Analyze GitHub Profile

```http
GET /api/github/:username
```

Example:

```http
GET /api/github/torvalds
```

### Get All Profiles

```http
GET /api/profiles
```

### Get Profile By ID

```http
GET /api/profiles/:id
```

## Sample Response

```json
{
  "success": true,
  "username": "torvalds",
  "followers": 305814,
  "publicRepos": 12,
  "popularityScore": 611646,
  "repoFollowerRatio": "0.00"
}
```

## Author

Sairaj
