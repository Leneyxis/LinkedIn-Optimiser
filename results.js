document.addEventListener('DOMContentLoaded', () => {
  const rawJsonOutput = document.getElementById('raw-json-output');

  // Get the raw JSON response from localStorage
  const apiResponse = localStorage.getItem('apiResponse');

  // Check if apiResponse is available
  if (!apiResponse) {
    rawJsonOutput.textContent = 'No data available.';
    return;
  }

  // Parse the API response
  let parsedApiResponse;
  try {
    parsedApiResponse = JSON.parse(apiResponse);
  } catch (e) {
    rawJsonOutput.textContent = 'Error parsing JSON data.';
    return;
  }

  // Parse the body field, handling double-encoded JSON
  let parsedBody;
  if (parsedApiResponse.body) {
    try {
      parsedBody = typeof parsedApiResponse.body === 'string' ? JSON.parse(JSON.parse(parsedApiResponse.body)) : parsedApiResponse.body;
    } catch (e) {
      rawJsonOutput.textContent = 'Error parsing JSON body data.';
      return;
    }
  }

  // Ensure parsedBody is a valid object
  if (typeof parsedBody !== 'object') {
    rawJsonOutput.textContent = 'Invalid JSON body structure.';
    return;
  }

  // Clear out any existing content
  rawJsonOutput.innerHTML = '';

  // Function to render each section
  function renderSection(sectionTitle, data) {
    const sectionElement = document.createElement('div');
    sectionElement.classList.add('profile-section');
    sectionElement.innerHTML = `<h3>${sectionTitle}</h3>`;

    Object.keys(data).forEach(item => {
      const itemData = data[item];
      const issue = itemData["Current Problem"];
      const recommendations = itemData.Recommendations || [];

      const recommendationList = recommendations.map(rec => `<li>${rec}</li>`).join('');
      const fieldElement = document.createElement('div');
      fieldElement.classList.add('section-item');
      fieldElement.innerHTML = `
        <h4>${item}</h4>
        <p><strong>Current Problem:</strong> ${issue}</p>
        <strong>Recommendations:</strong>
        <ul>${recommendationList}</ul>
      `;

      sectionElement.appendChild(fieldElement);
    });

    rawJsonOutput.appendChild(sectionElement);
  }

  // Render sections: "Recommended Changes", "Immediate Action", "Completed"
  const sections = ['Recommended Changes', 'Immediate Action', 'Completed'];
  sections.forEach(sectionName => {
    const sectionData = parsedBody[sectionName];
    if (sectionData) {
      renderSection(sectionName, sectionData);
    }
  });
});
