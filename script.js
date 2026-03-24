// ==================== MENÚ HAMBURGUESA ====================
const menu = document.querySelector('.nav-links');
const toggle = document.querySelector('.menu-toggle');
const links = document.querySelectorAll('.nav-links a');

if (toggle) {
  toggle.onclick = () => {
    menu.classList.toggle('active');
  };
}

links.forEach(link => {
  link.onclick = () => {
    menu.classList.remove('active');
  };
});

// ==================== SCROLL REVEAL ====================
const reveals = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add('active');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// ==================== SLIDER ====================
function slider(container) {
  const slides = container.querySelectorAll('.slide');
  let index = 0;

  slides.forEach((slide, i) => {
    if (i === 0) slide.classList.add('active');
    else slide.classList.remove('active');
  });

  const nextBtn = container.querySelector('.next');
  const prevBtn = container.querySelector('.prev');

  if (nextBtn) {
    nextBtn.onclick = () => {
      slides[index].classList.remove('active');
      index = (index + 1) % slides.length;
      slides[index].classList.add('active');
    };
  }

  if (prevBtn) {
    prevBtn.onclick = () => {
      slides[index].classList.remove('active');
      index = (index - 1 + slides.length) % slides.length;
      slides[index].classList.add('active');
    };
  }
}

const servicesSlider = document.querySelector('.services-slider');
if (servicesSlider) slider(servicesSlider);