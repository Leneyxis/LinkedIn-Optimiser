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
        parsedBody = JSON.parse(parsedApiResponse.body); // Parsing the body again
        console.log('Parsed API Body:', parsedBody); // Debugging step
      } catch (e) {
        console.error('Error parsing inner JSON body:', e);
        rawJsonOutput.textContent = 'Error parsing JSON body data.';
        return;
      }
    }

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
            <ul><strong>Recommendations:</strong> ${recommendationList}</ul>
          </div>
        `;

        sectionElement.appendChild(fieldElement);
      });

      rawJsonOutput.appendChild(sectionElement);
    }

    // Log the parsedBody before rendering sections
    console.log('Parsed Body before rendering sections:', parsedBody);

    // Render "Recommended Changes" section
    if (parsedBody && parsedBody['Recommended Changes']) {
      console.log('Rendering "Recommended Changes"'); // Debugging step
      renderSection('Recommended Changes', parsedBody['Recommended Changes']);
    } else {
      console.log('No "Recommended Changes" section found.');
    }

    // Render "Immediate Action" section
    if (parsedBody && parsedBody['Immediate Action']) {
      console.log('Rendering "Immediate Action"'); // Debugging step
      renderSection('Immediate Action', parsedBody['Immediate Action']);
    } else {
      console.log('No "Immediate Action" section found.');
    }

    // Render "Completed" section
    if (parsedBody && parsedBody['Completed']) {
      console.log('Rendering "Completed"'); // Debugging step
      renderSection('Completed', parsedBody['Completed']);
    } else {
      console.log('No "Completed" section found.');
    }
  }
});
