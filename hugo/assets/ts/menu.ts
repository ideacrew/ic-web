const navBar: HTMLElement | null = document.querySelector('#mobile-nav');

const menuButton: HTMLButtonElement | null = document.querySelector(
  '#menu-button'
) as HTMLButtonElement;
const closeButton: HTMLButtonElement | null = document.querySelector(
  '#close-button'
) as HTMLButtonElement;

menuButton?.addEventListener('click', () => {
  navBar?.classList.add('show');
  document.body.classList.add('mobile-nav-open');
});

closeButton?.addEventListener('click', () => {
  navBar?.classList.remove('show');
  document.body.classList.remove('mobile-nav-open');
});
