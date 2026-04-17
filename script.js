// landing-page/script.js
document.addEventListener('DOMContentLoaded', () => {
    // 🔹 1. UTM Parameter Extraction & Tracking
    const params = new URLSearchParams(window.location.search);
    const utmData = {
        utm_source: params.get('utm_source') || 'direct',
        utm_medium: params.get('utm_medium') || 'none',
        utm_campaign: params.get('utm_campaign') || 'organic',
        utm_term: params.get('utm_term') || '',
        utm_content: params.get('utm_content') || ''
    };

    // Store in sessionStorage so it persists across page interactions
    sessionStorage.setItem('utm_tracking', JSON.stringify(utmData));
    console.log('📊 UTM Data Captured:', utmData);

    // Helper: Send GA4 events with UTM context automatically attached
    const trackGAEvent = (eventName, extraParams = {}) => {
        if (typeof gtag !== 'function') {
            console.warn('⚠️ gtag() not loaded. Skipping event:', eventName);
            return;
        }
        gtag('event', eventName, { ...utmData, ...extraParams });
    };

    // 🔹 2. CTA Click Tracking
    const ctaBtn = document.getElementById('cta-primary');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', () => {
            trackGAEvent('click_cta', {
                event_category: 'engagement',
                button_label: 'hero_primary',
                click_position: 'above_fold'
            });
        });
    }

    // 🔹 3. Form Submission Tracking
    const leadForm = document.getElementById('lead-form');
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = leadForm.querySelector('input[type="email"]');
            const email = emailInput ? emailInput.value.trim() : '';

            trackGAEvent('generate_lead', {
                event_category: 'conversion',
                method: 'landing_page_form',
                form_id: 'waitlist_signup'
            });

            // Simulate API call / success state
            leadForm.reset();
            ctaBtn?.textContent || (leadForm.querySelector('button').textContent = '✅ Subscribed!');
            setTimeout(() => {
                leadForm.querySelector('button').textContent = 'Join Now';
            }, 2000);
        });
    }

    // 🔹 4. Scroll Depth Tracking (50%)
    let scrollTracked = false;
    const trackScroll = () => {
        if (!scrollTracked && window.scrollY > (document.body.scrollHeight * 0.5)) {
            trackGAEvent('scroll_depth_50', { event_category: 'engagement' });
            scrollTracked = true;
            window.removeEventListener('scroll', trackScroll);
        }
    };
    window.addEventListener('scroll', trackScroll, { passive: true });

    // 🔹 5. Mobile Menu Toggle (if present in HTML)
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            const nav = document.querySelector('nav ul') || document.querySelector('.nav-links');
            if (nav) nav.classList.toggle('active');
            trackGAEvent('click_menu_toggle', { event_category: 'navigation' });
        });
    }

    // 🔹 6. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
});