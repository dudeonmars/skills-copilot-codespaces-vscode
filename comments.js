// Create web server
const express = require('express');
const app = express();
const port = 3000;

// Create an array to store comments
let comments = [];

// Middleware
app.use(express.json());

// Get comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Add comments
app.post('/comments', (req, res) => {
  const comment = req.body.comment;
  comments.push(comment);
  res.json(comment);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});