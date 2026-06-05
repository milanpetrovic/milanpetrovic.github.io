// Self-host Instrument Sans (variable) via Fontsource
import "@fontsource-variable/instrument-sans";
// Styles (Tailwind v4 + theme + components)
import "./style.css";

/* Lightweight, dependency-free interactions
   (scroll reveals, active nav, back-to-top) */
const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

/* ---- Scroll-in reveals ---- */
const animated = Array.from(
    document.querySelectorAll("[data-animate], [data-stagger]")
);

function reveal(el) {
    el.classList.add("in");
    if (el.hasAttribute("data-stagger")) {
        Array.from(el.children).forEach((kid, i) => {
            kid.style.transitionDelay = `${i * 45}ms`;
        });
    }
}

if (prefersReduced || !("IntersectionObserver" in window)) {
    animated.forEach(reveal);
} else {
    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    reveal(entry.target);
                    io.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    animated.forEach((el) => io.observe(el));
}

/* ---- Active nav link on scroll ---- */
const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
const sections = navLinks
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

if ("IntersectionObserver" in window && sections.length) {
    const navIO = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                navLinks.forEach((a) => {
                    const match = a.getAttribute("href") === `#${entry.target.id}`;
                    a.style.background = match ? "var(--color-cream-100)" : "";
                    a.style.color = match ? "var(--color-stone-900)" : "";
                });
            });
        },
        { threshold: 0.5 }
    );
    sections.forEach((s) => navIO.observe(s));
}

/* ---- Theme toggle (light / dark) ---- */
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
    const root = document.documentElement;
    const sync = () => {
        themeToggle.setAttribute(
            "aria-checked",
            String(root.getAttribute("data-theme") === "dark")
        );
    };
    sync();
    themeToggle.addEventListener("click", () => {
        const isDark = root.getAttribute("data-theme") === "dark";
        if (isDark) root.removeAttribute("data-theme");
        else root.setAttribute("data-theme", "dark");
        try {
            localStorage.setItem("theme", isDark ? "light" : "dark");
        } catch (e) {}
        sync();
    });
}

/* ---- Back to top ---- */
const toTop = document.getElementById("toTop");
if (toTop) {
    window.addEventListener(
        "scroll",
        () => {
            toTop.classList.toggle("show", window.scrollY > 600);
        },
        { passive: true }
    );
    toTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
    });
}
