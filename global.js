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
    if (!url.startsWith("/") && !url.startsWith("index.html")) {
        a.target = "_blank";
    }

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
// STEP 4: Add Theme Switcher
//
document.body.insertAdjacentHTML("afterbegin", `
    <label class="color-scheme">
        Theme:
        <select id="theme-switcher">
            <option value="light dark">Auto (System Default)</option>
            <option value="dark">Dark Mode</option>
            <option value="light">Light Mode</option>
        </select>
    </label>
`);

// STEP 4.4: Add theme switcher logic
let select = document.querySelector("#theme-switcher");

select.addEventListener("input", function (event) {
    console.log("Color scheme changed to", event.target.value);
    document.documentElement.style.setProperty("color-scheme", event.target.value);

    // Save to localStorage
    localStorage.setItem("colorScheme", event.target.value);
});

// STEP 4.5: Load saved theme on page load
if (localStorage.getItem("colorScheme")) {
    let savedTheme = localStorage.getItem("colorScheme");
    document.documentElement.style.setProperty("color-scheme", savedTheme);
    select.value = savedTheme; // Keep the dropdown in sync
}

// STEP 5 (Optional): Form Handling for Contact Page
if (document.querySelector("form")) {
    let form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        let data = new FormData(form);

        let url = form.action + "?";
        for (let [name, value] of data) {
            url += encodeURIComponent(name) + "=" + encodeURIComponent(value) + "&";
            console.log(name, value);
        }

        // Open URL (simulate form submission)
        window.location.href = url;
    });
}


//////////////////////////////////////////////////////////////////////////////////////////////////////
