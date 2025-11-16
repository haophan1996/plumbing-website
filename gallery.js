document.addEventListener("DOMContentLoaded", () => {
    let images = [];
    let currentIndex = 0;

    const container = document.getElementById("image-container");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.querySelector(".lightbox-img");
    const closeBtn = document.querySelector(".lightbox .close");
    const prevBtn = document.querySelector(".lightbox .prev");
    const nextBtn = document.querySelector(".lightbox .next");
    const thumbsContainer = document.getElementById("lightbox-thumbnails");

    // Load images
    fetch("assets/images/images.json")
        .then(res => res.json())
        .then(files => {
            images = files;

            files.forEach((file, index) => {
                const img = document.createElement("img");
                img.src = "assets/images/" + file;
                img.alt = file;
                img.classList.add("library-img");

                // Click to open lightbox
                img.addEventListener("click", () => {
                    currentIndex = index;
                    showLightbox();
                });

                container.appendChild(img);

                // Create thumbnail
                const thumb = document.createElement("img");
                thumb.src = img.src;
                thumb.alt = img.alt;
                thumb.addEventListener("click", () => {
                    currentIndex = index;
                    showLightbox();
                });
                thumbsContainer.appendChild(thumb);
            });
        });

    function showLightbox() {
        lightboxImg.src = "./assets/images/" + images[currentIndex];
        lightbox.style.display = "flex";

        // Highlight active thumbnail
        const thumbs = thumbsContainer.querySelectorAll("img");
        thumbs.forEach((t, i) => {
            t.classList.toggle("active", i === currentIndex);
        });

        // Scroll active thumbnail into view
        const activeThumb = thumbsContainer.querySelector(".active");
        if (activeThumb) activeThumb.scrollIntoView({ behavior: "smooth", inline: "center" });
    }

    // Navigation
    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showLightbox();
    });
    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % images.length;
        showLightbox();
    });

    closeBtn.addEventListener("click", () => lightbox.style.display = "none");
    lightbox.addEventListener("click", e => { if (e.target === lightbox) lightbox.style.display = "none"; });

    // Keyboard
    document.addEventListener("keydown", e => {
        if (lightbox.style.display === "flex") {
            if (e.key === "ArrowLeft") { currentIndex = (currentIndex - 1 + images.length) % images.length; showLightbox(); }
            if (e.key === "ArrowRight") { currentIndex = (currentIndex + 1) % images.length; showLightbox(); }
            if (e.key === "Escape") lightbox.style.display = "none";
        }
    });

    // Scroll wheel
    lightbox.addEventListener("wheel", e => {
        e.preventDefault();
        if (e.deltaY < 0) currentIndex = (currentIndex - 1 + images.length) % images.length;
        else currentIndex = (currentIndex + 1) % images.length;
        showLightbox();
    });

    // Swipe
    let touchStartX = 0, touchEndX = 0;
    lightbox.addEventListener("touchstart", e => touchStartX = e.changedTouches[0].screenX);
    lightbox.addEventListener("touchend", e => { touchEndX = e.changedTouches[0].screenX; handleSwipe(); });
    function handleSwipe() {
        const diff = touchEndX - touchStartX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) currentIndex = (currentIndex - 1 + images.length) % images.length;
            else currentIndex = (currentIndex + 1) % images.length;
            showLightbox();
        }
    }
});
