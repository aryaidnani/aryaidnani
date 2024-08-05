const itemSelector = document.querySelectorAll(".item");
const daySelector = document.querySelectorAll(".day-number");
const dateSelector = document.querySelectorAll(".date-number");

for (let i = 0; i < itemSelector.length; i++) {
  itemSelector[i].addEventListener("click", function () {
    itemSelector[i].classList.toggle("active");
  });

  itemSelector[i].addEventListener("mouseenter", function () {
    daySelector[i].classList.toggle("hidden");
    dateSelector[i].classList.toggle("hidden");
  });

  itemSelector[i].addEventListener("mouseleave", function () {
    dateSelector[i].classList.toggle("hidden");
    daySelector[i].classList.toggle("hidden");
  });
}
