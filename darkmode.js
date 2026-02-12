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

    // Mobile Navigation & Hamburger Logic
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');

    // Create Hamburger Button
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.setAttribute('aria-label', 'Toggle navigation');
    hamburger.innerHTML = '<span></span><span></span><span></span>';

    // Append hamburger to navbar
    navbar.appendChild(hamburger);

    // Toggle Menu
    hamburger.addEventListener('click', function (e) {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
        const isClickInsideNav = navbar.contains(event.target);
        if (!isClickInsideNav && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    // Mobile Dropdown Toggle
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        link.addEventListener('click', function (e) {
            if (window.innerWidth <= 768) {
                const submenu = dropdown.querySelector('.dropdown-menu');
                if (submenu) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            }
        });
    });
});
