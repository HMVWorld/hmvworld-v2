// ==============================
// HMV WORLD MAIN SCRIPT (UPDATED)
// ==============================
document.addEventListener("DOMContentLoaded", function() {

    // ------------------------------------------
    // 0. INJECT FAVICON (Dynamic)
    // ------------------------------------------
    const faviconLink = document.createElement('link');
    faviconLink.rel = 'icon';
    faviconLink.type = 'image/webp';
    faviconLink.href = 'assets/favicon/favicon.webp';
    document.head.appendChild(faviconLink);

    // ------------------------------------------
    // 1. INJECT HEADER & FOOTER
    // ------------------------------------------
    const headerHTML = `
    <header class="header">
        <div class="container header-container">
            <a href="index.html" class="logo">
                <img src="assets/logo/logo.webp" alt="HMV World Logo" class="logo-img">
                <div class="logo-text">
                    <span class="logo-name">HMV World</span>
                    <span class="logo-tagline">Global Export Solutions</span>
                </div>
            </a>
            <nav>
                <ul class="nav-list">
                    <li><a href="index.html" class="nav-link">Home</a></li>
                    <li><a href="products.html" class="nav-link">Products</a></li>
                    <li><a href="quotation.html" class="nav-link">Quotation</a></li>
                    <li><a href="about.html" class="nav-link">About Us</a></li>
                    <li><a href="contact.html" class="nav-link">Contact</a></li>
                </ul>
            </nav>
        </div>
    </header>
    `;

    const footerHTML = `
    <footer class="footer">
        <div class="container footer-container">
            <div class="footer-copyright">&copy; <span id="current-year"></span> © 2025 HMV World. All rights reserved.</div>
            <div class="footer-socials">
                <a href="https://www.linkedin.com/company/hmv-world" class="social-link"><i class="fab fa-linkedin-in"></i></a>
                <a href="https://www.instagram.com/hmv_world" class="social-link"><i class="fab fa-instagram"></i></a>
                <a href="https://wa.me/message/KXKB46U5RZKCI1" class="social-link"><i class="fab fa-whatsapp"></i></a>
            </div>
        </div>
    </footer>
    `;

    const headerPlaceholder = document.getElementById('app-header');
    const footerPlaceholder = document.getElementById('app-footer');

    if (headerPlaceholder) headerPlaceholder.innerHTML = headerHTML;
    if (footerPlaceholder) footerPlaceholder.innerHTML = footerHTML;

    // ------------------------------------------
    // 2. CONFIGURATION
    // ------------------------------------------
    try {
        emailjs.init("0CV0N42qYc1Rp59R8"); 
    } catch (e) { console.warn("EmailJS Init Error"); }

    const yearSpan = document.getElementById('current-year');
    if(yearSpan) yearSpan.textContent = new Date().getFullYear();

    // ------------------------------------------
    // 3. NAVIGATION HIGHLIGHT
    // ------------------------------------------
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if(link.getAttribute('href') === currentPage || (currentPage === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });

    // ------------------------------------------
    // 4. PRODUCT CATALOG & MODALS
    // ------------------------------------------
    const productCatalog = [
        {
            category: "Spices", icon: "fas fa-leaf", 
            subProducts: [
                { name: "Black Pepper", image: "assets/products/Black-Pepper.webp", specs: "GL 500/550, Moisture <12%", ingredients: "Piper nigrum", uses: ["Seasoning", "Preservative"], hsCode: "0904.11.10", dgftDesc: "Black Pepper, ungarbled" },
                { name: "Turmeric", image: "assets/products/turmeric.webp", specs: "Dried Whole/Split, Powder", ingredients: "Curcuma longa", uses: ["Food coloring", "Antiseptic"], hsCode: "0910.30.20", dgftDesc: "Turmeric in Powder" },
                { name: "Ginger", image: "assets/products/ginger.webp", specs: "Dried Whole/Split, Powder", ingredients: "Zingiber officinale", uses: ["Tea", "Culinary"], hsCode: "0910.11.20", dgftDesc: "Ginger, other than fresh" },
                { name: "Star Anise", image: "assets/products/star-anise.webp", specs: "Whole/Broken", ingredients: "Illicium verum", uses: ["Spices", "Medicinal oil"], hsCode: "0908.31.20", dgftDesc: "Anise seeds, crushed" },
                { name: "Cumin Seeds", image: "assets/products/cumin-seeds.webp", specs: "99% purity", ingredients: "Cuminum cyminum", uses: ["Seasoning"], hsCode: "0909.31.29", dgftDesc: "Cumin Seed Other" },
                { name: "Cinnamon", image: "assets/products/cinnamon.webp", specs: "Cassia/Ceylon", ingredients: "Cinnamomum", uses: ["Baking"], hsCode: "0906.11.10", dgftDesc: "Cinnamon (Canella)" },
                { name: "Cardamom", image: "assets/products/cardamom.webp", specs: "Green/Black", ingredients: "Elettaria cardamomum", uses: ["Flavouring"], hsCode: "0908.31.20", dgftDesc: "Cardamom, crushed" },
            ]
        },
        {
            category: "Pulses", icon: "fas fa-seedling", 
            subProducts: [
                { name: "Chickpeas (Chana)", image: "assets/products/chickpeas-chana.webp", specs: "Kabuli/Desi", ingredients: "Cicer arietinum", uses: ["Flour (Besan)", "Hummus"], hsCode: "0713.20.00", dgftDesc: "Chickpeas (Garbanzos)" },
                { name: "Red Lentils (Masoor)", image: "assets/products/red-lentils-masoor.webp", specs: "Whole/Split", ingredients: "Lens culinaris", uses: ["Soups", "Dals"], hsCode: "0713.40.00", dgftDesc: "Lentils" },
                { name: "Moong Dal", image: "assets/products/moong-dal.webp", specs: "Split/Whole", ingredients: "Vigna radiata", uses: ["Dals"], hsCode: "0713.31.00", dgftDesc: "Beans of the species Vigna mungo" },
            ]
        },
        {
            category: "Grains & Cereal", icon: "fas fa-wheat-alt", 
            subProducts: [
                { name: "Basmati Rice", image: "assets/products/basmati-rice.webp", specs: "1121 Sella/Steam", ingredients: "Oryza sativa", uses: ["Pilaf", "Biryani"], hsCode: "1006.30.20", dgftDesc: "Basmati Rice" },
                { name: "Non-Basmati Rice", image: "assets/products/non-basmati-rice.webp", specs: "IR 64/Sona Masoori", ingredients: "Oryza sativa", uses: ["Daily Meals"], hsCode: "1006.30.90", dgftDesc: "Other than Basmati Rice" },
                { name: "Wheat", image: "assets/products/wheat.webp", specs: "Milling/Durum", ingredients: "Triticum", uses: ["Flour", "Bread"], hsCode: "1001.99.10", dgftDesc: "Wheat or Meslin seed" },
            ]
        },
        {
            category: "Dry Fruits", icon: "fas fa-sun", 
            subProducts: [
                { name: "Cashews", image: "assets/products/cashews.webp", specs: "W180/W240/W320", ingredients: "Anacardium", uses: ["Snacks"], hsCode: "0801.32.10", dgftDesc: "Cashew kernel, whole" },
                { name: "Almonds", image: "assets/products/almonds.webp", specs: "Shelled/In-shell", ingredients: "Prunus dulcis", uses: ["Baking"], hsCode: "0802.12.00", dgftDesc: "Almonds shelled" },
                { name: "Raisins", image: "assets/products/raisins.webp", specs: "Green/Black/Golden", ingredients: "Vitis vinifera", uses: ["Snacks"], hsCode: "0806.20.10", dgftDesc: "Raisins" },
            ]
        },
        {
            category: "Dehydrated Products", icon: "fas fa-fan", 
            subProducts: [
                { name: "Dehydrated Onion", image: "assets/products/dehydrated-onion.webp", specs: "Flakes/Granules", ingredients: "Allium cepa", uses: ["Ready-to-Eat"], hsCode: "0712.20.00", dgftDesc: "Onions, dried" },
                { name: "Dehydrated Garlic", image: "assets/products/dehydrated-garlic.webp", specs: "Flakes/Powder", ingredients: "Allium sativum", uses: ["Seasoning"], hsCode: "0712.90.20", dgftDesc: "Garlic, dried" },
                { name: "Dehydrated Vegetables Mix", image: "assets/products/dehydrated-vegetables-mix.webp", specs: "Carrot, Potato, Peas", ingredients: "Mixed Veg", uses: ["Instant Noodles"], hsCode: "0712.90.90", dgftDesc: "Other vegetables, dried" },
            ]
        },
        {
            category: "Fresh Fruits", icon: "fas fa-apple-alt", 
            subProducts: [
                { name: "Mangoes", image: "assets/products/mangoes.webp", specs: "Alphonso/Kesar", ingredients: "Mangifera indica", uses: ["Fresh Eating"], hsCode: "0804.50.20", dgftDesc: "Mangoes, fresh" },
                { name: "Pomegranates", image: "assets/products/pomegranates.webp", specs: "Bhagwa variety", ingredients: "Punica granatum", uses: ["Fresh Eating"], hsCode: "0810.90.10", dgftDesc: "Pomegranates, fresh" },
            ]
        },
        {
            category: "Fresh Vegetables", icon: "fas fa-carrot", 
            subProducts: [
                { name: "Onions", image: "assets/products/onions.webp", specs: "Red/White", ingredients: "Allium cepa", uses: ["Cooking"], hsCode: "0703.10.10", dgftDesc: "Onions, fresh or chilled" },
                { name: "Potatoes", image: "assets/products/potatoes.webp", specs: "Kufri Jyoti", ingredients: "Solanum tuberosum", uses: ["Cooking"], hsCode: "0701.90.00", dgftDesc: "Potatoes, fresh or chilled" },
            ]
        },
        {
            category: "Herbs", icon: "fas fa-cannabis", 
            subProducts: [
                { name: "Mint Leaves", image: "assets/products/mint-leaves.webp", specs: "Dried/Fresh", ingredients: "Mentha", uses: ["Tea"], hsCode: "1211.90.99", dgftDesc: "Other herbs, dried" },
                { name: "Cilantro", image: "assets/products/cilantro-coriander-leaves.webp", specs: "Dried/Fresh", ingredients: "Coriandrum", uses: ["Garnish"], hsCode: "1211.90.99", dgftDesc: "Other herbs, dried" },
            ]
        },
        {
            category: "Flours", icon: "fas fa-box-open", 
            subProducts: [
                { name: "Wheat Flour (Atta)", image: "assets/products/wheat-flour-atta.webp", specs: "Chakki Fresh", ingredients: "Wheat", uses: ["Chapati"], hsCode: "1101.00.00", dgftDesc: "Wheat or meslin flour" },
                { name: "Gram Flour (Besan)", image: "assets/products/gram-flour-besan.webp", specs: "Made from Chana Dal", ingredients: "Chickpeas", uses: ["Snacks"], hsCode: "1106.10.00", dgftDesc: "Flour of dried legumes" },
            ]
        },
        {
            category: "Oilseeds", icon: "fas fa-sun", 
            subProducts: [
                { name: "Groundnuts", image: "assets/products/groundnuts-peanuts.webp", specs: "Bold/Java", ingredients: "Arachis hypogaea", uses: ["Oil"], hsCode: "1202.42.00", dgftDesc: "Ground-nuts shelled" },
                { name: "Sesame Seeds", image: "assets/products/sesame-seeds.webp", specs: "White/Black", ingredients: "Sesamum indicum", uses: ["Baking"], hsCode: "1207.40.10", dgftDesc: "Sesamum seeds" },
            ]
        },
        {
            category: "Other", icon: "fas fa-box", 
            subProducts: [
                { name: "Incense Sticks", image: "assets/products/incense-sticks.webp", specs: "Sandal, Rose", ingredients: "Bamboo, oils", uses: ["Aromatherapy"], hsCode: "3307.41.00", dgftDesc: "Agarbatti" },
                { name: "Imitation Jewellery", image: "assets/products/imitation-jewellery.webp", specs: "Fashion", ingredients: "Brass/Alloy", uses: ["Fashion"], hsCode: "7117.19.90", dgftDesc: "Other imitation jewellery" },
                { name: "Jaggery (Gurr)", image: "assets/products/jaggery-gurr.webp", specs: "Cubes/Powder", ingredients: "Sugarcane", uses: ["Sweetener"], hsCode: "1701.13.00", dgftDesc: "Cane Jaggery" },
            ]
        },
    ];

    const productsGrid = document.getElementById('products-grid-container');
    const productDetailModal = document.getElementById('product-detail-modal');
    const pmClose = document.querySelector('.pm-close');

    if (productsGrid) {
        productCatalog.forEach(categoryData => {
            const card = document.createElement('div');
            card.className = 'category-card';
            card.dataset.category = categoryData.category;
            card.innerHTML = `
                <div class="category-header">
                    <i class="${categoryData.icon} category-icon"></i>
                    <h3>${categoryData.category}</h3>
                    <p class="category-varieties">${categoryData.subProducts.length} Varieties</p>
                </div>
                <div class="sub-products-list">
                    ${categoryData.subProducts.map(sub => `
                        <div class="sub-item" data-product-name="${sub.name}" data-specs="${sub.specs}" data-ingredients="${sub.ingredients}" data-uses="${sub.uses.join('|')}" data-image="${sub.image}" data-hscode="${sub.hsCode}" data-dgft="${sub.dgftDesc}">
                            <img src="${sub.image}" alt="${sub.name}" class="sub-img" onerror="this.src='assets/logo/logo.webp'">
                            <span class="sub-name">${sub.name}</span>
                        </div>
                    `).join('')}
                </div>
            `;
            productsGrid.appendChild(card);
        });

        document.querySelectorAll('.category-card').forEach(card => {
            card.querySelector('.category-header').addEventListener('click', (e) => {
                document.querySelectorAll('.category-card.active').forEach(other => {
                    if (other !== card) other.classList.remove('active');
                });
                card.classList.toggle('active');
                if(card.classList.contains('active')) {
                    setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'start' }), 250);
                }
            });
        });

        document.querySelectorAll('.sub-item').forEach(subItem => {
            subItem.addEventListener('click', (e) => {
                e.stopPropagation();
                const d = subItem.dataset;
                document.getElementById('pm-category').textContent = subItem.closest('.category-card').dataset.category;
                document.getElementById('pm-title').textContent = d.productName;
                document.getElementById('pm-specs').textContent = d.specs;
                document.getElementById('pm-ingredients').textContent = d.ingredients;
                const img = document.getElementById('pm-img');
                img.src = d.image;
                img.onerror = () => img.src = 'assets/logo/logo.webp';
                const usesList = document.getElementById('pm-uses');
                usesList.innerHTML = '';
                d.uses.split('|').forEach(u => {
                    const li = document.createElement('li');
                    li.textContent = u;
                    usesList.appendChild(li);
                });
                if(productDetailModal) productDetailModal.classList.add('show');
            });
        });
    }

    if (productDetailModal && pmClose) {
        pmClose.addEventListener('click', () => productDetailModal.classList.remove('show'));
    }

    // ------------------------------------------
    // 5. QUOTATION FORM LOGIC
    // ------------------------------------------
    const productReqSelect = document.getElementById('product-req');
    const productTypeSelect = document.getElementById('product-type');
    const hsCodeInput = document.getElementById('hs-code-input');
    const descriptionInput = document.getElementById('description-input');
    const exactReqTextarea = document.getElementById('exact-req');
    const wordLimitCounter = document.querySelector('.word-limit-counter');
    const quotationForm = document.getElementById('quotation-form');
    const popupMessage = document.getElementById('popup-message');
    const closePopup = document.getElementById('close-popup');

    if (productReqSelect && productTypeSelect) {
        productReqSelect.addEventListener('change', function() {
            const categoryData = productCatalog.find(cat => cat.category === this.value);
            productTypeSelect.innerHTML = '<option value="" disabled selected>Select a variety</option>';
            if(hsCodeInput) hsCodeInput.value = '';
            if(descriptionInput) descriptionInput.value = '';
            if (categoryData && categoryData.subProducts) {
                categoryData.subProducts.forEach(sub => {
                    const option = document.createElement('option');
                    option.value = sub.name;
                    option.textContent = sub.name;
                    option.dataset.hscode = sub.hsCode;
                    option.dataset.dgft = sub.dgftDesc;
                    productTypeSelect.appendChild(option);
                });
            }
        });

        productTypeSelect.addEventListener('change', function() {
            const selectedOption = this.options[this.selectedIndex];
            if (selectedOption) {
                if(hsCodeInput) hsCodeInput.value = selectedOption.dataset.hscode || 'N/A';
                if(descriptionInput) descriptionInput.value = selectedOption.dataset.dgft || 'N/A';
            }
        });
    }

    if (exactReqTextarea && wordLimitCounter) {
        const maxWords = 200;
        exactReqTextarea.addEventListener('input', () => {
            const text = exactReqTextarea.value;
            const words = text.trim().split(/\s+/).filter(w => w.length > 0);
            if (words.length > maxWords) {
                wordLimitCounter.textContent = `Limit reached! (${words.length}/${maxWords})`;
                wordLimitCounter.style.color = 'red';
                wordLimitCounter.style.fontWeight = 'bold';
            } else {
                wordLimitCounter.textContent = `${maxWords - words.length} words remaining`;
                wordLimitCounter.style.color = '#555';
                wordLimitCounter.style.fontWeight = 'normal';
            }
        });
    }

    if (quotationForm) {
        quotationForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // FIX 3: Validation for Terms Checkbox
            const termsCheck = document.getElementById('terms-check');
            if (termsCheck && !termsCheck.checked) {
                alert("Please accept the Terms and Conditions to proceed.");
                return;
            }

            const submitBtn = document.getElementById('quotation-submit-btn');
            if(exactReqTextarea) {
                const words = exactReqTextarea.value.trim().split(/\s+/).filter(w => w.length > 0);
                if (words.length > 200) {
                    alert("Please shorten your requirement to 200 words.");
                    exactReqTextarea.focus();
                    return;
                }
            }

            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'SENDING...';
            submitBtn.disabled = true;

            const formData = new FormData(quotationForm);
            const data = Object.fromEntries(formData.entries());
            const serviceID = 'HMVWORLD_service'; 
            const templateID = 'Contactus';

            emailjs.send(serviceID, templateID, {
                to_email: 'HMVworld@outlook.com',
                from_name: `${data.first_name} ${data.last_name}`,
                company_name: data.company_name || 'N/A',
                website: data.website || 'N/A',
                email: data.email,
                contact: `${data.country_code} ${data.contact_number}`,
                product: data.product_req,
                product_type: data.product_type,
                hs_code: data.hs_code,
                dgft_description: data.dgft_description,
                requirements: data.exact_req
            })
            .then(() => {
                quotationForm.reset();
                if(popupMessage) popupMessage.style.display = "flex";
                if(wordLimitCounter) wordLimitCounter.textContent = "200 words remaining";
            })
            .catch((err) => {
                console.error("EmailJS Error:", err);
                alert("Failed to send. Please check your internet connection.");
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }

    if (closePopup) closePopup.addEventListener('click', () => popupMessage.style.display = "none");

    // ------------------------------------------
    // 6. PARTNER & TERMS MODAL LOGIC
    // ------------------------------------------
    const pModal = document.getElementById('partner-modal');
    window.closePartnerModal = function() {
        if(pModal) {
            pModal.classList.remove('show');
            setTimeout(() => { pModal.style.display = 'none'; document.body.classList.remove('modal-open'); }, 300);
        }
    };

    document.querySelectorAll('.partner-logo').forEach(img => {
        img.addEventListener('click', () => {
            if(!pModal) return;
            document.getElementById('partner-modal-title').textContent = img.dataset.name || img.alt || 'Certification';
            document.getElementById('partner-modal-desc').textContent = img.dataset.desc || 'Government recognized export certification.';
            document.getElementById('partner-modal-img').src = img.src;
            pModal.style.display = 'flex';
            setTimeout(() => { pModal.classList.add('show'); document.body.classList.add('modal-open'); }, 10);
        });
    });

    const pCloseBtn = document.getElementById('partner-modal-close');
    if(pCloseBtn) pCloseBtn.addEventListener('click', window.closePartnerModal);

    // Terms Modal Logic
    const termsModal = document.getElementById('terms-modal');
    window.showTermsModal = function() { 
        if(termsModal) {
            termsModal.style.display = 'flex'; 
            document.body.classList.add('modal-open');
        }
    }
    window.closeTermsModal = function() {
        if(termsModal) {
            termsModal.style.display = 'none'; 
            document.body.classList.remove('modal-open');
        }
    }

    window.onclick = function(event) {
        if (pModal && event.target == pModal) window.closePartnerModal();
        if (termsModal && event.target == termsModal) window.closeTermsModal();
    };
});

// ------------------------------------------
// 7. SECURITY (Disable F12/RightClick)
// ------------------------------------------
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
    if(e.key == 'F12' || (e.ctrlKey && e.shiftKey && ['I','J','C'].includes(e.key)) || (e.ctrlKey && e.key === 'u')) {
        e.preventDefault();
        return false;
    }
});

