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
    toggleButton.innerHTML = currentTheme === 'dark' ? '🌙' : '☀️';
    document.body.appendChild(toggleButton);

    // Toggle theme on button click
    toggleButton.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');

        // Update icon and save preference
        if (document.body.classList.contains('dark-mode')) {
            toggleButton.innerHTML = '🌙';
            localStorage.setItem('theme', 'dark');
        } else {
            toggleButton.innerHTML = '☀️';
            localStorage.setItem('theme', 'light');
        }
    });

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
});
