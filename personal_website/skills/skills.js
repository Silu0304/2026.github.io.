/* ==========================================
   Mobile Menu
========================================== */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

/* ==========================================
   Scroll Reveal
========================================== */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {
    threshold: 0.15
});

revealElements.forEach(el => revealObserver.observe(el));

/* ==========================================
   Apple Style 3D Orb
========================================== */

const orb = document.getElementById("skillOrb");

if (orb) {

    document.addEventListener("mousemove", (e) => {

        const rect = orb.getBoundingClientRect();

        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

        orb.style.transform =
            `rotateY(${x * 18}deg) rotateX(${-y * 18}deg)`;

    });

    document.addEventListener("mouseleave", () => {

        orb.style.transform =
            "rotateY(0deg) rotateX(0deg)";

    });

}

/* ==========================================
   Orbit Animation（七个技能卫星）
========================================== */

const orbitNames = [
    ".orbit1",
    ".orbit2",
    ".orbit3",
    ".orbit4",
    ".orbit5",
    ".orbit6",
    ".orbit7"
];

const getOrbitRadius = () => {
    if (window.innerWidth <= 400) return 105;
    if (window.innerWidth <= 600) return 122;
    if (window.innerWidth <= 768) return 165;
    if (window.innerWidth <= 1100) return 178;
    return 190;
};

let orbitRadius = getOrbitRadius();
window.addEventListener("resize", () => {
    orbitRadius = getOrbitRadius();
});

orbitNames.forEach((selector, index) => {

    const orbit = document.querySelector(selector);

    if (!orbit) return;

    let angle = index * (360 / orbitNames.length);

    function animate() {

        angle += 0.08;

        const rad = angle * Math.PI / 180;

        orbit.style.transform =
            `translate(${Math.cos(rad) * orbitRadius}px,
                       ${Math.sin(rad) * orbitRadius}px)`;

        requestAnimationFrame(animate);

    }

    animate();

});

/* ==========================================
   Glass Card Tilt
========================================== */

const cards = document.querySelectorAll(".tilt-card");

cards.forEach(card => {

    const glow = card.querySelector(".card-glow");

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = (x / rect.width - 0.5) * 16;
        const rotateX = (0.5 - y / rect.height) * 16;

        card.style.transform =
            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-10px)`;

        if (glow) {

            glow.style.background =
                `radial-gradient(circle at ${x}px ${y}px,
                rgba(255,255,255,.65),
                rgba(255,255,255,.15) 45%,
                transparent 75%)`;

        }

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(900px) rotateX(0deg) rotateY(0deg)";

        if (glow) glow.style.background = "transparent";

    });

});

/* ==========================================
   Floating Tags Random Motion
========================================== */

const tags = document.querySelectorAll(".skill-tags span");

tags.forEach((tag, index) => {

    tag.style.animationDelay = `${index * 0.25}s`;

});

/* ==========================================
   Timeline Glow
========================================== */

const timelinePoints = document.querySelectorAll(".point");

const timelineObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("active");

        }

    });

}, {
    threshold: 0.4
});

timelinePoints.forEach(point => timelineObserver.observe(point));

/* ==========================================
   Parallax Background
========================================== */

const ribbons = document.querySelector(".floating-ribbons");
const bubbles = document.querySelector(".floating-bubbles");

window.addEventListener("scroll", () => {

    const offset = window.scrollY;

    if (ribbons) {

        ribbons.style.transform =
            `translateY(${offset * 0.12}px)`;

    }

    if (bubbles) {

        bubbles.style.transform =
            `translateY(${offset * 0.08}px)`;

    }

});

/* ==========================================
   Gentle Orb Pulse
========================================== */

if (orb) {

    let grow = true;

    setInterval(() => {

        orb.style.filter =
            grow
                ? "drop-shadow(0 0 35px rgba(255,190,220,.6))"
                : "drop-shadow(0 0 18px rgba(255,190,220,.3))";

        grow = !grow;

    }, 1800);

}
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