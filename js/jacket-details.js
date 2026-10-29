"use strict";
/* Edit each product entry as the owner confirms specifications and photos.
   Images and colorImages use paths relative to the website root. */
window.DAWOBAZ_JACKET_DETAILS = {
  "medalist-warmup": { description: "A coordinated warmup option for dance studios and teams.", fabric: "Fabric details to be confirmed.", fit: "Fit and sizing to be confirmed.", customization: "Ask about adding your studio or team logo.", colors: [], sizes: [], images: [], colorImages: {}, features: ["Team customization available upon request"] },
  "fitness-warmup": { description: "A warmup style for practices, events, and team apparel.", fabric: "Fabric details to be confirmed.", fit: "Fit and sizing to be confirmed.", customization: "Ask about adding your studio or team logo.", colors: [], sizes: [], images: [], colorImages: {}, features: ["Team customization available upon request"] },
  "quarter-zip": { description: "A quarter-zip sweatshirt option for studio and team wear.", fabric: "Fabric details to be confirmed.", fit: "Fit and sizing to be confirmed.", customization: "Ask about adding your studio or team logo.", colors: [], sizes: [], images: [], colorImages: {}, features: ["Quarter-zip neckline"] },
  "jerzee-fleece-warmup": { description: "A fleece warmup option for dance studios and teams.", fabric: "Fabric details to be confirmed.", fit: "Fit and sizing to be confirmed.", customization: "Ask about adding your studio or team logo.", colors: [], sizes: [], images: [], colorImages: {}, features: ["Fleece warmup style"] },
  "nylon-warmup": { description: "A classic nylon warmup option for coordinated team apparel.", fabric: "Nylon warmup; composition to be confirmed.", fit: "Fit and sizing to be confirmed.", customization: "Ask about adding your studio or team logo.", colors: [], sizes: [], images: [], colorImages: {}, features: ["Classic warmup style"] }
};

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("jacket-detail-root");
  if (!root) return;
  const params = new URLSearchParams(location.search);
  const id = params.get("id") || params.get("item");
  const product = (window.DAWOBAZ_PRODUCTS || []).find(p => p.category === "jackets" && p.id === id);
  if (!product) {
    root.innerHTML = '<div class="jacket-not-found"><h2>Jacket not found</h2><p>Please return to the jacket collection.</p><a class="button button-pink" href="jackets.html">Browse Jackets</a></div>';
    return;
  }
  const d = window.DAWOBAZ_JACKET_DETAILS[product.id] || {};
  const byId = id => document.getElementById(id);
  const setText = (id, value) => { const el = byId(id); if (el) el.textContent = value || "Details coming soon."; };
  document.title = `${product.name} | DAWOBAZ`;
  setText("jacket-breadcrumb", product.name);
  setText("jacket-page-title", product.name);
  setText("jacket-product-name", product.name);
  setText("jacket-description", d.description);
  setText("jacket-fabric", d.fabric);
  setText("jacket-fit", d.fit);
  setText("jacket-customization", d.customization);
  const features = byId("jacket-features");
  (d.features && d.features.length ? d.features : ["Product details to be confirmed."]).forEach(item => {
    const li = document.createElement("li"); li.textContent = item; features.appendChild(li);
  });
  const main = byId("jacket-main-photo");
  const thumbs = byId("jacket-thumbnails");
  const photos = [product.image, ...(d.images || [])].filter(Boolean);
  const showPhoto = src => {
    main.replaceChildren();
    if (!src) { const note = document.createElement("p"); note.textContent = "Product photo coming soon"; main.appendChild(note); return; }
    const img = document.createElement("img"); img.src = src; img.alt = product.name;
    img.onerror = () => showPhoto(""); main.appendChild(img);
  };
  showPhoto(photos[0]);
  photos.forEach((src, index) => {
    const button = document.createElement("button"); button.type = "button"; button.className = "jacket-thumb";
    button.setAttribute("aria-label", `View product photo ${index + 1}`);
    const img = document.createElement("img"); img.src = src; img.alt = "";
    button.appendChild(img); button.addEventListener("click", () => showPhoto(src)); thumbs.appendChild(button);
  });
  const fields = byId("jacket-fields");
  const makeSelect = (label, values, selectId) => {
    if (!Array.isArray(values) || !values.length) return;
    const lab = document.createElement("label"); lab.htmlFor = selectId; lab.textContent = label;
    const select = document.createElement("select"); select.id = selectId;
    values.forEach(value => { const option = document.createElement("option"); option.value = value; option.textContent = value; select.appendChild(option); });
    fields.append(lab, select);
  };
  makeSelect("Size", d.sizes, "jacket-size");
  makeSelect("Color", d.colors, "jacket-color");
  const color = byId("jacket-color");
  if (color) color.addEventListener("change", () => showPhoto((d.colorImages || {})[color.value] || photos[0]));
  byId("jacket-add").addEventListener("click", () => {
    if (!window.DawobazCart) { setText("jacket-status", "Order list is unavailable. Please refresh the page."); return; }
    const choices = [];
    const size = byId("jacket-size");
    if (size) choices.push(`Size: ${size.value}`);
    if (color) choices.push(`Color: ${color.value}`);
    window.DawobazCart.add(product.id, choices.join(" / "), byId("jacket-quantity").value, "Selections");
    setText("jacket-status", `${product.name} added to your order list.`);
  });
});
