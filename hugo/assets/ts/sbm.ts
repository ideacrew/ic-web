const collapseButton: HTMLButtonElement = document.getElementById(
  'collapse-modules'
) as HTMLButtonElement;

const expandButton: HTMLButtonElement = document.getElementById(
  'expand-modules'
) as HTMLButtonElement;

const allDetails = document.querySelectorAll('details');

const collapseModules = () => {
  allDetails.forEach((detailElement) => detailElement.removeAttribute('open'));
};

const expandModules = () => {
  allDetails.forEach((detailElement) => detailElement.setAttribute('open', ''));
};

collapseButton.addEventListener('click', collapseModules);
expandButton.addEventListener('click', expandModules);
