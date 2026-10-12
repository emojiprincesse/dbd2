(() => {
 const envelope = document.querySelector(".envelope-stage");
 if (envelope && window.matchMedia("(hover:hover)").matches) {
   envelope.addEventListener("pointerenter", () => envelope.style.animationPlayState = "paused");
   envelope.addEventListener("pointerleave", () => envelope.style.animationPlayState = "running");
 }
})();