const openBtn = document.querySelector(".header__menu-open-icon");
const closeBtn = document.querySelector(".header-menu__close-icon");
const menu = document.querySelector(".header-menu");
const menuContent = document.querySelector(".header-menu__content");

openBtn.addEventListener("click", () => {
  menu.classList.remove("is-hidden");
  menuContent.classList.add("show");
});

closeBtn.addEventListener("click", () => {
  menu.classList.add("is-hidden");
  menuContent.classList.remove("show");
});
