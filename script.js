// Smooth scrolling for CTA buttons
document.querySelectorAll('[data-scroll-to]').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = button.getAttribute('data-scroll-to');
        const targetElement = document.getElementById(targetId);
        targetElement.scrollIntoView({ behavior: 'smooth' });
    });
});

// Image gallery modal
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeModal = document.querySelector('.modal-close');
const galleryImages = document.querySelectorAll('.gallery-img');

galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        modal.style.display = 'flex';
        modalImg.src = img.src;
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Feedback carousel
const feedbackItems = document.querySelectorAll('.feedback-item');
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');
let currentIndex = 0;

function showFeedback(index) {
    feedbackItems.forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
}

function nextFeedback() {
    currentIndex = (currentIndex + 1) % feedbackItems.length;
    showFeedback(currentIndex);
}

function prevFeedback() {
    currentIndex = (currentIndex - 1 + feedbackItems.length) % feedbackItems.length;
    showFeedback(currentIndex);
}

nextButton.addEventListener('click', nextFeedback);
prevButton.addEventListener('click', prevFeedback);

// Auto-cycle feedback every 5 seconds
setInterval(nextFeedback, 5000);

// Show the first feedback item initially
showFeedback(currentIndex);