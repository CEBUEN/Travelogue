document.addEventListener("DOMContentLoaded", () => {
    const tripsList = document.getElementById("trips-list");
    const backButton = document.getElementById("back-button");
    const logoutButton = document.getElementById("logout-button");

    // Example: Dynamically populate trips from an array
    const trips = [
        { destination: "Tokyo", startDate: "2024-09-10", endDate: "2024-09-20" },
        { destination: "New York", startDate: "2024-12-01", endDate: "2024-12-07" },
    ];

    trips.forEach((trip) => {
        const tripItem = document.createElement("li");
        tripItem.classList.add("trip-item");

        tripItem.innerHTML = `
            <h3>${trip.destination}</h3>
            <p>Start Date: ${trip.startDate}</p>
            <p>End Date: ${trip.endDate}</p>
            <button class="view-button">View Trip</button>
        `;

        tripsList.appendChild(tripItem);
    });

    // Add event listener for the back button
    if (backButton) {
        backButton.addEventListener("click", () => {
            window.location.href = "MainMenu.html"; // Redirect to the Main Menu page
        });
    }

    // Add event listener for the logout button
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            window.location.href = "index.html"; // Redirect to the index page
        });
    }
});
