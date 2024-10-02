// Import Firebase modules using the modular syntax
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA76x0hUgF1XfR6y3JQd9jjpwfvfP5nPxY",
    authDomain: "linkedin-profile-optimizer.firebaseapp.com",
    projectId: "linkedin-profile-optimizer",
    storageBucket: "linkedin-profile-optimizer.appspot.com",
    messagingSenderId: "710294928001",
    appId: "1:710294928001:web:c1bc0a201f91a00d166b80",
    measurementId: "G-51S5X3WCGN"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Google Sign-In
    const googleSignInBtn = document.getElementById('google');

    if (googleSignInBtn) {
        googleSignInBtn.addEventListener('click', () => {
            const provider = new GoogleAuthProvider();
            signInWithPopup(auth, provider)
                .then((result) => {
                    const user = result.user;
                    console.log('Google Sign-In successful:', user);
                    alert(`Welcome, ${user.displayName}!`);
                    // Redirect or update the UI based on successful login
                })
                .catch((error) => {
                    console.error('Error during Google Sign-In:', error);
                    alert('Error during Google Sign-In');
                });
        });
    }
});
