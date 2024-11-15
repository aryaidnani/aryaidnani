/* ********************************************************** */

let blogs;
let blogType = localStorage.getItem("blogType") || "New";
document.querySelector(".blogBtn").textContent = `Blog (${blogType} Streak)`;

localStorage.setItem("blogType", blogType);

function blogRender(blogArray) {
  const accordionContainer = document.querySelector(".accordion");
  accordionContainer.innerHTML = "";

  blogArray.forEach((blog) => {
    const blogElement = document.createElement("div");
    blogElement.className = `item item-${blog.id}`;

    blogElement.innerHTML = `
    <h2 class = "day-number">${`Day ${blog.id}`}</h2>
    <h2 class = "date-number hidden">${blog.dateStr}</h2>
    <svg xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="icon downwards">

             <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="icon upwards hidden"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m4.5 15.75 7.5-7.5 7.5 7.5"
            />
          </svg>

          <div class = "content hidden"> ${blog.content}
          <h4>${blog.dateStr.replaceAll(" ", "")}</h4>
          </div>
          `;

    accordionContainer.appendChild(blogElement);
  });
  const footerEl = document.createElement("footer");
  footerEl.className = "blog-footer";
  footerEl.innerHTML = `&copy;2024-Arya IdnanI`;
  accordionContainer.append(footerEl);

  pageLoad();
}

//Rendering Function to implement dynamic doms

async function fetchBlogs(blogSet) {
  //  DB Fetching

  blogs = await axios
    .get(`https://aryaidnani.in/api/${blogSet}`)
    .then((reponse) => {
      if (!document.querySelector(".lds-ripple").classList.contains("hidden")) {
        document.querySelector(".lds-ripple").classList.toggle("hidden");
      }
      return reponse.data;
    })
    .catch((error) => {
      console.log(error);
    });

  if (!blogs) {
    return;
  }

  try {
    // function blogRender(blogArray) {
    //   const accordionContainer = document.querySelector(".accordion");
    //   accordionContainer.innerHTML = "";

    //   blogArray.forEach((blog) => {
    //     const blogElement = document.createElement("div");
    //     blogElement.className = `item item-${blog.id}`;

    //     blogElement.innerHTML = `
    //     <h2 class = "day-number">${`Day ${blog.id}`}</h2>
    //     <h2 class = "date-number hidden">${blog.dateStr}</h2>
    //     <svg xmlns="http://www.w3.org/2000/svg"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             stroke-width="1.5"
    //             stroke="currentColor"
    //             class="icon downwards">

    //              <path
    //               stroke-linecap="round"
    //               stroke-linejoin="round"
    //               d="m19.5 8.25-7.5 7.5-7.5-7.5"
    //             />
    //           </svg>

    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             stroke-width="1.5"
    //             stroke="currentColor"
    //             class="icon upwards hidden"
    //           >
    //             <path
    //               stroke-linecap="round"
    //               stroke-linejoin="round"
    //               d="m4.5 15.75 7.5-7.5 7.5 7.5"
    //             />
    //           </svg>

    //           <div class = "content hidden"> ${blog.content}
    //           <h4>${blog.dateStr.replaceAll(" ", "")}</h4>
    //           </div>
    //           `;

    //     accordionContainer.appendChild(blogElement);
    //   });
    //   const footerEl = document.createElement("footer");
    //   footerEl.className = "blog-footer";
    //   footerEl.innerHTML = `&copy;2024-Arya IdnanI`;
    //   accordionContainer.append(footerEl);

    //   pageLoad();
    // }

    blogRender(blogs);

    // function blogSort(order = "latest") {
    //   blogs.sort((a, b) => {
    //     //P1
    //     if (order === "latest") {
    //       return b.id - a.id;
    //     } else if (order === "oldest") {
    //       return a.id - b.id;
    //     }
    //   });
    //   blogRender(blogs); //P2
    // }
    blogSort("latest"); //Initial Sorting

    // const sortBtn = document.querySelector(".sort-btn");

    // sortBtn.addEventListener("click", () => {
    //   sortBtn.classList.toggle("oldest");
    //   sortBtn.classList.toggle("latest");

    //   if (!sortBtn.classList.contains("latest")) {
    //     sortBtn.textContent = "Oldest";
    //     blogSort("oldest");
    //   } else if (!sortBtn.classList.contains("oldest")) {
    //     sortBtn.textContent = "Latest";
    //     blogSort("latest");
    //   }

    //   let blogContent = document.querySelector(".blog-content");

    //   blogContent.scrollTo({
    //     top: 0,
    //     behavior: "smooth",
    //   });
    // });
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }
}

fetchBlogs(localStorage.getItem("blogType"));

//Accordion Functionality

function pageLoad() {
  const itemSelector = document.querySelectorAll(".item");
  const daySelector = document.querySelectorAll(".day-number");
  const dateSelector = document.querySelectorAll(".date-number");
  const downIcon = document.querySelectorAll(".downwards");
  const upIcon = document.querySelectorAll(".upwards");

  for (let i = 0; i < itemSelector.length; i++) {
    itemSelector[i].addEventListener("click", function () {
      itemSelector[i].classList.toggle("active");
      downIcon[i].classList.toggle("hidden");
      upIcon[i].classList.toggle("hidden");
    });

    itemSelector[i].addEventListener("mouseenter", function () {
      daySelector[i].classList.toggle("hidden");
      dateSelector[i].classList.toggle("hidden");
    });

    itemSelector[i].addEventListener("mouseleave", function () {
      dateSelector[i].classList.toggle("hidden");
      daySelector[i].classList.toggle("hidden");
    });
  }
}

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

document.querySelector(".screen-theme").addEventListener("click", (e) => {
  const newTheme = document.body.classList.contains("dark") ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
  applyTheme(newTheme);
});

// document.querySelector(".screen-theme").addEventListener("click", () => {
//   document.querySelector(".moon-icon").classList.toggle("hidden");
//   document.querySelector(".sun-icon").classList.toggle("hidden");

//   const newTheme = document.body.classList.contains("dark") ? "light" : "dark";
//   localStorage.setItem("theme", newTheme);
//   applyTheme(newTheme);
// });

let blogContent = document.querySelector(".blog-content");
const scrollBtn = document.querySelector(".scroll");

let accordionCoord = document
  .querySelector(".accordion")
  .getBoundingClientRect().top;

scrollBtn.addEventListener("click", () => {
  blogContent.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

function setBlog(blogType) {
  if (localStorage.getItem("blogType") === "New") {
    blogType = "Old";
    localStorage.setItem("blogType", blogType);
    console.log(localStorage.getItem("blogType"));
  } else {
    blogType = "New";
    localStorage.setItem("blogType", blogType);
    console.log(localStorage.getItem("blogType"));
  }
  document.querySelector(".blogBtn").textContent = `Blog (${blogType} Streak)`;
  fetchBlogs(localStorage.getItem("blogType"));
}

document.querySelector(".blogBtn").addEventListener("click", (e) => {
  e.preventDefault();
  setBlog(blogType);
});

function blogSort(order = "latest") {
  blogs.sort((a, b) => {
    //P1
    if (order === "latest") {
      return b.id - a.id;
    } else if (order === "oldest") {
      return a.id - b.id;
    }
  });
  blogRender(blogs); //P2
}

const sortBtn = document.querySelector(".sort-btn");

sortBtn.addEventListener("click", () => {
  sortBtn.classList.toggle("oldest");
  sortBtn.classList.toggle("latest");

  if (!sortBtn.classList.contains("latest")) {
    sortBtn.textContent = "Oldest";
    blogSort("oldest");
  } else if (!sortBtn.classList.contains("oldest")) {
    sortBtn.textContent = "Latest";
    blogSort("latest");
  }

  let blogContent = document.querySelector(".blog-content");

  blogContent.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
