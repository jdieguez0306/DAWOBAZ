
"use strict";

/* ==========================================
   DAWOBAZ - HOLIDAY CATALOG
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const catalog = document.getElementById("holiday-catalog");
    const seriesSelect = document.getElementById("holiday-series-select");

    if (!catalog) return;

    /* --------------------------------------
       GET HOLIDAY PRODUCTS
    -------------------------------------- */

    const allProducts = window.DAWOBAZ_PRODUCTS || [];

    const holidayProducts = allProducts.filter(
        product => product.category === "holiday"
    );

    if (holidayProducts.length === 0) {
        catalog.innerHTML = `
            <p class="holiday-empty">
                Holiday designs are coming soon.
            </p>
        `;
        return;
    }

    /* --------------------------------------
       COLLECTION ORDER
    -------------------------------------- */

    const seriesOrder = [
        "2600",
        "2500",
        "2400",
        "2300",
        "2200",
        "2000",
        "1900",
        "1800",
        "1700",
        "1600",
        "1500",
        "1400",
        "stfz",
        "1300",
        "1100",
        "1000",
        "900"
    ];

    /* --------------------------------------
       GROUP PRODUCTS
    -------------------------------------- */

    const groupedProducts = {};

    holidayProducts.forEach(product => {

        const group = String(product.group || "other")
            .toLowerCase();

        if (!groupedProducts[group]) {
            groupedProducts[group] = [];
        }

        groupedProducts[group].push(product);
    });

    /* --------------------------------------
       HELPER: CREATE HTML ELEMENT
    -------------------------------------- */

    function createElement(tag, className, text) {
        const element = document.createElement(tag);

        if (className) {
            element.className = className;
        }

        if (text !== undefined && text !== null) {
            element.textContent = String(text);
        }

        return element;
    }

    /* --------------------------------------
       CREATE PRODUCT CARD
    -------------------------------------- */

    function createProductCard(product) {

        const card = createElement(
            "article",
            "holiday-design-card"
        );

        /* IMAGE */

        const imageContainer = createElement(
            "div",
            "holiday-design-image"
        );

        if (product.image) {

            const image = document.createElement("img");

            image.src = product.image;
            image.alt = `${product.code || product.name} Holiday Design`;
            image.loading = "lazy";

            imageContainer.appendChild(image);

        } else {

            const placeholder = createElement(
                "span",
                "holiday-design-placeholder",
                "Design image coming soon"
            );

            imageContainer.appendChild(placeholder);
        }

        /* PRODUCT INFORMATION */

        const content = createElement(
            "div",
            "holiday-design-content"
        );

        const designCode =
            product.code || product.name || product.id;

        const title = createElement(
            "h3",
            "",
            designCode
        );

        content.appendChild(title);

        /* INK COLORS */

        if (
            product.inkColors !== undefined &&
            product.inkColors !== null
        ) {

            const inkCount = Number(product.inkColors);

            const inkText = createElement(
                "p",
                "",
                `${inkCount} ink ${inkCount === 1 ? "color" : "colors"}`
            );

            content.appendChild(inkText);
        }

        /* GARMENT EXAMPLE */

        if (product.garmentExample) {

            const garmentText = createElement(
                "p",
                "",
                `Shown on ${product.garmentExample}`
            );

            content.appendChild(garmentText);
        }

        /* FALLBACK DESCRIPTION */

        if (
            !product.garmentExample &&
            product.inkColors == null &&
            product.description
        ) {

            content.appendChild(
                createElement("p", "", product.description)
            );
        }

        /* REQUEST DESIGN BUTTON */

        const requestButton = createElement(
            "a",
            "button button-dark",
            "Request This Design"
        );

        requestButton.href =
            `custom-design.html?design=${encodeURIComponent(designCode)}`;

        content.appendChild(requestButton);

        card.appendChild(imageContainer);
        card.appendChild(content);

        return card;
    }

    /* --------------------------------------
       CREATE COLLECTION SECTION
    -------------------------------------- */

    function createSeriesSection(series, products) {

        const section = createElement(
            "section",
            "holiday-series"
        );

        section.id = `series-${series}`;

        const headingWrapper = createElement(
            "div",
            "holiday-series-heading"
        );

        const heading = createElement(
            "h2",
            "",
            series === "stfz"
                ? "STFZ Holiday Designs"
                : `${series} Series Holiday Designs`
        );

        heading.id = `heading-${series}`;

        section.setAttribute(
            "aria-labelledby",
            heading.id
        );

        const count = createElement(
            "span",
            "",
            `${products.length} ${products.length === 1 ? "design" : "designs"}`
        );

        headingWrapper.appendChild(heading);
        headingWrapper.appendChild(count);

        /* PRODUCT GRID */

        const grid = createElement(
            "div",
            "holiday-design-grid"
        );

        products.forEach(product => {
            grid.appendChild(createProductCard(product));
        });

        section.appendChild(headingWrapper);
        section.appendChild(grid);

        return section;
    }

    /* --------------------------------------
       RENDER ALL COLLECTIONS
    -------------------------------------- */

    seriesOrder.forEach(series => {

        const products = groupedProducts[series];

        if (!products || products.length === 0) {
            return;
        }

        const section = createSeriesSection(
            series,
            products
        );

        catalog.appendChild(section);
    });

    /* --------------------------------------
       HANDLE COLLECTION DROPDOWN
    -------------------------------------- */

    if (seriesSelect) {

        seriesSelect.addEventListener("change", () => {

            const selectedSeries = seriesSelect.value;

            if (!selectedSeries) return;

            const section = document.getElementById(
                selectedSeries
            );

            if (section) {
                section.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    }

});
