document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");
  const section = document.querySelector(".stats-section");
  let started = false;

  function runCounter(counter) {
    const target = +counter.getAttribute("data-target");
    let count = 0;
    const speed = target / 200; // adjust speed

    const updateCount = () => {
      count += speed;
      if (count < target) {
        counter.textContent = Math.ceil(count);
        requestAnimationFrame(updateCount);
      } else {
        counter.textContent = target;
      }
    };
    updateCount();
  }

  function handleScroll() {
    const sectionPos = section.getBoundingClientRect().top;
    const screenPos = window.innerHeight;

    if (sectionPos < screenPos && !started) {
      counters.forEach(counter => runCounter(counter));
      started = true;
    }
  }

  window.addEventListener("scroll", handleScroll);
});
