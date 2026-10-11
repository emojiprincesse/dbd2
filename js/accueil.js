/* =========================
   PAGE ACCUEIL
   Anniversaire d'Edem
========================= */
document.addEventListener("DOMContentLoaded", () => {
  initialiserAccueil();
});
document.addEventListener("pagechange", (event) => {
  const fichier = event.detail?.fichier || "";
  if (fichier.endsWith("index.html")) {
    initialiserAccueil();
  }
});
function initialiserAccueil() {
  const introNotification = document.getElementById("introNotification");
  const introButton = document.getElementById("introButton");
  if (!introButton || !introNotification) return;
  // Empêche de brancher plusieurs fois le même bouton.
  if (introButton.dataset.accueilReady === "true") return;
  introButton.dataset.accueilReady = "true";
  introButton.addEventListener("click", () => {
    if (introButton.disabled) return;
    introButton.disabled = true;
    introNotification.classList.remove("bounce");
    void introNotification.offsetWidth;
    introNotification.classList.add("bounce");
    /*
     * Indique au lecteur audio que la musique a été lancée
     * par une action volontaire de l'utilisateur.
     */
    try {
      sessionStorage.setItem("edemMusicActive", "1");
    } catch (error) {
      // Le stockage peut être indisponible.
    }
    /*
     * Le lecteur audio sera géré par js/musique.js.
     * On lui demande de démarrer au clic.
     */
    if (window.musiqueEdem?.demarrer) {
      window.musiqueEdem.demarrer();
    }
    window.setTimeout(() => {
      if (window.navigationEdem?.naviguerVers) {
        window.navigationEdem.naviguerVers("courrier.html");
      } else {
        window.location.href = "courrier.html";
      }
    }, 450);
  });
}
