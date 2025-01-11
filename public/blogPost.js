//Rendering Function

let storedTheme = localStorage.getItem("theme") || "dark";
let blogType = localStorage.getItem("blogType") || "New";

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

function render() {
  const blogPost = document.querySelector(".blogPost");
  blogPost.innerHTML = "";

  const postNum = document.createElement("h1");
  postNum.className = "postNum";
  blogPost.append(postNum);

  const logoutBtn = document.createElement("button");
  logoutBtn.className = "logout postBtn";
  logoutBtn.textContent = "LOG-OUT";
  blogPost.append(logoutBtn);

  logoutBtn.addEventListener("click", (e) => {
    location.reload();
    localStorage.setItem("token", "logged-out");
  });

  const postEls = document.createElement("div");
  postEls.className = "postEls";

  blogPost.append(postEls);

  const postArea = document.createElement("textarea");
  postArea.className = "postArea";
  postArea.placeholder = "Type Your Blog...";
  postEls.append(postArea);

  const typeBtn = document.createElement("text");
  typeBtn.className = "typeBtn";
  typeBtn.textContent = `${blogType}`;
  postEls.append(typeBtn);

  const postBtn = document.createElement("button");
  postBtn.className = "postBtn";
  postBtn.textContent = "POST";
  postEls.append(postBtn);

  const screenTheme = document.createElement("div");
  screenTheme.className = "screen-theme";
  screenTheme.innerHTML = `<svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="sun-icon"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
        />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="moon-icon"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
        />
      </svg>`;

  blogPost.append(screenTheme);

  axios
    .get(`https://aryaidnani.in/api/${blogType}`)
    .then((response) => {
      document.querySelector(".postNum").textContent = `DAY ${
        response.data.length + 1
      }`;
    })
    .catch((err) => console.log(err));

  postBtn.addEventListener("click", async () => {
    const contentEl = `<p>${document.querySelector(".postArea").value}</p>`;

    await fetch(`https://aryaidnani.in/api/${blogType}`, {
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

  storedTheme = localStorage.getItem("theme") || "dark";
  applyTheme(storedTheme);

  document.querySelector(".screen-theme").addEventListener("click", (e) => {
    document.querySelector(".moon-icon").classList.toggle("hidden");
    document.querySelector(".sun-icon").classList.toggle("hidden");

    const newTheme = document.body.classList.contains("dark")
      ? "light"
      : "dark";
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  });

  typeBtn.addEventListener("click", (e) => {
    if (blogType !== "Old") {
      blogType = "Old";
    } else if (blogType !== "New") {
      blogType = "New";
    }
    typeBtn.textContent = `${blogType}`;
    localStorage.setItem("blogType", blogType);

    axios
      .get(`https://aryaidnani.in/api/${blogType}`)
      .then((response) => {
        document.querySelector(".postNum").textContent = `DAY ${
          response.data.length + 1
        }`;
      })
      .catch((err) => console.log(err));
  });
}

const authText = document.querySelector(".authText");
const authBtn = document.querySelector(".vbutton");
const authModal = document.querySelector(".authModal");

//Auth FE

(async function pageEnter() {
  const response = await fetch("https://aryaidnani.in/api/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
    body: JSON.stringify({ password: "1234" }),
  });

  const messageEl = await response.json();

  if (messageEl.message === "verified") {
    render();
  }
})();

authBtn.addEventListener("click", async () => {
  const attemptPass = authText.value;

  const response = await fetch("https://aryaidnani.in/api/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
    body: JSON.stringify({ password: attemptPass }),
  });

  const data = await response.json();
  if (data.message === "Success") {
    localStorage.setItem("token", data.token);
    render();
  } else {
    alert("Incorrect password");
  }
});

applyTheme(storedTheme);

document.querySelector(".screen-theme").addEventListener("click", (e) => {
  const newTheme = document.body.classList.contains("dark") ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
  applyTheme(newTheme);
});
