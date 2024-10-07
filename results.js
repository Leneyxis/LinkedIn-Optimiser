document.addEventListener('DOMContentLoaded', () => {
  const profileSections = document.getElementById('profile-sections');

  // Get the API response from localStorage
  const apiResponse = JSON.parse(localStorage.getItem('apiResponse'));

  if (!apiResponse) {
    console.error('No API response found.');
    return;
  }

  // Helper function to create a section
  function createSection(title, statusClass, issue, recommendations, suggestions) {
    const sectionElement = document.createElement('div');
    sectionElement.classList.add('profile-section');

    let recommendationList = recommendations.map(rec => `<li>${rec}</li>`).join('');
    let suggestionList = suggestions.map(sugg => `<li>${sugg}</li>`).join('');

    sectionElement.innerHTML = `
      <div class="section-info">
        <span class="section-title">${title}</span>
      </div>
      <div class="status-icon ${statusClass}">⚠️</div>
      <div class="section-details">
        <p><strong>Current Issue:</strong> ${issue}</p>
        <ul><strong>Recommendations:</strong> ${recommendationList}</ul>
        <ul><strong>Suggestions:</strong> ${suggestionList}</ul>
      </div>
    `;

    profileSections.appendChild(sectionElement);
  }

  // Display the "Recommended Changes" section
  if (apiResponse['Recommended Changes']) {
    Object.keys(apiResponse['Recommended Changes']).forEach(section => {
      const sectionData = apiResponse['Recommended Changes'][section];
      createSection(
        section,
        'warning',
        sectionData['Current Issue'],
        sectionData['Recommendations'] || [],
        []
      );
    });
  }

  // Display the "Immediate Action" section
  if (apiResponse['Immediate Action']) {
    Object.keys(apiResponse['Immediate Action']).forEach(section => {
      const sectionData = apiResponse['Immediate Action'][section];
      createSection(
        section,
        'error',
        sectionData['Current Issue'],
        sectionData['Recommendations'] || [],
        []
      );
    });
  }

  // Display the "Completed" section
  if (apiResponse['Completed']) {
    Object.keys(apiResponse['Completed']).forEach(section => {
      const sectionData = apiResponse['Completed'][section];
      createSection(
        section,
        'success',
        sectionData['Current Issue'],
        sectionData['Recommendations'] || [],
        sectionData['Suggestions'] || []
      );
    });
  }
});
