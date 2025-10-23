function validateLogin() {
    // Get the username and password values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple validation (you can replace this with actual authentication logic)
    if (username === 'user' && password === 'pass') {
        alert('Login successful!');
        
        // Redirect to home.html after a short delay
        setTimeout(() => {
            window.location.href = 'home.html'; // Redirect to the home page after successful login
        }, 1000); // Delay of 1000 milliseconds (1 second)

        return false; // Prevent form submission
    } else {
        alert('Invalid username or password. Please try again.');
        return false; // Prevent form submission
    }
}