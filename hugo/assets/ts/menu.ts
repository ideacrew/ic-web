const navBar: HTMLUListElement = document.querySelector(".navbar-nav");
const menuButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll(
  ".navbar-toggler"
);
menuButtons.forEach((button) =>
  button.addEventListener("click", () => {
    navBar.classList.toggle("show");
  })
);
