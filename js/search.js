"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.querySelector(".search-button");
    const searchContainer = document.querySelector(".search-container");
    const searchInput = document.querySelector("#site-search");

    console.log("Search script loaded");
    console.log({
        searchButton,
        searchContainer,
        searchInput
    });

    if (!searchButton || !searchContainer || !searchInput) {
        console.error("One or more search elements were not found.");
        return;
    }

    searchButton.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        const isOpen = searchContainer.classList.toggle("active");

        searchButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        if (isOpen) {
            searchInput.focus();
        }
    });

    searchContainer.addEventListener("click", (event) => {
        event.stopPropagation();
    });

    document.addEventListener("click", () => {
        searchContainer.classList.remove("active");
        searchButton.setAttribute("aria-expanded", "false");
    });

    searchInput.addEventListener("keydown", (event) => {
        if (event.key !== "Enter") {
            return;
        }

        event.preventDefault();

        const searchTerm = searchInput.value
            .trim()
            .toLowerCase();

        const searchPages = [
            {
                keywords: ["recital", "recital shirt", "recital shirts"],
                page: "https://www.dawobaz.com/recital.html"
            },
            {
                keywords: ["apparel", "custom apparel", "shirt", "shirts"],
                page: "https://www.dawobaz.com/apparel.html"
            },
            {
                keywords: ["bag", "bags", "dance bag", "dance bags"],
                page: "https://www.dawobaz.com/bags.html"
            },
            {
                keywords: ["jacket", "jackets", "team jacket"],
                page: "https://www.dawobaz.com/jackets.html"
            },
            {
                keywords: ["bling", "rhinestone", "rhinestones", "crystal"],
                page: "https://www.dawobaz.com/bling.html"
            },
            {
                keywords: ["holiday", "christmas", "holiday designs"],
                page: "https://www.dawobaz.com/holiday.html"
            },
            {
                keywords: ["studio store", "online store"],
                page: "studio_store.html"
            },
            {
                keywords: ["artwork", "request artwork", "design"],
                page: "https://www.dawobaz.com/dwform1.php"
            },
            {
                keywords: ["size run", "sizing", "sizes"],
                page: "https://www.dawobaz.com/size_run_request.html"
            },
            {
                keywords: ["order", "start an order"],
                page: "http://www.dawobaz.com/dwform_order.php"
            },
            {
                keywords: ["contact", "email", "phone"],
                page: "contact.html"
            }
        ];

        const result = searchPages.find((item) =>
            item.keywords.some((keyword) =>
                searchTerm.includes(keyword)
            )
        );

        if (result) {
            window.location.href = result.page;
        } else {
            alert(`No results found for "${searchInput.value}".`);
        }
    });
});