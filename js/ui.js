document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.flip-card-character, .flip-card-book');
  
  function handleFlip(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const card = e.currentTarget;
    const isFlipped = card.classList.contains('flipped');
    
    if (isFlipped) {
      card.classList.remove('flipped');
    } else {
      document.querySelectorAll('.flip-card-character, .flip-card-book').forEach(c => c.classList.remove('flipped'));
      card.classList.add('flipped');
    }
  }

  cards.forEach(card => {
    card.addEventListener('click', handleFlip);
    card.addEventListener('touchend', (e) => {
      if (e.changedTouches.length === 1) {
        handleFlip(e);
      }
    }, { passive: false });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.flip-card-inner')) {
      cards.forEach(c => c.classList.remove('flipped'));
    }
  });
});
