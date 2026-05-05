document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.flip-card-character, .flip-card-book').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  });

  document.querySelectorAll('.map-point').forEach(point => {
    point.addEventListener('click', (e) => {
      e.stopPropagation();
      const location = point.getAttribute('data-location');
      alert('Локация: ' + location);
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.flip-card-inner')) {
      document.querySelectorAll('.flip-card-inner').forEach(inner => {
        inner.parentElement.classList.remove('flipped');
      });
    }
  });
});
