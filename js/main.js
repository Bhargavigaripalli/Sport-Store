/* ==========================================================================
   SPORTS STORE - CORE APPLICATION SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initHeader();
  initMobileMenu();
  initCartState();
  initDealCountdown();
  initGearFinder();
  initPageSpecifics();
  initScrollAnimations();
  initBackToTop();
  initSportsBackgroundParticles();
});

/* --- GLOBAL SPORTS BACKGROUND PARTICLES INJECTOR --- */
function initSportsBackgroundParticles() {
  if (document.querySelector('.sports-bg-particles')) return;

  const container = document.createElement('div');
  container.className = 'sports-bg-particles';
  container.innerHTML = `
    <div class="sports-particle sp-1"><i class="fa-solid fa-basketball"></i></div>
    <div class="sports-particle sp-2"><i class="fa-solid fa-football"></i></div>
    <div class="sports-particle sp-3"><i class="fa-solid fa-trophy"></i></div>
    <div class="sports-particle sp-4"><i class="fa-solid fa-bolt"></i></div>
    <div class="sports-particle sp-5"><i class="fa-solid fa-stopwatch"></i></div>
    <div class="sports-particle sp-6"><i class="fa-solid fa-person-running"></i></div>
    <div class="sports-particle sp-7"><i class="fa-solid fa-medal"></i></div>
    <div class="sports-particle sp-8"><i class="fa-solid fa-baseball-bat-ball"></i></div>
    <div class="sports-particle sp-9"><i class="fa-solid fa-table-tennis-paddle-ball"></i></div>
    <div class="sports-particle sp-10"><i class="fa-solid fa-volleyball"></i></div>
    <div class="sports-particle sp-11"><i class="fa-solid fa-dumbbell"></i></div>
    <div class="sports-particle sp-12"><i class="fa-solid fa-fire"></i></div>
  `;

  document.body.prepend(container);
}

/* --- GLOBAL BACK TO TOP BUTTON --- */
function initBackToTop() {
  let btn = document.getElementById('back-to-top-btn');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'back-to-top-btn';
    btn.className = 'back-to-top-btn';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = `<i class="fa-solid fa-arrow-up"></i>`;
    document.body.appendChild(btn);

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 280) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });
}

/* --- SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER) --- */
function initScrollAnimations() {
  if (!('IntersectionObserver' in window)) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const targets = document.querySelectorAll(
    '.section-header, .feature-card, .category-card, .product-card, .kpi-card, .about-grant-box, .accordion-item, .reveal-on-scroll, .deal-card, .testimonial-card, .gear-finder-card'
  );

  targets.forEach((el, index) => {
    el.classList.add('reveal-element');
    const delay = (index % 4) * 90;
    el.style.transitionDelay = `${delay}ms`;
    observer.observe(el);
  });
}

/* --- PRELOADER ANIMATION ENGINE --- */
function initPreloader() {
  const preloader = document.getElementById('preloader-overlay');
  const barFill = document.getElementById('preloader-bar-fill');
  const percentLabel = document.getElementById('preloader-percent-label');

  if (!preloader) return;

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 15) + 8;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      if (barFill) barFill.style.width = '100%';
      if (percentLabel) percentLabel.textContent = '100%';
      setTimeout(() => {
        preloader.classList.add('hidden');
      }, 300);
    } else {
      if (barFill) barFill.style.width = `${progress}%`;
      if (percentLabel) percentLabel.textContent = `${progress}%`;
    }
  }, 50);
}

/* --- CART STATE MANAGEMENT --- */
const CART_STORAGE_KEY = 'apex_sports_cart_v1';

function getCart() {
  try {
    const data = localStorage.getItem(CART_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('LocalStorage read error:', e);
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartBadges();
  } catch (e) {
    console.error('LocalStorage write error:', e);
  }
}

function addToCart(productId, selectedSize = null, selectedColor = null, quantity = 1) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const cart = getCart();
  const size = selectedSize || (product.sizes ? product.sizes[0] : 'N/A');
  const color = selectedColor || (product.colors ? product.colors[0] : 'Default');

  const existingIndex = cart.findIndex(item => item.id === productId && item.size === size && item.color === color);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      size: size,
      color: color,
      quantity: quantity
    });
  }

  saveCart(cart);
  showToast(`Added <strong>${product.name}</strong> to your cart!`);
}

function removeFromCart(index) {
  const cart = getCart();
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
    saveCart(cart);
    showToast(`Removed item from cart.`);
    if (document.getElementById('cart-table-body')) {
      renderCartPage();
    }
  }
}

function updateCartQuantity(index, delta) {
  const cart = getCart();
  if (cart[index]) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    saveCart(cart);
    if (document.getElementById('cart-table-body')) {
      renderCartPage();
    }
  }
}

function updateCartBadges() {
  const cart = getCart();
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badgeElements = document.querySelectorAll('.cart-badge-count');
  badgeElements.forEach(el => {
    el.textContent = totalCount;
  });
}

function initCartState() {
  updateCartBadges();
}

/* --- TOAST NOTIFICATION SYSTEM --- */
function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-item';
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #ffffff; font-size: 1.2rem;"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* --- HEADER & MOBILE NAV --- */
function initHeader() {
  const header = document.querySelector('.apex-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

function initMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileOverlay = document.getElementById('mobile-menu-overlay');
  const closeBtn = document.getElementById('mobile-menu-close');

  if (hamburgerBtn && mobileOverlay) {
    hamburgerBtn.addEventListener('click', () => {
      mobileOverlay.classList.add('active');
    });
  }

  if (closeBtn && mobileOverlay) {
    closeBtn.addEventListener('click', () => {
      mobileOverlay.classList.remove('active');
    });
  }
}

/* --- DEAL COUNTDOWN TIMER --- */
function initDealCountdown() {
  const hoursEl = document.getElementById('timer-hours');
  const minsEl = document.getElementById('timer-mins');
  const secsEl = document.getElementById('timer-secs');

  if (!hoursEl) return;

  let totalSeconds = 14 * 3600 + 45 * 60 + 20;

  setInterval(() => {
    if (totalSeconds <= 0) return;
    totalSeconds--;

    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    hoursEl.textContent = String(h).padStart(2, '0');
    minsEl.textContent = String(m).padStart(2, '0');
    secsEl.textContent = String(s).padStart(2, '0');
  }, 1000);
}

/* --- INTERACTIVE GEAR FINDER WIDGET --- */
function initGearFinder() {
  const form = document.getElementById('gear-finder-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    window.location.href = '404.html';
  });
}

/* --- PRODUCT CARD GENERATOR (PROPER GRID COLUMN WRAPPER) --- */
function createProductCardHTML(product, colClass = "col-lg-4 col-md-6 col-sm-12 mb-4") {
  const badgeHTML = product.badge
    ? `<span class="product-badge badge-${product.badgeType || 'top'}">${product.badge}</span>`
    : '';

  return `
    <div class="${colClass}">
      <div class="product-card" data-id="${product.id}">
        ${badgeHTML}
        <div class="product-image-wrap">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          <div class="product-actions-overlay">
            <a href="404.html" class="action-btn quick-view-btn" title="Quick View">
              <i class="fa-solid fa-eye"></i>
            </a>
            <a href="404.html" class="action-btn" title="Add to Cart">
              <i class="fa-solid fa-cart-shopping"></i>
            </a>
          </div>
        </div>
        <div class="product-body">
          <div class="product-category">${product.sport} • ${product.category}</div>
          <h3 class="product-name">${product.name}</h3>
          <div class="product-rating">
            <i class="fa-solid fa-star text-light"></i> <span class="text-light fw-bold ms-1">${product.rating}</span>
            <span class="text-muted ms-1">(${product.reviewsCount} reviews)</span>
          </div>
          <div class="product-footer">
            <div class="product-price">
              <span class="current-price">$${product.price.toFixed(2)}</span>
              ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
            </div>
            <a href="404.html" class="btn-apex btn-apex-primary" style="padding: 8px 16px; font-size: 0.85rem;">
              Add <i class="fa-solid fa-plus ms-1"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* --- QUICK VIEW MODAL --- */
function openQuickView(productId) {
  window.location.href = '404.html';
}

function closeQuickView() {
  const modal = document.getElementById('quick-view-modal');
  if (modal) {
    modal.classList.remove('active');
  }
}

function selectModalOpt(btn, type) {
  const parent = btn.parentElement;
  parent.querySelectorAll('button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function confirmModalAddToCart(productId) {
  const sizeBtn = document.querySelector('#modal-size-container .active');
  const colorBtn = document.querySelector('#modal-color-container .active');

  const size = sizeBtn ? sizeBtn.textContent : null;
  const color = colorBtn ? colorBtn.textContent : null;

  addToCart(productId, size, color, 1);
  closeQuickView();
}

/* --- PAGE SPECIFIC INITIALIZERS --- */
function initPageSpecifics() {
  // Homepage rendering
  const featuredGrid = document.getElementById('featured-products-grid');
  if (featuredGrid) {
    featuredGrid.innerHTML = PRODUCTS_DATA.slice(0, 6).map(p => createProductCardHTML(p, "col-lg-4 col-md-6 col-sm-12 mb-4")).join('');
  }

  const categoryGrid = document.getElementById('categories-grid');
  if (categoryGrid && typeof CATEGORIES_DATA !== 'undefined') {
    categoryGrid.innerHTML = CATEGORIES_DATA.map(c => `
      <div class="col-md-4 col-sm-6 mb-4">
        <div class="category-card" onclick="location.href='shop.html?category=${encodeURIComponent(c.name)}'">
          <img src="${c.image}" alt="${c.name}">
          <div class="category-overlay">
            <h3 class="category-title">${c.name}</h3>
            <span class="category-count">${c.count}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Shop Page logic
  if (document.getElementById('shop-products-grid')) {
    initShopPage();
  }

  // Cart Page logic
  if (document.getElementById('cart-table-body')) {
    renderCartPage();
  }

  // Re-observe dynamic nodes for scroll animations
  initScrollAnimations();
}

/* --- SHOP PAGE FILTER & SEARCH ENGINE --- */
function initShopPage() {
  const grid = document.getElementById('shop-products-grid');
  const searchInput = document.getElementById('shop-search');
  const sortSelect = document.getElementById('shop-sort');
  const priceRange = document.getElementById('price-range');
  const priceVal = document.getElementById('price-val');

  function renderFiltered() {
    let list = [...PRODUCTS_DATA];

    if (searchInput && searchInput.value.trim() !== '') {
      const q = searchInput.value.toLowerCase().trim();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.sport.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }

    if (priceRange) {
      const maxPrice = parseFloat(priceRange.value);
      list = list.filter(p => p.price <= maxPrice);
    }

    const checkedSports = Array.from(document.querySelectorAll('.sport-filter-checkbox:checked')).map(cb => cb.value);
    if (checkedSports.length > 0) {
      list = list.filter(p => checkedSports.includes(p.sport));
    }

    if (sortSelect) {
      const sort = sortSelect.value;
      if (sort === 'price-low') list.sort((a, b) => a.price - b.price);
      if (sort === 'price-high') list.sort((a, b) => b.price - a.price);
      if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    }

    if (list.length === 0) {
      grid.innerHTML = `<div class="col-12 text-center py-5"><h4 class="text-muted">No sports gear matches your filter criteria.</h4></div>`;
    } else {
      grid.innerHTML = list.map(p => createProductCardHTML(p, "col-lg-4 col-md-6 col-sm-12 mb-4")).join('');
    }
    initScrollAnimations();
  }

  if (priceRange && priceVal) {
    priceRange.addEventListener('input', () => {
      priceVal.textContent = `$${priceRange.value}`;
      renderFiltered();
    });
  }

  if (searchInput) searchInput.addEventListener('input', renderFiltered);
  if (sortSelect) sortSelect.addEventListener('change', renderFiltered);

  document.querySelectorAll('.sport-filter-checkbox').forEach(cb => {
    cb.addEventListener('change', renderFiltered);
  });

  renderFiltered();
}

/* --- RENDER CART PAGE --- */
let appliedDiscount = 0;

function renderCartPage() {
  const tableBody = document.getElementById('cart-table-body');
  const subtotalEl = document.getElementById('cart-subtotal');
  const taxEl = document.getElementById('cart-tax');
  const discountEl = document.getElementById('cart-discount');
  const totalEl = document.getElementById('cart-total');

  if (!tableBody) return;

  const cart = getCart();

  if (cart.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5" class="text-center py-5"><h4 class="text-muted">Your shopping cart is currently empty.</h4><a href="shop.html" class="btn-apex btn-apex-primary mt-3">Explore Gear</a></td></tr>`;
    if (subtotalEl) subtotalEl.textContent = '$0.00';
    if (taxEl) taxEl.textContent = '$0.00';
    if (totalEl) totalEl.textContent = '$0.00';
    return;
  }

  tableBody.innerHTML = cart.map((item, idx) => `
    <tr>
      <td>
        <div class="cart-item-info">
          <img src="${item.image}" class="cart-item-img" alt="${item.name}">
          <div>
            <h5 style="font-size: 1rem; margin-bottom: 2px;">${item.name}</h5>
            <span class="text-muted small">Size: ${item.size} | Color: ${item.color}</span>
          </div>
        </div>
      </td>
      <td class="fw-bold">$${item.price.toFixed(2)}</td>
      <td>
        <div class="qty-control">
          <button class="qty-btn" onclick="updateCartQuantity(${idx}, -1)">-</button>
          <input type="text" class="qty-input" value="${item.quantity}" readonly>
          <button class="qty-btn" onclick="updateCartQuantity(${idx}, 1)">+</button>
        </div>
      </td>
      <td class="fw-bold text-light">$${(item.price * item.quantity).toFixed(2)}</td>
      <td>
        <button class="btn text-danger btn-sm" onclick="removeFromCart(${idx})"><i class="fa-solid fa-trash-can"></i></button>
      </td>
    </tr>
  `).join('');

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const discountAmount = subtotal * appliedDiscount;
  const total = subtotal + tax - discountAmount;

  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;
  if (discountEl) discountEl.textContent = `-$${discountAmount.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
}

function applyPromoCode() {
  const codeInput = document.getElementById('promo-input');
  if (!codeInput) return;

  const code = codeInput.value.trim().toUpperCase();
  if (code === 'APEX20') {
    appliedDiscount = 0.20;
    showToast('Promo Code APEX20 applied! 20% discount unlocked!');
    renderCartPage();
  } else {
    showToast('Invalid promo code. Try APEX20');
  }
}

function openCheckoutModal() {
  const cart = getCart();
  if (cart.length === 0) {
    showToast('Your cart is empty!');
    return;
  }

  let modal = document.getElementById('checkout-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'checkout-modal';
    modal.className = 'modal-backdrop';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="apex-modal p-4" style="max-width: 600px;">
      <button class="modal-close-btn" onclick="closeCheckoutModal()"><i class="fa-solid fa-xmark"></i></button>
      <h3 class="gradient-text mb-3"><i class="fa-solid fa-shield-halved me-2"></i> Secure Checkout</h3>
      <form onsubmit="handleCheckoutSubmit(event)">
        <div class="row g-3 mb-3">
          <div class="col-md-6">
            <label class="form-label text-light small fw-bold">First Name</label>
            <input type="text" class="form-control bg-dark text-light border-secondary" required placeholder="John">
          </div>
          <div class="col-md-6">
            <label class="form-label text-light small fw-bold">Last Name</label>
            <input type="text" class="form-control bg-dark text-light border-secondary" required placeholder="Doe">
          </div>
          <div class="col-12">
            <label class="form-label text-light small fw-bold">Email Address</label>
            <input type="email" class="form-control bg-dark text-light border-secondary" required placeholder="john@example.com">
          </div>
          <div class="col-12">
            <label class="form-label text-light small fw-bold">Shipping Address</label>
            <input type="text" class="form-control bg-dark text-light border-secondary" required placeholder="123 Athletic Way, Suite 400">
          </div>
          <div class="col-md-6">
            <label class="form-label text-light small fw-bold">Card Number</label>
            <input type="text" class="form-control bg-dark text-light border-secondary" required placeholder="4532 •••• •••• 8892">
          </div>
          <div class="col-md-3">
            <label class="form-label text-light small fw-bold">Expiry</label>
            <input type="text" class="form-control bg-dark text-light border-secondary" required placeholder="12/28">
          </div>
          <div class="col-md-3">
            <label class="form-label text-light small fw-bold">CVC</label>
            <input type="text" class="form-control bg-dark text-light border-secondary" required placeholder="882">
          </div>
        </div>
        <button type="submit" class="btn-apex btn-apex-orange w-100 py-3 mt-2">
          <i class="fa-solid fa-lock me-2"></i> Complete Order
        </button>
      </form>
    </div>
  `;

  modal.classList.add('active');
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkout-modal');
  if (modal) modal.classList.remove('active');
}

function handleCheckoutSubmit(e) {
  e.preventDefault();
  closeCheckoutModal();
  saveCart([]);
  if (document.getElementById('cart-table-body')) {
    renderCartPage();
  }
  showToast('🎉 Order Placed Successfully! Confirmation sent to your email.');
}
