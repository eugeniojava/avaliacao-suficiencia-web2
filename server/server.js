const express = require('express');
const app = express();
const PORT = process.env.port || 3001;

app.get('/api', (request, response) => {
  response.json({ message: 'Hello from server!' });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
