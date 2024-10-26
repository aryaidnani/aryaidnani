(function render() {
  const blogPost = document.querySelector(".blogPost");
  blogPost.innerHTML = "";

  const postNum = document.createElement("h1");
  // postNum.innerHTML = `DAY ${dataLength}`;
  postNum.className = "postNum";
  blogPost.append(postNum);

  const postEls = document.createElement("div");
  postEls.className = "postEls";

  blogPost.append(postEls);

  const postArea = document.createElement("textarea");
  postArea.className = "postArea";
  postArea.placeholder = "Type Your Blog...";
  postEls.append(postArea);

  const postBtn = document.createElement("button");
  postBtn.className = "postBtn";
  postBtn.textContent = "POST";
  postEls.append(postBtn);
})();

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
