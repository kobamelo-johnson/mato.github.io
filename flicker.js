// script.js

document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('.logo');
    const flickerInterval = 100; // Interval in milliseconds

    function getRandomGreenColor() {
        // Generate random shades of green
        const intensity = Math.floor(Math.random() * 256);
        return `rgba(0, ${intensity}, 0, 1)`;
    }

    function flicker() {
        const glowColor = getRandomGreenColor();
        logo.style.filter = `drop-shadow(0 0 10px ${glowColor})`;
    }

    // Flicker effect
    setInterval(flicker, flickerInterval);
});
