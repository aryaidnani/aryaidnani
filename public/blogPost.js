document.querySelector(".postBtn").addEventListener("click", async () => {
  const contentEl = document.querySelector(".postArea").value;
  console.log(contentEl);

  await fetch("https://aryaidnani.in/api/blogPost", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content: contentEl }),
  })
    .then(alert("Blog Post Successful"))
    .catch((err) => {
      console.log(err);
    });
});
