/* ==========================================================================
   INIT ICONS
   ========================================================================== */
if (window.lucide) lucide.createIcons();

/* ==========================================================================
   PRELOADER
   ========================================================================== */
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  setTimeout(() => preloader.classList.add("done"), 400);
});

/* ==========================================================================
   YEAR IN FOOTER
   ========================================================================== */
document.getElementById("year").textContent = new Date().getFullYear();

/* ==========================================================================
   CURSOR GLOW (follows mouse, desktop only)
   ========================================================================== */
const glow = document.getElementById("cursorGlow");
if (glow && window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener("mousemove", (e) => {
    glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
  });
}

/* ==========================================================================
   NAVBAR: scrolled state + active link + mobile toggle
   ========================================================================== */
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const navLinkEls = document.querySelectorAll(".nav-link");
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
  backToTop.classList.toggle("show", window.scrollY > 500);
});

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinks.classList.toggle("open");
});

navLinkEls.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
  });
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Active link on scroll
const sections = document.querySelectorAll("section[id]");
const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinkEls.forEach((link) => {
          link.classList.toggle("active-link", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((sec) => navObserver.observe(sec));

/* ==========================================================================
   SCROLL REVEAL
   ========================================================================== */
const revealEls = document.querySelectorAll(".reveal-up");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));
} else {
  // Very old browsers without IntersectionObserver: just show everything.
  revealEls.forEach((el) => el.classList.add("in-view"));
}

/* ==========================================================================
   TYPING EFFECT (hero role line)
   ========================================================================== */
const roles = [
  "Artificial Intelligence Enthusiast",
  "Machine Learning Practitioner",
  "Deep Learning Explorer",
  "Computer Vision Researcher",
  "Data Science Aspirant",
];
const typedEl = document.getElementById("typedText");
let roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  const current = roles[roleIndex];
  if (!deleting) {
    charIndex++;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex--;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 40 : 80);
}
typeLoop();

// 


/* ==========================================================================
   VANTA.NET BACKGROUND (hero section)
   Uses the Vanta.js "NET" effect (loaded via CDN in index.html, right above
   this script). This gives the exact flowing, triangulated node-mesh look
   from the reference video, including built-in mouse-follow behavior.
   ========================================================================== */
if (window.VANTA) {
  VANTA.NET({
    el: "#neuralCanvas",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    scaleMobile: 1.0,
    color: 0x2b2d33,          // node/line color (matches --primary)
    backgroundColor: 0xffffff, // matches --bg
    points: 11.0,              // node density
    maxDistance: 22.0,         // how far apart nodes can be and still connect
    spacing: 17.0,
  });
}



/* ==========================================================================
   CONTACT FORM (uses formsubmit.co — see SETUP_GUIDE.md to configure)
   ========================================================================== */
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");
if (contactForm) {
  contactForm.addEventListener("submit", () => {
    formNote.textContent = "Sending...";
  });
}
