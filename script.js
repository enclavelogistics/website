document.addEventListener('DOMContentLoaded', () => {
  const banner = document.getElementById('draftBanner');
  const body = document.body;
  const navToggle = document.getElementById('nav-toggle');

  // Show banner on load
  banner.classList.remove('hidden');
  body.classList.add('banner-visible');

  // Close banner and adjust header position
  document.querySelector('.banner-close').addEventListener('click', () => {
    banner.classList.add('hidden');
    body.classList.remove('banner-visible');
    // Ensure smooth header transition when banner is closed
    document.querySelector('.header.sticky').style.transition = 'top 0.3s ease';
  });

  // Smooth scrolling for links and buttons
  document.querySelectorAll('.nav a, .logo, .services a.button, .why-choose-us a.button, .hero a.button').forEach(el => {
    // Updated selector to include .hero a.button for "Get a Quote"
    el.addEventListener('click', e => {
      e.preventDefault();
      const targetId = el.getAttribute('href')?.slice(1) || 'contact';
      const target = document.getElementById(targetId);
      window.scrollTo({
        top: target.offsetTop - 60, /* Adjusted for slimmer header */
        behavior: 'smooth'
      });
      navToggle.checked = false;
    });
  });

  // Hamburger menu
  document.querySelector('.hamburger').addEventListener('click', e => e.stopPropagation());

  // Close menu on outside click or scroll
  let lastScrollTop = 0;
  document.addEventListener('click', e => {
    if (navToggle.checked && !document.querySelector('.nav-container').contains(e.target) && e.target !== navToggle) {
      navToggle.checked = false;
    }
  });

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (navToggle.checked && currentScroll !== lastScrollTop) {
      navToggle.checked = false;
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });
});
