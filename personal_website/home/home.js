/* =========================================================
   HOME.JS
   MOBILE HORIZONTAL DRAG FIX
   PC VERSION PRESERVED
   ========================================================= */


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });

}


document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        if (window.innerWidth <= 768 && navLinks) {

            navLinks.classList.remove("active");

        }

    });

});


/* =========================================================
   DAY / NIGHT THEME
   ========================================================= */

const dayNightToggle =
    document.getElementById("dayNightToggle");


function applyTheme(theme) {

    const isNight = theme === "night";

    document.body.classList.toggle(
        "night-mode",
        isNight
    );

}


/* Load saved theme */

const savedTheme =
    localStorage.getItem("portfolio-theme") || "day";

applyTheme(savedTheme);


/* Toggle */

if (dayNightToggle) {

    dayNightToggle.addEventListener("click", () => {

        const isNight =
            document.body.classList.toggle("night-mode");

        localStorage.setItem(
            "portfolio-theme",
            isNight ? "night" : "day"
        );

    });

}


/* =========================================================
   CREATE NIGHT STARS
   ========================================================= */

const starsContainer =
    document.querySelector(".night-stars");


if (starsContainer) {

    for (let i = 0; i < 42; i++) {

        const star =
            document.createElement("span");

        star.className = "night-star";

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


/* =========================================================
   SAKURA PETALS
   ========================================================= */

const petalsContainer =
    document.querySelector(".petals-container");


if (petalsContainer) {

    function createPetal() {

        const petal =
            document.createElement("div");

        petal.className = "petal";

        petal.style.left =
            Math.random() * 100 + "vw";

        const size =
            Math.random() * 12 + 10;

        petal.style.width =
            size + "px";

        petal.style.height =
            size * 0.8 + "px";

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

        setTimeout(
            createPetal,
            i * 250
        );

    }


    setInterval(
        createPetal,
        650
    );

}


/* =========================================================
   SPARKLE BURST
   ========================================================= */

document
    .querySelectorAll(".char-float")
    .forEach(card => {

        card.addEventListener(
            "mouseenter",
            () => {

                const rect =
                    card.getBoundingClientRect();


                for (let i = 0; i < 10; i++) {

                    const s =
                        document.createElement("div");

                    s.className =
                        "sparkle";


                    s.style.left =
                        rect.left +
                        rect.width / 2 +
                        "px";

                    s.style.top =
                        rect.top +
                        rect.height / 2 +
                        "px";


                    const angle =
                        Math.random() *
                        Math.PI *
                        2;

                    const distance =
                        25 +
                        Math.random() * 35;


                    s.style.setProperty(
                        "--dx",
                        Math.cos(angle) *
                        distance +
                        "px"
                    );

                    s.style.setProperty(
                        "--dy",
                        Math.sin(angle) *
                        distance +
                        "px"
                    );


                    document.body.appendChild(s);


                    setTimeout(() => {

                        s.remove();

                    }, 650);

                }

            }
        );

    });


/* =========================================================
   CURSOR GLOW
   PC ONLY
   ========================================================= */

const cursorGlow =
    document.querySelector(".cursor-glow");


if (cursorGlow) {

    document.addEventListener(
        "mousemove",
        event => {

            if (window.innerWidth <= 768) {
                return;
            }

            cursorGlow.style.left =
                event.clientX + "px";

            cursorGlow.style.top =
                event.clientY + "px";

        }
    );

}


/* =========================================================
   =========================================================
   MOBILE HORIZONTAL DRAG
   =========================================================
   
   THIS IS THE IMPORTANT FIX.

   The entire hero canvas can now be dragged
   horizontally from ANYWHERE on the picture.

   Background + characters + rug
   move together because the PAGE itself scrolls.

   PC IS NOT TOUCHED.
   ========================================================= */


/*
   We only activate this system on mobile.

   <= 768px
*/

function enableMobileHorizontalDrag() {

    if (window.innerWidth > 768) {
        return;
    }


    const hero =
        document.querySelector(".hero");


    if (!hero) {
        return;
    }


    let startX = 0;
    let startScrollLeft = 0;

    let dragging = false;


    /* -----------------------------------------------------
       TOUCH START
       ----------------------------------------------------- */

    hero.addEventListener(
        "touchstart",
        event => {

            if (window.innerWidth > 768) {
                return;
            }


            if (!event.touches.length) {
                return;
            }


            startX =
                event.touches[0].clientX;


            startScrollLeft =
                window.scrollX;


            dragging = true;

        },
        {
            passive: true
        }
    );


    /* -----------------------------------------------------
       TOUCH MOVE
       ----------------------------------------------------- */

    hero.addEventListener(
        "touchmove",
        event => {

            if (!dragging) {
                return;
            }


            if (window.innerWidth > 768) {
                return;
            }


            if (!event.touches.length) {
                return;
            }


            const currentX =
                event.touches[0].clientX;


            const deltaX =
                currentX - startX;


            /*
               Finger moves right
               -> page moves left

               Finger moves left
               -> page moves right
            */

            window.scrollTo(
                startScrollLeft - deltaX,
                0
            );


            /*
               Prevent the browser from interpreting
               this as another gesture.
            */

            event.preventDefault();

        },
        {
            passive: false
        }
    );


    /* -----------------------------------------------------
       TOUCH END
       ----------------------------------------------------- */

    hero.addEventListener(
        "touchend",
        () => {

            dragging = false;

        },
        {
            passive: true
        }
    );


    hero.addEventListener(
        "touchcancel",
        () => {

            dragging = false;

        },
        {
            passive: true
        }
    );

}


/* =========================================================
   START MOBILE DRAG
   ========================================================= */

if (window.innerWidth <= 768) {

    enableMobileHorizontalDrag();

}


/* =========================================================
   HANDLE SCREEN ROTATION / RESIZE
   ========================================================= */

window.addEventListener(
    "resize",
    () => {

        /*
           Reload the page only when crossing
           the desktop/mobile breakpoint.

           This prevents duplicate touch listeners.
        */

        const isMobile =
            window.innerWidth <= 768;

        const wasMobile =
            document.body.dataset.mobileMode === "true";


        if (isMobile && !wasMobile) {

            document.body.dataset.mobileMode =
                "true";

            window.location.reload();

        }


        if (!isMobile && wasMobile) {

            document.body.dataset.mobileMode =
                "false";

            window.location.reload();

        }

    }
);


/* Store initial mode */

document.body.dataset.mobileMode =
    window.innerWidth <= 768
        ? "true"
        : "false";