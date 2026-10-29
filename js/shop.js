"use strict";

/* =========================================================
   SHOP PAGES — fills <div id="product-grid" data-category="...">
   from js/products.js, and handles the cart page (#cart-root).

   Add  data-grouped  to the grid (as bags.html does) to split the
   products into sections using DAWOBAZ_GROUPS in products.js.

   There are no prices: "Add to Order List" collects items and
   quantities, and the shop sends pricing after the form is submitted.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const cart = window.DawobazCart;

    function escapeHtml(text) {
        const div = document.createElement("div");
        div.textContent = String(text);
        return div.innerHTML;
    }

    const PLACEHOLDER =
        '<div class="product-placeholder" role="img" aria-label="Product photo coming soon">' +
        '<i class="fa-solid fa-shirt"></i><span>Photo coming soon</span></div>';

    function buildCard(product, detailsPage) {
        const card = document.createElement("article");
        card.className = "product-card";

        const media = product.image
            ? '<img src="' + escapeHtml(product.image) + '" alt="' + escapeHtml(product.name) + '" loading="lazy">'
            : PLACEHOLDER;

        const hasOptions = product.options && product.options.length > 0;
        const label = product.optionLabel || "Size";
        const selectId = "opt-" + product.id;

        const optionHtml = hasOptions
            ? '<label for="' + selectId + '">' + escapeHtml(label) + "</label>" +
              '<select id="' + selectId + '">' +
              product.options.map((o) => "<option>" + escapeHtml(o) + "</option>").join("") +
              "</select>"
            : "";

        const qtyHtml =
            '<label for="qty-' + product.id + '">Qty</label>' +
            '<input id="qty-' + product.id + '" type="number" min="1" max="999" value="1" inputmode="numeric">';

        const actionHtml = '<button class="button button-pink add-to-cart" type="button">Add to Order List</button>';
        const controls = '<div class="product-controls">' + optionHtml + qtyHtml + "</div>";

        const detailsUrl = detailsPage ? detailsPage + "?id=" + encodeURIComponent(product.id) : "";
        const mediaHtml = detailsUrl
            ? '<a class="product-media" href="' + detailsUrl + '" aria-label="View details for ' + escapeHtml(product.name) + '">' + media + "</a>"
            : '<div class="product-media">' + media + "</div>";
        const detailsLink = detailsUrl
            ? '<a class="button button-pink" href="' + detailsUrl + '">View Details</a>'
            : "";

        card.innerHTML =
            mediaHtml +
            '<div class="product-body">' +
            "<h3>" + escapeHtml(product.name) + "</h3>" + detailsLink +
            (product.description ? '<p class="product-desc">' + escapeHtml(product.description) + "</p>" : "") +
            "</div>";

        /* If a photo file is missing, fall back to the placeholder box. */
        const img = card.querySelector(".product-media img");
        if (img) {
            img.addEventListener("error", () => {
                img.closest(".product-media").innerHTML = PLACEHOLDER;
            });
        }

        const button = card.querySelector(".add-to-cart");
        if (button) {
            button.addEventListener("click", () => {
                const select = card.querySelector("select");
                const qty = card.querySelector('input[type="number"]').value;
                cart.add(product.id, select ? select.value : "", qty);
                button.textContent = "Added ✓";
                button.classList.add("is-added");
                window.setTimeout(() => {
                    button.textContent = "Add to Order List";
                    button.classList.remove("is-added");
                }, 1400);
            });
        }

        return card;
    }

    /* ---------- product grid ---------- */

    const grid = document.getElementById("product-grid");

    if (grid) {
        const category = grid.dataset.category;
        const products = (window.DAWOBAZ_PRODUCTS || []).filter((p) => p.category === category);
        const detailsPage = grid.dataset.details || "";
        const groups = (window.DAWOBAZ_GROUPS || {})[category];

        if (products.length === 0) {
            grid.innerHTML = '<p class="empty-note">Products coming soon. Call 812-663-7679 to place an order.</p>';
        } else if (grid.hasAttribute("data-grouped") && groups) {
            grid.classList.remove("product-grid");
            groups.forEach((group) => {
                const items = products.filter((p) => p.group === group.id);
                if (items.length === 0) return;

                const section = document.createElement("section");
                section.className = "group-section";
                section.innerHTML =
                    '<header class="group-header">' +
                    "<h2>" + escapeHtml(group.title) + "</h2>" +
                    (group.imprint ? '<p>Maximum imprint size <strong>' + escapeHtml(group.imprint) + "</strong></p>" : "") +
                    "</header>" +
                    '<div class="product-grid"></div>';

                const inner = section.querySelector(".product-grid");
                items.forEach((p) => inner.appendChild(buildCard(p, detailsPage)));
                grid.appendChild(section);
            });
        } else {
            products.forEach((p) => grid.appendChild(buildCard(p, detailsPage)));
        }
    }

    /* ---------- cart page ---------- */

    const root = document.getElementById("cart-root");
    if (!root) return;

    const itemsBox = root.querySelector("#cart-items");
    const orderForm = root.querySelector("#order-form");
    const cartField = root.querySelector("#cart-json");

    function render() {
        const items = cart.get();

        if (items.length === 0) {
            itemsBox.innerHTML =
                '<div class="cart-empty"><i class="fa-solid fa-bag-shopping"></i>' +
                "<h2>Your order list is empty</h2>" +
                '<p>Browse our collections and add the items you\'d like to order.</p>' +
                '<a class="button button-pink" href="index.html#categories">Shop Categories</a></div>';
            orderForm.hidden = true;
            return;
        }

        orderForm.hidden = false;

        itemsBox.innerHTML = items.map((item) => {
            const optionText = item.option ? escapeHtml(item.optionLabel) + ": " + escapeHtml(item.option) : "";
            return '<div class="cart-line" data-key="' + escapeHtml(item.key) + '">' +
                '<div class="cart-line-info"><h3>' + escapeHtml(item.name) + "</h3>" +
                "<p>" + optionText + "</p></div>" +
                '<label class="sr-only" for="q-' + escapeHtml(item.key) + '">Quantity</label>' +
                '<input class="cart-qty" id="q-' + escapeHtml(item.key) + '" type="number" min="1" max="999" value="' + item.quantity + '">' +
                '<button class="cart-remove" type="button" aria-label="Remove ' + escapeHtml(item.name) + '"><i class="fa-solid fa-xmark"></i></button>' +
                "</div>";
        }).join("");

        cartField.value = JSON.stringify({
            items: items.map((i) => ({ name: i.name, option: i.option ? i.optionLabel + ": " + i.option : "", quantity: i.quantity }))
        });
    }

    itemsBox.addEventListener("change", (event) => {
        if (!event.target.classList.contains("cart-qty")) return;
        const key = event.target.closest(".cart-line").dataset.key;
        cart.setQuantity(key, event.target.value);
    });

    itemsBox.addEventListener("click", (event) => {
        const button = event.target.closest(".cart-remove");
        if (!button) return;
        cart.remove(button.closest(".cart-line").dataset.key);
    });

    document.addEventListener("cart:change", render);
    document.addEventListener("order:sent", () => cart.clear());
    render();
});
