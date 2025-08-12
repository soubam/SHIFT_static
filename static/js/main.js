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

document.addEventListener('DOMContentLoaded', function() {
    // Load components using jQuery for better compatibility
    $("#header-placeholder").load(`${basePath}/components/header.html`);
    $("#navbar-placeholder").load(`${basePath}/components/navbar.html`);
    $("#footer-placeholder").load(`${basePath}/components/footer.html`);
    $("#styles-placeholder").load(`${basePath}/components/styles.html`);
});

// Handle navigation active state
$(document).ready(function() {
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop() || 'index.html';
    
    // Add active class to current page link
    $(`a[href$="${pageName}"]`).addClass('active');
});

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