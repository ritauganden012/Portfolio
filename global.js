// Shared header and footer for every page on ritauganden.com
const EMAIL = "rita.uganden@outlook.com";
const LINKEDIN = ""; // add the LinkedIn profile URL here to show LinkedIn links

const pages = [
  { url: "/Projects/", title: "Work" },
  { url: "/Resume/", title: "Résumé" },
  { url: "/Contact/", title: "Contact" },
];

// Header
const header = document.createElement("header");
header.className = "site-header";

const home = document.createElement("a");
home.href = "/";
home.className = "home-link";
home.textContent = "Rita Uganden-Teryila";
header.appendChild(home);

const nav = document.createElement("nav");
nav.setAttribute("aria-label", "Main");
const ul = document.createElement("ul");
ul.className = "nav-links";
for (const p of pages) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = p.url;
  a.textContent = p.title;
  if (location.pathname.toLowerCase().startsWith(p.url.toLowerCase())) {
    a.classList.add("current");
    a.setAttribute("aria-current", "page");
  }
  li.appendChild(a);
  ul.appendChild(li);
}
nav.appendChild(ul);
header.appendChild(nav);
document.body.prepend(header);

// Footer
const footer = document.createElement("footer");
footer.className = "site-footer";
const year = new Date().getFullYear();
const links = [`<a href="mailto:${EMAIL}">Email</a>`];
if (LINKEDIN) links.push(`<a href="${LINKEDIN}" target="_blank" rel="noopener noreferrer">LinkedIn</a>`);
links.push(`<a href="https://github.com/ritauganden012" target="_blank" rel="noopener noreferrer">GitHub</a>`);
footer.innerHTML = `<span>© ${year} Rita Uganden-Teryila</span><span>${links.join(' <span class="sep" aria-hidden="true">·</span> ')}</span>`;
document.body.appendChild(footer);

// LinkedIn links on the page stay hidden until a URL is set above
document.querySelectorAll("[data-linkedin]").forEach((wrap) => {
  if (!LINKEDIN) return;
  const a = wrap.querySelector("a");
  if (a) a.href = LINKEDIN;
  wrap.hidden = false;
});

// Carousel arrows
document.querySelectorAll("[data-carousel]").forEach((wrap) => {
  const track = wrap.querySelector(".track");
  wrap.querySelectorAll("[data-dir]").forEach((btn) => {
    btn.addEventListener("click", () => {
      track.scrollBy({ left: Number(btn.dataset.dir) * 300, behavior: "smooth" });
    });
  });
});
