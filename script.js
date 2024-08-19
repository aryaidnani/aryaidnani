// document.addEventListener("DOMContentLoaded", () => {
//   fetch("https://worldtimeapi.org/api/ip")
//     .then((response) => response.json())
//     .then((data) => {
//       const currentDate = new Date(data.datetime);
//       const targetDate = new Date(currentDate.getFullYear(), 9, 26);

//       if (currentDate > targetDate) {
//         targetDate.setFullYear(currentDate.getFullYear() + 1);
//       }

//       const timeDiff = targetDate - currentDate;
//       const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

//       document.getElementById(
//         "days"
//       ).textContent = `${daysDiff} day(s) until October 26th`;
//     })
//     .catch((error) => {
//       console.error("Error fetching the date:", error);
//       document.getElementById("days").textContent =
//         "Unable to fetch the current date.";
//     });
// });

// function redirectToPage() {
//   window.location.href = "index.html";
// }

// ALTERNATIVE TO API METHOD

const currentDate = new Date();

const today = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  currentDate.getDate()
);

const targetDate = new Date(currentDate.getFullYear(), 9, 26);

const daysLeft =
  Math.trunc((targetDate - currentDate) / (1000 * 60 * 60 * 24)) + 1;

// document.getElementById(
//   "days"
// ).textContent = `${daysLeft} day(s) until October 26th`;

document.getElementById("days").innerHTML =
  daysLeft + " day(s) until October 26<sup>th</sup>";
