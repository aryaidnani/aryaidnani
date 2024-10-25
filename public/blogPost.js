const dataLength = axios
  .get("https://aryaidnani.in/api/blogData")
  .then((response) => {
    document.querySelector(".postNum").textContent = `DAY ${
      response.data.length + 1
    }`;
  })
  .catch((err) => console.log(err));

document.querySelector(".postBtn").addEventListener("click", async () => {
  const contentEl = `<p>${document.querySelector(".postArea").value}</p>`;

  await fetch("http://localhost:443/api/blogPost", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content: contentEl }),
  })
    .then(() => alert("Blog Post Successful"))
    .catch((err) => {
      alert(`Error\n${err}`);
      console.log(err);
    });
});
