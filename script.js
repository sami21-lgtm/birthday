// Creates deep starfield background dynamically
function generateStarfield() {
    const starContainer = document.getElementById('star-container');
    const totalStars = 80;

    for (let i = 0; i < totalStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // Set random sizes (mostly small, some medium like the image)
        const size = Math.random() > 0.95 ? 4 : Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // Position stars randomly
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;

        // Add soft glowing style for larger stars
        if (size > 3) {
            star.style.boxShadow = '0 0 8px #ffffff';
        }

        // Random blinking animation timing
        star.style.animation = `blink ${Math.random() * 3 + 2}s infinite ease-in-out`;
        starContainer.appendChild(star);
    }
}

// Add CSS keyframes for blinking dynamically
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes blink {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
}`;
document.head.appendChild(styleSheet);

// Run on load
window.addEventListener('DOMContentLoaded', generateStarfield);
