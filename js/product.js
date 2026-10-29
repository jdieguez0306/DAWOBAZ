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
        image: "images/Categories/custom_apparel_homepage.png"
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

    /* ---- Custom apparel ----
       group = section of the apparel page (see DAWOBAZ_GROUPS below):
       1 The Basics, 2 Fitted, 3 Fleece, 4 Pants */
    { id: "app-tshirt", category: "apparel", group: 1, name: "T-Shirt", image: "images/apparel/tshirt_product_person.gif", options: [], description: "" },
    { id: "app-comfy-t", category: "apparel", group: 1, name: "Comfy T", image: "images/apparel/comfyt_product_person.gif", options: [], description: "" },
    { id: "app-long-sleeve", category: "apparel", group: 1, name: "Long Sleeve T", image: "images/apparel/lst_product_person.gif", options: [], description: "" },
    { id: "app-ladies-v", category: "apparel", group: 1, name: "Ladies V-Neck", image: "images/apparel/fitted_v_comfyt_product_person.gif", options: [], description: "" },
    { id: "app-ladies-tank", category: "apparel", group: 1, name: "Ladies Tank", image: "images/apparel/ladies_tank_product_person.gif", options: [], description: "" },
    { id: "app-tiedye", category: "apparel", group: 1, name: "Tie Dye T", image: "images/apparel/tiedye_product_person.gif", options: [], description: "" },
    { id: "app-baseball-jersey", category: "apparel", group: 1, name: "Baseball Jersey", image: "images/apparel/baseball_jersey_person_big.gif", options: [], description: "" },
    { id: "app-fitted-comfy-t", category: "apparel", group: 2, name: "Fitted Comfy T", image: "images/apparel/fitted_comfyt_product_person.gif", options: [], description: "" },
    { id: "app-hoodie", category: "apparel", group: 3, name: "Hoodies", image: "images/apparel/hoodie_big.gif", options: [], description: "" },
    { id: "app-zip-hoodie", category: "apparel", group: 3, name: "Zip Hoodies", image: "images/apparel/ziphood_big.gif", options: [], description: "" },
    { id: "app-sweatshirt", category: "apparel", group: 3, name: "Sweatshirt", image: "images/apparel/cns_product_person.gif", options: [], description: "" },
    { id: "app-quarter-zip", category: "apparel", group: 3, name: "Quarter Zip SS", image: "images/apparel/quarter_zip_product_person.gif", options: [], description: "" },
    { id: "app-knit-shorts", category: "apparel", group: 4, name: "Knit Shorts", image: "images/apparel/knitshort_big_person.gif", options: [], description: "" },
    { id: "app-sweatpants", category: "apparel", group: 4, name: "Sweatpants", image: "images/apparel/sweatpant_big.gif", options: [], description: "" },
    { id: "app-leggings", category: "apparel", group: 4, name: "Leggings", image: "images/apparel/leggings_product_person.gif", options: [], description: "" },
    { id: "app-joggers", category: "apparel", group: 4, name: "Joggers", image: "images/apparel/joggers_person_big.gif", options: [], description: "" },
    { id: "app-booty-shorts", category: "apparel", group: 4, name: "Booty Shorts", image: "images/apparel/booty_shorts_person_big.gif", options: [], description: "" },
    
    /* ---- Bags ----
       group = which imprint group the bag belongs to (see DAWOBAZ_GROUPS below).
       style: number
    */
    { id: "bag-gear-bag",      category: "bags", group: 1, name: "Gear Bag",                 price: 30.0, style: 511,  image: "images/Bags/gear_bag.png",      options: [], description: "" },
    { id: "bag-spirit-bag",    category: "bags", group: 1, name: "Spirit Bag",               price: 35.0, style: 1825, image: "images/Bags/spirit_bag.png",    options: [], description: "" },
    { id: "bag-roll",          category: "bags", group: 2, name: "Roll Bag",                 price: 25.0, style: 8805, image: "images/Bags/Roll_bag.png",      options: [], description: "" },
    { id: "bag-garment-front", category: "bags", group: 2, name: "Garment Bag Front Print",  price: 40.0, style: 9009, image: "images/Bags/front_garment.png", options: [], description: "" },
    { id: "bag-M-duffle",      category: "bags", group: 2, name: "Medium Travel Duffel Bag", price: 50.0, style: 417,  image: "images/Bags/duffle_bag.png",    options: [], description: "" },
    { id: "bag-garment-back",  category: "bags", group: 3, name: "Garment Bag Back Print",   price: 40.0, style: 9009, image: "images/Bags/back_garment.png",  options: [], description: "" },
    { id: "bag-drawstring",    category: "bags", group: 3, name: "Drawstring Bag",           price: 25.0, style: 8881, image: "images/Bags/drawstring.png",    options: [], description: "" },
    { id: "bag-zip-tote",      category: "bags", group: 3, name: "Zip Tote Bag",             price: 30.0, style: 8802, image: "images/Bags/Zip_tote_bag.png",  options: [], description: "" },

    /* ---- Jackets ---- */
    { id: "medalist-warmup",      category: "jackets", name: "Medalist Warmup", price: 45.0, image: "", options: [], description: "" },
    { id: "fitness-warmup",       category: "jackets", name: "Fitness Warmup", price: 45.0, image: "", options: [], description: "" },
    { id: "quarter-zip",          category: "jackets", name: "Quarter Zip Sweatshirt", price: 38.0, image: "", options: [], description: "" },
    { id: "jerzee-fleece-warmup", category: "jackets", name: "Jerzee Fleece Warmup", price: 45.0, image: "", options: [], description: "" },
    { id: "nylon-warmup",         category: "jackets", name: "Classic Nylon Warmup", price: 45.0, image: "", options: [], description: "" },

    /* ---- Bling ---- */
    { id: "bling-glitter-flake", category: "bling", name: "Glitter Flake", price: 8.0,  image: "", options: [], description: "Add rhinestone sparkle to any apparel item." },
    { id: "bling-glitter-ink",   category: "bling", name: "Glitter Ink",   price: 10.0, image: "", options: [], description: "Dancer name in crystal stones." },

    /* ---- Holiday ---- */
    { id: "hol-tee", category: "holiday", name: "Holiday Recital Tee", price: 16.0, image: "", options: [], description: "Festive seasonal design on our classic tee." },
    { id: "hol-bag", category: "holiday", name: "Holiday Dance Bag", price: 30.0, image: "", options: ["Red", "Green", "Black"], optionLabel: "Color", description: "Seasonal bag for the holiday show." },

    /* ---- Studio logos ---- */
    { id: "logo-design", category: "logos", name: "Custom Studio Logo Design", price: 75.0, image: "", options: [], description: "Original logo artwork created for your studio." }
];

/* Groups used by pages that show products in sections (currently bags). */
window.DAWOBAZ_GROUPS = {
    apparel: [
        { id: 1, title: "The Basics", imprint: '10.5" wide' },
        { id: 2, title: "Fitted", imprint: '8" wide' },
        { id: 3, title: "Fleece" },
        { id: 4, title: "Pants" }
    ],
    bags: [
        { id: 1, title: "Group 1", imprint: '4" x 8"' },
        { id: 2, title: "Group 2", imprint: '6" x 6"' },
        { id: 3, title: "Group 3", imprint: '9" x 9"' }
    ]
};

window.DAWOBAZ_CONFIG = {
    shipping: 20.0,        // flat shipping shown in the cart
    currency: "USD",
    phone: "812-663-7679",
    email: "orders@dawobaz.com"
};
