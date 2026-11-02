// Smoothly opens and closes the project "Highlights" toggles by animating the height
// of their content. Without JavaScript, or with reduced motion on, they toggle instantly.
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");

for (const details of document.querySelectorAll(".card details")) {
  const summary = details.querySelector("summary");
  const body = details.querySelector(".details-body");
  let anim = null;

  summary.addEventListener("click", (event) => {
    if (reduceMotion.matches) return;
    event.preventDefault();

    // measure before cancelling, so a toggle mid-animation starts from where it is
    const from = details.open ? body.getBoundingClientRect().height : 0;
    const opening = !details.open || anim?.closing;
    if (anim) anim.cancel();

    details.open = true;
    const to = opening ? body.scrollHeight : 0;

    anim = body.animate(
      [{ height: `${from}px`, opacity: opening ? 0.4 : 1 }, { height: `${to}px`, opacity: opening ? 1 : 0 }],
      { duration: 300, easing: "cubic-bezier(0.25, 0.8, 0.35, 1)" },
    );
    anim.closing = !opening;
    details.classList.toggle("is-closing", !opening);  // lets the chevron turn back right away
    anim.onfinish = () => {
      if (!opening) details.open = false;
      details.classList.remove("is-closing");
      anim = null;
    };
  });
}
