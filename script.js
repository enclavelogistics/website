console.log('script.js loaded');

const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');

if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
    console.log('Hamburger clicked');
  });

  // Close menu if clicked outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav') && !e.target.closest('.hamburger')) {
      nav.classList.remove('open');
      console.log('Clicked outside menu, closed');
    }
  });
} else {
  console.error('Hamburger or nav not found');
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
