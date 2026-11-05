// Colours the tool logos in rings around a source tool, one ring per step.
// A sweep runs once when the section first appears; after that the cursor is the source.
const tools = [...document.querySelectorAll(".tool")];
const section = document.querySelector(".tools");
const canRun = matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches;

if (section && tools.length && canRun) {
  const ringSize = 90; // px between rings
  const stepMs = 60;
  const hoverRings = 2;
  let timers = [];
  let source = null;

  const later = (ms, fn) => timers.push(setTimeout(fn, ms));
  const cancel = () => {
    timers.forEach(clearTimeout);
    timers = [];
  };
  const centre = (el) => {
    const r = el.getBoundingClientRect();
    return [r.left + r.width / 2, r.top + r.height / 2];
  };
  const rings = (from) => {
    const [x, y] = centre(from);
    return tools.map((tool) => {
      const [tx, ty] = centre(tool);
      return { tool, ring: Math.round(Math.hypot(tx - x, ty - y) / ringSize) };
    });
  };

  const seen = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      seen.disconnect();
      if (source) return;
      for (const { tool, ring } of rings(tools[0])) {
        later(ring * stepMs, () => tool.classList.add("lit"));
        later(ring * stepMs + 450, () => tool.classList.remove("lit"));
      }
    },
    { threshold: 0.3 },
  );
  seen.observe(section);

  for (const tool of tools) {
    tool.addEventListener("mouseenter", () => {
      cancel();
      source = tool;
      for (const { tool: other, ring } of rings(tool)) {
        if (ring <= hoverRings) later(ring * stepMs, () => other.classList.add("lit"));
        else other.classList.remove("lit");
      }
    });
  }
  section.addEventListener("mouseleave", () => {
    cancel();
    if (!source) return;
    for (const { tool, ring } of rings(source)) later(ring * stepMs, () => tool.classList.remove("lit"));
    source = null;
  });
}
