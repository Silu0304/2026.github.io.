/* =====================================================
   HOME.JS
   Mobile scene swipe + navigation + theme + effects
   ===================================================== */


/* =====================================================
   MOBILE SCENE PAN STATE
   -----------------------------------------------------
   IMPORTANT:
   The mobile swipe does NOT transform the characters
   independently.

   Instead, it changes one shared CSS variable:
       --mobile-pan-x

   home.css uses this same variable for:
       1. background-position
       2. character-float-wrap

   Therefore the background and characters move together.
   PC is completely untouched.
   ===================================================== */

const hero = document.querySelector('.hero');

let mobilePanX = 0;
let mobilePanStartX = 0;
let mobilePanStartValue = 0;
let mobileDragging = false;

let mobilePanMin = 0;
let mobilePanMax = 0;


/* =====================================================
   CALCULATE MOBILE PAN RANGE
   -----------------------------------------------------
   home-bg.png = 1080 x 605

   The calculation follows CSS background-size: cover
   so the background and character layer stay aligned.
   ===================================================== */

function calculateMobilePanRange() {

    if (!hero) return;

    /* PC should never use this system */
    if (window.innerWidth > 768) {
        mobilePanX = 0;
        mobilePanMin = 0;
        mobilePanMax = 0;

        hero.style.removeProperty('--mobile-pan-x');

        return;
    }

    const viewportWidth = hero.clientWidth;
    const viewportHeight = hero.clientHeight;

    if (!viewportWidth || !viewportHeight) return;

    const imageWidth = 1080;
    const imageHeight = 605;

    /*
       Same "cover" calculation used by CSS.
    */

    const scale = Math.max(
        viewportWidth / imageWidth,
        viewportHeight / imageHeight
    );

    const renderedImageWidth = imageWidth * scale;

    /*
       How much extra image exists outside
       the visible viewport.
    */

    const extraWidth =
        Math.max(
            0,
            renderedImageWidth - viewportWidth
        );

    /*
       Because the background is centered,
       the maximum movement to either side
       is half of the extra width.
    */

    mobilePanMax = extraWidth / 2;

    mobilePanMin = -mobilePanMax;

    /*
       Keep current position inside the new range
       after orientation / resize.
    */

    mobilePanX = Math.max(
        mobilePanMin,
        Math.min(
            mobilePanX,
            mobilePanMax
        )
    );

    applyMobilePan();
}


/* =====================================================
   APPLY SHARED MOBILE PAN
   ===================================================== */

function applyMobilePan() {

    if (!hero) return;

    /*
       Only mobile gets this variable.
       Desktop is completely untouched.
    */

    if (window.innerWidth <= 768) {

        hero.style.setProperty(
            '--mobile-pan-x',
            `${mobilePanX}px`
        );

    } else {

        hero.style.removeProperty(
            '--mobile-pan-x'
        );

    }
}


/* =====================================================
   TOUCH START
   ===================================================== */

function handleMobileTouchStart(event) {

    if (window.innerWidth > 768) return;

    /*
       Only handle a single finger.
    */

    if (
        !event.touches ||
        event.touches.length !== 1
    ) {
        return;
    }

    /*
       Do not interfere with the mobile menu button
       or navigation links.
    */

    const target = event.target;

    if (
        target.closest('.menu-btn') ||
        target.closest('.nav-links') ||
        target.closest('button') ||
        target.closest('.glass-nav-item')
    ) {
        return;
    }

    mobileDragging = true;

    mobilePanStartX =
        event.touches[0].clientX;

    mobilePanStartValue =
        mobilePanX;
}


/* =====================================================
   TOUCH MOVE
   ===================================================== */

function handleMobileTouchMove(event) {

    if (
        window.innerWidth > 768 ||
        !mobileDragging ||
        !event.touches ||
        event.touches.length !== 1
    ) {
        return;
    }

    const currentX =
        event.touches[0].clientX;

    const deltaX =
        currentX - mobilePanStartX;

    /*
       Move background + character scene together.
    */

    let nextValue =
        mobilePanStartValue + deltaX;

    /*
       Clamp movement.
    */

    nextValue =
        Math.max(
            mobilePanMin,
            Math.min(
                nextValue,
                mobilePanMax
            )
        );

    mobilePanX = nextValue;

    applyMobilePan();

    /*
       Prevent browser's native horizontal page movement.
       Vertical page behaviour remains unaffected.
    */

    if (Math.abs(deltaX) > 5) {
        event.preventDefault();
    }
}


/* =====================================================
   TOUCH END
   ===================================================== */

function handleMobileTouchEnd() {

    mobileDragging = false;
}


/* =====================================================
   TOUCH CANCEL
   ===================================================== */

function handleMobileTouchCancel() {

    mobileDragging = false;
}


/* =====================================================
   REGISTER MOBILE SCENE SWIPE
   ===================================================== */

if (hero) {

    hero.addEventListener(
        'touchstart',
        handleMobileTouchStart,
        {
            passive: true
        }
    );

    hero.addEventListener(
        'touchmove',
        handleMobileTouchMove,
        {
            passive: false
        }
    );

    hero.addEventListener(
        'touchend',
        handleMobileTouchEnd,
        {
            passive: true
        }
    );

    hero.addEventListener(
        'touchcancel',
        handleMobileTouchCancel,
        {
            passive: true
        }
    );

    /*
       Initial calculation.
    */

    calculateMobilePanRange();
}


/* =====================================================
   RECALCULATE AFTER RESIZE / ROTATION
   ===================================================== */

window.addEventListener(
    'resize',
    () => {

        calculateMobilePanRange();

    }
);


/* =====================================================
   RECALCULATE AFTER DEVICE ORIENTATION CHANGE
   ===================================================== */

window.addEventListener(
    'orientationchange',
    () => {

        setTimeout(
            calculateMobilePanRange,
            150
        );

    }
);


/* =====================================================
   MOBILE MENU
   ===================================================== */

const menuBtn =
    document.getElementById('menuBtn');

const navLinks =
    document.querySelector('.nav-links');


if (menuBtn && navLinks) {

    menuBtn.addEventListener(
        'click',
        () => {

            navLinks.classList.toggle('active');

        }
    );

}


/* =====================================================
   CLOSE MOBILE MENU AFTER CLICK
   ===================================================== */

document
    .querySelectorAll('.nav-links a')
    .forEach(link => {

        link.addEventListener(
            'click',
            () => {

                if (
                    window.innerWidth <= 768 &&
                    navLinks
                ) {

                    navLinks.classList.remove(
                        'active'
                    );

                }

            }
        );

    });


/* =====================================================
   DAY / NIGHT THEME
   ===================================================== */

const dayNightToggle =
    document.getElementById(
        'dayNightToggle'
    );


function applyTheme(theme) {

    const isNight =
        theme === 'night';

    document.body.classList.toggle(
        'night-mode',
        isNight
    );

}


/* =====================================================
   LOAD SAVED THEME
   ===================================================== */

const savedTheme =
    localStorage.getItem(
        'portfolio-theme'
    ) || 'day';


applyTheme(savedTheme);


/* =====================================================
   TOGGLE DAY / NIGHT
   ===================================================== */

if (dayNightToggle) {

    dayNightToggle.addEventListener(
        'click',
        () => {

            const isNight =
                document.body.classList.toggle(
                    'night-mode'
                );

            localStorage.setItem(
                'portfolio-theme',
                isNight
                    ? 'night'
                    : 'day'
            );

        }
    );

}


/* =====================================================
   CREATE NIGHT STARS
   ===================================================== */

const starsContainer =
    document.querySelector(
        '.night-stars'
    );


if (starsContainer) {

    for (
        let i = 0;
        i < 42;
        i++
    ) {

        const star =
            document.createElement(
                'span'
            );

        star.className =
            'night-star';

        star.style.left =
            `${Math.random() * 100}%`;

        star.style.top =
            `${Math.random() * 100}%`;

        star.style.animationDelay =
            `${Math.random() * 3}s`;

        star.style.animationDuration =
            `${2 + Math.random() * 2.5}s`;

        starsContainer.appendChild(
            star
        );

    }

}


/* =====================================================
   SAKURA PETALS
   ===================================================== */

const petalsContainer =
    document.querySelector(
        '.petals-container'
    );


if (petalsContainer) {

    function createPetal() {

        const petal =
            document.createElement(
                'div'
            );

        petal.className =
            'petal';

        petal.style.left =
            Math.random() * 100 + 'vw';

        const size =
            Math.random() * 12 + 10;

        petal.style.width =
            size + 'px';

        petal.style.height =
            size * 0.8 + 'px';

        petal.style.animationDuration =
            (Math.random() * 6 + 8) +
            's,' +
            (Math.random() * 2 + 2) +
            's';

        petal.style.animationDelay =
            '0s,' +
            (Math.random() * 2) +
            's';

        petalsContainer.appendChild(
            petal
        );

        setTimeout(
            () => {

                petal.remove();

            },
            15000
        );

    }


    /*
       Initial petals
    */

    for (
        let i = 0;
        i < 22;
        i++
    ) {

        setTimeout(
            createPetal,
            i * 250
        );

    }


    /*
       Continuous petals
    */

    setInterval(
        createPetal,
        650
    );

}


/* =====================================================
   SPARKLE BURST
   ===================================================== */

document
    .querySelectorAll('.char-float')
    .forEach(card => {

        card.addEventListener(
            'mouseenter',
            () => {

                const rect =
                    card.getBoundingClientRect();

                for (
                    let i = 0;
                    i < 10;
                    i++
                ) {

                    const sparkle =
                        document.createElement(
                            'div'
                        );

                    sparkle.className =
                        'sparkle';

                    sparkle.style.left =
                        rect.left +
                        rect.width / 2 +
                        'px';

                    sparkle.style.top =
                        rect.top +
                        rect.height / 2 +
                        'px';

                    const angle =
                        Math.random() *
                        Math.PI *
                        2;

                    const distance =
                        25 +
                        Math.random() *
                        35;

                    sparkle.style.setProperty(
                        '--dx',
                        Math.cos(angle) *
                            distance +
                            'px'
                    );

                    sparkle.style.setProperty(
                        '--dy',
                        Math.sin(angle) *
                            distance +
                            'px'
                    );

                    document.body.appendChild(
                        sparkle
                    );

                    setTimeout(
                        () => {

                            sparkle.remove();

                        },
                        650
                    );

                }

            }
        );

    });


/* =====================================================
   CURSOR GLOW
   -----------------------------------------------------
   Desktop only.
   No effect on mobile touch.
   ===================================================== */

const cursorGlow =
    document.querySelector(
        '.cursor-glow'
    );


if (
    cursorGlow &&
    window.matchMedia(
        '(hover: hover) and (pointer: fine)'
    ).matches
) {

    document.addEventListener(
        'mousemove',
        event => {

            cursorGlow.style.left =
                event.clientX + 'px';

            cursorGlow.style.top =
                event.clientY + 'px';

        }
    );

}