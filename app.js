// --- Firebase Configuration ---
// Replace with your actual Firebase configuration from the console
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// --- Global DOM Elements ---
const productGrid = document.getElementById('product-grid');
const loadingSpinner = document.getElementById('loading-spinner');
const cartSidebar = document.getElementById('cart-sidebar');
const cartBtn = document.getElementById('cart-btn');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartItemsList = document.getElementById('cart-items-list');
const cartCount = document.getElementById('cart-count');
const cartTotalPrice = document.getElementById('cart-total-price');
const emptyCartMessage = document.getElementById('empty-cart-message');
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutModal = document.getElementById('checkout-modal');
const closeCheckoutBtn = document.getElementById('close-checkout-btn');
const checkoutForm = document.getElementById('checkout-form');

// --- Cart State Management (using localStorage) ---
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// --- Firebase Product Fetching ---
function fetchProducts() {
    // Show loading spinner while fetching data
    loadingSpinner.classList.remove('hidden');
    productGrid.innerHTML = ''; // Clear existing content

    db.collection("products").onSnapshot((snapshot) => {
        const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        renderProducts(products);
        loadingSpinner.classList.add('hidden');
    }, (error) => {
        console.error("Error fetching products: ", error);
        productGrid.innerHTML = '<p class="text-red-500 text-center col-span-full">Failed to load products.</p>';
        loadingSpinner.classList.add('hidden');
    });
}

// --- Render Products on Home Page ---
function renderProducts(products) {
    productGrid.innerHTML = '';
    products.forEach(product => {
        // Create a product card element for each product fetched from Firestore
        const card = document.createElement('div');
        card.className = 'bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-500 overflow-hidden group';
        card.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.title}" class="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-500">
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-2">${product.title}</h3>
                <p class="text-gray-600 mb-4">${product.description}</p>
                <div class="flex items-center justify-between">
                    <span class="text-2xl font-bold text-indigo-600">$${product.price.toFixed(2)}</span>
                    <button data-id="${product.id}" class="add-to-cart-btn bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition duration-300 transform hover:scale-105">Add to Cart</button>
                </div>
                <!-- Size Selection (example: hardcoded for demonstration, can be dynamic) -->
                <div class="mt-4 flex space-x-2">
                    <select class="p-2 border rounded text-sm size-select">
                        <option value="S">S</option>
                        <option value="M" selected>M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                    </select>
                    <input type="color" class="w-8 h-8 rounded-full color-select" value="#000000">
                </div>
            </div>
        `;
        productGrid.appendChild(card);
    });
}

// --- Cart Logic Implementation ---

/**
 * Adds a product to the cart or increments its quantity.
 * @param {object} product - Product details to add.
 * @param {string} size - Selected size.
 * @param {string} color - Selected color.
 */
function addToCart(product, size, color) {
    const existingItem = cart.find(item => item.id === product.id && item.size === size && item.color === color);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, size, color, quantity: 1 });
    }

    updateCart();
}

/** Updates local storage and re-renders the cart UI. */
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartIconCount();
}

/** Calculates total price and renders cart items in the sidebar. */
function renderCart() {
    cartItemsList.innerHTML = '';
    let totalPrice = 0;

    if (cart.length === 0) {
        emptyCartMessage.classList.remove('hidden');
        cartTotalPrice.textContent = '$0.00';
        return;
    } else {
        emptyCartMessage.classList.add('hidden');
    }

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'flex items-center justify-between border-b pb-2';
        cartItemElement.innerHTML = `
            <div class="flex items-center space-x-4">
                <img src="${item.imageUrl}" alt="${item.title}" class="w-16 h-16 object-cover rounded">
                <div>
                    <h4 class="font-semibold">${item.title}</h4>
                    <p class="text-sm text-gray-600">Size: ${item.size} | Color: <span style="background-color: ${item.color}" class="inline-block w-4 h-4 rounded-full border"></span></p>
                    <div class="flex items-center mt-1">
                        <button class="remove-item-btn text-gray-600 hover:text-red-600 text-sm" data-id="${item.id}" data-size="${item.size}" data-color="${item.color}">Remove</button>
                    </div>
                </div>
            </div>
            <div class="text-right">
                <p class="font-medium">$${itemTotal.toFixed(2)}</p>
                <p class="text-sm text-gray-600">Qty: ${item.quantity}</p>
            </div>
        `;
        cartItemsList.appendChild(cartItemElement);
    });

    cartTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;
}

/** Updates the cart count on the header icon. */
function updateCartIconCount() {
    const totalCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalCount;
}

/** Removes an item from the cart. */
function removeItemFromCart(itemId, size, color) {
    cart = cart.filter(item => !(item.id === itemId && item.size === size && item.color === color));
    updateCart();
}

// --- Checkout Logic ---
async function processCheckout(e) {
    e.preventDefault();

    const orderData = {
        customer: {
            name: document.getElementById('checkout-name').value,
            phone: document.getElementById('checkout-phone').value,
            address: document.getElementById('checkout-address').value,
        },
        items: cart.map(item => ({
            productId: item.id,
            title: item.title,
            size: item.size,
            color: item.color,
            quantity: item.quantity,
            price: item.price
        })),
        totalAmount: cart.reduce((total, item) => total + item.price * item.quantity, 0),
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        status: "Pending" // Initial status
    };

    try {
        await db.collection("orders").add(orderData);
        alert("Order placed successfully! Thank you for your purchase.");
        cart = []; // Clear local cart state
        updateCart();
        closeCheckoutModal();
    } catch (error) {
        console.error("Error placing order: ", error);
        alert("Failed to place order. Please try again.");
    }
}

// --- Event Listeners ---

// Listen for Add to Cart clicks on product cards
productGrid.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart-btn')) {
        const productId = e.target.dataset.id;
        // Find the corresponding product card element
        const productCard = e.target.closest('.group');
        const productSelects = productCard.querySelectorAll('select, input[type="color"]');
        
        // Extract selected size and color
        const selectedSize = productSelects[0].value;
        const selectedColor = productSelects[1].value;

        // Fetch product details from the existing product data (or re-fetch if necessary)
        // For simplicity, we assume we have the product data available from the last fetch
        const product = products.find(p => p.id === productId); 
        if (product) {
            addToCart(product, selectedSize, selectedColor);
        }
    }
});

// Listen for cart item removal clicks
cartItemsList.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item-btn')) {
        const itemId = e.target.dataset.id;
        const itemSize = e.target.dataset.size;
        const itemColor = e.target.dataset.color;
        removeItemFromCart(itemId, itemSize, itemColor);
    }
});

// Cart sidebar open/close functionality
cartBtn.addEventListener('click', () => cartSidebar.classList.remove('translate-x-full'));
closeCartBtn.addEventListener('click', () => cartSidebar.classList.add('translate-x-full'));

// Checkout modal open/close functionality
checkoutBtn.addEventListener('click', () => {
    if (cart.length > 0) {
        checkoutModal.classList.remove('hidden');
        cartSidebar.classList.add('translate-x-full');
    } else {
        alert("Your cart is empty. Please add items before checking out.");
    }
});
closeCheckoutBtn.addEventListener('click', () => checkoutModal.classList.add('hidden'));
checkoutForm.addEventListener('submit', processCheckout);

// --- Initialization ---
// Fetch products and render cart on page load
fetchProducts();
renderCart();
updateCartIconCount();