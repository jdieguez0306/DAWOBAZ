"use strict";

/* =========================================================
   SHOP PAGES — fills <div id="product-grid" data-category="...">
   from js/products.js, and handles the cart page (#cart-root).
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const cart = window.DawobazCart;
    const money = cart.money;

    /* ---------- product grid ---------- */

    const grid = document.getElementById("product-grid");

    function escapeHtml(text) {
        const div = document.createElement("div");
        div.textContent = String(text);
        return div.innerHTML;
    }

    if (grid) {
        const category = grid.dataset.category;
        const products = (window.DAWOBAZ_PRODUCTS || []).filter((p) => p.category === category);

        if (products.length === 0) {
            grid.innerHTML = '<p class="empty-note">Products coming soon. Call 812-663-7679 to place an order.</p>';
        }

        products.forEach((product) => {
            const card = document.createElement("article");
            card.className = "product-card";

            const media = product.image
                ? '<img src="' + escapeHtml(product.image) + '" alt="' + escapeHtml(product.name) + '" loading="lazy">'
                : '<div class="product-placeholder" role="img" aria-label="Product photo coming soon"><i class="fa-solid fa-shirt"></i><span>Photo coming soon</span></div>';

            const hasOptions = product.options && product.options.length > 0;
            const label = product.optionLabel || "Size";
            const selectId = "opt-" + product.id;

            const optionHtml = hasOptions
                ? '<label for="' + selectId + '">' + escapeHtml(label) + "</label>" +
                  '<select id="' + selectId + '">' +
                  product.options.map((o) => "<option>" + escapeHtml(o) + "</option>").join("") +
                  "</select>"
                : "";

            card.innerHTML =
                '<div class="product-media">' + media + "</div>" +
                '<div class="product-body">' +
                "<h3>" + escapeHtml(product.name) + "</h3>" +
                '<p class="product-desc">' + escapeHtml(product.description || "") + "</p>" +
                '<p class="product-price">' + money(product.price) + "</p>" +
                '<div class="product-controls">' + optionHtml +
                '<label for="qty-' + product.id + '">Qty</label>' +
                '<input id="qty-' + product.id + '" type="number" min="1" max="999" value="1" inputmode="numeric">' +
                "</div>" +
                '<button class="button button-pink add-to-cart" type="button">Add to Cart</button>' +
                "</div>";

            const button = card.querySelector(".add-to-cart");
            button.addEventListener("click", () => {
                const select = card.querySelector("select");
                const qty = card.querySelector('input[type="number"]').value;
                cart.add(product.id, select ? select.value : "", qty);
                button.textContent = "Added ✓";
                button.classList.add("is-added");
                window.setTimeout(() => {
                    button.textContent = "Add to Cart";
                    button.classList.remove("is-added");
                }, 1400);
            });

            grid.appendChild(card);
        });
    }

    /* ---------- cart page ---------- */

    const root = document.getElementById("cart-root");
    if (!root) return;

    const shipping = (window.DAWOBAZ_CONFIG && window.DAWOBAZ_CONFIG.shipping) || 0;
    const itemsBox = root.querySelector("#cart-items");
    const summary = root.querySelector("#cart-summary");
    const orderForm = root.querySelector("#order-form");
    const cartField = root.querySelector("#cart-json");

    function render() {
        const items = cart.get();

        if (items.length === 0) {
            itemsBox.innerHTML =
                '<div class="cart-empty"><i class="fa-solid fa-bag-shopping"></i>' +
                "<h2>Your cart is empty</h2>" +
                '<p>Browse our collections and add items to start your order.</p>' +
                '<a class="button button-pink" href="index.html#categories">Shop Categories</a></div>';
            summary.hidden = true;
            orderForm.hidden = true;
            return;
        }

        summary.hidden = false;
        orderForm.hidden = false;

        itemsBox.innerHTML = items.map((item) => {
            const optionText = item.option ? escapeHtml(item.optionLabel) + ": " + escapeHtml(item.option) : "";
            return '<div class="cart-line" data-key="' + escapeHtml(item.key) + '">' +
                '<div class="cart-line-info"><h3>' + escapeHtml(item.name) + "</h3>" +
                "<p>" + optionText + "</p></div>" +
                '<div class="cart-line-price">' + money(item.price) + "</div>" +
                '<label class="sr-only" for="q-' + escapeHtml(item.key) + '">Quantity</label>' +
                '<input class="cart-qty" id="q-' + escapeHtml(item.key) + '" type="number" min="1" max="999" value="' + item.quantity + '">' +
                '<div class="cart-line-total">' + money(item.price * item.quantity) + "</div>" +
                '<button class="cart-remove" type="button" aria-label="Remove ' + escapeHtml(item.name) + '"><i class="fa-solid fa-xmark"></i></button>' +
                "</div>";
        }).join("");

        const sub = cart.subtotal();
        root.querySelector("#sum-subtotal").textContent = money(sub);
        root.querySelector("#sum-shipping").textContent = money(shipping);
        root.querySelector("#sum-total").textContent = money(sub + shipping);

        cartField.value = JSON.stringify({
            items: items.map((i) => ({ name: i.name, option: i.option ? i.optionLabel + ": " + i.option : "", price: i.price, quantity: i.quantity })),
            subtotal: sub,
            shipping: shipping,
            total: sub + shipping
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
