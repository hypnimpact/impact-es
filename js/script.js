/* ==========================================================================
   Impact Engineering Solutions — script.js
   ========================================================================== */

/* ---------------------------------------------------------------------------
   CONFIGURATION  — edit these values when going live
   --------------------------------------------------------------------------- */
const SITE_CONFIG = {
  // 👉 Add your WhatsApp number in full international format, digits only,
  //    no "+", no spaces. Example for India: "919876543210"
  whatsappNumber: "",              // e.g. "919876543210"
  whatsappMessage: "Hello Impact Engineering Solutions, I would like to enquire about your pumping solutions.",

  // 👉 Add your business phone number for click-to-call links (optional).
  businessPhone: "",               // e.g. "+91 98765 43210"

  // 👉 Optional: paste an analytics snippet ID here later if you add one.
  analyticsId: ""
};

/* ---------------------------------------------------------------------------
   Mobile nav toggle
   --------------------------------------------------------------------------- */
(function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("main-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // Products dropdown (click on mobile, hover on desktop via CSS)
  const drop = nav.querySelector(".has-dropdown");
  if (drop) {
    const dropToggle = drop.querySelector(".dropdown-toggle");
    dropToggle.addEventListener("click", (e) => {
      // Only intercept as accordion on small screens
      if (window.matchMedia("(max-width: 900px)").matches) {
        e.preventDefault();
        const expanded = drop.getAttribute("aria-expanded") === "true";
        drop.setAttribute("aria-expanded", expanded ? "false" : "true");
      }
    });
    // Keyboard support on desktop
    dropToggle.addEventListener("keydown", (e) => {
      if (e.key === "Escape") drop.setAttribute("aria-expanded", "false");
    });
  }

  // Close mobile menu when a real link is tapped
  nav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      if (!a.classList.contains("dropdown-toggle")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  });
})();

/* ---------------------------------------------------------------------------
   Active nav state based on current file
   --------------------------------------------------------------------------- */
(function markActive() {
  const page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".main-nav a").forEach((a) => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === page) a.classList.add("active");
  });
  // Highlight the Products parent when on any product sub-page
  const productPages = [
    "products.html", "firefighting-pumps.html", "dewatering-pumps.html",
    "hydro-pneumatic-pumps.html", "industrial-pumps.html", "hvac-pumps.html"
  ];
  if (productPages.includes(page)) {
    const parent = document.querySelector(".dropdown-toggle");
    if (parent) parent.classList.add("active");
  }
})();

/* ---------------------------------------------------------------------------
   Back-to-top button
   --------------------------------------------------------------------------- */
(function backToTop() {
  const btn = document.querySelector(".back-to-top");
  if (!btn) return;
  const onScroll = () => btn.classList.toggle("show", window.scrollY > 500);
  window.addEventListener("scroll", onScroll, { passive: true });
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  onScroll();
})();

/* ---------------------------------------------------------------------------
   Footer year
   --------------------------------------------------------------------------- */
(function year() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
})();

/* ---------------------------------------------------------------------------
   WhatsApp floating button
   --------------------------------------------------------------------------- */
(function whatsapp() {
  const fab = document.querySelector(".whatsapp-fab");
  if (!fab) return;
  if (SITE_CONFIG.whatsappNumber) {
    const url = "https://wa.me/" + SITE_CONFIG.whatsappNumber +
      "?text=" + encodeURIComponent(SITE_CONFIG.whatsappMessage);
    fab.setAttribute("href", url);
  } else {
    // No number configured yet — link to contact page as a safe fallback.
    fab.setAttribute("href", "contact.html");
    fab.setAttribute("title", "Contact us (add WhatsApp number in js/script.js)");
  }
})();

/* ---------------------------------------------------------------------------
   Business phone links (optional)
   --------------------------------------------------------------------------- */
(function phone() {
  if (!SITE_CONFIG.businessPhone) return;
  document.querySelectorAll("[data-phone-link]").forEach((el) => {
    el.setAttribute("href", "tel:" + SITE_CONFIG.businessPhone.replace(/\s+/g, ""));
    el.textContent = SITE_CONFIG.businessPhone;
  });
})();

/* ---------------------------------------------------------------------------
   Scroll reveal (respects reduced-motion)
   --------------------------------------------------------------------------- */
(function reveal() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach((el) => io.observe(el));
})();

/* ---------------------------------------------------------------------------
   Contact form: preselect product category from URL (?category=...)
   --------------------------------------------------------------------------- */
(function preselectCategory() {
  const select = document.getElementById("category");
  if (!select) return;
  const params = new URLSearchParams(location.search);
  const cat = params.get("category");
  if (!cat) return;
  const wanted = cat.toLowerCase();
  Array.from(select.options).forEach((opt) => {
    if (opt.value.toLowerCase() === wanted) opt.selected = true;
  });
})();

/* ---------------------------------------------------------------------------
   Contact form: validation + submit UX (FormSubmit.co via fetch)
   --------------------------------------------------------------------------- */
(function contactForm() {
  const form = document.getElementById("enquiry-form");
  if (!form) return;
  const status = document.getElementById("form-status");

  const showError = (field, message) => {
    field.classList.add("invalid");
    const msg = field.querySelector(".error-msg");
    if (msg) msg.textContent = message;
  };
  const clearError = (field) => {
    field.classList.remove("invalid");
    const msg = field.querySelector(".error-msg");
    if (msg) msg.textContent = "";
  };

  const validate = () => {
    let ok = true;
    form.querySelectorAll(".field").forEach((field) => {
      const control = field.querySelector("input, select, textarea");
      if (!control || control.type === "file") return;
      clearError(field);

      if (control.hasAttribute("required") && !control.value.trim()) {
        showError(field, "This field is required.");
        ok = false;
        return;
      }
      if (control.type === "email" && control.value) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(control.value)) { showError(field, "Enter a valid email address."); ok = false; }
      }
      if (control.name === "Mobile Number" && control.value) {
        const digits = control.value.replace(/[^\d]/g, "");
        if (digits.length < 7) { showError(field, "Enter a valid mobile number."); ok = false; }
      }
    });
    // Consent
    const consent = form.querySelector("#consent");
    const consentField = consent ? consent.closest(".field") : null;
    if (consent && !consent.checked) {
      if (consentField) showError(consentField, "Please provide your consent to proceed.");
      ok = false;
    } else if (consentField) {
      clearError(consentField);
    }
    return ok;
  };

  const setStatus = (type, message) => {
    if (!status) return;
    status.className = "form-status show " + type;
    status.textContent = message;
    status.setAttribute("role", type === "error" ? "alert" : "status");
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validate()) {
      setStatus("error", "Please correct the highlighted fields and try again.");
      return;
    }
    const submitBtn = form.querySelector("[type='submit']");
    const original = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });
      if (res.ok) {
        setStatus("success", "Thank you. Your enquiry has been sent. We will get back to you shortly.");
        form.reset();
      } else {
        // FormSubmit may need one-time activation on first send.
        setStatus("error",
          "We couldn't submit the form automatically. If this is the first submission, the owner must activate FormSubmit. Meanwhile, please email Hypn.impact@gmail.com.");
      }
    } catch (err) {
      setStatus("error",
        "Network error while sending. Please check your connection or email Hypn.impact@gmail.com directly.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = original;
    }
  });

  // Clear errors as the user types
  form.querySelectorAll("input, select, textarea").forEach((el) => {
    el.addEventListener("input", () => {
      const field = el.closest(".field");
      if (field) {
        field.classList.remove("invalid");
        const msg = field.querySelector(".error-msg");
        if (msg) msg.textContent = "";
      }
    });
  });
})();
