/* =========================
   NAVIGATION ENTRE LES PAGES
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menuButton");
  const menuPanel = document.getElementById("menuPanel");
  if (!menuButton || !menuPanel) {
    console.error("Menu introuvable : vérifie menuButton et menuPanel dans le HTML.");
    return;
  }
  function toggleMenu() {
    const isOpen = menuPanel.classList.toggle("show");
    menuButton.classList.toggle("active", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
  }
  function closeMenu() {
    menuPanel.classList.remove("show");
    menuButton.classList.remove("active");
    menuButton.setAttribute("aria-expanded", "false");
  }
  menuButton.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleMenu();
  });
  menuPanel.addEventListener("click", (event) => {
    const button = event.target.closest("[data-page]");
    if (!button) return;
    const pages = {
      accueil: "index.html",
      courrier: "courrier.html",
      archives: "archives.html"
    };
    const page = pages[button.dataset.page];
    if (page) {
      closeMenu();
      window.location.href = page;
    }
  });
  document.addEventListener("click", (event) => {
    if (
      !menuPanel.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {
      closeMenu();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
});
