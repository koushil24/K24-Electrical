const btn = document.querySelector('.menu-btn');
const menu = document.querySelector('.nav ul');
btn.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
});
