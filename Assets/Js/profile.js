{/* <script> */}
        function loadFile(event) {
            const output = document.getElementById('profile-pic');
            output.src = URL.createObjectURL(event.target.files[0]);
            output.style.display = 'block';
        }

        function openModal(modalId) {
            document.getElementById(modalId).style.display = "block";
        }

        function closeModal(modalId) {
            document.getElementById(modalId).style.display = "none";
        }

        function createUser() {
            const name = document.getElementById('create-name').value;
            const email = document.getElementById('create-email').value;
            // Logic to create a user
            alert(`User created: ${name}, ${email}`);
            closeModal('createModal');
        }

        function updateUser() {
            const name = document.getElementById('update-name').value;
            const email = document.getElementById('update-email').value;
            // Logic to update a user
            alert(`User updated: ${name}, ${email}`);
            closeModal('updateModal');
        }

        function deleteUser() {
            // Logic to delete a user
            alert(`User deleted.`);
            closeModal('deleteModal');
        }

        function readUser() {
            // Redirect to dashboard
            window.location.href = "/dashboard"; // Change to your dashboard URL
        }
        
        // Close modal when clicking outside of it
        window.onclick = function(event) {
            if (event.target.classList.contains('modal')) {
                closeModal('createModal');
                closeModal('updateModal');
                closeModal('deleteModal');
            }
        }
    // </script>