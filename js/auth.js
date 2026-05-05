document.addEventListener('DOMContentLoaded', () => {
  const authOverlay = document.querySelector('.auth-overlay');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const switchToRegister = document.getElementById('switch-to-register');
  const switchToLogin = document.getElementById('switch-to-login');
  const logoutBtn = document.getElementById('logout-btn');
  const currentUserSpan = document.getElementById('current-user');
  const loginError = document.getElementById('login-error');
  const regError = document.getElementById('reg-error');

  function getCookie(name) {
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + name + '=');
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }

  function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; path=/; expires=' + expires + '; SameSite=Strict';
  }

  function deleteCookie(name) {
    document.cookie = name + '=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }

  function checkAuth() {
    const user = localStorage.getItem('witcher_user');
    const session = getCookie('witcher_session');
    if (user && session) {
      authOverlay?.classList.add('hidden');
      if (currentUserSpan) currentUserSpan.textContent = JSON.parse(user).username;
      if (logoutBtn) logoutBtn.classList.remove('hidden');
    } else {
      authOverlay?.classList.remove('hidden');
      if (logoutBtn) logoutBtn.classList.add('hidden');
      if (currentUserSpan) currentUserSpan.textContent = '';
    }
  }

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      regError.textContent = '';
      const username = document.getElementById('reg-username').value.trim();
      const password = document.getElementById('reg-password').value;
      if (username && password.length >= 4) {
        const users = JSON.parse(localStorage.getItem('witcher_users') || '[]');
        if (users.find(u => u.username === username)) {
          regError.textContent = 'Пользователь уже существует';
          return;
        }
        users.push({ username, password: btoa(password) });
        localStorage.setItem('witcher_users', JSON.stringify(users));
        localStorage.setItem('witcher_user', JSON.stringify({ username }));
        setCookie('witcher_session', username, 7);
        checkAuth();
        registerForm.reset();
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
        switchToRegister.classList.add('hidden');
        switchToLogin.classList.remove('hidden');
      } else {
        regError.textContent = 'Заполните все поля (пароль мин. 4 символа)';
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      loginError.textContent = '';
      const username = document.getElementById('login-username').value.trim();
      const password = document.getElementById('login-password').value;
      const users = JSON.parse(localStorage.getItem('witcher_users') || '[]');
      const user = users.find(u => u.username === username && u.password === btoa(password));
      if (user) {
        localStorage.setItem('witcher_user', JSON.stringify({ username }));
        setCookie('witcher_session', username, 7);
        checkAuth();
        loginForm.reset();
      } else {
        loginError.textContent = 'Неверный логин или пароль';
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('witcher_user');
      deleteCookie('witcher_session');
      checkAuth();
    });
  }

  if (switchToRegister) {
    switchToRegister.addEventListener('click', (e) => {
      e.preventDefault();
      loginForm?.classList.add('hidden');
      registerForm?.classList.remove('hidden');
      switchToRegister.classList.add('hidden');
      switchToLogin?.classList.remove('hidden');
      loginError.textContent = '';
      regError.textContent = '';
    });
  }

  if (switchToLogin) {
    switchToLogin.addEventListener('click', (e) => {
      e.preventDefault();
      registerForm?.classList.add('hidden');
      loginForm?.classList.remove('hidden');
      switchToLogin.classList.add('hidden');
      switchToRegister?.classList.remove('hidden');
      loginError.textContent = '';
      regError.textContent = '';
    });
  }

  checkAuth();
});
