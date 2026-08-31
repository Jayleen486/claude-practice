// Mobile navigation toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Accordion: expand/collapse experience detail panels
document.querySelectorAll(".accordion-toggle").forEach((btn) => {
  const panel = document.getElementById(btn.getAttribute("aria-controls"));
  if (!panel) return;

  btn.addEventListener("click", () => {
    const isOpen = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!isOpen));
    btn.classList.toggle("is-open", !isOpen);
    panel.hidden = isOpen;
  });
});

// Auto-update footer year
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Scrollspy: highlight active nav link based on visible section
const sections = document.querySelectorAll("main section[id]");
const navAnchors = document.querySelectorAll("[data-nav]");

if (sections.length && navAnchors.length) {
  const setActive = (id) => {
    navAnchors.forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}
