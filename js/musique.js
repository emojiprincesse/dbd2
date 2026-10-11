
document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("music");
  
if ("mediaSession" in navigator && "MediaMetadata" in window) {
  navigator.mediaSession.metadata = new MediaMetadata({
    title: "anniv2monAmoureux",
    artist: "Un cadeau pour Edem",
    album: "22 octobre",
    artwork: [
      {
        src: "favicon-edem.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  });
}
  if (!music) return;

  const activeKey = "edemMusicActive";
  const timeKey = "edemMusicTime";

  function saveMusicPosition() {
    try {
      localStorage.setItem(timeKey, String(music.currentTime));
    } catch (error) {
      // Le stockage peut être indisponible.
    }
  }

  music.addEventListener("timeupdate", saveMusicPosition);
  window.addEventListener("pagehide", saveMusicPosition);

  function resumeMusic() {
    let savedTime = 0;

    try {
      savedTime = Number(localStorage.getItem(timeKey)) || 0;
    } catch (error) {
      // La musique peut tout de même être lancée.
    }

    function startMusic() {
      if (savedTime > 0 && savedTime < music.duration) {
        music.currentTime = savedTime;
      }

      music.play().catch(() => {
        // Safari peut bloquer la reprise automatique.
      });
    }

    if (music.readyState >= 1) {
      startMusic();
    } else {
      music.addEventListener("loadedmetadata", startMusic, {
        once: true
      });
    }
  }
  
try {
  const currentPage = window.location.pathname;

  if (
    sessionStorage.getItem(activeKey) === "1" &&
    !currentPage.endsWith("/index.html") &&
    currentPage !== "/"
  ) {
    resumeMusic();
  }
} catch (error) {
  // La reprise automatique peut être bloquée par Safari.
}
});
