// Mobile hamburger menu toggle
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when clicking any navigation link (better user experience)
const navItems = document.querySelectorAll('.glass-nav-item');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        // Only close menu on mobile screen
        if(window.innerWidth <= 768){
            navLinks.classList.remove('active');
        }
    })
})

// Close menu automatically if window resizes to desktop size
window.addEventListener('resize', () => {
    if(window.innerWidth > 768){
        navLinks.classList.remove('active');
    }
})
/* =====================================================
   DAY / NIGHT THEME
   ===================================================== */

const dayNightToggle =
    document.getElementById('dayNightToggle');

function applyTheme(theme) {

    const isNight = theme === 'night';

    document.body.classList.toggle(
        'night-mode',
        isNight
    );
}


/* Load saved theme */

const savedTheme =
    localStorage.getItem('portfolio-theme') || 'day';

applyTheme(savedTheme);


/* Toggle */

if (dayNightToggle) {

    dayNightToggle.addEventListener('click', () => {

        const isNight =
            document.body.classList.toggle('night-mode');

        localStorage.setItem(
            'portfolio-theme',
            isNight ? 'night' : 'day'
        );

    });

}

/* =====================================================
   CREATE NIGHT STARS
   ===================================================== */

const starsContainer =
    document.querySelector('.night-stars');

if (starsContainer) {

    for (let i = 0; i < 42; i++) {

        const star =
            document.createElement('span');

        star.className = 'night-star';

        star.style.left =
            `${Math.random() * 100}%`;

        star.style.top =
            `${Math.random() * 100}%`;

        star.style.animationDelay =
            `${Math.random() * 3}s`;

        star.style.animationDuration =
            `${2 + Math.random() * 2.5}s`;

        starsContainer.appendChild(star);
    }

}