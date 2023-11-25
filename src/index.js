

console.log('Server is starting...');

const express = require('express');
const cors = require('cors');
const config = require('/Users/lucnguyen/Documents/VSCode/BlueHacks/config.js');

// API endpoint
const apiUrl = 'http://127.0.0.1:5000/predict';

const axios = require('axios');


const app = express();
const PORT = process.env.PORT || 3000;

const virusTotalApiKey = config.apiKey;
const virusTotalApiUrl = 'https://www.virustotal.com/vtapi/v2/url/report';


// index.js

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


// URL to be scanned
app.post('/api/scan-url', (req, res) => {
  const urlContent = req.body.content; // Assuming your JSON payload has a 'content' property

  console.log(urlContent)

  const urlToScan = urlContent;

  // Construct the API request URL
  const requestUrl = `${virusTotalApiUrl}?apikey=${virusTotalApiKey}&resource=${urlToScan}`;
  
  // Make the API request using the fetch function
  fetch(requestUrl)
    .then(response => response.json())
    .then(data => {
      // Handle the response data
      console.log(data);
  
      // Check the scan results in data.scans
      if (data.response_code === 1) {
        // URL has been scanned, and you can check scan results in data.scans
        res.json(data.scans);

      } else {
        // URL not found or not yet scanned
        console.log('URL not found or not yet scanned');
        res.json(0);

      }
    })
    .catch(error => {
      console.error('Error:', error);
      res.json(-1);

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

