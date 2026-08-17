document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("img[data-fallback-src]").forEach(function (img) {
    function applyFallback() {
      const fallback = img.getAttribute("data-fallback-src");
      if (!fallback) return;
      img.removeAttribute("data-fallback-src");
      img.src = fallback;
    }

    img.addEventListener("error", applyFallback, { once: true });
    if (img.complete && img.naturalWidth === 0) applyFallback();
  });

  document.querySelectorAll('a[target="_blank"]').forEach(function (link) {
    const rel = new Set(
      (link.getAttribute("rel") || "").split(/\s+/).filter(Boolean),
    );
    rel.add("noopener");
    rel.add("noreferrer");
    link.setAttribute("rel", Array.from(rel).join(" "));
  });

  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelector(".nav-links");
  if (!navbar || !navLinks || navbar.querySelector(".hamburger")) return;

  if (!navLinks.id) navLinks.id = "site-navigation";

  let overlay = document.querySelector(".menu-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "menu-overlay";
    overlay.setAttribute("aria-hidden", "true");
    document.body.appendChild(overlay);
  }

  const hamburger = document.createElement("button");
  hamburger.type = "button";
  hamburger.className = "hamburger";
  hamburger.setAttribute("aria-label", "Open navigation");
  hamburger.setAttribute("aria-controls", navLinks.id);
  hamburger.setAttribute("aria-expanded", "false");
  for (let i = 0; i < 3; i += 1)
    hamburger.appendChild(document.createElement("span"));
  navbar.appendChild(hamburger);

  function isMobileMenuOpen() {
    return window.innerWidth <= 768 && navLinks.classList.contains("active");
  }

  function closeAllDropdowns() {
    document.querySelectorAll(".dropdown.active").forEach(function (dropdown) {
      dropdown.classList.remove("active");
      const parentLink = dropdown.querySelector(":scope > a");
      if (parentLink) parentLink.setAttribute("aria-expanded", "false");
    });
  }

  function closeMenu(restoreFocus) {
    const wasOpen = isMobileMenuOpen();
    hamburger.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "Open navigation");
    navLinks.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("menu-open");
    closeAllDropdowns();
    if (restoreFocus && wasOpen) hamburger.focus();
  }

  function openMenu() {
    hamburger.classList.add("active");
    hamburger.setAttribute("aria-expanded", "true");
    hamburger.setAttribute("aria-label", "Close navigation");
    navLinks.classList.add("active");
    overlay.classList.add("active");
    document.body.classList.add("menu-open");
    const firstLink = navLinks.querySelector("a");
    if (firstLink)
      requestAnimationFrame(function () {
        firstLink.focus();
      });
  }

  hamburger.addEventListener("click", function (event) {
    event.stopPropagation();
    isMobileMenuOpen() ? closeMenu(false) : openMenu();
  });
  overlay.addEventListener("click", function () {
    closeMenu(true);
  });

  navLinks
    .querySelectorAll("li:not(.dropdown) > a, .dropdown-menu a")
    .forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.innerWidth <= 768) closeMenu(false);
      });
    });

  document.querySelectorAll(".dropdown").forEach(function (dropdown) {
    const parentLink = dropdown.querySelector(":scope > a");
    if (!parentLink) return;
    parentLink.setAttribute("aria-haspopup", "true");
    parentLink.setAttribute("aria-expanded", "false");
    parentLink.addEventListener("click", function (event) {
      if (window.innerWidth > 768) return;
      const submenu = dropdown.querySelector(".dropdown-menu");
      if (!submenu) return;
      event.preventDefault();
      const isOpen = dropdown.classList.contains("active");
      closeAllDropdowns();
      if (!isOpen) {
        dropdown.classList.add("active");
        parentLink.setAttribute("aria-expanded", "true");
        const firstChildLink = submenu.querySelector("a");
        if (firstChildLink)
          requestAnimationFrame(function () {
            firstChildLink.focus();
          });
      }
    });
  });

  document.addEventListener("keydown", function (event) {
    if (!isMobileMenuOpen()) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu(true);
      return;
    }
    if (event.key !== "Tab") return;

    const focusable = [hamburger].concat(
      Array.from(navLinks.querySelectorAll("a")).filter(function (link) {
        return link.getClientRects().length > 0;
      }),
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) closeMenu(false);
  });
});
