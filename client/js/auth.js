const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const errorDiv = document.getElementById('error');

function showError(message) {
  errorDiv.textContent = message;
  errorDiv.style.display = 'block';
}

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userid = document.getElementById('userid').value;
    const password = document.getElementById('password').value;

    try {
      const data = await API.login(userid, password);
      if (data && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username || userid); // Store username if available or use userid
        window.location.href = 'posts.html';
      } else {
          showError('로그인 실패: 토큰을 받지 못했습니다.');
      }
    } catch (error) {
      showError(error.message);
    }
  });
}

if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userid = document.getElementById('userid').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const url = document.getElementById('url').value;

    try {
      const data = await API.signup(userid, password, name, email, url);
        // Signup usually returns token too, or we redirect to login
        if (data && data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', userid);
            window.location.href = 'posts.html';
        } else {
             alert('회원가입 성공! 로그인해주세요.');
             window.location.href = 'index.html';
        }
    } catch (error) {
      showError(error.message);
    }
  });
}
