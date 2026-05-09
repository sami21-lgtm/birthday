// Variable and element selectors
const starContainer = document.getElementById('star-container');
const audio = document.getElementById('birthday-audio');
const musicTip = document.querySelector('.music-tip');

// 1. Creates deep starfield background dynamically
function generateStarfield() {
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

// 2. Play Audio/Voice on the first click (Bypasses Browser Autoplay Restrictions)
document.addEventListener('click', () => {
    if (audio.paused) {
        audio.play().then(() => {
            // Fade out and hide the tap instruction helper
            musicTip.style.transition = 'opacity 0.8s ease';
            musicTip.style.opacity = '0';
            setTimeout(() => musicTip.remove(), 800);
        }).catch((error) => {
            console.log("Audio playback failed:", error);
            // Backup online audio play if local 'audio.mp3' fails
            audio.src = "https://assets.mixkit.co/active_storage/sfx/123/123-200.wav";
            audio.play();
        });
    }
}, { once: true }); // Trigger once on any first tap/click

// Run starfield when page finishes loading
window.addEventListener('DOMContentLoaded', generateStarfield);
