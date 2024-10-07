document.addEventListener('DOMContentLoaded', () => {
  const rawJsonOutput = document.getElementById('raw-json-output');

  // Get the raw JSON response from localStorage
  const apiResponse = localStorage.getItem('apiResponse');

  // Check if apiResponse is available
  if (!apiResponse) {
    rawJsonOutput.textContent = 'No data available.';
  } else {
    // Display the JSON data in a pretty-printed format
    const parsedApiResponse = JSON.parse(apiResponse);
    rawJsonOutput.textContent = JSON.stringify(parsedApiResponse, null, 2); // Pretty-print the JSON
  }
});
