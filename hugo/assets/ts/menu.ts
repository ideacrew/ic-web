const navBar: HTMLElement | null = document.getElementById('mobile-nav');

const menuButton: HTMLButtonElement | null = document.getElementById(
  'menu-button'
) as HTMLButtonElement;
const closeButton: HTMLButtonElement | null = document.getElementById(
  'close-button'
) as HTMLButtonElement;

menuButton?.addEventListener('click', () => {
  navBar?.classList.add('show');
  document.body.classList.add('mobile-nav-open');
});

closeButton?.addEventListener('click', () => {
  navBar?.classList.remove('show');
  document.body.classList.remove('mobile-nav-open');
});
