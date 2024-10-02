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

// Handle Google Sign-In
const googleSignInBtn = document.getElementById('google-signin-btn');
googleSignInBtn.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            console.log('Google Sign-In successful:', user);
            alert(`Welcome, ${user.displayName}!`);
        })
        .catch((error) => {
            console.error('Google Sign-In Error:', error);
            alert('Google Sign-In Error');
        });
});

// Handle Email/Password Sign-In
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form from submitting normally

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('Email/Password Sign-In successful:', user);
            alert(`Welcome back, ${user.email}!`);
        })
        .catch((error) => {
            console.error('Email/Password Sign-In Error:', error);
            alert('Error during Email/Password Sign-In. Please check your credentials.');
        });
});

// Handle Email/Password Sign-Up (Create Account)
const signUpLink = document.querySelector('.signup-text a');
signUpLink.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent navigating away from the page

    const email = prompt("Enter your email to create an account:");
    const password = prompt("Enter your password:");

    if (email && password) {
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('Account created:', user);
                alert(`Account created successfully. Welcome, ${user.email}!`);
            })
            .catch((error) => {
                console.error('Error creating account:', error);
                alert('Error creating account. Please try again.');
            });
    } else {
        alert('Email and password are required to create an account.');
    }
});
