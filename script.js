document.addEventListener('DOMContentLoaded', () => {

        const hamburgerBtn = document.querySelector('.hamburger-btn');
        const mainNav = document.querySelector('.main-nav');
        const navOverlay = document.querySelector('.nav-overlay');

        const toggleNav = () => {
            document.body.classList.toggle('nav-open');
            hamburgerBtn.classList.toggle('is-active');
        };

        hamburgerBtn.addEventListener('click', toggleNav);
        navOverlay.addEventListener('click', toggleNav);

        mainNav.addEventListener('click', (e) => {
            if (e.target.closest('a') && document.body.classList.contains('nav-open')) {
                toggleNav();
            }
        });

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId.length > 1) { 
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        e.preventDefault();
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });

        const swiper = new Swiper('.popular-items-slider', {
            loop: true,
            spaceBetween: 30,
            grabCursor: true,
            autoplay: { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true },
            navigation: { nextEl: '.carousel-arrow.next', prevEl: '.carousel-arrow.prev' },
            breakpoints: {
                // For 320px screens
                320: { slidesPerView: 1.05, spaceBetween: 15, loop: false },
                // For small mobile screens
                480: { slidesPerView: 1.5, spaceBetween: 20, loop: false },
                // For larger mobile / small tablets
                640: { slidesPerView: 2, spaceBetween: 20, loop: false },
                // For tablets
                768: { slidesPerView: 3, spaceBetween: 30 },
            },
            observer: true,
            observeParents: true,
        });

        const videoWrapper = document.querySelector('.video-wrapper');
        const promoVideo = document.getElementById('promoVideo');
        if (videoWrapper && promoVideo) {
            const toggleVideo = () => { promoVideo.paused ? promoVideo.play() : promoVideo.pause(); };
            videoWrapper.addEventListener('click', toggleVideo);
            promoVideo.addEventListener('play', () => videoWrapper.classList.add('playing'));
            promoVideo.addEventListener('pause', () => videoWrapper.classList.remove('playing'));
            promoVideo.addEventListener('ended', () => videoWrapper.classList.remove('playing'));
        }

        const requestModal = document.getElementById('requestModal');
        const requestDishBtn = document.getElementById('requestDishBtn');
        const cancelBtn = document.getElementById('cancelBtn');
        if (requestModal && requestDishBtn && cancelBtn) {
            const openModal = () => { requestModal.style.display = 'flex'; document.body.classList.add('modal-open'); };
            const closeModal = () => { requestModal.style.display = 'none'; document.body.classList.remove('modal-open'); };
            requestDishBtn.addEventListener('click', openModal);
            cancelBtn.addEventListener('click', closeModal);
            requestModal.addEventListener('click', (event) => { if (event.target === requestModal) closeModal(); });
            document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && document.body.classList.contains('modal-open')) closeModal(); });
        }

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
                        const modal = form.closest('.modal-overlay');
                        if (modal) { 
                            modal.style.display = 'none'; 
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

        document.body.addEventListener('click', (e) => {
            if (e.target.matches('.btn-add-cart')) {
                const button = e.target;
                const originalText = button.textContent;
                button.textContent = '✓';
                button.style.backgroundColor = 'var(--primary-green)';
                button.style.color = 'var(--white)';
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.backgroundColor = '';
                    button.style.color = '';
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

        console.log('JTGeats final version with full responsiveness (320px-1440px) is live!');
    });