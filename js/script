function setCookie(name, value, days) {
        var expires = '';
        if (days) {
          var date = new Date();
          date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
          expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/';
      }

      function getCookie(name) {
        var nameEQ = name + '=';
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
          var c = cookies[i].replace(/^\s+/, '');
          if (c.indexOf(nameEQ) == 0) {
            return decodeURIComponent(c.substring(nameEQ.length));
          }
        }
        return null;
      }

      function eraseCookie(name) {
        document.cookie = name + '=; Max-Age=-99999999; path=/';
      }

      var VALID_USERNAME = 'Dima';
      var VALID_PASSWORD = 'qwert12345';

      var authOverlay = document.getElementById('auth-overlay');
      var mainContent = document.getElementById('main-content');
      var loginForm = document.getElementById('login-form');
      var authError = document.getElementById('auth-error');
      var logoutBtn = document.getElementById('logout-btn');

      if (getCookie('witcher_auth') === 'true') {
        showMainContent();
      }

      function showMainContent() {
        authOverlay.classList.add('hidden');
        mainContent.style.display = 'block';
      }

      function showAuthForm() {
        authOverlay.classList.remove('hidden');
        mainContent.style.display = 'none';
        eraseCookie('witcher_auth');
        eraseCookie('witcher_username');
      }

      loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var username = document.getElementById('username').value.trim();
        var password = document.getElementById('password').value;

        if (username === VALID_USERNAME && password === VALID_PASSWORD) {
          setCookie('witcher_auth', 'true', 7);
          setCookie('witcher_username', username, 7);
          authError.textContent = '';
          showMainContent();
          loginForm.reset();
        } else {
          authError.textContent = 'Неверный логин или пароль';
        }
      });

      logoutBtn.addEventListener('click', function() {
        showAuthForm();
      });


      function isMobileDevice() {
        return ('ontouchstart' in window) || 
               (navigator.maxTouchPoints > 0) || 
               (window.innerWidth < 768);
      }

      if (isMobileDevice()) {
        document.documentElement.classList.add('mobile-device');
      }

      document.querySelectorAll('.flip-card-character').forEach(function(card) {
        card.addEventListener('click', function() {
          card.classList.toggle('flipped');
        });
      });

      document.querySelectorAll('.flip-card-book').forEach(function(card) {
        card.addEventListener('click', function() {
          card.classList.toggle('flipped');
        });
      });
