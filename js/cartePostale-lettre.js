/* Interactions recto-verso : zoom accessible et textes personnalisables */
(() => {
  const overlay = document.getElementById("zoomOverlay");
  const zoomContent = document.getElementById("zoomContent");
  const closeButton = document.getElementById("zoomClose");
  if (!overlay || !zoomContent || !closeButton) return;

  function openZoom(side) {
    const article = document.querySelector(`[data-zoom="${side}"]`)?.closest(".postcard-side");
    const svg = article?.querySelector("svg.postcard-art");
    if (!svg) return;
    zoomContent.replaceChildren(svg.cloneNode(true));
    overlay.hidden = false;
    closeButton.focus();
    document.body.style.overflow = "hidden";
  }
  function closeZoom() {
    overlay.hidden = true;
    zoomContent.replaceChildren();
    document.body.style.overflow = "";
  }
  document.querySelectorAll("[data-zoom]").forEach(button => {
    button.addEventListener("click", () => openZoom(button.dataset.zoom));
  });
  document.querySelectorAll(".postcard-art").forEach(svg => {
    svg.addEventListener("click", () => openZoom(svg.closest(".postcard-side").querySelector("[data-zoom]").dataset.zoom));
  });
  closeButton.addEventListener("click", closeZoom);
  overlay.addEventListener("click", event => { if (event.target === overlay) closeZoom(); });
  document.addEventListener("keydown", event => { if (event.key === "Escape" && !overlay.hidden) closeZoom(); });

  const frontInput = document.getElementById("frontMessage");
  const backInput = document.getElementById("backMessage");
  const frontText = document.querySelector(".postcard-side:first-child svg text:nth-of-type(1)");
  const backSvg = document.querySelector(".postcard-side:nth-child(2) svg");
  if (frontInput && frontText) {
    frontInput.addEventListener("input", () => { frontText.textContent = frontInput.value || "Pour toi, avec amour"; });
  }
  if (backInput && backSvg) {
    backInput.addEventListener("input", () => {
      const old = backSvg.querySelector("[data-user-message]");
      if (old) old.remove();
      if (!backInput.value.trim()) return;
      const ns = "http://www.w3.org/2000/svg";
      const lines = backInput.value.split("\n").slice(0, 6);
      const group = document.createElementNS(ns, "g");
      group.setAttribute("data-user-message", "");
      group.setAttribute("fill", "#b58ba0");
      group.setAttribute("font-family", "'Courier New', monospace");
      group.setAttribute("font-size", "10");
      lines.forEach((line, i) => {
        const t = document.createElementNS(ns, "text");
        t.setAttribute("x", "333"); t.setAttribute("y", String(150 + i * 19));
        t.textContent = line.slice(0, 32);
        group.appendChild(t);
      });
      backSvg.appendChild(group);
    });
  }
})();