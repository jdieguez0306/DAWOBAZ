"use strict";

/* =========================================================
   SHARED LAYOUT — the announcement bar, header and footer are
   defined ONCE here and injected into every page.
   To change the menu, phone number, address, etc. edit this file.

   Each page just needs:
     <div id="site-header"></div> ... <div id="site-footer"></div>
     <script src="js/layout.js"></script>   (at the end of <body>)
   ========================================================= */

(function () {
    const SOCIAL = {
        facebook: "#",   // TODO: put the real Facebook page URL here
        instagram: "#"   // TODO: put the real Instagram URL here
    };

    /* Order Guide + Name Guide still live on the old site until they are rebuilt. */
    const LEGACY = "https://www.dawobaz.com/";

    const shopLinks = [
        ["Recital Shirts", "recital.html"],
        ["Custom Apparel", "apparel.html"],
        ["Dance Bags", "bags.html"],
        ["Team Jackets", "jackets.html"],
        ["Bling", "bling.html"],
        ["Holiday Designs", "holiday.html"]
    ];

    const orderLinks = [
        ["Order Guide", LEGACY + "orderguide_dawobaz.html"],
        ["Name Guide", LEGACY + "nameguide_dawobaz.html"],
        ["Request Artwork", "custom-design.html"],
        ["Request a Size Run", "size-runs.html"],
        ["Start an Order", "order.html"]
    ];

    const page = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();

    function isActive(href) {
        return href.toLowerCase() === page ? " active" : "";
    }

    function dropdown(label, links, id) {
        const anyActive = links.some((l) => l[1].toLowerCase() === page);
        return (
            '<div class="nav-dropdown">' +
            '<button class="dropdown-toggle' + (anyActive ? " active" : "") + '" type="button" aria-expanded="false" aria-haspopup="true" aria-controls="' + id + '">' +
            label + ' <i class="fa-solid fa-chevron-down" aria-hidden="true"></i></button>' +
            '<div class="dropdown-menu" id="' + id + '">' +
            links.map((l) => '<a href="' + l[1] + '">' + l[0] + "</a>").join("") +
            "</div></div>"
        );
    }

    const headerHtml =
        '<a class="skip-link" href="#main">Skip to main content</a>' +
        '<div class="announcement-bar"><div class="announcement-inner">' +
        "<p>Custom dance apparel, recital shirts, bags, jackets &amp; more <span>|</span> Call " +
        '<a href="tel:8126637679">812-663-7679</a></p>' +
        '<div class="announcement-social">' +
        '<a href="' + SOCIAL.facebook + '" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>' +
        '<a href="' + SOCIAL.instagram + '" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>' +
        "</div></div></div>" +
        '<header class="site-header"><div class="header-inner">' +
        '<a class="logo" href="index.html" aria-label="DAWOBAZ home"><img src="images/logo/dawobaz-logo.png" alt="DAWOBAZ logo" width="175" height="175"></a>' +
        '<button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="main-nav"><i class="fa-solid fa-bars"></i></button>' +
        '<nav class="main-nav" id="main-nav" aria-label="Main navigation">' +
        '<a href="index.html" class="' + isActive("index.html").trim() + '">Home</a>' +
        dropdown("Shop", shopLinks, "menu-shop") +
        '<a href="studio-store.html" class="' + isActive("studio-store.html").trim() + '">Studio Store</a>' +
        dropdown("How To Order", orderLinks, "menu-order") +
        '<a href="custom-design.html" class="' + isActive("custom-design.html").trim() + '">Custom Design</a>' +
        '<a href="contact.html" class="' + isActive("contact.html").trim() + '">Contact Us</a>' +
        "</nav>" +
        '<div class="header-actions">' +
        '<button class="search-button" type="button" aria-label="Open search" aria-expanded="false" aria-controls="site-search-container"><i class="fa-solid fa-magnifying-glass"></i></button>' +
        '<a class="cart-link" href="order.html" aria-label="Shopping cart"><i class="fa-solid fa-bag-shopping"></i><span class="cart-count">0</span></a>' +
        '<div class="search-container" id="site-search-container">' +
        '<label class="sr-only" for="site-search">Search the website</label>' +
        '<input type="search" id="site-search" placeholder="Search products..." autocomplete="off" list="site-search-list">' +
        '<datalist id="site-search-list"></datalist>' +
        '<p class="search-message" id="search-message" role="status" aria-live="polite"></p>' +
        "</div></div></div></header>";

    const footerHtml =
        '<footer class="site-footer"><div class="footer-grid">' +
        '<div class="footer-brand">' +
        '<a class="footer-logo" href="index.html"><img src="images/logo/dawobaz-logo.png" alt="DAWOBAZ" width="130" height="130" loading="lazy"></a>' +
        "<p>Dance World Bazaar</p>" +
        "<address>1553 Commerce East Drive<br>Greensburg, IN 47240</address>" +
        '<a href="mailto:orders@dawobaz.com">orders@dawobaz.com</a>' +
        '<a class="footer-phone" href="tel:8126637679">812-663-7679</a>' +
        '<div class="footer-social">' +
        '<a href="' + SOCIAL.facebook + '" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>' +
        '<a href="' + SOCIAL.instagram + '" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>' +
        "</div></div>" +
        '<div class="footer-column"><h3>Quick Links</h3>' +
        '<a href="index.html">Home</a><a href="recital.html">Recital Shirts</a><a href="studio-logos.html">Studio Logos</a>' +
        '<a href="apparel.html">Apparel</a><a href="bags.html">Bags</a><a href="jackets.html">Jackets</a></div>' +
        '<div class="footer-column"><h3>Helpful Info</h3>' +
        '<a href="studio-store.html">Studio Store</a><a href="bling.html">Bling</a><a href="holiday.html">Holiday</a>' +
        '<a href="delivery.html">Delivery Information</a><a href="size-runs.html">Size Run Request</a>' +
        '<a href="about.html">About Us</a><a href="contact.html">Contact Us</a></div>' +
        '<div class="footer-newsletter"><h3>Newsletter</h3>' +
        "<p>Sign up for updates, new products, and special offers!</p>" +
        '<form class="newsletter-form" data-form="newsletter" novalidate>' +
        '<label class="sr-only" for="newsletter-email">Email address</label>' +
        '<input id="newsletter-email" name="email" type="email" placeholder="Enter your email" required autocomplete="email">' +
        '<input type="text" name="website" class="hp-field" tabindex="-1" autocomplete="off" aria-hidden="true">' +
        '<button type="submit">Sign Up</button>' +
        '<p class="form-status" role="status" aria-live="polite"></p></form></div>' +
        "</div>" +
        '<p class="copyright">&copy; ' + new Date().getFullYear() + " Dance World Bazaar. All rights reserved.</p></footer>";

    const headerHost = document.getElementById("site-header");
    const footerHost = document.getElementById("site-footer");
    if (headerHost) headerHost.outerHTML = headerHtml;
    if (footerHost) footerHost.outerHTML = footerHtml;

    /* ---------- menu behaviour ---------- */

    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".main-nav");
    const dropdowns = Array.from(document.querySelectorAll(".nav-dropdown"));

    function closeDropdowns(except) {
        dropdowns.forEach((d) => {
            if (d === except) return;
            d.classList.remove("open");
            d.querySelector(".dropdown-toggle").setAttribute("aria-expanded", "false");
        });
    }

    dropdowns.forEach((d) => {
        const toggle = d.querySelector(".dropdown-toggle");
        toggle.addEventListener("click", (event) => {
            event.stopPropagation();
            const open = !d.classList.contains("open");
            closeDropdowns(open ? d : null);
            d.classList.toggle("open", open);
            toggle.setAttribute("aria-expanded", String(open));
        });
    });

    if (menuToggle && nav) {
        menuToggle.addEventListener("click", (event) => {
            event.stopPropagation();
            const open = nav.classList.toggle("nav-open");
            menuToggle.setAttribute("aria-expanded", String(open));
            menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
            menuToggle.firstElementChild.className = open ? "fa-solid fa-xmark" : "fa-solid fa-bars";
        });
    }

    document.addEventListener("click", (event) => {
        if (!event.target.closest(".nav-dropdown")) closeDropdowns(null);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") return;
        closeDropdowns(null);
        if (nav && nav.classList.contains("nav-open")) menuToggle.click();
    });

    document.dispatchEvent(new CustomEvent("layout:ready"));
})();
