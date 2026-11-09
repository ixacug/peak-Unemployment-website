/* ============ EDIT THIS SECTION ============ */
const CONFIG = {
  whatsappNumber: "256700000000",      // country code + number, no + or spaces
  email: "hello@fourframes.example"    // used if WhatsApp can't open
};

/* Your portfolio. Add one line per video.
   link: YouTube / Vimeo / Instagram URL of the video
   from/to: two colours for the tile background (used until you add a thumbnail)
   image: optional, e.g. "images/wedding.jpg" */
const WORK = [
  { title: "Project title one",   kind: "Commercial",  link: "#", from: "#2b5876", to: "#10202e" },
  { title: "Project title two",   kind: "Documentary", link: "#", from: "#c8452c", to: "#3a1a14" },
  { title: "Project title three", kind: "Social",      link: "#", from: "#f4b52c", to: "#6b4a06" },
  { title: "Project title four",  kind: "Event",       link: "#", from: "#3b7a6a", to: "#10202e" }
];
/* ============================================ */

/* Footer year */
document.getElementById("year").textContent = new Date().getFullYear();

/* Mobile menu */
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
}));

/* Hero timecode (runs while the tab is visible) */
const tc = document.getElementById("timecode");
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduce) {
  const start = performance.now();
  const pad = n => String(n).padStart(2, "0");
  (function tick() {
    const t = (performance.now() - start) / 1000;
    const frames = Math.floor((t % 1) * 25);
    tc.textContent = `${pad(Math.floor(t / 3600))}:${pad(Math.floor(t / 60) % 60)}:${pad(Math.floor(t) % 60)}:${pad(frames)}`;
    requestAnimationFrame(tick);
  })();
}

/* Build portfolio tiles */
const grid = document.getElementById("workGrid");
WORK.forEach(w => {
  const a = document.createElement("a");
  a.className = "work-item";
  a.href = w.link;
  if (w.link !== "#") { a.target = "_blank"; a.rel = "noopener"; }
  const bg = w.image
    ? `url("${w.image}") center/cover`
    : `linear-gradient(135deg, ${w.from}, ${w.to})`;
  a.style.setProperty("--g", bg);
  a.innerHTML = `<span class="work-play" aria-hidden="true"></span>
    <span class="work-info"><strong></strong><span></span></span>`;
  a.querySelector("strong").textContent = w.title;
  a.querySelector(".work-info span").textContent = w.kind;
  a.setAttribute("aria-label", `Watch ${w.title}`);
  grid.appendChild(a);
});

/* Contact form: opens WhatsApp with the message filled in */
const form = document.getElementById("contactForm");
const err = document.getElementById("formError");
form.addEventListener("submit", e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(form));
  if (!d.name.trim() || !d.contact.trim() || !d.message.trim()) {
    err.textContent = "Please fill in your name, how to reach you, and a few words about the project.";
    return;
  }
  err.textContent = "";
  const text = `Hi Four Frames, I'm ${d.name.trim()}.\nProject: ${d.type}\n${d.message.trim()}\nReach me on: ${d.contact.trim()}`;
  const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
  const win = window.open(url, "_blank", "noopener");
  if (!win) {
    window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent("Project enquiry: " + d.type)}&body=${encodeURIComponent(text)}`;
  }
});
