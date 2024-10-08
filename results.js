document.addEventListener('DOMContentLoaded', () => {
  const rawJsonOutput = document.getElementById('raw-json-output');

  // Get the raw JSON response from localStorage
  const apiResponse = localStorage.getItem('apiResponse');
  console.log('Raw API Response from Local Storage:', apiResponse); // Debugging step

  // Check if apiResponse is available
  if (!apiResponse) {
    rawJsonOutput.textContent = 'No data available.';
    console.log('No API response found in localStorage.');
  } else {
    // Parse the outer JSON structure
    let parsedApiResponse;
    try {
      parsedApiResponse = JSON.parse(apiResponse);
      console.log('Parsed API Response:', parsedApiResponse); // Debugging step
    } catch (e) {
      console.error('Error parsing outer JSON:', e);
      rawJsonOutput.textContent = 'Error parsing JSON data.';
      return;
    }

    // Check if the body field exists and parse it again since it is double-encoded
    let parsedBody;
    if (parsedApiResponse.body) {
      try {
        // Log before parsing the body
        console.log('API Response Body (before parsing):', parsedApiResponse.body);

        // Check if the body is a string and parse it
        if (typeof parsedApiResponse.body === 'string') {
          parsedBody = JSON.parse(parsedApiResponse.body); // Parsing the body again
        } else {
          parsedBody = parsedApiResponse.body; // If it's already an object
        }

        console.log('Parsed API Body:', parsedBody); // Debugging step

      } catch (e) {
        console.error('Error parsing inner JSON body:', e);
        rawJsonOutput.textContent = 'Error parsing JSON body data.';
        return;
      }
    }

    // Check if parsedBody is an object or string
    if (typeof parsedBody !== 'object') {
      console.error('Parsed body is not an object:', parsedBody);
      rawJsonOutput.textContent = 'Invalid JSON body structure.';
      return;
    }

    // Log keys to verify the structure
    console.log('Keys in parsedBody:', Object.keys(parsedBody));

    // Clear out any existing content
    rawJsonOutput.innerHTML = '';

    // Function to render each section
    function renderSection(sectionTitle, data) {
      console.log(`Rendering section: ${sectionTitle}`, data); // Debugging step

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
            <strong>Recommendations:</strong>
            <ul>${recommendationList}</ul>
          </div>
        `;

        sectionElement.appendChild(fieldElement);
      });

      rawJsonOutput.appendChild(sectionElement);
    }

    // Render sections using the parsedBody
    const sections = ['Recommended Changes', 'Immediate Action', 'Completed'];

    sections.forEach(sectionName => {
      const sectionData = parsedBody[sectionName];
      if (sectionData) {
        console.log(`Rendering "${sectionName}"`);
        renderSection(sectionName, sectionData);
      } else {
        console.log(`No "${sectionName}" section found.`);
      }
    });
  }
});
