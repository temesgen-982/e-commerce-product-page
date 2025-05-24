const openCartBtn = document.querySelector(".cart-container");
const cartModal = document.querySelector(".cart-modal");
const checkoutBtn = document.querySelector(".checkout-cart");

openCartBtn.addEventListener("click", () => {
  cartModal.classList.toggle("is-hidden");
});

checkoutBtn.addEventListener("click", () => {
  cart.classList.add("is-hidden");
  cartModal.classList.add("is-hidden");
});
