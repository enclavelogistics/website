document.querySelectorAll('.nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    window.scrollTo({
      top: targetElement.offsetTop - 80,
      behavior: 'smooth'
    });
    document.getElementById('nav-toggle').checked = false;
  });
});

function scrollToContact() {
  const contactSection = document.getElementById('contact');
  window.scrollTo({
    top: contactSection.offsetTop - 80,
    behavior: 'smooth'
  });
}
