document.addEventListener("DOMContentLoaded", () => {
    fetch("assets/images/images.json")
        .then(res => res.json())
        .then(files => {
            const container = document.getElementById("image-container"); // use the wrapper
            if (!container) return;

            files.forEach(file => {
                const img = document.createElement("img");
                img.src = "assets/images/" + file;
                img.alt = file;
                img.classList.add("library-img");

                // Click to open lightbox
                img.addEventListener("click", () => {
                    lightbox.style.display = "flex";
                    lightboxImg.src = img.src;
                });

                container.appendChild(img); // images appear directly in wrapper
            });
        })
        .catch(err => console.error("Failed to load images:", err));

    // Lightbox
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.querySelector(".lightbox-img");
    const closeBtn = document.querySelector(".lightbox .close");

    closeBtn.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    lightbox.addEventListener("click", e => {
        if (e.target === lightbox) lightbox.style.display = "none";
    });
});
