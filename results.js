document.addEventListener('DOMContentLoaded', () => {
  const rawJsonOutput = document.getElementById('raw-json-output');

  // Get the raw JSON response from localStorage
  const apiResponse = localStorage.getItem('apiResponse');

  // Check if apiResponse is available
  if (!apiResponse) {
    rawJsonOutput.textContent = 'No data available.';
  } else {
    // Parse the escaped JSON
    let parsedApiResponse = JSON.parse(apiResponse);

    // Further parse the body if it contains escaped characters
    if (parsedApiResponse.body) {
      try {
        parsedApiResponse = JSON.parse(parsedApiResponse.body);
        console.log(parsedApiResponse);
      } catch (e) {
        console.error("Error parsing JSON body:", e);
      }
    }

    // Clear out the default JSON display
    rawJsonOutput.innerHTML = '';

    // Function to render each section (Recommended Changes, Immediate Action, Completed)
    function renderSection(sectionTitle, data) {
      const sectionElement = document.createElement('div');
      sectionElement.classList.add('profile-section');
      sectionElement.innerHTML = `
        <h3>${sectionTitle}</h3>
      `;

      // Loop through each field in the section
      Object.keys(data).forEach(field => {
        const fieldData = data[field];
        const issue = fieldData["Current Problem"]; // Access the "Current Problem" field
        const recommendations = fieldData.Recommendations || []; // Access the "Recommendations" field

        // Create a list of recommendations
        let recommendationList = recommendations.map(rec => `<li>${rec}</li>`).join('');

        const fieldElement = document.createElement('div');
        fieldElement.classList.add('section-item');
        fieldElement.innerHTML = `
          <div class="section-item">
            <h4>${field}</h4>
            <p><strong>Current Problem:</strong> ${issue}</p>
            <ul><strong>Recommendations:</strong> ${recommendationList}</ul>
          </div>
        `;

        sectionElement.appendChild(fieldElement);
      });

      rawJsonOutput.appendChild(sectionElement);
    }

    // Render "Recommended Changes" section
    if (parsedApiResponse['Recommended Changes']) {
      renderSection('Recommended Changes', parsedApiResponse['Recommended Changes']);
    }

    // Render "Immediate Action" section
    if (parsedApiResponse['Immediate Action']) {
      renderSection('Immediate Action', parsedApiResponse['Immediate Action']);
    }

    // Render "Completed" section
    if (parsedApiResponse['Completed']) {
      renderSection('Completed', parsedApiResponse['Completed']);
    }
  }
});
