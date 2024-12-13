document.addEventListener("DOMContentLoaded", () => { // Waits for the DOM to fully load before executing the script
    const proceedButton = document.getElementById("proceed-to-datetime"); // Gets the "Proceed" button element by its ID
    const backButton = document.getElementById("back-button"); // Gets the "Back" button element by its ID

    if (proceedButton) { // Checks if the "Proceed" button exists on the page
        proceedButton.addEventListener("click", () => { // Adds a click event listener to the "Proceed" button
            window.location.href = "dateTimeSelection.html"; // Redirects the user to the "dateTimeSelection.html" page
        });
    } else { // If the "Proceed" button is not found
        console.error("Proceed button not found on the page."); // Logs an error message to the console
    }

    if (backButton) { // Checks if the "Back" button exists on the page
        backButton.addEventListener("click", () => { // Adds a click event listener to the "Back" button
            history.back(); // Navigates the user to the previous page in their browsing history
        });
    } else { // If the "Back" button is not found
        console.error("Back button not found on the page."); // Logs an error message to the console
    }
});
