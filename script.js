document.addEventListener('DOMContentLoaded', () => {
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

  // Close hamburger menu on click outside
  document.addEventListener('click', function(e) {
    const nav = document.querySelector('.nav');
    const toggle = document.getElementById('nav-toggle');
    const hamburger = document.querySelector('.hamburger');
    // Check if click is outside nav and hamburger
    if (!nav.contains(e.target) && !hamburger.contains(e.target) && toggle.checked) {
      toggle.checked = false;
    }
  });

  // Close hamburger menu on scroll
  let lastScrollTop = 0;
  window.addEventListener('scroll', function() {
    const toggle = document.getElementById('nav-toggle');
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    // Only close if menu is open and scrolling occurred
    if (toggle.checked && currentScroll !== lastScrollTop) {
      toggle.checked = false;
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });
});
