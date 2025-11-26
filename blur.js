function updateBlur() {
  const scroll = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;

  // ratio entre 0 et 1
  const progress = scroll *3/ maxScroll;

  // flou max : 30px
  const blur = Math.min(30 * progress, 30) + "px";

  // opacité max de la teinte : 0.85
  const tint = Math.max(Math.min(0.85 * progress, 1), 0);

  document.body.style.setProperty("--blur-amount", blur);
  document.body.style.setProperty("--tint-opacity", tint);
}

window.addEventListener("scroll", updateBlur);
updateBlur();
