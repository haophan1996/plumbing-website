document.addEventListener('DOMContentLoaded', () => {
    const getBasePath = () => {
        const seg = window.location.pathname.split('/').filter(Boolean);
        if (seg.length && seg[seg.length - 1].includes('.')) seg.pop();
        const dir = seg.length ? '/' + seg.join('/') + '/' : '/';
        return window.location.origin + dir + 'assets/images/';
    };
    const basePath = getBasePath();

    // DOM
    const container       = document.getElementById('image-container');
    const lightbox        = document.getElementById('lightbox');
    const lightboxImg     = lightbox.querySelector('.lightbox-img');
    const closeBtn        = lightbox.querySelector('.close');
    const prevBtn         = lightbox.querySelector('.prev');
    const nextBtn         = lightbox.querySelector('.next');
    const thumbsContainer = document.getElementById('lightbox-thumbnails');

    let images = [];
    let currentIndex = 0;
    const cache = new Map(); // file → { src, img }

    const showLightbox = () => {
        const file = images[currentIndex];
        const cached = cache.get(file);
        lightboxImg.src = cached.src; // already loaded
        lightbox.style.display = 'flex';

        // Highlight thumbnail
        thumbsContainer.querySelectorAll('img').forEach((t, i) => {
            t.classList.toggle('active', i === currentIndex);
        });

        const active = thumbsContainer.querySelector('.active');
        active?.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    };

    const changeIndex = delta => {
        currentIndex = (currentIndex + delta + images.length) % images.length;
        showLightbox();
    };

    // === MAIN: Load JSON + Pre-cache ===
    fetch(basePath + 'images.json')
        .then(r => { if (!r.ok) throw Error(r.status); return r.json(); })
        .then(files => {
            images = files;

            const fragGrid = document.createDocumentFragment();
            const fragThumbs = document.createDocumentFragment();

            // Preload ONCE and reuse
            files.forEach((file, i) => {
                const url = basePath + file;

                // 1. Preload image
                const img = new Image();
                img.src = url;
                img.loading = 'eager'; // Force immediate load
                cache.set(file, { src: url, img });

                // Wait for load (optional: for 100% no-fetch)
                img.decode().catch(() => {}); // Suppress error

                // 2. Grid image (reuse src)
                const g = document.createElement('img');
                g.src = url;
                g.alt = file;
                g.className = 'library-img';
                g.loading = 'lazy'; // grid can be lazy
                g.onclick = () => { currentIndex = i; showLightbox(); };
                fragGrid.appendChild(g);

                // 3. Thumbnail (reuse src, but small + eager)
                const t = document.createElement('img');
                t.src = url;
                t.alt = file;
                t.loading = 'eager'; // thumbnail must load fast
                t.onclick = () => { currentIndex = i; showLightbox(); };
                fragThumbs.appendChild(t);
            });

            container.appendChild(fragGrid);
            thumbsContainer.appendChild(fragThumbs);
        })
        .catch(err => {
            console.error('Load failed:', err);
            container.innerHTML = '<p style="color:red">Gallery failed to load.</p>';
        });

    // Navigation
    prevBtn.onclick = () => changeIndex(-1);
    nextBtn.onclick = () => changeIndex(+1);
    closeBtn.onclick = () => lightbox.style.display = 'none';
    lightbox.onclick = e => { if (e.target === lightbox) lightbox.style.display = 'none'; };

    document.addEventListener('keydown', e => {
        if (lightbox.style.display !== 'flex') return;
        if (e.key === 'ArrowLeft') changeIndex(-1);
        if (e.key === 'ArrowRight') changeIndex(+1);
        if (e.key === 'Escape') lightbox.style.display = 'none';
    });

    lightbox.addEventListener('wheel', e => {
        e.preventDefault();
        changeIndex(e.deltaY < 0 ? -1 : +1);
    });

    let touchX = 0;
    lightbox.addEventListener('touchstart', e => touchX = e.changedTouches[0].screenX);
    lightbox.addEventListener('touchend', e => {
        const diff = e.changedTouches[0].screenX - touchX;
        if (Math.abs(diff) > 50) changeIndex(diff > 0 ? -1 : +1);
    });
});