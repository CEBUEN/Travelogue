document.addEventListener("DOMContentLoaded", () => {
    const planNewTripButton = document.getElementById("plan-new-trip");
    const logoutButton = document.getElementById("logout-button");

    if (planNewTripButton) {
        planNewTripButton.addEventListener("click", () => {
            window.location.href = "PlanTrip.html"; // Redirects to the PlanTrip page
        });
    }
    /* if (planNewTripButton) {
        planNewTripButton.addEventListener("click", () => {
            window.location.href = "PlanTrip.html"; // Redirects to the PlanTrip page
        });
    } */

    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            window.location.href = "index.html"; // Redirects to the index.html page
        });
    }
});
