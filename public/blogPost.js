//Rendering Function

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

  axios
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
})();

//Auth FE

// const authText = document.querySelector(".authText");
// const authBtn = document.querySelector(".vbutton");
// const authModal = document.querySelector(".authModal");

// (async function render() {
//   const response = await fetch("http://localhost:443/", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       token: localStorage.getItem("token"),
//     },
//     body: JSON.stringify({ password: "1234" }),
//   });

//   const messageEl = await response.json();

//   if (messageEl.message === "verified") {
//     authModal.classList.toggle("hidden");
//   }
// })();

// authBtn.addEventListener("click", async () => {
//   const attemptPass = authText.value;

//   const response = await fetch("http://localhost:443/", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       token: localStorage.getItem("token"),
//     },
//     body: JSON.stringify({ password: attemptPass }),
//   });

//   const data = await response.json();
//   localStorage.setItem("token", data.token);
//   if (data.message === "Success") {
//     authModal.classList.toggle("hidden");
//   }
// });
