// Types the words from data-words into .typed-word one at a time, deleting and retyping in a loop.
// Without JavaScript, or with reduced motion on, the first word just stays in place.
const el = document.querySelector(".typed-word");
const words = el ? JSON.parse(el.parentElement.dataset.words || "[]") : [];

if (el && words.length > 1 && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let w = 0;
  let i = words[0].length;
  let deleting = true;
  const pause = 1800;

  setTimeout(function tick() {
    const word = words[w];
    i += deleting ? -1 : 1;
    el.textContent = word.slice(0, i);

    let delay = deleting ? 45 : 85;
    if (deleting && i === 0) {
      deleting = false;
      w = (w + 1) % words.length;
      delay = 300;
    } else if (!deleting && i === words[w].length) {
      deleting = true;
      delay = pause;
    }
    setTimeout(tick, delay);
  }, pause);
}
