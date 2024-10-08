document.addEventListener('DOMContentLoaded', () => {
  const optimiseJobTitleBtn = document.getElementById('optimise-job-title');
  const optimiseProfileBtn = document.getElementById('optimise-profile');
  const instructionsSection = document.getElementById('instructions-section');
  const mainCard = document.querySelector('.card');
  const fileInput = document.getElementById('screenshot-upload');
  const fileNameDisplay = document.getElementById('file-name');
  const submitBtn = document.getElementById('submit-btn');
  const profileSections = document.getElementById('profile-sections');
  const jobTitleInput = document.getElementById('job-title');  // Job title input
  const loader = document.createElement('div');  // Create loader element
  loader.classList.add('loader');  // Add loader class
  
  // Append loader to the body (hidden by default)
  document.body.appendChild(loader);
  loader.style.display = 'none';  // Hide loader initially

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

  // Event listener for the "Submit Screenshot" button
  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    const file = fileInput.files[0];
    const jobTitle = jobTitleInput.value.trim();  // Get job title input value
    
    if (!jobTitle) {
      alert('Please enter a job title.');
      return;
    }

    if (!file) {
      alert('Please select a screenshot before submitting.');
      return;
    }

    const reader = new FileReader();

    // Convert the file to base64
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result.split(',')[1]; // Extract the base64 part of the result
      
      // Create request body including job title and image
      const requestBody = JSON.stringify({
        position: jobTitle,  // Include job title in API request
        image_base64: base64Image
      });

      // Show loader while processing
      loader.style.display = 'block';

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
        // Save the raw JSON response to localStorage
        localStorage.setItem('apiResponse', JSON.stringify(data));

        // Redirect to results.html
        window.location.href = 'results.html';
      })
      .catch(error => console.error('Error:', error))
      .finally(() => {
        // Hide loader after processing
        loader.style.display = 'none';
      });
    };

    reader.onerror = (error) => {
      console.error('Error reading file:', error);
    };
  });
});
