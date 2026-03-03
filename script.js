// Register User
function registerUser() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  localStorage.setItem("userEmail", email);
  localStorage.setItem("userPassword", password);

  alert("Registration Successful!");
  window.location.href = "login.html";

  return false;
}

// Login User
function loginUser() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const storedEmail = localStorage.getItem("userEmail");
  const storedPassword = localStorage.getItem("userPassword");

  if (email === storedEmail && password === storedPassword) {
    localStorage.setItem("isLoggedIn", "true");
    alert("Login Successful!");
    window.location.href = "home.html";
  } else {
    alert("Invalid Email or Password");
  }

  return false;
}

// Logout User
function logoutUser() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login.html";
  return false;
}

// Forgot Password
function resetPassword() {
  const email = document.getElementById("resetEmail").value;
  const storedEmail = localStorage.getItem("userEmail");

  if (email === storedEmail) {
    alert("Password reset link sent to your email (simulation)");
  } else {
    alert("Email not registered!");
  }

  return false;
}


// Cart Functionality


// Initialize cart array from localStorage, or empty array if null
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add item to cart
function addToCart(productName, price) {
  cart.push({ name: productName, price: price });
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(productName + " has been added to your cart for $" + price + "!");
}

// Render items on the Cart Page
function displayCart() {
  const cartContainer = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  
  // Exit if we are not on the cart page
  if (!cartContainer || !cartTotal) return;

  cartContainer.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p class="text-muted text-center my-4">Your cart is currently empty.</p>';
    cartTotal.innerText = '0.00';
    return;
  }

  cart.forEach((item, index) => {
    total += item.price;
    cartContainer.innerHTML += `
      <div class="cart-item d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center gap-3">
          <div style="width: 50px; height: 50px; background-color: #f1f5f9; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
          </div>
          <h5 class="mb-0 text-dark fw-bold">${item.name}</h5>
        </div>
        <div class="d-flex align-items-center">
          <span class="me-4 text-primary fw-bold" style="font-size: 1.25rem;">$${item.price.toFixed(2)}</span>
          <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${index})">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </div>
      </div>
    `;
  });

  cartTotal.innerText = total.toFixed(2);
}

// Remove single item from cart
function removeFromCart(index) {
  cart.splice(index, 1); // remove 1 item at the given index
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart(); // re-render the cart
}

// Checkout and clear cart
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty! Add some products first.");
    return;
  }
  
  const total = document.getElementById('cart-total').innerText;
  alert("Thank you for your purchase! Your total was $" + total + ".");
  
  // Empty the cart
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart(); // re-render empty cart
}

// Run the display function automatically when the page loads
document.addEventListener("DOMContentLoaded", () => {
  displayCart();
  
  // Auto-redirect logic
  const currentPage = window.location.pathname.split('/').pop() || 'login.html';
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const isRegistered = localStorage.getItem("userEmail") !== null;

  const authPages = ['login.html', 'register.html', 'forgot.html', ''];
  const protectedPages = ['home.html', 'about.html', 'products.html', 'cart.html'];

  // If user is trying to access protected pages without logging in
  if (protectedPages.includes(currentPage) && !isLoggedIn) {
    window.location.href = isRegistered ? "login.html" : "register.html";
  }

  // If user is already logged in, they don't need to see login/register pages
  if (authPages.includes(currentPage) && isLoggedIn) {
    window.location.href = "home.html";
  }
  
  // If user is already registered, redirect them to login if they try to visit register page
  if (currentPage === 'register.html' && isRegistered && !isLoggedIn) {
    // Only redirect if they actually want to go to login, else they might want to register a new user
  }
});