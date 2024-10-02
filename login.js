// Import Firebase modules using the modular syntax (v10.13.0)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

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
    // Handle Email/Password Login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent the form from submitting normally

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Use Firebase's signInWithEmailAndPassword method for email/password login
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log('Email/Password Login successful:', user);
                    alert(`Welcome back, ${user.email}!`);
                    // You can redirect the user to a dashboard or update the UI accordingly
                })
                .catch((error) => {
                    console.error('Email/Password Login Error:', error);
                    alert('Error during Email/Password Login. Please check your credentials.');
                });
        });
    }

    // Handle Google Sign-In
    const googleSignInBtn = document.getElementById('google-signin-btn');
    if (googleSignInBtn) {
        googleSignInBtn.addEventListener('click', () => {
            const provider = new GoogleAuthProvider();
            signInWithPopup(auth, provider)
                .then((result) => {
                    const user = result.user;
                    console.log('Google Sign-In successful:', user);
                    alert(`Welcome, ${user.displayName}!`);
                    // You can redirect the user to a dashboard or update the UI accordingly
                })
                .catch((error) => {
                    console.error('Google Sign-In Error:', error);
                    alert('Error during Google Sign-In.');
                });
        });
    }

    // Handle redirect to sign-up (index.html)
    const signUpLink = document.querySelector('.signup-text a');
    if (signUpLink) {
        signUpLink.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent the default behavior
            window.location.href = 'index.html'; // Redirect to sign-up page
        });
    }
});
