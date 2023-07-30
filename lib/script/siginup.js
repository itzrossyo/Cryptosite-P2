function registerUser(username, password) {
  const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
  const userExists = existingUsers.some(user => user.username === username);

  if (userExists) {
    return false;
  }

  existingUsers.push({ username, password });
  localStorage.setItem('users', JSON.stringify(existingUsers));
  return true;
}

function loginUser(username, password) {
  const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
  const user = existingUsers.find(user => user.username === username && user.password === password);
  return user;
}

document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const loginUsername = document.getElementById('loginUsername').value;
  const loginPassword = document.getElementById('loginPassword').value;

  const user = loginUser(loginUsername, loginPassword);
  if (user) {
    document.getElementById('message').textContent = 'Login Successful! You are now logged in.';
    sessionStorage.setItem('loggedInUser', JSON.stringify(user));
    window.location.href = '/pages/buyandsell.html';
  } else {
    document.getElementById('message').textContent = 'Invalid username or password.';
  }
});

document.getElementById('registrationForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const regUsername = document.getElementById('regUsername').value;
  const regPassword = document.getElementById('regPassword').value;

  if (registerUser(regUsername, regPassword)) {
    document.getElementById('message').textContent = 'Registration Successful! You can now log in.';
  } else {
    document.getElementById('message').textContent = 'Username already exists. Please choose a different username.';
  }
});
