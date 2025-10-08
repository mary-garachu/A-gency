document.querySelectorAll('.three-rows-grid .wp-block-group').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;

    if (x < rect.width / 2) {
      card.classList.add('tilt-left');
      card.classList.remove('tilt-right');
    } else {
      card.classList.add('tilt-right');
      card.classList.remove('tilt-left');
    }
  });

  card.addEventListener('mouseleave', () => {
    card.classList.remove('tilt-left', 'tilt-right');
  });
});
