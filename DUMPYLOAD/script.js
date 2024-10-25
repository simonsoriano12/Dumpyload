// Predefined users
const users = [
    { username: 'user1', password: 'pass1' },
    { username: 'user2', password: 'pass2' }
];

// Check for existing users in local storage
if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(users));
}

document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const storedUsers = JSON.parse(localStorage.getItem('users'));
    const user = storedUsers.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        window.location.href = 'dashboard.html'; // Redirect to the generic dashboard
    } else {
        alert('Invalid username or password!');
    }
});

// Registration logic
document.getElementById('registerLink')?.addEventListener('click', function () {
    const username = prompt('Enter your username:');
    const password = prompt('Enter your password:');
    
    if (username && password) {
        const storedUsers = JSON.parse(localStorage.getItem('users'));
        
        // Check if username already exists
        if (storedUsers.find(u => u.username === username)) {
            alert('Username already exists. Please choose another.');
            return;
        }
        
        storedUsers.push({ username, password });
        localStorage.setItem('users', JSON.stringify(storedUsers));
        alert('Registration successful! You can now log in.');
    }
});

// Display logged-in user on the dashboard
if (document.getElementById('userName')) {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    document.getElementById('userName').textContent = loggedInUser ? loggedInUser.username : 'Guest';
}

// Logout functionality
const logoutButton = document.getElementById('logoutButton');
if (logoutButton) {
    logoutButton.addEventListener('click', function () {
        localStorage.removeItem('loggedInUser');
        window.location.href = 'index.html';
    });
}
