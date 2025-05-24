const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".carousel__button--right");
const prevButton = document.querySelector(".carousel__button--left");

const slideWidth = slides[0].getBoundingClientRect().width;

// arrange the slides next to one another

// slides[0].style.left = 0;
// slides[1].style.left = `${slideWidth}px`;
// // slides[2].style.left = `${slideWidth*2}px`; // if you had a third image

const setSlidePosition = (slide, index) => {
  slide.style.left = `${slideWidth * index}px`;
};

slides.forEach(setSlidePosition);

// function to move left or right
const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = `translateX(-${targetSlide.style.left})`;
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};

// function to hide/show the arrows
const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    prevButton.classList.add("is-hidden");
    nextButton.classList.remove("is-hidden");
  } else if (targetIndex === slides.length - 1) {
    prevButton.classList.remove("is-hidden");
    nextButton.classList.add("is-hidden");
  } else {
    prevButton.classList.remove("is-hidden");
    nextButton.classList.remove("is-hidden");
  }
};

// when the right button is clicked, move the slides to the right

nextButton.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling;
  const amountToMove = nextSlide.style.left;

  moveToSlide(track, currentSlide, nextSlide);

  //   const nextIndex = slides.findIndex((slide) => slide === nextSlide);

  //   hideShowArrows(slides, prevButton, nextButton, nextIndex);
});

// when the left button is clicked, move the slides to the leftt

prevButton.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide");
  const prevSlide = currentSlide.previousElementSibling;
  const amountToMove = prevSlide.style.left;

  moveToSlide(track, currentSlide, prevSlide);

  //   const prevIndex = slides.findIndex((slide) => slide === prevSlide);

  //   hideShowArrows(slides, prevButton, nextButton, prevIndex);
});
