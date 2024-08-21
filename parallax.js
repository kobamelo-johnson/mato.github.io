window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    document.querySelector('.hero').style.backgroundPositionY = `${scrollPosition * 0.5}px`;
  });