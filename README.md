# Impact Engineering Solutions — Website

A responsive, multi-page static website built with **HTML5, CSS3, and vanilla JavaScript** only. No frameworks, no build tools.

---

## 1. Directory structure

```
impact-es/
├── index.html                  Home
├── about.html                  About Us
├── products.html               Products overview
├── firefighting-pumps.html     Product category
├── dewatering-pumps.html       Product category
├── hydro-pneumatic-pumps.html  Product category
├── industrial-pumps.html       Product category
├── hvac-pumps.html             Product category
├── contact.html                Contact + enquiry form
├── 404.html                    Not-found page
├── favicon.ico                 Placeholder — replace with real icon
├── css/
│   └── style.css               All styles
├── js/
│   └── script.js               All behaviour + CONFIG
├── assets/
│   └── images/                 Placeholder images (.svg) + favicon.svg
└── README.md
```

---

## 2. Replacing the images

All images live in `assets/images/` and are **clearly-marked placeholder SVGs** (navy background with a pump schematic and a label). Replace them with your own royalty-free industrial pump photos.

**Two ways to do it:**

- **Easiest:** Save your photo using the *exact same filename* as the placeholder (keep the `.svg` name, or see the note below to switch to `.jpg`). No code changes needed.
- **Cleaner (recommended for photos):** Add real `.jpg`/`.webp` files and update the `src` in the HTML. Each `<img>` is tagged with a descriptive `alt` — update that too.

> **Placeholders are `.svg`, real photos are usually `.jpg`.** If you add `hero-pump.jpg` instead of replacing `hero-pump.svg`, update two places:
> 1. In every HTML file, change `assets/images/xxx.svg` → `assets/images/xxx.jpg`.
> 2. In `css/style.css`, the hero references `../assets/images/hero-pump.jpg` **already** (search for `hero-pump`). If you keep the SVG, change it to `.svg` there.

Key images:

| File | Used on | Suggested size |
|---|---|---|
| `hero-pump.svg` | Home hero background | 1600×900 |
| `cat-*.svg` | Category cards (all pages) | 800×500 |
| `prod-*.svg` | Individual product cards | 800×500 |
| `about-facility.svg` | About page | 800×500 |
| `favicon.svg` | Browser tab icon | 64×64 |

Every place an image can be swapped is marked in the HTML with a normal `<img>` tag and `alt` text.

---

## 3. Adding the WhatsApp and telephone numbers

Open **`js/script.js`**. At the very top is a single `SITE_CONFIG` block:

```js
const SITE_CONFIG = {
  whatsappNumber: "",      // e.g. "919876543210"  (country code + number, digits only, no + or spaces)
  whatsappMessage: "Hello Impact Engineering Solutions, I would like to enquire...",
  businessPhone: "",       // e.g. "+91 98765 43210"  (optional click-to-call)
  analyticsId: ""          // optional
};
```

- **WhatsApp:** put the full international number in `whatsappNumber` (for India: `91` + 10-digit number, e.g. `919876543210`). The floating green button then opens `https://wa.me/…` with your pre-filled message. *Until you set it, the button safely links to the Contact page.*
- **Phone:** set `businessPhone` to enable click-to-call. To show it, uncomment the marked `<li>`/contact block in `contact.html` and the footer (search for `data-phone-link`).
- **Analytics (optional):** paste your snippet where each HTML file says `<!-- OPTIONAL: paste your web analytics snippet here -->` (in `<head>`).

---

## 4. Activating and testing the enquiry form

The form uses **[FormSubmit.co](https://formsubmit.co)** — a free service that emails form submissions without any server or credentials. It is configured to send to **Hypn.impact@gmail.com**.

> **⚠️ One-time activation is required.** FormSubmit needs you to confirm the email address **once** before it will deliver submissions.

**Steps:**
1. Publish the site (or run it locally *and* open the live URL — activation needs a real submission).
2. Go to the **Contact** page and submit a test enquiry.
3. FormSubmit sends a **confirmation email to Hypn.impact@gmail.com** with an activation link.
4. Open that email and click **Activate**.
5. Submit one more test — it should now arrive in the inbox with the subject **"New Website Enquiry – Impact Engineering Solutions"**.

Notes:
- Submissions arrive as a formatted table (`_template: table`), captcha is disabled (`_captcha: false`), and file attachments (BOQ/specs) are supported.
- **Do not publish before activating and testing** — otherwise the first real customer enquiry may fail silently.
- The form is **not** a `mailto:` link, so it works even for visitors without an email app installed.
- If you'd rather receive at `Sales@impactes.in`, change the `action` URL in `contact.html` and re-activate.

---

## 5. Testing locally

Because the pages use relative links, you can open `index.html` directly — but a local server is better (the form and some browsers behave more realistically):

**Option A — Python (built in on most systems):**
```bash
cd impact-es
python3 -m http.server 8000
# then open http://localhost:8000
```

**Option B — Node:**
```bash
npx serve impact-es
```

**Option C — VS Code:** install the *Live Server* extension, right-click `index.html` → *Open with Live Server*.

Test at these widths (browser dev-tools device toolbar): **360px, 768px, 1024px, 1440px**.

---

## 6. Publishing for free

### GitHub Pages
1. Create a GitHub repo and push the contents of `impact-es/` to it.
2. Repo **Settings → Pages** → Source: `main` branch, `/root` → **Save**.
3. Your site goes live at `https://<username>.github.io/<repo>/` within a minute or two.
4. (Optional) Add a custom domain under the same Pages settings.

### Netlify
1. Log in at netlify.com → **Add new site → Deploy manually**.
2. Drag-and-drop the `impact-es` folder. Done.
3. Or connect the GitHub repo for automatic deploys on every push.

### Cloudflare Pages
1. Dashboard → **Workers & Pages → Create → Pages**.
2. Connect your Git repo (or upload the folder directly).
3. Build command: *none*. Output directory: `/` (root). Deploy.

> After publishing, update the `SITE_URL` value at the top of the SEO tags if you use a custom domain (search `https://www.impactes.in` in the HTML — it's used for canonical URLs, Open Graph and schema).

---

## 7. Final checklist

**Responsiveness**
- [x] Layouts tested at 360 / 768 / 1024 / 1440 px
- [x] Mobile hamburger menu with expandable Products submenu
- [x] No horizontal overflow on mobile
- [x] Large, easy touch targets (min 44–48px)

**Navigation**
- [x] Shared header and footer on every page
- [x] Products dropdown on desktop, accordion on mobile
- [x] Active-page highlighting
- [x] "Enquire Now" buttons open Contact with the category preselected (`?category=…`)
- [x] Smooth scrolling and back-to-top button

**Contact details** (used exactly as supplied)
- [x] Registered office, workshop address, GSTIN
- [x] Clickable `mailto:` links (Sales@impactes.in, Hypn.impact@gmail.com)
- [x] "Get Directions" opens Google Maps in a new tab
- [x] Floating WhatsApp button (number set in `js/script.js`)

**Form configuration**
- [x] FormSubmit.co, POST, multipart/form-data → Hypn.impact@gmail.com
- [x] Hidden fields: `_subject`, `_captcha=false`, `_template=table`
- [x] All required fields validated; clear success/error states
- [x] File attachment for BOQ/specs + consent checkbox
- [ ] **You must activate FormSubmit once before publishing** (see §4)

**Accessibility**
- [x] Semantic HTML, skip-link, keyboard navigation, visible focus rings
- [x] Sufficient colour contrast, `alt` text on images, `aria` labels
- [x] Reduced-motion respected

**SEO**
- [x] Unique titles + meta descriptions per page
- [x] Open Graph tags, LocalBusiness schema (home)
- [x] Lazy-loaded images, single CSS/JS file, no trackers/cookies

**Before you go live**
- [ ] Replace placeholder images
- [ ] Add WhatsApp number (and phone, if wanted)
- [ ] Activate + test the enquiry form
- [ ] Replace `favicon.ico` and add real favicon files
- [ ] Confirm the Google Maps embed/point is correct for your location

---

### Notes on integrity of content
No certifications, customer names, years of experience, awards, phone numbers, or product specifications have been invented. Any example figures in form placeholders (e.g. "20 m³/hr") are clearly illustrative. Update all copy with your verified details before publishing.
