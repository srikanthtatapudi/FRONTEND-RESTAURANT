document.addEventListener('DOMContentLoaded', () => {

    //POPULAR ITEMS CAROUSEL (SWIPER.JS)
    const swiper = new Swiper('.popular-items-slider', {
        loop: true,
        spaceBetween: 30,
        grabCursor: true,
        autoplay: { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true },
        navigation: { nextEl: '.carousel-arrow.next', prevEl: '.carousel-arrow.prev' },
        breakpoints: {
            576: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            992: { slidesPerView: 3 }
        },
        autoHeight: false, 
        observer: true,
        observeParents: true,
    });

    //VIDEO PLAYER CONTROLS
    const videoWrapper = document.querySelector('.video-wrapper');
    const promoVideo = document.getElementById('promoVideo');
    if (videoWrapper && promoVideo) {
        const toggleVideo = () => { promoVideo.paused ? promoVideo.play() : promoVideo.pause(); };
        videoWrapper.addEventListener('click', toggleVideo);
        promoVideo.addEventListener('play', () => videoWrapper.classList.add('playing'));
        promoVideo.addEventListener('pause', () => videoWrapper.classList.remove('playing'));
        promoVideo.addEventListener('ended', () => videoWrapper.classList.remove('playing'));
    }

    //MODAL FUNCTIONALITY
    const requestModal = document.getElementById('requestModal');
    const requestDishBtn = document.getElementById('requestDishBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    if (requestModal && requestDishBtn && cancelBtn) {
        const openModal = () => {
            requestModal.style.display = 'flex';
            document.body.classList.add('modal-open');
        };
        const closeModal = () => {
            requestModal.style.display = 'none';
            document.body.classList.remove('modal-open');
        };
        requestDishBtn.addEventListener('click', openModal);
        cancelBtn.addEventListener('click', closeModal);
        requestModal.addEventListener('click', (event) => { if (event.target === requestModal) closeModal(); });
        document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModal(); });
    }

    //FORM SUBMISSION HANDLING (CONTACT & MODAL)
    const handleFormSubmit = (formSelector, successMessage) => {
        const form = document.querySelector(formSelector);
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const inputs = form.querySelectorAll('[required]');
                let isValid = true;
                inputs.forEach(input => { if (!input.value.trim()) isValid = false; });
                if (isValid) {
                    alert(successMessage);
                    form.reset();
                    if (form.closest('.modal-overlay')) { form.closest('.modal-overlay').style.display = 'none'; document.body.classList.remove('modal-open'); }
                } else {
                    alert('Please fill in all required fields.');
                }
            });
        }
    };
    handleFormSubmit('.contact-form form', 'Thank you for your message! We will contact you within 48 hours.');
    handleFormSubmit('#requestModal form', 'Thank you for your request! We will review it shortly.');

    //VISUAL FEEDBACK AND QUANTITY SELECTOR LOGIC
    document.body.addEventListener('click', (e) => {
        if (e.target.matches('.btn-add-cart')) {
            const button = e.target;
            const originalText = button.textContent;
            button.textContent = '✓';
            button.style.backgroundColor = '#16a866';
            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = '';
            }, 1500);
        }

        if (e.target.matches('.quantity-btn')) {
            const button = e.target;
            const valueSpan = button.parentElement.querySelector('.quantity-value');
            let currentValue = parseInt(valueSpan.textContent);
            if (button.classList.contains('plus')) {
                valueSpan.textContent = currentValue + 1;
            } else if (button.classList.contains('minus')) {
                if (currentValue > 1) {
                    valueSpan.textContent = currentValue - 1;
                }
            }
        }
    });

    //SMOOTH SCROLLING FOR NAV LINKS
    document.querySelectorAll('.main-nav a[href^="#"], .footer-nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    console.log('JTGeats website initialized successfully!');
});