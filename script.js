// =============================
// ✨ SCROLL ANIMATIONS (IntersectionObserver)
// =============================
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.05 } // triggers earlier for smoother animation
);


document.querySelectorAll(".fade-up, .slide-up").forEach(elem => {
  observer.observe(elem);
});

const parallaxElements = document.querySelectorAll("[data-speed]");
// =============================
// 🌟 SCROLL EFFECTS (Parallax + Blur + Header color)
// =============================
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  // ---- HERO TEXT PARALLAX (and any other [data-speed]) ----
  parallaxElements.forEach(el => {
    const speed = parseFloat(el.dataset.speed) || 0;
    const y = scrollY * speed;                 // positive = move down slower
    el.style.transform = `translateY(${y}px)`;
  });

  // ---- Hero background blur ----
  const heroBg = document.querySelector(".hero-bg"); // separate background element
  if (heroBg) {
    const maxBlur = 12; // max blur in px
    const blurValue = Math.min(scrollY / 50, maxBlur);
    heroBg.style.filter = `blur(${blurValue}px)`;
  }

  // ---- Parallax wave effect (CSS variable) ----
  document.documentElement.style.setProperty("--scrollY", scrollY * 0.3 + "px");

  // ---- Header/nav color change ----
  const header = document.querySelector("header");
  if (header) {
    header.classList.toggle("scrolled", scrollY > 50);
  }
});

// =============================
// 📱 MOBILE MENU TOGGLE
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("nav");

  if (!menuToggle || !nav) return;

  const setExpanded = isExpanded => {
    menuToggle.setAttribute("aria-expanded", String(isExpanded));
    nav.classList.toggle("active", isExpanded);
    menuToggle.classList.toggle("open", isExpanded);
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    setExpanded(!isOpen);
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => setExpanded(false));
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") setExpanded(false);
  });
});