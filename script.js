/* =========================================================
   AYMEN BRAHIMI — CV / PORTFOLIO
   ========================================================= */


/* =========================
   ELEMENTS
========================= */

const body = document.body;
const themeToggle = document.querySelector("#theme-toggle");
const yearElement = document.querySelector("#current-year");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section");


/* =========================
   CURRENT YEAR
========================= */

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* =========================
   DARK / LIGHT MODE
========================= */

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    body.classList.add("dark");
}

updateThemeIcon();


themeToggle?.addEventListener("click", () => {

    body.classList.toggle("dark");

    const currentTheme = body.classList.contains("dark")
        ? "dark"
        : "light";

    localStorage.setItem("theme", currentTheme);

    updateThemeIcon();
});


function updateThemeIcon() {

    if (!themeToggle) return;

    if (body.classList.contains("dark")) {
        themeToggle.textContent = "☀";
        themeToggle.setAttribute(
            "aria-label",
            "Activer le mode clair"
        );
    } else {
        themeToggle.textContent = "☾";
        themeToggle.setAttribute(
            "aria-label",
            "Activer le mode sombre"
        );
    }

}


/* =========================
   ACTIVE NAVIGATION
========================= */

function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 160;

        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");
        }

    });


    navLinks.forEach((link) => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {
            link.classList.add("active");
        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);

updateActiveNavigation();


/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(
    ".section-header, " +
    ".skill-card, " +
    ".project-card, " +
    ".timeline-item, " +
    ".education-card, " +
    ".about-content"
);


revealElements.forEach((element) => {
    element.classList.add("reveal");
});


const revealObserver = new IntersectionObserver(

    (entries, observer) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

        });

    },

    {
        threshold: 0.12
    }

);


revealElements.forEach((element) => {
    revealObserver.observe(element);
});


/* =========================
   HEADER SHADOW
========================= */

const header = document.querySelector(".header");


function updateHeader() {

    if (!header) return;

    if (window.scrollY > 20) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

}


window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);

updateHeader();


/* =========================
   SMOOTH INTERNAL LINKS
========================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId = link.getAttribute("href");

        if (
            !targetId ||
            targetId === "#"
        ) {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});