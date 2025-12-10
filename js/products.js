// Create this new file for product page functionality

function showAddToCartMessage() {
    // Create or update success message with checkout link
    let message = document.getElementById('cartSuccessMessage');
    if (!message) {
        message = document.createElement('div');
        message.id = 'cartSuccessMessage';
        message.style.cssText = `
            position: fixed;
            top: 140px;
            right: 20px;
            background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
            color: white;
            padding: 25px 30px;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            z-index: 10002;
            box-shadow: 0 8px 24px rgba(34, 197, 94, 0.3);
            animation: slideInBounce 0.5s ease;
            min-width: 320px;
            max-width: 400px;
        `;
        document.body.appendChild(message);
    }
    
    message.innerHTML = `
        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
            <svg style="width: 28px; height: 28px; flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M20 6L9 17l-5-5"></path>
            </svg>
            <span style="font-size: 18px; letter-spacing: 0.5px;">Added to Cart!</span>
        </div>
        <div style="display: flex; gap: 10px; margin-top: 15px;">
            <button onclick="closeCartMessage()" style="
                flex: 1;
                padding: 12px 20px;
                background: rgba(255, 255, 255, 0.2);
                border: 2px solid white;
                color: white;
                border-radius: 8px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                letter-spacing: 1px;
                text-transform: uppercase;
            " onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'">
                Continue
            </button>
            <a href="checkout.html" style="
                flex: 1;
                padding: 12px 20px;
                background: white;
                color: #16a34a;
                border-radius: 8px;
                font-size: 14px;
                font-weight: 700;
                text-decoration: none;
                text-align: center;
                transition: all 0.3s ease;
                letter-spacing: 1px;
                text-transform: uppercase;
                border: 2px solid white;
            " onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.2)'" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='none'">
                Checkout
            </a>
        </div>
    `;
    
    message.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        if (message && message.style.display === 'block') {
            message.style.animation = 'slideOutBounce 0.4s ease';
            setTimeout(() => {
                message.style.display = 'none';
            }, 400);
        }
    }, 5000);
}

function closeCartMessage() {
    const message = document.getElementById('cartSuccessMessage');
    if (message) {
        message.style.animation = 'slideOutBounce 0.4s ease';
        setTimeout(() => {
            message.style.display = 'none';
        }, 400);
    }
}

// Cart management
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Update both menu and slide panel cart counts
    const cartCountElements = document.querySelectorAll('#cartCount, #slidePanelCartCount');
    cartCountElements.forEach(element => {
        if (element) {
            element.textContent = totalItems;
        }
    });
}

function addToCart(product) {
    const cart = getCart();
    
    // Check if product already exists in cart
    const existingItemIndex = cart.findIndex(item => 
        item.id === product.id && 
        item.size === product.size && 
        item.color === product.color
    );
    
    if (existingItemIndex > -1) {
        // Update quantity if item exists
        cart[existingItemIndex].quantity += product.quantity;
    } else {
        // Add new item
        cart.push(product);
    }
    
    saveCart(cart);
    
    // Show success message
    showAddToCartMessage();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Update cart count on page load
    updateCartCount();
    
    // Add to cart button functionality
    const addToCartBtn = document.getElementById('addToCartBtn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            // Get product details from modal
            const productName = document.getElementById('modalProductName').textContent;
            const productPrice = document.getElementById('modalProductPrice').textContent;
            const productImage = document.getElementById('modalProductImage').src;
            
            // Get selected size
            const selectedSizeBtn = document.querySelector('.size-btn.active');
            if (!selectedSizeBtn) {
                alert('Please select a size');
                return;
            }
            const size = selectedSizeBtn.dataset.size;
            
            // Get selected color
            const selectedColorBtn = document.querySelector('.color-btn.active');
            if (!selectedColorBtn) {
                alert('Please select a color');
                return;
            }
            const color = selectedColorBtn.dataset.color;
            
            // Get quantity
            const quantity = parseInt(document.getElementById('quantity').value);
            
            // Create product object
            const product = {
                id: Date.now(), // Unique ID based on timestamp
                name: productName,
                price: parseFloat(productPrice.replace('$', '')),
                image: productImage,
                size: size,
                color: color,
                quantity: quantity
            };
            
            // Add to cart
            addToCart(product);
        });
    }
    
    // Size button selection
    const sizeButtons = document.querySelectorAll('.size-btn');
    sizeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            sizeButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Color button selection
    const colorButtons = document.querySelectorAll('.color-btn');
    colorButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            colorButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInBounce {
        0% {
            transform: translateX(500px);
            opacity: 0;
        }
        60% {
            transform: translateX(-20px);
            opacity: 1;
        }
        80% {
            transform: translateX(10px);
        }
        100% {
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutBounce {
        0% {
            transform: translateX(0);
            opacity: 1;
        }
        100% {
            transform: translateX(500px);
            opacity: 0;
        }
    }
    
    .size-btn.active,
    .color-btn.active {
        background: #1a1a1a !important;
        color: #ffffff !important;
        border-color: #1a1a1a !important;
    }
`;
document.head.appendChild(style);

// Cart Management
let cartItems = [];
let cartCount = 0;

function updateCartCount() {
    cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const menuCartCount = document.getElementById('menuCartCount');
    const navCartCountEl = document.getElementById('navCartCount');
    const slidePanelCartCountEl = document.getElementById('slidePanelCartCount');
    
    if (menuCartCount) {
        menuCartCount.textContent = cartCount;
    }
    if (navCartCountEl) {
        navCartCountEl.textContent = cartCount;
    }
    if (slidePanelCartCountEl) {
        slidePanelCartCountEl.textContent = cartCount;
    }
}

function showCartNotification(product) {
    const cartNotification = document.getElementById('cartNotification');
    const cartNotificationItem = document.getElementById('cartNotificationItem');

    if (!cartNotification || !cartNotificationItem) return;

    // Create notification content
    cartNotificationItem.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="cart-notification-img">
        <div class="cart-notification-info">
            <h4>${product.name}</h4>
            <p>Size: ${product.size} • Color: ${product.color}</p>
            <p>Quantity: ${product.quantity}</p>
            <p class="cart-notification-price">${product.price}</p>
        </div>
    `;

    // Show notification
    cartNotification.classList.add('show');

    // Auto-hide after 5 seconds
    setTimeout(() => {
        cartNotification.classList.remove('show');
    }, 5000);
}

function addToCart(product) {
    // Check if product already exists in cart
    const existingItem = cartItems.find(item => 
        item.name === product.name && 
        item.size === product.size && 
        item.color === product.color
    );

    if (existingItem) {
        existingItem.quantity += product.quantity;
    } else {
        cartItems.push(product);
    }

    // Save to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Update cart count
    updateCartCount();
    
    // Show notification
    showCartNotification(product);
}

// Close cart notification
const cartNotificationClose = document.getElementById('cartNotificationClose');
const continueShoppingBtn = document.getElementById('continueShoppingBtn');

if (cartNotificationClose) {
    cartNotificationClose.addEventListener('click', () => {
        document.getElementById('cartNotification').classList.remove('show');
    });
}

if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener('click', () => {
        document.getElementById('cartNotification').classList.remove('show');
    });
}

// Load cart from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
        cartItems = JSON.parse(savedCart);
        updateCartCount();
    }
});

// Export addToCart function for use in product pages
window.addToCart = addToCart;

// Menu dropdown functionality (Full screen sidebar)
const menuBtn = document.getElementById('menuBtn');
const navDropdown = document.getElementById('navDropdown');
const dropdownOverlay = document.getElementById('dropdownOverlay');
const dropdownClose = document.getElementById('dropdownClose');

// Toggle dropdown menu
if (menuBtn && navDropdown) {
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navDropdown.classList.toggle('active');
        if (dropdownOverlay) {
            dropdownOverlay.classList.toggle('active');
        }
        // Prevent body scroll when menu is open
        if (navDropdown.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close dropdown when clicking overlay
    if (dropdownOverlay) {
        dropdownOverlay.addEventListener('click', () => {
            navDropdown.classList.remove('active');
            dropdownOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close dropdown when clicking close button (X)
    if (dropdownClose) {
        dropdownClose.addEventListener('click', () => {
            navDropdown.classList.remove('active');
            if (dropdownOverlay) {
                dropdownOverlay.classList.remove('active');
            }
            document.body.style.overflow = '';
        });
    }
}

// Submenu toggle functionality
const productsToggle = document.getElementById('productsToggle');
const productsSubmenu = document.getElementById('productsSubmenu');
const productsArrow = document.getElementById('productsArrow');

const collectionsToggle = document.getElementById('collectionsToggle');
const collectionsSubmenu = document.getElementById('collectionsSubmenu');
const collectionsArrow = document.getElementById('collectionsArrow');

// Toggle Products submenu
if (productsToggle && productsSubmenu) {
    productsToggle.addEventListener('click', (e) => {
        e.preventDefault();
        productsSubmenu.classList.toggle('active');
        productsArrow.classList.toggle('active');
    });
}

// Toggle Collections submenu
if (collectionsToggle && collectionsSubmenu) {
    collectionsToggle.addEventListener('click', (e) => {
        e.preventDefault();
        collectionsSubmenu.classList.toggle('active');
        collectionsArrow.classList.toggle('active');
    });
}

// Make T-shirt items clickable and link to product page
document.addEventListener('DOMContentLoaded', () => {
    const tshirtItems = document.querySelectorAll('.tshirt-item');
    
    tshirtItems.forEach((item, index) => {
        item.style.cursor = 'pointer';
        
        item.addEventListener('click', (e) => {
            // Prevent default if it's already a link
            if (e.target.tagName !== 'A') {
                // Redirect to product page with product ID
                window.location.href = `product.html?id=${index + 1}`;
            }
        });
    });
});

// Fixed Menu Button & Slide Panel - Toggle functionality with button animation
const fixedMenuBtn = document.getElementById('fixedMenuBtn');
const slidePanel = document.getElementById('slidePanel');
const slidePanelClose = document.getElementById('slidePanelClose');
const panelOverlay = document.getElementById('panelOverlay');
const slidePanelCartCount = document.getElementById('slidePanelCartCount');

// Toggle slide panel (open/close with same button)
if (fixedMenuBtn) {
    fixedMenuBtn.addEventListener('click', () => {
        const isActive = slidePanel.classList.contains('active');
        
        if (isActive) {
            // Close panel
            slidePanel.classList.remove('active');
            panelOverlay.classList.remove('active');
            fixedMenuBtn.classList.remove('menu-open');
            // Removed: document.body.style.overflow = '';
        } else {
            // Open panel
            slidePanel.classList.add('active');
            panelOverlay.classList.add('active');
            fixedMenuBtn.classList.add('menu-open');
            // Removed: document.body.style.overflow = 'hidden';
        }
    });
}

// Close slide panel with close button (if it exists)
if (slidePanelClose) {
    slidePanelClose.addEventListener('click', () => {
        slidePanel.classList.remove('active');
        panelOverlay.classList.remove('active');
        fixedMenuBtn.classList.remove('menu-open');
    });
}

// Close panel when clicking overlay
if (panelOverlay) {
    panelOverlay.addEventListener('click', () => {
        slidePanel.classList.remove('active');
        panelOverlay.classList.remove('active');
        fixedMenuBtn.classList.remove('menu-open');
    });
}