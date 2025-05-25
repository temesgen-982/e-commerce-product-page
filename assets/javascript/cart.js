const minusCartBtn = document.querySelector(".minus-cart");
const addCartBtn = document.querySelector(".add-cart");
const cartAmount = document.querySelector(".cart-amount");
const cart = document.querySelector(".cart__amount");
const addToCartBtn = document.querySelector(".add-to-cart");

minusCartBtn.addEventListener("click", () => {
  if (cartAmount.textContent != 0) {
    cartAmount.textContent--;
  }
});

addCartBtn.addEventListener("click", () => {
  cartAmount.textContent++;
});

addToCartBtn.addEventListener("click", () => {
  if (cartAmount.textContent != 0) {
    cart.classList.remove("is-hidden");
  }
  cart.textContent = cartAmount.textContent;
});
