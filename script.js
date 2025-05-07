document.addEventListener('DOMContentLoaded', () => {
  // Handle banner dismissal
  const banner = document.getElementById('draftBanner');
  const header = document.querySelector('.header.sticky');
  const bannerClose = document.querySelector('.banner-close');

  // Check if banner was previously dismissed
  if (localStorage.getItem('bannerDismissed') === 'true') {
    banner.style.display = 'none';
    header.classList.add('no-banner');
    document.body.style.paddingTop = '80px';
  }

  // Close banner on click
  bannerClose.addEventListener('click', () => {
    banner.style.display = 'none';
    header.classList.add('no-banner');
    document.body.style.paddingTop = '80px';
    localStorage.setItem('bannerDismissed', 'true');
  });

  // Smooth scrolling for nav links, logo, and CTA buttons
  document.querySelectorAll('.nav a, .logo, .services a.button, .why-choose-us a.button').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
      // Close mobile menu if open
      document.getElementById('nav-toggle').checked = false;
    });
  });

  // Smooth scrolling for "Get a Quote" button
  document.querySelector('.hero button').addEventListener('click', function() {
    const contactSection = document.getElementById('contact');
    window.scrollTo({
      top: contactSection.offsetTop - 80,
      behavior: 'smooth'
    });
    // Close mobile menu if open
    document.getElementById('nav-toggle').checked = false;
  });

  // Stop propagation on hamburger clicks to prevent click-outside interference
  document.querySelector('.hamburger').addEventListener('click', function(e) {
    e.stopPropagation();
  });

  // Close hamburger menu on click outside
  document.addEventListener('click', function(e) {
    const toggle = document.getElementById('nav-toggle');
    const navContainer = document.querySelector('.nav-container');
    if (toggle.checked && !navContainer.contains(e.target) && e.target !== toggle) {
      toggle.checked = false;
    }
  });

  // Close hamburger menu on scroll
  let lastScrollTop = 0;
  window.addEventListener('scroll', function() {
    const toggle = document.getElementById('nav-toggle');
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (toggle.checked && currentScroll !== lastScrollTop) {
      toggle.checked = false;
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });
});
