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

  // Status map to display icons
  const statusMap = {
    "good": "✔",
    "idea": "💡",
    "warning": "⚠",
    "alert": "❗"
  };

  // Function to render the accordion
  function renderAccordion(sectionTitle, data) {
    Object.keys(data).forEach(item => {
      const itemData = data[item];
      const status = itemData.status || 'idea'; // Default status if not available
      const statusIcon = statusMap[status] || '💡'; // Default to "idea" status
      const issue = itemData["Current Problem"];
      const recommendations = itemData.Recommendations || [];

      // Create accordion item
      const accordionItem = document.createElement('div');
      accordionItem.classList.add('accordion-item');

      // Create accordion header
      const accordionHeader = document.createElement('div');
      accordionHeader.classList.add('accordion-header');
      accordionHeader.innerHTML = `
        <span>${item}</span>
        <span class="status ${status}">${statusIcon}</span>
      `;
      accordionItem.appendChild(accordionHeader);

      // Create accordion body
      const accordionBody = document.createElement('div');
      accordionBody.classList.add('accordion-body');
      accordionBody.innerHTML = `
        <p><strong>Current Problem:</strong> ${issue}</p>
        <p><strong>Recommendations:</strong></p>
        <ul>
          ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
        </ul>
      `;
      accordionItem.appendChild(accordionBody);

      // Add click event for accordion functionality
      accordionHeader.addEventListener('click', () => {
        const body = accordionHeader.nextElementSibling;
        body.style.display = body.style.display === 'block' ? 'none' : 'block';
      });

      rawJsonOutput.appendChild(accordionItem);
    });
  }

  // Render sections: "Recommended Changes", "Immediate Action", "Completed"
  const sections = ['Recommended Changes', 'Immediate Action', 'Completed'];
  sections.forEach(sectionName => {
    const sectionData = parsedBody[sectionName];
    if (sectionData) {
      renderAccordion(sectionName, sectionData);
    }
  });
});
