const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

let mediumProblems = [];

async function fetchLeetCodeProblems() {
  try {
    const response = await axios.get('https://leetcode.com/api/problems/all/');
    const allProblems = response.data.stat_status_pairs;
    mediumProblems = allProblems.filter(problem => 
      problem.difficulty.level === 2 && !problem.paid_only
    ).map(problem => ({
      title: problem.stat.question__title,
      slug: problem.stat.question__title_slug
    }));
    console.log(`Fetched ${mediumProblems.length} medium problems`);
  } catch (error) {
    console.error('Error fetching LeetCode problems:', error);
  }
}

// Fetch problems on server start and every 24 hours
fetchLeetCodeProblems();
setInterval(fetchLeetCodeProblems, 24 * 60 * 60 * 1000);

app.get('/api/random-medium-problem', (req, res) => {
  if (mediumProblems.length === 0) {
    res.status(503).json({ error: 'Problems not yet loaded' });
    return;
  }
  const randomProblem = mediumProblems[Math.floor(Math.random() * mediumProblems.length)];
  res.json(randomProblem);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});