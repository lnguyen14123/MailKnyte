// frontend.js



document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('email-form');

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
                    content: emailContent,
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

                    var percentDanger = ((probabilities[0][0]) * 100).toFixed(2);
                    var percentSafe = ((probabilities[0][1]) * 100).toFixed(2);

                    console.log(data)

                    dangerRes.innerHTML = "MailKnyte says that this email has a " + percentDanger + " % chance of being potentially dangerous!";
                    safeRes.innerHTML = "MailKnyte says that this email has a " + percentSafe + "% chance of being safe!";


                    if (predictions.includes('Phishing Email')) {
                        // Display a warning or take appropriate action
                        conRes.innerHTML = "MailKnyte thinks this email is suspicious or dangerous. Be careful!";

                    } else {
                        // Display a success message or other appropriate action
                        conRes.innerHTML = "MailKnyte thinks this email is safe. If you recognize the sender, its all ok!";

                    }


                })
                .catch(error => {
                    console.error('Error:', error);
                    // Handle errors gracefully
                });

        }


    });
});




// frontend.js

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('url-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const textareaContent = document.getElementById('demo-message').value;

        urlContent = textareaContent.trim();

        if (urlContent == "") {
            alert('Warning: Invalid URL contents!');

        } else {

            // Make a POST request to the backend
            fetch('http://localhost:3000/api/scan-url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: urlContent,
                }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data == 0) {
                        alert('Warning: URL not found.');

                    } else if (data == 1) {
                        alert('Error: something happened while scanning :(');

                    } else {

                        var resultsSection = document.getElementById("first");
                        resultsSection.scrollIntoView({ behavior: 'smooth' });

                        var urlTable = document.getElementById("url-results-table")

                        for (const key in data) {
                            if (data.hasOwnProperty(key)) {
                                const value = data[key];
                                const result = value.result

                                console.log(key + ": " + result);

                                var newRow = urlTable.insertRow();

                                // Create cells and add content to them
                                var cell1 = newRow.insertCell(0);
                                var cell2 = newRow.insertCell(1);
                                var cell3 = newRow.insertCell(2);

                                cell1.innerHTML = key;
                                cell2.innerHTML = "yes";
                                cell3.innerHTML = result;

                                if(result == "clean site"){
                                    newRow.style.backgroundColor = "rgb(135, 232, 160)";

                                } else if(result == "malicious site"){
                                    newRow.style.backgroundColor = "rgb(232, 135, 135)";

                                } else if(result == "suspicious site"){
                                    newRow.style.backgroundColor = "rgb(232, 214, 135)";

                                } else {
                                    newRow.style.backgroundColor = "rgb(256, 256, 256)";

                                }
                            }
                        }
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    // Handle errors gracefully
                });

        }
    });
});
