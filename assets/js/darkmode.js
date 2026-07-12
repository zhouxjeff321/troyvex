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

    // Dark mode is temporarily disabled — site stays light, no toggle button.
    // Flip to true to bring back the toggle and saved-theme behavior.
    const DARK_MODE_ENABLED = false;

    if (DARK_MODE_ENABLED) {
        // Check for saved theme preference or default to 'light'
        const currentTheme = getStoredTheme() === 'dark' ? 'dark' : 'light';

        // Apply saved theme on page load
        if (currentTheme === 'dark') {
            document.body.classList.add('dark-mode');
        }

        // Create toggle button
        const toggleButton = document.createElement('button');

        function updateToggleState(isDark) {
            toggleButton.textContent = isDark ? '🌙' : '☀️';
            toggleButton.setAttribute('aria-pressed', isDark ? 'true' : 'false');
            toggleButton.setAttribute('title', isDark ? 'Dark mode enabled' : 'Light mode enabled');
        }

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
    } else {
        // Force light mode even if a dark preference was saved earlier.
        document.body.classList.remove('dark-mode');
        setStoredTheme('light');
    }

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

// ─── Summer Camp promo (top bar + corner toast) ──────────────────────────────
// Each dismisses on its own: only its own ✕ hides it and remembers it.
document.addEventListener('DOMContentLoaded', function () {
    const LEGACY_KEY = 'campPromo2026Dismissed';
    const BAR_KEY = 'campPromoBar2026Dismissed';
    const TOAST_KEY = 'campPromoToast2026Dismissed';

    function isDismissed(key) {
        try { return localStorage.getItem(key) === '1' || localStorage.getItem(LEGACY_KEY) === '1'; } catch (e) { return false; }
    }
    function rememberDismissed(key) {
        try { localStorage.setItem(key, '1'); } catch (e) { /* storage disabled */ }
    }

    const barDismissed = isDismissed(BAR_KEY);
    const toastDismissed = isDismissed(TOAST_KEY);

    // Skip on the camp page itself and if both already dismissed.
    const path = window.location.pathname.replace(/\/$/, '');
    if ((barDismissed && toastDismissed) || path.endsWith('/summercamp') || path.endsWith('/summercamp.html')) {
        return;
    }

    const style = document.createElement('style');
    style.textContent = [
        '.camp-promo-bar { position: fixed; top: 0; left: 0; right: 0; z-index: 10001;',
        '  background: #e0563f;',
        '  color: #fff; display: flex; align-items: center; justify-content: center;',
        '  gap: 0.9rem; padding: 0.55rem 2.6rem 0.55rem 1rem; font-size: 0.88rem; flex-wrap: wrap; text-align: center;',
        '  box-shadow: 0 2px 10px rgba(224, 86, 63, 0.3); }',
        '.camp-promo-bar b { font-weight: 700; }',
        '.camp-promo-bar .msg { text-shadow: 0 1px 2px rgba(0,0,0,0.12); }',
        '.camp-promo-bar .go { color: #e0563f; background: #fff; border: 1px solid #fff;',
        '  border-radius: 999px; padding: 0.28rem 1rem; font-size: 0.8rem; font-weight: 700; text-decoration: none; white-space: nowrap;',
        '  box-shadow: 0 2px 6px rgba(0,0,0,0.15); transition: transform 0.15s ease, background 0.15s ease; }',
        '.camp-promo-bar .go:hover { background: #ffe9e4; transform: translateY(-1px); }',
        '.camp-promo-bar .camp-promo-x { position: absolute; right: 0.9rem; top: 50%; transform: translateY(-50%);',
        '  background: none; border: none; color: rgba(255,255,255,0.75); font-size: 0.95rem; cursor: pointer; line-height: 1; padding: 0.2rem; }',
        '.camp-promo-bar .camp-promo-x:hover { color: #fff; }',
        '.camp-promo-toast { position: fixed; right: 20px; bottom: 92px; z-index: 9500; width: 330px; max-width: calc(100vw - 40px);',
        '  background: #f5f3f1; border-radius: 14px; padding: 1.4rem 1.5rem; overflow: hidden;',
        '  box-shadow: 0 18px 44px rgba(13,27,58,0.22); font-family: inherit;',
        '  opacity: 0; transform: translateY(16px); transition: opacity 0.35s ease, transform 0.35s ease; }',
        '.camp-promo-toast.show { opacity: 1; transform: translateY(0); }',
        '.camp-promo-toast .orb { position: absolute; border-radius: 50%; filter: blur(30px); opacity: 0.4; }',
        '.camp-promo-toast .orb.a { width: 110px; height: 110px; background: #b12a34; top: -40px; left: -30px; }',
        '.camp-promo-toast .orb.b { width: 100px; height: 100px; background: #0d1b3a; bottom: -45px; right: -25px; }',
        '.camp-promo-toast .in { position: relative; z-index: 2; }',
        '.camp-promo-toast .ey { font-size: 0.72rem; color: #555; margin-bottom: 0.3rem; }',
        '.camp-promo-toast h3 { font-size: 1.35rem; color: #000; margin: 0 0 0.35rem; font-weight: 600; }',
        '.camp-promo-toast p { font-size: 0.86rem; color: #555; line-height: 1.5; margin: 0 0 0.9rem; }',
        '.camp-promo-toast .pill { background: #000; color: #fff; border-radius: 9999px; padding: 0.55rem 1.2rem;',
        '  font-size: 0.85rem; font-weight: 500; display: inline-block; text-decoration: none; }',
        '.camp-promo-toast .pill:hover { background: #b12a34; }',
        '.camp-promo-toast .spots { display: block; margin-top: 0.55rem; color: #b12a34; font-size: 0.75rem; font-weight: 500; }',
        '.camp-promo-toast .camp-promo-x { position: absolute; top: 10px; right: 12px; z-index: 3; background: none; border: none;',
        '  color: #999; font-size: 0.95rem; cursor: pointer; line-height: 1; padding: 0.2rem; }',
        '.camp-promo-toast .camp-promo-x:hover { color: #000; }',
        'body.dark-mode .camp-promo-toast { background: #222; box-shadow: 0 18px 44px rgba(0,0,0,0.5); }',
        'body.dark-mode .camp-promo-toast h3 { color: #f2f2f2; }',
        'body.dark-mode .camp-promo-toast .ey, body.dark-mode .camp-promo-toast p { color: #b0b0b0; }',
        'body.dark-mode .camp-promo-toast .pill { background: #b12a34; }',
        'body.dark-mode .camp-promo-toast .orb { opacity: 0.3; }',
        '@media (max-width: 768px) {',
        '  .camp-promo-bar { flex-wrap: nowrap; justify-content: space-between; text-align: left;',
        '    gap: 0.6rem; padding: 0.5rem 2.2rem 0.5rem 0.85rem; font-size: 0.8rem; }',
        '  .camp-promo-bar .msg { flex: 1 1 auto; line-height: 1.35; }',
        '  .camp-promo-bar .msg .extra { display: none; }',
        '  .camp-promo-bar .go { padding: 0.25rem 0.85rem; font-size: 0.75rem; }',
        '  .camp-promo-bar .camp-promo-x { right: 0.6rem; }',
        '}'
    ].join('\n');
    document.head.appendChild(style);

    // Top announcement bar
    if (!barDismissed) {
        const bar = document.createElement('div');
        bar.className = 'camp-promo-bar';
        bar.innerHTML =
            '<span class="msg"><b>Troy VEX Summer Camp</b> · July 20–24<span class="extra"> · Grades 5–12 · Spots limited</span></span>' +
            '<a class="go" href="/summercamp">Sign Up</a>' +
            '<button class="camp-promo-x" aria-label="Dismiss camp banner">✕</button>';
        document.body.appendChild(bar);

        // The site header is position:fixed at top:0 — push it (and the page) down
        // by the bar's live height so nothing hides behind the bar.
        const header = document.querySelector('header');
        const baseBodyPadding = parseFloat(window.getComputedStyle(document.body).paddingTop) || 0;

        function offsetForBar() {
            const h = bar.getBoundingClientRect().height;
            if (header) header.style.top = h + 'px';
            document.body.style.paddingTop = (baseBodyPadding + h) + 'px';
        }
        offsetForBar();
        window.addEventListener('resize', offsetForBar);

        // Only an explicit ✕ click dismisses the bar; the toast stays.
        bar.querySelector('.camp-promo-x').addEventListener('click', function () {
            rememberDismissed(BAR_KEY);
            bar.remove();
            if (header) header.style.top = '';
            document.body.style.paddingTop = '';
            window.removeEventListener('resize', offsetForBar);
        });
    }

    // Corner toast
    if (!toastDismissed) {
        const toast = document.createElement('div');
        toast.className = 'camp-promo-toast';
        toast.innerHTML =
            '<span class="orb a"></span><span class="orb b"></span>' +
            '<button class="camp-promo-x" aria-label="Dismiss camp popup">✕</button>' +
            '<div class="in">' +
            '<div class="ey">Summer 2026</div>' +
            '<h3>Troy VEX Summer Camp</h3>' +
            '<p>July 20–24 at Troy HS. Grades 5–12, no experience required.</p>' +
            '<a class="pill" href="/summercamp">Sign Up</a>' +
            '<span class="spots">Spots limited, sign up fast!</span>' +
            '</div>';
        document.body.appendChild(toast);
        setTimeout(function () { toast.classList.add('show'); }, 1200);

        // Only an explicit ✕ click dismisses the toast; the bar stays.
        toast.querySelector('.camp-promo-x').addEventListener('click', function () {
            rememberDismissed(TOAST_KEY);
            toast.remove();
        });
    }
});
