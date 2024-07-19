document.addEventListener("DOMContentLoaded", () => {
  fetch("https://worldtimeapi.org/api/ip")
    .then((response) => response.json())
    .then((data) => {
      const currentDate = new Date(data.datetime);
      const targetDate = new Date(currentDate.getFullYear(), 8, 1); // September is the 8th month (0-indexed)

      if (currentDate > targetDate) {
        targetDate.setFullYear(currentDate.getFullYear() + 1);
      }

      const timeDiff = targetDate - currentDate;
      const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

      document.getElementById(
        "days"
      ).textContent = `${daysDiff} day(s) until September 1st`;
    })
    .catch((error) => {
      console.error("Error fetching the date:", error);
      document.getElementById("days").textContent =
        "Unable to fetch the current date.";
    });
});

function redirectToPage() {
  window.location.href = "progress.html";
}
