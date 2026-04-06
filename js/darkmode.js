// Dark mode toggle functionality
document.addEventListener('DOMContentLoaded', function () {
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';

    // Apply saved theme on page load
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    // Create toggle button
    const toggleButton = document.createElement('button');
    toggleButton.className = 'dark-mode-toggle';
    toggleButton.setAttribute('aria-label', 'Toggle dark mode');
    toggleButton.setAttribute('aria-pressed', currentTheme === 'dark' ? 'true' : 'false');
    toggleButton.setAttribute('title', currentTheme === 'dark' ? 'Dark mode enabled' : 'Light mode enabled');
    toggleButton.innerHTML = currentTheme === 'dark' ? '🌙' : '☀️';
    document.body.appendChild(toggleButton);

    // Toggle theme on button click
    toggleButton.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');

        // Update icon and save preference
        if (document.body.classList.contains('dark-mode')) {
            toggleButton.innerHTML = '🌙';
            toggleButton.setAttribute('aria-pressed', 'true');
            toggleButton.setAttribute('title', 'Dark mode enabled');
            localStorage.setItem('theme', 'dark');
        } else {
            toggleButton.innerHTML = '☀️';
            toggleButton.setAttribute('aria-pressed', 'false');
            toggleButton.setAttribute('title', 'Light mode enabled');
            localStorage.setItem('theme', 'light');
        }
    });

    // ─── Analytics Consent ────────────────────────────────────────────────────

    const analyticsConsentKey = 'analytics_consent';
    const gaMeasurementId = 'G-10QE64BG2M';

    function startAnalyticsIfAvailable() {
        if (typeof window.gtag !== 'function') {
            return;
        }

        window.gtag('config', gaMeasurementId, {
            anonymize_ip: true,
            allow_google_signals: false,
            allow_ad_personalization_signals: false
        });
    }

    function removeConsentBanner() {
        const banner = document.getElementById('analytics-consent-banner');
        if (banner) {
            banner.remove();
        }
    }

    function renderConsentBanner() {
        if (document.getElementById('analytics-consent-banner')) {
            return;
        }

        const banner = document.createElement('div');
        banner.id = 'analytics-consent-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-live', 'polite');
        banner.setAttribute('aria-label', 'Analytics consent');
        banner.style.position = 'fixed';
        banner.style.left = '16px';
        banner.style.right = '16px';
        banner.style.bottom = '16px';
        banner.style.zIndex = '12000';
        banner.style.padding = '14px 16px';
        banner.style.borderRadius = '12px';
        banner.style.background = 'rgba(13, 27, 58, 0.96)';
        banner.style.color = '#ffffff';
        banner.style.boxShadow = '0 12px 36px rgba(0, 0, 0, 0.35)';
        banner.style.display = 'flex';
        banner.style.flexWrap = 'wrap';
        banner.style.alignItems = 'center';
        banner.style.gap = '12px';

        const text = document.createElement('p');
        text.style.margin = '0';
        text.style.flex = '1 1 320px';
        text.style.fontSize = '0.95rem';
        text.textContent = 'Allow anonymous analytics to help improve the website experience?';

        const actions = document.createElement('div');
        actions.style.display = 'flex';
        actions.style.gap = '8px';
        actions.style.flex = '0 0 auto';

        const declineButton = document.createElement('button');
        declineButton.type = 'button';
        declineButton.textContent = 'Decline';
        declineButton.style.background = 'transparent';
        declineButton.style.color = '#ffffff';
        declineButton.style.border = '1px solid rgba(255, 255, 255, 0.6)';
        declineButton.style.padding = '8px 12px';
        declineButton.style.borderRadius = '8px';

        const allowButton = document.createElement('button');
        allowButton.type = 'button';
        allowButton.textContent = 'Allow';
        allowButton.style.background = '#b12a34';
        allowButton.style.color = '#ffffff';
        allowButton.style.border = '1px solid #b12a34';
        allowButton.style.padding = '8px 12px';
        allowButton.style.borderRadius = '8px';

        declineButton.addEventListener('click', function () {
            localStorage.setItem(analyticsConsentKey, 'denied');
            removeConsentBanner();
        });

        allowButton.addEventListener('click', function () {
            localStorage.setItem(analyticsConsentKey, 'granted');
            startAnalyticsIfAvailable();
            removeConsentBanner();
        });

        actions.appendChild(declineButton);
        actions.appendChild(allowButton);
        banner.appendChild(text);
        banner.appendChild(actions);
        document.body.appendChild(banner);
    }

    const savedAnalyticsConsent = localStorage.getItem(analyticsConsentKey);
    if (savedAnalyticsConsent === 'granted') {
        startAnalyticsIfAvailable();
    } else if (savedAnalyticsConsent !== 'denied') {
        renderConsentBanner();
    }

    // ─── Mobile Navigation ────────────────────────────────────────────────────

    const navbar   = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');

    // Backdrop overlay – sits behind the slide-in panel
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);

    // Hamburger button (three-bar icon → X when open)
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.setAttribute('aria-label', 'Toggle navigation');
    hamburger.innerHTML = '<span></span><span></span><span></span>';
    navbar.appendChild(hamburger);

    // ── Helpers ──────────────────────────────────────────────────────────────

    function closeAllDropdowns() {
        document.querySelectorAll('.dropdown.active').forEach(function (d) {
            d.classList.remove('active');
        });
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('menu-open');
        closeAllDropdowns();
    }

    function openMenu() {
        hamburger.classList.add('active');
        navLinks.classList.add('active');
        overlay.classList.add('active');
        document.body.classList.add('menu-open');
    }

    // ── Hamburger toggle ─────────────────────────────────────────────────────

    hamburger.addEventListener('click', function (e) {
        e.stopPropagation();
        navLinks.classList.contains('active') ? closeMenu() : openMenu();
    });

    // ── Close on overlay tap ─────────────────────────────────────────────────

    overlay.addEventListener('click', closeMenu);

    // ── Close when a regular (non-dropdown) top-level link is tapped ─────────

    navLinks.querySelectorAll('li:not(.dropdown) > a').forEach(function (link) {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 768) closeMenu();
        });
    });

    // ── Close when a dropdown sub-item is tapped ─────────────────────────────

    navLinks.querySelectorAll('.dropdown-menu a').forEach(function (link) {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 768) closeMenu();
        });
    });

    // ── Mobile dropdown accordion ─────────────────────────────────────────────
    // Tapping a dropdown parent toggles its submenu; collapses any other open one.

    document.querySelectorAll('.dropdown').forEach(function (dropdown) {
        const parentLink = dropdown.querySelector(':scope > a');
        parentLink.addEventListener('click', function (e) {
            if (window.innerWidth <= 768) {
                const submenu = dropdown.querySelector('.dropdown-menu');
                if (submenu) {
                    e.preventDefault();
                    const isOpen = dropdown.classList.contains('active');
                    closeAllDropdowns();
                    if (!isOpen) dropdown.classList.add('active');
                }
            }
        });
    });

    // ── Restore desktop nav on window resize ──────────────────────────────────
    // Prevents the nav from staying hidden if the window is resized from mobile
    // back to desktop while the menu was open or the nav-links were toggled.

    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) closeMenu();
    });
});
