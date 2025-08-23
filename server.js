const express = require('express');
const chance = require('chance')
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/unique-id', (_req, res) => {
  const id = chance().guid();
  res.json({ id });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});