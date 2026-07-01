// Dark mode toggle functionality
document.addEventListener('DOMContentLoaded', function () {
    function getStoredTheme() {
        try {
            return localStorage.getItem('theme');
        } catch (error) {
            return null;
        }
    }

    function setStoredTheme(theme) {
        try {
            localStorage.setItem('theme', theme);
        } catch (error) {
            // Storage can be disabled in private browsing or hardened browsers.
        }
    }

    // Check for saved theme preference or default to 'light'
    const currentTheme = getStoredTheme() === 'dark' ? 'dark' : 'light';

    // Apply saved theme on page load
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    function updateToggleState(isDark) {
        toggleButton.textContent = isDark ? '🌙' : '☀️';
        toggleButton.setAttribute('aria-pressed', isDark ? 'true' : 'false');
        toggleButton.setAttribute('title', isDark ? 'Dark mode enabled' : 'Light mode enabled');
    }

    // Create toggle button
    const toggleButton = document.createElement('button');
    toggleButton.className = 'dark-mode-toggle';
    toggleButton.setAttribute('aria-label', 'Toggle dark mode');
    updateToggleState(currentTheme === 'dark');
    document.body.appendChild(toggleButton);

    // Toggle theme on button click
    toggleButton.addEventListener('click', function () {
        const isDark = document.body.classList.toggle('dark-mode');
        updateToggleState(isDark);
        setStoredTheme(isDark ? 'dark' : 'light');
    });

    // Image fallbacks are configured with data-fallback-src instead of inline handlers.
    document.querySelectorAll('img[data-fallback-src]').forEach(function (img) {
        function applyFallback() {
            const fallback = img.getAttribute('data-fallback-src');
            if (!fallback) return;
            img.removeAttribute('data-fallback-src');
            img.src = fallback;
        }

        img.addEventListener('error', applyFallback, { once: true });
        if (img.complete && img.naturalWidth === 0) {
            applyFallback();
        }
    });

    // Normalize target=_blank links so every external new-tab link is opener-safe.
    document.querySelectorAll('a[target="_blank"]').forEach(function (link) {
        const rel = new Set((link.getAttribute('rel') || '').split(/\s+/).filter(Boolean));
        rel.add('noopener');
        rel.add('noreferrer');
        link.setAttribute('rel', Array.from(rel).join(' '));
    });

    // ─── Mobile Navigation ────────────────────────────────────────────────────

    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');

    if (!navbar || !navLinks) {
        return;
    }

    if (!navLinks.id) {
        navLinks.id = 'site-navigation';
    }

    if (navbar.querySelector('.hamburger')) {
        return;
    }

    // Backdrop overlay - sits behind the slide-in panel
    let overlay = document.querySelector('.menu-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        document.body.appendChild(overlay);
    }

    // Hamburger button (three-bar icon -> X when open)
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.setAttribute('aria-label', 'Toggle navigation');
    hamburger.setAttribute('aria-controls', navLinks.id);
    hamburger.setAttribute('aria-expanded', 'false');
    for (let i = 0; i < 3; i++) {
        hamburger.appendChild(document.createElement('span'));
    }
    navbar.appendChild(hamburger);

    // ── Helpers ──────────────────────────────────────────────────────────────

    function closeAllDropdowns() {
        document.querySelectorAll('.dropdown.active').forEach(function (d) {
            d.classList.remove('active');
            const parentLink = d.querySelector(':scope > a');
            if (parentLink) parentLink.setAttribute('aria-expanded', 'false');
        });
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('menu-open');
        closeAllDropdowns();
    }

    function openMenu() {
        hamburger.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
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
        if (!parentLink) return;
        parentLink.setAttribute('aria-haspopup', 'true');
        parentLink.setAttribute('aria-expanded', 'false');
        parentLink.addEventListener('click', function (e) {
            if (window.innerWidth <= 768) {
                const submenu = dropdown.querySelector('.dropdown-menu');
                if (submenu) {
                    e.preventDefault();
                    const isOpen = dropdown.classList.contains('active');
                    closeAllDropdowns();
                    if (!isOpen) {
                        dropdown.classList.add('active');
                        parentLink.setAttribute('aria-expanded', 'true');
                    }
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
