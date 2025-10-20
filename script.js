// IntersectionObserver for scroll animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.05 // 👈 triggers sooner for smoother flow
});

document.querySelectorAll('.fade-up, .slide-up').forEach(elem => {
  observer.observe(elem);
});

// Parallax effect on wave (subtle scroll motion)
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero::before');
  const scrollY = window.scrollY;
  document.documentElement.style.setProperty('--scrollY', scrollY * 0.3 + 'px');
});


// Mobile menu toggle — robust & accessible
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav'); // Changed from 'nav#main-nav'
    
    if (!menuToggle || !nav) {
        console.error('Menu toggle or nav not found');
        return;
    }

    const setExpanded = (isExpanded) => {
        menuToggle.setAttribute('aria-expanded', String(isExpanded));
        if (isExpanded) {
            nav.classList.add('active');
            menuToggle.classList.add('open');
        } else {
            nav.classList.remove('active');
            menuToggle.classList.remove('open');
        }
    };

    // Toggle on click
    menuToggle.addEventListener('click', () => {
        const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
        setExpanded(!isOpen);
    });

    // Close menu if a nav link is clicked (mobile UX)
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            setExpanded(false);
        });
    });

    // Optional: close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') setExpanded(false);
    });
});