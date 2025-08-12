document.addEventListener('DOMContentLoaded', function() {
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
});

// Add this to your existing main.js
async function loadNavbar() {
  try {
    const response = await fetch('/components/navbar.html');
    const html = await response.text();
    document.getElementById('navbar-placeholder').innerHTML = html;
    
    // Set active nav link after navbar is loaded
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = {
      'index.html': 'home-link',
      'about.html': 'about-link',
      'user_guide.html': 'user-guide',
      'news.html': 'news-link',
      'gallery.html': 'gallery-link',
      'contact.html': 'contact-link'
    };
    
    if (navLinks[currentPage]) {
      document.getElementById(navLinks[currentPage])?.classList.add('active');
    }
  } catch (error) {
    console.error('Error loading navbar:', error);
  }
}

// Add these functions to your existing main.js
async function loadFooter() {
  try {
    const response = await fetch('/components/footer.html');
    const html = await response.text();
    document.getElementById('footer-placeholder').innerHTML = html;
  } catch (error) {
    console.error('Error loading footer:', error);
  }
}

async function loadHeader() {
  try {
    const response = await fetch('/components/header.html');
    const html = await response.text();
    document.getElementById('header-placeholder').innerHTML = html;
  } catch (error) {
    console.error('Error loading header:', error);
  }
}

async function loadStyles() {
  try {
    const response = await fetch('/components/styles.html');
    const html = await response.text();
    document.getElementById('styles-placeholder').innerHTML = html;
  } catch (error) {
    console.error('Error loading styles:', error);
  }
}

// Call loadNavbar and loadFooter when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  await Promise.all([
    loadStyles(),
    loadHeader(),
    loadNavbar(),
    loadFooter()
  ]);
});

$(document).ready(function() {
    // Load components
    $("#header-placeholder").load("/SHIFT_static/components/header.html");
    $("#navbar-placeholder").load("/SHIFT_static/components/navbar.html");
    $("#footer-placeholder").load("/SHIFT_static/components/footer.html");
    $("#styles-placeholder").load("/SHIFT_static/components/styles.html");

    // Handle active page in navigation
    const currentPage = window.location.pathname;
    $(`.nav-link[href="${currentPage}"]`).addClass('active');
});