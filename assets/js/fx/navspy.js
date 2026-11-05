// Marks the nav link for the section currently on screen.
const links = [...document.querySelectorAll('.topbar a[href*="#"]')]
  .map((link) => ({ link, section: document.getElementById(link.hash.slice(1)) }))
  .filter(({ section }) => section);

if (links.length) {
  let queued = false;
  const update = () => {
    queued = false;
    const atBottom = innerHeight + scrollY >= document.documentElement.scrollHeight - 2;
    const line = innerHeight * 0.35;
    let current = null;
    for (const entry of links) {
      if (entry.section.getBoundingClientRect().top <= line) current = entry;
    }
    if (atBottom) current = links.at(-1);
    for (const entry of links) {
      entry.link.classList.toggle("current", entry === current);
      if (entry === current) entry.link.setAttribute("aria-current", "true");
      else entry.link.removeAttribute("aria-current");
    }
  };
  const queue = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  };
  update();
  addEventListener("scroll", queue, { passive: true });
  addEventListener("resize", queue, { passive: true });
}
