document.addEventListener('DOMContentLoaded', () => {
  const banner = document.getElementById('draftBanner');
  const navToggle = document.getElementById('nav-toggle');

  // Show banner on load
  banner.classList.remove('hidden');
  document.body.classList.add('banner-visible');

  // Close banner
  document.querySelector('.banner-close').addEventListener('click', () => {
    banner.classList.add('hidden');
    document.body.classList.remove('banner-visible');
  });

  // Smooth scrolling for links and buttons
  document.querySelectorAll('.nav a, .logo, .services a.button, .why-choose-us a.button, .hero button').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      const targetId = el.getAttribute('href')?.slice(1) || 'contact';
      const target = document.getElementById(targetId);
      window.scrollTo({
        top: target.offsetTop - 80,
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
