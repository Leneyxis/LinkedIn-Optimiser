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
            reader.readAsDataURL(file);  // Read file as a Data URL (Base64)
            reader.onload = () => resolve(reader.result);  // Resolve the Base64 string
            reader.onerror = error => reject(error);  // Reject in case of error
        });
    }

    // Function to send the Base64 image to GPT-4 Vision
    async function sendToGPT4Vision(base64Image) {
        const prompt = `
            System: Consider yourself to be a LinkedIn Profile Optimiser, helping students to create the right profile.
            File: image
            User prompt: With respect to this image, provide me a detailed changes report on the following fields:
            Profile Photo
            Banner
            Headline
            Open To Work
            Location
            Connections
            About
            Experience
            Education
            Skills
            LinkedIn URL
            Featured
            Licenses and Certifications
            Volunteering
            Divide these into Recommended/Good to Have, Complete, Requires Attention.
        `;

        try {
            const response = await fetch('https://api.openai.com/v1/images/generations', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer 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`,  // Replace with your API key
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    image: base64Image,
                    prompt: prompt
                })
            });

            const data = await response.json();
            console.log(data);  // Log the response for debugging
            // Handle the response and display recommendations
            alert('Optimization report received!');
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while processing the screenshot.');
        }
    }

    // Event listener for the "Submit Screenshot" button
    submitBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const file = fileInput.files[0];
        if (file) {
            try {
                const base64Image = await convertFileToBase64(file);  // Convert the image to Base64
                await sendToGPT4Vision(base64Image);  // Send the Base64 image to GPT-4 Vision
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to process the image. Please try again.');
            }
        } else {
            alert('Please select a screenshot before submitting.');
        }
    });
});
