"use strict";

/* Edit the placeholder text for each bag here when the owner supplies details.
   All text is intentionally generic until specifications are confirmed. */
const BAG_DETAILS = {
  "bag-gear-bag": { 
    description: "1 Color Printed Logo",
    style: "511", 
    dimensions: "22\" wide x 11\" tall x 11\" deep", 
    material: "Durable Polyester", 
    price: "$38.00", 
    features: ["2 End Pockets", "Large zippered center compartment", "Max 4\" x 8\" print across one side of the bag."] 
},
  "bag-spirit-bag":{ 
    description: "1 Color Printed Logo",
    style: "1825", 
    dimensions: "18\" wide x 10\" tall x 9\" deep", 
    material: "Durable Polyester", 
    price: "$25.00", 
    features: ["Fabric Handle Wrapper", "Zippered main components & side pockets", "Has 4\" x 8\" printed across one side."] 
},
  "bag-garment-front":{ 
    description: "1 Color Printed Logo", 
    style: "9009",
    dimensions: "25\" wide x 47\" tall", 
    material: "210 Dernier Nylon", 
    price: "$22.00", 
    features: ["5\" Top Opening Fits Universal Hanger", "6\" Print on left side of zipper"] 
},
  "bag-roll":{ 
    description: "[Add Bag #L description here]", 
    dimensions: "[Add dimensions]", 
    material: "[Add material]", 
    colors: "[Add available colors]", 
    features: ["[Add feature 1]", "[Add feature 2]", "[Add feature 3]"] 
},
  "bag-M-duffle":{ 
    description: "[Add Bag #F description here]", 
    dimensions: "[Add dimensions]", 
    material: "[Add material]", 
    colors: "[Add available colors]", 
    features: ["[Add feature 1]", "[Add feature 2]", "[Add feature 3]"] 
},
  "bag-garment-back":{ 
    description: "[Add Garment Bag B description here]", 
    dimensions: "[Add dimensions]", 
    material: "[Add material]", 
    colors: "[Add available colors]", 
    features: ["[Add feature 1]", "[Add feature 2]", "[Add feature 3]"] 
},
  "bag-drawstring":{ 
    description: "[Add Bag #H description here]", 
    dimensions: "[Add dimensions]", 
    material: "[Add material]", 
    colors: "[Add available colors]", 
    features: ["[Add feature 1]", "[Add feature 2]", "[Add feature 3]"] 
},
  "bag-zip-tote":{ 
    description: "[Add Bag #I description here]", 
    dimensions: "[Add dimensions]", 
    material: "[Add material]", 
    colors: "[Add available colors]", 
    features: ["[Add feature 1]", "[Add feature 2]", "[Add feature 3]"] 
}
};

// DEMO COLORS ONLY. Replace these with each product's confirmed color options.
// For real photos, set image to e.g. "images/bags/gear-black.jpg".
const SAMPLE_COLOR_OPTIONS = [
  { name: "Black", hex: "#28282d", image: "" },
  { name: "Navy", hex: "#243b60", image: "" },
  { name: "Pink", hex: "#e9a4bb", image: "" },
  { name: "Natural", hex: "#d8c6a5", image: "" }
];

// Optional per-bag overrides: add colorOptions: [...] to any BAG_DETAILS entry.
// SVG placeholders are generated locally; no photo files are needed.
function bagPlaceholder(color, label) {
  const safeColor = /^#[0-9a-fA-F]{6}$/.test(color) ? color : "#888888";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 480">
    <rect width="600" height="480" fill="#f8f6f6"/>
    <path d="M210 170 Q210 83 300 83 Q390 83 390 170" fill="none" stroke="${safeColor}" stroke-width="24" stroke-linecap="round"/>
    <rect x="140" y="160" width="320" height="235" rx="30" fill="${safeColor}"/>
    <path d="M155 215 H445" stroke="#ffffff" stroke-opacity=".32" stroke-width="5"/>
    <rect x="243" y="256" width="114" height="48" rx="8" fill="#ffffff" fill-opacity=".18"/>
    <text x="300" y="437" text-anchor="middle" fill="#555" font-family="Arial,sans-serif" font-size="19">Illustrative placeholder — ${label}</text>
  </svg>`;
  return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
}

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
  const colorOptions = details.colorOptions || SAMPLE_COLOR_OPTIONS;
  const options = colorOptions.length ? colorOptions : SAMPLE_COLOR_OPTIONS;
  const imageFor = option => option.image || bagPlaceholder(option.hex, option.name);
  const first = options[0];
  const image = `<img src="${esc(imageFor(first))}" alt="${esc(bag.name)} — ${esc(first.name)} (placeholder)" id="bag-detail-image">`;
  const thumbnails = options.map((option, index) => `
    <button type="button" class="bag-color-option ${index === 0 ? "selected" : ""}"
      aria-label="Show ${esc(option.name)} bag" aria-pressed="${index === 0}"
      data-color-index="${index}">
      <img src="${esc(imageFor(option))}" alt="${esc(option.name)} bag preview">
      <span>${esc(option.name)}</span>
    </button>`).join("");
  root.innerHTML = `
    <div class="bag-detail-layout">
      <div class="bag-detail-gallery">
        <div class="bag-detail-media">${image}<div class="bag-detail-photo-fallback" hidden><i class="fa-solid fa-bag-shopping"></i><span>Product image coming soon</span></div></div>
        <div class="bag-color-gallery">
          <h3>Available Colors</h3>
          <div class="bag-color-options" role="group" aria-label="Bag color previews">${thumbnails}</div>
          <p class="bag-selected-color">Previewing: <strong id="bag-selected-color">${esc(first.name)}</strong></p>
          <p class="bag-color-note"><i class="fa-solid fa-circle-info"></i> Colors may vary with the bag style. Request a sample to see colors before ordering.</p>
        </div>
      </div>
      <div class="bag-detail-info">
        <p class="bag-detail-eyebrow">${esc(group ? group.title : "Dance Bags")}</p>
        <h2>${esc(bag.name)}</h2>
        <p class="bag-detail-description">${esc(details.description)}</p>
        <p class="bag-detail-style">Style #: ${esc(bag.style)}</p>
        <h3>Product Specifications</h3>
        <dl class="bag-specifications">
          <div><dt>Dimensions</dt><dd>${esc(details.dimensions)}</dd></div>
          <div><dt>Material</dt><dd>${esc(details.material)}</dd></div>
          <div><dt>Price</dt><dd>${esc(details.price)}</dd></div>
          <div><dt>Imprint Area</dt><dd>${esc(group ? group.imprint : "[Confirm imprint area]")}</dd></div>
        </dl>
        <h3>Features</h3>
        <ul class="bag-feature-list">${(details.features || []).map(feature => `<li>${esc(feature)}</li>`).join("")}</ul>
        <p class="bag-minimum-note"><i class="fa-solid fa-circle-info"></i> Minimum order: 12 pieces within the same group.</p>
        <div class="bag-detail-actions"><a class="button button-dark" href="contact.html">Request a Sample</a><a class="button bag-back-button" href="bags.html">Back to All Bags</a></div>
      </div>
    </div>`;
  const img = document.getElementById("bag-detail-image");
  const fallback = root.querySelector(".bag-detail-photo-fallback");
  if (img) img.addEventListener("error", () => { img.hidden = true; fallback.hidden = false; });
  root.querySelectorAll(".bag-color-option").forEach(button => {
    button.addEventListener("click", () => {
      const option = options[Number(button.dataset.colorIndex)];
      if (!option || !img) return;
      img.hidden = false;
      fallback.hidden = true;
      img.src = imageFor(option);
      img.alt = `${bag.name} — ${option.name}${option.image ? "" : " (placeholder)"}`;
      root.querySelector("#bag-selected-color").textContent = option.name;
      root.querySelectorAll(".bag-color-option").forEach(other => {
        const selected = other === button;
        other.classList.toggle("selected", selected);
        other.setAttribute("aria-pressed", String(selected));
      });
    });
  });
})();
