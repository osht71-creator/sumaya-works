document.getElementById("year").textContent = new Date().getFullYear();
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// الظهور التدريجي
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("shown"); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// إمالة ثلاثية الأبعاد تتبع المؤشر
document.querySelectorAll("[data-tilt]").forEach((el) => {
  const isDeck = el.classList.contains("deck");
  const area = isDeck ? el.parentElement : el;
  area.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse" || reduceMotion) return;
    const r = area.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = isDeck
      ? `rotateX(${14 - py * 20}deg) rotateY(${18 + px * 24}deg) rotateZ(-4deg)`
      : `perspective(1000px) rotateX(${-py * 8}deg) rotateY(${px * 8}deg)`;
  });
  area.addEventListener("pointerleave", () => { el.style.transform = ""; });
});

// نافذة دراسة الحالة
document.querySelectorAll("[data-open]").forEach((btn) => {
  const dlg = document.getElementById(btn.dataset.open);
  btn.addEventListener("click", () => dlg.showModal());
  dlg.querySelector(".close").addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
});
