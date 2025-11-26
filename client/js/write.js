const postForm = document.getElementById('postForm');
const errorDiv = document.getElementById('error');
const textArea = document.getElementById('text');

// Check if we are in edit mode
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');
const isEditMode = !!postId;

if (isEditMode) {
    document.title = '글 수정 - Node.js API Client';
    document.querySelector('h1').textContent = '글 수정';
    document.querySelector('button[type="submit"]').textContent = '수정';
    
    // Load existing post data
    loadPostData(postId);
}

async function loadPostData(id) {
    try {
        const post = await API.getPost(id);
        if (post) {
            textArea.value = post.text;
        } else {
            alert('게시글을 찾을 수 없습니다.');
            window.location.href = 'posts.html';
        }
    } catch (error) {
        console.error('Failed to load post:', error);
        alert('게시글 불러오기 실패');
        window.location.href = 'posts.html';
    }
}

function showError(message) {
  errorDiv.textContent = message;
  errorDiv.style.display = 'block';
}

postForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = textArea.value;

  try {
    if (isEditMode) {
        await API.updatePost(postId, text);
    } else {
        await API.createPost(text);
    }
    window.location.href = 'posts.html';
  } catch (error) {
    showError(error.message);
  }
});
