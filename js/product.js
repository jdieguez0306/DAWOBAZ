"use strict";

/* =========================================================
   PRODUCT CATALOG  — edit this file to add / change products.

   !! ALL NAMES AND PRICES BELOW ARE SAMPLE PLACEHOLDERS !!
   Replace them with the real products and pricing from the owner.

   Fields:
     id        unique, no spaces (used by the cart)
     category  recital | apparel | bags | jackets | bling | holiday | logos
     name      product title
     price     number in dollars (e.g. 18.5)
     image     path like "images/products/recital-tee.jpg"
               leave "" to show the pink placeholder box
     options   list of choices shown in a dropdown (sizes, colors...)
     optionLabel  label for that dropdown (default "Size")
     description  one short line
   ========================================================= */

window.DAWOBAZ_CATEGORIES = {
    recital: {
        title: "Recital Shirts",
        intro: "Custom-designed recital shirts with names and personalization your dancers will love.",
        image: "images/categories/recital.png"
    },
    apparel: {
        title: "Custom Apparel",
        intro: "Tees, hoodies and more, printed with your studio or team artwork.",
        image: "images/categories/apparel.png"
    },
    bags: {
        title: "Dance Bags",
        intro: "Personalized dance bags for every dancer on your roster.",
        image: "images/categories/bags.png"
    },
    jackets: {
        title: "Team Jackets",
        intro: "Custom jackets that keep your whole team looking sharp.",
        image: "images/categories/jackets.png"
    },
    bling: {
        title: "Bling & Crystals",
        intro: "Rhinestones, crystals and custom bling to make every design sparkle.",
        image: "images/categories/bling.png"
    },
    holiday: {
        title: "Holiday Designs",
        intro: "Festive seasonal designs for recital shirts, jackets and bags.",
        image: "images/categories/holiday.png"
    },
    logos: {
        title: "Studio Logos",
        intro: "Custom logo artwork created for your studio, then used across all your apparel.",
        image: "images/categories/logos.png"
    }
};

const SIZES_YOUTH_ADULT = ["Youth S", "Youth M", "Youth L", "Adult S", "Adult M", "Adult L", "Adult XL", "Adult 2XL"];

window.DAWOBAZ_PRODUCTS = [
    /* ---- Recital shirts ---- */
    { id: "rec-tee-classic", category: "recital", name: "Classic Recital Tee", price: 15.0, image: "", options: SIZES_YOUTH_ADULT, description: "Soft cotton tee with your recital design and dancer name." },
    { id: "rec-tee-longsleeve", category: "recital", name: "Long Sleeve Recital Tee", price: 20.0, image: "", options: SIZES_YOUTH_ADULT, description: "Long sleeve version of our most popular recital shirt." },
    { id: "rec-tank", category: "recital", name: "Recital Tank Top", price: 14.0, image: "", options: SIZES_YOUTH_ADULT, description: "Lightweight tank for warm-weather shows." },

    /* ---- Custom apparel ---- */
    { id: "app-tee", category: "apparel", name: "Custom Studio Tee", price: 16.0, image: "", options: SIZES_YOUTH_ADULT, description: "Your studio artwork on a comfortable everyday tee." },
    { id: "app-hoodie", category: "apparel", name: "Custom Hoodie", price: 34.0, image: "", options: SIZES_YOUTH_ADULT, description: "Cozy pullover hoodie with front print." },
    { id: "app-crew", category: "apparel", name: "Crewneck Sweatshirt", price: 29.0, image: "", options: SIZES_YOUTH_ADULT, description: "Classic crewneck for practice days." },

    /* ---- Bags ---- */
    { id: "bag-duffel", category: "bags", name: "Personalized Duffel Bag", price: 32.0, image: "", options: ["Black", "Pink", "Navy"], optionLabel: "Color", description: "Roomy duffel with embroidered name." },
    { id: "bag-backpack", category: "bags", name: "Dance Backpack", price: 28.0, image: "", options: ["Black", "Pink", "Navy"], optionLabel: "Color", description: "Everyday backpack with studio logo." },

    /* ---- Jackets ---- */
    { id: "jkt-warmup", category: "jackets", name: "Team Warm-Up Jacket", price: 45.0, image: "", options: SIZES_YOUTH_ADULT, description: "Full-zip warm-up jacket with team logo and names." },
    { id: "jkt-windbreaker", category: "jackets", name: "Windbreaker", price: 38.0, image: "", options: SIZES_YOUTH_ADULT, description: "Lightweight windbreaker for travel and competitions." },

    /* ---- Bling ---- */
    { id: "bling-rhinestone", category: "bling", name: "Rhinestone Design Add-On", price: 8.0, image: "", options: ["Small", "Medium", "Large"], optionLabel: "Design size", description: "Add rhinestone sparkle to any apparel item." },
    { id: "bling-crystal-name", category: "bling", name: "Crystal Name Transfer", price: 10.0, image: "", options: ["Small", "Medium", "Large"], optionLabel: "Design size", description: "Dancer name in crystal stones." },

    /* ---- Holiday ---- */
    { id: "hol-tee", category: "holiday", name: "Holiday Recital Tee", price: 16.0, image: "", options: SIZES_YOUTH_ADULT, description: "Festive seasonal design on our classic tee." },
    { id: "hol-bag", category: "holiday", name: "Holiday Dance Bag", price: 30.0, image: "", options: ["Red", "Green", "Black"], optionLabel: "Color", description: "Seasonal bag for the holiday show." },

    /* ---- Studio logos ---- */
    { id: "logo-design", category: "logos", name: "Custom Studio Logo Design", price: 75.0, image: "", options: [], description: "Original logo artwork created for your studio." }
];

window.DAWOBAZ_CONFIG = {
    shipping: 20.0,        // flat shipping shown in the cart
    currency: "USD",
    phone: "812-663-7679",
    email: "orders@dawobaz.com"
};
