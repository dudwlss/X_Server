const postList = document.getElementById('postList');
const searchInput = document.getElementById('searchInput');
const welcomeMsg = document.getElementById('welcomeMsg');

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  window.location.href = 'index.html';
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleString();
}

function createPostElement(post) {
  const li = document.createElement('li');
  li.className = 'post-item';
  li.innerHTML = `
    <div class="post-header">
        <span class="author">@${post.userid}</span>
        <span class="date">${formatDate(post.createdAt)}</span>
    </div>
    <div class="post-content" onclick="window.location.href='post-detail.html?id=${post.id}'">
        ${post.text}
    </div>
  `;
  return li;
}

async function loadPosts(username = '') {
  try {
    const posts = await API.getPosts(username);
    postList.innerHTML = '';
    if (posts && posts.length > 0) {
      posts.forEach(post => {
        postList.appendChild(createPostElement(post));
      });
    } else {
      postList.innerHTML = '<li style="text-align: center; color: #666;">게시글이 없습니다.</li>';
    }
  } catch (error) {
    console.error('Failed to load posts:', error);
    if (error.message.includes('401')) {
        logout();
    }
  }
}

function searchPosts() {
  const username = searchInput.value.trim();
  loadPosts(username);
}

// Initial load
const username = localStorage.getItem('username');
if (welcomeMsg && username) {
    welcomeMsg.textContent = `환영합니다, ${username}님! `;
}

loadPosts();
