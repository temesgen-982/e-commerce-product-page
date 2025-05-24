const openBtn = document.querySelector(".menu-icon");
const closeBtn = document.querySelector(".close-icon");
const menu = document.querySelector(".menu");
const menuOverlay = document.querySelector(".menu-overlay");

openBtn.addEventListener("click", () => {
  menu.classList.add("show");
  menuOverlay.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  menu.classList.remove("show");
  menuOverlay.classList.add("is-hidden");
});
