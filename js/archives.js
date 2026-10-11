/* =========================
   PAGE ARCHIVES
   Anniversaire d'Edem
========================= */
document.addEventListener("DOMContentLoaded", () => {
  initialiserArchives();
});
document.addEventListener("pagechange", (event) => {
  const fichier = event.detail?.fichier || "";
  if (fichier.endsWith("archives.html")) {
    initialiserArchives();
  }
});
function initialiserArchives() {
  const archiveFiles = document.querySelectorAll("[data-archive]");
  archiveFiles.forEach((file) => {
    // Évite d'ajouter plusieurs événements au même dossier.
    if (file.dataset.archiveReady === "true") return;
    file.dataset.archiveReady = "true";
    file.addEventListener("click", () => {
      const archiveName = file.dataset.archive;
      ouvrirArchive(archiveName);
    });
  });
}
function ouvrirArchive(archiveName) {
  const archivePages = {
    playlist2Love: "playlist2Love.html",
    cartePostale: "cartePostale.html",
    backTo2019: "backTo2019.html"
  };
  const targetPage = archivePages[archiveName];
  if (!targetPage) return;
  /*
   * Ces trois pages restent indépendantes pour le moment.
   * On ne modifie pas leur contenu ni leur musique.
   */
  window.location.href = targetPage;
}
