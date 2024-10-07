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
                    image_base64: base64Image
                });

                // Call the LinkedIn Optimiser REST API
                fetch('https://fi96kiqrk7.execute-api.us-west-1.amazonaws.com/default/LinkedIn_Optimiser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: requestBody
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    alert(`API Response: ${JSON.stringify(data)}`);
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
