/* =========================================================
   ELEMENTS
========================================================= */

const body =
    document.body;

const themeToggle =
    document.querySelector("#theme-toggle");

const yearElement =
    document.querySelector("#current-year");

const navLinks =
    document.querySelectorAll(".nav-links a");

const sections =
    document.querySelectorAll(
        "main > section:not(.print-cv)"
    );

const header =
    document.querySelector(".header");

const downloadPdfButton =
    document.querySelector("#download-pdf");


/* =========================================================
   ANNÉE
========================================================= */

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================================================
   DARK MODE
========================================================= */

const savedTheme =
    localStorage.getItem("theme");


if (savedTheme === "dark") {

    body.classList.add("dark");

}


updateThemeIcon();


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            body.classList.toggle("dark");


            const currentTheme =
                body.classList.contains("dark")
                    ? "dark"
                    : "light";


            localStorage.setItem(
                "theme",
                currentTheme
            );


            updateThemeIcon();

        }
    );

}


function updateThemeIcon() {

    if (!themeToggle) {
        return;
    }


    if (body.classList.contains("dark")) {

        themeToggle.textContent =
            "☀";

        themeToggle.setAttribute(
            "aria-label",
            "Activer le mode clair"
        );

    } else {

        themeToggle.textContent =
            "☾";

        themeToggle.setAttribute(
            "aria-label",
            "Activer le mode sombre"
        );

    }

}


/* =========================================================
   NAVIGATION ACTIVE
========================================================= */

function updateActiveNavigation() {

    let currentSection = "home";


    sections.forEach(
        (section) => {

            const sectionTop =
                section.offsetTop - 180;


            if (
                window.scrollY >=
                sectionTop
            ) {

                currentSection =
                    section.id;

            }

        }
    );


    navLinks.forEach(
        (link) => {

            link.classList.remove(
                "active"
            );


            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {

                link.classList.add(
                    "active"
                );

            }

        }
    );

}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    {
        passive: true
    }
);


updateActiveNavigation();


/* =========================================================
   HEADER AU SCROLL
========================================================= */

function updateHeader() {

    if (!header) {
        return;
    }


    if (window.scrollY > 20) {

        header.classList.add(
            "scrolled"
        );

    } else {

        header.classList.remove(
            "scrolled"
        );

    }

}


window.addEventListener(
    "scroll",
    updateHeader,
    {
        passive: true
    }
);


updateHeader();


/* =========================================================
   ANIMATIONS AU SCROLL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".section-header, " +
        ".skill-card, " +
        ".project-card, " +
        ".timeline-item, " +
        ".education-card, " +
        ".about-content"
    );


revealElements.forEach(
    (element) => {

        element.classList.add(
            "reveal"
        );

    }
);


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(

            (entries, observer) => {

                entries.forEach(
                    (entry) => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        entry.target.classList.add(
                            "visible"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }
                );

            },

            {
                threshold: 0.12
            }

        );


    revealElements.forEach(
        (element) => {

            revealObserver.observe(
                element
            );

        }
    );

} else {

    revealElements.forEach(
        (element) => {

            element.classList.add(
                "visible"
            );

        }
    );

}


/* =========================================================
   NAVIGATION FLUIDE
========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(
        (link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        }
    );


/* =========================================================
   GÉNÉRATION DU PDF
========================================================= */

if (downloadPdfButton) {

    downloadPdfButton.addEventListener(
        "click",
        () => {

            /*
             Ouvre la fenêtre d'impression.
             Le CSS @media print remplace
             automatiquement le portfolio
             par le CV A4.
            */

            window.print();

        }
    );

}