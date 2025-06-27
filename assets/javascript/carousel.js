const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".carousel__button--right");
const prevButton = document.querySelector(".carousel__button--left");

let slideWidth = slides[0].getBoundingClientRect().width;

// arrange the slides next to one another

// slides[0].style.left = 0;
// slides[1].style.left = `${slideWidth}px`;
// // slides[2].style.left = `${slideWidth*2}px`; // if you had a third image

const setSlidePosition = (slide, index) => {
  slide.style.left = `${slideWidth * index}px`;
};

function updateSlidePositions() {
  slideWidth = slides[0].getBoundingClientRect().width;
  slides.forEach(setSlidePosition);
  // Ensure the track is correctly positioned to the current slide
  const currentSlide = track.querySelector('.current-slide');
  if (currentSlide) {
    track.style.transform = `translateX(-${currentSlide.style.left})`;
  }
}

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

// Add indicator click logic for large devices
const indicators = Array.from(document.querySelectorAll('.carousel__indicator'));

function isLargeDevice() {
  return window.matchMedia('(min-width: 900px)').matches;
}

function setActiveIndicator(index) {
  indicators.forEach((indicator, i) => {
    if (i === index) {
      indicator.classList.add('active');
      indicator.setAttribute('aria-selected', 'true');
    } else {
      indicator.classList.remove('active');
      indicator.setAttribute('aria-selected', 'false');
    }
  });
}

indicators.forEach((indicator, index) => {
  indicator.addEventListener('click', () => {
    if (!isLargeDevice()) return;
    const currentSlide = track.querySelector('.current-slide');
    const targetSlide = slides[index];
    moveToSlide(track, currentSlide, targetSlide);
    setActiveIndicator(index);
  });
});

// Set initial active indicator on large devices
if (isLargeDevice()) {
  setActiveIndicator(slides.findIndex(slide => slide.classList.contains('current-slide')));
}

// Update active indicator on resize
window.addEventListener('resize', () => {
  updateSlidePositions();
  if (isLargeDevice()) {
    setActiveIndicator(slides.findIndex(slide => slide.classList.contains('current-slide')));
  } else {
    indicators.forEach(ind => ind.classList.remove('active'));
  }
});

// --- Hide carousel buttons on large devices ---
function updateButtonVisibilityForLarge() {
  if (isLargeDevice()) {
    prevButton.classList.add('is-hidden');
    nextButton.classList.add('is-hidden');
  } else {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.remove('is-hidden');
  }
}

// Run on load
updateButtonVisibilityForLarge();
// Run on resize
window.addEventListener('resize', updateButtonVisibilityForLarge);

// Touch/Swipe support
let startX = 0;
let isSwiping = false;

const trackContainer = document.querySelector('.carousel__track-container');

trackContainer.addEventListener('touchstart', (e) => {
  if (e.touches.length === 1) {
    startX = e.touches[0].clientX;
    isSwiping = true;
  }
});

trackContainer.addEventListener('touchmove', (e) => {
  // Prevent scrolling while swiping
  if (isSwiping) e.preventDefault();
}, { passive: false });

trackContainer.addEventListener('touchend', (e) => {
  if (!isSwiping) return;
  const endX = e.changedTouches[0].clientX;
  const diffX = endX - startX;
  if (Math.abs(diffX) > 40) { // threshold
    const currentSlide = track.querySelector('.current-slide');
    if (diffX < 0 && currentSlide.nextElementSibling) {
      moveToSlide(track, currentSlide, currentSlide.nextElementSibling);
      setActiveIndicator(slides.findIndex(slide => slide.classList.contains('current-slide')));
    } else if (diffX > 0 && currentSlide.previousElementSibling) {
      moveToSlide(track, currentSlide, currentSlide.previousElementSibling);
      setActiveIndicator(slides.findIndex(slide => slide.classList.contains('current-slide')));
    }
  }
  isSwiping = false;
});

// Keyboard accessibility
trackContainer.setAttribute('tabindex', '0');
trackContainer.addEventListener('keydown', (e) => {
  const currentSlide = track.querySelector('.current-slide');
  if (e.key === 'ArrowRight' && currentSlide.nextElementSibling) {
    moveToSlide(track, currentSlide, currentSlide.nextElementSibling);
    setActiveIndicator(slides.findIndex(slide => slide.classList.contains('current-slide')));
    e.preventDefault();
  } else if (e.key === 'ArrowLeft' && currentSlide.previousElementSibling) {
    moveToSlide(track, currentSlide, currentSlide.previousElementSibling);
    setActiveIndicator(slides.findIndex(slide => slide.classList.contains('current-slide')));
    e.preventDefault();
  }
});

// Indicators: ARIA and keyboard
indicators.forEach((indicator, index) => {
  indicator.setAttribute('aria-selected', index === slides.findIndex(slide => slide.classList.contains('current-slide')) ? 'true' : 'false');
  indicator.setAttribute('tabindex', '0');
  indicator.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      if (!isLargeDevice()) return;
      const currentSlide = track.querySelector('.current-slide');
      const targetSlide = slides[index];
      moveToSlide(track, currentSlide, targetSlide);
      setActiveIndicator(index);
      e.preventDefault();
    }
  });
});
