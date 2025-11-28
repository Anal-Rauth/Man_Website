// ======================
// NAVBAR BEHAVIOUR
// ======================

// Navbar elevation on scroll
window.addEventListener("scroll", () => {
    const headerEl = document.querySelector(".header");
    if (!headerEl) return;
    if (window.scrollY > 16) {
        headerEl.classList.add("header--elevated");
    } else {
        headerEl.classList.remove("header--elevated");
    }
});

// Elements
const header = document.querySelector(".header");
const toggleBtn = document.querySelector(".navbar__toggle");
const menu = document.querySelector(".navbar__menu");
const actions = document.querySelector(".navbar__actions");

// Mobile menu toggle (add/remove header--menu-open)
if (toggleBtn && header && menu && actions) {
    toggleBtn.addEventListener("click", () => {
        header.classList.toggle("header--menu-open");
    });
}

// Close mobile menu on nav link click
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("navbar__link")) {
        header?.classList.remove("header--menu-open");
    }
});

// ======================
// BUTTON RIPPLE EFFECT
// ======================

document.addEventListener("click", function (e) {
    const target = e.target.closest(".btn");
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");

    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = e.clientX - rect.left - size / 2 + "px";
    ripple.style.top = e.clientY - rect.top - size / 2 + "px";

    target.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
});

// ======================
// SCROLL REVEAL
// ======================

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal--visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15,
    }
);

revealElements.forEach((el) => observer.observe(el));

// ======================
// HERO IMAGE SLIDER
// ======================

const heroImg = document.getElementById("heroBannerImage");
const heroPrev = document.querySelector(".hero-banner__arrow--left");
const heroNext = document.querySelector(".hero-banner__arrow--right");

// IMPORTANT: make sure these filenames exactly match your /images folder
const heroImages = [
    "images/Industrial project1.jpg",
    "images/Industrial project2.jpg",
    "images/Industrial project3.jpg",
    "images/Industrial project4.jpg"
];

let heroIndex = 0;

function setHeroImage(index) {
    if (!heroImg) return;
    heroImg.src = heroImages[index];
}

// Manual controls (arrows)
if (heroPrev) {
    heroPrev.addEventListener("click", () => {
        heroIndex = (heroIndex - 1 + heroImages.length) % heroImages.length;
        setHeroImage(heroIndex);
    });
}

if (heroNext) {
    heroNext.addEventListener("click", () => {
        heroIndex = (heroIndex + 1) % heroImages.length;
        setHeroImage(heroIndex);
    });
}

// Auto-slide every 4 seconds
if (heroImg) {
    setHeroImage(heroIndex); // ensure first image is set from the array

    setInterval(() => {
        heroIndex = (heroIndex + 1) % heroImages.length;
        setHeroImage(heroIndex);
    }, 4000);
}
