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
const auth = firebase.auth();
const db = firebase.firestore();

// --- Global DOM Elements ---
const loginScreen = document.getElementById('login-screen');
const dashboardScreen = document.getElementById('dashboard-screen');
const loginForm = document.getElementById('login-form');
const logoutBtn = document.getElementById('logout-btn');
const loginErrorMsg = document.getElementById('login-error-message');

const addProductForm = document.getElementById('add-product-form');
const productListTableBody = document.getElementById('product-list-table-body');
const ordersListTableBody = document.getElementById('orders-list-table-body');

// Dashboard summary elements
const totalOrdersElement = document.getElementById('total-orders');
const totalRevenueElement = document.getElementById('total-revenue');
const pendingOrdersElement = document.getElementById('pending-orders');

// --- Authentication and View Management ---

/** Check authentication state on page load */
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is logged in, show dashboard
        showDashboard();
        // Fetch data immediately upon login
        fetchDashboardSummary();
        fetchProducts();
        fetchOrders();
    } else {
        // User is logged out, show login screen
        showLogin();
    }
});

/** Event listener for login form submission */
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email-address').value;
    const password = document.getElementById('password').value;

    try {
        await auth.signInWithEmailAndPassword(email, password);
        // showDashboard() will be called by onAuthStateChanged listener
    } catch (error) {
        loginErrorMsg.textContent = error.message;
        loginErrorMsg.classList.remove('hidden');
        console.error("Login Error: ", error);
    }
});

/** Event listener for logout button click */
logoutBtn.addEventListener('click', () => {
    auth.signOut();
});

/** Shows the login screen and hides the dashboard. */
function showLogin() {
    loginScreen.classList.remove('hidden');
    dashboardScreen.classList.add('hidden');
    loginErrorMsg.classList.add('hidden');
    loginForm.reset();
}

/** Shows the dashboard and hides the login screen. */
function showDashboard() {
    loginScreen.classList.add('hidden');
    dashboardScreen.classList.remove('hidden');
}

// Sidebar navigation logic
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const viewId = link.dataset.view;
        document.querySelectorAll('section').forEach(section => section.classList.add('hidden'));
        document.getElementById(`${viewId}-view`).classList.remove('hidden');

        // Update active link styling
        document.querySelectorAll('nav a').forEach(navLink => navLink.classList.remove('active-nav-link'));
        link.classList.add('active-nav-link');
    });
});

// --- Dashboard Summary Logic ---
async function fetchDashboardSummary() {
    const ordersSnapshot = await db.collection("orders").get();
    const totalOrders = ordersSnapshot.size;
    let totalRevenue = 0;
    let pendingOrders = 0;

    ordersSnapshot.forEach(doc => {
        const orderData = doc.data();
        totalRevenue += orderData.totalAmount || 0;
        if (orderData.status === "Pending") {
            pendingOrders++;
        }
    });

    totalOrdersElement.textContent = totalOrders;
    totalRevenueElement.textContent = `$${totalRevenue.toFixed(2)}`;
    pendingOrdersElement.textContent = pendingOrders;
}

// --- Product Management Logic (CRUD) ---

/** Adds a new product to Firestore based on form data */
addProductForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('product-title').value;
    const description = document.getElementById('product-description').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const imageUrl = document.getElementById('product-image-url').value;

    const newProduct = { title, description, price, imageUrl, createdAt: firebase.firestore.FieldValue.serverTimestamp() };

    try {
        await db.collection("products").add(newProduct);
        alert("Product added successfully!");
        addProductForm.reset();
    } catch (error) {
        console.error("Error adding product: ", error);
        alert("Failed to add product.");
    }
});

/** Fetches product list and renders table in Admin panel */
function fetchProducts() {
    db.collection("products").onSnapshot((snapshot) => {
        productListTableBody.innerHTML = '';
        snapshot.docs.forEach(doc => {
            const product = { id: doc.id, ...doc.data() };
            const row = document.createElement('tr');
            row.className = 'hover:bg-gray-50';
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap"><img src="${product.imageUrl}" class="w-16 h-16 object-cover rounded"></td>
                <td class="px-6 py-4 whitespace-nowrap font-medium text-gray-900">${product.title}</td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-700">$${product.price.toFixed(2)}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button data-id="${product.id}" class="delete-product-btn text-red-600 hover:text-red-900 mr-2">Delete</button>
                </td>
            `;
            productListTableBody.appendChild(row);
        });
    });
}

/** Event listener for product deletion */
productListTableBody.addEventListener('click', async (e) => {
    if (e.target.classList.contains('delete-product-btn')) {
        const productId = e.target.dataset.id;
        if (confirm("Are you sure you want to delete this product?")) {
            try {
                await db.collection("products").doc(productId).delete();
                alert("Product deleted successfully!");
            } catch (error) {
                console.error("Error deleting product: ", error);
                alert("Failed to delete product.");
            }
        }
    }
});

// --- Order View Logic ---

/** Fetches orders list and renders table in Admin panel */
function fetchOrders() {
    db.collection("orders").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
        ordersListTableBody.innerHTML = '';
        snapshot.docs.forEach(doc => {
            const order = { id: doc.id, ...doc.data() };
            const row = document.createElement('tr');
            row.className = 'hover:bg-gray-50';

            // Format timestamp if available
            const orderDate = order.timestamp ? new Date(order.timestamp.toDate()).toLocaleDateString() : 'N/A';

            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap font-medium text-gray-900">${order.id.substring(0, 8)}...</td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-700">${order.customer.name}</td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-700">$${order.totalAmount.toFixed(2)}</td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-700">${orderDate}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}">
                        ${order.status}
                    </span>
                </td>
            `;
            ordersListTableBody.appendChild(row);
        });
    });
}