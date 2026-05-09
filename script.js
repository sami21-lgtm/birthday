// DOM Element Selectors
const starContainer = document.getElementById('star-container');
const audio = document.getElementById('birthday-audio');
const musicTip = document.querySelector('.music-tip');
const giftTrigger = document.getElementById('gift-box-trigger');
const photoModal = document.getElementById('photo-modal');
const closeModal = document.getElementById('close-btn');
const confettiContainer = document.getElementById('confetti-container');

// 1. Generates the space starfield dynamically (Mobile performance friendly)
function generateStarfield() {
    // মোবাইলে অতিরিক্ত লেগিং এড়াতে তারার সংখ্যা কম বা বেশি নির্ধারণ করা যায়
    const isMobile = window.innerWidth < 480;
    const totalStars = isMobile ? 45 : 80;

    for (let i = 0; i < totalStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        const size = Math.random() > 0.95 ? 3.5 : Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;

        if (size > 3) {
            star.style.boxShadow = '0 0 8px #ffffff';
        }

        star.style.animation = `blink ${Math.random() * 3 + 2}s infinite ease-in-out`;
        starContainer.appendChild(star);
    }
}

// Helper CSS Keyframes for Star Blinking
const styleSheet = document.createElement("style");
styleSheet.innerText = `@keyframes blink { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }`;
document.head.appendChild(styleSheet);

// 2. Play Audio on First Interaction (Mobile Touch Compliant)
function initAudio() {
    if (audio.paused) {
        audio.play().then(() => {
            musicTip.style.transition = 'opacity 0.8s ease';
            musicTip.style.opacity = '0';
            setTimeout(() => musicTip.remove(), 800);
        }).catch((err) => {
            console.log("Autoplay blocked. User touch required.", err);
        });
    }
}
// Both tap and click triggers audio
document.addEventListener('click', initAudio, { once: true });
document.addEventListener('touchstart', initAudio, { once: true });

// 3. Physics-based Confetti Burst Animation (তোড়া ছিটকে ওপরে ওঠার ইফেক্ট)
function burstConfetti() {
    const isMobile = window.innerWidth < 480;
    const totalConfetti = isMobile ? 65 : 120; // মোবাইলে ভালো পারফরম্যান্সের জন্য পার্টিকেল লিমিট
    const colors = ['#ffd700', '#ff4d4d', '#00b4d8', '#00f5d4', '#9b5de5', '#f15bb5'];
    
    const rect = giftTrigger.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top;

    for (let i = 0; i < totalConfetti; i++) {
        const p = document.createElement('div');
        p.classList.add('confetti');
        
        p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        p.style.left = `${startX}px`;
        p.style.top = `${startY}px`;
        
        const width = Math.random() * 6 + 5;
        const height = Math.random() * 10 + 5;
        p.style.width = `${width}px`;
        p.style.height = `${height}px`;

        confettiContainer.appendChild(p);

        // Exploding physics
        const angle = Math.random() * Math.PI - Math.PI; 
        const velocity = Math.random() * (isMobile ? 12 : 18) + (isMobile ? 5 : 8); 
        const xSpeed = Math.cos(angle) * velocity;
        const ySpeed = Math.sin(angle) * velocity; 
        
        let curX = startX;
        let curY = startY;
        let gravity = 0.35;
        let speedY = ySpeed;
        let speedX = xSpeed;
        let opacity = 1;

        function updateParticle() {
            speedY += gravity; 
            curX += speedX;
            curY += speedY;
            opacity -= 0.015; 

            p.style.transform = `translate(${curX - startX}px, ${curY - startY}px) rotate(${curX * 1.5}deg)`;
            p.style.opacity = opacity;

            if (opacity > 0) {
                requestAnimationFrame(updateParticle);
            } else {
                p.remove();
            }
        }
        requestAnimationFrame(updateParticle);
    }
}

// 4. Open Gift Box and Trigger Popup Event
giftTrigger.addEventListener('click', (e) => {
    e.stopPropagation(); 
    initAudio(); 
    
    // তোড়া ছিটকে ওপরে ওঠার অ্যানিমেশন
    burstConfetti();

    // ০.৪ সেকেন্ড পর সুন্দরভাবে ছবিটি পপ-আপ হবে
    setTimeout(() => {
        photoModal.classList.add('open');
    }, 400);
});

// Close Picture Modal
closeModal.addEventListener('click', () => {
    photoModal.classList.remove('open');
});

// Close Modal when clicking outside the image frame
photoModal.addEventListener('click', (e) => {
    if (e.target === photoModal) {
        photoModal.classList.remove('open');
    }
});

// Handle mobile orientation changes or viewport scaling dynamically
window.addEventListener('resize', () => {
    const isMobile = window.innerWidth < 480;
    const scaleValue = isMobile ? 0.48 : (window.innerWidth < 768 ? 0.65 : 1);
    document.querySelector('.scene-container').style.transform = `scale(${scaleValue})`;
});

// Initialize dynamic space environment
window.addEventListener('DOMContentLoaded', generateStarfield);
