// ================================
// Blog Data & Management
// ================================

// Sample blog data - you can easily modify this array to add/remove blog posts
const blogPosts = [
    {
        id: 1,
        title: "The Silent Revenue Leak—Why Fraud is Eating Digital Platforms Alive",
        description: "Every digital platform today, whether e-marketplace, fintech app, gaming platform, social network, or ride-sharing service shares the same hidden enemy.",
        image: "./Assets/Blog/blog_1.png",
        date: "Nov 17, 2025",
        readTime: "3 minute read",
        slug: "silent-revenue-leak-fraud-digital-platforms",
        link: "https://medium.com/@gokulnair-2001/01b0b2493e50"
    },
    {
        id: 2,
        title: "Fake Users, Real Damage — A Story of How Platforms Lose Millions Without Realizing It",
        description: "To understand how silent fraud destroys a platform, let's dive with a true-to-life story. A story that repeats itself across almost every modern digital company.",
        image: "./Assets/Blog/blog_2.png",
        date: "Nov 18, 2025",
        readTime: "3 minute read",
        slug: "fake-users-real-damage-platform-losses",
        link: "https://medium.com/@gokulnair-2001/be7846d0f055"
    },
    {
        id: 3,
        title: "The Rise of Bots, Device Farms & Micro-Fraud Rings — What’s Fueling the Surge?",
        description: "Fraud on digital platforms has entered a new era.What used to be simple, low-effort attempts like basic bots, repeated signups, or obvious spam is now an industrialized, global ecosystem powered by automation, cheap devices, and coordinated fraud operations.",
        image: "./Assets/Blog/blog_3.png",
        date: "Nov 19, 2025",
        readTime: "4 minute read",
        slug: "rise-of-bots-device-farms-micro-fraud-rings",
        link: "https://medium.com/@gokulnair-2001/the-rise-of-bots-device-farms-micro-fraud-rings-whats-fueling-the-surge-996d4a57355d"
    },
    {
        id: 4,
        title: "Why Fraud Today Is Harder to Detect Than Ever ?",
        description: "Modern digital fraud isn’t just increasing, it’s becoming systematically harder to detect. Not because platforms lack intelligence or effort, but because fraud has evolved far beyond the capabilities of traditional tools and fragmented trust systems.",
        image: "./Assets/Blog/blog_4.png",
        date: "Nov 20, 2025",
        readTime: "3 minute read",
        slug: "why-fraud-today-is-harder-to-detect-than-ever",
        link: "https://medium.com/@gokulnair-2001/why-fraud-today-is-harder-to-detect-than-ever-4a46bc8d6b60"
    },
     {
        id: 5,
        title: "The Hidden Cost of Trust Problems — User Loss, Bad Recommendations & Stunted Growth",
        description: "Fraud and low trust don’t just cause direct financial losses. They silently distort the very systems that power growth from data models to user experience.",
        image: "./Assets/Blog/blog_5.png",
        date: "Nov 21, 2025",
        readTime: "3 minute read",
        slug: "the-hidden-cost-of-trust-problems-user-loss-bad-recommendations-stunted-growth",
        link: "https://medium.com/@gokulnair-2001/the-hidden-cost-of-trust-problems-user-loss-bad-recommendations-stunted-growth-7aec88b54b1b"
    }
];

// ================================
// Blog Card Component Generator
// ================================

/**
 * Creates a reusable blog card component
 * @param {Object} post - Blog post data
 * @param {string} post.title - Blog post title
 * @param {string} post.description - Blog post description
 * @param {string} post.image - Blog post image URL
 * @param {string} post.date - Publication date
 * @param {string} post.readTime - Estimated read time
 * @param {string} post.slug - URL slug for the post
 * @param {string} post.link - External URL to redirect to on click
 * @returns {HTMLElement} - Blog card element
 */
function createBlogCard(post) {
    const card = document.createElement('article');
    card.className = 'blog-card';
    card.setAttribute('data-post-id', post.id);
    
    card.innerHTML = `
        <div class="blog-card-image">
            <img src="${post.image}" alt="${post.title}" loading="lazy">
        </div>
        <div class="blog-card-content">
            <h3 class="blog-card-title">
                <a href="#" data-slug="${post.slug}">${post.title}</a>
            </h3>
            <p class="blog-card-description">${post.description}</p>
            <div class="blog-card-meta">
                <span class="blog-card-date">${post.date}</span>
                <span class="blog-card-read-time">${post.readTime}</span>
            </div>
        </div>
    `;
    
    // Add click handler for navigation
    card.addEventListener('click', (e) => {
        e.preventDefault();
        handleBlogClick(post);
    });
    
    return card;
}

// ================================
// Blog Rendering Functions
// ================================

/**
 * Renders all blog posts to the grid
 * @param {Array} posts - Array of blog post objects
 * @param {string} containerId - ID of the container element
 */
function renderBlogPosts(posts = blogPosts, containerId = 'blogGrid') {
    const container = document.getElementById(containerId);
    
    if (!container) {
        console.error(`Container with ID "${containerId}" not found`);
        return;
    }
    
    // Clear existing content
    container.innerHTML = '';
    
    // Create and append blog cards
    posts.forEach(post => {
        const card = createBlogCard(post);
        container.appendChild(card);
    });
    
    // Add fade-in animation
    const cards = container.querySelectorAll('.blog-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

/**
 * Adds a new blog post to the collection
 * @param {Object} newPost - New blog post data
 */
function addBlogPost(newPost) {
    // Add ID if not provided
    if (!newPost.id) {
        newPost.id = blogPosts.length > 0 ? Math.max(...blogPosts.map(p => p.id)) + 1 : 1;
    }
    
    blogPosts.unshift(newPost); // Add to beginning of array
    renderBlogPosts(); // Re-render the blog grid
}

/**
 * Updates an existing blog post
 * @param {number} postId - ID of the post to update
 * @param {Object} updatedData - Updated post data
 */
function updateBlogPost(postId, updatedData) {
    const postIndex = blogPosts.findIndex(post => post.id === postId);
    
    if (postIndex !== -1) {
        blogPosts[postIndex] = { ...blogPosts[postIndex], ...updatedData };
        renderBlogPosts();
    }
}

/**
 * Removes a blog post from the collection
 * @param {number} postId - ID of the post to remove
 */
function removeBlogPost(postId) {
    const postIndex = blogPosts.findIndex(post => post.id === postId);
    
    if (postIndex !== -1) {
        blogPosts.splice(postIndex, 1);
        renderBlogPosts();
    }
}

// ================================
// Blog Navigation & Interaction
// ================================

/**
 * Handles blog post click events
 * @param {Object} post - Clicked blog post data
 */
function handleBlogClick(post) {
    console.log('Blog post clicked:', post.title);
    
    // Redirect to the link specified in the post data
    if (post.link) {
        // Open in new tab/window
        window.open(post.link, '_blank');
    } else {
        // Fallback: construct URL from slug if no direct link
        console.warn('No link specified for post:', post.title);
        // You could implement a fallback like:
        // window.location.href = `/blog/${post.slug}`;
    }
}

/**
 * Filters blog posts by search term
 * @param {string} searchTerm - Search query
 */
function searchBlogPosts(searchTerm) {
    if (!searchTerm.trim()) {
        renderBlogPosts(); // Show all posts if search is empty
        return;
    }
    
    const filteredPosts = blogPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    renderBlogPosts(filteredPosts);
}

/**
 * Sorts blog posts by date or title
 * @param {string} sortBy - Sort criteria ('date' or 'title')
 * @param {string} order - Sort order ('asc' or 'desc')
 */
function sortBlogPosts(sortBy = 'date', order = 'desc') {
    const sortedPosts = [...blogPosts].sort((a, b) => {
        if (sortBy === 'date') {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return order === 'desc' ? dateB - dateA : dateA - dateB;
        } else if (sortBy === 'title') {
            return order === 'desc' 
                ? b.title.localeCompare(a.title)
                : a.title.localeCompare(b.title);
        }
        return 0;
    });
    
    renderBlogPosts(sortedPosts);
}

// ================================
// Blog Page Initialization
// ================================

/**
 * Initializes the blog page when DOM is loaded
 */
function initializeBlogPage() {
    // Render initial blog posts
    renderBlogPosts();
    
    // Add any additional initialization here
    console.log('✨ Blog page initialized with', blogPosts.length, 'posts');
    
    // Example of adding a search functionality (if you add a search input)
    const searchInput = document.getElementById('blogSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchBlogPosts(e.target.value);
        });
    }
}

// ================================
// Utilities for External Use
// ================================

/**
 * Get all blog posts
 * @returns {Array} Array of all blog posts
 */
function getAllBlogPosts() {
    return [...blogPosts];
}

/**
 * Get a specific blog post by ID
 * @param {number} postId - Post ID
 * @returns {Object|null} Blog post or null if not found
 */
function getBlogPostById(postId) {
    return blogPosts.find(post => post.id === postId) || null;
}

/**
 * Get a specific blog post by slug
 * @param {string} slug - Post slug
 * @returns {Object|null} Blog post or null if not found
 */
function getBlogPostBySlug(slug) {
    return blogPosts.find(post => post.slug === slug) || null;
}

// ================================
// Initialize when page loads
// ================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeBlogPage);
} else {
    initializeBlogPage();
}

// Export functions for external use (if needed)
window.BlogManager = {
    addBlogPost,
    updateBlogPost,
    removeBlogPost,
    searchBlogPosts,
    sortBlogPosts,
    getAllBlogPosts,
    getBlogPostById,
    getBlogPostBySlug,
    renderBlogPosts
};