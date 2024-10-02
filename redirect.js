document.addEventListener('DOMContentLoaded', () => {
    const optimiseJobTitleBtn = document.getElementById('optimise-job-title');
    const optimiseProfileBtn = document.getElementById('optimise-profile');
    const jobTitleInput = document.getElementById('job-title');
  
    // Action for "Optimise Profile Based on Job Title"
    optimiseJobTitleBtn.addEventListener('click', () => {
      const jobTitle = jobTitleInput.value;
      if (jobTitle) {
        // You can handle this with a redirection or fetch based on the job title
        alert(`Optimising profile for the job title: ${jobTitle}`);
        // Example: redirect or call backend for profile optimization
      } else {
        alert('Please enter your targeted job title');
      }
    });
  
    // Action for "Optimise Profile"
    optimiseProfileBtn.addEventListener('click', () => {
      // Redirect to profile optimization flow without job title
      alert('Optimising profile without a job title');
      // Example: redirect or call backend for profile optimization
    });
  });
  