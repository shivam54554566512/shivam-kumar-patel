// Sample product data
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        description: "High-quality wireless headphones with noise cancellation"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500",
        description: "Feature-rich smartwatch with health tracking"
    },
    {
        id: 3,
        name: "Laptop Backpack",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
        description: "Durable and spacious laptop backpack"
    },
    {
        id: 4,
        name: "Bluetooth Speaker",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
        description: "Portable Bluetooth speaker with amazing sound"
    }
];

// Shopping cart state
let cart = [];
let cartOpen = false;

// DOM Elements
const productGrid = document.querySelector('.product-grid');
const cartSidebar = document.querySelector('.cart-sidebar');
const cartItems = document.querySelector('.cart-items');
const cartCount = document.querySelector('.cart-count');
const cartTotalAmount = document.getElementById('cart-total-amount');
const cartIcon = document.querySelector('.cart-icon');
const closeCartBtn = document.querySelector('.close-cart');
const checkoutBtn = document.querySelector('.checkout-btn');

// Initialize the page
function init() {
    displayProducts();
    setupEventListeners();
}

// Display products in the grid
function displayProducts() {
    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p>${product.description}</p>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Set up event listeners
function setupEventListeners() {
    // Add to cart buttons
    productGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.dataset.id);
            addToCart(productId);
        }
    });

    // Cart toggle
    cartIcon.addEventListener('click', toggleCart);
    closeCartBtn.addEventListener('click', toggleCart);

    // Checkout button
    checkoutBtn.addEventListener('click', handleCheckout);
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
    showNotification(`Added ${product.name} to cart!`);
}

// Update cart display
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover;">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <button class="remove-item" data-id="${item.id}">&times;</button>
        </div>
    `).join('');

    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalAmount.textContent = total.toFixed(2);
}

// Toggle cart sidebar
function toggleCart() {
    cartOpen = !cartOpen;
    cartSidebar.style.right = cartOpen ? '0' : '-400px';
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Handle checkout
function handleCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    alert('Thank you for your purchase! This is a demo site, so no actual purchase will be processed.');
    cart = [];
    updateCart();
    toggleCart();
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', init); 