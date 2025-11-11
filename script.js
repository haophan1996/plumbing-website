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


const text = "Reliable Plumbing and Heating You Can Trust. Professional, fast, and affordable plumbing and heating services in Massachusetts.";
const el = document.getElementById("typing-text");
let i = 0;

function typeWriter() {
  if (i < text.length) {
    el.innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 10); // typing speed
  }
}

window.addEventListener("load", typeWriter);