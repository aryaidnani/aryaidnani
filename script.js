let currentDate = new Date();
const targetDate = new Date(currentDate.getFullYear(), 9, 26);

const progressItem = document.querySelector(".progress-bar");

if (currentDate > targetDate) {
  targetDate.setFullYear(targetDate.getFullYear() + 1);
}

const daysLeft = Math.ceil((targetDate - currentDate) / (1000 * 60 * 60 * 24));

document.querySelector(".days").innerHTML =
  daysLeft + " day(s) until October 26<sup>th</sup>";

function webTime() {
  currentDate = new Date();

  let timeDiffDays = Math.ceil(
    (targetDate - currentDate) / (1000 * 24 * 60 * 60)
  );

  document.querySelector(".days-det").textContent =
    timeDiffDays < 10 ? "0" + timeDiffDays : timeDiffDays;

  let timeDiffSeconds = targetDate.getSeconds() - currentDate.getSeconds();
  document.querySelector(".seconds").textContent =
    60 + timeDiffSeconds < 10
      ? "0" + (60 + timeDiffSeconds)
      : 60 + timeDiffSeconds;

  let timeDiffMinutes = targetDate.getMinutes() - currentDate.getMinutes();
  document.querySelector(".minutes").textContent =
    60 + timeDiffMinutes < 10
      ? "0" + (60 + timeDiffMinutes)
      : 60 + timeDiffMinutes;

  let timeDiffHours = targetDate.getHours() - currentDate.getHours();
  document.querySelector(".hours").textContent =
    24 + timeDiffHours < 10 ? "0" + (24 + timeDiffHours) : 24 + timeDiffHours;

  progressItem.value = 100 - timeDiffDays;
}

setInterval(webTime, 1000);

document.querySelector(".container").addEventListener("mouseenter", () => {
  document.querySelector(".days").classList.toggle("hidden");
  document.querySelector(".detailed").classList.toggle("hidden");
  progressItem.classList.toggle("hidden");
});

document.querySelector(".container").addEventListener("mouseleave", () => {
  document.querySelector(".days").classList.toggle("hidden");
  document.querySelector(".detailed").classList.toggle("hidden");
  progressItem.classList.toggle("hidden");
});
