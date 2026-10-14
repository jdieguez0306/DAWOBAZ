"use strict";

/* =========================================================
   FORMS — any <form data-form="contact|order|sizerun|design|newsletter">
   is sent to php/send.php, which emails the shop.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const ENDPOINT = "php/send.php";

    document.querySelectorAll("form[data-form]").forEach((form) => {
        const status = form.querySelector(".form-status");
        const submit = form.querySelector('button[type="submit"]');

        function say(text, ok) {
            if (!status) return;
            status.textContent = text;
            status.classList.toggle("is-ok", ok === true);
            status.classList.toggle("is-error", ok === false);
        }

        form.addEventListener("submit", async (event) => {
            event.preventDefault();

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            const data = new FormData(form);
            data.set("form_type", form.dataset.form);

            const originalLabel = submit ? submit.textContent : "";
            if (submit) {
                submit.disabled = true;
                submit.textContent = "Sending...";
            }
            say("", null);

            try {
                const response = await fetch(ENDPOINT, { method: "POST", body: data });
                const result = await response.json();

                if (!response.ok || !result.ok) {
                    throw new Error(result.error || "Something went wrong.");
                }

                say(result.message || "Thank you! We'll be in touch soon.", true);
                form.reset();
                if (form.dataset.form === "order") {
                    document.dispatchEvent(new CustomEvent("order:sent"));
                }
            } catch (error) {
                say(
                    "Sorry, we couldn't send that. Please try again or call 812-663-7679.",
                    false
                );
            } finally {
                if (submit) {
                    submit.disabled = false;
                    submit.textContent = originalLabel;
                }
            }
        });
    });
});
