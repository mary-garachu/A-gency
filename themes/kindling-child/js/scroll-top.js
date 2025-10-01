document.addEventListener("DOMContentLoaded", function () {
  const scrollBtn = document.getElementById("scrollTopBtn");

  window.addEventListener("scroll", function () {
    if (window.scrollY > window.innerHeight) {
      scrollBtn.classList.add("show");
    } else {
      scrollBtn.classList.remove("show");
    }
  });

  scrollBtn.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});
