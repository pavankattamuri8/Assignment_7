document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    axios.post('/login', { email, password })
        .then(response => {
            console.log('Login successful:', response.data);
            alert("Login successful!"); // Or redirect the user
            // Redirect to dashboard or any other page
            window.location.href = '/profile';
        })
        .catch(error => {
            console.error('Error logging in:', error);
            alert("Error logging in! " + error.response.data.error);
        });
});
