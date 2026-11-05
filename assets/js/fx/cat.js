// The avatar's pupils follow the cursor, and it blinks now and then.
// Eye positions are in the avatar's own pixels (572 x 572).
const avatar = document.querySelector(".avatar");

if (avatar && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const eyes = [
    { cx: 215, cy: 306, rx: 66, ry: 68, px: 218, py: 328, prx: 40, pry: 44 },
    { cx: 364, cy: 304, rx: 65, ry: 68, px: 364, py: 326, prx: 42, pry: 46 },
  ];
  const wrap = document.createElement("span");
  wrap.className = "fx-cat";
  avatar.replaceWith(wrap);
  wrap.append(avatar);
  wrap.insertAdjacentHTML(
    "beforeend",
    `<svg class="fx-cat-eyes" viewBox="0 0 572 572" aria-hidden="true">${eyes
      .map(
        (e, i) => `<clipPath id="fx-eye-${i}"><ellipse cx="${e.cx}" cy="${e.cy}" rx="${e.rx}" ry="${e.ry}"/></clipPath>
        <g clip-path="url(#fx-eye-${i})">
          <ellipse cx="${e.cx}" cy="${e.cy}" rx="${e.rx}" ry="${e.ry}" fill="#d9e5c8"/>
          <ellipse class="fx-cat-pupil" cx="${e.px}" cy="${e.py}" rx="${e.prx}" ry="${e.pry}" fill="#090607"/>
          <rect class="fx-cat-lid" x="${e.cx - e.rx}" y="${e.cy - e.ry}" width="${e.rx * 2}" height="${e.ry * 2}" fill="#150806"/>
        </g>`,
      )
      .join("")}</svg>`,
  );

  const pupils = wrap.querySelectorAll(".fx-cat-pupil");
  const lids = wrap.querySelectorAll(".fx-cat-lid");

  let queued = false;
  let mouseX = 0;
  let mouseY = 0;
  const look = () => {
    queued = false;
    const box = wrap.querySelector("svg").getBoundingClientRect();
    const scale = box.width / 572;
    eyes.forEach((e, i) => {
      const dx = mouseX - (box.left + e.px * scale);
      const dy = mouseY - (box.top + e.py * scale);
      const dist = Math.hypot(dx, dy) || 1;
      const reach = Math.min(1, dist / 180);
      const x = (dx / dist) * reach * 18;
      const y = (dy / dist) * reach * (dy < 0 ? 24 : 4);
      pupils[i].style.transform = `translate(${x}px, ${y}px)`;
    });
  };
  addEventListener(
    "pointermove",
    (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (queued) return;
      queued = true;
      requestAnimationFrame(look);
    },
    { passive: true },
  );

  const blink = () => {
    if (!document.hidden) {
      for (const lid of lids) {
        lid.animate({ transform: ["scaleY(0)", "scaleY(1)", "scaleY(0)"] }, { duration: 170, easing: "ease-in-out" });
      }
    }
    setTimeout(blink, 2500 + Math.random() * 4500);
  };
  setTimeout(blink, 2500);
}
