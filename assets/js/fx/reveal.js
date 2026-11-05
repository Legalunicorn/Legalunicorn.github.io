// Fades in each block below the fold the first time it scrolls into view.
// Anything already on screen is left alone, so nothing flashes on load.
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const seen = new IntersectionObserver(
    (entries) => {
      for (const { isIntersecting, target } of entries) {
        if (!isIntersecting) continue;
        seen.unobserve(target);
        target.classList.replace("fx-pending", "fx-in");
        target.addEventListener("animationend", () => target.classList.remove("fx-in"), { once: true });
      }
    },
    { rootMargin: "0px 0px -8% 0px" },
  );

  for (const el of document.querySelectorAll("section > h2, .card, .tool-row, .post-list")) {
    if (el.getBoundingClientRect().top < innerHeight) continue;
    el.classList.add("fx-pending");
    seen.observe(el);
  }
}
