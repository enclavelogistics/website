console.log('script.js loaded'); // Debug to confirm loading
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');
if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
    console.log('Hamburger clicked, nav open:', nav.classList.contains('open'));
  });
} else {
  console.error('Hamburger or nav not found');
}
