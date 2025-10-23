let cart = JSON.parse(localStorage.getItem('cart')) || []; // Load cart from localStorage
const cartSidebar = document.getElementById('cart-sidebar');
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const buyNowButton = document.getElementById('buy-now-button');
const closeCartButton = document.getElementById('close-cart');
const clearCartButton = document.getElementById('clear-cart'); // Button for clearing the cart

// Function to open the cart sidebar
function openCart() {
    cartSidebar.classList.add('open');
}

// Function to close the cart sidebar
function closeCart() {
    cartSidebar.classList.remove('open');
}

// Function to save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to add item to cart
function addToCart(name, price, image) {
    // Check if the item already exists in the cart
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if item exists
    } else {
        cart.push({ name, price, image, quantity: 1 }); // Add new item with quantity 1
    }
    saveCart(); // Save cart to localStorage
    updateCartDisplay(); // Update cart display
}

// Function to clear all items in the cart
function clearCart() {
    cart = []; // Empty the cart array
    saveCart(); // Save the empty cart to localStorage
    updateCartDisplay(); // Update the display
}

// Function to update cart display
function updateCartDisplay() {
    cartItemsContainer.innerHTML = ''; // Clear previous items
    let total = 0;

    cart.forEach(item => {
        // Create a container for each cart item
        const itemContainer = document.createElement('div');
        itemContainer.classList.add('cart-item'); // Add a class for styling
        
        // Update to handle peso currency format
        itemContainer.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image"> 
            <span class="cart-item-name">${item.name} - ₱${parseFloat(item.price.replace(/₱|,/g, '')).toFixed(2)} (x${item.quantity})</span>
        `;
        
        cartItemsContainer.appendChild(itemContainer);
        total += parseFloat(item.price.replace(/₱|,/g, '')) * item.quantity; // Calculate total based on quantity
    });

    totalPriceElement.innerText = `Total: ₱${total.toFixed(2)}`; // Update total display

    // Disable or enable the buy now button based on cart items
    buyNowButton.disabled = cart.length === 0; // Disable if cart is empty
}

// Event listeners for add to cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = button.getAttribute('data-price');
        const image = button.getAttribute('data-image');
        addToCart(name, price, image);
        openCart(); // Open cart when item is added
    });
});

// Event listener for close cart button
closeCartButton.addEventListener('click', closeCart);

// Event listener for clear cart button
clearCartButton.addEventListener('click', clearCart); // Add event listener for clearing the cart

// Event listener for buy now button
buyNowButton.addEventListener('click', () => {
    const total = cart.reduce((sum, item) => sum + parseFloat(item.price.replace(/₱|,/g, '')) * item.quantity, 0); // Calculate total
    localStorage.setItem('totalAmount', total.toFixed(2)); // Store total amount
    window.location.href = 'receipt.html'; // Redirect to receipt page
});

// Event listener for cart button to open the cart
document.getElementById('cart-button').addEventListener('click', openCart);

// Load the cart display when the page loads
updateCartDisplay();