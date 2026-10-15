"use strict";

/* =========================================================
   ORDER LIST (cart) — just the items and quantities a visitor wants
   to order, stored in their browser (localStorage). No prices.
   Exposes window.DawobazCart for other scripts.
   ========================================================= */

(function () {
    const KEY = "dawobaz_cart_v1";

    function read() {
        try {
            const raw = window.localStorage.getItem(KEY);
            const parsed = raw ? JSON.parse(raw) : [];
            return Array.isArray(parsed) ? parsed : [];
        } catch (error) {
            return [];
        }
    }

    let memoryFallback = null;

    function write(items) {
        memoryFallback = items;
        try {
            window.localStorage.setItem(KEY, JSON.stringify(items));
        } catch (error) {
            /* storage blocked: cart lasts for this page view only */
        }
        updateBadge();
        document.dispatchEvent(new CustomEvent("cart:change"));
    }

    function get() {
        return memoryFallback && read().length === 0 ? memoryFallback : read();
    }

    function lineKey(id, option) {
        return id + "||" + (option || "");
    }

    function add(productId, option, quantity) {
        const product = (window.DAWOBAZ_PRODUCTS || []).find((p) => p.id === productId);
        if (!product) return;

        const qty = Math.max(1, Math.min(999, parseInt(quantity, 10) || 1));
        const items = get();
        const key = lineKey(productId, option);
        const existing = items.find((item) => item.key === key);

        if (existing) {
            existing.quantity = Math.min(999, existing.quantity + qty);
        } else {
            items.push({
                key: key,
                id: product.id,
                name: product.name,
                option: option || "",
                optionLabel: product.optionLabel || "Size",
                quantity: qty
            });
        }
        write(items);
    }

    function setQuantity(key, quantity) {
        const qty = parseInt(quantity, 10);
        let items = get();
        if (!qty || qty < 1) {
            items = items.filter((item) => item.key !== key);
        } else {
            const line = items.find((item) => item.key === key);
            if (line) line.quantity = Math.min(999, qty);
        }
        write(items);
    }

    function remove(key) {
        write(get().filter((item) => item.key !== key));
    }

    function clear() {
        write([]);
    }

    function count() {
        return get().reduce((sum, item) => sum + item.quantity, 0);
    }

    function updateBadge() {
        document.querySelectorAll(".cart-count").forEach((badge) => {
            const total = count();
            badge.textContent = total > 99 ? "99+" : String(total);
            badge.classList.toggle("has-items", total > 0);
        });
    }

    window.DawobazCart = { get, add, setQuantity, remove, clear, count, updateBadge };

    document.addEventListener("DOMContentLoaded", updateBadge);
    document.addEventListener("layout:ready", updateBadge);
    window.addEventListener("storage", updateBadge);
})();
