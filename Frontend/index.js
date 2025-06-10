document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const logoutButton = document.getElementById("logout-button");
    const signupButton = document.getElementById("signup-button");
    const signupModal = document.getElementById("signup-modal");
    const closeSignup = document.getElementById("close-signup");
    const board = document.getElementById("board");
    const showPasswordCheckbox = document.getElementById("show-password");
    const passwordInput = document.getElementById("password");

    // For signup form
    const signupPasswordInput = document.getElementById("signup-password");
    const confirmPasswordInput = document.getElementById("confirm-password");
    const signupShowPasswordCheckbox = document.getElementById("signup-show-password");
    const confirmShowPasswordCheckbox = document.getElementById("confirm-show-password");

    // Reset UI state on load
    loginForm.style.display = "block";
    logoutButton.style.display = "none";
    signupButton.style.display = "block";
    board.style.display = "none";
    signupModal.style.display = "none";

    // Handle "Show Password" for login form
    showPasswordCheckbox.addEventListener("change", () => {
        passwordInput.type = showPasswordCheckbox.checked ? "text" : "password";
    });

    // Handle "Show Password" for signup password
    signupShowPasswordCheckbox.addEventListener("change", () => {
        signupPasswordInput.type = signupShowPasswordCheckbox.checked ? "text" : "password";
    });

    // Handle "Show Password" for confirm password
    confirmShowPasswordCheckbox.addEventListener("change", () => {
        confirmPasswordInput.type = confirmShowPasswordCheckbox.checked ? "text" : "password";
    });

    // Handle "Sign Up" button
    signupButton.addEventListener("click", () => {
        signupModal.style.display = "block"; // Show signup modal
    });

    // Handle "Close" button in the signup modal
    closeSignup.addEventListener("click", () => {
        signupModal.style.display = "none"; // Hide signup modal
    });

    // Handle "Login" form submission
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const username = document.getElementById("username").value.trim();
        const password = passwordInput.value;

        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token); // Save token
                window.location.href = "MainMenu.html"; // Redirect to main menu
            } else {
                alert("Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred during login. Please try again.");
        }
    });

    // Handle "Logout" functionality
    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("token"); // Clear token
        window.location.href = "index.html"; // Redirect to index.html
    });

    // Reset the page to default view when no token is found
    if (!localStorage.getItem("token")) {
        loginForm.style.display = "block"; // Show login form
        logoutButton.style.display = "none"; // Hide logout button
        signupButton.style.display = "block"; // Show sign-up button
        board.style.display = "none"; // Hide board content
        signupModal.style.display = "none"; // Hide signup modal
    }
});
