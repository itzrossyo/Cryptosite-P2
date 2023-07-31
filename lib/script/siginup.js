// Define the loginUser function
function loginUser(username, password) {
  const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
  const user = existingUsers.find(user => user.username === username && user.password === password);
  return user; // Return the user object if found, or null if not found
}

// Define the registerUser function
function registerUser(username, password) {
  const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
  const userExists = existingUsers.some(user => user.username === username);

  if (!userExists) {
    existingUsers.push({ username, password });
    localStorage.setItem('users', JSON.stringify(existingUsers));
    return true; // Registration successful
  }

  return false; // Username already exists
}

function logoutUser() {
  sessionStorage.removeItem('loggedInUsername');
  updateButtonOnLogout();
  window.location.href = 'index.html'; // Redirect to the homepage or the desired page after logout
}

function updateButtonOnLogin(username) {
  const signUpButton = document.getElementById('signup-btn');
  if (signUpButton) {
    signUpButton.textContent = `Logged in as ${username}`;
    signUpButton.removeEventListener('click', loginUserHandler);
    signUpButton.addEventListener('click', logoutUserHandler);
  }
}

function updateButtonOnLogout() {
  const signUpButton = document.getElementById('signup-btn');
  if (signUpButton) {
    signUpButton.textContent = 'SignUp';
    signUpButton.removeEventListener('click', logoutUserHandler);
    signUpButton.addEventListener('click', loginUserHandler);
  }
}

function loginUserHandler() {
  // Code for handling login form display and submission
}

function logoutUserHandler() {
  logoutUser();
}

document.addEventListener('DOMContentLoaded', function () {
  const loggedInUsername = sessionStorage.getItem('loggedInUsername');
  if (loggedInUsername) {
    updateButtonOnLogin(loggedInUsername);
  } else {
    updateButtonOnLogout();
  }

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
