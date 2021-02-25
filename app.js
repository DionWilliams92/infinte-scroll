const postsContainer = document.querySelector('#post-container');
const loading = document.querySelector('.loader');
const filter = document.querySelector('#filter');

let limit = 5;
let page = 1;

// Get Posts
async function getPosts() {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)

    const data = await res.data;
    return data;
}

// Show Posts in DOM
async function showPosts() {
    const posts = await getPosts();
    
    posts.forEach(post => {
        const postEl = document.createElement('div');
        postEl.classList.add('post');
        postEl.innerHTML = `<div class="number">${post.id}</div>
        <div class="post-info">
            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">${post.body}</p>
        </div>`;

        postsContainer.appendChild(postEl);
    });
}

// Show Loader & Fetch more Posts
function showLoading() {
    loading.classList.add('show');

    setTimeout(() => {
        loading.classList.remove('show');
        
        setTimeout(() => {
            page++;
            showPosts();
        }, 300);
    }, 1000)
}

// Filter Posts by Input
function filterPosts(e) {
    const query = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');

    posts.forEach(post => {
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();

        if(title.indexOf(query) > -1 || body.indexOf(query) > -1) {
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }
    })
}
// Show Initial Posts
showPosts();


// Show CSS Loading Animation
window.addEventListener('scroll', ()=> {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if(scrollTop + clientHeight >= scrollHeight - 5) {
        showLoading()
    }
})

// Filter Posts
filter.addEventListener('input', filterPosts);