# Shree Vardhaman Mahaveer Kendra — website

A five-page static website. No build step, no framework, no dependencies to
install. Open `index.html` in a browser, or upload the whole folder to any host.

```
index.html        Home
about.html        About the Kendra
facilities.html   Rooms, hall, terrace
gallery.html      12 photographs, filterable, with a lightbox
contact.html      Address, Plus Code, map, directions

assets/css/site.css    all styling
assets/js/site.js      all behaviour  <-- contact details live at the top
assets/images/         the 12 photographs
assets/img/            logo mark / favicon
```

---

## 1. Set the phone number  ← do this first

Every WhatsApp button, call link and footer number on all five pages is
generated from one place. Open **`assets/js/site.js`** and edit the first few
lines:

```js
var KENDRA = {
  // Full number in international format, digits only. No +, no spaces.
  // For an Indian mobile 98765 43210  ->  "919876543210"
  phone: '910000000000',

  // How the number should read on screen.
  phoneDisplay: '+91 00000 00000',

  // Pre-filled text that appears in the visitor's WhatsApp chat.
  waMessage: 'Jai Jinendra. I would like to know more about ...',

  email: 'info@mahaveerkendra.in',
  ...
};
```

Change `phone`, `phoneDisplay` and `email`. Save. Done — nothing else to edit.

The site currently ships with a **placeholder number (`+91 00000 00000`)**, so
the WhatsApp and call buttons will not reach anyone until this is changed.

---

## 2. Check the wording

The address, Plus Code and photographs are taken from the existing site and are
accurate. The descriptive text — what the rooms are like, how the hall is used,
the house rules on the Facilities page, the history on the About page — was
written to fit what the photographs show and what a centre of this kind normally
offers.

**Please read through `about.html` and `facilities.html` and correct anything
that is not true of the Kendra.** In particular:

- Whether guest rooms are actually offered, and to whom
- Whether the hall is available for functions, and on what terms
- The house rules listed on `facilities.html` (under "Good to know")
- The three "Arriving at Abu Road" cards on `contact.html`

Everything is plain HTML — edit the text directly between the tags.

---

## 3. Publishing

Upload the folder as-is to any static host (Netlify, Vercel, GitHub Pages,
Hostinger, cPanel). There is nothing to compile.

If the site will live at a real domain, update the `<link rel="canonical">` and
`og:image` URLs in the `<head>` of each page — they currently point at
`https://mahaveerkendra.in/`.

---

## Notes

- Fonts load from Google Fonts (Marcellus, Inter, Noto Serif Devanagari).
  Everything else is local.
- The gallery lightbox works with the mouse, the keyboard (arrow keys, Esc)
  and touch.
- The floating WhatsApp button appears once the visitor scrolls past the hero.
- The map on the Contact page is a keyless Google Maps embed — no API key needed.
- Pages degrade gracefully: with JavaScript disabled all content is still
  visible, though the WhatsApp/call links will not be filled in.
