const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");
const header = document.querySelector(".site-header");

menuBtn?.addEventListener("click", () => {
  const open = nav?.classList.toggle("open") ?? false;
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.textContent = open ? "×" : "☰";
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav?.classList.remove("open");
    menuBtn?.setAttribute("aria-expanded", "false");
    if (menuBtn) menuBtn.textContent = "☰";
  });
});

window.addEventListener("scroll", () => {
  header?.classList.toggle("scrolled", window.scrollY > 12);
}, { passive: true });

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = document.querySelectorAll(
  ".flagship-card, .project-card, .service-card, .process-grid article, .skill, .about-card, .pricing-box"
);

if (!reduceMotion && "IntersectionObserver" in window) {
  revealItems.forEach(item => item.classList.add("reveal"));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  revealItems.forEach(item => observer.observe(item));
}

// Lightweight 3D tilt. No framework/CDN required, so it remains GitHub Pages friendly.
if (!reduceMotion && window.matchMedia("(pointer:fine)").matches) {
  document.querySelectorAll(".tilt-card").forEach(card => {
    card.addEventListener("pointermove", e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      card.style.setProperty("--ry", `${x * 5}deg`);
      card.style.setProperty("--rx", `${y * -5}deg`);
    });
    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--ry", "0deg");
      card.style.setProperty("--rx", "0deg");
    });
  });
}
