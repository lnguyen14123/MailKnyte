

console.log('Server is starting...');

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Define routes and functionality here

app.use(express.json()); // Add this line to parse JSON requests


// Example route for handling the /api/scan-email endpoint
app.post('/api/scan-email', (req, res) => {
  const emailContent = req.body.content; // Assuming your JSON payload has a 'content' property

  console.log(emailContent)

  // Process the emailContent and send a response
  res.json({ status: 'success', message: 'Email scanned successfully' });
});

app.get('/test', (req, res) => {
  res.send('Backend is up and running!');
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

