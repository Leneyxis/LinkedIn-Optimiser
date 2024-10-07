document.addEventListener('DOMContentLoaded', () => {
  const profileSections = document.getElementById('profile-sections');

  // Get the API response from localStorage
  const apiResponse = localStorage.getItem('apiResponse');

  // Check if apiResponse is retrieved properly
  if (!apiResponse) {
    console.error('No API response found in localStorage.');
    return;
  }

  // Parse the response (if stored as stringified JSON)
  const parsedApiResponse = JSON.parse(apiResponse);
  console.log('Parsed API Response:', parsedApiResponse); // Debugging

  if (!parsedApiResponse) {
    console.error('Parsed API response is invalid.');
    return;
  }

  // Ensure the profile-sections div is visible
  profileSections.style.display = 'block';

  // Helper function to create a section
  function createSection(title, statusClass, issue, recommendations, suggestions) {
    console.log(`Creating section for ${title}`); // Debugging

    const sectionElement = document.createElement('div');
    sectionElement.classList.add('profile-section');

    let recommendationList = recommendations.map(rec => `<li>${rec}</li>`).join('');
    let suggestionList = suggestions.map(sugg => `<li>${sugg}</li>`).join('');

    sectionElement.innerHTML = `
      <div class="section-info">
        <span class="section-title">${title}</span>
        <div class="status-icon ${statusClass}">${getStatusIcon(statusClass)}</div>
      </div>
      <div class="section-details">
        ${issue ? `<p><strong>Current Issue:</strong> ${issue}</p>` : ''}
        ${recommendationList ? `<p><strong>Recommendations:</strong></p><ul>${recommendationList}</ul>` : ''}
        ${suggestionList ? `<p><strong>Suggestions:</strong></p><ul>${suggestionList}</ul>` : ''}
      </div>
    `;

    profileSections.appendChild(sectionElement);
  }

  // Function to get the appropriate status icon
  function getStatusIcon(statusClass) {
    if (statusClass === 'error') return '❌';
    if (statusClass === 'warning') return '⚠️';
    if (statusClass === 'success') return '✔️';
    return '';
  }

  // Display the "Recommended Changes" section
  if (parsedApiResponse['Recommended Changes']) {
    Object.keys(parsedApiResponse['Recommended Changes']).forEach(section => {
      const sectionData = parsedApiResponse['Recommended Changes'][section];
      createSection(
        section,
        'warning',
        sectionData['Current Issue'],
        sectionData['Recommendations'] || [],
        sectionData['Suggestions'] || []
      );
    });
  }

  // Display the "Immediate Action" section
  if (parsedApiResponse['Immediate Action']) {
    Object.keys(parsedApiResponse['Immediate Action']).forEach(section => {
      const sectionData = parsedApiResponse['Immediate Action'][section];
      createSection(
        section,
        'error',
        sectionData['Current Issue'],
        sectionData['Recommendations'] || [],
        sectionData['Suggestions'] || []
      );
    });
  }

  // Display the "Completed" section
  if (parsedApiResponse['Completed']) {
    Object.keys(parsedApiResponse['Completed']).forEach(section => {
      const sectionData = parsedApiResponse['Completed'][section];
      createSection(
        section,
        'success',
        sectionData['Current Issue'] || sectionData['Description'],
        sectionData['Recommendations'] || [],
        sectionData['Suggestions'] || []
      );
    });
  }
});
