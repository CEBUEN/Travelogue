document.getElementById('back-button').addEventListener('click', () => {
    window.history.back();
});

document.getElementById('trip-form').addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Trip planning started!');
});
