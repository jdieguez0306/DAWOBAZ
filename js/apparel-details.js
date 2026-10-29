"use strict";

/* =========================================================
   APPAREL DETAIL PAGE  (apparel-details.html?item=<id>)

   One page shows every apparel item. The item comes from the link,
   e.g.  apparel-details.html?item=app-tshirt  (ids are in js/products.js).

   ---------------------------------------------------------
   HOW TO FILL IN AN ITEM  (edit the block below)
   ---------------------------------------------------------
     summary  one or two sentences about the item
     fabric   e.g. "100% cotton, 5.3 oz"
     fit      e.g. "Unisex, relaxed fit"
     colors   list, e.g. ["Black", "White", "Pink"]
     sizes    list, e.g. ["Youth S", "Youth M", "Adult S", "Adult M"]
     imprint  leave "" to use the section's size from the apparel page
              (The Basics 10.5" wide, Fitted 8" wide)
     notes    list of extra bullet points, e.g. ["Names available on the back"]
     images   extra photos, e.g. ["images/apparel/tshirt_back.jpg"]

   Anything left empty shows a "Details coming soon" placeholder.
   If you fill in sizes and/or colors, dropdowns appear automatically and
   the customer's choices are added to their order list.
   ========================================================= */

window.DAWOBAZ_APPAREL_DETAILS = {
    "app-tshirt": {   // T-Shirt
        summary: "",
        fabric: "",
        fit: "",
        colors: [],
        sizes: [],
        imprint: "",
        notes: [],
        images: []
    },
    "app-comfy-t": {   // Comfy T
        summary: "",
        fabric: "",
        fit: "",
        colors: [],
        sizes: [],
        imprint: "",
        notes: [],
        images: []
    },
    "app-long-sleeve": {   // Long Sleeve T
        summary: "",
        fabric: "",
        fit: "",
        colors: [],
        sizes: [],
        imprint: "",
        notes: [],
        images: []
    },
    "app-ladies-v": {   // Ladies V-Neck
        summary: "",
        fabric: "",
        fit: "",
        colors: [],
        sizes: [],
        imprint: "",
        notes: [],
        images: []
    },
    "app-ladies-tank": {   // Ladies Tank
        summary: "",
        fabric: "",
        fit: "",
        colors: [],
        sizes: [],
        imprint: "",
        notes: [],
        images: []
    },
    "app-tiedye": {   // Tie Dye T
        summary: "",
        fabric: "",
        fit: "",
        colors: [],
        sizes: [],
        imprint: "",
        notes: [],
        images: []
    },
    "app-baseball-jersey": {   // Baseball Jersey
        summary: "",
        fabric: "",
        fit: "",
        colors: [],
        sizes: [],
        imprint: "",
        notes: [],
        images: []
    },
    "app-fitted-comfy-t": {   // Fitted Comfy T
        summary: "",
        fabric: "",
        fit: "",
        colors: [],
        sizes: [],
        imprint: "",
        notes: [],
        images: []
    },
    "app-hoodie": {   // Hoodies
        summary: "",
        fabric: "",
        fit: "",
        colors: [],
        sizes: [],
        imprint: "",
        notes: [],
        images: []
    },
    "app-zip-hoodie": {   // Zip Hoodies
        summary: "",
        fabric: "",
        fit: "",
        colors: [],
        sizes: [],
        imprint: "",
        notes: [],
        images: []
    },
    "app-sweatshirt": {   // Sweatshirt
        summary: "",
        fabric: "",
        fit: "",
        colors: [],
        sizes: [],
        imprint: "",
        notes: [],
        images: []
    },
    "app-quarter-zip": {   // Quarter Zip SS
        summary: "",
        fabric: "",
        fit: "",
        colors: [],
        sizes: [],
        imprint: "",
        notes: [],
        images: []
    },
    "app-knit-shorts": {   // Knit Shorts
        summary: "",
        fabric: "",
        fit: "",
        colors: [],
        sizes: [],
        imprint: "",
        notes: [],
        images: []
    },
    "app-sweatpants": {   // Sweatpants
        summary: "",
        fabric: "",
        fit: "",
        colors: [],
        sizes: [],
        imprint: "",
        notes: [],
        images: []
    },
    "app-leggings": {   // Leggings
        summary: "",
        fabric: "",
        fit: "",
        colors: [],
        sizes: [],
        imprint: "",
        notes: [],
        images: []
    },
    "app-joggers": {   // Joggers
        summary: "",
        fabric: "",
        fit: "",
        colors: [],
        sizes: [],
        imprint: "",
        notes: [],
        images: []
    },
    "app-booty-shorts": {   // Booty Shorts
        summary: "",
        fabric: "",
        fit: "",
        colors: [],
        sizes: [],
        imprint: "",
        notes: [],
        images: []
    }
};

/* =========================================================
   PAGE LOGIC  (you shouldn't need to edit below this line)
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("detail-root");
    if (!root) return;

    const cart = window.DawobazCart;
    const products = window.DAWOBAZ_PRODUCTS || [];
    const detailsData = window.DAWOBAZ_APPAREL_DETAILS || {};
    const groups = (window.DAWOBAZ_GROUPS || {}).apparel || [];

    function esc(text) {
        const div = document.createElement("div");
        div.textContent = String(text);
        return div.innerHTML;
    }

    const params = new URLSearchParams(window.location.search);
    const id = params.get("item");
    const product = products.find((p) => p.id === id && p.category === "apparel");

    if (!product) {
        document.title = "Item not found | Dance World Bazaar (DAWOBAZ)";
        root.innerHTML =
            '<div class="detail-missing"><h1>We couldn\'t find that item</h1>' +
            "<p>It may have moved. Head back to the apparel page to see everything we offer.</p>" +
            '<a class="button button-pink" href="apparel.html">Back to Apparel</a></div>';
        return;
    }

    const d = Object.assign(
        { summary: "", fabric: "", fit: "", colors: [], sizes: [], imprint: "", notes: [], images: [] },
        detailsData[product.id] || {}
    );
    const group = groups.find((g) => g.id === product.group);
    const imprint = d.imprint || (group && group.imprint ? 'Maximum imprint size ' + group.imprint : "");

    document.title = product.name + " | Custom Apparel | Dance World Bazaar (DAWOBAZ)";
    const crumb = document.getElementById("detail-crumb");
    if (crumb) crumb.textContent = product.name;
    const title = document.getElementById("detail-title");
    if (title) title.textContent = product.name;
    const sectionLabel = document.getElementById("detail-section");
    if (sectionLabel) sectionLabel.textContent = group ? group.title : "Custom Apparel";

    const PLACEHOLDER_IMG =
        '<div class="product-placeholder" role="img" aria-label="Photo coming soon">' +
        '<i class="fa-solid fa-shirt"></i><span>Photo coming soon</span></div>';

    /* ---------- photos ---------- */
    const photos = [product.image].concat(d.images || []).filter(Boolean);
    const mainMedia = document.getElementById("detail-main-photo");
    const thumbs = document.getElementById("detail-thumbs");

    function showPhoto(src) {
        mainMedia.innerHTML = "";
        if (!src) {
            mainMedia.innerHTML = PLACEHOLDER_IMG;
            return;
        }
        const img = document.createElement("img");
        img.src = src;
        img.alt = product.name;
        img.addEventListener("error", () => { mainMedia.innerHTML = PLACEHOLDER_IMG; });
        mainMedia.appendChild(img);
    }

    showPhoto(photos[0]);

    /* thumbnails: real extra photos, or 3 "coming soon" boxes as placeholders */
    if (photos.length > 1) {
        thumbs.innerHTML = photos.map((src, i) =>
            '<button type="button" class="detail-thumb' + (i === 0 ? " active" : "") + '" data-src="' + esc(src) +
            '" aria-label="Show photo ' + (i + 1) + '"><img src="' + esc(src) + '" alt=""></button>'
        ).join("");
        thumbs.addEventListener("click", (event) => {
            const button = event.target.closest(".detail-thumb");
            if (!button) return;
            thumbs.querySelectorAll(".detail-thumb").forEach((t) => t.classList.remove("active"));
            button.classList.add("active");
            showPhoto(button.dataset.src);
        });
    } else {
        thumbs.innerHTML = [1, 2, 3].map(() => '<div class="detail-thumb detail-thumb-empty" aria-hidden="true"></div>').join("");
    }

    /* ---------- text sections ---------- */
    function fill(elementId, content) {
        const el = document.getElementById(elementId);
        if (!el) return;
        if (content) {
            el.innerHTML = content;
            el.classList.remove("is-placeholder");
        } else {
            el.textContent = "Details coming soon.";
            el.classList.add("is-placeholder");
        }
    }

    fill("detail-summary", d.summary ? esc(d.summary) : "");
    fill("detail-fabric", d.fabric ? esc(d.fabric) : "");
    fill("detail-fit", d.fit ? esc(d.fit) : "");
    fill("detail-colors", d.colors.length ? d.colors.map((c) => '<span class="chip">' + esc(c) + "</span>").join("") : "");
    fill("detail-sizes", d.sizes.length ? d.sizes.map((s) => '<span class="chip">' + esc(s) + "</span>").join("") : "");
    fill("detail-imprint", imprint ? esc(imprint) : "");
    fill("detail-notes", d.notes.length ? "<ul>" + d.notes.map((n) => "<li>" + esc(n) + "</li>").join("") + "</ul>" : "");

    /* ---------- order list controls ---------- */
    const choices = document.getElementById("detail-choices");
    let html = "";
    if (d.sizes.length) {
        html += '<label for="detail-size">Size</label><select id="detail-size">' +
            d.sizes.map((s) => "<option>" + esc(s) + "</option>").join("") + "</select>";
    }
    if (d.colors.length) {
        html += '<label for="detail-color">Color</label><select id="detail-color">' +
            d.colors.map((c) => "<option>" + esc(c) + "</option>").join("") + "</select>";
    }
    html += '<label for="detail-qty">Qty</label>' +
        '<input id="detail-qty" type="number" min="1" max="999" value="1" inputmode="numeric">';
    choices.innerHTML = html;

    const addButton = document.getElementById("detail-add");
    addButton.addEventListener("click", () => {
        const size = document.getElementById("detail-size");
        const color = document.getElementById("detail-color");
        const parts = [];
        const labels = [];
        if (size) { parts.push(size.value); labels.push("Size"); }
        if (color) { parts.push(color.value); labels.push("Color"); }

        cart.add(product.id, parts.join(" / "), document.getElementById("detail-qty").value, labels.join(" / ") || undefined);

        addButton.textContent = "Added \u2713";
        addButton.classList.add("is-added");
        window.setTimeout(() => {
            addButton.textContent = "Add to Order List";
            addButton.classList.remove("is-added");
        }, 1400);
    });
});
