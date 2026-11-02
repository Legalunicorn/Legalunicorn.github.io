// Frosts the top nav once the page is scrolled, so content passing under it stays readable.
const bar = document.querySelector(".topbar");

if (bar) {
  const update = () => bar.classList.toggle("scrolled", window.scrollY > 4);
  update();
  window.addEventListener("scroll", update, { passive: true });
}
