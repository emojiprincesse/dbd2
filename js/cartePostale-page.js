/* Animations et navigation de la page enveloppe */
(() => {
  const envelope = document.querySelector(".envelope-stage");
  if (envelope) {
    envelope.addEventListener("pointerenter", () => envelope.style.animationPlayState = "paused");
    envelope.addEventListener("pointerleave", () => envelope.style.animationPlayState = "running");
  }
})();