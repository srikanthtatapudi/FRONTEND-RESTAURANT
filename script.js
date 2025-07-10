document.addEventListener('DOMContentLoaded', () => {

    // --- 1. POPULAR ITEMS CAROUSEL (SWIPER.JS) ---
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
        }
    });

    // --- 2. VIDEO PLAYER CONTROLS ---
    const videoWrapper = document.querySelector('.video-wrapper');
    const promoVideo = document.getElementById('promoVideo');
    if (videoWrapper && promoVideo) {
        const toggleVideo = () => {
            if (promoVideo.paused || promoVideo.ended) promoVideo.play();
            else promoVideo.pause();
        };
        videoWrapper.addEventListener('click', toggleVideo);
        promoVideo.addEventListener('play', () => videoWrapper.classList.add('playing'));
        promoVideo.addEventListener('pause', () => videoWrapper.classList.remove('playing'));
        promoVideo.addEventListener('ended', () => videoWrapper.classList.remove('playing'));
    }

    // --- 3. MODAL FUNCTIONALITY ---
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
        requestModal.addEventListener('click', (event) => {
            if (event.target === requestModal) closeModal();
        });
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') closeModal();
        });
    }

    // --- 4. FORM SUBMISSION HANDLING (CONTACT & MODAL) ---
    const handleFormSubmit = (formSelector, successMessage) => {
        const form = document.querySelector(formSelector);
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const inputs = form.querySelectorAll('[required]');
                let isValid = true;
                inputs.forEach(input => {
                    if (!input.value.trim()) isValid = false;
                });
                if (isValid) {
                    alert(successMessage);
                    form.reset();
                    if (form.closest('.modal-overlay')) {
                         form.closest('.modal-overlay').style.display = 'none';
                         document.body.classList.remove('modal-open');
                    }
                } else {
                    alert('Please fill in all required fields.');
                }
            });
        }
    };
    handleFormSubmit('.contact-form form', 'Thank you for your message! We will contact you within 48 hours.');
    handleFormSubmit('#requestModal form', 'Thank you for your request! We will review it shortly.');

    // --- 5. VISUAL FEEDBACK ON ADD TO CART ---
    document.querySelectorAll('.btn-add-cart, .btn-add-full').forEach(button => {
        const originalText = button.textContent;
        button.addEventListener('click', () => {
            button.textContent = button.classList.contains('btn-add-cart') ? '✓' : 'Added!';
            button.style.backgroundColor = '#16a866'; // Darker green
            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = ''; // Revert to CSS color
            }, 1500);
        });
    });

    console.log('JTGeats website initialized successfully!');
});