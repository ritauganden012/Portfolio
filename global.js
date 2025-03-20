/// STEP 1: Confirm script is running
console.log("IT’S ALIVE!");

// Utility function to select multiple elements
function $$(selector, context = document) {
    return Array.from(context.querySelectorAll(selector));
}

// STEP 3.1: Define navigation links
const pages = [
    { url: "", title: "Home" },
    { url: "Projects/", title: "Projects" },
    { url: "Contact/", title: "Contact" },
    { url: "Resume/", title: "Resume" },
    { url: "https://github.com/ritauganden012", title: "GitHub" }
];

// STEP 3.2: Detect if we are on the home page
const ARE_WE_HOME = document.documentElement.classList.contains("home");

// Create the `<nav>` element
let nav = document.createElement("nav");
nav.setAttribute("aria-label", "Main navigation");

// Create the `<ul>` element for the links
let ul = document.createElement("ul");
ul.classList.add("nav-links");

// Loop through `pages` and generate list items `<li>`
for (let p of pages) {
    let url = p.url;
    let title = p.title;

    // Correct relative URL handling for subpages
    if (!ARE_WE_HOME && !url.startsWith("http")) {
        url = `/${url}`; // Ensure correct relative path
    }

    let li = document.createElement("li");
    let a = document.createElement("a");
    a.href = url;
    a.textContent = title;

    // Highlight active page
    if (a.host === location.host && a.pathname === location.pathname) {
        a.classList.add("current");
    }

    // Open external links in new tab
    if (a.host !== location.host){a.target = "_blank"}


    li.appendChild(a);
    ul.appendChild(li);
}

// Append `<ul>` to `<nav>`
nav.appendChild(ul);

// STEP 3.3: Select or create `<header>` and append `<nav>`
let header = document.querySelector("header");

if (!header) {
    header = document.createElement("header");
    document.body.prepend(header); // Insert `<header>` at the top of `<body>`
}

header.appendChild(nav);

//
// Add Theme Switcher Dropdown
document.body.insertAdjacentHTML("afterbegin", `
    <label class="color-scheme">
        Theme:
        <select id="theme-selector">
            <option value="auto">Auto (System Default)</option>
            <option value="dark">Dark Mode</option>
            <option value="light">Light Mode</option>
        </select>
    </label>
`);

const themeSelect = document.querySelector("#theme-selector");

// Function to update theme
function updateTheme(theme) {
    document.body.classList.remove("light-mode", "dark-mode");

    if (theme === "dark") {
        document.body.classList.add("dark-mode");
    } else if (theme === "light") {
        document.body.classList.add("light-mode");
    } else {
        // Auto mode (system preference)
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.add("light-mode");
        }
    }

    // Save theme to localStorage
    localStorage.setItem("theme", theme);
}

// Change theme on dropdown selection
themeSelect.addEventListener("change", function (event) {
    updateTheme(event.target.value);
});

// Load saved theme or use system preference
const savedTheme = localStorage.getItem("theme") || "auto";
themeSelect.value = savedTheme;
updateTheme(savedTheme);

// Listen for system preference changes (Auto Mode)
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (localStorage.getItem("theme") === "auto") {
        updateTheme("auto");
    }
});
///////Assignment4  Tableau Integration ///////
var divElement = document.getElementById('vizContainer');
var vizElement = divElement.getElementsByTagName('object')[0];
vizElement.style.width = '100%';
vizElement.style.height = (divElement.offsetWidth * 0.75) + 'px';

var scriptElement = document.createElement('script');
scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
vizElement.parentNode.insertBefore(scriptElement, vizElement);

//////////////////////////////////////////////////////////////////////////////////////////////////////
