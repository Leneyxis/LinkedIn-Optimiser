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
        console.log(parsedApiResponse)
      } catch (e) {
        console.error("Error parsing JSON body:", e);
      }
    }

    // Clear out the default JSON display
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
        const issue = itemData.current_issue || itemData.Description;
        const recommendations = itemData.recommendations || itemData.completed || [];
        
        let recommendationList = recommendations.map(rec => `<li>${rec}</li>`).join('');

        const itemElement = document.createElement('div');
        itemElement.innerHTML = `
          <div class="section-item">
            <h4>${item}</h4>
            <p><strong>Issue:</strong> ${issue}</p>
            <ul><strong>Recommendations:</strong> ${recommendationList}</ul>
          </div>
        `;
        
        sectionElement.appendChild(itemElement);
      });
      
      rawJsonOutput.appendChild(sectionElement);
    }

    // Render "Recommended Changes"
    if (parsedApiResponse['Recommended Changes']) {
      renderSection('Recommended Changes', parsedApiResponse['Recommended Changes']);
    }

    // Render "Immediate Action"
    if (parsedApiResponse['Immediate Action']) {
      renderSection('Immediate Action', parsedApiResponse['Immediate Action']);
    }

    // Render "Completed"
    if (parsedApiResponse['Completed']) {
      renderSection('Completed', parsedApiResponse['Completed']);
    }
  }
});
