let currentDate = new Date();
const targetDate = new Date(currentDate.getFullYear(), 11, 20);

const progressItem = document.querySelector(".progress-bar");

if (currentDate > targetDate) {
  targetDate.setFullYear(targetDate.getFullYear() + 1);
}

const daysLeft = Math.ceil((targetDate - currentDate) / (1000 * 60 * 60 * 24));

document.querySelector(".days").innerHTML =
  daysLeft + " day(s) until December 20<sup>th</sup>";

function webTime() {
  currentDate = new Date();

  let timeDiffDays = Math.ceil(
    (targetDate - currentDate) / (1000 * 24 * 60 * 60)
  );

  document.querySelector(".days-det").textContent =
    timeDiffDays < 10 ? "0" + timeDiffDays : timeDiffDays;

  let timeDiffSeconds = targetDate.getSeconds() - currentDate.getSeconds();
  document.querySelector(".seconds").textContent =
    59 + timeDiffSeconds < 10
      ? "0" + (59 + timeDiffSeconds)
      : 59 + timeDiffSeconds;

  let timeDiffMinutes = targetDate.getMinutes() - currentDate.getMinutes();
  document.querySelector(".minutes").textContent =
    59 + timeDiffMinutes < 10
      ? "0" + (59 + timeDiffMinutes)
      : 59 + timeDiffMinutes;

  let timeDiffHours = targetDate.getHours() - currentDate.getHours();
  document.querySelector(".hours").textContent =
    23 + timeDiffHours < 10 ? "0" + (23 + timeDiffHours) : 23 + timeDiffHours;

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

// function applyTheme(theme) {
//   if (theme === "dark") {
//     document.body.classList.add("dark");
//     document.body.classList.remove("light");
//   } else if (theme === "light") {
//     document.body.classList.add("light");
//     document.body.classList.remove("dark");
//   }
// }

function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark");
    document.body.classList.remove("light");

    document.querySelector(".moon-icon").classList.add("hidden");
    document.querySelector(".sun-icon").classList.remove("hidden");
  } else if (theme === "light") {
    document.body.classList.add("light");
    document.body.classList.remove("dark");
    document.querySelector(".moon-icon").classList.remove("hidden");
    document.querySelector(".sun-icon").classList.add("hidden");
  }
}

let storedTheme = localStorage.getItem("theme") || "dark";
applyTheme(storedTheme);

// document.querySelector(".screen-theme").addEventListener("click", () => {
//   document.querySelector(".moon-icon").classList.toggle("hidden");
//   document.querySelector(".sun-icon").classList.toggle("hidden");

//   const newTheme = document.body.classList.contains("dark") ? "light" : "dark";
//   localStorage.setItem("theme", newTheme);
//   applyTheme(newTheme);
// });

document.querySelector(".screen-theme").addEventListener("click", (e) => {
  const newTheme = document.body.classList.contains("dark") ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
  applyTheme(newTheme);
});
