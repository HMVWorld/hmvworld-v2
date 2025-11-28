# HMV World - Global Export Solutions

![Website Status](https://img.shields.io/website?url=https%3A%2F%2Fwww.hmvworld.com)
![License](https://img.shields.io/badge/license-Copyright-blue)
![Tech Stack](https://img.shields.io/badge/stack-HTML5%20%7C%20CSS3%20%7C%20JS-orange)

**HMV World** is a premier export company website dedicated to delivering the finest Indian products—including spices, pulses, grains, and fresh produce—to the global market. This repository contains the source code for the static website hosted on GitHub Pages.

## 🚀 Live Demo
**Website:** [https://www.hmvworld.com](https://www.hmvworld.com)

## ✨ Features

### core Functionality
* **Dynamic Product Catalog:** Products are rendered via JavaScript arrays, allowing for easy updates without editing HTML structure.
* **Responsive Design:** Fully fluid layout that adapts to Mobile, Tablet, and Desktop screens using CSS Grid and Flexbox.
* **Global Header/Footer Injection:** Single-source maintenance for navigation and footer elements across all pages.
* **Contact & Quotation Form:** Integrated with **EmailJS** for serverless email delivery directly from the browser.

### 🔒 Security & Performance
* **Content Security Policy (CSP):** Strict meta tags to prevent XSS attacks and unauthorized script loading.
* **Anti-Theft Protection:** Disables Right-Click, F12 (Inspector), and View Source shortcuts to deter content theft.
* **Input Sanitization:** Forms include strict type checking (HS Codes are read-only) and word limit enforcement.
* **Optimized Assets:** Uses WebP image formats for faster loading speeds.

### ♿ Accessibility
* **High Contrast UI:** Color palettes optimized for readability (e.g., blue text on gold buttons).
* **Semantic HTML:** Proper use of `<header>`, `<nav>`, `<main>`, and `<footer>` tags.

## 🛠️ Tech Stack
* **Frontend:** HTML5, CSS3 (Custom Variables, Grid), Vanilla JavaScript (ES6+).
* **Backend:** None (Static Site).
* **Services:** EmailJS (Form Handling), Cloudflare (DNS & Firewall).
* **Hosting:** GitHub Pages.

## 📂 Project Structure

```text
hmv-world-website/
│
├── index.html           # Home Page
├── about.html           # About Us & Certifications
├── contact.html         # Contact Information
├── products.html        # Dynamic Product Catalog
├── quotation.html       # Order Inquiry Form
├── script.js            # Main Logic (Catalog, EmailJS, Security)
├── style.css            # Global Styles & Responsive Rules
├── CNAME                # Custom Domain Configuration
├── README.md            # Documentation
│
└── assets/              # Static Assets
    ├── favicon/         # Site Favicon
    ├── hero/            # Slider Images
    ├── logo/            # Brand Logos & Cursor
    ├── pages/           # Page Banners
    ├── partners/        # Certification Logos (FSSAI, APEDA, etc.)
    └── products/        # Product Images