console.log('script.js loaded');

const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');
const navToggle = document.querySelector('#nav-toggle');

if (hamburger && nav && navToggle) {
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
    navToggle.checked = nav.classList.contains('open');
    console.log('Hamburger clicked, nav open:', nav.classList.contains('open'));
  });

  // Close menu when clicking outside on mobile
  document.addEventListener('click', (event) => {
    const isClickInsideNav = nav.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);
    if (!isClickInsideNav && !isClickOnHamburger && nav.classList.contains('open')) {
      nav.classList.remove('open');
      navToggle.checked = false;
      console.log('Clicked outside, nav closed');
    }
  });
} else {
  console.error('Hamburger, nav, or nav-toggle not found');
}

function scrollToContact() {
  const contactSection = document.querySelector('.contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
    console.log('Scrolled to contact section');
  } else {
    console.error('Contact section not found');
  }
}

// Handle draft banner close
const closeBanner = document.querySelector('.close-banner');
const draftBanner = document.querySelector('.draft-banner');
if (closeBanner && draftBanner) {
  closeBanner.addEventListener('click', () => {
    draftBanner.style.display = 'none';
    console.log('Draft banner closed');
  });
} else {
  console.error('Close banner or draft banner not found');
}
