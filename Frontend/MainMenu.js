document.addEventListener("DOMContentLoaded", () => {
    const planNewTripButton = document.getElementById("plan-new-trip");
    const myTripsButton = document.querySelector(".MyTrips-button");
    const logoutButton = document.getElementById("logout-button");

    if (planNewTripButton) {
        planNewTripButton.addEventListener("click", () => {
            window.location.href = "PlanTrip.html"; // Redirects to the PlanTrip page
        });
    }

    if (myTripsButton) {
        myTripsButton.addEventListener("click", () => {
            window.location.href = "MyTrips.html"; // Redirects to the MyTrips page
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            window.location.href = "index.html"; // Redirects to the index.html page
        });
    }
});
