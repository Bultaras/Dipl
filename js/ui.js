document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.flip-card-character, .flip-card-book');
  
  cards.forEach(card => {
    const newCard = card.cloneNode(true);
    card.parentNode.replaceChild(newCard, card);
    
    newCard.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      cards.forEach(c => {
        if (c !== newCard) c.classList.remove('flipped');
      });
      this.classList.toggle('flipped');
    });

    newCard.addEventListener('touchstart', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      cards.forEach(c => {
        if (c !== newCard) c.classList.remove('flipped');
      });
      
      this.classList.toggle('flipped');
    }, { passive: false });
  });
  
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.flip-card-inner') && !e.target.closest('.flip-card-character') && !e.target.closest('.flip-card-book')) {
      cards.forEach(card => card.classList.remove('flipped'));
    }
  });
});
