const itemSelector = document.querySelectorAll(".item");
const daySelector = document.querySelectorAll(".day-number");
const dateSelector = document.querySelectorAll(".date-number");
const downIcon = document.querySelectorAll(".downwards");
const upIcon = document.querySelectorAll(".upwards");

for (let i = 0; i < itemSelector.length; i++) {
  itemSelector[i].addEventListener("click", function () {
    itemSelector[i].classList.toggle("active");
    downIcon[i].classList.toggle("hidden");
    upIcon[i].classList.toggle("hidden");
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
