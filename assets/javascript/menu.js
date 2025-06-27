const openBtn = document.querySelector(".header__menu-open-icon");
const closeBtn = document.querySelector(".header-menu__close-icon");
const menuContent = document.querySelector(".header-menu__content");
const menuOverlay = document.querySelector(".header-menu__overlay");

openBtn.addEventListener("click", () => {
  menuOverlay.classList.remove("is-hidden");
  menuContent.classList.add("show");
});

closeBtn.addEventListener("click", () => {
  menuOverlay.classList.add("is-hidden");
  menuContent.classList.remove("show");
});
