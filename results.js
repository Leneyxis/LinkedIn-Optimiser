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
      } catch (e) {
        console.error("Error parsing JSON body:", e);
      }
    }

    // Display the formatted JSON output
    rawJsonOutput.textContent = JSON.stringify(parsedApiResponse, null, 2);
  }
});
