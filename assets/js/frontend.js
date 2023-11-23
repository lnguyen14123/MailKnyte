// frontend.js



document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
  
    form.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const textareaContent = document.getElementById('demo-message').value;
  
      // Make a POST request to the backend
      fetch('http://localhost:3000/api/scan-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: textareaContent,
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Response from backend:', data);
          // Handle the response, update UI, etc.
        })
        .catch(error => {
          console.error('Error:', error);
          // Handle errors gracefully
        });
    });
  });
  