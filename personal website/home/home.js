const menuBtn = document.getElementById('menuBtn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', ()=>{
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link=>{
    link.addEventListener('click',()=>{
        if(window.innerWidth <=768){
            navLinks.classList.remove('active');
        }
    })
});

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
/* ================= Sakura Petals ================= */

const petalsContainer = document.querySelector(".petals-container");

if (petalsContainer) {

    function createPetal() {

        const petal = document.createElement("div");

        petal.className = "petal";

        petal.style.left = Math.random() * 100 + "vw";

        const size = Math.random() * 12 + 10;

        petal.style.width = size + "px";
        petal.style.height = size * 0.8 + "px";

        petal.style.animationDuration =
            (Math.random() * 6 + 8) + "s," +
            (Math.random() * 2 + 2) + "s";

        petal.style.animationDelay =
            "0s," +
            (Math.random() * 2) + "s";

        petalsContainer.appendChild(petal);

        setTimeout(() => {

            petal.remove();

        }, 15000);
    }

    for (let i = 0; i < 22; i++) {

        setTimeout(createPetal, i * 250);

    }

    setInterval(createPetal, 650);
}
/* ===== Sparkle Burst ===== */

document.querySelectorAll(".char-float").forEach(card => {

    card.addEventListener("mouseenter", (e) => {

        const rect = card.getBoundingClientRect();

        for (let i = 0; i < 10; i++) {

            const s = document.createElement("div");

            s.className = "sparkle";

            s.style.left =
                rect.left + rect.width / 2 + "px";

            s.style.top =
                rect.top + rect.height / 2 + "px";

            const angle = Math.random() * Math.PI * 2;
            const distance = 25 + Math.random() * 35;

            s.style.setProperty(
                "--dx",
                Math.cos(angle) * distance + "px"
            );

            s.style.setProperty(
                "--dy",
                Math.sin(angle) * distance + "px"
            );

            document.body.appendChild(s);

            setTimeout(() => s.remove(), 650);
        }

    });

});