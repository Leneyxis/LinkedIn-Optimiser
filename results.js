document.addEventListener('DOMContentLoaded', () => {
  const recommendationList = document.getElementById('recommendation-list');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const statusMap = {
    "good": "✔",
    "idea": "💡",
    "warning": "⚠",
    "alert": "❗"
  };

  // Example data from the API response
  const apiResponse = {
    "Recommended Changes": {
      "Profile Photo": {
        "Current Problem": "The profile photo may not be professional or clear.",
        "Recommendations": [
          "Use a high-quality, recent headshot with a neutral background.",
          "Dress in professional attire that reflects the industry."
        ],
        "status": "good"
      },
      "Banner": {
        "Current Problem": "The banner does not effectively represent personal branding or profession.",
        "Recommendations": [
          "Choose a banner that is relevant to your industry or interests.",
          "Ensure the banner is visually appealing and not cluttered."
        ],
        "status": "idea"
      },
      "Headline": {
        "Current Problem": "The headline lacks specificity about the role and expertise.",
        "Recommendations": [
          "Include specific job titles and areas of expertise.",
          "Consider using keywords that recruiters might search for."
        ],
        "status": "warning"
      }
    },
    "Immediate Action": {
      "Open To Work": {
        "Current Problem": "The status is not clearly indicated.",
        "Recommendations": [
          "Ensure to toggle 'Open To Work' to show recruiters you are available.",
          "Specify the types of roles you are seeking."
        ],
        "status": "alert"
      },
      "Location": {
        "Current Problem": "Location is either missing or not accurate.",
        "Recommendations": [
          "Make sure the location is relevant to job searches.",
          "Update the location if there have been any recent changes."
        ],
        "status": "good"
      },
      "Connections": {
        "Current Problem": "The number of connections may be too low.",
        "Recommendations": [
          "Connect with more professionals in your field to increase visibility.",
          "Reach out to former colleagues and classmates to grow your network."
        ],
        "status": "idea"
      }
    }
  };

  // Function to render the cards
  function renderCards(data) {
    recommendationList.innerHTML = ''; // Clear previous cards

    Object.keys(data).forEach(category => {
      const section = data[category];
      Object.keys(section).forEach(item => {
        const itemData = section[item];
        const status = itemData.status || 'idea'; // default status if not available
        const statusIcon = statusMap[status] || '💡'; // default to "idea" status

        // Create the card HTML
        const card = document.createElement('div');
        card.classList.add('recommendation-card');
        card.setAttribute('data-status', status); // Add a data attribute for filtering

        card.innerHTML = `
          <div class="recommendation-icon">
            <img src="${item.toLowerCase().replace(/\s+/g, '-')}-icon.png" alt="${item}">
          </div>
          <div class="recommendation-details">
            <h4>${item}</h4>
            <span class="status ${status}">${statusIcon}</span>
          </div>
        `;

        recommendationList.appendChild(card);
      });
    });
  }

  // Render the cards initially
  renderCards(apiResponse);

  // Filter functionality
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');

      // Highlight active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Show or hide cards based on the filter
      const cards = document.querySelectorAll('.recommendation-card');
      cards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-status') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});
