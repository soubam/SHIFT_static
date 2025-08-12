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
    const activeLink = document.getElementById(navLinks[currentPage]);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }

  // Ensure links work from any directory level
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('http')) {
      link.href = `./${href.split('/').pop()}`;
    }
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
});

// Add this to your existing main.js
async function loadNavbar() {
  try {
    // Determine the correct path based on current location
    const currentPath = window.location.pathname;
    const isInSubdirectory = currentPath.includes('/events/') || currentPath.includes('/components/');
    const componentPath = isInSubdirectory ? '../components/navbar.html' : './components/navbar.html';
    
    const response = await fetch(componentPath);
    const html = await response.text();
    document.getElementById('navbar-placeholder').innerHTML = html;
    
    // Fix navigation links based on current location
    fixNavigationLinks();
    
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

// Function to fix navigation links based on current location
function fixNavigationLinks() {
  const currentPath = window.location.pathname;
  const isInSubdirectory = currentPath.includes('/events/') || currentPath.includes('/components/');
  
  if (isInSubdirectory) {
    // Update all navigation links to go back to root
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('http') && !href.startsWith('#')) {
        link.href = `../${href.replace('./', '')}`;
      }
    });
  }
}

// Function to fix image paths in components
function fixImagePaths() {
  const currentPath = window.location.pathname;
  const isInSubdirectory = currentPath.includes('/events/') || currentPath.includes('/components/');
  
  if (isInSubdirectory) {
    // Update all image paths to go back to root
    document.querySelectorAll('img').forEach(img => {
      const src = img.getAttribute('src');
      if (src && src.startsWith('./static/')) {
        img.src = `../${src.replace('./', '')}`;
      }
    });
  }
}

// Add these functions to your existing main.js
async function loadFooter() {
  try {
    // Determine the correct path based on current location
    const currentPath = window.location.pathname;
    const isInSubdirectory = currentPath.includes('/events/') || currentPath.includes('/components/');
    const componentPath = isInSubdirectory ? '../components/footer.html' : './components/footer.html';
    
    const response = await fetch(componentPath);
    const html = await response.text();
    document.getElementById('footer-placeholder').innerHTML = html;
    
    // Fix image paths after loading footer
    fixImagePaths();
  } catch (error) {
    console.error('Error loading footer:', error);
  }
}

async function loadHeader() {
  try {
    // Determine the correct path based on current location
    const currentPath = window.location.pathname;
    const isInSubdirectory = currentPath.includes('/events/') || currentPath.includes('/components/');
    const componentPath = isInSubdirectory ? '../components/header.html' : './components/header.html';
    
    const response = await fetch(componentPath);
    const html = await response.text();
    document.getElementById('header-placeholder').innerHTML = html;
    
    // Fix image paths after loading header
    fixImagePaths();
  } catch (error) {
    console.error('Error loading header:', error);
  }
}

async function loadStyles() {
  try {
    // Determine the correct path based on current location
    const currentPath = window.location.pathname;
    const isInSubdirectory = currentPath.includes('/events/') || currentPath.includes('/components/');
    const componentPath = isInSubdirectory ? '../components/styles.html' : './components/styles.html';
    
    const response = await fetch(componentPath);
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