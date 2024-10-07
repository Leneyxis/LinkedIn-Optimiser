document.addEventListener('DOMContentLoaded', () => {
    // Get elements from the DOM
    const optimiseJobTitleBtn = document.getElementById('optimise-job-title');
    const optimiseProfileBtn = document.getElementById('optimise-profile');
    const instructionsSection = document.getElementById('instructions-section');
    const mainCard = document.querySelector('.card');
    const fileInput = document.getElementById('screenshot-upload');
    const fileNameDisplay = document.getElementById('file-name'); // New element for showing the file name
    const submitBtn = document.getElementById('submit-btn');

    // Function to show instructions and hide the original card
    function showInstructions() {
        mainCard.style.display = 'none'; // Hide the original card
        instructionsSection.style.display = 'block';  // Show the instructions section
    }

    // Event listener for "Optimize Profile Based on Job Title" button
    optimiseJobTitleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showInstructions();  // Show instructions when the button is clicked
    });

    // Event listener for "Optimize Profile" button
    optimiseProfileBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showInstructions();  // Show instructions when the button is clicked
    });

    // Event listener for file upload input to display the file name
    fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];  // Get the first file selected by the user
        if (file) {
            fileNameDisplay.textContent = file.name;  // Display the file name
        } else {
            fileNameDisplay.textContent = 'No file chosen';  // Reset if no file is selected
        }
    });

    // Event listener for the "Submit Screenshot" button
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();

            // Convert the file to base64
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64Image = reader.result.split(',')[1]; // Extract the base64 part of the result

                const requestBody = JSON.stringify({
                    model: "gpt-4o-mini",
                    messages: [
                        {
                            role: "user",
                            content: [
                                { type: "text", text: "What’s in this image?" },
                                {
                                    type: "image_base64",
                                    image_base64: base64Image
                                }
                            ]
                        }
                    ],
                    max_tokens: 300
                });

                fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer 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`  // Replace with your API key
                    },
                    body: requestBody
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    alert(`AI Response: ${data.choices[0].message.content}`);
                })
                .catch(error => console.error('Error:', error));
            };

            reader.onerror = (error) => {
                console.error('Error reading file:', error);
            };
        } else {
            alert('Please select a screenshot before submitting.');
        }
    });
});
