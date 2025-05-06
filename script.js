console.log('script.js loaded');
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');
const navToggle = document.querySelector('#nav-toggle');
const navLinks = document.querySelectorAll('.nav a');

if (hamburger && nav && navToggle) {
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
    navToggle.checked = nav.classList.contains('open');
    console.log('Hamburger clicked, nav open:', nav.classList.contains('open'));
  });

  // Close menu when a nav link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.checked = false;
    });
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
