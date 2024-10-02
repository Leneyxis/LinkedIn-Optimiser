// Import Firebase modules using the modular syntax (v10.13.0)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

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

    // Handle Email/Password Sign-Up
    const signUpForm = document.getElementById('signup-form');
    if (signUpForm) {
        signUpForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent the form from submitting normally

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Use Firebase's createUserWithEmailAndPassword method for email/password sign-up
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log('Email/Password Sign-Up successful:', user);
                    alert(`Account created successfully for ${user.email}`);
                    // Redirect to profile.html
                    window.location.href = 'profile.html';
                })
                .catch((error) => {
                    console.error('Error during Email Sign-Up:', error);
                    alert('Error during Email Sign-Up. Please try again.');
                });
        });
    }

    // Handle Google Sign-In
    const googleSignInBtn = document.getElementById('google');
    if (googleSignInBtn) {
        googleSignInBtn.addEventListener('click', () => {
            const provider = new GoogleAuthProvider();
            signInWithPopup(auth, provider)
                .then((result) => {
                    const user = result.user;
                    console.log('Google Sign-In successful:', user);
                    alert(`Welcome, ${user.displayName}!`);
                    // Redirect to profile.html
                    window.location.href = 'profile.html';
                })
                .catch((error) => {
                    console.error('Google Sign-In Error:', error);
                    alert('Error during Google Sign-In');
                });
        });
    }
});
