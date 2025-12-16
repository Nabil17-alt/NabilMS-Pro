document.addEventListener("DOMContentLoaded", function () {
    const navToggle = document.getElementById("nav-toggle");
    const navLinks = document.getElementById("nav-links");
    const yearSpan = document.getElementById("year");
    const contactForm = document.getElementById("contact-form");
    const waButton = document.getElementById("wa-button");

    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    if (navToggle && navLinks) {
        navToggle.addEventListener("click", function () {
            navLinks.classList.toggle("open");
        });

        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("open");
            });
        });
    }

    document.querySelectorAll(".faq-item").forEach(function (item) {
        const question = item.querySelector(".faq-question");
        if (!question) return;
        question.addEventListener("click", function () {
            const isActive = item.classList.contains("active");
            document.querySelectorAll(".faq-item").forEach(function (i) {
                i.classList.remove("active");
            });
            if (!isActive) {
                item.classList.add("active");
            }
        });
    });

    const defaultWaNumber = "6385924411619";

    function buildWhatsAppUrl(name, email, whatsapp, message) {
        const target = defaultWaNumber;
        const lines = [];
        lines.push("Halo, saya tertarik dengan paket EA & Indikator NabilMS Pro.");
        if (name) lines.push("Nama: " + name);
        if (email) lines.push("Email: " + email);
        if (whatsapp) lines.push("WhatsApp: " + whatsapp);
        if (message) {
            lines.push("");
            lines.push("Pesan:");
            lines.push(message);
        }
        const text = encodeURIComponent(lines.join("\n"));
        return "https://wa.me/" + target + "?text=" + text;
    }

    if (waButton) {
        waButton.addEventListener("click", function (e) {
            const form = contactForm;
            if (!form) return;
            const name = form.querySelector("#name").value.trim();
            const email = form.querySelector("#email").value.trim();
            const wa = form.querySelector("#whatsapp").value.trim();
            const msg = form.querySelector("#message").value.trim();
            const url = buildWhatsAppUrl(name, email, wa, msg);
            waButton.setAttribute("href", url);
        });
    }

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const name = contactForm.querySelector("#name").value.trim();
            const email = contactForm.querySelector("#email").value.trim();
            const wa = contactForm.querySelector("#whatsapp").value.trim();
            const msg = contactForm.querySelector("#message").value.trim();
            const url = buildWhatsAppUrl(name, email, wa, msg);
            window.open(url, "_blank");
        });
    }
});