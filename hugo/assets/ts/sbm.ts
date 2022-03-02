const collapseButton: HTMLButtonElement = document.querySelector(
  '#collapse-modules'
) as HTMLButtonElement;

const expandButton: HTMLButtonElement = document.querySelector(
  '#expand-modules'
) as HTMLButtonElement;

const allDetails = document.querySelectorAll('details');

const collapseModules = () => {
  for (const detailElement of allDetails) detailElement.removeAttribute('open');
};

const expandModules = () => {
  for (const detailElement of allDetails)
    detailElement.setAttribute('open', '');
};

collapseButton.addEventListener('click', collapseModules);
expandButton.addEventListener('click', expandModules);
