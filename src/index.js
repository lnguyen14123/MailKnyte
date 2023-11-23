

console.log('Server is starting...');

const express = require('express');
const cors = require('cors');

// API endpoint
const apiUrl = 'http://127.0.0.1:5000/predict';

const axios = require('axios');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Define routes and functionality here

app.use(express.json()); // Add this line to parse JSON requests


// Example route for handling the /api/scan-email endpoint
app.post('/api/scan-email', (req, res) => {
  const emailContent = req.body.content; // Assuming your JSON payload has a 'content' property

  console.log(emailContent)

  // Email data to send in the request
  const emailData = {
    email: emailContent,
  };

  // Make the POST request using Axios
  axios.post(apiUrl, emailData)
    .then(response => {
      console.log('Response:', response.data);
      res.json(response.data);

    })
    .catch(error => {
      console.error('Error:', error);
    });

  // Process the emailContent and send a response
});

app.get('/test', (req, res) => {
  res.send('Backend is up and running!');
});


// Email data to send in the request


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

