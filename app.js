// Import Firebase modules using the modular syntax
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

// Password validation function
function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
        return `Password must be at least ${minLength} characters long.`;
    }
    if (!hasUpperCase) {
        return "Password must contain at least one uppercase letter.";
    }
    if (!hasLowerCase) {
        return "Password must contain at least one lowercase letter.";
    }
    if (!hasNumbers) {
        return "Password must contain at least one number.";
    }
    if (!hasSpecialChar) {
        return "Password must contain at least one special character.";
    }

    return ""; // No errors, password is valid
}

// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Email and Password Sign-Up
    const signUpForm = document.getElementById('signup-form');
    if (signUpForm) {
        signUpForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent the form from submitting normally

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const validationError = validatePassword(password);
            if (validationError) {
                alert(validationError);
                return;
            }

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log('Email Sign-Up successful:', user);
                    alert(`Account created successfully for ${user.email}`);
                })
                .catch((error) => {
                    console.error('Error during Email Sign-Up:', error);
                    alert('Error during Email Sign-Up. Please try again.');
                });
        });
    }
});
