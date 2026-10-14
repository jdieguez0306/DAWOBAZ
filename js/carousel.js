"use strict";

/* =========================================================
   HOME CAROUSEL — autoplay, arrows, dots, swipe, keyboard.
   Autoplay is off for people who prefer reduced motion.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".hero-carousel");
    if (!carousel) return;

    const slides = carousel.querySelectorAll(".carousel-slide");
    const dots = carousel.querySelectorAll(".carousel-dot");
    const previousButton = carousel.querySelector(".carousel-arrow-left");
    const nextButton = carousel.querySelector(".carousel-arrow-right");

    if (slides.length === 0 || dots.length !== slides.length || !previousButton || !nextButton) {
        return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let currentSlide = 0;
    let autoPlayTimer = null;

    function showSlide(index) {
        slides[currentSlide].classList.remove("active");
        slides[currentSlide].setAttribute("aria-hidden", "true");
        dots[currentSlide].classList.remove("active");
        dots[currentSlide].removeAttribute("aria-current");

        currentSlide = (index + slides.length) % slides.length;

        slides[currentSlide].classList.add("active");
        slides[currentSlide].removeAttribute("aria-hidden");
        dots[currentSlide].classList.add("active");
        dots[currentSlide].setAttribute("aria-current", "true");
    }

    function stopAutoPlay() {
        if (autoPlayTimer) {
            window.clearInterval(autoPlayTimer);
            autoPlayTimer = null;
        }
    }

    function startAutoPlay() {
        stopAutoPlay();
        if (reduceMotion) return;
        autoPlayTimer = window.setInterval(() => showSlide(currentSlide + 1), 6000);
    }

    slides.forEach((slide, i) => {
        if (i !== 0) slide.setAttribute("aria-hidden", "true");
    });

    nextButton.addEventListener("click", () => { showSlide(currentSlide + 1); startAutoPlay(); });
    previousButton.addEventListener("click", () => { showSlide(currentSlide - 1); startAutoPlay(); });
    dots.forEach((dot, i) => dot.addEventListener("click", () => { showSlide(i); startAutoPlay(); }));

    carousel.addEventListener("mouseenter", stopAutoPlay);
    carousel.addEventListener("mouseleave", startAutoPlay);
    carousel.addEventListener("focusin", stopAutoPlay);
    carousel.addEventListener("focusout", startAutoPlay);

    /* swipe on touch screens */
    let touchStartX = null;
    carousel.addEventListener("touchstart", (event) => {
        touchStartX = event.touches[0].clientX;
        stopAutoPlay();
    }, { passive: true });

    carousel.addEventListener("touchend", (event) => {
        if (touchStartX !== null) {
            const delta = event.changedTouches[0].clientX - touchStartX;
            if (Math.abs(delta) > 50) showSlide(currentSlide + (delta < 0 ? 1 : -1));
        }
        touchStartX = null;
        startAutoPlay();
    });

    /* don't spin in a background tab */
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) stopAutoPlay(); else startAutoPlay();
    });

    startAutoPlay();
});
