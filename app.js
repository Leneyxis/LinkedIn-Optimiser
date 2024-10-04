document.addEventListener('DOMContentLoaded', () => {
    // Get elements from the DOM
    const optimiseJobTitleBtn = document.getElementById('optimise-job-title');
    const optimiseProfileBtn = document.getElementById('optimise-profile');
    const instructionsSection = document.getElementById('instructions-section');
    const mainCard = document.querySelector('.card');
    const fileInput = document.getElementById('screenshot-upload');
    const fileNameDisplay = document.getElementById('file-name');
    const submitBtn = document.getElementById('submit-btn');

    // Function to show instructions and hide the original card
    function showInstructions() {
        mainCard.style.display = 'none';  // Hide the original card
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

    // Function to convert file to Base64 string
    function convertFileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);  // Read file as Data URL (Base64)
            reader.onload = () => resolve(reader.result.split(',')[1]);  // Resolve only the Base64 string
            reader.onerror = error => reject(error);  // Reject in case of error
        });
    }

    // Function to send the image to OpenAI's GPT-4 Vision
    async function sendToGPT4Vision(file) {
        const apiKey = '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';  // Replace with your OpenAI API Key
        const base64Image = await convertFileToBase64(file);

        const payload = {
            model: 'gpt-4o',
            messages: [
                {
                    role: 'user',
                    content: [
                        { type: 'text', text: "What's in this image?" },
                        {
                            type: 'image_url',
                            image_url: `data:image/jpeg;base64,${base64Image}`
                        }
                    ]
                }
            ]
        };

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        };

        try {
            const response = await fetch('https://api.openai.com/v1/completions', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('GPT-4 Vision Response:', data);
                // Handle the response (e.g., display the report to the user)
                alert('Optimization report received!');
            } else {
                const errorData = await response.json();
                console.error('Error from GPT-4 Vision:', errorData);
                alert(`Error: ${errorData.error.message}`);
            }
        } catch (error) {
            console.error('Error sending image to GPT-4 Vision:', error);
            alert('An error occurred while processing the screenshot.');
        }
    }

    // Event listener for the "Submit Screenshot" button
    submitBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const file = fileInput.files[0];  // Get the selected file

        if (file) {
            await sendToGPT4Vision(file);  // Send the file to GPT-4 Vision
        } else {
            alert('Please select a screenshot before submitting.');
        }
    });
});
