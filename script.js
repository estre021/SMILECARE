const menu = document.querySelector('.nav-links');
const toggle = document.querySelector('.menu-toggle');
const links = document.querySelectorAll('.nav-links a');

toggle.onclick = () => {
  menu.classList.toggle('active');
};

links.forEach(link => {
  link.onclick = () => {
    menu.classList.remove('active');
  };
});

// SCROLL REVEAL
const reveals = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if(top < window.innerHeight - 100){
      el.classList.add('active');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();
function slider(container){
  const slides = container.querySelectorAll('.slide');
  let index = 0;

  container.querySelector('.next').onclick = () => {
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
  };

  container.querySelector('.prev').onclick = () => {
    slides[index].classList.remove('active');
    index = (index - 1 + slides.length) % slides.length;
    slides[index].classList.add('active');
  };
}

slider(document.querySelector('.services-slider'));
slider(document.querySelector('.reviews-slider'));
