// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Sample product data (in a real app, this would come from a database)
const productData = {
    '1': {
        name: 'SUADE JACKET',
        category: 'JACKETS',
        price: '£80',
        images: [
            'assests/png/SUADEJACKETFRONT.png',
            'assests/png/SUADEJACKETBACK.png',
            'https://via.placeholder.com/400x500/ffffff/000000?text=White+Tee+Side',
            'https://via.placeholder.com/400x500/ffffff/000000?text=White+Tee+Detail'
        ]
    },
    '2': {
        name: 'HEINOUS PUPILS TEE',
        category: 'T-Shirts',
        price: '£34.99',
        images: [
            'assests/png/HEINOUSPUPILS.png',
            'https://schoffa.com/cdn/shop/files/T-Shirt-Black_Back.png?v=1713953944&width=1024',
            'https://via.placeholder.com/400x500/000000/ffffff?text=Black+Tee+Side',
            'https://via.placeholder.com/400x500/000000/ffffff?text=Black+Tee+Detail'
        ]
    },
    '3': {
        name: 'HEINOUS PUPILS TRACKSUIT',
        category: 'TRACKSUIT',
        price: '£114.99',
        description: 'PART OF THE "HEINOUS PUPILS COLLECTION"',
        images: [
            'assests/png/HEINOUSPUPILSHOODIE.png',
            'assests/png/HEINOUSPUPILSBOTTOMS.png',
            'assests/png/HEINOUSPUPILSBOTTOMSBACK.png',
            'https://via.placeholder.com/400x500/1e3a8a/ffffff?text=Navy+Tee+Detail'
        ]
    },
    '4': {
        name: 'NO SECRET IS SAFE',
        category: 'HOODIE',
        price: '£59.99',
        description: 'Relaxed fit gray tee made from premium cotton blend. Soft, comfortable, and versatile.',
        images: [
            'assests/png/SECRETSHOODIE.png',
            'https://via.placeholder.com/400x500/6b7280/ffffff?text=Gray+Tee+Back',
            'https://via.placeholder.com/400x500/6b7280/ffffff?text=Gray+Tee+Side',
            'https://via.placeholder.com/400x500/6b7280/ffffff?text=Gray+Tee+Detail'
        ]
    },
    '5': {
        name: 'SALUTE MEOR SHOOT ME',
        category: 'BEANIE',
        price: '£29.99',
        description: 'Bold statement piece in vibrant crimson red. Stand out with confidence and style.',
        images: [
            'assests/png/SALUTEMEORSHOOTME.png',
            'https://via.placeholder.com/400x500/dc2626/ffffff?text=Red+Tee+Back',
            'https://via.placeholder.com/400x500/dc2626/ffffff?text=Red+Tee+Side',
            'https://via.placeholder.com/400x500/dc2626/ffffff?text=Red+Tee+Detail'
        ]
    },
    '6': {
        name: 'BARBED',
        category: 'BEANIE',
        price: '£29.99',
        description: 'Nature-inspired forest green tee. Eco-friendly materials and timeless design.',
        images: [
            'assests/png/BARBEDBEANIE.png',
            'https://via.placeholder.com/400x500/16a34a/ffffff?text=Green+Tee+Back',
            'https://via.placeholder.com/400x500/16a34a/ffffff?text=Green+Tee+Side',
            'https://via.placeholder.com/400x500/16a34a/ffffff?text=Green+Tee+Detail'
        ]
    }
};

// Load product data
function loadProduct() {
    const product = productData[productId];
    
    if (!product) {
        document.querySelector('.product-detail-section').innerHTML = '<h2 style="text-align: center; padding: 100px 0;">Product not found</h2>';
        return;
    }

    // Update page title
    document.title = `${product.name} - FELOEN`;

    // Set product information
    document.getElementById('productName').textContent = product.name;
    document.getElementById('productCategory').textContent = product.category;
    document.getElementById('productPrice').textContent = product.price;
    document.getElementById('productDescription').textContent = product.description;

    // Set images
    const mainImage = document.getElementById('mainProductImage');
    mainImage.src = product.images[0];
    mainImage.alt = product.name;

    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
        if (product.images[index]) {
            thumb.src = product.images[index];
            thumb.alt = `${product.name} - View ${index + 1}`;
        }
    });
}

// Thumbnail click handler
document.querySelectorAll('.thumbnail').forEach(thumb => {
    thumb.addEventListener('click', function() {
        const mainImage = document.getElementById('mainProductImage');
        mainImage.src = this.src;
        
        document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
    });
});

// Size selection
document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

// Color selection
document.querySelectorAll('.color-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

// Quantity controls
const quantityInput = document.getElementById('quantity');
const decreaseBtn = document.getElementById('decreaseQty');
const increaseBtn = document.getElementById('increaseQty');

decreaseBtn.addEventListener('click', () => {
    let value = parseInt(quantityInput.value);
    if (value > 1) {
        quantityInput.value = value - 1;
    }
});

increaseBtn.addEventListener('click', () => {
    let value = parseInt(quantityInput.value);
    if (value < 10) {
        quantityInput.value = value + 1;
    }
});

// Add to Cart
const addToCartBtn = document.getElementById('addToCartBtn');
if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
        const productName = document.querySelector('.product-info-detail h1').textContent;
        const selectedSize = document.querySelector('.size-btn.active')?.textContent;
        const quantity = parseInt(quantityInput.value);
        const price = document.querySelector('.product-price-detail').textContent;
        const productImage = document.getElementById('mainProductImage').src;

        if (!selectedSize) {
            alert('Please select a size');
            return;
        }

        const product = {
            name: productName,
            size: selectedSize,
            quantity: quantity,
            price: price,
            image: productImage
        };

        // Use the addToCart function from main script
        if (window.addToCart) {
            window.addToCart(product);
        } else {
            // Fallback if main script not loaded
            console.log('Added to cart:', product);
            alert(`Added ${quantity} x ${productName} (${selectedSize}) to cart!`);
        }
    });
}

// Cart functionality
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

function showCartNotification(product) {
    const cartNotification = document.getElementById('cartNotification');
    const cartNotificationItem = document.getElementById('cartNotificationItem');

    if (!cartNotification || !cartNotificationItem) return;

    // Create notification content
    cartNotificationItem.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="cart-notification-img">
        <div class="cart-notification-info">
            <h4>${product.name}</h4>
            <p>Size: ${product.size}</p>
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
        item.size === product.size
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

function displayCart() {
    const cartItemsList = document.getElementById('cartItemsList');
    const subtotalEl = document.getElementById('subtotal');
    const totalEl = document.getElementById('total');

    if (cartItems.length === 0) {
        cartItemsList.innerHTML = `
            <div class="empty-cart">
                <h2>Your cart is empty</h2>
                <p>Add some products to get started!</p>
                <a href="index.html">Continue Shopping</a>
            </div>
        `;
        subtotalEl.textContent = '$0.00';
        totalEl.textContent = '$0.00';
        return;
    }

    let subtotal = 0;

    cartItemsList.innerHTML = cartItems.map((item, index) => {
        const price = parseFloat(item.price.replace('$', ''));
        const itemTotal = price * item.quantity;
        subtotal += itemTotal;

        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <p>Size: ${item.size}</p>
                    <p>Quantity: ${item.quantity}</p>
                </div>
                <div class="cart-item-actions">
                    <span class="cart-item-price">$${itemTotal.toFixed(2)}</span>
                    <button class="cart-item-remove" data-index="${index}">Remove</button>
                </div>
            </div>
        `;
    }).join('');

    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    totalEl.textContent = `$${subtotal.toFixed(2)}`;

    // Add remove button listeners
    document.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            cartItems.splice(index, 1);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            displayCart();
        });
    });
}

// Load product on page load
loadProduct();