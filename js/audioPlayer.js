const audio = document.getElementById("audio");
const playPause = document.getElementById("play-pause");
const playPauseIcon = document.getElementById("play-pause-icon");
const rewind = document.getElementById("rewind");
const forward = document.getElementById("forward");
const volume = document.getElementById("volume");

export default function audioPlayer() {
  // play/pause
  playPause.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      playPauseIcon.src = "./img/audioIMG/pause.svg";
    } else {
      audio.pause();
      playPauseIcon.src = "./img/audioIMG/play.svg";
    }
  });

  // voltar 5 segundos
  rewind.addEventListener("click", () => {
    audio.currentTime -= 5;
  });

  // avançar 5 segundos
  forward.addEventListener("click", () => {
    audio.currentTime += 5;
  });

  // Controle de volume
  volume.addEventListener("input", () => {
    audio.volume = volume.value;
  });

  // estilos ao clicar no play
  audio.addEventListener("play", () => {
    section.forEach((item) => {
      item.classList.remove("hidden");
    });
  });
}
