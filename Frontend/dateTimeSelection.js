document.addEventListener("DOMContentLoaded", () => { // Waits for the DOM to fully load before executing the script
    const form = document.getElementById("date-time-form"); // Retrieves the form element with ID "date-time-form"
    const backButton = document.getElementById("back-button"); // Retrieves the "Back" button element with ID "back-button"

    if (form) { // Checks if the form exists on the page
        form.addEventListener("submit", (event) => { // Adds a submit event listener to the form
            event.preventDefault(); // Prevents the default form submission behavior (e.g., page reload)
            // Logic for form submission (e.g., saving selected data or processing inputs)
            alert("Date and time selected successfully!"); // Displays a success message to the user
            // Redirect to the next page (if applicable) can be added here
        });
    } else { // If the form is not found on the page
        console.error("Date and time form not found on the page."); // Logs an error message to the console
    }

    if (backButton) { // Checks if the "Back" button exists on the page
        backButton.addEventListener("click", () => { // Adds a click event listener to the "Back" button
            history.back(); // Navigates the user back to the previous page in their browsing history
        });
    } else { // If the "Back" button is not found on the page
        console.error("Back button not found on the page."); // Logs an error message to the console
    }
});
