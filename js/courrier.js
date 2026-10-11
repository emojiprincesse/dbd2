/* =========================
   PAGE PETIT COURRIER
   Anniversaire d'Edem
========================= */
document.addEventListener("DOMContentLoaded", () => {
  initialiserCourrier();
});
document.addEventListener("pagechange", (event) => {
  const fichier = event.detail?.fichier || "";
  if (fichier.endsWith("courrier.html")) {
    initialiserCourrier();
  }
});
function initialiserCourrier() {
  const screen = document.getElementById("screen");
  const continueButton = document.getElementById("continueButton");
  if (!screen || !continueButton) return;
  // Évite les événements en double lors des navigations.
  if (continueButton.dataset.courrierReady === "true") return;
  continueButton.dataset.courrierReady = "true";
  const lines = [
    "pour edem, demdoum, ou plutôt l'amour de ma vie,",
    "",
    "> nous sommes le 22 octobre et c'est un jour très spécial !!",
    "",
    "> j'ai donc décidé de faire ce site web plein de défauts,",
    "",
    "> pour te souhaiter un joyeux anniversaire mon cœur :*",
    "",
    "> j'espère que ça te plaira,",
    "",
    "de fanny <3"
  ];
  const speed = 65;
  const pause = 700;
  let lineIndex = 0;
  let charIndex = 0;
  let started = false;
  function typeLine() {
    if (!screen || lineIndex >= lines.length) return;
    const currentLine = lines[lineIndex];
    if (charIndex < currentLine.length) {
      screen.textContent += currentLine.charAt(charIndex);
      charIndex++;
      window.setTimeout(typeLine, speed);
    } else {
      screen.textContent += "\n";
      lineIndex++;
      charIndex = 0;
      window.setTimeout(typeLine, pause);
    }
  }
  function startTyping() {
    if (started) return;
    started = true;
    screen.textContent = "";
    typeLine();
  }
  // Démarre l'écriture dès l'ouverture du courrier.
  startTyping();
  continueButton.addEventListener("click", () => {
    if (continueButton.disabled) return;
    continueButton.disabled = true;
    continueButton.classList.remove("bounce");
    void continueButton.offsetWidth;
    continueButton.classList.add("bounce");
    window.setTimeout(() => {
      if (window.navigationEdem?.naviguerVers) {
        window.navigationEdem.naviguerVers("archives.html");
      } else {
        window.location.href = "archives.html";
      }
    }, 450);
  });
}
