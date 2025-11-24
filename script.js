// Navbar elevation on scroll
window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");
    if (!header) return;
    if (window.scrollY > 16) {
        header.classList.add("header--elevated");
    } else {
        header.classList.remove("header--elevated");
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

// Ripple effect on .btn
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

// Scroll reveal
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
