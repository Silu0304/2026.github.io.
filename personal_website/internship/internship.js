//汉堡菜单
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.querySelector('.nav-links');
menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// 点击左右按钮切换图片，两组独立轮播
const boxes = document.querySelectorAll('.image-box');
boxes.forEach(box => {
    const track = box.querySelector('.slider-track');
    const prevBtn = box.querySelector('.prev');
    const nextBtn = box.querySelector('.next');
    let currentIndex = 0;
    const totalSlides = 2;

    function updateSlide() {
        // 轨道宽为两张图，切换时移动轨道的一半，即一个视口宽度。
        if(currentIndex === 0){
            track.style.transform = `translateX(0%)`;
        }else{
            track.style.transform = `translateX(-50%)`;
        }
    }

    prevBtn.addEventListener('click', ()=>{
        currentIndex = currentIndex - 1;
        if(currentIndex < 0) currentIndex = totalSlides -1;
        updateSlide();
    })

    nextBtn.addEventListener('click', ()=>{
        currentIndex = currentIndex + 1;
        if(currentIndex >= totalSlides) currentIndex = 0;
        updateSlide();
    })
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