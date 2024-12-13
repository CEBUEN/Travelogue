document.addEventListener("DOMContentLoaded", () => {
    // Waits for the DOM to fully load before running the script
    const loginForm = document.getElementById("login-form"); // Login form element
    const logoutButton = document.getElementById("logout-button"); // Logout button
    const signupButton = document.getElementById("signup-button"); // Button to open signup modal
    const signupModal = document.getElementById("signup-modal"); // Signup modal window
    const signupForm = document.getElementById("signup-form"); // Signup form element
    const closeSignup = document.getElementById("close-signup"); // Close button for the signup modal
    const board = document.getElementById("board"); // Board element to display user notes

    const showLoginPassword = document.getElementById("show-password"); // Checkbox to toggle login password visibility
    const showSignupPassword = document.getElementById("signup-show-password"); // Checkbox for signup password visibility
    const showConfirmPassword = document.getElementById("confirm-show-password"); // Checkbox for confirmation password visibility

    signupButton.addEventListener("click", () => {
        // Displays the signup modal when the signup button is clicked
        signupModal.style.display = "block";
    
        // Hide the main headers and input boxes
        document.querySelector("header").style.display = "none"; // Hide the header
        document.getElementById("auth-section").style.display = "none"; // Hide the authentication section
    });
    
    closeSignup.addEventListener("click", () => {
        // Hides the signup modal when the close button is clicked
        signupModal.style.display = "none";
    
        // Show the main headers and input boxes
        document.querySelector("header").style.display = "block"; // Show the header
        document.getElementById("auth-section").style.display = "flex"; // Show the authentication section
    });
    

    signupForm.addEventListener("submit", async (event) => {
        // Handles the signup form submission
        event.preventDefault(); // Prevents the default form submission
        const username = document.getElementById("signup-username").value.trim(); // Username input
        const password = document.getElementById("signup-password").value; // Password input
        const confirmPassword = document.getElementById("confirm-password").value; // Confirm password input

        if (password !== confirmPassword) {
            alert("Passwords do not match!"); // Validates matching passwords
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                alert("Account created successfully!");
                signupModal.style.display = "none";
                signupForm.reset();
                toggleSignupPasswordVisibility(false); // Hides password after successful signup
                toggleConfirmPasswordVisibility(false);
            } else {
                const errorData = await response.json();
                alert(`Signup failed: ${errorData.message || "Try another username."}`);
            }
        } catch (error) {
            console.error("Signup Error:", error);
            alert("An error occurred during signup. Please try again later.");
        }
    });

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent default form submission
        const username = document.getElementById("username").value.trim(); // Username input
        const password = document.getElementById("password").value; // Password input
    
        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
    
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token); // Store the JWT token
                window.location.href = "MainMenu.html"; // Redirect to MainMenu.html after login
            } else {
                const errorData = await response.json();
                alert(`Login failed: ${errorData.message || "Check your credentials."}`);
            }
        } catch (error) {
            console.error("Login Error:", error);
            alert("An error occurred during login. Please try again later.");
        }
    });
    

    logoutButton.addEventListener("click", () => {
        // Handles user logout
        localStorage.removeItem("token"); // Removes the JWT token from local storage
        loginForm.style.display = "block";
        logoutButton.style.display = "none";
        board.innerHTML = ""; // Clears the board
    });

    async function loadBoard() {
        // Fetches and displays user notes
        const token = localStorage.getItem("token");
        if (!token) {
            alert("No authentication token found. Please log in.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/board", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const notes = await response.json();
                if (Array.isArray(notes)) {
                    board.innerHTML = notes
                        .map(
                            (note) => `<div class="note">
                                        <h2>${escapeHTML(note.title)}</h2>
                                        <p>${escapeHTML(note.content)}</p>
                                    </div>`
                        )
                        .join("");
                } else {
                    board.innerHTML = "<p>No notes available.</p>";
                }
            } else {
                const errorData = await response.json();
                alert(`Failed to load notes: ${errorData.message || "Please try again later."}`);
            }
        } catch (error) {
            console.error("Load Board Error:", error);
            alert("An error occurred while loading the board. Please try again later.");
        }
    }

    function escapeHTML(str) {
        // Escapes HTML characters to prevent cross-site scripting (XSS)
        const div = document.createElement("div");
        div.textContent = str;
        return div.innerHTML;
    }

    function toggleLoginPasswordVisibility(show) {
        // Toggles password visibility in the login form
        const passwordField = document.getElementById("password");
        passwordField.type = show ? "text" : "password";
    }

    function toggleSignupPasswordVisibility(show) {
        // Toggles password visibility in the signup form
        const signupPasswordField = document.getElementById("signup-password");
        signupPasswordField.type = show ? "text" : "password";
    }

    function toggleConfirmPasswordVisibility(show) {
        // Toggles confirmation password visibility in the signup form
        const confirmPasswordField = document.getElementById("confirm-password");
        confirmPasswordField.type = show ? "text" : "password";
    }

    showLoginPassword.addEventListener("change", (event) => {
        // Toggles login password visibility when checkbox is clicked
        toggleLoginPasswordVisibility(event.target.checked);
    });

    showSignupPassword.addEventListener("change", (event) => {
        // Toggles signup password visibility when checkbox is clicked
        toggleSignupPasswordVisibility(event.target.checked);
    });

    showConfirmPassword.addEventListener("change", (event) => {
        // Toggles confirmation password visibility when checkbox is clicked
        toggleConfirmPasswordVisibility(event.target.checked);
    });

    if (localStorage.getItem("token")) {
        // Automatically loads board if a valid token exists
        loginForm.style.display = "none";
        logoutButton.style.display = "block";
        loadBoard();
    }
});
