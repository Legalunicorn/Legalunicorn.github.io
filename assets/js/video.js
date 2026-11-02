// Plays a project card's video while the card is hovered. The video sits on top of the
// card image and fades in once frames are actually playing, then fades out and rewinds
// on leave. It only starts downloading on the first hover (preload="none").
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");

for (const card of document.querySelectorAll(".card")) {
  const video = card.querySelector(".card-video");
  if (!video) continue;

  video.addEventListener("playing", () => video.classList.add("playing"));

  card.addEventListener("mouseenter", () => {
    if (reduceMotion.matches) return;
    video.play().catch(() => {});  // ignore play() being interrupted by a quick mouseleave
  });
  card.addEventListener("mouseleave", () => {
    video.pause();
    video.classList.remove("playing");
    // rewind after the fade-out so the last frame doesn't jump
    setTimeout(() => { if (video.paused) video.currentTime = 0; }, 300);
  });
}
