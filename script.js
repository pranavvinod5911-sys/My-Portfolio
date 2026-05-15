// scroll animation
const faders = document.querySelectorAll('.fade');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
});

faders.forEach(el => observer.observe(el));

// parallax
const bg = document.querySelector('.parallax-bg');

window.addEventListener('scroll', () => {
  if (bg) {
    bg.style.transform = `translateY(${window.scrollY * 0.3}px)`;
  }
});

// open book links
function openBook(link) {
  window.open(link, '_blank');
}
const toggle = document.getElementById("dark-toggle");

if (localStorage.getItem("dark-mode") === "true") {
  document.body.classList.add("dark");
}

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  localStorage.setItem(
    "dark-mode",
    document.body.classList.contains("dark")
  );
});
document.addEventListener("mousemove", e => {

    const leftShape = document.querySelector(".shape-left");
    const rightShape = document.querySelector(".shape-right");

    let x = (window.innerWidth - e.pageX) / 90;
    let y = (window.innerHeight - e.pageY) / 90;

    leftShape.style.transform =
        `translate(${x}px, ${y}px)`;

    rightShape.style.transform =
        `translate(${-x}px, ${-y}px)`;
});