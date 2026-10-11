/* =========================================
   playlist2Love — Lecteur audio interactif
   ========================================= */
document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("audioPlayer");
  const trackList = document.getElementById("trackList");
  const seekBar = document.getElementById("seekBar");
  const volumeBar = document.getElementById("volumeBar");
  const ipodTitle = document.getElementById("ipodTitle");
  const ipodArtist = document.getElementById("ipodArtist");
  const ipodCurrentTime = document.getElementById("ipodCurrentTime");
  const ipodDuration = document.getElementById("ipodDuration");
  const bottomTitle = document.getElementById("bottomTitle");
  const bottomArtist = document.getElementById("bottomArtist");
  const bottomCurrentTime = document.getElementById("bottomCurrentTime");
  const bottomDuration = document.getElementById("bottomDuration");
  const bottomPlay = document.getElementById("bottomPlay");
  const ipodArtwork = document.getElementById("ipodArtwork");
  const bottomArtwork = document.getElementById("bottomArtwork");
  const wheelPlayIcon = document.getElementById("wheelPlayIcon");
  const showAllButton = document.getElementById("showAllButton");
  /*
   * Les fichiers audio doivent être placés à la racine
   * du projet, à côté de playlist2Love.html.
   *
   * Le premier morceau utilise le fichier existant.
   * Ajoute ensuite tes autres fichiers MP3 et remplace
   * les chemins ci-dessous par leurs vrais noms.
   */
  const tracks = [
    {
      title: "Something About Us",
      artist: "emojiprincesse",
      src: "daft-punk.mp3",
      duration: "",
      art: "art-1"
    },
    {
      title: "drive ME crazy!",
      artist: "emojiprincesse",
      src: "lil-yatchy.mp3",
      duration: "",
      art: "art-2"
    },
    {
      title: "Carte Postale (pt.2)",
      artist: "emojiprincesse",
      src: "tengo-john.mp3",
      duration: "",
      art: "art-3"
    },
    {
      title: "Can't Help Falling in Love",
      artist: "Elvis Presley",
      src: "",
      duration: "3:01",
      art: "art-4"
    },
    {
      title: "Best Part",
      artist: "Daniel Caesar ft. H.E.R.",
      src: "",
      duration: "3:29",
      art: "art-5"
    },
    {
      title: "Perfect",
      artist: "Ed Sheeran",
      src: "",
      duration: "4:23",
      art: "art-6"
    },
    {
      title: "Lover",
      artist: "Taylor Swift",
      src: "",
      duration: "3:41",
      art: "art-3"
    },
    {
      title: "Je te laisserai des mots",
      artist: "Patrick Watson",
      src: "",
      duration: "4:00",
      art: "art-2"
    },
    {
      title: "Those Eyes",
      artist: "New West",
      src: "",
      duration: "",
      art: "art-5"
    },
    {
      title: "Yellow",
      artist: "Coldplay",
      src: "",
      duration: "",
      art: "art-4"
    },
    {
      title: "Until I Found You",
      artist: "Stephen Sanchez",
      src: "",
      duration: "",
      art: "art-1"
    },
    {
      title: "I Wanna Be Yours",
      artist: "Arctic Monkeys",
      src: "",
      duration: "",
      art: "art-6"
    },
    {
      title: "Sweet",
      artist: "Cigarettes After Sex",
      src: "",
      duration: "",
      art: "art-2"
    },
    {
      title: "Just the Two of Us",
      artist: "Grover Washington Jr.",
      src: "",
      duration: "",
      art: "art-5"
    },
    {
      title: "Une chanson pour nous",
      artist: "À compléter",
      src: "",
      duration: "",
      art: "art-3"
    }
  ];
  let currentIndex = 0;
  let isSeeking = false;
  let showAllTracks = false;
  audio.volume = Number(volumeBar.value);
  function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) {
      return "0:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
  }
  function createArtwork(className) {
    return `
      <div class="track-art ${className}">
        <img src="images/playlist-cover.png" alt="Pochette de l’album" />
      </div>
    `;
  }
  function renderTracks() {
    const visibleTracks = showAllTracks
      ? tracks
      : tracks.slice(0, 7);
    trackList.innerHTML = visibleTracks.map((track, index) => {
      const duration = track.duration || "—";
      const isActive = index === currentIndex;
      return `
        <div class="track-row ${isActive ? "active" : ""}"
             data-index="${index}">
          <span class="track-index">
            ${isActive && !audio.paused ? "♫" : index + 1}
          </span>
          <div class="track-art ${track.art}">
            <img src="images/playlist-cover.png" alt="Pochette de l’album" />
          </div>
          <div class="track-info">
            <span class="track-title">${escapeHTML(track.title)}</span>
            <span class="track-artist">${escapeHTML(track.artist)}</span>
          </div>
          <span class="track-duration">${duration}</span>
          <button class="track-play"
                  data-track="${index}"
                  aria-label="Écouter ${escapeHTML(track.title)}">
            ${isActive && !audio.paused ? "Ⅱ" : "▶"}
          </button>
        </div>
      `;
    }).join("");
    showAllButton.innerHTML = showAllTracks
      ? 'réduire la playlist <span aria-hidden="true">↑</span>'
      : 'voir les 15 titres <span aria-hidden="true">→</span>';
  }
  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    })[character]);
  }
  function updateArtwork(track) {
    const artClass = track.art || "art-1";
    ipodArtwork.className = `album-art current-art ${artClass}`;
    bottomArtwork.className = `mini-art ${artClass}`;
    ipodArtwork.innerHTML = '<img src="images/playlist-cover.png" alt="Pochette de l’album" />';
    bottomArtwork.innerHTML = '<img src="images/playlist-cover.png" alt="Pochette de l’album" />';
  }
  function updateTrackInfo() {
    const track = tracks[currentIndex];
    ipodTitle.textContent = track.title;
    ipodArtist.textContent = track.artist;
    bottomTitle.textContent = track.title;
    bottomArtist.textContent = track.artist;
    updateArtwork(track);
    updatePlayButtons();
    renderTracks();
  }
  function updatePlayButtons() {
    const playing = !audio.paused;
    bottomPlay.textContent = playing ? "Ⅱ" : "▶";
    bottomPlay.setAttribute(
      "aria-label",
      playing ? "Mettre en pause" : "Lecture"
    );
    wheelPlayIcon.textContent = playing ? "Ⅱ" : "▶";
    document.querySelectorAll('[data-action="toggle"]').forEach(button => {
      if (button.classList.contains("main-play")) {
        button.textContent = playing ? "Ⅱ" : "▶";
      }
    });
  }
  async function playCurrentTrack() {
    const track = tracks[currentIndex];
    if (!track.src) {
      updateTrackInfo();
      alert(
        `Le fichier audio de « ${track.title} » n'est pas encore ajouté. ` +
        "Ajoute son MP3 à la racine du site puis indique son nom dans " +
        "js/playlist2Love.js."
      );
      return;
    }
    const previousSource = audio.getAttribute("src");
    const nextSource = new URL(track.src, document.baseURI).href;
    if (previousSource !== nextSource) {
      audio.src = track.src;
    }
    try {
      await audio.play();
    } catch (error) {
      console.error("Impossible de lire ce fichier audio :", error);
      alert(
        "La lecture a échoué. Vérifie que le fichier MP3 existe " +
        "à la racine du projet et que son nom est exact."
      );
    }
    updatePlayButtons();
    renderTracks();
  }
  function pauseAudio() {
    audio.pause();
    updatePlayButtons();
    renderTracks();
  }
  function togglePlayback() {
    if (!audio.paused) {
      pauseAudio();
      return;
    }
    playCurrentTrack();
  }
  function selectTrack(index, autoplay = true) {
    if (index < 0 || index >= tracks.length) {
      return;
    }
    currentIndex = index;
    audio.pause();
    audio.removeAttribute("src");
    audio.load();
    seekBar.value = 0;
    ipodCurrentTime.textContent = "0:00";
    bottomCurrentTime.textContent = "0:00";
    ipodDuration.textContent = "0:00";
    bottomDuration.textContent = "0:00";
    updateTrackInfo();
    if (autoplay) {
      playCurrentTrack();
    }
  }
  function nextTrack() {
    const nextIndex = (currentIndex + 1) % tracks.length;
    selectTrack(nextIndex);
  }
  function previousTrack() {
    if (audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }
    const previousIndex =
      (currentIndex - 1 + tracks.length) % tracks.length;
    selectTrack(previousIndex);
  }
  // Contrôles de lecture
  document.querySelectorAll("[data-action]").forEach(button => {
    button.addEventListener("click", () => {
      const action = button.dataset.action;
      if (action === "toggle") {
        togglePlayback();
      } else if (action === "next") {
        nextTrack();
      } else if (action === "previous") {
        previousTrack();
      }
    });
  });
  // Sélection d'un titre dans la playlist
  trackList.addEventListener("click", event => {
    const button = event.target.closest("[data-track]");
    if (!button) {
      return;
    }
    const index = Number(button.dataset.track);
    if (index === currentIndex) {
      togglePlayback();
    } else {
      selectTrack(index);
    }
  });
  // Afficher ou réduire la liste
  showAllButton.addEventListener("click", () => {
    showAllTracks = !showAllTracks;
    renderTracks();
    if (showAllTracks) {
      trackList.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
  });
  // Barre de progression
  audio.addEventListener("loadedmetadata", () => {
    const duration = formatTime(audio.duration);
    ipodDuration.textContent = duration;
    bottomDuration.textContent = duration;
    const track = tracks[currentIndex];
    if (!track.duration && Number.isFinite(audio.duration)) {
      track.duration = duration;
      renderTracks();
    }
  });
  audio.addEventListener("timeupdate", () => {
    if (!Number.isFinite(audio.duration)) {
      return;
    }
    const currentTime = formatTime(audio.currentTime);
    ipodCurrentTime.textContent = currentTime;
    bottomCurrentTime.textContent = currentTime;
    if (!isSeeking) {
      seekBar.value = (audio.currentTime / audio.duration) * 100;
    }
  });
  seekBar.addEventListener("input", () => {
    isSeeking = true;
  });
  seekBar.addEventListener("change", () => {
    if (Number.isFinite(audio.duration)) {
      audio.currentTime = (Number(seekBar.value) / 100) * audio.duration;
    }
    isSeeking = false;
  });
  // Volume
  volumeBar.addEventListener("input", () => {
    audio.volume = Number(volumeBar.value);
  });
  // Fin d'un morceau
  audio.addEventListener("ended", nextTrack);
  audio.addEventListener("play", () => {
    updatePlayButtons();
    renderTracks();
  });
  audio.addEventListener("pause", () => {
    updatePlayButtons();
    renderTracks();
  });
  // Menu de navigation
  const menuButton = document.getElementById("menuButton");
  const menuPanel = document.getElementById("menuPanel");
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuPanel.hidden = isOpen;
  });
  document.addEventListener("click", event => {
    if (
      !menuPanel.hidden &&
      !menuPanel.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {
      menuPanel.hidden = true;
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
  // Initialisation
  renderTracks();
  updateTrackInfo();
});
