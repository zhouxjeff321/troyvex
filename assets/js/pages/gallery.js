// Lightbox functionality
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxCounter = document.getElementById("lightbox-counter");
const closeBtn = document.querySelector(".lightbox-close");
const prevBtn = document.querySelector(".lightbox-prev");
const nextBtn = document.querySelector(".lightbox-next");

let currentImages = [];
let currentIndex = 0;
let previouslyFocused = null;

// Add click event to all gallery images
document.querySelectorAll(".gm-sec").forEach((section) => {
  const images = section.querySelectorAll(".gm-mosaic img");
  images.forEach((img, index) => {
    img.tabIndex = 0;
    img.setAttribute("role", "button");
    img.setAttribute("aria-label", `Open ${img.alt}`);
    if (img.closest(".gm-more")) {
      const count =
        img.closest(".gm-more").querySelector(".gm-cnt")?.textContent || "more";
      img.setAttribute(
        "aria-label",
        `Show ${count.replace("+", "")} more photos`,
      );
      img.setAttribute("aria-expanded", "false");
    }
    img.addEventListener("click", () => {
      currentImages = Array.from(images);
      currentIndex = index;
      openLightbox();
    });
    img.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        img.click();
      }
    });
  });
});

// "+N" tile: first click expands the section instead of opening the lightbox
document.querySelectorAll(".gm-more").forEach((more) => {
  more.addEventListener(
    "click",
    (e) => {
      const sec = more.closest(".gm-sec");
      if (!sec.classList.contains("expanded")) {
        e.stopPropagation();
        sec.classList.add("expanded");
        const trigger = more.querySelector("img");
        if (trigger) {
          trigger.setAttribute("aria-expanded", "true");
          trigger.setAttribute("aria-label", `Open ${trigger.alt}`);
        }
      }
    },
    true,
  );
});

function openLightbox() {
  previouslyFocused = document.activeElement;
  lightbox.classList.add("active");
  lightbox.setAttribute("aria-hidden", "false");
  [closeBtn, prevBtn, nextBtn].forEach((button) => {
    button.tabIndex = 0;
  });
  document.body.classList.add("lightbox-open");
  updateLightboxImage();
  closeBtn.focus();
}

function closeLightbox() {
  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
  [closeBtn, prevBtn, nextBtn].forEach((button) => {
    button.tabIndex = -1;
  });
  document.body.classList.remove("lightbox-open");
  if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
}

function updateLightboxImage() {
  const img = currentImages[currentIndex];
  lightboxImg.src = img.currentSrc || img.src;
  lightboxImg.alt = img.alt;
  lightboxCaption.textContent = img.alt;
  lightboxCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;

  // Hide arrows if only one image
  if (currentImages.length <= 1) {
    prevBtn.disabled = true;
    nextBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
    nextBtn.disabled = false;
  }
}

function nextImage() {
  currentIndex = (currentIndex + 1) % currentImages.length;
  updateLightboxImage();
}

function prevImage() {
  currentIndex =
    (currentIndex - 1 + currentImages.length) % currentImages.length;
  updateLightboxImage();
}

// Event listeners
closeBtn.addEventListener("click", closeLightbox);
prevBtn.addEventListener("click", prevImage);
nextBtn.addEventListener("click", nextImage);

// Close on background click
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return;

  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") nextImage();
  if (e.key === "ArrowLeft") prevImage();
  if (e.key === "Tab") {
    const controls = [closeBtn, prevBtn, nextBtn].filter(
      (button) => !button.disabled,
    );
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});
