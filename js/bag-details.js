"use strict";

/* Edit the placeholder text for each bag here when the owner supplies details.
   All text is intentionally generic until specifications are confirmed. */
const BAG_DETAILS = {
  "bag-gear-bag": { description: "[Add Gear Bag description here]", dimensions: "[Add dimensions]", material: "[Add material]", colors: "[Add available colors]", features: ["[Add feature 1]", "[Add feature 2]", "[Add feature 3]"] },
  "bag-spirit-bag": { description: "[Add Spirit Bag description here]", dimensions: "[Add dimensions]", material: "[Add material]", colors: "[Add available colors]", features: ["[Add feature 1]", "[Add feature 2]", "[Add feature 3]"] },
  "bag-garment": { description: "[Add Garment Bag description here]", dimensions: "[Add dimensions]", material: "[Add material]", colors: "[Add available colors]", features: ["[Add feature 1]", "[Add feature 2]", "[Add feature 3]"] },
  "bag-l": { description: "[Add Bag #L description here]", dimensions: "[Add dimensions]", material: "[Add material]", colors: "[Add available colors]", features: ["[Add feature 1]", "[Add feature 2]", "[Add feature 3]"] },
  "bag-f": { description: "[Add Bag #F description here]", dimensions: "[Add dimensions]", material: "[Add material]", colors: "[Add available colors]", features: ["[Add feature 1]", "[Add feature 2]", "[Add feature 3]"] },
  "bag-garment-b": { description: "[Add Garment Bag B description here]", dimensions: "[Add dimensions]", material: "[Add material]", colors: "[Add available colors]", features: ["[Add feature 1]", "[Add feature 2]", "[Add feature 3]"] },
  "bag-h": { description: "[Add Bag #H description here]", dimensions: "[Add dimensions]", material: "[Add material]", colors: "[Add available colors]", features: ["[Add feature 1]", "[Add feature 2]", "[Add feature 3]"] },
  "bag-i": { description: "[Add Bag #I description here]", dimensions: "[Add dimensions]", material: "[Add material]", colors: "[Add available colors]", features: ["[Add feature 1]", "[Add feature 2]", "[Add feature 3]"] }
};

(function () {
  const root = document.getElementById("bag-detail-root");
  if (!root) return;
  const id = new URLSearchParams(window.location.search).get("id");
  const bag = (window.DAWOBAZ_PRODUCTS || []).find(p => p.category === "bags" && p.id === id);
  if (!bag) {
    root.innerHTML = '<div class="bag-detail-empty"><h2>Bag not found</h2><p>Please choose a bag from our collection.</p><a class="button button-dark" href="bags.html">Back to Dance Bags</a></div>';
    return;
  }
  const details = BAG_DETAILS[id] || {};
  const groups = (window.DAWOBAZ_GROUPS && window.DAWOBAZ_GROUPS.bags) || [];
  const group = groups.find(g => g.id === bag.group);
  const esc = value => { const el = document.createElement("span"); el.textContent = String(value || ""); return el.innerHTML; };
  document.title = bag.name + " | DAWOBAZ";
  document.getElementById("bag-page-title").textContent = bag.name;
  document.getElementById("bag-breadcrumb").textContent = bag.name;
  const image = bag.image ? `<img src="${esc(bag.image)}" alt="${esc(bag.name)}" id="bag-detail-image">` : "";
  root.innerHTML = `
    <div class="bag-detail-layout">
      <div class="bag-detail-media">${image}<div class="bag-detail-photo-fallback" ${image ? 'hidden' : ''}><i class="fa-solid fa-bag-shopping"></i><span>Product image coming soon</span></div></div>
      <div class="bag-detail-info">
        <p class="bag-detail-eyebrow">${esc(group ? group.title : "Dance Bags")}</p>
        <h2>${esc(bag.name)}</h2>
        <p class="bag-detail-description">${esc(details.description)}</p>
        <p class="bag-detail-price">Call for pricing</p>
        <h3>Product Specifications</h3>
        <dl class="bag-specifications">
          <div><dt>Dimensions</dt><dd>${esc(details.dimensions)}</dd></div>
          <div><dt>Material</dt><dd>${esc(details.material)}</dd></div>
          <div><dt>Available Colors</dt><dd>${esc(details.colors)}</dd></div>
          <div><dt>Imprint Area</dt><dd>${esc(group ? group.imprint : "[Confirm imprint area]")}</dd></div>
        </dl>
        <h3>Features</h3>
        <ul class="bag-feature-list">${(details.features || []).map(feature => `<li>${esc(feature)}</li>`).join("")}</ul>
        <p class="bag-minimum-note"><i class="fa-solid fa-circle-info"></i> Minimum order: 12 pieces within the same group.</p>
        <div class="bag-detail-actions"><a class="button button-dark" href="contact.html">Ask About This Bag</a><a class="button bag-back-button" href="bags.html">Back to All Bags</a></div>
      </div>
    </div>`;
  const img = document.getElementById("bag-detail-image");
  if (img) img.addEventListener("error", () => { img.hidden = true; root.querySelector(".bag-detail-photo-fallback").hidden = false; });
})();
