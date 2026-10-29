"use strict";

/* Edit the placeholder text for each bag here when the owner supplies details.
   All text is intentionally generic until specifications are confirmed. */
const BAG_DETAILS = {
  "bag-gear-bag": { 
    description: "1 Color Printed Logo", 
    dimensions: "22\" wide x 11\" tall x 11\" deep", 
    material: "Durable Polyester", 
    price: "$38.00", 
    features: ["2 End Pockets", "Large zippered center compartment", "Max 4\" x 8\" print across one side of the bag."] 
},
  "bag-spirit-bag":{ 
    description: "1 Color Printed Logo", 
    dimensions: "18\" wide x 10\" tall x 9\" deep", 
    material: "Durable Polyester", 
    price: "$25.00", 
    features: ["Fabric Handle Wrapper", "Zippered main components & side pockets", "Has 4\" x 8\" printed across one side."] 
},
  "bag-roll":{ 
    description: "1 Color Printed Logo", 
    dimensions: "18\" x 10\" x 10\"", 
    material: "Durable Polyester", 
    price: "$18.00", 
    features: ["Detachable/Adjustable Shoulder strap", "Single Zippered Main Compartment", "Has 6\" Print on one side of the bag."] 
},
  "bag-garment-front":{ 
    description: "1 Color Printed Logo", 
    dimensions: "25\" wide x 47\" tall", 
    material: "210 Dernier Nylon", 
    price: "$22.00", 
    features: ["5\" Top Opening Fits Universal Hanger", "6\" Print on left side of zipper"] 
},
  "bag-M-duffle":{ 
    description: "1 Color Printed Logo", 
    dimensions: "20\" x 10\" x 10\"", 
    material: "Durable Polyester", 
    price: "$35.00", 
    features: ["3 external pockets", "Has 6\" Print on one end of the bag."] 
},
  "bag-garment-back":{ 
    description: "1 Color Printed Logo", 
    dimensions: "25\" wide x 47\" tall", 
    material: "210 Dernier Nylon", 
    price: "$22.00",
    features: ["5\" Top Opening Fits Universal Hanger", "Has 9\" Print on one side of the bag."] 
},
  "bag-drawstring":{ 
    description: "1 Color Printed Logo", 
    dimensions: "14\"x 18\"", 
    material: "Nylon", 
    price: "$12.00", 
    features: ["Drawstring closure(color matched hardware & drawstring)", "Has 9\" Print on one side."] 
},
  "bag-zip-tote":{ 
    description: "1 Color Printed Logo", 
    dimensions: "18\"  x 16\" x 4.5\"", 
    material: "50% Recycled Denier Nylon", 
    price: "$15.00",    
    features: ["Has 9\" Print on one side.", "28\" Handles",] 
}
};

// Confirmed Gear Bag colors from the supplied DAWOBAZ chart.
// Images are optional: leave image empty until the matching JPG exists.
// Each bag has its OWN colorOptions; no universal colors are assumed.
BAG_DETAILS["bag-gear-bag"].colorOptions = [
  { name: "Black", hex: "#242424", image: "images/Bags/gear_bag.png" },
  { name: "Forest", hex: "#08674f", image: "images/Bags/gear bags/forest_green_gear.png" },
  { name: "Navy", hex: "#174a80", image: "images/Bags/gear bags/navy_gear.png" },
  { name: "Purple", hex: "#45328b", image: "images/Bags/gear bags/purple_gear.png" },
  { name: "Red", hex: "#cc2336", image: "images/Bags/gear bags/red_gear.png" },
  { name: "Hot Pink", hex: "#ed168c", image: "images/Bags/gear bags/hot_pink_gear.png" }
];

BAG_DETAILS["bag-spirit-bag"].colorOptions = [
  { name: "Black", hex: "#242424", image: "images/Bags/spirit_bag.png" },
  { name: "Dark Green", hex: "#006400", image: "" },
  { name: "Navy", hex: "#174a80", image: "" },
  { name: "Purple", hex: "#45328b", image: "" },
  { name: "Red", hex: "#cc2336", image: "" },
  { name: "Maroon", hex: "#800000", image: "" },
  { name: "Royal", hex: "#4169E1", image: "" },
  { name: "Orange", hex: "#FFA500", image: "" }

];
BAG_DETAILS["bag-garment-front"].colorOptions = [
  { name: "Black", hex: "#242424", image: "images/Bags/front_garment.png" },
  { name: "Navy", hex: "#174a80", image: "" },
  { name: "Purple", hex: "#45328b", image: "" },
  { name: "Red", hex: "#cc2336", image: "" },
  { name: "Royal", hex: "#4169E1", image: "" },

];
BAG_DETAILS["bag-roll"].colorOptions = [
  { name: "Black", hex: "#242424", image: "" },
  { name: "Forest", hex: "#08674f", image: "" },
  { name: "Navy", hex: "#174a80", image: "" },
  { name: "Purple", hex: "#45328b", image: "" },
  { name: "Red", hex: "#cc2336", image: "" },
  { name: "Maroon", hex: "#800000", image: "" },
  { name: "Royal", hex: "#4169E1", image: "" },
  { name: "Hot Pink", hex: "#ed168c", image: "images/Bags/Roll_bag.png" }

];
BAG_DETAILS["bag-M-duffle"].colorOptions = [
  { name: "Black", hex: "#242424", image: "images/Bags/duffle_bag.png" },
  { name: "Forest", hex: "#08674f", image: "" },
  { name: "Navy", hex: "#174a80", image: "" },
  { name: "Red", hex: "#cc2336", image: "" },
  { name: "Royal", hex: "#4169E1", image: "" }

];
BAG_DETAILS["bag-garment-back"].colorOptions = [
  { name: "Black", hex: "#242424", image: "images/Bags/back_garment.png" },
  { name: "Navy", hex: "#174a80", image: "" },
  { name: "Purple", hex: "#45328b", image: "" },
  { name: "Red", hex: "#cc2336", image: "" },
  { name: "Royal", hex: "#4169E1", image: "" }

];
BAG_DETAILS["bag-drawstring"].colorOptions = [
  { name: "Black", hex: "#242424", image: "images/Bags/drawstring.png" },
  { name: "Forest", hex: "#08674f", image: "" },
  { name: "Lime", hex: "#00FF00", image: "" },
  { name: "Kelly Green", hex: "#4cbb17", image: "" },
  { name: "Navy", hex: "#174a80", image: "" },
  { name: "Purple", hex: "#45328b", image: "" },
  { name: "Lavender", hex: "#E6E6FA", image: "" },
  { name: "Maroon", hex: "#800000", image: "" },
  { name: "Royal", hex: "#4169E1", image: "" },
  { name: "Light Blue", hex: "#ADD8E6", image: "" },
  { name: "Red", hex: "#cc2336", image: "" },
  { name: "Orange", hex: "#FFA500", image: "" },
  { name: "Hot Pink", hex: "#ed168c", image: "" }

];
BAG_DETAILS["bag-zip-tote"].colorOptions = [
  { name: "Black", hex: "#010101", image: "images/Bags/Zip_tote_bag.png" },
  { name: "Kelly Green", hex: "#4cbb17", image: "" },
  { name: "Navy", hex: "#174a80", image: "" },
  { name: "Purple", hex: "#45328b", image: "" },
  { name: "Royal", hex: "#4169E1", image: "" },
  { name: "Turquoise", hex: "#40E0D0", image: "" },
  { name: "Red", hex: "#cc2336", image: "" },
  { name: "Hot Pink", hex: "#ed168c", image: "" }

];
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
  const options = details.colorOptions || [];
  const originalImage = bag.image || bag.imageUrl || bag.img || "";
  const imageFor = option => (option && option.image) || originalImage;
  const first = options[0];
  const image = `<img src="${esc(imageFor(first))}" alt="${esc(bag.name)} product photograph" id="bag-detail-image">`;
  const thumbnails = options.map((option, index) => `
    <button type="button" class="bag-color-option ${index === 0 ? "selected" : ""}"
      aria-label="Select ${esc(option.name)}" aria-pressed="${index === 0}"
      data-color-index="${index}">
      <span class="bag-color-swatch" style="background-color:${esc(option.hex)}"></span>
      <span>${esc(option.name)}</span>
    </button>`).join("");
  root.innerHTML = `
    <div class="bag-detail-layout">
      <div class="bag-detail-gallery">
        <div class="bag-detail-media">${image}<div class="bag-detail-photo-fallback" hidden><i class="fa-solid fa-bag-shopping"></i><span>Product image coming soon</span></div></div>
        <div class="bag-color-gallery">
          <h3>Available Colors</h3>
          <div class="bag-color-options" role="group" aria-label="Bag color previews">${thumbnails}</div>
          <p class="bag-selected-color">${options.length ? 'Selected color: <strong id="bag-selected-color">' + esc(first.name) + '</strong>' : 'Available colors: to be confirmed'}</p>
          <p class="bag-image-note">${options.length ? 'Color swatches show available choices. Product photo updates when a matching color photograph is added.' : 'Product photo shown for reference.'}</p>
          <p class="bag-color-note"><i class="fa-solid fa-circle-info"></i> Colors may vary with the bag style. Request a sample to see colors before ordering.</p>
        </div>
      </div>
      <div class="bag-detail-info">
        <p class="bag-detail-eyebrow">${esc(group ? group.title : "Dance Bags")}</p>
        <h2>${esc(bag.name)}</h2>
        <p class="bag-detail-description">${esc(details.description)}</p>
        <p class="bag-detail-style">Style #: ${esc(details.style || bag.style || "[To be confirmed]")}</p>
        <h3>Product Specifications</h3>
        <dl class="bag-specifications">
          <div><dt>Price</dt><dd>${esc(details.price || "[Call for pricing]")}</dd></div>  
          <div><dt>Dimensions</dt><dd>${esc(details.dimensions)}</dd></div>
          <div><dt>Material</dt><dd>${esc(details.material)}</dd></div>
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
  if (img) {
    if (!img.getAttribute("src")) { img.hidden = true; fallback.hidden = false; }
    img.addEventListener("error", () => { img.hidden = true; fallback.hidden = false; });
  }
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
