// Import Firebase modules using the modular syntax
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCLF6CH7NEsjTgyGTdXJKKAZElCpEbgIVw",
    authDomain: "linkedin-profile-optimiser.firebaseapp.com",
    projectId: "linkedin-profile-optimiser",
    storageBucket: "linkedin-profile-optimiser.appspot.com",
    messagingSenderId: "540349529357",
    appId: "1:540349529357:web:f5ded481210d25421d0444",
    measurementId: "G-NYXXT2E568"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Google Sign-In
    const googleSignInBtn = document.getElementById('google-signup');

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
