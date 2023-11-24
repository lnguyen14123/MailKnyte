// frontend.js



document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const textareaContent = document.getElementById('demo-message').value;

        emailContent = textareaContent.trim().replace(/\s+$/, '');

        if (emailContent == "") {

            alert('Warning: Invalid email contents!');


        } else {
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

                    const predictions = data.predictions;
                    const probabilities = data.probabilities;

                    var resultsSection = document.getElementById("first");
                    resultsSection.scrollIntoView({ behavior: 'smooth' });

                    var dangerRes = document.getElementById("danger-res");
                    var safeRes = document.getElementById("safe-res");
                    var conRes = document.getElementById("con-res");
                    
                    var percentDanger = (probabilities[0][0]) * 100;
                    var percentSafe = (probabilities[0][1]) * 100;

                    console.log(data)
                    
                    dangerRes.innerHTML = "MailBuddy says that this email has a " + percentDanger +" % chance of being potentially dangerous!";
                    safeRes.innerHTML = "MailBuddy says that this email has a " + percentSafe + "% chance of being safe!";


                    if (predictions.includes('Phishing Email')) {
                        // Display a warning or take appropriate action
                        conRes.innerHTML = "MailBuddy thinks this email is suspicious or dangerous. Be careful!";

                    } else {
                        // Display a success message or other appropriate action
                        conRes.innerHTML = "MailBuddy thinks this email is safe. If you recognize the sender, its all ok!";

                    }


                })
                .catch(error => {
                    console.error('Error:', error);
                    // Handle errors gracefully
                });

        }


    });
});
