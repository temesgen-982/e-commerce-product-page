const openCartBtn = document.querySelector(".header__cart");
const cartModal = document.querySelector(".cart");
const checkoutBtn = document.querySelector(".cart__checkout");

openCartBtn.addEventListener("click", () => {
  cartModal.classList.toggle("is-hidden");
});

checkoutBtn.addEventListener("click", () => {
  cart.classList.add("is-hidden");
  cartModal.classList.add("is-hidden");
});
