document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.getElementById('main-nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            nav.classList.toggle('open');
        });
    }

    // Header Scroll Effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // Intersection Observer for Reveal Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(element => {
        revealObserver.observe(element);
    });

    // Favorite Button Toggle
    document.querySelectorAll('.property-card__favorite').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const isPressed = btn.getAttribute('aria-pressed') === 'true';
            btn.setAttribute('aria-pressed', !isPressed);
        });
    });

    // Search Tabs functionality
    const searchTabs = document.querySelectorAll('.search__tab');
    if (searchTabs.length > 0) {
        searchTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove aria-selected from all
                searchTabs.forEach(t => t.setAttribute('aria-selected', 'false'));
                // Set true to clicked
                tab.setAttribute('aria-selected', 'true');
            });
        });
    }
});
