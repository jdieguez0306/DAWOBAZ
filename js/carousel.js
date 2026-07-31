"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".carousel-slide");
    const dots = document.querySelectorAll(".carousel-dot");
    const previousButton = document.querySelector(".carousel-arrow-left");
    const nextButton = document.querySelector(".carousel-arrow-right");

    if (
        slides.length === 0 ||
        dots.length !== slides.length ||
        !previousButton ||
        !nextButton
    ) {
        console.error("Carousel setup is incomplete.");
        return;
    }

    let currentSlide = 0;
    let autoPlayTimer;

    function showSlide(index) {
        slides[currentSlide].classList.remove("active");
        dots[currentSlide].classList.remove("active");

        currentSlide = (index + slides.length) % slides.length;

        slides[currentSlide].classList.add("active");
        dots[currentSlide].classList.add("active");
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function previousSlide() {
        showSlide(currentSlide - 1);
    }

    function startAutoPlay() {
        stopAutoPlay();
        autoPlayTimer = window.setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
        if (autoPlayTimer) {
            window.clearInterval(autoPlayTimer);
        }
    }

    nextButton.addEventListener("click", () => {
        nextSlide();
        startAutoPlay();
    });

    previousButton.addEventListener("click", () => {
        previousSlide();
        startAutoPlay();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showSlide(index);
            startAutoPlay();
        });
    });

    const carousel = document.querySelector(".hero-carousel");

    carousel.addEventListener("mouseenter", stopAutoPlay);
    carousel.addEventListener("mouseleave", startAutoPlay);

    startAutoPlay();
    // Dropdown menu functionality
    const dropdownToggle = document.querySelector(".dropdown-toggle");
    const dropdownMenu = document.querySelector(".dropdown-menu");

    if (dropdownToggle && dropdownMenu) {

        dropdownToggle.addEventListener("click", () => {

            const isOpen =
                dropdownToggle.getAttribute("aria-expanded") === "true";

            dropdownToggle.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );

            dropdownMenu.classList.toggle("open");

        });

        document.addEventListener("click", (event) => {

            const dropdown =
                document.querySelector(".nav-dropdown");

            if (dropdown && !dropdown.contains(event.target)) {

                dropdownToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                dropdownMenu.classList.remove("open");

            }

        });

    }
});