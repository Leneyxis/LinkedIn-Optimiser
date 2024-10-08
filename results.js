document.addEventListener('DOMContentLoaded', () => {
  const rawJsonOutput = document.getElementById('raw-json-output');

  // Get the raw JSON response from localStorage
  const apiResponse = localStorage.getItem('apiResponse');
  console.log('Raw API Response:', apiResponse); // Debugging step

  // Check if apiResponse is available
  if (!apiResponse) {
    rawJsonOutput.textContent = 'No data available.';
  } else {
    // Parse the JSON
    let parsedApiResponse;
    try {
      parsedApiResponse = JSON.parse(apiResponse);
      console.log('Parsed API Response:', parsedApiResponse); // Debugging step
    } catch (e) {
      console.error('Error parsing JSON:', e);
      rawJsonOutput.textContent = 'Error parsing JSON data.';
      return;
    }

    // Clear out any existing content
    rawJsonOutput.innerHTML = '';

    // Function to render each section
    function renderSection(sectionTitle, data) {
      const sectionElement = document.createElement('div');
      sectionElement.classList.add('profile-section');
      sectionElement.innerHTML = `
        <h3>${sectionTitle}</h3>
      `;

      // Loop through each item in the section
      Object.keys(data).forEach(item => {
        const itemData = data[item];
        const issue = itemData["Current Problem"];
        const recommendations = itemData.Recommendations || [];

        // Create a list of recommendations
        let recommendationList = recommendations.map(rec => `<li>${rec}</li>`).join('');

        const fieldElement = document.createElement('div');
        fieldElement.classList.add('section-item');
        fieldElement.innerHTML = `
          <div class="section-item">
            <h4>${item}</h4>
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
