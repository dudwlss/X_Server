const postDetail = document.getElementById('postDetail');
const actionsDiv = document.getElementById('actions');
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

let currentPost = null;

async function loadPost() {
  if (!postId) {
    alert('게시글 ID가 없습니다.');
    window.location.href = 'posts.html';
    return;
  }

  try {
    const post = await API.getPost(postId);
    currentPost = post;
    renderPost(post);
    checkOwnership(post);
  } catch (error) {
    console.error('Failed to load post:', error);
    alert('게시글 불러오기 실패');
    window.location.href = 'posts.html';
  }
}

function renderPost(post) {
  postDetail.innerHTML = `
    <div class="post-item" style="border: none;">
        <div class="post-header">
            <span class="author">@${post.userid}</span>
            <span class="date">${new Date(post.createdAt).toLocaleString()}</span>
        </div>
        <div class="post-content" style="cursor: default;">
            ${post.text}
        </div>
    </div>
  `;
}

async function checkOwnership(post) {
    // We need to know the current user's ID or username to check ownership.
    // The API doesn't explicitly return "isOwner", so we compare with stored username.
    // However, the post object has `username` (which is the author's username) or `userId`.
    // Let's check what `me` endpoint returns or what we stored.
    // We stored `username` in localStorage.
    
    // Also, we can try to fetch `me` to be sure.
    try {
        const me = await API.me();
        if (me && me.userid === post.userid) {
             actionsDiv.style.display = 'flex';
        }
    } catch (e) {
        console.error('Failed to check ownership', e);
    }
}

function editPost() {
  window.location.href = `edit.html?id=${postId}`;
}

async function deletePost() {
  if (!confirm('정말로 이 게시글을 삭제하시겠습니까?')) return;

  try {
    await API.deletePost(postId);
    alert('게시글이 삭제되었습니다.');
    window.location.href = 'posts.html';
  } catch (error) {
    alert(error.message);
  }
}

loadPost();
