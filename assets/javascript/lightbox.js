// Lightbox functionality for the product carousel
(function() {
  // Only activate on large screens
  function isLargeDevice() {
    return window.matchMedia('(min-width: 900px)').matches;
  }

  const mainCarousel = document.querySelector('.carousel');
  const slides = Array.from(document.querySelectorAll('.carousel__slide'));
  const images = slides.map(slide => slide.querySelector('img').src);
  const thumbnails = Array.from(document.querySelectorAll('.carousel__indicator img'));

  // Use the static lightbox overlay from the HTML
  const lightboxOverlay = document.querySelector('.lightbox__overlay');
  const lightboxImage = lightboxOverlay.querySelector('.lightbox__image');
  const closeBtn = lightboxOverlay.querySelector('.lightbox__close');
  const leftArrow = lightboxOverlay.querySelector('.lightbox__arrow--left');
  const rightArrow = lightboxOverlay.querySelector('.lightbox__arrow--right');
  const thumbnailsContainer = lightboxOverlay.querySelector('.lightbox__thumbnails');

  // Populate thumbnails only if not already present
  if (thumbnailsContainer.children.length === 0) {
    thumbnails.forEach((thumb, idx) => {
      const btn = document.createElement('button');
      btn.className = 'lightbox__thumb-btn';
      btn.setAttribute('aria-label', `Go to image ${idx + 1}`);
      btn.innerHTML = `<img src="${thumb.src}" alt="${thumb.alt}" />`;
      btn.addEventListener('click', () => showImage(idx));
      thumbnailsContainer.appendChild(btn);
    });
  }
  const thumbBtns = Array.from(thumbnailsContainer.children);

  let currentIndex = 0;

  function showImage(idx) {
    currentIndex = idx;
    lightboxImage.src = images[idx];
    thumbBtns.forEach((btn, i) => {
      btn.classList.toggle('lightbox__thumb-btn--active', i === idx);
    });
    // Focus the image for accessibility
    lightboxImage.focus();
  }

  function openLightbox(idx) {
    if (!isLargeDevice()) return;
    lightboxOverlay.style.display = 'flex';
    showImage(idx);
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeLightbox() {
    lightboxOverlay.style.display = 'none';
    document.body.style.overflow = '';
  }

  // Event listeners
  slides.forEach((slide, idx) => {
    slide.addEventListener('click', () => {
      if (isLargeDevice()) openLightbox(idx);
    });
    slide.setAttribute('tabindex', '0');
    slide.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && isLargeDevice()) {
        openLightbox(idx);
      }
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  leftArrow.addEventListener('click', () => {
    if (currentIndex > 0) showImage(currentIndex - 1);
  });
  rightArrow.addEventListener('click', () => {
    if (currentIndex < images.length - 1) showImage(currentIndex + 1);
  });

  // Keyboard navigation inside lightbox
  lightboxOverlay.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft' && currentIndex > 0) showImage(currentIndex - 1);
    if (e.key === 'ArrowRight' && currentIndex < images.length - 1) showImage(currentIndex + 1);
  });

  // Trap focus inside lightbox
  lightboxOverlay.addEventListener('focusin', (e) => {
    if (!lightboxOverlay.contains(e.target)) {
      closeBtn.focus();
    }
  });

  // Hide lightbox on resize if not large device
  window.addEventListener('resize', () => {
    if (!isLargeDevice()) closeLightbox();
  });
})(); 