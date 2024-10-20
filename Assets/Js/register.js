document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    axios.post('/register', { name, email, password })
    .then(response => {
        console.log('Success:', response.data);
        alert("User registered successfully!");
    })
    .catch(error => {
        console.error('Error:', error.response.data);
        alert("Error registering user: " + error.response.data.error);
    });

});
