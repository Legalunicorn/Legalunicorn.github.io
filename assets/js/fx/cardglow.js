// Tells each project card where the cursor is, for the glow in cardglow.css.
if (matchMedia("(hover: hover)").matches) {
  for (const card of document.querySelectorAll(".card")) {
    card.addEventListener(
      "pointermove",
      (event) => {
        const box = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${event.clientX - box.left}px`);
        card.style.setProperty("--my", `${event.clientY - box.top}px`);
      },
      { passive: true },
    );
  }
}
