const isGitHubPages = window.location.hostname.includes('github.io');
const basePath = isGitHubPages ? '/SHIFT_static' : '';

// Update component loading functions
async function loadComponent(componentName) {
  try {
    const response = await fetch(`${basePath}/components/${componentName}.html`);
    const html = await response.text();
    document.getElementById(`${componentName}-placeholder`).innerHTML = html;
  } catch (error) {
    console.error(`Error loading ${componentName}:`, error);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await Promise.all([
    loadComponent('styles'),
    loadComponent('header'),
    loadComponent('navbar'),
    loadComponent('footer')
  ]);
  
  // Update active nav link
  const currentPath = window.location.pathname;
  const pageName = currentPath.split('/').pop() || 'index.html';
  document.getElementById(navLinks[pageName])?.classList.add('active');
});

// Navigation active state
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = {
  'index.html': 'home-link',
  'about.html': 'about-link',
  'user_guide.html': 'user-guide',
  'news.html': 'news-link',
  'gallery.html': 'gallery-link',
  'contact.html': 'contact-link'
};

// Set active class
if (navLinks[currentPage]) {
  document.getElementById(navLinks[currentPage])?.classList.add('active');
}

// Mobile menu handling
const button = document.querySelector(".navbar-toggler");
const navOverlay = document.querySelector(".nav-overlay");
const navbarCollapse = document.querySelector(".navbar-collapse");

button?.addEventListener("click", function() {
  navOverlay?.classList.toggle("active");
  navbarCollapse?.classList.toggle("show");
});

navOverlay?.addEventListener("click", function(event) {
  if (event.target === navOverlay) {
    navOverlay.classList.remove("active");
    navbarCollapse?.classList.remove("show");
  }
});

// Add click handlers to nav links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href) {
      window.location.href = href;
    }
  });
});