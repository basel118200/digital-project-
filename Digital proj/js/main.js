// Enhanced Smooth Scroll
const smoothScroll = (target, offset = 80) => {
    const element = document.querySelector(target);
    if (!element) return;

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
};

// Handle navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Card Animation Observer
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            const listItems = entry.target.querySelectorAll('.service-list-item');
            listItems.forEach((item, index) => {
                item.style.transitionDelay = `${index * 100}ms`;
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            });
            cardObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '50px'
});

// Page Loader Handler
window.addEventListener('load', () => {
    const loader = document.querySelector('.page-loader');
    document.body.classList.add('loaded');
    
    if (loader) {
        setTimeout(() => {
            loader.classList.add('loaded');
        }, 500);
    }
});

// Handle page transitions
document.addEventListener('DOMContentLoaded', function() {
    // Cache the existing initialization code
    const initializePage = () => {
        // Initialize Bootstrap components
        if (typeof bootstrap !== 'undefined') {
            [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
                .map(el => new bootstrap.Tooltip(el));
            [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
                .map(el => new bootstrap.Popover(el));
        }

        // Initialize AOS with enhanced options
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-out-cubic',
                once: true,
                offset: 50,
                delay: 50
            });
        }
    };

    // Initialize page
    initializePage();

    // Handle smooth page transitions
    document.querySelectorAll('a').forEach(link => {
        // Only handle internal links
        if (link.href && link.href.startsWith(window.location.origin) && !link.hasAttribute('data-bs-toggle')) {
            link.addEventListener('click', function(e) {
                const loader = document.querySelector('.page-loader');
                if (!loader) return;

                e.preventDefault();
                const targetHref = this.href;

                // Show loader
                loader.classList.remove('loaded');
                document.body.classList.remove('loaded');

                // Animate current page out
                document.body.style.opacity = '0';

                // Navigate to new page
                setTimeout(() => {
                    window.location.href = targetHref;
                }, 300);
            });
        }
    });

    // Initialize Bootstrap components
    if (typeof bootstrap !== 'undefined') {
        // Initialize tooltips and popovers
        [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map(el => new bootstrap.Tooltip(el));
        [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]')).map(el => new bootstrap.Popover(el));
    }

    // Initialize AOS with enhanced options
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50,
            delay: 50
        });
    } else {
        // Fallback if AOS is not loaded
        document.querySelectorAll('[data-aos]').forEach(element => {
            element.style.opacity = '1';
        });
    }

    // Navbar functionality
    const navbar = document.querySelector('.navbar');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    let lastScroll = 0;
    const scrollThreshold = 100;
    let isNavbarHidden = false;

    // Handle mobile navigation
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                navbarCollapse.classList.remove('show');
            }
        });
    });

    // Update active nav state
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Enhanced navbar scroll behavior
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add/remove background when scrolling starts
        if (currentScroll > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Show/hide navbar based on scroll direction
        if (!isNavbarHidden && currentScroll > lastScroll && currentScroll > scrollThreshold) {
            navbar.style.transform = 'translateY(-100%)';
            isNavbarHidden = true;
        } else if (isNavbarHidden && (currentScroll < lastScroll || currentScroll < scrollThreshold)) {
            navbar.style.transform = 'translateY(0)';
            isNavbarHidden = false;
        }

        lastScroll = currentScroll;
    });

    // Enhanced card animations
    document.querySelectorAll('.card').forEach((card, index) => {
        card.classList.add('fade-up');
        card.style.transitionDelay = `${index * 100}ms`;
        cardObserver.observe(card);

        // Reset list items initial state
        card.querySelectorAll('.service-list-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
        });
    });

    // Feature cards hover effects
    document.querySelectorAll('.feature-card').forEach(card => {
        const icon = card.querySelector('i');
        if (!icon) return;

        card.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        });

        card.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0)';
        });
    });

    // Enhanced service card interactions
    document.querySelectorAll('.service-card').forEach(card => {
        const icon = card.querySelector('.icon-wrapper i');
        const title = card.querySelector('.card-title');

        card.addEventListener('mouseenter', () => {
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
            }
            if (title) {
                title.style.color = getComputedStyle(document.documentElement)
                    .getPropertyValue('--primary-color');
            }
        });

        card.addEventListener('mouseleave', () => {
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
            }
            if (title) {
                title.style.color = '';
            }
        });
    });

    // Fix mobile menu behavior
    const navbarToggler = document.querySelector('.navbar-toggler');

    if (navbarToggler && navbarCollapse) {
        document.addEventListener('click', (e) => {
            if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
                navbarCollapse.classList.remove('show');
            }
        });
    }

    // Enhanced form validation with better UX
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');

        inputs.forEach(input => {
            input.addEventListener('blur', () => validateInput(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('is-invalid')) {
                    validateInput(input);
                }
            });
        });

        form.addEventListener('submit', function(e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();

                // Show feedback for all invalid fields
                inputs.forEach(input => validateInput(input));

                // Focus first invalid input
                const firstInvalid = form.querySelector(':invalid');
                if (firstInvalid) {
                    firstInvalid.focus();
                    smoothScroll(firstInvalid, 120);
                }
            }

            form.classList.add('was-validated');
        });
    });

    // Fix hero section height on mobile
    function adjustHeroHeight() {
        const hero = document.querySelector('.hero-section');
        if (hero) {
            const windowHeight = window.innerHeight;
            const navHeight = navbar.offsetHeight;
            hero.style.minHeight = `${windowHeight}px`;
            hero.style.paddingTop = `${navHeight + 20}px`;
        }
    }

    window.addEventListener('resize', adjustHeroHeight);
    adjustHeroHeight();

    // Enhanced smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            if (target === '#') return;
            smoothScroll(target);
        });
    });

    // Enhanced button loading states
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.classList.contains('btn-loading') || this.classList.contains('no-loading')) return;

            const originalContent = this.innerHTML;
            this.classList.add('btn-loading');
            this.innerHTML = '<span class="btn-content">' + originalContent + '</span>';

            // Reset button state after action completes
            setTimeout(() => {
                this.classList.remove('btn-loading');
                this.innerHTML = originalContent;
            }, 1500);
        });
    });
});

// Enhanced input validation
function validateInput(input) {
    const isValid = input.checkValidity();
    const feedback = input.nextElementSibling;

    if (isValid) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');

        if (feedback && feedback.classList.contains('invalid-feedback')) {
            feedback.textContent = input.validationMessage;
            feedback.style.display = 'block';
        }
    }

    return isValid;
}