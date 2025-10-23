// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || []; 
const receiptItemsContainer = document.getElementById('receipt-items');
const totalAmountElement = document.getElementById('total-amount');

// Function to display receipt items
function displayReceipt() {
    let total = 0;

    // Check if cart is empty
    if (cart.length === 0) {
        receiptItemsContainer.innerHTML = '<p>No items in the cart.</p>';
        totalAmountElement.innerText = 'Total Amount: ₱0.00';
        return; // Exit if no items
    }

    cart.forEach(item => {
        const itemContainer = document.createElement('div');
        itemContainer.classList.add('receipt-item');
        
        // Handle peso currency format
        const price = parseFloat(item.price.replace(/₱|,/g, '')); // Convert price to number
        const quantity = item.quantity; // Get quantity

        itemContainer.innerHTML = `
            <span>${item.name} - ₱${price.toFixed(2)} (x${quantity})</span>
        `;
        
        receiptItemsContainer.appendChild(itemContainer);
        total += price * quantity; // Calculate total based on quantity
    });

    totalAmountElement.innerText = `Total Amount: ₱${total.toFixed(2)}`;
}

// Call the function to display the receipt when the page loads
displayReceipt();

// Event listener for continue shopping button
document.getElementById('continue-shopping-button').addEventListener('click', () => {
    localStorage.removeItem('cart'); // Clear the cart
    window.location.href = 'home.html'; // Redirect to the home page
});