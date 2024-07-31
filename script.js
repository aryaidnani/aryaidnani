document.addEventListener("DOMContentLoaded", () => {
  fetch("https://worldtimeapi.org/api/ip")
    .then((response) => response.json())
    .then((data) => {
      const currentDate = new Date(data.datetime);
      const targetDate = new Date(currentDate.getFullYear(), 9, 26);

      if (currentDate > targetDate) {
        targetDate.setFullYear(currentDate.getFullYear() + 1);
      }

      const timeDiff = targetDate - currentDate;
      const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

      document.getElementById(
        "days"
      ).textContent = `${daysDiff} day(s) until October 26th`;
    })
    .catch((error) => {
      console.error("Error fetching the date:", error);
      document.getElementById("days").textContent =
        "Unable to fetch the current date.";
    });
});

function redirectToPage() {
  window.location.href = "index.html";
}

document.querySelector(".about-link").addEventListener("click", function () {
  document.querySelector(".container").classList.toggle("hidden");
  document.querySelector(".about-section").classList.toggle("hidden");
});

document,
  querySelector(".icon").addEventListener("click", function () {
    document.querySelector(".container").classList.remove("hidden");
  });
