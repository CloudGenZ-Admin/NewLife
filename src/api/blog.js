// ============================================================
// WordPress Blog API
// Fetch blog posts from WordPress REST API
// ============================================================

const WORDPRESS_URL = import.meta.env.VITE_WC_URL;

// Fetch all blog posts
export async function fetchBlogPosts({ page = 1, perPage = 10, categories = '' } = {}) {
  try {
    let url = `${WORDPRESS_URL}/wp-json/wp/v2/posts?page=${page}&per_page=${perPage}&_embed`;
    
    if (categories) {
      url += `&categories=${categories}`;
    }

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch blog posts: ${response.status}`);
    }

    const posts = await response.json();
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1');
    return { posts, totalPages };
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
}

// Fetch single blog post by ID
export async function fetchBlogPost(postId) {
  try {
    const response = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/posts/${postId}?_embed`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch blog post: ${response.status}`);
    }

    const post = await response.json();
    return post;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    throw error;
  }
}

// Fetch blog categories
export async function fetchBlogCategories() {
  try {
    const response = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/categories?per_page=100`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`);
    }

    const categories = await response.json();
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}
