document.addEventListener('DOMContentLoaded', () => {
  const banner = document.getElementById('draftBanner');
  const navToggle = document.getElementById('nav-toggle');

  // Show banner on load if it exists (only on index.html)
  if (banner) {
    banner.classList.remove('hidden');
    document.body.classList.add('banner-visible');

    // Close banner
    document.querySelector('.banner-close').addEventListener('click', () => {
      banner.classList.add('hidden');
      document.body.classList.remove('banner-visible');
    });
  }

  // Handle fragment scrolling on page load (e.g., from thank-you.html)
  const hash = window.location.hash.slice(1); // Get fragment (e.g., "home")
  if (hash) {
    const target = document.getElementById(hash);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  }

  // Smooth scrolling for links and buttons
  document.querySelectorAll('.nav a, .logo, .services a.button, .why-choose-us a.button, .hero a.button').forEach(el => {
    el.addEventListener('click', e => {
      const href = el.getAttribute('href');
      if (!href) return; // Exit if no href

      e.preventDefault();

      // Check if the link points to a different page
      if (href.includes('index.html')) {
        // Redirect to index.html with the correct fragment
        window.location.href = href; // e.g., index.html#home
      } else {
        // Same-page scrolling
        const targetId = href.slice(1) || 'contact';
        const target = document.getElementById(targetId);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
          });
        }
        if (navToggle) navToggle.checked = false;
      }
    });
  });

  // Hamburger menu
  if (document.querySelector('.hamburger')) {
    document.querySelector('.hamburger').addEventListener('click', e => e.stopPropagation());
  }

  // Close menu on outside click or scroll
  let lastScrollTop = 0;
  document.addEventListener('click', e => {
    if (navToggle && navToggle.checked && !document.querySelector('.nav-container').contains(e.target) && e.target !== navToggle) {
      navToggle.checked = false;
    }
  });

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (navToggle && navToggle.checked && currentScroll !== lastScrollTop) {
      navToggle.checked = false;
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });
});
