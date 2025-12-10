let banner = document.createElement('div');
banner.id = 'animated-banner';
banner.style.display = 'flex';
banner.style.overflow = 'hidden';
banner.style.height = '120px';
banner.style.alignItems = 'center';

for (let i = 0; i < 20; i++)  {
    let logo = document.createElement('img');
    logo.src = "assests/png/FELOEN.png";
    logo.style.width = '160px';
    logo.style.height = '120px'; 
    logo.style.marginRight = '40px';
    banner.appendChild(logo);
}

// Don't append the banner anymore - it's in the HTML
// document.body.appendChild(banner);

// Product database for search suggestions
const products = [
    { name: 'Classic White T-Shirt', category: 'T-Shirts', price: '$49' },
    { name: 'Black Tee', category: 'T-Shirts', price: '$49' },
    { name: 'Navy Blue T-Shirt', category: 'T-Shirts', price: '$49' },
    { name: 'Gray Tee', category: 'T-Shirts', price: '$49' },
    { name: 'Red Tee', category: 'T-Shirts', price: '$49' },
    { name: 'Green Tee', category: 'T-Shirts', price: '$49' },
    { name: 'Yellow Tee', category: 'T-Shirts', price: '$49' },
    { name: 'Purple Tee', category: 'T-Shirts', price: '$49' },
    { name: 'Orange Tee', category: 'T-Shirts', price: '$49' },
    { name: 'Pink Tee', category: 'T-Shirts', price: '$49' },
    { name: 'Brown Tee', category: 'T-Shirts', price: '$49' },
    { name: 'Beige Tee', category: 'T-Shirts', price: '$49' },
    { name: 'Black Hoodie', category: 'Hoodies', price: '$89' },
    { name: 'Gray Hoodie', category: 'Hoodies', price: '$89' },
    { name: 'White Hoodie', category: 'Hoodies', price: '$89' },
    { name: 'Denim Jacket', category: 'Jackets', price: '$129' },
    { name: 'Leather Jacket', category: 'Jackets', price: '$199' },
    { name: 'Black Jeans', category: 'Pants', price: '$79' },
    { name: 'Blue Jeans', category: 'Pants', price: '$79' },
    { name: 'Baseball Cap', category: 'Accessories', price: '$29' },
    { name: 'Beanie', category: 'Accessories', price: '$25' }
];

// Search functionality
const searchBtn = document.getElementById('searchBtn');
const searchOverlay = document.getElementById('searchOverlay');
const searchClose = document.getElementById('searchClose');
const searchInput = document.getElementById('searchInput');
const searchSubmit = document.getElementById('searchSubmit');
const searchSuggestions = document.getElementById('searchSuggestions');

// Open search overlay
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        searchInput.focus();
    });
}

// Close search overlay
if (searchClose) {
    searchClose.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
        searchInput.value = '';
        if (searchSuggestions) {
            searchSuggestions.innerHTML = '';
            searchSuggestions.style.display = 'none';
        }
    });
}

// Search input - show suggestions
if (searchInput && searchSuggestions) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        
        if (query.length === 0) {
            searchSuggestions.innerHTML = '';
            searchSuggestions.style.display = 'none';
            return;
        }

        // Filter products that START WITH the query
        const matches = products.filter(product => 
            product.name.toLowerCase().startsWith(query) ||
            product.category.toLowerCase().startsWith(query)
        );

        if (matches.length > 0) {
            searchSuggestions.innerHTML = matches.slice(0, 5).map(product => `
                <div class="search-suggestion-item" data-product="${product.name}">
                    <span class="suggestion-name">${product.name}</span>
                    <span class="suggestion-category">${product.category}</span>
                    <span class="suggestion-price">${product.price}</span>
                </div>
            `).join('');
            searchSuggestions.style.display = 'block';

            // Add click handlers to suggestions
            document.querySelectorAll('.search-suggestion-item').forEach(item => {
                item.addEventListener('click', () => {
                    const productName = item.getAttribute('data-product');
                    searchInput.value = productName;
                    searchSuggestions.innerHTML = '';
                    searchSuggestions.style.display = 'none';
                    searchSubmit.click();
                });
            });
        } else {
            searchSuggestions.innerHTML = '<div class="search-no-results">No products found</div>';
            searchSuggestions.style.display = 'block';
        }
    });
}

// Close search overlay on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (searchOverlay && searchOverlay.classList.contains('active')) {
            searchOverlay.classList.remove('active');
            searchInput.value = '';
            if (searchSuggestions) {
                searchSuggestions.innerHTML = '';
                searchSuggestions.style.display = 'none';
            }
        }
        if (navDropdown && navDropdown.classList.contains('active')) {
            navDropdown.classList.remove('active');
            if (dropdownOverlay) {
                dropdownOverlay.classList.remove('active');
            }
            document.body.style.overflow = '';
        }
        // Close slide panel on ESC
        const slidePanel = document.getElementById('slidePanel');
        const panelOverlay = document.getElementById('panelOverlay');
        const fixedMenuBtn = document.getElementById('fixedMenuBtn');
        if (slidePanel && slidePanel.classList.contains('active')) {
            slidePanel.classList.remove('active');
            if (panelOverlay) {
                panelOverlay.classList.remove('active');
            }
            if (fixedMenuBtn) {
                fixedMenuBtn.classList.remove('menu-open');
            }
        }
    }
});

// Close search overlay when clicking outside
if (searchOverlay) {
    searchOverlay.addEventListener('click', (e) => {
        if (e.target === searchOverlay) {
            searchOverlay.classList.remove('active');
            searchInput.value = '';
            if (searchSuggestions) {
                searchSuggestions.innerHTML = '';
                searchSuggestions.style.display = 'none';
            }
        }
    });
}

// Handle search submit
if (searchSubmit) {
    searchSubmit.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            console.log('Searching for:', query);
            // Add your search logic here
            // For example: window.location.href = `/search?q=${encodeURIComponent(query)}`;
            if (searchSuggestions) {
                searchSuggestions.innerHTML = '';
                searchSuggestions.style.display = 'none';
            }
        }
    });
}

// Handle Enter key in search input
if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchSubmit.click();
        }
    });
}

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
const slidePanelClose = document.querySelector('.slide-panel-close') || document.getElementById('slidePanelClose') || document.getElementById('closePanelBtn');
const panelOverlay = document.getElementById('panelOverlay');
const slidePanelCartCount = document.getElementById('slidePanelCartCount');

// Function to close slide panel
function closeSlidePanel() {
    if (slidePanel) {
        slidePanel.classList.remove('active');
    }
    if (panelOverlay) {
        panelOverlay.classList.remove('active');
    }
    if (fixedMenuBtn) {
        fixedMenuBtn.classList.remove('menu-open');
    }
}

// Function to open slide panel
function openSlidePanel() {
    if (slidePanel) {
        slidePanel.classList.add('active');
    }
    if (panelOverlay) {
        panelOverlay.classList.add('active');
    }
    if (fixedMenuBtn) {
        fixedMenuBtn.classList.add('menu-open');
    }
}

// Toggle slide panel (open/close with same button)
if (fixedMenuBtn) {
    fixedMenuBtn.addEventListener('click', () => {
        const isActive = slidePanel && slidePanel.classList.contains('active');
        
        if (isActive) {
            closeSlidePanel();
        } else {
            openSlidePanel();
        }
    });
}

// Close slide panel with close button (X)
if (slidePanelClose) {
    slidePanelClose.addEventListener('click', () => {
        closeSlidePanel();
    });
}

// Close panel when clicking overlay
if (panelOverlay) {
    panelOverlay.addEventListener('click', () => {
        closeSlidePanel();
    });
}



