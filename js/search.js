"use strict";

/* =========================================================
   SEARCH — searches the product list and site pages.
   Pressing Enter jumps to the best match; suggestions appear
   in the browser's built-in dropdown while typing.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.querySelector(".search-button");
    const searchContainer = document.querySelector(".search-container");
    const searchInput = document.querySelector("#site-search");
    const message = document.querySelector("#search-message");
    const suggestions = document.querySelector("#site-search-list");

    if (!searchButton || !searchContainer || !searchInput) return;

    const categories = window.DAWOBAZ_CATEGORIES || {};
    const products = window.DAWOBAZ_PRODUCTS || [];

    /* Pages people can search for (add keywords here). */
    const pages = [
        { title: "Recital Shirts", keywords: ["recital", "recital shirt", "recital shirts", "tee", "tank"], href: "recital.html" },
        { title: "Custom Apparel", keywords: ["apparel", "custom apparel", "shirt", "shirts", "hoodie", "sweatshirt"], href: "apparel.html" },
        { title: "Dance Bags", keywords: ["bag", "bags", "dance bag", "duffel", "backpack"], href: "bags.html" },
        { title: "Team Jackets", keywords: ["jacket", "jackets", "team jacket", "windbreaker"], href: "jackets.html" },
        { title: "Bling & Crystals", keywords: ["bling", "rhinestone", "rhinestones", "crystal"], href: "bling.html" },
        { title: "Holiday Designs", keywords: ["holiday", "christmas", "seasonal"], href: "holiday.html" },
        { title: "Studio Logos", keywords: ["logo", "logos", "studio logo"], href: "studio-logos.html" },
        { title: "Studio Store", keywords: ["studio store", "online store", "store"], href: "studio-store.html" },
        { title: "Custom Design / Request Artwork", keywords: ["artwork", "request artwork", "design", "custom design"], href: "custom-design.html" },
        { title: "Request a Size Run", keywords: ["size run", "sizing", "sizes"], href: "size-runs.html" },
        { title: "Delivery Information", keywords: ["delivery", "shipping", "ship"], href: "delivery.html" },
        { title: "Start an Order / Cart", keywords: ["order", "start an order", "cart", "checkout"], href: "order.html" },
        { title: "Contact Us", keywords: ["contact", "email", "phone", "address"], href: "contact.html" },
        { title: "About Us", keywords: ["about", "who", "story"], href: "about.html" }
    ];

    const index = [];
    pages.forEach((p) => index.push({ label: p.title, terms: p.keywords.concat(p.title.toLowerCase()), href: p.href }));
    products.forEach((p) => {
        const cat = categories[p.category];
        if (!cat) return;
        index.push({ label: p.name, terms: [p.name.toLowerCase()], href: p.category === "logos" ? "studio-logos.html" : p.category + ".html" });
    });

    if (suggestions) {
        suggestions.innerHTML = index
            .map((item) => '<option value="' + item.label.replace(/"/g, "&quot;") + '"></option>')
            .join("");
    }

    function setOpen(open) {
        searchContainer.classList.toggle("active", open);
        searchButton.setAttribute("aria-expanded", String(open));
        if (open) searchInput.focus();
        if (!open && message) message.textContent = "";
    }

    searchButton.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        setOpen(!searchContainer.classList.contains("active"));
    });

    searchContainer.addEventListener("click", (event) => event.stopPropagation());
    document.addEventListener("click", () => setOpen(false));
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") setOpen(false);
    });

    searchInput.addEventListener("keydown", (event) => {
        if (event.key !== "Enter") return;
        event.preventDefault();

        const term = searchInput.value.trim().toLowerCase();
        if (!term) return;

        /* exact label first, then any term contained in / containing the search */
        const result =
            index.find((item) => item.label.toLowerCase() === term) ||
            index.find((item) => item.terms.some((t) => term.includes(t) || t.includes(term)));

        if (result) {
            window.location.href = result.href;
        } else if (message) {
            message.textContent = 'No results for "' + searchInput.value + '". Try "recital", "bags" or "jackets".';
        }
    });
});
