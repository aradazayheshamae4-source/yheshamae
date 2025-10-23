// Search functionality
document.getElementById('search').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') { // Check if the Enter key is pressed
        const query = event.target.value.toLowerCase();
        const products = [
            { name: 'Tecno Spark Go 2', url: 'smartphones.html' },
            { name: 'Infinix Smart 10', url: 'smartphones.html' },
            { name: 'Redmi A5', url: 'smartphones.html' },
            { name: 'Realme DIZO Watch 2', url: 'accessories.html' },
            { name: 'Anker Prime 20,000mAh Power Bank (200W)', url: 'accessories.html' },
            { name: 'WH-1000XM4 Wireless Noise-Canceling Headphones', url: 'accessories.html' }
        ]; // Example product names and URLs

        // Check if the query matches any product name
        const foundProduct = products.find(product => product.name.toLowerCase().includes(query));

        if (foundProduct) {
            window.location.href = foundProduct.url; // Redirect to the product page
        } else {
            alert('No products found matching your search.'); // Alert if no products found
        }
    }
});