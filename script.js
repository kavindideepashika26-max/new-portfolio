document.addEventListener("DOMContentLoaded", function () {
    /* Background particles */
    const particlesContainer = document.getElementById("particles");
    if (particlesContainer) {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement("div");
            particle.classList.add("particle");
            particle.style.left = Math.random() * 100 + "%";
            particle.style.animationDuration = (5 + Math.random() * 10) + "s";
            particle.style.animationDelay = Math.random() * 10 + "s";
            particle.style.opacity = 0.2 + Math.random() * 0.5;
            particlesContainer.appendChild(particle);
        }
    }

    /* Smooth navigation */
    const navLinks = document.querySelectorAll(".nav-links a");
    navLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = this.getAttribute("href");
            if (!targetId || !targetId.startsWith("#")) return;
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                event.preventDefault();
                targetSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    /* Active navigation */
    const sections = document.querySelectorAll("section[id]");
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                const currentId = entry.target.getAttribute("id");
                navLinks.forEach(function (link) {
                    link.classList.toggle("active", link.getAttribute("href") === "#" + currentId);
                });
            });
        }, { threshold: 0.35 });
        sections.forEach(function (section) { observer.observe(section); });
    }

    /* Activity category filters */
    const filterButtons = document.querySelectorAll(".filter-button");
    const activityCards = document.querySelectorAll(".detailed-activity-grid .activity-card");
    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const filter = this.dataset.filter;
            filterButtons.forEach(function (item) {
                item.classList.toggle("active", item === button);
            });
            activityCards.forEach(function (card) {
                card.hidden = filter !== "all" && card.dataset.category !== filter;
            });
        });
    });

    /* Photo viewer: click any activity photo to open it larger */
    const lightbox = document.createElement("div");
    lightbox.className = "photo-lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-label", "Activity photo viewer");
    lightbox.innerHTML = '<button type="button" aria-label="Close photo viewer" class="lightbox-close">&times;</button><img alt="Expanded activity photo">';
    document.body.appendChild(lightbox);
    const lightboxImage = lightbox.querySelector("img");
    function closeLightbox() { lightbox.classList.remove("open"); }
    document.querySelectorAll(".activity-gallery img").forEach(function (img) {
        img.addEventListener("click", function () {
            if (!img.complete || img.naturalWidth === 0) {
                alert("Add the real activity photo to this image path first.");
                return;
            }
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            lightbox.classList.add("open");
        });
    });
    lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") closeLightbox();
    });

    /* Contact demo form — this does not send an email */
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();
            if (!name || !email || !message) {
                alert("Please fill in all fields.");
                return;
            }
            alert("Thank you, " + name + "! This demo form does not send messages yet. Please contact me through LinkedIn or email.");
            contactForm.reset();
        });
    }
});
