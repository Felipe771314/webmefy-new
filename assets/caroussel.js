document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.caroussel').forEach((carousel) => {
    const track = carousel.querySelector('.caroussel-track');
    const items = carousel.querySelectorAll('.caroussel-item');
    const prevBtn = carousel.querySelector('.arrows button:first-child');
    const nextBtn = carousel.querySelector('.arrows button:last-child');

    let index = 0;
    const total = items.length;
    const autoplay = carousel.dataset.autoplay === 'true';
    const loop = carousel.dataset.loop === 'true';
    const transition = carousel.dataset.transition || 'slide';

    const goTo = (i) => {
      if (transition === 'fade') {
        items.forEach((item, idx) => (item.style.display = idx === i ? 'block' : 'none'));
      } else {
        track.style.transform = `translateX(-${i * 100}%)`;
      }
      index = i;
    };

    nextBtn?.addEventListener('click', () => {
      if (index < total - 1) goTo(index + 1);
      else if (loop) goTo(0);
    });

    prevBtn?.addEventListener('click', () => {
      if (index > 0) goTo(index - 1);
      else if (loop) goTo(total - 1);
    });

    // Init
    goTo(index);

    if (autoplay) {
      setInterval(() => {
        nextBtn?.click();
      }, 3000);
    }
  });
});
