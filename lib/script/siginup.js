// Define the loginUser function
function loginUser(username, password) {
  const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
  const user = existingUsers.find(user => user.username === username && user.password === password);
  if (user) {
    sessionStorage.setItem('loggedInUsername', user.username);
  }
  return user;
}

function updateSignUpButton(username) {
  const signUpButton = document.getElementById('signup-btn');
  if (signUpButton) {
    signUpButton.textContent = `Logged in as ${username}`;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const loginUsername = document.getElementById('loginUsername').value;
      const loginPassword = document.getElementById('loginPassword').value;

      const user = loginUser(loginUsername, loginPassword);
      if (user) {
        document.getElementById('message').textContent = 'Login Successful! You are now logged in.';
        sessionStorage.setItem('loggedInUsername', user.username);
        window.location.href = 'buyandsell.html';
      } else {
        document.getElementById('message').textContent = 'Invalid username or password.';
      }
    });
  }

  // Update the "Sign Up" button text after the page is loaded
  const loggedInUsername = sessionStorage.getItem('loggedInUsername');
  if (loggedInUsername) {
    updateSignUpButton(loggedInUsername);
  }

  const registrationForm = document.getElementById('registrationForm');
  if (registrationForm) {
    registrationForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const regUsername = document.getElementById('regUsername').value;
      const regPassword = document.getElementById('regPassword').value;

      if (registerUser(regUsername, regPassword)) {
        document.getElementById('message').textContent = 'Registration Successful! You can now log in.';
      } else {
        document.getElementById('message').textContent = 'Username already exists. Please choose a different username.';
      }
    });
  }
});
