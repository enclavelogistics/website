console.log('script.js loaded');

const hamburger = document.querySelector('.hamburger');
const navToggle = document.querySelector('#nav-toggle');
const nav = document.querySelector('.nav');

// Auto-close menu when clicking outside
document.addEventListener('click', (e) => {
  if (
    navToggle &&
    navToggle.checked &&
    !e.target.closest('.nav') &&
    !e.target.closest('.hamburger')
  ) {
    navToggle.checked = false;
    console.log('Clicked outside nav, menu closed');
  }
});

// Smooth scroll to contact section
function scrollToContact() {
  const contactSection = document.querySelector('.contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
    console.log('Scrolled to contact section');
  } else {
    console.error('Contact section not found');
  }
}
